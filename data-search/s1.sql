-- #####################################################################
-- #                SCHEMA SQL - PHIÊN BẢN ĐÃ ĐIỀU CHỈNH                #
-- #####################################################################

-- PHẦN 1: DỌN DẸP & CÀI ĐẶT
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE TEXT SEARCH CONFIGURATION public.vietnamese (COPY = simple);
ALTER TEXT SEARCH CONFIGURATION public.vietnamese ALTER MAPPING FOR hword, hword_part, word WITH unaccent, simple;

-- PHẦN 2: ĐỊNH NGHĨA CÁC KIỂU DỮ LIỆU
CREATE TYPE listing_type_enum AS ENUM ('SALE', 'RENT');
CREATE TYPE user_role_enum AS ENUM ('ADMIN', 'AGENT', 'USER');
CREATE TYPE location_type_enum AS ENUM ('COUNTRY', 'CITY', 'DISTRICT');
CREATE TYPE searchable_item_type AS ENUM ('PROJECT', 'PRODUCT_SALE', 'PRODUCT_RENT', 'NEWS_ARTICLE', 'WIKI_ARTICLE', 'BUSINESS_PROFILE');

-- PHẦN 3: TẠO CẤU TRÚC CÁC BẢNG (ĐÃ CẬP NHẬT)
CREATE TABLE "User" ( id VARCHAR(255) PRIMARY KEY, username VARCHAR(100) UNIQUE NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password_hash TEXT NOT NULL, full_name VARCHAR(255), role user_role_enum NOT NULL DEFAULT 'USER' );
CREATE TABLE "Location" ( id VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL, type location_type_enum NOT NULL, parent_id VARCHAR(255) REFERENCES "Location"(id) );
CREATE TABLE "ProjectType" ( id VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL );
CREATE TABLE "ProductType" ( id VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL );
CREATE TABLE "NewsCategory" ( id VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL );
CREATE TABLE "WikiTopic" ( id VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL );
CREATE TABLE "BusinessType" ( id VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL );
CREATE TABLE "BusinessProfile" ( id VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL, business_type_id VARCHAR(255) REFERENCES "BusinessType"(id), description TEXT, content_detail TEXT, published_date TIMESTAMPTZ, cached_business_type_slug VARCHAR(255) );
CREATE TABLE "Project" ( id VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL, project_type_id VARCHAR(255) REFERENCES "ProjectType"(id), location_id VARCHAR(255) REFERENCES "Location"(id), address_detail VARCHAR(1024), description TEXT, images TEXT[], status VARCHAR(100), price_from NUMERIC, price_to NUMERIC, price_unit VARCHAR(50), content_sections JSONB, regional_links JSONB, facilities_amenities JSONB, published_date TIMESTAMPTZ, cached_project_type_slug VARCHAR(255), cached_location_slug VARCHAR(255) );
CREATE TABLE "BusinessProjectParticipation" ( business_id VARCHAR(255) REFERENCES "BusinessProfile"(id) ON DELETE CASCADE, project_id VARCHAR(255) REFERENCES "Project"(id) ON DELETE CASCADE, role_in_project TEXT NOT NULL, PRIMARY KEY (business_id, project_id, role_in_project) );
CREATE TABLE "ProjectZones" ( project_id VARCHAR(255) REFERENCES "Project"(id) ON DELETE CASCADE, name VARCHAR(255) NOT NULL, description TEXT, PRIMARY KEY (project_id, name) );
CREATE TABLE "ProductSale" ( id VARCHAR(255) PRIMARY KEY, product_type_id VARCHAR(255) REFERENCES "ProductType"(id), project_id VARCHAR(255) REFERENCES "Project"(id), location_id VARCHAR(255) REFERENCES "Location"(id), title VARCHAR(255) NOT NULL, description TEXT, slug VARCHAR(255) UNIQUE NOT NULL, address_detail VARCHAR(1024), content_blocks JSONB, nearby_amenities JSONB, price NUMERIC, price_unit VARCHAR(50), images TEXT[], published_date TIMESTAMPTZ, cached_product_type_slug VARCHAR(255), cached_project_slug VARCHAR(255), cached_location_slug VARCHAR(255) );
CREATE TABLE "ProductRent" ( id VARCHAR(255) PRIMARY KEY, product_type_id VARCHAR(255) REFERENCES "ProductType"(id), project_id VARCHAR(255) REFERENCES "Project"(id), location_id VARCHAR(255) REFERENCES "Location"(id), title VARCHAR(255) NOT NULL, description TEXT, slug VARCHAR(255) UNIQUE NOT NULL, address_detail VARCHAR(1024), content_blocks JSONB, nearby_amenities JSONB, price NUMERIC, price_unit VARCHAR(50), images TEXT[], published_date TIMESTAMPTZ, cached_product_type_slug VARCHAR(255), cached_project_slug VARCHAR(255), cached_location_slug VARCHAR(255) );
CREATE TABLE "NewsArticle" ( id VARCHAR(255) PRIMARY KEY, title VARCHAR(512) NOT NULL, description TEXT, slug VARCHAR(512) UNIQUE NOT NULL, content TEXT, news_category_id VARCHAR(255) REFERENCES "NewsCategory"(id), published_date TIMESTAMPTZ, tags TEXT[], cached_category_slug VARCHAR(255) );
CREATE TABLE "WikiArticle" ( id VARCHAR(255) PRIMARY KEY, title VARCHAR(512) NOT NULL, description TEXT, slug VARCHAR(512) UNIQUE NOT NULL, content TEXT, wiki_topic_id VARCHAR(255) REFERENCES "WikiTopic"(id), published_date TIMESTAMPTZ, tags TEXT[], cached_topic_slug VARCHAR(255) );
CREATE TABLE global_search_index ( id SERIAL PRIMARY KEY, searchable_id VARCHAR(255) NOT NULL, searchable_type searchable_item_type NOT NULL, listing_type listing_type_enum, title VARCHAR(512) NOT NULL, description TEXT, url VARCHAR(2048), image_url VARCHAR(2048), published_date TIMESTAMPTZ, price_from NUMERIC, price_to NUMERIC, price_unit VARCHAR(50), address_detail VARCHAR(1024), sub_type_slug VARCHAR(255), fts_document TSVECTOR, UNIQUE(searchable_id, searchable_type) );
CREATE INDEX global_search_fts_idx ON global_search_index USING GIN(fts_document);
CREATE TABLE "SearchAnalytics" (
  term TEXT PRIMARY KEY,
  search_count INTEGER NOT NULL DEFAULT 1,
  last_searched_at TIMESTAMPTZ DEFAULT NOW()
);

