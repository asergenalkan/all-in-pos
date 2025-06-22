"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/main-layout';
import { RealtimeMetrics } from '@/components/dashboard/realtime-metrics';
import { SalesChart } from '@/components/dashboard/sales-chart';
import { AnalyticsCharts } from '@/components/dashboard/analytics-charts';
import { NotificationCenter } from '@/components/dashboard/notification-center';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Bell,
  ShoppingBag,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Package
} from 'lucide-react';
import { mockOrders } from '@/lib/mock-data';
import { PLATFORM_COLORS, STATUS_COLORS, STATUS_LABELS, PLATFORM_LABELS } from '@/constants';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  // Calculate stats from mock orders
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const newOrders = mockOrders.filter(order => order.status === 'new').length;
  const avgOrderValue = totalRevenue / totalOrders;
  const activeCustomers = new Set(mockOrders.map(order => order.customer.phone)).size;

  // Recent orders (last 3)
  const recentOrders = mockOrders
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    .slice(0, 3);

  // Platform status simulation
  const platformStatus = [
    { name: 'Yemeksepeti', status: 'online', orders: mockOrders.filter(o => o.platform === 'yemeksepeti').length },
    { name: 'Getir', status: 'online', orders: mockOrders.filter(o => o.platform === 'getir').length },
    { name: 'Trendyol', status: 'offline', orders: 0 },
    { name: 'Migros', status: 'online', orders: mockOrders.filter(o => o.platform === 'migros').length }
  ];

  // Stats cards data
  const stats = [
    {
      title: "Toplam Sipariş",
      value: totalOrders.toString(),
      change: "+12%",
      trend: "up",
      icon: ShoppingBag,
      color: "text-blue-600"
    },
    {
      title: "Günlük Gelir",
      value: `₺${totalRevenue.toFixed(2)}`,
      change: "+8%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Aktif Müşteri",
      value: activeCustomers.toString(),
      change: "+5%",
      trend: "up",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Ortalama Sipariş",
      value: `₺${avgOrderValue.toFixed(2)}`,
      change: "+2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} dk önce`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} saat önce`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} gün önce`;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Restoranınızın performansını takip edin ve analiz edin.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Rapor Al</Button>
            <Button>Yeni Sipariş</Button>
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Genel Bakış
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Satış Analizi
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Detaylı Analiz
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Bildirimler
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab - Hybrid of old and new */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                          {stat.change}
                        </span>
                        {" "}geçen haftaya göre
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Orders */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Son Siparişler</CardTitle>
                  <CardDescription>
                    En son gelen sipariş durumları
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => {
                      const platformColor = PLATFORM_COLORS[order.platform];
                      const statusColor = STATUS_COLORS[order.status];
                      
                      return (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div>
                              <p className="font-medium">{order.orderId}</p>
                              <p className="text-sm text-muted-foreground">{order.customer.name}</p>
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={cn(platformColor.bg, platformColor.text)}
                            >
                              {PLATFORM_LABELS[order.platform]}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-medium">₺{order.totalAmount.toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">{formatTimeAgo(order.orderDate)}</p>
                            </div>
                            <Badge 
                              variant="secondary"
                              className={cn(statusColor.bg, statusColor.text)}
                            >
                              {STATUS_LABELS[order.status]}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Platform Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Durumu</CardTitle>
                  <CardDescription>
                    Anlık platform bağlantı durumu
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {platformStatus.map((platform) => (
                    <div key={platform.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          platform.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className="font-medium">{platform.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{platform.orders} sipariş</p>
                        <p className="text-xs text-muted-foreground">
                          {platform.status === 'online' ? 'Bağlı' : 'Bağlantı Yok'}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Hızlı İşlemler</CardTitle>
                <CardDescription>
                  Sık kullanılan işlemlere hızlı erişim
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Package className="h-5 w-5" />
                    <span className="text-sm">Menü Güncelle</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm">Stok Bitir</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">Toplu Onayla</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-sm">Rapor Görüntüle</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Metrics Section */}
            <RealtimeMetrics />
          </TabsContent>

          {/* Sales Analytics Tab */}
          <TabsContent value="sales" className="space-y-6">
            <SalesChart />
          </TabsContent>

          {/* Detailed Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsCharts />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <NotificationCenter />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
} 