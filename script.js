// Dữ liệu mẫu
const materials = [
    {
        id: 1,
        title: "100 Đề Minh Họa Tốt Nghiệp THPT 2025 - Môn Ngữ Văn",
        description: "Bộ 100 đề thi minh họa tốt nghiệp THPT 2025 môn Ngữ Văn. Bám sát cấu trúc đề thi mới nhất của Bộ GD&ĐT. Có đáp án và hướng dẫn giải chi tiết.",
        subject: "van",
        grade: "12",
        price: 50000,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1J4-0b2-WLqMP85Vdt3Vo8XzL7vhY4-R3/view?usp=sharing",
        downloadCode: "EdupassVan50demh",
        author: "Dung Vũ (Chủ biên) - Hà Thúy Linh - Cao Hằng",
        publisher: "Moon.vn - Nhà xuất bản Dân trí",
        year: 2025
    },
    {
        id: 2,
        title: "10 Đề Thi Thử Vật Lí THPTQG P1",
        description: "Bộ 10 đề thi thử THPT Quốc Gia môn Vật Lí phần 1. Đề thi bám sát cấu trúc mới nhất, có đáp án chi tiết giúp học sinh ôn luyện hiệu quả.",
        subject: "ly",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/open?id=1kQVraUl2Gym3WT0q51krN-v_zs5f22QZ&usp=drive_copy",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 3,
        title: "10 Đề Thi Thử Hóa THPTQG P1",
        description: "Bộ 10 đề thi thử THPT Quốc Gia môn Hóa học phần 1. Đề thi bám sát cấu trúc mới nhất, có đáp án chi tiết giúp học sinh ôn luyện hiệu quả.",
        subject: "hoa",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/open?id=1Z8sP9xG9I0NwYa3kYn2wzJHG5Oyk49xn&usp=drive_copy",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 4,
        title: "10 Đề Thi Thử Sinh THPTQG P1",
        description: "Bộ 10 đề thi thử THPT Quốc Gia môn Sinh học phần 1. Đề thi bám sát cấu trúc mới nhất, có đáp án chi tiết giúp học sinh ôn luyện hiệu quả.",
        subject: "sinh",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/open?id=1qcdTJtq2uRavHJ9SYeb7YCUSS2vQSOxt&usp=drive_copy",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 5,
        title: "Tổng Ôn Vật Lý 12 - Trọn Bộ",
        description: "Bộ tài liệu tổng ôn Vật Lý 12 đầy đủ gồm: đề kiểm tra, tài liệu tham khảo, bài tập trắc nghiệm. Phù hợp cho học sinh ôn thi THPT Quốc Gia.",
        subject: "ly",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/mobile/folders/1sitzKVIptHQ5LrAwXgtflxM7IhNnYiZg?usp=sharing",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 6,
        title: "Vật Lí 12 - 1000 Câu Hỏi Trả Lời Ngắn Ôn Tập Theo Chủ Đề 2026",
        description: "Bộ 1000 câu hỏi trả lời ngắn môn Vật Lí 12, phân loại theo chủ đề và dạng bài. Cập nhật mới nhất năm 2026, giúp học sinh rèn luyện kỹ năng làm bài hiệu quả.",
        subject: "ly",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1eCBHFuu3WDV9SP7DJ5f2a1j88baLLJSf?usp=drive_link",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2026
    },
    {
        id: 7,
        title: "Vật Lí 12 - 1500 Câu Hỏi Trắc Nghiệm Ôn Tập Theo Chủ Đề 2026",
        description: "Bộ 1500 câu hỏi trắc nghiệm môn Vật Lí 12, phân loại theo chủ đề và dạng bài. Cập nhật mới nhất năm 2026, bám sát cấu trúc đề thi THPT Quốc Gia.",
        subject: "ly",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/113Pd4a8dP-FTPbktuNcDwa7uiqhDzRFM?usp=drive_link",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2026
    },
    {
        id: 8,
        title: "Vật Lí 12 - Bộ Đề Học Sinh Giỏi Vật Lý 12 Trường Sở 2025-2026",
        description: "Bộ đề thi học sinh giỏi Vật Lý 12 cấp trường và cấp sở năm học 2025-2026. Phù hợp cho học sinh muốn nâng cao kiến thức và tham gia các kỳ thi HSG.",
        subject: "ly",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1EO4RW0oMEKbs6OXGZpniDnpGTl8NydoO?usp=drive_link",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2026
    },
    {
        id: 9,
        title: "Vật Lí 12 - Chuyên Đề Bài Tập Dạy Thêm Vật Lí Lớp 12 Năm 2026",
        description: "Bộ chuyên đề bài tập dạy thêm Vật Lí lớp 12 năm 2026. Phân loại theo từng chuyên đề, có hướng dẫn giải chi tiết giúp học sinh nắm vững kiến thức.",
        subject: "ly",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1fLA75nEwUVRTimoEhIHuwmqfCBs5fvY1?usp=drive_link",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2026
    },
    {
        id: 10,
        title: "Vật Lí 12 - Ngân Hàng Câu Hỏi Theo Chuyên Đề (Từ Đề Thi Thử TN THPT 2025)",
        description: "Ngân hàng câu hỏi Vật Lí 12 theo chuyên đề, được tách từ các đề thi thử TN THPT 2025. Giúp học sinh làm quen với dạng đề thi thật và ôn tập hiệu quả.",
        subject: "ly",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1w3YBDewErHF_uVqGYS-husgsffDz1gsO?usp=drive_link",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 11,
        title: "Tổng Ôn Nắm Chắc 8+ Vật Lý 12",
        description: "Bộ tài liệu tổng ôn giúp học sinh nắm chắc kiến thức và đạt điểm 8+ môn Vật Lý 12. Tổng hợp đầy đủ lý thuyết, bài tập và phương pháp giải chi tiết.",
        subject: "ly",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/open?id=1VLFd2EM6guqqhaTHSvU_b0JqNZdVM70L&usp=drive_copy",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 12,
        title: "Thực Chiến Luyện Đề Môn Hóa THPT Quốc Gia - 40 Đề",
        description: "Bộ 40 đề thi thực chiến môn Hóa học THPT Quốc Gia. Đề thi bám sát cấu trúc mới nhất, có đáp án chi tiết giúp học sinh rèn luyện kỹ năng làm bài và nâng cao điểm số.",
        subject: "hoa",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1kBHkBjiXZfA8AG5glUhMc21Vp9HepQjr?usp=drive_link",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 13,
        title: "Bộ Đề Thi Thử TN THPT Môn Toán",
        description: "Bộ đề thi thử tốt nghiệp THPT môn Toán học. Đề thi bám sát cấu trúc mới nhất của Bộ GD&ĐT, có đáp án chi tiết giúp học sinh ôn luyện hiệu quả.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1IuzMQM-HspXdi6eV_Jcke_DFCGfyvwFP",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 14,
        title: "52 Bài Toán Ứng Dụng Tích Phân Hay - Full Đáp Án Chi Tiết",
        description: "Bộ 52 bài toán ứng dụng tích phân hay và khó, có đáp án chi tiết. Giúp học sinh nắm vững phương pháp giải và đạt điểm cao trong các kỳ thi.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1CvE0RHCtNfDdeGBpGcUU8pS9bTBtvhzE/view",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 15,
        title: "7 Ngày Chinh Phục Nguyên Hàm Tích Phân 9+ - Nguyễn Tiến Đạt",
        description: "Tài liệu học Nguyên hàm - Tích phân trong 7 ngày của thầy Nguyễn Tiến Đạt. Phương pháp học hiệu quả giúp học sinh đạt điểm 9+ trong kỳ thi THPT Quốc Gia.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1NaBgyHKTKqH8XnjZ5HsEQD_OW9sokez0/view",
        downloadCode: "",
        author: "Nguyễn Tiến Đạt",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 16,
        title: "Thực Chiến Luyện Đề Môn Toán - 40 Đề (Thầy Đỗ Văn Đức)",
        description: "Bộ 40 đề thi thực chiến môn Toán của thầy Đỗ Văn Đức. Đề thi bám sát cấu trúc mới nhất, có đáp án chi tiết giúp học sinh rèn luyện kỹ năng làm bài.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1i8deW-M3F2wvxpfSYbOIHAFPgRGm7flh",
        downloadCode: "",
        author: "Đỗ Văn Đức",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 17,
        title: "Bộ Công Thức Giải Nhanh Toán 12 Chương Trình Mới (Thầy Hồ Thức Thuận)",
        description: "Bộ công thức giải nhanh Toán 12 chương trình mới của thầy Hồ Thức Thuận. Tổng hợp đầy đủ công thức và phương pháp giải nhanh các dạng bài.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1DB-YXtxGzMFWjLorwkk5DKq8fVLOI0Tl/view",
        downloadCode: "",
        author: "Hồ Thức Thuận",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 18,
        title: "Bộ Sách Luyện Thi Đánh Giá Năng Lực ĐH Sư Phạm Hà Nội - HSA Education",
        description: "Bộ sách luyện thi đánh giá năng lực Đại học Sư phạm Hà Nội của HSA Education. Tài liệu chất lượng cao giúp học sinh chuẩn bị tốt cho kỳ thi ĐGNL.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/18FhwQr6T2_BNs_MMsQZRt8NFQJGGkbNa/view?usp",
        downloadCode: "",
        author: "HSA Education",
        publisher: "HSA Education",
        year: 2025
    },
    {
        id: 19,
        title: "200 Bài Toán Ứng Dụng Thực Tế - Toán 12",
        description: "Bộ 200 bài toán ứng dụng thực tế môn Toán 12. Giúp học sinh rèn luyện kỹ năng vận dụng kiến thức vào các tình huống thực tế và đạt điểm cao.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1OtH8cK5Md4D8bVWRO_haF6YOu9rjPVKy/view",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 20,
        title: "Toàn Bộ Kiến Thức Ngữ Văn 12",
        description: "Tổng hợp toàn bộ kiến thức Ngữ Văn 12. Bao gồm lý thuyết, tác phẩm, tác giả và phương pháp làm bài thi THPT Quốc Gia.",
        subject: "van",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1dIqGqyPff5qiVxyhjJ_cdB5YqTV9zhw-/view",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 21,
        title: "Một Số Thuận Ngữ Trong Chương Trình Lịch Sử 12",
        description: "Tổng hợp các thuận ngữ quan trọng trong chương trình Lịch Sử 12. Giúp học sinh ghi nhớ kiến thức dễ dàng và hiệu quả.",
        subject: "su",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1a5Oy2vWm-HSWqYO7qJXKMq4g2AFOg8Hc/view",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 22,
        title: "Sơ Đồ Tư Duy Lịch Sử 12",
        description: "Bộ sơ đồ tư duy Lịch Sử 12 đầy đủ. Giúp học sinh hệ thống hóa kiến thức và ghi nhớ lâu dài các sự kiện lịch sử.",
        subject: "su",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1sa1WE3cXaEJ8KRtca-L4_0NokKuM7hyp/view",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 23,
        title: "Phân Dạng Toàn Bộ Kiến Thức Toán 12 - Ôn Thi THPTQG & ĐGNL 2024",
        description: "Phân dạng toàn bộ kiến thức Toán 12 cho kỳ thi THPT Quốc Gia và Đánh giá năng lực. Có phương pháp giải chi tiết từng dạng bài.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/19JcDapD2aLA0h7IzmdkJcAUg__Ut94g0/view?usp=drive_link",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2024
    },
    {
        id: 24,
        title: "Tổng Hợp Đề Thi Thử TN THPT 2025 - Toán (Trường + Sở)",
        description: "Tổng hợp đề thi thử TN THPT 2025 môn Toán từ các trường và sở trên toàn quốc. Có đáp án và lời giải chi tiết.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1IuzMQM-HspXdi6eV_Jcke_DFCGfyvwFP",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 25,
        title: "Tổng Hợp Đề Thi Thử TN THPT 2025 - Tiếng Anh (Trường + Sở)",
        description: "Tổng hợp đề thi thử TN THPT 2025 môn Tiếng Anh từ các trường và sở trên toàn quốc. Có đáp án và lời giải chi tiết.",
        subject: "anh",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1PEp64xAvjdJ4c-T5WMmWWXoPgPlJRqKe?usp=drive_link",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 26,
        title: "Tổng Hợp Đề Thi Thử TN THPT 2025 - Vật Lý (Trường + Sở)",
        description: "Tổng hợp đề thi thử TN THPT 2025 môn Vật Lý từ các trường và sở trên toàn quốc. Có đáp án và lời giải chi tiết.",
        subject: "ly",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1R_EQTRNiloyNuPZ4y_zO-qaY4jcdUQwN?usp=drive_link",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 27,
        title: "Tổng Hợp Đề Thi Thử TN THPT 2025 - Hóa Học (Trường + Sở)",
        description: "Tổng hợp đề thi thử TN THPT 2025 môn Hóa Học từ các trường và sở trên toàn quốc. Có đáp án và lời giải chi tiết.",
        subject: "hoa",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1mpKKF_omZSBhEeLO7e6FFvSZZ3CqlRjp?usp=drive_link",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 28,
        title: "Tổng Hợp Đề Thi Thử TN THPT 2025 - Sinh Học (Trường + Sở)",
        description: "Tổng hợp đề thi thử TN THPT 2025 môn Sinh Học từ các trường và sở trên toàn quốc. Có đáp án và lời giải chi tiết.",
        subject: "sinh",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1TFDQDzlIvUazshI9BqoXOf-oK2I_3Zcq?usp=drive_link",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 29,
        title: "Tổng Hợp Đề Thi Thử TN THPT 2025 - Ngữ Văn (Trường + Sở)",
        description: "Tổng hợp đề thi thử TN THPT 2025 môn Ngữ Văn từ các trường và sở trên toàn quốc. Có đáp án và lời giải chi tiết.",
        subject: "van",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1Tu-19gIQMpG29wGgXFRXQ-79d9JbwBbv",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 30,
        title: "Tổng Hợp Đề Thi Thử TN THPT 2025 - Lịch Sử (Trường + Sở)",
        description: "Tổng hợp đề thi thử TN THPT 2025 môn Lịch Sử từ các trường và sở trên toàn quốc. Có đáp án và lời giải chi tiết.",
        subject: "su",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/13QBF8e8d60jwoXNSRkRvDyKDHDf3lGP-",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 31,
        title: "Tổng Hợp Đề Thi Thử TN THPT 2025 - Địa Lý (Trường + Sở)",
        description: "Tổng hợp đề thi thử TN THPT 2025 môn Địa Lý từ các trường và sở trên toàn quốc. Có đáp án và lời giải chi tiết.",
        subject: "dia",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/12negaQ-i2NFw9pjrejTK2kKty71TJjqG",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 32,
        title: "Ebook Thực Chiến Luyện Đề Môn Hóa - 40 Đề (Thầy Phạm Văn Trọng)",
        description: "Bộ 40 đề thi thực chiến môn Hóa học của thầy Phạm Văn Trọng. Đề thi bám sát cấu trúc mới nhất, có đáp án chi tiết giúp học sinh rèn luyện kỹ năng làm bài.",
        subject: "hoa",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1kBHkBjiXZfA8AG5glUhMc21Vp9HepQjr?usp=drive_link",
        downloadCode: "",
        author: "Phạm Văn Trọng",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 33,
        title: "60 Đề Minh Họa 2026 - Môn Hóa Học",
        description: "Bộ 60 đề thi minh họa năm 2026 môn Hóa Học. Bám sát cấu trúc đề thi mới nhất của Bộ GD&ĐT, có đáp án và hướng dẫn giải chi tiết.",
        subject: "hoa",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/12pi6K9724NWWIIpKTjtcM1AYzqZe7DaR?usp=drive_link",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2026
    },
    {
        id: 34,
        title: "Tổng Ôn Địa Lí Moon - Tập 1",
        description: "Bộ tài liệu tổng ôn Địa Lí Moon tập 1. Tổng hợp đầy đủ kiến thức, bài tập và phương pháp giải chi tiết giúp học sinh ôn thi THPT Quốc Gia.",
        subject: "dia",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1GmF3gUSIbcfwVbQZJ-qJZlONO5pp5Yzb?usp=drive_link",
        downloadCode: "",
        author: "Moon.vn",
        publisher: "Moon.vn",
        year: 2025
    },
    {
        id: 35,
        title: "Tổng Ôn Địa Lý Moon - Tập 2",
        description: "Bộ tài liệu tổng ôn Địa Lý Moon tập 2. Tổng hợp đầy đủ kiến thức, bài tập và phương pháp giải chi tiết giúp học sinh ôn thi THPT Quốc Gia.",
        subject: "dia",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1BDtzIf4RWjBYgBv_-dx9CiE0rcb_lVJ5?usp=drive_link",
        downloadCode: "",
        author: "Moon.vn",
        publisher: "Moon.vn",
        year: 2025
    },
    {
        id: 36,
        title: "Từ Vựng Đọc Hiểu Chuyên Sâu Môn Tiếng Anh - Cô Phạm Liễu",
        description: "Bộ tài liệu từ vựng đọc hiểu chuyên sâu môn Tiếng Anh của cô Phạm Liễu. Giúp học sinh nâng cao vốn từ vựng và kỹ năng đọc hiểu hiệu quả.",
        subject: "anh",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1RNRixqYjQZLLkKJsZLDX8rvFyBiFiOmk?usp=drive_link",
        downloadCode: "",
        author: "Phạm Liễu",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 37,
        title: "Sơ Đồ Tư Duy Lịch Sử 12 - Cô Sen",
        description: "Bộ sơ đồ tư duy Lịch Sử 12 của cô Sen. Giúp học sinh hệ thống hóa kiến thức và ghi nhớ lâu dài các sự kiện lịch sử một cách trực quan.",
        subject: "su",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1JBzrZCaVnITkAJJjHorUsWgY403-QTf9/view",
        downloadCode: "",
        author: "Cô Sen",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 38,
        title: "Hệ Thống Kiến Thức Địa Lịch Sử Cơ Bản Và Nâng Cao",
        description: "Hệ thống kiến thức Địa Lịch Sử từ cơ bản đến nâng cao. Tổng hợp đầy đủ lý thuyết và phương pháp giải bài tập giúp học sinh ôn thi hiệu quả.",
        subject: "su",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1HrB1F4UbV_-H2KZA3onOOAkKzPzHVfwU/view?usp=drivesdk",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 39,
        title: "Luyện Thi THPT Quốc Gia Năm 2026 - Môn Lịch Sử",
        description: "Bộ tài liệu luyện thi THPT Quốc Gia năm 2026 môn Lịch Sử. Bám sát cấu trúc đề thi mới nhất, có đáp án và hướng dẫn giải chi tiết.",
        subject: "su",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1Km-VnrISpEre-lbMzzOCLgl9Va-a7Pln/view?usp=sharing",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2026
    },
    {
        id: 40,
        title: "Rèn Luyện Đúng - Sai: 4 Nguyên Tắc Độc Quyền Chinh Phục Lịch Sử",
        description: "Phương pháp rèn luyện câu hỏi đúng - sai với 4 nguyên tắc độc quyền giúp chinh phục môn Lịch Sử. Kỹ thuật làm bài hiệu quả và nâng cao điểm số.",
        subject: "su",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1wme5GL-V5wzkcrMQn_FwW8gUs8X3bTub/view?usp=drivesdk",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 41,
        title: "Tổng Ôn - Luyện Thi Môn Lịch Sử Chương Trình Mới (Moon)",
        description: "Bộ tài liệu tổng ôn và luyện thi môn Lịch Sử chương trình mới của Moon. Tổng hợp đầy đủ kiến thức và bài tập giúp học sinh ôn thi THPT Quốc Gia.",
        subject: "su",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1F0zCru894tki6pJG_PBIKYFljdw4Irlu/view?usp=drive_link",
        downloadCode: "",
        author: "Moon.vn",
        publisher: "Moon.vn",
        year: 2025
    },
    {
        id: 42,
        title: "Combo Tổng Ôn Địa Lý",
        description: "Combo tổng ôn Địa Lý đầy đủ. Bao gồm lý thuyết, bài tập và đề thi thử giúp học sinh ôn tập toàn diện và đạt điểm cao trong kỳ thi.",
        subject: "dia",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1iji2quXHvuSphA7ZBq2VBzt6o8EqLfht",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 43,
        title: "Bộ 25 Đề Địa Lí Trọng Tâm 2025 - Cô Mai Anh & TS NVT",
        description: "Bộ 25 đề thi Địa Lí trọng tâm năm 2025 của cô Mai Anh và TS NVT. Đề thi bám sát cấu trúc mới nhất, có đáp án chi tiết giúp học sinh ôn luyện hiệu quả.",
        subject: "dia",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1ofkkQnDB5KanY1yrjgTq2w47FbqAU1OG",
        downloadCode: "",
        author: "Mai Anh & TS NVT",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 44,
        title: "20 Đề Địa Lí Tuyển Chọn 2026",
        description: "Bộ 20 đề thi Địa Lí tuyển chọn năm 2026. Đề thi chất lượng cao, bám sát cấu trúc mới nhất giúp học sinh rèn luyện kỹ năng làm bài.",
        subject: "dia",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1_m9ZNBURi92cw07bwKl4ytJq88v0Fnvk/view?usp=drivesdk",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2026
    },
    {
        id: 45,
        title: "30 Đề Thực Chiến Môn Địa THPTQG - Thầy Tài",
        description: "Bộ 30 đề thi thực chiến môn Địa Lý THPT Quốc Gia của thầy Tài. Đề thi bám sát cấu trúc mới nhất, có đáp án chi tiết giúp học sinh nâng cao điểm số.",
        subject: "dia",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1XgEwH3f3kQnvshSqit9i7vWpSDzvuEDy",
        downloadCode: "",
        author: "Thầy Tài",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 46,
        title: "Tổng Ôn Toàn Diện Lịch Sử + Đáp Án",
        description: "Bộ tài liệu tổng ôn toàn diện môn Lịch Sử kèm đáp án chi tiết. Giúp học sinh nắm vững kiến thức và đạt điểm cao trong kỳ thi THPT Quốc Gia.",
        subject: "su",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1JQn4EK7qEwIdM7Pu_PK1lG1Mwgjsu26x?usp=drive_link",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 47,
        title: "Sơ Đồ Tư Duy Địa Lý 12",
        description: "Bộ sơ đồ tư duy Địa Lý 12 đầy đủ. Giúp học sinh hệ thống hóa kiến thức và ghi nhớ lâu dài các khái niệm địa lý một cách trực quan.",
        subject: "dia",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://docs.google.com/document/d/1SlcZZJU2gCAq5sZy2TVrCdHFc7REmAZv/edit?usp=sharing&ouid=104017229850312200308&rtpof=true&sd=true",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 48,
        title: "Sơ Đồ Tư Duy Địa Lý 12 (Phiên Bản 2)",
        description: "Bộ sơ đồ tư duy Địa Lý 12 phiên bản 2. Giúp học sinh hệ thống hóa kiến thức và ghi nhớ lâu dài các khái niệm địa lý một cách trực quan.",
        subject: "dia",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1yMSFVSiQfHfy0dOxNiQTKivTcqPdEhfP/view?usp=sharing",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 49,
        title: "40 Đề HSG - Sinh 12 - Chương Trình Mới",
        description: "Bộ 40 đề thi học sinh giỏi Sinh học 12 chương trình mới. Phù hợp cho học sinh muốn nâng cao kiến thức và tham gia các kỳ thi HSG cấp trường, cấp sở.",
        subject: "sinh",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1ORse9h0ULrLp3GwNEqyJAL_Ra5cQJys-?usp=sharing",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 50,
        title: "Tư Duy Giải Các Bài Toán Thực Tế - Thầy Nguyễn Tiến Đạt",
        description: "Phương pháp tư duy giải các bài toán thực tế của thầy Nguyễn Tiến Đạt. Giúp học sinh nắm vững kỹ thuật và tư duy giải quyết các dạng bài toán ứng dụng thực tế.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1dFXh0Y9NsGPJ_DwhqjYs7qzG1r8aS1Uj/view?usp=sharing",
        downloadCode: "",
        author: "Nguyễn Tiến Đạt",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 51,
        title: "25 Đề Luyện Thi ĐGNL ĐHQG TP.HCM - APT",
        description: "Bộ 25 đề luyện thi Đánh giá năng lực ĐHQG TP.HCM của APT. Đề thi bám sát cấu trúc mới nhất, có đáp án chi tiết giúp học sinh chuẩn bị tốt cho kỳ thi ĐGNL.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1KjdPWdPakksbSAn6x0mgm-2GwuP6Lmyg/view",
        downloadCode: "",
        author: "APT",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 52,
        title: "Bộ Đề Thi ĐGNL Tiếng Anh - Cô Trang Anh",
        description: "Bộ đề thi Đánh giá năng lực môn Tiếng Anh của cô Trang Anh. Tài liệu chất lượng cao giúp học sinh rèn luyện kỹ năng và đạt điểm cao trong kỳ thi ĐGNL.",
        subject: "anh",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1Qpj_4GEbAll-mUAY62A4AqwR9dGrL1n6/view",
        downloadCode: "",
        author: "Trang Anh",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 53,
        title: "10 Đề Thực Chiến Kỳ Thi ĐGNL TP.HCM VACT 2025 (MapStudy)",
        description: "Bộ 10 đề thi thực chiến Đánh giá năng lực TP.HCM VACT 2025 của MapStudy. Đề thi bám sát cấu trúc mới nhất, có đáp án chi tiết giúp học sinh ôn luyện hiệu quả.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1XtD7DzAakMeHuF5rc7mgvMuiJ_QaljQQ/view",
        downloadCode: "",
        author: "MapStudy",
        publisher: "MapStudy",
        year: 2025
    },
    {
        id: 54,
        title: "10 Đề Thực Chiến Kỳ Thi ĐGNL HSA 2025 (MapStudy)",
        description: "Bộ 10 đề thi thực chiến Đánh giá năng lực HSA 2025 của MapStudy. Đề thi bám sát cấu trúc mới nhất, có đáp án chi tiết giúp học sinh chuẩn bị tốt cho kỳ thi.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1hOz2bTg6lN40rmfeUU_TVbxcqtURDd7h/view",
        downloadCode: "",
        author: "MapStudy",
        publisher: "MapStudy",
        year: 2025
    },
    {
        id: 55,
        title: "1100 Câu Trắc Nghiệm Cày Xuyên Lễ ĐGNL HCM (V-ACT) - Empire Team",
        description: "Bộ 1100 câu trắc nghiệm cày xuyên lễ ĐGNL HCM (V-ACT) của Empire Team gồm 3 môn: Tiếng Anh, Tiếng Việt, Toán Học. Tài liệu chất lượng cao giúp học sinh rèn luyện kỹ năng và đạt điểm cao.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "Tiếng Anh", url: "https://drive.google.com/file/d/1xVplrRDRLBY786dLQrY8RWxRJBelYVR-/view?usp=drivesdk" },
            { name: "Tiếng Việt", url: "https://drive.google.com/file/d/1j0fi1yrEkhW-m-p42004wo4SwFoNpnVL/view?usp=drivesdk" },
            { name: "Toán Học", url: "https://drive.google.com/file/d/1T7sVo86cfJVToAuCQhaeUv8lmzyw-mvR/view?usp=drivesdk" }
        ],
        downloadCode: "",
        author: "Empire Team",
        publisher: "Empire Team",
        year: 2025
    },
    {
        id: 56,
        title: "[V-ACT] Bộ 5 Đề Tổng Ôn Tiếng Anh (Empire Team)",
        description: "Bộ 5 đề tổng ôn Tiếng Anh cho kỳ thi V-ACT của Empire Team. Đề thi bám sát cấu trúc mới nhất, có đáp án chi tiết giúp học sinh ôn luyện hiệu quả.",
        subject: "anh",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "Đề 1", url: "https://drive.google.com/file/d/10mLDuxOC9cYEcvrc-wN2pYKiJEGbEqDW/view?usp=drivesdk" },
            { name: "Đề 2", url: "https://drive.google.com/file/d/1_xYOlOApkjFnh1fHs4XGcvboBLHui_wG/view?usp=drivesdk" },
            { name: "Đề 3", url: "https://drive.google.com/file/d/15GGrkre9hNJWeqRxtwPmLXPIWOIOJmZP/view?usp=drivesdk" },
            { name: "Đề 4", url: "https://drive.google.com/file/d/1_nw7UirfFxUH3r8rTwkSJg2Ny8hW3DgI/view?usp=drivesdk" },
            { name: "Đề 5", url: "https://drive.google.com/file/d/1gFDVYdudUnRJOYPhowpVPd6p0imamsc4/view?usp=drivesdk" }
        ],
        downloadCode: "",
        author: "Empire Team",
        publisher: "Empire Team",
        year: 2025
    },
    {
        id: 57,
        title: "[V-ACT] Lịch Sử - Cô Sen",
        description: "Bộ tài liệu luyện thi V-ACT môn Lịch Sử của cô Sen. Tài liệu chất lượng cao giúp học sinh chuẩn bị tốt cho kỳ thi Đánh giá năng lực ĐHQG TP.HCM.",
        subject: "su",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/15jOC3mEjEJwJ6UBDJAOmzzrLI8nWto-x",
        downloadCode: "",
        author: "Cô Sen",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 58,
        title: "Bộ 20 Đề Thi ĐGNL - HCMUE",
        description: "Bộ 20 đề thi Đánh giá năng lực do Đại học Sư phạm TP.HCM (HCMUE) biên soạn. Đề thi chất lượng cao, bám sát cấu trúc mới nhất giúp học sinh chuẩn bị tốt cho kỳ thi.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/13xKgef4qGVEL3mt_Pagy1bmbq6mVZfjt",
        downloadCode: "",
        author: "HCMUE",
        publisher: "Đại học Sư phạm TP.HCM",
        year: 2025
    },
    {
        id: 59,
        title: "Khóa CASIO - Thầy Nguyễn Tiến Đạt",
        description: "Khóa học CASIO toàn diện của thầy Nguyễn Tiến Đạt gồm 5 chủ đề: Hàm số, Mũ và Logarit, Số phức, Nguyên hàm, Hình học không gian. Giúp học sinh sử dụng máy tính CASIO hiệu quả trong giải toán.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "Hàm số", url: "https://drive.google.com/drive/mobile/folders/1bvM-Tv9oWvxJaKpbihNxTx8qXSWB9YCO" },
            { name: "Mũ và Logarit", url: "https://drive.google.com/drive/mobile/folders/1S4qTkF3NmXmL-qInSnS4hy0eD8LN2JEm" },
            { name: "Số phức", url: "https://drive.google.com/drive/mobile/folders/1fmnIBiXfPgV_dJwaeBG-GYhaHjP5bocz" },
            { name: "Nguyên hàm", url: "https://drive.google.com/drive/mobile/folders/1YOcY-9SpWkgS6bpMSPKzzd4L3Bdvq0YO" },
            { name: "Hình học không gian", url: "https://drive.google.com/drive/mobile/folders/1p2PLOTaL5AvSuOjtkjblf5OK1J8B8cXn" }
        ],
        downloadCode: "",
        author: "Nguyễn Tiến Đạt",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 60,
        title: "Bộ Kỹ Thuật Kinh Điển CASIO Từ A-Z",
        description: "Bộ tài liệu kỹ thuật kinh điển sử dụng máy tính CASIO từ A-Z. Hướng dẫn chi tiết các thao tác và kỹ thuật giải toán nhanh bằng CASIO.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/16KDSmoNzTT1xZXDXHP-pd6x5TskjLqvz/view",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 61,
        title: "Mẹo Trả Lời Ngắn Toán",
        description: "Bộ tài liệu mẹo và kỹ thuật giải nhanh các câu hỏi trả lời ngắn môn Toán. Giúp học sinh tiết kiệm thời gian và đạt điểm cao trong kỳ thi.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/mobile/folders/1ibtAObXMNBteKb-dgN-1rBk3u7Yn496R",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 62,
        title: "Mẹo Đúng Sai 9+ Toán",
        description: "Bộ tài liệu mẹo và kỹ thuật giải nhanh các câu hỏi đúng sai môn Toán để đạt điểm 9+. Phương pháp hiệu quả giúp học sinh nâng cao điểm số.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/mobile/folders/1xrbgVBJ39rDN7-8532E99gdRR_5GAWB9?usp=sharing",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 63,
        title: "Tài Liệu 9+ Ngữ Văn",
        description: "Bộ tài liệu đạt điểm 9+ môn Ngữ Văn. Tổng hợp kiến thức, phương pháp làm bài và kỹ năng viết văn hiệu quả.",
        subject: "van",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "Tài liệu 1", url: "https://drive.google.com/file/d/1Ld6INdyDVy1pwqBNX_kyFY9XQibS4q7p/view" },
            { name: "Tài liệu 2", url: "https://drive.google.com/file/d/14DzZc4l91vrgwJYhXxbCuBIOfJ7dvDhy/view" },
            { name: "Tài liệu 3", url: "https://drive.google.com/file/d/1mhKq-ONiI0nZks90lMbGRC4FHliEwH_q/view" }
        ],
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 64,
        title: "Full Đúng/Sai Địa Lý",
        description: "Bộ tài liệu đầy đủ các câu hỏi đúng/sai môn Địa Lý. Giúp học sinh rèn luyện kỹ năng làm bài và nắm vững kiến thức.",
        subject: "dia",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1md88-2lJzSPF1rGakkuJgi9on10spbDN/view",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 65,
        title: "Sơ Đồ Tư Duy Lịch Sử",
        description: "Bộ sơ đồ tư duy Lịch Sử đầy đủ. Giúp học sinh hệ thống hóa kiến thức và ghi nhớ lâu dài các sự kiện lịch sử.",
        subject: "su",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "Sơ đồ 1", url: "https://drive.google.com/file/d/1zeOfz_zLJCp3rOQh-FcwnP4YpjaAIhm2/view" },
            { name: "Sơ đồ 2", url: "https://drive.google.com/file/d/1fGjrCyD8loGoAXQtq4FNErYXIb1uzLJB/view?usp=sharing" }
        ],
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 66,
        title: "Tài Liệu Tổng Hợp Hóa Học",
        description: "Bộ tài liệu tổng hợp môn Hóa Học. Bao gồm lý thuyết, bài tập và phương pháp giải chi tiết giúp học sinh ôn thi hiệu quả.",
        subject: "hoa",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1p0kzeVWJznDfkMdlWTf9zdIWGA3OkOHG/view",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 67,
        title: "Tài Liệu Tổng Hợp Tiếng Anh",
        description: "Bộ tài liệu tổng hợp môn Tiếng Anh. Bao gồm từ vựng, ngữ pháp và kỹ năng làm bài thi hiệu quả.",
        subject: "anh",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "Tài liệu 1", url: "https://drive.google.com/file/d/1BJbUdejhTGlL48CTuRbl74OgSc1nyYqQ/view" },
            { name: "Tài liệu 2", url: "https://drive.google.com/file/d/1OGRraXQffj_2kXoagveAKjrNsuc9y6uB/view" }
        ],
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 68,
        title: "Tài Liệu Tổng Hợp Sinh Học",
        description: "Bộ tài liệu tổng hợp môn Sinh Học. Bao gồm lý thuyết, bài tập và phương pháp giải chi tiết giúp học sinh ôn thi hiệu quả.",
        subject: "sinh",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1KtOCZpb5tKUNwn5q-zhT0-FFzKA39q60/view",
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 69,
        title: "Đáp Án Sách Tổng Ôn Địa Lý Moon 2025 - Tập 1",
        description: "Đáp án chi tiết cho sách Tổng Ôn Địa Lý Moon 2025 tập 1. Giúp học sinh tự kiểm tra và đối chiếu kết quả khi làm bài tập.",
        subject: "dia",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://hsa.bk25nkc.com/study/moon2025/tong-on-dia-ly-tap-1/",
        downloadCode: "",
        author: "Moon.vn",
        publisher: "Moon.vn",
        year: 2025
    },
    {
        id: 70,
        title: "30 Đề Trắc Nghiệm Đúng Sai, Trắc Nghiệm Trả Lời Ngắn - Hóa 2026 - Phạm Thắng",
        description: "Bộ 30 đề trắc nghiệm đúng sai và trả lời ngắn môn Hóa học năm 2026 của thầy Phạm Thắng. Bám sát cấu trúc đề thi mới nhất, có đáp án chi tiết giúp học sinh rèn luyện kỹ năng làm bài.",
        subject: "hoa",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1kvfnUhhJCNjMACkKFKbSSfr_HikzsEO4/view?usp=sharing",
        downloadCode: "",
        author: "Phạm Thắng",
        publisher: "EduPass",
        year: 2026
    },
    {
        id: 71,
        title: "Ôn Thi Toàn Diện Sinh Học 12 - Cô Trà My",
        description: "Bộ tài liệu ôn thi toàn diện Sinh Học 12 của cô Trà My gồm 2 tập. Tổng hợp đầy đủ kiến thức, bài tập và phương pháp giải chi tiết giúp học sinh ôn thi THPT Quốc Gia hiệu quả.",
        subject: "sinh",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "Tập 1", url: "https://drive.google.com/file/d/1aBxBBHBDE7b_60SWyng3fd_uTRSqq6au/view?usp=sharing" },
            { name: "Tập 2", url: "https://drive.google.com/file/d/1jOdtoBU_MNu5wKZnUFrBSx_qMvPW1SxK/view?usp=sharing" }
        ],
        downloadCode: "",
        author: "Cô Trà My",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 72,
        title: "Tổng Hợp Tài Liệu Tiếng Anh Cô Mai Phương 2026",
        description: "Bộ tài liệu Tiếng Anh toàn diện của cô Mai Phương năm 2026 gồm 9 phần: 159 Cấu trúc, 300+ Từ vựng trọng điểm, Collocation, Từ vựng nâng cao C1-C2, Đọc hiểu theo chủ đề. Bám sát đề thi THPT & ĐGNL 2026.",
        subject: "anh",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "159 Cấu trúc dễ xuất hiện", url: "https://drive.google.com/open?id=1ymtmhB2Mer2ODjHMxtuPpN0nYIEp97bw&usp=drive_copy" },
            { name: "300+ Từ vựng trọng điểm", url: "https://drive.google.com/open?id=1LFKdWb3pDS1y56josQjBaWiJYjy2WEUT&usp=drive_copy" },
            { name: "Cấu trúc Tiếng Anh 2026", url: "https://drive.google.com/open?id=1JAWFcKqOwz9b2yQrj_4Jvo7_e56O6ztM&usp=drive_copy" },
            { name: "Từ vựng nâng cao C1-C2 & Cấu trúc", url: "https://drive.google.com/open?id=1K5cNxU5HYw7Gi6o0h0PefyYnx5-YosBC&usp=drive_copy" },
            { name: "Collocation quan trọng", url: "https://drive.google.com/open?id=17RV9YBmdYqC2uA21NMmGvXIA0Q13K_me&usp=drive_copy" },
            { name: "Đọc hiểu - Job Hugging", url: "https://drive.google.com/open?id=15Pjk1AB-rJo2adlkDQcv7TP9CO8Sv5B8&usp=drive_copy" },
            { name: "Mở rộng từ vựng và cấu trúc", url: "https://drive.google.com/open?id=1S2GOKPaquEiy9DoLiXTrACpimadg7ybh&usp=drive_copy" },
            { name: "Từ vựng C1-C2 (P1+P2)", url: "https://drive.google.com/open?id=1vk2isH4upYpiBGEFmdAM1z2ucPlle9W-&usp=drive_copy" },
            { name: "Từ vựng trọng điểm mới nhất", url: "https://drive.google.com/open?id=1dMYwZvq8P-aQATfaPlFH5OJCu5M7XFHY&usp=drive_copy" }
        ],
        downloadCode: "",
        author: "Cô Mai Phương",
        publisher: "EduPass",
        year: 2026
    },
    {
        id: 73,
        title: "20 Đề ĐGNL HSA - Tập 1 & 2",
        description: "Bộ 20 đề thi Đánh giá năng lực HSA (Đại học Sư phạm Hà Nội) gồm 2 tập. Đề thi bám sát cấu trúc mới nhất, có đáp án chi tiết giúp học sinh chuẩn bị tốt cho kỳ thi ĐGNL.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "Tập 1", url: "https://drive.google.com/file/d/1uCfHb423pxffnHr0XaMy3u8ngql_JScY/view" },
            { name: "Tập 2", url: "https://drive.google.com/file/d/1EUSyyh8E6DLGYYI_6DDfBd00GF9otW3B/view" }
        ],
        downloadCode: "",
        author: "EduPass",
        publisher: "EduPass",
        year: 2025
    },
    {
        id: 74,
        title: "Bộ Đề Thực Chiến ĐGNL HSA - Empire Team",
        description: "Bộ đề thực chiến Đánh giá năng lực HSA của Empire Team gồm: 15 đề thực chiến, Bộ đề chuẩn cấu trúc mới 2026, 10 đề thực chiến PDF kèm đáp án chi tiết. Tài liệu chất lượng cao giúp học sinh rèn luyện hiệu quả.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "15 đề thực chiến", url: "https://drive.google.com/drive/folders/1vKShseABYnVEuooQJ_2zzg2H_suIlaI3" },
            { name: "Đề chuẩn cấu trúc mới 2026", url: "https://drive.google.com/drive/folders/1DyZnNanIN6kz82liJcSJ_kJRbUoD24ZP" },
            { name: "10 đề thực chiến PDF", url: "https://drive.google.com/file/d/1Q_Wq9HEqvPt3MMTPAB9hhrf644mAi9oa/view" },
            { name: "Đáp án 10 đề", url: "https://drive.google.com/drive/folders/1G028GRDcujcQzRhEqdhrwYDsQFceMXeE" }
        ],
        downloadCode: "",
        author: "Empire Team",
        publisher: "Empire Team",
        year: 2026
    },
    {
        id: 75,
        title: "Tài Liệu Ôn ĐGNL ĐHSP Hà Nội - 7 Môn",
        description: "Bộ tài liệu ôn thi Đánh giá năng lực ĐHSP Hà Nội đầy đủ 7 môn: Toán, Tiếng Anh, Ngữ Văn, Lịch Sử, Hóa Học, Địa Lý, Vật Lý. Tài liệu chất lượng cao, bám sát cấu trúc đề thi giúp học sinh chuẩn bị tốt cho kỳ thi ĐGNL.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "Toán", url: "https://drive.google.com/file/d/1gU-Nxg2Z6cF-rfM03KypK1hx0Y4fnDfG/view?usp=sharing" },
            { name: "Tiếng Anh", url: "https://drive.google.com/file/d/1uv9lrEn5BeRMKczsST4e04NJe8okCkYz/view?usp=sharing" },
            { name: "Ngữ Văn", url: "https://drive.google.com/file/d/1j46p5l1s6XqSMiUGRpX36nqhKBZqhncr/view?usp=sharing" },
            { name: "Lịch Sử", url: "https://drive.google.com/file/d/11myRMmQffZGPzjg0nZzcQTtJrypJ3tNQ/view?usp=sharing" },
            { name: "Hóa Học", url: "https://drive.google.com/file/d/1U3W4lSFrvxR_E6XvZ1hzyCX6r4gTFFVC/view?usp=sharing" },
            { name: "Địa Lý", url: "https://drive.google.com/file/d/1kZUQ6Xa_LQyeAxeueSP9eES_DT3iy1Xd/view?usp=sharing" },
            { name: "Vật Lý", url: "https://drive.google.com/file/d/1lA5FJJI64gxEMtbEfGJWVjFV9MnfirNe/view?usp=sharing" }
        ],
        downloadCode: "",
        author: "ĐHSP Hà Nội",
        publisher: "ĐHSP Hà Nội",
        year: 2025
    },
    {
        id: 76,
        title: "Đề Minh Họa & Đề Thi ĐHSP Hà Nội 2025 - Tất Cả Các Môn",
        description: "Bộ đề minh họa và đề thi ĐHSP Hà Nội 2025 đầy đủ 8 môn kèm đáp án chi tiết: Toán, Văn, Anh, Lý, Hóa, Sinh, Địa, Sử. Giúp học sinh làm quen với cấu trúc đề thi và rèn luyện kỹ năng làm bài hiệu quả.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "Đề Minh Họa SPT 2025", url: "https://drive.google.com/drive/folders/1sQ_si-TClrthWWUwXeryBSA79fRWHz9d?usp=sharing" },
            { name: "Toán", url: "https://drive.google.com/file/d/1Q6530_bE2v6yIey42X7Pem02dnHt9DAx/view" },
            { name: "Văn", url: "https://drive.google.com/file/d/1TAfAovZ1mFnitCWA2EBGfBww7i4uTvm5/view" },
            { name: "Anh", url: "https://drive.google.com/file/d/1DvmdVqnA1hlK0MUuSCUDi_pQd_IVm_Fl/view" },
            { name: "Lý", url: "https://drive.google.com/file/d/13z8Qo7lgWJ2nzWHemyTmI4Fnxo0FsC5n/view" },
            { name: "Hóa", url: "https://drive.google.com/file/d/1dJsuoPaGcr9wOoGIFuNmgewUfv8RRNn7/view" },
            { name: "Sinh", url: "https://drive.google.com/file/d/1du5-RdGm8xgbRdN8HmDKdRKtedx5qu-4/view" },
            { name: "Địa", url: "https://drive.google.com/file/d/16Nmx2wFAR5jN0kuvIYp8JGaSkUFCpey3/view" },
            { name: "Sử", url: "https://drive.google.com/file/d/13H3KCz5kjWURTWzYY1IyxLno5ey_uOkU/view" }
        ],
        downloadCode: "",
        author: "ĐHSP Hà Nội",
        publisher: "ĐHSP Hà Nội",
        year: 2025
    },
    {
        id: 77,
        title: "Ebook Phong Toả Vật Lý 12 - Thầy Vũ Ngọc Anh (MapStudy)",
        description: "Bộ Ebook Phong Toả Vật Lý 12 của thầy Vũ Ngọc Anh - MapStudy gồm 3 chuyên đề: Vật Lý Nhiệt, Khí Lý Tưởng, Từ Trường. Tài liệu chất lượng cao, phương pháp giải chi tiết giúp học sinh 2K8 chinh phục Vật Lý 12.",
        subject: "ly",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "Vật Lý Nhiệt 2026", url: "https://drive.google.com/file/d/1pFGu2vV9NAKKEVXvo39HiwHdLM4xXNF_/view?usp=sharing" },
            { name: "Khí Lý Tưởng 2026", url: "https://drive.google.com/file/d/1yHVEyPOF461mFosO__aawYfFcF-eghDK/view?usp=sharing" },
            { name: "Từ Trường", url: "https://drive.google.com/file/d/1jag3tBfNEmDBCsNpAVSQGuXOhp1Uqf5b/view?usp=sharing" },
            { name: "Khí Lý Tưởng & Từ Trường 2026", url: "https://drive.google.com/file/d/1AS5C3zmzUz3ezxKUDYBb9BPTZ318djmM/view" }
        ],
        downloadCode: "",
        author: "Vũ Ngọc Anh",
        publisher: "MapStudy",
        year: 2026
    },
    {
        id: 78,
        title: "Combo Sách Lập Trình Tư Duy Vật Lý 12 - Thầy Vũ Ngọc Anh",
        description: "Bộ sách Lập Trình Tư Duy Vật Lý 12 của thầy Vũ Ngọc Anh gồm 3 chuyên đề: Vật Lý Nhiệt, Khí Lý Tưởng, Từ Trường & Hạt Nhân. Phương pháp lập trình tư duy độc đáo giúp học sinh giải quyết bài toán Vật Lý một cách logic và hiệu quả.",
        subject: "ly",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "Vật Lý Nhiệt", url: "https://tailieuonthi.edu.vn/lap-trinh-tu-duy-vat-ly-nhiet-pdf-thay-vu-ngoc-anh/" },
            { name: "Khí Lý Tưởng", url: "https://tailieuonthi.edu.vn/lap-trinh-tu-duy-khi-li-tuong-pdf/" },
            { name: "Từ Trường & Hạt Nhân", url: "https://tailieuonthi.edu.vn/lap-trinh-tu-duy-tu-truong-hat-nhan-pdf/" }
        ],
        downloadCode: "",
        author: "Vũ Ngọc Anh",
        publisher: "Tài Liệu Ôn Thi",
        year: 2026
    },
    {
        id: 79,
        title: "Bộ Sách Lộ Trình Step Toán 12 - Cô Ngọc Huyền 2K8",
        description: "Bộ sách Lộ Trình Step Toán 12 của cô Ngọc Huyền dành cho 2K8 gồm 3 bước: Step 1 Nền Tảng, Step 2 Vận Dụng, Tư Duy Toán 12. Lộ trình học tập khoa học từ cơ bản đến nâng cao giúp học sinh chinh phục Toán 12 hiệu quả.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "multiple",
        multipleLinks: [
            { name: "Step 1 - Nền Tảng Toán 12", url: "https://drive.google.com/file/d/1lwk1_QRY61P-DRHOa5pLN1iqeEoJXsMy/view?usp=drivesdk" },
            { name: "Step 2 - Vận Dụng Toán 12", url: "https://drive.google.com/file/d/1dM40RJAgGDa6e7aSyIkHvKpFk07vO-ak/view?usp=drivesdk" },
            { name: "Tư Duy Toán 12", url: "https://drive.google.com/file/d/1B0fRM0YESd9dNvRobhRMvC26xY69GEZ6/view?usp=drivesdk" }
        ],
        downloadCode: "",
        author: "Ngọc Huyền",
        publisher: "EduPass",
        year: 2026
    },
    {
        id: 80,
        title: "Tổng Hợp Tài Liệu Ôn Thi HSA - Google Sheets",
        description: "Bảng tổng hợp đầy đủ tất cả tài liệu ôn thi Đánh giá năng lực HSA (Đại học Sư phạm Hà Nội) trên Google Sheets. Bao gồm đề thi, tài liệu ôn tập, sách tham khảo cho tất cả các môn. Cập nhật liên tục, dễ dàng tra cứu và tải về.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://docs.google.com/spreadsheets/d/1DIPYwjlI0xaQ6ER_f0RbySMky8ksP4gg/edit?fbclid=IwY2xjawQPmm5leHRuA2FlbQIxMQBzcnRjBmFwcF9pZAEwAAEe4kNQknO7tGU-rK7DurEQWZaUA9WOgXiKXdBfN3XJkCTAvrg85-YgiNAx03g_aem_Z5l4W5YUQsyfJmsicLbubw&gid=685427057#gid=685427057",
        downloadCode: "",
        author: "Cộng đồng HSA",
        publisher: "Google Sheets",
        year: 2026
    },
    {
        id: 81,
        title: "Trọn Bộ Đề V-ACT Qua Các Năm",
        description: "Bộ sưu tập đầy đủ các đề thi V-ACT (Đánh giá năng lực ĐHQG TP.HCM) qua các năm. Tài liệu PDF chất lượng cao giúp học sinh làm quen với cấu trúc đề thi thật, rèn luyện kỹ năng làm bài và nâng cao khả năng đạt điểm cao trong kỳ thi ĐGNL.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/1qSy3Mnh0AvWIqF4Uceb13rvyEWUeBJf_/view?usp=drivesdk",
        downloadCode: "",
        author: "ĐHQG TP.HCM",
        publisher: "EduPass",
        year: 2026
    },
    {
        id: 82,
        title: "Bộ Đề Thực Chiến V-ACT Chuẩn 2026 - Empire Team",
        description: "Bộ đề thực chiến V-ACT chuẩn cấu trúc mới 2026 của Empire Team. Đề thi bám sát cấu trúc đề thi ĐGNL ĐHQG TP.HCM mới nhất, có đáp án chi tiết giúp học sinh rèn luyện kỹ năng làm bài và đạt điểm cao trong kỳ thi.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/file/d/19Ot-0Yc0xgTZOEb1otzXeoK8WvBSCweU/view?usp=drivesdk",
        downloadCode: "",
        author: "Empire Team",
        publisher: "Empire Team",
        year: 2026
    },
    {
        id: 83,
        title: "10 Đề Chuẩn Cấu Trúc V-ACT 2026 - Empire Team",
        description: "Bộ 10 đề thi chuẩn cấu trúc V-ACT 2026 của Empire Team. Đề thi được biên soạn bám sát cấu trúc đề thi ĐGNL ĐHQG TP.HCM mới nhất, giúp học sinh làm quen với format đề thi và rèn luyện kỹ năng làm bài hiệu quả.",
        subject: "toan",
        grade: "12",
        price: 0,
        image: "assets/logo3.png",
        downloadLink: "https://drive.google.com/drive/folders/1-X9269L-8zqHdQThlkfM6lJ9uLO3mx5N?usp=sharing",
        downloadCode: "",
        author: "Empire Team",
        publisher: "Empire Team",
        year: 2026
    }
];

