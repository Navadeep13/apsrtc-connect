import { useState } from 'react';
import { BusSearchForm } from '@/components/BusSearchForm';
import { BusList } from '@/components/BusList';
import { SeatSelection } from '@/components/SeatSelection';
import { PassengerDetails } from '@/components/PassengerDetails';
import { BookingConfirmation } from '@/components/BookingConfirmation';
import { routes } from '@/data/busData';
import { bookingService } from '@/services/bookingService';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-bus.jpg';

interface SearchFormData {
  from: string;
  to: string;
  date: string;
}

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

type BookingStep = 'search' | 'buses' | 'seats' | 'passenger' | 'confirmation';

const Index = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<BookingStep>('search');
  const [searchData, setSearchData] = useState<SearchFormData | null>(null);
  const [availableBuses, setAvailableBuses] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingData, setBookingData] = useState<any>(null);

  const handleSearch = (data: SearchFormData) => {
    setSearchData(data);
    // Find routes matching the search criteria
    const matchingRoutes = routes.filter(route => 
      route.from.toLowerCase() === data.from.toLowerCase() && 
      route.to.toLowerCase() === data.to.toLowerCase()
    );
    
    if (matchingRoutes.length > 0) {
      const buses = matchingRoutes.flatMap(route => route.buses);
      setAvailableBuses(buses);
      setStep('buses');
      toast({
        title: "Buses Found!",
        description: `Found ${buses.length} available bus(es) for your route.`,
      });
    } else {
      toast({
        title: "No Buses Found",
        description: "Sorry, no buses available for this route. Please try a different route.",
        variant: "destructive"
      });
    }
  };

  const handleSelectBus = (bus: Bus) => {
    setSelectedBus(bus);
    setStep('seats');
  };

  const handleSeatSelection = (seats: string[], amount: number) => {
    setSelectedSeats(seats);
    setTotalAmount(Math.round(amount * 1.05)); // Add 5% service tax
    setStep('passenger');
  };

  const handleBookingConfirmation = (passengerData: any, amount: number) => {
    const bookingId = `APSRTC${Date.now().toString().slice(-8)}`;
    const booking = {
      bookingId,
      ...passengerData,
      busDetails: {
        name: selectedBus?.name || '',
        departure: selectedBus?.departure || '',
        arrival: selectedBus?.arrival || '',
        from: searchData?.from || '',
        to: searchData?.to || '',
        date: searchData?.date || ''
      },
      totalAmount: amount
    };
    
    // Save booking to localStorage
    bookingService.saveBooking(booking);
    
    setBookingData(booking);
    setStep('confirmation');
    
    toast({
      title: "Booking Confirmed!",
      description: `Your booking ${bookingId} has been confirmed successfully.`,
    });
  };

  const handleNewBooking = () => {
    setStep('search');
    setSearchData(null);
    setAvailableBuses([]);
    setSelectedBus(null);
    setSelectedSeats([]);
    setTotalAmount(0);
    setBookingData(null);
  };

  const renderStep = () => {
    switch (step) {
      case 'search':
        return <BusSearchForm onSearch={handleSearch} />;
      case 'buses':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Available Buses: {searchData?.from} → {searchData?.to}
              </h2>
              <p className="text-muted-foreground">Travel Date: {searchData?.date}</p>
            </div>
            <BusList buses={availableBuses} onSelectBus={handleSelectBus} />
          </div>
        );
      case 'seats':
        return selectedBus ? (
          <SeatSelection 
            bus={selectedBus}
            onBack={() => setStep('buses')}
            onProceed={handleSeatSelection}
          />
        ) : null;
      case 'passenger':
        return (
          <PassengerDetails
            selectedSeats={selectedSeats}
            totalAmount={totalAmount}
            onBack={() => setStep('seats')}
            onConfirmBooking={handleBookingConfirmation}
          />
        );
      case 'confirmation':
        return bookingData ? (
          <BookingConfirmation
            bookingData={bookingData}
            onNewBooking={handleNewBooking}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white py-6 px-4 shadow-strong">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="text-2xl">🚌</div>
              <div>
                <h1 className="text-2xl font-bold">APSRTC Online Booking</h1>
                <p className="text-sm opacity-90">Andhra Pradesh State Road Transport Corporation</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link 
                to="/bookings" 
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20"
              >
                <span className="text-sm font-medium">My Bookings</span>
              </Link>
              {step !== 'search' && (
                <button
                  onClick={handleNewBooking}
                  className="text-sm underline hover:no-underline transition-all duration-200"
                >
                  New Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Only show on search step */}
      {step === 'search' && (
        <section className="relative bg-gradient-to-br from-primary/20 to-secondary/20 py-16 px-4 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
              Book Your Journey with APSRTC
            </h2>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Safe, Comfortable & Affordable Bus Travel Across Andhra Pradesh
            </p>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        {renderStep()}
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 px-4 mt-16">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-2">APSRTC</h3>
              <p className="text-sm opacity-80">
                Connecting Andhra Pradesh with safe and reliable bus services since 1958.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Customer Support</h3>
              <p className="text-sm opacity-80">24/7 Helpline: 1800-425-4444</p>
              <p className="text-sm opacity-80">Email: support@apsrtc.gov.in</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Follow Us</h3>
              <p className="text-sm opacity-80">Stay updated with our latest services and offers</p>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-4">
            <p className="text-sm opacity-60">
              © 2024 APSRTC. All rights reserved. | Terms & Conditions | Privacy Policy
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
