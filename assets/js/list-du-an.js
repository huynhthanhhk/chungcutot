// assets/js/list-du-an.js (Hoàn thiện - Đã thêm tính năng Sắp xếp)

document.addEventListener('DOMContentLoaded', function() {
    if (typeof allProjectsData === 'undefined') {
        console.error("Lỗi: Không tìm thấy dữ liệu dự án (allProjectsData).");
        const grid = document.querySelector('.project-list-grid');
        if(grid) grid.innerHTML = '<p class="no-results-message" style="grid-column: 1 / -1; text-align: center; padding: 20px;">Lỗi: Không thể tải dữ liệu dự án.</p>';
        return;
    }

    // --- TIỆN ÍCH, BIẾN VÀ KHỞI TẠO DỮ LIỆU ---
    const toSlug = (str) => {
        if (!str) return '';
        let s = str.toLowerCase();
        if (s === 'hồ chí minh') return 'tp-ho-chi-minh';
        if (s === 'hà nội') return 'tp-ha-noi';
        s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        s = s.replace(/[đĐ]/g, 'd');
        s = s.replace(/([^0-9a-z-\s])/g, '');
        s = s.replace(/(\s+)/g, '-');
        s = s.replace(/-+/g, '-');
        s = s.replace(/^-+|-+$/g, '');
        return s;
    };
    
    const allProjects = allProjectsData.map(project => {
        const searchableString = [
            project.projectName, project.developer, project.address, project.status,
            project.legal, project.segment, ...(project.features || [])
        ].join(' ').toLowerCase();
        
        return {
            ...project,
            priceSale: project.salePrice ? project.salePrice.min : null,
            priceRent: project.rentPrice ? project.rentPrice.min : null,
            searchableString
        };
    });

    const cityLookup = {}, wardLookup = {}, projectTypeLookup = {};
    allProjects.forEach(item => {
        if (item.city) cityLookup[toSlug(item.city)] = item.city;
        if (item.ward) wardLookup[toSlug(item.ward)] = item.ward;
        if (item.ProjectType) projectTypeLookup[toSlug(item.ProjectType)] = item.ProjectType;
    });

    const projectGrid = document.querySelector('.project-list-grid');
    const resultsCountEl = document.querySelector('.results-count');
    const sidebar = document.getElementById('listing-filter-sidebar');
    const searchInput = document.querySelector('.search-form input[type="search"]');
    const filterTagArea = sidebar ? sidebar.querySelector('.filter-tag-area') : null;
    const paginationContainer = document.querySelector('.pagination');
    const sortSelect = document.getElementById('sort-select'); // Thêm biến cho sort

    let visibleProjects = [];
    let currentPage = 1;
    const itemsPerPage = 10;

    // --- CÁC HÀM HIỂN THỊ, LỌC, SẮP XẾP VÀ CẬP NHẬT GIAO DIỆN ---

    function renderProjects(projectsToRender) {
        if (!projectGrid) return;
        if (projectsToRender.length === 0 && visibleProjects.length === 0) {
            projectGrid.innerHTML = '<p style="padding: 20px; text-align: center; grid-column: 1 / -1;">Không tìm thấy dự án nào phù hợp.</p>';
        } else {
             projectGrid.innerHTML = projectsToRender.map(project => {
                let statusClass = '';
                const statusLower = project.status.toLowerCase();
                if (statusLower.includes('sắp')) statusClass = 'sap-mo-ban';
                if (statusLower.includes('bàn giao')) statusClass = 'da-ban-giao';
                const priceText = project.priceSale && project.priceSale > 0 ? `Giá từ ${project.priceSale} tỷ` : (project.priceRent && project.priceRent > 0 ? `Thuê từ ${project.priceRent} triệu/tháng` : 'Đang cập nhật');
                return `
                    <a href="du-an-chi-tiet.html?id=${project.projectId}" class="project-summary-card">
                        <div class="project-card-image-large"><img src="${project.image}" alt="Dự án ${project.projectName}" onerror="this.onerror=null;this.src='https://placehold.co/300x200/e2e8f0/e2e8f0?text=Lỗi+Ảnh';"></div>
                        <div class="project-card-info">
                            <span class="project-card-status ${statusClass}">${project.status}</span>
                            <h3 class="project-card-title">${project.projectName}</h3>
                            <p class="project-card-developer"><svg fill="currentColor" viewBox="0 0 16 16" width="16" height="16"><path d="M4 1.5A1.5 1.5 0 0 1 5.5 0h5A1.5 1.5 0 0 1 12 1.5v13a.5.5 0 0 1-.854.354L8 12.207l-3.146 2.647A.5.5 0 0 1 4 14.5v-13z"></path></svg>Chủ đầu tư: ${project.developer}</p>
                            <p class="project-card-address"><svg fill="currentColor" viewBox="0 0 16 16" width="16" height="16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path></svg>${project.address}</p>
                            <div class="project-card-price">${priceText}</div>
                        </div>
                    </a>`;
            }).join('');
        }
    }
    
    function showPage(page) {
        currentPage = page;
        if (!projectGrid || !paginationContainer) return;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageProjects = visibleProjects.slice(startIndex, endIndex);
        renderProjects(pageProjects);
        updatePaginationLinks();
    }

    function updatePaginationLinks() {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(visibleProjects.length / itemsPerPage);
        if (totalPages <= 1) return;
        for (let i = 1; i <= totalPages; i++) {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = i;
            if (i === currentPage) {
                link.classList.add('active');
            }
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showPage(i);
                document.querySelector('.results-summary')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            paginationContainer.appendChild(link);
        }
    }
    
    // ===== BẮT ĐẦU HÀM SẮP XẾP MỚI =====
    function sortProjects() {
        if (!sortSelect) return;
        const criteria = sortSelect.value;
        
        visibleProjects.sort((a, b) => {
            switch (criteria) {
                case 'price-sale-asc':
                    // Đẩy các giá trị null/0 xuống cuối
                    if (!a.priceSale) return 1;
                    if (!b.priceSale) return -1;
                    return a.priceSale - b.priceSale;
                case 'price-sale-desc':
                    return b.priceSale - a.priceSale;
                case 'oldest':
                    return a.handoverYear - b.handoverYear;
                case 'newest':
                default:
                    return b.handoverYear - a.handoverYear;
            }
        });
    }
    // ===== KẾT THÚC HÀM SẮP XẾP MỚI =====
    
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
            group.querySelectorAll('.checkbox-group input:checked').forEach(checkbox => {
                createTag(checkbox.nextElementSibling.textContent, () => {
                    checkbox.checked = false;
                    updateDisplay();
                });
            });
            if (groupName === 'price-sale' || groupName === 'price-rent') {
                const quickSelectActive = group.querySelector('.btn-group button.active:not(:first-child)');
                if (quickSelectActive) {
                    createTag(quickSelectActive.textContent, () => {
                        const btnGroup = quickSelectActive.closest('.btn-group');
                        btnGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                        btnGroup.children[0].classList.add('active');
                        updateDisplay();
                    });
                } else {
                    const minInput = group.querySelector('.filter-input-min'), maxInput = group.querySelector('.filter-input-max');
                    if (!minInput || !maxInput) return;
                    const minVal = minInput.value, maxVal = maxInput.value, unit = group.querySelector('.unit-label')?.textContent || '';
                    let tagValue = '';
                    if (minVal && maxVal) tagValue = `${minVal} - ${maxVal} ${unit}`;
                    else if (minVal) tagValue = `Từ ${minVal} ${unit}`;
                    else if (maxVal) tagValue = `Đến ${maxVal} ${unit}`;
                    if (tagValue) createTag(tagValue, () => { minInput.value = ''; maxInput.value = ''; updateDisplay(); });
                }
            }
        });
        filterTagArea.style.display = activeFilterCount > 0 ? 'block' : 'none';
    }
    
    function updateBreadcrumb() {
        const breadcrumbContainer = document.querySelector('.breadcrumb');
        const categoryHeader = document.querySelector('.category-header h1');
        const categoryDescription = document.querySelector('.category-header p');
        if (!breadcrumbContainer || !categoryHeader) return;
        const params = new URLSearchParams(window.location.search);
        const loaiHinhSlug = params.get('loaihinh'), citySlug = params.get('thanhpho'), wardSlug = params.get('phuong');
        const cityText = cityLookup[citySlug] || '', wardText = wardLookup[wardSlug] || '', projectTypeText = projectTypeLookup[loaiHinhSlug] || 'Dự án';
        let mainTitle = `Dự án ${projectTypeText}`;
        if (wardText && cityText) mainTitle = `Dự án ${projectTypeText} tại Phường ${wardText}, ${cityText}`;
        else if (cityText) mainTitle = `Dự án ${projectTypeText} tại ${cityText}`;
        categoryHeader.textContent = mainTitle;
        if(categoryDescription) categoryDescription.textContent = `Danh sách các dự án ${projectTypeText.toLowerCase()} được tìm thấy.`;
        let breadcrumbParts = [];
        breadcrumbParts.push(`<span>Dự án</span>`);
        if (loaiHinhSlug && projectTypeText !== 'Dự án') {
            const link = citySlug ? `<a href="list-du-an.html?loaihinh=${loaiHinhSlug}">${projectTypeText}</a>` : `<span>${projectTypeText}</span>`;
            breadcrumbParts.push(link);
        }
        if (citySlug && cityText) {
            const link = wardSlug ? `<a href="list-du-an.html?loaihinh=${loaiHinhSlug}&thanhpho=${citySlug}">${cityText}</a>` : `<span>${cityText}</span>`;
            breadcrumbParts.push(link);
        }
        if (wardSlug && wardText) {
            breadcrumbParts.push(`<span>${wardText}</span>`);
        }
        breadcrumbContainer.innerHTML = breadcrumbParts.join(' &gt; ');
    }
    
    function updateDisplay() {
        applyProjectFilters();
        sortProjects(); // Sắp xếp lại danh sách trước khi hiển thị
        showPage(1);    // Luôn hiển thị trang đầu tiên của kết quả mới
        if (window.innerWidth < 992) {
            sidebar.classList.remove('is-open');
            document.getElementById('filter-overlay-mobile').classList.remove('is-active');
        }
    }

    function applyProjectFilters() {
        const params = new URLSearchParams(window.location.search);
        const loaiHinhSlug = params.get('loaihinh'), citySlug = params.get('thanhpho'), wardSlug = params.get('phuong');
        const getCheckedValues = (name) => Array.from(document.querySelectorAll(`[data-filter-name="${name}"] input:checked`)).map(cb => cb.nextElementSibling.textContent.trim());
        const parseTextToRange = (text) => { const nums = text.match(/\d+/g)?.map(Number) || []; if (text.includes('Dưới')) return {min: 0, max: nums[0] || null}; if (text.includes('Trên')) return {min: nums[0] || null, max: Infinity}; if (nums.length === 2) return {min: nums[0], max: nums[1]}; return {min: null, max: null}; };
        const getPriceFilter = (selector) => { const g = sidebar.querySelector(selector); if (!g) return {min: null, max: null}; const tab = g.querySelector('.price-tab-btn.active'), tabId = tab ? tab.dataset.target : null; if (tabId && document.getElementById(tabId)?.classList.contains('active')) { const content = document.getElementById(tabId); if (tabId.includes('quick')) { const btn = content.querySelector('button.active'); if (btn && btn.textContent.toLowerCase() !== 'tất cả') return parseTextToRange(btn.textContent); } else if (tabId.includes('custom')) { const min = parseFloat(content.querySelector('.filter-input-min').value), max = parseFloat(content.querySelector('.filter-input-max').value); return {min: isNaN(min) ? null : min, max: isNaN(max) ? null : max}; } } return {min: null, max: null}; };
        const selectedStatuses = getCheckedValues('status'), selectedLegals = getCheckedValues('legal'), selectedSegments = getCheckedValues('segment');
        const priceSaleRange = getPriceFilter('[data-filter-name="price-sale"]'), priceRentRange = getPriceFilter('[data-filter-name="price-rent"]');
        const searchTerm = searchInput.value.toLowerCase().trim(), searchTokens = searchTerm.split(/\s+/).filter(token => token.length > 0);

        visibleProjects = allProjects.filter(project => {
            const legalMatch = selectedLegals.length === 0 || selectedLegals.includes(project.legal);
            const segmentMatch = selectedSegments.length === 0 || selectedSegments.includes(project.segment);
            let salePricePass = true;
            if (priceSaleRange.min !== null || priceSaleRange.max !== null) salePricePass = project.priceSale !== null && (priceSaleRange.min === null || project.priceSale >= priceSaleRange.min) && (priceSaleRange.max === null || project.priceSale <= priceSaleRange.max);
            let rentPricePass = true;
            if (priceRentRange.min !== null || priceRentRange.max !== null) rentPricePass = project.priceRent !== null && (priceRentRange.min === null || project.priceRent >= priceRentRange.min) && (priceRentRange.max === null || project.priceRent <= priceRentRange.max);
            const searchMatch = searchTokens.length === 0 || searchTokens.every(token => project.searchableString.includes(token));
            let statusMatch = true;
            if (selectedStatuses.length > 0) {
                statusMatch = false; const currentYear = 2025, handoverYear = parseInt(project.handoverYear, 10);
                for (const status of selectedStatuses) {
                    if (status === 'Bàn giao <= 5 năm') { if (!isNaN(handoverYear) && (currentYear - handoverYear <= 5)) { statusMatch = true; break; } } 
                    else { if (project.status === status) { statusMatch = true; break; } }
                }
            }
            const projectTypeMatch = !loaiHinhSlug || toSlug(project.ProjectType) === loaiHinhSlug;
            const cityMatch = !citySlug || toSlug(project.city) === citySlug;
            const wardMatch = !wardSlug || toSlug(project.ward) === wardSlug;
            return statusMatch && legalMatch && segmentMatch && salePricePass && rentPricePass && searchMatch && projectTypeMatch && cityMatch && wardMatch;
        });
        
        // Chỉ cập nhật text, không gọi hàm hiển thị từ đây nữa
        if(resultsCountEl) resultsCountEl.textContent = `Tìm thấy ${visibleProjects.length} dự án`;
        updateFilterTagsUI();
    }
    
    function initFilterInteractions() {
        if (!sidebar) return;
        const openBtn = document.getElementById('floating-filter-trigger'), closeBtn = document.getElementById('close-filter-btn'), overlay = document.getElementById('filter-overlay-mobile'), applyBtn = sidebar.querySelector('.filter-apply-btn'), resetBtn = sidebar.querySelector('.filter-reset-btn');
        const openSidebar = () => { sidebar.classList.add('is-open'); overlay.classList.add('is-active'); }, closeSidebar = () => { sidebar.classList.remove('is-open'); overlay.classList.remove('is-active'); };
        if (openBtn && closeBtn && overlay) { openBtn.addEventListener('click', openSidebar); closeBtn.addEventListener('click', closeSidebar); overlay.addEventListener('click', closeSidebar); }
        sidebar.querySelectorAll('.filter-accordion .accordion-trigger').forEach(trigger => { trigger.addEventListener('click', function() { this.parentElement.classList.toggle('active'); const content = this.nextElementSibling; content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px"; }); });
        sidebar.querySelectorAll('.price-input-tabs').forEach(tabGroup => { tabGroup.addEventListener('click', function(e) { if (!e.target.matches('.price-tab-btn')) return; const tabBtn = e.target, targetId = tabBtn.dataset.target, targetContent = document.getElementById(targetId), accordionContent = this.closest('.accordion-content'); tabGroup.querySelectorAll('.price-tab-btn').forEach(btn => btn.classList.remove('active')); accordionContent.querySelectorAll('.price-tab-content').forEach(content => content.classList.remove('active')); tabBtn.classList.add('active'); if (targetContent) targetContent.classList.add('active'); if (accordionContent.style.maxHeight) accordionContent.style.maxHeight = accordionContent.scrollHeight + "px"; updateFilterTagsUI(); }); });
        sidebar.querySelectorAll('.checkbox-group input').forEach(el => { el.addEventListener('change', updateFilterTagsUI); });
        sidebar.querySelectorAll('.btn-group').forEach(group => { group.addEventListener('click', (e) => { if (e.target.tagName === 'BUTTON') { group.querySelectorAll('button').forEach(btn => btn.classList.remove('active')); e.target.classList.add('active'); const filterGroup = e.target.closest('.filter-group'); if (filterGroup) filterGroup.querySelectorAll('.custom-range-input input').forEach(input => input.value = ''); updateFilterTagsUI(); } }); });
        sidebar.querySelectorAll('.custom-range-input input').forEach(input => {
            input.addEventListener('input', (e) => { const filterGroup = e.target.closest('.filter-group'); if (filterGroup) { filterGroup.querySelectorAll('.btn-group button').forEach(btn => btn.classList.remove('active')); filterGroup.querySelector('.btn-group button:first-child').classList.add('active'); } });
            input.addEventListener('change', (e) => { const rangeContent = e.target.closest('.price-tab-content'); if (rangeContent) { const minInput = rangeContent.querySelector('.filter-input-min'), maxInput = rangeContent.querySelector('.filter-input-max'); if (minInput && maxInput) { const minVal = parseFloat(minInput.value), maxVal = parseFloat(maxInput.value); if (!isNaN(minVal) && !isNaN(maxVal) && maxVal < minVal) { alert('Giá trị "Đến" phải lớn hơn hoặc bằng giá trị "Từ".'); e.target.value = ''; } } } updateFilterTagsUI(); });
        });
        if (applyBtn) { applyBtn.addEventListener('click', () => { updateDisplay(); closeSidebar(); const resultsSummary = document.querySelector('.results-summary'); if(resultsSummary) resultsSummary.scrollIntoView({ behavior: 'smooth', block: 'start' }); }); }
        if (searchInput) { let debounceTimeout; searchInput.addEventListener('input', () => { clearTimeout(debounceTimeout); debounceTimeout = setTimeout(updateDisplay, 350); }); searchInput.closest('form').addEventListener('submit', (e) => { e.preventDefault(); updateDisplay(); }); }
        if (resetBtn) { resetBtn.addEventListener('click', () => { sidebar.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false); sidebar.querySelectorAll('input[type="number"], input[type="text"]').forEach(input => input.value = ''); sidebar.querySelectorAll('.btn-group').forEach(group => { group.querySelectorAll('button').forEach(btn => btn.classList.remove('active')); group.querySelector('button:first-child')?.classList.add('active'); }); sidebar.querySelectorAll('.price-input-tabs').forEach(tabGroup => { const parentContent = tabGroup.closest('.accordion-content'); tabGroup.querySelectorAll('.price-tab-btn').forEach(btn => btn.classList.remove('active')); tabGroup.children[0].classList.add('active'); if(parentContent) { parentContent.querySelectorAll('.price-tab-content').forEach(content => content.classList.remove('active')); const firstPane = parentContent.querySelector('.price-tab-content:first-of-type'); if (firstPane) firstPane.classList.add('active'); } }); if (searchInput) searchInput.value = ''; updateDisplay(); }); }
        
        // Gắn sự kiện cho dropdown sắp xếp
        if(sortSelect) {
            sortSelect.addEventListener('change', () => {
                sortProjects();
                showPage(1); // Hiển thị lại trang đầu tiên với thứ tự mới
            });
        }
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
                    accordionItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.accordion-content').style.maxHeight = null;
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
                const isExpanded = textWrapper.classList.contains('expanded');
                if (isExpanded) {
                    textWrapper.classList.remove('expanded');
                    toggleButton.textContent = 'Xem thêm';
                } else {
                    textWrapper.classList.add('expanded');
                    toggleButton.textContent = 'Thu gọn';
                }
            });
        }
    }
    
    function init() {
        updateBreadcrumb();
        initFilterInteractions();
        initFaqAndSeoSection();
        updateDisplay();
    }

    init();
});