-- PHẦN 4: TẠO CÁC HÀM (FUNCTIONS)
CREATE OR REPLACE FUNCTION delete_from_global_search() RETURNS TRIGGER AS $$ BEGIN DELETE FROM global_search_index WHERE searchable_id = OLD.id; RETURN OLD; END; $$ LANGUAGE plpgsql;
-- HÃY DÙNG PHIÊN BẢN NÀY ĐỂ THAY THẾ CHO HÀM CŨ TRONG FILE s1.sql

CREATE OR REPLACE FUNCTION sync_project_to_global_search()
RETURNS TRIGGER AS $$
DECLARE
    all_partners_names_var TEXT;
    all_zones_text_var TEXT; -- << BIẾN MỚI ĐỂ LƯU THÔNG TIN PHÂN KHU
    final_url_var TEXT;
BEGIN
    -- Lấy tên các đối tác (giữ nguyên)
    SELECT string_agg(bp.name, ' ') INTO all_partners_names_var
    FROM "BusinessProjectParticipation" bpp
    JOIN "BusinessProfile" bp ON bpp.business_id = bp.id
    WHERE bpp.project_id = NEW.id;

    -- << PHẦN MỚI: Lấy và nối tên + mô tả của tất cả các phân khu thuộc dự án
    SELECT string_agg(zones.name || ' ' || zones.description, ' ') INTO all_zones_text_var
    FROM "ProjectZones" zones
    WHERE zones.project_id = NEW.id;

    final_url_var := '/du-an/' || NEW.slug;

    INSERT INTO global_search_index (
        searchable_id, searchable_type, title, description, url, image_url,
        published_date, price_from, price_to, price_unit, address_detail,
        sub_type_slug,
        fts_document
    ) VALUES (
        NEW.id, 'PROJECT', NEW.name, NEW.description, final_url_var, (NEW.images)[1],
        NEW.published_date, NEW.price_from, NEW.price_to, NEW.price_unit, NEW.address_detail,
        NEW.cached_project_type_slug,
        -- << PHẦN MỚI: Thêm thông tin phân khu vào fts_document với trọng số C
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.name, '')), 'A') ||
        setweight(to_tsvector('public.vietnamese', coalesce(all_partners_names_var, '')), 'B') ||
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.address_detail, '')), 'C') ||
        setweight(to_tsvector('public.vietnamese', coalesce(all_zones_text_var, '')), 'C') || -- << THÊM DỮ LIỆU PHÂN KHU VÀO ĐÂY
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.description, '')), 'D')
    )
    ON CONFLICT (searchable_id, searchable_type) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        url = EXCLUDED.url,
        image_url = EXCLUDED.image_url,
        published_date = EXCLUDED.published_date,
        price_from = EXCLUDED.price_from,
        price_to = EXCLUDED.price_to,
        price_unit = EXCLUDED.price_unit,
        address_detail = EXCLUDED.address_detail,
        sub_type_slug = EXCLUDED.sub_type_slug,
        fts_document = EXCLUDED.fts_document;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION sync_product_sale_to_global_search()
