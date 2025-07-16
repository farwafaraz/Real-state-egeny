import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Hero3D from '@/components/Hero3D';
import PropertyCard from '@/components/PropertyCard';
import ContactForm from '@/components/ContactForm';
import SearchFilter from '@/components/SearchFilter';
import { AuthProvider } from '@/hooks/useAuth';

const HomePage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchFilters, setSearchFilters] = useState({});

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['/api/properties', searchFilters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      Object.entries(searchFilters).forEach(([key, value]) => {
        if (value && value !== '') {
          params.append(key, value);
        }
      });
      
      if (activeFilter !== 'all') {
        params.append('propertyType', activeFilter);
      }
      
      const response = await fetch(`/api/properties?${params}`);
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    },
  });

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  const handleFilterByType = (type) => {
    setActiveFilter(type);
  };

  const renderFeaturedProperties = () => {
    if (isLoading) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-64 rounded-t-2xl"></div>
              <div className="bg-white p-6 rounded-b-2xl">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="flex gap-4 mb-4">
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-300 rounded w-24"></div>
                  <div className="h-8 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (properties.length === 0) {
      return (
        <div className="text-center py-12">
          <span className="material-icons text-6xl text-gray-300 mb-4">search_off</span>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600">Try adjusting your search filters</p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    );
  };

  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        
        {/* Hero Section */}
        <Hero3D />
        
        {/* Properties Section */}
        <section id="properties" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
              <p className="text-xl text-gray-600">Discover our handpicked selection of premium properties</p>
            </div>
            
            {/* Compact Search Filter */}
            <div className="mb-8">
              <SearchFilter onSearch={handleSearch} compact={true} />
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { key: 'all', label: 'All Properties' },
                { key: 'house', label: 'Houses' },
                { key: 'apartment', label: 'Apartments' },
                { key: 'villa', label: 'Villas' },
                { key: 'condo', label: 'Condos' },
                { key: 'townhouse', label: 'Townhouses' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => handleFilterByType(filter.key)}
                  className={`px-6 py-3 rounded-lg font-medium transition ${
                    activeFilter === filter.key
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            
            {/* Property Grid */}
            {renderFeaturedProperties()}
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600">Comprehensive real estate solutions for all your needs</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: 'home_work',
                  title: 'Property Sales',
                  description: 'Expert guidance through buying and selling properties with market insights.',
                  color: 'bg-primary/10 text-primary'
                },
                {
                  icon: 'key',
                  title: 'Property Rentals',
                  description: 'Find the perfect rental property or manage your investment portfolio.',
                  color: 'bg-green-500/10 text-green-600'
                },
                {
                  icon: 'assessment',
                  title: 'Property Valuation',
                  description: 'Professional property appraisals and market value assessments.',
                  color: 'bg-yellow-500/10 text-yellow-600'
                },
                {
                  icon: 'business_center',
                  title: 'Investment Consulting',
                  description: 'Strategic advice for real estate investments and portfolio growth.',
                  color: 'bg-purple-500/10 text-purple-600'
                }
              ].map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition">
                  <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <span className="material-icons text-3xl">{service.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactForm />

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  <span className="material-icons text-primary text-3xl mr-2">home</span>
                  <span className="text-2xl font-bold">LuxeHomes</span>
                </div>
                <p className="text-gray-300 mb-6 max-w-md">
                  Your trusted partner in finding the perfect home. We specialize in luxury properties 
                  and provide exceptional service to all our clients.
                </p>
                <div className="flex items-center space-x-4">
                  <button className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary transition">
                    <span className="material-icons">facebook</span>
                  </button>
                  <button className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary transition">
                    <span className="material-icons">camera_alt</span>
                  </button>
                  <button className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary transition">
                    <span className="material-icons">alternate_email</span>
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <li><a href="#properties" className="text-gray-300 hover:text-white transition">Properties</a></li>
                  <li><a href="#about" className="text-gray-300 hover:text-white transition">About Us</a></li>
                  <li><a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition">Blog</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-6">Property Types</h4>
                <ul className="space-y-3">
                  <li><button onClick={() => handleFilterByType('house')} className="text-gray-300 hover:text-white transition">Houses</button></li>
                  <li><button onClick={() => handleFilterByType('apartment')} className="text-gray-300 hover:text-white transition">Apartments</button></li>
                  <li><button onClick={() => handleFilterByType('condo')} className="text-gray-300 hover:text-white transition">Condos</button></li>
                  <li><button onClick={() => handleFilterByType('villa')} className="text-gray-300 hover:text-white transition">Villas</button></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition">Commercial</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p className="text-gray-400">
                © 2024 LuxeHomes Real Estate Agency. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
};

export default HomePage;
