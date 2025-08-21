/**
 * UnifiedTypography Component
 * A comprehensive typography component with consistent styling
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import type { TypographyProps } from './types';

// Typography variants using class-variance-authority
const typographyVariants = cva(
  // Base styles
  'text-gray-900',
  {
    variants: {
      size: {
        xs: 'text-xs leading-4',
        sm: 'text-sm leading-5',
        base: 'text-base leading-6',
        lg: 'text-lg leading-7',
        xl: 'text-xl leading-7',
        '2xl': 'text-2xl leading-8',
        '3xl': 'text-3xl leading-9',
        '4xl': 'text-4xl leading-10',
        '5xl': 'text-5xl leading-none',
        '6xl': 'text-6xl leading-none',
        '7xl': 'text-7xl leading-none',
        '8xl': 'text-8xl leading-none',
        '9xl': 'text-9xl leading-none'
      },
      weight: {
        thin: 'font-thin',
        extralight: 'font-extralight',
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
        black: 'font-black'
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
      },
      variant: {
        default: 'text-gray-900',
        primary: 'text-blue-600',
        secondary: 'text-gray-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        error: 'text-red-600',
        muted: 'text-gray-500',
        accent: 'text-purple-600',
        gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
      },
      family: {
        sans: 'font-sans',
        serif: 'font-serif',
        mono: 'font-mono',
        display: 'font-sans' // Can be customized with display font
      },
      truncate: {
        true: 'truncate',
        false: ''
      },
      uppercase: {
        true: 'uppercase',
        false: ''
      },
      italic: {
        true: 'italic',
        false: ''
      },
      underline: {
        true: 'underline',
        false: ''
      }
    },
    defaultVariants: {
      size: 'base',
      weight: 'normal',
      align: 'left',
      variant: 'default',
      family: 'sans',
      truncate: false,
      uppercase: false,
      italic: false,
      underline: false
    }
  }
);

// Heading-specific variants
const headingVariants = cva(
  'font-semibold tracking-tight',
  {
    variants: {
      level: {
        1: 'text-4xl lg:text-5xl',
        2: 'text-3xl lg:text-4xl',
        3: 'text-2xl lg:text-3xl',
        4: 'text-xl lg:text-2xl',
        5: 'text-lg lg:text-xl',
        6: 'text-base lg:text-lg'
      },
      variant: {
        default: 'text-gray-900',
        primary: 'text-blue-600',
        secondary: 'text-gray-600',
        gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
      }
    },
    defaultVariants: {
      level: 1,
      variant: 'default'
    }
  }
);

// Text-specific variants
const textVariants = cva(
  '',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
      },
      variant: {
        default: 'text-gray-900',
        muted: 'text-gray-600',
        subtle: 'text-gray-500',
        primary: 'text-blue-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        error: 'text-red-600'
      }
    },
    defaultVariants: {
      size: 'base',
      variant: 'default'
    }
  }
);

export interface UnifiedTypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants>,
    TypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label' | 'legend';
  color?: string;
  uppercase?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'label';
}

/**
 * UnifiedTypography - A comprehensive typography component
 * 
 * Features:
 * - Multiple sizes (xs to 9xl)
 * - Font weights (thin to black)
 * - Text alignment options
 * - Color variants and custom colors
 * - Font family options
 * - Text decorations (truncate, uppercase, italic, underline)
 * - Semantic HTML element support
 * - Gradient text support
 */
export const UnifiedTypography = React.forwardRef<HTMLElement, UnifiedTypographyProps>(
  (
    {
      className,
      as: Component = 'p',
      size,
      weight,
      align,
      variant,
      family,
      color,
      truncate,
      uppercase,
      italic,
      underline,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const customStyle = {
      ...style,
      ...(color && !variant && { color })
    };

    return (
      <Component
        ref={ref}
        className={cn(
          typographyVariants({
            size,
            weight,
            align,
            variant: color ? undefined : variant,
            family,
            truncate,
            uppercase,
            italic,
            underline
          }),
          className
        )}
        style={customStyle}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

UnifiedTypography.displayName = 'UnifiedTypography';

/**
 * Heading - Semantic heading component with responsive sizing
 * 
 * Features:
 * - Semantic heading levels (h1-h6)
 * - Responsive font sizes
 * - Color variants including gradient
 * - Proper font weight and tracking
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      level = 1,
      variant,
      children,
      ...props
    },
    ref
  ) => {
    const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    return (
      <Component
        ref={ref}
        className={cn(
          headingVariants({ level, variant }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

/**
 * Text - Simple text component with common variants
 * 
 * Features:
 * - Common text sizes
 * - Semantic color variants
 * - Flexible element rendering
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      as: Component = 'p',
      size,
      variant,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          textVariants({ size, variant }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

// Specialized typography components

/**
 * Label - Form label component
 */
export interface LabelProps extends Omit<TextProps, 'as'> {
  htmlFor?: string;
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <Text
      ref={ref}
      as="label"
      size="sm"
      variant="default"
      className={cn(
        'font-medium',
        required && "after:content-['*'] after:ml-1 after:text-red-500",
        className
      )}
      {...props}
    >
      {children}
    </Text>
  )
);

Label.displayName = 'Label';

/**
 * Caption - Small descriptive text
 */
export interface CaptionProps extends Omit<TextProps, 'size'> {}

export const Caption = React.forwardRef<HTMLElement, CaptionProps>(
  ({ variant = 'muted', ...props }, ref) => (
    <Text
      ref={ref}
      size="xs"
      variant={variant}
      {...props}
    />
  )
);

Caption.displayName = 'Caption';

/**
 * Lead - Large introductory text
 */
export interface LeadProps extends Omit<TextProps, 'size'> {}

export const Lead = React.forwardRef<HTMLElement, LeadProps>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      size="lg"
      className={cn('text-gray-600 leading-relaxed', className)}
      {...props}
    />
  )
);

Lead.displayName = 'Lead';

/**
 * Code - Inline code component
 */
export interface CodeProps extends Omit<UnifiedTypographyProps, 'family' | 'as'> {}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, ...props }, ref) => (
    <UnifiedTypography
      ref={ref}
      as="code"
      family="mono"
      size="sm"
      className={cn(
        'bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded border',
        className
      )}
      {...props}
    />
  )
);

Code.displayName = 'Code';

/**
 * Kbd - Keyboard key component
 */
export interface KbdProps extends Omit<UnifiedTypographyProps, 'family' | 'as'> {}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, ...props }, ref) => (
    <UnifiedTypography
      ref={ref}
      as="kbd"
      family="mono"
      size="xs"
      className={cn(
        'bg-gray-100 text-gray-800 px-2 py-1 rounded border border-gray-300 shadow-sm',
        'font-semibold uppercase tracking-wider',
        className
      )}
      {...props}
    />
  )
);

Kbd.displayName = 'Kbd';

// Export typography variants for external use
export { typographyVariants, headingVariants, textVariants };