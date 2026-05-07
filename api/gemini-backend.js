// =========================================================================
// VERCEL FUNCTION — GROK API (xAI)
// =========================================================================

const SYSTEM_PROMPT = `Bạn là Trợ lý ảo của ViệcNhà247 — nền tảng dịch vụ gia đình tận tâm tại TPHCM.
Slogan: "Dịch vụ gia đình tận tâm, đúng giờ".
Phục vụ các dịch vụ: Dọn dẹp nhà cửa (99k/h), Sửa điện nước, Chuyển nhà, Nấu ăn, Chăm sóc người già, Đi chợ hộ.
Phong cách: Ấm áp, thân thiện, ngắn gọn. Xưng em, gọi khách là anh/chị.`;

export default async function handler(req, res) {
  // Cấu hình CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages } = req.body;
    
    // Lấy Key từ biến môi trường trên Vercel
    const API_KEY = process.env.GROK_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: 'Chưa cấu hình GROK_API_KEY trên Vercel' });
    }

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "grok-beta",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map(m => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content
          }))
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Grok Error:', data);
      return res.status(500).json({ 
        reply: 'Hệ thống đang bảo trì một chút, anh/chị nhắn Zalo giúp em nhé!' 
      });
    }

    const reply = data.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Fetch Error:', err);
    return res.status(500).json({ reply: 'Lỗi kết nối. Vui lòng thử lại sau.' });
  }
}
