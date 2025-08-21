/**
 * UnifiedCard Component
 * A comprehensive card component with consistent styling and behavior
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import type { CardProps } from './types';

// Card variants using class-variance-authority
const cardVariants = cva(
  // Base styles
  [
    'rounded-lg bg-white border transition-all duration-200',
    'overflow-hidden'
  ],
  {
    variants: {
      variant: {
        default: 'border-gray-200 shadow-sm',
        primary: 'border-blue-200 shadow-sm bg-blue-50/30',
        secondary: 'border-gray-200 shadow-sm bg-gray-50/30',
        success: 'border-green-200 shadow-sm bg-green-50/30',
        warning: 'border-yellow-200 shadow-sm bg-yellow-50/30',
        error: 'border-red-200 shadow-sm bg-red-50/30',
        ghost: 'border-transparent shadow-none bg-transparent',
        outline: 'border-gray-300 shadow-none bg-transparent'
      },
      size: {
        xs: 'p-2',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8'
      },
      shadow: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
        '2xl': 'shadow-2xl'
      },
      hover: {
        true: 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
        false: ''
      },
      interactive: {
        true: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer',
        false: ''
      },
      border: {
        true: '',
        false: 'border-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shadow: 'sm',
      hover: false,
      interactive: false,
      border: true
    }
  }
);

// Card header variants
const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5 p-6',
  {
    variants: {
      size: {
        xs: 'p-2',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

// Card content variants
const cardContentVariants = cva(
  'p-6 pt-0',
  {
    variants: {
      size: {
        xs: 'p-2 pt-0',
        sm: 'p-3 pt-0',
        md: 'p-4 pt-0',
        lg: 'p-6 pt-0',
        xl: 'p-8 pt-0'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

// Card footer variants
const cardFooterVariants = cva(
  'flex items-center p-6 pt-0',
  {
    variants: {
      size: {
        xs: 'p-2 pt-0',
        sm: 'p-3 pt-0',
        md: 'p-4 pt-0',
        lg: 'p-6 pt-0',
        xl: 'p-8 pt-0'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

export interface UnifiedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants>,
    CardProps {
  as?: 'div' | 'article' | 'section';
}

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

/**
 * UnifiedCard - A comprehensive card component with consistent styling
 * 
 * Features:
 * - Multiple variants (default, primary, secondary, success, warning, error, ghost, outline)
 * - Different sizes (xs, sm, md, lg, xl)
 * - Shadow options (none, sm, md, lg, xl, 2xl)
 * - Hover effects and interactive states
 * - Composable structure (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
 * - Proper semantic HTML support
 * - Consistent animations and transitions
 */
export const UnifiedCard = React.forwardRef<HTMLDivElement, UnifiedCardProps>(
  (
    {
      className,
      variant,
      size,
      shadow,
      hover,
      interactive,
      border,
      as: Component = 'div',
      children,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (interactive && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onClick?.(event as any);
      }
      onKeyDown?.(event);
    };

    return (
      <Component
        ref={ref}
        className={cn(
          cardVariants({ variant, size, shadow, hover, interactive, border }),
          className
        )}
        onClick={interactive ? onClick : undefined}
        onKeyDown={interactive ? handleKeyDown : onKeyDown}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? 'button' : undefined}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

UnifiedCard.displayName = 'UnifiedCard';

/**
 * CardHeader - Header section of the card
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ size }), className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle - Title element for the card header
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight text-gray-900',
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription - Description element for the card header
 */
export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-600', className)}
      {...props}
    />
  )
);

CardDescription.displayName = 'CardDescription';

/**
 * CardContent - Main content area of the card
 */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants({ size }), className)}
      {...props}
    />
  )
);

CardContent.displayName = 'CardContent';

/**
 * CardFooter - Footer section of the card
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ size }), className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

// Export card variants for external use
export {
  cardVariants,
  cardHeaderVariants,
  cardContentVariants,
  cardFooterVariants
};