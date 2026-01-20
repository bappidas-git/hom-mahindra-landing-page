/* ============================================
   Entry Point - Nambiar District 25 Phase 2
   Real Estate Landing Page

   Performance optimized with:
   - React 18 concurrent features
   - Web Vitals monitoring
   - Error handling
   ============================================ */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Theme
import theme from './theme/muiTheme';

// Global Styles (Order matters for CSS specificity)
import './styles/variables.css';
import './styles/global.css';
import './styles/animations.css';
import './styles/responsive.css';

// App Component
import App from './App';

// Performance monitoring
import reportWebVitals from './reportWebVitals';

// ===========================================
// Performance Optimizations
// ===========================================

// Preload critical resources
const preloadResources = () => {
  // Preload fonts if not already done in HTML
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'style';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap';
  document.head.appendChild(fontLink);
};

// Enable passive event listeners for better scroll performance
const enablePassiveEventListeners = () => {
  // Polyfill for passive event listener support detection
  let passiveSupported = false;
  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    window.addEventListener('test', null, options);
    window.removeEventListener('test', null, options);
  } catch (err) {
    passiveSupported = false;
  }

  // Store for global use
  window.passiveEventSupported = passiveSupported;
};

// ===========================================
// Error Handling
// ===========================================

// Global error handler
const handleGlobalError = (event) => {
  console.error('Global Error:', event.error);
  // Could send to error tracking service here
};

// Unhandled promise rejection handler
const handleUnhandledRejection = (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
  // Could send to error tracking service here
};

// Register error handlers
window.addEventListener('error', handleGlobalError);
window.addEventListener('unhandledrejection', handleUnhandledRejection);

// ===========================================
// Initialize Application
// ===========================================

// Run optimizations
preloadResources();
enablePassiveEventListeners();

// Get root element
const rootElement = document.getElementById('root');

// Create React 18 root with concurrent features
const root = ReactDOM.createRoot(rootElement);

// Render application
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// ===========================================
// Web Vitals Monitoring
// ===========================================

// Performance monitoring callback
const handleWebVitals = (metric) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}:`, metric.value.toFixed(2));
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }

    // Example: Send to custom analytics endpoint
    // sendToAnalytics({
    //   name: metric.name,
    //   value: metric.value,
    //   id: metric.id,
    //   delta: metric.delta,
    // });
  }
};

// Start monitoring web vitals
reportWebVitals(handleWebVitals);

// ===========================================
// Development Helpers
// ===========================================

if (process.env.NODE_ENV === 'development') {
  // Log when app is ready
  console.log('%c Nambiar District 25 Phase 2 ', 'background: #0A1628; color: #C9A227; padding: 10px 20px; font-size: 14px; font-weight: bold; border-radius: 4px;');
  console.log('%c Development Mode ', 'background: #4CAF50; color: white; padding: 5px 10px; font-size: 12px; border-radius: 4px;');
}

// ===========================================
// Service Worker Registration (PWA)
// ===========================================

// Register service worker for offline support
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered:', registration.scope);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  });
}

// ===========================================
// Hot Module Replacement (Development)
// ===========================================

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    root.render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NextApp />
        </ThemeProvider>
      </React.StrictMode>
    );
  });
}
