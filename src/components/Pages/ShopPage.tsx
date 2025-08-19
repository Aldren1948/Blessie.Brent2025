import React, { useState } from 'react';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import { useInventory } from '../../contexts/InventoryContext';
import { useAuth } from '../../contexts/AuthContext';

interface ShopPageProps {
  onPageChange: (page: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onPageChange }) => {
  const { products } = useInventory();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: string) => {
    if (!user) {
      onPageChange('login');
      return;
    }
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop Computer Accessories</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Cart Icon */}
            {user && getTotalCartItems() > 0 && (
              <div className="relative">
                <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalCartItems()}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  <div className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product.id)}
                  disabled={product.stock === 0}
                  className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No products found</div>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};