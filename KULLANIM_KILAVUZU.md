# 🎯 FastHR - Kullanım Kılavuzu

## 📋 Özet

Modern, minimalist bir İnsan Kaynakları yönetim uygulaması oluşturduk! İşte tüm özellikler:

### ✨ Tasarım Özellikleri
- ✅ **Sidebar YOK**: Tüm navigasyon üstte
- ✅ **Apple-like Minimalist**: Ferah, modern, temiz
- ✅ **Pastel Renkler**: İndigo ve slate tonları
- ✅ **Mobil Uyumlu**: Desktop'ta navbar, mobilde alt navigasyon
- ✅ **Grid Yapısı**: Tablo yok, sadece kartlar
- ✅ **Yumuşak Animasyonlar**: Hover efektleri, geçişler

### 🚀 Sayfalar

#### 1️⃣ Dashboard (Ana Sayfa)
- Kişisel karşılama: "Günaydın, {İsim} 👋"
- Bugünün tarihi ve motivasyon mesajı
- 3 büyük hızlı aksiyon kartı:
  - İzin İste (Mavi gradient)
  - Masraf Gir (Yeşil gradient)
  - Belge Talep Et (Mor gradient)
- Instagram story tarzı "Şu an Kimler Yok?" bölümü
- 4 istatistik kartı (Toplam çalışan, İzinli, Bekleyen talep, Doğum günü)

#### 2️⃣ Employees (Ekip)
- Grid layout (4 sütun desktop, 1 sütun mobil)
- Her çalışan bir kart:
  - Büyük profil avatarı (emoji)
  - Ad Soyad
  - Ünvan
  - Departman rozeti
  - "Profil Gör" ve "Mesaj At" butonları
- Sağdan açılan detay paneli (drawer):
  - Tam profil bilgileri
  - İletişim bilgileri
  - Hızlı işlemler

#### 3️⃣ Diğer Sayfalar (Placeholder)
- İzinler (Yönlendirme hazır, sayfa yapılabilir)
- Masraflar (Yönlendirme hazır, sayfa yapılabilir)

### 🔧 Backend API

FastAPI ile modern RESTful API:

#### Endpoints:
```
GET /                           - API bilgisi
GET /api/employees              - Tüm çalışanlar (kart görünümü)
GET /api/employees/{id}         - Çalışan detayı
GET /api/employees/on-leave     - İzinli çalışanlar
GET /api/dashboard/stats        - Dashboard istatistikleri
GET /docs                       - Swagger UI API dokümantasyonu
```

#### Pydantic Modelleri:

**EmployeeCard**: Basit kart görünümü
- id, full_name, title, avatar_url, is_on_leave, department

**EmployeeDetail**: Tam detay (drawer için)
- Tüm EmployeeCard alanları +
- email, phone, start_date, address, birth_date, emergency_contact, salary

**LeaveRequest**: İzin talebi (gelecek geliştirmeler için)
**ExpenseRequest**: Masraf talebi (gelecek geliştirmeler için)

## 🚀 Çalıştırma Talimatları

### ⚠️ ÖNEMLİ: Frontend Sunucusunu Yeniden Başlatın

Tailwind CSS yapılandırmasını güncelledik. Frontend sunucusunu **yeniden başlatmanız gerekiyor**:

#### Terminal 3'te (Frontend):
1. **Ctrl+C** ile mevcut sunucuyu durdurun
2. Şu komutları çalıştırın:
```bash
cd frontend
npm run dev
```

#### Terminal 4 (Backend):
✅ **Zaten çalışıyor!** http://localhost:8000

### 📱 Tarayıcıda Aç

1. **Frontend**: http://localhost:5173
2. **Backend API Docs**: http://localhost:8000/docs

## 🎨 Tasarım Detayları

### Renkler
- **Arka Plan**: `bg-gray-50` (Çok açık gri)
- **Primary**: `indigo-500/600` (Pastel mavi-mor)
- **Kartlar**: `bg-white` beyaz, `shadow-sm` yumuşak gölge
- **Hover**: `shadow-xl`, `-translate-y-1` yukarı kaldırma

### Köşeler
- Büyük kartlar: `rounded-2xl`
- Butonlar: `rounded-xl`
- Avatarlar: `rounded-full`

### Boşluklar
- Container: `max-w-7xl mx-auto px-6 py-8`
- Grid gap: `gap-6`
- Card padding: `p-6`

## 📂 Proje Yapısı

