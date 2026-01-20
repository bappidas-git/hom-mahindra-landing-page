/* ============================================
   Location Data - Nambiar District 25 Phase 2
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
  name: 'Nambiar District 25 Phase 2',
  address: 'CD Road, Dommasandra, Off Sarjapur Road',
  city: 'Bengaluru',
  state: 'Karnataka',
  pincode: '562125',
  area: 'Sarjapur Road',
  googleMapsUrl: 'https://maps.google.com/?q=12.9099,77.7621',
  coordinates: {
    lat: 12.9099,
    lng: 77.7621,
  },
};

// Location categories
export const locationCategories = [
  {
    id: 'tech-parks',
    name: 'Tech Parks',
    icon: 'mdi:office-building',
    color: LOCATION_COLORS.blue,
  },
  {
    id: 'education',
    name: 'Education',
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
    name: 'Shopping',
    icon: 'mdi:shopping-outline',
    color: LOCATION_COLORS.purple,
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: 'mdi:train',
    color: LOCATION_COLORS.orange,
  },
];

// Nearby landmarks with distances
export const nearbyLandmarks = [
  // Tech Parks
  {
    id: 1,
    name: 'RGA Tech Park',
    category: 'tech-parks',
    distance: '7.33 km',
    distanceValue: 7.33,
    driveTime: '20 mins',
    icon: 'mdi:office-building',
    iconColor: LOCATION_COLORS.blue,
    featured: true,
  },
  {
    id: 2,
    name: 'Wipro Limited',
    category: 'tech-parks',
    distance: '4.8 km',
    distanceValue: 4.8,
    driveTime: '9 mins',
    icon: 'mdi:office-building',
    iconColor: LOCATION_COLORS.blue,
    featured: true,
  },
  {
    id: 3,
    name: 'RMZ Ecoworld',
    category: 'tech-parks',
    distance: '10.8 km',
    distanceValue: 10.8,
    driveTime: '29 mins',
    icon: 'mdi:office-building',
    iconColor: LOCATION_COLORS.blue,
    featured: true,
  },

  // Education
  {
    id: 4,
    name: 'Oakridge International School',
    category: 'education',
    distance: '1.48 km',
    distanceValue: 1.48,
    driveTime: '4 mins',
    icon: 'mdi:school-outline',
    iconColor: LOCATION_COLORS.green,
    featured: true,
  },
  {
    id: 5,
    name: 'One World International School',
    category: 'education',
    distance: '1.68 km',
    distanceValue: 1.68,
    driveTime: '6 mins',
    icon: 'mdi:school-outline',
    iconColor: LOCATION_COLORS.green,
    featured: true,
  },
  {
    id: 6,
    name: 'Delhi Public School',
    category: 'education',
    distance: '3.89 km',
    distanceValue: 3.89,
    driveTime: '10 mins',
    icon: 'mdi:school-outline',
    iconColor: LOCATION_COLORS.green,
    featured: true,
  },

  // Healthcare
  {
    id: 7,
    name: 'Sparsh Hospital',
    category: 'healthcare',
    distance: '6.3 km',
    distanceValue: 6.3,
    driveTime: '12 mins',
    icon: 'mdi:hospital-box-outline',
    iconColor: LOCATION_COLORS.red,
    featured: true,
  },
  {
    id: 8,
    name: 'Sakra World Hospital',
    category: 'healthcare',
    distance: '12 km',
    distanceValue: 12,
    driveTime: '33 mins',
    icon: 'mdi:hospital-box-outline',
    iconColor: LOCATION_COLORS.red,
    featured: true,
  },
  {
    id: 9,
    name: 'Manipal Hospital',
    category: 'healthcare',
    distance: '11 km',
    distanceValue: 11,
    driveTime: '26 mins',
    icon: 'mdi:hospital-box-outline',
    iconColor: LOCATION_COLORS.red,
    featured: true,
  },

  // Shopping
  {
    id: 10,
    name: 'Brigade Orion Mall',
    category: 'shopping',
    distance: '8.4 km',
    distanceValue: 8.4,
    driveTime: '20 mins',
    icon: 'mdi:shopping-outline',
    iconColor: LOCATION_COLORS.purple,
    featured: true,
  },
  {
    id: 11,
    name: 'Prestige City Mall',
    category: 'shopping',
    distance: '1.36 km',
    distanceValue: 1.36,
    driveTime: '4 mins',
    icon: 'mdi:shopping-outline',
    iconColor: LOCATION_COLORS.purple,
    featured: true,
  },
  {
    id: 12,
    name: 'Decathlon',
    category: 'shopping',
    distance: '6.2 km',
    distanceValue: 6.2,
    driveTime: '15 mins',
    icon: 'mdi:shopping-outline',
    iconColor: LOCATION_COLORS.purple,
    featured: true,
  },

  // Transport
  {
    id: 13,
    name: 'Upcoming Metro Station',
    category: 'transport',
    distance: '500 m',
    distanceValue: 0.5,
    driveTime: '2 mins',
    icon: 'mdi:train',
    iconColor: LOCATION_COLORS.orange,
    featured: true,
    highlight: true,
  },
  {
    id: 14,
    name: 'Kempegowda International Airport',
    category: 'transport',
    distance: '56 km',
    distanceValue: 56,
    driveTime: '1 hr 40 mins',
    icon: 'mdi:airplane',
    iconColor: LOCATION_COLORS.orange,
    featured: true,
  },
  {
    id: 15,
    name: 'Carmeleram Railway Station',
    category: 'transport',
    distance: '7.9 km',
    distanceValue: 7.9,
    driveTime: '16 mins',
    icon: 'mdi:train-variant',
    iconColor: LOCATION_COLORS.orange,
    featured: true,
  },
];

// Key connectivity highlights
export const connectivityHighlights = [
  {
    id: 1,
    title: '500m from Upcoming Metro',
    description: 'Direct metro connectivity for hassle-free commute',
    icon: 'mdi:train',
    iconColor: LOCATION_COLORS.orange,
    highlight: true,
  },
  {
    id: 2,
    title: '1 hr 40 mins to Airport',
    description: 'Access to Kempegowda International Airport',
    icon: 'mdi:airplane',
    iconColor: LOCATION_COLORS.blue,
    highlight: false,
  },
  {
    id: 3,
    title: 'IT Corridor Access',
    description: 'Close to major IT parks and business hubs',
    icon: 'mdi:office-building',
    iconColor: LOCATION_COLORS.purple,
    highlight: false,
  },
  {
    id: 4,
    title: 'ORR Connectivity',
    description: 'Excellent connectivity via Outer Ring Road',
    icon: 'mdi:road',
    iconColor: LOCATION_COLORS.green,
    highlight: false,
  },
];

// Location advantages for display
export const locationAdvantages = [
  {
    id: 1,
    title: "Bangalore's Most Promising Location",
    description: 'Strategically located in the rapidly developing Sarjapur Road corridor',
    icon: 'mdi:map-marker-star',
    iconColor: LOCATION_COLORS.gold,
  },
  {
    id: 2,
    title: 'Excellent Infrastructure',
    description: 'Well-developed roads, metro connectivity, and social infrastructure',
    icon: 'mdi:highway',
    iconColor: LOCATION_COLORS.blue,
  },
  {
    id: 3,
    title: 'Appreciating Property Values',
    description: 'Sarjapur Road witnesses consistent property value appreciation',
    icon: 'mdi:trending-up',
    iconColor: LOCATION_COLORS.green,
  },
  {
    id: 4,
    title: 'Employment Hub',
    description: 'Proximity to major tech parks ensures job opportunities nearby',
    icon: 'mdi:briefcase-outline',
    iconColor: LOCATION_COLORS.purple,
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
  getLandmarksByCategory,
  getFeaturedLandmarks,
  getHighlightedLandmarks,
  LOCATION_COLORS,
};
