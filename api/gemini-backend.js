export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { messages } = req.body;
    if (!messages || messages.length === 0) return res.status(400).end();

    const rawMsg = messages[messages.length - 1].content;
    const msg = rawMsg.toLowerCase();
    let reply = "";

    // 1. PHÁT HIỆN SỐ ĐIỆN THOẠI (ƯU TIÊN TUYỆT ĐỐI)
    const cleanMsg = rawMsg.replace(/[\.\-\s]/g, '');
    const phoneRegex = /(0[3|5|7|8|9][0-9]{8}|0[2][0-9]{9})/g;
    const foundPhones = cleanMsg.match(phoneRegex);

    if (foundPhones) {
      reply = `✅ **Hệ thống đã ghi nhận:** Cảm ơn anh/chị, số điện thoại **${foundPhones[0]}** đã được chuyển đến bộ phận điều phối. Em sẽ gọi lại tư vấn chi tiết cho mình ngay đây ạ!`;
    }

    // 2. NHÓM KHẨN CẤP & SỰ CỐ NẶNG (Gấp, cháy nổ, ngập lụt...)
    else if (/(gấp|ngay|lập tức|khẩn cấp|cháy|nổ|ngập|bể ống|tràn|cúp điện|chập|hỏa hoạn|mùi khét|rò rỉ gas|nghẹt bồn cầu|tắc cống)/i.test(msg)) {
      reply = `🚨 **TÌNH TRẠNG KHẨN CẤP:** Dạ anh/chị bình tĩnh nhé! Để xử lý ngay lập tức, mình vui lòng gọi Hotline **1900 6247**. Đội ngũ kỹ thuật trực chiến sẽ có mặt tại nhà mình sau 15-30 phút ạ!`;
    }

    // 3. NHÓM DỌN DẸP & VỆ SINH SÂU (Mở rộng từ khóa)
    else if (/(dọn|vệ sinh|quét|lau|nhà mới|xây dựng|hút bụi|định kỳ|theo giờ|giặt ghế|sofa|nệm|rèm|thảm|kính|máy hút mùi|nhà bếp|toilet|wc|sạch|ngăn nắp)/i.test(msg)) {
      reply = `🧹 **Dịch vụ Vệ sinh Tận tâm:**\n- Dọn lẻ theo giờ: 99k/h.\n- Giặt Sofa/Nệm/Rèm: từ 299k.\n- Tổng vệ sinh (Deep Clean): từ 799k.\nAnh/chị muốn dọn dẹp định kỳ hay dọn một lần cho nhà mới ạ?`;
    }

    // 4. ĐIỆN - NƯỚC - ĐIỆN LẠNH (Sửa chữa chuyên sâu)
    else if (/(điện|nước|vòi|bóng đèn|ổ cắm|máy lạnh|máy giặt|tủ lạnh|điều hòa|bình nóng lạnh|bom nước|thay dây|lắp quạt|vệ sinh máy lạnh|bơm gas|không lạnh|kêu to)/i.test(msg)) {
      reply = `❄️⚡ **Kỹ thuật Điện Lạnh - Điện Nước:**\n- Vệ sinh máy lạnh: 150k - 250k.\n- Sửa chữa hư hỏng: Khảo sát tận nơi miễn phí (nếu sửa).\nAnh/chị cho em biết tình trạng máy đang bị sao để em báo thợ mang đồ nghề phù hợp nhé!`;
    }

    // 5. CHUYỂN NHÀ & XE TẢI (Mở rộng địa giới)
    else if (/(chuyển nhà|dọn đồ|xe tải|vận chuyển|xe cẩu|bốc xếp|đóng gói|thùng carton|liên tỉnh|vũng tàu|bình dương|tphcm|trọn gói|kho bãi)/i.test(msg)) {
      reply = `🚛 **Vận chuyển ViệcNhà247:**\n- Xe tải chuyển đồ: từ 799k.\n- Trọn gói bốc xếp: báo giá sau khảo sát.\n✨ Em đang có ưu đãi miễn phí 5km đầu tiên cho mình đó ạ. Mình định dọn vào ngày nào ạ?`;
    }

    // 6. NẤU ĂN - ĐI CHỢ - CƠM TRƯA (Cho người bận rộn)
    else if (/(nấu ăn|đầu bếp|đi chợ|siêu thị|bách hóa xanh|thực phẩm|cơm tháng|tiệc|giỗ|liên hoan|thực đơn|healthy|eat clean|ăn kiêng)/i.test(msg)) {
      reply = `🍳 **Bếp gia đình ViệcNhà247:**\n- Phí đi chợ: 79k - 99k.\n- Nấu ăn tại gia: từ 249k/bữa.\n- Cơm tháng đảm bảo dinh dưỡng.\nBên em có thể nấu theo khẩu vị riêng của nhà mình (Bắc - Trung - Nam) luôn ạ!`;
    }

    // 7. CHĂM SÓC NGƯỜI THÂN (Chuyên sâu y tế)
    else if (/(chăm sóc|người già|người bệnh|ông bà|bệnh viện|nuôi bệnh|điều dưỡng|vật lý trị liệu|tiêm tại nhà|thay băng|rửa vết thương|mẹ bé|sau sinh)/i.test(msg)) {
      reply = `👴 **Dịch vụ Chăm sóc Sức khỏe:**\n- Nhân viên có bằng điều dưỡng/y sĩ.\n- Trực bệnh viện/Tại gia: từ 799k/ngày.\nAnh/chị cần người chăm sóc nam hay nữ, và có yêu cầu chuyên môn đặc biệt nào không ạ?`;
    }

    // 8. ĐA NĂNG - TIỆN ÍCH KHÁC (IKEA, khoan tường, lắp rèm...)
    else if (/(khoan|treo|tranh|rèm|cửa|khóa|ikea|lắp ráp|đồ gỗ|sơn|chống thấm|thông tắc|hút hầm cầu|diệt côn trùng|mối|gián)/i.test(msg)) {
      reply = `🔨 **Dịch vụ Đa năng:**\n- Lắp ráp/Treo đồ: từ 199k.\n- Chống thấm/Sơn sửa: báo giá theo hiện trạng.\nViệc gì khó, cứ để ViệcNhà247 lo ạ! Anh/chị gửi ảnh qua Zalo để em báo giá nhanh nhé.`;
    }

    // 9. GIÁ CẢ - CHIẾT KHẤU - HỢP ĐỒNG (Logic tài chính)
    else if (/(giá|bao nhiêu|nhiêu|tiền|phí|đắt|rẻ|giảm giá|khuyến mãi|voucher|mã|hợp đồng|vat|hóa đơn|uy tín|lừa đảo|tốt không)/i.test(msg)) {
      reply = `💎 **Chính sách Minh bạch:**\n- Giá niêm yết, không phát sinh vô lý.\n- Nhập mã **MOI100** giảm 100k.\n- Có hóa đơn VAT cho công ty.\nBên em cam kết hoàn tiền 100% nếu anh/chị không hài lòng về chất lượng ạ!`;
    }

    // 10. CHÀO HỎI & CẢM XÚC (Thân thiện)
    else if (/(chào|hi|hello|alo|ơi|cảm ơn|thanks|tạm biệt|bye|giỏi|thông minh)/i.test(msg)) {
      reply = `${greeting} Dạ em cảm ơn anh/chị! Em luôn sẵn sàng hỗ trợ mình đặt lịch dọn dẹp, sửa chữa hoặc vận chuyển. Mình cần em tư vấn gì thêm không ạ?`;
    }

    // 11. CÂU HỎI VỀ KHU VỰC (Địa giới mới)
    else if (/(địa chỉ|ở đâu|quận|huyện|thủ đức|bình chánh|hóc môn|củ chi|nhà bè|vũng tàu|bình dương|tphcm)/i.test(msg)) {
      reply = `📍 **Khu vực phục vụ:** ViệcNhà247 phục vụ toàn bộ TPHCM và các khu vực lân cận (Bình Dương, Vũng Tàu). Chỉ cần anh/chị đặt lịch, thợ gần nhất sẽ có mặt sau 30 phút ạ!`;
    }

    // 12. MẶC ĐỊNH (KHI KHÔNG KHỚP)
    else {
      reply = `Dạ em xin lỗi vì chưa hiểu rõ ý mình. Anh/chị có thể nói rõ hơn về nhu cầu (VD: dọn nhà, sửa nước, chuyển đồ...) hoặc để lại **SĐT** để em gọi hỗ trợ trực tiếp không ạ? 😊`;
    }

    return res.status(200).json({ reply: reply });
  } catch (error) {
    return res.status(500).json({ reply: "Hệ thống đang bảo trì nhẹ, anh/chị vui lòng gọi Hotline 1900 6247 để được phục vụ ngay ạ!" });
  }
}