RETURNS TRIGGER AS $$
DECLARE
    final_url_var TEXT;
    project_name_var TEXT;
    project_address_var TEXT;
    developer_name_var TEXT;
BEGIN
    -- Lấy thông tin từ dự án cha
    SELECT name, address_detail INTO project_name_var, project_address_var FROM "Project" WHERE id = NEW.project_id;

    -- Lấy tên Chủ đầu tư của dự án đó
    SELECT string_agg(bp.name, ' ') INTO developer_name_var
    FROM "BusinessProjectParticipation" bpp
    JOIN "BusinessProfile" bp ON bpp.business_id = bp.id
    WHERE bpp.project_id = NEW.project_id AND bpp.role_in_project = 'Chủ đầu tư';

    final_url_var := '/ban/' || NEW.slug;
    
    INSERT INTO global_search_index (
        searchable_id, searchable_type, listing_type, title, description, url, image_url, 
        published_date, price_from, price_unit, address_detail, sub_type_slug, fts_document
    ) VALUES (
        NEW.id, 'PRODUCT_SALE', 'SALE', NEW.title, NEW.description, final_url_var, (NEW.images)[1],
        NEW.published_date, NEW.price, NEW.price_unit, NEW.address_detail, 
        NEW.cached_product_type_slug,
        -- Tạo fts_document đã bao gồm thông tin dự án và chủ đầu tư
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.title, '')), 'A') ||
        setweight(to_tsvector('public.vietnamese', coalesce(project_name_var, '')), 'B') ||
        setweight(to_tsvector('public.vietnamese', coalesce(developer_name_var, '')), 'B') ||
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.address_detail, project_address_var, '')), 'C') ||
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.description, '')), 'D')
    )
    ON CONFLICT (searchable_id, searchable_type) DO UPDATE
    SET listing_type = EXCLUDED.listing_type,
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        url = EXCLUDED.url,
        image_url = EXCLUDED.image_url,
        published_date = EXCLUDED.published_date,
        price_from = EXCLUDED.price_from,
        price_to = NULL,
        price_unit = EXCLUDED.price_unit,
        address_detail = EXCLUDED.address_detail,
        sub_type_slug = EXCLUDED.sub_type_slug,
        fts_document = EXCLUDED.fts_document;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION sync_product_rent_to_global_search()
RETURNS TRIGGER AS $$
DECLARE
    final_url_var TEXT;
    project_name_var TEXT;
    project_address_var TEXT;
    developer_name_var TEXT;
