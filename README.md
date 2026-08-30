# 🚗 AutoValuate AI — Akıllı Araç Değerleme & Ekspertiz Yapay Zeka Portalı

![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Next.js 16](https://img.shields.io/badge/Next.js-16.3-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Scikit--Learn](https://img.shields.io/badge/Scikit--Learn-1.9.0-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind--CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

> **AutoValuate AI**, ikinci el araç piyasasında binlerce veri noktasından gelişmiş **Özellik Mühendisliği (Feature Engineering)** ve **Random Forest Makine Öğrenmesi Modeli** kullanarak araçların anlık piyasa değerini ($ USD / ₺ TRY / € EUR), 5 yıllık değer kaybı analizini, ikili araç karşılaştırma stüdyosunu ve ekspertiz risk skorunu anında hesaplayan uçtan uca modern bir Yapay Zeka platformudur.

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
                                                                │ Royal Blue Studio UX   │
                                                                └────────────────────────┘
```

---

## ⭐ 2. Platformun Öne Çıkan Özellikleri

- **🤖 %94.8 Doğrulukla Random Forest Tahmini**: Araç yaşı, kilometre yıpranması, beygir gücü ve kaporta ekspertiz durumuyla anlık fiyat hesabı.
- **⚔️ Araç Karşılaştırma Studio (`/compare`)**: İki aracı yan yana seçip canlı fiyatını, beygir gücünü ve fiyat farkını kıyaslama stüdyosu.
- **🛠️ İnteraktif Kaporta Hasar Haritası**: Tıklanabilir 9 parça kaporta haritası ile parçaların durumuna göre otomatik ekspertiz puanlama.
- **💵 Canlı Otomatik Döviz Kuru Servisi**: USD/TRY (48.24 ₺) ve EUR/TRY (56.20 ₺) canlı kurlarıyla otomatik para birimi dönüştürme.
- **📈 Gauss Fiyat Dağılım Eğrisi**: 1.200 veri noktasından hesaplanan adil piyasa aralığı grafiği.

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
**Tunahan Buçak**  
- **GitHub**: [@tunahanbucak](https://github.com/tunahanbucak)
