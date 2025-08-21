/**
 * Design System Utilities
 * Utility functions and helpers for the unified design system
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { designSystem } from '@/lib/design-system';
import type {
  ColorToken,
  SpacingToken,
  TypographyToken,
  ShadowToken,
  MotionToken,
  ResponsiveBreakpoint,
  ComponentSize,
  ComponentVariant,
  ComponentState
} from './types';

/**
 * Enhanced className utility that merges Tailwind classes intelligently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Color Utilities
 */
export const colorUtils = {
  /**
   * Get color value from design system token
   */
  getColor: (token: ColorToken): string => {
    const keys = token.split('.');
    let value: any = designSystem.colors;
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    return value || token;
  },

  /**
   * Convert hex color to RGB values
   */
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  },

  /**
   * Convert RGB to hex color
   */
  rgbToHex: (r: number, g: number, b: number): string => {
    return `#${[r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('')}`;
  },

  /**
   * Get contrast color (black or white) for a given background color
   */
  getContrastColor: (backgroundColor: string): string => {
    const rgb = colorUtils.hexToRgb(backgroundColor);
    if (!rgb) return '#000000';
    
    // Calculate luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  },

  /**
   * Generate color variations (lighter/darker)
   */
  generateColorVariations: (baseColor: string, steps: number = 5) => {
    const rgb = colorUtils.hexToRgb(baseColor);
    if (!rgb) return [baseColor];
    
    const variations: string[] = [];
    
    for (let i = -steps; i <= steps; i++) {
      const factor = i * 0.1;
      const newR = Math.max(0, Math.min(255, rgb.r + (255 - rgb.r) * factor));
      const newG = Math.max(0, Math.min(255, rgb.g + (255 - rgb.g) * factor));
      const newB = Math.max(0, Math.min(255, rgb.b + (255 - rgb.b) * factor));
      
      variations.push(colorUtils.rgbToHex(Math.round(newR), Math.round(newG), Math.round(newB)));
    }
    
    return variations;
  }
};

/**
 * Spacing Utilities
 */
export const spacingUtils = {
  /**
   * Get spacing value from design system token
   */
  getSpacing: (token: SpacingToken): string => {
    return designSystem.spacing[token] || token;
  },

  /**
   * Convert spacing token to Tailwind class
   */
  toTailwindSpacing: (token: SpacingToken, property: 'p' | 'm' | 'gap' = 'p'): string => {
    const spacingMap: Record<SpacingToken, string> = {
      'none': '0',
      'xs': '1',
      'sm': '2',
      'md': '4',
      'lg': '6',
      'xl': '8',
      '2xl': '12',
      '3xl': '16',
      '4xl': '20',
      '5xl': '24'
    };
    
    const value = spacingMap[token] || '4';
    return `${property}-${value}`;
  }
};

/**
 * Typography Utilities
 */
export const typographyUtils = {
  /**
   * Get typography styles from design system token
   */
  getTypography: (token: TypographyToken) => {
    return designSystem.typography[token] || designSystem.typography.body;
  },

  /**
   * Generate responsive typography classes
   */
  getResponsiveTypography: (token: TypographyToken): string => {
    const baseClasses = {
      'display-lg': 'text-4xl md:text-5xl lg:text-6xl',
      'display-md': 'text-3xl md:text-4xl lg:text-5xl',
      'display-sm': 'text-2xl md:text-3xl lg:text-4xl',
      'heading-lg': 'text-xl md:text-2xl lg:text-3xl',
      'heading-md': 'text-lg md:text-xl lg:text-2xl',
      'heading-sm': 'text-base md:text-lg lg:text-xl',
      'body-lg': 'text-base md:text-lg',
      'body': 'text-sm md:text-base',
      'body-sm': 'text-xs md:text-sm',
      'caption': 'text-xs'
    };
    
    return baseClasses[token] || baseClasses.body;
  }
};

/**
 * Shadow Utilities
 */
export const shadowUtils = {
  /**
   * Get shadow value from design system token
   */
  getShadow: (token: ShadowToken): string => {
    return designSystem.shadows[token] || designSystem.shadows.md;
  },

  /**
   * Generate custom shadow with color
   */
  createColoredShadow: (color: string, intensity: 'sm' | 'md' | 'lg' = 'md'): string => {
    const rgb = colorUtils.hexToRgb(color);
    if (!rgb) return designSystem.shadows[intensity];
    
    const shadowConfig = {
      sm: `0 1px 2px 0 rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)`,
      md: `0 4px 6px -1px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1), 0 2px 4px -1px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.06)`,
      lg: `0 10px 15px -3px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1), 0 4px 6px -2px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)`
    };
    
    return shadowConfig[intensity];
  }
};

/**
 * Motion Utilities
 */
export const motionUtils = {
  /**
   * Get motion value from design system token
   */
  getMotion: (token: MotionToken) => {
    const keys = token.split('.');
    let value: any = designSystem.motion;
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    return value || token;
  },

  /**
   * Create transition classes
   */
  createTransition: (properties: string[] = ['all'], duration: string = '200ms', easing: string = 'ease-in-out'): string => {
    return `transition-${properties.join('-')} duration-${duration.replace('ms', '')} ${easing}`;
  }
};

/**
 * Responsive Utilities
 */
