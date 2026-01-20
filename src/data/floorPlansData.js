/* ============================================
   Floor Plans Data - Nambiar District 25 Phase 2
   Floor plan layouts and specifications
   ============================================ */

// Import floor plan images
import floorPlan2BHK1245 from '../assets/images/floor-plans/2BHK-1245-squre-feet.jpg';
import floorPlan3BHK1454 from '../assets/images/floor-plans/3BHK-1454-squre-feet.jpg';
import floorPlan3BHK1695 from '../assets/images/floor-plans/3BHK-1695-squre-feet.jpg';
import floorPlan3BHK2046 from '../assets/images/floor-plans/3BHK-2046-squre-feet.jpg';
import floorPlan4BHK2561 from '../assets/images/floor-plans/4BHK-2561-squre-feet.jpg';
import floorPlan4BHK2990 from '../assets/images/floor-plans/4BHK-2990-squre-feet.jpg';

// Floor plan features common to all units
export const commonFeatures = [
  'Vaastu-compliant designs',
  'Efficient space planning',
  'Maximum natural light',
  'Premium specifications',
  'Cross ventilation',
  'Spacious balconies',
];

// Floor plan highlights
export const floorPlanHighlights = [
  {
    id: 1,
    icon: 'mdi:compass-outline',
    text: 'Vaastu-compliant designs',
    color: '#4CAF50',
  },
  {
    id: 2,
    icon: 'mdi:floor-plan',
    text: 'Efficient space planning',
    color: '#2196F3',
  },
  {
    id: 3,
    icon: 'mdi:white-balance-sunny',
    text: 'Maximum natural light',
    color: '#FF9800',
  },
  {
    id: 4,
    icon: 'mdi:star-outline',
    text: 'Premium specifications',
    color: '#C9A227',
  },
];

