import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';

const PropertyDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['/api/properties', id],
    queryFn: async () => {
      const response = await fetch(`/api/properties/${id}`);
      if (!response.ok) {
        throw new Error('Property not found');
      }
      return response.json();
    },
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const statusColors = {
    available: 'bg-green-500',
    pending: 'bg-yellow-500',
    sold: 'bg-red-500',
    rented: 'bg-blue-500'
  };

  const handleWishlistClick = () => {
    if (isAuthenticated) {
      toggleWishlist(property.id);
    } else {
      alert('Please login to add properties to your wishlist');
    }
  };

  if (isLoading) {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-300 rounded-2xl mb-8"></div>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-8 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-8"></div>
                  <div className="h-32 bg-gray-300 rounded"></div>
                </div>
                <div>
                  <div className="bg-white p-6 rounded-2xl">
                    <div className="h-8 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthProvider>
    );
  }

  if (error) {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card>
              <CardContent className="text-center py-12">
                <span className="material-icons text-6xl text-gray-300 mb-4">error_outline</span>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
                <p className="text-gray-600 mb-4">The property you're looking for doesn't exist or has been removed.</p>
                <Link href="/">
                  <Button>Back to Properties</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </AuthProvider>
    );
  }

  const mainImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9';

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-primary">Home</Link>
              </li>
              <li><span className="material-icons text-sm">chevron_right</span></li>
              <li>
                <Link href="/#properties" className="hover:text-primary">Properties</Link>
              </li>
              <li><span className="material-icons text-sm">chevron_right</span></li>
              <li className="text-gray-900">{property.title}</li>
            </ol>
          </nav>

          {/* Main Image */}
          <div className="relative mb-8">
            <img 
              src={mainImage}
              alt={property.title}
              className="w-full h-96 object-cover rounded-2xl"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9';
              }}
            />
            <div className="absolute top-6 left-6">
              <Badge className={`${statusColors[property.status]} text-white`}>
                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
              </Badge>
            </div>
            <button
              onClick={handleWishlistClick}
              className="absolute top-6 right-6 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition"
            >
              <span className={`material-icons text-2xl ${
                isAuthenticated && isInWishlist(property.id) 
                  ? 'text-red-500' 
                  : 'text-gray-400 hover:text-red-500'
              }`}>
                {isAuthenticated && isInWishlist(property.id) ? 'favorite' : 'favorite_border'}
              </span>
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{property.title}</h1>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <span className="material-icons mr-2">location_on</span>
                  <span className="text-lg">{property.location}</span>
                </div>

                <div className="flex items-center gap-8 mb-8 text-gray-600">
                  <div className="flex items-center">
                    <span className="material-icons mr-2">bed</span>
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-icons mr-2">bathtub</span>
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-icons mr-2">square_foot</span>
                    <span>{property.area?.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-icons mr-2">home</span>
                    <span className="capitalize">{property.propertyType}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                {property.features && property.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Features</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <span className="material-icons text-primary mr-2">check_circle</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Images */}
                {property.images && property.images.length > 1 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {property.images.slice(1).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${property.title} - Image ${index + 2}`}
                          className="w-full h-40 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9';
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-gray-600">
                      {property.status === 'available' ? 'Available Now' : 
                       property.status === 'pending' ? 'Pending Sale' :
                       property.status === 'sold' ? 'Sold' : 'Rented'}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button 
                      className="w-full"
                      disabled={property.status === 'sold'}
                    >
                      <span className="material-icons mr-2">phone</span>
                      Call Agent
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <span className="material-icons mr-2">email</span>
                      Send Message
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled={property.status === 'sold'}
                    >
                      <span className="material-icons mr-2">event</span>
                      Schedule Tour
                    </Button>
                  </div>

                  <div className="text-center text-sm text-gray-600">
                    <p>Property ID: #{property.id}</p>
                    <p>Listed: {new Date(property.createdAt).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Facts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Type:</span>
                      <span className="font-medium capitalize">{property.propertyType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bedrooms:</span>
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bathrooms:</span>
                      <span className="font-medium">{property.bathrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span className="font-medium">{property.area?.toLocaleString()} sqft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium capitalize">{property.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default PropertyDetails;