export const responsiveUtils = {
  /**
   * Get breakpoint value
   */
  getBreakpoint: (breakpoint: ResponsiveBreakpoint): string => {
    const breakpoints = {
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    };
    
    return breakpoints[breakpoint] || breakpoints.md;
  },

  /**
   * Generate responsive classes
   */
  generateResponsiveClasses: (baseClass: string, variants: Partial<Record<ResponsiveBreakpoint, string>>): string => {
    const classes = [baseClass];
    
    Object.entries(variants).forEach(([breakpoint, variant]) => {
      if (variant && breakpoint !== 'xs') {
        classes.push(`${breakpoint}:${variant}`);
      }
    });
    
    return classes.join(' ');
  }
};

/**
 * Component Utilities
 */
export const componentUtils = {
  /**
   * Get size-based classes
   */
  getSizeClasses: (size: ComponentSize, type: 'padding' | 'text' | 'height' = 'padding'): string => {
    const sizeMap = {
      padding: {
        xs: 'px-2 py-1',
        sm: 'px-3 py-1.5',
        md: 'px-4 py-2',
        lg: 'px-6 py-3',
        xl: 'px-8 py-4'
      },
      text: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
      },
      height: {
        xs: 'h-6',
        sm: 'h-8',
        md: 'h-10',
        lg: 'h-12',
        xl: 'h-14'
      }
    };
    
    return sizeMap[type][size] || sizeMap[type].md;
  },

  /**
   * Get variant-based classes
   */
  getVariantClasses: (variant: ComponentVariant): string => {
    const variantMap: Record<ComponentVariant, string> = {
      default: 'bg-gray-100 text-gray-900 border-gray-200',
      primary: 'bg-blue-600 text-white border-blue-600',
      secondary: 'bg-gray-600 text-white border-gray-600',
      success: 'bg-green-600 text-white border-green-600',
      warning: 'bg-yellow-600 text-white border-yellow-600',
      error: 'bg-red-600 text-white border-red-600',
      ghost: 'bg-transparent text-gray-900 border-transparent hover:bg-gray-100',
      outline: 'bg-transparent text-gray-900 border-gray-300 hover:bg-gray-50'
    };
    
    return variantMap[variant] || variantMap.default;
  },

  /**
   * Get state-based classes
   */
  getStateClasses: (state: ComponentState): string => {
    const stateMap: Record<ComponentState, string> = {
      default: '',
      hover: 'hover:opacity-90 hover:scale-105',
      active: 'active:scale-95',
      focus: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
      loading: 'opacity-75 cursor-wait'
    };
    
    return stateMap[state] || stateMap.default;
  }
};

/**
 * Animation Utilities
 */
export const animationUtils = {
  /**
   * Create fade animation classes
   */
  fadeIn: (duration: string = '300ms', delay: string = '0ms'): string => {
    return `animate-in fade-in duration-${duration.replace('ms', '')} delay-${delay.replace('ms', '')}`;
  },

  /**
   * Create slide animation classes
   */
  slideIn: (direction: 'up' | 'down' | 'left' | 'right' = 'up', duration: string = '300ms'): string => {
    const directionMap = {
      up: 'slide-in-from-bottom',
      down: 'slide-in-from-top',
      left: 'slide-in-from-right',
      right: 'slide-in-from-left'
    };
    
    return `animate-in ${directionMap[direction]} duration-${duration.replace('ms', '')}`;
  },

  /**
   * Create scale animation classes
   */
  scaleIn: (duration: string = '200ms'): string => {
    return `animate-in zoom-in duration-${duration.replace('ms', '')}`;
  }
};

/**
 * Validation Utilities
 */
export const validationUtils = {
  /**
   * Validate color format
   */
  isValidColor: (color: string): boolean => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const rgbRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
    const hslRegex = /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/;
    
    return hexRegex.test(color) || rgbRegex.test(color) || hslRegex.test(color);
  },

  /**
   * Validate component props
   */
  validateComponentProps: <T extends Record<string, any>>(
    props: T,
    requiredProps: (keyof T)[],
    optionalProps: (keyof T)[] = []
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const allValidProps = [...requiredProps, ...optionalProps];
    
    // Check required props
    requiredProps.forEach(prop => {
      if (!(prop in props) || props[prop] === undefined || props[prop] === null) {
        errors.push(`Required prop '${String(prop)}' is missing`);
      }
    });
    
    // Check for invalid props
    Object.keys(props).forEach(prop => {
      if (!allValidProps.includes(prop as keyof T)) {
        errors.push(`Invalid prop '${prop}' provided`);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

/**
 * Performance Utilities
 */
export const performanceUtils = {
  /**
   * Debounce function
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  /**
   * Throttle function
   */
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * Memoize function results
   */
  memoize: <T extends (...args: any[]) => any>(func: T): T => {
    const cache = new Map();
    
    return ((...args: Parameters<T>) => {
      const key = JSON.stringify(args);
      
      if (cache.has(key)) {
        return cache.get(key);
      }
      
      const result = func(...args);
      cache.set(key, result);
      return result;
    }) as T;
  }
};

// Export all utilities as a single object
export const designSystemUtils = {
  cn,
  color: colorUtils,
  spacing: spacingUtils,
  typography: typographyUtils,
  shadow: shadowUtils,
  motion: motionUtils,
  responsive: responsiveUtils,
  component: componentUtils,
  animation: animationUtils,
  validation: validationUtils,
  performance: performanceUtils
};

// All utilities are available through designSystemUtils object