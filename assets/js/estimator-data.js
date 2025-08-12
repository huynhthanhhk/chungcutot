const estimatorData = {
  loaiCongTrinh: [
    { value: 'nha_pho_thong_thuong', text: 'Nhà phố thông thường' },
    { value: 'nha_pho_rong', text: 'Nhà phố rộng, dễ làm' },
    { value: 'nha_pho_nho', text: 'Nhà phố nhỏ hẹp' },
    { value: 'nha_pho_rat_nho', text: 'Nhà phố rất nhỏ hẹp' },
    { value: 'biet_thu_pho', text: 'Nhà biệt thự phố' },
    { value: 'biet_thu', text: 'Nhà biệt thự' },
    { value: 'biet_thu_cao_cap', text: 'Biệt thự cao cấp' },
    { value: 'nha_cho_thue', text: 'Nhà cho thuê' },
    { value: 'can_ho_dich_vu', text: 'Căn hộ dịch vụ' },
    { value: 'van_phong', text: 'Văn phòng' },
    { value: 'khach_san', text: 'Khách sạn' }
  ],
  loaiSanThuong: [
    { value: 'khong', text: 'Không có sân thượng' },
    { value: 'trong', text: 'Có sân thượng nhưng không giàn hoa' },
    { value: 'gian_hoa_mai_ton', text: 'Có sân thượng + giàn hoa hoặc mái tôn' },
    { value: 'mai_ngoi', text: 'Có sân thượng + mái ngói trên ST' },
    { value: 'phong', text: 'Có sân thượng + phòng trên sân thượng' },
    { value: 'phong_gian_hoa', text: 'Có sân thượng + phòng trên ST + giàn hoa' }
  ],
  loaiPhongSanThuong: [
    { value: 'mai_ton_xa_go', text: 'Phòng có mái tôn xây tường gác xà gỗ đơn giản' },
    { value: 'mai_ton_btct', text: 'Phòng có mái tôn cột đà BTCT – sê nô BTCT' },
    { value: 'mai_ton_thai', text: 'Phòng có mái tôn kiểu mái Thái' },
    { value: 'mai_ngoi', text: 'Phòng có mái ngói' },
    { value: 'mai_btct_lop_ngoi', text: 'Phòng có mái BTCT trên lợp ngói' },
    { value: 'mai_btct_dan_ngoi', text: 'Phòng có mái BTCT dán ngói' },
    { value: 'mai_bang_btct', text: 'Phòng mái bằng – BTCT' }
  ],
  loaiMai: [
    { value: 'mai_bang_btct', text: 'Mái bằng – BTCT' },
    { value: 'mai_ton_xa_go', text: 'Mái tôn gác xà gỗ đơn giản' },
    { value: 'mai_ton_btct', text: 'Mái tôn cột đà BTCT – sê nô BTCT' },
    { value: 'mai_ngoi', text: 'Mái ngói' },
    { value: 'mai_btct_lop_ngoi', text: 'Mái BTCT trên lợp ngói' },
    { value: 'mai_btct_dan_ngoi', text: 'Mái BTCT dán ngói' },
    { value: 'mai_ton_thai', text: 'Mái tôn kiểu mái Thái' }
  ],
  caseImages: {
    // A. NHÀ 1 TẦNG
    '1__mai_bang_btct': { count: 2, basePath: '1_tang/mai_bang/', images: ['1_mai_bang_btct_1.webp', '1_mai_bang_btct_2.webp'] },
    '1__mai_ton_xa_go': { count: 2, basePath: '1_tang/mai_ton_xa_go/', images: ['1_mai_ton_xa_go_1.webp', '1_mai_ton_xa_go_2.webp'] },
    '1__mai_ton_btct': { count: 2, basePath: '1_tang/mai_ton_btct/', images: ['1_mai_ton_btct_1.webp', '1_mai_ton_btct_2.webp'] },
    '1__mai_ngoi': { count: 2, basePath: '1_tang/mai_ngoi/', images: ['1_mai_ngoi_1.webp', '1_mai_ngoi_2.webp'] },
    '1__mai_btct_lop_ngoi': { count: 2, basePath: '1_tang/mai_btct_lop_ngoi/', images: ['1_mai_btct_lop_ngoi_1.webp', '1_mai_btct_lop_ngoi_2.webp'] },
    '1__mai_btct_dan_ngoi': { count: 2, basePath: '1_tang/mai_btct_dan_ngoi/', images: ['1_mai_btct_dan_ngoi_1.webp', '1_mai_btct_dan_ngoi_2.webp'] },
    '1__mai_ton_thai': { count: 2, basePath: '1_tang/mai_ton_thai/', images: ['1_mai_ton_thai_1.webp', '1_mai_ton_thai_2.webp'] },

    // B. NHÀ >= 2 TẦNG
    // B.1. Không sân thượng
    '2__khong__mai_bang_btct': { count: 2, basePath: '2_tang/khong_st/mai_bang/', images: ['2_mai_bang_btct_1.webp', '2_mai_bang_btct_2.webp'] },
    '2__khong__mai_ton_xa_go': { count: 2, basePath: '2_tang/khong_st/mai_ton_xa_go/', images: ['2_mai_ton_xa_go_1.webp', '2_mai_ton_xa_go_2.webp'] },
    '2__khong__mai_ton_btct': { count: 2, basePath: '2_tang/khong_st/mai_ton_btct/', images: ['2_mai_ton_btct_1.webp', '2_mai_ton_btct_2.webp'] },
    '2__khong__mai_ngoi': { count: 2, basePath: '2_tang/khong_st/mai_ngoi/', images: ['2_mai_ngoi_1.webp', '2_mai_ngoi_2.webp'] },
    '2__khong__mai_btct_lop_ngoi': { count: 2, basePath: '2_tang/khong_st/mai_btct_lop_ngoi/', images: ['2_mai_btct_lop_ngoi_1.webp', '2_mai_btct_lop_ngoi_2.webp'] },
    '2__khong__mai_btct_dan_ngoi': { count: 2, basePath: '2_tang/khong_st/mai_btct_dan_ngoi/', images: ['2_mai_btct_dan_ngoi_1.webp', '2_mai_btct_dan_ngoi_2.webp'] },
    '2__khong__mai_ton_thai': { count: 2, basePath: '2_tang/khong_st/mai_ton_thai/', images: ['2_mai_ton_thai_1.webp', '2_mai_ton_thai_2.webp'] },
    
    // B.2. Có sân thượng
    '2__trong': { count: 3, basePath: '2_tang/st_trong/', images: ['2_trong_1.webp', '2_trong_2.webp', '2_trong_3.webp'] },
    '2__gian_hoa_mai_ton': { count: 3, basePath: '2_tang/st_trong/gian_hoa/', images: ['2_gian_hoa_mai_ton_1.webp', '2_gian_hoa_mai_ton_2.webp'] },
    '2__mai_ngoi': { count: 3, basePath: '2_tang/st_trong/mai_ngoi/', images: ['2_mai_ngoi_st_1.webp'] },

    // B.3. Có sân thượng + phòng
    '2__phong__mai_ton_xa_go': { count: 2, basePath: '2_tang/st_phong/mai_ton_xa_go/', images: ['2_phong_mai_ton_xa_go_1.webp', '2_phong_mai_ton_xa_go_2.webp'] },
    '2__phong__mai_ton_btct': { count: 2, basePath: '2_tang/st_phong/mai_ton_btct/', images: ['2_phong_mai_ton_btct_1.webp', '2_phong_mai_ton_btct_2.webp'] },
    '2__phong__mai_ton_thai': { count: 2, basePath: '2_tang/st_phong/mai_ton_thai/', images: ['2_phong_mai_ton_thai_1.webp', '2_phong_mai_ton_thai_2.webp'] },
    '2__phong__mai_ngoi': { count: 2, basePath: '2_tang/st_phong/mai_ngoi/', images: ['2_phong_mai_ngoi_1.webp', '2_phong_mai_ngoi_2.webp'] },
    '2__phong__mai_btct_lop_ngoi': { count: 2, basePath: '2_tang/st_phong/mai_btct_lop_ngoi/', images: ['2_phong_mai_btct_lop_ngoi_1.webp', '2_phong_mai_btct_lop_ngoi_2.webp'] },
    '2__phong__mai_btct_dan_ngoi': { count: 2, basePath: '2_tang/st_phong/mai_btct_dan_ngoi/', images: ['2_phong_mai_btct_dan_ngoi_1.webp', '2_phong_mai_btct_dan_ngoi_2.webp'] },
    '2__phong__mai_bang_btct': { count: 2, basePath: '2_tang/st_phong/mai_bang/', images: ['2_phong_mai_bang_btct_1.webp', '2_phong_mai_bang_btct_2.webp'] },

    // B.4. Có sân thượng + phòng + giàn hoa
    '2__phong_gian_hoa__mai_ton_xa_go': { count: 2, basePath: '2_tang/st_phong_gian_hoa/mai_ton_xa_go/', images: ['2_phong_gian_hoa_mai_ton_xa_go_1.webp', '2_phong_gian_hoa_mai_ton_xa_go_2.webp'] },
    '2__phong_gian_hoa__mai_ton_btct': { count: 2, basePath: '2_tang/st_phong_gian_hoa/mai_ton_btct/', images: ['2_phong_gian_hoa_mai_ton_btct_1.webp', '2_phong_gian_hoa_mai_ton_btct_2.webp'] },
    '2__phong_gian_hoa__mai_ton_thai': { count: 2, basePath: '2_tang/st_phong_gian_hoa/mai_ton_thai/', images: ['2_phong_gian_hoa_mai_ton_thai_1.webp', '2_phong_gian_hoa_mai_ton_thai_2.webp'] },
    '2__phong_gian_hoa__mai_ngoi': { count: 2, basePath: '2_tang/st_phong_gian_hoa/mai_ngoi/', images: ['2_phong_gian_hoa_mai_ngoi_1.webp', '2_phong_gian_hoa_mai_ngoi_2.webp'] },
    '2__phong_gian_hoa__mai_btct_lop_ngoi': { count: 2, basePath: '2_tang/st_phong_gian_hoa/mai_btct_lop_ngoi/', images: ['2_phong_gian_hoa_mai_btct_lop_ngoi_1.webp', '2_phong_gian_hoa_mai_btct_lop_ngoi_2.webp'] },
    '2__phong_gian_hoa__mai_btct_dan_ngoi': { count: 2, basePath: '2_tang/st_phong_gian_hoa/mai_btct_dan_ngoi/', images: ['2_phong_gian_hoa_mai_btct_dan_ngoi_1.webp', '2_phong_gian_hoa_mai_btct_dan_ngoi_2.webp'] },
    '2__phong_gian_hoa__mai_bang_btct': { count: 2, basePath: '2_tang/st_phong_gian_hoa/mai_bang/', images: ['2_phong_gian_hoa_mai_bang_btct_1.webp', '2_phong_gian_hoa_mai_bang_btct_2.webp'] },
  }
};