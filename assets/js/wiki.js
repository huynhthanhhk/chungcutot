// assets/js/wiki.js

document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra xem các biến dữ liệu đã tồn tại chưa
    if (typeof allWikiArticles === 'undefined' || typeof wikiCategories === 'undefined') {
        console.error("Lỗi: Không tìm thấy dữ liệu Wiki (allWikiArticles hoặc wikiCategories).");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    // Lấy danh mục từ URL, nếu không có thì mặc định là 'phap-ly'
    const categorySlug = urlParams.get('danh-muc') || 'phap-ly';

    // Lấy các phần tử trên trang để cập nhật
    const gridContainer = document.querySelector('.wiki-grid');
    const categoryTitleEl = document.querySelector('.category-header h1');
    const categoryDescEl = document.querySelector('.category-header p');
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    const sidebarList = document.querySelector('.sidebar-column .widget ul');

    // Nếu không tìm thấy các vùng chứa chính, dừng lại
    if (!gridContainer || !categoryTitleEl || !breadcrumbContainer || !sidebarList) {
        console.error("Lỗi: Thiếu các thành phần HTML quan trọng (grid, header, breadcrumb, sidebar).");
        return;
    }
    
    // Lọc ra các bài viết thuộc danh mục đang chọn
    const articlesToShow = allWikiArticles.filter(article => article.category === categorySlug);

    // Gọi các hàm để cập nhật giao diện
    updatePageInfo(categorySlug);
    displayArticles(articlesToShow);
    displaySidebar(categorySlug);

    /**
     * Cập nhật tiêu đề trang, H1, mô tả và breadcrumb
     * @param {string} slug - Slug của danh mục hiện tại
     */
    function updatePageInfo(slug) {
        const category = wikiCategories[slug];
        if (!category) return;

        document.title = `${category.name} - Wiki - Chung Cư Tốt`;
        categoryTitleEl.textContent = `Wiki ${category.name}`;
        if(categoryDescEl) categoryDescEl.textContent = category.description;

        // Tạo breadcrumb động
        const breadcrumbText = `Wiki - ${category.name}`;
        breadcrumbContainer.innerHTML = `<span class="breadcrumb-item-no-link">${breadcrumbText}</span>`;
    }

    /**
     * Hiển thị danh sách các bài viết ra grid
     * @param {Array} articles - Mảng các bài viết cần hiển thị
     */
    function displayArticles(articles) {
        gridContainer.innerHTML = ''; 
        if (articles.length === 0) {
            gridContainer.innerHTML = `<p style="text-align: center; grid-column: 1 / -1; padding: 20px;">Chưa có bài viết nào trong danh mục này.</p>`;
            return;
        }

        articles.forEach(article => {
            // Tạo link cho bài viết chi tiết
            const articleLink = `bai-viet-chi-tiet.html?id=${article.id}`;
            const card = document.createElement('a');
            card.href = articleLink;
            card.className = 'wiki-card';
            card.innerHTML = `
                <div class="wiki-card-image">
                    <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="wiki-card-content">
                    <h3 class="wiki-card-title">${article.title}</h3>
                    <p class="wiki-card-excerpt">${article.excerpt}</p>
                    <span class="wiki-card-cta">Đọc bài viết →</span>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }

    /**
     * Hiển thị danh sách các danh mục trong sidebar
     * @param {string} currentSlug - Slug của danh mục đang active để highlight
     */
    function displaySidebar(currentSlug) {
        sidebarList.innerHTML = '';
        for (const slug in wikiCategories) {
            const category = wikiCategories[slug];
            const link = `wiki.html?danh-muc=${slug}`;
            const isActive = slug === currentSlug ? 'class="active"' : '';
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${link}" ${isActive}>${category.name}</a>`;
            sidebarList.appendChild(listItem);
        }
    }
});