/* ============================================
   useScrollPosition Hook - Nambiar District 25 Phase 2
   Custom hook for tracking scroll position
   ============================================ */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook to track scroll position
 * Provides scroll position, direction, and scroll percentage
 *
 * @param {Object} options - Configuration options
 * @param {number} options.throttleMs - Throttle time in milliseconds (default: 100)
 * @param {HTMLElement} options.element - Element to track scroll (default: window)
 * @returns {Object} - Scroll state object
 */
const useScrollPosition = (options = {}) => {
  const { throttleMs = 100, element = null } = options;

  const [scrollState, setScrollState] = useState({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    direction: {
      x: null, // 'left' or 'right'
      y: null, // 'up' or 'down'
    },
    isScrolling: false,
    isAtTop: true,
    isAtBottom: false,
    scrollPercentage: 0,
  });

  const scrollTimeout = useRef(null);
  const lastScrollTime = useRef(Date.now());
  const isScrollingTimeout = useRef(null);

  const getScrollPosition = useCallback(() => {
    if (element) {
      return {
        x: element.scrollLeft || 0,
        y: element.scrollTop || 0,
        maxX: element.scrollWidth - element.clientWidth || 0,
        maxY: element.scrollHeight - element.clientHeight || 0,
      };
    }

    return {
      x: window.pageXOffset || document.documentElement.scrollLeft || 0,
      y: window.pageYOffset || document.documentElement.scrollTop || 0,
      maxX: document.documentElement.scrollWidth - window.innerWidth || 0,
      maxY: document.documentElement.scrollHeight - window.innerHeight || 0,
    };
  }, [element]);

  const handleScroll = useCallback(() => {
    const now = Date.now();

    // Throttle scroll events
    if (now - lastScrollTime.current < throttleMs) {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(handleScroll, throttleMs);
      return;
    }

    lastScrollTime.current = now;

    const { x, y, maxX, maxY } = getScrollPosition();

    setScrollState((prevState) => {
      const directionX = x > prevState.x ? 'right' : x < prevState.x ? 'left' : prevState.direction.x;
      const directionY = y > prevState.y ? 'down' : y < prevState.y ? 'up' : prevState.direction.y;

      const scrollPercentage = maxY > 0 ? Math.round((y / maxY) * 100) : 0;

      return {
        x,
        y,
        lastX: prevState.x,
        lastY: prevState.y,
        direction: {
          x: directionX,
          y: directionY,
        },
        isScrolling: true,
        isAtTop: y <= 0,
        isAtBottom: y >= maxY - 1,
        scrollPercentage: Math.min(100, Math.max(0, scrollPercentage)),
      };
    });

    // Reset isScrolling after scroll ends
    if (isScrollingTimeout.current) {
      clearTimeout(isScrollingTimeout.current);
    }
    isScrollingTimeout.current = setTimeout(() => {
      setScrollState((prevState) => ({
        ...prevState,
        isScrolling: false,
      }));
    }, 150);
  }, [throttleMs, getScrollPosition]);

  useEffect(() => {
    const targetElement = element || window;

    // Initial position
    const { x, y, maxY } = getScrollPosition();
    const scrollPercentage = maxY > 0 ? Math.round((y / maxY) * 100) : 0;

    setScrollState((prevState) => ({
      ...prevState,
      x,
      y,
      isAtTop: y <= 0,
      isAtBottom: y >= maxY - 1,
      scrollPercentage: Math.min(100, Math.max(0, scrollPercentage)),
    }));

    // Add scroll listener with passive option for better performance
    targetElement.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      targetElement.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (isScrollingTimeout.current) {
        clearTimeout(isScrollingTimeout.current);
      }
    };
  }, [element, handleScroll, getScrollPosition]);

  return scrollState;
};

/**
 * Simple hook to check if user has scrolled past a threshold
 *
 * @param {number} threshold - Scroll threshold in pixels
 * @returns {boolean} - Whether scrolled past threshold
 */
export const useScrolledPast = (threshold = 100) => {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setScrolledPast(scrollY > threshold);
    };

    // Check initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolledPast;
};

/**
 * Hook to get scroll direction only
 *
 * @returns {string|null} - 'up' or 'down' or null
 */
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (scrollY < lastScrollY.current) {
        setScrollDirection('up');
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollDirection;
};

/**
 * Hook to smoothly scroll to an element or position
 *
 * @returns {Object} - Scroll functions
 */
export const useScrollTo = () => {
  const scrollToTop = useCallback((smooth = true) => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  const scrollToElement = useCallback((elementId, offset = 0, smooth = true) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  }, []);

  const scrollToPosition = useCallback((y, smooth = true) => {
    window.scrollTo({
      top: y,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  return {
    scrollToTop,
    scrollToBottom,
    scrollToElement,
    scrollToPosition,
  };
};

export default useScrollPosition;
