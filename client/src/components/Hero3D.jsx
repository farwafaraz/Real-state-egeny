import { useState } from 'react';
import SearchFilter from './SearchFilter';

const Hero3D = () => {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    bedrooms: ''
  });

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    // Scroll to properties section
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-bg min-h-screen pt-16 relative overflow-hidden">
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-house absolute top-20 left-10 opacity-20">
          <span className="material-icons text-white text-6xl">home</span>
        </div>
        <div className="floating-house absolute top-40 right-20 opacity-30">
          <span className="material-icons text-white text-8xl">apartment</span>
        </div>
        <div className="floating-house absolute bottom-40 left-1/4 opacity-25">
          <span className="material-icons text-white text-7xl">villa</span>
        </div>
        {/* Additional floating elements */}
        <div className="floating-house absolute top-60 left-1/3 opacity-15">
          <span className="material-icons text-white text-5xl">business</span>
        </div>
        <div className="floating-house absolute bottom-60 right-1/3 opacity-20">
          <span className="material-icons text-white text-6xl">domain</span>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen py-20">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Find Your
              <span className="text-yellow-300"> Dream</span>
              <br />Home
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover premium properties with our expert real estate services. 
              From luxury apartments to family homes, we have it all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  const propertiesSection = document.getElementById('properties');
                  if (propertiesSection) {
                    propertiesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center"
              >
                <span className="material-icons mr-2">search</span>
                Explore Properties
              </button>
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
              >
                Contact Agent
              </button>
            </div>
          </div>
          
          {/* Right Search Panel */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <SearchFilter onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
