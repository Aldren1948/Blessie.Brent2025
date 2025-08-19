import React from 'react';
import { Package, ShoppingCart, Wrench, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { useInventory } from '../../contexts/InventoryContext';
import { useAuth } from '../../contexts/AuthContext';

export const DashboardHome: React.FC = () => {
  const { products, orders, serviceRequests } = useInventory();
  const { user } = useAuth();

  const isAdminOrStaff = user?.role === 'admin' || user?.role === 'staff';

  // Calculate stats
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock <= p.minStock).length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalServiceRequests = serviceRequests.length;
  const pendingServiceRequests = serviceRequests.filter(s => s.status === 'pending').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  // Customer-specific stats
  const customerOrders = orders.filter(o => o.customerId === user?.id);
  const customerServiceRequests = serviceRequests.filter(s => s.customerId === user?.id);

  if (!isAdminOrStaff) {
    // Customer Dashboard
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Here's your account overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">My Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{customerOrders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Wrench className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Service Requests</p>
                <p className="text-2xl font-semibold text-gray-900">{customerServiceRequests.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Spent</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${customerOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          </div>
          <div className="px-6 py-4">
            {customerOrders.length > 0 ? (
              <div className="space-y-4">
                {customerOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No orders yet</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Admin/Staff Dashboard
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name}! Here's what's happening with your inventory.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">{totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ShoppingCart className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{totalOrders}</p>
              {pendingOrders > 0 && (
                <p className="text-sm text-yellow-600">{pendingOrders} pending</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Wrench className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Service Requests</p>
              <p className="text-2xl font-semibold text-gray-900">{totalServiceRequests}</p>
              {pendingServiceRequests > 0 && (
                <p className="text-sm text-yellow-600">{pendingServiceRequests} pending</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {lowStockProducts > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800">
              <span className="font-medium">{lowStockProducts} products</span> are running low on stock and need restocking.
            </p>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          </div>
          <div className="px-6 py-4">
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No recent orders</p>
            )}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Low Stock Alert</h3>
          </div>
          <div className="px-6 py-4">
            {lowStockProducts > 0 ? (
              <div className="space-y-4">
                {products
                  .filter(p => p.stock <= p.minStock)
                  .slice(0, 5)
                  .map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-red-600 font-medium">{product.stock} left</p>
                        <p className="text-xs text-gray-500">Min: {product.minStock}</p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">All products are well stocked</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};