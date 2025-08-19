export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'customer';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  minStock: number;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  deviceType: string;
  issue: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
}