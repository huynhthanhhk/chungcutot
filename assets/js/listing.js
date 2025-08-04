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

    favBtn.addEventListener('click', (e) => { e.preventDefault(); openDrawer(); });
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
    if (s === 'hồ chí minh') return 'tp-ho-chi-minh';
    if (s === 'hà nội') return 'tp-ha-noi';
    if (s === 'đà nẵng') return 'tp-da-nang';
    if (s === 'cần thơ') return 'tp-can-tho';
    if (s === 'hải phòng') return 'tp-hai-phong';
    s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    s = s.replace(/[đĐ]/g, 'd');
    s = s.replace(/([^0-9a-z-\s])/g, '');
    s = s.replace(/(\s+)/g, '-');
    s = s.replace(/-+/g, '-');
    s = s.replace(/^-+|-+$/g, '');
    return s;
};

document.addEventListener('DOMContentLoaded', function () {
    let map; // Để truy cập bản đồ từ các hàm khác
    let wardLayersLookup = {}; // Để tra cứu layer của phường/xã theo tên
    let dataSource;
    let allMapMarkers = {};     // MỚI: Dùng để lưu tất cả các marker sản phẩm
    let highlightedWardLayer = null; // MỚI: Lưu layer phường đang được làm nổi bật
    const isRentalPage = window.location.pathname.includes('listing-thue.html');

    if (isRentalPage) {
        if (typeof allRentalProductsData !== 'undefined') dataSource = allRentalProductsData;
    } else {
        if (typeof allProductsData !== 'undefined') dataSource = allProductsData;
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
        if (gridContainer) gridContainer.innerHTML = '<p class="no-results-message" style="grid-column: 1 / -1; text-align: center; padding: 20px;">Lỗi: Không thể tải dữ liệu sản phẩm.</p>';
        return;
    }

    const removeDiacritics = (str) => {
        if (!str) return '';
        return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd');
    };

    const allItems = Object.values(dataSource).map(p => ({
        ...p,
        date: new Date(p.publishedAt),
        searchableString: removeDiacritics([p.title, p.project, p.street, `đường ${p.street}`, p.ward, `phường ${p.ward}`, p.city, `quận ${p.city}`].join(' '))
    }));
    const wardToCityLookup = {};
    allItems.forEach(item => {
        if (item.ward && item.city && !wardToCityLookup[item.ward]) {
            // Chuẩn hóa tên phường làm key để tra cứu dễ hơn
            const normalizedWard = removeDiacritics(item.ward).toLowerCase();
            wardToCityLookup[normalizedWard] = item.city;
        }
    });
    const cityLookup = {}, wardLookup = {}, streetLookup = {}, categoryLookup = {};
    const locations = { streets: {}, wards: {} };

    if (typeof initialMenuData !== 'undefined') {
        ['Mua bán', 'Cho thuê', 'Dự án'].forEach(menuKey => {
            if (initialMenuData[menuKey]) {
                initialMenuData[menuKey].forEach(categoryData => {
                    const categoryName = categoryData["Loại hình"];
                    if (categoryName) categoryLookup[toSlug(categoryName)] = categoryName;
                    if (categoryData['Khu vực']) {
                        categoryData['Khu vực'].forEach(cityName => { if (cityName) cityLookup[toSlug(cityName)] = cityName; });
                    }
                });
            }
        });
    }

    allItems.forEach(item => {
        if (item.city && !cityLookup[toSlug(item.city)]) cityLookup[toSlug(item.city)] = item.city;
        if (item.ward) wardLookup[toSlug(item.ward)] = item.ward;
        if (item.street) streetLookup[toSlug(item.street)] = item.street;
        if (item.productCategory && !categoryLookup[toSlug(item.productCategory)]) categoryLookup[toSlug(item.productCategory)] = item.productCategory;
        if (item.street && !locations.streets[item.street]) locations.streets[item.street] = item.ward;
        if (item.ward && !locations.wards[item.ward]) locations.wards[item.ward] = item.city;
    });

    let visibleItems = [...allItems];
    let currentPage = 1;
    const itemsPerPage = 10;
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    function renderSuggestions(query = '') {
        if (!suggestionsContainer) return;
        const normalizedQuery = removeDiacritics(query.trim());
        let matchingStreets = [], matchingWards = [];
        if (normalizedQuery.length > 0) {
            matchingStreets = Object.keys(locations.streets).filter(street => removeDiacritics(street).includes(normalizedQuery) || `duong ${removeDiacritics(street)}`.includes(normalizedQuery));
            matchingWards = Object.keys(locations.wards).filter(ward => removeDiacritics(ward).includes(normalizedQuery) || `phuong ${removeDiacritics(ward)}`.includes(normalizedQuery));
        } else {
            matchingWards = Object.keys(locations.wards).slice(0, 5);
        }
        let html = '';
        if (matchingStreets.length > 0) {
            html += '<div class="suggestions-group"><h5 class="suggestions-group-title">-- Đường Phố --</h5><ul class="suggestions-list">';
            matchingStreets.slice(0, 5).forEach(street => {
                html += `<li><a href="#" data-type="street" data-street="${street}" data-ward="${locations.streets[street]}"><span class="suggestion-icon">🛣️</span> ${street} <span>(P. ${locations.streets[street]})</span></a></li>`;
            });
            html += '</ul></div>';
        }
        if (matchingWards.length > 0) {
            html += '<div class="suggestions-group"><h5 class="suggestions-group-title">-- Phường / Xã --</h5><ul class="suggestions-list">';
            matchingWards.slice(0, 5).forEach(ward => {
                html += `<li><a href="#" data-type="ward" data-ward="${ward}" data-city="${locations.wards[ward]}"><span class="suggestion-icon">📍</span> Phường ${ward} <span>(thuộc ${locations.wards[ward]})</span></a></li>`;
            });
            html += '</ul></div>';
        }
        suggestionsContainer.innerHTML = html;
        suggestionsContainer.classList.toggle('visible', html !== '');
    }

    function handleSuggestionClick(e) {
        if (e.target.closest('a')) {
        e.preventDefault();
        const link = e.target.closest('a');
        
        // Kiểm tra xem người dùng có đang ở giao diện bản đồ không
        const isMapViewActive = document.body.classList.contains('map-view-active');

        if (isMapViewActive) {
            // --- XỬ LÝ KHI ĐANG Ở GIAO DIỆN BẢN ĐỒ ---
            // Ẩn khung gợi ý
            if(suggestionsContainer) {
                suggestionsContainer.classList.remove('visible');
            }

            const queryText = link.dataset.ward || link.dataset.street;
            if (!queryText) return;
            
            // Cập nhật giá trị vào ô tìm kiếm
            searchInput.value = queryText;

            // Tái sử dụng logic submit đã được sửa lỗi để cập nhật bản đồ tại chỗ
            searchForm.dispatchEvent(new Event('submit', {
                bubbles: true,
                cancelable: true
            }));

        } else {
            // --- XỬ LÝ KHI Ở GIAO DIỆN DANH SÁCH (LOGIC GỐC) ---
            const urlParams = new URLSearchParams();
            const page = isRentalPage ? 'listing-thue.html' : 'listing-ban.html';
            
            const categorySlug = Object.keys(categoryLookup).find(key => categoryLookup[key] === 'Căn hộ');
            if (categorySlug) {
                urlParams.set('loaihinh', categorySlug);
            }

            if (link.dataset.type === 'street') {
                urlParams.set('thanhpho', toSlug(locations.wards[link.dataset.ward]));
                urlParams.set('phuong', toSlug(link.dataset.ward));
                urlParams.set('duong', toSlug(link.dataset.street));
            } else if (link.dataset.type === 'ward') {
                urlParams.set('thanhpho', toSlug(link.dataset.city));
                urlParams.set('phuong', toSlug(link.dataset.ward));
            }
            
            // Chuyển hướng đến trang mới với bộ lọc (tải lại trang)
            window.location.href = `${page}?${urlParams.toString()}`;
        }
    }
    }

    searchInput.addEventListener('focus', () => renderSuggestions(searchInput.value));
    searchInput.addEventListener('input', () => renderSuggestions(searchInput.value));
    document.addEventListener('click', (e) => { if (!searchForm.contains(e.target)) suggestionsContainer.classList.remove('visible'); });
    suggestionsContainer.addEventListener('mousedown', handleSuggestionClick);

    function createProductCardHTML(item) {
        const address = `${item.street}, ${item.ward}, ${item.city}`;
        let labelHTML = '';
        if (item.status) {
            const statusLower = item.status.toLowerCase();
            let labelClass = statusLower.includes('giá tốt') ? 'label-good-price' : (statusLower.includes('đã bán') ? 'label-sold' : '');
            if (labelClass) labelHTML = `<span class="product-label ${labelClass}">${item.status}</span>`; 
        }
        const imageUrl = (item.images && item.images.length > 0) ? item.images[0] : 'placeholder.jpg';
        const imageCount = item.images ? item.images.length : 0;
        const priceDisplay = isRentalPage ? `${item.price.toLocaleString('vi-VN')} triệu/tháng` : `${item.price.toLocaleString('vi-VN')} tỷ`;

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
                        <div class="image-count"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg><span>${imageCount}</span></div>
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
        if (visibleItems.length === 0) {
            gridContainer.innerHTML = '<p class="no-results-message" style="grid-column: 1 / -1; text-align: center; padding: 20px;">Không tìm thấy sản phẩm nào phù hợp.</p>';
            paginationContainer.innerHTML = ''; return;
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
            link.addEventListener('click', (e) => { e.preventDefault(); showPage(i); document.querySelector('.results-summary')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
            paginationContainer.appendChild(link);
        }
    }
    function updateMapMarkers() {
        if (typeof allMapMarkers === 'undefined') return;

        const visibleIds = new Set(visibleItems.map(item => item.id));

        for (const markerId in allMapMarkers) {
            const marker = allMapMarkers[markerId];
            if (visibleIds.has(markerId)) {
                // Hiện các marker có trong kết quả tìm kiếm
                marker.setOpacity(1);
                if (marker.getPopup()) {
                    marker.setInteractive(true);
                }
            } else {
                // Làm mờ và vô hiệu hóa các marker không có trong kết quả
                marker.setOpacity(0.2);
                if (marker.getPopup()) {
                    marker.setInteractive(false);
                }
            }
        }
    }
    function parseTextToRange(text) { const numbers = text.match(/\d+(\.\d+)?/g)?.map(Number) || []; if (text.includes('Dưới')) return { min: 0, max: numbers[0] || null }; if (text.includes('Trên')) return { min: numbers[0] || null, max: Infinity }; if (numbers.length === 2) return { min: numbers[0], max: numbers[1] }; return { min: null, max: null }; }
    function getButtonGroupFilterValue(groupSelector) { const activeBtn = sidebar.querySelector(`${groupSelector} .btn-group button.active`); if (activeBtn && activeBtn.textContent.toLowerCase() !== 'tất cả') return parseInt(activeBtn.textContent, 10); return null; }
    function getCheckboxFilterValues(groupSelector) { return Array.from(sidebar.querySelectorAll(`${groupSelector} .checkbox-group input:checked`)).map(cb => cb.dataset.value); }
    function getRangeFilter(groupSelector) { const group = sidebar.querySelector(groupSelector); const result = { min: null, max: null }; const activeTab = group.querySelector('.price-tab-btn.active'); const tabContentId = activeTab ? activeTab.dataset.target : null; if (tabContentId && document.getElementById(tabContentId)?.classList.contains('active')) { const activeContent = document.getElementById(tabContentId); if (tabContentId.includes('quick-select')) { const activeBtn = activeContent.querySelector('button.active'); if (activeBtn && activeBtn.textContent.toLowerCase() !== 'tất cả') return parseTextToRange(activeBtn.textContent); } else if (tabContentId.includes('custom-range')) { const minInput = activeContent.querySelector('.filter-input-min'); const maxInput = activeContent.querySelector('.filter-input-max'); const minVal = parseFloat(minInput.value); const maxVal = parseFloat(maxInput.value); if (!isNaN(minVal) && !isNaN(maxVal) && maxVal < minVal) { alert('Giá trị "Đến" phải lớn hơn hoặc bằng giá trị "Từ".'); maxInput.value = ''; } result.min = isNaN(minVal) ? null : minVal; result.max = isNaN(maxVal) ? null : maxVal; } } return result; }
    
    function applyAllFilters() { 
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('q') || ''; // Lấy từ khóa từ tham số 'q' trên URL
    const searchTokens = removeDiacritics(searchQuery).split(/\s+/).filter(Boolean);
        const filters = {
            price: getRangeFilter('[data-filter-name="price"]'), area: getRangeFilter('[data-filter-name="area"]'),
            bedrooms: getButtonGroupFilterValue('[data-filter-name="bedrooms"]'), wc: getButtonGroupFilterValue('[data-filter-name="wc"]'),
            furniture: getCheckboxFilterValues('[data-filter-name="furniture"]'), direction: getCheckboxFilterValues('[data-filter-name="direction"]'),
            legal: getCheckboxFilterValues('[data-filter-name="legal"]'), leaseTerm: getCheckboxFilterValues('[data-filter-name="leaseTerm"]'),
            floor: getCheckboxFilterValues('[data-filter-name="floor"]'), loaiHinhUrl: urlParams.get('loaihinh'),
            cityUrl: urlParams.get('thanhpho'), wardUrl: urlParams.get('phuong'), duongUrl: urlParams.get('duong')
        };
        visibleItems = allItems.filter(item => {
            if (filters.price.min != null && item.price < filters.price.min) return false; 
            if (filters.price.max != null && item.price > filters.price.max) return false; 
            if (filters.area.min != null && item.area < filters.area.min) return false; 
            if (filters.area.max != null && item.area > filters.area.max) return false; 
            if (filters.bedrooms !== null) { const btnText = sidebar.querySelector('[data-filter-name="bedrooms"] button.active').textContent; if (btnText.includes('+') ? (item.bedrooms < filters.bedrooms) : (item.bedrooms !== filters.bedrooms)) return false; } 
            if (filters.wc !== null) { const btnText = sidebar.querySelector('[data-filter-name="wc"] button.active').textContent; if (btnText.includes('+') ? (item.wc < filters.wc) : (item.wc !== filters.wc)) return false; } 
            if (filters.furniture.length && !filters.furniture.includes(item.furniture)) return false; 
            if (filters.direction.length && !filters.direction.includes(item.doorDirection)) return false; 
            if (filters.legal.length && !filters.legal.includes(item.legal)) return false;
            if (filters.leaseTerm.length && !filters.leaseTerm.includes(item.leaseTerm)) return false;
            if (filters.floor.length && !filters.floor.includes(item.floor)) return false;
            if (searchTokens.length && !searchTokens.every(token => item.searchableString.includes(token))) return false;
            if (filters.loaiHinhUrl && toSlug(item.productCategory) !== filters.loaiHinhUrl) return false;
            if (filters.cityUrl && toSlug(item.city) !== filters.cityUrl) return false;
            if (filters.wardUrl && toSlug(item.ward) !== filters.wardUrl) return false;
            if (filters.duongUrl && toSlug(item.street) !== filters.duongUrl) return false;
            return true; 
        }); 
    }
    
    function sortItems() { const criteria = sortSelect.value; visibleItems.sort((a, b) => { switch (criteria) { case 'price-asc': return a.price - b.price; case 'price-desc': return b.price - a.price; case 'oldest': return a.date - b.date; case 'newest': default: return b.date - a.date; } }); }
    
    function updateFilterTagsUI() {
        if (!filterTagArea) return;
        filterTagArea.innerHTML = '<strong>Đang lọc theo:</strong>';
        let activeFilterCount = 0;
        const createTag = (value, onRemove) => {
            activeFilterCount++;
            const tag = document.createElement('span');
            tag.className = 'filter-tag';
            tag.textContent = value;
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-tag';
            removeBtn.innerHTML = '&times;';
            removeBtn.addEventListener('click', onRemove);
            tag.appendChild(removeBtn);
            filterTagArea.appendChild(tag);
        };
        sidebar.querySelectorAll('.filter-group').forEach(group => {
            group.querySelectorAll('.checkbox-group input:checked').forEach(checkbox => {
                createTag(checkbox.nextElementSibling.textContent, () => { checkbox.checked = false; updateDisplay(); });
            });
            group.querySelectorAll('.btn-group button.active:not(:first-child)').forEach(activeBtn => {
                if (activeBtn.textContent.toLowerCase() !== 'tất cả') {
                    createTag(activeBtn.textContent, () => {
                        activeBtn.classList.remove('active');
                        activeBtn.parentElement.children[0].classList.add('active');
                        updateDisplay();
                    });
                }
            });
            if (group.dataset.filterName === 'price' || group.dataset.filterName === 'area') {
                if (group.querySelector('.btn-group button.active:not(:first-child)')) return;
                const minInput = group.querySelector('.filter-input-min'), maxInput = group.querySelector('.filter-input-max');
                const minVal = minInput.value, maxVal = maxInput.value;
                if (minVal || maxVal) {
                    const unit = group.querySelector('.unit-label')?.textContent || '';
                    const tagValue = minVal && maxVal ? `${minVal} - ${maxVal}${unit}` : (minVal ? `Từ ${minVal}${unit}` : `Đến ${maxVal}${unit}`);
                    createTag(tagValue, () => { minInput.value = ''; maxInput.value = ''; updateDisplay(); });
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
        updateMapMarkers();
        const urlParams = new URLSearchParams(window.location.search);
    const wardSlugFromUrl = urlParams.get('phuong');
    if (wardSlugFromUrl && wardLookup[wardSlugFromUrl]) {
        highlightWard(wardLookup[wardSlugFromUrl]);
    }
        if (window.innerWidth < 1025 || document.body.classList.contains('map-view-active')) {
            sidebar.classList.remove('is-open');
            const overlay = document.getElementById('filter-overlay-mobile');
            if(overlay) overlay.classList.remove('is-active');
        }
    }
    // HÀM MỚI ĐỂ KHỞI TẠO BẢN ĐỒ
    // TÌM VÀ THAY THẾ TOÀN BỘ HÀM initMap() BẰNG ĐOẠN MÃ NÀY

function initMap() {
    const mapContainer = document.getElementById('map-placeholder');
    if (!mapContainer || mapContainer.classList.contains('leaflet-container')) {
        return;
    }

    // --- 1. KHỞI TẠO BẢN ĐỒ ---
    map = L.map('map-placeholder').setView([10.7769, 106.7009], 11); // Zoom ra xa hơn một chút ban đầu

    // --- 2. ĐỊNH NGHĨA CÁC LỚP BẢN ĐỒ NỀN ---
    // Bản đồ nền CARTO Voyager (cho mức zoom xa)
    const cartoLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });

    // Bản đồ nền Google Maps (cho mức zoom gần)
    const googleMapsLayer = L.gridLayer.googleMutant({
        type: 'roadmap', // Có thể đổi thành 'satellite', 'hybrid', 'terrain'
        styles: [{ stylers: [{ saturation: -80 }, { gamma: 1.2 }] }]
    });

    // --- 3. LOGIC TỰ ĐỘNG CHUYỂN ĐỔI BẢN ĐỒ NỀN ---
    const zoomThreshold = 14; // Mức zoom để chuyển đổi

    // Hàm kiểm tra và chuyển đổi bản đồ nền
    function updateBaseLayer() {
        const currentZoom = map.getZoom();
        if (currentZoom >= zoomThreshold) {
            if (!map.hasLayer(googleMapsLayer)) {
                map.removeLayer(cartoLayer);
                map.addLayer(googleMapsLayer);
            }
        } else {
            if (!map.hasLayer(cartoLayer)) {
                map.removeLayer(googleMapsLayer);
                map.addLayer(cartoLayer);
            }
        }
    }

    // Gắn sự kiện 'zoomend' để kiểm tra mỗi khi người dùng thay đổi mức zoom
    map.on('zoomend', updateBaseLayer);

    // Thêm lớp bản đồ nền ban đầu
    updateBaseLayer();


    // --- 4. TẢI VÀ HIỂN THỊ DỮ LIỆU RANH GIỚI PHƯỜNG/XÃ TỪ TỆP wards.json ---
    fetch('wards.json')
        .then(response => response.json())
        .then(data => {
            // Chuyển đổi TopoJSON thành GeoJSON
            const wardsGeoJSON = topojson.feature(data, data.objects.collection);

            // Vẽ ranh giới các phường lên bản đồ
            L.geoJSON(wardsGeoJSON, {
                style: function(feature) {
                    return {
                        color: "#e74c3c", // Màu đỏ nổi bật
                        weight: 1.5,
                        opacity: 0.8,
                        fillColor: "#e74c3c",
                        fillOpacity: 0.1
                    };
                },
                onEachFeature: function(feature, layer) {
                    // Thêm popup hiển thị tên phường khi nhấp vào
                    if (feature.properties && feature.properties.Tên) {
                        layer.bindPopup(`<h4>Phường ${feature.properties.Tên}</h4>`);
                    }
                }
            }).addTo(map);
        })
        .catch(error => console.error('Không thể tải dữ liệu bản đồ wards.json:', error));
}
function initMapData() {
    // --- Vẽ ranh giới các Phường/Xã ---
    fetch('phuongxa.json')
        .then(response => response.json())
        .then(data => {
            const wards = data[0].wards;
            wards.forEach(ward => {
                if (ward.geometry) {
                    const wardLayer = L.geoJSON(ward.geometry, {
                        style: { // Kiểu mặc định
                            color: "#ff7800",
                            weight: 1,
                            opacity: 0.65,
                            fillOpacity: 0.1
                        }
                    }).bindPopup(`<b>Phường ${ward.name}</b>`);

                    wardLayer.addTo(map);
                    // Lưu lại layer để tra cứu sau này
                    const normalizedWardName = removeDiacritics(ward.name).toLowerCase();
                    wardLayersLookup[normalizedWardName] = wardLayer;
                }
            });
        });

    // --- Đánh dấu (ghim) tất cả sản phẩm ---
    // Sử dụng biến allItems đã được tạo sẵn
     allItems.forEach(item => {
        if (item.location && item.location.coordinates) {
            const marker = L.marker([item.location.coordinates[1], item.location.coordinates[0]]);
            
            const popupContent = `
                <div style="font-family: Arial, sans-serif; font-size: 14px;">
                    <img src="assets/images/${item.images[0]}" alt="${item.title}" style="width:100%; height:auto; border-radius:4px; margin-bottom: 5px;">
                    <h5 style="margin: 0 0 5px 0; font-size: 15px;"><a href="product-detail.html?id=${item.id}" target="_blank">${item.title}</a></h5>
                    <p style="margin: 0; color: #e67e22; font-weight: bold;">${item.price} tỷ</p>
                </div>
            `;
            
            // **SỬA ĐỔI:** Lưu nội dung popup vào marker
            marker.myPopupContent = popupContent; 
            
            marker.bindPopup(popupContent);
            marker.addTo(map);
            allMapMarkers[item.id] = marker;
        }
    });
}

// HÀM TRUNG TÂM MỚI: Cập nhật URL và làm mới toàn bộ giao diện
// TÌM VÀ THAY THẾ TOÀN BỘ HÀM NÀY

function applyFiltersAndRefresh() {
    const query = searchInput.value.trim();
    const normalizedQuery = removeDiacritics(query).toLowerCase();
    const urlParams = new URLSearchParams(window.location.search);

    // Xóa các tham số tìm kiếm cũ để tránh trùng lặp
    urlParams.delete('q');
    urlParams.delete('phuong');
    urlParams.delete('duong');

    // KIỂM TRA: LÀ TÌM KIẾM ĐỊA DANH HAY TỪ KHÓA?
    if (query && wardToCityLookup[normalizedQuery]) {
        // ---- TRƯỜNG HỢP 1: TÌM KIẾM ĐỊA DANH (PHƯỜNG) ----
        const cityName = wardToCityLookup[normalizedQuery];
        if (cityName) {
            urlParams.set('thanhpho', toSlug(cityName));
        }
        urlParams.set('phuong', toSlug(query)); // Dùng toSlug(query) để giữ đúng tên có dấu

    } else if (query) {
        // ---- TRƯỜNG HỢP 2: TÌM KIẾM TỪ KHÓA CHUNG ----
        urlParams.set('q', query);
    }
    
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    history.replaceState(null, '', newUrl);

    // Gọi các hàm làm mới giao diện
    updateDisplay();
    updateBreadcrumb();
    updateMapMarkers();
}


    function initSidebarEvents() {
        const openBtn = document.getElementById('floating-filter-trigger');
        const secondaryOpenBtn = document.getElementById('secondary-filter-trigger');
        const closeBtn = document.getElementById('close-filter-btn');
        const overlay = document.getElementById('filter-overlay-mobile');
        if (!sidebar || !overlay) return;

        const openSidebar = () => { sidebar.classList.add('is-open'); overlay.classList.add('is-active'); };
        const closeSidebar = () => { sidebar.classList.remove('is-open'); overlay.classList.remove('is-active'); };

        if (openBtn) openBtn.addEventListener('click', openSidebar);
        if (secondaryOpenBtn) secondaryOpenBtn.addEventListener('click', openSidebar);
        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
        if (overlay) overlay.addEventListener('click', closeSidebar);

        sidebar.querySelectorAll('.filter-accordion .accordion-trigger').forEach(trigger => { trigger.addEventListener('click', function() { this.parentElement.classList.toggle('active'); const content = this.nextElementSibling; content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px"; }); });
        sidebar.querySelectorAll('.price-input-tabs').forEach(tabGroup => { tabGroup.addEventListener('click', function(e) { if (!e.target.matches('.price-tab-btn')) return; const tabBtn = e.target; const targetId = tabBtn.dataset.target; const targetContent = document.getElementById(targetId); const accordionContent = this.closest('.accordion-content'); tabGroup.querySelectorAll('.price-tab-btn').forEach(btn => btn.classList.remove('active')); accordionContent.querySelectorAll('.price-tab-content').forEach(content => content.classList.remove('active')); tabBtn.classList.add('active'); if (targetContent) targetContent.classList.add('active'); if (accordionContent.style.maxHeight) accordionContent.style.maxHeight = accordionContent.scrollHeight + "px"; updateFilterTagsUI(); }); });
        sidebar.querySelectorAll('.btn-group').forEach(group => { group.addEventListener('click', (e) => { if (e.target.tagName === 'BUTTON') { group.querySelector('.active')?.classList.remove('active'); e.target.classList.add('active'); updateFilterTagsUI(); } }); });
        sidebar.querySelectorAll('.checkbox-group input').forEach(input => { input.addEventListener('change', updateFilterTagsUI); });
        
        sidebar.querySelectorAll('.custom-range-input input').forEach(input => {
            input.addEventListener('input', (e) => {
                const parentGroup = e.target.closest('.filter-group');
                parentGroup.querySelector('.btn-group .active')?.classList.remove('active');
                parentGroup.querySelector('.price-tab-btn[data-target*="custom"]')?.click();
            });
            input.addEventListener('change', updateFilterTagsUI);
        });

        applyFilterBtn.addEventListener('click', () => { applyFiltersAndRefresh();; const resultsSummary = document.querySelector('.results-summary'); if (resultsSummary) { resultsSummary.scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
        if (resetBtn) { resetBtn.addEventListener('click', () => { sidebar.querySelectorAll('input[type="text"]').forEach(i => i.value = ''); sidebar.querySelectorAll('.btn-group').forEach(g => { g.querySelector('.active')?.classList.remove('active'); g.children[0].classList.add('active'); }); sidebar.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false); searchInput.value = ''; updateDisplay(); }); }
        
  
        sortSelect.addEventListener('change', () => { sortItems(); showPage(1); });
    }

    // =================================================================
    // == KHU VỰC DÀNH CHO LỊCH SỬ GIÁ VÀ BIỂU ĐỒ (ĐÃ PHỤC HỒI) ==
    // =================================================================
    function initOtherSections() {
        initPriceHistory();
        initPriceHistoryChart();
        initFaqAndSeoSection();
    }
    
    function initPriceHistory() {
        if (isRentalPage) {
            initPriceHistoryForRent();
        } else {
            initPriceHistoryForSale();
        }
    }

    function initPriceHistoryForRent() { /* ... Logic cho trang thuê ... */ }

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
            const urlParams = new URLSearchParams(window.location.search);
            const citySlugFromUrl = urlParams.get('thanhpho');
            const wardSlugFromUrl = urlParams.get('phuong');
            let yearData = priceHistoryData[year] || [];
            if (citySlugFromUrl) yearData = yearData.filter(tx => toSlug(tx.city) === citySlugFromUrl);
            if (wardSlugFromUrl) yearData = yearData.filter(tx => toSlug(tx.ward) === wardSlugFromUrl);
            if (yearData.length === 0) { tableContainer.innerHTML = '<p style="text-align:center; color:#666;">Không có dữ liệu lịch sử giá cho khu vực này.</p>'; return; }
            tableContainer.innerHTML = '';
            for (const key in areaGroups) { areaGroups[key].details = []; }
            yearData.forEach(tx => {
                for (const key in areaGroups) {
                    if (key !== 'all' && tx.area >= areaGroups[key].min && tx.area <= areaGroups[key].max) {
                        tx.unitPrice = (tx.price * 1000) / tx.area;
                        areaGroups[key].details.push(tx);
                        break;
                    }
                }
            });
            for (const groupName in areaGroups) {
                if (groupName === 'all' || areaGroups[groupName].details.length === 0) continue;
                const group = areaGroups[groupName];
                const wrapper = document.createElement('div'); 
                wrapper.className = 'summary-row-wrapper';
                const prices = group.details.map(d => d.price);
                const unitPrices = group.details.map(d => d.unitPrice);
                const priceString = `${Math.min(...prices).toFixed(2)} - ${Math.max(...prices).toFixed(2)} tỷ`;
                const unitPriceString = `${Math.min(...unitPrices).toFixed(1)} - ${Math.max(...unitPrices).toFixed(1)} tr/m²`;
                const summaryRow = document.createElement('div'); 
                summaryRow.className = 'summary-row accordion-trigger';
                summaryRow.innerHTML = `<span class="summary-label">${groupName}</span><span class="summary-value">${priceString}</span><span class="summary-value">${unitPriceString}</span><span class="summary-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg></span>`;
                const detailContent = document.createElement('div'); 
                detailContent.className = 'detailed-table-content';
                let tableHTML = `<table class="detailed-table"><thead><tr><th>Thời gian</th><th>Diện tích</th><th>Giá (tỷ)</th><th>Đơn giá (tr/m²)</th><th>Pháp lý</th><th>Nội thất</th></tr></thead><tbody>`;
                group.details.forEach(detail => {
                    tableHTML += `<tr><td>T${new Date(detail.publishedAt).getMonth() + 1}</td><td>${detail.area}</td><td>${detail.price.toFixed(2)}</td><td>${detail.unitPrice.toFixed(1)}</td><td>${detail.legal}</td><td>${detail.furniture}</td></tr>`;
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
                    this.closest('.summary-row-wrapper').classList.toggle('active'); 
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
                    tabsContainer.querySelector('.active')?.classList.remove('active'); 
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
        if (isRentalPage) {
            initScatterChartForRent();
        } else {
            initLineChartForSale();
        }
    }

    function initScatterChartForRent() { /* ... Logic cho trang thuê ... */ }

    function initLineChartForSale() {
        const ctx = document.getElementById('price-history-chart')?.getContext('2d');
        const yearFiltersContainer = document.getElementById('chart-year-filters');
        const areaFilterSelect = document.getElementById('chart-area-filter');
        const chartTitleElement = document.getElementById('chart-dynamic-title');
        if (!ctx || !yearFiltersContainer || !areaFilterSelect || typeof priceHistoryData === 'undefined') return;
        const YEAR_COLORS = { '2025': { border: 'rgba(54, 162, 235, 1)', bg: 'rgba(54, 162, 235, 0.2)' }, '2024': { border: 'rgba(255, 99, 132, 1)', bg: 'rgba(255, 99, 132, 0.2)' }, '2023': { border: 'rgba(75, 192, 192, 1)', bg: 'rgba(75, 192, 192, 0.2)' } };
        const areaGroups = { 'all': { min: 0, max: Infinity, text: 'Tất cả' }, 'Dưới 50m²': { min: 0, max: 49.9, text: 'Dưới 50m²' }, '50-80m²': { min: 50, max: 79.9, text: '50-80m²' }, '80-120m²': { min: 80, max: 119.9, text: '80-120m²' }, 'Trên 120m²': { min: 120, max: Infinity, text: 'Trên 120m²' } };
        let priceChart;
        function processChartData(years, areaKey) {
            const urlParams = new URLSearchParams(window.location.search);
            const citySlugFromUrl = urlParams.get('thanhpho');
            const wardSlugFromUrl = urlParams.get('phuong');
            const areaFilter = areaGroups[areaKey]; 
            const processedData = {};
            years.forEach(year => {
                let yearData = priceHistoryData[year] || [];
                if (citySlugFromUrl) yearData = yearData.filter(tx => toSlug(tx.city) === citySlugFromUrl);
                if (wardSlugFromUrl) yearData = yearData.filter(tx => toSlug(tx.ward) === wardSlugFromUrl);
                const monthlyData = Array(12).fill(null).map(() => ({ prices: [] }));
                yearData.forEach(tx => { 
                    if (tx.area >= areaFilter.min && tx.area <= areaFilter.max) { 
                        monthlyData[new Date(tx.publishedAt).getMonth()].prices.push((tx.price * 1000 / tx.area));
                    } 
                });
                processedData[year] = { avg: [], min: [], max: [], count: [] };
                monthlyData.forEach((month, i) => {
                    if (month.prices.length > 0) {
                        processedData[year].avg[i] = (month.prices.reduce((a, b) => a + b, 0) / month.prices.length).toFixed(1);
                        processedData[year].min[i] = Math.min(...month.prices).toFixed(1);
                        processedData[year].max[i] = Math.max(...month.prices).toFixed(1);
                        processedData[year].count[i] = month.prices.length;
                    }
                });
            });
            return processedData;
        }
        function updateChart() {
            const selectedYears = Array.from(yearFiltersContainer.querySelectorAll('button.active')).map(btn => btn.dataset.year);
            const selectedAreaKey = areaFilterSelect.value;
            const chartData = processChartData(selectedYears, selectedAreaKey);
            chartTitleElement.textContent = `Biểu đồ biến động giá năm ${selectedYears.join(', ')} - ${areaGroups[selectedAreaKey].text}`;
            const datasets = [];
            selectedYears.forEach(year => {
                const color = YEAR_COLORS[year] || { border: 'grey', bg: 'rgba(128,128,128,0.2)'};
                datasets.push({ label: `TB ${year}`, data: chartData[year].avg, borderColor: color.border, backgroundColor: color.bg, borderWidth: 3, fill: 'start', tension: 0.4 });
            });
            if (!priceChart) { 
                priceChart = new Chart(ctx, { type: 'line', data: { labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'], datasets: datasets }, options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, scales: { y: { title: { display: true, text: 'Đơn giá (triệu/m²)' } } }, plugins: { legend: { position: 'bottom' } } } }); 
            } else { 
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
                button.addEventListener('click', function() { this.classList.toggle('active'); updateChart(); });
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
            accordionGroup.querySelectorAll('.accordion-header').forEach(header => {
                header.addEventListener('click', () => {
                    const item = header.parentElement;
                    const content = header.nextElementSibling;
                    const isActive = item.classList.contains('active');
                    item.parentElement.querySelectorAll('.accordion-item').forEach(i => {
                        i.classList.remove('active');
                        i.querySelector('.accordion-content').style.maxHeight = null;
                    });
                    if (!isActive) {
                        item.classList.add('active');
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                });
            });
        }
        const toggleButton = document.getElementById('seo-toggle-button');
        const textWrapper = document.getElementById('seo-text-wrapper');
        if (toggleButton && textWrapper) {
            toggleButton.addEventListener('click', () => {
                const isExpanded = textWrapper.classList.toggle('expanded');
                toggleButton.textContent = isExpanded ? 'Thu gọn' : 'Xem thêm';
            });
        }
    }
    
    // TÌM VÀ THAY THẾ TOÀN BỘ HÀM NÀY

function updateBreadcrumb() {
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    const categoryHeader = document.querySelector('.category-header h1');
    if (!breadcrumbContainer || !categoryHeader) return;

    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('q');
    
    // Ưu tiên 1: Nếu có từ khóa tìm kiếm chung 'q', hiển thị tiêu đề tìm kiếm
    if (searchQuery) {
        categoryHeader.textContent = `Kết quả tìm kiếm cho: "${searchQuery}"`;
        breadcrumbContainer.innerHTML = `<a href="index.html">Trang chủ</a> &gt; <span>Tìm kiếm</span>`;
        return; // Dừng tại đây
    }

    // Ưu tiên 2: Hiển thị tiêu đề và breadcrumb theo địa danh trên URL
    const slugs = { loaiHinh: params.get('loaihinh'), city: params.get('thanhpho'), ward: params.get('phuong'), duong: params.get('duong') };
    const texts = { category: categoryLookup[slugs.loaiHinh] || 'BĐS', city: cityLookup[slugs.city], ward: wardLookup[slugs.ward], street: streetLookup[slugs.duong] };
    const propertyType = isRentalPage ? 'Cho thuê' : 'Mua bán';
    const listingPage = isRentalPage ? 'listing-thue.html' : 'listing-ban.html';
    
    let mainTitle = `${propertyType} ${texts.category}`;
    if (slugs.duong) mainTitle += ` tại đường ${texts.street}, Phường ${texts.ward}, ${texts.city}`;
    else if (slugs.ward) mainTitle += ` tại Phường ${texts.ward}, ${texts.city}`;
    else if (slugs.city) mainTitle += ` tại ${texts.city}`;
    else mainTitle += ` tại TP. Hồ Chí Minh`; // Mặc định nếu không có

    categoryHeader.textContent = mainTitle;

    const breadcrumbParts = [`<a href="index.html">Trang chủ</a>`];
    if (texts.category) breadcrumbParts.push(`<span>${propertyType} ${texts.category}</span>`);
    if (slugs.city && texts.city) breadcrumbParts.push(`<a href="${listingPage}?loaihinh=${slugs.loaiHinh}&thanhpho=${slugs.city}">${texts.city}</a>`);
    if (slugs.ward && texts.ward) breadcrumbParts.push(`<a href="${listingPage}?loaihinh=${slugs.loaiHinh}&thanhpho=${slugs.city}&phuong=${slugs.ward}">Phường ${texts.ward}</a>`);
    
    // Đảm bảo phần tử cuối cùng không phải là link
    if (breadcrumbParts.length > 2) {
        const lastPart = breadcrumbParts.pop();
        breadcrumbParts.push(lastPart.replace(/<a\b[^>]*>/, '<span>').replace(/<\/a>/, '</span>'));
    }
    breadcrumbContainer.innerHTML = breadcrumbParts.join(' &gt; ');
}

    function initMapViewToggle() {
        const showMapBtn = document.getElementById('show-map-btn');
    const showListBtn = document.getElementById('show-list-btn');
    if (showMapBtn && showListBtn) {
        showMapBtn.addEventListener('click', () => {
            document.body.classList.add('map-view-active');
            
            // SỬA LỖI: Thêm đoạn code này để cập nhật lại kích thước bản đồ
            // Sau khi khối chứa bản đồ hiện ra, chúng ta cần báo cho Leaflet
            // biết để nó tính toán lại kích thước và hiển thị đúng.
            // Dùng setTimeout để đợi hiệu ứng chuyển đổi CSS (500ms) hoàn tất.
            setTimeout(function() {
                if (map) { // Kiểm tra xem biến 'map' đã tồn tại chưa
                    map.invalidateSize();
                }
            }, 500); 
        });

        showListBtn.addEventListener('click', () => {
            document.body.classList.remove('map-view-active');
        });
    }
    }
 function initMobileMapView() {
    const mobileMapTrigger = document.getElementById('mobile-map-trigger');
    if (!mobileMapTrigger) return;

    // Lưu lại nội dung SVG của 2 icon
    const mapIconSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path></svg>';
    const listIconSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>';

    const iconElement = mobileMapTrigger.querySelector('svg');
    const textElement = mobileMapTrigger.querySelector('span');

    mobileMapTrigger.addEventListener('click', () => {
        const isMapView = document.body.classList.contains('mobile-map-view-active');

        document.body.classList.toggle('mobile-map-view-active');
        mobileMapTrigger.classList.toggle('is-list-view');

        if (!isMapView) {
            // SỬA LỖI: Thay thế toàn bộ nội dung của nút
            // Khi chuyển sang xem bản đồ -> nút trở thành "Danh sách"
            mobileMapTrigger.innerHTML = listIconSVG + '<span>Danh sách</span>';
        } else {
            // SỬA LỖI: Thay thế toàn bộ nội dung của nút
            // Khi quay lại xem danh sách -> nút trở lại thành "Bản đồ"
            mobileMapTrigger.innerHTML = mapIconSVG + '<span>Bản đồ</span>';
        }
    });
}



// Hàm làm nổi bật Phường/Xã và zoom vào
function highlightWard(wardName) {
    // Bỏ làm nổi bật layer cũ
    if (highlightedWardLayer) {
        highlightedWardLayer.setStyle({
            color: "#ff7800",
            weight: 1,
            fillOpacity: 0.1
        });
    }

    const normalizedWardName = removeDiacritics(wardName).toLowerCase();
    const targetLayer = wardLayersLookup[normalizedWardName];

    if (targetLayer) {
        // Làm nổi bật layer mới
        targetLayer.setStyle({
            color: "#e74c3c", // Màu đỏ nổi bật
            weight: 3,
            fillOpacity: 0.4
        });
        targetLayer.bringToFront(); // Đưa layer lên trên cùng
        
        // Zoom bản đồ tới ranh giới của phường
        map.fitBounds(targetLayer.getBounds(), { padding: [50, 50] });

        highlightedWardLayer = targetLayer;
    }
}

// Hàm cập nhật hiển thị của các markers
// Hàm cập nhật hiển thị của các markers (phiên bản đã sửa lỗi)
function updateMapMarkers() {
    if (typeof allMapMarkers === 'undefined') return;

    const visibleIds = new Set(visibleItems.map(item => item.id));

    for (const markerId in allMapMarkers) {
        const marker = allMapMarkers[markerId];
        if (visibleIds.has(markerId)) {
            // Hiện rõ marker có trong kết quả
            marker.setOpacity(1);
            
            // Nếu marker chưa có popup, gắn lại nó
            if (!marker.getPopup()) {
                marker.bindPopup(marker.myPopupContent);
            }
        } else {
            // Làm mờ marker không có trong kết quả
            marker.setOpacity(0.25);
            
            // Nếu marker đang có popup, gỡ nó ra để không click được
            if (marker.getPopup()) {
                marker.unbindPopup();
            }
        }
    }
}

    function init() {
        updateBreadcrumb();
        initSidebarEvents();
        initOtherSections();
        
        renderFavoritesDrawer();
        
        initMap();
        initMapData(); // <- GỌI HÀM MỚI Ở ĐÂY
        const searchForm = document.querySelector('form.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        applyFiltersAndRefresh();

        // Logic di chuyển bản đồ nếu tìm theo phường vẫn giữ nguyên
        const query = searchInput.value.trim();
        if (query && wardLayersLookup[removeDiacritics(query).toLowerCase()]) {
             const layer = wardLayersLookup[removeDiacritics(query).toLowerCase()];
             map.fitBounds(layer.getBounds(), { paddingTopLeft: [300, 0] });
             layer.openPopup();
        }
    });
}
        updateDisplay();
        initMapViewToggle();
        initMobileMapView(); 
    }
 
    init();
});