// =========================================================================
// VERCEL FUNCTION — CHAT API (X.AI GROK VERSION)
// =========================================================================

const SYSTEM_PROMPT = `Bạn là Trợ lý ảo của ViệcNhà247 — nền tảng dịch vụ gia đình tận tâm tại TPHCM.
(Dán toàn bộ nội dung System Prompt dài của bạn vào đây)`; 

export default async function handler(req, res) {
  // 1. CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { messages } = req.body;
    
    const API_KEY = process.env.GROK_API_KEY;
    
    if (!API_KEY) {
      return res.status(500).json({ error: 'Grok API key chưa được cấu hình' });
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
          ...messages
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Grok Error:', errorData);
      return res.status(500).json({ 
        reply: 'Hệ thống đang bận. Anh/chị nhắn Zalo ViệcNhà247 nhé! [ACTION:OPEN_ZALO]' 
      });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;
    
    return res.status(200).json({ reply });
    
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ reply: 'Em xin lỗi, có lỗi kỹ thuật xảy ra ạ. [ACTION:OPEN_ZALO]' });
  }
}
