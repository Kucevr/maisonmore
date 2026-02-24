import { useEffect, useState } from 'react';

/**
 * Hook to determine if animations should be enabled based on device capabilities
 */
export const useReducedMotion = (): boolean => {
  const [reducedMotion, setReducedMotion] = useState(() => {
    // Check media query preference
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    return undefined;
  }, []);

  return reducedMotion;
};

/**
 * Detect if device is low-end (slow network or small memory)
 */
export const useLowEndDevice = (): boolean => {
  const isLowEnd = (() => {
    if (typeof navigator === 'undefined') return false;
    
    // Check for low memory devices
    const memory = (navigator as any).deviceMemory;
    if (memory && memory < 4) return true;

    // Check for slow network
    const connection = (navigator as any).connection;
    if (connection && (connection.effectiveType === '2g' || connection.effectiveType === '3g')) {
      return true;
    }

    return false;
  })();

  return isLowEnd;
};

/**
 * Get animation config based on device capabilities
 */
export const useAnimationConfig = () => {
  const reducedMotion = useReducedMotion();
  const isLowEnd = useLowEndDevice();

  return {
    shouldAnimate: !reducedMotion && !isLowEnd,
    duration: isLowEnd ? 0.3 : 0.8,
    stagger: isLowEnd ? 0 : 0.015,
  };
};
