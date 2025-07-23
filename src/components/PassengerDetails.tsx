import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Phone, Mail, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PassengerDetailsProps {
  selectedSeats: string[];
  totalAmount: number;
  onBack: () => void;
  onConfirmBooking: (passengerData: any, totalAmount: number) => void;
}

interface PassengerInfo {
  name: string;
  age: string;
  gender: string;
  seat: string;
}

export const PassengerDetails = ({ selectedSeats, totalAmount, onBack, onConfirmBooking }: PassengerDetailsProps) => {
  const { toast } = useToast();
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: '',
    emergencyContact: ''
  });

  const [passengers, setPassengers] = useState<PassengerInfo[]>(
    selectedSeats.map(seat => ({
      name: '',
      age: '',
      gender: '',
      seat
    }))
  );

  const updatePassenger = (index: number, field: keyof PassengerInfo, value: string) => {
    setPassengers(prev => prev.map((passenger, i) => 
      i === index ? { ...passenger, [field]: value } : passenger
    ));
  };

  const updateContactInfo = (field: keyof typeof contactInfo, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    // Check contact info
    if (!contactInfo.phone || !contactInfo.email || !contactInfo.emergencyContact) {
      toast({
        title: "Missing Contact Information",
        description: "Please fill in all contact details.",
        variant: "destructive"
      });
      return false;
    }

    // Check passengers
    for (let i = 0; i < passengers.length; i++) {
      const passenger = passengers[i];
      if (!passenger.name || !passenger.age || !passenger.gender) {
        toast({
          title: "Missing Passenger Information",
          description: `Please fill in all details for passenger ${i + 1}.`,
          variant: "destructive"
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onConfirmBooking({ contactInfo, passengers }, totalAmount);
    }
  };

  return (
    <div className="space-y-6 animate-slide-in-right">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Seat Selection
        </Button>
        <h2 className="text-2xl font-bold text-foreground">Passenger Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter mobile number"
                  value={contactInfo.phone}
                  onChange={(e) => updateContactInfo('phone', e.target.value)}
                  className="border-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={contactInfo.email}
                  onChange={(e) => updateContactInfo('email', e.target.value)}
                  className="border-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="emergency">Emergency Contact *</Label>
                <Input
                  id="emergency"
                  type="tel"
                  placeholder="Enter emergency contact number"
                  value={contactInfo.emergencyContact}
                  onChange={(e) => updateContactInfo('emergencyContact', e.target.value)}
                  className="border-2 focus:ring-primary"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Passenger Information */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Passenger Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {passengers.map((passenger, index) => (
                <div key={passenger.seat} className="p-4 border rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-3 text-primary">
                    Passenger {index + 1} - Seat {passenger.seat}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${index}`}>Full Name *</Label>
                      <Input
                        id={`name-${index}`}
                        placeholder="Enter full name"
                        value={passenger.name}
                        onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                        className="border-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`age-${index}`}>Age *</Label>
                      <Input
                        id={`age-${index}`}
                        type="number"
                        min="1"
                        max="120"
                        placeholder="Age"
                        value={passenger.age}
                        onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                        className="border-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`gender-${index}`}>Gender *</Label>
                      <Select 
                        value={passenger.gender} 
                        onValueChange={(value) => updatePassenger(index, 'gender', value)}
                      >
                        <SelectTrigger className="border-2 focus:ring-primary">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="space-y-4">
          <Card className="shadow-medium sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Selected Seats:</span>
                  <span className="font-medium">{selectedSeats.join(', ')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Number of Passengers:</span>
                  <span className="font-medium">{passengers.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Base Fare:</span>
                  <span className="font-medium">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Tax (5%):</span>
                  <span className="font-medium">₹{Math.round(totalAmount * 0.05)}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-primary">₹{Math.round(totalAmount * 1.05)}</span>
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-3 transition-all duration-300"
              >
                Confirm Booking & Pay
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                By proceeding, you agree to our terms and conditions
              </p>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};