"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Settings, 
  BarChart3, 
  Store,
  Bell,
  Users,
  Receipt
} from 'lucide-react';
import type { NavItem } from '@/types';

const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Siparişler',
    href: '/orders',
    icon: ShoppingBag,
    badge: 5, // Yeni sipariş sayısı
  },
  {
    title: 'Restoran Yönetimi',
    href: '/restaurant',
    icon: Store,
  },
  {
    title: 'Raporlar',
    href: '/reports',
    icon: BarChart3,
  },
  {
    title: 'Müşteriler',
    href: '/customers',
    icon: Users,
  },
  {
    title: 'Faturalar',
    href: '/invoices',
    icon: Receipt,
  },
  {
    title: 'Bildirimler',
    href: '/notifications',
    icon: Bell,
  },
  {
    title: 'Ayarlar',
    href: '/settings',
    icon: Settings,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex h-full w-64 flex-col bg-background border-r", className)}>
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Store className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold">All-in-POS</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-10",
                isActive && "bg-secondary"
              )}
              asChild
            >
              <Link href={item.href}>
                <Icon className="mr-3 h-4 w-4" />
                <span className="flex-1 text-left">{item.title}</span>
                {item.badge && (
                  <Badge variant="destructive" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          v1.0.0 - Multi-Platform POS
        </div>
      </div>
    </div>
  );
} 