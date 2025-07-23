import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Car } from 'lucide-react';
import { seatLayout } from '@/data/busData';

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

interface SeatSelectionProps {
  bus: Bus;
  onBack: () => void;
  onProceed: (selectedSeats: string[], totalAmount: number) => void;
}

export const SeatSelection = ({ bus, onBack, onProceed }: SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  const layout = seatLayout[bus.type as keyof typeof seatLayout] || seatLayout.express;
  
  // Generate seat numbers
  const generateSeats = () => {
    const seats: Array<{ number: string; isAvailable: boolean; isSelected: boolean }> = [];
    let seatNumber = 1;
    
    for (let row = 1; row <= layout.rows; row++) {
      for (let seat = 1; seat <= layout.seatsPerRow; seat++) {
        const seatId = `${row}${String.fromCharCode(64 + seat)}`;
        const isAvailable = Math.random() > 0.3; // 70% seats available randomly
        seats.push({
          number: seatId,
          isAvailable,
          isSelected: selectedSeats.includes(seatId)
        });
        seatNumber++;
      }
    }
    return seats;
  };

  const seats = generateSeats();

  const toggleSeat = (seatNumber: string) => {
    const seat = seats.find(s => s.number === seatNumber);
    if (!seat?.isAvailable) return;

    setSelectedSeats(prev => 
      prev.includes(seatNumber) 
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const getSeatClass = (seat: { isAvailable: boolean; isSelected: boolean }) => {
    if (seat.isSelected) return 'bg-primary text-primary-foreground border-primary';
    if (seat.isAvailable) return 'bg-card hover:bg-muted border-border cursor-pointer';
    return 'bg-muted text-muted-foreground border-muted cursor-not-allowed';
  };

  const totalAmount = selectedSeats.length * bus.price;

  return (
    <div className="space-y-6 animate-slide-in-right">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Buses
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{bus.name}</h2>
          <p className="text-muted-foreground">{bus.departure} - {bus.arrival} ({bus.duration})</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Select Your Seats
              </CardTitle>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-card border border-border rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted rounded"></div>
                  <span>Occupied</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Driver seat */}
                <div className="flex items-center justify-end mb-4">
                  <div className="flex items-center gap-2 p-2 bg-secondary/20 rounded-lg">
                    <Car className="w-5 h-5 text-secondary" />
                    <span className="text-sm font-medium">Driver</span>
                  </div>
                </div>
                
                {/* Seat grid */}
                <div className="space-y-2">
                  {Array.from({ length: layout.rows }, (_, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-2">
                      <div className="flex gap-1">
                        {seats.slice(rowIndex * layout.seatsPerRow, (rowIndex + 1) * layout.seatsPerRow).map((seat, seatIndex) => (
                          <button
                            key={seat.number}
                            onClick={() => toggleSeat(seat.number)}
                            disabled={!seat.isAvailable}
                            className={`w-10 h-10 rounded-lg border-2 text-xs font-bold transition-all duration-200 ${getSeatClass(seat)} ${
                              seatIndex === 1 && layout.layout.includes('+') ? 'mr-4' : ''
                            }`}
                          >
                            {seat.number}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="shadow-medium sticky top-4">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Selected Seats:</span>
                  <span className="font-medium">
                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Price per seat:</span>
                  <span className="font-medium">₹{bus.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Number of seats:</span>
                  <span className="font-medium">{selectedSeats.length}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-primary">₹{totalAmount}</span>
                </div>
              </div>

              {selectedSeats.length > 0 && (
                <div className="space-y-2">
                  {selectedSeats.map(seat => (
                    <Badge key={seat} variant="outline" className="mr-1">
                      Seat {seat}
                    </Badge>
                  ))}
                </div>
              )}

              <Button 
                onClick={() => onProceed(selectedSeats, totalAmount)}
                disabled={selectedSeats.length === 0}
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-3 transition-all duration-300"
              >
                Proceed to Passenger Details
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};