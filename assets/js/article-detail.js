// assets/js/article-detail.js (Hoàn thiện - Gộp Breadcrumb cho tất cả các loại bài viết)

document.addEventListener('DOMContentLoaded', function () {
    // --- 1. TỔNG HỢP DỮ LIỆU TỪ CÁC NGUỒN ---
    const allArticles = {};

    // Nguồn dữ liệu từ Wiki
    if (typeof allWikiArticles !== 'undefined') {
        allWikiArticles.forEach(article => {
            allArticles[article.id] = { ...article, menuKey: 'wiki' };
        });
    }
    // Nguồn dữ liệu từ Tin tức
    if (typeof allNewsArticles !== 'undefined') {
        allNewsArticles.forEach(article => {
            allArticles[article.id] = { ...article, menuKey: 'news' };
        });
    }

    // --- 2. DỮ LIỆU ĐỂ TRA CỨU TÊN HIỂN THỊ ---
    const menuInfo = {
        'wiki': { name: 'Wiki', page: 'wiki.html' },
        'news': { name: 'Tin tức', page: 'news.html' },
        // Thêm các menu khác nếu cần
    };
    
    const allCategoriesLookup = {
        ...(typeof wikiCategories !== 'undefined' ? wikiCategories : {}),
        ...(typeof newsCategories !== 'undefined' ? newsCategories : {})
    };

    // --- 3. LẤY ID BÀI VIẾT VÀ TÌM DỮ LIỆU ---
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const article = allArticles[articleId];

    // Nếu không tìm thấy bài viết, hiển thị lỗi và dừng lại
    if (!article) {
        const mainColumn = document.querySelector('.main-column');
        if (mainColumn) mainColumn.innerHTML = '<p style="text-align:center; padding: 40px;">Lỗi: Bài viết không tồn tại hoặc đã bị xóa.</p>';
        return; 
    }

    // --- 4. CÁC HÀM CẬP NHẬT GIAO DIỆN ---
    
    function populateArticleData(articleData) {
        document.title = `${articleData.title} - Chung Cư Tốt`;
        const titleEl = document.querySelector('.article-detail h1');
        const authorEl = document.querySelector('.article-meta .author-link');
        const dateContainerEl = document.querySelector('.article-meta');
        const imageEl = document.querySelector('.featured-image-detail');
        const imageLinkEl = imageEl ? imageEl.closest('.lightbox-trigger') : null;

        if (titleEl) titleEl.textContent = articleData.title;
        if (authorEl) authorEl.textContent = articleData.author;

        if (dateContainerEl && articleData.datePublished) {
            const date = new Date(articleData.datePublished);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            dateContainerEl.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.includes('Cập nhật:')) {
                    node.textContent = ` | Cập nhật: ${formattedDate}`;
                }
            });
        }
        
        if (imageEl) { imageEl.src = articleData.image; imageEl.alt = articleData.title; }
        if (imageLinkEl) { imageLinkEl.setAttribute('data-src', articleData.image); }
    }

    function updateBreadcrumb(articleData) {
        const breadcrumbContainer = document.querySelector('.breadcrumb');
        if (!breadcrumbContainer) return;

        const menu = menuInfo[articleData.menuKey];
        const category = allCategoriesLookup[articleData.category];
        
        if (menu && category) {
            const breadcrumbParts = [];
            const categoryLink = `${menu.page}?danh-muc=${articleData.category}`;
            const combinedText = `${menu.name} - ${category.name}`;

            // Gộp Menu và Danh mục thành một liên kết duy nhất
            breadcrumbParts.push(`<a href="${categoryLink}">${combinedText}</a>`);
            // Cấp cuối cùng là tiêu đề bài viết, không có link
            breadcrumbParts.push(`<span>${articleData.title}</span>`);
            
            breadcrumbContainer.innerHTML = breadcrumbParts.join(' &gt; ');
        }
    }

    // --- 5. KHỞI CHẠY CÁC HÀM ---
    populateArticleData(article);
    updateBreadcrumb(article);
});