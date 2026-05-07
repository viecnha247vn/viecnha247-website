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

    // 1. NHẬN DIỆN SỐ ĐIỆN THOẠI (Ưu tiên số 1)
    const cleanMsg = rawMsg.replace(/[\.\-\s]/g, '');
    const phoneRegex = /(0[3|5|7|8|9][0-9]{8}|0[2][0-9]{9})/g;
    const foundPhones = cleanMsg.match(phoneRegex);

    if (foundPhones) {
      reply = `✅ **Xác nhận:** ViệcNhà247 đã nhận SĐT **${foundPhones[0]}**. Chuyên viên sẽ gọi lại tư vấn và báo giá ưu đãi cho mình sau 5-10 phút ạ! ✨`;
    }

    // 2. DỊCH VỤ DỌN DẸP (Dọn nhà, vệ sinh, quét dọn...)
    else if (/(dọn|vệ sinh|quét|lau|nhà mới|sau xây dựng|hút bụi|định kỳ|theo giờ)/i.test(msg)) {
      reply = `🧹 **Dịch vụ Dọn dẹp:**\n- Gói theo giờ: 99k/giờ (tối thiểu 2h)\n- Tổng vệ sinh: từ 799k\n- Sau xây dựng: từ 1.499k\nNhà mình cần dọn diện tích khoảng bao nhiêu m2 để em báo giá chính xác ạ?`;
    }

    // 3. ĐIỆN - NƯỚC - ĐA NĂNG (Hỏng hóc, sửa chữa...)
    else if (/(điện|nước|vòi|tắc|nghẹt|bóng đèn|chập|ổ cắm|máy lạnh|máy giặt|tủ lạnh|sửa)/i.test(msg)) {
      reply = `⚡💧 **Sửa chữa Điện Nước:**\n✨ Đặc biệt: **KHẢO SÁT TẬN NƠI MIỄN PHÍ** nếu anh/chị đồng ý làm tiếp.\n- Phí sửa: chỉ từ 199k.\nAnh/chị đang gặp sự cố gì, mình để lại SĐT để kỹ thuật viên gọi tư vấn ngay nhé!`;
    }

    // 4. CHUYỂN NHÀ (Dọn đồ, vận chuyển, xe tải...)
    else if (/(chuyển nhà|dọn đồ|xe tải|vận chuyển|sang nhà mới|thuê xe)/i.test(msg)) {
      reply = `🚛 **Chuyển nhà trọn gói:**\n- Gói vận chuyển: từ 799k\n- Gói trọn gói A-Z: từ 2.999k\n🎁 Bảo hiểm hàng hóa lên đến 50 triệu đồng. Mình dọn từ quận nào sang quận nào ạ?`;
    }

    // 5. NẤU ĂN - ĐI CHỢ (Cơm gia đình, tiệc, thực phẩm...)
    else if (/(nấu ăn|đầu bếp|đi chợ|mua đồ|thực phẩm|cơm tháng|tiệc)/i.test(msg)) {
      reply = `🍳🛒 **Nấu ăn & Đi chợ:**\n- Bữa cơm gia đình: từ 249k\n- Đi chợ hộ: phí từ 79k\n- Cơm tháng (30 bữa): 5.999k\nĐầu bếp bên em đều có chứng chỉ ATTP nên mình yên tâm tuyệt đối ạ!`;
    }

    // 6. CHĂM SÓC NGƯỜI GIÀ (Người cao tuổi, điều dưỡng...)
    else if (/(chăm sóc|người già|người cao tuổi|ông bà|bệnh viện|nuôi bệnh|điều dưỡng)/i.test(msg)) {
      reply = `👴 **Chăm sóc người cao tuổi:**\n- Theo giờ: 74k/giờ\n- 24/7 (tại gia hoặc BV): từ 799k/ngày\nNhân viên bên em có chuyên môn điều dưỡng, tận tâm như người nhà ạ.`;
    }

    // 7. KHUYẾN MÃI - QUY TRÌNH - CHÍNH SÁCH
    else if (/(khuyến mãi|giảm giá|voucher|mã|bảo hành|uy tín|hợp đồng)/i.test(msg)) {
      reply = `🎁 **Ưu đãi ViệcNhà247:**\n- Tặng ngay **100k** cho đơn hàng đầu tiên (Mã: MOI100).\n- Giảm 15% cho hợp đồng định kỳ tháng.\n- Bảo hành dịch vụ sửa chữa lên đến 6 tháng ạ!`;
    }

    // 8. CHÀO HỎI & HỖ TRỢ CHUNG
    else if (/(chào|hi|hello|alo|ơi|tư vấn|giúp)/i.test(msg)) {
      reply = `Dạ ViệcNhà247 xin chào! Em có thể giúp mình đặt lịch: Dọn dẹp, Sửa điện nước, Chuyển nhà hay Chăm sóc người già ạ? 😊`;
    }

    // 9. MẶC ĐỊNH (Khi không hiểu)
    else {
      reply = `Dạ hiện tại em đang tiếp nhận thông tin cho 8 dịch vụ chính: Dọn dẹp, Điện nước, Chuyển nhà, Nấu ăn, Chăm sóc người già... Anh/chị cần tư vấn mảng nào hoặc để lại **SĐT** em gọi lại ngay ạ!`;
    }

    return res.status(200).json({ reply: reply });
  } catch (error) {
    return res.status(500).json({ reply: "Dạ hệ thống đang bận một chút, anh/chị gọi trực tiếp Hotline 1900 6247 nhé!" });
  }
}
