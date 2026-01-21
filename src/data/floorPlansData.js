/* ============================================
   Floor Plans Data - Mahindra Blossom
   Floor plan layouts and specifications
   ============================================ */

// Floor plan images
import floorPlan2BHK from '../assets/images/floor-plans/2BHK.jpg';
import floorPlan3BHK from '../assets/images/floor-plans/3BHK.jpg';
import floorPlan35BHK from '../assets/images/floor-plans/3.5BHK.jpg';
import floorPlan4BHK from '../assets/images/floor-plans/4BHK.jpg';

// Floor plan features common to all units
export const commonFeatures = [
  'Vaastu-compliant designs',
  'Cross ventilation',
  'Abundant natural daylight',
  'Two decks/balconies',
  'Walk-in wardrobes',
  'Premium specifications',
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
    icon: 'mdi:weather-windy',
    text: 'Cross ventilation',
    color: '#2196F3',
  },
  {
    id: 3,
    icon: 'mdi:white-balance-sunny',
    text: 'Abundant daylight',
    color: '#FF9800',
  },
  {
    id: 4,
    icon: 'mdi:balcony',
    text: '20 ft. long balconies',
    color: '#C9A227',
  },
];

// All floor plans with detailed specifications - Based on Mahindra Blossom PDF
export const floorPlansData = [
  {
    id: 1,
    type: '2 BHK',
    name: '2 BHK Comfort',
    sqft: 931,
    sqftRange: '931 sq.ft (RERA Net)',
    price: 'Price on Request',
    priceValue: 0,
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
    decks: 2,
    image: floorPlan2BHK,
    thumbnailImage: floorPlan2BHK,
    description: 'Thoughtfully designed 2 BHK with cross ventilation and walk-in wardrobe',
    carpetArea: '837 sq.ft',
    balconyArea: '71 sq.ft',
    utilityArea: '23 sq.ft',
    reraNetArea: '931 sq.ft',
    facing: ['East', 'West'],
    specifications: {
      living: '9\'11" x 14\'3"',
      dining: '10\'6" x 9\'11"',
      masterBedroom: '9\'11" x 11\'7"',
      bedroom2: '9\'11" x 10\'1"',
      kitchen: '8\'9" x 9\'8"',
      deck1: '9\'11" x 3\'9"',
      deck2: '9\'11" x 3\'9"',
    },
    features: [
      'Cross-ventilated design',
      'Walk-in wardrobe (7\'0" x 8\'6")',
      'Two decks for outdoor living',
      'Spacious kitchen with utility',
      'Two attached bathrooms',
      'Foyer entrance (5\'3" x 10\'2")',
    ],
    unitFeatures: [
      { icon: 'mdi:sofa-outline', label: 'Living', value: '9\'11" x 14\'3"' },
      { icon: 'mdi:bed-outline', label: 'Master Bedroom', value: '9\'11" x 11\'7"' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 2', value: '9\'11" x 10\'1"' },
      { icon: 'mdi:silverware-fork-knife', label: 'Kitchen', value: '8\'9" x 9\'8"' },
    ],
    isAvailable: true,
    wings: ['B', 'E'],
    floors: '1-20',
  },
  {
    id: 2,
    type: '3 BHK',
    name: '3 BHK Premium',
    sqft: 1313,
    sqftRange: '1313 sq.ft (RERA Net)',
    price: 'Price on Request',
    priceValue: 0,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    decks: 2,
    image: floorPlan3BHK,
    thumbnailImage: floorPlan3BHK,
    description: 'Spacious 3 BHK with puja space and all bedrooms having attached bathrooms',
    carpetArea: '1136 sq.ft',
    balconyArea: '116 sq.ft',
    verandahArea: '26 sq.ft',
    utilityArea: '35 sq.ft',
    reraNetArea: '1313 sq.ft',
    facing: ['East', 'West', 'North', 'South'],
    specifications: {
      livingDining: '20\'7" x 15\'8"',
      masterBedroom: '10\'11" x 14\'',
      bedroom2: '9\'11" x 11\'5"',
      bedroom3: '9\'11" x 14\'1"',
      kitchen: '8\' x 10\'3"',
      pujaSpace: '3\'2" x 1\'11"',
      deck1: '10\'11" x 2\'9"',
      deck2: '20\'7" x 4\'6"',
    },
    features: [
      'Expansive living & dining area',
      'Dedicated puja space',
      'Walk-in wardrobe',
      'All bedrooms with attached bath',
      '20 ft. long balcony/deck',
      'Utility area with provision',
    ],
    unitFeatures: [
      { icon: 'mdi:sofa-outline', label: 'Living & Dining', value: '20\'7" x 15\'8"' },
      { icon: 'mdi:bed-outline', label: 'Master Bedroom', value: '10\'11" x 14\'' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 2', value: '9\'11" x 11\'5"' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 3', value: '9\'11" x 14\'1"' },
    ],
    isAvailable: true,
    isPopular: true,
    wings: ['B', 'C', 'D', 'E'],
    floors: '1-20',
  },
  {
    id: 3,
    type: '3.5 BHK',
    name: '3.5 BHK Executive',
    sqft: 1515,
    sqftRange: '1515 sq.ft (RERA Net)',
    price: 'Price on Request',
    priceValue: 0,
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    decks: 2,
    study: true,
    image: floorPlan35BHK,
    thumbnailImage: floorPlan35BHK,
    description: '3.5 BHK with dedicated study room and premium walk-in closet',
    carpetArea: '1316 sq.ft',
    balconyArea: '134 sq.ft',
    verandahArea: '28 sq.ft',
    utilityArea: '37 sq.ft',
    reraNetArea: '1515 sq.ft',
    facing: ['East', 'West', 'North'],
    specifications: {
      livingDining: '20\'9" x 16\'1"',
      masterBedroom: '10\'10" x 15\'10"',
      bedroom2: '9\'10" x 11\'6"',
      bedroom3: '9\'11" x 12\'9"',
      study: '7\'2" x 11\'11"',
      kitchen: '8\'9" x 10\'7"',
      pujaSpace: '2\'8" x 1\'8"',
      deck1: '20\'6" x 4\'5"',
      deck2: '10\'11" x 4\'6"',
    },
    features: [
      'Dedicated study room',
      'Living & dining (20\'9" x 16\'1")',
      'Premium walk-in wardrobe (10\'10" x 5\'3")',
      '20 ft. long balcony/deck',
      'Puja space provision',
      'Spacious utility area',
    ],
    unitFeatures: [
      { icon: 'mdi:sofa-outline', label: 'Living & Dining', value: '20\'9" x 16\'1"' },
      { icon: 'mdi:bed-outline', label: 'Master Bedroom', value: '10\'10" x 15\'10"' },
      { icon: 'mdi:desk', label: 'Study', value: '7\'2" x 11\'11"' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 2', value: '9\'10" x 11\'6"' },
    ],
    isAvailable: true,
    isPopular: true,
    wings: ['A', 'C', 'D', 'F'],
    floors: '1-20',
  },
  {
    id: 4,
    type: '4 BHK',
    name: '4 BHK Luxury',
    sqft: 1689,
    sqftRange: '1689 sq.ft (RERA Net)',
    price: 'Price on Request',
    priceValue: 0,
    bedrooms: 4,
    bathrooms: 4,
    balconies: 2,
    decks: 2,
    pujaSpace: true,
    image: floorPlan4BHK,
    thumbnailImage: floorPlan4BHK,
    description: 'Luxurious 4 BHK with grand living spaces, puja room and walk-in wardrobes',
    carpetArea: '1488 sq.ft',
    balconyArea: '137 sq.ft',
    verandahArea: '28 sq.ft',
    utilityArea: '36 sq.ft',
    reraNetArea: '1689 sq.ft',
    facing: ['East', 'West'],
    specifications: {
      livingDining: '20\'7" x 15\'11"',
      masterBedroom: '11\' x 16\'11"',
      bedroom2: '9\'10" x 11\'4"',
      bedroom3: '10\'5" x 11\'9"',
      bedroom4: '9\'11" x 12\'6"',
      kitchen: '10\'10" x 10\'7"',
      pujaSpace: '4\'4" x 1\'11"',
      deck1: '11\' x 4\'5"',
      deck2: '20\'1" x 4\'5"',
    },
    features: [
      'Grand living & dining area',
      'Four bedrooms with attached baths',
      'Dedicated puja space (4\'4" x 1\'11")',
      'Walk-in wardrobe (8\'11" x 5\'3")',
      '20 ft. long balcony/deck',
      'Spacious kitchen with utility',
    ],
    unitFeatures: [
      { icon: 'mdi:sofa-outline', label: 'Living & Dining', value: '20\'7" x 15\'11"' },
      { icon: 'mdi:bed-outline', label: 'Master Bedroom', value: '11\' x 16\'11"' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 2', value: '9\'10" x 11\'4"' },
      { icon: 'mdi:bed-outline', label: 'Bedroom 3', value: '10\'5" x 11\'9"' },
    ],
    isAvailable: true,
    isLimited: false,
    wings: ['A', 'F'],
    floors: '1-20',
  },
];

// Floor plan filter options
export const floorPlanFilters = [
  { id: 'all', label: 'All Types', value: 'all' },
  { id: '2bhk', label: '2 BHK', value: '2 BHK' },
  { id: '3bhk', label: '3 BHK', value: '3 BHK' },
  { id: '3.5bhk', label: '3.5 BHK', value: '3.5 BHK' },
  { id: '4bhk', label: '4 BHK', value: '4 BHK' },
];

// Wing information
export const wingInfo = [
  { id: 'A', name: 'Wing A', units: ['4 BHK', '3.5 BHK'] },
  { id: 'B', name: 'Wing B', units: ['2 BHK', '1 BHK', '3 BHK'] },
  { id: 'C', name: 'Wing C', units: ['3 BHK', '3.5 BHK'] },
  { id: 'D', name: 'Wing D', units: ['3 BHK', '3.5 BHK'] },
  { id: 'E', name: 'Wing E', units: ['3 BHK', '2 BHK'] },
  { id: 'F', name: 'Wing F', units: ['3.5 BHK', '4 BHK'] },
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
  wingInfo,
  getFloorPlanById,
  getFloorPlansByType,
  getPopularFloorPlans,
  getAvailableFloorPlans,
};
