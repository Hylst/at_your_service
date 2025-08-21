/**
 * Design System Hooks
 * Custom React hooks for the unified design system
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { designSystem } from '@/lib/design-system';
import { designSystemUtils } from './utils';
import type {
  ColorToken,
  SpacingToken,
  TypographyToken,
  ComponentSize,
  ComponentVariant,
  ComponentState,
  ResponsiveBreakpoint
} from './types';

/**
 * useDesignSystem Hook
 * Provides access to design system tokens and utilities
 */
export const useDesignSystem = () => {
  return {
    tokens: designSystem,
    utils: designSystemUtils
  };
};

/**
 * useTheme Hook
 * Manages theme state and provides theme switching functionality
 */
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  primaryColor: string;
  accentColor: string;
  customColors?: Record<string, string>;
}

export const useTheme = (initialTheme: Partial<ThemeConfig> = {}) => {
  const [theme, setTheme] = useState<ThemeConfig>({
    mode: 'light',
    primaryColor: designSystem.colors.primary[600],
    accentColor: designSystem.colors.accent[500],
    ...initialTheme
  });

  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>('light');

  // Detect system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPreference(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Calculate effective theme mode
  const effectiveMode = useMemo(() => {
    return theme.mode === 'auto' ? systemPreference : theme.mode;
  }, [theme.mode, systemPreference]);

  // Theme utilities
  const toggleMode = useCallback(() => {
    setTheme(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light'
    }));
  }, []);

  const updateTheme = useCallback((updates: Partial<ThemeConfig>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  }, []);

  const resetTheme = useCallback(() => {
    setTheme({
      mode: 'light',
      primaryColor: designSystem.colors.primary[600],
      accentColor: designSystem.colors.accent[500]
    });
  }, []);

  return {
    theme,
    effectiveMode,
    systemPreference,
    toggleMode,
    updateTheme,
    resetTheme
  };
};

/**
 * useResponsive Hook
 * Provides responsive breakpoint detection and utilities
 */
export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<ResponsiveBreakpoint>('md');
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });
      
      // Determine breakpoint
      if (width < 640) setBreakpoint('xs');
      else if (width < 768) setBreakpoint('sm');
      else if (width < 1024) setBreakpoint('md');
      else if (width < 1280) setBreakpoint('lg');
      else if (width < 1536) setBreakpoint('xl');
      else setBreakpoint('2xl');
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  const isTablet = breakpoint === 'md';
  const isDesktop = breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl';

  return {
    breakpoint,
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isBreakpoint: (bp: ResponsiveBreakpoint) => breakpoint === bp,
    isBreakpointUp: (bp: ResponsiveBreakpoint) => {
      const order = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      return order.indexOf(breakpoint) >= order.indexOf(bp);
    },
    isBreakpointDown: (bp: ResponsiveBreakpoint) => {
      const order = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      return order.indexOf(breakpoint) <= order.indexOf(bp);
    }
  };
};

/**
 * useComponentState Hook
 * Manages component interaction states
 */
export const useComponentState = (initialState: ComponentState = 'default') => {
  const [state, setState] = useState<ComponentState>(initialState);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handlers = useMemo(() => ({
    onMouseEnter: () => {
      setIsHovered(true);
      if (state === 'default') setState('hover');
    },
    onMouseLeave: () => {
      setIsHovered(false);
      if (state === 'hover') setState('default');
    },
    onFocus: () => {
      setIsFocused(true);
      if (state === 'default') setState('focus');
    },
    onBlur: () => {
      setIsFocused(false);
      if (state === 'focus') setState('default');
    },
    onMouseDown: () => {
      setIsPressed(true);
      setState('active');
    },
    onMouseUp: () => {
      setIsPressed(false);
      if (isHovered) setState('hover');
      else setState('default');
    }
  }), [state, isHovered]);

  const setDisabled = useCallback((disabled: boolean) => {
    setState(disabled ? 'disabled' : 'default');
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(loading ? 'loading' : 'default');
  }, []);

  return {
    state,
    isHovered,
    isFocused,
    isPressed,
    handlers,
    setState,
    setDisabled,
    setLoading
  };
};

/**
 * useAnimation Hook
 * Manages component animations and transitions
 */
export const useAnimation = (config: {
  duration?: number;
  easing?: string;
  delay?: number;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const animate = useCallback((callback?: () => void) => {
    setIsAnimating(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      callback?.();
    }, (config.duration || 200) + (config.delay || 0));
  }, [config.duration, config.delay]);

  const stopAnimation = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsAnimating(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isAnimating,
    animate,
    stopAnimation
  };
};

/**
 * useColorPalette Hook
 * Generates and manages color palettes
 */
export const useColorPalette = (baseColor: string) => {
  const palette = useMemo(() => {
    return designSystemUtils.color.generateColorVariations(baseColor, 5);
  }, [baseColor]);

  const getColor = useCallback((index: number) => {
    return palette[Math.max(0, Math.min(palette.length - 1, index))];
  }, [palette]);

  const getContrastColor = useCallback((color: string) => {
    return designSystemUtils.color.getContrastColor(color);
  }, []);

  return {
    palette,
    getColor,
    getContrastColor,
    lightest: palette[0],
    lighter: palette[2],
    base: palette[5],
    darker: palette[8],
    darkest: palette[10]
  };
};

/**
 * useLocalStorage Hook
 * Persists design system preferences in localStorage
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
};

/**
 * useDebounce Hook
 * Debounces values for performance optimization
 */
export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * useClickOutside Hook
 * Detects clicks outside of a component
 */
export const useClickOutside = <T extends HTMLElement>(
  callback: () => void
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [callback]);

  return ref;
};

/**
 * useKeyboard Hook
 * Handles keyboard interactions
 */
export const useKeyboard = (keyMap: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const handler = keyMap[event.key];
      if (handler) {
        event.preventDefault();
        handler();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyMap]);
};

/**
 * useFocusTrap Hook
 * Traps focus within a component (useful for modals)
 */
export const useFocusTrap = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  return ref;
};

/**
 * useMediaQuery Hook
 * Responds to media query changes
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

/**
 * useComponentVariant Hook
 * Manages component variant state and classes
 */
export const useComponentVariant = (
  variant: ComponentVariant,
  size: ComponentSize,
  state: ComponentState = 'default'
) => {
  const classes = useMemo(() => {
    const variantClasses = designSystemUtils.component.getVariantClasses(variant);
    const sizeClasses = designSystemUtils.component.getSizeClasses(size);
    const stateClasses = designSystemUtils.component.getStateClasses(state);
    
    return designSystemUtils.cn(variantClasses, sizeClasses, stateClasses);
  }, [variant, size, state]);

  return { classes };
};

// All hooks are exported as named exports above