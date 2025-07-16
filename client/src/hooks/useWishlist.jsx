import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { apiRequest } from '@/lib/queryClient';

export const useWishlist = () => {
  const { isAuthenticated, token } = useAuth();
  const queryClient = useQueryClient();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ['/api/wishlist'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const response = await fetch('/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }
      
      return response.json();
    },
  });

  const addToWishlistMutation = useMutation({
    mutationFn: async (propertyId) => {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ propertyId }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add to wishlist');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wishlist'] });
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (propertyId) => {
      const response = await fetch(`/api/wishlist/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to remove from wishlist');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wishlist'] });
    },
  });

  const isInWishlist = (propertyId) => {
    return wishlist.some(item => item.propertyId === propertyId);
  };

  const toggleWishlist = (propertyId) => {
    if (isInWishlist(propertyId)) {
      removeFromWishlistMutation.mutate(propertyId);
    } else {
      addToWishlistMutation.mutate(propertyId);
    }
  };

  return {
    wishlist,
    isLoading,
    addToWishlist: addToWishlistMutation.mutate,
    removeFromWishlist: removeFromWishlistMutation.mutate,
    toggleWishlist,
    isInWishlist,
    wishlistCount: wishlist.length,
  };
};
