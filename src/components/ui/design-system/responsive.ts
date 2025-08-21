/**
 * Responsive Design System
 * Comprehensive responsive utilities and grid system
 */

import { designSystem } from '@/lib/design-system';
import type { ResponsiveBreakpoint } from './types';

/**
 * Breakpoint Configuration
 * Standard breakpoints for responsive design
 */
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

/**
 * Container Max Widths
 * Maximum widths for containers at different breakpoints
 */
export const containerMaxWidths = {
  xs: '100%',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

/**
 * Grid Configuration
 * Standard grid system configuration
 */
export const gridConfig = {
  columns: 12,
  gutters: {
    xs: '1rem',
    sm: '1.5rem',
    md: '2rem',
    lg: '2.5rem',
    xl: '3rem',
    '2xl': '3.5rem'
  },
  margins: {
    xs: '1rem',
    sm: '1.5rem',
    md: '2rem',
    lg: '3rem',
    xl: '4rem',
    '2xl': '5rem'
  }
} as const;

/**
 * Responsive Utilities
 */
export class ResponsiveUtils {
  /**
   * Get current breakpoint based on window width
   */
  static getCurrentBreakpoint(width: number): ResponsiveBreakpoint {
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  }

  /**
   * Check if current breakpoint is at or above target
   */
  static isBreakpointUp(current: ResponsiveBreakpoint, target: ResponsiveBreakpoint): boolean {
    const order: ResponsiveBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    return order.indexOf(current) >= order.indexOf(target);
  }

  /**
   * Check if current breakpoint is at or below target
   */
  static isBreakpointDown(current: ResponsiveBreakpoint, target: ResponsiveBreakpoint): boolean {
    const order: ResponsiveBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    return order.indexOf(current) <= order.indexOf(target);
  }

  /**
   * Generate media query string for breakpoint
   */
  static getMediaQuery(breakpoint: ResponsiveBreakpoint, direction: 'up' | 'down' | 'only' = 'up'): string {
    const bp = breakpoints[breakpoint];
    const nextBp = this.getNextBreakpoint(breakpoint);
    
    switch (direction) {
      case 'up':
        return `(min-width: ${bp}px)`;
      case 'down':
        return `(max-width: ${bp - 1}px)`;
      case 'only':
        return nextBp 
          ? `(min-width: ${bp}px) and (max-width: ${breakpoints[nextBp] - 1}px)`
          : `(min-width: ${bp}px)`;
      default:
        return `(min-width: ${bp}px)`;
    }
  }

  /**
   * Get next breakpoint in sequence
   */
  static getNextBreakpoint(current: ResponsiveBreakpoint): ResponsiveBreakpoint | null {
    const order: ResponsiveBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = order.indexOf(current);
    return currentIndex < order.length - 1 ? order[currentIndex + 1] : null;
  }

  /**
   * Get previous breakpoint in sequence
   */
  static getPreviousBreakpoint(current: ResponsiveBreakpoint): ResponsiveBreakpoint | null {
    const order: ResponsiveBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = order.indexOf(current);
    return currentIndex > 0 ? order[currentIndex - 1] : null;
  }

  /**
   * Generate responsive classes for Tailwind CSS
   */
  static generateResponsiveClasses(
    baseClass: string,
    variants: Partial<Record<ResponsiveBreakpoint, string>>
  ): string {
    const classes = [baseClass];
    
    Object.entries(variants).forEach(([breakpoint, variant]) => {
      if (variant && breakpoint !== 'xs') {
        classes.push(`${breakpoint}:${variant}`);
      }
    });
    
    return classes.join(' ');
  }

  /**
   * Calculate grid column width percentage
   */
  static getColumnWidth(columns: number, totalColumns: number = 12): string {
    return `${(columns / totalColumns) * 100}%`;
  }

  /**
   * Generate CSS Grid template columns
   */
  static generateGridTemplate(columns: number | 'auto' | 'fit'): string {
    if (typeof columns === 'number') {
      return `repeat(${columns}, 1fr)`;
    }
    if (columns === 'auto') {
      return 'repeat(auto-fit, minmax(250px, 1fr))';
    }
    if (columns === 'fit') {
      return 'repeat(auto-fill, minmax(200px, 1fr))';
    }
    return 'repeat(12, 1fr)';
  }
}

/**
 * Responsive Value Types
 */
export type ResponsiveValue<T> = T | Partial<Record<ResponsiveBreakpoint, T>>;

/**
 * Responsive Value Resolver
 */
export class ResponsiveValueResolver {
  /**
   * Resolve responsive value for current breakpoint
   */
  static resolve<T>(
    value: ResponsiveValue<T>,
    currentBreakpoint: ResponsiveBreakpoint
  ): T {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const responsiveValue = value as Partial<Record<ResponsiveBreakpoint, T>>;
      
      // Try to find exact match
      if (responsiveValue[currentBreakpoint] !== undefined) {
        return responsiveValue[currentBreakpoint]!;
      }
      
      // Fall back to smaller breakpoints
      const order: ResponsiveBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      const currentIndex = order.indexOf(currentBreakpoint);
      
      for (let i = currentIndex - 1; i >= 0; i--) {
        const bp = order[i];
        if (responsiveValue[bp] !== undefined) {
          return responsiveValue[bp]!;
        }
      }
      
      // Fall back to any available value
      const availableValues = Object.values(responsiveValue).filter(v => v !== undefined);
      if (availableValues.length > 0) {
        return availableValues[0] as T;
      }
    }
    
    return value as T;
  }

  /**
   * Convert responsive value to CSS custom properties
   */
  static toCSSProperties<T>(
    value: ResponsiveValue<T>,
    propertyName: string
  ): Record<string, string> {
    const properties: Record<string, string> = {};
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const responsiveValue = value as Partial<Record<ResponsiveBreakpoint, T>>;
      
      Object.entries(responsiveValue).forEach(([breakpoint, val]) => {
        if (val !== undefined) {
          const bp = breakpoint as ResponsiveBreakpoint;
          const mediaQuery = ResponsiveUtils.getMediaQuery(bp);
          properties[`@media ${mediaQuery}`] = {
            [propertyName]: String(val)
          } as any;
        }
      });
    } else {
      properties[propertyName] = String(value);
    }
    
    return properties;
  }
}

