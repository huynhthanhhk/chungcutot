// assets/js/listing.js

function removeFavorite(itemId) {
    let favorites = getFavorites();
    favorites = favorites.filter(item => item.id !== itemId);
    saveFavorites(favorites);
    updateAllFavoriteButtons();
    updateFavoriteCounter();
    renderFavoritesDrawer(); 
}

function clearAllFavorites() {
    if (confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm yêu thích không?")) {
        saveFavorites([]);
        updateAllFavoriteButtons();
        updateFavoriteCounter();
        renderFavoritesDrawer();
    }
}

const FAVORITES_KEY = 'savedFavorites_v2';
function getFavorites() { return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []; }
function saveFavorites(favorites) { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); }
function isFavorite(itemId) { return getFavorites().some(item => item.id === itemId); }

function updateFavoriteCounter() {
    const counter = document.querySelector('.favorite-counter');
    if (!counter) return;
    const favoritesCount = getFavorites().length;
    counter.textContent = favoritesCount;
    counter.classList.toggle('visible', favoritesCount > 0);
}

function updateAllFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach(button => {
        const itemId = button.dataset.itemId;
        if (itemId) {
            button.classList.toggle('active', isFavorite(itemId));
        }
    });
}

function handleFavoriteClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const button = event.currentTarget;
    const productCard = button.closest('.product-list-card');
    const itemId = button.dataset.itemId;
    if (!productCard || !itemId) return;
    const titleElement = productCard.querySelector('.product-card-title');
    const imageElement = productCard.querySelector('.product-card-image img');
    const itemData = {
        id: itemId,
        title: titleElement ? titleElement.textContent.trim() : 'N/A',
        thumbnail: imageElement ? imageElement.getAttribute('src') : '',
        url: productCard.getAttribute('href') || '#'
    };
    let favorites = getFavorites();
    if (isFavorite(itemId)) {
        favorites = favorites.filter(item => item.id !== itemId);
    } else {
        favorites.push(itemData);
    }
    saveFavorites(favorites);
    updateAllFavoriteButtons();
    updateFavoriteCounter();
}

function renderFavoritesDrawer() {
    const drawerContainer = document.getElementById('favorites-drawer-container');
    if (!drawerContainer) return;
    const drawerContent = drawerContainer.querySelector('.drawer-content');
    if (!drawerContent) return;
    
    const favorites = getFavorites();
    let drawerHeaderContent = `
        <div class="drawer-actions">
            <button class="clear-favorites-btn" title="Xóa tất cả">
                <svg fill="currentColor" viewBox="0 0 16 16" width="16" height="16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
                <span>Xóa tất cả</span>
            </button>
        </div>
    `;
    if (favorites.length === 0) {
        drawerContent.innerHTML = '<p class="favorites-empty-message">Chưa có sản phẩm nào được yêu thích.</p>';
    } else {
        let itemsHTML = '';
        favorites.forEach(item => {
            itemsHTML += `
                <div class="favorite-item-wrapper">
                    <a href="${item.url}" class="favorite-item">
                        <img src="${item.thumbnail}" class="favorite-item-thumb" alt="${item.title}">
                        <span class="favorite-item-title">${item.title}</span>
                    </a>
                    <button class="remove-favorite-item-btn" data-item-id="${item.id}" title="Xóa sản phẩm này">×</button>
                </div>
            `;
        });
        drawerContent.innerHTML = drawerHeaderContent + itemsHTML;
    }
    const drawerFooterLink = drawerContainer.querySelector('.drawer-footer a');
    if (drawerFooterLink) {
        drawerFooterLink.textContent = `Xem tất cả (${favorites.length}) sản phẩm yêu thích`;
    }
}

function initFavoritesDrawer() {
    const favBtn = document.querySelector('.header-favorite-btn');
    const drawerContainer = document.getElementById('favorites-drawer-container');
    if (!favBtn || !drawerContainer) return;

    const closeBtn = drawerContainer.querySelector('.drawer-close-btn');
    const overlay = drawerContainer.querySelector('.favorites-drawer-overlay');
    if(!closeBtn || !overlay) return;

    const openDrawer = () => {
        renderFavoritesDrawer();
        drawerContainer.classList.add('is-open');
        document.body.classList.add('drawer-open');
    };
    const closeDrawer = () => {
        drawerContainer.classList.remove('is-open');
        document.body.classList.remove('drawer-open');
    };

    favBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
    });
    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    drawerContainer.addEventListener('click', function(event) {
        if (event.target.matches('.remove-favorite-item-btn')) {
            const itemId = event.target.dataset.itemId;
            if (itemId) removeFavorite(itemId);
        }
        if (event.target.closest('.clear-favorites-btn')) {
            clearAllFavorites();
        }
    });
}

const toSlug = (str) => {
    if (!str) return '';
    let s = str.toLowerCase();

    // Xử lý các trường hợp đặc biệt cho thành phố lớn để khớp với URL
    if (s === 'hồ chí minh') return 'tp-ho-chi-minh';
    if (s === 'hà nội') return 'tp-ha-noi';
    if (s === 'đà nẵng') return 'tp-da-nang';
    if (s === 'cần thơ') return 'tp-can-tho';
    if (s === 'hải phòng') return 'tp-hai-phong';

    // Logic chuyển đổi slug chung
    s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    s = s.replace(/[đĐ]/g, 'd');
    s = s.replace(/([^0-9a-z-\s])/g, '');
    s = s.replace(/(\s+)/g, '-');
    s = s.replace(/-+/g, '-');
    s = s.replace(/^-+|-+$/g, '');
    return s;
};

