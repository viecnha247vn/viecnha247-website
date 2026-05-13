# 📊 V29 — GOOGLE ANALYTICS 4 ĐÃ KÍCH HOẠT!

## ✅ ĐÃ KÍCH HOẠT GA4 - Measurement ID: G-5MESLDPW51

### Trên 9 trang HTML:
- ✅ index.html
- ✅ dich-vu.html
- ✅ bang-gia.html
- ✅ phap-ly.html
- ✅ tuyen-ctv.html
- ✅ ve-chung-toi.html
- ✅ lien-he.html
- ✅ blog.html
- ✅ ve-app.html

→ **GA4 sẽ theo dõi mọi pageview trên toàn website!**

---

## 🎯 SỰ KIỆN ĐƯỢC THEO DÕI TỰ ĐỘNG

Mình đã thêm **6 loại sự kiện** quan trọng để bạn theo dõi hành vi khách hàng:

### 1️⃣ `generate_lead` — Khách submit form đặt lịch
- Trigger: khi khách bấm "Đặt ngay" cuối wizard form
- Data: tên dịch vụ (dọn dẹp/sửa điện/...), mã đơn

### 2️⃣ `click_phone` — Khách click hotline
- Trigger: bất kỳ link `tel:0849999247` nào trên website
- Data: số điện thoại

### 3️⃣ `click_zalo` — Khách click Zalo
- Trigger: link `zalo.me/0849999247`
- Data: kênh Zalo

### 4️⃣ `click_facebook` — Khách click Facebook
- Trigger: link `facebook.com/viecnha247vn`
- Data: kênh Facebook

### 5️⃣ `click_messenger` — Khách click Messenger
- Trigger: link `m.me/viecnha247vn`
- Data: kênh Messenger

### 6️⃣ `click_email` — Khách click email
- Trigger: link `mailto:lienhe@...`, `mailto:hotro@...`
- Data: email cụ thể (lienhe, hotro, childcare, tuyendung)

### 7️⃣ `select_service` — Khách click service card
- Trigger: click vào card 10 dịch vụ
- Data: tên dịch vụ

### 8️⃣ `scroll_depth` — Khách cuộn trang
- Trigger: cuộn đến 25%, 50%, 75%, 100% của trang
- Data: phần trăm cuộn

---

## 🚀 UPLOAD

1. GitHub repo `viecnha247-website`
2. Add file → Upload files → chọn 12 file → Replace existing → Commit
3. Đợi Vercel 1-2 phút

---

## 🧪 TEST GA4 (5 phút sau upload)

### Cách 1: Real-time report
1. Vào https://analytics.google.com
2. Chọn property ViệcNhà247
3. Menu trái → **Báo cáo** → **Realtime** (Theo thời gian thực)
4. Mở website `viecnha247.vn` trong tab khác
5. Quay lại GA4 → phải thấy **1 user đang hoạt động** ✅

### Cách 2: GA4 Debug View
1. Cài extension Chrome: **Google Analytics Debugger**
2. Bật extension
3. Vào website → mở Console (F12)
4. Sẽ thấy log GA4 events real-time

### Cách 3: Test events
1. Mở website
2. Bấm vào số điện thoại → check Realtime có event `click_phone`
3. Cuộn trang → check event `scroll_depth`
4. Click vào service card → check event `select_service`
5. Bấm Zalo → check event `click_zalo`

---

## 📊 BÁO CÁO QUAN TRỌNG TRÊN GA4

### Tuần 1: Số liệu cơ bản
- **Pageviews**: tổng lượt xem trang
- **Users**: số khách duy nhất
- **Sessions**: số phiên truy cập
- **Engagement rate**: tỷ lệ tương tác

### Tuần 2-4: Hành vi khách
- **Top pages**: trang nào được xem nhiều nhất
- **Top events**: hành động nào xảy ra nhiều nhất
- **Traffic source**: khách đến từ đâu (Google, Facebook, trực tiếp)
- **Device**: mobile vs desktop

### Tháng 2+: Conversion
- **generate_lead rate**: % khách hoàn thành form đặt
- **Click hotline rate**: % khách bấm gọi
- **Funnel analysis**: phễu chuyển đổi

---

## 🎯 ĐỀ XUẤT TIẾP THEO

### Bước tiếp theo (theo thứ tự):

1. **Upload v29 lên GitHub** (5 phút)
2. **Test GA4 Realtime** (5 phút) — phải thấy bản thân
3. **Setup Google Search Console** (10 phút) — quan trọng nhất
4. **Setup Google Business Profile** (15 phút) — hiển thị Maps
5. **Tạo og-image.jpg** (5 phút) — preview Facebook

### Sau 1 tuần:
- Check GA4 báo cáo
- Xem có đơn nào qua form chưa
- Tối ưu trang có bounce rate cao

### Sau 1 tháng:
- Tổng kết: bao nhiêu user, bao nhiêu lead?
- Phân tích: dịch vụ nào được quan tâm nhất?
- Đầu tư quảng cáo: target dịch vụ hot nhất

---

🎉 **GA4 đã sẵn sàng — giờ mọi click, scroll, submit đều được ghi lại để phân tích!**