/**
 * Grid System Classes
 */
export const gridClasses = {
  // Container classes
  container: {
    base: 'mx-auto px-4 sm:px-6 lg:px-8',
    fluid: 'w-full px-4 sm:px-6 lg:px-8',
    constrained: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
  },
  
  // Grid classes
  grid: {
    base: 'grid',
    cols1: 'grid-cols-1',
    cols2: 'grid-cols-2',
    cols3: 'grid-cols-3',
    cols4: 'grid-cols-4',
    cols5: 'grid-cols-5',
    cols6: 'grid-cols-6',
    cols7: 'grid-cols-7',
    cols8: 'grid-cols-8',
    cols9: 'grid-cols-9',
    cols10: 'grid-cols-10',
    cols11: 'grid-cols-11',
    cols12: 'grid-cols-12',
    colsAuto: 'grid-cols-auto',
    colsFit: 'grid-cols-fit'
  },
  
  // Gap classes
  gap: {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
    '2xl': 'gap-12'
  },
  
  // Column span classes
  colSpan: {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
    full: 'col-span-full'
  },
  
  // Row span classes
  rowSpan: {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
    4: 'row-span-4',
    5: 'row-span-5',
    6: 'row-span-6',
    full: 'row-span-full'
  }
};

/**
 * Flexbox System Classes
 */
export const flexClasses = {
  // Flex container
  flex: 'flex',
  inlineFlex: 'inline-flex',
  
  // Direction
  direction: {
    row: 'flex-row',
    rowReverse: 'flex-row-reverse',
    col: 'flex-col',
    colReverse: 'flex-col-reverse'
  },
  
  // Wrap
  wrap: {
    wrap: 'flex-wrap',
    nowrap: 'flex-nowrap',
    wrapReverse: 'flex-wrap-reverse'
  },
  
  // Justify content
  justify: {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  },
  
  // Align items
  align: {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch'
  },
  
  // Align content
  alignContent: {
    start: 'content-start',
    end: 'content-end',
    center: 'content-center',
    between: 'content-between',
    around: 'content-around',
    evenly: 'content-evenly'
  },
  
  // Flex grow/shrink
  grow: {
    0: 'flex-grow-0',
    1: 'flex-grow'
  },
  
  shrink: {
    0: 'flex-shrink-0',
    1: 'flex-shrink'
  },
  
  // Flex basis
  basis: {
    auto: 'basis-auto',
    full: 'basis-full',
    '1/2': 'basis-1/2',
    '1/3': 'basis-1/3',
    '2/3': 'basis-2/3',
    '1/4': 'basis-1/4',
    '3/4': 'basis-3/4'
  }
};

/**
 * Responsive Typography Scale
 */
