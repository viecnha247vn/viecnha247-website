# 🤖 HƯỚNG DẪN SETUP CHATBOT AI — VIỆC NHÀ 247

## 📦 BỘ FILE BẠN VỪA NHẬN

```
website-v16-chatbot/
├── 9 file HTML (đã thêm chat.js)
├── styles.css (đã thêm CSS chat)
├── chat.js (chat widget UI)
├── favicon.svg
├── api/
│   └── chat.js  ← Vercel Function (backend gọi Gemini)
├── vercel.json  ← config Vercel Function
└── package.json ← cần cho Vercel
```

---

## 🎯 BẠN CẦN LÀM 4 BƯỚC

### Bước 1: Lấy Gemini API Key (5 phút - MIỄN PHÍ)

1. Vào: **https://aistudio.google.com/apikey**
2. Đăng nhập bằng tài khoản **Google** của bạn
3. Click nút **"Create API Key"** (Tạo khóa API)
4. Chọn project hoặc tạo project mới (đặt tên: "ViecNha247")
5. Copy API key — nó dạng: `AIzaSyXxXxXxXxXxXx...`

⚠️ **Lưu ý:** API key này **BÍ MẬT** — không share cho ai!

---

### Bước 2: Upload code lên GitHub

1. Vào repo `viecnha247-website` trên GitHub
2. **Add file** → **Upload files**
3. Kéo thả:
   - 9 file HTML (đè cũ)
   - `styles.css` (đè cũ)
   - `chat.js` (file mới)
   - `vercel.json` (file mới)
   - `package.json` (file mới)
   - `favicon.svg`
4. **Tạo folder `api/`** trên GitHub:
   - Click "Create new file"
   - Tên file: `api/chat.js` (gõ "api/" rồi tên file → GitHub tự tạo folder)
   - Copy nội dung từ file `api/chat.js` đã tạo, paste vào
   - Commit
5. Vercel sẽ deploy tự động

---

### Bước 3: Thêm API Key vào Vercel (QUAN TRỌNG NHẤT!)

API key KHÔNG được up lên GitHub. Phải đặt trong Vercel Environment Variables:

1. Vào: **https://vercel.com** → đăng nhập
2. Click vào project **viecnha247-website**
3. Click tab **Settings** (cài đặt)
4. Bên trái, click **Environment Variables**
5. Thêm biến mới:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** dán API key Gemini bạn vừa lấy ở Bước 1
   - **Environments:** Tích cả 3 (Production, Preview, Development)
6. Click **Save**
7. Quay lại tab **Deployments** → click "..." trên deployment mới nhất → **Redeploy**

→ Đợi 1-2 phút Vercel redeploy là xong.

---

### Bước 4: Test chatbot (2 phút)

1. Mở: https://viecnha247-website.vercel.app
2. Phía dưới góc phải có **bong bóng chat 💬** màu vàng cam
3. Click vào → Chat box mở ra
4. Test các câu sau:
   - "Có dịch vụ dọn nhà không?"
   - "Chuyển nhà từ Q.7 đến Q.1 bao nhiêu?"
   - "Sửa điện 24/7 không?"
   - "Tôi cần chăm sóc mẹ già"

→ Nếu bot trả lời thông minh, hỏi thêm thông tin → bạn đã thành công!

---

## ⚙️ TÙY CHỈNH SAU KHI HOẠT ĐỘNG

### A. Cập nhật link Zalo OA / Messenger thật

Hiện tại trong file `chat.js` có 2 dòng:
```javascript
const ZALO_OA_URL = 'https://zalo.me/[YOUR_ZALO_OA_ID]';
const MESSENGER_URL = 'https://m.me/[YOUR_FB_PAGE]';
```

Sau khi tạo Zalo OA + Facebook Page:
1. Mở `chat.js` trên GitHub
2. Click icon ✏️ Edit
3. Thay `[YOUR_ZALO_OA_ID]` → ID Zalo OA thật của bạn
4. Thay `[YOUR_FB_PAGE]` → username Facebook Page
5. Commit → Vercel auto deploy

