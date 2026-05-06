# 📂 HƯỚNG DẪN UPLOAD CHATBOT — RÕ RÀNG TỪNG FILE

## 🎯 TÊN FILE ĐÃ ĐỔI ĐỂ DỄ PHÂN BIỆT

| File mới | Đặt ở đâu | Tác dụng |
|---|---|---|
| **`chat-widget-frontend.js`** | 📁 Thư mục gốc (cùng cấp với index.html) | Vẽ giao diện chat — chạy trên trình duyệt khách |
| **`gemini-backend.js`** | 📁 Trong folder `api/` | Gọi Gemini API + giữ key bí mật — chạy trên server |

---

## 🗂️ CẤU TRÚC FILE TRÊN GITHUB SAU KHI UPLOAD ĐÚNG

```
viecnha247-website/                    ← Repo gốc
│
├── 📄 index.html
├── 📄 dich-vu.html
├── 📄 bang-gia.html
├── 📄 blog.html
├── 📄 lien-he.html
├── 📄 phap-ly.html
├── 📄 tuyen-ctv.html
├── 📄 ve-app.html
├── 📄 ve-chung-toi.html
├── 📄 styles.css
├── 📄 chat-widget-frontend.js    ← FILE FRONTEND (bên ngoài)
├── 📄 favicon.svg
├── 📄 package.json
├── 📄 vercel.json
│
└── 📁 api/                       ← FOLDER tên là "api"
    └── 📄 gemini-backend.js      ← FILE BACKEND (bên trong folder api)
```

⚠️ **Quan trọng:**
- `chat-widget-frontend.js` đặt **ngang hàng** với `index.html`
- `gemini-backend.js` phải đặt **trong folder `api/`**

---

## 🔍 TẠI SAO PHẢI 2 FILE? (giải thích đơn giản)

### File frontend (`chat-widget-frontend.js`)
- 👁️ **Khách thấy được** → đặt ngoài cũng được, không bí mật
- Vẽ bong bóng chat, ô nhập tin nhắn, hiển thị trả lời
- Chạy trên trình duyệt của khách hàng

### File backend (`api/gemini-backend.js`)
- 🔒 **PHẢI bí mật** vì chứa code gọi Gemini API
- Có chứa `process.env.GEMINI_API_KEY` (đọc API key từ Vercel)
- Nếu để bên ngoài → ai cũng thấy → bị lạm dụng API key
- Vercel **bắt buộc** đặt trong folder `api/` để biến nó thành "Serverless Function"

---

## 🎬 LUỒNG HOẠT ĐỘNG (1 lượt chat)

```
Bước 1: Khách click bong bóng 💬
   ↓
   chat-widget-frontend.js mở chat box ra

Bước 2: Khách gõ "Có dọn nhà không?"
   ↓
   chat-widget-frontend.js gửi tin nhắn này
   đến địa chỉ /api/gemini-backend
   ↓
Bước 3: Server Vercel chạy gemini-backend.js
   ↓
   Lấy API key từ Environment Variables
   ↓
   Gọi Google Gemini với câu hỏi của khách
   ↓
Bước 4: Gemini trả lời "Dạ có ạ! ViệcNhà247 có 3 gói..."
   ↓
   gemini-backend.js gửi câu trả lời về browser
   ↓
Bước 5: chat-widget-frontend.js hiển thị câu trả lời
   ↓
   Khách thấy bot trả lời 🎉
```

---

## 🚀 CÁCH UPLOAD ĐÚNG (Step-by-step)

### Cách 1: Upload từ folder (nhanh nhất)

1. Mở folder `website-v17-checkfee` trên máy bạn
2. Bạn sẽ thấy:
   - 13 file ở folder gốc (HTML, CSS, JS, JSON, SVG)
   - 1 folder `api/` chứa file `gemini-backend.js` ← QUAN TRỌNG
