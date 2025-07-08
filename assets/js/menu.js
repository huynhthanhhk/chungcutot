// assets/js/menu.js (Phiên bản cuối cùng)

document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra xem dữ liệu menu đã được tải chưa
    if (typeof dataMenu === 'undefined') {
        console.error("Lỗi: Dữ liệu menu (dataMenu) không tồn tại. Hãy chắc chắn tệp data-menu.js được tải trước.");
        return;
    }

    const initialMenuData = dataMenu; // Sử dụng biến global
    
    const featuredProjectsData = [
        {
            name: 'The Global City',
            description: 'Khu đô thị phức hợp chuẩn quốc tế tại TP. Thủ Đức.',
            image: 'assets/images/project-gallery-1.jpg',
            link: '#'
        }
    ];

    const mainMenuContainer = document.getElementById('main-nav');
    const mainMenuUl = document.getElementById('main-menu-list');
    const hamburgerButton = document.getElementById('hamburger-button');
    const menuOverlay = document.getElementById('menu-overlay');
    const megaMenuContainer = document.getElementById('cct-mega-menu');
    
    let activeMenuItem = null;
    let menuTimeout;

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
    
    function getLink(menuKey, catKey, subItem) {
        let baseUrl = '';
        let params = [];
        const lowerMenuKey = menuKey.toLowerCase();
        
        if (lowerMenuKey.includes('dự án')) baseUrl = 'list-du-an.html';
        else if (lowerMenuKey.includes('bán')) baseUrl = 'listing-ban.html';
        else if (lowerMenuKey.includes('thuê')) baseUrl = 'listing-thue.html';
        else if (lowerMenuKey.includes('wiki')) baseUrl = 'wiki.html';
        else if (lowerMenuKey.includes('tin tức')) baseUrl = 'news.html';
        else if (lowerMenuKey.includes('doanh nghiệp')) baseUrl = 'business.html';
        else baseUrl = '#';
        
        if (catKey) {
            let paramKey = ['Dự án', 'Mua bán', 'Cho thuê'].includes(menuKey) ? 'loaihinh' : 'danh-muc';
            params.push(`${paramKey}=${toSlug(catKey)}`);
        }
        if (subItem) {
            params.push(`thanhpho=${toSlug(subItem)}`);
        }
        
        return `${baseUrl}${params.length > 0 ? '?' : ''}${params.join('&')}`;
    }

    function initMenu() {
        if (!mainMenuContainer || !megaMenuContainer) return;
        if (window.innerWidth > 1024) {
            handleDesktopMenu();
        } else {
            handleMobileMenu();
        }
    }
    
    function handleDesktopMenu() {
        if (!mainMenuUl) return;
        mainMenuUl.innerHTML = ''; 
        for (const menuKey in initialMenuData) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = getLink(menuKey, null, null);
            a.textContent = menuKey;
            li.appendChild(a);
            mainMenuUl.appendChild(li);

            if (Array.isArray(initialMenuData[menuKey]) && initialMenuData[menuKey].length > 0) {
                 li.addEventListener('mouseenter', (e) => {
                    clearTimeout(menuTimeout);
                    if (activeMenuItem) activeMenuItem.classList.remove('active');
                    activeMenuItem = e.currentTarget;
                    activeMenuItem.classList.add('active');
                    populateDesktopPanel(menuKey);
                    megaMenuContainer.classList.add('is-open');
                });
            }
        }
        mainMenuContainer.addEventListener('mouseleave', () => { menuTimeout = setTimeout(closeDesktopPanel, 200); });
        megaMenuContainer.addEventListener('mouseenter', () => clearTimeout(menuTimeout));
        megaMenuContainer.addEventListener('mouseleave', () => { menuTimeout = setTimeout(closeDesktopPanel, 200); });
    }

    function populateDesktopPanel(menuKey) {
        const menuItems = initialMenuData[menuKey];
        const col1List = document.getElementById('mega-menu-col-1-list');
        const col3Content = document.getElementById('mega-menu-col-3-content');
        if (!col1List || !col3Content) return;

        col1List.innerHTML = '';
        col3Content.innerHTML = '';

        const firstItem = menuItems[0];
        const isMega = firstItem.hasOwnProperty('Khu vực');
        megaMenuContainer.querySelector('.menu-panel-columns').classList.toggle('is-single-col-data', !isMega);
        
        menuItems.forEach((item, index) => {
            const categoryName = item["Loại hình"] || item["Danh mục"];
            const li = document.createElement('li');
            li.dataset.category = categoryName;

            if (isMega) {
                li.textContent = categoryName;
            } else {
                const link = document.createElement('a');
                link.href = getLink(menuKey, categoryName);
                link.textContent = categoryName;
                li.appendChild(link);
            }
            if (index === 0) li.classList.add('active');
            col1List.appendChild(li);
        });

        if (isMega) {
            updateDesktopSubMenu(menuItems[0]["Loại hình"], menuKey);
            col1List.addEventListener('mouseover', e => {
                const targetLi = e.target.closest('li[data-category]');
                if (targetLi) {
                    col1List.querySelectorAll('li').forEach(li => li.classList.remove('active'));
                    targetLi.classList.add('active');
                    updateDesktopSubMenu(targetLi.dataset.category, menuKey);
                }
            });
        }
        
        featuredProjectsData.forEach(project => {
            const card = document.createElement('a');
            card.href = project.link;
            card.className = 'featured-project-card';
            card.innerHTML = `<img src="${project.image}" alt="${project.name}"><div class="featured-project-info"><h5>${project.name}</h5><p>${project.description}</p></div>`;
            col3Content.appendChild(card);
        });
    }
    
    function updateDesktopSubMenu(categoryKey, menuKey) {
        const subMenuContainer = document.getElementById('mega-menu-col-2-list');
        const menuItems = initialMenuData[menuKey];
        const targetItem = menuItems.find(item => (item["Loại hình"] || item["Danh mục"]) === categoryKey);
        const subItems = targetItem ? targetItem["Khu vực"] : [];
        subMenuContainer.innerHTML = subItems.map(item => `<li><a href="${getLink(menuKey, categoryKey, item)}">${item}</a></li>`).join('');
    }

    function closeDesktopPanel() {
        if (megaMenuContainer) megaMenuContainer.classList.remove('is-open');
        if (activeMenuItem) {
            activeMenuItem.classList.remove('active');
            activeMenuItem = null;
        }
    }

    function handleMobileMenu() {
        // ... Logic cho mobile menu giữ nguyên như phiên bản cuối cùng của bạn ...
    }
    
    initMenu();
});