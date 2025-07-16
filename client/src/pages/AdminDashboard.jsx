import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { AuthProvider } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';

const AdminDashboard = () => {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isAdmin, token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Property form state
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    status: 'available',
    images: '',
    features: ''
  });

  const [editingProperty, setEditingProperty] = useState(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);

  // Redirect if not admin
  if (!isAuthenticated || !isAdmin) {
    setLocation('/');
    return null;
  }

  // Fetch dashboard stats
  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/dashboard/stats'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
  });

  // Fetch properties
  const { data: properties = [], isLoading: propertiesLoading } = useQuery({
    queryKey: ['/api/properties'],
    queryFn: async () => {
      const response = await fetch('/api/properties');
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    },
  });

  // Fetch users
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['/api/users'],
    queryFn: async () => {
      const response = await fetch('/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    },
  });

  // Fetch inquiries
  const { data: inquiries = [], isLoading: inquiriesLoading } = useQuery({
    queryKey: ['/api/inquiries'],
    queryFn: async () => {
      const response = await fetch('/api/inquiries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch inquiries');
      return response.json();
    },
  });

  // Property mutations
  const createPropertyMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create property');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      toast({ title: "Success", description: "Property created successfully" });
      setShowPropertyModal(false);
      resetPropertyForm();
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const updatePropertyMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update property');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      toast({ title: "Success", description: "Property updated successfully" });
      setShowPropertyModal(false);
      setEditingProperty(null);
      resetPropertyForm();
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const deletePropertyMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete property');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      toast({ title: "Success", description: "Property deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  // User mutations
  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete user');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      toast({ title: "Success", description: "User deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  // Inquiry mutations
  const updateInquiryStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await fetch(`/api/inquiries/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update inquiry status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      toast({ title: "Success", description: "Inquiry status updated" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete inquiry');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inquiries'] });
      toast({ title: "Success", description: "Inquiry deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  const resetPropertyForm = () => {
    setPropertyForm({
      title: '',
      description: '',
      price: '',
      location: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      status: 'available',
      images: '',
      features: ''
    });
  };

  const handlePropertySubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      ...propertyForm,
      price: propertyForm.price,
      bedrooms: parseInt(propertyForm.bedrooms),
      bathrooms: parseFloat(propertyForm.bathrooms),
      area: parseInt(propertyForm.area),
      images: propertyForm.images ? propertyForm.images.split(',').map(img => img.trim()) : [],
      features: propertyForm.features ? propertyForm.features.split(',').map(feature => feature.trim()) : [],
      agentId: 1 // Default agent ID
    };

    if (editingProperty) {
      updatePropertyMutation.mutate({ id: editingProperty.id, data: formData });
    } else {
      createPropertyMutation.mutate(formData);
    }
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setPropertyForm({
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      propertyType: property.propertyType,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      area: property.area.toString(),
      status: property.status,
      images: property.images ? property.images.join(', ') : '',
      features: property.features ? property.features.join(', ') : ''
    });
    setShowPropertyModal(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const statusColors = {
    available: 'bg-green-500',
    pending: 'bg-yellow-500',
    sold: 'bg-red-500',
    rented: 'bg-blue-500'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage properties, users, and inquiries</p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Properties</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {statsLoading ? '...' : stats.totalProperties || 0}
                  </p>
                </div>
                <span className="material-icons text-4xl text-blue-200">home</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Users</p>
                  <p className="text-3xl font-bold text-green-600">
                    {statsLoading ? '...' : stats.activeUsers || 0}
                  </p>
                </div>
                <span className="material-icons text-4xl text-green-200">people</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending Inquiries</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {statsLoading ? '...' : stats.pendingInquiries || 0}
                  </p>
                </div>
                <span className="material-icons text-4xl text-yellow-200">contact_support</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {statsLoading ? '...' : formatPrice(stats.monthlyRevenue || 0)}
                  </p>
                </div>
                <span className="material-icons text-4xl text-purple-200">trending_up</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="properties">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
                <TabsTrigger value="properties" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Properties
                </TabsTrigger>
                <TabsTrigger value="users" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Users
                </TabsTrigger>
                <TabsTrigger value="inquiries" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Inquiries
                </TabsTrigger>
              </TabsList>

              {/* Properties Tab */}
              <TabsContent value="properties" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Manage Properties</h3>
                  <Dialog open={showPropertyModal} onOpenChange={setShowPropertyModal}>
                    <DialogTrigger asChild>
                      <Button onClick={() => { resetPropertyForm(); setEditingProperty(null); }}>
                        <span className="material-icons mr-2">add</span>
                        Add Property
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {editingProperty ? 'Edit Property' : 'Add New Property'}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handlePropertySubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="title">Title *</Label>
                            <Input
                              id="title"
                              required
                              value={propertyForm.title}
                              onChange={(e) => setPropertyForm(prev => ({ ...prev, title: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="price">Price *</Label>
                            <Input
                              id="price"
                              type="number"
                              required
                              value={propertyForm.price}
                              onChange={(e) => setPropertyForm(prev => ({ ...prev, price: e.target.value }))}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="description">Description *</Label>
                          <Textarea
                            id="description"
                            required
                            value={propertyForm.description}
                            onChange={(e) => setPropertyForm(prev => ({ ...prev, description: e.target.value }))}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="location">Location *</Label>
                            <Input
                              id="location"
                              required
                              value={propertyForm.location}
                              onChange={(e) => setPropertyForm(prev => ({ ...prev, location: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="propertyType">Property Type *</Label>
                            <Select value={propertyForm.propertyType} onValueChange={(value) => setPropertyForm(prev => ({ ...prev, propertyType: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="condo">Condo</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                                <SelectItem value="townhouse">Townhouse</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="bedrooms">Bedrooms *</Label>
                            <Input
                              id="bedrooms"
                              type="number"
                              required
                              value={propertyForm.bedrooms}
                              onChange={(e) => setPropertyForm(prev => ({ ...prev, bedrooms: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="bathrooms">Bathrooms *</Label>
                            <Input
                              id="bathrooms"
                              type="number"
                              step="0.5"
                              required
                              value={propertyForm.bathrooms}
                              onChange={(e) => setPropertyForm(prev => ({ ...prev, bathrooms: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="area">Area (sqft) *</Label>
                            <Input
                              id="area"
                              type="number"
                              required
                              value={propertyForm.area}
                              onChange={(e) => setPropertyForm(prev => ({ ...prev, area: e.target.value }))}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select value={propertyForm.status} onValueChange={(value) => setPropertyForm(prev => ({ ...prev, status: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">Available</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="sold">Sold</SelectItem>
                              <SelectItem value="rented">Rented</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="images">Image URLs (comma-separated)</Label>
                          <Textarea
                            id="images"
                            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                            value={propertyForm.images}
                            onChange={(e) => setPropertyForm(prev => ({ ...prev, images: e.target.value }))}
                          />
                        </div>

                        <div>
                          <Label htmlFor="features">Features (comma-separated)</Label>
                          <Textarea
                            id="features"
                            placeholder="Swimming Pool, Garden, Garage, Modern Kitchen"
                            value={propertyForm.features}
                            onChange={(e) => setPropertyForm(prev => ({ ...prev, features: e.target.value }))}
                          />
                        </div>

                        <div className="flex gap-4">
                          <Button type="submit" disabled={createPropertyMutation.isPending || updatePropertyMutation.isPending}>
                            {createPropertyMutation.isPending || updatePropertyMutation.isPending ? 'Saving...' : 
                             editingProperty ? 'Update Property' : 'Create Property'}
                          </Button>
                          <Button type="button" variant="outline" onClick={() => setShowPropertyModal(false)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Property</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {propertiesLoading ? (
                        <tr>
                          <td colSpan="5" className="text-center py-8">Loading...</td>
                        </tr>
                      ) : properties.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-8 text-gray-500">No properties found</td>
                        </tr>
                      ) : (
                        properties.map((property) => (
                          <tr key={property.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <img 
                                  src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'} 
                                  alt={property.title}
                                  className="w-12 h-10 object-cover rounded-lg mr-3"
                                  onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9';
                                  }}
                                />
                                <div>
                                  <p className="font-medium text-gray-900">{property.title}</p>
                                  <p className="text-sm text-gray-600">{property.location}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 font-medium">{formatPrice(property.price)}</td>
                            <td className="py-4 px-4">
                              <Badge className={`${statusColors[property.status]} text-white`}>
                                {property.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 capitalize">{property.propertyType}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-2">
                                <button 
                                  onClick={() => handleEditProperty(property)}
                                  className="text-primary hover:text-blue-700"
                                >
                                  <span className="material-icons">edit</span>
                                </button>
                                <button 
                                  onClick={() => deletePropertyMutation.mutate(property.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <span className="material-icons">delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Manage Users</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Joined</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersLoading ? (
                        <tr>
                          <td colSpan="5" className="text-center py-8">Loading...</td>
                        </tr>
                      ) : users.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-8 text-gray-500">No users found</td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                                  <span>{user.firstName?.[0]}{user.lastName?.[0]}</span>
                                </div>
                                <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4">{user.email}</td>
                            <td className="py-4 px-4">
                              <Badge className={user.role === 'admin' ? 'bg-purple-500' : 'bg-blue-500'}>
                                {user.role}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">{formatDate(user.createdAt)}</td>
                            <td className="py-4 px-4">
                              {user.role !== 'admin' && (
                                <button 
                                  onClick={() => deleteUserMutation.mutate(user.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <span className="material-icons">delete</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Inquiries Tab */}
              <TabsContent value="inquiries" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Manage Inquiries</h3>
                </div>

                <div className="space-y-4">
                  {inquiriesLoading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : inquiries.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No inquiries found</div>
                  ) : (
                    inquiries.map((inquiry) => (
                      <Card key={inquiry.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-bold text-gray-900">
                                {inquiry.propertyId ? `Property Inquiry #${inquiry.propertyId}` : 'General Inquiry'}
                              </h4>
                              <p className="text-sm text-gray-600">From: {inquiry.email}</p>
                              <p className="text-sm text-gray-600">Name: {inquiry.name}</p>
                              {inquiry.phone && (
                                <p className="text-sm text-gray-600">Phone: {inquiry.phone}</p>
                              )}
                              <p className="text-sm text-gray-600">{formatDate(inquiry.createdAt)}</p>
                            </div>
                            <Badge className={
                              inquiry.status === 'pending' ? 'bg-yellow-500' :
                              inquiry.status === 'read' ? 'bg-blue-500' : 'bg-green-500'
                            }>
                              {inquiry.status}
                            </Badge>
                          </div>
                          <p className="text-gray-700 mb-4">{inquiry.message}</p>
                          <div className="flex items-center space-x-3">
                            <Button 
                              size="sm"
                              onClick={() => updateInquiryStatusMutation.mutate({ id: inquiry.id, status: 'read' })}
                              disabled={inquiry.status === 'read'}
                            >
                              Mark as Read
                            </Button>
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => updateInquiryStatusMutation.mutate({ id: inquiry.id, status: 'replied' })}
                              disabled={inquiry.status === 'replied'}
                            >
                              Mark as Replied
                            </Button>
                            <button 
                              onClick={() => deleteInquiryMutation.mutate(inquiry.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <span className="material-icons">delete</span>
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AdminDashboardPage = () => {
  return (
    <AuthProvider>
      <AdminDashboard />
    </AuthProvider>
  );
};

export default AdminDashboardPage;
