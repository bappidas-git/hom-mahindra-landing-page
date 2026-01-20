/* ============================================
   Web Vitals Performance Monitoring
   Nambiar District 25 Phase 2

   Measures Core Web Vitals:
   - CLS (Cumulative Layout Shift)
   - FID (First Input Delay)
   - FCP (First Contentful Paint)
   - LCP (Largest Contentful Paint)
   - TTFB (Time to First Byte)
   - INP (Interaction to Next Paint) - New metric
   ============================================ */

/**
 * Reports web vitals metrics
 * @param {Function} onPerfEntry - Callback function to receive metrics
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({
      onCLS,
      onFID,
      onFCP,
      onLCP,
      onTTFB,
      onINP
    }) => {
      // Core Web Vitals
      onCLS(onPerfEntry);   // Cumulative Layout Shift
      onFID(onPerfEntry);   // First Input Delay (deprecated, use INP)
      onFCP(onPerfEntry);   // First Contentful Paint
      onLCP(onPerfEntry);   // Largest Contentful Paint
      onTTFB(onPerfEntry);  // Time to First Byte

      // New metric (if available)
      if (onINP) {
        onINP(onPerfEntry); // Interaction to Next Paint
      }
    }).catch((error) => {
      // Silently fail if web-vitals fails to load
      if (process.env.NODE_ENV === 'development') {
        console.warn('Web Vitals failed to load:', error);
      }
    });
  }
};

/**
 * Get performance thresholds
 * Based on Google's Web Vitals recommendations
 */
export const getVitalsThresholds = () => ({
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FID: { good: 100, needsImprovement: 300 },
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
  INP: { good: 200, needsImprovement: 500 },
});

/**
 * Evaluate metric performance
 * @param {string} name - Metric name
 * @param {number} value - Metric value
 * @returns {string} - 'good', 'needs-improvement', or 'poor'
 */
export const evaluateMetric = (name, value) => {
  const thresholds = getVitalsThresholds()[name];
  if (!thresholds) return 'unknown';

  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.needsImprovement) return 'needs-improvement';
  return 'poor';
};

export default reportWebVitals;
