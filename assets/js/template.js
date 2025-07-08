

const headerHTML = `
    <div id="menu-overlay" class="menu-overlay"></div>
    <header class="header-wrapper">
        <div class="header-footer-limiter">
            <div class="site-header">
                <button class="hamburger-button" id="hamburger-button" aria-label="Mở menu">
                    <span class="bar"></span><span class="bar"></span><span class="bar"></span>
                </button>
                <a href="index.html" class="logo-link"><img src="assets/images/logo.png" alt="Logo Chung Cư Tốt" class="logo"></a>
                <nav class="main-nav" id="main-nav">
                    <ul id="main-menu-list"></ul>
                </nav>
                <div class="header-actions">
                    <a href="favorites.html" class="header-favorite-btn" aria-label="Danh sách yêu thích">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                        <span class="favorite-counter">0</span>
                    </a>
                    <a href="#" class="search-button-new" aria-label="Tìm kiếm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </header>
`;

// Hàm chèn header và kích hoạt tính năng Sticky
function loadHeaderAndStickyFeature() {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    // 1. Chèn HTML
    placeholder.innerHTML = headerHTML;

    // 2. Kích hoạt Sticky ngay sau khi chèn
   
}

// Chạy hàm này ngay khi script được tải
loadHeaderAndStickyFeature();
