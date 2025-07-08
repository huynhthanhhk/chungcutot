// assets/js/wiki-data.js

const wikiCategories = {
    "phap-ly": {
        name: "Pháp lý",
        description: "Tổng hợp kiến thức pháp lý quan trọng trong lĩnh vực bất động sản."
    },
    "noi-that": {
        name: "Nội thất",
        description: "Kinh nghiệm lựa chọn, bố trí nội thất thông minh và tối ưu cho căn hộ."
    },
    "phong-thuy": {
        name: "Phong thủy",
        description: "Các yếu tố phong thủy giúp mang lại vượng khí và tài lộc cho gia chủ."
    }
};

const allWikiArticles = [
    {
        id: "pl001",
        category: "phap-ly",
        title: "Sổ hồng chung cư là gì? Thời hạn và những điều cần biết",
        excerpt: "Tổng hợp những thông tin quan trọng nhất về giấy chứng nhận quyền sở hữu căn hộ chung cư mà bất kỳ ai cũng cần nắm rõ...",
        image: "assets/images/wiki.jpeg",
        link: "bai-viet-chi-tiet.html?id=pl001"
    },
    {
        id: "pl002",
        category: "phap-ly",
        title: "5 Điều khoản cần kiểm tra kỹ trong Hợp đồng mua bán căn hộ",
        excerpt: "Hợp đồng mua bán là văn bản pháp lý quan trọng nhất. Đây là những điều khoản bạn không thể bỏ qua để bảo vệ quyền lợi của mình.",
        image: "assets/images/wiki1.jpeg",
        link: "bai-viet-chi-tiet.html?id=pl002"
    },
    {
        id: "pl003",
        category: "phap-ly",
        title: "Phí bảo trì chung cư 2%: Ai thu, dùng để làm gì?",
        excerpt: "Giải đáp tất cả các thắc mắc phổ biến nhất xung quanh quỹ bảo trì 2% của tòa nhà chung cư theo quy định của pháp luật hiện hành.",
        image: "assets/images/wiki.jpeg",
        link: "bai-viet-chi-tiet.html?id=pl003"
    },
    {
        id: "pl004",
        category: "phap-ly",
        title: "Rủi ro khi mua nhà \"trên giấy\" và cách phòng tránh hiệu quả",
        excerpt: "Mua nhà hình thành trong tương lai có thể giúp bạn có giá tốt, nhưng cũng tiềm ẩn nhiều rủi ro nếu không tìm hiểu kỹ lưỡng...",
        image: "assets/images/wiki1.jpeg",
        link: "bai-viet-chi-tiet.html?id=pl004"
    },
    {
        id: "nt001",
        category: "noi-that",
        title: "Xu hướng thiết kế nội thất chung cư được ưa chuộng nhất 2025",
        excerpt: "Khám phá các phong cách thiết kế nội thất hiện đại, tối giản và thông minh đang dẫn đầu xu hướng cho không gian sống căn hộ.",
        image: "assets/images/wiki-noithat.jpg",
        link: "bai-viet-chi-tiet.html?id=nt001"
    },
     {
        id: "nt002",
        category: "noi-that",
        title: "Mẹo chọn vật liệu nội thất vừa bền đẹp vừa tiết kiệm chi phí",
        excerpt: "Lựa chọn vật liệu phù hợp không chỉ mang lại vẻ đẹp mà còn giúp bạn tối ưu hóa ngân sách cho việc hoàn thiện căn hộ mơ ước.",
        image: "assets/images/wiki-noithat-2.jpg",
        link: "bai-viet-chi-tiet.html?id=nt002"
    }
];