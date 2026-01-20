/* ============================================
   Configurations Data - Mahindra Blossom
   Apartment configurations and pricing
   ============================================ */

// All apartment configurations from the Mahindra Blossom project
export const configurationsData = [
  {
    id: 1,
    type: '2 BHK',
    shortName: '2 BHK',
    fullName: '2 BHK Comfort',
    sqft: 931,
    carpetArea: 837,
    balcony: 71,
    utility: 23,
    price: 0, // Price on Request
    priceDisplay: 'Price on Request',
    priceUnit: '',
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
    decks: 2,
    features: ['Vaastu Compliant', 'Cross Ventilation', 'Walk-in Wardrobe'],
    highlights: [
      'Cross-ventilated design',
      'Abundant natural daylight',
      'Two decks for outdoor living',
      'Walk-in wardrobe in master bedroom',
    ],
    floorPlanImage: 'https://placehold.co/800x600/0A1628/C9A227?text=2+BHK+Floor+Plan+(931+sqft)',
    isPopular: false,
    availability: 'available',
    wing: ['B', 'E'],
  },
  {
    id: 2,
    type: '3 BHK',
    shortName: '3 BHK',
    fullName: '3 BHK Premium',
    sqft: 1313,
    carpetArea: 1136,
    balcony: 116,
    verandah: 26,
    utility: 35,
    price: 0, // Price on Request
    priceDisplay: 'Price on Request',
    priceUnit: '',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    decks: 2,
    features: ['Vaastu Compliant', 'Cross Ventilation', 'Puja Space'],
    highlights: [
      'Expansive living & dining area (20\'7" x 15\'8")',
      'All bedrooms with attached bath',
      'Dedicated puja space',
      'Walk-in wardrobe',
    ],
    floorPlanImage: 'https://placehold.co/800x600/0A1628/C9A227?text=3+BHK+Floor+Plan+(1313+sqft)',
    isPopular: true,
    availability: 'available',
    wing: ['B', 'C', 'D', 'E'],
  },
  {
    id: 3,
    type: '3.5 BHK',
    shortName: '3.5 BHK',
    fullName: '3.5 BHK Executive',
    sqft: 1515,
    carpetArea: 1316,
    balcony: 134,
    verandah: 28,
    utility: 37,
    price: 0, // Price on Request
    priceDisplay: 'Price on Request',
    priceUnit: '',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    decks: 2,
    study: true,
    features: ['Vaastu Compliant', 'Study Room', 'Walk-in Wardrobe'],
    highlights: [
      'Dedicated study room (7\'2" x 11\'11")',
      'Living & dining (20\'9" x 16\'1")',
      '20 ft. long balcony/deck',
      'Premium walk-in closet',
    ],
    floorPlanImage: 'https://placehold.co/800x600/0A1628/C9A227?text=3.5+BHK+Floor+Plan+(1515+sqft)',
    isPopular: true,
    availability: 'available',
    wing: ['A', 'C', 'D', 'F'],
  },
  {
    id: 4,
    type: '4 BHK',
    shortName: '4 BHK',
    fullName: '4 BHK Luxury',
    sqft: 1689,
    carpetArea: 1488,
    balcony: 137,
    verandah: 28,
    utility: 36,
    price: 0, // Price on Request
    priceDisplay: 'Price on Request',
    priceUnit: '',
    bedrooms: 4,
    bathrooms: 4,
    balconies: 2,
    decks: 2,
    pujaSpace: true,
    features: ['Vaastu Compliant', 'Puja Space', 'Premium Finishes'],
    highlights: [
      'Grand living & dining area (20\'7" x 15\'11")',
      'Four spacious bedrooms with attached baths',
      'Dedicated puja space (4\'4" x 1\'11")',
      '20 ft. long balcony/deck',
    ],
    floorPlanImage: 'https://placehold.co/800x600/0A1628/C9A227?text=4+BHK+Floor+Plan+(1689+sqft)',
    isPopular: false,
    availability: 'available',
    wing: ['A', 'F'],
  },
];

// Configuration dropdown options for the select
export const configurationOptions = configurationsData.map((config) => ({
  id: config.id,
  value: config.id,
  label: `${config.type} - ${config.sqft} sq.ft (RERA Net Area)`,
  shortLabel: `${config.type} - ${config.sqft} sq.ft`,
  price: config.price,
  sqft: config.sqft,
}));

// Price range for the project
export const priceRange = {
  min: 0,
  max: 0,
  minDisplay: 'Price on Request',
  maxDisplay: 'Price on Request',
  startingFrom: 'Price on Request',
};

// Configuration types summary
export const configurationSummary = {
  totalTypes: 4,
  range: '2 BHK to 4 BHK',
  unitsPerFloor: 4,
  maxPrivacy: true,
  vaasuCompliant: true,
  igbcCertified: true,
  netZeroWaste: true,
};

// Project unique features
export const projectFeatures = {
  projectArea: '7.8 acres',
  amenitiesArea: '97,000 sq.ft',
  greenArea: '4 acres',
  wings: 6,
  reraNumber: 'PRM/KA/RERA/1251/446/PR/171225/008348',
  metroDistance: '0 km (Adjacent)',
};

// Get configuration by ID
export const getConfigurationById = (id) => {
  return configurationsData.find((config) => config.id === id);
};

// Get popular configurations
export const getPopularConfigurations = () => {
  return configurationsData.filter((config) => config.isPopular);
};

// Get configurations by type
export const getConfigurationsByType = (type) => {
  return configurationsData.filter((config) => config.type.includes(type));
};

// Format configuration for display
export const formatConfigurationDisplay = (config) => {
  return {
    ...config,
    priceFormatted: config.priceDisplay,
    sizeFormatted: `${config.sqft.toLocaleString()} sq.ft`,
    bedsFormatted: `${config.bedrooms} Beds`,
    bathsFormatted: `${config.bathrooms} Baths`,
  };
};

export default {
  configurationsData,
  configurationOptions,
  priceRange,
  configurationSummary,
  projectFeatures,
  getConfigurationById,
  getPopularConfigurations,
  getConfigurationsByType,
  formatConfigurationDisplay,
};
