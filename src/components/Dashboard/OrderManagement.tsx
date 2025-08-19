import React, { useState } from 'react';
import { Search, Package, Eye } from 'lucide-react';
import { useInventory } from '../../contexts/InventoryContext';
import { useAuth } from '../../contexts/AuthContext';
import { Order } from '../../types';

export const OrderManagement: React.FC = () => {
  const { orders, updateOrderStatus } = useInventory();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const isAdminOrStaff = user?.role === 'admin' || user?.role === 'staff';
  
  // Filter orders based on user role
  const userOrders = isAdminOrStaff 
    ? orders 
    : orders.filter(o => o.customerId === user?.id);

  const filteredOrders = userOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const OrderDetailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
          <button
            onClick={() => setShowOrderModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Order ID</label>
                <p className="text-sm text-gray-900">#{selectedOrder.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer</label>
                <p className="text-sm text-gray-900">{selectedOrder.customerName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Order Date</label>
                <p className="text-sm text-gray-900">
                  {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order Items</label>
              <div className="space-y-2">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-gray-900">{item.productName}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-gray-900">Total</p>
                <p className="text-lg font-bold text-gray-900">${selectedOrder.total.toFixed(2)}</p>
              </div>
            </div>

            {isAdminOrStaff && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    handleStatusChange(selectedOrder.id, e.target.value as Order['status']);
                    setSelectedOrder({ ...selectedOrder, status: e.target.value as Order['status'] });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.slice(1).map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isAdminOrStaff ? 'Order Management' : 'My Orders'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isAdminOrStaff ? 'Manage customer orders and track fulfillment' : 'View and track your orders'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={isAdminOrStaff ? "Search orders or customers..." : "Search your orders..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isAdminOrStaff ? (
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(order.status)}`}
                      >
                        {statusOptions.slice(1).map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => viewOrderDetails(order)}
                      className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {isAdminOrStaff ? 'No orders found' : 'You have no orders yet'}
          </p>
        </div>
      )}

      {/* Order Detail Modal */}
      {showOrderModal && <OrderDetailModal />}
    </div>
  );
};