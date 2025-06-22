"use client"

import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock,
  Phone,
  MapPin,
  ShoppingBag,
  Eye,
  CheckCircle,
  XCircle,
  ArrowRight
} from 'lucide-react';
import { Order } from '@/types';
import { PLATFORM_COLORS, STATUS_COLORS, STATUS_LABELS, PLATFORM_LABELS } from '@/constants';
import { cn } from '@/lib/utils';

interface OrderCardProps {
  order: Order;
  onStatusChange?: (orderId: string, status: Order['status']) => void;
}

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
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

  const getDeliveryTime = (date: string) => {
    const deliveryTime = new Date(date);
    const now = new Date();
    const diff = deliveryTime.getTime() - now.getTime();
    
    if (diff < 0) {
      return "Geçmiş";
    }
    
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 60) {
      return `${minutes} dk`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}s ${remainingMinutes}dk`;
  };

  const handleStatusChange = (newStatus: Order['status']) => {
    onStatusChange?.(order.id, newStatus);
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
    <Card className="relative overflow-hidden transition-all hover:shadow-md">
      {/* Platform Color Strip */}
      <div 
        className="absolute top-0 left-0 w-1 h-full"
        style={{ backgroundColor: platformColor.primary }}
      />
      
      <CardContent className="p-6 pl-8">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-lg">{order.orderId}</h3>
                <Badge 
                  variant="secondary"
                  className={cn(platformColor.bg, platformColor.text)}
                >
                  {PLATFORM_LABELS[order.platform]}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{getTimeAgo(order.orderDate)}</span>
                </div>
                {order.estimatedDeliveryTime && (
                  <div className="flex items-center space-x-1">
                    <ArrowRight className="h-4 w-4" />
                    <span>{getDeliveryTime(order.estimatedDeliveryTime)}</span>
                  </div>
                )}
              </div>
            </div>

            <Badge 
              variant="secondary"
              className={cn(statusColor.bg, statusColor.text)}
            >
              {STATUS_LABELS[order.status]}
            </Badge>
          </div>

          {/* Customer Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{order.customer.name}</span>
              <span className="text-sm text-muted-foreground">
                {order.customer.phone}
              </span>
            </div>
            
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <div>{order.customer.address.street}</div>
                <div>{order.customer.address.district}, {order.customer.address.city}</div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {order.items.length} ürün
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {order.items.slice(0, 2).map((item, index) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.quantity}x {item.name}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              {order.items.length > 2 && (
                <div className="text-xs text-muted-foreground mt-1">
                  +{order.items.length - 2} daha fazla ürün...
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground italic">
                "{order.notes}"
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-right">
              <div className="text-xl font-bold">
                {formatPrice(order.totalAmount)}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link href={`/orders/${order.id}`}>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Detay
                </Button>
              </Link>
              
              {nextStatus && (
                <Button 
                  size="sm"
                  onClick={() => handleStatusChange(nextStatus)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {STATUS_LABELS[nextStatus]}
                </Button>
              )}
              
              {(order.status === 'new' || order.status === 'confirmed') && (
                <Button 
                  variant="destructive"
                  size="sm"
                  onClick={() => handleStatusChange('cancelled')}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  İptal
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 