import React from 'react';
import { ShoppingBag, Wrench, Users, Star, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const features = [
    {
      icon: <ShoppingBag className="h-8 w-8 text-blue-600" />,
      title: 'Wide Selection',
      description: 'Browse our extensive collection of computer and laptop accessories from top brands.'
    },
    {
      icon: <Wrench className="h-8 w-8 text-green-600" />,
      title: 'Expert Service',
      description: 'Professional repair and maintenance services for all your computing needs.'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Customer Support',
      description: '24/7 customer support to help you with any questions or concerns.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent service and quality products. Fast delivery and great customer support!'
    },
    {
      name: 'Mike Chen',
      rating: 5,
      comment: 'The repair service was outstanding. They fixed my laptop quickly and professionally.'
    },
    {
      name: 'Emily Davis',
      rating: 5,
      comment: 'Best place for computer accessories. Great prices and reliable products.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your One-Stop Shop for
              <span className="text-yellow-400"> Tech Accessories</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Discover premium computer and laptop accessories, professional repair services, 
              and expert support all in one place.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button
                onClick={() => onPageChange('shop')}
                className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => onPageChange('service')}
                className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Get Service
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TechInventory?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive solutions for all your computer and laptop accessory needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Brands</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied customers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <div className="font-medium text-gray-900">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse our extensive catalog of premium computer accessories or schedule a service appointment today.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button
              onClick={() => onPageChange('shop')}
              className="w-full sm:w-auto bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Browse Products
            </button>
            <button
              onClick={() => onPageChange('service')}
              className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Schedule Service
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};