### B. Tạo Zalo Official Account (chính thức)

1. Vào: **https://oa.zalo.me**
2. Đăng ký bằng SĐT chính chủ
3. Chọn loại OA: **Doanh nghiệp**
4. Điền thông tin: ViệcNhà247 Co., Ltd.
5. Sau khi duyệt (1-3 ngày), bạn nhận được link OA
6. Cập nhật vào `chat.js`

### C. Tạo Facebook Page

1. Vào: **https://facebook.com/pages/create**
2. Loại: **Local Business** → Home Service
3. Tên: ViệcNhà247
4. Sau khi tạo, lấy username dạng: `facebook.com/viecnha247`
5. Cập nhật vào `chat.js`

---

## 💰 CHI PHÍ DỰ KIẾN

### Gói FREE Gemini 2.0 Flash:
- ✅ **15 request/phút** (đủ cho 10-15 user đồng thời)
- ✅ **1.500 request/ngày**
- ✅ **1 triệu token/ngày**

→ **Đủ cho ~300-500 cuộc chat/ngày**, hoàn toàn miễn phí!

### Khi vượt giới hạn (sau khi launch lớn):

**Pay-as-you-go Gemini 2.0 Flash:**
- $0.075 / 1M input tokens
- $0.30 / 1M output tokens

**Ước tính:** 1.000 cuộc chat/ngày = ~30-50k VND/ngày = ~1-1.5 triệu/tháng.

→ Vẫn rẻ hơn lương 1 nhân viên CSKH (5-7tr/tháng).

---

## 🛡️ BẢO MẬT

### ✅ Những gì đã làm:
- API key chỉ đặt ở Vercel Environment (không leak ra client)
- CORS chỉ cho phép request từ domain của bạn
- Bot KHÔNG thu thập tên/SĐT/địa chỉ trong chat — đẩy về form

### ⚠️ Những gì bạn cần làm:
- KHÔNG share API key
- Theo dõi usage tại: https://aistudio.google.com (nếu thấy bất thường → reset key)
- Nếu có scam: thêm rate limit (mỗi IP tối đa 100 message/ngày)

---

## 🎨 GIAO DIỆN MẶC ĐỊNH

### Ở mọi trang:
- **Bong bóng tròn** 💬 màu vàng cam ở góc phải dưới
- Có **badge đỏ** thu hút (số 1)
- Animation **pulse** nhẹ sau 3 giây

### Khi click:
- Chat panel hiện ra (bottom-right, 380×560px)
- Header có avatar 🏠 + tên "Trợ lý ViệcNhà247" + status "Đang online"
- Greeting tự động + 4 quick suggestions
- Input field + nút gửi

### Tin nhắn:
- **Tin của bot:** màu trắng, bên trái, có avatar 🏠
- **Tin của user:** gradient vàng cam, bên phải, avatar "B"
- **Action button:** xuất hiện khi bot dẫn về form đặt lịch / Zalo

---

## 🤖 BOT BIẾT GÌ?

System Prompt đã train bot biết:
- ✅ **Tất cả 8 dịch vụ** + giá chính xác
- ✅ **Charm pricing** (199k, 149k, 799k, ...)
- ✅ **Phụ phí** (50k, 30%, 50%, 20%)
- ✅ **Ưu đãi** (voucher 100k, hợp đồng tháng -15%, giới thiệu 50k+50k)
- ✅ **Quy trình đặt lịch** (5 bước wizard)
- ✅ **Vùng phục vụ** TPHCM mở rộng (gồm Bình Dương, BR-VT cũ)
- ✅ **Cách dẫn về form** đặt lịch
- ✅ **Khi nào chuyển sang Zalo** (câu khó, khiếu nại)

---

## 🔧 TÙY CHỈNH BOT

### Bạn muốn bot trả lời theo cách khác?

Mở file **`api/chat.js`**, tìm biến `SYSTEM_PROMPT`. Đây là "bộ não" của bot.

