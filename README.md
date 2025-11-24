# FastHR - Modern İnsan Kaynakları Yönetim Sistemi

<div align="center">

![FastHR Logo](https://img.shields.io/badge/FastHR-İK%20Sistemi-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)

Modern, minimalist ve kullanıcı dostu bir İnsan Kaynakları yönetim uygulaması.

[Demo](#demo) • [Özellikler](#özellikler) • [Kurulum](#kurulum) • [Dokümantasyon](#dokümantasyon)

</div>

---

## 📋 İçindekiler

- [Genel Bakış](#genel-bakış)
- [Özellikler](#özellikler)
- [Teknolojiler](#teknolojiler)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [API Dokümantasyonu](#api-dokümantasyonu)
- [Proje Yapısı](#proje-yapısı)
- [Roadmap](#roadmap)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Lisans](#lisans)

---

## 🎯 Genel Bakış

FastHR, modern teknolojiler kullanılarak geliştirilmiş, kullanıcı dostu bir İnsan Kaynakları yönetim sistemidir. Minimalist ve profesyonel tasarımı ile kurumsal standartlara uygun bir çözüm sunar.

### ✨ Tasarım Prensipleri

- **Minimalist**: Sidebar yok, tüm navigasyon üstte
- **Modern**: Apple-like, ferah görünüm
- **Profesyonel**: Emoji yok, SVG ikonlar
- **Responsive**: Her cihazda mükemmel çalışır

---

## 🚀 Özellikler

### ✅ Mevcut Özellikler

#### 📊 Dashboard
- Kişisel karşılama ekranı
- 3 hızlı aksiyon kartı (İzin İste, Masraf Gir, Belge Talep Et)
- İzinli çalışanlar görünümü
- İstatistik kartları (toplam çalışan, izinli, bekleyen talep, doğum günü)

#### 👥 Çalışan Yönetimi
- Grid kart görünümü
- Renkli baş harfi avatarları (8 farklı renk)
- Sağdan açılan detay paneli (drawer)
- Departman ve pozisyon rozetleri
- Profil görüntüleme ve mesaj gönderme

#### 🏖️ İzin Yönetimi
- İzin bakiyesi gösterimi (yıllık + hastalık)
- İzin talep formu
- İzin listesi (sekmeler: Tümü/Bekleyen/Onaylanan/Reddedilen)
- Onay/Reddet sistemi
- Otomatik gün hesaplama

### 🔜 Planlanan Özellikler

- [ ] Masraflar yönetimi
- [ ] Veritabanı entegrasyonu
- [ ] Authentication & Authorization
- [ ] Form validasyonları
- [ ] Dosya yükleme
- [ ] E-posta bildirimleri
- [ ] Raporlama sistemi
- [ ] Dark mode
- [ ] Çoklu dil desteği

Detaylı roadmap için: [ROADMAP.md](ROADMAP.md)

---

## 🛠️ Teknolojiler

### Frontend
- **React 18** - UI framework
- **Vite 7** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **React Router** - Navigation

### Backend
- **FastAPI** - Modern Python framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Diğer
- **npm** - Package manager
- **Git** - Version control

---

## 📦 Kurulum

### Gereksinimler

- Node.js 18+
- Python 3.13+
- npm 10+

### 1. Repository'yi Klonlayın

```bash
git clone https://github.com/[kullanici-adi]/fasthr.git
cd fasthr
```

### 2. Frontend Kurulumu

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

### 3. Backend Kurulumu

```bash
cd backend

# Virtual environment oluştur
python -m venv venv

# Aktive et (Windows)
.\venv\Scripts\Activate.ps1

# Bağımlılıkları yükle
pip install -r requirements.txt

# Sunucuyu başlat
uvicorn main:app --reload
```

Backend: http://localhost:8000
API Docs: http://localhost:8000/docs

Detaylı kurulum için: [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

---

## 💻 Kullanım

### Frontend

```bash
cd frontend

# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

### Backend

```bash
cd backend

# Geliştirme sunucusu
uvicorn main:app --reload

# Production
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Docker (Yakında)

```bash
docker-compose up
```

---

## 📚 API Dokümantasyonu

### Çalışanlar

```
GET    /api/employees              # Tüm çalışanlar
GET    /api/employees/{id}         # Çalışan detayı
GET    /api/employees/on-leave     # İzinli çalışanlar
```

### İzinler

```
GET    /api/leaves                 # Tüm izinler
POST   /api/leaves                 # Yeni izin talebi
GET    /api/leaves/{id}            # İzin detayı
PUT    /api/leaves/{id}/approve    # İzin onayla
PUT    /api/leaves/{id}/reject     # İzin reddet
DELETE /api/leaves/{id}            # İzin sil
GET    /api/leaves/balance/{id}    # İzin bakiyesi
```

### Dashboard

```
GET    /api/dashboard/stats        # Dashboard istatistikleri
```

**Interaktif API Dokümantasyonu**: http://localhost:8000/docs

---

## 📁 Proje Yapısı

```
fasthr/
├── frontend/                 # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.tsx   # Ana layout (navbar)
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Employees.tsx
│   │   │   └── Leaves.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # FastAPI
│   ├── main.py              # API endpoints
│   ├── models.py            # Pydantic models
│   ├── requirements.txt
│   └── venv/
│
├── README.md
├── ROADMAP.md               # Geliştirme planı
├── SETUP_INSTRUCTIONS.md    # Kurulum talimatları
├── KULLANIM_KILAVUZU.md     # Detaylı kullanım
├── IZINLER_SAYFASI.md       # İzinler özellik dökümü
├── DEGISIKLIKLER.md         # Değişiklik geçmişi
└── .gitignore
```

---

## 📊 Ekran Görüntüleri

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

### Çalışanlar
![Employees](https://via.placeholder.com/800x400?text=Employees+Screenshot)

### İzinler
![Leaves](https://via.placeholder.com/800x400?text=Leaves+Screenshot)

---

## 🗺️ Roadmap

### v0.1.0 (Mevcut)
- ✅ Dashboard
- ✅ Çalışan yönetimi
- ✅ İzin yönetimi
- ✅ Mock data API

### v0.2.0 (Sonraki)
- [ ] Masraflar yönetimi
- [ ] Veritabanı (PostgreSQL)
- [ ] Authentication (JWT)
- [ ] Form validasyonları

### v0.3.0 (Gelecek)
- [ ] Dosya yükleme
- [ ] E-posta bildirimleri
- [ ] Raporlama
- [ ] Admin panel

Detaylı roadmap: [ROADMAP.md](ROADMAP.md)

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'feat: add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

### Commit Mesaj Formatı

```
feat: yeni özellik
fix: hata düzeltme
docs: dokümantasyon
style: kod formatı
refactor: yeniden yapılandırma
test: test ekleme
chore: genel işler
```

---

## 🐛 Sorun Bildirimi

Bir sorun mu buldunuz? [Issue açın](https://github.com/[kullanici-adi]/fasthr/issues)

---

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

## 👨‍💻 Geliştirici

**Berkay**

---

## 🙏 Teşekkürler

- [React](https://reactjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)

---

## 📞 İletişim

Sorularınız için:
- 📧 E-posta: [email]
- 💼 LinkedIn: [profile]
- 🐦 Twitter: [@handle]

---

<div align="center">

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

Made with ❤️ by Berkay

</div>
