/* ============================================
   Highlights Data - Mahindra Blossom
   Project highlights and key features
   ============================================ */

// Icon colors matching the design
export const HIGHLIGHT_COLORS = {
  gold: "#C9A227",
  green: "#4CAF50",
  purple: "#9C27B0",
  orange: "#FF9800",
  pink: "#E91E63",
  red: "#F44336",
  teal: "#009688",
  blue: "#2196F3",
};

// Main project highlights (shown in collapsed view) - Five Pillars from Mahindra Blossom
export const mainHighlights = [
  {
    id: 1,
    title: "Prime Location - Adjacent to Metro",
    shortTitle: "Metro Adjacent",
    description:
      "Abutting Hopefarm Channasandra metro station and close to major IT parks",
    icon: "mdi:train",
    iconColor: HIGHLIGHT_COLORS.orange,
    bgColor: "#FFF3E0",
    value: "0",
    unit: "km to Metro",
    lottieAnimation: "location",
  },
  {
    id: 2,
    title: "97,000 sq.ft Amenities & Clubhouse",
    shortTitle: "97,000 sq.ft",
    description:
      "World-class amenities including half-Olympic pool and 25+ seater business center",
    icon: "mdi:home-city-outline",
    iconColor: HIGHLIGHT_COLORS.gold,
    bgColor: "#FEF9E7",
    value: "97K",
    unit: "Sq.Ft.",
    lottieAnimation: "clubhouse",
  },
  {
    id: 3,
    title: "4 Acres of Landscaped Gardens",
    shortTitle: "4 Acres Gardens",
    description: "Bougainvillea canopies, aromatic plantations and butterfly park",
    icon: "mdi:flower-outline",
    iconColor: HIGHLIGHT_COLORS.pink,
    bgColor: "#FCE4EC",
    value: "4",
    unit: "Acres",
    lottieAnimation: "tree",
  },
  {
    id: 4,
    title: "IGBC & Net Zero Waste Certified",
    shortTitle: "IGBC Certified",
    description: "IGBC Green Homes pre-certified and IGBC Net Zero Waste certified",
    icon: "mdi:leaf-circle-outline",
    iconColor: HIGHLIGHT_COLORS.green,
    bgColor: "#E8F5E9",
    value: "100%",
    unit: "Green Certified",
    lottieAnimation: "nature",
  },
];

// Additional highlights (shown in expanded view)
export const additionalHighlights = [
  {
    id: 5,
    title: "7.8 Acres Development",
    shortTitle: "7.8 Acres",
    description: "Thoughtfully planned development in the heart of Whitefield",
    icon: "mdi:office-building-outline",
    iconColor: HIGHLIGHT_COLORS.gold,
    bgColor: "#FEF9E7",
    value: "7.8",
    unit: "Acres",
  },
  {
    id: 6,
    title: "Best-in-Class Design",
    shortTitle: "Premium Design",
    description: "Cross-ventilated spaces, abundant daylight, two decks and walk-in wardrobes",
    icon: "mdi:floor-plan",
    iconColor: HIGHLIGHT_COLORS.blue,
    bgColor: "#E3F2FD",
    value: "",
    unit: "",
  },
  {
    id: 7,
    title: "100% Vaastu Compliant",
    shortTitle: "Vaastu Compliant",
    description: "All homes designed with vaastu-compliant entrances and layouts",
    icon: "mdi:compass-outline",
    iconColor: HIGHLIGHT_COLORS.purple,
    bgColor: "#F3E5F5",
    value: "100%",
    unit: "Vaastu",
  },
  {
    id: 8,
    title: "20 ft. Long Balconies",
    shortTitle: "Long Balconies",
    description: "Spacious balconies and decks for outdoor living experience",
    icon: "mdi:panorama-horizontal-outline",
    iconColor: HIGHLIGHT_COLORS.teal,
    bgColor: "#E0F2F1",
    value: "20",
    unit: "Ft. Balcony",
  },
  {
    id: 9,
    title: "India's 1st Net Zero Energy Homes",
    shortTitle: "Net Zero Energy",
    description: "Mahindra launched India's first Net Zero Energy Homes in Bengaluru",
    icon: "mdi:lightning-bolt-outline",
    iconColor: HIGHLIGHT_COLORS.green,
    bgColor: "#E8F5E9",
    value: "1st",
    unit: "in India",
  },
];

// All highlights combined
export const allHighlights = [...mainHighlights, ...additionalHighlights];

// Overview section stats (cards at the top)
export const overviewStats = [
  {
    id: 1,
    value: "7.8",
    label: "Acres",
    description: "Development Area",
    icon: "mdi:office-building-outline",
    iconColor: HIGHLIGHT_COLORS.gold,
    bgColor: "#FEF9E7",
  },
  {
    id: 2,
    value: "4",
    label: "Acres Gardens",
    description: "Green Spaces",
    icon: "mdi:flower-outline",
    iconColor: HIGHLIGHT_COLORS.pink,
    bgColor: "#FCE4EC",
  },
  {
    id: 3,
    value: "1100+",
    label: "Families",
    description: "Mahindra Lifespaces Bengaluru",
    icon: "mdi:account-group-outline",
    iconColor: HIGHLIGHT_COLORS.purple,
    bgColor: "#F3E5F5",
  },
  {
    id: 4,
    value: "5th",
    label: "Project",
    description: "in Bengaluru",
    icon: "mdi:trophy-outline",
    iconColor: HIGHLIGHT_COLORS.orange,
    bgColor: "#FFF3E0",
  },
];

