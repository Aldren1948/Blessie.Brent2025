import React, { useState } from 'react';
import { Wrench, Clock, CheckCircle, Star } from 'lucide-react';
import { useInventory } from '../../contexts/InventoryContext';
import { useAuth } from '../../contexts/AuthContext';

interface ServicePageProps {
  onPageChange: (page: string) => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({ onPageChange }) => {
  const { addServiceRequest } = useInventory();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    email: user?.email || '',
    phone: '',
    deviceType: '',
    issue: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const services = [
    {
      title: 'Laptop Repair',
      description: 'Screen replacement, keyboard repair, battery replacement, and more',
      price: 'Starting at $50',
      duration: '1-3 business days'
    },
    {
      title: 'Computer Diagnostics',
      description: 'Complete system analysis and performance optimization',
      price: 'Starting at $30',
      duration: 'Same day'
    },
    {
      title: 'Hardware Upgrade',
      description: 'RAM, SSD, graphics card installation and optimization',
      price: 'Starting at $40',
      duration: '1-2 business days'
    },
    {
      title: 'Virus Removal',
      description: 'Complete malware removal and system security setup',
      price: 'Starting at $60',
      duration: 'Same day'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onPageChange('login');
      return;
    }

    addServiceRequest({
      customerId: user.id,
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      deviceType: formData.deviceType,
      issue: formData.issue,
      description: formData.description,
      status: 'pending'
    });

    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your service request. Our team will contact you within 24 hours to schedule your appointment.
          </p>
          <button
            onClick={() => onPageChange('dashboard')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            View My Requests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Wrench className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Professional Tech Services</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Expert repair and maintenance services for all your computing needs. Fast, reliable, and affordable.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-600">
                    <span className="font-medium">{service.price}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{service.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Request Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Request a Service</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="deviceType" className="block text-sm font-medium text-gray-700 mb-1">
                  Device Type *
                </label>
                <select
                  id="deviceType"
                  name="deviceType"
                  required
                  value={formData.deviceType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select device type</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">
                Issue Type *
              </label>
              <select
                id="issue"
                name="issue"
                required
                value={formData.issue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select issue type</option>
                <option value="Screen Repair">Screen Repair</option>
                <option value="Battery Replacement">Battery Replacement</option>
                <option value="Keyboard Repair">Keyboard Repair</option>
                <option value="Performance Issues">Performance Issues</option>
                <option value="Virus Removal">Virus Removal</option>
                <option value="Hardware Upgrade">Hardware Upgrade</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Problem Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Please describe the issue in detail..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Submit Service Request
            </button>
          </form>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Our Service?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Technicians</h3>
              <p className="text-gray-600">Certified professionals with years of experience</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">Most repairs completed within 1-3 business days</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">90-day warranty on all repairs and services</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};