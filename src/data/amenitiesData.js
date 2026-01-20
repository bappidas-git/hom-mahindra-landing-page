/* ============================================
   Amenities Data - Mahindra Blossom
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

// All amenities with details - Based on Mahindra Blossom brochure
export const amenitiesData = [
  // Wellness & Fitness
  {
    id: 1,
    name: "Half-Olympic Size Swimming Pool",
    description:
      "Temperature-controlled half-Olympic size swimming pool for fitness and relaxation",
    category: "wellness",
    icon: "mdi:pool",
    iconColor: ICON_COLORS.blue,
    image: "https://placehold.co/400x300/2196F3/FFFFFF?text=Half-Olympic+Swimming+Pool",
    featured: true,
  },
  {
    id: 2,
    name: "Gym with Steam Room",
    description: "State-of-the-art fitness center with premium equipment and steam room",
    category: "wellness",
    icon: "mdi:dumbbell",
    iconColor: ICON_COLORS.orange,
    image: "https://placehold.co/400x300/FF9800/FFFFFF?text=Gym+with+Steam+Room",
    featured: true,
  },
  {
    id: 3,
    name: "Yoga & Meditation Deck",
    description: "Serene outdoor deck dedicated to yoga and meditation practices",
    category: "wellness",
    icon: "mdi:meditation",
    iconColor: ICON_COLORS.teal,
    image: "https://placehold.co/400x300/009688/FFFFFF?text=Yoga+Meditation+Deck",
    featured: true,
  },
  {
    id: 4,
    name: "Dance & Aerobic Studio",
    description: "Dedicated studio space for dance, aerobics and group fitness activities",
    category: "wellness",
    icon: "mdi:human-female-dance",
    iconColor: ICON_COLORS.pink,
    image: "https://placehold.co/400x300/E91E63/FFFFFF?text=Dance+Aerobic+Studio",
    featured: false,
  },
  {
    id: 5,
    name: "2 Jogging Tracks",
    description: "Scenic jogging and walking tracks through landscaped gardens",
    category: "wellness",
    icon: "mdi:run",
    iconColor: ICON_COLORS.green,
    image: "https://placehold.co/400x300/4CAF50/FFFFFF?text=Jogging+Tracks",
    featured: true,
  },

  // Sports & Recreation
  {
    id: 6,
    name: "2 Indoor Badminton Courts",
    description: "Two indoor badminton courts with international specifications",
    category: "sports",
    icon: "mdi:badminton",
    iconColor: ICON_COLORS.green,
    image: "https://placehold.co/400x300/4CAF50/FFFFFF?text=Indoor+Badminton+Courts",
    featured: true,
  },
  {
    id: 7,
    name: "Squash Court",
    description: "International standard squash court for racquet sports enthusiasts",
    category: "sports",
    icon: "mdi:racquetball",
    iconColor: ICON_COLORS.purple,
    image: "https://placehold.co/400x300/9C27B0/FFFFFF?text=Squash+Court",
    featured: true,
  },
  {
    id: 8,
    name: "Cricket Nets",
    description: "Professional cricket practice nets for bowling and batting",
    category: "sports",
    icon: "mdi:cricket",
    iconColor: ICON_COLORS.teal,
    image: "https://placehold.co/400x300/009688/FFFFFF?text=Cricket+Nets",
    featured: false,
  },
  {
    id: 9,
    name: "Multi-Purpose Courts",
    description: "Versatile courts for basketball, volleyball and other sports",
    category: "sports",
    icon: "mdi:basketball",
    iconColor: ICON_COLORS.orange,
    image: "https://placehold.co/400x300/FF9800/FFFFFF?text=Multi-Purpose+Courts",
    featured: false,
  },
  {
    id: 10,
    name: "Games Room",
    description: "Indoor games room with table tennis, carrom, chess and more",
    category: "sports",
    icon: "mdi:gamepad-variant",
    iconColor: ICON_COLORS.red,
    image: "https://placehold.co/400x300/F44336/FFFFFF?text=Games+Room",
    featured: false,
  },

  // Lifestyle
  {
    id: 11,
    name: "Bougainvillea Canopies",
    description: "Life-size bougainvillea canopies creating stunning outdoor spaces",
    category: "lifestyle",
    icon: "mdi:flower-outline",
    iconColor: ICON_COLORS.pink,
    image: "https://placehold.co/800x500/E91E63/FFFFFF?text=Bougainvillea+Canopies+800x500",
    featured: true,
    isMainAmenity: true,
  },
  {
    id: 12,
    name: "Business Center",
    description: "25+ seater business center with high-speed internet and meeting rooms",
    category: "lifestyle",
    icon: "mdi:briefcase-outline",
    iconColor: ICON_COLORS.blue,
    image: "https://placehold.co/400x300/2196F3/FFFFFF?text=Business+Center+25+Seater",
    featured: true,
  },
  {
    id: 13,
    name: "Multi-Purpose Hall",
    description: "Elegant banquet and party hall for celebrations and events",
    category: "lifestyle",
    icon: "mdi:party-popper",
    iconColor: ICON_COLORS.gold,
    image: "https://placehold.co/400x300/C9A227/FFFFFF?text=Multi-Purpose+Hall",
    featured: true,
  },
  {
    id: 14,
    name: "4 Acres Landscaped Gardens",
    description: "Beautifully landscaped gardens with aromatic and native plantations",
    category: "lifestyle",
    icon: "mdi:nature-outline",
    iconColor: ICON_COLORS.green,
    image: "https://placehold.co/400x300/4CAF50/FFFFFF?text=Landscaped+Gardens+4+Acres",
    featured: true,
  },
  {
    id: 15,
    name: "Butterfly Park",
    description: "Dedicated butterfly park with native plants attracting butterflies",
    category: "lifestyle",
    icon: "mdi:butterfly-outline",
    iconColor: ICON_COLORS.purple,
    image: "https://placehold.co/400x300/9C27B0/FFFFFF?text=Butterfly+Park",
    featured: false,
  },
  {
    id: 16,
    name: "Pet Park",
    description: "Dedicated park area for pets and pet lovers",
    category: "lifestyle",
    icon: "mdi:dog",
    iconColor: ICON_COLORS.orange,
    image: "https://placehold.co/400x300/FF9800/FFFFFF?text=Pet+Park",
    featured: false,
  },

  // Community Spaces
  {
    id: 17,
    name: "Kid's Playroom",
    description: "Safe and engaging indoor play zones for children of all ages",
    category: "community",
    icon: "mdi:human-child",
    iconColor: ICON_COLORS.pink,
    image: "https://placehold.co/400x300/E91E63/FFFFFF?text=Kids+Playroom",
    featured: true,
  },
  {
    id: 18,
    name: "Amphitheatre",
    description: "Open-air amphitheatre for cultural events and community gatherings",
    category: "community",
    icon: "mdi:drama-masks",
    iconColor: ICON_COLORS.teal,
    image: "https://placehold.co/400x300/009688/FFFFFF?text=Amphitheatre",
    featured: true,
  },
  {
    id: 19,
    name: "Senior Citizen Corner",
    description: "Dedicated relaxation area designed for senior citizens",
    category: "community",
    icon: "mdi:account-heart-outline",
    iconColor: ICON_COLORS.purple,
    image: "https://placehold.co/400x300/9C27B0/FFFFFF?text=Senior+Citizen+Corner",
    featured: false,
  },
  {
    id: 20,
    name: "Children's Play Area",
    description: "Outdoor play equipment and safe play zones for children",
    category: "community",
    icon: "mdi:teddy-bear",
    iconColor: ICON_COLORS.orange,
    image: "https://placehold.co/400x300/FF9800/FFFFFF?text=Childrens+Play+Area",
    featured: false,
  },
];

// Overview stats for the amenities section
export const amenitiesStats = {
  clubhouseSize: "97,000 sq.ft",
  totalAmenities: "20+",
  sportsCategories: 10,
  greenArea: "4 acres",
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