BEGIN
    -- Lấy thông tin từ dự án cha
    SELECT name, address_detail INTO project_name_var, project_address_var FROM "Project" WHERE id = NEW.project_id;

    -- Lấy tên Chủ đầu tư của dự án đó
    SELECT string_agg(bp.name, ' ') INTO developer_name_var
    FROM "BusinessProjectParticipation" bpp
    JOIN "BusinessProfile" bp ON bpp.business_id = bp.id
    WHERE bpp.project_id = NEW.project_id AND bpp.role_in_project = 'Chủ đầu tư';

    final_url_var := '/cho-thue/' || NEW.slug;
    
    INSERT INTO global_search_index (
        searchable_id, searchable_type, listing_type, title, description, url, image_url, 
        published_date, price_from, price_unit, address_detail, sub_type_slug, fts_document
    ) VALUES (
        NEW.id, 'PRODUCT_RENT', 'RENT', NEW.title, NEW.description, final_url_var, (NEW.images)[1],
        NEW.published_date, NEW.price, NEW.price_unit, NEW.address_detail, 
        NEW.cached_product_type_slug,
        -- Tạo fts_document đã bao gồm thông tin dự án và chủ đầu tư
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.title, '')), 'A') ||
        setweight(to_tsvector('public.vietnamese', coalesce(project_name_var, '')), 'B') ||
        setweight(to_tsvector('public.vietnamese', coalesce(developer_name_var, '')), 'B') ||
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.address_detail, project_address_var, '')), 'C') ||
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.description, '')), 'D')
    )
    ON CONFLICT (searchable_id, searchable_type) DO UPDATE
    SET listing_type = EXCLUDED.listing_type,
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        url = EXCLUDED.url,
        image_url = EXCLUDED.image_url,
        published_date = EXCLUDED.published_date,
        price_from = EXCLUDED.price_from,
        price_to = NULL,
        price_unit = EXCLUDED.price_unit,
        address_detail = EXCLUDED.address_detail,
        sub_type_slug = EXCLUDED.sub_type_slug,
        fts_document = EXCLUDED.fts_document;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sync_news_to_global_search() RETURNS TRIGGER AS $$
DECLARE
    final_url_var TEXT;
BEGIN
    final_url_var := '/tin-tuc/' || NEW.slug;
    INSERT INTO global_search_index (
        searchable_id, searchable_type, title, description, url, published_date, 
        sub_type_slug, 
        fts_document
    ) VALUES (
        NEW.id, 'NEWS_ARTICLE', NEW.title, NEW.description, final_url_var, NEW.published_date,
        NEW.cached_category_slug, -- << SỬA LẠI CHO ĐÚNG TÊN CỘT
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.title, '')), 'A') ||
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.description, '')), 'C') ||
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.content, '')), 'D')
    )
    ON CONFLICT (searchable_id, searchable_type) DO UPDATE
    SET title = EXCLUDED.title,
        description = EXCLUDED.description,
        url = EXCLUDED.url,
        published_date = EXCLUDED.published_date,
        sub_type_slug = EXCLUDED.sub_type_slug,
        fts_document = EXCLUDED.fts_document;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION sync_wiki_to_global_search() RETURNS TRIGGER AS $$ DECLARE final_url_var TEXT; BEGIN final_url_var := '/wiki/' || NEW.slug; INSERT INTO global_search_index (searchable_id, searchable_type, title, description, url, published_date, sub_type_slug, fts_document) VALUES ( NEW.id, 'WIKI_ARTICLE', NEW.title, NEW.description, final_url_var, NEW.published_date, NEW.cached_topic_slug, setweight(to_tsvector('public.vietnamese', coalesce(NEW.title, '')), 'A') || setweight(to_tsvector('public.vietnamese', coalesce(NEW.description, '')), 'C') || setweight(to_tsvector('public.vietnamese', coalesce(NEW.content, '')), 'D') ) ON CONFLICT (searchable_id, searchable_type) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, url = EXCLUDED.url, published_date = EXCLUDED.published_date, sub_type_slug = EXCLUDED.sub_type_slug, fts_document = EXCLUDED.fts_document; RETURN NEW; END; $$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION sync_business_to_global_search() RETURNS TRIGGER AS $$
DECLARE
    final_url_var TEXT;
