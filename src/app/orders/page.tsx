"use client"

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { OrderCard } from '@/components/orders/order-card';
import { OrderFilters, OrderFiltersState } from '@/components/orders/order-filters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  RefreshCw,
  Download,
  Plus,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  Package
} from 'lucide-react';
import { mockOrders } from '@/lib/mock-data';
import { Order } from '@/types';
import { toast } from 'sonner';

type SortBy = 'orderDate' | 'totalAmount' | 'status';
type SortOrder = 'asc' | 'desc';
type ViewMode = 'grid' | 'list';

export default function OrdersPage() {
  const [orders, setOrders] = React.useState<Order[]>(mockOrders);
  const [isLoading, setIsLoading] = React.useState(false);
  const [lastRefresh, setLastRefresh] = React.useState(new Date());
  
  // Filter and sort states
  const [filters, setFilters] = React.useState<OrderFiltersState>({
    search: '',
    status: 'all',
    platform: 'all',
    timeRange: 'today'
  });
  
  const [sortBy, setSortBy] = React.useState<SortBy>('orderDate');
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('desc');
  const [viewMode, setViewMode] = React.useState<ViewMode>('grid');

  // Filter orders based on current filters
  const filteredOrders = React.useMemo(() => {
    let filtered = [...orders];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(order => 
        order.orderId.toLowerCase().includes(searchLower) ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.customer.phone.includes(filters.search)
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    // Platform filter
    if (filters.platform !== 'all') {
      filtered = filtered.filter(order => order.platform === filters.platform);
    }

    // Time range filter (simplified for demo)
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (filters.timeRange !== 'today') {
      switch (filters.timeRange) {
        case 'yesterday':
          const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
          filtered = filtered.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate >= yesterday && orderDate < today;
          });
          break;
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate >= weekAgo;
          });
          break;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate >= monthAgo;
          });
          break;
      }
    }

    // Sort orders
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'orderDate':
          aValue = new Date(a.orderDate).getTime();
          bValue = new Date(b.orderDate).getTime();
          break;
        case 'totalAmount':
          aValue = a.totalAmount;
          bValue = b.totalAmount;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [orders, filters, sortBy, sortOrder]);

  // Handle order status change
  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
    toast.success(`Sipariş durumu "${newStatus}" olarak güncellendi`);
  };

  // Refresh orders
  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastRefresh(new Date());
    setIsLoading(false);
    toast.success('Siparişler güncellendi');
  };

  // Export orders (placeholder)
  const handleExport = () => {
    toast.success('Siparişler Excel formatında indiriliyor...');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Siparişler</h1>
            <p className="text-muted-foreground">
              Tüm platform siparişlerinizi yönetin
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Yenile
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Dışa Aktar
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Manuel Sipariş
            </Button>
          </div>
        </div>

        {/* Filters */}
        <OrderFilters
          filters={filters}
          onFiltersChange={setFilters}
          orderCount={filteredOrders.length}
        />

        {/* Toolbar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Sort Options */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Sırala:</span>
                  <Select value={sortBy} onValueChange={(value: SortBy) => setSortBy(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="orderDate">Tarih</SelectItem>
                      <SelectItem value="totalAmount">Tutar</SelectItem>
                      <SelectItem value="status">Durum</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortOrder === 'asc' ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Last refresh */}
                <div className="text-sm text-muted-foreground">
                  Son güncelleme: {lastRefresh.toLocaleTimeString('tr-TR')}
                </div>
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Grid/List */}
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <div className="text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium">Sipariş bulunamadı</h3>
                  <p>Arama kriterlerinize uygun sipariş bulunmuyor.</p>
                </div>
                <Button onClick={() => setFilters({
                  search: '',
                  status: 'all',
                  platform: 'all',
                  timeRange: 'today'
                })}>
                  Filtreleri Temizle
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 lg:grid-cols-2 gap-6" 
            : "space-y-4"
          }>
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        {filteredOrders.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{filteredOrders.length}</div>
                  <div className="text-sm text-muted-foreground">Toplam Sipariş</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    ₺{filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Toplam Tutar</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {filteredOrders.filter(o => o.status === 'new').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Yeni Siparişler</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    ₺{(filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0) / filteredOrders.length).toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Ortalama Sipariş</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
} 