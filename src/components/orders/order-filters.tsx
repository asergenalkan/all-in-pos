"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search,
  Filter,
  X,
  Calendar,
  RotateCcw
} from 'lucide-react';
import { ORDER_FILTERS } from '@/constants';

export interface OrderFiltersState {
  search: string;
  status: string;
  platform: string;
  timeRange: string;
  dateFrom?: string;
  dateTo?: string;
}

interface OrderFiltersProps {
  filters: OrderFiltersState;
  onFiltersChange: (filters: OrderFiltersState) => void;
  orderCount: number;
}

export function OrderFilters({ filters, onFiltersChange, orderCount }: OrderFiltersProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const updateFilter = (key: keyof OrderFiltersState, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      status: 'all',
      platform: 'all', 
      timeRange: 'today'
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.status !== 'all') count++;
    if (filters.platform !== 'all') count++;
    if (filters.timeRange !== 'today') count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <h3 className="font-semibold">Filtrele</h3>
              {activeFilterCount > 0 && (
                <Badge variant="secondary">{activeFilterCount}</Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {orderCount} sipariş bulundu
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Gizle' : 'Göster'}
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Sipariş no, müşteri adı veya telefon..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Expanded Filters */}
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 border-t">
              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sipariş Durumu</label>
                <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_FILTERS.status.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Platform Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform</label>
                <Select value={filters.platform} onValueChange={(value) => updateFilter('platform', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_FILTERS.platform.map((platform) => (
                      <SelectItem key={platform.value} value={platform.value}>
                        {platform.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Range Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Zaman Aralığı</label>
                <Select value={filters.timeRange} onValueChange={(value) => updateFilter('timeRange', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_FILTERS.timeRange.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Date Range */}
              {filters.timeRange === 'custom' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Özel Tarih</label>
                  <div className="flex space-x-2">
                    <Input
                      type="date"
                      value={filters.dateFrom || ''}
                      onChange={(e) => updateFilter('dateFrom', e.target.value)}
                      className="text-sm"
                    />
                    <Input
                      type="date"
                      value={filters.dateTo || ''}
                      onChange={(e) => updateFilter('dateTo', e.target.value)}
                      className="text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  disabled={activeFilterCount === 0}
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Temizle
                </Button>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t">
              {filters.search && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Arama: {filters.search}</span>
                  <button
                    onClick={() => updateFilter('search', '')}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              
              {filters.status !== 'all' && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>
                    Durum: {ORDER_FILTERS.status.find(s => s.value === filters.status)?.label}
                  </span>
                  <button
                    onClick={() => updateFilter('status', 'all')}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              
              {filters.platform !== 'all' && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>
                    Platform: {ORDER_FILTERS.platform.find(p => p.value === filters.platform)?.label}
                  </span>
                  <button
                    onClick={() => updateFilter('platform', 'all')}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              
              {filters.timeRange !== 'today' && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>
                    Zaman: {ORDER_FILTERS.timeRange.find(t => t.value === filters.timeRange)?.label}
                  </span>
                  <button
                    onClick={() => updateFilter('timeRange', 'today')}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 