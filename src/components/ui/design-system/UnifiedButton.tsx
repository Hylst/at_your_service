/**
 * UnifiedButton Component
 * A comprehensive button component with consistent styling and behavior
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import type { ButtonProps } from './types';

// Button variants using class-variance-authority
const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'relative overflow-hidden',
    'select-none'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-gray-900 text-white hover:bg-gray-800',
          'border border-gray-900 hover:border-gray-800',
          'focus-visible:ring-gray-500'
        ],
        primary: [
          'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
          'hover:from-blue-700 hover:to-purple-700',
          'border border-transparent',
          'focus-visible:ring-blue-500',
          'shadow-lg hover:shadow-xl'
        ],
        secondary: [
          'bg-gray-100 text-gray-900 hover:bg-gray-200',
          'border border-gray-300 hover:border-gray-400',
          'focus-visible:ring-gray-500'
        ],
        success: [
          'bg-green-600 text-white hover:bg-green-700',
          'border border-green-600 hover:border-green-700',
          'focus-visible:ring-green-500'
        ],
        warning: [
          'bg-yellow-600 text-white hover:bg-yellow-700',
          'border border-yellow-600 hover:border-yellow-700',
          'focus-visible:ring-yellow-500'
        ],
        error: [
          'bg-red-600 text-white hover:bg-red-700',
          'border border-red-600 hover:border-red-700',
          'focus-visible:ring-red-500'
        ],
        ghost: [
          'bg-transparent text-gray-700 hover:bg-gray-100',
          'border border-transparent hover:border-gray-300',
          'focus-visible:ring-gray-500'
        ],
        outline: [
          'bg-transparent text-gray-700 hover:bg-gray-50',
          'border border-gray-300 hover:border-gray-400',
          'focus-visible:ring-gray-500'
        ]
      },
      size: {
        xs: 'h-7 px-2 text-xs rounded-md',
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-sm rounded-lg',
        lg: 'h-12 px-6 text-base rounded-lg',
        xl: 'h-14 px-8 text-lg rounded-xl'
      },
      fullWidth: {
        true: 'w-full'
      },
      loading: {
        true: 'cursor-wait'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

// Loading spinner component
const LoadingSpinner: React.FC<{ size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }> = ({ size }) => {
  const spinnerSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  return (
    <svg
      className={cn('animate-spin', spinnerSizes[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

// Icon wrapper component
const IconWrapper: React.FC<{ children: React.ReactNode; size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }> = ({ children, size }) => {
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  return (
    <span className={cn('flex-shrink-0', iconSizes[size])}>
      {children}
    </span>
  );
};

export interface UnifiedButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
    VariantProps<typeof buttonVariants>,
    ButtonProps {}

/**
 * UnifiedButton - A comprehensive button component with consistent styling
 * 
 * Features:
 * - Multiple variants (default, primary, secondary, success, warning, error, ghost, outline)
 * - Different sizes (xs, sm, md, lg, xl)
 * - Loading state with spinner
 * - Left and right icons support
 * - Full width option
 * - Proper focus management and accessibility
 * - Consistent animations and transitions
 */
export const UnifiedButton = React.forwardRef<HTMLButtonElement, UnifiedButtonProps>(
  (
    {
      className,
      variant,
      size = 'md',
      fullWidth,
      loading,
      disabled,
      leftIcon,
      rightIcon,
      children,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          buttonVariants({ variant, size, fullWidth, loading }),
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {/* Left icon or loading spinner */}
        {loading ? (
          <LoadingSpinner size={size} />
        ) : leftIcon ? (
          <IconWrapper size={size}>{leftIcon}</IconWrapper>
        ) : null}

        {/* Button content */}
        <span className={cn('flex-1', { 'opacity-0': loading && !leftIcon && !rightIcon })}>
          {children}
        </span>

        {/* Right icon */}
        {rightIcon && !loading && (
          <IconWrapper size={size}>{rightIcon}</IconWrapper>
        )}

        {/* Ripple effect overlay */}
        <span className="absolute inset-0 overflow-hidden rounded-[inherit]">
          <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-200 group-active:opacity-100" />
        </span>
      </button>
    );
  }
);

UnifiedButton.displayName = 'UnifiedButton';

// Export button variants for external use
export { buttonVariants };