export const responsiveTypography = {
  display: {
    lg: {
      xs: 'text-4xl',
      sm: 'text-5xl',
      md: 'text-6xl',
      lg: 'text-7xl',
      xl: 'text-8xl'
    },
    md: {
      xs: 'text-3xl',
      sm: 'text-4xl',
      md: 'text-5xl',
      lg: 'text-6xl',
      xl: 'text-7xl'
    },
    sm: {
      xs: 'text-2xl',
      sm: 'text-3xl',
      md: 'text-4xl',
      lg: 'text-5xl',
      xl: 'text-6xl'
    }
  },
  
  heading: {
    lg: {
      xs: 'text-xl',
      sm: 'text-2xl',
      md: 'text-3xl',
      lg: 'text-4xl'
    },
    md: {
      xs: 'text-lg',
      sm: 'text-xl',
      md: 'text-2xl',
      lg: 'text-3xl'
    },
    sm: {
      xs: 'text-base',
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl'
    }
  },
  
  body: {
    lg: {
      xs: 'text-base',
      md: 'text-lg'
    },
    md: {
      xs: 'text-sm',
      md: 'text-base'
    },
    sm: {
      xs: 'text-xs',
      md: 'text-sm'
    }
  }
};

/**
 * Responsive Spacing Scale
 */
export const responsiveSpacing = {
  padding: {
    xs: {
      xs: 'p-2',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8'
    },
    sm: {
      xs: 'p-3',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10'
    },
    md: {
      xs: 'p-4',
      sm: 'p-6',
      md: 'p-8',
      lg: 'p-10',
      xl: 'p-12'
    },
    lg: {
      xs: 'p-6',
      sm: 'p-8',
      md: 'p-10',
      lg: 'p-12',
      xl: 'p-16'
    },
    xl: {
      xs: 'p-8',
      sm: 'p-10',
      md: 'p-12',
      lg: 'p-16',
      xl: 'p-20'
    }
  },
  
  margin: {
    xs: {
      xs: 'm-2',
      sm: 'm-3',
      md: 'm-4',
      lg: 'm-6',
      xl: 'm-8'
    },
    sm: {
      xs: 'm-3',
      sm: 'm-4',
      md: 'm-6',
      lg: 'm-8',
      xl: 'm-10'
    },
    md: {
      xs: 'm-4',
      sm: 'm-6',
      md: 'm-8',
      lg: 'm-10',
      xl: 'm-12'
    },
    lg: {
      xs: 'm-6',
      sm: 'm-8',
      md: 'm-10',
      lg: 'm-12',
      xl: 'm-16'
    },
    xl: {
      xs: 'm-8',
      sm: 'm-10',
      md: 'm-12',
      lg: 'm-16',
      xl: 'm-20'
    }
  }
};

/**
 * Layout Utilities
 */
export const layoutUtils = {
  /**
   * Generate responsive container classes
   */
  getContainerClasses: (variant: 'base' | 'fluid' | 'constrained' = 'base'): string => {
    return gridClasses.container[variant];
  },
  
  /**
   * Generate responsive grid classes
   */
  getGridClasses: (columns: ResponsiveValue<number>): string => {
    if (typeof columns === 'number') {
      return `${gridClasses.grid.base} grid-cols-${columns}`;
    }
    
    const classes = [gridClasses.grid.base];
    Object.entries(columns).forEach(([breakpoint, cols]) => {
      if (cols !== undefined) {
        const prefix = breakpoint === 'xs' ? '' : `${breakpoint}:`;
        classes.push(`${prefix}grid-cols-${cols}`);
      }
    });
    
    return classes.join(' ');
  },
  
  /**
   * Generate responsive gap classes
   */
  getGapClasses: (gap: ResponsiveValue<keyof typeof gridClasses.gap>): string => {
    if (typeof gap === 'string') {
      return gridClasses.gap[gap];
    }
    
    const classes: string[] = [];
    Object.entries(gap).forEach(([breakpoint, gapSize]) => {
      if (gapSize !== undefined) {
        const prefix = breakpoint === 'xs' ? '' : `${breakpoint}:`;
        classes.push(`${prefix}${gridClasses.gap[gapSize]}`);
      }
    });
    
    return classes.join(' ');
  },
  
  /**
   * Generate responsive flex classes
   */
  getFlexClasses: (config: {
    direction?: ResponsiveValue<keyof typeof flexClasses.direction>;
    justify?: ResponsiveValue<keyof typeof flexClasses.justify>;
    align?: ResponsiveValue<keyof typeof flexClasses.align>;
    wrap?: ResponsiveValue<keyof typeof flexClasses.wrap>;
  }): string => {
    const classes = [flexClasses.flex];
    
    Object.entries(config).forEach(([property, value]) => {
      if (value !== undefined) {
        if (typeof value === 'string') {
          classes.push((flexClasses as any)[property][value]);
        } else {
          Object.entries(value).forEach(([breakpoint, val]) => {
            if (val !== undefined) {
              const prefix = breakpoint === 'xs' ? '' : `${breakpoint}:`;
              classes.push(`${prefix}${(flexClasses as any)[property][val]}`);
            }
          });
        }
      }
    });
    
    return classes.join(' ');
  }
};

// All responsive utilities are exported as named exports above

export type {
  ResponsiveValue,
  ResponsiveBreakpoint
};