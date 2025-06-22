'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { getHourlyData, getStatusDistribution, getPlatformStats } from '@/lib/analytics-data';

export function AnalyticsCharts() {
  const hourlyData = getHourlyData();
  const statusData = getStatusDistribution();
  const platformStats = getPlatformStats();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="flex-1">{entry.name}:</span>
              <span className="font-medium">
                {entry.dataKey === 'revenue' 
                  ? formatCurrency(entry.value)
                  : `${entry.value} sipariş`
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color }}
            />
            <span className="font-medium">{data.status}</span>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {data.count} sipariş (%{data.percentage})
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Hourly Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Saatlik Sipariş Dağılımı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="hour" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="orders" 
                  fill="#3b82f6" 
                  name="Sipariş Sayısı"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sipariş Durumu Dağılımı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ percentage }) => `%${percentage.toFixed(1)}`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {statusData.map((item) => (
                <div key={item.status} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="flex-1">{item.status}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Performansı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformStats.map((platform) => (
                <div key={platform.platform} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: platform.color }}
                      />
                      <span className="font-medium">{platform.platform}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        {platform.orders} sipariş
                      </span>
                      <span className="font-medium">
                        {formatCurrency(platform.revenue)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Ort. Sipariş: {formatCurrency(platform.avgOrderValue)}
                    </span>
                    <span className={`font-medium ${
                      platform.growthRate > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {platform.growthRate > 0 ? '+' : ''}{platform.growthRate}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        backgroundColor: platform.color,
                        width: `${(platform.revenue / platformStats[0].revenue) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Önemli İçgörüler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                📈 En Yoğun Saat
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                19:00-21:00 arası en fazla sipariş alınıyor
              </p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
              <h4 className="font-medium text-green-900 dark:text-green-100">
                🏆 En Başarılı Platform
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Yemeksepeti toplam cironun %35'ini oluşturuyor
              </p>
            </div>
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20">
              <h4 className="font-medium text-amber-900 dark:text-amber-100">
                ⚡ Hızlı Büyüme
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Trendyol %15.7 büyüme oranıyla öne çıkıyor
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 