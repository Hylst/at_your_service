/**
 * UnifiedGrid Component
 * A comprehensive grid system for responsive layouts
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import type { GridProps, ResponsiveValue } from './types';

// Grid container variants
const gridVariants = cva(
  'grid',
  {
    variants: {
      columns: {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        7: 'grid-cols-7',
        8: 'grid-cols-8',
        9: 'grid-cols-9',
        10: 'grid-cols-10',
        11: 'grid-cols-11',
        12: 'grid-cols-12',
        none: 'grid-cols-none',
        subgrid: 'grid-cols-subgrid'
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
        '2xl': 'gap-12'
      },
      gapX: {
        none: 'gap-x-0',
        xs: 'gap-x-1',
        sm: 'gap-x-2',
        md: 'gap-x-4',
        lg: 'gap-x-6',
        xl: 'gap-x-8',
        '2xl': 'gap-x-12'
      },
      gapY: {
        none: 'gap-y-0',
        xs: 'gap-y-1',
        sm: 'gap-y-2',
        md: 'gap-y-4',
        lg: 'gap-y-6',
        xl: 'gap-y-8',
        '2xl': 'gap-y-12'
      },
      autoFlow: {
        row: 'grid-flow-row',
        col: 'grid-flow-col',
        'row-dense': 'grid-flow-row-dense',
        'col-dense': 'grid-flow-col-dense'
      },
      autoRows: {
        auto: 'auto-rows-auto',
        min: 'auto-rows-min',
        max: 'auto-rows-max',
        fr: 'auto-rows-fr'
      },
      autoCols: {
        auto: 'auto-cols-auto',
        min: 'auto-cols-min',
        max: 'auto-cols-max',
        fr: 'auto-cols-fr'
      }
    },
    defaultVariants: {
      columns: 1,
      gap: 'md',
      autoFlow: 'row'
    }
  }
);

// Grid item variants
const gridItemVariants = cva(
  '',
  {
    variants: {
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
        full: 'col-span-full',
        auto: 'col-auto'
      },
      rowSpan: {
        1: 'row-span-1',
        2: 'row-span-2',
        3: 'row-span-3',
        4: 'row-span-4',
        5: 'row-span-5',
        6: 'row-span-6',
        full: 'row-span-full',
        auto: 'row-auto'
      },
      colStart: {
        1: 'col-start-1',
        2: 'col-start-2',
        3: 'col-start-3',
        4: 'col-start-4',
        5: 'col-start-5',
        6: 'col-start-6',
        7: 'col-start-7',
        8: 'col-start-8',
        9: 'col-start-9',
        10: 'col-start-10',
        11: 'col-start-11',
        12: 'col-start-12',
        13: 'col-start-13',
        auto: 'col-start-auto'
      },
      colEnd: {
        1: 'col-end-1',
        2: 'col-end-2',
        3: 'col-end-3',
        4: 'col-end-4',
        5: 'col-end-5',
        6: 'col-end-6',
        7: 'col-end-7',
        8: 'col-end-8',
        9: 'col-end-9',
        10: 'col-end-10',
        11: 'col-end-11',
        12: 'col-end-12',
        13: 'col-end-13',
        auto: 'col-end-auto'
      },
      rowStart: {
        1: 'row-start-1',
        2: 'row-start-2',
        3: 'row-start-3',
        4: 'row-start-4',
        5: 'row-start-5',
        6: 'row-start-6',
        7: 'row-start-7',
        auto: 'row-start-auto'
      },
      rowEnd: {
        1: 'row-end-1',
        2: 'row-end-2',
        3: 'row-end-3',
        4: 'row-end-4',
        5: 'row-end-5',
        6: 'row-end-6',
        7: 'row-end-7',
        auto: 'row-end-auto'
      }
    }
  }
);

// Helper function to generate responsive grid classes
function generateResponsiveGridClasses(columns: ResponsiveValue<number> | number): string {
  if (typeof columns === 'number') {
    return `grid-cols-${columns}`;
  }

  const classes: string[] = [];
  
  if (columns.base) classes.push(`grid-cols-${columns.base}`);
  if (columns.sm) classes.push(`sm:grid-cols-${columns.sm}`);
  if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
  if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
  if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);
  if (columns['2xl']) classes.push(`2xl:grid-cols-${columns['2xl']}`);

  return classes.join(' ');
}

export interface UnifiedGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof gridVariants>, 'columns'>,
    GridProps {
  as?: 'div' | 'section' | 'article' | 'main' | 'aside';
  columns?: ResponsiveValue<number> | number;
  rows?: ResponsiveValue<number> | number;
  minItemWidth?: string;
  autoFit?: boolean;
  autoFill?: boolean;
}

export interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {
  as?: 'div' | 'section' | 'article' | 'main' | 'aside';
  area?: string;
}

/**
 * UnifiedGrid - A comprehensive grid system for responsive layouts
 * 
 * Features:
 * - Responsive column configuration
 * - Flexible gap options (uniform, x-axis, y-axis)
 * - Auto-flow control (row, column, dense)
 * - Auto-sizing options (rows, columns)
 * - CSS Grid and auto-fit/auto-fill support
 * - Semantic HTML element support
 */
