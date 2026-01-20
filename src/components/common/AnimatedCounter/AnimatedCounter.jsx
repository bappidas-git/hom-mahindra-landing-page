/* ============================================
   AnimatedCounter Component - Nambiar District 25 Phase 2
   Animated number counter with scroll trigger
   ============================================ */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'framer-motion';
import styles from './AnimatedCounter.module.css';

const AnimatedCounter = ({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  delay = 0,
  decimals = 0,
  separator = ',',
  className = '',
  variant = 'default', // default, large, gradient, outline
  color = 'gold', // gold, dark, white
  label = null,
  icon = null,
  once = true,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animationRef = useRef(null);

  const valueString = String(value);

  // Check if value is a special format like "24/7" that shouldn't be animated
  const isSpecialFormat = /^\d+\/\d+$/.test(valueString.trim());

  // Parse value (handle strings like "100+" or "4000+")
  const parseValue = useCallback((val) => {
    if (typeof val === 'number') return val;
    const numMatch = String(val).match(/^[\d.]+/);
    return numMatch ? parseFloat(numMatch[0]) : 0;
  }, []);

  const numericValue = parseValue(value);

  // Extract trailing suffix (like "+" in "100+")
  const extractSuffix = useCallback((val) => {
    const str = String(val);
    const match = str.match(/^[\d.,\s]+(.*)$/);
    return match ? match[1].trim() : '';
  }, []);

  const trailingSuffix = extractSuffix(value);

  // Format number with separator
  const formatNumber = useCallback((num) => {
    if (!separator) return String(num);
    const parts = String(num).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  }, [separator]);

  // Animate counter when in view
  useEffect(() => {
    if (isInView && !hasAnimated && !isSpecialFormat) {
      const timeoutId = setTimeout(() => {
        const startTime = performance.now();
        const startValue = 0;
        const endValue = numericValue;
        const durationMs = duration * 1000;

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / durationMs, 1);

          // Ease-out cubic function for smooth animation
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentValue = startValue + (endValue - startValue) * easeOut;

          if (decimals > 0) {
            setDisplayValue(parseFloat(currentValue.toFixed(decimals)));
          } else {
            setDisplayValue(Math.round(currentValue));
          }

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            setHasAnimated(true);
          }
        };

        animationRef.current = requestAnimationFrame(animate);
      }, delay * 1000);

      return () => {
        clearTimeout(timeoutId);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isInView, hasAnimated, numericValue, duration, delay, decimals, isSpecialFormat]);

  // Build class names
  const classNames = [
    styles.counter,
    styles[variant],
    styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`],
    className
  ].filter(Boolean).join(' ');

  // For special formats like "24/7", display as-is without animation
  if (isSpecialFormat) {
    return (
      <div ref={ref} className={classNames} {...props}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.valueWrapper}>
          <span className={styles.prefix}>{prefix}</span>
          <span className={styles.value}>{valueString}</span>
          <span className={styles.suffix}>{suffix}</span>
        </div>
        {label && <div className={styles.label} style={color === 'white' ? { color: '#FFFFFFCC' } : undefined}>{label}</div>}
      </div>
    );
  }

  return (
    <div ref={ref} className={classNames} {...props}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.valueWrapper}>
        <span className={styles.prefix}>{prefix}</span>
        <span className={styles.value}>{formatNumber(displayValue)}</span>
        <span className={styles.suffix}>{suffix || trailingSuffix}</span>
      </div>
      {label && <div className={styles.label} style={color === 'white' ? { color: '#FFFFFFCC' } : undefined}>{label}</div>}
    </div>
  );
};

// Alternative simpler counter using CSS animations
export const SimpleCounter = ({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
  className = '',
  label = null,
  color = 'gold',
  ...props
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasStarted, setHasStarted] = useState(false);

  // Parse numeric value
  const numericValue = typeof value === 'number'
    ? value
    : parseFloat(String(value).replace(/[^\d.]/g, '')) || 0;

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);

      const startTime = Date.now();
      const startValue = 0;
      const endValue = numericValue;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(startValue + (endValue - startValue) * easeOut);

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, hasStarted, numericValue, duration]);

  // Format with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div ref={ref} className={`${styles.counter} ${className}`} {...props}>
      <div className={styles.valueWrapper}>
        <span className={styles.prefix}>{prefix}</span>
        <span className={styles.value}>{formatNumber(count)}</span>
        <span className={styles.suffix}>{suffix}</span>
      </div>
      {label && <div className={styles.label} style={color === 'white' ? { color: '#FFFFFFCC' } : undefined}>{label}</div>}
    </div>
  );
};

// Hook for animated counter logic
export const useAnimatedCounter = (targetValue, duration = 2000, startOnMount = false) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const start = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(targetValue * easeOut);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue, duration, isAnimating]);

  const reset = useCallback(() => {
    setCount(0);
    setIsAnimating(false);
  }, []);

  useEffect(() => {
    if (startOnMount) {
      start();
    }
  }, [startOnMount, start]);

  return { count, start, reset, isAnimating };
};

export default AnimatedCounter;
