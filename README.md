# 🚗 AutoValuate AI — Akıllı Araç Değerleme & Ekspertiz Yapay Zeka Portalı

![AutoValuate AI Banner](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Next.js 16](https://img.shields.io/badge/Next.js-16.3-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Scikit--Learn](https://img.shields.io/badge/Scikit--Learn-1.9.0-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind--CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

> **AutoValuate AI**, ikinci el araç piyasasında binlerce veri noktasından gelişmiş **Özellik Mühendisliği (Feature Engineering)** ve **Random Forest Makine Öğrenmesi Modeli** kullanarak araçların anlık piyasa değerini ($ USD / ₺ TRY), değer kaybı analizini ve ekspertiz risk skorunu anında hesaplayan uçtan uca modern bir Yapay Zeka platformudur.

---

## 📌 1. Proje Özeti ve Mimarisi

Bu proje, veri biliminin ham veri aşamasından başlayıp **şampiyon model eğitimine**, asenkron **Python FastAPI REST API** servisine ve **Next.js 16 (React 19)** frontend arayüzüne kadar uzanan **Full-Stack ML Pipeline** mimarisine sahiptir.

```
┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
│  1. VERİ TEMİZLEME &   │      │ 2. MODEL EĞİTİMİ (ML)  │      │ 3. FASTAPI BACKEND API │
│  ÖZELLİK MÜHENDİSLİĞİ  │ ───► │  Random Forest %94.8   │ ───► │  REST API (Port 8000)  │
│  (Pandas / Groupby)    │      │  (Scikit-Learn Joblib) │      │  Pydantic Validation   │
└────────────────────────┘      └────────────────────────┘      └───────────┬────────────┘
                                                                            │
                                                                            ▼
                                                                ┌────────────────────────┐
                                                                │ 4. NEXT.JS 16 FRONTEND │
                                                                │ Visual Vehicle Render  │
                                                                │ Vercel/Linear UX       │
                                                                └────────────────────────┘
```

---

## 📊 2. Özellik Mühendisliği (Feature Engineering)

Ham verideki parametrelerin yanı sıra modelin zekasını katlayan 3 türetilmiş akıllı sütun oluşturulmuştur:

1. **`vehicle_age` (Aracın Yaşı)**: `2025 - model_year`
2. **`km_per_year` (Yıllık Ortalama Kilometre)**: `mileage_km / (vehicle_age + 1)` (Ticari taksi yıpranması vs garaj arabası farkını ayırır).
3. **`hp_per_liter` (Motor Performans Verimliliği)**: `engine_power_hp / engine_capacity_cc` (Turbolu yeni nesil motorların prim katsayısını belirler).

---

## 🏆 3. Model Yarışması ve Başarım Metrikleri

| Algoritma | R² Skoru (% Doğruluk) | Ortalama Hata (MAE) | Durum |
| :--- | :---: | :---: | :---: |
| **Linear Regression (Baseline)** | %78.2 | $3,450 | Temel Model |
| **Support Vector Regressor (SVR)** | %89.5 | $2,120 | İleri Seviye |
| **Random Forest Regressor** | **%94.8** | **$1,180** | 🏆 **ŞAMPİYON MODEL** |

---

## 🚀 4. Yerel Kurulum ve Çalıştırma

### A) Python Backend Sunucusu (FastAPI)
```bash
# 1. Proje dizinine gidin
cd AutoValuateAI

# 2. Sanal ortamı oluşturun ve kütüphaneleri yükleyin
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# 3. Backend sunucusunu başlatın
uvicorn app:app --reload --port 8000
```
*API Dokümantasyonu: [http://localhost:8000/docs](http://localhost:8000/docs)*

---

### B) Next.js 16 Frontend Arayüzü
```bash
# 1. Frontend dizinine gidin
cd frontend

# 2. Bağımlılıkları yükleyin ve geliştirici sunucusunu başlatın
npm install
npm run dev
```
*Web Arayüzü: [http://localhost:3000](http://localhost:3000)*

---

## 👨‍💻 Geliştirici
**Tunahan Bucak**  
- **GitHub**: [@tunahanbucak](https://github.com/tunahanbucak)
