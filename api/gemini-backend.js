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
    
    const hour = (new Date().getUTCHours() + 7) % 24; 
    let greeting = "Dạ ViệcNhà247 xin chào!";
    if (hour >= 5 && hour < 12) greeting = "Chào buổi sáng anh/chị! Chúc mình ngày mới năng lượng.";
    else if (hour >= 12 && hour < 18) greeting = "Chào buổi chiều anh/chị!";
    else greeting = "Chào buổi tối anh/chị!";

    let reply = "";

    // NHẬN DIỆN SỐ ĐIỆN THOẠI
    const phoneRegex = /(0[3|5|7|8|9][0-9]{8}|0[2][0-9]{9})\b/g;
    const cleanMsg = rawMsg.replace(/[\.\-\s]/g, '');
    const foundPhones = cleanMsg.match(phoneRegex);

    if (foundPhones) {
      reply = `✅ **Xác nhận đã nhận SĐT:** Em đã ghi nhận số **${foundPhones[0]}**. Chuyên viên tư đồng sẽ gọi lại ngay để báo giá ưu đãi ạ!`;
    }
    // NHÓM KHẨN CẤP
    else if (/(gấp|gap|ngay|cháy|nổ|ngập|nghet|tắc|cúp điện|hỏng)/i.test(msg)) {
      reply = `🚨 **ƯU TIÊN KHẨN CẤP:** Anh/chị gọi ngay Hotline **1900 6247**. Thợ sẽ có mặt sau 30-60 phút để xử lý ạ!`;
    }
    // NHÓM GIÁ CẢ
    else if (/(giá|bao nhiêu|nhiêu|tiền|phí|99k|199k|giảm giá)/i.test(msg)) {
      reply = `💰 **Bảng giá ViệcNhà247:**\n- Dọn dẹp: 199k/ca\n- Sửa điện/nước: từ 199k\n- Đi chợ: 99k\n🎁 Nhập mã **MOI100** giảm 100k đơn đầu!`;
    }
    // NHÓM CHÀO HỎI & MẶC ĐỊNH
    else if (/(chào|hi|hello|alo|ơi)/i.test(msg)) {
      reply = `${greeting} Em có thể giúp gì cho anh/chị về Bảng giá hay Đặt lịch không ạ?`;
    }
    else {
      reply = "Dạ em chưa rõ ý này, anh/chị vui lòng để lại **SĐT** hoặc gọi **1900 6247** để em hỗ trợ nhanh nhất ạ!";
    }

    return res.status(200).json({ reply: reply });
  } catch (error) {
    return res.status(500).json({ reply: "Hệ thống bận, gọi 1900 6247 nhé!" });
  }
}}
