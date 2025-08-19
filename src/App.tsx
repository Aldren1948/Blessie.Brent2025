import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { InventoryProvider } from './contexts/InventoryContext';
import { Navbar } from './components/Layout/Navbar';
import { LoginForm } from './components/Auth/LoginForm';
import { HomePage } from './components/Pages/HomePage';
import { ShopPage } from './components/Pages/ShopPage';
import { ServicePage } from './components/Pages/ServicePage';
import { AboutPage } from './components/Pages/AboutPage';
import { DashboardHome } from './components/Dashboard/DashboardHome';
import { InventoryManagement } from './components/Dashboard/InventoryManagement';
import { OrderManagement } from './components/Dashboard/OrderManagement';
import { ServiceManagement } from './components/Dashboard/ServiceManagement';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginForm onPageChange={setCurrentPage} />;
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'shop':
        return <ShopPage onPageChange={setCurrentPage} />;
      case 'service':
        return <ServicePage onPageChange={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'dashboard':
        return <DashboardHome />;
      case 'inventory':
        return <InventoryManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'services':
        return <ServiceManagement />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  const isDashboardPage = ['dashboard', 'inventory', 'orders', 'services', 'users'].includes(currentPage);

  return (
    <AuthProvider>
      <InventoryProvider>
        <div className="min-h-screen bg-gray-100">
          {currentPage !== 'login' && (
            <Navbar
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          )}
          
          {isDashboardPage ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {renderPage()}
            </div>
          ) : (
            renderPage()
          )}
        </div>
      </InventoryProvider>
    </AuthProvider>
  );
}