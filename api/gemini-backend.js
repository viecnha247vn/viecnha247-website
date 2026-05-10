// ============================================================
// === CHATBOT RULE-BASED — VIỆC NHÀ 247 ====================
// ============================================================
// Không cần API, không cần backend, không tốn tiền.
// 100+ câu Q&A được lập trình sẵn — trả lời tức thì.
// ============================================================

(function() {
  'use strict';

  // ===== CONFIG =====
  const ZALO_OA_URL = 'https://zalo.me/[YOUR_ZALO_OA_ID]';     // Bạn thay sau
  const MESSENGER_URL = 'https://m.me/[YOUR_FB_PAGE]';         // Bạn thay sau
  const HOTLINE = '1900 6247';
  
  // ===== KNOWLEDGE BASE =====
  // Mỗi entry có:
  //   - keywords: [array các từ khóa] - bot sẽ tìm trong câu hỏi của khách
  //   - answer: câu trả lời (có thể có \n để xuống dòng)
  //   - action: (optional) 'open_form:service-id' hoặc 'open_zalo'
  
  const KNOWLEDGE_BASE = [
    // ============================================================
    // === GREETINGS (chào hỏi) ===================================
    // ============================================================
    {
      keywords: ['chào', 'hello', 'hi ', 'xin chào', 'alo', 'hí', 'hey'],
      answer: 'Xin chào anh/chị! 👋 Em là trợ lý của ViệcNhà247. Em có thể giúp gì cho anh/chị hôm nay ạ?\n\nAnh/chị có thể hỏi em về:\n• 8 dịch vụ và giá cả\n• Cách đặt lịch\n• Chính sách bảo hành, hủy đơn\n• Tuyển cộng tác viên'
    },
    {
      keywords: ['cảm ơn', 'thanks', 'thank you', 'tks', 'ok cảm ơn'],
      answer: 'Dạ không có gì ạ! 😊 Nếu cần thêm thông tin gì, anh/chị cứ nhắn em nhé. Chúc anh/chị một ngày tốt lành!'
    },
    {
      keywords: ['tạm biệt', 'bye', 'goodbye', 'chào tạm biệt'],
      answer: 'Dạ chào anh/chị! 👋 Cảm ơn anh/chị đã liên hệ ViệcNhà247. Hẹn gặp lại ạ!'
    },
    
    // ============================================================
    // === GIỚI THIỆU CHUNG =======================================
    // ============================================================
    {
      keywords: ['việcnhà247 là gì', 'công ty làm gì', 'giới thiệu', 'về công ty', 'là ai', 'là gì'],
      answer: 'ViệcNhà247 là nền tảng dịch vụ gia đình tận tâm tại TPHCM (mở rộng - bao gồm cả khu vực Bình Dương, BR-VT cũ).\n\n🏠 Chúng tôi cung cấp 8 dịch vụ chính:\n🧹 Dọn dẹp nhà\n⚡ Sửa điện\n💧 Sửa nước\n🚛 Chuyển nhà\n🍳 Nấu ăn\n👴 Chăm sóc người cao tuổi\n🛒 Đi chợ hộ\n🔨 Sửa đa năng\n\nMọi CTV đều được đào tạo bài bản và có chứng chỉ.'
    },
    {
      keywords: ['ở đâu', 'địa chỉ', 'văn phòng', 'trụ sở'],
      answer: '📍 ViệcNhà247 đặt văn phòng tại: Sea Office, Quận 7, TPHCM.\n\nChúng tôi phục vụ toàn TPHCM (theo địa giới hành chính mới từ 1/7/2025 — bao gồm cả khu vực Bình Dương, Bà Rịa-Vũng Tàu cũ).\n\nMuốn liên hệ trực tiếp anh/chị có thể nhắn Zalo OA của chúng tôi nhé!',
      action: 'open_zalo'
    },
    {
      keywords: ['phục vụ ở đâu', 'khu vực phục vụ', 'có làm ở', 'có nhận', 'làm tại'],
      answer: '🏙️ ViệcNhà247 phục vụ trên toàn TPHCM (mở rộng từ 1/7/2025), bao gồm:\n\n✅ Khu vực TPHCM cũ: 22 quận/huyện (Q.1, 3, 4, 5, 6, 7, 8, 10, 11, 12, Bình Thạnh, Tân Bình, Phú Nhuận, Gò Vấp, Tân Phú, Bình Tân, Thủ Đức, Nhà Bè, Cần Giờ, Hóc Môn, Củ Chi, Bình Chánh)\n\n✅ Khu Bình Dương cũ: Thủ Dầu Một, Dĩ An, Thuận An, Tân Uyên, Bến Cát\n\n✅ Khu BR-VT cũ: Vũng Tàu, Bà Rịa, Phú Mỹ, Long Điền, Côn Đảo'
    },
    
    // ============================================================
    // === DỌN DẸP NHÀ CỬA ========================================
    // ============================================================
    {
      keywords: ['dọn nhà', 'dọn dẹp', 'lau nhà', 'vệ sinh nhà', 'tổng vệ sinh', 'helper', 'người giúp việc'],
      answer: '🧹 Dạ, ViệcNhà247 có 3 gói dọn nhà:\n\n• Theo giờ: 99k/giờ (tối thiểu 2h)\n• Tổng vệ sinh nhà mới: từ 799k\n• Vệ sinh sau xây dựng: từ 1.499k\n\nGiá tính theo diện tích:\n- Dưới 50m²: ×1\n- 50-80m²: ×1.2\n- 80-120m²: ×1.5\n- Trên 120m²: ×2\n\nNhà anh/chị bao nhiêu m² ạ? Em báo giá chi tiết hơn 😊',
      action: 'open_form:don-dep'
    },
    {
      keywords: ['dọn nhà giá', 'phí dọn nhà', 'chi phí dọn dẹp', 'dọn nhà bao nhiêu', 'giá dọn'],
      answer: '🧹 Giá dọn nhà:\n\n• Theo giờ: 99.000đ/giờ (tối thiểu 2h = 198k)\n• Tổng vệ sinh: từ 799.000đ\n• Sau xây dựng: từ 1.499.000đ\n\n💡 Phụ phí:\n- Có thú cưng: +50k\n- Tầng cao không TM: +50k\n- Cuối tuần: +20%\n- Khẩn cấp <2h: +30%',
      action: 'open_form:don-dep'
    },
    {
      keywords: ['dọn nhà bao lâu', 'mất bao nhiêu thời gian dọn', 'dọn nhà bao nhiêu giờ'],
      answer: '⏱️ Thời gian dọn nhà tham khảo:\n\n• Nhà <50m²: 2-3 giờ\n• Nhà 50-80m²: 3-5 giờ\n• Nhà 80-120m²: 5-8 giờ\n• Nhà >120m²: 8h trở lên\n\nTổng vệ sinh thường mất gấp 1.5-2 lần so với dọn theo giờ.'
    },
    {
      keywords: ['ctv dọn nhà', 'người dọn', 'có an toàn không', 'tin tưởng được', 'có chứng chỉ'],
      answer: '✅ CTV dọn dẹp của ViệcNhà247:\n\n• Được tuyển chọn kỹ, có CMND/CCCD rõ ràng\n• Đào tạo chuẩn 5 phòng (khách, ngủ, bếp, vệ sinh, ban công)\n• Có chứng chỉ vệ sinh\n• Mặc đồng phục, đeo bảng tên\n• Bảo hiểm trách nhiệm\n\nAnh/chị yên tâm 100% nhé!'
    },
    
    // ============================================================
    // === SỬA ĐIỆN ==============================================
    // ============================================================
    {
      keywords: ['sửa điện', 'lắp điện', 'thợ điện', 'chập điện', 'điện hỏng', 'cháy bóng', 'mất điện', 'aptomat'],
      answer: '⚡ Dạ ViệcNhà247 có dịch vụ sửa điện 24/7!\n\n✨ Đặc biệt: Khảo sát tận nơi MIỄN PHÍ nếu anh/chị làm tiếp!\n\n• Phí khảo sát: 149k (CHỈ tính nếu anh/chị kiểm tra rồi không làm)\n• Việc sửa: từ 199k (báo giá theo công việc thực tế)\n• Bảo hành: 6 tháng\n\nAnh/chị cần lắp đặt mới hay sửa chữa ạ?',
      action: 'open_form:sua-dien'
    },
    {
      keywords: ['sửa điện giá', 'phí sửa điện', 'sửa điện bao nhiêu', 'giá thợ điện'],
      answer: '⚡ Giá sửa điện:\n\n✨ Khảo sát MIỄN PHÍ nếu làm tiếp!\nPhí khảo sát: 149k (chỉ thu khi không làm)\n\nViệc sửa thường:\n• Lắp ổ cắm: 79k - 149k\n• Lắp đèn LED: 199k - 399k\n• Sửa chập điện: 249k - 499k\n• Đi dây âm tường: 799k - 1.999k\n• Lắp aptomat: 499k - 1.199k\n\n💡 Linh kiện thay thế tính riêng theo hóa đơn.',
      action: 'open_form:sua-dien'
    },
    {
      keywords: ['điện 24/7', 'sửa điện đêm', 'sửa điện gấp', 'điện khẩn cấp'],
      answer: '⚡ Dạ ViệcNhà247 có dịch vụ sửa điện 24/7!\n\nPhụ phí cho trường hợp khẩn:\n• Khẩn cấp dưới 2 giờ: +30%\n• Đêm 22h-6h: +50%\n• Tầng cao không thang máy: +50k\n\nAnh/chị có thể đặt lịch ngay, CTV sẽ đến trong 30-60 phút.',
      action: 'open_form:sua-dien'
    },
    {
      keywords: ['bảo hành điện', 'lỗi sau khi sửa', 'sửa lại miễn phí'],
      answer: '🛡️ Bảo hành sửa điện: 6 tháng\n\nTrong thời gian bảo hành, nếu lỗi tái phát:\n• CTV cũ đến sửa lại MIỄN PHÍ\n• Linh kiện hỏng do lỗi trong quá trình sửa: thay miễn phí\n\nLưu ý: bảo hành KHÔNG áp dụng cho lỗi do sử dụng sai cách hoặc thiết bị khác bị hỏng.'
    },
    
    // ============================================================
    // === SỬA NƯỚC ==============================================
    // ============================================================
    {
      keywords: ['sửa nước', 'thợ nước', 'thông tắc', 'rò rỉ', 'tắc bồn', 'bồn cầu nghẹt', 'ống nước', 'vòi nước', 'bình nóng lạnh'],
      answer: '💧 Dạ ViệcNhà247 có dịch vụ sửa nước 24/7!\n\n✨ Khảo sát tận nơi MIỄN PHÍ nếu làm tiếp!\n\n• Phí khảo sát: 179k (chỉ thu khi không làm)\n• Việc sửa: từ 249k\n\nAnh/chị gặp vấn đề gì ạ?\n• Thông tắc cống/bồn cầu\n• Rò rỉ ống/vòi\n• Lắp đặt thiết bị mới\n• Vệ sinh bồn nước',
      action: 'open_form:sua-nuoc'
    },
    {
      keywords: ['sửa nước giá', 'phí sửa nước', 'sửa nước bao nhiêu'],
      answer: '💧 Giá sửa nước:\n\n✨ Khảo sát MIỄN PHÍ nếu làm tiếp!\nPhí khảo sát: 179k (chỉ thu khi không làm)\n\nViệc sửa thường:\n• Thông tắc bồn cầu: 199k - 499k\n• Sửa rò rỉ ống nhỏ: 249k - 449k\n• Lắp vòi sen: 199k - 399k\n• Lắp bình nóng lạnh: 399k - 699k\n• Vệ sinh bồn nước: 599k - 1.199k',
      action: 'open_form:sua-nuoc'
    },
    {
      keywords: ['nước rỉ', 'rò nước', 'leak', 'chảy nước', 'thấm nước'],
      answer: '💧 Rò rỉ nước cần xử lý sớm để tránh hỏng tường, lãng phí nước!\n\nViệcNhà247 có thể đến trong 1-2 giờ. CTV sẽ:\n1. Khảo sát MIỄN PHÍ điểm rò rỉ\n2. Báo giá chính xác (thường 249k - 449k)\n3. Sửa luôn nếu anh/chị đồng ý\n\nGọi gấp anh/chị nhé!',
      action: 'open_form:sua-nuoc'
    },
    
    // ============================================================
    // === CHUYỂN NHÀ =============================================
    // ============================================================
    {
      keywords: ['chuyển nhà', 'dọn nhà mới', 'vận chuyển', 'xe tải', 'chuyển đồ', 'chuyển trọ', 'dọn đồ'],
      answer: '🚛 Dạ ViệcNhà247 có 3 gói chuyển nhà:\n\n• Gói 1 - Chỉ vận chuyển: từ 799k (khách tự đóng gói)\n• Gói 2 - VC + Đóng gói cơ bản: từ 1.499k\n• Gói 3 - Trọn gói A-Z: từ 2.999k (đóng gói, vận chuyển, sắp xếp)\n\n💡 Tính giá theo khoảng cách thực tế:\n- 5km đầu: MIỄN PHÍ\n- 5-50km: +8.000đ/km\n- Liên tỉnh >50km: +1.000đ/km\n- Tầng nhà không TM: +100k/tầng\n\n🛡️ Bảo hiểm hàng hóa đến 50 triệu/đơn',
      action: 'open_form:chuyen-nha'
    },
    {
      keywords: ['chuyển nhà giá', 'phí chuyển nhà', 'chuyển nhà bao nhiêu', 'chuyển nhà bao tiền'],
      answer: '🚛 Giá chuyển nhà:\n\nGói 1 (chỉ VC): từ 799.000đ\nGói 2 (VC + đóng gói): từ 1.499.000đ\nGói 3 (trọn gói A-Z): từ 2.999.000đ\n\nVí dụ thực tế:\nQ.7 → Q.1 (8.5km), gói 1, nhà cũ 2 tầng:\n= 799k + (3.5km × 8k) + 200k tầng\n= 1.027.000đ\n\nAnh/chị thử mở form đặt lịch, em tính giá chính xác theo địa chỉ ạ!',
      action: 'open_form:chuyen-nha'
    },
    {
      keywords: ['chuyển nhà bảo hiểm', 'làm vỡ đồ', 'mất đồ chuyển nhà', 'bảo hiểm hàng hóa'],
      answer: '🛡️ Bảo hiểm chuyển nhà của ViệcNhà247:\n\n• Bảo hiểm hàng hóa đến 50 triệu/đơn\n• Đền bù 100% giá trị nếu CTV làm hỏng/mất\n• Có biên bản giao nhận trước và sau khi chuyển\n• CTV được đào tạo về kỹ thuật đóng gói chuyên nghiệp\n\nAnh/chị có thể yên tâm với đồ giá trị cao như TV, tủ lạnh, đồ gốm...'
    },
    {
      keywords: ['xe chuyển nhà', 'xe tải gì', 'loại xe', 'thuê xe chuyển'],
      answer: '🚛 ViệcNhà247 có nhiều loại xe phù hợp:\n\n• Xe tải nhỏ 500kg: cho căn hộ studio, trọ\n• Xe tải 1.5 tấn: cho nhà 1-2 phòng ngủ\n• Xe tải 3.5 tấn: cho nhà 3 phòng ngủ trở lên\n• Xe tải 5 tấn: cho biệt thự, đồ nhiều\n\nLoại xe được tự động chọn dựa trên gói + số đồ. CTV sẽ tư vấn cụ thể khi khảo sát.',
      action: 'open_form:chuyen-nha'
    },
    {
      keywords: ['chuyển liên tỉnh', 'chuyển tỉnh khác', 'chuyển ra tỉnh'],
      answer: '🚛 Dạ ViệcNhà247 có chuyển nhà liên tỉnh!\n\nGiá:\n• Gói 1: 799k (giá khởi điểm)\n• Phụ phí khoảng cách:\n  - 5-50km: +8k/km\n  - >50km (liên tỉnh): +1k/km\n\nVí dụ TPHCM → Đà Lạt (~300km):\n= 799k + (45km × 8k) + (250km × 1k)\n= 1.409.000đ',
      action: 'open_form:chuyen-nha'
    },
    
    // ============================================================
    // === NẤU ĂN ================================================
    // ============================================================
    {
      keywords: ['nấu ăn', 'đầu bếp', 'nấu cơm', 'cooking', 'nấu', 'đặt cơm', 'tiệc'],
      answer: '🍳 Dạ ViệcNhà247 có dịch vụ nấu ăn tại gia!\n\n• Bữa cơm 4 người: 249k\n• Bữa cơm 6-8 người: 399k\n• Tiệc nhỏ 10-20 người: 1.499k\n• Cơm tháng 30 bữa: 5.999k\n\nĐầu bếp có chứng chỉ ATTP, nấu món Việt/Á/Âu theo yêu cầu.\n\n💡 Lưu ý: nguyên liệu khách trả riêng theo hóa đơn.',
      action: 'open_form:nau-an'
    },
    {
      keywords: ['nấu ăn giá', 'phí nấu', 'cơm bao nhiêu', 'tiệc bao nhiêu'],
      answer: '🍳 Bảng giá nấu ăn:\n\n• Bữa cơm 4 người: 249.000đ\n• Bữa cơm 6-8 người: 399.000đ\n• Tiệc nhỏ 10-20 người: 1.499.000đ\n• Cơm tháng (30 bữa): 5.999.000đ\n\n💡 Đây là phí đầu bếp. Nguyên liệu trả riêng.\n\nMón ăn:\n- Việt: cơm gia đình, đặc sản 3 miền\n- Á: Hàn, Nhật, Trung\n- Âu: pasta, bít tết, salad',
      action: 'open_form:nau-an'
    },
    {
      keywords: ['cơm tháng', 'nấu cả tháng', 'cơm văn phòng', 'cơm hàng ngày'],
      answer: '🍳 Cơm tháng (30 bữa) - 5.999.000đ:\n\n• Đầu bếp đến nhà nấu mỗi ngày\n• Menu xoay vòng theo tuần\n• Đảm bảo dinh dưỡng cân bằng\n• Có thể ăn kiêng/chay theo yêu cầu\n\nTrung bình: 200k/bữa cho gia đình 4-6 người.\n\nLưu ý: nguyên liệu khách trả riêng (~50-100k/bữa tùy món).',
      action: 'open_form:nau-an'
    },
    {
      keywords: ['ăn chay', 'kiêng', 'tiểu đường nấu', 'eat clean', 'low carb'],
      answer: '🥗 ViệcNhà247 có thể nấu theo chế độ:\n\n✅ Ăn chay (lacto-ovo, vegan)\n✅ Tiểu đường (low carb, không đường)\n✅ Eat clean (không dầu mỡ)\n✅ Kiêng cữ sau sinh\n✅ Giảm cân (ít calo)\n✅ Trẻ em (mềm, dễ tiêu)\n✅ Người cao tuổi (mềm, ít muối)\n\nCho em biết yêu cầu cụ thể em tư vấn món phù hợp ạ!'
    },
    
    // ============================================================
    // === CHĂM SÓC NGƯỜI CAO TUỔI ================================
    // ============================================================
    {
      keywords: ['chăm sóc', 'người già', 'người cao tuổi', 'điều dưỡng', 'chăm bệnh', 'chăm ông bà', 'chăm mẹ', 'chăm cha'],
      answer: '👴 Dạ ViệcNhà247 có dịch vụ chăm sóc người cao tuổi với điều dưỡng có chứng chỉ.\n\n• Theo giờ: 74k/giờ (tối thiểu 4h)\n• Cả ngày 8h: 499k\n• 24/7: 799k/ngày\n• Hợp đồng tháng: 11.999k (giảm 15%)\n\n💡 Phụ phí theo tình trạng:\n- Khoẻ mạnh: ×1\n- Yếu: ×1.1\n- Liệt một phần: ×1.3\n- Bệnh nặng: ×1.5\n\nNgười nhà mình bao nhiêu tuổi, tình trạng thế nào ạ?',
      action: 'open_form:cham-soc'
    },
    {
      keywords: ['chăm bệnh giá', 'điều dưỡng giá', 'chăm già bao nhiêu'],
      answer: '👴 Giá chăm sóc người cao tuổi:\n\n• Theo giờ: 74.000đ/giờ (min 4h = 296k)\n• Cả ngày 8h: 499.000đ\n• 24/7: 799.000đ/ngày\n• Cơ tháng: 11.999.000đ (giảm 15%)\n\nVí dụ: chăm 8h/ngày, 30 ngày/tháng:\n= 499k × 30 × 0.85 = 12.724.500đ → giá tháng chỉ 11.999k (rẻ hơn 6%)',
      action: 'open_form:cham-soc'
    },
    {
      keywords: ['chăm sóc 24/7', 'chăm cả ngày đêm', 'điều dưỡng 24h'],
      answer: '👴 Chăm sóc 24/7: 799.000đ/ngày\n\nBao gồm:\n• Cho ăn (3 bữa)\n• Vệ sinh cá nhân (tắm, vệ sinh)\n• Hỗ trợ đi lại\n• Nói chuyện, đọc báo, giải trí\n• Đo huyết áp, đường máu\n• Cho uống thuốc đúng giờ\n• Báo cáo tình hình hàng ngày\n\nĐiều dưỡng có chứng chỉ. Đặc biệt phù hợp cho người liệt, sau phẫu thuật.',
      action: 'open_form:cham-soc'
    },
    {
      keywords: ['điều dưỡng chứng chỉ', 'có bằng cấp', 'chuyên môn cao', 'biết tiêm thuốc'],
      answer: '🩺 CTV chăm sóc của ViệcNhà247:\n\n✅ Có chứng chỉ điều dưỡng/y tá (cao đẳng trở lên)\n✅ Có kinh nghiệm 2+ năm\n✅ Biết đo huyết áp, đường máu\n✅ Biết cho thuốc đúng liều\n✅ Cấp cứu cơ bản (CPR)\n✅ Hồ sơ rõ ràng, có CMND\n\nLưu ý: KHÔNG được tiêm/truyền dịch tại nhà (chỉ bác sĩ mới được phép).'
    },
    
    // ============================================================
    // === ĐI CHỢ HỘ ==============================================
    // ============================================================
    {
      keywords: ['đi chợ', 'mua hộ', 'shopping', 'mua giúp', 'mua đồ', 'siêu thị', 'đi siêu thị'],
      answer: '🛒 Dạ ViệcNhà247 có dịch vụ đi chợ hộ:\n\n• Chợ truyền thống: 99k + 5% giá hàng\n• Siêu thị: 79k + 3% giá hàng\n• Combo nhiều nơi (>2 chỗ): 149k + 5% giá hàng\n\nVí dụ: mua hàng 500k tại chợ → phí 99k + 25k = 124k\n\nAnh/chị muốn mua gì ạ?',
      action: 'open_form:di-cho'
    },
    {
      keywords: ['đi chợ giá', 'phí đi chợ', 'mua hộ bao nhiêu'],
      answer: '🛒 Giá đi chợ hộ:\n\n• Chợ truyền thống: 99.000đ + 5% giá trị hàng\n• Siêu thị (Coopmart, Big C, Lotte): 79.000đ + 3% giá trị hàng\n• Combo nhiều nơi (chợ + siêu thị + tạp hóa): 149.000đ + 5% giá trị hàng\n\n💡 Hóa đơn minh bạch — CTV chụp ảnh từng món + tổng hóa đơn.',
      action: 'open_form:di-cho'
    },
    
    // ============================================================
    // === SỬA ĐA NĂNG ===========================================
    // ============================================================
    {
      keywords: ['lắp ráp', 'ikea', 'lắp tủ', 'lắp bàn', 'lắp giường', 'lắp ráp đồ', 'đa năng'],
      answer: '🔨 Dạ ViệcNhà247 có dịch vụ sửa đa năng - lắp ráp đồ!\n\n✨ Khảo sát MIỄN PHÍ nếu làm tiếp!\n• Phí khảo sát: 149k (chỉ thu khi không làm)\n\nGiá tham khảo:\n• Lắp ráp IKEA (1-2 món): 199k - 499k\n• Treo tranh/kệ (5-10 món): 299k - 599k\n• Sửa cửa, bản lề: 199k - 399k\n• Lắp rèm, mành: 199k - 449k',
      action: 'open_form:da-nang'
    },
    {
      keywords: ['vệ sinh máy lạnh', 'rửa máy lạnh', 'bảo dưỡng máy lạnh', 'điều hòa'],
      answer: '🔨 Vệ sinh máy lạnh:\n\n• 1 cục máy lạnh: 249k - 399k\n• 2 cục: 449k - 699k\n• Tủ lạnh: 299k - 499k (vệ sinh sâu)\n\n💡 Bao gồm: tháo dàn, rửa cục nóng + cục lạnh, kiểm tra gas, lau sạch khô.\n\nNên vệ sinh máy lạnh 6 tháng/lần để tiết kiệm 20% điện và tăng tuổi thọ máy.',
      action: 'open_form:da-nang'
    },
    {
      keywords: ['treo tranh', 'gắn kệ', 'khoan tường'],
      answer: '🔨 Treo tranh, gắn kệ, khoan tường:\n\n• 1-3 món nhỏ: 199.000đ\n• 5-10 món: 299.000đ - 599.000đ\n• Trên 10 món: tính theo công\n\n💡 Đảm bảo: khoan đúng vị trí, không bị nứt tường, dùng đinh/vít phù hợp.',
      action: 'open_form:da-nang'
    },
    
    // ============================================================
    // === ĐẶT LỊCH ===============================================
    // ============================================================
    {
      keywords: ['đặt lịch', 'đặt dịch vụ', 'book', 'đăng ký', 'gọi dịch vụ', 'thuê'],
      answer: '📋 Cách đặt lịch ViệcNhà247:\n\n1. Cuộn xuống mục "Đặt dịch vụ"\n2. Chọn 1 trong 8 dịch vụ\n3. Trả lời 5 bước (chọn loại, thời gian, địa chỉ, phụ phí, thông tin)\n4. Nhận báo giá ngay\n5. Em sẽ gọi xác nhận trong 30 phút\n\nAnh/chị muốn đặt dịch vụ gì ạ?'
    },
    {
      keywords: ['đặt online', 'đặt trên web', 'đặt qua mạng', 'đặt qua app'],
      answer: '💻 Anh/chị đặt online ngay trên website ViệcNhà247:\n\n1. Click vào dịch vụ cần dùng\n2. Form 5 bước hỏi chi tiết\n3. Có báo giá ngay tức thì\n4. Điền tên + SĐT để chốt\n\nKhông cần đăng ký tài khoản, chỉ mất 60 giây!'
    },
    {
      keywords: ['huỷ đơn', 'cancel', 'không làm nữa', 'đổi lịch'],
      answer: '❌ Hủy đơn ViệcNhà247:\n\n• Hủy trước 2 giờ: MIỄN PHÍ\n• Hủy trong 2 giờ tính phí: 30% tổng đơn\n• CTV đã đến nhà: 50% tổng đơn\n\nĐổi lịch (không hủy):\n• Trước 2 giờ: tự do\n• Trong 2 giờ: tùy CTV có sắp xếp được\n\nĐể hủy/đổi lịch, anh/chị nhắn Zalo OA hoặc gọi 1900 6247.',
      action: 'open_zalo'
    },
    {
      keywords: ['bao lâu có ctv', 'mất bao lâu', 'thời gian phản hồi', 'khi nào có người'],
      answer: '⏱️ Thời gian phản hồi:\n\n• Em gọi xác nhận đơn: trong 30 phút\n• CTV đến nhà:\n  - Khẩn cấp: 30-60 phút\n  - Bình thường: theo lịch hẹn (sáng/chiều)\n  - Đặt trước 1 ngày: đảm bảo đúng giờ\n\nAnh/chị có thể đặt trước 1-7 ngày để chọn được CTV phù hợp nhất.'
    },
    
    // ============================================================
    // === THANH TOÁN ============================================
    // ============================================================
    {
      keywords: ['thanh toán', 'trả tiền', 'cách trả', 'phương thức thanh toán', 'tiền mặt', 'chuyển khoản'],
      answer: '💳 ViệcNhà247 nhận thanh toán linh hoạt:\n\n📌 Đơn dưới 500k: tiền mặt cho CTV sau khi xong việc\n\n📌 Đơn 500k - 2 triệu:\n• Đặt cọc 20% (chuyển khoản/MoMo)\n• Còn lại trả cho CTV sau khi xong\n\n📌 Đơn trên 2 triệu:\n• Chuyển khoản 100% trước khi làm\n• Hoặc đặt cọc 50% + 50% sau khi xong\n\n💡 Hóa đơn VAT có sẵn nếu cần.'
    },
    {
      keywords: ['hoá đơn', 'vat', 'hóa đơn đỏ'],
      answer: '🧾 Hóa đơn VAT của ViệcNhà247:\n\n• Có sẵn cho mọi đơn hàng\n• Yêu cầu trước khi thanh toán\n• Phí: 10% giá trị (theo quy định)\n• Cấp trong 7 ngày làm việc\n\nAnh/chị cần xuất hóa đơn cho công ty thì cứ báo trước nhé!'
    },
    {
      keywords: ['cọc', 'đặt cọc', 'trả trước'],
      answer: '💰 Chính sách đặt cọc:\n\n• Đơn <500k: KHÔNG cần cọc\n• Đơn 500k-2tr: cọc 20%\n• Đơn >2tr: chuyển 100% hoặc cọc 50%\n• Hợp đồng tháng (chăm sóc, dọn dẹp định kỳ): cọc 30%\n\nCọc qua MoMo/VNPay/chuyển khoản. Hoàn 100% nếu CTV không đến đúng hẹn.'
    },
    
    // ============================================================
    // === ƯU ĐÃI ================================================
    // ============================================================
    {
      keywords: ['voucher', 'khuyến mãi', 'giảm giá', 'ưu đãi', 'mã giảm', 'discount', 'promo'],
      answer: '🎁 Ưu đãi ViệcNhà247:\n\n✨ Voucher đơn đầu: TẶNG 100.000đ cho khách mới\n📅 Hợp đồng tháng: GIẢM 15%\n👥 Giới thiệu bạn: cả 2 cùng nhận 50.000đ\n🎂 Sinh nhật: tặng voucher 50k tháng sinh nhật\n\nĐể nhận voucher đơn đầu, anh/chị chỉ cần đặt lịch và điền SĐT — em tự áp dụng!'
    },
    {
      keywords: ['giới thiệu bạn', 'referral', 'mã giới thiệu', 'invite'],
      answer: '👥 Giới thiệu bạn bè - cả 2 cùng có lợi:\n\n• Bạn giới thiệu: nhận 50.000đ vào tài khoản\n• Bạn được giới thiệu: nhận voucher 50.000đ\n• Áp dụng khi bạn được giới thiệu hoàn thành đơn đầu tiên\n\nKhông giới hạn số lượt giới thiệu — giới thiệu càng nhiều càng nhận nhiều!'
    },
    
    // ============================================================
    // === PHỤ PHÍ ===============================================
    // ============================================================
    {
      keywords: ['phụ phí', 'tăng giá', 'thêm tiền', 'phí khẩn cấp', 'phí cuối tuần', 'phí đêm'],
      answer: '💡 Các phụ phí của ViệcNhà247:\n\n⚡ Khẩn cấp <2 giờ: +30%\n🌙 Đêm khuya 22h-6h: +50%\n📅 Cuối tuần / lễ: +20%\n🏢 Tầng cao không thang máy: +50.000đ\n🐶 Có thú cưng: +50.000đ\n\nTất cả phụ phí được báo TRƯỚC khi làm — không bao giờ tính ngầm!'
    },
    {
      keywords: ['cuối tuần có làm', 'thứ 7 chủ nhật', 'làm ngày lễ'],
      answer: '📅 ViệcNhà247 phục vụ 7 ngày/tuần, kể cả lễ tết!\n\nPhụ phí cuối tuần / ngày lễ: +20% giá dịch vụ\n\nVí dụ: dọn nhà 199k → cuối tuần = 239k\n\n💡 Lễ lớn (Tết Âm, 30/4, 2/9...) có thể tăng giá 30-50% do thiếu CTV. Đặt trước 3-7 ngày để đảm bảo có người.'
    },
    
    // ============================================================
    // === PHÍ KHẢO SÁT (CHÍNH SÁCH ĐẶC BIỆT) =====================
    // ============================================================
    {
      keywords: ['phí kiểm tra', 'phí khảo sát', 'có mất phí kiểm tra không', 'kiểm tra có tính tiền'],
      answer: '✨ Chính sách phí khảo sát đặc biệt của ViệcNhà247:\n\n📌 Áp dụng cho: Sửa điện, Sửa nước, Đa năng\n\n✅ KHẢO SÁT TẬN NƠI MIỄN PHÍ — nếu khách làm tiếp!\n\n• Nếu anh/chị ĐỒNG Ý làm sau khi nghe báo giá → KHÔNG tính phí khảo sát\n• Nếu anh/chị CHỈ kiểm tra rồi không làm → tính phí:\n  - Sửa điện: 149k\n  - Sửa nước: 179k\n  - Đa năng: 149k\n\n💡 Đây là chính sách công bằng cho cả khách và CTV. Đối thủ thường tính phí cứng dù làm hay không!'
    },
    
    // ============================================================
    // === BẢO HÀNH ==============================================
    // ============================================================
    {
      keywords: ['bảo hành', 'guarantee', 'lỗi sau khi sửa', 'hỏng lại'],
      answer: '🛡️ Bảo hành ViệcNhà247:\n\n• Sửa điện: 6 tháng\n• Sửa nước: 3 tháng\n• Sửa đa năng: 30 ngày\n• Lắp ráp đồ: 30 ngày\n\nTrong thời gian bảo hành:\n• Lỗi tái phát → CTV cũ đến sửa MIỄN PHÍ\n• Linh kiện hỏng → thay miễn phí\n\nLưu ý: KHÔNG bảo hành lỗi do sử dụng sai cách hoặc tác động bên ngoài.'
    },
    
    // ============================================================
    // === KHIẾU NẠI =============================================
    // ============================================================
    {
      keywords: ['khiếu nại', 'phàn nàn', 'không hài lòng', 'bồi thường', 'đền bù'],
      answer: '⚠️ Quy trình khiếu nại ViệcNhà247:\n\n1. Báo Zalo OA hoặc 1900 6247 trong 24 giờ\n2. Mô tả rõ vấn đề + ảnh/video (nếu có)\n3. Em xử lý trong 48 giờ\n4. Tùy mức độ:\n   • Nhẹ: làm lại miễn phí\n   • Vừa: hoàn 50% tiền\n   • Nặng: hoàn 100% + bồi thường thiệt hại\n\nViệcNhà247 cam kết KHÔNG bao che CTV vi phạm.',
      action: 'open_zalo'
    },
    
    // ============================================================
    // === CTV - TUYỂN DỤNG ======================================
    // ============================================================
    {
      keywords: ['làm ctv', 'đăng ký ctv', 'tuyển ctv', 'làm việc cho', 'apply', 'ứng tuyển', 'tuyển cộng tác'],
      answer: '👷 ViệcNhà247 đang tuyển CTV cho 8 ngành!\n\nQuyền lợi:\n• Hoa hồng 78-82% (cao nhất thị trường)\n• Linh hoạt thời gian — làm khi rảnh\n• Đào tạo bài bản miễn phí\n• Bảo hiểm trách nhiệm\n• Hỗ trợ đồng phục\n\nYêu cầu:\n• 18-55 tuổi, có CMND/CCCD\n• Sức khỏe tốt\n• Có kinh nghiệm hoặc sẵn sàng học\n\nVào trang "Tuyển CTV" để đăng ký nhé!'
    },
    {
      keywords: ['hoa hồng ctv', 'lương ctv', 'thu nhập ctv'],
      answer: '💰 Hoa hồng CTV ViệcNhà247:\n\n• Dọn dẹp, Nấu ăn: 82% (HH 18%)\n• Sửa điện, nước, Đa năng, Chăm sóc, Đi chợ: 80% (HH 20%)\n• Chuyển nhà: 78% (HH 22%)\n\nVí dụ thực tế: CTV dọn nhà làm 8 đơn/ngày × 199k = 1.592k\n→ Thu nhập: 1.592k × 82% = 1.305k/ngày\n→ Tháng 25 ngày: ~32 triệu\n\nĐây là HH cao nhất thị trường (bTaskee chỉ 60-70%).'
    },
    {
      keywords: ['quy trình ứng tuyển', 'thủ tục ctv', 'cần gì để làm ctv'],
      answer: '📝 Quy trình tuyển CTV:\n\n1️⃣ Đăng ký online (form Tuyển CTV)\n2️⃣ Em gọi phỏng vấn (15 phút)\n3️⃣ Đào tạo (1-3 ngày tùy ngành)\n4️⃣ Test thực tế với khách\n5️⃣ Ký hợp đồng + nhận đồng phục\n6️⃣ Nhận đơn ngay!\n\nTổng thời gian: 5-7 ngày từ đăng ký đến đi làm.\n\nGiấy tờ cần: CMND/CCCD + sơ yếu lý lịch.'
    },
    
    // ============================================================
    // === HOẠT ĐỘNG / GIỜ LÀM ===================================
    // ============================================================
    {
      keywords: ['mấy giờ', 'giờ làm việc', 'mở cửa', 'đóng cửa', '24/7', 'làm đêm'],
      answer: '⏰ Giờ hoạt động ViệcNhà247:\n\n📅 Hotline & văn phòng: 7h - 22h hàng ngày\n\n🌙 Sửa điện, sửa nước: 24/7 (kể cả đêm khuya)\n\n☀️ Các dịch vụ khác:\n• Dọn dẹp: 6h - 21h\n• Nấu ăn: 6h - 22h\n• Chuyển nhà: 6h - 18h\n• Chăm sóc: 24/7 (theo hợp đồng)\n• Đi chợ: 6h - 20h\n• Đa năng: 8h - 20h\n\nLàm đêm hoặc sớm có phụ phí (xem chi tiết)'
    },
    
    // ============================================================
    // === CÔNG CỤ / HƯỚNG DẪN ====================================
    // ============================================================
    {
      keywords: ['cần chuẩn bị', 'phải chuẩn bị', 'mang gì', 'cung cấp gì'],
      answer: '✅ Khách KHÔNG cần chuẩn bị gì! CTV mang đủ:\n\n🧹 Dọn dẹp: hóa chất, dụng cụ vệ sinh, máy hút bụi\n⚡ Sửa điện: dụng cụ, linh kiện cơ bản\n💧 Sửa nước: dụng cụ, ống, gioăng\n🚛 Chuyển nhà: xe tải, hộp, băng dính, dây buộc\n🍳 Nấu ăn: dao thớt cá nhân, gia vị riêng (khách lo nguyên liệu)\n🔨 Đa năng: máy khoan, dụng cụ, đinh vít\n\nKhách chỉ cần: ở nhà tiếp đón + nguồn nước/điện.'
    },
    {
      keywords: ['app', 'tải app', 'điện thoại', 'mobile', 'application'],
      answer: '📱 App ViệcNhà247 đang phát triển!\n\nDự kiến launch: Q4/2026\n• iOS App Store\n• Android Play Store\n\nHiện tại anh/chị đặt qua website cũng tiện lợi không kém:\n• Form 5 bước siêu nhanh\n• Báo giá ngay tức thì\n• Theo dõi đơn qua Zalo OA\n\nĐể nhận thông báo khi có app, anh/chị vào trang "Tải app" đăng ký nhé!'
    },
    
    // ============================================================
    // === LIÊN HỆ ================================================
    // ============================================================
    {
      keywords: ['liên hệ', 'số điện thoại', 'hotline', 'gọi', 'phone'],
      answer: '📞 Liên hệ ViệcNhà247:\n\n☎️ Hotline: 1900 6247 (7h-22h hàng ngày)\n💬 Zalo OA: nhắn ViệcNhà247 (24/7)\n📧 Email: info@viecnha247.vn\n📍 Địa chỉ: Sea Office, Quận 7, TPHCM\n\nỞ ngoài giờ hotline, anh/chị nhắn Zalo OA — em sẽ trả lời sớm nhất!',
      action: 'open_zalo'
    },
    {
      keywords: ['zalo', 'facebook', 'fb', 'mạng xã hội', 'kết bạn'],
      answer: '💬 Mạng xã hội ViệcNhà247:\n\n• Zalo OA: tìm "ViệcNhà247" hoặc click bên dưới\n• Facebook: facebook.com/viecnha247\n• Tiktok: @viecnha247\n• Instagram: @viecnha247_vn\n\nFollow để xem mẹo dọn nhà, sửa chữa, nấu ăn miễn phí mỗi ngày!',
      action: 'open_zalo'
    },
    
    // ============================================================
    // === SO SÁNH ĐỐI THỦ =======================================
    // ============================================================
    {
      keywords: ['so với btaskee', 'so với jupviec', 'khác biệt', 'tại sao chọn', 'ưu điểm'],
      answer: '⭐ Tại sao chọn ViệcNhà247?\n\n✨ Khảo sát MIỄN PHÍ (sửa điện/nước/đa năng) - đối thủ tính 100-200k\n💰 Giá charm pricing rõ ràng (199k, 799k...) - không lừa đảo\n🛡️ Bảo hiểm 50tr cho chuyển nhà - đối thủ ít có\n📋 Wizard form 5 bước - đặt trong 60 giây\n🗺️ Tính khoảng cách thực tế (OpenStreetMap) - chính xác đến km\n👥 Hoa hồng CTV cao nhất thị trường (78-82%)\n📞 Phục vụ 24/7 cho sửa điện/nước'
    },
    
    // ============================================================
    // === BẢO MẬT ===============================================
    // ============================================================
    {
      keywords: ['bảo mật', 'an toàn thông tin', 'lộ thông tin', 'spam'],
      answer: '🔒 Bảo mật thông tin tại ViệcNhà247:\n\n✅ KHÔNG bán thông tin cho bên thứ 3\n✅ KHÔNG spam quảng cáo\n✅ Mã hóa SSL/TLS mọi giao dịch\n✅ Server tại Việt Nam + Singapore\n✅ Backup hàng ngày\n✅ Quyền yêu cầu xóa data bất cứ lúc nào\n\nXem chi tiết tại trang "Pháp lý" → "Bảo mật".'
    },
    
    // ============================================================
    // === FALLBACK ==============================================
    // ============================================================
    {
      keywords: ['không hiểu', 'không biết', 'không rõ', 'gì đây', 'cái gì'],
      answer: 'Em xin lỗi vì chưa rõ ý anh/chị 😅 Anh/chị có thể hỏi cụ thể hơn được không?\n\nMột số chủ đề em thường hỗ trợ:\n• Giá 8 dịch vụ\n• Cách đặt lịch\n• Phụ phí, ưu đãi, voucher\n• Bảo hành, hủy đơn\n• Tuyển CTV\n\nHoặc nhắn Zalo OA để gặp người hỗ trợ ạ!',
      action: 'open_zalo'
    },
    
    // ============================================================
    // === CÁC Q&A MỞ RỘNG (nhiều tình huống thực tế) =============
    // ============================================================
    {
      keywords: ['tết', 'mùng 1', '30 tết', 'mùa lễ', 'cao điểm'],
      answer: '🎊 Lễ Tết tại ViệcNhà247:\n\n📅 Vẫn phục vụ những ngày lễ lớn (kể cả Tết)\n💰 Phụ phí dịp lễ:\n• Cuối tuần thường: +20%\n• Tết âm lịch: +30-50%\n• Lễ lớn (30/4, 2/9): +30%\n\n💡 Đặt trước 5-7 ngày để chắc có CTV — dịp Tết thường thiếu người, đặt trễ có thể không đáp ứng được.'
    },
    {
      keywords: ['nhà chung cư', 'căn hộ', 'apartment', 'thang máy', 'cao tầng'],
      answer: '🏢 Phục vụ nhà chung cư:\n\n✅ Có thang máy: KHÔNG phụ phí\n❌ Không có thang máy: +50.000đ/lần (cho mỗi người + đồ phải mang lên)\n\nĐặc biệt cho chuyển nhà:\n• +100k/tầng (nhà cũ)\n• +100k/tầng (nhà mới)\n\n💡 Lưu ý: một số chung cư cấm vận chuyển ngoài giờ. Báo CTV trước để sắp xếp.'
    },
    {
      keywords: ['số căn hộ', 'căn hộ studio', 'phòng trọ', 'nhà nhỏ'],
      answer: '🏠 Phục vụ mọi loại nhà:\n\n• Phòng trọ < 30m²: dọn theo giờ phù hợp nhất\n• Studio 30-50m²: tổng vệ sinh từ 799k\n• Căn hộ 1PN (50-70m²): tổng vệ sinh ~958k\n• Nhà 2-3PN (80-120m²): ~1.198k\n• Biệt thự >120m²: từ 1.598k\n\nBáo diện tích chính xác → em báo giá chuẩn nhé!'
    },
    {
      keywords: ['có ctv nữ', 'ctv nam', 'giới tính ctv', 'chọn ctv'],
      answer: '👥 Chọn CTV theo giới tính:\n\n✅ Anh/chị có quyền yêu cầu CTV nam/nữ\n✅ Em sẽ ưu tiên sắp xếp theo yêu cầu\n\nCác trường hợp đặc biệt:\n• Chăm sóc người cao tuổi nữ → ưu tiên CTV nữ\n• Sửa điện/nước → đa số CTV nam\n• Dọn nhà có bé → ưu tiên CTV nữ có kinh nghiệm\n\nGhi chú yêu cầu khi đặt lịch nhé!'
    },
    {
      keywords: ['máy hút bụi', 'dụng cụ riêng', 'đem máy', 'đem dụng cụ'],
      answer: '🧹 Dụng cụ vệ sinh:\n\nCTV ViệcNhà247 mang đầy đủ:\n• Máy hút bụi công suất cao\n• Máy chà sàn\n• Khăn lau microfiber\n• Hóa chất an toàn (Sunlight, Cif, Mr.Muscle)\n• Găng tay, khẩu trang\n\n💡 Nếu khách muốn dùng hóa chất riêng → cứ chuẩn bị, CTV sẽ dùng theo.'
    },
    {
      keywords: ['lần đầu', 'mới khách', 'first time', 'lần đầu sử dụng', 'chưa dùng bao giờ'],
      answer: '🎁 Khách mới ViệcNhà247 được:\n\n✨ TẶNG voucher 100.000đ cho đơn đầu\n✨ Tư vấn MIỄN PHÍ qua chat/Zalo\n✨ Đảm bảo CTV chất lượng (tỷ lệ 4.5+ sao)\n✨ Hoàn tiền 100% nếu không hài lòng (lần đầu)\n\nĐặt ngay để nhận voucher 100k! Em đã sẵn sàng hỗ trợ ạ.'
    },
    {
      keywords: ['ngon', 'tốt', 'chất lượng', 'đẹp', 'đánh giá'],
      answer: '⭐ Chất lượng ViệcNhà247:\n\n• Đánh giá trung bình: 4.8/5 sao\n• Tỷ lệ khiếu nại: < 2%\n• 95% khách quay lại lần 2\n\n📋 Cam kết:\n• CTV được đào tạo bài bản\n• Có chứng chỉ chuyên ngành\n• Bảo hiểm trách nhiệm\n• Đồng phục, bảng tên rõ ràng\n• Hoàn tiền nếu không hài lòng'
    },
    {
      keywords: ['rẻ hơn', 'giá rẻ', 'discount', 'thương lượng', 'mặc cả', 'bớt giá'],
      answer: '💰 Về giá ViệcNhà247:\n\nGiá đã được tối ưu hợp lý — KHÔNG mặc cả lẻ tẻ.\n\nNhưng anh/chị có thể TIẾT KIỆM bằng cách:\n• 🎁 Voucher đơn đầu: -100.000đ\n• 📅 Hợp đồng tháng: -15%\n• 👥 Giới thiệu bạn: +50.000đ vào tài khoản\n• 📲 Đặt vào ngày thường (không cuối tuần): tiết kiệm 20%\n• ⏰ Tránh giờ cao điểm 17-19h: không bị +30% khẩn cấp'
    },
    {
      keywords: ['so với thuê riêng', 'thuê người ngoài', 'tự thuê', 'app khác'],
      answer: '🤔 So với thuê người ngoài:\n\nThuê người ngoài (1tr/ngày):\n❌ Không bảo hiểm\n❌ Không kiểm tra lý lịch\n❌ Không bảo hành\n❌ Tự xử lý nếu có sự cố\n\nViệcNhà247 (~700-1tr/ngày):\n✅ Bảo hiểm trách nhiệm\n✅ CTV được kiểm tra CMND/lý lịch\n✅ Bảo hành 30 ngày - 6 tháng\n✅ Có người hỗ trợ 24/7\n\nGiá tương đương nhưng AN TOÀN hơn nhiều!'
    },
    {
      keywords: ['tip', 'thưởng', 'hài lòng thì', 'cho thêm tiền'],
      answer: '💸 Về tiền tip cho CTV:\n\n✅ KHÔNG bắt buộc tip\n✅ Nếu hài lòng, anh/chị có thể tip 20-50k là đẹp rồi\n✅ Tip tăng động lực CTV phục vụ tốt hơn\n\n💡 Cách tốt nhất để cảm ơn CTV:\n• Đánh giá 5 sao trên hệ thống\n• Yêu cầu CTV này lần sau\n• Giới thiệu cho bạn bè'
    },
    {
      keywords: ['phim người lớn', 'sex', 'mại dâm', 'massage'],
      answer: '⚠️ ViệcNhà247 chỉ cung cấp dịch vụ gia đình hợp pháp:\n\n• Dọn dẹp, sửa chữa, chuyển nhà, nấu ăn, chăm sóc\n• KHÔNG có dịch vụ massage / spa cá nhân\n• KHÔNG có dịch vụ nào khác ngoài 8 ngành đã liệt kê\n\nNếu anh/chị cần tư vấn 1 trong 8 dịch vụ chính, em sẵn sàng hỗ trợ!'
    },
    {
      keywords: ['hôm nay', 'ngay bây giờ', 'gấp', 'liền', 'asap'],
      answer: '⚡ Đặt lịch GẤP trong ngày:\n\nViệcNhà247 nhận đơn ngay tức thì:\n• Sửa điện/nước: CTV đến trong 30-60 phút\n• Dọn nhà, đa năng: 2-4 giờ\n• Chuyển nhà, nấu ăn: 4-8 giờ (tùy size)\n\n💡 Phụ phí khẩn cấp <2h: +30%\n\nAnh/chị mở form đặt lịch ngay nhé! Em sẽ ưu tiên xử lý.'
    },
    {
      keywords: ['mở form', 'đặt ngay', 'lên lịch', 'book luôn'],
      answer: '✅ Để đặt lịch ngay, anh/chị cuộn xuống mục "Đặt dịch vụ" trên trang chủ, hoặc click nút bên dưới:',
      action: 'open_form:don-dep'
    },
    {
      keywords: ['nhân viên trực', 'có người trả lời', 'hotline có người', 'gặp người thật'],
      answer: '👤 Để gặp nhân viên thật:\n\n📞 Gọi 1900 6247 (7h-22h)\n💬 Nhắn Zalo OA (24/7) - phản hồi trong 5 phút\n📧 Email info@viecnha247.vn (trong ngày)\n\nEm là chatbot tự động, có thể trả lời 80% câu hỏi cơ bản. Nếu cần tư vấn chuyên sâu, anh/chị nhắn Zalo OA nhé!',
      action: 'open_zalo'
    }
  ];
  
  // ===== STATE =====
  let chatHistory = [];
  let isOpen = false;
  
  // ===== INITIAL GREETING =====
  const GREETING = 'Xin chào! 👋 Em là Trợ lý ViệcNhà247.\n\nEm có thể giúp anh/chị tư vấn về 8 dịch vụ và đặt lịch nhanh chóng. Anh/chị cần dịch vụ gì hôm nay ạ?';
  
  const QUICK_SUGGESTIONS = [
    '🧹 Giá dọn nhà',
    '🚛 Chuyển nhà bao nhiêu?',
    '⚡ Sửa điện 24/7?',
    '👴 Chăm sóc người già'
  ];
  
  // ===== TÌM CÂU TRẢ LỜI =====
  function findAnswer(userMessage) {
    const msg = userMessage.toLowerCase().trim();
    
    // Tính điểm match cho mỗi entry
    let bestMatch = null;
    let bestScore = 0;
    
    for (const entry of KNOWLEDGE_BASE) {
      let score = 0;
      for (const keyword of entry.keywords) {
        if (msg.includes(keyword.toLowerCase())) {
          // Từ khóa dài hơn → điểm cao hơn
          score += keyword.length;
        }
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }
    
    if (bestMatch && bestScore > 0) {
      return bestMatch;
    }
    
    // Fallback: không hiểu
    return {
      answer: 'Em xin lỗi, em chưa hiểu rõ câu hỏi của anh/chị 😅\n\nAnh/chị có thể:\n• Hỏi cụ thể hơn (vd: "giá dọn nhà 70m²")\n• Hoặc nhắn Zalo OA để gặp nhân viên hỗ trợ trực tiếp\n• Hoặc gọi hotline 1900 6247',
      action: 'open_zalo'
    };
  }
  
  // ===== TẠO CHAT WIDGET HTML =====
  function createChatHTML() {
    const container = document.createElement('div');
    container.id = 'chatContainer';
    container.innerHTML = `
      <button class="chat-fab" id="chatFab" aria-label="Mở chat trợ lý">
        💬
        <span class="badge" id="chatBadge">1</span>
      </button>
      
      <div class="chat-panel" id="chatPanel" role="dialog" aria-label="Chat với ViệcNhà247">
        <div class="chat-header">
          <div class="chat-avatar">🏠</div>
          <div class="chat-header-text">
            <div class="chat-header-title">Trợ lý ViệcNhà247</div>
            <div class="chat-header-status">Đang online · Trả lời ngay</div>
          </div>
          <button class="chat-close" id="chatClose" aria-label="Đóng chat">✕</button>
        </div>
        
        <div class="chat-messages" id="chatMessages"></div>
        
        <div class="chat-suggestions" id="chatSuggestions"></div>
        
        <div class="chat-input-wrap">
          <textarea 
            class="chat-input" 
            id="chatInput" 
            placeholder="Nhập câu hỏi..."
            rows="1"
            aria-label="Nhập tin nhắn"
          ></textarea>
          <button class="chat-send" id="chatSend" aria-label="Gửi">→</button>
        </div>
        
        <div class="chat-footer">
          Cần hỗ trợ trực tiếp? Nhắn 
          <a href="${ZALO_OA_URL}" target="_blank">Zalo OA</a> hoặc 
          <a href="${MESSENGER_URL}" target="_blank">Messenger</a>
        </div>
      </div>
    `;
    document.body.appendChild(container);
  }
  
  // ===== HIỂN THỊ TIN NHẮN =====
  function renderMessage(role, text, action) {
    const messagesEl = document.getElementById('chatMessages');
    if (!messagesEl) return;
    
    const msgEl = document.createElement('div');
    msgEl.className = `chat-msg ${role === 'user' ? 'user' : 'bot'}`;
    
    const avatar = role === 'user' ? 'B' : '🏠';
    
    let actionButton = '';
    if (action) {
      if (action.startsWith('open_form:')) {
        const serviceId = action.replace('open_form:', '');
        actionButton = `<br><a class="chat-action-btn" href="#dat-lich" onclick="window.openWizardForService && window.openWizardForService('${serviceId}'); return true;">📋 Mở form đặt lịch</a>`;
      } else if (action === 'open_zalo') {
        actionButton = `<br><a class="chat-action-btn" href="${ZALO_OA_URL}" target="_blank">💬 Mở Zalo OA</a>`;
      }
    }
    
    const safeText = escapeHTML(text);
    const formattedText = safeText
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    msgEl.innerHTML = `
      <div class="chat-msg-avatar">${avatar}</div>
      <div class="chat-msg-bubble">${formattedText}${actionButton}</div>
    `;
    
    messagesEl.appendChild(msgEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  
  function escapeHTML(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  // ===== TYPING INDICATOR =====
  function showTyping() {
    const messagesEl = document.getElementById('chatMessages');
    if (!messagesEl) return;
    
    const typingEl = document.createElement('div');
    typingEl.className = 'chat-typing';
    typingEl.id = 'chatTyping';
    typingEl.innerHTML = `
      <div class="chat-typing-dot"></div>
      <div class="chat-typing-dot"></div>
      <div class="chat-typing-dot"></div>
    `;
    messagesEl.appendChild(typingEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  
  function hideTyping() {
    const t = document.getElementById('chatTyping');
    if (t) t.remove();
  }
  
  // ===== RENDER QUICK SUGGESTIONS =====
  function renderSuggestions() {
    const sugEl = document.getElementById('chatSuggestions');
    if (!sugEl) return;
    
    if (chatHistory.length > 1) {
      sugEl.style.display = 'none';
      return;
    }
    
    sugEl.innerHTML = QUICK_SUGGESTIONS.map(s => 
      `<button class="chat-suggest" data-text="${s.replace(/[🧹🚛⚡👴]\s*/g, '')}">${s}</button>`
    ).join('');
    
    sugEl.querySelectorAll('.chat-suggest').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.text;
        sendMessage(text);
      });
    });
  }
  
  // ===== GỬI TIN NHẮN =====
  function sendMessage(text) {
    if (!text) return;
    text = text.trim();
    if (!text) return;
    
    // Hiển thị tin user
    renderMessage('user', text);
    chatHistory.push({ role: 'user', content: text });
    
    // Clear input
    const input = document.getElementById('chatInput');
    if (input) {
      input.value = '';
      input.style.height = 'auto';
    }
    
    // Ẩn suggestions
    const sugEl = document.getElementById('chatSuggestions');
    if (sugEl) sugEl.style.display = 'none';
    
    // Show typing với delay 600ms để cảm giác tự nhiên
    showTyping();
    
    setTimeout(() => {
      hideTyping();
      const result = findAnswer(text);
      renderMessage('assistant', result.answer, result.action);
      chatHistory.push({ role: 'assistant', content: result.answer });
    }, 600 + Math.random() * 400);  // 600-1000ms ngẫu nhiên
  }
  
  // ===== TOGGLE CHAT =====
  function toggleChat(forceState) {
    const panel = document.getElementById('chatPanel');
    const fab = document.getElementById('chatFab');
    const badge = document.getElementById('chatBadge');
    if (!panel || !fab) return;
    
    if (forceState !== undefined) {
      isOpen = forceState;
    } else {
      isOpen = !isOpen;
    }
    
    if (isOpen) {
      panel.classList.add('open');
      fab.style.display = 'none';
      
      if (badge) badge.style.display = 'none';
      
      if (chatHistory.length === 0) {
        renderMessage('assistant', GREETING);
        chatHistory.push({ role: 'assistant', content: GREETING });
        renderSuggestions();
      }
      
      setTimeout(() => {
        const input = document.getElementById('chatInput');
        if (input) input.focus();
      }, 300);
    } else {
      panel.classList.remove('open');
      fab.style.display = '';
    }
  }
  
  // ===== EVENT LISTENERS =====
  function setupEventListeners() {
    document.getElementById('chatFab').addEventListener('click', () => toggleChat(true));
    document.getElementById('chatClose').addEventListener('click', () => toggleChat(false));
    
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSend');
    
    sendBtn.addEventListener('click', () => sendMessage(input.value));
    
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input.value);
      }
    });
    
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });
  }
  
  // ===== HELPER: Mở wizard form với dịch vụ chọn sẵn =====
  window.openWizardForService = window.openWizardForService || function(serviceId) {
    setTimeout(() => {
      const formSection = document.getElementById('dat-lich');
      if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
      
      const card = document.querySelector(`.service-card-wizard[data-service="${serviceId}"]`);
      if (card) {
        document.querySelectorAll('.service-card-wizard').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        if (window.wizardState) {
          window.wizardState.service = serviceId;
        }
      }
      
      toggleChat(false);
    }, 200);
  };
  
  // ===== INIT =====
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    createChatHTML();
    setupEventListeners();
    
    setTimeout(() => {
      const badge = document.getElementById('chatBadge');
      if (badge && !isOpen) {
        badge.style.animation = 'pulse 1.5s infinite';
      }
    }, 3000);
  }
  
  init();
  
})();
