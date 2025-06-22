# All-in-POS Proje Devam Rehberi

## Proje Özeti
**All-in-POS**, Yemeksepeti, Getir, Trendyol ve Migros'tan gelen siparişlerin tek ekrandan yönetildiği multi-platform sipariş yönetim sistemidir. Otomatik onaylama, yazdırma ve teslim özellikleri içerir.

## Teknoloji Stack ve Kullanım Amaçları

### Frontend Teknolojileri
- **Next.js 15** - React framework, SSR/SSG desteği, App Router kullanımda
- **TypeScript** - Type safety ve geliştirici deneyimi için
- **TailwindCSS** - Utility-first CSS framework, hızlı styling
- **shadcn/ui** - Hazır UI bileşenleri, tutarlı tasarım sistemi
- **Tanstack Query (React Query)** - Server state management, caching, DevTools aktif
- **date-fns** - Tarih işlemleri ve formatlaması
- **Recharts** - Dashboard grafikleri ve analytics için
- **react-use** - Utility hooks (useLocalStorage vb.)
- **Sonner** - Toast notification sistemi
- **Lucide React** - Icon library

### Backend Hedef Teknolojileri (Henüz implement edilmedi)
- **Node.js + TypeScript** - Backend runtime
- **Fastify** - Hızlı web framework
- **JWT (jose)** - Authentication (frontend'de hazır)
- **Neon PostgreSQL** - Veritabanı

### UI Bileşenleri (shadcn/ui)
Yüklü bileşenler:
- `button`, `card`, `dialog`, `select`, `tabs`
- `sonner`, `switch`, `dropdown-menu`, `badge`
- `table`, `input`, `label`, `form`, `avatar`, `sheet`
- `separator` (sonradan eklendi)

## Proje Yapısı ve Dosya Organizasyonu

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/login/      # Authentication route group
│   ├── dashboard/         # Dashboard sayfası
│   ├── orders/           # Sipariş yönetimi
│   │   └── [id]/         # Sipariş detay sayfası
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── dashboard/        # Dashboard bileşenleri
│   ├── layout/          # Layout bileşenleri (sidebar, header)
│   ├── orders/          # Sipariş bileşenleri
│   ├── providers/       # Context providers
│   └── ui/              # shadcn/ui bileşenleri
├── constants/           # Sabitler ve konfigürasyon
├── lib/                # Utility fonksiyonlar
├── types/              # TypeScript type definitions
└── hooks/              # Custom React hooks
```

## Mevcut Özellikler ve Durumları

### ✅ Tamamlanan Özellikler
1. **Authentication Sistemi**
   - Login sayfası: `/login`
   - Demo credentials: `admin@restaurant.com` / `123456`
   - JWT token yönetimi (jose paketi)
   - Cookie-based session

2. **Layout ve Navigation**
   - Responsive sidebar navigation
   - Header (theme toggle, notifications, user menu)
   - Dark/Light mode desteği
   - Mobile Sheet menu

3. **Sipariş Yönetimi**
   - Sipariş listesi (`/orders`) - grid/list view
   - Sipariş detay sayfası (`/orders/[id]`)
   - Filtreleme (platform, durum, tarih, arama)
   - Status değiştirme
   - Mock data (6 sipariş)

4. **Dashboard Analytics**
   - Gerçek zamanlı metrikler (5sn güncelleme)
   - Satış grafikleri (Area, Line, Bar, Pie charts)
   - Platform performans analizi
   - Bildirim merkezi (15sn aralıklarla)

### 🔄 Platform Entegrasyonları
**Platform Renk Kodları:**
- Yemeksepeti: `#e31e24` (kırmızı)
- Getir: `#5d3ebc` (mor)
- Trendyol: `#f27a1a` (turuncu)
- Migros: `#0066cc` (mavi)

**Sipariş Durumları:**
- `pending` - Beklemede
- `confirmed` - Onaylandı
- `preparing` - Hazırlanıyor
- `ready` - Hazır
- `delivered` - Teslim Edildi
- `cancelled` - İptal Edildi

## Önemli Dosyalar ve İçerikleri

### Mock Data (`src/lib/mock-data.ts`)
- 6 adet örnek sipariş
- Farklı platformlardan siparişler
- Gerçekçi müşteri bilgileri ve ürün listesi

### Analytics Data (`src/lib/analytics-data.ts`)
- 30 günlük satış verisi generator
- Platform performans metrikleri
- Saatlik sipariş dağılımı
- Gerçek zamanlı veri simülasyonu

### Constants (`src/constants/index.ts`)
- Platform bilgileri ve renkleri
- Status tanımları
- Navigation menü öğeleri

### Types (`src/types/index.ts`)
- Order, Customer, Platform interfaces
- Status enums
- Analytics types

## Geliştirme Komutları

```bash
# Geliştirme sunucusu (önceki process'i sonlandır)
pkill -f "next dev" || true
npm run dev

# Build
npm run build

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

## Sıradaki Geliştirme Hedefleri (Faz 5)

### Backend Entegrasyonları
1. **API Entegrasyonları**
   - Yemeksepeti API
   - Getir Restoran API
   - Trendyol Mağaza API
   - Migros Sanal Market API

2. **Otomatik Sistemler**
   - Otomatik sipariş onaylama
   - Termal printer entegrasyonu
   - Email/SMS bildirim sistemi

3. **Veritabanı (Neon PostgreSQL)**
   - Orders tablosu
   - Customers tablosu
   - Platform_integrations tablosu
   - Settings tablosu

### Frontend Geliştirmeleri
1. **Yeni Sayfalar**
   - `/customers` - Müşteri yönetimi
   - `/settings` - Sistem ayarları
   - `/reports` - Raporlama
   - `/restaurant` - Restoran bilgileri

2. **Gelişmiş Özellikler**
   - Real-time sipariş bildirimleri
   - Printer ayarları
   - Platform API key yönetimi
   - Bulk operations

## Önemli Notlar

1. **Font Sorunu Çözümü**: Local fontlardan Google Fonts'a (Inter, JetBrains Mono) geçiş yapıldı
2. **TypeScript Hataları**: PLATFORM_COLORS objelerinde `.primary` kullanımı düzeltildi
3. **Responsive Design**: Mobile-first yaklaşım uygulandı
4. **Performance**: Filtering ve memoization optimizasyonları yapıldı
5. **Accessibility**: WCAG standartları dikkate alındı

## GitHub Repository
- **URL**: https://github.com/asergenalkan/all-in-pos
- **Branch**: main
- **Status**: Private repository
- **Git Config**: Düzeltildi (user.name ve user.email ayarlandı)

## Demo Bilgileri
- **Login**: admin@restaurant.com / 123456
- **Local URL**: http://localhost:3000
- **Network URL**: http://192.168.1.34:3000

## Kullanılan Paketler ve Versiyonlar

```json
{
  "dependencies": {
    "next": "15.3.4",
    "react": "^19.0.0",
    "typescript": "^5",
    "@tanstack/react-query": "^5.62.7",
    "date-fns": "^4.1.0",
    "recharts": "^2.15.0",
    "react-use": "^17.5.1",
    "sonner": "^1.7.1",
    "jose": "^5.9.6",
    "lucide-react": "^0.468.0"
  }
}
```

Bu rehber, projeye gelecekte devam etmek için gerekli tüm teknik detayları içermektedir. Lütfen bu dosyayı referans alarak geliştirmeye devam edin. 