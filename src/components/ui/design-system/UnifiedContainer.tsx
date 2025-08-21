/**
 * UnifiedContainer Component
 * A comprehensive container component for layout and content organization
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import type { ContainerProps } from './types';

// Container variants using class-variance-authority
const containerVariants = cva(
  // Base styles
  'mx-auto w-full',
  {
    variants: {
      maxWidth: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
        full: 'max-w-full',
        screen: 'max-w-screen-2xl'
      },
      padding: {
        none: 'px-0',
        xs: 'px-2',
        sm: 'px-4',
        md: 'px-6',
        lg: 'px-8',
        xl: 'px-12',
        '2xl': 'px-16'
      },
      responsive: {
        true: 'px-4 sm:px-6 lg:px-8'
      }
    },
    defaultVariants: {
      maxWidth: '7xl',
      padding: 'md'
    }
  }
);

// Section container variants
const sectionVariants = cva(
  'w-full',
  {
    variants: {
      spacing: {
        none: 'py-0',
        xs: 'py-4',
        sm: 'py-6',
        md: 'py-8',
        lg: 'py-12',
        xl: 'py-16',
        '2xl': 'py-20'
      },
      background: {
        none: 'bg-transparent',
        white: 'bg-white',
        gray: 'bg-gray-50',
        primary: 'bg-blue-50',
        secondary: 'bg-gray-100',
        gradient: 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      },
      border: {
        none: 'border-0',
        top: 'border-t border-gray-200',
        bottom: 'border-b border-gray-200',
        both: 'border-t border-b border-gray-200',
        all: 'border border-gray-200 rounded-lg'
      }
    },
    defaultVariants: {
      spacing: 'md',
      background: 'none',
      border: 'none'
    }
  }
);

// Flex container variants
const flexVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        row: 'flex-row',
        'row-reverse': 'flex-row-reverse',
        col: 'flex-col',
        'col-reverse': 'flex-col-reverse'
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline'
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly'
      },
      wrap: {
        nowrap: 'flex-nowrap',
        wrap: 'flex-wrap',
        'wrap-reverse': 'flex-wrap-reverse'
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
        '2xl': 'gap-12'
      }
    },
    defaultVariants: {
      direction: 'row',
      align: 'start',
      justify: 'start',
      wrap: 'nowrap',
      gap: 'md'
    }
  }
);

export interface UnifiedContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants>,
    ContainerProps {
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
  responsive?: boolean;
}

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: 'section' | 'div' | 'article' | 'main' | 'aside' | 'header' | 'footer';
  container?: boolean;
  containerProps?: Omit<UnifiedContainerProps, 'children'>;
}

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
}

/**
 * UnifiedContainer - A comprehensive container component for layout
 * 
 * Features:
 * - Multiple max-width options (sm to 7xl, full, screen)
 * - Flexible padding options (none to 2xl)
 * - Responsive padding support
 * - Semantic HTML element support
 * - Consistent spacing and alignment
 */
export const UnifiedContainer = React.forwardRef<HTMLDivElement, UnifiedContainerProps>(
  (
    {
      className,
      maxWidth,
      padding,
      responsive,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({ maxWidth, padding: responsive ? undefined : padding, responsive }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

UnifiedContainer.displayName = 'UnifiedContainer';

/**
 * Section - A semantic section component with optional container
 * 
 * Features:
 * - Semantic section element
 * - Built-in spacing options
 * - Background variants
 * - Border options
 * - Optional inner container
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      spacing,
      background,
      border,
      container = false,
      containerProps,
      as: Component = 'section',
      children,
      ...props
    },
    ref
  ) => {
    const content = container ? (
      <UnifiedContainer {...containerProps}>
        {children}
      </UnifiedContainer>
    ) : (
      children
    );

    return (
      <Component
        ref={ref}
        className={cn(
          sectionVariants({ spacing, background, border }),
          className
        )}
        {...props}
      >
        {content}
      </Component>
    );
  }
);

Section.displayName = 'Section';

/**
 * Flex - A flexible layout component with comprehensive flexbox options
 * 
 * Features:
 * - All flexbox properties (direction, align, justify, wrap, gap)
 * - Semantic HTML element support
 * - Consistent spacing options
 * - Responsive-friendly defaults
 */
export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      direction,
      align,
      justify,
      wrap,
      gap,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          flexVariants({ direction, align, justify, wrap, gap }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Flex.displayName = 'Flex';

// Specialized layout components

/**
 * Stack - Vertical flex container with consistent spacing
 */
export interface StackProps extends Omit<FlexProps, 'direction'> {
  spacing?: VariantProps<typeof flexVariants>['gap'];
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ spacing, gap, ...props }, ref) => (
    <Flex
      ref={ref}
      direction="col"
      gap={spacing || gap}
      {...props}
    />
  )
);

Stack.displayName = 'Stack';

/**
 * HStack - Horizontal flex container with consistent spacing
 */
export interface HStackProps extends Omit<FlexProps, 'direction'> {
  spacing?: VariantProps<typeof flexVariants>['gap'];
}

export const HStack = React.forwardRef<HTMLDivElement, HStackProps>(
  ({ spacing, gap, ...props }, ref) => (
    <Flex
      ref={ref}
      direction="row"
      gap={spacing || gap}
      {...props}
    />
  )
);

HStack.displayName = 'HStack';

/**
 * Center - Centered flex container
 */
export interface CenterProps extends FlexProps {}

export const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  (props, ref) => (
    <Flex
      ref={ref}
      align="center"
      justify="center"
      {...props}
    />
  )
);

Center.displayName = 'Center';

// Export container variants for external use
export { containerVariants, sectionVariants, flexVariants };