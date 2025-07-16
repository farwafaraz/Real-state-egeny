import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/useWishlist';
import { Link } from 'wouter';

const WishlistModal = ({ isOpen, onClose }) => {
  const { wishlist, isLoading, removeFromWishlist } = useWishlist();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const handleRemove = (propertyId) => {
    removeFromWishlist(propertyId);
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">My Wishlist</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <div className="text-center">Loading...</div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">My Wishlist</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {wishlist.length === 0 ? (
            <div className="text-center py-8">
              <span className="material-icons text-6xl text-gray-300 mb-4">favorite_border</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-4">Start adding properties to your wishlist to see them here</p>
              <Button onClick={onClose}>Browse Properties</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlist.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition">
                  <img 
                    src={item.property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'} 
                    alt={item.property.title}
                    className="w-24 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9';
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{item.property.title}</h4>
                    <p className="text-gray-600 flex items-center">
                      <span className="material-icons text-sm mr-1">location_on</span>
                      {item.property.location}
                    </p>
                    <p className="text-primary font-bold">{formatPrice(item.property.price)}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                      <span className="flex items-center">
                        <span className="material-icons text-sm mr-1">bed</span>
                        {item.property.bedrooms} beds
                      </span>
                      <span className="flex items-center">
                        <span className="material-icons text-sm mr-1">bathtub</span>
                        {item.property.bathrooms} baths
                      </span>
                      <span className="flex items-center">
                        <span className="material-icons text-sm mr-1">square_foot</span>
                        {item.property.area?.toLocaleString()} sqft
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link href={`/property/${item.property.id}`} onClick={onClose}>
                      <Button size="sm">View</Button>
                    </Link>
                    <button 
                      onClick={() => handleRemove(item.property.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <span className="material-icons">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistModal;
