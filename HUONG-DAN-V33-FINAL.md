# 🔧 V33 — SỬA TRÙNG LẶP + LINK GOOGLE FORM

## ✅ THAY ĐỔI TRONG PHIÊN BẢN NÀY

### 1. Sửa Hero Section (xóa trùng "Khởi nghiệp")
**Trước:** "Cùng KHỞI NGHIỆP với ViệcNhà247" — TRÙNG với section recruit bên dưới
**Sau:** "Dịch vụ gia đình TẬN TÂM tại TPHCM" — giới thiệu chung

→ Hero giờ là **mở đầu**, section recruit-section bên dưới giữ thông điệp "Khởi nghiệp"

### 2. Cập nhật 3 thông tin Hero
- "10 ngành đang tuyển" → "10 ngành dịch vụ"
- "78-82% Hoa hồng CTV" → "24/7 Hotline hỗ trợ"
- "100tr Bảo hiểm CTV" → "100tr Bảo hiểm trách nhiệm"

→ Hero giờ thân thiện hơn cho cả KHÁCH HÀNG + ỨNG VIÊN

### 3. Tích hợp link Google Form trực tiếp
2 nút đã đổi link → **mở Google Form trong tab mới**:
- ✅ Nút "Điền form ứng tuyển ngay" trong section TUYỂN CTV
- ✅ Nút CTA Final cuối trang

→ Khách click 1 lần là vào form ngay (không cần qua trang trung gian)

### 4. Thêm GA4 tracking
Mỗi click nút sẽ track event `click_apply_ctv` với label:
- `hero_cta` — từ section tuyển CTV
- `final_cta` — từ CTA cuối trang

→ Bạn xem được bao nhiêu người click vào form trong GA4

---

## ⚠️ HÀNH ĐỘNG BẮT BUỘC TRƯỚC KHI UPLOAD

### 🔑 THAY `GOOGLE_FORM_URL` BẰNG LINK FORM THẬT

File `index.html` có **2 chỗ** chứa `GOOGLE_FORM_URL` cần thay:

**Bước 1: Tạo Google Form từ template Form-UngTuyen-CTV-40cau-v2.docx**

**Bước 2: Copy link Google Form**
- Mở Google Form đã tạo
- Bấm "Send" → tab "Link" → bấm "Copy"
- Ví dụ: `https://docs.google.com/forms/d/e/1FAIpQLSf.../viewform`

**Bước 3: Find & Replace trong index.html**
Mở file `index.html` bằng VS Code hoặc Notepad:
- Bấm **Ctrl+H** (Windows) hoặc **Cmd+H** (Mac)
- Find: `GOOGLE_FORM_URL`
- Replace: `https://docs.google.com/forms/d/e/[mã form của bạn]/viewform`
- Bấm "Replace All"

→ Thay 2 chỗ cùng lúc, không bỏ sót

---

## 📁 CẤU TRÚC TRANG CHỦ MỚI

```
1. HERO (mở đầu - dịch vụ gia đình)
   ↓
2. SECTION TUYỂN CTV (chính - 4 quyền lợi + 10 ngành)
   ↓ Nút: "📝 Điền form ứng tuyển ngay" → Google Form
   ↓
3. 10 NGÀNH DỊCH VỤ (giới thiệu)
   ↓ Nút: "Ứng tuyển CTV ngay" → cuộn lên section #2
   ↓
4. ĐĂNG KÝ SỚM (khách hàng)
   ↓
5. WHY → HOW → CAM KẾT
   ↓
6. CTA FINAL
   ↓ Nút: "📝 Điền form ứng tuyển ngay" → Google Form
```

---

## 🧪 TEST SAU KHI UPLOAD

### Test 1: Hero mới
- Vào viecnha247.vn → Hero hiển thị "Dịch vụ gia đình TẬN TÂM tại TPHCM"
- KHÔNG còn trùng tiêu đề với section bên dưới

### Test 2: Click nút "Điền form ứng tuyển ngay"
- Click → mở **tab mới** với Google Form
- Form hiển thị 40 câu hỏi

### Test 3: GA4 tracking
- Mở GA4 → Realtime → click vào nút
- Xem event `click_apply_ctv` có xuất hiện không

### Test 4: Mobile responsive
- Mở trên điện thoại → kiểm tra Hero không bị vỡ layout
- Nút "Điền form" dễ bấm trên mobile

---

## 🎯 LỢI ÍCH CỦA CÁCH NÀY

| Trước (v32) | Sau (v33) |
|---|---|
| Hero + Recruit cùng tiêu đề "Khởi nghiệp" → TRÙNG | Hero = giới thiệu, Recruit = tuyển dụng |
| Click "Ứng tuyển CTV" → trang `tuyen-ctv.html` (qua trung gian) | Click → MỞ FORM NGAY trong tab mới |
| Khách phải đọc thêm 1 trang nữa | Khách điền form ngay khi quan tâm |
| Không track được CTV nguồn nào | Track GA4 chi tiết (hero_cta / final_cta) |

→ **Giảm bước trung gian = tăng tỷ lệ chuyển đổi**

---

## 📤 UPLOAD LÊN GITHUB

1. Mở GitHub repo `viecnha247-website`
2. Click **"Add file" → "Upload files"**
3. Kéo thả 12 file (đã thay GOOGLE_FORM_URL)
4. Click **"Commit changes"**
5. Đợi Vercel deploy ~1-2 phút
6. Vào viecnha247.vn kiểm tra

---

🎉 **Sau khi upload, người dùng click 1 click là vào form ứng tuyển ngay!**
