import { Order } from '@/types';

export const mockOrders: Order[] = [
  {
    id: "1",
    orderId: "#YS-12345",
    platform: "yemeksepeti",
    status: "new",
    customer: {
      name: "Ahmet Yılmaz",
      phone: "+90 532 123 45 67",
      email: "ahmet@example.com",
      address: {
        street: "Atatürk Cad. No:123 Daire:5",
        district: "Kadıköy",
        city: "İstanbul",
        zipCode: "34710",
        coordinates: { lat: 40.9925, lng: 29.0236 }
      }
    },
    items: [
      {
        id: "1",
        name: "Margherita Pizza",
        quantity: 1,
        price: 89.90,
        notes: "Az soğanlı lütfen",
        options: [
          { name: "Boyut", value: "Orta" },
          { name: "Kenar", value: "İnce" }
        ]
      },
      {
        id: "2", 
        name: "Coca Cola 330ml",
        quantity: 2,
        price: 15.00
      }
    ],
    totalAmount: 119.90,
    orderDate: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    estimatedDeliveryTime: new Date(Date.now() + 25 * 60 * 1000).toISOString(),
    notes: "Kapı zilini çalmayın, arayın lütfen"
  },
  {
    id: "2",
    orderId: "#GT-67890", 
    platform: "getir",
    status: "preparing",
    customer: {
      name: "Ayşe Demir",
      phone: "+90 535 987 65 43",
      address: {
        street: "Çamlık Sok. No:45",
        district: "Beşiktaş", 
        city: "İstanbul"
      }
    },
    items: [
      {
        id: "3",
        name: "Chicken Burger Menü",
        quantity: 1,
        price: 65.00,
        options: [
          { name: "Patates", value: "Büyük" },
          { name: "İçecek", value: "Fanta" }
        ]
      }
    ],
    totalAmount: 65.00,
    orderDate: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    estimatedDeliveryTime: new Date(Date.now() + 15 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    orderId: "#TY-54321",
    platform: "trendyol", 
    status: "ready",
    customer: {
      name: "Mehmet Kara",
      phone: "+90 538 456 78 90",
      address: {
        street: "Yeni Mahalle 12. Sokak No:78",
        district: "Üsküdar",
        city: "İstanbul" 
      }
    },
    items: [
      {
        id: "4",
        name: "Karışık Izgara",
        quantity: 1,
        price: 145.00
      },
      {
        id: "5", 
        name: "Ayran",
        quantity: 2,
        price: 12.00
      },
      {
        id: "6",
        name: "Baklava (4 adet)",
        quantity: 1,
        price: 35.00
      }
    ],
    totalAmount: 169.00,
    orderDate: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    estimatedDeliveryTime: new Date(Date.now() + 5 * 60 * 1000).toISOString()
  },
  {
    id: "4",
    orderId: "#MG-98765",
    platform: "migros",
    status: "delivered", 
    customer: {
      name: "Fatma Özkan",
      phone: "+90 542 321 09 87",
      address: {
        street: "Güneş Apt. A Blok Daire:12",
        district: "Şişli",
        city: "İstanbul"
      }
    },
    items: [
      {
        id: "7",
        name: "Penne Arrabbiata",
        quantity: 1,
        price: 55.00
      }
    ],
    totalAmount: 55.00,
    orderDate: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
    estimatedDeliveryTime: new Date(Date.now() - 35 * 60 * 1000).toISOString()
  },
  {
    id: "5",
    orderId: "#YS-11223",
    platform: "yemeksepeti",
    status: "confirmed",
    customer: {
      name: "Can Şahin", 
      phone: "+90 533 789 12 34",
      address: {
        street: "Merkez Cad. No:234",
        district: "Beyoğlu",
        city: "İstanbul"
      }
    },
    items: [
      {
        id: "8",
        name: "Lahmacun",
        quantity: 3,
        price: 18.00
      },
      {
        id: "9",
        name: "Şalgam",
        quantity: 2, 
        price: 8.00
      }
    ],
    totalAmount: 70.00,
    orderDate: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    estimatedDeliveryTime: new Date(Date.now() + 22 * 60 * 1000).toISOString()
  },
  {
    id: "6",
    orderId: "#GT-33445",
    platform: "getir",
    status: "picked_up",
    customer: {
      name: "Zeynep Aktaş",
      phone: "+90 544 567 89 01", 
      address: {
        street: "Eski Sokak No:67",
        district: "Maltepe",
        city: "İstanbul"
      }
    },
    items: [
      {
        id: "10",
        name: "Döner Porsiyon",
        quantity: 2,
        price: 45.00
      }
    ],
    totalAmount: 90.00,
    orderDate: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    estimatedDeliveryTime: new Date(Date.now() - 10 * 60 * 1000).toISOString()
  }
]; 