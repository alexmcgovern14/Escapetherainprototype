import React from 'react';
import { Card } from './ui/card';
import { MapPin, Sun } from 'lucide-react';
import { Button } from './ui/button';

export interface Destination {
  id: number;
  name: string;
  distance: string;
  weatherStatus: string;
  thingsToDo: string[];
}

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const handleOpenInMaps = () => {
    // Mock opening in maps
    console.log('Opening', destination.name, 'in maps');
  };

  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-medium text-lg">{destination.name}</h3>
            <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
              <MapPin className="size-3.5" />
              <span className="text-sm">{destination.distance} away</span>
            </div>
          </div>
          <Button 
            size="sm" 
            onClick={handleOpenInMaps}
          >
            Open in Maps
          </Button>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Sun className="size-4 text-yellow-500" />
          <span className="font-medium">{destination.weatherStatus}</span>
        </div>
        
        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground mb-2">Things to do:</p>
          <div className="flex flex-wrap gap-2">
            {destination.thingsToDo.map((thing, index) => (
              <span 
                key={index}
                className="text-xs px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full"
              >
                {thing}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
