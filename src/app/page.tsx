import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  ShoppingBag, 
  BarChart3, 
  Settings,
  CheckCircle,
  Smartphone,
  Zap,
  Shield
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: ShoppingBag,
      title: 'Multi-Platform Yönetim',
      description: 'Yemeksepeti, Getir, Trendyol ve Migros siparişlerini tek ekrandan yönetin'
    },
    {
      icon: Zap,
      title: 'Otomatik İşlemler',
      description: 'Otomatik onaylama, yazdırma ve teslim işlemleri ile zamandan tasarruf edin'
    },
    {
      icon: BarChart3,
      title: 'Detaylı Raporlama',
      description: 'Satış analizleri ve performans raporları ile işinizi büyütün'
    },
    {
      icon: Smartphone,
      title: 'Mobil Uyumlu',
      description: 'Her cihazdan erişim sağlayın, istediğiniz yerden yönetin'
    },
    {
      icon: Shield,
      title: 'Güvenli Altyapı',
      description: 'Enterprise düzeyinde güvenlik ile verileriniz koruma altında'
    },
    {
      icon: Settings,
      title: 'Kolay Kurulum',
      description: 'Hızlı kurulum ve kullanıcı dostu arayüz ile hemen başlayın'
    }
  ];

  const platforms = [
    { name: 'Yemeksepeti', status: 'active' },
    { name: 'Getir', status: 'active' },
    { name: 'Trendyol', status: 'active' },
    { name: 'Migros', status: 'coming-soon' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Store className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold">All-in-POS</span>
          </div>
          <Link href="/login">
            <Button>Giriş Yap</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Beta Sürümü Kullanıma Hazır
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Tüm Siparişlerinizi
            <span className="text-primary"> Tek Ekrandan</span>
            <br />Yönetin
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Yemeksepeti, Getir, Trendyol ve Migros'tan gelen siparişlerinizi tek platformda yönetin. 
            Otomatik işlemler ve detaylı raporlarla işletmenizi büyütün.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Hemen Deneyin
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Demo İzle
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Support */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Desteklenen Platformlar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {platforms.map((platform) => (
              <Card key={platform.name} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{platform.name}</span>
                  {platform.status === 'active' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Yakında
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Neden All-in-POS?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Restoran işletmeciliğini kolaylaştıran özellikleri keşfedin
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siparişlerinizi Yönetmeye Başlayın
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Ücretsiz deneme sürümü ile platformu keşfedin. 
            Kurulum sadece 5 dakika, sonuçları anında görün.
          </p>
          <Link href="/login">
            <Button size="lg" variant="secondary">
              Ücretsiz Başlayın
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Store className="h-3 w-3" />
            </div>
            <span className="font-semibold">All-in-POS</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 All-in-POS. Multi-platform sipariş yönetim sistemi.
          </p>
        </div>
      </footer>
    </div>
  );
}
