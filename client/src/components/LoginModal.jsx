import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const { login, loginLoading, loginError } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    login(formData, {
      onSuccess: () => {
        toast({
          title: "Login Successful",
          description: "Welcome back to LuxeHomes!",
        });
        onClose();
        setFormData({ email: '', password: '', rememberMe: false });
      },
      onError: (error) => {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </DialogTitle>
          <p className="text-center text-gray-600">Sign in to your account</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember-me"
                name="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, rememberMe: checked }))}
              />
              <Label htmlFor="remember-me" className="text-sm">Remember me</Label>
            </div>
            <button type="button" className="text-sm text-primary hover:text-blue-700">
              Forgot password?
            </button>
          </div>
          
          {loginError && (
            <div className="text-red-600 text-sm text-center">
              {loginError.message}
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={loginLoading}
          >
            {loginLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={onSwitchToRegister}
              className="text-primary hover:text-blue-700 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
