import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MapPin, Search, Edit2 } from 'lucide-react';

interface LocationSelectorProps {
  onLocationSelect: (location: string) => void;
  selectedLocation: string;
  collapsed?: boolean;
}

export default function LocationSelector({ onLocationSelect, selectedLocation, collapsed = false }: LocationSelectorProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleUseMyLocation = () => {
    // Mock location detection
    onLocationSelect('Braintree, England, United Kingdom');
    setIsEditing(false);
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      onLocationSelect(searchValue);
      setSearchValue('');
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Collapsed view for when location is already selected
  if (collapsed && selectedLocation && !isEditing) {
    return (
      <div className="flex items-center justify-center gap-2 py-2 transition-all duration-300">
        <MapPin className="size-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Location:</span>
        <span className="text-sm font-medium">{selectedLocation}</span>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsEditing(true)}
          className="h-7 px-2 text-xs"
        >
          <Edit2 className="size-3 mr-1" />
          Edit
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:w-1/2 lg:mx-auto transition-all duration-300">
      {/* Primary Action: Use My Location */}
      <div className="flex justify-center">
        <Button 
          onClick={handleUseMyLocation}
          size="lg"
          className="text-base px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[16px]"
        >
          <MapPin className="size-5" />
          Use my location
        </Button>
      </div>
      
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">or search</span>
        </div>
      </div>
      
      {/* Secondary Action: Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter any location..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 bg-input-background border-border h-10 text-sm"
          />
        </div>
        <Button 
          variant="secondary"
          onClick={handleSearch}
          className="shrink-0 h-10"
        >
          Search
        </Button>
      </div>
      
      {selectedLocation && !collapsed && (
        <p className="text-sm text-muted-foreground text-center">
          Selected: <span className="text-foreground font-medium">{selectedLocation}</span>
        </p>
      )}
    </div>
  );
}