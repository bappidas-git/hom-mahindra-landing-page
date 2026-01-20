/* ============================================
   useMediaQuery Hook - Nambiar District 25 Phase 2
   Custom hook for responsive design
   ============================================ */

import { useState, useEffect, useCallback, useMemo } from 'react';

// Breakpoint definitions matching MUI theme
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

// Common media query strings
export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.sm - 1}px)`,
  tablet: `(min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md - 1}px)`,
  desktop: `(min-width: ${BREAKPOINTS.md}px)`,
  largeDesktop: `(min-width: ${BREAKPOINTS.lg}px)`,
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
  prefersDarkMode: '(prefers-color-scheme: dark)',
  prefersLightMode: '(prefers-color-scheme: light)',
  touchDevice: '(hover: none) and (pointer: coarse)',
  mouseDevice: '(hover: hover) and (pointer: fine)',
};

/**
 * Custom hook for media query matching
 *
 * @param {string} query - CSS media query string
 * @returns {boolean} - Whether the query matches
 */
const useMediaQuery = (query) => {
  // Get initial state from server-side safe check
  const getInitialState = useCallback(() => {
    // Check if window is available (not SSR)
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  }, [query]);

  const [matches, setMatches] = useState(getInitialState);

  useEffect(() => {
    // Check if window is available
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    // Update state initially
    setMatches(mediaQueryList.matches);

    // Create event listener
    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(handleChange);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
};

/**
 * Hook to get current breakpoint name
 *
 * @returns {string} - Current breakpoint ('xs', 'sm', 'md', 'lg', 'xl')
 */
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('md');

  useEffect(() => {
    const getBreakpoint = () => {
      if (typeof window === 'undefined') return 'md';

      const width = window.innerWidth;

      if (width < BREAKPOINTS.sm) return 'xs';
      if (width < BREAKPOINTS.md) return 'sm';
      if (width < BREAKPOINTS.lg) return 'md';
      if (width < BREAKPOINTS.xl) return 'lg';
      return 'xl';
    };

    const handleResize = () => {
      setBreakpoint(getBreakpoint());
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

/**
 * Hook to check if screen is mobile
 *
 * @returns {boolean} - True if mobile device width
 */
export const useIsMobile = () => {
  return useMediaQuery(MEDIA_QUERIES.mobile);
};

/**
 * Hook to check if screen is tablet
 *
 * @returns {boolean} - True if tablet width
 */
export const useIsTablet = () => {
  return useMediaQuery(MEDIA_QUERIES.tablet);
};

/**
 * Hook to check if screen is desktop
 *
 * @returns {boolean} - True if desktop width
 */
export const useIsDesktop = () => {
  return useMediaQuery(MEDIA_QUERIES.desktop);
};

/**
 * Hook to get all device information
 *
 * @returns {Object} - Device information object
 */
export const useDeviceInfo = () => {
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  const isTablet = useMediaQuery(MEDIA_QUERIES.tablet);
  const isDesktop = useMediaQuery(MEDIA_QUERIES.desktop);
  const isLargeDesktop = useMediaQuery(MEDIA_QUERIES.largeDesktop);
  const isPortrait = useMediaQuery(MEDIA_QUERIES.portrait);
  const isLandscape = useMediaQuery(MEDIA_QUERIES.landscape);
  const isTouchDevice = useMediaQuery(MEDIA_QUERIES.touchDevice);
  const prefersReducedMotion = useMediaQuery(MEDIA_QUERIES.prefersReducedMotion);
  const prefersDarkMode = useMediaQuery(MEDIA_QUERIES.prefersDarkMode);

  return useMemo(
    () => ({
      isMobile,
      isTablet,
      isDesktop,
      isLargeDesktop,
      isPortrait,
      isLandscape,
      isTouchDevice,
      prefersReducedMotion,
      prefersDarkMode,
      deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
    }),
    [
      isMobile,
      isTablet,
      isDesktop,
      isLargeDesktop,
      isPortrait,
      isLandscape,
      isTouchDevice,
      prefersReducedMotion,
      prefersDarkMode,
    ]
  );
};

/**
 * Hook to get window dimensions
 *
 * @returns {Object} - { width, height }
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

/**
 * Hook to check if min-width breakpoint is met
 *
 * @param {string} breakpoint - Breakpoint name ('xs', 'sm', 'md', 'lg', 'xl')
 * @returns {boolean} - True if viewport is >= breakpoint
 */
export const useMinWidth = (breakpoint) => {
  const minWidth = BREAKPOINTS[breakpoint] || 0;
  return useMediaQuery(`(min-width: ${minWidth}px)`);
};

/**
 * Hook to check if max-width breakpoint is met
 *
 * @param {string} breakpoint - Breakpoint name
 * @returns {boolean} - True if viewport is < breakpoint
 */
export const useMaxWidth = (breakpoint) => {
  const maxWidth = BREAKPOINTS[breakpoint] || 0;
  return useMediaQuery(`(max-width: ${maxWidth - 1}px)`);
};

/**
 * Hook to check if between two breakpoints
 *
 * @param {string} start - Start breakpoint name
 * @param {string} end - End breakpoint name
 * @returns {boolean} - True if viewport is between breakpoints
 */
export const useBetweenBreakpoints = (start, end) => {
  const minWidth = BREAKPOINTS[start] || 0;
  const maxWidth = BREAKPOINTS[end] || 9999;
  return useMediaQuery(`(min-width: ${minWidth}px) and (max-width: ${maxWidth - 1}px)`);
};

/**
 * Hook to get responsive value based on breakpoint
 *
 * @param {Object} values - Object with breakpoint keys and values
 * @returns {any} - Value for current breakpoint
 */
export const useResponsiveValue = (values) => {
  const breakpoint = useBreakpoint();

  return useMemo(() => {
    // Get value for current breakpoint or fallback to smaller breakpoints
    const breakpointOrder = ['xl', 'lg', 'md', 'sm', 'xs'];
    const currentIndex = breakpointOrder.indexOf(breakpoint);

    for (let i = currentIndex; i < breakpointOrder.length; i++) {
      const bp = breakpointOrder[i];
      if (values[bp] !== undefined) {
        return values[bp];
      }
    }

    // Fallback to first available value
    return Object.values(values)[0];
  }, [values, breakpoint]);
};

/**
 * Hook for detecting orientation changes
 *
 * @returns {string} - 'portrait' or 'landscape'
 */
export const useOrientation = () => {
  const isPortrait = useMediaQuery(MEDIA_QUERIES.portrait);
  return isPortrait ? 'portrait' : 'landscape';
};

export default useMediaQuery;
