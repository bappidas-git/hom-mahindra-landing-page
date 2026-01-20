/* ============================================
   Configurations Data - Nambiar District 25 Phase 2
   Apartment configurations and pricing
   ============================================ */

// All apartment configurations from the design
export const configurationsData = [
  {
    id: 1,
    type: '2 BHK',
    shortName: '2 BHK',
    fullName: '2 BHK Premium',
    sqft: 1245,
    price: 17000000, // 1.70 Cr in paise
    priceDisplay: '1.70',
    priceUnit: 'Cr',
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    features: ['Spacious Living', 'Modern Kitchen', 'Premium Finishes'],
    highlights: [
      'Cross ventilation design',
      'Modular kitchen ready',
      'Premium vitrified flooring',
      'Spacious bedrooms',
    ],
    floorPlanImage: 'https://placehold.co/800x600/0A1628/C9A227?text=2+BHK+Floor+Plan+800x600',
    isPopular: false,
    availability: 'available',
  },
  {
    id: 2,
    type: '3 BHK 2T',
    shortName: '3 BHK 2T',
    fullName: '3 BHK 2 Toilet',
    sqft: 1454,
    price: 21000000, // 2.10 Cr
    priceDisplay: '2.10',
    priceUnit: 'Cr',
    bedrooms: 3,
    bathrooms: 2,
    balconies: 2,
    features: ['Spacious Living', 'Modern Kitchen', 'Premium Finishes'],
    highlights: [
      'Optimal space utilization',
      'Large living area',
      'Attached bathrooms',
      'Ample storage space',
    ],
    floorPlanImage: 'https://placehold.co/800x600/0A1628/C9A227?text=3+BHK+2T+Floor+Plan+800x600',
    isPopular: false,
    availability: 'available',
  },
  {
    id: 3,
    type: '3 BHK',
    shortName: '3 BHK',
    fullName: '3 BHK Classic',
    sqft: 1695,
    price: 23000000, // 2.30 Cr
    priceDisplay: '2.30',
    priceUnit: 'Cr',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    features: ['Spacious Living', 'Modern Kitchen', 'Premium Finishes'],
    highlights: [
      'All bedrooms with attached bath',
      'Separate puja room',
      'Servant room available',
      'Premium fixtures',
    ],
    floorPlanImage: 'https://placehold.co/800x600/0A1628/C9A227?text=3+BHK+Floor+Plan+800x600',
    isPopular: true,
    availability: 'available',
  },
  {
    id: 4,
    type: '3 BHK',
    shortName: '3 BHK Large',
    fullName: '3 BHK Premium',
    sqft: 1900,
    price: 26000000, // 2.60 Cr
    priceDisplay: '2.60',
    priceUnit: 'Cr',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    features: ['Spacious Living', 'Modern Kitchen', 'Premium Finishes'],
    highlights: [
      'Master bedroom with walk-in closet',
      'Expansive living room',
      'Dry and wet balconies',
      'Italian marble flooring',
    ],
    floorPlanImage: 'https://placehold.co/800x600/0A1628/C9A227?text=3+BHK+Large+Floor+Plan+800x600',
    isPopular: true,
    availability: 'available',
  },
  {
    id: 5,
    type: '3 BHK',
    shortName: '3 BHK Deluxe',
    fullName: '3 BHK Deluxe',
    sqft: 2046,
    price: 28000000, // 2.80 Cr
    priceDisplay: '2.80',
    priceUnit: 'Cr',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 3,
    features: ['Spacious Living', 'Modern Kitchen', 'Premium Finishes'],
    highlights: [
      'Corner unit with extra windows',
      'Enhanced privacy',
      'Panoramic views',
      'Premium specifications',
    ],
    floorPlanImage: 'https://placehold.co/800x600/0A1628/C9A227?text=3+BHK+Deluxe+Floor+Plan+800x600',
    isPopular: false,
    availability: 'available',
  },
  {
    id: 6,
    type: '4 BHK',
    shortName: '4 BHK',
    fullName: '4 BHK Luxury',
    sqft: 2561,
    price: 35000000, // 3.50 Cr
    priceDisplay: '3.50',
    priceUnit: 'Cr',
    bedrooms: 4,
    bathrooms: 4,
    balconies: 3,
    features: ['Spacious Living', 'Modern Kitchen', 'Premium Finishes'],
    highlights: [
      'Grand living and dining',
      'Home office space',
      'Servant quarters',
      'Ultra-premium finishes',
    ],
    floorPlanImage: 'https://placehold.co/800x600/0A1628/C9A227?text=4+BHK+Floor+Plan+800x600',
    isPopular: false,
    availability: 'available',
  },
  {
    id: 7,
    type: '4.5 BHK',
    shortName: '4.5 BHK',
    fullName: '4.5 BHK Penthouse',
    sqft: 2990,
    price: 41100000, // 4.11 Cr
    priceDisplay: '4.11',
    priceUnit: 'Cr',
    bedrooms: 5,
    bathrooms: 5,
    balconies: 4,
    features: ['Spacious Living', 'Modern Kitchen', 'Premium Finishes'],
    highlights: [
      'Double height living room',
      'Private terrace',
      'Family lounge',
      'Exclusive penthouse lifestyle',
    ],
    floorPlanImage: 'https://placehold.co/800x600/0A1628/C9A227?text=4.5+BHK+Floor+Plan+800x600',
    isPopular: false,
    availability: 'limited',
  },
];

// Configuration dropdown options for the select
export const configurationOptions = configurationsData.map((config) => ({
  id: config.id,
  value: config.id,
  label: `${config.type} - ${config.sqft} sq.ft - ₹${config.priceDisplay} ${config.priceUnit}*`,
  shortLabel: `${config.type} - ${config.sqft} sq.ft`,
  price: config.price,
  sqft: config.sqft,
}));

// Price range for the project
export const priceRange = {
  min: 17000000, // 1.70 Cr
  max: 41100000, // 4.11 Cr
  minDisplay: '1.70 Cr',
  maxDisplay: '4.11 Cr',
  startingFrom: '1.24 Cr',
};

// Configuration types summary
export const configurationSummary = {
  totalTypes: 7,
  range: '2 BHK to 4.5 BHK',
  unitsPerFloor: 4,
  maxPrivacy: true,
  vaasuCompliant: true,
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
    priceFormatted: `₹${config.priceDisplay} ${config.priceUnit}*`,
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
  getConfigurationById,
  getPopularConfigurations,
  getConfigurationsByType,
  formatConfigurationDisplay,
};
