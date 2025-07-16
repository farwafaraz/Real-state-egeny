import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import WishlistModal from './WishlistModal';

const Navbar = () => {
  const [location] = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="material-icons text-primary text-3xl mr-2">home</span>
                <span className="text-2xl font-bold text-gray-900">LuxeHomes</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`hover:text-primary transition ${location === '/' ? 'text-primary' : 'text-gray-700'}`}>
                Properties
              </Link>
              <a href="#about" className="text-gray-700 hover:text-primary transition">About</a>
              <a href="#contact" className="text-gray-700 hover:text-primary transition">Contact</a>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setShowWishlistModal(true)}
                    className="p-2 text-gray-700 hover:text-primary transition relative"
                  >
                    <span className="material-icons">favorite_border</span>
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                  
                  {isAdmin && (
                    <Link href="/admin">
                      <Button variant="outline" size="sm">
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Hello, {user?.firstName}</span>
                    <Button onClick={logout} variant="outline" size="sm">
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button onClick={() => setShowLoginModal(true)} variant="default">
                    Login
                  </Button>
                  <Button onClick={() => setShowRegisterModal(true)} variant="outline">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
            
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-icons">menu</span>
            </button>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-primary">
                  Properties
                </Link>
                <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-primary">
                  About
                </a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-primary">
                  Contact
                </a>
                
                {isAuthenticated ? (
                  <div className="border-t pt-2">
                    <button 
                      onClick={() => setShowWishlistModal(true)}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
                    >
                      Wishlist ({wishlistCount})
                    </button>
                    {isAdmin && (
                      <Link href="/admin" className="block px-3 py-2 text-gray-700 hover:text-primary">
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="border-t pt-2 space-y-1">
                    <button 
                      onClick={() => setShowLoginModal(true)}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => setShowRegisterModal(true)}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
      
      <WishlistModal 
        isOpen={showWishlistModal} 
        onClose={() => setShowWishlistModal(false)}
      />
    </>
  );
};

export default Navbar;
