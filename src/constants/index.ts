// Platform Colors
export const PLATFORM_COLORS = {
  yemeksepeti: {
    bg: "bg-red-100 dark:bg-red-900/20",
    text: "text-red-800 dark:text-red-300",
    border: "border-red-200 dark:border-red-800",
    primary: "#d91f2a"
  },
  getir: {
    bg: "bg-purple-100 dark:bg-purple-900/20", 
    text: "text-purple-800 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
    primary: "#5d3ebc"
  },
  trendyol: {
    bg: "bg-orange-100 dark:bg-orange-900/20",
    text: "text-orange-800 dark:text-orange-300", 
    border: "border-orange-200 dark:border-orange-800",
    primary: "#f27a1a"
  },
  migros: {
    bg: "bg-blue-100 dark:bg-blue-900/20",
    text: "text-blue-800 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800", 
    primary: "#0056d6"
  }
} as const;

// Order Status Colors
export const STATUS_COLORS = {
  new: {
    bg: "bg-blue-100 dark:bg-blue-900/20",
    text: "text-blue-800 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800"
  },
  confirmed: {
    bg: "bg-emerald-100 dark:bg-emerald-900/20", 
    text: "text-emerald-800 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800"
  },
  preparing: {
    bg: "bg-yellow-100 dark:bg-yellow-900/20",
    text: "text-yellow-800 dark:text-yellow-300",
    border: "border-yellow-200 dark:border-yellow-800"
  },
  ready: {
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-800 dark:text-green-300", 
    border: "border-green-200 dark:border-green-800"
  },
  picked_up: {
    bg: "bg-indigo-100 dark:bg-indigo-900/20",
    text: "text-indigo-800 dark:text-indigo-300",
    border: "border-indigo-200 dark:border-indigo-800"
  },
  delivered: {
    bg: "bg-gray-100 dark:bg-gray-900/20",
    text: "text-gray-800 dark:text-gray-300", 
    border: "border-gray-200 dark:border-gray-800"
  },
  cancelled: {
    bg: "bg-red-100 dark:bg-red-900/20",
    text: "text-red-800 dark:text-red-300",
    border: "border-red-200 dark:border-red-800"
  }
} as const;

// Status Labels (Turkish)
export const STATUS_LABELS = {
  new: "Yeni Sipariş",
  confirmed: "Onaylandı", 
  preparing: "Hazırlanıyor",
  ready: "Hazır",
  picked_up: "Alındı",
  delivered: "Teslim Edildi",
  cancelled: "İptal Edildi"
} as const;

// Platform Labels (Turkish)
export const PLATFORM_LABELS = {
  yemeksepeti: "Yemeksepeti",
  getir: "Getir",
  trendyol: "Trendyol", 
  migros: "Migros"
} as const;

// Order Filters
export const ORDER_FILTERS = {
  status: [
    { value: "all", label: "Tüm Durumlar" },
    { value: "new", label: "Yeni Siparişler" },
    { value: "confirmed", label: "Onaylandı" },
    { value: "preparing", label: "Hazırlanıyor" },
    { value: "ready", label: "Hazır" },
    { value: "picked_up", label: "Alındı" },
    { value: "delivered", label: "Teslim Edildi" },
    { value: "cancelled", label: "İptal Edildi" }
  ],
  platform: [
    { value: "all", label: "Tüm Platformlar" },
    { value: "yemeksepeti", label: "Yemeksepeti" },
    { value: "getir", label: "Getir" },
    { value: "trendyol", label: "Trendyol" },
    { value: "migros", label: "Migros" }
  ],
  timeRange: [
    { value: "today", label: "Bugün" },
    { value: "yesterday", label: "Dün" },
    { value: "week", label: "Bu Hafta" },
    { value: "month", label: "Bu Ay" },
    { value: "custom", label: "Özel Tarih" }
  ]
} as const; 