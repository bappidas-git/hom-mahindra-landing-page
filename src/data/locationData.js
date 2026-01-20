/* ============================================
   Location Data - Mahindra Blossom
   Location advantages and nearby landmarks
   ============================================ */

// Icon colors matching the design
export const LOCATION_COLORS = {
  gold: '#C9A227',
  green: '#4CAF50',
  purple: '#9C27B0',
  orange: '#FF9800',
  pink: '#E91E63',
  red: '#F44336',
  teal: '#009688',
  blue: '#2196F3',
};

// Project location details
export const projectLocation = {
  name: 'Mahindra Blossom',
  tagline: 'Home of Positive Energy',
  address: 'Next to Hopefarm Channasandra Metro Station, Pattandur Agrahara Village, K R Puram 3 Hobli, Bangalore East Taluk',
  city: 'Whitefield, Bengaluru',
  state: 'Karnataka',
  pincode: '560066',
  area: 'Whitefield',
  reraNumber: 'PRM/KA/RERA/1251/446/PR/171225/008348',
  googleMapsUrl: 'https://maps.google.com/?q=12.9902,77.7506',
  coordinates: {
    lat: 12.9902,
    lng: 77.7506,
  },
};

// Location categories
export const locationCategories = [
  {
    id: 'it-parks',
    name: 'IT Parks',
    icon: 'mdi:office-building',
    color: LOCATION_COLORS.blue,
  },
  {
    id: 'metro',
    name: 'Metro Stations',
    icon: 'mdi:train',
    color: LOCATION_COLORS.orange,
  },
  {
    id: 'education',
    name: 'Schools & Colleges',
    icon: 'mdi:school-outline',
    color: LOCATION_COLORS.green,
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: 'mdi:hospital-box-outline',
    color: LOCATION_COLORS.red,
  },
  {
    id: 'shopping',
    name: 'Malls & Shopping',
    icon: 'mdi:shopping-outline',
    color: LOCATION_COLORS.purple,
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: 'mdi:bus',
    color: LOCATION_COLORS.teal,
  },
];

