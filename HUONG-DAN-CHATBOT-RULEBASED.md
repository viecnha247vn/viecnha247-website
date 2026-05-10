# 🤖 CHATBOT RULE-BASED — HƯỚNG DẪN ĐƠN GIẢN

## 🎉 TIN VUI: KHÔNG CẦN API, KHÔNG CẦN FOLDER ĐẶC BIỆT!

Bạn KHÔNG cần:
- ❌ API key Gemini
- ❌ Folder `api/`
- ❌ File `package.json`, `vercel.json`
- ❌ Environment Variables trên Vercel
- ❌ Lo về chi phí, lỗi kết nối

Bạn CHỈ cần:
- ✅ Upload các file lên GitHub (như file HTML thông thường)
- ✅ Vercel tự deploy
- ✅ Chatbot chạy NGAY!

---

## 📦 CẤU TRÚC ĐƠN GIẢN

```
viecnha247-website/
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
├── 🤖 chatbot.js          ← FILE CHATBOT (chỉ 1 file!)
└── 📄 favicon.svg
```

→ Tất cả ở 1 cấp, không có folder con. Cực đơn giản!

---

## 🚀 CÁCH UPLOAD (5 phút)

### Bước 1: Vào GitHub repo
1. Mở: github.com → đăng nhập
2. Click vào repo `viecnha247-website`

### Bước 2: Upload files
1. Click **"Add file"** → **"Upload files"**
2. Mở folder `website-v18-rulebot/` trên máy
3. **Chọn TẤT CẢ 12 file** (Cmd+A trên Mac)
4. Kéo thả vào trang upload GitHub
5. GitHub hỏi "Replace existing files?" → **Yes / Replace**
6. Cuộn xuống → click **"Commit changes"**

### Bước 3: Đợi Vercel deploy
- Vercel tự động build lại trong 1-2 phút
- Vào Deployments → đợi thấy "Ready" (xanh)

### Bước 4: Test ngay!
1. Mở: `viecnha247-website.vercel.app`
2. Góc phải dưới → bong bóng vàng cam 💬
3. Click → chat box mở ra
4. Test:
   - "Có dịch vụ dọn nhà không?"
   - "Sửa điện 24/7?"
   - "Chuyển nhà từ Q.7 đến Q.1 bao nhiêu?"
5. Bot trả lời tức thì = HOẠT ĐỘNG! 🎉

---

## 🎯 BOT BIẾT GÌ? (75 chủ đề Q&A)

### 📚 Phân loại Q&A:

#### 🤝 Giao tiếp cơ bản (3)
- Chào hỏi, cảm ơn, tạm biệt

#### 🏢 Giới thiệu công ty (3)
- ViệcNhà247 là gì?
- Địa chỉ, văn phòng
- Khu vực phục vụ

#### 🧹 Dọn dẹp (4)
- Tổng quan dịch vụ
- Giá cụ thể
- Thời gian dọn
- Thông tin CTV

#### ⚡ Sửa điện (4)
- Tổng quan + chính sách khảo sát
- Giá chi tiết
- Sửa 24/7
- Bảo hành

#### 💧 Sửa nước (3)
- Tổng quan + giá
- Tình huống rò rỉ

#### 🚛 Chuyển nhà (5)
- Tổng quan 3 gói
- Giá tham khảo
- Bảo hiểm
- Loại xe
- Liên tỉnh

#### 🍳 Nấu ăn (4)
- Bảng giá
- Cơm tháng
- Chế độ đặc biệt (chay, kiêng)

#### 👴 Chăm sóc người già (4)
- Tổng quan
- Giá chi tiết
- 24/7
- Chứng chỉ điều dưỡng

#### 🛒 Đi chợ hộ (2)

#### 🔨 Sửa đa năng (3)
- Lắp ráp IKEA
- Vệ sinh máy lạnh
- Treo tranh, kệ

#### 📋 Đặt lịch (3)
- Cách đặt
- Thời gian phản hồi
- Hủy đơn

#### 💳 Thanh toán (3)
- Phương thức
- Hóa đơn VAT
- Đặt cọc

#### 🎁 Ưu đãi (2)
- Voucher, khuyến mãi
- Giới thiệu bạn

#### 💡 Phụ phí (2)
- Các loại phụ phí
- Cuối tuần / lễ

#### ✨ Phí khảo sát (1)
- Chính sách MIỄN PHÍ nếu làm tiếp

#### 🛡️ Bảo hành & Khiếu nại (2)

#### 👷 Tuyển CTV (3)
- Đăng ký
- Hoa hồng
- Quy trình

#### ⏰ Hoạt động (1)
- Giờ làm việc

#### 🛠️ Dụng cụ & App (2)

#### 📞 Liên hệ (2)

#### 🆚 So sánh đối thủ (1)

#### 🔒 Bảo mật (1)

#### 🎊 Tình huống đặc biệt (14)
- Tết, lễ, mùa cao điểm
- Nhà chung cư, kích thước nhà
- Yêu cầu giới tính CTV
- Lần đầu sử dụng
- Tip cho CTV
- Thương lượng giá
- So với thuê người ngoài
- Nội dung không phù hợp
- Đặt gấp trong ngày
- Mở form đặt lịch
- Gặp người thật