// Project key numbers for the highlights section
export const projectKeyNumbers = [
  {
    id: 1,
    value: 4,
    label: "Configuration Types",
    sublabel: "2 BHK to 4 BHK",
    color: HIGHLIGHT_COLORS.gold,
    bgGradient: "linear-gradient(135deg, #C9A227 0%, #E5C96E 100%)",
  },
  {
    id: 2,
    value: 6,
    label: "Wings",
    sublabel: "A to F",
    color: HIGHLIGHT_COLORS.gold,
    bgGradient: "linear-gradient(135deg, #C9A227 0%, #E5C96E 100%)",
  },
  {
    id: 3,
    value: "100%",
    label: "Vaastu Compliant",
    sublabel: "Traditional Values",
    color: HIGHLIGHT_COLORS.green,
    bgGradient: "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)",
  },
  {
    id: 4,
    value: "IGBC",
    label: "Certified",
    sublabel: "Green & Net Zero",
    color: HIGHLIGHT_COLORS.green,
    bgGradient: "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)",
  },
];

// Hero section quick stats (badges)
export const heroQuickStats = [
  {
    id: 1,
    icon: "mdi:check-decagram",
    text: "RERA Registered",
    variant: "badge",
  },
  {
    id: 2,
    icon: "mdi:leaf-circle",
    text: "IGBC Certified",
    variant: "badge",
  },
  {
    id: 3,
    icon: "mdi:recycle",
    text: "Net Zero Waste",
    variant: "badge",
  },
];

// Hero section feature cards
export const heroFeatureCards = [
  {
    id: 1,
    icon: "mdi:home-city-outline",
    title: "2, 3 & 4 BHK",
    subtitle: "Premium Apartments",
    iconColor: HIGHLIGHT_COLORS.gold,
  },
  {
    id: 2,
    icon: "mdi:map-marker-radius",
    title: "7.8 Acres",
    subtitle: "Development",
    iconColor: HIGHLIGHT_COLORS.gold,
  },
  {
    id: 3,
    icon: "mdi:view-grid-outline",
    title: "97,000 sq.ft",
    subtitle: "Amenities",
    iconColor: HIGHLIGHT_COLORS.gold,
  },
  {
    id: 4,
    icon: "mdi:train",
    title: "Metro Adjacent",
    subtitle: "Hopefarm Station",
    iconColor: HIGHLIGHT_COLORS.gold,
  },
];

// Quick info bullets for hero
export const heroQuickInfo = [
  "IGBC Green Certified",
  "Net Zero Waste",
  "Metro Adjacent",
];

// Why choose us points - Five Pillars
export const whyChooseUs = [
  {
    id: 1,
    title: "Prime Location",
    description:
      "Adjacent to Hopefarm Channasandra metro station and close to major IT parks",
    icon: "mdi:map-marker-check-outline",
    iconColor: HIGHLIGHT_COLORS.orange,
  },
  {
    id: 2,
    title: "Best-in-Class Design",
    description: "Cross-ventilated spaces, abundant daylight, two decks and walk-in wardrobes",
    icon: "mdi:floor-plan",
    iconColor: HIGHLIGHT_COLORS.blue,
  },
  {
    id: 3,
    title: "Vibrant Community",
    description: "97,000 sq.ft amenities including half-Olympic pool and business center",
    icon: "mdi:account-group-outline",
    iconColor: HIGHLIGHT_COLORS.purple,
  },
  {
    id: 4,
    title: "Expansive Greens",
    description: "4 acres of landscaped gardens with bougainvillea canopies and butterfly park",
    icon: "mdi:flower-outline",
    iconColor: HIGHLIGHT_COLORS.pink,
  },
  {
    id: 5,
    title: "Sustainable Living",
    description: "IGBC Green Homes pre-certified and IGBC Net Zero Waste certified",
    icon: "mdi:leaf-circle-outline",
    iconColor: HIGHLIGHT_COLORS.green,
  },
];

// Mahindra Lifespaces presence in Bengaluru
export const mahindraPresence = {
  totalSqft: "2.41M+ Sq.ft",
  happyFamilies: "1100+",
  projectNumber: "5th",
  uniqueAchievement: "India's 1st Net Zero Energy Homes in Bengaluru",
};

export default {
  mainHighlights,
  additionalHighlights,
  allHighlights,
  overviewStats,
  projectKeyNumbers,
  heroQuickStats,
  heroFeatureCards,
  heroQuickInfo,
  whyChooseUs,
  mahindraPresence,
  HIGHLIGHT_COLORS,
};
