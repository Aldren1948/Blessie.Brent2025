import React from 'react';
import { Menu, X, User, LogOut, Package } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onPageChange,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const { user, logout } = useAuth();

  const publicPages = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'service', label: 'Service' },
    { id: 'about', label: 'About Us' }
  ];

  const adminStaffPages = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'orders', label: 'Orders' },
    { id: 'services', label: 'Service Requests' },
    ...(user?.role === 'admin' ? [{ id: 'users', label: 'Users' }] : [])
  ];

  const customerPages = [
    { id: 'dashboard', label: 'My Account' },
    { id: 'orders', label: 'My Orders' }
  ];

  const getNavigationPages = () => {
    if (!user) return publicPages;
    if (user.role === 'admin' || user.role === 'staff') {
      return [...publicPages, ...adminStaffPages];
    }
    return [...publicPages, ...customerPages];
  };

  const navigationPages = getNavigationPages();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TechInventory</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationPages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageChange(page.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentPage === page.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {page.label}
              </button>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user.name} ({user.role})
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onPageChange('login')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationPages.map((page) => (
              <button
                key={page.id}
                onClick={() => {
                  onPageChange(page.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  currentPage === page.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {page.label}
              </button>
            ))}
            {user ? (
              <div className="pt-4 border-t border-gray-200">
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {user.name} ({user.role})
                    </span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onPageChange('login');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};