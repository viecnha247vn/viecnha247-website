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

    // 1. CHỐT SĐT (Ghi nhận Lead)
    const cleanMsg = rawMsg.replace(/[\.\-\s]/g, '');
    const phoneRegex = /(0[3|5|7|8|9][0-9]{8}|0[2][0-9]{9})/g;
    const foundPhones = cleanMsg.match(phoneRegex);

    if (foundPhones) {
      reply = `✅ **ViệcNhà247 Đã Nhận:** Em đã lưu số **${foundPhones[0]}**. Chuyên viên tư vấn sẽ gọi lại ngay để xác nhận lịch và áp dụng mã giảm giá 100k cho mình ạ!`;
    }

    // 2. DỊCH VỤ DỌN DẸP & PHỤ PHÍ (Bám sát Website)
    else if (/(dọn|vệ sinh|quét|lau|hút bụi|định kỳ|theo giờ|nhà mới|xây dựng|studio|căn hộ|chung cư|biệt thự|văn phòng|m2|diện tích|tầng|lầu)/i.test(msg)) {
      reply = `🧹 **Vệ sinh Gia đình & Công nghiệp:**\n- **Theo giờ:** 99k/h (từ 2h).\n- **Nhà trống/Mới dọn đến:** từ 799k.\n- **Sau xây dựng:** từ 1.499k.\n⚠️ *Lưu ý:* Diện tích >120m2 hoặc nhà nhiều lầu sẽ có hệ số nhân phí. Nhà mình là chung cư hay nhà phố, diện tích khoảng bao nhiêu m2 ạ?`;
    }

    // 3. SỬA ĐIỆN & CẢNH BÁO (149k)
    else if (/(điện|chập|ổ cắm|bóng đèn|bảng điện|tủ điện|mất điện|phao điện|cúp điện|hỏng điện|thay dây|cb|aptomat)/i.test(msg)) {
      reply = `⚡ **Sửa chữa Điện:**\n- **Khảo sát:** 149.000đ (Miễn phí nếu sửa).\n- **Công sửa:** từ 199.000đ.\n⚠️ *Khẩn cấp:* Nếu thấy mùi khét hoặc chập cháy, mình hãy ngắt cầu dao tổng ngay. Anh/chị để lại SĐT thợ bên em tới sau 20 phút ạ!`;
    }

    // 4. SỬA NƯỚC & THÔNG TẮC (179k)
    else if (/(nước|tắc|nghẹt|rò rỉ|bể ống|lavabo|bồn cầu|vòi|phao cơ|bồn nước|thông cống|hầm cầu|thoát sàn)/i.test(msg)) {
      reply = `💧 **Sửa chữa Nước & Thông nghẹt:**\n- **Khảo sát:** 179.000đ (Miễn phí nếu sửa).\n- **Lắp đặt/Sửa:** từ 249.000đ.\nBên em có máy lò xo thông tắc hiện đại, không đục phá. Mình đang bị nghẹt bồn cầu hay bồn rửa chén ạ?`;
    }

    // 5. ĐIỆN LẠNH (Vệ sinh máy lạnh 150k)
    else if (/(máy lạnh|điều hòa|tủ lạnh|máy giặt|vệ sinh máy lạnh|bơm gas|không lạnh|chảy nước|âm trần)/i.test(msg)) {
      reply = `❄️ **Điện lạnh 24/7:**\n- **Vệ sinh:** 150k (treo tường), 250k (âm trần/tủ đứng).\n- **Tháo lắp:** từ 450k.\n- **Sửa lỗi:** báo giá sau kiểm tra.\nThợ bên em có thang dây, làm việc cả nhà cao tầng. Mình cần vệ sinh bao nhiêu máy ạ?`;
    }

    // 6. VẬN CHUYỂN & CHUYỂN NHÀ (799k - trọn gói)
    else if (/(chuyển nhà|dọn đồ|xe tải|bốc xếp|trọn gói|thuê xe|chuyển trọ|vận chuyển|thùng carton|liên tỉnh|xe cẩu)/i.test(msg)) {
      reply = `🚛 **Vận chuyển & Chuyển nhà:**\n- **Xe vận chuyển:** từ 799.000đ (dưới 5km).\n- **Trọn gói A-Z:** từ 2.999.000đ (gồm đóng gói, bốc xếp).\n🏠 *Phụ phí:* +100k/lầu nếu không có thang máy. Mình dọn từ đâu qua đâu ạ?`;
    }

    // 7. NẤU ĂN - ĐI CHỢ - CƠM THÁNG (249k)
    else if (/(nấu ăn|đầu bếp|đi chợ|mua đồ|thực phẩm|cơm gia đình|tiệc|giỗ|cơm tháng|healthy|an toàn)/i.test(msg)) {
      reply = `🍳 **Bếp gia đình:**\n- **Bữa cơm (4 người):** 249.000đ.\n- **Đi chợ hộ:** 79k - 99k/lượt.\n- **Cơm tháng:** 5.999.000đ/tháng.\nĐầu bếp có chứng chỉ, đi chợ siêu thị đảm bảo tươi sạch. Nhà mình muốn ăn theo vị miền nào ạ?`;
    }

    // 8. CHĂM SÓC NGƯỜI THÂN (74k/h)
    else if (/(chăm sóc|người già|người bệnh|ông bà|nuôi bệnh|bệnh viện|điều dưỡng|vật lý trị liệu|mẹ bé)/i.test(msg)) {
      reply = `👴 **Chăm sóc Tận tâm:**\n- **Theo giờ:** 74.000đ/h.\n- **Lưu trú 24/7:** từ 799.000đ/ngày.\nNhân viên có chuyên môn y tế, thay băng, rửa vết thương, tập vật lý trị liệu tại nhà. Anh/chị cần chăm tại nhà hay bệnh viện ạ?`;
    }

    // 9. DỊCH VỤ ĐA NĂNG & NỘI THẤT (IKEA, khoan tường)
    else if (/(khoan|treo|ikea|rèm|khóa|cửa|giặt sofa|nệm|thảm|diệt mối|gián|chuột|sơn|chống thấm)/i.test(msg)) {
      reply = `🔨 **Đa năng & Tiện ích:**\n- **Lắp ráp/Khoan tường:** từ 199.000đ.\n- **Giặt Sofa/Nệm:** từ 299.000đ.\n- **Diệt côn trùng:** từ 499.000đ.\nMình cần khoan bao nhiêu lỗ hoặc lắp đồ của hãng nào ạ?`;
    }

    // 10. PHỤ PHÍ & QUY ĐỊNH CHUNG (Cuối tuần, ngoài giờ)
    else if (/(phụ phí|thêm tiền|ngoài giờ|đêm|cuối tuần|thứ 7|chủ nhật|lễ|tết|hủy đơn|thanh toán)/i.test(msg)) {
      reply = `💳 **Quy định Phụ phí:**\n- **Cuối tuần/Lễ:** +20%.\n- **Sau 20h:** +50k - 100k tùy dịch vụ.\n- **Hủy đơn:** Miễn phí trước 2 tiếng.\nMình có thể thanh toán tiền mặt hoặc chuyển khoản cho thợ sau khi xong việc ạ.`;
    }

    // 11. CÂU HỎI TIN CẬY (Lừa đảo, uy tín, bảo hành)
    else if (/(uy tín|tốt không|lừa đảo|bảo hành|trách nhiệm|mất đồ|công ty|địa chỉ|mã số thuế)/i.test(msg)) {
      reply = `💎 **Cam kết ViệcNhà247:**\n- **Bảo hành:** 6 tháng cho điện nước.\n- **Trách nhiệm:** Đền bù 100% nếu hỏng hóc/mất đồ.\n- **Nhân sự:** Hồ sơ lý lịch rõ ràng. Anh/chị hoàn toàn yên tâm khi sử dụng dịch vụ của hệ thống ạ!`;
    }

    // 12. CHÀO HỎI & HỖ TRỢ CHUNG
    else if (/(chào|hi|hello|alo|ơi|tư vấn|giúp|đâu rồi)/i.test(msg)) {
      reply = `Dạ em đây! Chào mừng anh/chị đến với ViệcNhà247. Anh/chị cần em hỗ trợ báo giá Dọn dẹp, Điện nước hay Chuyển nhà ngay bây giờ ạ? 😊`;
    }

    // 13. MẶC ĐỊNH (Khi máy không hiểu - Chốt SĐT)
    else {
      reply = `Dạ, để tư vấn chính xác nhất theo Bảng giá 2026, anh/chị vui lòng để lại **Số Điện Thoại** hoặc gọi Hotline **1900 6247**. Em sẽ chuyển thông tin cho chuyên viên hỗ trợ mình ngay ạ!`;
    }

    return res.status(200).json({ reply: reply });
  } catch (error) {
    return res.status(500).json({ reply: "Dạ hệ thống bận, mình gọi 1900 6247 để em giúp ngay nhé!" });
  }
}
