import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  Search, 
  Filter,
  Download,
  X,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { bookingService, type BookingRecord } from '@/services/bookingService';
import { useToast } from '@/hooks/use-toast';

const BookingHistory = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter]);

  const loadBookings = () => {
    setLoading(true);
    try {
      const allBookings = bookingService.getAllBookings();
      setBookings(allBookings);
    } catch (error) {
      toast({
        title: "Error loading bookings",
        description: "Failed to load your booking history.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.busDetails.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.busDetails.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.busDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const success = bookingService.cancelBooking(bookingId);
      if (success) {
        loadBookings();
        toast({
          title: "Booking Cancelled",
          description: `Booking ${bookingId} has been cancelled successfully.`,
        });
      } else {
        toast({
          title: "Cancellation Failed",
          description: "Failed to cancel the booking. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const downloadTicket = (booking: BookingRecord) => {
    const ticketData = `
APSRTC E-TICKET
================
Booking ID: ${booking.bookingId}
Status: ${booking.status.toUpperCase()}
Booking Date: ${new Date(booking.bookingDate).toLocaleDateString()}

JOURNEY DETAILS:
From: ${booking.busDetails.from}
To: ${booking.busDetails.to}
Date: ${booking.busDetails.date}
Bus: ${booking.busDetails.name}
Departure: ${booking.busDetails.departure}
Arrival: ${booking.busDetails.arrival}

PASSENGERS:
${booking.passengers.map((p, i) => `${i + 1}. ${p.name} (${p.age}/${p.gender}) - Seat ${p.seat}`).join('\n')}

CONTACT DETAILS:
Phone: ${booking.contactInfo.phone}
Email: ${booking.contactInfo.email}
Emergency Contact: ${booking.contactInfo.emergencyContact}

PAYMENT:
Total Amount: ₹${booking.totalAmount}

Thank you for choosing APSRTC!
    `;

    const blob = new Blob([ticketData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `APSRTC-Ticket-${booking.bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: BookingRecord['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-info" />;
      default:
        return <AlertCircle className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusColor = (status: BookingRecord['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success text-success-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      case 'completed':
        return 'bg-info text-info-foreground';
      default:
        return 'bg-warning text-warning-foreground';
    }
  };

  const isPastDate = (dateString: string) => {
    const travelDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return travelDate < today;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your bookings...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">My Bookings</h1>
            <p className="text-muted-foreground">
              View and manage all your APSRTC bus bookings
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="shadow-medium">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by booking ID, route, or bus name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(searchTerm || statusFilter !== 'all') && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                    }}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <Card className="shadow-medium">
              <CardContent className="p-12 text-center">
                <div className="space-y-4">
                  <div className="text-4xl">🎫</div>
                  <h3 className="text-xl font-semibold">
                    {bookings.length === 0 ? 'No bookings found' : 'No matching bookings'}
                  </h3>
                  <p className="text-muted-foreground">
                    {bookings.length === 0 
                      ? 'You haven\'t made any bookings yet. Start by booking your first journey!'
                      : 'Try adjusting your search criteria or filters.'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking, index) => (
                <Card 
                  key={booking.bookingId} 
                  className="shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in border-l-4 border-l-primary"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-lg font-bold">
                            Booking #{booking.bookingId}
                          </CardTitle>
                          <Badge className={`flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Booked on {new Date(booking.bookingDate).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">₹{booking.totalAmount}</div>
                        <div className="text-sm text-muted-foreground">
                          {booking.passengers.length} passenger{booking.passengers.length > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Journey Details */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-secondary">Journey Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="font-medium">{booking.busDetails.from}</span>
                            <span className="text-muted-foreground">→</span>
                            <span className="font-medium">{booking.busDetails.to}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-accent" />
                            <span>{booking.busDetails.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-secondary" />
                            <span>{booking.busDetails.departure} - {booking.busDetails.arrival}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Bus:</span>
                            <span className="font-medium ml-1">{booking.busDetails.name}</span>
                          </div>
                        </div>
                      </div>

                      {/* Passenger Details */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-secondary">Passengers</h4>
                        <div className="space-y-2">
                          {booking.passengers.map((passenger, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <div>
                                <span className="font-medium">{passenger.name}</span>
                                <span className="text-muted-foreground ml-2">
                                  ({passenger.age}/{passenger.gender})
                                </span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                Seat {passenger.seat}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-sm pt-2 border-t">
                          <Phone className="w-4 h-4 text-info" />
                          <span>{booking.contactInfo.phone}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 justify-start">
                        <Button
                          onClick={() => downloadTicket(booking)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download Ticket
                        </Button>
                        
                        {booking.status === 'confirmed' && !isPastDate(booking.busDetails.date) && (
                          <Button
                            onClick={() => handleCancelBooking(booking.bookingId)}
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Cancel Booking
                          </Button>
                        )}

                        {isPastDate(booking.busDetails.date) && booking.status === 'confirmed' && (
                          <Badge variant="secondary" className="justify-center">
                            Journey Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;