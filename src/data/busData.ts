export const cities = [
  'Hyderabad', 'Vijayawada', 'Visakhapatnam', 'Tirupati', 'Guntur',
  'Kakinada', 'Nellore', 'Kurnool', 'Rajahmundry', 'Anantapur',
  'Eluru', 'Ongole', 'Chittoor', 'Kadapa', 'Vizianagaram',
  'Machilipatnam', 'Srikakulam', 'Adoni', 'Tenali', 'Proddatur',
  'Hindupur', 'Bhimavaram', 'Madanapalle', 'Guntakal', 'Dharmavaram'
];

export const busTypes = [
  { id: 'express', name: 'Express', icon: '🚌' },
  { id: 'deluxe', name: 'Deluxe', icon: '🚍' },
  { id: 'super-deluxe', name: 'Super Deluxe', icon: '🚐' },
  { id: 'volvo', name: 'Volvo AC', icon: '🚎' },
  { id: 'sleeper', name: 'Sleeper', icon: '🛏️' }
];

export const routes = [
  {
    id: 1,
    from: 'Hyderabad',
    to: 'Vijayawada',
    buses: [
      {
        id: 'AP001',
        name: 'APSRTC Express',
        type: 'express',
        departure: '06:00',
        arrival: '10:30',
        duration: '4h 30m',
        price: 250,
        availableSeats: 23,
        totalSeats: 40,
        amenities: ['AC', 'WiFi', 'Charging Point']
      },
      {
        id: 'AP002',
        name: 'APSRTC Volvo',
        type: 'volvo',
        departure: '08:15',
        arrival: '12:45',
        duration: '4h 30m',
        price: 450,
        availableSeats: 12,
        totalSeats: 35,
        amenities: ['AC', 'WiFi', 'Charging Point', 'Entertainment', 'Snacks']
      }
    ]
  },
  {
    id: 2,
    from: 'Hyderabad',
    to: 'Visakhapatnam',
    buses: [
      {
        id: 'AP003',
        name: 'APSRTC Super Deluxe',
        type: 'super-deluxe',
        departure: '22:00',
        arrival: '08:30',
        duration: '10h 30m',
        price: 650,
        availableSeats: 18,
        totalSeats: 45,
        amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket']
      }
    ]
  },
  {
    id: 3,
    from: 'Vijayawada',
    to: 'Tirupati',
    buses: [
      {
        id: 'AP004',
        name: 'APSRTC Express',
        type: 'express',
        departure: '05:30',
        arrival: '11:00',
        duration: '5h 30m',
        price: 300,
        availableSeats: 28,
        totalSeats: 40,
        amenities: ['AC', 'Charging Point']
      }
    ]
  },
  {
    id: 4,
    from: 'Tirupati',
    to: 'Chennai',
    buses: [
      {
        id: 'AP005',
        name: 'APSRTC Deluxe',
        type: 'deluxe',
        departure: '14:00',
        arrival: '17:30',
        duration: '3h 30m',
        price: 200,
        availableSeats: 15,
        totalSeats: 35,
        amenities: ['AC', 'WiFi']
      }
    ]
  },
  {
    id: 5,
    from: 'Guntur',
    to: 'Hyderabad',
    buses: [
      {
        id: 'AP006',
        name: 'APSRTC Express',
        type: 'express',
        departure: '07:15',
        arrival: '11:45',
        duration: '4h 30m',
        price: 280,
        availableSeats: 22,
        totalSeats: 40,
        amenities: ['AC', 'Charging Point']
      }
    ]
  },
  {
    id: 6,
    from: 'Kakinada',
    to: 'Hyderabad',
    buses: [
      {
        id: 'AP007',
        name: 'APSRTC Super Deluxe',
        type: 'super-deluxe',
        departure: '21:30',
        arrival: '07:00',
        duration: '9h 30m',
        price: 550,
        availableSeats: 16,
        totalSeats: 45,
        amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket']
      }
    ]
  },
  {
    id: 7,
    from: 'Nellore',
    to: 'Bangalore',
    buses: [
      {
        id: 'AP008',
        name: 'APSRTC Volvo',
        type: 'volvo',
        departure: '23:00',
        arrival: '05:30',
        duration: '6h 30m',
        price: 480,
        availableSeats: 20,
        totalSeats: 35,
        amenities: ['AC', 'WiFi', 'Entertainment', 'Snacks']
      }
    ]
  },
  {
    id: 8,
    from: 'Kurnool',
    to: 'Hyderabad',
    buses: [
      {
        id: 'AP009',
        name: 'APSRTC Express',
        type: 'express',
        departure: '06:45',
        arrival: '11:15',
        duration: '4h 30m',
        price: 320,
        availableSeats: 25,
        totalSeats: 40,
        amenities: ['AC', 'Charging Point']
      }
    ]
  },
  {
    id: 9,
    from: 'Rajahmundry',
    to: 'Vijayawada',
    buses: [
      {
        id: 'AP010',
        name: 'APSRTC Deluxe',
        type: 'deluxe',
        departure: '08:00',
        arrival: '11:30',
        duration: '3h 30m',
        price: 180,
        availableSeats: 30,
        totalSeats: 35,
        amenities: ['AC', 'WiFi']
      }
    ]
  },
  {
    id: 10,
    from: 'Anantapur',
    to: 'Bangalore',
    buses: [
      {
        id: 'AP011',
        name: 'APSRTC Express',
        type: 'express',
        departure: '15:30',
        arrival: '19:00',
        duration: '3h 30m',
        price: 220,
        availableSeats: 18,
        totalSeats: 40,
        amenities: ['AC', 'Charging Point']
      }
    ]
  },
  {
    id: 11,
    from: 'Eluru',
    to: 'Hyderabad',
    buses: [
      {
        id: 'AP012',
        name: 'APSRTC Super Deluxe',
        type: 'super-deluxe',
        departure: '22:15',
        arrival: '05:45',
        duration: '7h 30m',
        price: 420,
        availableSeats: 14,
        totalSeats: 45,
        amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket']
      }
    ]
  },
  {
    id: 12,
    from: 'Ongole',
    to: 'Chennai',
    buses: [
      {
        id: 'AP013',
        name: 'APSRTC Volvo',
        type: 'volvo',
        departure: '20:00',
        arrival: '02:30',
        duration: '6h 30m',
        price: 390,
        availableSeats: 22,
        totalSeats: 35,
        amenities: ['AC', 'WiFi', 'Entertainment', 'Snacks']
      }
    ]
  },
  {
    id: 13,
    from: 'Chittoor',
    to: 'Tirupati',
    buses: [
      {
        id: 'AP014',
        name: 'APSRTC Express',
        type: 'express',
        departure: '09:30',
        arrival: '10:30',
        duration: '1h 00m',
        price: 80,
        availableSeats: 35,
        totalSeats: 40,
        amenities: ['Charging Point']
      }
    ]
  },
  {
    id: 14,
    from: 'Kadapa',
    to: 'Hyderabad',
    buses: [
      {
        id: 'AP015',
        name: 'APSRTC Deluxe',
        type: 'deluxe',
        departure: '21:00',
        arrival: '05:30',
        duration: '8h 30m',
        price: 380,
        availableSeats: 19,
        totalSeats: 35,
        amenities: ['AC', 'WiFi', 'Charging Point']
      }
    ]
  },
  {
    id: 15,
    from: 'Vizianagaram',
    to: 'Visakhapatnam',
    buses: [
      {
        id: 'AP016',
        name: 'APSRTC Express',
        type: 'express',
        departure: '07:00',
        arrival: '09:00',
        duration: '2h 00m',
        price: 120,
        availableSeats: 28,
        totalSeats: 40,
        amenities: ['AC', 'Charging Point']
      }
    ]
  },
  {
    id: 16,
    from: 'Machilipatnam',
    to: 'Vijayawada',
    buses: [
      {
        id: 'AP017',
        name: 'APSRTC Express',
        type: 'express',
        departure: '06:15',
        arrival: '08:15',
        duration: '2h 00m',
        price: 100,
        availableSeats: 32,
        totalSeats: 40,
        amenities: ['AC', 'Charging Point']
      }
    ]
  },
  {
    id: 17,
    from: 'Srikakulam',
    to: 'Visakhapatnam',
    buses: [
      {
        id: 'AP018',
        name: 'APSRTC Super Deluxe',
        type: 'super-deluxe',
        departure: '14:30',
        arrival: '18:00',
        duration: '3h 30m',
        price: 250,
        availableSeats: 21,
        totalSeats: 45,
        amenities: ['AC', 'WiFi', 'Charging Point']
      }
    ]
  },
  {
    id: 18,
    from: 'Tenali',
    to: 'Hyderabad',
    buses: [
      {
        id: 'AP019',
        name: 'APSRTC Volvo',
        type: 'volvo',
        departure: '23:30',
        arrival: '04:00',
        duration: '4h 30m',
        price: 420,
        availableSeats: 17,
        totalSeats: 35,
        amenities: ['AC', 'WiFi', 'Entertainment', 'Snacks']
      }
    ]
  },
  {
    id: 19,
    from: 'Bhimavaram',
    to: 'Hyderabad',
    buses: [
      {
        id: 'AP020',
        name: 'APSRTC Express',
        type: 'express',
        departure: '20:45',
        arrival: '04:15',
        duration: '7h 30m',
        price: 350,
        availableSeats: 24,
        totalSeats: 40,
        amenities: ['AC', 'Charging Point']
      }
    ]
  },
  {
    id: 20,
    from: 'Guntakal',
    to: 'Bangalore',
    buses: [
      {
        id: 'AP021',
        name: 'APSRTC Sleeper',
        type: 'sleeper',
        departure: '22:30',
        arrival: '06:00',
        duration: '7h 30m',
        price: 520,
        availableSeats: 12,
        totalSeats: 30,
        amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Pillow']
      }
    ]
  }
];

export const seatLayout = {
  express: {
    rows: 10,
    seatsPerRow: 4,
    layout: '2+2'
  },
  deluxe: {
    rows: 9,
    seatsPerRow: 4,
    layout: '2+2'
  },
  'super-deluxe': {
    rows: 11,
    seatsPerRow: 4,
    layout: '2+2'
  },
  volvo: {
    rows: 9,
    seatsPerRow: 4,
    layout: '2+2'
  },
  sleeper: {
    rows: 6,
    seatsPerRow: 5,
    layout: '2+1+2'
  }
};