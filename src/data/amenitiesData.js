/* ============================================
   Amenities Data - Nambiar District 25 Phase 2
   Complete amenities information
   ============================================ */

// Icon colors from the design
export const ICON_COLORS = {
  gold: "#C9A227",
  green: "#4CAF50",
  purple: "#9C27B0",
  orange: "#FF9800",
  pink: "#E91E63",
  red: "#F44336",
  teal: "#009688",
  blue: "#2196F3",
};

// Main amenities categories
export const amenitiesCategories = [
  {
    id: "wellness",
    title: "Wellness & Fitness",
    icon: "mdi:spa-outline",
  },
  {
    id: "sports",
    title: "Sports & Recreation",
    icon: "mdi:basketball",
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    icon: "mdi:glass-cocktail",
  },
  {
    id: "community",
    title: "Community Spaces",
    icon: "mdi:account-group-outline",
  },
];

// All amenities with details
export const amenitiesData = [
  // Wellness & Fitness
  {
    id: 1,
    name: "Olympic Swimming Pool",
    description:
      "Temperature-controlled Olympic-size swimming pool with dedicated lanes",
    category: "wellness",
    icon: "mdi:pool",
    iconColor: ICON_COLORS.blue,
    image: "https://placehold.co/400x300/2196F3/FFFFFF?text=Swimming+Pool",
    featured: true,
  },
  {
    id: 2,
    name: "Modern Gymnasium",
    description: "State-of-the-art fitness center with premium equipment",
    category: "wellness",
    icon: "mdi:dumbbell",
    iconColor: ICON_COLORS.orange,
    image: "https://placehold.co/400x300/FF9800/FFFFFF?text=Gymnasium",
    featured: true,
  },
  {
    id: 3,
    name: "Spa & Wellness Center",
    description: "Rejuvenating spa with sauna, steam room and massage therapy",
    category: "wellness",
    icon: "mdi:spa-outline",
    iconColor: ICON_COLORS.purple,
    image: "https://placehold.co/400x300/9C27B0/FFFFFF?text=Spa+Center",
    featured: true,
  },
  {
    id: 4,
    name: "Yoga & Meditation",
    description: "Serene spaces dedicated to yoga and meditation practices",
    category: "wellness",
    icon: "mdi:meditation",
    iconColor: ICON_COLORS.teal,
    image: "https://placehold.co/400x300/009688/FFFFFF?text=Yoga+Studio",
    featured: false,
  },
  {
    id: 5,
    name: "Jogging Track",
    description: "Scenic jogging and walking tracks through landscaped gardens",
    category: "wellness",
    icon: "mdi:run",
    iconColor: ICON_COLORS.green,
    image: "https://placehold.co/400x300/4CAF50/FFFFFF?text=Jogging+Track",
    featured: false,
  },

  // Sports & Recreation
  {
    id: 6,
    name: "Tennis Courts",
    description: "Professional tennis courts with flood lights for night play",
    category: "sports",
    icon: "mdi:tennis",
    iconColor: ICON_COLORS.gold,
    image: "https://placehold.co/400x300/C9A227/FFFFFF?text=Tennis+Courts",
    featured: true,
  },
  {
    id: 7,
    name: "Badminton Courts",
    description: "Indoor badminton courts with international specifications",
    category: "sports",
    icon: "mdi:badminton",
    iconColor: ICON_COLORS.green,
    image: "https://placehold.co/400x300/4CAF50/FFFFFF?text=Badminton+Courts",
    featured: true,
  },
  {
    id: 8,
    name: "Basketball Court",
    description: "Full-size outdoor basketball court",
    category: "sports",
    icon: "mdi:basketball",
    iconColor: ICON_COLORS.orange,
    image: "https://placehold.co/400x300/FF9800/FFFFFF?text=Basketball+Court",
    featured: false,
  },
  {
    id: 9,
    name: "Cricket Practice Nets",
    description: "Professional cricket nets for practice sessions",
    category: "sports",
    icon: "mdi:cricket",
    iconColor: ICON_COLORS.teal,
    image: "https://placehold.co/400x300/009688/FFFFFF?text=Cricket+Nets",
    featured: false,
  },
  {
    id: 10,
    name: "Squash Court",
    description: "International standard squash court",
    category: "sports",
    icon: "mdi:racquetball",
    iconColor: ICON_COLORS.purple,
    image: "https://placehold.co/400x300/9C27B0/FFFFFF?text=Squash+Court",
    featured: false,
  },
  {
    id: 11,
    name: "Table Tennis",
    description: "Indoor table tennis facility",
    category: "sports",
    icon: "mdi:table-tennis",
    iconColor: ICON_COLORS.red,
    image: "https://placehold.co/400x300/F44336/FFFFFF?text=Table+Tennis",
    featured: false,
  },

  // Lifestyle
  {
    id: 12,
    name: "Clubhouse",
    description: "7+ acres clubhouse with world-class amenities",
    category: "lifestyle",
    icon: "mdi:home-city-outline",
    iconColor: ICON_COLORS.gold,
    image: "https://placehold.co/800x500/C9A227/FFFFFF?text=Clubhouse+800x500",
    featured: true,
    isMainAmenity: true,
  },
  {
    id: 13,
    name: "Themed Gardens",
    description: "Beautifully landscaped themed gardens for relaxation",
    category: "lifestyle",
    icon: "mdi:flower-outline",
    iconColor: ICON_COLORS.green,
    image: "https://placehold.co/400x300/4CAF50/FFFFFF?text=Themed+Gardens",
    featured: true,
  },
  {
    id: 14,
    name: "Party Hall",
    description: "Elegant banquet and party hall for celebrations",
    category: "lifestyle",
    icon: "mdi:party-popper",
    iconColor: ICON_COLORS.pink,
    image: "https://placehold.co/400x300/E91E63/FFFFFF?text=Party+Hall",
    featured: true,
  },
  {
    id: 15,
    name: "Mini Theatre",
    description: "Private theatre with premium seating experience",
    category: "lifestyle",
    icon: "mdi:theater",
    iconColor: ICON_COLORS.purple,
    image: "https://placehold.co/400x300/9C27B0/FFFFFF?text=Mini+Theatre",
    featured: false,
  },
  {
    id: 16,
    name: "Cafe & Restaurant",
    description: "Multi-cuisine restaurant and cafe",
    category: "lifestyle",
    icon: "mdi:coffee-outline",
    iconColor: ICON_COLORS.orange,
    image: "https://placehold.co/400x300/FF9800/FFFFFF?text=Cafe",
    featured: false,
  },
  {
    id: 17,
    name: "Shopping Arcade",
    description: "Convenience stores and essential retail outlets",
    category: "lifestyle",
    icon: "mdi:shopping-outline",
    iconColor: ICON_COLORS.blue,
    image: "https://placehold.co/400x300/2196F3/FFFFFF?text=Shopping",
    featured: false,
  },

  // Community Spaces
  {
    id: 18,
    name: "Kids Play Area",
    description: "Safe and engaging play zones for children of all ages",
    category: "community",
    icon: "mdi:human-child",
    iconColor: ICON_COLORS.pink,
    image: "https://placehold.co/400x300/E91E63/FFFFFF?text=Kids+Play+Area",
    featured: true,
  },
  {
    id: 19,
    name: "Library & Study",
    description: "Well-stocked library with quiet study rooms",
    category: "community",
    icon: "mdi:library-outline",
    iconColor: ICON_COLORS.gold,
    image: "https://placehold.co/400x300/C9A227/FFFFFF?text=Library",
    featured: true,
  },
  {
    id: 20,
    name: "Amphitheatre",
    description: "Open-air amphitheatre for cultural events",
    category: "community",
    icon: "mdi:drama-masks",
    iconColor: ICON_COLORS.teal,
    image: "https://placehold.co/400x300/009688/FFFFFF?text=Amphitheatre",
    featured: true,
  },
  {
    id: 21,
    name: "Senior Citizen Corner",
    description: "Dedicated relaxation area for senior citizens",
    category: "community",
    icon: "mdi:account-heart-outline",
    iconColor: ICON_COLORS.purple,
    image: "https://placehold.co/400x300/9C27B0/FFFFFF?text=Senior+Corner",
    featured: false,
  },
  {
    id: 22,
    name: "Co-working Space",
    description: "Modern co-working facilities with high-speed internet",
    category: "community",
    icon: "mdi:desktop-mac",
    iconColor: ICON_COLORS.blue,
    image: "https://placehold.co/400x300/2196F3/FFFFFF?text=Co-working",
    featured: false,
  },
  {
    id: 23,
    name: "Community Hall",
    description: "Multi-purpose community gathering hall",
    category: "community",
    icon: "mdi:account-group-outline",
    iconColor: ICON_COLORS.orange,
    image: "https://placehold.co/400x300/FF9800/FFFFFF?text=Community+Hall",
    featured: false,
  },
];

// Overview stats for the amenities section
export const amenitiesStats = {
  clubhouseSize: "7+ acres",
  clubhouseAcres: "7.5 Acres",
  totalAmenities: "74+",
  sportsCategories: 15,
};

// Featured amenities for quick display
export const getFeaturedAmenities = () => {
  return amenitiesData.filter((amenity) => amenity.featured);
};

// Get amenities by category
export const getAmenitiesByCategory = (categoryId) => {
  return amenitiesData.filter((amenity) => amenity.category === categoryId);
};

// Get main clubhouse amenity
export const getMainAmenity = () => {
  return amenitiesData.find((amenity) => amenity.isMainAmenity);
};

export default {
  amenitiesCategories,
  amenitiesData,
  amenitiesStats,
  ICON_COLORS,
  getFeaturedAmenities,
  getAmenitiesByCategory,
  getMainAmenity,
};