// Nearby landmarks with distances - Based on Mahindra Blossom PDF
export const nearbyLandmarks = [
  // IT Parks
  {
    id: 1,
    name: 'H M Tech Park',
    category: 'it-parks',
    distance: '1.7 km',
    distanceValue: 1.7,
    driveTime: '5 mins',
    icon: 'mdi:office-building',
    iconColor: LOCATION_COLORS.blue,
    featured: true,
  },
  {
    id: 2,
    name: 'G R Tech Park',
    category: 'it-parks',
    distance: '1.4 km',
    distanceValue: 1.4,
    driveTime: '4 mins',
    icon: 'mdi:office-building',
    iconColor: LOCATION_COLORS.blue,
    featured: true,
  },
  {
    id: 3,
    name: 'International Tech Park Bengaluru (ITPB)',
    category: 'it-parks',
    distance: '2.2 km',
    distanceValue: 2.2,
    driveTime: '6 mins',
    icon: 'mdi:office-building',
    iconColor: LOCATION_COLORS.blue,
    featured: true,
  },
  {
    id: 4,
    name: 'Sumadhura Capitol Towers',
    category: 'it-parks',
    distance: '800 m',
    distanceValue: 0.8,
    driveTime: '2 mins',
    icon: 'mdi:office-building',
    iconColor: LOCATION_COLORS.blue,
    featured: true,
  },
  {
    id: 5,
    name: 'Google Office',
    category: 'it-parks',
    distance: '800 m',
    distanceValue: 0.8,
    driveTime: '2 mins',
    icon: 'mdi:google',
    iconColor: LOCATION_COLORS.blue,
    featured: true,
  },

  // Metro Stations
  {
    id: 6,
    name: 'Hopefarm Channasandra Metro',
    category: 'metro',
    distance: '0 km (Adjacent)',
    distanceValue: 0,
    driveTime: 'Walk',
    icon: 'mdi:train',
    iconColor: LOCATION_COLORS.orange,
    featured: true,
    highlight: true,
  },
  {
    id: 7,
    name: 'Whitefield (Kadugodi) Metro',
    category: 'metro',
    distance: '1.2 km',
    distanceValue: 1.2,
    driveTime: '3 mins',
    icon: 'mdi:train',
    iconColor: LOCATION_COLORS.orange,
    featured: true,
  },
  {
    id: 8,
    name: 'Kadugodi Tree Park Metro',
    category: 'metro',
    distance: '1 km',
    distanceValue: 1,
    driveTime: '3 mins',
    icon: 'mdi:train',
    iconColor: LOCATION_COLORS.orange,
    featured: false,
  },
  {
    id: 9,
    name: 'Pattandur Agrahara Metro',
    category: 'metro',
    distance: '2.4 km',
    distanceValue: 2.4,
    driveTime: '6 mins',
    icon: 'mdi:train',
    iconColor: LOCATION_COLORS.orange,
    featured: false,
  },

  // Education
  {
    id: 10,
    name: 'Whitefield Global School',
    category: 'education',
    distance: '850 m',
    distanceValue: 0.85,
    driveTime: '3 mins',
    icon: 'mdi:school-outline',
    iconColor: LOCATION_COLORS.green,
    featured: true,
  },
  {
    id: 11,
    name: 'National Public School',
    category: 'education',
    distance: '3.6 km',
    distanceValue: 3.6,
    driveTime: '10 mins',
    icon: 'mdi:school-outline',
    iconColor: LOCATION_COLORS.green,
    featured: true,
  },
  {
    id: 12,
    name: 'MVJ College of Engineering',
    category: 'education',
    distance: '1.3 km',
    distanceValue: 1.3,
    driveTime: '4 mins',
    icon: 'mdi:school-outline',
    iconColor: LOCATION_COLORS.green,
    featured: true,
  },
  {
    id: 13,
    name: 'Jain University School of Allied Healthcare',
    category: 'education',
    distance: '2.8 km',
    distanceValue: 2.8,
    driveTime: '8 mins',
    icon: 'mdi:school-outline',
    iconColor: LOCATION_COLORS.green,
    featured: false,
  },

  // Healthcare
  {
    id: 14,
    name: 'Sri Sathya Sai Super Speciality Hospital',
    category: 'healthcare',
    distance: '3.7 km',
    distanceValue: 3.7,
    driveTime: '10 mins',
    icon: 'mdi:hospital-box-outline',
    iconColor: LOCATION_COLORS.red,
    featured: true,
  },
  {
    id: 15,
    name: 'Manipal Hospital',
    category: 'healthcare',
    distance: '4.1 km',
    distanceValue: 4.1,
    driveTime: '12 mins',
    icon: 'mdi:hospital-box-outline',
    iconColor: LOCATION_COLORS.red,
    featured: true,
  },

  // Shopping Malls
  {
    id: 16,
    name: 'Park Square Mall',
    category: 'shopping',
    distance: '2.1 km',
    distanceValue: 2.1,
    driveTime: '6 mins',
    icon: 'mdi:shopping-outline',
    iconColor: LOCATION_COLORS.purple,
    featured: true,
  },
  {
    id: 17,
    name: 'Nexus Shantiniketan',
    category: 'shopping',
    distance: '4.3 km',
    distanceValue: 4.3,
    driveTime: '12 mins',
    icon: 'mdi:shopping-outline',
    iconColor: LOCATION_COLORS.purple,
    featured: true,
  },
  {
    id: 18,
    name: 'Nexus Whitefield',
    category: 'shopping',
    distance: '3 km',
    distanceValue: 3,
    driveTime: '8 mins',
    icon: 'mdi:shopping-outline',
    iconColor: LOCATION_COLORS.purple,
    featured: true,
  },

  // Transport
  {
    id: 19,
    name: 'Whitefield Railway Station',
    category: 'transport',
    distance: '1.3 km',
    distanceValue: 1.3,
    driveTime: '4 mins',
    icon: 'mdi:train-variant',
    iconColor: LOCATION_COLORS.teal,
    featured: true,
  },
  {
    id: 20,
    name: 'Hopefarm Bus Stop',
    category: 'transport',
    distance: '400 m',
    distanceValue: 0.4,
    driveTime: '1 min',
    icon: 'mdi:bus',
    iconColor: LOCATION_COLORS.teal,
    featured: true,
  },
  {
    id: 21,
    name: 'Kempegowda International Airport',
    category: 'transport',
    distance: '34 km',
    distanceValue: 34,
    driveTime: '50 mins',
    icon: 'mdi:airplane',
    iconColor: LOCATION_COLORS.teal,
    featured: true,
  },
];

