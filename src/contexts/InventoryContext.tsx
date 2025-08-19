import React, { createContext, useContext, useState } from 'react';
import { Product, Order, ServiceRequest } from '../types';

interface InventoryContextType {
  products: Product[];
  orders: Order[];
  serviceRequests: ServiceRequest[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addServiceRequest: (request: Omit<ServiceRequest, 'id' | 'createdAt'>) => void;
  updateServiceStatus: (id: string, status: ServiceRequest['status']) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Gaming Mouse',
    category: 'Mouse',
    brand: 'TechPro',
    price: 79.99,
    stock: 25,
    minStock: 10,
    description: 'High-precision wireless gaming mouse with RGB lighting',
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Mechanical Keyboard',
    category: 'Keyboard',
    brand: 'KeyMaster',
    price: 129.99,
    stock: 15,
    minStock: 5,
    description: 'RGB mechanical keyboard with blue switches',
    image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'USB-C Hub',
    category: 'Hub',
    brand: 'ConnectAll',
    price: 49.99,
    stock: 8,
    minStock: 15,
    description: '7-in-1 USB-C hub with HDMI, USB ports, and card readers',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Laptop Stand',
    category: 'Stand',
    brand: 'ErgoTech',
    price: 39.99,
    stock: 20,
    minStock: 10,
    description: 'Adjustable aluminum laptop stand with cooling',
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

const mockOrders: Order[] = [
  {
    id: '1',
    customerId: '3',
    customerName: 'John Customer',
    items: [
      { productId: '1', productName: 'Wireless Gaming Mouse', quantity: 1, price: 79.99 }
    ],
    total: 79.99,
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z'
  }
];

const mockServiceRequests: ServiceRequest[] = [
  {
    id: '1',
    customerId: '3',
    customerName: 'John Customer',
    email: 'customer@example.com',
    phone: '+1-555-0123',
    deviceType: 'Laptop',
    issue: 'Screen Repair',
    description: 'Cracked screen needs replacement',
    status: 'pending',
    createdAt: '2024-01-15T14:20:00Z'
  }
];

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(mockServiceRequests);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, ...updates, updatedAt: new Date().toISOString() }
        : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };

  const addServiceRequest = (requestData: Omit<ServiceRequest, 'id' | 'createdAt'>) => {
    const newRequest: ServiceRequest = {
      ...requestData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setServiceRequests(prev => [...prev, newRequest]);
  };

  const updateServiceStatus = (id: string, status: ServiceRequest['status']) => {
    setServiceRequests(prev => prev.map(request => 
      request.id === id ? { ...request, status } : request
    ));
  };

  return (
    <InventoryContext.Provider value={{
      products,
      orders,
      serviceRequests,
      addProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      updateOrderStatus,
      addServiceRequest,
      updateServiceStatus
    }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};