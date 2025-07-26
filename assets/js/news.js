// assets/js/news.js

document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra xem các biến dữ liệu đã tồn tại chưa
    if (typeof allNewsArticles === 'undefined' || typeof newsCategories === 'undefined') {
        console.error("Lỗi: Không tìm thấy dữ liệu Tin tức (allNewsArticles hoặc newsCategories).");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    // Lấy danh mục từ URL, nếu không có thì mặc định là 'thi-truong'
    const categorySlug = urlParams.get('danh-muc') || 'thi-truong';

    // Lấy các phần tử trên trang để cập nhật
    const gridContainer = document.querySelector('.article-list');
    const categoryTitleEl = document.querySelector('.category-header h1');
    const categoryDescEl = document.querySelector('.category-header p');
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    
    // [ĐÃ SỬA] Loại bỏ biến và kiểm tra cho 'tabsContainer'
    if (!gridContainer || !categoryTitleEl || !breadcrumbContainer) {
        console.error("Lỗi: Thiếu các thành phần HTML quan trọng (grid, header, breadcrumb).");
        return;
    }
    
    // Lọc ra các bài viết thuộc danh mục đang chọn
    const articlesToShow = allNewsArticles.filter(article => article.category === categorySlug);

    // Gọi các hàm để cập nhật giao diện
    updatePageInfo(categorySlug);
    displayArticles(articlesToShow);
    // [ĐÃ XÓA] Lời gọi hàm displayCategoryTabs(categorySlug);

    /**
     * Cập nhật tiêu đề trang, H1, mô tả và breadcrumb
     * @param {string} slug - Slug của danh mục hiện tại
     */
     function updatePageInfo(slug) {
        const category = newsCategories[slug];
        if (!category) return;

        document.title = `Tin tức ${category.name} - Chung Cư Tốt`;
        categoryTitleEl.textContent = `Tin tức ${category.name}`;
        if(categoryDescEl) categoryDescEl.textContent = category.description;

        const breadcrumbText = `Tin tức - ${category.name}`;
        breadcrumbContainer.innerHTML = `<span class="breadcrumb-item-no-link">${breadcrumbText}</span>`;
    }


    /**
     * Hiển thị danh sách các bài viết ra grid
     * @param {Array} articles - Mảng các bài viết cần hiển thị
     */
    function displayArticles(articles) {
        gridContainer.innerHTML = ''; 
        if (articles.length === 0) {
            gridContainer.innerHTML = `<p style="text-align: center; padding: 20px;">Chưa có bài viết nào trong danh mục này.</p>`;
            return;
        }
        articles.forEach(article => {
            const articleLink = `bai-viet-chi-tiet.html?id=${article.id}`;
            const date = new Date(article.datePublished);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            const card = document.createElement('article');
            card.className = 'article-card';
            
            card.innerHTML = `
                <a href="${articleLink}" class="article-thumbnail">
                    <img src="${article.image}" alt="${article.title}">
                </a>
                <div class="article-content">
                    <h2 class="article-title"><a href="${articleLink}">${article.title}</a></h2>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-meta">
                        bởi <a href="#" class="author-link">${article.author}</a> | Cập nhật: ${formattedDate}
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }

    /**
     * [ĐÃ XÓA] Toàn bộ hàm displayCategoryTabs đã được loại bỏ.
     */
    
});