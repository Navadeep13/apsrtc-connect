import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, Calendar, MapPin, Clock, User, Phone, Mail } from 'lucide-react';

interface BookingConfirmationProps {
  bookingData: {
    bookingId: string;
    contactInfo: {
      phone: string;
      email: string;
      emergencyContact: string;
    };
    passengers: Array<{
      name: string;
      age: string;
      gender: string;
      seat: string;
    }>;
    busDetails: {
      name: string;
      departure: string;
      arrival: string;
      from: string;
      to: string;
      date: string;
    };
    totalAmount: number;
  };
  onNewBooking: () => void;
}

export const BookingConfirmation = ({ bookingData, onNewBooking }: BookingConfirmationProps) => {
  const handleDownloadTicket = () => {
    // In a real app, this would generate a PDF ticket
    const ticketData = `
APSRTC E-TICKET
================
Booking ID: ${bookingData.bookingId}
From: ${bookingData.busDetails.from}
To: ${bookingData.busDetails.to}
Date: ${bookingData.busDetails.date}
Bus: ${bookingData.busDetails.name}
Departure: ${bookingData.busDetails.departure}
Arrival: ${bookingData.busDetails.arrival}

PASSENGERS:
${bookingData.passengers.map((p, i) => `${i + 1}. ${p.name} (${p.age}/${p.gender}) - Seat ${p.seat}`).join('\n')}

Contact: ${bookingData.contactInfo.phone}
Email: ${bookingData.contactInfo.email}
Total Amount: ₹${bookingData.totalAmount}

Thank you for choosing APSRTC!
    `;

    const blob = new Blob([ticketData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `APSRTC-Ticket-${bookingData.bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-bounce-in">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-success animate-scale-in" />
        </div>
        <h1 className="text-3xl font-bold text-success">Booking Confirmed!</h1>
        <p className="text-lg text-muted-foreground">
          Your bus ticket has been booked successfully
        </p>
        <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full">
          <strong>Booking ID: {bookingData.bookingId}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trip Details */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Trip Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-semibold text-lg">{bookingData.busDetails.from}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-semibold text-lg">{bookingData.busDetails.to}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{bookingData.busDetails.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{bookingData.busDetails.departure} - {bookingData.busDetails.arrival}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Bus</p>
              <p className="font-semibold">{bookingData.busDetails.name}</p>
            </div>
          </CardContent>
        </Card>

        {/* Passenger Details */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-secondary" />
              Passenger Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bookingData.passengers.map((passenger, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">{passenger.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {passenger.age} years • {passenger.gender}
                  </p>
                </div>
                <Badge variant="outline" className="bg-primary text-primary-foreground">
                  Seat {passenger.seat}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-info" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{bookingData.contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{bookingData.contactInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>Emergency: {bookingData.contactInfo.emergencyContact}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Base Fare</span>
              <span>₹{Math.round(bookingData.totalAmount / 1.05)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Tax (5%)</span>
              <span>₹{Math.round(bookingData.totalAmount - (bookingData.totalAmount / 1.05))}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Paid</span>
                <span className="text-success">₹{bookingData.totalAmount}</span>
              </div>
            </div>
            <Badge className="w-full justify-center bg-success text-success-foreground">
              Payment Successful
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={handleDownloadTicket}
          variant="outline"
          className="flex items-center gap-2 px-6 py-3"
        >
          <Download className="w-4 h-4" />
          Download Ticket
        </Button>
        <Button 
          onClick={onNewBooking}
          className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-6 py-3"
        >
          Book Another Ticket
        </Button>
      </div>

      {/* Important Notes */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-2 text-warning">Important Notes:</h4>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Please arrive at the boarding point 15 minutes before departure</li>
            <li>Carry a valid ID proof for verification</li>
            <li>Keep your booking ID handy for any assistance</li>
            <li>Cancellation charges may apply as per APSRTC policy</li>
            <li>For any queries, contact APSRTC customer support</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};