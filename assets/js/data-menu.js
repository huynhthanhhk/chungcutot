// assets/js/data-menu.js

// Hàm toSlug nội bộ để tạo slug, đảm bảo tính nhất quán
const toSlug = (str) => {
    if (!str) return '';
    str = str.toLowerCase();
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/[đĐ]/g, 'd');
    str = str.replace(/([^0-9a-z-\s])/g, '');
    str = str.replace(/(\s+)/g, '-');
    str = str.replace(/-+/g, '-');
    str = str.replace(/^-+|-+$/g, '');
    return str;
};

export const data = {
   "Dự án": [
    {
      "Loại hình": "Chung cư",
      "Khu vực": ["TP. Hồ Chí Minh"]
    },
    {
      "Loại hình": "Khu đô thị",
      "Khu vực": ["TP. Hồ Chí Minh", "Hà Nội"]
    }
  ],
  "Mua bán": [
    {
      "Loại hình": "Căn hộ",
      "Khu vực": ["TP. Hồ Chí Minh", "Lâm Đồng"]
    },
    {
      "Loại hình": "Shophouse",
      "Khu vực": ["TP. Hồ Chí Minh", "Hà Nội"]
    }
  ],
  "Cho thuê": [
    {
      "Loại hình": "Căn hộ",
      "Khu vực": ["TP. Hồ Chí Minh", "Hà Nội"]
    },
    {
      "Loại hình": "Shophouse",
      "Khu vực": ["TP. Hồ Chí Minh", "Hà Nội", "Vĩnh Long"]
    }
  ],
  "Wiki": [
    { "Danh mục": "Pháp lý", "slug": toSlug("Pháp lý") },         // phap-ly
    { "Danh mục": "Kinh nghiệm", "slug": toSlug("Kinh nghiệm") },   // kinh-nghiem
    { "Danh mục": "Phong thuỷ", "slug": toSlug("Phong thuỷ") }     // phong-thuy
  ],
  "Tin tức": [
    { "Danh mục": "Dự án", "slug": toSlug("Dự án") },             // du-an
    { "Danh mục": "Thị trường", "slug": toSlug("Thị trường") }     // thi-truong
  ],
  "Doanh nghiệp": [
    { "Danh mục": "Chủ đầu tư", "slug": toSlug("Chủ đầu tư") },   // chu-dau-tu
    { "Danh mục": "Nhà thầu thi công", "slug": toSlug("Nhà thầu thi công") } // nha-thau-thi-cong
  ]
};