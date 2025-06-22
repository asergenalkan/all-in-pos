// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
  restaurantId: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Order Types
export interface Order {
  id: string;
  orderId: string;
  platform: 'yemeksepeti' | 'getir' | 'trendyol' | 'migros';
  status: 'new' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled';
  customer: Customer;
  items: OrderItem[];
  totalAmount: number;
  orderDate: string;
  estimatedDeliveryTime?: string;
  notes?: string;
}

export interface Customer {
  name: string;
  phone: string;
  email?: string;
  address: Address;
}

export interface Address {
  street: string;
  district: string;
  city: string;
  zipCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
  options?: ItemOption[];
}

export interface ItemOption {
  name: string;
  value: string;
  price?: number;
}

// Restaurant Types
export interface Restaurant {
  id: string;
  name: string;
  status: {
    yemeksepeti: boolean;
    getir: boolean;
    trendyol: boolean;
    migros: boolean;
  };
  settings: RestaurantSettings;
}

export interface RestaurantSettings {
  autoApproval: {
    enabled: boolean;
    platforms: string[];
    conditions?: {
      maxAmount?: number;
      timeRange?: {
        start: string;
        end: string;
      };
    };
  };
  autoPrint: {
    enabled: boolean;
    printerName?: string;
  };
  autoDelivery: {
    enabled: boolean;
    delayMinutes: number;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  icon: any;
  badge?: number;
  children?: NavItem[];
} 