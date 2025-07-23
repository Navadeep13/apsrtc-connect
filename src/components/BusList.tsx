import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, Wifi, Zap, Star } from 'lucide-react';
import { busTypes } from '@/data/busData';

interface Bus {
  id: string;
  name: string;
  type: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  amenities: string[];
}

interface BusListProps {
  buses: Bus[];
  onSelectBus: (bus: Bus) => void;
}

export const BusList = ({ buses, onSelectBus }: BusListProps) => {
  const getBusTypeInfo = (type: string) => {
    return busTypes.find(bt => bt.id === type) || busTypes[0];
  };

  const getAmenityIcon = (amenity: string) => {
    const icons: { [key: string]: JSX.Element } = {
      'WiFi': <Wifi className="w-4 h-4" />,
      'Charging Point': <Zap className="w-4 h-4" />,
      'AC': <Star className="w-4 h-4" />,
      'Entertainment': <Star className="w-4 h-4" />,
      'Snacks': <Star className="w-4 h-4" />,
      'Blanket': <Star className="w-4 h-4" />,
      'Pillow': <Star className="w-4 h-4" />
    };
    return icons[amenity] || <Star className="w-4 h-4" />;
  };

  const getSeatAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-success';
    if (percentage > 20) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-4">
      {buses.map((bus, index) => {
        const busTypeInfo = getBusTypeInfo(bus.type);
        return (
          <Card 
            key={bus.id} 
            className="shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in border-l-4 border-l-primary"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                    <span className="text-2xl">{busTypeInfo.icon}</span>
                    {bus.name}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {busTypeInfo.name}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">₹{bus.price}</div>
                  <div className="text-sm text-muted-foreground">per seat</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">Departure:</span>
                    <span className="font-bold">{bus.departure}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="font-medium">Arrival:</span>
                    <span className="font-bold">{bus.arrival}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="font-medium">Duration:</span>
                    <span className="font-bold">{bus.duration}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-info" />
                    <span className="font-medium">Available:</span>
                    <span className={`font-bold ${getSeatAvailabilityColor(bus.availableSeats, bus.totalSeats)}`}>
                      {bus.availableSeats}/{bus.totalSeats} seats
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {bus.amenities.map((amenity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs flex items-center gap-1">
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <Button 
                    onClick={() => onSelectBus(bus)}
                    className="bg-gradient-secondary hover:opacity-90 text-secondary-foreground px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-soft hover:shadow-medium"
                    disabled={bus.availableSeats === 0}
                  >
                    {bus.availableSeats === 0 ? 'Sold Out' : 'Select Seats'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};