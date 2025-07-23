// Booking service to manage localStorage operations
export interface BookingRecord {
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
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}

const BOOKINGS_KEY = 'apsrtc_bookings';

export const bookingService = {
  // Save a new booking
  saveBooking: (booking: Omit<BookingRecord, 'bookingDate' | 'status'>): void => {
    const bookingRecord: BookingRecord = {
      ...booking,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };

    const existingBookings = bookingService.getAllBookings();
    const updatedBookings = [bookingRecord, ...existingBookings];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
  },

  // Get all bookings
  getAllBookings: (): BookingRecord[] => {
    try {
      const bookingsJson = localStorage.getItem(BOOKINGS_KEY);
      return bookingsJson ? JSON.parse(bookingsJson) : [];
    } catch (error) {
      console.error('Error retrieving bookings:', error);
      return [];
    }
  },

  // Get booking by ID
  getBookingById: (bookingId: string): BookingRecord | null => {
    const bookings = bookingService.getAllBookings();
    return bookings.find(booking => booking.bookingId === bookingId) || null;
  },

  // Cancel a booking
  cancelBooking: (bookingId: string): boolean => {
    const bookings = bookingService.getAllBookings();
    const bookingIndex = bookings.findIndex(booking => booking.bookingId === bookingId);
    
    if (bookingIndex !== -1) {
      bookings[bookingIndex].status = 'cancelled';
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
      return true;
    }
    return false;
  },

  // Clear all bookings (for demo purposes)
  clearAllBookings: (): void => {
    localStorage.removeItem(BOOKINGS_KEY);
  }
};