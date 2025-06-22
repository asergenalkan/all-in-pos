'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  DollarSign, 
  Clock, 
  Star,
  CheckCircle,
  XCircle,
  WifiOff
} from 'lucide-react';
import { getRealtimeMetrics, type RealtimeMetrics } from '@/lib/analytics-data';
import { PLATFORM_COLORS } from '@/constants';

const PLATFORM_NAMES = {
  yemeksepeti: 'Yemeksepeti',
  getir: 'Getir',
  trendyol: 'Trendyol',
  migros: 'Migros'
} as const;

export function RealtimeMetrics() {
  const [metrics, setMetrics] = useState<RealtimeMetrics>(getRealtimeMetrics());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(getRealtimeMetrics());
      setLastUpdate(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const formatTime = (minutes: number) => {
    return `${minutes} dk`;
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gerçek Zamanlı Takip</h2>
          <p className="text-muted-foreground">
            Son güncelleme: {lastUpdate.toLocaleTimeString('tr-TR')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Canlı</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Siparişler</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeOrders}</div>
            <p className="text-xs text-muted-foreground">
              Şu anda işlenmekte
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bugünkü Ciro</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(metrics.todayRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Bugünkü toplam
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ort. Hazırlık Süresi</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTime(metrics.avgPreparationTime)}
            </div>
            <p className="text-xs text-muted-foreground">
              Son 1 saatte
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Müşteri Memnuniyeti</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatRating(metrics.customerSatisfaction)}
            </div>
            <p className="text-xs text-muted-foreground">
              5 üzerinden
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Status */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Durumu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(metrics.platformStatus).map(([platform, isOnline]) => (
              <div 
                key={platform}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: PLATFORM_COLORS[platform as keyof typeof PLATFORM_COLORS].primary }}
                  />
                  <span className="font-medium">
                    {PLATFORM_NAMES[platform as keyof typeof PLATFORM_NAMES]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {isOnline ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge variant="outline" className="text-xs">
                        Aktif
                      </Badge>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <Badge variant="destructive" className="text-xs">
                        Sorun
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı Aksiyonlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="p-3 text-left rounded-lg border hover:bg-accent transition-colors">
              <div className="font-medium">Tüm Siparişleri Onayla</div>
              <div className="text-sm text-muted-foreground">Bekleyen 12 sipariş</div>
            </button>
            <button className="p-3 text-left rounded-lg border hover:bg-accent transition-colors">
              <div className="font-medium">Rapor Yazdır</div>
              <div className="text-sm text-muted-foreground">Günlük özet</div>
            </button>
            <button className="p-3 text-left rounded-lg border hover:bg-accent transition-colors">
              <div className="font-medium">Yedekleme</div>
              <div className="text-sm text-muted-foreground">Veri güvenliği</div>
            </button>
            <button className="p-3 text-left rounded-lg border hover:bg-accent transition-colors">
              <div className="font-medium">Ayarlar</div>
              <div className="text-sm text-muted-foreground">Sistem tercihleri</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 