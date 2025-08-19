import React from 'react';
import { Users, Award, Clock, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      position: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: '15+ years in tech industry, passionate about customer service'
    },
    {
      name: 'Mike Chen',
      position: 'Lead Technician',
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Certified hardware specialist with expertise in repairs'
    },
    {
      name: 'Emily Davis',
      position: 'Customer Success Manager',
      image: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Dedicated to ensuring exceptional customer experiences'
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'Customer First',
      description: 'Every decision we make is centered around delivering exceptional value to our customers.'
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in products and services, never compromising on quality.'
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      title: 'Reliability',
      description: 'Consistent, dependable service that our customers can count on every time.'
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: 'Innovation',
      description: 'Continuously improving our processes and offerings to stay ahead of the curve.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About TechInventory</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Your trusted partner for computer and laptop accessories since 2010. 
              We're committed to providing quality products and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Founded in 2010, TechInventory began as a small local shop with a simple mission: 
                  to provide high-quality computer accessories and reliable repair services to our community.
                </p>
                <p>
                  What started as a passion project has grown into a trusted destination for tech enthusiasts, 
                  professionals, and businesses alike. We've built our reputation on expertise, reliability, 
                  and genuine care for our customers' needs.
                </p>
                <p>
                  Today, we serve thousands of customers with an extensive inventory of premium accessories 
                  from top brands, backed by our expert technical support and repair services.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">14+</div>
                  <div className="text-gray-600">Years of Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                  <div className="text-gray-600">Satisfied Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">1K+</div>
                  <div className="text-gray-600">Products Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
                  <div className="text-gray-600">Customer Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape our relationships with customers, 
              partners, and each other.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of professionals is here to help you find the perfect solutions 
              for all your tech needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            To empower individuals and businesses with the technology solutions they need to succeed, 
            while providing exceptional service that exceeds expectations. We believe technology should 
            enhance your life, not complicate it.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Have questions about our products or services? We'd love to hear from you.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@techinventory.com</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Hours</h3>
              <p className="text-gray-600">Mon-Fri: 9AM-6PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};