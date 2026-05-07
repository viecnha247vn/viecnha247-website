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

    // 1. NHẬN DIỆN SỐ ĐIỆN THOẠI (Hotline Lead)
    const cleanMsg = rawMsg.replace(/[\.\-\s]/g, '');
    const phoneRegex = /(0[3|5|7|8|9][0-9]{8}|0[2][0-9]{9})/g;
    const foundPhones = cleanMsg.match(phoneRegex);

    if (foundPhones) {
      reply = `✅ **Đã nhận thông tin:** ViệcNhà247 sẽ gọi lại cho số **${foundPhones[0]}** trong ít phút nữa để tư vấn và chốt lịch ưu đãi cho mình ạ!`;
    }

    // 2. DỊCH VỤ DỌN DẸP (Cleaning - Bám sát 99k/h)
    else if (/(dọn|vệ sinh|quét|lau|hút bụi|định kỳ|theo giờ|tổng vệ sinh|nhà mới|xây dựng|nhà trống|studio|căn hộ|chung cư|biệt thự|văn phòng)/i.test(msg)) {
      reply = `🧹 **Dịch vụ Vệ sinh ViệcNhà247:**\n- **Dọn theo giờ:** 99.000đ/giờ (ca tối thiểu 2h).\n- **Tổng vệ sinh:** Từ 799.000đ (tùy diện tích).\n- **Sau xây dựng:** Từ 1.499.000đ.\n✨ *Ưu đãi:* Giảm 15% cho khách ký hợp đồng định kỳ tuần/tháng. Nhà mình cần dọn diện tích bao nhiêu m2 ạ?`;
    }

    // 3. SỬA ĐIỆN - NƯỚC (Bám sát phí khảo sát 149k/179k)
    else if (/(điện|nước|vòi|tắc|nghẹt|chập|ổ cắm|bóng đèn|bơm|tủ điện|rò rỉ|bể ống|thông cống|lavabo|bồn cầu|phao)/i.test(msg)) {
      reply = `⚡💧 **Sửa chữa Điện Nước:**\n✨ **Chính sách khảo sát:** Miễn phí khảo sát nếu anh/chị đồng ý sửa. Nếu chỉ kiểm tra rồi không làm, phí là 149k (Điện) hoặc 179k (Nước).\n- **Tiền công:** Chỉ từ 199.000đ.\nAnh/chị đang gặp sự cố gì, mình để lại SĐT thợ bên em gọi tư vấn ngay ạ!`;
    }

    // 4. ĐIỆN LẠNH (Máy lạnh, tủ lạnh, máy giặt)
    else if (/(máy lạnh|điều hòa|tủ lạnh|máy giặt|vệ sinh máy lạnh|bơm gas|không lạnh|chảy nước|kêu to|tháo lắp máy lạnh)/i.test(msg)) {
      reply = `❄️ **Điện lạnh chuyên nghiệp:**\n- **Vệ sinh máy lạnh:** 150k/bộ (treo tường), 250k/bộ (âm trần).\n- **Bơm gas:** Chỉ từ 100k.\n- **Sửa chữa:** Báo giá sau khi kiểm tra hiện trạng.\nBên em có mặt sau 30 phút khu vực TPHCM ạ!`;
    }

    // 5. CHUYỂN NHÀ & VẬN CHUYỂN (Bám sát gói 799k)
    else if (/(chuyển nhà|dọn đồ|vận chuyển|xe tải|xe cẩu|bốc xếp|trọn gói|thuê xe|chuyển trọ|liên tỉnh|thùng carton)/i.test(msg)) {
      reply = `🚛 **Vận tải ViệcNhà247:**\n- **Gói chỉ vận chuyển:** Từ 799.000đ.\n- **Gói trọn gói (gồm bốc xếp):** Từ 2.999.000đ.\n🎁 *Đặc biệt:* Miễn phí 5km đầu tiên. Mình cần dọn từ quận nào sang quận nào để em báo giá ạ?`;
    }

    // 6. NẤU ĂN & ĐI CHỢ (Bám sát 249k)
    else if (/(nấu ăn|đầu bếp|đi chợ|siêu thị|mua đồ|thực phẩm|cơm gia đình|tiệc|giỗ|cơm tháng)/i.test(msg)) {
      reply = `🍳 **Bếp gia đình:**\n- **Cơm gia đình:** Từ 249.000đ/bữa.\n- **Đi chợ hộ:** 79k - 99k/lượt.\n- **Cơm tháng:** 5.999.000đ (30 bữa).\nĐầu bếp có chứng chỉ ATTP, nấu theo khẩu vị riêng của nhà mình ạ!`;
    }

    // 7. CHĂM SÓC NGƯỜI THÂN (Bám sát 74k/h)
    else if (/(chăm sóc|người già|người bệnh|ông bà|nuôi bệnh|bệnh viện|điều dưỡng|vật lý trị liệu|mẹ bé|sau sinh)/i.test(msg)) {
      reply = `👴 **Chăm sóc Sức khỏe:**\n- **Theo giờ:** 74.000đ/giờ (ca từ 4h).\n- **Tại gia/Bệnh viện (24/7):** Từ 799.000đ/ngày.\nNhân viên bên em có chuyên môn y tế, tận tâm và chu đáo ạ.`;
    }

    // 8. ĐA NĂNG (IKEA, khoan tường, lắp rèm, sơn sửa)
    else if (/(khoan|treo|lắp|ikea|rèm|khóa|cửa|sơn|chống thấm|giặt sofa|nệm|thảm|diệt mối|gián|côn trùng)/i.test(msg)) {
      reply = `🔨 **Dịch vụ Đa năng:**\n- **Khoan tường/Lắp ráp:** Từ 199.000đ.\n- **Giặt Sofa/Nệm:** Từ 299.000đ.\n- **Diệt côn trùng:** Báo giá theo diện tích.\nAnh/chị cần xử lý việc gì, cứ nhắn em nhé!`;
    }

    // 9. KHUYẾN MÃI - BẢO HÀNH - TIN CẬY
    else if (/(khuyến mãi|giảm giá|voucher|mã|bảo hành|uy tín|tốt không|lừa đảo|hóa đơn|vat|công ty)/i.test(msg)) {
      reply = `💎 **Cam kết ViệcNhà247:**\n- Tặng **100k** cho khách mới (Mã: MOI100).\n- Bảo hành kỹ thuật 6 tháng.\n- Có hóa đơn VAT cho doanh nghiệp.\n- Hoàn tiền nếu khách không hài lòng ạ!`;
    }

    // 10. CHÀO HỎI & KHU VỰC
    else if (/(chào|hi|hello|alo|ơi|địa chỉ|ở đâu|quận|vũng tàu|bình dương)/i.test(msg)) {
      reply = `Dạ chào anh/chị! ViệcNhà247 phục vụ 24/7 tại TPHCM, Bình Dương và Vũng Tàu. Anh/chị cần đặt lịch dọn dẹp, sửa chữa hay chuyển nhà ạ?`;
    }

    // 11. MẶC ĐỊNH
    else {
      reply = `Dạ em đã nhận thông tin. Anh/chị vui lòng để lại **Số Điện Thoại** hoặc gọi Hotline **1900 6247** để chuyên viên tư vấn báo giá chính xác nhất theo bảng giá mới nhất ạ! 😊`;
    }

    return res.status(200).json({ reply: reply });
  } catch (error) {
    return res.status(500).json({ reply: "Hệ thống bận, mình gọi 1900 6247 nhé!" });
  }
}
