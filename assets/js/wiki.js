// assets/js/wiki.js

document.addEventListener('DOMContentLoaded', function () {
    if (typeof allWikiArticles === 'undefined' || typeof wikiCategories === 'undefined') {
        console.error("Lỗi: Không tìm thấy dữ liệu Wiki (allWikiArticles hoặc wikiCategories).");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    // SỬA Ở ĐÂY: Đổi 'danhmuc' thành 'danh-muc' để khớp với yêu cầu
    const categorySlug = urlParams.get('danh-muc'); 

    const gridContainer = document.getElementById('wiki-grid-container');
    const categoryTitleEl = document.getElementById('wiki-category-title');
    const categoryDescEl = document.getElementById('wiki-category-description');
    const breadcrumbCategoryNameEl = document.getElementById('breadcrumb-category-name');
    const sidebarContainer = document.getElementById('sidebar-container');

    if (!categorySlug || !wikiCategories[categorySlug]) {
        displayError("Danh mục không hợp lệ hoặc không tồn tại.");
        return;
    }
    
    const articlesToShow = allWikiArticles.filter(article => article.category === categorySlug);

    updatePageInfo(categorySlug);
    displayArticles(articlesToShow);
    displaySidebar();

    function displayError(message) {
        if (gridContainer) {
            gridContainer.innerHTML = `<p style="text-align: center; padding: 20px;">${message}</p>`;
        }
        if (categoryTitleEl) {
            categoryTitleEl.textContent = "Lỗi";
        }
    }

    function updatePageInfo(slug) {
        const category = wikiCategories[slug];
        document.title = `${category.name} - Wiki - Chung Cư Tốt`;
        categoryTitleEl.textContent = category.name;
        categoryDescEl.textContent = category.description;
        breadcrumbCategoryNameEl.textContent = category.name;
    }

    function displayArticles(articles) {
        gridContainer.innerHTML = ''; 
        if (articles.length === 0) {
            gridContainer.innerHTML = `<p style="text-align: center; padding: 20px;">Chưa có bài viết nào trong danh mục này.</p>`;
            return;
        }

        articles.forEach(article => {
            const card = document.createElement('a');
            card.href = article.link;
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

    function displaySidebar() {
        if (!sidebarContainer) return;

        let linksHTML = '';
        for (const slug in wikiCategories) {
            const category = wikiCategories[slug];
            // SỬA Ở ĐÂY: Dùng đúng tên tham số 'danh-muc' khi tạo link
            const link = `wiki.html?danh-muc=${slug}`;
            const isActive = slug === categorySlug ? 'class="active"' : '';
            linksHTML += `<li><a href="${link}" ${isActive}>${category.name}</a></li>`;
        }

        sidebarContainer.innerHTML = `
            <div class="widget">
                <h3 class="widget-title">Chủ đề Wiki</h3>
                <ul>${linksHTML}</ul>
            </div>
            <div class="widget">
                <h3 class="widget-title">Quảng cáo</h3>
                <a href="#"><img src="https://placehold.co/300x400/eeeeee/333333?text=Banner+Quảng+Cáo" alt="Quảng cáo" style="border-radius: 8px;"></a>
            </div>
        `;
    }
});