/**
 * UnifiedInput Component
 * A comprehensive input component with consistent styling and behavior
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import type { InputProps } from './types';

// Input variants using class-variance-authority
const inputVariants = cva(
  // Base styles
  [
    'flex w-full border border-gray-300 bg-white px-3 py-2',
    'text-sm text-gray-900 placeholder:text-gray-500',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium'
  ],
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:border-blue-500',
        primary: 'border-blue-300 focus:border-blue-500 focus:ring-blue-500',
        secondary: 'border-gray-300 focus:border-gray-500 focus:ring-gray-500',
        success: 'border-green-300 focus:border-green-500 focus:ring-green-500',
        warning: 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500',
        error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
        ghost: 'border-transparent bg-gray-50 focus:bg-white focus:border-gray-300',
        outline: 'border-gray-300 bg-transparent focus:bg-white'
      },
      size: {
        xs: 'h-7 px-2 text-xs rounded-md',
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-3 text-sm rounded-lg',
        lg: 'h-12 px-4 text-base rounded-lg',
        xl: 'h-14 px-6 text-lg rounded-xl'
      },
      hasLeftIcon: {
        true: 'pl-10'
      },
      hasRightIcon: {
        true: 'pr-10'
      },
      error: {
        true: 'border-red-300 focus:border-red-500 focus:ring-red-500'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

// Container variants for input wrapper
const containerVariants = cva('relative flex flex-col', {
  variants: {
    fullWidth: {
      true: 'w-full'
    }
  }
});

// Icon wrapper variants
const iconVariants = cva(
  'absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 pointer-events-none',
  {
    variants: {
      position: {
        left: 'left-3',
        right: 'right-3'
      },
      size: {
        xs: 'w-3 h-3',
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
        xl: 'w-6 h-6'
      }
    }
  }
);

// Label variants
const labelVariants = cva(
  'block text-sm font-medium text-gray-700 mb-1',
  {
    variants: {
      required: {
        true: "after:content-['*'] after:ml-1 after:text-red-500"
      },
      error: {
        true: 'text-red-700'
      }
    }
  }
);

// Helper text variants
const helperTextVariants = cva(
  'mt-1 text-xs',
  {
    variants: {
      error: {
        true: 'text-red-600',
        false: 'text-gray-500'
      }
    }
  }
);

export interface UnifiedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants>,
    InputProps {
  label?: string;
  fullWidth?: boolean;
}

/**
 * UnifiedInput - A comprehensive input component with consistent styling
 * 
 * Features:
 * - Multiple variants (default, primary, secondary, success, warning, error, ghost, outline)
 * - Different sizes (xs, sm, md, lg, xl)
 * - Left and right icons support
 * - Label and helper text
 * - Error state with validation styling
 * - Full width option
 * - Proper focus management and accessibility
 * - Consistent animations and transitions
 */
export const UnifiedInput = React.forwardRef<HTMLInputElement, UnifiedInputProps>(
  (
    {
      className,
      variant,
      size = 'md',
      type = 'text',
      label,
      leftIcon,
      rightIcon,
      error,
      helperText,
      required,
      fullWidth = true,
      disabled,
      readOnly,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();
    const hasLeftIcon = Boolean(leftIcon);
    const hasRightIcon = Boolean(rightIcon);
    const hasError = Boolean(error);
    const showHelperText = Boolean(helperText);

    return (
      <div className={cn(containerVariants({ fullWidth }))}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(labelVariants({ required, error: hasError }))}
          >
            {label}
          </label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className={cn(iconVariants({ position: 'left', size }))}>
              {leftIcon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              inputVariants({
                variant,
                size,
                hasLeftIcon,
                hasRightIcon,
                error: hasError
              }),
              className
            )}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-invalid={hasError}
            aria-describedby={showHelperText ? `${inputId}-helper` : undefined}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <div className={cn(iconVariants({ position: 'right', size }))}>
              {rightIcon}
            </div>
          )}
        </div>

        {/* Helper text */}
        {showHelperText && (
          <p
            id={`${inputId}-helper`}
            className={cn(helperTextVariants({ error: hasError }))}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

UnifiedInput.displayName = 'UnifiedInput';

// Export input variants for external use
export { inputVariants, containerVariants, iconVariants, labelVariants, helperTextVariants };