# AIO Coffee & Kitchen — Online Sipariş & Menü Web Uygulaması

Modern, hızlı ve mobil %100 uyumlu online menü ve doğrudan WhatsApp sipariş platformu.

## 🚀 Özellikler

- **Çift Dil Desteği (TR / EN):** Tek tıkla Türkçe ve İngilizce arasında anında geçiş.
- **2'li Ürün Kartı Izgarası:** Hem mobil hem masaüstünde optimize edilmiş, yüksek dönüşümlü ürün listeleme.
- **Detaylı Ürün Kişiselleştirme Modalı:**
  - 250 ml standart kutu içecekten 330 ml kutu içeceklere yükseltme seçimi.
  - Cheddarlı, Parmesanlı, Duble Cheese ve Büyük Boy patates seçenekleri.
  - Ekstra yan porsiyonlar ve dip sos ekleme.
  - Sipariş / ürün özel notu girebilme.
- **Sepet ve Teslimat Bilgileri Formu:**
  - Müşteri Ad Soyad ve Teslimat Adresi zorunlu alan doğrulaması.
  - İsteğe bağlı telefon ve kurye teslimat notu.
- **WhatsApp Entegrasyonu:**
  - Tek tıkla düzenli, okunaklı ve fiyat dökümlü mesaj oluşturarak doğrudan işletme WhatsApp hattına (`0549 711 32 24`) yönlendirme.
- **Veritabanı Gerektirmeyen (Serverless / Static) Mimari:**
  - Vercel, Netlify veya GitHub Pages üzerinde sıfır konfigürasyon ile doğrudan çalışır.
  - Tüm görseller yerel dosya sisteminde barındırılır.

## 🛠️ Teknolojiler

- **React 19**
- **Vite 7**
- **Tailwind CSS & Modern CSS**
- **Framer Motion**

## 📦 Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Canlı (Production) derlemesi alın
npm run build
```

## 🌐 Dağıtım (Vercel)

Proje root dizininde yer alan `vercel.json` SPA yönlendirmeleri için yapılandırılmıştır. GitHub reposunu Vercel'e bağlayarak doğrudan canlıya alabilirsiniz.