// All floor plans with detailed specifications
export const floorPlansData = [
  {
    id: 1,
    type: '2 BHK',
    name: '2 BHK Premium',
    sqft: 1245,
    sqftRange: '1245 sq.ft',
    price: '1.70 Cr',
    priceValue: 17000000,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    image: floorPlan2BHK1245,
    thumbnailImage: floorPlan2BHK1245,
    description: 'Thoughtfully designed 2 BHK apartment with optimal space utilization',
    carpetArea: '1050 sq.ft',
    builtUpArea: '1245 sq.ft',
    superBuiltUpArea: '1425 sq.ft',
    facing: ['East', 'West', 'North', 'South'],
    specifications: {
      living: '15\' x 12\'',
      masterBedroom: '14\' x 12\'',
      bedroom2: '12\' x 10\'',
      kitchen: '10\' x 8\'',
      balcony: '10\' x 4\'',
    },
    features: [
      'Cross ventilation design',
      'Modular kitchen provision',
      'Premium vitrified flooring',
      'Spacious bedrooms',
      'Attached bathrooms',
      'Utility area',
    ],
    unitFeatures: [
      { icon: 'mdi:sofa-outline', label: 'Living Room', value: '180 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Master Bedroom', value: '168 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 2', value: '120 sq.ft' },
      { icon: 'mdi:silverware-fork-knife', label: 'Kitchen', value: '80 sq.ft' },
    ],
    isAvailable: true,
    towers: ['A', 'B', 'C', 'D'],
    floors: '2-25',
  },
  {
    id: 2,
    type: '3 BHK 2T',
    name: '3 BHK 2 Toilet',
    sqft: 1454,
    sqftRange: '1454 sq.ft',
    price: '2.10 Cr',
    priceValue: 21000000,
    bedrooms: 3,
    bathrooms: 2,
    balconies: 2,
    image: floorPlan3BHK1454,
    thumbnailImage: floorPlan3BHK1454,
    description: 'Compact 3 BHK layout with smart space utilization',
    carpetArea: '1220 sq.ft',
    builtUpArea: '1454 sq.ft',
    superBuiltUpArea: '1665 sq.ft',
    facing: ['East', 'West', 'North'],
    specifications: {
      living: '16\' x 13\'',
      masterBedroom: '14\' x 12\'',
      bedroom2: '12\' x 11\'',
      bedroom3: '11\' x 10\'',
      kitchen: '11\' x 8\'',
      balcony1: '10\' x 4\'',
      balcony2: '8\' x 4\'',
    },
    features: [
      'Optimal space utilization',
      'Large living area',
      'Attached master bathroom',
      'Ample storage space',
      'Dry and wet balconies',
      'Servant toilet',
    ],
    unitFeatures: [
      { icon: 'mdi:sofa-outline', label: 'Living Room', value: '208 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Master Bedroom', value: '168 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 2', value: '132 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 3', value: '110 sq.ft' },
    ],
    isAvailable: true,
    towers: ['A', 'B', 'C'],
    floors: '2-25',
  },
  {
    id: 3,
    type: '3 BHK',
    name: '3 BHK Classic',
    sqft: 1695,
    sqftRange: '1695 sq.ft',
    price: '2.30 Cr',
    priceValue: 23000000,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    image: floorPlan3BHK1695,
    thumbnailImage: floorPlan3BHK1695,
    description: 'Spacious 3 BHK with all bedrooms having attached bathrooms',
    carpetArea: '1420 sq.ft',
    builtUpArea: '1695 sq.ft',
    superBuiltUpArea: '1940 sq.ft',
    facing: ['East', 'West', 'North', 'South'],
    specifications: {
      living: '18\' x 14\'',
      masterBedroom: '15\' x 13\'',
      bedroom2: '13\' x 11\'',
      bedroom3: '12\' x 11\'',
      kitchen: '12\' x 9\'',
      balcony1: '12\' x 4\'',
      balcony2: '8\' x 4\'',
    },
    features: [
      'All bedrooms with attached bath',
      'Separate puja room provision',
      'Servant room available',
      'Premium fixtures',
      'Large balconies',
      'Utility area with wash basin',
    ],
    unitFeatures: [
      { icon: 'mdi:sofa-outline', label: 'Living Room', value: '252 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Master Bedroom', value: '195 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 2', value: '143 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 3', value: '132 sq.ft' },
    ],
    isAvailable: true,
    isPopular: true,
    towers: ['A', 'B', 'C', 'D'],
    floors: '2-25',
  },
  {
    id: 4,
    type: '3 BHK',
    name: '3 BHK Premium',
    sqft: 1900,
    sqftRange: '1900 sq.ft',
    price: '2.60 Cr',
    priceValue: 26000000,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    image: floorPlan3BHK2046,
    thumbnailImage: floorPlan3BHK2046,
    description: 'Premium 3 BHK with master suite and walk-in closet',
    carpetArea: '1595 sq.ft',
    builtUpArea: '1900 sq.ft',
    superBuiltUpArea: '2175 sq.ft',
    facing: ['East', 'West', 'North', 'South'],
    specifications: {
      living: '20\' x 15\'',
      masterBedroom: '16\' x 14\'',
      bedroom2: '14\' x 12\'',
      bedroom3: '13\' x 11\'',
      kitchen: '13\' x 9\'',
      balcony1: '14\' x 5\'',
      balcony2: '10\' x 4\'',
    },
    features: [
      'Master bedroom with walk-in closet',
      'Expansive living room',
      'Dry and wet balconies',
      'Italian marble flooring',
      'Separate dining area',
      'Premium bathroom fittings',
    ],
    unitFeatures: [
      { icon: 'mdi:sofa-outline', label: 'Living Room', value: '300 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Master Bedroom', value: '224 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 2', value: '168 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 3', value: '143 sq.ft' },
    ],
    isAvailable: true,
    isPopular: true,
    towers: ['B', 'C', 'D'],
    floors: '2-25',
  },
  {
    id: 5,
    type: '3 BHK',
    name: '3 BHK Deluxe',
    sqft: 2046,
    sqftRange: '2046 sq.ft',
    price: '2.80 Cr',
    priceValue: 28000000,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 3,
    image: floorPlan3BHK2046,
    thumbnailImage: floorPlan3BHK2046,
    description: 'Corner unit deluxe 3 BHK with panoramic views',
    carpetArea: '1718 sq.ft',
    builtUpArea: '2046 sq.ft',
    superBuiltUpArea: '2340 sq.ft',
    facing: ['East', 'West'],
    specifications: {
      living: '22\' x 15\'',
      masterBedroom: '17\' x 14\'',
      bedroom2: '15\' x 12\'',
      bedroom3: '14\' x 11\'',
      kitchen: '14\' x 10\'',
      balcony1: '15\' x 5\'',
      balcony2: '12\' x 4\'',
      balcony3: '8\' x 4\'',
    },
    features: [
      'Corner unit with extra windows',
      'Enhanced privacy',
      'Panoramic views',
      'Premium specifications',
      'Wrap-around balcony',
      'Study room provision',
    ],
    unitFeatures: [
      { icon: 'mdi:sofa-outline', label: 'Living Room', value: '330 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Master Bedroom', value: '238 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 2', value: '180 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 3', value: '154 sq.ft' },
    ],
    isAvailable: true,
    towers: ['A', 'D'],
    floors: '5-25',
  },
  {
    id: 6,
    type: '4 BHK',
    name: '4 BHK Luxury',
    sqft: 2561,
    sqftRange: '2561 sq.ft',
    price: '3.50 Cr',
    priceValue: 35000000,
    bedrooms: 4,
    bathrooms: 4,
    balconies: 3,
    image: floorPlan4BHK2561,
    thumbnailImage: floorPlan4BHK2561,
    description: 'Luxurious 4 BHK with grand living spaces and servant quarters',
    carpetArea: '2150 sq.ft',
    builtUpArea: '2561 sq.ft',
    superBuiltUpArea: '2930 sq.ft',
    facing: ['East', 'West', 'North'],
    specifications: {
      living: '25\' x 16\'',
      masterBedroom: '18\' x 15\'',
      bedroom2: '15\' x 13\'',
      bedroom3: '14\' x 12\'',
      bedroom4: '13\' x 11\'',
      kitchen: '15\' x 10\'',
      balcony1: '16\' x 5\'',
      balcony2: '14\' x 4\'',
      balcony3: '10\' x 4\'',
    },
    features: [
      'Grand living and dining',
      'Home office space',
      'Servant quarters with toilet',
      'Ultra-premium finishes',
      'Large family lounge',
      'Separate puja room',
    ],
    unitFeatures: [
      { icon: 'mdi:sofa-outline', label: 'Living Room', value: '400 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Master Bedroom', value: '270 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 2', value: '195 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 3', value: '168 sq.ft' },
    ],
    isAvailable: true,
    towers: ['B', 'C'],
    floors: '5-25',
  },
  {
    id: 7,
    type: '4.5 BHK',
    name: '4.5 BHK Penthouse',
    sqft: 2990,
    sqftRange: '2990 sq.ft',
    price: '4.11 Cr',
    priceValue: 41100000,
    bedrooms: 5,
    bathrooms: 5,
    balconies: 4,
    image: floorPlan4BHK2990,
    thumbnailImage: floorPlan4BHK2990,
    description: 'Exclusive penthouse with double height living and private terrace',
    carpetArea: '2510 sq.ft',
    builtUpArea: '2990 sq.ft',
    superBuiltUpArea: '3420 sq.ft',
    facing: ['East', 'West'],
    specifications: {
      living: '28\' x 18\'',
      masterBedroom: '20\' x 16\'',
      bedroom2: '16\' x 14\'',
      bedroom3: '15\' x 13\'',
      bedroom4: '14\' x 12\'',
      bedroom5: '13\' x 11\'',
      kitchen: '16\' x 11\'',
      balcony1: '20\' x 6\'',
      balcony2: '16\' x 5\'',
      balcony3: '12\' x 4\'',
      balcony4: '10\' x 4\'',
      terrace: '200 sq.ft',
    },
    features: [
      'Double height living room',
      'Private terrace',
      'Family lounge',
      'Exclusive penthouse lifestyle',
      'Panoramic city views',
      'Premium smart home ready',
    ],
    unitFeatures: [
      { icon: 'mdi:sofa-outline', label: 'Living Room', value: '504 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Master Bedroom', value: '320 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 2', value: '224 sq.ft' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 3', value: '195 sq.ft' },
    ],
    isAvailable: true,
    isLimited: true,
    towers: ['A'],
    floors: '24-25',
  },
];

// Floor plan filter options
export const floorPlanFilters = [
  { id: 'all', label: 'All Types', value: 'all' },
  { id: '2bhk', label: '2 BHK', value: '2 BHK' },
  { id: '3bhk', label: '3 BHK', value: '3 BHK' },
  { id: '4bhk', label: '4 BHK', value: '4 BHK' },
  { id: '4.5bhk', label: '4.5 BHK', value: '4.5 BHK' },
];

// Get floor plan by ID
export const getFloorPlanById = (id) => {
  return floorPlansData.find((plan) => plan.id === id);
};

// Get floor plans by type
export const getFloorPlansByType = (type) => {
  if (type === 'all') return floorPlansData;
  return floorPlansData.filter((plan) => plan.type.includes(type));
};

// Get popular floor plans
export const getPopularFloorPlans = () => {
  return floorPlansData.filter((plan) => plan.isPopular);
};

// Get available floor plans
export const getAvailableFloorPlans = () => {
  return floorPlansData.filter((plan) => plan.isAvailable);
};

export default {
  floorPlansData,
  floorPlanFilters,
  floorPlanHighlights,
  commonFeatures,
  getFloorPlanById,
  getFloorPlansByType,
  getPopularFloorPlans,
  getAvailableFloorPlans,
};