3. Vào GitHub repo `viecnha247-website`
4. **"Add file"** → **"Upload files"**
5. **Kéo TOÀN BỘ folder** (cả `api/` lẫn các file ngoài) vào trang upload
   - GitHub sẽ tự upload và GIỮ NGUYÊN cấu trúc thư mục
6. Cuộn xuống → **"Commit changes"**

### Cách 2: Upload từng file (nếu cách 1 không được)

#### Phần A: Upload các file ngoài
1. **"Add file"** → **"Upload files"**
2. Chọn 13 file: HTML × 9, styles.css, chat-widget-frontend.js, package.json, vercel.json, favicon.svg
3. Commit

#### Phần B: Tạo folder `api/` + file backend
1. **"Add file"** → **"Create new file"**
2. Trong ô tên file, gõ chính xác: `api/gemini-backend.js`
   - ⚠️ **PHẢI có dấu `/`** — đó là cách GitHub tự tạo folder
3. Mở file `api/gemini-backend.js` từ máy → copy toàn bộ nội dung
4. Paste vào ô nội dung trên GitHub
5. **"Commit new file"**

---

## ✅ KIỂM TRA UPLOAD ĐÚNG CHƯA

Sau khi commit, vào trang chính của repo `viecnha247-website`. Bạn phải thấy:

✅ **ĐÚNG:**
```
📁 api                        ← Có folder api/
📄 chat-widget-frontend.js
📄 dich-vu.html
📄 favicon.svg
📄 index.html
📄 package.json
📄 styles.css
📄 vercel.json
... (các file khác)
```

Click vào folder `api/` → Phải thấy file `gemini-backend.js` bên trong.

❌ **SAI:**
```
📄 api-gemini-backend.js      ← KHÔNG có folder, file đặt ngoài
📄 api/gemini-backend.js      ← Hiện thành tên file dài (folder không tạo được)
```

→ Nếu thấy SAI, làm lại theo Cách 2 phần B.

---

## 🔑 SETUP API KEY GEMINI TRÊN VERCEL

1. Vào: **https://aistudio.google.com/apikey**
2. Tạo API key (miễn phí)
3. Vào Vercel → project `viecnha247-website` → **Settings** → **Environment Variables**
4. Thêm:
   - **Key:** `GEMINI_API_KEY` (chính xác viết hoa)
   - **Value:** dán API key
   - **Tích cả 3:** Production + Preview + Development
5. **Save**
6. Tab **Deployments** → **"..."** trên deployment mới nhất → **Redeploy**

---

## 🧪 TEST CHATBOT

1. Mở: `viecnha247-website.vercel.app`
2. Góc phải dưới → bong bóng vàng cam 💬
3. Click → chat box mở
4. Gõ: "Có dịch vụ dọn nhà không?"
5. Bot trả lời thông minh = THÀNH CÔNG! 🎉

---

## ❓ TROUBLESHOOTING NHANH

| Lỗi | Nguyên nhân | Fix |
|---|---|---|
| Bong bóng không hiện | `chat-widget-frontend.js` chưa upload | Upload lại file này |
| Click bong bóng → không có gì | File bị lỗi syntax | Upload lại từ ZIP gốc |
| Bot không trả lời | `api/gemini-backend.js` chưa có hoặc API key sai | Kiểm tra folder `api/` + Environment Variables |
| Lỗi 404 | Folder `api/` chưa được tạo đúng | Làm lại Cách 2 phần B |
| Lỗi 500 | API key sai/hết hạn | Tạo API key mới |

---

## 📝 GHI CHÚ TÊN FILE NGẮN GỌN

Để bạn dễ nhớ:

🎨 **chat-widget-frontend.js** = "FRONT" = mặt tiền, khách hàng thấy
🔒 **gemini-backend.js** = "BACK" = phía sau, ẩn, lo việc với Gemini

→ "FRONT" ngoài, "BACK" trong folder `api/`.

---

✅ **Done!** Có gì khó nhắn mình ngay! 💪
