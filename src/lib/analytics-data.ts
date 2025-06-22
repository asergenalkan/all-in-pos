import { Order } from '@/types';

// Sales Analytics Data
export interface SalesData {
  date: string;
  totalSales: number;
  orderCount: number;
  yemeksepeti: number;
  getir: number;
  trendyol: number;
  migros: number;
}

export interface PlatformStats {
  platform: string;
  orders: number;
  revenue: number;
  avgOrderValue: number;
  growthRate: number;
  color: string;
}

export interface HourlyData {
  hour: string;
  orders: number;
  revenue: number;
}

export interface StatusDistribution {
  status: string;
  count: number;
  percentage: number;
  color: string;
}

// Generate mock sales data for the last 30 days
export function generateSalesData(): SalesData[] {
  const data: SalesData[] = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate realistic sales data with some patterns
    const baseOrders = 45 + Math.random() * 30;
    const weekendMultiplier = [0, 6].includes(date.getDay()) ? 1.3 : 1.0;
    const totalOrders = Math.floor(baseOrders * weekendMultiplier);
    
    const avgOrderValue = 85 + Math.random() * 40;
    const totalSales = totalOrders * avgOrderValue;
    
    // Platform distribution (realistic percentages)
    const yemeksepeti = totalSales * (0.35 + Math.random() * 0.1);
    const getir = totalSales * (0.25 + Math.random() * 0.1);
    const trendyol = totalSales * (0.20 + Math.random() * 0.1);
    const migros = totalSales * (0.15 + Math.random() * 0.1);
    
    data.push({
      date: date.toISOString().split('T')[0],
      totalSales: Math.round(totalSales),
      orderCount: totalOrders,
      yemeksepeti: Math.round(yemeksepeti),
      getir: Math.round(getir),
      trendyol: Math.round(trendyol),
      migros: Math.round(migros)
    });
  }
  
  return data;
}

// Platform performance comparison
export function getPlatformStats(): PlatformStats[] {
  return [
    {
      platform: 'Yemeksepeti',
      orders: 1245,
      revenue: 89650,
      avgOrderValue: 72.00,
      growthRate: 12.5,
      color: '#d91f2a'
    },
    {
      platform: 'Getir',
      orders: 867,
      revenue: 65430,
      avgOrderValue: 75.50,
      growthRate: 8.3,
      color: '#5d3ebc'
    },
    {
      platform: 'Trendyol',
      orders: 623,
      revenue: 52180,
      avgOrderValue: 83.75,
      growthRate: 15.7,
      color: '#f27a1a'
    },
    {
      platform: 'Migros',
      orders: 432,
      revenue: 34560,
      avgOrderValue: 80.00,
      growthRate: 6.2,
      color: '#0056d6'
    }
  ];
}

// Hourly order distribution
export function getHourlyData(): HourlyData[] {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    let orders = 0;
    
    // Peak hours: 12-14 (lunch) and 19-21 (dinner)
    if (i >= 11 && i <= 14) {
      orders = 15 + Math.random() * 25;
    } else if (i >= 18 && i <= 21) {
      orders = 20 + Math.random() * 30;
    } else if (i >= 8 && i <= 10) {
      orders = 8 + Math.random() * 12;
    } else if (i >= 15 && i <= 17) {
      orders = 10 + Math.random() * 15;
    } else {
      orders = Math.random() * 8;
    }
    
    hours.push({
      hour: `${i.toString().padStart(2, '0')}:00`,
      orders: Math.round(orders),
      revenue: Math.round(orders * (70 + Math.random() * 30))
    });
  }
  
  return hours;
}

// Order status distribution
export function getStatusDistribution(): StatusDistribution[] {
  return [
    {
      status: 'Yeni',
      count: 23,
      percentage: 15.3,
      color: '#3b82f6'
    },
    {
      status: 'Onaylandı',
      count: 31,
      percentage: 20.7,
      color: '#10b981'
    },
    {
      status: 'Hazırlanıyor',
      count: 45,
      percentage: 30.0,
      color: '#f59e0b'
    },
    {
      status: 'Hazır',
      count: 28,
      percentage: 18.7,
      color: '#22c55e'
    },
    {
      status: 'Yolda',
      count: 15,
      percentage: 10.0,
      color: '#6366f1'
    },
    {
      status: 'Teslim Edildi',
      count: 8,
      percentage: 5.3,
      color: '#64748b'
    }
  ];
}

// Real-time metrics
export interface RealtimeMetrics {
  activeOrders: number;
  todayRevenue: number;
  avgPreparationTime: number;
  customerSatisfaction: number;
  platformStatus: {
    yemeksepeti: boolean;
    getir: boolean;
    trendyol: boolean;
    migros: boolean;
  };
}

export function getRealtimeMetrics(): RealtimeMetrics {
  return {
    activeOrders: 47 + Math.floor(Math.random() * 10),
    todayRevenue: 8450 + Math.floor(Math.random() * 1000),
    avgPreparationTime: 18 + Math.floor(Math.random() * 8),
    customerSatisfaction: 4.2 + Math.random() * 0.6,
    platformStatus: {
      yemeksepeti: Math.random() > 0.1,
      getir: Math.random() > 0.15,
      trendyol: Math.random() > 0.2,
      migros: Math.random() > 0.1
    }
  };
} 