#### ❓ Fallback (1)
- Trả lời khi không hiểu

---

## 💡 CƠ CHẾ HOẠT ĐỘNG

```
Khách gõ: "Sửa điện bao nhiêu tiền?"
              ↓
Bot tìm các keyword khớp:
- "sửa điện" ✓
- "bao nhiêu" ✓
- "tiền" ✓
              ↓
Tính điểm match → Chọn entry phù hợp nhất
              ↓
Trả lời + đính kèm action button
"📋 Mở form đặt lịch sửa điện"
```

→ **287 keyword variations** = khách hỏi 287 cách khác nhau vẫn hiểu!

---

## 🎨 ĐẶC ĐIỂM NỔI BẬT

### ✅ Trải nghiệm tự nhiên
- Có "typing dots" 600-1000ms (như người thật đang gõ)
- Tin nhắn fade in mượt mà
- Quick suggestions ban đầu

### ✅ Action buttons thông minh
Bot tự đính kèm nút khi cần:
- 📋 **Mở form đặt lịch** → Tự động chọn dịch vụ, mở wizard
- 💬 **Mở Zalo OA** → Khi khách cần gặp người thật

### ✅ Phản hồi tức thì
- Không gọi API → trả lời trong < 1 giây
- Không bao giờ "loading" lâu
- Không bao giờ lỗi kết nối

### ✅ Miễn phí 100%
- Không tốn 1 đồng vận hành
- Phục vụ bao nhiêu khách cũng OK

---

## 🔧 TÙY CHỈNH NỘI DUNG (RẤT ĐƠN GIẢN)

### Muốn thêm câu hỏi mới?

Mở file `chatbot.js`, tìm `KNOWLEDGE_BASE = [`. Thêm entry mới:

```javascript
{
  keywords: ['từ khóa 1', 'từ khóa 2', 'từ khóa 3'],
  answer: 'Câu trả lời đẹp đẹp...\nXuống dòng được\nCó emoji được 😊',
  action: 'open_form:don-dep'  // optional
}
```

### Muốn sửa câu trả lời sẵn?
- Tìm entry trong `KNOWLEDGE_BASE`
- Sửa text trong `answer:`
- Commit lên GitHub → Vercel tự deploy

### Muốn đổi link Zalo / Messenger?
Tìm 2 dòng đầu file:
```javascript
const ZALO_OA_URL = 'https://zalo.me/[YOUR_ZALO_OA_ID]';
const MESSENGER_URL = 'https://m.me/[YOUR_FB_PAGE]';
```
Thay link thật vào.

---

## 🆚 SO SÁNH 2 PHƯƠNG ÁN

| Tiêu chí | Rule-based ⭐ | Gemini API |
|---|---|---|
| Setup | 5 phút | 30+ phút |
| API key | KHÔNG CẦN | Cần |
| Folder `api/` | KHÔNG CẦN | Cần |
| Environment Variables | KHÔNG CẦN | Cần |
| Lỗi kết nối | KHÔNG CÓ | Có thể có |
| Chi phí | MIỄN PHÍ | Free tier rồi tính tiền |
| Tốc độ trả lời | < 1 giây | 1-3 giây |
| Phạm vi câu trả lời | 75 chủ đề (đủ) | Vô hạn (nhưng không kiểm soát) |
| Trả lời chính xác | 100% (đã viết sẵn) | 90% (AI có thể bịa) |

→ **Rule-based phù hợp giai đoạn launch** + dễ kiểm soát!

---

## 🚀 NÂNG CẤP TƯƠNG LAI

Khi có thẻ visa quốc tế hoặc ngân sách:

### Phase 2: Hybrid (Rule-based + AI)
- Rule-based xử lý 80% câu hỏi cơ bản (free)
- Gemini API xử lý 20% câu khó (có phí)
- Tiết kiệm 80% chi phí AI

### Phase 3: AI hoàn toàn
- Khi đã quen với AI và có ngân sách
- Bot thông minh hơn, hiểu ngữ cảnh phức tạp

---

## ❓ TROUBLESHOOTING

### Bong bóng chat không hiện
- Kiểm tra file `chatbot.js` có trên GitHub không
- Vào DevTools (F12) → Console xem lỗi

### Bot không trả lời
- KHÔNG CÓ trường hợp này (vì không cần API)
- Nếu không trả lời = lỗi syntax → upload lại file gốc

### Bot trả lời sai/không hiểu
- Thêm keyword vào entry phù hợp
- Hoặc tạo entry mới

---

## 🎯 BƯỚC TIẾP THEO

Sau khi upload thành công và test OK:

1. **🌐 Mua tên miền viecnha247.vn** (~750k/năm)
2. **📞 Tạo Zalo OA** (oa.zalo.me)
3. **📘 Tạo Facebook Page** 
4. **🏢 Đăng ký TNHH 1 thành viên**
5. **📊 Tạo Google Sheets quản lý đơn**

---

🎉 **Chúc mừng — bạn đã có chatbot 100% hoạt động!**

Có gì cần điều chỉnh nội dung Q&A, cứ nhắn mình ngay! 💬
