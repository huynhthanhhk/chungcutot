// assets/js/price-data.js

const priceHistoryData = {
    "2025": [
        { "area": 45, "price": 4.1, "unitPrice": 62.22, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2025-0001", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2025-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 53, "price": 2.5, "unitPrice": 52.83, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0002", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2025-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 53, "price": 4.1, "unitPrice": 47.17, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0003", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2025-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 53, "price": 2.6, "unitPrice": 49.06, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2025-0004", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-10-26T20:00:00.212Z", "project": "" },
        { "area": 53, "price": 4.75, "unitPrice": 56.6, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2025-0005", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 57, "price": 3.55, "unitPrice": 56.14, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0006", "city": "Hồ Chí Minh", "ward": "Phước Long B", "street": "Đỗ Xuân Hợp", "publishedAt": "2025-08-09T08:30:30.545Z", "project": "Vinhomes Grand Park" },
        { "area": 57, "price": 4.2, "unitPrice": 54.39, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2025-0007", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2025-02-14T09:45:30.456Z", "project": "" },
        { "area": 57, "price": 6, "unitPrice": 61.4, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2025-0008", "city": "Hồ Chí Minh", "ward": "Tân Phong", "street": "Nguyễn Lương Bằng", "publishedAt": "2025-06-15T10:10:10.323Z", "project": "Sunrise City" },
        { "area": 60, "price": 3.8, "unitPrice": 65, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2025-0009", "city": "Hồ Chí Minh", "ward": "Hải Long", "street": "Tạ Quang Bửu", "publishedAt": "2025-04-12T15:55:05.434Z", "project": "Tara Residence" },
        { "area": 60, "price": 5, "unitPrice": 66.67, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0010", "city": "Hồ Chí Minh", "ward": "Võ Thị Sáu", "street": "Nam Kỳ Khởi Nghĩa", "publishedAt": "2025-03-21T18:05:00.789Z", "project": "Serenity Sky Villas" },
        { "area": 60, "price": 4.1, "unitPrice": 63.33, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0011", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2025-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 75, "price": 3.7, "unitPrice": 58.67, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0012", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 75, "price": 3.55, "unitPrice": 56, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0013", "city": "Hồ Chí Minh", "ward": "Phước Long B", "street": "Đỗ Xuân Hợp", "publishedAt": "2025-08-09T08:30:30.545Z", "project": "Vinhomes Grand Park" },
        { "area": 75, "price": 4.1, "unitPrice": 54.67, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0014", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2025-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 80, "price": 4.1, "unitPrice": 51.25, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0015", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2025-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 80, "price": 4.02, "unitPrice": 50, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0016", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 80, "price": 3.28, "unitPrice": 51.25, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0017", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 84, "price": 5, "unitPrice": 59.52, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0018", "city": "Hồ Chí Minh", "ward": "Võ Thị Sáu", "street": "Nam Kỳ Khởi Nghĩa", "publishedAt": "2025-03-21T18:05:00.789Z", "project": "Serenity Sky Villas" },
        { "area": 84, "price": 3.55, "unitPrice": 66.67, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0019", "city": "Hồ Chí Minh", "ward": "Phước Long B", "street": "Đỗ Xuân Hợp", "publishedAt": "2025-08-09T08:30:30.545Z", "project": "Vinhomes Grand Park" },
        { "area": 84, "price": 4.39, "unitPrice": 49.05, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0020", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 84, "price": 4.1, "unitPrice": 48.81, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0021", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2025-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 94, "price": 3.8, "unitPrice": 50, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0022", "city": "Hồ Chí Minh", "ward": "Hải Long", "street": "Tạ Quang Bửu", "publishedAt": "2025-04-12T15:55:05.434Z", "project": "Tara Residence" },
        { "area": 107, "price": 4.75, "unitPrice": 56.07, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0023", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 125, "price": 5, "unitPrice": 64, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0024", "city": "Hồ Chí Minh", "ward": "Võ Thị Sáu", "street": "Nam Kỳ Khởi Nghĩa", "publishedAt": "2025-03-21T18:05:00.789Z", "project": "Serenity Sky Villas" },
        { "area": 45, "price": 2.5, "unitPrice": 62.22, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0025", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2025-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 53, "price": 4.02, "unitPrice": 52.83, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0026", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 53, "price": 4.1, "unitPrice": 47.17, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0027", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2025-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 53, "price": 2.6, "unitPrice": 49.43, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2025-0028", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-10-26T20:00:00.212Z", "project": "" },
        { "area": 53, "price": 3.7, "unitPrice": 56.6, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2025-0029", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 57, "price": 6, "unitPrice": 56.49, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2025-0030", "city": "Hồ Chí Minh", "ward": "Tân Phong", "street": "Nguyễn Lương Bằng", "publishedAt": "2025-06-15T10:10:10.323Z", "project": "Sunrise City" },
        { "area": 57, "price": 4.1, "unitPrice": 54.39, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2025-0031", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2025-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 57, "price": 3.28, "unitPrice": 61.75, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2025-0032", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 60, "price": 2.6, "unitPrice": 65, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2025-0033", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-10-26T20:00:00.212Z", "project": "" },
        { "area": 60, "price": 4.39, "unitPrice": 66.67, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0034", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 60, "price": 3.8, "unitPrice": 63.33, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0035", "city": "Hồ Chí Minh", "ward": "Hải Long", "street": "Tạ Quang Bửu", "publishedAt": "2025-04-12T15:55:05.434Z", "project": "Tara Residence" },
        { "area": 75, "price": 4.75, "unitPrice": 58.67, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0036", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 75, "price": 4.2, "unitPrice": 56, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0037", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2025-02-14T09:45:30.456Z", "project": "" },
        { "area": 75, "price": 4.1, "unitPrice": 55.33, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2025-0038", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2025-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 80, "price": 4.2, "unitPrice": 51.88, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2025-0039", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2025-02-14T09:45:30.456Z", "project": "" },
        { "area": 80, "price": 2.5, "unitPrice": 50, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2025-0040", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2025-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 80, "price": 3.7, "unitPrice": 51.25, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0041", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 84, "price": 5, "unitPrice": 59.52, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0042", "city": "Hồ Chí Minh", "ward": "Võ Thị Sáu", "street": "Nam Kỳ Khởi Nghĩa", "publishedAt": "2025-03-21T18:05:00.789Z", "project": "Serenity Sky Villas" },
        { "area": 84, "price": 3.28, "unitPrice": 66.67, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0043", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 84, "price": 4.02, "unitPrice": 49.05, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0044", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 84, "price": 4.1, "unitPrice": 48.81, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0045", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2025-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 94, "price": 3.55, "unitPrice": 50, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2025-0046", "city": "Hồ Chí Minh", "ward": "Phước Long B", "street": "Đỗ Xuân Hợp", "publishedAt": "2025-08-09T08:30:30.545Z", "project": "Vinhomes Grand Park" },
        { "area": 107, "price": 6, "unitPrice": 56.07, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2025-0047", "city": "Hồ Chí Minh", "ward": "Tân Phong", "street": "Nguyễn Lương Bằng", "publishedAt": "2025-06-15T10:10:10.323Z", "project": "Sunrise City" },
        { "area": 130, "price": 4.1, "unitPrice": 61.54, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2025-0048", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2025-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 45, "price": 4.02, "unitPrice": 62.22, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0049", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 53, "price": 4.1, "unitPrice": 52.83, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0050", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2025-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 53, "price": 2.5, "unitPrice": 47.17, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2025-0051", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2025-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 53, "price": 3.7, "unitPrice": 49.06, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2025-0052", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 53, "price": 4.1, "unitPrice": 56.6, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2025-0053", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2025-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 57, "price": 3.8, "unitPrice": 57.02, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2025-0054", "city": "Hồ Chí Minh", "ward": "Hải Long", "street": "Tạ Quang Bửu", "publishedAt": "2025-04-12T15:55:05.434Z", "project": "Tara Residence" },
        { "area": 57, "price": 3.28, "unitPrice": 54.39, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0055", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 57, "price": 3.55, "unitPrice": 62.28, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0056", "city": "Hồ Chí Minh", "ward": "Phước Long B", "street": "Đỗ Xuân Hợp", "publishedAt": "2025-08-09T08:30:30.545Z", "project": "Vinhomes Grand Park" },
        { "area": 60, "price": 4.1, "unitPrice": 65, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0057", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2025-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 60, "price": 4.2, "unitPrice": 66.67, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0058", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2025-02-14T09:45:30.456Z", "project": "" },
        { "area": 60, "price": 4.39, "unitPrice": 63.33, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0059", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 75, "price": 3.28, "unitPrice": 58.67, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0060", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 75, "price": 4.02, "unitPrice": 56, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0061", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 75, "price": 4.2, "unitPrice": 54.67, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0062", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2025-02-14T09:45:30.456Z", "project": "" },
        { "area": 80, "price": 5, "unitPrice": 51.88, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2025-0063", "city": "Hồ Chí Minh", "ward": "Võ Thị Sáu", "street": "Nam Kỳ Khởi Nghĩa", "publishedAt": "2025-03-21T18:05:00.789Z", "project": "Serenity Sky Villas" },
        { "area": 80, "price": 2.6, "unitPrice": 50, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0064", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-10-26T20:00:00.212Z", "project": "" },
        { "area": 80, "price": 4.1, "unitPrice": 51.25, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0065", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2025-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 84, "price": 4.1, "unitPrice": 59.52, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0066", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2025-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 84, "price": 4.39, "unitPrice": 66.67, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0067", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 84, "price": 4.75, "unitPrice": 49.4, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0068", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 84, "price": 4.02, "unitPrice": 48.81, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2025-0069", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 94, "price": 3.7, "unitPrice": 50, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0070", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 107, "price": 4.39, "unitPrice": 56.07, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0071", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 45, "price": 4.1, "unitPrice": 62.22, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0072", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2025-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 53, "price": 4.1, "unitPrice": 52.83, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0073", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2025-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 53, "price": 4.2, "unitPrice": 47.17, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0074", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2025-02-14T09:45:30.456Z", "project": "" },
        { "area": 53, "price": 2.6, "unitPrice": 49.06, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2025-0075", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-10-26T20:00:00.212Z", "project": "" },
        { "area": 53, "price": 3.7, "unitPrice": 66.04, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2025-0076", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 57, "price": 3.28, "unitPrice": 56.14, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0077", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 57, "price": 4.2, "unitPrice": 54.39, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0078", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2025-02-14T09:45:30.456Z", "project": "" },
        { "area": 57, "price": 2.6, "unitPrice": 61.93, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0079", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-10-26T20:00:00.212Z", "project": "" },
        { "area": 60, "price": 4.39, "unitPrice": 65, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0080", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 60, "price": 3.8, "unitPrice": 66.67, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0081", "city": "Hồ Chí Minh", "ward": "Hải Long", "street": "Tạ Quang Bửu", "publishedAt": "2025-04-12T15:55:05.434Z", "project": "Tara Residence" },
        { "area": 60, "price": 4.75, "unitPrice": 63.33, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0082", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 75, "price": 4.1, "unitPrice": 58.67, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0083", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2025-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 75, "price": 6, "unitPrice": 56, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2025-0084", "city": "Hồ Chí Minh", "ward": "Tân Phong", "street": "Nguyễn Lương Bằng", "publishedAt": "2025-06-15T10:10:10.323Z", "project": "Sunrise City" },
        { "area": 75, "price": 5, "unitPrice": 55.2, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2025-0085", "city": "Hồ Chí Minh", "ward": "Võ Thị Sáu", "street": "Nam Kỳ Khởi Nghĩa", "publishedAt": "2025-03-21T18:05:00.789Z", "project": "Serenity Sky Villas" },
        { "area": 80, "price": 4.02, "unitPrice": 51.63, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2025-0086", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 80, "price": 4.2, "unitPrice": 50, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0087", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2025-02-14T09:45:30.456Z", "project": "" },
        { "area": 80, "price": 3.28, "unitPrice": 51.25, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0088", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 84, "price": 4.1, "unitPrice": 59.52, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0089", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2025-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 84, "price": 4.75, "unitPrice": 66.67, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0090", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 84, "price": 3.7, "unitPrice": 49.4, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0091", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 84, "price": 4.1, "unitPrice": 48.81, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0092", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2025-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 94, "price": 4.75, "unitPrice": 50.53, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2025-0093", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 107, "price": 2.5, "unitPrice": 56.07, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2025-0094", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2025-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
          {
        "area": 85, "price": 5.25, "unitPrice": 61.76, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0037demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-01-15T10:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 110, "price": 7.8, "unitPrice": 70.91, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0038demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-02-10T11:30:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 95, "price": 6.1, "unitPrice": 64.21, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0039demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-03-20T14:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 102, "price": 7.2, "unitPrice": 70.59, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0040demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-04-18T09:45:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 88, "price": 5.9, "unitPrice": 67.05, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0041demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-05-25T16:20:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 115, "price": 8.5, "unitPrice": 73.91, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0042demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-06-12T08:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 92, "price": 6.5, "unitPrice": 70.65, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0043demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-07-30T13:10:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 81, "price": 5.5, "unitPrice": 67.9, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0044demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-08-14T15:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 118, "price": 9.2, "unitPrice": 77.97, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0045demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-09-05T21:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 100, "price": 7.0, "unitPrice": 70.00, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0046demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-10-28T10:30:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 98, "price": 6.8, "unitPrice": 69.39, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0047demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-11-16T11:15:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 105, "price": 7.5, "unitPrice": 71.43, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0048demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-12-24T19:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 82, "price": 5.8, "unitPrice": 70.73, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0049demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-01-22T09:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 112, "price": 8.1, "unitPrice": 72.32, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0050demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-02-19T14:45:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 90, "price": 6.2, "unitPrice": 68.89, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0051demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-03-11T16:30:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 108, "price": 7.9, "unitPrice": 73.15, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0052demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-04-29T18:20:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 86, "price": 5.75, "unitPrice": 66.86, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0053demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-05-13T12:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 120, "price": 9.5, "unitPrice": 79.17, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0054demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-06-26T10:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 94, "price": 6.6, "unitPrice": 70.21, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0055demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-07-17T11:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 84, "price": 5.95, "unitPrice": 70.83, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2025-0056demo", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2025-08-21T13:40:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 65, "price": 3.5, "unitPrice": 53.85, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0080", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-01-15T09:00:00.000Z", "project": ""
    },
    {
        "area": 55, "price": 2.9, "unitPrice": 52.73, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0081", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-02-12T10:30:00.000Z", "project": ""
    },
    {
        "area": 72, "price": 4.1, "unitPrice": 56.94, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0082", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-03-20T11:45:00.000Z", "project": ""
    },
    {
        "area": 68, "price": 3.8, "unitPrice": 55.88, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0083", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-04-18T14:00:00.000Z", "project": ""
    },
    {
        "area": 58, "price": 3.2, "unitPrice": 55.17, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0084", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-05-25T16:20:00.000Z", "project": ""
    },
    {
        "area": 75, "price": 4.5, "unitPrice": 60.00, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0085", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-06-10T08:10:00.000Z", "project": ""
    },
    {
        "area": 62, "price": 3.6, "unitPrice": 58.06, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0086", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-07-28T18:00:00.000Z", "project": ""
    },
    {
        "area": 53, "price": 2.8, "unitPrice": 52.83, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0087", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-08-14T19:30:00.000Z", "project": ""
    },
    {
        "area": 70, "price": 4.0, "unitPrice": 57.14, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0088", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-09-05T21:00:00.000Z", "project": ""
    },
    {
        "area": 66, "price": 3.7, "unitPrice": 56.06, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0089", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-10-30T10:00:00.000Z", "project": ""
    },
    {
        "area": 60, "price": 3.4, "unitPrice": 56.67, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0090", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-11-16T12:00:00.000Z", "project": ""
    },
    {
        "area": 74, "price": 4.3, "unitPrice": 58.11, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0091", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-12-24T20:00:00.000Z", "project": ""
    },
    {
        "area": 56, "price": 3.1, "unitPrice": 55.36, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0092", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-01-22T13:15:00.000Z", "project": ""
    },
    {
        "area": 69, "price": 3.9, "unitPrice": 56.52, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0093", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-02-19T15:25:00.000Z", "project": ""
    },
    {
        "area": 64, "price": 3.5, "unitPrice": 54.69, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0094", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-03-11T17:30:00.000Z", "project": ""
    },
    {
        "area": 71, "price": 4.2, "unitPrice": 59.15, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0095", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-04-29T18:40:00.000Z", "project": ""
    },
    {
        "area": 52, "price": 2.9, "unitPrice": 55.77, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0096", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-05-13T12:00:00.000Z", "project": ""
    },
    {
        "area": 67, "price": 3.8, "unitPrice": 56.72, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0097", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-06-26T10:00:00.000Z", "project": ""
    },
    {
        "area": 59, "price": 3.3, "unitPrice": 55.93, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0098", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-07-17T11:00:00.000Z", "project": ""
    },
    {
        "area": 63, "price": 3.6, "unitPrice": 57.14, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2025-0099", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2025-08-21T13:40:00.000Z", "project": ""
    }
    ],
    "2024": [
        { "area": 45, "price": 2.6, "unitPrice": 61.11, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0001", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-10-26T20:00:00.212Z", "project": "" },
        { "area": 53, "price": 4.2, "unitPrice": 43.58, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2024-0002", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2024-02-14T09:45:30.456Z", "project": "" },
        { "area": 53, "price": 2.5, "unitPrice": 54.72, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2024-0003", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2024-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 53, "price": 4.1, "unitPrice": 42.26, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0004", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2024-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 53, "price": 4.75, "unitPrice": 63.4, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2024-0005", "city": "Hồ Chí Minh", "ward": "Út Tịch", "street": "Thành Thái", "publishedAt": "2024-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 57, "price": 3.7, "unitPrice": 65.09, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0006", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 57, "price": 4.39, "unitPrice": 46.84, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2024-0007", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 57, "price": 2.6, "unitPrice": 52.81, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2024-0008", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-10-26T20:00:00.212Z", "project": "" },
        { "area": 60, "price": 3.7, "unitPrice": 55.83, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0009", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 60, "price": 3.28, "unitPrice": 54.67, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2024-0010", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 60, "price": 4.1, "unitPrice": 53.17, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0011", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2024-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 75, "price": 3.7, "unitPrice": 49.33, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0012", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 75, "price": 3.55, "unitPrice": 52.67, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2024-0013", "city": "Hồ Chí Minh", "ward": "Phước Long B", "street": "Đỗ Xuân Hợp", "publishedAt": "2024-08-09T08:30:30.545Z", "project": "Vinhomes Grand Park" },
        { "area": 75, "price": 3.28, "unitPrice": 44.8, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2024-0014", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 80, "price": 4.1, "unitPrice": 60.5, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0015", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2024-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 80, "price": 4.39, "unitPrice": 57, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0016", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 80, "price": 4.02, "unitPrice": 50.25, "legal": "Sổ Hồng", "furniture": "Đầy đủ", "id": "Spb-2024-0017", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 84, "price": 4.1, "unitPrice": 69.05, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0018", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2024-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 84, "price": 3.8, "unitPrice": 55.95, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2024-0019", "city": "Hồ Chí Minh", "ward": "Hải Long", "street": "Tạ Quang Bửu", "publishedAt": "2024-04-12T15:55:05.434Z", "project": "Tara Residence" },
        { "area": 84, "price": 4.39, "unitPrice": 40.24, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2024-0020", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 84, "price": 4.1, "unitPrice": 40.95, "legal": "Sổ Hồng", "furniture": "Đầy đủ", "id": "Spb-2024-0021", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2024-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 94, "price": 4.75, "unitPrice": 41.49, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0022", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 107, "price": 3.7, "unitPrice": 47.1, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2024-0023", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 125, "price": 3.8, "unitPrice": 62.72, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2024-0024", "city": "Hồ Chí Minh", "ward": "Hải Long", "street": "Tạ Quang Bửu", "publishedAt": "2024-04-12T15:55:05.434Z", "project": "Tara Residence" },
        { "area": 45, "price": 4.2, "unitPrice": 57.33, "legal": "Sổ Hồng", "furniture": "Đầy đủ", "id": "Spb-2024-0025", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2024-02-14T09:45:30.456Z", "project": "" },
        { "area": 53, "price": 4.02, "unitPrice": 56.6, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0026", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 53, "price": 5, "unitPrice": 46.23, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2024-0027", "city": "Hồ Chí Minh", "ward": "Võ Thị Sáu", "street": "Nam Kỳ Khởi Nghĩa", "publishedAt": "2024-03-21T18:05:00.789Z", "project": "Serenity Sky Villas" },
        { "area": 53, "price": 4.1, "unitPrice": 40.57, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2024-0028", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2024-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 53, "price": 3.7, "unitPrice": 66.79, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0029", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 57, "price": 4.75, "unitPrice": 65.44, "legal": "Sổ Hồng", "furniture": "Đầy đủ", "id": "Spb-2024-0030", "city": "Hồ Chí Minh", "ward": "Út Tịch", "street": "Thành Thái", "publishedAt": "2024-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 57, "price": 3.8, "unitPrice": 47.37, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2024-0031", "city": "Hồ Chí Minh", "ward": "Hải Long", "street": "Tạ Quang Bửu", "publishedAt": "2024-04-12T15:55:05.434Z", "project": "Tara Residence" },
        { "area": 57, "price": 3.55, "unitPrice": 71.58, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2024-0032", "city": "Hồ Chí Minh", "ward": "Phước Long B", "street": "Đỗ Xuân Hợp", "publishedAt": "2024-08-09T08:30:30.545Z", "project": "Vinhomes Grand Park" },
        { "area": 60, "price": 4.1, "unitPrice": 76, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0033", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2024-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 60, "price": 4.2, "unitPrice": 56, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0034", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2024-02-14T09:45:30.456Z", "project": "" },
        { "area": 60, "price": 4.02, "unitPrice": 52, "legal": "Sổ Hồng", "furniture": "Đầy đủ", "id": "Spb-2024-0035", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 75, "price": 3.28, "unitPrice": 65.07, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2024-0036", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 75, "price": 4.2, "unitPrice": 49.33, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0037", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2024-02-14T09:45:30.456Z", "project": "" },
        { "area": 75, "price": 3.8, "unitPrice": 46.53, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2024-0038", "city": "Hồ Chí Minh", "ward": "Hải Long", "street": "Tạ Quang Bửu", "publishedAt": "2024-04-12T15:55:05.434Z", "project": "Tara Residence" },
        { "area": 80, "price": 4.1, "unitPrice": 60.75, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0039", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2024-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 80, "price": 4.02, "unitPrice": 50, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2024-0040", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 80, "price": 3.8, "unitPrice": 43, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2024-0041", "city": "Hồ Chí Minh", "ward": "Hải Long", "street": "Tạ Quang Bửu", "publishedAt": "2024-04-12T15:55:05.434Z", "project": "Tara Residence" },
        { "area": 84, "price": 5, "unitPrice": 69.05, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0042", "city": "Hồ Chí Minh", "ward": "Võ Thị Sáu", "street": "Nam Kỳ Khởi Nghĩa", "publishedAt": "2024-03-21T18:05:00.789Z", "project": "Serenity Sky Villas" },
        { "area": 84, "price": 2.6, "unitPrice": 55.95, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0043", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-10-26T20:00:00.212Z", "project": "" },
        { "area": 84, "price": 4.1, "unitPrice": 40.24, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2024-0044", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2024-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 84, "price": 2.5, "unitPrice": 40.95, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0045", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2024-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 94, "price": 4.2, "unitPrice": 41.49, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2024-0046", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2024-02-14T09:45:30.456Z", "project": "" },
        { "area": 107, "price": 4.75, "unitPrice": 47.1, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0047", "city": "Hồ Chí Minh", "ward": "Út Tịch", "street": "Thành Thái", "publishedAt": "2024-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 130, "price": 3.28, "unitPrice": 60.31, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2024-0048", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 45, "price": 4.2, "unitPrice": 57.33, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0049", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2024-02-14T09:45:30.456Z", "project": "" },
        { "area": 53, "price": 4.1, "unitPrice": 56.6, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0050", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2024-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 53, "price": 4.1, "unitPrice": 46.23, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2024-0051", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2024-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 53, "price": 4.02, "unitPrice": 40.57, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2024-0052", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 53, "price": 4.75, "unitPrice": 66.79, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0053", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 57, "price": 4.1, "unitPrice": 65.44, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0054", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2024-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 57, "price": 4.1, "unitPrice": 47.37, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2024-0055", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2024-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 57, "price": 3.55, "unitPrice": 71.58, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2024-0056", "city": "Hồ Chí Minh", "ward": "Phước Long B", "street": "Đỗ Xuân Hợp", "publishedAt": "2024-08-09T08:30:30.545Z", "project": "Vinhomes Grand Park" },
        { "area": 60, "price": 2.5, "unitPrice": 76, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2024-0057", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2024-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 60, "price": 4.75, "unitPrice": 56, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0058", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 60, "price": 3.28, "unitPrice": 52, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0059", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 75, "price": 2.6, "unitPrice": 65.07, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2024-0060", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-10-26T20:00:00.212Z", "project": "" },
        { "area": 75, "price": 6, "unitPrice": 49.33, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0061", "city": "Hồ Chí Minh", "ward": "Tân Phong", "street": "Nguyễn Lương Bằng", "publishedAt": "2024-06-15T10:10:10.323Z", "project": "Sunrise City" },
        { "area": 75, "price": 5, "unitPrice": 46.53, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2024-0062", "city": "Hồ Chí Minh", "ward": "Võ Thị Sáu", "street": "Nam Kỳ Khởi Nghĩa", "publishedAt": "2024-03-21T18:05:00.789Z", "project": "Serenity Sky Villas" },
        { "area": 80, "price": 3.7, "unitPrice": 60.75, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0063", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 80, "price": 4.1, "unitPrice": 50, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2024-0064", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2024-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 80, "price": 4.1, "unitPrice": 43, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0065", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2024-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 84, "price": 4.2, "unitPrice": 69.05, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0066", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2024-02-14T09:45:30.456Z", "project": "" },
        { "area": 84, "price": 4.39, "unitPrice": 55.95, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2024-0067", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 84, "price": 4.39, "unitPrice": 40.24, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2024-0068", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 84, "price": 3.55, "unitPrice": 40.95, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2024-0069", "city": "Hồ Chí Minh", "ward": "Phước Long B", "street": "Đỗ Xuân Hợp", "publishedAt": "2024-08-09T08:30:30.545Z", "project": "Vinhomes Grand Park" },
        { "area": 94, "price": 3.7, "unitPrice": 41.49, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0070", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 107, "price": 4.1, "unitPrice": 47.1, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2024-0071", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2024-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 45, "price": 4.2, "unitPrice": 57.33, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2024-0072", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2024-02-14T09:45:30.456Z", "project": "" },
        { "area": 53, "price": 3.55, "unitPrice": 56.6, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0073", "city": "Hồ Chí Minh", "ward": "Phước Long B", "street": "Đỗ Xuân Hợp", "publishedAt": "2024-08-09T08:30:30.545Z", "project": "Vinhomes Grand Park" },
        { "area": 53, "price": 4.02, "unitPrice": 46.23, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2024-0074", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 53, "price": 4.1, "unitPrice": 40.57, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0075", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2024-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 53, "price": 4.1, "unitPrice": 76.6, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2024-0076", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2024-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 57, "price": 4.1, "unitPrice": 65.09, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0077", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2024-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 57, "price": 3.28, "unitPrice": 47.37, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2024-0078", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 57, "price": 3.7, "unitPrice": 71.75, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0079", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 60, "price": 4.39, "unitPrice": 76, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2024-0080", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 60, "price": 3.7, "unitPrice": 56, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0081", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2024-01-18T16:40:40.878Z", "project": "" },
        { "area": 60, "price": 4.2, "unitPrice": 52, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0082", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2024-02-14T09:45:30.456Z", "project": "" },
        { "area": 75, "price": 3.8, "unitPrice": 65.07, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2024-0083", "city": "Hồ Chí Minh", "ward": "Hải Long", "street": "Tạ Quang Bửu", "publishedAt": "2024-04-12T15:55:05.434Z", "project": "Tara Residence" },
        { "area": 75, "price": 3.28, "unitPrice": 49.33, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2024-0084", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 75, "price": 4.1, "unitPrice": 46.4, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0085", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2024-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 80, "price": 2.5, "unitPrice": 60.25, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2024-0086", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2024-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 80, "price": 4.02, "unitPrice": 50, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0087", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 80, "price": 4.39, "unitPrice": 43, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2024-0088", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 84, "price": 4.02, "unitPrice": 69.05, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0089", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2024-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 84, "price": 5, "unitPrice": 55.95, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0090", "city": "Hồ Chí Minh", "ward": "Võ Thị Sáu", "street": "Nam Kỳ Khởi Nghĩa", "publishedAt": "2024-03-21T18:05:00.789Z", "project": "Serenity Sky Villas" },
        { "area": 84, "price": 4.1, "unitPrice": 40.24, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2024-0091", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2024-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 84, "price": 4.1, "unitPrice": 40.95, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2024-0092", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2024-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 94, "price": 4.75, "unitPrice": 42.45, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0093", "city": "Hồ Chí Minh", "ward": "Út Tịch", "street": "Thành Thái", "publishedAt": "2024-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 107, "price": 6, "unitPrice": 47.1, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2024-0094", "city": "Hồ Chí Minh", "ward": "Tân Phong", "street": "Nguyễn Lương Bằng", "publishedAt": "2024-06-15T10:10:10.323Z", "project": "Sunrise City" },
        {
        "area": 88, "price": 6.15, "unitPrice": 69.89, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0001demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-01-15T10:30:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 105, "price": 8.2, "unitPrice": 78.1, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0002demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-02-20T11:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 93, "price": 7.1, "unitPrice": 76.34, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0003demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-03-12T14:15:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 112, "price": 9.3, "unitPrice": 83.04, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0004demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-04-25T09:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 85, "price": 5.95, "unitPrice": 70.0, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0005demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-05-18T16:45:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 118, "price": 9.8, "unitPrice": 83.05, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0006demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-06-22T08:30:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 99, "price": 7.8, "unitPrice": 78.79, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0007demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-07-05T13:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 82, "price": 6.0, "unitPrice": 73.17, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0008demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-08-10T17:20:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 108, "price": 8.9, "unitPrice": 82.41, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0009demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-09-14T20:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 101, "price": 8.1, "unitPrice": 80.2, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0010demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-10-30T12:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 96, "price": 7.5, "unitPrice": 78.13, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0011demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-11-19T10:45:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 115, "price": 9.5, "unitPrice": 82.61, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0012demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-12-24T19:30:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 84, "price": 6.3, "unitPrice": 75.0, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0013demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-01-28T09:10:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 103, "price": 8.4, "unitPrice": 81.55, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0014demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-02-17T15:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 90, "price": 6.8, "unitPrice": 75.56, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0015demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-03-21T18:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 120, "price": 10.2, "unitPrice": 85.0, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0016demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-04-16T12:30:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 87, "price": 6.4, "unitPrice": 73.56, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0017demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-05-23T14:50:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 111, "price": 9.1, "unitPrice": 81.98, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0018demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-06-29T11:45:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 95, "price": 7.3, "unitPrice": 76.84, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0019demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-07-11T09:20:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 80, "price": 5.8, "unitPrice": 72.5, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2024-0020demo2024", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2024-08-19T22:00:00.000Z", "project": "Hà Đô Centrosa Garden"
    },
    {
        "area": 50, "price": 2.8, "unitPrice": 56.00, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0002", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-01-10T10:00:00.000Z", "project": ""
    },
    {
        "area": 48, "price": 2.7, "unitPrice": 56.25, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0003", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-02-15T11:30:00.000Z", "project": ""
    },
    {
        "area": 55, "price": 3.1, "unitPrice": 56.36, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0004", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-03-20T14:00:00.000Z", "project": ""
    },
    {
        "area": 46, "price": 2.65, "unitPrice": 57.61, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0005", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-04-22T09:45:00.000Z", "project": ""
    },
    {
        "area": 52, "price": 2.9, "unitPrice": 55.77, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0006", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-05-18T16:20:00.000Z", "project": ""
    },
    {
        "area": 60, "price": 3.4, "unitPrice": 56.67, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0007", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-06-12T08:00:00.000Z", "project": ""
    },
    {
        "area": 47, "price": 2.8, "unitPrice": 59.57, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0008", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-07-30T13:10:00.000Z", "project": ""
    },
    {
        "area": 58, "price": 3.2, "unitPrice": 55.17, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0009", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-08-14T15:00:00.000Z", "project": ""
    },
    {
        "area": 53, "price": 3.0, "unitPrice": 56.6, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0010", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-09-05T21:00:00.000Z", "project": ""
    },
    {
        "area": 49, "price": 2.85, "unitPrice": 58.16, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0011", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-10-28T10:30:00.000Z", "project": ""
    },
    {
        "area": 56, "price": 3.15, "unitPrice": 56.25, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0012", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-11-16T11:15:00.000Z", "project": ""
    },
    {
        "area": 51, "price": 2.95, "unitPrice": 57.84, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0013", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-12-24T19:00:00.000Z", "project": ""
    },
    {
        "area": 45, "price": 2.7, "unitPrice": 60.00, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0014", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-01-22T09:00:00.000Z", "project": ""
    },
    {
        "area": 59, "price": 3.3, "unitPrice": 55.93, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0015", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-02-19T14:45:00.000Z", "project": ""
    },
    {
        "area": 54, "price": 3.05, "unitPrice": 56.48, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0016", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-03-11T16:30:00.000Z", "project": ""
    },
    {
        "area": 48, "price": 2.8, "unitPrice": 58.33, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0017", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-04-29T18:20:00.000Z", "project": ""
    },
    {
        "area": 57, "price": 3.25, "unitPrice": 57.02, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0018", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-05-13T12:00:00.000Z", "project": ""
    },
    {
        "area": 50, "price": 2.9, "unitPrice": 58.00, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0019", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-06-26T10:00:00.000Z", "project": ""
    },
    {
        "area": 55, "price": 3.1, "unitPrice": 56.36, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0020", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-07-17T11:00:00.000Z", "project": ""
    },
    {
        "area": 49, "price": 2.75, "unitPrice": 56.12, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2024-0021", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2024-08-21T13:40:00.000Z", "project": ""
    }
        
    ],
    "2023": [
        { "area": 45, "price": 4.39, "unitPrice": 73.33, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2023-0001", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 53, "price": 3.28, "unitPrice": 47.55, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2023-0002", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 53, "price": 5, "unitPrice": 54.72, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2023-0003", "city": "Hồ Chí Minh", "ward": "Võ Thị Sáu", "street": "Nam Kỳ Khởi Nghĩa", "publishedAt": "2023-03-21T18:05:00.789Z", "project": "Serenity Sky Villas" },
        { "area": 53, "price": 3.7, "unitPrice": 40.19, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2023-0004", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2023-01-18T16:40:40.878Z", "project": "" },
        { "area": 53, "price": 4.39, "unitPrice": 66.79, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2023-0005", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 57, "price": 4.39, "unitPrice": 53.86, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2023-0006", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 57, "price": 4.1, "unitPrice": 59.82, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2023-0007", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2023-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 57, "price": 4.1, "unitPrice": 54.04, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2023-0008", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2023-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 60, "price": 4.02, "unitPrice": 52, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2023-0009", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2023-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 60, "price": 3.7, "unitPrice": 76, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0010", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2023-01-18T16:40:40.878Z", "project": "" },
        { "area": 60, "price": 4.1, "unitPrice": 73.5, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2023-0011", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2023-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 75, "price": 4.02, "unitPrice": 59.87, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0012", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2023-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 75, "price": 4.2, "unitPrice": 47.07, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2023-0013", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2023-02-14T09:45:30.456Z", "project": "" },
        { "area": 75, "price": 4.39, "unitPrice": 56.8, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2023-0014", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 80, "price": 4.39, "unitPrice": 43, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2023-0015", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 80, "price": 3.28, "unitPrice": 41, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2023-0016", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 80, "price": 4.2, "unitPrice": 47.13, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2023-0017", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2023-02-14T09:45:30.456Z", "project": "" },
        { "area": 84, "price": 6, "unitPrice": 52.38, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0018", "city": "Hồ Chí Minh", "ward": "Tân Phong", "street": "Nguyễn Lương Bằng", "publishedAt": "2023-06-15T10:10:10.323Z", "project": "Sunrise City" },
        { "area": 84, "price": 3.28, "unitPrice": 76.67, "legal": "Sổ Hồng", "furniture": "Đầy đủ", "id": "Spb-2023-0019", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 84, "price": 4.39, "unitPrice": 52.02, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0020", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 84, "price": 4.1, "unitPrice": 56.67, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2023-0021", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2023-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 94, "price": 3.55, "unitPrice": 57.98, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0022", "city": "Hồ Chí Minh", "ward": "Phước Long B", "street": "Đỗ Xuân Hợp", "publishedAt": "2023-08-09T08:30:30.545Z", "project": "Vinhomes Grand Park" },
        { "area": 107, "price": 4.75, "unitPrice": 65.05, "legal": "Sổ Hồng", "furniture": "Đầy đủ", "id": "Spb-2023-0023", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2023-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 125, "price": 4.1, "unitPrice": 53.76, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0024", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2023-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 45, "price": 4.2, "unitPrice": 73.33, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2023-0025", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2023-02-14T09:45:30.456Z", "project": "" },
        { "area": 53, "price": 3.7, "unitPrice": 47.55, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0026", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2023-01-18T16:40:40.878Z", "project": "" },
        { "area": 53, "price": 3.7, "unitPrice": 54.72, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2023-0027", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2023-01-18T16:40:40.878Z", "project": "" },
        { "area": 53, "price": 4.1, "unitPrice": 41.32, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2023-0028", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2023-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 53, "price": 4.75, "unitPrice": 66.79, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2023-0029", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2023-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 57, "price": 2.6, "unitPrice": 54.21, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2023-0030", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2023-10-26T20:00:00.212Z", "project": "" },
        { "area": 57, "price": 4.02, "unitPrice": 59.82, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2023-0031", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2023-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 57, "price": 4.1, "unitPrice": 54.21, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2023-0032", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2023-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 60, "price": 4.02, "unitPrice": 52, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2023-0033", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2023-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 60, "price": 4.2, "unitPrice": 76, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0034", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2023-02-14T09:45:30.456Z", "project": "" },
        { "area": 60, "price": 4.75, "unitPrice": 73.5, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2023-0035", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2023-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 75, "price": 4.39, "unitPrice": 59.87, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0036", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 75, "price": 4.1, "unitPrice": 47.07, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2023-0037", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2023-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 75, "price": 4.75, "unitPrice": 57.6, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2023-0038", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2023-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 80, "price": 3.7, "unitPrice": 43.63, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2023-0039", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2023-01-18T16:40:40.878Z", "project": "" },
        { "area": 80, "price": 4.1, "unitPrice": 41, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2023-0040", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2023-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 80, "price": 2.5, "unitPrice": 47.13, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2023-0041", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2023-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 84, "price": 3.28, "unitPrice": 52.38, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0042", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 84, "price": 3.28, "unitPrice": 76.67, "legal": "Sổ Hồng", "furniture": "Đầy đủ", "id": "Spb-2023-0043", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 84, "price": 3.55, "unitPrice": 52.02, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0044", "city": "Hồ Chí Minh", "ward": "Phước Long B", "street": "Đỗ Xuân Hợp", "publishedAt": "2023-08-09T08:30:30.545Z", "project": "Vinhomes Grand Park" },
        { "area": 84, "price": 2.5, "unitPrice": 56.67, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2023-0045", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2023-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 94, "price": 4.1, "unitPrice": 57.98, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0046", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2023-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 107, "price": 4.02, "unitPrice": 65.05, "legal": "Sổ Hồng", "furniture": "Đầy đủ", "id": "Spb-2023-0047", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2023-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 130, "price": 4.75, "unitPrice": 51.69, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0048", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2023-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 45, "price": 4.75, "unitPrice": 73.33, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2023-0049", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2023-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 53, "price": 4.1, "unitPrice": 47.55, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0050", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2023-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 53, "price": 3.7, "unitPrice": 54.72, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2023-0051", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2023-01-18T16:40:40.878Z", "project": "" },
        { "area": 53, "price": 4.75, "unitPrice": 40.19, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2023-0052", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2023-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 53, "price": 2.5, "unitPrice": 66.79, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2023-0053", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2023-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 57, "price": 2.6, "unitPrice": 54.74, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2023-0054", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2023-10-26T20:00:00.212Z", "project": "" },
        { "area": 57, "price": 4.39, "unitPrice": 59.82, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2023-0055", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 57, "price": 4.1, "unitPrice": 54.74, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2023-0056", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2023-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 60, "price": 4.1, "unitPrice": 52, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2023-0057", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2023-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 60, "price": 4.75, "unitPrice": 76, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0058", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2023-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 60, "price": 2.5, "unitPrice": 73.5, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2023-0059", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2023-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 75, "price": 3.7, "unitPrice": 59.87, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0060", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2023-01-18T16:40:40.878Z", "project": "" },
        { "area": 75, "price": 4.1, "unitPrice": 47.07, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2023-0061", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2023-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 75, "price": 3.8, "unitPrice": 56.8, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2023-0062", "city": "Hồ Chí Minh", "ward": "Hải Long", "street": "Tạ Quang Bửu", "publishedAt": "2023-04-12T15:55:05.434Z", "project": "Tara Residence" },
        { "area": 80, "price": 4.1, "unitPrice": 43.63, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2023-0063", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2023-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 80, "price": 3.28, "unitPrice": 41, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2023-0064", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 80, "price": 4.1, "unitPrice": 47.13, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2023-0065", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2023-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 84, "price": 2.5, "unitPrice": 52.38, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0066", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2023-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 84, "price": 3.28, "unitPrice": 76.67, "legal": "Sổ Hồng", "furniture": "Đầy đủ", "id": "Spb-2023-0067", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 84, "price": 4.39, "unitPrice": 52.26, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0068", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 84, "price": 4.1, "unitPrice": 56.67, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2023-0069", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2023-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 94, "price": 4.1, "unitPrice": 57.98, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0070", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2023-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 107, "price": 2.6, "unitPrice": 65.05, "legal": "Sổ Hồng", "furniture": "Đầy đủ", "id": "Spb-2023-0071", "city": "Hồ Chí Minh", "ward": "Khải Định", "street": "Nguyễn Trãi", "publishedAt": "2023-10-26T20:00:00.212Z", "project": "" },
        { "area": 45, "price": 4.75, "unitPrice": 73.33, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0072", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2023-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 53, "price": 2.5, "unitPrice": 47.55, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2023-0073", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2023-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 53, "price": 3.7, "unitPrice": 54.72, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2023-0074", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2023-01-18T16:40:40.878Z", "project": "" },
        { "area": 53, "price": 4.2, "unitPrice": 40.19, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0075", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2023-02-14T09:45:30.456Z", "project": "" },
        { "area": 53, "price": 6, "unitPrice": 77.92, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2023-0076", "city": "Hồ Chí Minh", "ward": "Tân Phong", "street": "Nguyễn Lương Bằng", "publishedAt": "2023-06-15T10:10:10.323Z", "project": "Sunrise City" },
        { "area": 57, "price": 4.1, "unitPrice": 53.86, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0077", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2023-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 57, "price": 3.7, "unitPrice": 59.82, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2023-0078", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2023-01-18T16:40:40.878Z", "project": "" },
        { "area": 57, "price": 5, "unitPrice": 54.56, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0079", "city": "Hồ Chí Minh", "ward": "Võ Thị Sáu", "street": "Nam Kỳ Khởi Nghĩa", "publishedAt": "2023-03-21T18:05:00.789Z", "project": "Serenity Sky Villas" },
        { "area": 60, "price": 4.02, "unitPrice": 52, "legal": "Sổ Hồng", "furniture": "Nhà thô", "id": "Spb-2023-0080", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2023-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 60, "price": 3.7, "unitPrice": 76, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0081", "city": "Hồ Chí Minh", "ward": "Hoà Bình", "street": "Điện Biên Phủ", "publishedAt": "2023-01-18T16:40:40.878Z", "project": "" },
        { "area": 60, "price": 3.8, "unitPrice": 73.5, "legal": "HĐMB", "furniture": "Đầy đủ", "id": "Spb-2023-0082", "city": "Hồ Chí Minh", "ward": "Hải Long", "street": "Tạ Quang Bửu", "publishedAt": "2023-04-12T15:55:05.434Z", "project": "Tara Residence" },
        { "area": 75, "price": 4.1, "unitPrice": 59.87, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0083", "city": "Hồ Chí Minh", "ward": "Sơn Bình", "street": "Bến Vân Đồn", "publishedAt": "2023-09-03T11:20:45.101Z", "project": "Galaxy 9" },
        { "area": 75, "price": 2.5, "unitPrice": 47.07, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2023-0084", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2023-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 75, "price": 4.1, "unitPrice": 57.33, "legal": "Sổ Hồng", "furniture": "Cơ bản", "id": "Spb-2023-0085", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2023-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" },
        { "area": 80, "price": 4.39, "unitPrice": 43.38, "legal": "HĐC", "furniture": "Đầy đủ", "id": "Spb-2023-0086", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 80, "price": 3.28, "unitPrice": 41, "legal": "HĐMB", "furniture": "Cơ bản", "id": "Spb-2023-0087", "city": "Hồ Chí Minh", "ward": "Hoà Bình 2", "street": "Điện Biên Phủ", "publishedAt": "2023-02-21T19:25:55.121Z", "project": "Tara Residence" },
        { "area": 80, "price": 4.02, "unitPrice": 47.13, "legal": "HĐC", "furniture": "Nhà thô", "id": "Spb-2023-0088", "city": "Hồ Chí Minh", "ward": "Hoà Bình 1", "street": "Điện Biên Phủ", "publishedAt": "2023-03-12T13:13:13.989Z", "project": "Sunrise City" },
        { "area": 84, "price": 2.5, "unitPrice": 52.38, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0089", "city": "Hồ Chí Minh", "ward": "Bến Nghé", "street": "Nguyễn Huệ", "publishedAt": "2023-01-06T14:30:15.123Z", "project": "The Grand Manhattan" },
        { "area": 84, "price": 4.2, "unitPrice": 76.67, "legal": "Sổ Hồng", "furniture": "Đầy đủ", "id": "Spb-2023-0090", "city": "Hồ Chí Minh", "ward": "An Khánh", "street": "Trần Não", "publishedAt": "2023-02-14T09:45:30.456Z", "project": "" },
        { "area": 84, "price": 4.39, "unitPrice": 52.26, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0091", "city": "Hồ Chí Minh", "ward": "Hoà Bình 3", "street": "Điện Biên Phủ", "publishedAt": "2023-09-11T07:45:00.232Z", "project": "Vinhomes Grand Park" },
        { "area": 84, "price": 3.8, "unitPrice": 56.67, "legal": "HĐMB", "furniture": "Nhà thô", "id": "Spb-2023-0092", "city": "Hồ Chí Minh", "ward": "Hải Long", "street": "Tạ Quang Bửu", "publishedAt": "2023-04-12T15:55:05.434Z", "project": "Tara Residence" },
        { "area": 94, "price": 4.75, "unitPrice": 58.62, "legal": "HĐC", "furniture": "Cơ bản", "id": "Spb-2023-0093", "city": "Hồ Chí Minh", "ward": "15", "street": "Thành Thái", "publishedAt": "2023-12-30T22:15:00.656Z", "project": "Hà Đô Centrosa Garden" },
        { "area": 107, "price": 4.1, "unitPrice": 65.05, "legal": "Sổ Hồng", "furniture": "Đầy đủ", "id": "Spb-2023-0094", "city": "Hồ Chí Minh", "ward": "Bình Quới", "street": "Điện Biên Phủ", "publishedAt": "2023-03-18T12:00:15.767Z", "project": "Vinhomes Central Park" }
    ]
};