**Ví dụ tinh chỉnh:**
- Đổi giọng điệu: "ấm áp, thân thiện" → "chuyên nghiệp, ngắn gọn"
- Thêm dịch vụ mới: thêm phần mô tả vào prompt
- Thêm chính sách: thêm các điều khoản

→ Sau khi sửa, commit GitHub → Vercel auto deploy → bot dùng prompt mới.

---

## 📊 GIÁM SÁT HOẠT ĐỘNG

### Xem stats Gemini:
1. Vào: https://aistudio.google.com
2. Settings → Usage
3. Xem số request, token đã dùng

### Xem logs Vercel Function:
1. Vào Vercel Dashboard
2. Project → Functions tab
3. Click "chat" → xem logs

---

## ❓ TROUBLESHOOTING

### "Bot không trả lời" hoặc "Lỗi 500"
**Nguyên nhân:** API key chưa setup hoặc sai

**Cách fix:**
1. Vào Vercel Settings → Environment Variables
2. Kiểm tra `GEMINI_API_KEY` có chưa
3. Nếu có → kiểm tra key có đúng không (vào https://aistudio.google.com test)
4. Redeploy lại

### "Bot trả lời sai giá"
**Nguyên nhân:** System prompt chưa update giá mới

**Cách fix:**
1. Mở `api/chat.js`
2. Cập nhật giá trong phần `SYSTEM_PROMPT`
3. Commit → Redeploy

### "Bot trả lời lan man, không tập trung"
**Nguyên nhân:** Cần tinh chỉnh prompt

**Cách fix:**
- Tăng `temperature` (0.3-0.5) cho ngắn gọn hơn
- Giảm `maxOutputTokens` từ 500 xuống 300
- Thêm vào prompt: "TRẢ LỜI TỐI ĐA 3 CÂU"

### "Vượt rate limit"
**Cách fix:**
- Đợi 1-2 phút rồi thử lại
- Nếu thường xuyên: nâng cấp lên Pay-as-you-go (vẫn rẻ ~1tr/tháng)

---

## 🎯 LỢI ÍCH BẠN CÓ

### Trước khi có chatbot:
- Khách phải gọi hotline → mất tiền + có giờ
- Câu hỏi đơn giản (giá, dịch vụ) chiếm 80% cuộc gọi → mệt nhân viên
- Khách ngoài giờ làm việc → mất

### Sau khi có chatbot:
- ✅ Trả lời 24/7, miễn phí (gói free)
- ✅ Chuyển khoảng 70-80% câu hỏi đơn giản về AI
- ✅ Khách ngoài giờ vẫn được tư vấn → tăng đơn
- ✅ Lead chất lượng hơn (khách đã hiểu giá → đặt lịch là quyết tâm thật)

### Cạnh tranh:
- 🥇 ViệcNhà247 là **NỀN TẢNG ĐẦU TIÊN** trong ngành home service VN có chatbot AI 24/7
- bTaskee, JupViec, Rada đều CHƯA có
- → Lợi thế cạnh tranh lớn về UX

---

## 💡 GỢI Ý NÂNG CẤP TƯƠNG LAI

### Phase 2 (sau 3-6 tháng):
- 📊 **Analytics:** Theo dõi câu hỏi thường gặp → cải thiện FAQ
- 🎯 **Personalization:** Bot nhớ tên khách quay lại
- 📞 **Voice:** Cho phép nói thay vì gõ
- 🎨 **Custom branding:** Đổi avatar bot từ 🏠 sang ảnh thật

### Phase 3 (sau 1 năm):
- 🔄 **Tích hợp database:** Bot có thể xem lịch sử đặt đơn của khách
- 🎁 **Promotion:** Bot tự gợi ý voucher cho khách quay lại
- 🌐 **Đa ngôn ngữ:** Hỗ trợ tiếng Anh cho khách nước ngoài

---

## 📞 CẦN HỖ TRỢ?

Có vấn đề gì khi setup → nhắn lại trong chat với mình (Claude). Mình sẽ debug giúp!

**Chúc bạn deploy thành công!** 🚀

---

*File này tạo ngày 05/05/2026.*
