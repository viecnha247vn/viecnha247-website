# 🔍 V28 — SEO + GOOGLE ANALYTICS SETUP

## 📦 Bạn vừa nhận: `website-v28-seo.zip`

---

## ✅ ĐÃ LÀM XONG (file đã tạo)

### 1️⃣ sitemap.xml — Cho Google biết có 9 trang
File `sitemap.xml` ở thư mục gốc liệt kê đầy đủ 9 trang với priority + frequency phù hợp.

### 2️⃣ robots.txt — Cho phép Google crawl
File `robots.txt` cho phép tất cả search engine index website + chỉ đường tới sitemap.

### 3️⃣ Open Graph + Twitter Meta cho 9 trang
Mỗi trang giờ có meta tags đầy đủ:
- og:title, og:description, og:image
- Twitter Card
- Canonical URL

→ **Khi share link lên Facebook/Zalo/Twitter** sẽ hiển thị preview đẹp!

### 4️⃣ Schema.org JSON-LD (trang chủ)
2 schema markup quan trọng:
- **LocalBusiness**: Google hiểu đây là doanh nghiệp dịch vụ ở TPHCM
- **Organization**: Thông tin công ty đầy đủ

→ Google có thể hiển thị **Knowledge Panel** (khung doanh nghiệp bên phải kết quả search) với:
- Logo, tên, địa chỉ
- Hotline, website, Facebook
- Giờ làm việc 24/7
- Đánh giá 4.8★ (placeholder, cập nhật sau)
- 10 dịch vụ + giá

### 5️⃣ og-image.html — Template để tạo ảnh preview
Mở file `og-image.html` trên trình duyệt → screenshot → tạo file `og-image.jpg`

---

## ⚠️ BẠN CẦN LÀM 5 VIỆC TIẾP THEO

### 📸 VIỆC 1: Tạo og-image.jpg (5 phút)

1. Mở file `og-image.html` trong Chrome
2. Cuộn để thấy toàn bộ card vàng (1200x630px)
3. Mở Chrome DevTools (F12) → chế độ Responsive
4. Set kích thước **1200 x 630**
5. Right-click vào card → **Capture screenshot**
6. Lưu thành `og-image.jpg`
7. Upload lên GitHub vào folder gốc

**Cách khác (nhanh hơn):**
- Dùng Canva.com → tạo design 1200x630px
- Hoặc dùng tool: https://og-image.vercel.app/

---

### 📊 VIỆC 2: Đăng ký Google Analytics 4 (10 phút)

1. Vào https://analytics.google.com
2. **Bắt đầu đo lường** → tạo tài khoản
3. Đặt tên: **"ViệcNhà247"**
4. Tạo **Property** cho `viecnha247.vn`
5. Chọn loại nền tảng: **Web**
6. URL: `https://viecnha247.vn`
7. Lấy **Measurement ID** (dạng `G-XXXXXXXXXX`)

**Sau khi có ID, báo mình** → mình sẽ:
- Bật code GA4 trong `index.html` (đang comment out)
- Thêm vào 8 trang còn lại

---

### 🔎 VIỆC 3: Đăng ký Google Search Console (10 phút)

1. Vào https://search.google.com/search-console
2. **Thêm property** → chọn **Domain**
3. Nhập: `viecnha247.vn`
4. Google sẽ cho 1 đoạn TXT record cần thêm vào DNS

**Thêm vào iNET:**
| Trường | Giá trị |
|---|---|
| Loại | TXT |
| Tên | `@` |
| Giá trị | `google-site-verification=ABC...` (Google cho) |
| TTL | 360 |

5. Đợi 5-15 phút → quay lại Google → bấm **Verify**

6. **Submit sitemap:**
   - Vào tab **Sitemaps** trong Search Console
   - Nhập: `sitemap.xml`
   - Bấm Submit

→ Google sẽ bắt đầu crawl trong 24-48 giờ!

---

### 🏢 VIỆC 4: Đăng ký Google Business Profile (15 phút)

**Cực kỳ quan trọng** để hiển thị trên Google Maps khi khách search "dịch vụ dọn nhà gần đây":