// Key connectivity highlights
export const connectivityHighlights = [
  {
    id: 1,
    title: 'Metro Adjacent',
    description: 'Abutting Hopefarm Channasandra Metro Station',
    icon: 'mdi:train',
    iconColor: LOCATION_COLORS.orange,
    highlight: true,
  },
  {
    id: 2,
    title: 'IT Corridor Access',
    description: 'ITPB, Google Office and major tech parks within 2 km',
    icon: 'mdi:office-building',
    iconColor: LOCATION_COLORS.blue,
    highlight: false,
  },
  {
    id: 3,
    title: 'Airport Link Coming',
    description: 'Upcoming Blue and Pink metro lines with airport link',
    icon: 'mdi:airplane',
    iconColor: LOCATION_COLORS.purple,
    highlight: false,
  },
  {
    id: 4,
    title: 'ORR Connectivity',
    description: 'Easy access to Outer Ring Road and major highways',
    icon: 'mdi:road',
    iconColor: LOCATION_COLORS.green,
    highlight: false,
  },
];

// Location advantages for display
export const locationAdvantages = [
  {
    id: 1,
    title: "Whitefield's IT Hub",
    description: 'Located at the heart of Bengaluru\'s IT pulse with major tech parks nearby',
    icon: 'mdi:map-marker-star',
    iconColor: LOCATION_COLORS.gold,
  },
  {
    id: 2,
    title: 'Metro at Doorstep',
    description: 'Adjacent to Hopefarm Channasandra Metro - walk to the station',
    icon: 'mdi:train',
    iconColor: LOCATION_COLORS.orange,
  },
  {
    id: 3,
    title: 'Future Ready',
    description: 'Upcoming Blue and Pink metro lines including airport link enhance connectivity',
    icon: 'mdi:trending-up',
    iconColor: LOCATION_COLORS.green,
  },
  {
    id: 4,
    title: 'Everything Nearby',
    description: 'Schools, hospitals, malls and restaurants all within minutes',
    icon: 'mdi:map-marker-radius',
    iconColor: LOCATION_COLORS.purple,
  },
];

// Road connectivity
export const roadConnectivity = [
  {
    id: 1,
    name: 'Whitefield-Hoskote Road',
    distance: '0 km',
    icon: 'mdi:road',
  },
  {
    id: 2,
    name: 'ITPL Main Road',
    distance: '0.5 km',
    icon: 'mdi:road',
  },
  {
    id: 3,
    name: 'Channasandra Main Road',
    distance: '350 m',
    icon: 'mdi:road',
  },
];

// Restaurants nearby
export const nearbyRestaurants = [
  {
    id: 1,
    name: 'Adyar Ananda Bhavan - A2B',
    distance: '450 m',
    driveTime: '2 mins',
  },
  {
    id: 2,
    name: 'Hard Rock Cafe',
    distance: '2.5 km',
    driveTime: '7 mins',
  },
  {
    id: 3,
    name: 'Pasta Street',
    distance: '3.8 km',
    driveTime: '10 mins',
  },
];

// Get landmarks by category
export const getLandmarksByCategory = (categoryId) => {
  return nearbyLandmarks.filter((landmark) => landmark.category === categoryId);
};

// Get featured landmarks
export const getFeaturedLandmarks = () => {
  return nearbyLandmarks.filter((landmark) => landmark.featured);
};

// Get highlighted landmarks (metro, etc.)
export const getHighlightedLandmarks = () => {
  return nearbyLandmarks.filter((landmark) => landmark.highlight);
};

export default {
  projectLocation,
  locationCategories,
  nearbyLandmarks,
  connectivityHighlights,
  locationAdvantages,
  roadConnectivity,
  nearbyRestaurants,
  getLandmarksByCategory,
  getFeaturedLandmarks,
  getHighlightedLandmarks,
  LOCATION_COLORS,
};
