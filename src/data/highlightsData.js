/* ============================================
   Highlights Data - Nambiar District 25 Phase 2
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

// Main project highlights (shown in collapsed view)
export const mainHighlights = [
  {
    id: 1,
    title: "100 Acres of Integrated Township",
    shortTitle: "100 Acres",
    description:
      "Sprawling integrated township with world-class infrastructure",
    icon: "mdi:office-building-outline",
    iconColor: HIGHLIGHT_COLORS.gold,
    bgColor: "#FEF9E7",
    value: "100",
    unit: "Acres",
    lottieAnimation: "building",
  },
  {
    id: 2,
    title: "7+ acres Clubhouse spread over 2.5 Lakhs Sq.Ft.",
    shortTitle: "7+ acres Clubhouse",
    description:
      "One of the largest clubhouses in Bangalore spread over 7.5 acres",
    icon: "mdi:home-city-outline",
    iconColor: HIGHLIGHT_COLORS.gold,
    bgColor: "#FEF9E7",
    value: "2.5L",
    unit: "Sq.Ft.",
    lottieAnimation: "clubhouse",
  },
  {
    id: 3,
    title: "4000+ trees thoughtfully planted across campus",
    shortTitle: "4000+ Trees",
    description: "Lush green environment with thousands of trees for clean air",
    icon: "mdi:tree-outline",
    iconColor: HIGHLIGHT_COLORS.green,
    bgColor: "#E8F5E9",
    value: "4000+",
    unit: "Trees",
    lottieAnimation: "tree",
  },
  {
    id: 4,
    title: "80% open space for breathable environment",
    shortTitle: "80% Open Space",
    description: "Vast open spaces ensuring fresh air and sunlight",
    icon: "mdi:leaf-circle-outline",
    iconColor: HIGHLIGHT_COLORS.green,
    bgColor: "#E8F5E9",
    value: "80%",
    unit: "Open Space",
    lottieAnimation: "nature",
  },
];

// Additional highlights (shown in expanded view)
export const additionalHighlights = [
  {
    id: 5,
    title: "4 Units per floor – Maximum privacy",
    shortTitle: "4 Units/Floor",
    description: "Only 4 apartments per floor ensuring maximum privacy",
    icon: "mdi:account-group-outline",
    iconColor: HIGHLIGHT_COLORS.orange,
    bgColor: "#FFF3E0",
    value: "4",
    unit: "Units/Floor",
  },
  {
    id: 6,
    title: "4 High-speed Elevators per tower",
    shortTitle: "4 Elevators/Tower",
    description: "High-speed elevators for quick and comfortable commute",
    icon: "mdi:elevator-passenger-outline",
    iconColor: HIGHLIGHT_COLORS.orange,
    bgColor: "#FFF3E0",
    value: "4",
    unit: "Elevators",
  },
  {
    id: 7,
    title: "Automated Garbage Chute",
    shortTitle: "Garbage Chute",
    description: "Modern automated garbage disposal system on every floor",
    icon: "mdi:delete-outline",
    iconColor: HIGHLIGHT_COLORS.red,
    bgColor: "#FFEBEE",
    value: "",
    unit: "",
  },
  {
    id: 8,
    title: "Wrap-around Balconies with panoramic views",
    shortTitle: "Panoramic Balconies",
    description: "Spacious wrap-around balconies offering stunning views",
    icon: "mdi:panorama-horizontal-outline",
    iconColor: HIGHLIGHT_COLORS.purple,
    bgColor: "#F3E5F5",
    value: "",
    unit: "",
  },
  {
    id: 9,
    title: "30+ acres of mother earth retained for real nature",
    shortTitle: "30+ Acres Nature",
    description: "Natural landscape preserved for authentic green living",
    icon: "mdi:nature-outline",
    iconColor: HIGHLIGHT_COLORS.green,
    bgColor: "#E8F5E9",
    value: "30+",
    unit: "Acres",
  },
];

// All highlights combined
export const allHighlights = [...mainHighlights, ...additionalHighlights];

// Overview section stats (cards at the top)
export const overviewStats = [
  {
    id: 1,
    value: "100",
    label: "Acres",
    description: "Integrated Township",
    icon: "mdi:office-building-outline",
    iconColor: HIGHLIGHT_COLORS.gold,
    bgColor: "#FEF9E7",
  },
  {
    id: 2,
    value: "4000+",
    label: "Trees",
    description: "Green Living",
    icon: "mdi:tree-outline",
    iconColor: HIGHLIGHT_COLORS.green,
    bgColor: "#E8F5E9",
  },
  {
    id: 3,
    value: "700+",
    label: "Families",
    description: "Happy Residents",
    icon: "mdi:account-group-outline",
    iconColor: HIGHLIGHT_COLORS.purple,
    bgColor: "#F3E5F5",
  },
  {
    id: 4,
    value: "24/7",
    label: "Security",
    description: "Safe & Secure",
    icon: "mdi:shield-check-outline",
    iconColor: HIGHLIGHT_COLORS.orange,
    bgColor: "#FFF3E0",
  },
];

// Project key numbers for the highlights section
export const projectKeyNumbers = [
  {
    id: 1,
    value: 7,
    label: "Configuration Types",
    sublabel: "2 BHK to 4.5 BHK",
    color: HIGHLIGHT_COLORS.gold,
    bgGradient: "linear-gradient(135deg, #C9A227 0%, #E5C96E 100%)",
  },
  {
    id: 2,
    value: 4,
    label: "Units Per Floor",
    sublabel: "Maximum Privacy",
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
    value: "24/7",
    label: "Security",
    sublabel: "Safe & Secure",
    color: HIGHLIGHT_COLORS.gold,
    bgGradient: "linear-gradient(135deg, #C9A227 0%, #E5C96E 100%)",
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
    icon: "mdi:account-group",
    text: "750+ Happy Families",
    variant: "badge",
  },
  {
    id: 3,
    icon: "mdi:trophy-outline",
    text: "Award Winning",
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
    icon: "mdi:currency-inr",
    title: "₹1.24 Cr*",
    subtitle: "Starting Price",
    iconColor: HIGHLIGHT_COLORS.gold,
  },
  {
    id: 3,
    icon: "mdi:view-grid-outline",
    title: "7 Acre",
    subtitle: "74+ Amenities",
    iconColor: HIGHLIGHT_COLORS.gold,
  },
  {
    id: 4,
    icon: "mdi:train",
    title: "600m",
    subtitle: "Upcoming Metro",
    iconColor: HIGHLIGHT_COLORS.gold,
  },
];

// Quick info bullets for hero
export const heroQuickInfo = [
  "Ready to Move",
  "Bank Loan Available",
  "Premium Location",
];

// Why choose us points
export const whyChooseUs = [
  {
    id: 1,
    title: "Prime Location",
    description:
      "Located in the heart of North Bangalore with excellent connectivity",
    icon: "mdi:map-marker-check-outline",
    iconColor: HIGHLIGHT_COLORS.gold,
  },
  {
    id: 2,
    title: "World-Class Amenities",
    description: "74+ amenities including 2.5 Lakhs Sq.Ft. clubhouse",
    icon: "mdi:star-check-outline",
    iconColor: HIGHLIGHT_COLORS.green,
  },
  {
    id: 3,
    title: "Trusted Developer",
    description: "Over 700+ happy families already residing in Phase 1",
    icon: "mdi:shield-check-outline",
    iconColor: HIGHLIGHT_COLORS.purple,
  },
  {
    id: 4,
    title: "Green Living",
    description: "4000+ trees and 80% open space for sustainable living",
    icon: "mdi:leaf-circle-outline",
    iconColor: HIGHLIGHT_COLORS.teal,
  },
];

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
  HIGHLIGHT_COLORS,
};
