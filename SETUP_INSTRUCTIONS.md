# 🚀 FastHR Kurulum ve Çalıştırma Talimatları

## Frontend Sunucusu

Frontend sunucu şu anda çalışıyor olmalı. Eğer hata alıyorsanız:

1. **Terminal'i durdurun**: `Ctrl+C` ile mevcut komutu durdurun
2. **Sunucuyu yeniden başlatın**:

```bash
cd frontend
npm run dev
```

Frontend: **http://localhost:5173** adresinde çalışacak

## Backend API Sunucusu

Backend'i başlatmak için:

### 1. Virtual Environment Oluşturun (İlk Kurulum)

```bash
cd backend
python -m venv venv
```

### 2. Virtual Environment'ı Aktive Edin

**Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
venv\Scripts\activate.bat
```

### 3. Bağımlılıkları Yükleyin

```bash
pip install -r requirements.txt
```

### 4. API Sunucusunu Başlatın

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend API: **http://localhost:8000** adresinde çalışacak
API Dokümantasyonu: **http://localhost:8000/docs**

## 🎯 Hızlı Başlangıç

### Her İki Sunucuyu Birden Çalıştırın

**İki ayrı terminal açın:**

**Terminal 1 (Frontend):**
```bash
cd frontend
npm run dev
```

**Terminal 2 (Backend):**
```bash
cd backend
venv\Scripts\Activate.ps1  # Windows
uvicorn main:app --reload
```

## ✅ Çalıştığını Kontrol Edin

1. **Frontend**: http://localhost:5173 adresine gidin
   - Modern, minimalist Dashboard görmelisiniz
   - Üstte navbar olmalı
   - Mobilde alt navigasyon görünmeli

2. **Backend**: http://localhost:8000/docs adresine gidin
   - Swagger UI API dokümantasyonunu görmelisiniz
   - `/api/employees` endpoint'ini test edebilirsiniz

## 🔧 Sorun Giderme

### Frontend Hatası: "Tailwind PostCSS Plugin"
✅ **Çözüldü!** `@tailwindcss/postcss` paketi yüklendi.

Eğer hala sorun varsa:
```bash
cd frontend
npm install -D @tailwindcss/postcss
```

### Backend Hatası: "Module not found"
Virtual environment aktif değil veya bağımlılıklar yüklenmemiş olabilir:
```bash
cd backend
venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Port Zaten Kullanımda
Eğer 5173 veya 8000 portları kullanımdaysa:

**Frontend için farklı port:**
```bash
npm run dev -- --port 3000
```

**Backend için farklı port:**
```bash
uvicorn main:app --reload --port 8001
```

## 📱 Mobil Test

Mobil görünümü test etmek için:

1. Tarayıcınızda DevTools açın (F12)
2. Responsive Mode'a geçin (Ctrl+Shift+M)
3. Mobil cihaz seçin (iPhone, Android)
4. Alt navigasyonun göründüğünü kontrol edin

## 🎨 Öne Çıkan Özellikler

- ✅ Sidebar yok, üstte navbar
- ✅ Apple-like minimalist tasarım
- ✅ Instagram-style mobil navigasyon
- ✅ Grid kartlar (tablo yok!)
- ✅ Sağdan açılan detay paneli (drawer)
- ✅ Hover animasyonları ve efektler
- ✅ Story modunda ekip durumu

## 💡 İpuçları

- **Hot Reload**: Kod değişiklikleriniz otomatik yansır
- **API Test**: `/docs` sayfasından tüm endpoint'leri test edin
- **Responsive**: Tarayıcı penceresini küçültüp büyüterek test edin
- **Console**: Tarayıcı console'unda hata var mı kontrol edin

---

**Keyifli kodlamalar! 🚀**