1. Vào https://business.google.com
2. **Thêm doanh nghiệp** → nhập "ViệcNhà247"
3. Chọn danh mục: **"Dịch vụ tại nhà"**
4. Địa chỉ: Sea Office, Quận 7, TPHCM
5. SĐT: 084 9999 247
6. Website: viecnha247.vn
7. **Xác minh** qua thư hoặc gọi điện (3-7 ngày)

**Sau khi verify:**
- Upload 10-20 ảnh dịch vụ
- Đăng bài định kỳ
- Thu thập đánh giá khách hàng

---

### 📌 VIỆC 5: Bing Webmaster Tools (5 phút) — tuỳ chọn

Nhiều người dùng Bing/Yahoo, đáng setup:

1. Vào https://www.bing.com/webmasters
2. Đăng nhập Microsoft account
3. **Import từ Google Search Console** (nhanh nhất)
4. Submit sitemap

---

## 🎯 BẢNG TRA CỨU KEYWORDS NÊN TỐI ƯU

Sau khi index, optimize cho các keyword này:

### Keywords chính (high volume):
- "dịch vụ dọn nhà TPHCM"
- "thuê người dọn nhà"
- "sửa điện 24/7"
- "thuê người trông trẻ"
- "gia sư tại nhà TPHCM"
- "chuyển nhà trọn gói"

### Long-tail (dễ rank):
- "dịch vụ dọn nhà cuối năm Q.7"
- "thuê người dọn nhà tết 2026"
- "gia sư toán lớp 12 luyện thi"
- "trông trẻ tại nhà 99k/giờ"
- "sửa điều hòa Bình Thạnh"

### Keywords local (rất dễ rank):
- "việc nhà 247"
- "ViệcNhà247"
- "viecnha247"

→ Sau khi launch xong, mình giúp tạo **landing page riêng** cho từng keyword cao giá trị!

---

## 📊 KỲ VỌNG SAU 30-90 NGÀY

| Thời điểm | Trạng thái mong đợi |
|---|---|
| **Ngày 1-7** | Google bắt đầu crawl website |
| **Ngày 7-30** | Index được 8-9/9 trang |
| **Ngày 30-60** | Bắt đầu rank cho keyword brand ("viecnha247", "việc nhà 247") |
| **Ngày 60-90** | Bắt đầu rank cho keyword long-tail |
| **Ngày 90-180** | Có traffic organic ổn định |

**Lưu ý**: SEO là cuộc đua marathon, không phải sprint. Cần 3-6 tháng để thấy kết quả rõ rệt.

---

## 🚀 UPLOAD

1. GitHub repo `viecnha247-website`
2. **Add file → Upload files**
3. Chọn TẤT CẢ files (HTML + sitemap.xml + robots.txt + og-image.html)
4. Replace existing → **Commit changes**
5. Đợi Vercel deploy 1-2 phút

---

## 🧪 TEST SAU UPLOAD

### Test 1: sitemap.xml
- Gõ: `https://viecnha247.vn/sitemap.xml`
- → Phải hiện danh sách XML 9 trang

### Test 2: robots.txt
- Gõ: `https://viecnha247.vn/robots.txt`
- → Phải hiện nội dung file

### Test 3: Schema validation
- Vào: https://search.google.com/test/rich-results
- Nhập URL: `https://viecnha247.vn`
- → Phải báo "**Page is eligible for rich results**"
- → Hiển thị LocalBusiness + Organization schema

### Test 4: Open Graph preview
- Vào: https://developers.facebook.com/tools/debug/
- Nhập URL: `https://viecnha247.vn`
- → Xem preview khi share lên Facebook

### Test 5: Mobile-friendly
- Vào: https://search.google.com/test/mobile-friendly
- Nhập URL: `https://viecnha247.vn`
- → Phải báo "**Page is mobile-friendly**"

---

🎉 **SEO foundation đã hoàn thành! Giờ chỉ cần đợi Google crawl + tạo nội dung blog đều đặn để rank cao!**
