/* ============================================
   useInView Hook - Nambiar District 25 Phase 2
   Custom hook for detecting element visibility
   ============================================ */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to detect if an element is in viewport
 * Uses Intersection Observer API for performance
 *
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.root - Root element selector
 * @param {string} options.rootMargin - Root margin
 * @param {boolean} options.triggerOnce - Whether to trigger only once
 * @param {boolean} options.initialInView - Initial in-view state
 * @returns {Array} - [ref, inView, entry]
 */
const useInView = (options = {}) => {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
    initialInView = false,
  } = options;

  const [inView, setInView] = useState(initialInView);
  const [entry, setEntry] = useState(null);
  const ref = useRef(null);
  const frozen = useRef(false);

  const callbackFn = useCallback(
    (entries) => {
      const [observerEntry] = entries;

      // If triggerOnce and already triggered, do nothing
      if (frozen.current) return;

      setEntry(observerEntry);
      setInView(observerEntry.isIntersecting);

      // Freeze if triggerOnce and is intersecting
      if (triggerOnce && observerEntry.isIntersecting) {
        frozen.current = true;
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: assume element is in view
      setInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Reset frozen state when element changes
    if (!triggerOnce) {
      frozen.current = false;
    }

    const observerOptions = {
      threshold,
      root: root ? document.querySelector(root) : null,
      rootMargin,
    };

    const observer = new IntersectionObserver(callbackFn, observerOptions);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce, callbackFn]);

  return [ref, inView, entry];
};

/**
 * Hook to track visibility percentage of an element
 *
 * @param {Object} options - Configuration options
 * @returns {Array} - [ref, visibilityPercentage]
 */
export const useVisibilityPercentage = (options = {}) => {
  const { rootMargin = '0px' } = options;

  const [percentage, setPercentage] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setPercentage(100);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Create multiple thresholds for more precise tracking
    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setPercentage(Math.round(entry.intersectionRatio * 100));
      },
      { threshold: thresholds, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, percentage];
};

/**
 * Hook to detect when element enters/leaves viewport
 * with callbacks
 *
 * @param {Object} options - Configuration options
 * @returns {Object} - { ref, inView }
 */
export const useInViewWithCallbacks = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    onEnter = null,
    onLeave = null,
    triggerOnce = false,
  } = options;

  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      if (onEnter) onEnter();
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isIntersecting = entry.isIntersecting;

        // Handle triggerOnce
        if (triggerOnce && hasTriggered.current) return;

        if (isIntersecting && !inView) {
          setInView(true);
          if (onEnter) onEnter();
          if (triggerOnce) hasTriggered.current = true;
        } else if (!isIntersecting && inView && !triggerOnce) {
          setInView(false);
          if (onLeave) onLeave();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, onEnter, onLeave, triggerOnce, inView]);

  return { ref, inView };
};

/**
 * Hook for lazy loading content when in view
 *
 * @param {Object} options - Configuration options
 * @returns {Object} - { ref, shouldLoad, isLoaded }
 */
export const useLazyLoad = (options = {}) => {
  const { rootMargin = '100px', triggerOnce = true } = options;

  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, triggerOnce]);

  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return { ref, shouldLoad, isLoaded, onLoad };
};

/**
 * Hook to track multiple elements' visibility
 *
 * @param {number} count - Number of elements to track
 * @param {Object} options - Configuration options
 * @returns {Array} - Array of { ref, inView } objects
 */
export const useMultipleInView = (count, options = {}) => {
  const { threshold = 0.1, rootMargin = '0px' } = options;

  const [inViewStates, setInViewStates] = useState(() =>
    Array.from({ length: count }, () => false)
  );

  const refs = useRef([]);

  useEffect(() => {
    refs.current = refs.current.slice(0, count);

    if (!('IntersectionObserver' in window)) {
      setInViewStates(Array.from({ length: count }, () => true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.indexOf(entry.target);
          if (index !== -1) {
            setInViewStates((prev) => {
              const newStates = [...prev];
              newStates[index] = entry.isIntersecting;
              return newStates;
            });
          }
        });
      },
      { threshold, rootMargin }
    );

    refs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [count, threshold, rootMargin]);

  const setRef = useCallback((index) => (element) => {
    refs.current[index] = element;
  }, []);

  return inViewStates.map((inView, index) => ({
    ref: setRef(index),
    inView,
  }));
};

export default useInView;
