"use client"

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { formatDistanceToNow, format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Printer,
  MessageSquare,
  Edit,
  MoreHorizontal,
  Navigation,
  CreditCard,
  Package,
  Truck
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockOrders } from '@/lib/mock-data';
import { Order } from '@/types';
import { PLATFORM_COLORS, STATUS_COLORS, STATUS_LABELS, PLATFORM_LABELS } from '@/constants';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = React.useState<Order | null>(
    mockOrders.find(o => o.id === orderId) || null
  );

  if (!order) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Package className="h-12 w-12 mx-auto opacity-50" />
            <h2 className="text-xl font-semibold">Sipariş bulunamadı</h2>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const platformColor = PLATFORM_COLORS[order.platform];
  const statusColor = STATUS_COLORS[order.status];

  const formatPrice = (price: number) => {
    return `₺${price.toFixed(2)}`;
  };

  const getTimeAgo = (date: string) => {
    return formatDistanceToNow(new Date(date), { 
      addSuffix: true,
      locale: tr 
    });
  };

  const handleStatusChange = (newStatus: Order['status']) => {
    setOrder(prev => prev ? { ...prev, status: newStatus } : null);
    toast.success(`Sipariş durumu "${STATUS_LABELS[newStatus]}" olarak güncellendi`);
  };

  const handlePrint = () => {
    toast.success('Sipariş fişi yazdırılıyor...');
  };

  const handleCall = () => {
    window.open(`tel:${order.customer.phone}`);
  };

  const handleNavigate = () => {
    const address = `${order.customer.address.street}, ${order.customer.address.district}, ${order.customer.address.city}`;
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    const statusFlow: Record<Order['status'], Order['status'] | null> = {
      new: 'confirmed',
      confirmed: 'preparing', 
      preparing: 'ready',
      ready: 'picked_up',
      picked_up: 'delivered',
      delivered: null,
      cancelled: null
    };
    return statusFlow[currentStatus];
  };

  const nextStatus = getNextStatus(order.status);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Button>
            
            <div>
              <h1 className="text-3xl font-bold">{order.orderId}</h1>
              <p className="text-muted-foreground">
                Sipariş detayları ve müşteri bilgileri
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Yazdır
            </Button>
            
            {nextStatus && (
              <Button 
                onClick={() => handleStatusChange(nextStatus)}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {STATUS_LABELS[nextStatus]}
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleStatusChange('cancelled')}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Siparişi İptal Et
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Düzenle
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Not Ekle
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: platformColor.primary }}
                    />
                    <CardTitle>Sipariş Özeti</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="secondary"
                      className={cn(platformColor.bg, platformColor.text)}
                    >
                      {PLATFORM_LABELS[order.platform]}
                    </Badge>
                    <Badge 
                      variant="secondary"
                      className={cn(statusColor.bg, statusColor.text)}
                    >
                      {STATUS_LABELS[order.status]}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Sipariş Tarihi</p>
                    <p className="font-medium">
                      {format(new Date(order.orderDate), 'dd MMMM yyyy, HH:mm', { locale: tr })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getTimeAgo(order.orderDate)}
                    </p>
                  </div>
                  
                  {order.estimatedDeliveryTime && (
                    <div>
                      <p className="text-sm text-muted-foreground">Tahmini Teslimat</p>
                      <p className="font-medium">
                        {format(new Date(order.estimatedDeliveryTime), 'HH:mm', { locale: tr })}
                      </p>
                    </div>
                  )}
                </div>

                {order.notes && (
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium mb-2">Sipariş Notu:</p>
                    <p className="text-sm italic">"{order.notes}"</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Sipariş İçeriği</CardTitle>
                <CardDescription>
                  {order.items.length} ürün
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{item.quantity}x</span>
                          <h4 className="font-medium">{item.name}</h4>
                        </div>
                        
                        {item.options && item.options.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {item.options.map((option, index) => (
                              <div key={index} className="text-sm text-muted-foreground">
                                <span className="font-medium">{option.name}:</span> {option.value}
                                {option.price && (
                                  <span className="ml-2">+{formatPrice(option.price)}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {item.notes && (
                          <p className="mt-2 text-sm text-muted-foreground italic">
                            Not: {item.notes}
                          </p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(item.price)}</p>
                        <p className="text-sm text-muted-foreground">birim</p>
                        <p className="font-semibold text-lg">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <Separator />
                  
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Toplam Tutar:</span>
                    <span>{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Müşteri Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium text-lg">{order.customer.name}</p>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{order.customer.phone}</span>
                    <Button size="sm" variant="outline" onClick={handleCall}>
                      Ara
                    </Button>
                  </div>
                  {order.customer.email && (
                    <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div className="flex-1">
                      <p className="text-sm">{order.customer.address.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer.address.district}, {order.customer.address.city}
                      </p>
                      {order.customer.address.zipCode && (
                        <p className="text-sm text-muted-foreground">
                          {order.customer.address.zipCode}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" onClick={handleNavigate} className="w-full">
                    <Navigation className="h-4 w-4 mr-2" />
                    Haritada Göster
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Fiş Yazdır
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={handleCall}>
                  <Phone className="h-4 w-4 mr-2" />
                  Müşteriyi Ara
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={handleNavigate}>
                  <Navigation className="h-4 w-4 mr-2" />
                  Adrese Git
                </Button>
                
                {(order.status === 'new' || order.status === 'confirmed') && (
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start"
                    onClick={() => handleStatusChange('cancelled')}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Siparişi İptal Et
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Sipariş Durumu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { status: 'new', label: 'Sipariş Alındı', icon: Package },
                    { status: 'confirmed', label: 'Onaylandı', icon: CheckCircle },
                    { status: 'preparing', label: 'Hazırlanıyor', icon: Clock },
                    { status: 'ready', label: 'Hazır', icon: CheckCircle },
                    { status: 'picked_up', label: 'Alındı', icon: Truck },
                    { status: 'delivered', label: 'Teslim Edildi', icon: CheckCircle }
                  ].map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = getCurrentStatusIndex(order.status) >= index;
                    const isCurrent = step.status === order.status;
                    
                    return (
                      <div key={step.status} className="flex items-center space-x-3">
                        <div className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full",
                          isCompleted 
                            ? "bg-green-100 text-green-600" 
                            : "bg-muted text-muted-foreground",
                          isCurrent && "ring-2 ring-primary"
                        )}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className={cn(
                          "text-sm",
                          isCompleted ? "font-medium" : "text-muted-foreground"
                        )}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function getCurrentStatusIndex(status: Order['status']): number {
  const statusOrder: Order['status'][] = ['new', 'confirmed', 'preparing', 'ready', 'picked_up', 'delivered'];
  return statusOrder.indexOf(status);
} 