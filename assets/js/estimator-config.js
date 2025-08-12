const estimatorConfig = {
  // Hệ số quy đổi diện tích cho các hạng mục xây dựng
  heSoQuyDoi: {
    // Tầng hầm
    'Không': 0,
    'Bán hầm': 1.5,
    '1 hầm': 2.0,
    // Sàn
    'Sàn trệt': 1.0,
    'Sàn các lầu': 1.0,
    // Ban công
    'Ban công trước': 1.0,
    'Ban công sau': 1.0,
    // Tum
    'Tum thang': 1.0,
    // Sân thượng
    'Sân thượng': 0.3,
    'Giàn hoa/mái tôn trên sân thượng': 0.7,
    'Mái ngói trên sân thượng': 0.9,
    // Các loại mái (áp dụng cho cả mái chính và mái phòng trên ST)
    'Mái bằng – BTCT': 1.2,
    'Mái tôn gác xà gỗ đơn giản': 0.75,
    'Mái tôn cột đà BTCT – sê nô BTCT': 1.0,
    'Mái ngói': 1.5,
    'Mái BTCT trên lợp ngói': 2.0,
    'Mái BTCT dán ngói': 2.0,
    'Mái tôn kiểu mái Thái': 1.25,
    // Các loại phòng trên ST
    'Phòng có mái tôn xây tường gác xà gỗ đơn giản': 0.75,
    'Phòng có mái tôn cột đà BTCT – sê nô BTCT': 1.0,
    'Phòng có mái tôn kiểu mái Thái': 1.25,
    'Phòng có mái ngói': 1.5,
    'Phòng có mái BTCT trên lợp ngói': 2.0,
    'Phòng có mái BTCT dán ngói': 2.0,
    'Phòng mái bằng – BTCT': 1.2
  },

  // Các tham số cho việc tính hệ số móng
  heSoMong: {
      heSoCoBan: 0.35,
      // Móng đơn/băng
      'Móng đơn/băng': {
          nhoHon6TangMultiplier: 0.10, // (< 6 tầng - 1) * 10%
          lonHon6TangAdder: 0.05       // (> 6 tầng) thêm 5% mỗi tầng
      },
      // Móng cọc
      'Móng cọc': {
          nhoHon6TangMultiplier: 0.05, // (< 6 tầng - 1) * 5%
          lonHon6TangAdder: 0.05       // (> 6 tầng) thêm 5% mỗi tầng
      }
  },
  
   heSoHoanThien: {
    'Thuong': { min: 0.6, max: 0.8 },
    'Kha': { min: 0.9, max: 1.2 },
    'Tot': { min: 1.2, max: 2.5 }
  }
};