document.addEventListener('DOMContentLoaded', function () {
    let dataSource;
    const isRentalPage = window.location.pathname.includes('listing-thue.html');

    if (isRentalPage) {
        if (typeof allRentalProductsData !== 'undefined') {
            dataSource = allRentalProductsData;
        }
    } else {
        if (typeof allProductsData !== 'undefined') {
            dataSource = allProductsData;
        }
    }

    initFavoritesDrawer();
    updateFavoriteCounter();
    
    const gridContainer = document.querySelector('.product-listing-grid');
    const paginationContainer = document.querySelector('.pagination');
    const sortSelect = document.getElementById('sort-select');
    const searchForm = document.querySelector('form.search-form');
    const searchInput = document.querySelector('form.search-form input[type="search"]');
    const resultsCountElement = document.querySelector('.results-count');
    const sidebar = document.getElementById('listing-filter-sidebar');
    const applyFilterBtn = sidebar ? sidebar.querySelector('.filter-apply-btn') : null;
    const resetBtn = sidebar ? sidebar.querySelector('.filter-reset-btn') : null;
    const filterTagArea = sidebar ? sidebar.querySelector('.filter-tag-area') : null;
    
    if (!gridContainer || !sidebar || !applyFilterBtn || !searchInput || typeof dataSource === 'undefined') {
        console.error("Thiếu các thành phần HTML quan trọng hoặc không tìm thấy dữ liệu sản phẩm (dataSource). Script sẽ không chạy.");
        if (gridContainer) {
            gridContainer.innerHTML = '<p class="no-results-message" style="grid-column: 1 / -1; text-align: center; padding: 20px;">Lỗi: Không thể tải dữ liệu sản phẩm.</p>';
        }
        return;
    }

    // Helper function to remove Vietnamese diacritics
    const removeDiacritics = (str) => {
        if (!str) return '';
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[đĐ]/g, 'd');
    };

    const allItems = Object.values(dataSource).map(p => {
        // 1. Tập hợp tất cả các thông tin văn bản có thể tìm kiếm vào một mảng
        const textParts = [];
        if (p.title) textParts.push(p.title);
        if (p.project) textParts.push(p.project);

        // 2. Thêm địa chỉ và các biến thể có tiền tố (ví dụ: "đường abc", "phường xyz")
        if (p.street) {
            textParts.push(p.street);
            textParts.push(`đường ${p.street}`);
            textParts.push(`phố ${p.street}`);
        }
        if (p.ward) {
            textParts.push(p.ward);
            textParts.push(`phường ${p.ward}`);
            textParts.push(`xã ${p.ward}`);
        }
        if (p.city) {
            textParts.push(p.city);
            textParts.push(`quận ${p.city}`);
            textParts.push(`huyện ${p.city}`);
            textParts.push(`thành phố ${p.city}`);
            textParts.push(`tỉnh ${p.city}`);
        }

        // 3. Nối tất cả lại, chuyển thành chữ thường và loại bỏ toàn bộ dấu
        // Thao tác này tạo ra một chuỗi tìm kiếm duy nhất, đã được chuẩn hóa hoàn toàn.
        const searchableString = removeDiacritics(textParts.join(' '));

        return {
            ...p,
            date: new Date(p.publishedAt),
            searchableString: searchableString
        };
    });
    
    // Tạo các bảng tra cứu để chuyển slug -> tên có dấu
    // Tạo các bảng tra cứu để chuyển slug -> tên có dấu và dữ liệu gợi ý
    const cityLookup = {};
    const wardLookup = {};
    const categoryLookup = {};
    const streetLookup = {}; // <-- THÊM MỚI
    const locations = { streets: {}, wards: {} }; // Đã khai báo `locations`

    allItems.forEach(item => {
        // Dữ liệu cho breadcrumb và lọc URL
        if (item.city) {
            cityLookup[toSlug(item.city)] = item.city;
        }
        if (item.ward) {
            wardLookup[toSlug(item.ward)] = item.ward;
        }
        if (item.productCategory) {
            categoryLookup[toSlug(item.productCategory)] = item.productCategory;
        }

        // Dữ liệu cho tính năng gợi ý tìm kiếm (đã sửa lỗi)
        if (item.street && !locations.streets[item.street]) {
            locations.streets[item.street] = item.ward;
        }
        if (item.ward && !locations.wards[item.ward]) {
            locations.wards[item.ward] = item.city;
        }
        if (item.street) {
        streetLookup[toSlug(item.street)] = item.street;
    }
    });

    let visibleItems = [...allItems];
    let currentPage = 1;
    const itemsPerPage = 10;
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    function renderSuggestions(query = '') {
        if (!suggestionsContainer) return;

        // Chuẩn hóa truy vấn của người dùng (xóa dấu, chuyển thành chữ thường)
        const removeDiacritics = (str) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd');
        const normalizedQuery = removeDiacritics(query.trim());

        let matchingStreets = [];
        let matchingWards = [];

        // Chỉ tìm kiếm nếu người dùng đã gõ gì đó
        if (normalizedQuery.length > 0) {
            
            // Tìm các đường phố khớp với truy vấn
            matchingStreets = Object.keys(locations.streets).filter(street => {
                const unaccentedStreet = removeDiacritics(street);
                // Kiểm tra xem truy vấn có khớp với tên đường, hoặc tên đường có tiền tố "đường/phố" hay không
                return unaccentedStreet.includes(normalizedQuery) || 
                       `duong ${unaccentedStreet}`.includes(normalizedQuery) || 
                       `pho ${unaccentedStreet}`.includes(normalizedQuery);
            });

            // Tìm các phường/xã khớp với truy vấn
            matchingWards = Object.keys(locations.wards).filter(ward => {
                const unaccentedWard = removeDiacritics(ward);
                // Kiểm tra xem truy vấn có khớp với tên phường/xã, hoặc có tiền tố "phường/xã" hay không
                return unaccentedWard.includes(normalizedQuery) || 
                       `phuong ${unaccentedWard}`.includes(normalizedQuery) || 
                       `xa ${unaccentedWard}`.includes(normalizedQuery);
            });

        } else { 
            // Nếu ô tìm kiếm trống, hiển thị gợi ý mặc định
            matchingWards = Object.keys(locations.wards).slice(0, 5);
        }

        // --- Phần hiển thị HTML giữ nguyên ---
        let html = '';
        if (matchingStreets.length > 0) {
            html += '<div class="suggestions-group"><h5 class="suggestions-group-title">-- Đường Phố --</h5><ul class="suggestions-list">';
            matchingStreets.slice(0, 5).forEach(street => {
                const parentWard = locations.streets[street];
                html += `<li><a href="#" data-type="street" data-street="${street}" data-ward="${parentWard}">
                    <span class="suggestion-icon">🛣️</span> ${street} <span>(P. ${parentWard})</span>
                </a></li>`;
            });
            html += '</ul></div>';
        }
        if (matchingWards.length > 0) {
            html += '<div class="suggestions-group"><h5 class="suggestions-group-title">-- Phường / Quận --</h5><ul class="suggestions-list">';
            matchingWards.slice(0, 5).forEach(ward => {
                const parentCity = locations.wards[ward];
                html += `<li><a href="#" data-type="ward" data-ward="${ward}" data-city="${parentCity}">
                    <span class="suggestion-icon">📍</span> Phường ${ward} <span>(thuộc ${parentCity})</span>
                </a></li>`;
            });
            html += '</ul></div>';
        }

        suggestionsContainer.innerHTML = html;
        suggestionsContainer.classList.toggle('visible', html !== '');
    }
function handleSuggestionClick(e) {
    if (e.target.tagName === 'A' || e.target.closest('a')) {
        e.preventDefault();
        const link = e.target.closest('a');
        const type = link.dataset.type;
        const urlParams = new URLSearchParams();
        const page = isRentalPage ? 'listing-thue.html' : 'listing-ban.html';
        const categorySlug = Object.keys(categoryLookup).find(key => categoryLookup[key] === 'Căn hộ');

        // Logic được cập nhật cho cả cấp Đường và cấp Phường
        if (type === 'street') {
            const street = link.dataset.street;
            const ward = link.dataset.ward;
            const city = locations.wards[ward]; // Lấy thành phố từ phường cha

            // Xây dựng URL đầy đủ
            if (categorySlug) urlParams.set('loaihinh', categorySlug);
            if (city) urlParams.set('thanhpho', toSlug(city));
            if (ward) urlParams.set('phuong', toSlug(ward));
            if (street) urlParams.set('duong', toSlug(street)); // Thêm tham số 'duong'

            // Chuyển hướng đến URL mới
            window.location.href = `${page}?${urlParams.toString()}`;

        } else if (type === 'ward') {
            const ward = link.dataset.ward;
            const city = link.dataset.city;

            // Xây dựng URL
            if (categorySlug) urlParams.set('loaihinh', categorySlug);
            if (city) urlParams.set('thanhpho', toSlug(city));
            if (ward) urlParams.set('phuong', toSlug(ward));
            
            // Chuyển hướng đến URL mới
            window.location.href = `${page}?${urlParams.toString()}`;
        }
        
        suggestionsContainer.classList.remove('visible');
    }
}

    searchInput.addEventListener('focus', () => renderSuggestions(searchInput.value));
    searchInput.addEventListener('input', () => renderSuggestions(searchInput.value));
    document.addEventListener('click', (e) => {
        if (!searchInput.parentElement.contains(e.target)) {
            suggestionsContainer.classList.remove('visible');
        }
    });
    suggestionsContainer.addEventListener('mousedown', handleSuggestionClick);
    function createProductCardHTML(item) {
        const address = `${item.street}, ${item.ward}, ${item.city}`;
        let labelHTML = '';
        if (item.status && item.status.trim() !== '') {
            let labelClass = '';
            const statusLower = item.status.toLowerCase();
            if (statusLower.includes('giá tốt') || statusLower.includes('duy nhất')) { 
                labelClass = 'label-good-price'; 
            } else if (statusLower.includes('đã bán') || statusLower.includes('đã cho thuê')) { 
                labelClass = 'label-sold'; 
            }
            if (labelClass) { 
                labelHTML = `<span class="product-label ${labelClass}">${item.status}</span>`; 
            }
        }
        const imageUrl = (Array.isArray(item.images) && item.images.length > 0) ? item.images[0] : 'placeholder.jpg';
        const imageCount = (Array.isArray(item.images)) ? item.images.length : 0;
        
        const priceDisplay = (item.propertyType === 'Thuê' || item.propertyType === 'Cho thuê')
            ? `${item.price.toLocaleString('vi-VN')} triệu/tháng` 
            : `${item.price.toLocaleString('vi-VN')} tỷ`;

        return `
            <a href="product-detail.html?id=${item.id}" class="product-list-card">
                <div class="product-card-image">
                    <img src="assets/images/${imageUrl}" alt="${item.title}" onerror="this.onerror=null;this.src='https://placehold.co/400x300/e2e8f0/e2e8f0?text=Lỗi+Ảnh';">
                    ${labelHTML}
                    <div class="image-overlay-top">
                        <button class="favorite-btn" data-item-id="${item.id}" title="Thêm vào yêu thích">
                        <svg class="heart-outline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></svg>
                        <svg class="heart-solid" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                        </button>
                    </div>
                    <div class="image-overlay-bottom">
                        <div class="image-count"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"></path></svg><span>${imageCount}</span></div>
                    </div>
                </div>
                <div class="product-card-content">
                    <h3 class="product-card-title">${item.title}</h3>
                    <p class="product-card-address">${address}</p>
                    <div class="product-price-specs-wrapper">
                        <div class="product-card-price">${priceDisplay}</div>
                        <div class="product-card-specs-inline">
                            <span>${item.bedrooms} PN</span><span>${item.wc} WC</span><span>${item.area} m²</span>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }

    function showPage(page) {
            currentPage = page;
            resultsCountElement.textContent = `Tìm thấy ${visibleItems.length} bất động sản`;
            gridContainer.innerHTML = '';
            if (visibleItems.length === 0) {
                gridContainer.innerHTML = '<p class="no-results-message" style="grid-column: 1 / -1; text-align: center; padding: 20px;">Không tìm thấy sản phẩm nào phù hợp.</p>';
                paginationContainer.innerHTML = '';
                return;
            }
            const pageItems = visibleItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);
            gridContainer.innerHTML = pageItems.map(createProductCardHTML).join('');
            gridContainer.querySelectorAll('.favorite-btn').forEach(button => { button.addEventListener('click', handleFavoriteClick); });
            updateAllFavoriteButtons();
            updatePaginationLinks();
    }
    
    function updatePaginationLinks() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(visibleItems.length / itemsPerPage);
        if (totalPages <= 1) return;
        
        for (let i = 1; i <= totalPages; i++) {
            const link = document.createElement('a');
            link.href = '#'; 
            link.textContent = i;
            if (i === currentPage) link.classList.add('active');
            link.addEventListener('click', (e) => {
                e.preventDefault(); 
                showPage(i);
                document.querySelector('.results-summary')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            paginationContainer.appendChild(link);
        }
    }

    function parseTextToRange(text) { const numbers = text.match(/\d+(\.\d+)?/g)?.map(Number) || []; if (text.includes('Dưới')) return { min: 0, max: numbers[0] || null }; if (text.includes('Trên')) return { min: numbers[0] || null, max: Infinity }; if (numbers.length === 2) return { min: numbers[0], max: numbers[1] }; return { min: null, max: null }; }
    function getButtonGroupFilterValue(groupSelector) { const activeBtn = sidebar.querySelector(`${groupSelector} .btn-group button.active`); if (activeBtn && activeBtn.textContent.toLowerCase() !== 'tất cả') return parseInt(activeBtn.textContent, 10); return null; }
    function getCheckboxFilterValues(groupSelector) { return Array.from(sidebar.querySelectorAll(`${groupSelector} .checkbox-group input:checked`)).map(cb => cb.dataset.value); }
    function getRangeFilter(groupSelector) { const group = sidebar.querySelector(groupSelector); const result = { min: null, max: null }; const activeTab = group.querySelector('.price-tab-btn.active'); const tabContentId = activeTab ? activeTab.dataset.target : null; if (tabContentId && document.getElementById(tabContentId)?.classList.contains('active')) { const activeContent = document.getElementById(tabContentId); if (tabContentId.includes('quick-select')) { const activeBtn = activeContent.querySelector('button.active'); if (activeBtn && activeBtn.textContent.toLowerCase() !== 'tất cả') return parseTextToRange(activeBtn.textContent); } else if (tabContentId.includes('custom-range')) { const minInput = activeContent.querySelector('.filter-input-min'); const maxInput = activeContent.querySelector('.filter-input-max'); const minVal = parseFloat(minInput.value); const maxVal = parseFloat(maxInput.value); if (!isNaN(minVal) && !isNaN(maxVal) && maxVal < minVal) { alert('Giá trị "Đến" phải lớn hơn hoặc bằng giá trị "Từ".'); maxInput.value = ''; } result.min = isNaN(minVal) ? null : minVal; result.max = isNaN(maxVal) ? null : maxVal; } } return result; }
    

// Thay thế toàn bộ hàm applyAllFilters cũ bằng hàm này
function applyAllFilters() { 
    const urlParams = new URLSearchParams(window.location.search);
    const loaiHinhSlugFromUrl = urlParams.get('loaihinh');
    const citySlugFromUrl = urlParams.get('thanhpho');
    const wardSlugFromUrl = urlParams.get('phuong');
    const duongSlugFromUrl = urlParams.get('duong'); // <-- THÊM MỚI: Đọc tham số đường

    const priceFilter = getRangeFilter('[data-filter-name="price"]'); 
    const areaFilter = getRangeFilter('[data-filter-name="area"]'); 
    const bedroomsFilter = getButtonGroupFilterValue('[data-filter-name="bedrooms"]'); 
    const wcFilter = getButtonGroupFilterValue('[data-filter-name="wc"]'); 
    const furnitureFilter = getCheckboxFilterValues('[data-filter-name="furniture"]'); 
    const directionFilter = getCheckboxFilterValues('[data-filter-name="direction"]'); 
    const legalFilter = getCheckboxFilterValues('[data-filter-name="legal"]');
    const leaseTermFilter = getCheckboxFilterValues('[data-filter-name="leaseTerm"]');
    
    const removeDiacritics = (str) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd');
    const searchTerm = removeDiacritics(searchInput.value.trim());
    const searchTokens = searchTerm.split(/\s+/).filter(token => token.length > 0);

    visibleItems = allItems.filter(item => { 
        // Các bộ lọc từ sidebar và tìm kiếm (giữ nguyên)
        if (priceFilter.min != null && item.price < priceFilter.min) return false; 
        if (priceFilter.max != null && item.price > priceFilter.max) return false; 
        if (areaFilter.min != null && item.area < areaFilter.min) return false; 
        if (areaFilter.max != null && item.area > areaFilter.max) return false; 
        if (bedroomsFilter !== null) { const btnText = sidebar.querySelector('[data-filter-name="bedrooms"] button.active').textContent; if (btnText.includes('+')) { if (item.bedrooms < bedroomsFilter) return false; } else { if (item.bedrooms !== bedroomsFilter) return false; } } 
        if (wcFilter !== null) { const btnText = sidebar.querySelector('[data-filter-name="wc"] button.active').textContent; if (btnText.includes('+')) { if (item.wc < wcFilter) return false; } else { if (item.wc !== wcFilter) return false; } } 
        if (furnitureFilter.length > 0 && !furnitureFilter.includes(item.furniture)) return false; 
        if (directionFilter.length > 0 && !directionFilter.includes(item.doorDirection)) return false; 
        if (legalFilter.length > 0 && item.hasOwnProperty('legal') && !legalFilter.includes(item.legal)) { return false; }
        if (leaseTermFilter.length > 0 && item.hasOwnProperty('leaseTerm') && !leaseTermFilter.includes(item.leaseTerm)) { return false; }
        
        if (searchTokens.length > 0) {
            const isMatch = searchTokens.every(token => item.searchableString.includes(token));
            if (!isMatch) return false;
        }
        
        // Các bộ lọc từ URL
        if (loaiHinhSlugFromUrl && toSlug(item.productCategory) !== loaiHinhSlugFromUrl) return false;
        if (citySlugFromUrl && toSlug(item.city) !== citySlugFromUrl) return false;
        if (wardSlugFromUrl && toSlug(item.ward) !== wardSlugFromUrl) return false;
        // THÊM MỚI ĐIỀU KIỆN LỌC THEO ĐƯỜNG
        if (duongSlugFromUrl && toSlug(item.street) !== duongSlugFromUrl) return false;

        return true; 
    }); 
}
    function sortItems() { const criteria = sortSelect.value; visibleItems.sort((a, b) => { switch (criteria) { case 'price-asc': return a.price - b.price; case 'price-desc': return b.price - a.price; case 'oldest': return a.date - b.date; case 'newest': default: return b.date - a.date; } }); }
    function createTag(value, onRemove) { const tag = document.createElement('span'); tag.className = 'filter-tag'; tag.textContent = value; const removeBtn = document.createElement('button'); removeBtn.className = 'remove-tag'; removeBtn.innerHTML = '&times;'; removeBtn.addEventListener('click', onRemove); tag.appendChild(removeBtn); filterTagArea.appendChild(tag); }
    function updateFilterTagsUI() {
        if (!filterTagArea) return;
        filterTagArea.innerHTML = '<strong>Đang lọc theo:</strong>';
        let activeFilterCount = 0;

        const createTag = (value, onRemove) => {
            const tag = document.createElement('span');
            tag.className = 'filter-tag';
            tag.textContent = value;
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-tag';
            removeBtn.addEventListener('click', onRemove);
            removeBtn.innerHTML = '&times;';
            tag.appendChild(removeBtn);
            filterTagArea.appendChild(tag);
            activeFilterCount++;
        };

        sidebar.querySelectorAll('.filter-group').forEach(group => {
            const groupName = group.dataset.filterName;

            // Xử lý Checkbox và Button Group
            group.querySelectorAll('.checkbox-group input:checked').forEach(checkbox => {
                createTag(checkbox.nextElementSibling.textContent, () => {
                    checkbox.checked = false;
                    updateDisplay();
                });
            });

            group.querySelectorAll('.btn-group button.active').forEach(activeBtn => {
                if (activeBtn.textContent.toLowerCase() !== 'tất cả') {
                    createTag(activeBtn.textContent, () => {
                        const btnGroup = activeBtn.closest('.btn-group');
                        btnGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                        btnGroup.children[0].classList.add('active');
                        updateDisplay();
                    });
                }
            });

            // Xử lý Range Inputs (Price & Area)
            if (groupName === 'price' || groupName === 'area') {
                const quickSelectActive = group.querySelector('.btn-group button.active:not(:first-child)');
                if (quickSelectActive) return;

                const minInput = group.querySelector('.filter-input-min');
                const maxInput = group.querySelector('.filter-input-max');
                if (!minInput || !maxInput) return;

                const minVal = minInput.value;
                const maxVal = maxInput.value;
                const unit = group.querySelector('.unit-label')?.textContent || '';
                let tagValue = '';

                if (minVal && maxVal) tagValue = `${minVal} - ${maxVal}${unit}`; // Sửa đổi tại đây
                else if (minVal) tagValue = `Từ ${minVal}${unit}`;
                else if (maxVal) tagValue = `Đến ${maxVal}${unit}`;
                
                if (tagValue) {
                    createTag(tagValue, () => {
                        minInput.value = '';
                        maxInput.value = '';
                        updateDisplay();
                    });
                }
            }
        });
        filterTagArea.style.display = activeFilterCount > 0 ? 'block' : 'none';
    }
    function updateDisplay() {
            applyAllFilters();
            sortItems();
            showPage(1);
            updateFilterTagsUI();
            if (window.innerWidth < 992) {
                sidebar.classList.remove('is-open');
                document.getElementById('filter-overlay-mobile').classList.remove('is-active');
            }
    }
    
    function initSidebarEvents() {
        const openBtn = document.getElementById('floating-filter-trigger');
        const closeBtn = document.getElementById('close-filter-btn');
        const overlay = document.getElementById('filter-overlay-mobile');
        const openSidebar = () => { sidebar.classList.add('is-open'); overlay.classList.add('is-active'); };
        const closeSidebar = () => { sidebar.classList.remove('is-open'); overlay.classList.remove('is-active'); };
        if (openBtn && closeBtn && overlay) { openBtn.addEventListener('click', openSidebar); closeBtn.addEventListener('click', closeSidebar); overlay.addEventListener('click', closeSidebar); }
        sidebar.querySelectorAll('.filter-accordion .accordion-trigger').forEach(trigger => { trigger.addEventListener('click', function() { this.parentElement.classList.toggle('active'); const content = this.nextElementSibling; content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px"; }); });
        sidebar.querySelectorAll('.price-input-tabs').forEach(tabGroup => { tabGroup.addEventListener('click', function(e) { if (!e.target.matches('.price-tab-btn')) return; const tabBtn = e.target; const targetId = tabBtn.dataset.target; const targetContent = document.getElementById(targetId); const accordionContent = this.closest('.accordion-content'); tabGroup.querySelectorAll('.price-tab-btn').forEach(btn => btn.classList.remove('active')); accordionContent.querySelectorAll('.price-tab-content').forEach(content => content.classList.remove('active')); tabBtn.classList.add('active'); if (targetContent) targetContent.classList.add('active'); if (accordionContent.style.maxHeight) { accordionContent.style.maxHeight = accordionContent.scrollHeight + "px"; } updateFilterTagsUI(); }); });
        sidebar.querySelectorAll('.btn-group').forEach(group => { group.addEventListener('click', (e) => { if (e.target.tagName === 'BUTTON') { group.querySelectorAll('button').forEach(btn => btn.classList.remove('active')); e.target.classList.add('active'); updateFilterTagsUI(); } }); });
        sidebar.querySelectorAll('.checkbox-group input').forEach(input => { input.addEventListener('change', updateFilterTagsUI); });
        
        sidebar.querySelectorAll('.custom-range-input input').forEach(input => {
            input.addEventListener('input', (e) => {
                const parentGroup = e.target.closest('.filter-group');
                if (parentGroup) {
                    parentGroup.querySelectorAll('.btn-group button, #price-quick-select button, #area-quick-select button').forEach(btn => btn.classList.remove('active'));
                    const customTab = parentGroup.querySelector('.price-tab-btn[data-target*="custom"]');
                    if (customTab && !customTab.classList.contains('active')) customTab.click();
                }
            });

            input.addEventListener('change', (e) => {
                const rangeContent = e.target.closest('.price-tab-content');
                if (rangeContent) {
                    const minInput = rangeContent.querySelector('.filter-input-min');
                    const maxInput = rangeContent.querySelector('.filter-input-max');
                    if (minInput && maxInput) {
                        const minVal = parseFloat(minInput.value);
                        const maxVal = parseFloat(maxInput.value);
                        if (!isNaN(minVal) && !isNaN(maxVal) && maxVal < minVal) {
                            alert('Giá trị "Đến" phải lớn hơn hoặc bằng giá trị "Từ".');
                            e.target.value = '';
                        }
                    }
                }
                updateFilterTagsUI();
            });
        });
        applyFilterBtn.addEventListener('click', () => { updateDisplay(); const resultsSummary = document.querySelector('.results-summary'); if (resultsSummary) { resultsSummary.scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
        if (resetBtn) { resetBtn.addEventListener('click', () => { sidebar.querySelectorAll('form').forEach(f => f.reset());  sidebar.querySelectorAll('.custom-range-input input').forEach(input => input.value = ''); sidebar.querySelectorAll('.btn-group').forEach(group => { group.querySelectorAll('button').forEach(btn => btn.classList.remove('active')); const allButton = Array.from(group.children).find(btn => btn.textContent.toLowerCase() === 'tất cả'); if (allButton) allButton.classList.add('active'); }); sidebar.querySelectorAll('.checkbox-group input').forEach(cb => cb.checked = false); searchInput.value = ''; updateDisplay(); }); }
        searchForm.addEventListener('submit', (e) => { e.preventDefault(); updateDisplay(); });
        searchInput.addEventListener('input', updateDisplay);
        sortSelect.addEventListener('change', () => { sortItems(); showPage(1); });
    }

    function initOtherSections() {
        initPriceHistory();
        initPriceHistoryChart();
        initFaqAndSeoSection();
    }
    
    function initPriceHistory() {
        const isRentalPage = document.querySelector('[data-filter-name="leaseTerm"]');
        if (isRentalPage) {
            initPriceHistoryForRent();
        } else {
            initPriceHistoryForSale();
        }
    }

    function initPriceHistoryForRent() {
    const tabsContainer = document.getElementById('price-year-tabs');
    const tableContainer = document.getElementById('summary-table-container');
    const dataSource = typeof priceHistoryData_Thue !== 'undefined' ? priceHistoryData_Thue : {}; // Sử dụng dữ liệu thuê
    if (!tabsContainer || !tableContainer || typeof dataSource === 'undefined') {
        const priceHistorySection = document.querySelector('.price-history-section');
        if (priceHistorySection) priceHistorySection.style.display = 'none';
        return;
    }

    function renderTable(year) {
        // [CẬP NHẬT] Đọc tham số từ URL để lọc
        const urlParams = new URLSearchParams(window.location.search);
        const citySlugFromUrl = urlParams.get('thanhpho');
        const wardSlugFromUrl = urlParams.get('phuong');

        let yearData = dataSource[year] || [];

        // Lọc dữ liệu theo thành phố
        if (citySlugFromUrl) {
            yearData = yearData.filter(tx => toSlug(tx.city) === citySlugFromUrl);
        }
        // Lọc tiếp dữ liệu theo phường
        if (wardSlugFromUrl) {
            yearData = yearData.filter(tx => toSlug(tx.ward) === wardSlugFromUrl);
        }

        if (yearData.length === 0) {
            tableContainer.innerHTML = '<p style="text-align:center; color:#666;">Không có dữ liệu lịch sử giá cho khu vực này.</p>';
            return;
        }

        tableContainer.innerHTML = '';
        const transactionsByBedroom = {};
        yearData.forEach(transaction => {
            const bedrooms = transaction.bedrooms;
            if (!transactionsByBedroom[bedrooms]) {
                transactionsByBedroom[bedrooms] = [];
            }
            transactionsByBedroom[bedrooms].push(transaction);
        });
        const sortedBedroomKeys = Object.keys(transactionsByBedroom).sort((a, b) => a - b);
        for (const bedrooms of sortedBedroomKeys) {
            const groupDetails = transactionsByBedroom[bedrooms];
            if (groupDetails.length === 0) continue;
            const wrapper = document.createElement('div');
            wrapper.className = 'summary-row-wrapper';
            const prices = groupDetails.map(d => d.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            const priceString = (minPrice === maxPrice) 
                ? `${maxPrice.toLocaleString('vi-VN')} triệu/tháng` 
                : `${minPrice.toLocaleString('vi-VN')} - ${maxPrice.toLocaleString('vi-VN')} triệu/tháng`;
            const summaryRow = document.createElement('div');
            summaryRow.className = 'summary-row accordion-trigger';
            summaryRow.innerHTML = `
                <span class="summary-label">${bedrooms} Phòng ngủ</span>
                <span class="summary-value">${priceString}</span>
                <span class="summary-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg></span>
            `;
            const detailContent = document.createElement('div');
            detailContent.className = 'detailed-table-content';
            let tableHTML = `
                <table class="detailed-table">
                    <thead>
                        <tr>
                            <th>Thời gian <span class="unit">(tháng)</span></th>
                            <th>Diện tích <span class="unit">(m²)</span></th>
                            <th>Giá thuê <span class="unit">(triệu/tháng)</span></th>
                            <th>Nội thất</th>
                            <th>Thời hạn thuê</th>
                            <th>WC</th>
                        </tr>
                    </thead>
                    <tbody>`;
            groupDetails.forEach(detail => {
                const month = new Date(detail.publishedAt).getMonth() + 1;
                tableHTML += `
                    <tr>
                        <td>T${month}</td>
                        <td>${detail.area}</td>
                        <td>${detail.price.toLocaleString('vi-VN')}</td>
                        <td>${detail.furniture}</td>
                        <td>${detail.leaseTerm}</td>
                        <td>${detail.wc}</td>
                    </tr>`;
            });
            tableHTML += '</tbody></table>';
            detailContent.innerHTML = tableHTML;
            wrapper.appendChild(summaryRow);
            wrapper.appendChild(detailContent);
            tableContainer.appendChild(wrapper);
        }
        addAccordionEvents();
    }
    function addAccordionEvents() {
        tableContainer.querySelectorAll('.accordion-trigger').forEach(trigger => {
            trigger.addEventListener('click', function () {
                const wrapper = this.closest('.summary-row-wrapper');
                wrapper.classList.toggle('active');
                const content = this.nextElementSibling;
                if (content.style.maxHeight) { content.style.maxHeight = null; } 
                else { content.style.maxHeight = content.scrollHeight + "px"; }
            });
        });
    }
    function createYearTabs() {
        const years = Object.keys(dataSource).sort((a, b) => b - a);
        if (years.length === 0) return;
        tabsContainer.innerHTML = '';
        years.forEach((year, index) => {
            const button = document.createElement('button');
            button.className = 'year-tab-btn';
            button.dataset.year = year;
            button.textContent = `Năm ${year}`;
            if (index === 0) button.classList.add('active');
            button.addEventListener('click', function() {
                if(tabsContainer.querySelector('.active')) { tabsContainer.querySelector('.active').classList.remove('active'); }
                this.classList.add('active');
                renderTable(this.dataset.year);
            });
            tabsContainer.appendChild(button);
        });
        renderTable(years[0]);
    }
    createYearTabs();
}

    function initPriceHistoryForSale() {
    const tabsContainer = document.getElementById('price-year-tabs');
    const tableContainer = document.getElementById('summary-table-container');
    if (!tabsContainer || !tableContainer || typeof priceHistoryData === 'undefined') {
        const priceHistorySection = document.querySelector('.price-history-section');
        if (priceHistorySection) priceHistorySection.style.display = 'none';
        return;
    }
    const areaGroups = { 'all': { min: 0, max: Infinity, text: 'Tất cả' }, 'Dưới 50m²': { min: 0, max: 49.9, text: 'Dưới 50m²' }, '50-80m²': { min: 50, max: 79.9, text: '50-80m²' }, '80-120m²': { min: 80, max: 119.9, text: '80-120m²' }, 'Trên 120m²': { min: 120, max: Infinity, text: 'Trên 120m²' } };
    
    function renderTable(year) {
        // [CẬP NHẬT] Đọc thêm tham số "phuong" từ URL
        const urlParams = new URLSearchParams(window.location.search);
        const citySlugFromUrl = urlParams.get('thanhpho');
        const wardSlugFromUrl = urlParams.get('phuong');

        let yearData = priceHistoryData[year] || [];

        // Lọc dữ liệu theo thành phố
        if (citySlugFromUrl) {
            yearData = yearData.filter(tx => toSlug(tx.city) === citySlugFromUrl);
        }
        
        // [THÊM MỚI] Lọc tiếp dữ liệu theo phường
        if (wardSlugFromUrl) {
            yearData = yearData.filter(tx => toSlug(tx.ward) === wardSlugFromUrl);
        }

        if (yearData.length === 0) {
            tableContainer.innerHTML = '<p style="text-align:center; color:#666;">Không có dữ liệu lịch sử giá cho khu vực này.</p>';
            return;
        }

        tableContainer.innerHTML = '';
        for (const key in areaGroups) { areaGroups[key].details = []; }

        yearData.forEach(transaction => {
            for (const key in areaGroups) {
                if (key === 'all') continue;
                if (transaction.area >= areaGroups[key].min && transaction.area <= areaGroups[key].max) {
                    if (!transaction.unitPrice) {
                       transaction.unitPrice = (transaction.price * 1000) / transaction.area;
                    }
                    areaGroups[key].details.push(transaction);
                    break;
                }
            }
        });

        for (const groupName in areaGroups) {
            if (groupName === 'all' || areaGroups[groupName].details.length === 0) { continue; }
            const group = areaGroups[groupName];
            const wrapper = document.createElement('div'); 
            wrapper.className = 'summary-row-wrapper';
            const prices = group.details.map(d => d.price);
            const minPrice = Math.min(...prices); 
            const maxPrice = Math.max(...prices);
            const unitPrices = group.details.map(d => d.unitPrice);
            const minUnitPrice = Math.min(...unitPrices).toFixed(1); 
            const maxUnitPrice = Math.max(...unitPrices).toFixed(1);
            const priceString = (minPrice === maxPrice) ? `${maxPrice.toFixed(2)} tỷ` : `${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)} tỷ`;
            const unitPriceString = (minUnitPrice === maxUnitPrice) ? `${maxUnitPrice} tr/m²` : `${minUnitPrice} - ${maxUnitPrice} tr/m²`;
            const summaryRow = document.createElement('div'); 
            summaryRow.className = 'summary-row accordion-trigger';
            summaryRow.innerHTML = `<span class="summary-label">${groupName}</span><span class="summary-value">${priceString}</span><span class="summary-value">${unitPriceString}</span><span class="summary-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg></span>`;
            const detailContent = document.createElement('div'); 
            detailContent.className = 'detailed-table-content';
            let tableHTML = `<table class="detailed-table"><thead><tr><th>Thời gian <span class="unit">(tháng)</span></th><th>Diện tích <span class="unit">(m²)</span></th><th>Giá <span class="unit">(tỷ)</span></th><th>Đơn giá <span class="unit">(tr/m²)</span></th><th>Pháp lý</th><th>Nội thất</th></tr></thead><tbody>`;
            group.details.forEach(detail => {
                const month = new Date(detail.publishedAt).getMonth() + 1;
                tableHTML += `<tr><td>T${month}</td><td>${detail.area}</td><td>${detail.price.toFixed(2)}</td><td>${detail.unitPrice.toFixed(1)}</td><td>${detail.legal}</td><td>${detail.furniture}</td></tr>`;
            });
            tableHTML += '</tbody></table>';
            detailContent.innerHTML = tableHTML;
            wrapper.appendChild(summaryRow); 
            wrapper.appendChild(detailContent);
            tableContainer.appendChild(wrapper);
        }
        addAccordionEvents();
    }

    function addAccordionEvents() { 
        tableContainer.querySelectorAll('.accordion-trigger').forEach(trigger => { 
            trigger.addEventListener('click', function () { 
                const wrapper = this.closest('.summary-row-wrapper'); 
                wrapper.classList.toggle('active'); 
                const content = this.nextElementSibling; 
                content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
            }); 
        }); 
    }

    function createYearTabs() {
        const years = Object.keys(priceHistoryData).sort((a, b) => b - a);
        if (years.length === 0) return;
        tabsContainer.innerHTML = '';
        years.forEach((year, index) => {
            const button = document.createElement('button'); 
            button.className = 'year-tab-btn'; 
            button.dataset.year = year; 
            button.textContent = `Năm ${year}`;
            if (index === 0) button.classList.add('active');
            button.addEventListener('click', function() { 
                if(tabsContainer.querySelector('.active')) { 
                    tabsContainer.querySelector('.active').classList.remove('active'); 
                } 
                this.classList.add('active'); 
                renderTable(this.dataset.year); 
            });
            tabsContainer.appendChild(button);
        });
        renderTable(years[0]);
    }
    createYearTabs();
}
    
    function initPriceHistoryChart() {
        const isRentalPage = document.querySelector('[data-filter-name="leaseTerm"]');
        if (isRentalPage) {
            initScatterChartForRent();
        } else {
            initLineChartForSale();
        }
    }

    function initScatterChartForRent() {
    const ctx = document.getElementById('price-history-chart')?.getContext('2d');
    const yearFiltersContainer = document.getElementById('chart-year-filters');
    const bedroomFilterSelect = document.getElementById('chart-bedroom-filter');
    const chartTitleElement = document.getElementById('chart-dynamic-title');
    const dataSource = typeof priceHistoryData_Thue !== 'undefined' ? priceHistoryData_Thue : {}; // Sử dụng dữ liệu thuê

    if (!ctx || !yearFiltersContainer || !bedroomFilterSelect || !dataSource) return;
    chartTitleElement.textContent = 'Biểu đồ Phân tán Giá thuê theo Diện tích';

    const FURNITURE_COLORS = { 'Nội thất cơ bản': 'rgba(54, 162, 235, 0.7)', 'Đầy đủ nội thất': 'rgba(75, 192, 192, 0.7)', 'Không nội thất': 'rgba(255, 99, 132, 0.7)', 'Nhà thô': 'rgba(255, 99, 132, 0.7)', 'Bàn giao thô': 'rgba(255, 99, 132, 0.7)' };
    const YEAR_SHAPES = { '2025': 'circle', '2024': 'rect', '2023': 'triangle' };
    let priceChart;

    function updateChart() {
        const selectedYears = Array.from(yearFiltersContainer.querySelectorAll('button.active')).map(btn => btn.dataset.year);
        const selectedBedrooms = bedroomFilterSelect.value;
        
        // [CẬP NHẬT] Đọc tham số từ URL
        const urlParams = new URLSearchParams(window.location.search);
        const citySlugFromUrl = urlParams.get('thanhpho');
        const wardSlugFromUrl = urlParams.get('phuong');

        let filteredData = [];
        selectedYears.forEach(year => {
            if (dataSource[year]) {
                let yearData = dataSource[year].map(d => ({...d, year: year}));
                
                // Lọc theo thành phố
                if (citySlugFromUrl) {
                    yearData = yearData.filter(tx => toSlug(tx.city) === citySlugFromUrl);
                }
                // Lọc theo phường
                if (wardSlugFromUrl) {
                    yearData = yearData.filter(tx => toSlug(tx.ward) === wardSlugFromUrl);
                }

                filteredData.push(...yearData);
            }
        });

        if (selectedBedrooms !== 'all') {
            filteredData = filteredData.filter(d => d.bedrooms == selectedBedrooms);
        }

        const datasets = [];
        const groupedByFurniture = {};
        filteredData.forEach(item => {
            const furniture = item.furniture;
            if(!groupedByFurniture[furniture]) {
                groupedByFurniture[furniture] = [];
            }
            groupedByFurniture[furniture].push(item);
        });
        
        for (const furniture in groupedByFurniture) {
            datasets.push({
                label: furniture,
                data: groupedByFurniture[furniture].map(item => ({ x: item.area, y: item.price, details: item })),
                backgroundColor: FURNITURE_COLORS[furniture] || 'rgba(201, 203, 207, 0.7)',
                pointStyle: groupedByFurniture[furniture].map(item => YEAR_SHAPES[item.year] || 'circle'),
                radius: 7, hoverRadius: 9
            });
        }

        const config = {
            type: 'scatter', data: { datasets: datasets },
            options: {
                maintainAspectRatio: false,
                scales: { x: { type: 'linear', position: 'bottom', title: { display: true, text: 'Diện tích (m²)' } }, y: { title: { display: true, text: 'Giá thuê (triệu VNĐ)' } } },
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const details = context.raw.details;
                                if (!details) return '';
                                const month = new Date(details.publishedAt).getMonth() + 1;
                                return [ `ID: ${details.id}`, `Giá: ${details.price} triệu`, `Diện tích: ${details.area} m²`, `Nội thất: ${details.furniture}`, `Phòng ngủ: ${details.bedrooms} PN`, `WC: ${details.wc} WC`, `Thời gian: T${month}/${details.year}` ];
                            }
                        }
                    }
                }
            }
        };

        if (!priceChart) { priceChart = new Chart(ctx, config); } 
        else { priceChart.data.datasets = datasets; priceChart.update(); }
    }
    
    function setupFilters() {
        const years = Object.keys(dataSource).sort((a,b) => b-a);
        yearFiltersContainer.innerHTML = ''; 
        years.forEach((year) => {
            if (YEAR_SHAPES[year]) {
                const button = document.createElement('button'); 
                button.dataset.year = year; button.textContent = year;
                button.classList.add('active');
                button.addEventListener('click', function() { this.classList.toggle('active'); updateChart(); });
                yearFiltersContainer.appendChild(button);
            }
        });

        const allBedrooms = new Set(Object.values(dataSource).flat().map(item => item.bedrooms));
        bedroomFilterSelect.innerHTML = '<option value="all">Tất cả</option>';
        Array.from(allBedrooms).sort((a,b) => a-b).forEach(num => {
            const option = document.createElement('option');
            option.value = num; option.textContent = `${num} PN`;
            bedroomFilterSelect.appendChild(option);
        });
        bedroomFilterSelect.addEventListener('change', updateChart);
    }
    
    setupFilters();
    updateChart();
}

    function initLineChartForSale() {
    const ctx = document.getElementById('price-history-chart')?.getContext('2d');
    const yearFiltersContainer = document.getElementById('chart-year-filters');
    const areaFilterSelect = document.getElementById('chart-area-filter');
    const chartTitleElement = document.getElementById('chart-dynamic-title');
    
    if (!ctx || !yearFiltersContainer || !areaFilterSelect || typeof priceHistoryData === 'undefined') { return; }
    
    const YEAR_COLORS = {
        '2025': { border: 'rgba(54, 162, 235, 1)', bg: 'rgba(54, 162, 235, 0.2)' },
        '2024': { border: 'rgba(255, 99, 132, 1)', bg: 'rgba(255, 99, 132, 0.2)' },
        '2023': { border: 'rgba(75, 192, 192, 1)', bg: 'rgba(75, 192, 192, 0.2)' },
        '2022': { border: 'rgba(255, 159, 64, 1)', bg: 'rgba(255, 159, 64, 0.2)' },
    };
    const areaGroups = { 'all': { min: 0, max: Infinity, text: 'Tất cả' }, 'Dưới 50m²': { min: 0, max: 49.9, text: 'Dưới 50m²' }, '50-80m²': { min: 50, max: 79.9, text: '50-80m²' }, '80-120m²': { min: 80, max: 119.9, text: '80-120m²' }, 'Trên 120m²': { min: 120, max: Infinity, text: 'Trên 120m²' } };
    let priceChart;

    function processChartData(years, areaKey) {
        // [CẬP NHẬT] Đọc thêm tham số "phuong" từ URL
        const urlParams = new URLSearchParams(window.location.search);
        const citySlugFromUrl = urlParams.get('thanhpho');
        const wardSlugFromUrl = urlParams.get('phuong');

        const areaFilter = areaGroups[areaKey]; 
        const processedData = {};
        
        years.forEach(year => {
            let yearData = priceHistoryData[year] || [];

            // Lọc theo thành phố
            if (citySlugFromUrl) {
                yearData = yearData.filter(tx => toSlug(tx.city) === citySlugFromUrl);
            }
            // [THÊM MỚI] Lọc tiếp theo phường
            if (wardSlugFromUrl) {
                yearData = yearData.filter(tx => toSlug(tx.ward) === wardSlugFromUrl);
            }

            const monthlyData = Array(12).fill(null).map(() => ({ prices: [] }));
            yearData.forEach(tx => { 
                if (tx.area >= areaFilter.min && tx.area <= areaFilter.max) { 
                    const unitPrice = (tx.price * 1000 / tx.area);
                    const monthIndex = new Date(tx.publishedAt).getMonth();
                    monthlyData[monthIndex].prices.push(unitPrice);
                } 
            });
            
            processedData[year] = { avg: [], min: [], max: [], count: [] };
            monthlyData.forEach((month, i) => {
                if (month.prices.length > 0) {
                    const sum = month.prices.reduce((a, b) => a + b, 0);
                    processedData[year].avg[i] = (sum / month.prices.length).toFixed(1);
                    processedData[year].min[i] = Math.min(...month.prices).toFixed(1);
                    processedData[year].max[i] = Math.max(...month.prices).toFixed(1);
                    processedData[year].count[i] = month.prices.length;
                } else { 
                    processedData[year].avg[i] = null; 
                    processedData[year].min[i] = null; 
                    processedData[year].max[i] = null; 
                    processedData[year].count[i] = 0; 
                }
            });
        });
        return processedData;
    }

    function updateChart() {
        const selectedYears = Array.from(yearFiltersContainer.querySelectorAll('button.active')).map(btn => btn.dataset.year);
        const selectedAreaKey = areaFilterSelect.value;
        const chartData = processChartData(selectedYears, selectedAreaKey);
        let yearText = selectedYears.length > 0 ? `năm ${selectedYears.join(', ')}` : '';
        let areaText = areaGroups[selectedAreaKey].text;
        chartTitleElement.textContent = `Biểu đồ biến động giá ${yearText} - ${areaText}`;
        const datasets = [];
        selectedYears.forEach(year => {
            const color = YEAR_COLORS[year] || YEAR_COLORS['2022'];
            datasets.push({ label: `TB ${year}`, data: chartData[year].avg, borderColor: color.border, backgroundColor: color.bg, borderWidth: 3, fill: 'start', tension: 0.4, });
            datasets.push({ label: `Cao nhất ${year}`, data: chartData[year].max, borderColor: color.border, borderWidth: 1, borderDash: [5, 5], fill: false, hidden: true });
            datasets.push({ label: `Thấp nhất ${year}`, data: chartData[year].min, borderColor: color.border, borderWidth: 1, borderDash: [5, 5], fill: false, hidden: true });
        });

        const yAxisTitle = 'Đơn giá (triệu/m²)';
        if (!priceChart) { 
            priceChart = new Chart(ctx, { 
                type: 'line', 
                data: { labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'], datasets: datasets }, 
                options: { 
                    responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, 
                    scales: { y: { beginAtZero: false, ticks: { callback: (value) => `${value}` }, title: { display: true, text: yAxisTitle } } }, 
                    plugins: { 
                        legend: { position: 'bottom' },
                        tooltip: { 
                            callbacks: { 
                                footer: function(tooltipItems) { 
                                    const monthIndex = tooltipItems[0].dataIndex; let footer = '\n'; 
                                    selectedYears.forEach(year => { 
                                        const count = chartData[year].count[monthIndex]; 
                                        if(count) footer += `SL tin ${year}: ${count}\n`; 
                                    }); 
                                    return footer; 
                                } 
                            } 
                        } 
                    } 
                } 
            }); 
        } else { 
            priceChart.options.scales.y.title.text = yAxisTitle;
            priceChart.data.datasets = datasets; 
            priceChart.update(); 
        }
    }

    function setupFilters() {
        const years = Object.keys(priceHistoryData).sort((a,b) => b-a);
        yearFiltersContainer.innerHTML = ''; 
        years.forEach((year, index) => {
            const button = document.createElement('button'); 
            button.dataset.year = year; 
            button.textContent = year;
            if (index < 2) button.classList.add('active');
            button.addEventListener('click', function() { 
                this.classList.toggle('active'); 
                updateChart(); 
            });
            yearFiltersContainer.appendChild(button);
        });
        areaFilterSelect.innerHTML = ''; 
        for (const key in areaGroups) { 
            const option = document.createElement('option'); 
            option.value = key; 
            option.textContent = areaGroups[key].text; 
            areaFilterSelect.appendChild(option); 
        }
        areaFilterSelect.addEventListener('change', updateChart);
    }
    
    setupFilters();
    updateChart();
}


    function initFaqAndSeoSection() {
        const accordionGroup = document.getElementById('faq-accordion');
        if (accordionGroup) {
            const accordionItems = accordionGroup.querySelectorAll('.accordion-item');
            accordionItems.forEach(item => {
                const header = item.querySelector('.accordion-header');
                const content = item.querySelector('.accordion-content');
                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    accordionItems.forEach(otherItem => { otherItem.classList.remove('active'); otherItem.querySelector('.accordion-content').style.maxHeight = null; });
                    if (!isActive) { item.classList.add('active'); content.style.maxHeight = content.scrollHeight + "px"; }
                });
            });
        }
        const toggleButton = document.getElementById('seo-toggle-button');
        const textWrapper = document.getElementById('seo-text-wrapper');
        if (toggleButton && textWrapper) {
            toggleButton.addEventListener('click', () => {
                const isExpanded = textWrapper.classList.contains('expanded');
                if (isExpanded) { textWrapper.classList.remove('expanded'); toggleButton.textContent = 'Xem thêm'; }
                else { textWrapper.classList.add('expanded'); toggleButton.textContent = 'Thu gọn'; }
            });
        }
    }
    
    // Thay thế toàn bộ hàm updateBreadcrumb cũ bằng hàm này
