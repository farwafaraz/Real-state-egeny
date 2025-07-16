import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchFilter = ({ onSearch, compact = false }) => {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    bedrooms: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleBedroomSelect = (value) => {
    setFilters(prev => ({ ...prev, bedrooms: value }));
  };

  if (compact) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="City, State, or ZIP"
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>
          
          <div className="w-32">
            <Label htmlFor="propertyType">Type</Label>
            <Select value={filters.propertyType} onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="flex items-center">
            <span className="material-icons mr-2">search</span>
            Search
          </Button>
        </form>
      </div>
    );
  }

  return (
    <>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Properties</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </Label>
          <div className="relative">
            <span className="material-icons absolute left-3 top-3 text-gray-400">location_on</span>
            <Input
              id="location"
              type="text"
              placeholder="City, State, or ZIP code"
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="pl-12"
            />
          </div>
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Price Range</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
            />
          </div>
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Property Type</Label>
          <Select value={filters.propertyType} onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</Label>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleBedroomSelect(num.toString())}
                className={`py-2 px-3 border rounded-lg text-center transition ${
                  filters.bedrooms === num.toString()
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-gray-300 hover:border-primary hover:text-primary'
                }`}
              >
                {num}+
              </button>
            ))}
          </div>
        </div>
        
        <Button type="submit" className="w-full flex items-center justify-center">
          <span className="material-icons mr-2">search</span>
          Search Properties
        </Button>
      </form>
    </>
  );
};

export default SearchFilter;
