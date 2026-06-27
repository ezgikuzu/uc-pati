# Üç Pati Veteriner Kliniği 🐾

Üç Pati, veteriner klinikleri için tasarlanmış, modern, dinamik ve yapay zeka destekli kapsamlı bir web platformudur. Hasta sahiplerinin randevu alabileceği, laboratuvar sonuçlarını inceleyebileceği, sağlık karnesi ve hayvan pasaportu gibi detayları takip edebileceği kullanıcı dostu bir arayüze sahiptir.

Ayrıca projede, veteriner hekimlerin ve adminlerin süreçleri yönetebildiği özel paneller bulunmaktadır. Projenin en öne çıkan özelliği ise OpenRouter (Google Gemini) altyapısı ile çalışan, 7/24 hizmet veren gelişmiş **Vet AI Chatbot** sistemidir.

## 🌟 Öne Çıkan Özellikler

### 🤖 Yapay Zeka Destekli Vet AI Chatbot
- OpenRouter üzerinden **Google Gemini** modeliyle çalışır.
- Evcil hayvanınızın belirtilerini (kusma, ishal, ateş vb.) analiz ederek acil durumlarda uyarır ve veteriner hekime yönlendirir.
- Hastalık teşhisi veya ilaç dozu tavsiyesi vermeyecek şekilde özel bir prompt mühendisliği (Prompt Engineering) ile sınırlandırılmıştır.
- Randevu, pet shop ve diğer klinik hizmetleri hakkında 7/24 asistanlık yapar.
- Sağ alt köşede yüzen bir asistan ve tam sayfa bir chatbot ekranı olarak iki farklı şekilde kullanılabilir.

### 👥 Rol Bazlı Yetkilendirme (Auth System)
Projede üç farklı kullanıcı rolü bulunmaktadır:
- **Müşteri (Customer):** Evcil hayvanlarını sisteme kaydedebilir, randevu alabilir, sağlık karnesi/pasaport görüntüleyebilir, laboratuvar sonuçlarına bakabilir ve pet shop üzerinden ürün satın alabilir.
- **Veteriner Hekim (Doctor):** Kendi paneli üzerinden hastalarını, laboratuvar sonuçlarını ve randevularını yönetebilir.
- **Yönetici (Admin):** Tüm kullanıcıları, hekimleri, site mesajlarını, randevu onaylarını ve e-ticaret (pet shop) satış özetlerini kontrol edebilir.

### 🏥 Klinik Hizmetleri ve Yönetimi
- **Randevu Sistemi:** Tarih, saat, hekim ve işlem türü bazlı randevu modülü.
- **Sağlık Karnesi ve Pasaport:** Evcil hayvana ait aşı geçmişi, hastalık kayıtları ve mikroçip bilgileri.
- **Laboratuvar Sonuçları:** Yapılan tahlillerin sisteme girilmesi ve müşteri tarafından şeffaf bir şekilde görüntülenmesi.
- **Pet Shop ve E-Ticaret:** Mama, oyuncak ve aksesuarların listelendiği, sepete ekleme ve satın alma adımlarının simüle edildiği e-ticaret akışı.
- **Sahiplendirme:** Yuva arayan can dostlarımız için detaylı sahiplendirme ilan modülü.

---

## 🛠️ Kullanılan Teknolojiler

### Frontend (İstemci Tarafı)
- **React.js:** Modern ve modüler UI bileşenleri için.
- **Vite:** Hızlı ve optimize edilmiş geliştirme ortamı.
- **Redux Toolkit:** Merkezi ve yönetimi kolay durum (state) yönetimi (auth, chatbot, messages, products vb. slicelar).
- **React Router DOM:** Sayfalar arası geçiş ve dinamik rotalama.
- **Tailwind CSS:** Modern, hızlı, responsive ve özelleştirilebilir arayüz tasarımı.

### Backend (Sunucu Tarafı)
- **Node.js & Express.js:** Chatbot API isteklerini karşılamak ve güvenlik amacıyla API anahtarını gizlemek için kurulan ara katman.
- **OpenAI SDK & OpenRouter:** Yapay zeka dil modeli entegrasyonu (Gemini modeli kullanılmıştır).
- **Dotenv:** Çevresel değişkenlerin (API Key vb.) güvenli yönetimi.

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda (localhost) çalıştırmak için aşağıdaki adımları izleyin:

### 1. Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn paketi yöneticisi

### 2. Projeyi Klonlama ve Bağımlılıkları Yükleme
Terminale aşağıdaki komutu yazarak gerekli kütüphaneleri yükleyin:
```bash
npm install
```

### 3. Çevresel Değişkenleri Ayarlama (.env)
Projenin ana dizininde (root) bir `.env` dosyası oluşturun ve içerisine kendi OpenRouter API anahtarınızı ekleyin:
```env
OPENROUTER_API_KEY=sk-or-v1-kendi-api-anahtariniz-buraya-gelecek
```

### 4. Projeyi Çalıştırma (Aynı anda iki terminal gerekir)

**Terminal 1 (Backend Sunucusu):**
Chatbot API'sinin çalışması için Express sunucusunu ayağa kaldırın:
```bash
npm run server
```
*Başarılı olduğunda "Chatbot server çalışıyor: http://localhost:3002" mesajını göreceksiniz.*

**Terminal 2 (Frontend Sunucusu):**
React ve Vite geliştirme sunucusunu ayağa kaldırın:
```bash
npm run dev
```
*Bu komut sonrası http://localhost:5173 (veya gösterilen port) adresi üzerinden projeyi tarayıcınızda açabilirsiniz.*

---

## 📂 Proje Yapısı

\`\`\`text
uc-pati/
│
├── public/                 # Statik dosyalar (Görseller, favicon vb.)
├── server.js               # Node.js/Express arka uç sunucusu (Chatbot entegrasyonu)
├── .env                    # Ortam değişkenleri (Git'e atılmaz)
├── package.json            # Proje bağımlılıkları ve komut dosyaları
│
└── src/
    ├── components/         # Tekrar kullanılabilir UI bileşenleri (Navbar, Footer, FloatingChatbot vb.)
    ├── pages/              
    │   ├── admin/          # Admin paneli sayfaları
    │   ├── auth/           # Login ve Kayıt sayfaları
    │   ├── customer/       # Müşteri (Hasta sahibi) paneli sayfaları
    │   ├── doctor/         # Veteriner Hekim paneli sayfaları
    │   └── public/         # Herkese açık sayfalar (Ana sayfa, Hakkımızda, Chatbot, İletişim vb.)
    ├── store/              # Redux Toolkit mağaza ve dilimleri (slices)
    ├── App.jsx             # Ana React bileşeni ve route yapılandırmaları
    └── index.css           # Global Tailwind CSS stilleri
\`\`\`

---

## 🔒 Güvenlik Notları
- `.env` dosyası her zaman `.gitignore` içinde yer almalı ve API anahtarları asla GitHub veya benzeri herkese açık platformlara yüklenmemelidir.
- Projedeki API istekleri, frontend yerine **backend (server.js)** üzerinden yapıldığı için API key güvenliği garanti altına alınmıştır.

---
*Bu proje, modern web geliştirme teknolojileri ile hayvan dostlarımızın sağlık süreçlerini dijitalleştirmek ve kolaylaştırmak vizyonuyla hazırlanmıştır.* ❤️🐶🐱