function updateBreadcrumb() {
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    const categoryHeader = document.querySelector('.category-header h1');
    const categoryDescription = document.querySelector('.category-header p');
    const priceHistoryTitle = document.getElementById('price-history-title');

    if (!breadcrumbContainer || !categoryHeader) return;

    const params = new URLSearchParams(window.location.search);
    const loaiHinhSlug = params.get('loaihinh');
    const citySlug = params.get('thanhpho');
    const wardSlug = params.get('phuong');
    const duongSlug = params.get('duong'); // <-- THÊM MỚI: Đọc tham số đường

    // Lấy tên có dấu từ slug
    const cityText = cityLookup[citySlug] || citySlug;
    const wardText = wardLookup[wardSlug] || wardSlug;
    const streetText = streetLookup[duongSlug] || duongSlug; // <-- THÊM MỚI
    const productCategoryText = categoryLookup[loaiHinhSlug] || 'Bất động sản';

    const isRentalPage = window.location.pathname.includes('listing-thue.html');
    const propertyType = isRentalPage ? 'Cho thuê' : 'Mua bán';
    const listingPage = isRentalPage ? 'listing-thue.html' : 'listing-ban.html';
    
    let mainTitle = `${propertyType} ${productCategoryText}`;
    let historyTitleText = `Lịch sử giá ${propertyType.toLowerCase()} ${productCategoryText.toLowerCase()}`;
    
    // Cập nhật logic xây dựng tiêu đề
    if (streetText && wardText && cityText) {
        mainTitle = `${propertyType} ${productCategoryText} tại đường ${streetText}, Phường ${wardText}, ${cityText}`;
        historyTitleText += ` tại đường ${streetText}, Phường ${wardText}, ${cityText}`;
    } else if (wardText && cityText) {
        mainTitle = `${propertyType} ${productCategoryText} tại Phường ${wardText}, ${cityText}`;
        historyTitleText += ` tại Phường ${wardText}, ${cityText}`;
    } else if (cityText) {
        mainTitle = `${propertyType} ${productCategoryText} tại ${cityText}`;
        historyTitleText += ` tại ${cityText}`;
    }
    
    categoryHeader.textContent = mainTitle;
    if (priceHistoryTitle) {
        priceHistoryTitle.textContent = historyTitleText;
    }
    if (categoryDescription) {
        categoryDescription.textContent = `Danh sách ${mainTitle.toLowerCase()} được tìm thấy.`;
    }

    // Cập nhật logic xây dựng breadcrumb
    const breadcrumbParts = [];
    breadcrumbParts.push(`<span class="breadcrumb-item-no-link">${propertyType}</span>`);
    if (productCategoryText !== 'Bất động sản') {
        breadcrumbParts.push(`<a href="${listingPage}?loaihinh=${loaiHinhSlug}">${productCategoryText}</a>`);
    }
    if (cityText && citySlug) {
        breadcrumbParts.push(`<a href="${listingPage}?loaihinh=${loaiHinhSlug}&thanhpho=${citySlug}">${cityText}</a>`);
    }
    if (wardText && wardSlug) {
        breadcrumbParts.push(`<a href="${listingPage}?loaihinh=${loaiHinhSlug}&thanhpho=${citySlug}&phuong=${wardSlug}">Phường ${wardText}</a>`);
    }
    if (streetText && duongSlug) { // <-- THÊM MỚI
        breadcrumbParts.push(`<span class="breadcrumb-item-no-link">${streetText}</span>`);
    }
    
    breadcrumbContainer.innerHTML = breadcrumbParts.join(' &gt; ');
}

    function init() {
        updateBreadcrumb();
        initSidebarEvents();
        initOtherSections();
        updateDisplay();
        renderFavoritesDrawer();
    }
 
    init();
});