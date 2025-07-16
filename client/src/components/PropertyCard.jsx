import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';

const PropertyCard = ({ property }) => {
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const statusColors = {
    available: 'bg-green-500',
    pending: 'bg-yellow-500',
    sold: 'bg-red-500',
    rented: 'bg-blue-500'
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      toggleWishlist(property.id);
    } else {
      // Could show login modal here
      alert('Please login to add properties to your wishlist');
    }
  };

  const mainImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9';

  return (
    <div className="property-card bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="relative">
        <img 
          src={mainImage} 
          alt={property.title}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9';
          }}
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${statusColors[property.status]} text-white`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </Badge>
        </div>
        <button
          onClick={handleWishlistClick}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition"
        >
          <span className={`material-icons ${
            isAuthenticated && isInWishlist(property.id) 
              ? 'text-red-500' 
              : 'text-gray-400 hover:text-red-500'
          }`}>
            {isAuthenticated && isInWishlist(property.id) ? 'favorite' : 'favorite_border'}
          </span>
        </button>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-4 flex items-center">
          <span className="material-icons text-sm mr-1">location_on</span>
          {property.location}
        </p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <span className="flex items-center">
            <span className="material-icons text-sm mr-1">bed</span>
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center">
            <span className="material-icons text-sm mr-1">bathtub</span>
            {property.bathrooms} Baths
          </span>
          <span className="flex items-center">
            <span className="material-icons text-sm mr-1">square_foot</span>
            {property.area?.toLocaleString()} sqft
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-primary">
              {formatPrice(property.price)}
            </span>
          </div>
          <Link href={`/property/${property.id}`}>
            <Button 
              disabled={property.status === 'sold'}
              variant={property.status === 'sold' ? 'secondary' : 'default'}
            >
              {property.status === 'sold' ? 'Sold' : 'View Details'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
