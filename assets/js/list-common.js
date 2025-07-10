// assets/js/list-common.js (Phiên bản cuối cùng - Đã sửa lỗi)

function updateBreadcrumbForCommonPages() {
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    const categoryHeader = document.querySelector('.category-header h1');
    if (!breadcrumbContainer || !categoryHeader) return;

    const params = new URLSearchParams(window.location.search);
    const categorySlug = params.get('danh-muc');
    const pathname = window.location.pathname; // Lấy đường dẫn của trang hiện tại

    // --- Dữ liệu để tra cứu tên hiển thị ---
    const menuLookup = {
        'wiki.html': 'Wiki',
        'news.html': 'Tin tức',
        'business.html': 'Doanh nghiệp'
    };

    const categoryLookup = {
        'phap-ly': 'Pháp lý',
        'kinh-nghiem': 'Kinh nghiệm',
        'phong-thuy': 'Phong thuỷ',
        'du-an': 'Dự án',
        'thi-truong': 'Thị trường',
        'chu-dau-tu': 'Chủ đầu tư',
        'nha-thau-thi-cong': 'Nhà thầu thi công'
    };

    // [SỬA LỖI] Tìm tên menu dựa trên tên tệp thay vì URL param
    let menuText = '';
    for (const key in menuLookup) {
        if (pathname.includes(key)) {
            menuText = menuLookup[key];
            break;
        }
    }
    
    const categoryText = categoryLookup[categorySlug] || '';

    // --- Cập nhật Tiêu đề và Breadcrumb ---
    let mainTitle = menuText;
    if (categoryText) {
        mainTitle = `${menuText} - ${categoryText}`;
    }
    categoryHeader.textContent = mainTitle;

    const breadcrumbParts = [];
    // Gộp Menu và Danh mục thành một mục duy nhất không click được
    breadcrumbParts.push(`<span class="breadcrumb-item-no-link">${mainTitle}</span>`);
    
    breadcrumbContainer.innerHTML = breadcrumbParts.join(' &gt; ');
}

// Chạy hàm khi trang được tải
document.addEventListener('DOMContentLoaded', updateBreadcrumbForCommonPages);