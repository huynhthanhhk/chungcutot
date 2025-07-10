const newsCategories = {
    "du-an": {
        name: "Dự án",
        description: "Cập nhật thông tin mới nhất về các dự án bất động sản nổi bật."
    },
    "thi-truong": {
        name: "Thị trường",
        description: "Phân tích và nhận định về xu hướng thị trường bất động sản."
    }
};

const allNewsArticles = [
    // --- DANH MỤC: THỊ TRƯỜNG ---
    {
        id: "tt001",
        category: "thi-truong",
        title: "Giá căn hộ TP.HCM dự báo sẽ tiếp tục tăng trong quý 3",
        excerpt: "Theo báo cáo mới nhất từ Savills, nguồn cung khan hiếm và chi phí xây dựng tăng cao là những yếu tố chính thúc đẩy giá bán...",
        image: "assets/images/tintuc1.png",
        author: "Chuyên gia phân tích",
        datePublished: "2025-07-08",
        tags: ["giá căn hộ", "thị trường tphcm", "dự báo", "báo cáo savills"],
        readingTime: 4
    },
    {
        id: "tt002",
        category: "thi-truong",
        title: "Bất động sản khu Đông 'dậy sóng' trước ngày vận hành tuyến Metro số 1",
        excerpt: "Giá nhà đất tại các khu vực lân cận tuyến Metro Bến Thành - Suối Tiên ghi nhận mức tăng đột biến, thu hút mạnh mẽ giới đầu tư.",
        image: "assets/images/tintuc2.png",
        author: "Phóng viên BĐS",
        datePublished: "2025-07-05",
        tags: ["metro số 1", "khu đông", "hạ tầng", "đầu tư"],
        readingTime: 5
    },
    {
        id: "tt003",
        category: "thi-truong",
        title: "Chính phủ yêu cầu siết chặt phân lô, bán nền tại các thành phố lớn",
        excerpt: "Chỉ thị mới nhằm chấn chỉnh hoạt động kinh doanh bất động sản, hạn chế đầu cơ và đảm bảo sự phát triển bền vững của thị trường.",
        image: "assets/images/tintuc4.png",
        author: "Tổng hợp",
        datePublished: "2025-06-28",
        tags: ["chính sách", "phân lô bán nền", "pháp lý", "thị trường"],
        readingTime: 4
    },
    {
        id: "tt004",
        category: "thi-truong",
        title: "Nguồn cung văn phòng cho thuê tại trung tâm TP.HCM đạt tỷ lệ lấp đầy 95%",
        excerpt: "Nhu cầu thuê văn phòng hạng A và B vẫn ở mức cao bất chấp giá thuê tăng nhẹ, cho thấy sự phục hồi mạnh mẽ của kinh tế.",
        image: "assets/images/tintuc4.png",
        author: "CafeLand",
        datePublished: "2025-06-15",
        tags: ["văn phòng cho thuê", "mặt bằng kinh doanh", "tỷ lệ lấp đầy"],
        readingTime: 3
    },

    // --- DANH MỤC: DỰ ÁN ---
    {
        id: "da001",
        category: "du-an",
        title: "Chính thức ra mắt The Aquafront Saigon: Biểu tượng mới bên sông Sài Gòn",
        excerpt: "Tọa lạc tại vị trí kim cương ở Thủ Thiêm, The Aquafront Saigon được kỳ vọng sẽ thiết lập một tiêu chuẩn sống sang trọng bậc nhất.",
        image: "assets/images/tintuc3.png",
        author: "Chủ đầu tư",
        datePublished: "2025-07-10",
        tags: ["the aquafront saigon", "thủ thiêm", "dự án mới", "căn hộ hạng sang"],
        readingTime: 5
    },
    {
        id: "da002",
        category: "du-an",
        title: "Cập nhật tiến độ dự án EcoGarden Thủ Đức tháng 7/2025: Đã cất nóc 2 tòa tháp",
        excerpt: "Dự án đang vượt tiến độ dự kiến, chủ đầu tư cam kết sẽ bắt đầu bàn giao những căn hộ đầu tiên cho khách hàng vào Quý 1/2026.",
        image: "assets/images/tintuc2.png",
        author: "Ban quản lý dự án",
        datePublished: "2025-07-02",
        tags: ["ecogarden thủ đức", "tiến độ xây dựng", "cất nóc", "bàn giao nhà"],
        readingTime: 3
    },
    {
        id: "da003",
        category: "du-an",
        title: "The Vertex Tower công bố chính sách bán hàng đột phá, thanh toán 30% đến khi nhận nhà",
        excerpt: "Chính sách thanh toán linh hoạt của The Vertex Tower đang tạo ra một làn sóng quan tâm lớn trên thị trường căn hộ cao cấp Quận 1.",
        image: "assets/images/tintuc1.png",
        author: "Phòng kinh doanh",
        datePublished: "2025-06-25",
        tags: ["the vertex tower", "quận 1", "chính sách bán hàng", "thanh toán"],
        readingTime: 4
    }
];