const subjects = [
    { id: "toan", name: "Toán" },
    { id: "ly", name: "Vật Lý" },
    { id: "hoa", name: "Hóa" },
    { id: "van", name: "Ngữ Văn" },
    { id: "su", name: "Lịch Sử" },
    { id: "dia", name: "Địa Lí" },
    { id: "sinh", name: "Sinh học" },
    { id: "anh", name: "Tiếng Anh" },
    { id: "gdcd", name: "Giáo dục công dân" },
    { id: "ktpl", name: "Kinh tế & Pháp luật" },
    { id: "congnghe", name: "Công nghệ" },
    { id: "tinhoc", name: "Tin học" }
];

const exams = {};

const sampleQuestions = [];

let currentSubject = null;
let currentExam = null;
let startTime = null;
let timerInterval = null;

// Trang tài liệu
if (document.getElementById('materialsGrid')) {
    displayMaterials(materials, 'materialsGrid');
    
    // Tìm kiếm và lọc
    document.getElementById('searchInput').addEventListener('input', filterMaterials);
    document.getElementById('subjectFilter').addEventListener('change', filterMaterials);
    document.getElementById('gradeFilter').addEventListener('change', filterMaterials);
    document.getElementById('priceFilter').addEventListener('change', filterMaterials);
}

function displayMaterials(items, containerId) {
    const container = document.getElementById(containerId);
    
    if (items.length === 0) {
        container.innerHTML = '<p class="empty-message">Chưa có tài liệu nào. Vui lòng quay lại sau!</p>';
        return;
    }
    
    // Sắp xếp: tài liệu trả phí lên đầu, miễn phí xuống dưới
    const sortedItems = [...items].sort((a, b) => {
        if (a.price > 0 && b.price === 0) return -1; // a trả phí, b miễn phí -> a lên trước
        if (a.price === 0 && b.price > 0) return 1;  // a miễn phí, b trả phí -> b lên trước
        return 0; // giữ nguyên thứ tự nếu cùng loại
    });
    
    container.innerHTML = sortedItems.map(material => `
        <div class="material-card">
            <div class="material-badge ${material.price === 0 ? 'badge-free' : 'badge-paid'}">
                ${material.price === 0 ? '🎁 Miễn phí' : '💎 Trả phí'}
            </div>
            <img src="${material.image}" alt="${material.title}">
            <div class="material-card-content">
                <h3>${material.title}</h3>
                <p>${material.description}</p>
                <div class="material-price">
                    ${material.price === 0 ? 'Miễn phí' : material.price.toLocaleString('vi-VN') + 'đ'}
                </div>
                <div class="material-actions">
                    <button class="btn-secondary" onclick="previewMaterial(${material.id})">Xem trước</button>
                    <button class="btn-primary" onclick="downloadMaterial(${material.id})">
                        ${material.price === 0 ? 'Tải về' : 'Mua ngay'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterMaterials() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const subject = document.getElementById('subjectFilter').value;
    const price = document.getElementById('priceFilter').value;
    
    const filtered = materials.filter(m => {
        const matchSearch = m.title.toLowerCase().includes(search) || m.description.toLowerCase().includes(search);
        const matchSubject = !subject || m.subject === subject;
        const matchPrice = !price || (price === 'free' && m.price === 0) || (price === 'paid' && m.price > 0);
        
        return matchSearch && matchSubject && matchPrice;
    });
    
    displayMaterials(filtered, 'materialsGrid');
}

function getSubjectName(id) {
    const subject = subjects.find(s => s.id === id);
    return subject ? subject.name : id;
}

function previewMaterial(id) {
    const material = materials.find(m => m.id === id);
    if (!material) {
        alert('Không tìm thấy tài liệu!');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'preview-modal';
    modal.innerHTML = `
        <div class="preview-modal-content">
            <span class="close-modal" onclick="closePreviewModal()">&times;</span>
            <h2>Xem trước tài liệu</h2>
            <div class="preview-info">
                <div class="preview-image">
                    <img src="${material.image}" alt="${material.title}">
                </div>
                <div class="preview-details">
                    <h3>${material.title}</h3>
                    <p class="preview-description">${material.description}</p>
                    <div class="preview-meta">
                        <p class="preview-price"><strong>� Giá:</strong> ${material.price === 0 ? 'Miễn phí' : material.price.toLocaleString('vi-VN') + 'đ'}</p>
                    </div>
                    <button class="btn-primary" onclick="closePreviewModal(); downloadMaterial(${material.id})">
                        ${material.price === 0 ? '📥 Tải về ngay' : '🛒 Mua ngay'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function closePreviewModal() {
    const modal = document.querySelector('.preview-modal');
    if (modal) {
        modal.remove();
    }
}

function downloadMaterial(id) {
    const material = materials.find(m => m.id === id);
    
    // Check if material has multiple links
    if (material.downloadLink === 'multiple' && material.multipleLinks) {
        showMultipleLinksModal(material);
        return;
    }
    
    if (material.price === 0) {
        // Tài liệu miễn phí - mở trực tiếp link Google Drive
        window.open(material.downloadLink, '_blank');
    } else {
        showPaymentModal(material);
    }
}

function showPaymentModal(material) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="payment-modal-content">
            <span class="close-modal" onclick="closePaymentModal()">&times;</span>
            <h2>Thanh toán tài liệu</h2>
            <div class="payment-info">
                <h3>${material.title}</h3>
                <p class="payment-price">Giá: ${material.price.toLocaleString('vi-VN')}đ</p>
            </div>
            
            <div class="payment-qr">
                <h3>Quét mã QR để thanh toán</h3>
                <img src="ck.jpg" 
                     alt="QR Code Thanh Toán" class="qr-code">
                <p class="bank-info">
                    <strong>Quét mã QR bên trên để thanh toán</strong><br>
                    <strong>Nội dung chuyển khoản:</strong> EDUPASS${material.id}
                </p>
            </div>
            
            <div class="payment-instructions">
                <h3>Hướng dẫn thanh toán:</h3>
                <ol>
                    <li>Quét mã QR bên trên để thanh toán</li>
                    <li>Nhập nội dung chuyển khoản: <strong>EDUPASS${material.id}</strong></li>
                    <li>Chụp màn hình xác nhận chuyển tiền thành công</li>
                    <li>Nhắn tin Zalo kèm ảnh chụp màn hình đến: <strong class="zalo-link">0348908243</strong></li>
                    <li>Nhận mã tải tài liệu từ admin (trong vòng 5-10 phút)</li>
                </ol>
                <a href="https://zalo.me/0348908243" target="_blank" class="btn-primary btn-zalo">
                    💬 Nhắn tin Zalo ngay
                </a>
            </div>
            
            <div class="payment-code-section">
                <h3>Đã có mã tải tài liệu?</h3>
                <input type="text" id="downloadCode" placeholder="Nhập mã tải tài liệu">
                <button class="btn-primary" onclick="verifyDownloadCode(${material.id})">Xác nhận & Tải về</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function closePaymentModal() {
    const modal = document.querySelector('.payment-modal');
    if (modal) {
        modal.remove();
    }
}

function showMultipleLinksModal(material) {
    const modal = document.createElement('div');
    modal.className = 'multiple-links-modal';
    modal.innerHTML = `
        <div class="multiple-links-modal-content">
            <span class="close-modal" onclick="closeMultipleLinksModal()">&times;</span>
            <h2>📚 ${material.title}</h2>
            <p class="modal-description">${material.description}</p>
            <div class="links-grid">
                ${material.multipleLinks.map(link => `
                    <a href="${link.url}" target="_blank" class="link-card">
                        <div class="link-icon">📄</div>
                        <div class="link-name">${link.name}</div>
                        <div class="link-action">Tải về →</div>
                    </a>
                `).join('')}
            </div>
            <div class="modal-footer-note">
                💡 Nhấn vào đề bạn muốn tải để mở Google Drive
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function closeMultipleLinksModal() {
    const modal = document.querySelector('.multiple-links-modal');
    if (modal) {
        modal.remove();
    }
}

function verifyDownloadCode(materialId) {
    const code = document.getElementById('downloadCode').value.trim();
    
    if (!code) {
        alert('Vui lòng nhập mã tải tài liệu!');
        return;
    }
    
    // Find the material
    const material = materials.find(m => m.id === materialId);
    
    if (!material) {
        alert('Không tìm thấy tài liệu!');
        return;
    }
    
    // Verify the download code
    if (code === material.downloadCode) {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('loggedIn');
        
        if (!isLoggedIn) {
            alert('⚠️ Bạn cần đăng nhập để lưu tài liệu vào tài khoản!\n\nTài liệu vẫn sẽ được tải về, nhưng không lưu vào lịch sử.');
        } else {
            // Save purchase to account data
            let accountData = JSON.parse(localStorage.getItem('accountData') || '{}');
            
            // Initialize purchasedMaterials if not exists
            if (!accountData.purchasedMaterials) {
                accountData.purchasedMaterials = [];
            }
            
            // Check if already purchased
            const alreadyPurchased = accountData.purchasedMaterials.some(
                item => item.id === material.id
            );
            
            if (!alreadyPurchased) {
                // Add to purchased materials
                accountData.purchasedMaterials.push({
                    id: material.id,
                    title: material.title,
                    subject: getSubjectName(material.subject),
                    price: material.price,
                    date: new Date().toLocaleString('vi-VN'),
                    downloadCode: code
                });
                
                // Save to localStorage
                localStorage.setItem('accountData', JSON.stringify(accountData));
                
                console.log('✅ Đã lưu tài liệu vào tài khoản:', accountData.purchasedMaterials);
            } else {
                console.log('ℹ️ Tài liệu đã có trong tài khoản');
            }
        }
        
        alert('✅ Mã hợp lệ! Đang tải tài liệu...' + (isLoggedIn ? '\n\n📚 Tài liệu đã được lưu vào tài khoản của bạn!' : ''));
        closePaymentModal();
        
        // Open the download link
        setTimeout(() => {
            window.open(material.downloadLink, '_blank');
            if (isLoggedIn) {
                alert('✅ Tải tài liệu thành công!\n\n💡 Bạn có thể xem lại tài liệu trong trang Tài khoản.');
            } else {
                alert('✅ Tải tài liệu thành công!');
            }
        }, 500);
    } else {
        alert('❌ Mã không hợp lệ! Vui lòng kiểm tra lại hoặc liên hệ Zalo: 0348908243');
    }
}

// Đóng modal khi click bên ngoài
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('payment-modal')) {
        closePaymentModal();
    }
    if (e.target.classList.contains('multiple-links-modal')) {
        closeMultipleLinksModal();
    }
});

// Trang luyện thi
if (document.querySelector('.exam-section')) {
    displaySubjects();
}

function displaySubjects() {
    const container = document.querySelector('.subjects-grid');
    if (!container) return;
    
    // Icon và màu cho từng môn học
    const subjectData = {
        'toan': { icon: '🔢', color: '#667eea', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        'ly': { icon: '⚛️', color: '#f093fb', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        'hoa': { icon: '🧪', color: '#4facfe', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        'van': { icon: '📖', color: '#43e97b', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
        'su': { icon: '🏛️', color: '#fa709a', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
        'dia': { icon: '🌍', color: '#30cfd0', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
        'sinh': { icon: '🧬', color: '#a8edea', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
        'anh': { icon: '🇬🇧', color: '#ff6b6b', gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)' },
        'gdcd': { icon: '⚖️', color: '#fbc2eb', gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' },
        'ktpl': { icon: '💼', color: '#fdcbf1', gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)' },
        'congnghe': { icon: '⚙️', color: '#a1c4fd', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
        'tinhoc': { icon: '💻', color: '#ffecd2', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }
    };
    
    container.innerHTML = subjects.map(subject => {
        const data = subjectData[subject.id] || { icon: '📚', color: '#667eea', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' };
        return `
            <div class="subject-card-pro" onclick="selectSubject('${subject.id}')" style="--card-gradient: ${data.gradient}">
                <div class="card-background"></div>
                <div class="card-content">
                    <div class="subject-icon-pro">${data.icon}</div>
                    <div class="subject-name-pro">${subject.name}</div>
                    <div class="card-shine"></div>
                </div>
                <div class="card-hover-effect"></div>
            </div>
        `;
    }).join('');
}

function selectSubject(subjectId) {
    currentSubject = subjectId;
    document.getElementById('subjectList').style.display = 'none';
    document.getElementById('examList').style.display = 'block';
    
    const subjectExams = exams[subjectId] || [];
    const container = document.querySelector('.exams-grid');
    
    if (subjectExams.length === 0) {
        container.innerHTML = '<p class="empty-message">Chưa có đề thi nào cho môn học này. Vui lòng quay lại sau!</p>';
        return;
    }
    
    container.innerHTML = subjectExams.map(exam => `
        <div class="exam-card" onclick="startExam(${exam.id})">
            <h3>${exam.title}</h3>
            <p>Số câu: ${exam.questions} | Thời gian: ${exam.time} phút</p>
        </div>
    `).join('');
}

function backToSubjects() {
    document.getElementById('examList').style.display = 'none';
    document.getElementById('subjectList').style.display = 'block';
    currentSubject = null;
}

function startExam(examId) {
    currentExam = examId;
    document.getElementById('examList').style.display = 'none';
    document.getElementById('examTest').style.display = 'block';
    
    document.getElementById('examTitle').textContent = 'Đề thi số ' + examId;
    
    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = sampleQuestions.map((q, index) => `
        <div class="question">
            <h3>Câu ${index + 1}: ${q.question}</h3>
            <div class="options">
                ${q.options.map((opt, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${i}">
                        ${opt}
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    startTime = Date.now();
    startTimer();
    
    document.getElementById('examForm').onsubmit = submitExam;
}

function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        document.getElementById('timer').textContent = 
            `Thời gian: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function submitExam(e) {
    e.preventDefault();
    clearInterval(timerInterval);
    
    let correct = 0;
    const answers = [];
    
    sampleQuestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const userAnswer = selected ? parseInt(selected.value) : -1;
        const isCorrect = userAnswer === q.correct;
        
        if (isCorrect) correct++;
        
        answers.push({
            question: q.question,
            userAnswer: userAnswer >= 0 ? q.options[userAnswer] : 'Không trả lời',
            correctAnswer: q.options[q.correct],
            isCorrect
        });
    });
    
    showResult(correct, answers);
}

function showResult(correct, answers) {
    document.getElementById('examTest').style.display = 'none';
    document.getElementById('examResult').style.display = 'block';
    
    const total = sampleQuestions.length;
    const score = (correct / total * 10).toFixed(2);
    
    document.getElementById('score').textContent = `${score} điểm`;
    document.getElementById('resultDetails').textContent = 
        `Đúng ${correct}/${total} câu (${(correct/total*100).toFixed(0)}%)`;
    
    document.getElementById('answers').innerHTML = answers.map((a, i) => `
        <div class="answer-review ${a.isCorrect ? 'correct' : 'incorrect'}">
            <h4>Câu ${i + 1}: ${a.question}</h4>
            <p><strong>Bạn chọn:</strong> ${a.userAnswer}</p>
            <p><strong>Đáp án đúng:</strong> ${a.correctAnswer}</p>
        </div>
    `).join('');
}

function backToExams() {
    document.getElementById('examResult').style.display = 'none';
    document.getElementById('examTest').style.display = 'none';
    selectSubject(currentSubject);
}

// Google Apps Script URL for registration
const REGISTER_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzgpq6pmb0vMdDwqwImuTgkxG8LzleWVxUo_vplQa2qBzp1F9TM8to4jbtfDPE_2wIkdw/exec';

// Form đăng ký
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').onsubmit = function(e) {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const phone = document.getElementById('phone')?.value || '';
        const school = document.getElementById('school')?.value || '';
        const grade = document.getElementById('grade')?.value || '';
        
        // Validation
        if (!fullname || fullname.length < 3) {
            alert('❌ Họ tên phải có ít nhất 3 ký tự');
            return;
        }
        
        if (!email || !email.includes('@')) {
            alert('❌ Email không hợp lệ');
            return;
        }
        
        if (!password || password.length < 6) {
            alert('❌ Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('❌ Mật khẩu xác nhận không khớp!');
            return;
        }
        
        // Show loading
        const registerBtn = document.getElementById('registerBtn');
        if (registerBtn) {
            registerBtn.disabled = true;
            const btnText = registerBtn.querySelector('.btn-text');
            const btnLoader = registerBtn.querySelector('.btn-loader');
            if (btnText) btnText.style.display = 'none';
            if (btnLoader) btnLoader.style.display = 'flex';
        }
        
        // Gửi dữ liệu lên Google Sheets (không đợi response)
        fetch(REGISTER_GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullname: fullname,
                email: email,
                phone: phone,
                school: school,
                grade: grade
            })
        }).catch(error => console.log('Sent to Google Sheets'));
        
        // Lưu vào localStorage để có thể đăng nhập
        localStorage.setItem('user', JSON.stringify({ 
            fullname, 
            email, 
            phone,
            school,
            grade,
            password 
        }));
        
        // Hiển thị thông báo và chuyển trang
        setTimeout(() => {
            if (registerBtn) {
                registerBtn.disabled = false;
                const btnText = registerBtn.querySelector('.btn-text');
                const btnLoader = registerBtn.querySelector('.btn-loader');
                if (btnText) btnText.style.display = 'inline';
                if (btnLoader) btnLoader.style.display = 'none';
            }
            alert('✅ Đăng ký thành công! Thông tin đã được ghi nhận.');
            window.location.href = 'dang-nhap.html';
        }, 500);
    };
}

// Toggle password for register form
function togglePasswordRegister(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(iconId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

// Account Page Functions
if (window.location.pathname.includes('tai-khoan.html')) {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (!isLoggedIn) {
        window.location.href = 'dang-nhap.html';
    }
    
    loadAccountData();
}

function loadAccountData() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    let accountData = JSON.parse(localStorage.getItem('accountData') || '{}');
    
    console.log('🔍 Loading account data:', accountData);
    console.log('📚 Purchased materials:', accountData.purchasedMaterials);
    
    // Initialize accountData if it's empty
    let needsSave = false;
    
    if (accountData.balance === undefined || accountData.balance === null) {
        accountData.balance = 0;
        needsSave = true;
    }
    if (accountData.birthday === undefined || accountData.birthday === null) {
        accountData.birthday = '';
        needsSave = true;
    }
    if (accountData.phone === undefined || accountData.phone === null) {
        accountData.phone = '';
        needsSave = true;
    }
    if (accountData.joinDate === undefined || accountData.joinDate === null || accountData.joinDate === '') {
        accountData.joinDate = new Date().toLocaleDateString('vi-VN');
        needsSave = true;
    }
    if (!accountData.purchasedMaterials) {
        accountData.purchasedMaterials = [];
        needsSave = true;
    }
    if (!accountData.examHistory) {
        accountData.examHistory = [];
        needsSave = true;
    }
    if (!accountData.rechargeHistory) {
        accountData.rechargeHistory = [];
        needsSave = true;
    }
    if (!accountData.avatar) {
        accountData.avatar = 'assets/logo2.png';
        needsSave = true;
    }
    
    // Only save if we added new fields
    if (needsSave) {
        localStorage.setItem('accountData', JSON.stringify(accountData));
    }
    
    // Always display fixed avatar (dolphin logo)
    document.getElementById('avatarImg').src = 'assets/logo2.png';
    
    // Display user info
    document.getElementById('userName').textContent = user.fullname || 'Người dùng';
    document.getElementById('userEmail').textContent = user.email || '';
    document.getElementById('displayName').textContent = user.fullname || '-';
    document.getElementById('displayEmail').textContent = user.email || '-';
    document.getElementById('displayJoinDate').textContent = accountData.joinDate || '-';
    
    // Display balance
    if (document.getElementById('accountBalance')) {
        document.getElementById('accountBalance').textContent = accountData.balance.toLocaleString('vi-VN') + 'đ';
    }
    
    // Display stats
    document.getElementById('totalExams').textContent = accountData.examHistory.length;
    document.getElementById('totalMaterials').textContent = accountData.purchasedMaterials.length;
    
    const avgScore = accountData.examHistory.length > 0 
        ? (accountData.examHistory.reduce((sum, exam) => sum + exam.score, 0) / accountData.examHistory.length).toFixed(1)
        : 0;
    document.getElementById('avgScore').textContent = avgScore;
    
    // Display purchased materials
    displayPurchasedMaterials(accountData.purchasedMaterials);
    
    // Display exam history
    displayExamHistory(accountData.examHistory);
    
    // Display recharge history
    displayRechargeHistory(accountData.rechargeHistory);
}

function displayPurchasedMaterials(purchasedMaterials) {
    const container = document.getElementById('purchasedMaterials');
    if (purchasedMaterials.length === 0) {
        container.innerHTML = '<p class="empty-message">Bạn chưa mua tài liệu nào</p>';
        return;
    }
    
    container.innerHTML = purchasedMaterials.map(item => {
        // Find the full material data
        const fullMaterial = materials.find(m => m.id === item.id);
        const downloadLink = fullMaterial ? fullMaterial.downloadLink : '#';
        
        return `
            <div class="material-item purchased-item">
                <div class="item-header">
                    <span class="item-title">📚 ${item.title}</span>
                    <span class="item-price">${item.price.toLocaleString('vi-VN')}đ</span>
                </div>
                <div class="item-info">
                    <span>📅 Ngày mua: ${item.date}</span>
                    <span>📖 Môn: ${item.subject}</span>
                </div>
                <div class="item-actions">
                    <button class="btn-download" onclick="window.open('${downloadLink}', '_blank')">
                        📥 Tải lại tài liệu
                    </button>
                    <span class="download-code-display">🔑 Mã: ${item.downloadCode}</span>
                </div>
            </div>
        `;
    }).join('');
}

function displayExamHistory(exams) {
    const container = document.getElementById('examHistory');
    if (exams.length === 0) {
        container.innerHTML = '<p class="empty-message">Bạn chưa làm bài thi nào</p>';
        return;
    }
    
    container.innerHTML = exams.map(item => `
        <div class="exam-item">
            <div class="item-header">
                <span class="item-title">${item.title}</span>
                <span class="item-score">${item.score} điểm</span>
            </div>
            <div class="item-info">
                Ngày làm: ${item.date} | Thời gian: ${item.time} phút
            </div>
        </div>
    `).join('');
}

function displayRechargeHistory(history) {
    const container = document.getElementById('rechargeHistory');
    if (history.length === 0) {
        container.innerHTML = '<p class="empty-message">Chưa có giao dịch nạp tiền</p>';
        return;
    }
    
    container.innerHTML = history.map(item => `
        <div class="recharge-item">
            <div class="item-header">
                <span class="item-title">Nạp tiền vào tài khoản</span>
                <span class="item-price">+${item.amount.toLocaleString('vi-VN')}đ</span>
            </div>
            <div class="item-info">
                ${item.date} | ${item.method}
            </div>
        </div>
    `).join('');
}

function editProfile() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    document.getElementById('editName').value = user.fullname || '';
    
    document.getElementById('editModal').style.display = 'flex';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

document.getElementById('editForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Update only fullname
    user.fullname = document.getElementById('editName').value;
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    // Close modal
    closeEditModal();
    
    // Reload data to display
    loadAccountData();
    
    alert('✅ Cập nhật thông tin thành công!');
});

function showRechargeModal() {
    document.getElementById('rechargeModal').style.display = 'flex';
}

function closeRechargeModal() {
    document.getElementById('rechargeModal').style.display = 'none';
}

function recharge(amount) {
    const accountData = JSON.parse(localStorage.getItem('accountData') || '{}');
    accountData.balance = (accountData.balance || 0) + amount;
    
    accountData.rechargeHistory = accountData.rechargeHistory || [];
    accountData.rechargeHistory.unshift({
        amount: amount,
        date: new Date().toLocaleString('vi-VN'),
        method: 'Chuyển khoản ngân hàng'
    });
    
    localStorage.setItem('accountData', JSON.stringify(accountData));
    closeRechargeModal();
    loadAccountData();
    alert(`✅ Nạp ${amount.toLocaleString('vi-VN')}đ thành công!`);
}

function rechargeCustom() {
    const amount = parseInt(document.getElementById('customAmount').value);
    if (!amount || amount < 10000) {
        alert('Số tiền nạp tối thiểu là 10,000đ');
        return;
    }
    recharge(amount);
}

function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Form đăng nhập
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').onsubmit = function(e) {
        e.preventDefault();
        
        // Clear previous errors
        document.getElementById('emailError').textContent = '';
        document.getElementById('passwordError').textContent = '';
        document.getElementById('errorMessage').style.display = 'none';
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Validation
        let hasError = false;
        
        if (!email || !email.includes('@')) {
            document.getElementById('emailError').textContent = 'Email không hợp lệ';
            hasError = true;
        }
        
        if (!password || password.length < 6) {
            document.getElementById('passwordError').textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
            hasError = true;
        }
        
        if (hasError) return;
        
        // Show loading state
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.disabled = true;
        loginBtn.querySelector('.btn-text').style.display = 'none';
        loginBtn.querySelector('.btn-loader').style.display = 'flex';
        
        // Simulate API call
        setTimeout(() => {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            
            if (user.email === email && user.password === password) {
                // Always save to localStorage for persistent login
                localStorage.setItem('loggedIn', 'true');
                alert('Đăng nhập thành công!');
                window.location.href = 'tai-khoan.html';
            } else {
                // Show error
                const errorMsg = document.getElementById('errorMessage');
                errorMsg.textContent = '❌ Email hoặc mật khẩu không đúng!';
                errorMsg.style.display = 'block';
                
                // Reset button
                loginBtn.disabled = false;
                loginBtn.querySelector('.btn-text').style.display = 'inline';
                loginBtn.querySelector('.btn-loader').style.display = 'none';
            }
        }, 1500);
    };
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

// Forgot Password Functions
function showForgotPasswordModal(event) {
    event.preventDefault();
    document.getElementById('forgotPasswordModal').style.display = 'flex';
}

function closeForgotPasswordModal() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
    document.getElementById('forgotEmail').value = '';
    document.getElementById('forgotEmailError').textContent = '';
}

function closeResetPasswordModal() {
    document.getElementById('resetPasswordModal').style.display = 'none';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
    document.getElementById('newPasswordError').textContent = '';
    document.getElementById('confirmNewPasswordError').textContent = '';
}

function toggleNewPassword() {
    const passwordInput = document.getElementById('newPassword');
    const eyeIcon = document.getElementById('eyeIconNew');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

function toggleConfirmNewPassword() {
    const passwordInput = document.getElementById('confirmNewPassword');
    const eyeIcon = document.getElementById('eyeIconConfirm');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

// Handle forgot password form - Step 1: Verify email
if (document.getElementById('forgotPasswordForm')) {
    document.getElementById('forgotPasswordForm').onsubmit = function(e) {
        e.preventDefault();
        
        const email = document.getElementById('forgotEmail').value;
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Clear previous errors
        document.getElementById('forgotEmailError').textContent = '';
        
        // Check if email exists
        if (user.email === email) {
            // Email found, show reset password modal
            closeForgotPasswordModal();
            document.getElementById('resetPasswordModal').style.display = 'flex';
        } else {
            document.getElementById('forgotEmailError').textContent = '❌ Email không tồn tại trong hệ thống';
        }
    };
}

// Handle reset password form - Step 2: Set new password
if (document.getElementById('resetPasswordForm')) {
    document.getElementById('resetPasswordForm').onsubmit = function(e) {
        e.preventDefault();
        
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;
        
        // Clear previous errors
        document.getElementById('newPasswordError').textContent = '';
        document.getElementById('confirmNewPasswordError').textContent = '';
        
        let hasError = false;
        
        // Validate password length
        if (newPassword.length < 6) {
            document.getElementById('newPasswordError').textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
            hasError = true;
        }
        
        // Validate password match
        if (newPassword !== confirmNewPassword) {
            document.getElementById('confirmNewPasswordError').textContent = '❌ Mật khẩu xác nhận không khớp!';
            hasError = true;
        }
        
        if (hasError) return;
        
        // Update password in localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.password = newPassword;
        localStorage.setItem('user', JSON.stringify(user));
        
        closeResetPasswordModal();
        alert('✅ Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.');
    };
}



// Contact Form Handler
if (document.getElementById('contactForm')) {
    // Chặn nhập chữ vào ô số điện thoại
    const phoneInput = document.getElementById('contactPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Chỉ giữ lại số
            this.value = this.value.replace(/[^0-9]/g, '');
        });
        
        phoneInput.addEventListener('keypress', function(e) {
            // Chặn nhập ký tự không phải số
            if (e.key && !/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        });
    }
    
    document.getElementById('contactForm').onsubmit = async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '⏳ Đang gửi...';
        
        try {
            // Google Apps Script URL
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzHj1rFzNw943bqvmmTmAg0D4Am4nq2gGO2Ysd3A2gwc9HWhVJCVixq96jHb9MpefCH/exec';
            
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    subject: subject,
                    message: message
                })
            });
            
            // Show success message
            alert('✅ Cảm ơn bạn đã gửi câu hỏi!\n\nChúng tôi sẽ phản hồi trong vòng 24 giờ.');
            
            // Reset form
            this.reset();
            
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp qua:\n📧 trcuong12112008@gmail.com\n📱 0348 908 243');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    };
}


// Update navigation menu based on login status
function updateNavMenu() {
    const isLoggedIn = localStorage.getItem('loggedIn');
    const navMenus = document.querySelectorAll('.nav-menu');
    
    navMenus.forEach(navMenu => {
        if (isLoggedIn) {
            // User is logged in - show Tài khoản and Đăng xuất
            const loginLink = navMenu.querySelector('a[href="dang-nhap.html"]');
            const registerLink = navMenu.querySelector('a[href="dang-ky.html"]');
            
            if (loginLink) {
                loginLink.parentElement.style.display = 'none';
            }
            if (registerLink) {
                registerLink.parentElement.style.display = 'none';
            }
            
            // Check if Tài khoản link already exists
            const accountLink = navMenu.querySelector('a[href="tai-khoan.html"]');
            if (!accountLink) {
                // Add Tài khoản and Đăng xuất links
                const accountLi = document.createElement('li');
                accountLi.innerHTML = '<a href="tai-khoan.html">Tài khoản</a>';
                
                const logoutLi = document.createElement('li');
                logoutLi.innerHTML = '<a href="#" onclick="logout()" class="btn-primary">Đăng xuất</a>';
                
                navMenu.appendChild(accountLi);
                navMenu.appendChild(logoutLi);
            }
        } else {
            // User is not logged in - show Đăng nhập and Đăng ký
            const loginLink = navMenu.querySelector('a[href="dang-nhap.html"]');
            const registerLink = navMenu.querySelector('a[href="dang-ky.html"]');
            
            if (loginLink) {
                loginLink.parentElement.style.display = 'list-item';
            }
            if (registerLink) {
                registerLink.parentElement.style.display = 'list-item';
            }
            
            // Remove Tài khoản and Đăng xuất if they exist
            const accountLink = navMenu.querySelector('a[href="tai-khoan.html"]');
            const logoutLink = navMenu.querySelector('a[onclick="logout()"]');
            
            if (accountLink) {
                accountLink.parentElement.remove();
            }
            if (logoutLink) {
                logoutLink.parentElement.remove();
            }
        }
    });
}

// Call updateNavMenu on page load
document.addEventListener('DOMContentLoaded', updateNavMenu);


// Create Exam Modal Functions
function showCreateExamModal() {
    document.getElementById('createExamModal').style.display = 'flex';
}

function closeCreateExamModal() {
    document.getElementById('createExamModal').style.display = 'none';
}

// Handle Create Exam Form
if (document.getElementById('createExamForm')) {
    document.getElementById('createExamForm').onsubmit = function(e) {
        e.preventDefault();
        
        const subject = document.getElementById('examSubject').value;
        const grade = document.getElementById('examGrade').value;
        const title = document.getElementById('examTitle').value;
        const questions = document.getElementById('examQuestions').value;
        const time = document.getElementById('examTime').value;
        
        // Get subject name
        const subjectName = subjects.find(s => s.id === subject)?.name || subject;
        
        // Create new exam object
        const newExam = {
            id: Date.now(),
            title: title,
            subject: subjectName,
            grade: grade,
            questions: parseInt(questions),
            time: parseInt(time),
            createdAt: new Date().toLocaleDateString('vi-VN')
        };
        
        // Save to localStorage
        let customExams = JSON.parse(localStorage.getItem('customExams') || '[]');
        customExams.push(newExam);
        localStorage.setItem('customExams', JSON.stringify(customExams));
        
        // Add to exams object
        if (!exams[subject]) {
            exams[subject] = [];
        }
        exams[subject].push(newExam);
        
        // Close modal and show success
        closeCreateExamModal();
        
        alert('✅ Tạo đề thi thành công!\n\nĐề thi: ' + title + '\nMôn: ' + subjectName + '\nSố câu: ' + questions + '\nThời gian: ' + time + ' phút');
        
        // Reset form
        this.reset();
        
        // Reload page to show new exam
        location.reload();
    };
}


// Load custom exams on page load
function loadCustomExams() {
    const customExams = JSON.parse(localStorage.getItem('customExams') || '[]');
    customExams.forEach(exam => {
        const subjectId = subjects.find(s => s.name === exam.subject)?.id;
        if (subjectId) {
            if (!exams[subjectId]) {
                exams[subjectId] = [];
            }
            // Check if exam already exists
            if (!exams[subjectId].find(e => e.id === exam.id)) {
                exams[subjectId].push(exam);
            }
        }
    });
}

// Call loadCustomExams when page loads
if (window.location.pathname.includes('luyen-thi.html')) {
    loadCustomExams();
}


// Gift Modal Functions
function showGiftModal() {
    document.getElementById('giftModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeGiftModal() {
    document.getElementById('giftModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('giftModal');
    if (event.target === modal) {
        closeGiftModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('giftModal');
        if (modal && modal.style.display === 'block') {
            closeGiftModal();
        }
    }
});