export const UnifiedGrid = React.forwardRef<HTMLDivElement, UnifiedGridProps>(
  (
    {
      className,
      columns = 1,
      rows,
      gap,
      gapX,
      gapY,
      autoFlow,
      autoRows,
      autoCols,
      minItemWidth,
      autoFit,
      autoFill,
      as: Component = 'div',
      children,
      style,
      ...props
    },
    ref
  ) => {
    // Generate responsive classes for columns
    const responsiveColumnsClass = typeof columns === 'object' 
      ? generateResponsiveGridClasses(columns)
      : undefined;

    // Generate CSS Grid template for auto-fit/auto-fill
    const gridTemplateColumns = React.useMemo(() => {
      if (minItemWidth && (autoFit || autoFill)) {
        const repeatType = autoFit ? 'auto-fit' : 'auto-fill';
        return `repeat(${repeatType}, minmax(${minItemWidth}, 1fr))`;
      }
      return undefined;
    }, [minItemWidth, autoFit, autoFill]);

    const gridTemplateRows = React.useMemo(() => {
      if (typeof rows === 'number') {
        return `repeat(${rows}, minmax(0, 1fr))`;
      }
      return undefined;
    }, [rows]);

    const gridStyle = {
      ...style,
      ...(gridTemplateColumns && { gridTemplateColumns }),
      ...(gridTemplateRows && { gridTemplateRows })
    };

    return (
      <Component
        ref={ref}
        className={cn(
          'grid',
          // Use responsive classes if provided, otherwise use variant
          responsiveColumnsClass || (typeof columns === 'number' ? gridVariants({ columns }) : ''),
          gridVariants({ gap, gapX, gapY, autoFlow, autoRows, autoCols }),
          className
        )}
        style={gridStyle}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

UnifiedGrid.displayName = 'UnifiedGrid';

/**
 * GridItem - A grid item component with positioning and spanning options
 * 
 * Features:
 * - Column and row spanning
 * - Precise positioning (start/end)
 * - Grid area assignment
 * - Semantic HTML element support
 */
export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      className,
      colSpan,
      rowSpan,
      colStart,
      colEnd,
      rowStart,
      rowEnd,
      area,
      as: Component = 'div',
      children,
      style,
      ...props
    },
    ref
  ) => {
    const gridStyle = {
      ...style,
      ...(area && { gridArea: area })
    };

    return (
      <Component
        ref={ref}
        className={cn(
          gridItemVariants({ colSpan, rowSpan, colStart, colEnd, rowStart, rowEnd }),
          className
        )}
        style={gridStyle}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

GridItem.displayName = 'GridItem';

// Specialized grid components

/**
 * ResponsiveGrid - Pre-configured responsive grid with common breakpoints
 */
export interface ResponsiveGridProps extends Omit<UnifiedGridProps, 'columns'> {
  columns?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export const ResponsiveGrid = React.forwardRef<HTMLDivElement, ResponsiveGridProps>(
  ({ columns = { base: 1, sm: 2, md: 3, lg: 4 }, ...props }, ref) => (
    <UnifiedGrid
      ref={ref}
      columns={columns}
      {...props}
    />
  )
);

ResponsiveGrid.displayName = 'ResponsiveGrid';

/**
 * AutoGrid - Auto-sizing grid with minimum item width
 */
export interface AutoGridProps extends Omit<UnifiedGridProps, 'columns' | 'autoFit' | 'autoFill'> {
  minItemWidth: string;
  type?: 'fit' | 'fill';
}

export const AutoGrid = React.forwardRef<HTMLDivElement, AutoGridProps>(
  ({ minItemWidth, type = 'fit', ...props }, ref) => (
    <UnifiedGrid
      ref={ref}
      minItemWidth={minItemWidth}
      autoFit={type === 'fit'}
      autoFill={type === 'fill'}
      {...props}
    />
  )
);

AutoGrid.displayName = 'AutoGrid';

/**
 * MasonryGrid - Masonry-style grid layout
 */
export interface MasonryGridProps extends Omit<UnifiedGridProps, 'autoFlow' | 'autoRows'> {}

export const MasonryGrid = React.forwardRef<HTMLDivElement, MasonryGridProps>(
  (props, ref) => (
    <UnifiedGrid
      ref={ref}
      autoFlow="row-dense"
      autoRows="min"
      {...props}
    />
  )
);

MasonryGrid.displayName = 'MasonryGrid';

// Export grid variants for external use
export { gridVariants, gridItemVariants, generateResponsiveGridClasses };