BEGIN
    final_url_var := '/doanh-nghiep/' || NEW.slug;
    INSERT INTO global_search_index (
        searchable_id, searchable_type, title, description, url, published_date, 
        sub_type_slug, -- Thêm vào danh sách cột
        fts_document
    ) VALUES (
        NEW.id, 'BUSINESS_PROFILE', NEW.name, NEW.description, final_url_var, NEW.published_date,
        NEW.cached_business_type_slug, -- Thêm giá trị tương ứng
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.name, '')), 'A') ||
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.description, '')), 'C') ||
        setweight(to_tsvector('public.vietnamese', coalesce(NEW.content_detail, '')), 'D')
    )
    ON CONFLICT (searchable_id, searchable_type) DO UPDATE
    SET title = EXCLUDED.title,
        description = EXCLUDED.description,
        url = EXCLUDED.url,
        published_date = EXCLUDED.published_date,
        sub_type_slug = EXCLUDED.sub_type_slug, -- Thêm vào phần UPDATE
        fts_document = EXCLUDED.fts_document;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- DÁN HÀM NÀY VÀO CUỐI PHẦN 4 (PHẦN TẠO HÀM) TRONG FILE s1.sql

-- HÀM LÀM MỚI TOÀN BỘ CHỈ MỤC TÌM KIẾM
CREATE OR REPLACE FUNCTION refresh_all_fts_documents()
RETURNS VOID AS $$
BEGIN
    -- Kích hoạt trigger cho tất cả các bảng để xây dựng lại fts_document
    UPDATE "Project" SET id=id;
    UPDATE "ProductSale" SET id=id;
    UPDATE "ProductRent" SET id=id;
    UPDATE "NewsArticle" SET id=id;
    UPDATE "WikiArticle" SET id=id;
    UPDATE "BusinessProfile" SET id=id;
END;
$$ LANGUAGE plpgsql;
-- PHẦN 5: GẮN CÁC TRIGGER VÀO BẢNG
CREATE TRIGGER project_fts_trigger AFTER INSERT OR UPDATE ON "Project" FOR EACH ROW EXECUTE FUNCTION sync_project_to_global_search();
CREATE TRIGGER project_delete_fts_trigger AFTER DELETE ON "Project" FOR EACH ROW EXECUTE FUNCTION delete_from_global_search();
CREATE TRIGGER product_sale_fts_trigger AFTER INSERT OR UPDATE ON "ProductSale" FOR EACH ROW EXECUTE FUNCTION sync_product_sale_to_global_search();
CREATE TRIGGER product_sale_delete_fts_trigger AFTER DELETE ON "ProductSale" FOR EACH ROW EXECUTE FUNCTION delete_from_global_search();
CREATE TRIGGER product_rent_fts_trigger AFTER INSERT OR UPDATE ON "ProductRent" FOR EACH ROW EXECUTE FUNCTION sync_product_rent_to_global_search();
CREATE TRIGGER product_rent_delete_fts_trigger AFTER DELETE ON "ProductRent" FOR EACH ROW EXECUTE FUNCTION delete_from_global_search();
CREATE TRIGGER news_fts_trigger AFTER INSERT OR UPDATE ON "NewsArticle" FOR EACH ROW EXECUTE FUNCTION sync_news_to_global_search();
CREATE TRIGGER news_delete_fts_trigger AFTER DELETE ON "NewsArticle" FOR EACH ROW EXECUTE FUNCTION delete_from_global_search();
CREATE TRIGGER wiki_fts_trigger AFTER INSERT OR UPDATE ON "WikiArticle" FOR EACH ROW EXECUTE FUNCTION sync_wiki_to_global_search();
CREATE TRIGGER wiki_delete_fts_trigger AFTER DELETE ON "WikiArticle" FOR EACH ROW EXECUTE FUNCTION delete_from_global_search();
CREATE TRIGGER business_fts_trigger AFTER INSERT OR UPDATE ON "BusinessProfile" FOR EACH ROW EXECUTE FUNCTION sync_business_to_global_search();
CREATE TRIGGER business_delete_fts_trigger AFTER DELETE ON "BusinessProfile" FOR EACH ROW EXECUTE FUNCTION delete_from_global_search();