```
fasthr/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.tsx           # Navbar + Bottom Nav
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx        # Ana sayfa
│   │   │   └── Employees.tsx        # Çalışanlar + Drawer
│   │   ├── App.tsx                  # Router
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Tailwind + Custom styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts               # Vite + Tailwind v4 plugin
│
├── backend/
│   ├── main.py                      # FastAPI app + endpoints
│   ├── models.py                    # Pydantic models
│   ├── requirements.txt             # Python dependencies
│   └── venv/                        # Virtual environment
│
├── README.md                        # Ana proje dokümantasyonu
├── SETUP_INSTRUCTIONS.md            # Kurulum talimatları
└── KULLANIM_KILAVUZU.md            # Bu dosya
```

## 🧪 Test Senaryoları

### 1. Dashboard Testi
- [ ] Karşılama mesajı görünüyor mu?
- [ ] Bugünün tarihi doğru mu?
- [ ] 3 hızlı aksiyon kartı var mı?
- [ ] Kartlar hover'da yukarı kalkıyor mu?
- [ ] İzinli çalışanlar story modunda görünüyor mu?
- [ ] İstatistik kartları görünüyor mu?

### 2. Employees Testi
- [ ] Çalışan kartları grid'de mi?
- [ ] Her kartta avatar, isim, ünvan var mı?
- [ ] Departman rozeti görünüyor mu?
- [ ] Karta tıklayınca drawer açılıyor mu?
- [ ] Drawer'da detaylı bilgiler var mı?
- [ ] Drawer dışına tıklayınca kapanıyor mu?

### 3. Responsive Testi
- [ ] Desktop'ta üst navbar var mı?
- [ ] Mobilde alt navigasyon var mı?
- [ ] Grid mobilde 1 sütun oluyor mu?
- [ ] Drawer mobilde full genişlik mi?

### 4. Backend Testi
- [ ] http://localhost:8000 çalışıyor mu?
- [ ] `/docs` sayfası açılıyor mu?
- [ ] `/api/employees` veri dönüyor mu?
- [ ] Swagger UI'da endpoint test edilebiliyor mu?

## 🔜 Geliştirme Önerileri

### Kısa Vadeli
1. **İzinler Sayfası**: İzin talep formu + onay sistemi
2. **Masraflar Sayfası**: Masraf girişi + fiş yükleme
3. **Arama**: Çalışan arama/filtreleme
4. **Sorting**: Departman, ünvan bazlı sıralama

### Orta Vadeli
5. **Veritabanı**: PostgreSQL/MySQL entegrasyonu
6. **Authentication**: Login/logout + JWT token
7. **Authorization**: Admin, Manager, Employee rolleri
8. **File Upload**: Avatar, fiş yükleme
9. **Notifications**: Toast mesajları

### Uzun Vadeli
10. **Email**: Otomatik bildirimler
11. **PDF Export**: Belge oluşturma
12. **Analytics**: İstatistik grafikleri
13. **Dark Mode**: Karanlık tema
14. **i18n**: Çoklu dil desteği

## 💡 İpuçları

### Yeni Sayfa Eklemek
1. `frontend/src/pages/` altında yeni component oluştur
2. `App.tsx`'e route ekle:
```tsx
<Route path="/yeni-sayfa" element={<YeniSayfa />} />
```
3. `Layout.tsx`'de navigation array'ine ekle

### Yeni API Endpoint
1. `backend/models.py`'de model tanımla
2. `backend/main.py`'de endpoint ekle:
```python
@app.get("/api/yeni-endpoint")
def yeni_endpoint():
    return {"data": "..."}
```

### Tailwind Sınıfları
Özel sınıflar tanımladık:
- `.card` - Standart kart stili
- `.btn-primary` - Ana buton
- `.btn-secondary` - İkincil buton
- `.animate-slide-in` - Drawer animasyonu

## 🐛 Sorun Giderme

### Frontend Hataları

**"Module not found"**
```bash
cd frontend
npm install
```

**"Tailwind styles not working"**
1. Sunucuyu durdurun (Ctrl+C)
2. `npm run dev` ile yeniden başlatın

### Backend Hataları

**"ModuleNotFoundError"**
```bash
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

**"Port already in use"**
Farklı port kullanın:
```bash
uvicorn main:app --reload --port 8001
```

## 📞 Yardım

Sorularınız için:
1. README.md'yi okuyun
2. SETUP_INSTRUCTIONS.md'ye bakın
3. Backend API'yi `/docs` sayfasından test edin
4. Tarayıcı console'unu kontrol edin (F12)

---

**🎉 Keyifli kullanımlar!**

