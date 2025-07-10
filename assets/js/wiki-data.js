const wikiCategories = {
    "phap-ly": {
        name: "Pháp lý",
        description: "Tổng hợp kiến thức pháp lý quan trọng trong lĩnh vực bất động sản."
    },
    "kinh-nghiem": {
        name: "Kinh nghiệm",
        description: "Chia sẻ những kinh nghiệm thực tế khi mua, bán và cho thuê bất động sản."
    },
    "phong-thuy": {
        name: "Phong thủy",
        description: "Các yếu tố phong thủy giúp mang lại vượng khí và tài lộc cho gia chủ."
    }
};

const allWikiArticles = [
    // --- DANH MỤC: PHÁP LÝ ---
    {
        id: "pl001",
        category: "phap-ly",
        title: "Sổ hồng chung cư là gì? Thời hạn và những điều cần biết",
        excerpt: "Tổng hợp những thông tin quan trọng nhất về giấy chứng nhận quyền sở hữu căn hộ chung cư mà bất kỳ ai cũng cần nắm rõ.",
        image: "assets/images/wiki.jpeg",
        author: "Chuyên gia pháp lý",
        datePublished: "2025-07-10",
        tags: ["sổ hồng", "pháp lý chung cư", "giấy chứng nhận"],
        readingTime: 5
    },
    {
        id: "pl002",
        category: "phap-ly",
        title: "5 Điều khoản cần kiểm tra kỹ trong Hợp đồng mua bán căn hộ",
        excerpt: "Hợp đồng mua bán là văn bản pháp lý quan trọng nhất. Đây là những điều khoản bạn không thể bỏ qua để bảo vệ quyền lợi của mình.",
        image: "assets/images/wiki.jpeg",
        author: "Luật sư BĐS",
        datePublished: "2025-06-25",
        tags: ["hợp đồng", "mua bán", "căn hộ", "điều khoản"],
        readingTime: 7
    },
    {
        id: "pl003",
        category: "phap-ly",
        title: "Phí bảo trì chung cư 2%: Ai thu, dùng để làm gì?",
        excerpt: "Giải đáp tất cả các thắc mắc phổ biến nhất xung quanh quỹ bảo trì 2% của tòa nhà chung cư theo quy định của pháp luật hiện hành.",
        image: "assets/images/wiki.jpeg",
        author: "Ban quản trị",
        datePublished: "2025-05-15",
        tags: ["phí bảo trì", "chung cư", "quản lý vận hành"],
        readingTime: 4
    },

    // --- DANH MỤC: KINH NGHIỆM ---
    {
        id: "kn001",
        category: "kinh-nghiem",
        title: "Checklist 20 điểm cần kiểm tra kỹ lưỡng khi đi xem nhà",
        excerpt: "Đừng để cảm xúc lấn át lý trí. Hãy mang theo danh sách này để đảm bảo bạn không bỏ sót bất kỳ chi tiết quan trọng nào.",
        image: "assets/images/wiki.jpeg",
        author: "Người mua nhà",
        datePublished: "2025-07-02",
        tags: ["xem nhà", "kinh nghiệm mua nhà", "checklist"],
        readingTime: 5
    },
    {
        id: "kn002",
        category: "kinh-nghiem",
        title: "Kỹ năng đàm phán giá bất động sản cho người mua lần đầu",
        excerpt: "Làm thế nào để thương lượng được mức giá tốt nhất? Bỏ túi ngay những mẹo đàm phán hiệu quả từ chuyên gia.",
        image: "assets/images/wiki.jpeg",
        author: "Chuyên gia đàm phán",
        datePublished: "2025-06-12",
        tags: ["đàm phán", "thương lượng giá", "mua nhà"],
        readingTime: 7
    },
    {
        id: "kn003", // Trước đây là nt001
        category: "kinh-nghiem",
        title: "Xu hướng thiết kế nội thất chung cư được ưa chuộng nhất 2025",
        excerpt: "Khám phá các phong cách thiết kế nội thất hiện đại, tối giản và thông minh đang dẫn đầu xu hướng cho không gian sống căn hộ.",
        image: "assets/images/wiki.jpeg",
        author: "Kiến trúc sư",
        datePublished: "2025-07-01",
        tags: ["xu hướng", "thiết kế", "nội thất 2025", "kinh nghiệm"],
        readingTime: 6
    },
     {
        id: "kn004", // Trước đây là dt001
        category: "kinh-nghiem",
        title: "5 yếu tố vàng quyết định khả năng sinh lời của Bất động sản",
        excerpt: "Vị trí không phải là tất cả. Nắm vững 5 yếu tố này sẽ giúp bạn đưa ra quyết định đầu tư thông minh và an toàn.",
        image: "assets/images/wiki.jpeg",
        author: "Chuyên gia đầu tư",
        datePublished: "2025-07-08",
        tags: ["đầu tư", "sinh lời", "phân tích", "kinh nghiệm"],
        readingTime: 8
    },
    
    // --- DANH MỤC: PHONG THỦY ---
    {
        id: "pt001",
        category: "phong-thuy",
        title: "Cách xác định hướng ban công chung cư và chọn căn hộ hợp mệnh",
        excerpt: "Việc chọn hướng ban công hợp phong thủy có thể mang lại may mắn, sức khỏe và tài lộc cho cả gia đình. Tìm hiểu ngay cách xác định.",
        image: "assets/images/wiki.jpeg",
        author: "Chuyên gia phong thủy",
        datePublished: "2025-07-05",
        tags: ["hướng nhà", "phong thủy", "mệnh", "tài lộc"],
        readingTime: 6
    },
    {
        id: "pt002",
        category: "phong-thuy",
        title: "7 lỗi phong thủy thường gặp ở cửa chính và cách hóa giải",
        excerpt: "Cửa chính là nơi đón vượng khí vào nhà. Hãy kiểm tra xem căn hộ của bạn có phạm phải những lỗi phong thủy cơ bản này không.",
        image: "assets/images/wiki.jpeg",
        author: "Chuyên gia phong thủy",
        datePublished: "2025-06-10",
        tags: ["cửa chính", "phong thủy nhà ở", "hóa giải"],
        readingTime: 5
    }
];