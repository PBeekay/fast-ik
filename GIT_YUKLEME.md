# 🚀 GitHub'a Yükleme Talimatları

## Adım 1: Git Repository Başlat

```bash
git init
git add .
git commit -m "feat: initial commit - FastHR projesi"
```

## Adım 2: GitHub'da Repository Oluştur

1. https://github.com adresine git
2. Sağ üstten "New repository" tıkla
3. Repository adı: `fasthr`
4. Description: "Modern İnsan Kaynakları Yönetim Sistemi"
5. **Public** veya **Private** seç
6. **README eklemeden** oluştur (bizde zaten var)

## Adım 3: Remote Ekle ve Push Et

GitHub'da repository oluşturduktan sonra, size verdiği komutları kullan:

```bash
# Remote ekle (URL'i kendi repository URL'inle değiştir)
git remote add origin https://github.com/[kullanici-adi]/fasthr.git

# Branch adını main olarak ayarla
git branch -M main

# Push et
git push -u origin main
```

## Alternatif: SSH ile

Eğer SSH key kullanıyorsan:

```bash
git remote add origin git@github.com:[kullanici-adi]/fasthr.git
git branch -M main
git push -u origin main
```

---

## ✅ Kontrol Listesi

Yüklemeden önce bu dosyaların ekleneceğinden emin ol:

### ✅ Dahil Edilecek Dosyalar
- [x] README.md
- [x] .gitignore
- [x] frontend/ (node_modules hariç)
- [x] backend/ (venv hariç)
- [x] Tüm .md dökümanlar
- [x] package.json, requirements.txt

### ❌ Dahil Edilmeyecek Dosyalar
- [x] node_modules/
- [x] venv/
- [x] __pycache__/
- [x] .env
- [x] *.log
- [x] dist/
- [x] .vscode/
- [x] .cursor/
- [x] terminals/

---

## 🔍 Dosya Kontrolü

Hangi dosyaların yükleneceğini görmek için:

```bash
git status
```

Değişiklikleri görmek için:

```bash
git diff
```

---

## 📝 İlk Commit Mesajı Önerisi

```bash
git commit -m "feat: initial commit

- React + Vite + Tailwind CSS frontend
- FastAPI backend
- Dashboard sayfası
- Çalışan yönetimi (grid + drawer)
- İzin yönetimi (form + liste + bakiye)
- Responsive tasarım
- Profesyonel minimalist görünüm
- Mock data API
- Comprehensive documentation"
```

---

## 🌿 Branch Stratejisi (Opsiyonel)

Gelecekte farklı özellikler için branch'ler oluşturabilirsin:

```bash
# Yeni özellik için branch
git checkout -b feature/expenses-page

# Değişiklikleri commit et
git add .
git commit -m "feat: add expenses page"

# Push et
git push origin feature/expenses-page

# GitHub'da Pull Request aç
```

---

## 🏷️ Tag Oluşturma (Versiyon)

İlk versiyonu taglemek için:

```bash
git tag -a v0.1.0 -m "İlk stabil versiyon"
git push origin v0.1.0
```

---

## 📊 Repository Boyutu

Tahmini boyut:
- Frontend: ~50 MB (node_modules hariç)
- Backend: ~5 MB (venv hariç)
- Toplam: ~55 MB

---

## 🔐 .env Dosyası

Eğer hassas bilgiler varsa, `.env.example` oluştur:

```bash
# .env.example
DATABASE_URL=postgresql://user:pass@localhost/fasthr
SECRET_KEY=your-secret-key-here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

Gerçek `.env` dosyası `.gitignore`'da olmalı!

---

## ✨ README Güzelleştirme (Opsiyonel)

README'ye ekleyebilirsin:
- Screenshots (ekran görüntüleri)
- GIF demo
- Badges
- Contributors
- Changelog

---

## 🎉 Tamamlandı!

Repository yüklendikten sonra:

1. ✅ GitHub'da repository'yi aç
2. ✅ README'yi kontrol et
3. ✅ Issues açabilirsin
4. ✅ Wiki oluşturabilirsin
5. ✅ GitHub Actions ekleyebilirsin (CI/CD)

---

## 💡 İpuçları

### Güvenlik
- ✅ `.gitignore` güncel mi?
- ✅ Şifreler kodda yok mu?
- ✅ API keys commit edilmemiş mi?

### Temizlik
- ✅ Console.log'lar temizlendi mi?
- ✅ TODO yorumları kaldırıldı mı?
- ✅ Gereksiz dosyalar silindi mi?

### Dokümantasyon
- ✅ README eksiksiz mi?
- ✅ Kurulum adımları açık mı?
- ✅ API dokümantasyonu var mı?

---

## 🚨 Sorun Giderme

### Problem: git push reddedildi

```bash
# Force push (DİKKATLİ KULLAN)
git push -f origin main
```

### Problem: Çok büyük dosya

```bash
# Dosyayı tarihten sil
git filter-branch --tree-filter 'rm -f path/to/file' HEAD
```

### Problem: Yanlış commit

```bash
# Son commit'i geri al (değişiklikler kalır)
git reset --soft HEAD~1

# Son commit'i tamamen sil
git reset --hard HEAD~1
```

---

## 📞 Yardım

GitHub dökümantasyonu:
- https://docs.github.com/
- https://git-scm.com/doc

---

**Başarılar! 🎉**

