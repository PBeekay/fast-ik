# FastHR Backend API

Modern İnsan Kaynakları Yönetim Sistemi - FastAPI Backend

## Kurulum

1. Virtual environment oluşturun:
```bash
python -m venv venv
```

2. Virtual environment'ı aktive edin:
- Windows:
  ```bash
  venv\Scripts\activate
  ```
- macOS/Linux:
  ```bash
  source venv/bin/activate
  ```

3. Bağımlılıkları yükleyin:
```bash
pip install -r requirements.txt
```

## Çalıştırma

Geliştirme sunucusunu başlatın:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API şu adreste çalışacaktır: http://localhost:8000

## API Dokümantasyonu

Swagger UI: http://localhost:8000/docs
ReDoc: http://localhost:8000/redoc

## Endpoints

### Çalışanlar

- `GET /api/employees` - Tüm çalışanların kart görünümü
- `GET /api/employees/{employee_id}` - Belirli bir çalışanın detaylı bilgileri
- `GET /api/employees/on-leave` - İzinli çalışanlar listesi

### Dashboard

- `GET /api/dashboard/stats` - Dashboard istatistikleri

## Veri Modelleri

### EmployeeCard
Çalışan kartları için basitleştirilmiş model. Frontend grid görünümünde kullanılır.

**Alanlar:**
- `id`: Benzersiz kimlik
- `full_name`: Ad Soyad
- `title`: Pozisyon/Ünvan
- `avatar_url`: Profil fotoğrafı (emoji veya URL)
- `is_on_leave`: İzinde mi?
- `department`: Departman

### EmployeeDetail
Tam detaylı çalışan bilgileri. Drawer/modal görünümünde kullanılır.

**Ek Alanlar:**
- `email`: E-posta adresi
- `phone`: Telefon numarası
- `start_date`: İşe başlama tarihi
- `address`: İkamet adresi (opsiyonel)
- `birth_date`: Doğum tarihi (opsiyonel)
- `emergency_contact`: Acil durum iletişim (opsiyonel)
- `salary`: Maaş bilgisi (opsiyonel, hassas)

## Özellikler

- ✅ CORS desteği (Frontend ile entegrasyon için)
- ✅ Otomatik API dokümantasyonu (Swagger UI)
- ✅ Pydantic ile veri validasyonu
- ✅ Type hints ile tip güvenliği
- ✅ Mock veriler ile hızlı test
- 🔄 Veritabanı entegrasyonu (gelecekte)
- 🔄 Authentication & Authorization (gelecekte)
- 🔄 İzin ve masraf yönetimi (gelecekte)

## Geliştirme Notları

Bu API şu anda mock verilerle çalışmaktadır. Production ortamına geçmeden önce:

1. **Veritabanı Entegrasyonu**: PostgreSQL/MySQL bağlantısı ekleyin
2. **Authentication**: JWT token tabanlı kimlik doğrulama
3. **Authorization**: Rol bazlı yetkilendirme (Admin, Manager, Employee)
4. **Dosya Yükleme**: Avatar, masraf fişi vb. için
5. **E-posta Bildirimleri**: İzin/masraf onayları için
6. **Logging**: İşlem logları ve hata takibi
7. **Testing**: Unit ve integration testler

## Lisans

MIT

