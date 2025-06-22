'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Package, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  X,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'order' | 'warning' | 'success' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  platform?: string;
  orderNumber?: string;
}

const NOTIFICATION_TYPES = {
  order: { icon: Package, color: 'bg-blue-500', textColor: 'text-blue-600' },
  warning: { icon: AlertTriangle, color: 'bg-yellow-500', textColor: 'text-yellow-600' },
  success: { icon: CheckCircle, color: 'bg-green-500', textColor: 'text-green-600' },
  info: { icon: Bell, color: 'bg-gray-500', textColor: 'text-gray-600' }
};

const generateRandomNotification = (): Notification => {
  const types: (keyof typeof NOTIFICATION_TYPES)[] = ['order', 'warning', 'success', 'info'];
  const platforms = ['Yemeksepeti', 'Getir', 'Trendyol', 'Migros'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  const notifications = {
    order: [
      'Yeni sipariş alındı',
      'Sipariş onaylandı',
      'Sipariş hazırlanıyor',
      'Sipariş hazır'
    ],
    warning: [
      'Sipariş gecikmesi',
      'Platform bağlantı sorunu',
      'Stok uyarısı',
      'Yoğun sipariş trafiği'
    ],
    success: [
      'Sipariş teslim edildi',
      'Müşteri memnuniyeti',
      'Hedef başarıldı',
      'Platform entegrasyonu başarılı'
    ],
    info: [
      'Sistem güncellemesi',
      'Yeni özellik',
      'Bakım bildirimi',
      'Rapor hazır'
    ]
  };

  const messages = {
    order: [
      'Platform üzerinden yeni bir sipariş geldi.',
      'Müşteri siparişini onayladı, hazırlamaya başlayabilirsiniz.',
      'Sipariş mutfakta hazırlanıyor.',
      'Sipariş hazır, kurye bekliyor.'
    ],
    warning: [
      'Sipariş beklenen süreden daha uzun sürüyor.',
      'Platform ile bağlantıda sorun var, kontrol edin.',
      'Bazı ürünlerin stoğu azaldı.',
      'Normalden %150 daha fazla sipariş var.'
    ],
    success: [
      'Sipariş başarıyla teslim edildi.',
      'Müşteri 5 yıldız verdi.',
      'Günlük satış hedefi aşıldı.',
      'Tüm platformlar aktif.'
    ],
    info: [
      'Sistem güncellemesi tamamlandı.',
      'Yeni analitik özelliği eklendi.',
      'Bu gece bakım yapılacak.',
      'Haftalık rapor hazırlandı.'
    ]
  };

  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const titleIndex = Math.floor(Math.random() * notifications[type].length);
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    title: notifications[type][titleIndex],
    message: messages[type][titleIndex],
    timestamp: new Date(),
    read: false,
    platform: type === 'order' ? platform : undefined,
    orderNumber: type === 'order' ? `#${Math.floor(Math.random() * 9000) + 1000}` : undefined
  };
};

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Initial notifications
    const initialNotifications = Array.from({ length: 5 }, generateRandomNotification);
    setNotifications(initialNotifications);
    setUnreadCount(initialNotifications.length);

    // Generate new notifications periodically
    const interval = setInterval(() => {
      const newNotification = generateRandomNotification();
      
      setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Keep only last 20
      setUnreadCount(prev => prev + 1);
      
      // Show toast notification
      toast(newNotification.title, {
        description: newNotification.message,
        action: {
          label: 'Görüntüle',
          onClick: () => setIsExpanded(true)
        }
      });
    }, 15000); // New notification every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} saniye önce`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
    return `${Math.floor(diffInSeconds / 86400)} gün önce`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => prev - 1);
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const clearNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => prev - 1);
    }
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>Bildirimler</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs"
              >
                Tümünü Okundu İşaretle
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Daralt' : 'Genişlet'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`space-y-3 ${isExpanded ? 'max-h-96 overflow-y-auto' : 'max-h-48 overflow-hidden'}`}>
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Henüz bildirim yok</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const NotificationIcon = NOTIFICATION_TYPES[notification.type].icon;
              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer hover:bg-accent ${
                    !notification.read ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${NOTIFICATION_TYPES[notification.type].color}`}>
                    <NotificationIcon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-medium text-sm ${!notification.read ? 'font-semibold' : ''}`}>
                        {notification.title}
                        {notification.orderNumber && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            {notification.orderNumber}
                          </span>
                        )}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearNotification(notification.id);
                        }}
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatTimeAgo(notification.timestamp)}</span>
                      {notification.platform && (
                        <Badge variant="outline" className="text-xs">
                          {notification.platform}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        {!isExpanded && notifications.length > 3 && (
          <div className="pt-3 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsExpanded(true)}
              className="w-full"
            >
              {notifications.length - 3} daha fazla bildirim görüntüle
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 