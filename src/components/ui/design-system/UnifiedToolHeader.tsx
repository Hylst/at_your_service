/**
 * UnifiedToolHeader Component
 * A comprehensive header component for creativity tools
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import { UnifiedBadge } from './UnifiedBadge';
import { Heading, Text } from './UnifiedTypography';
import type { ToolHeaderProps } from './types';

// Tool header variants
const toolHeaderVariants = cva(
  'relative overflow-hidden rounded-xl border transition-all duration-300',
  {
    variants: {
      gradient: {
        primary: 'bg-gradient-to-br from-blue-50 via-white to-blue-100 border-blue-200',
        secondary: 'bg-gradient-to-br from-gray-50 via-white to-gray-100 border-gray-200',
        success: 'bg-gradient-to-br from-green-50 via-white to-green-100 border-green-200',
        warning: 'bg-gradient-to-br from-yellow-50 via-white to-yellow-100 border-yellow-200',
        error: 'bg-gradient-to-br from-red-50 via-white to-red-100 border-red-200',
        creative: 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-purple-200',
        none: 'bg-white border-gray-200'
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
      },
      interactive: {
        true: 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer',
        false: ''
      }
    },
    defaultVariants: {
      gradient: 'primary',
      size: 'md',
      interactive: false
    }
  }
);

// Icon container variants
const iconContainerVariants = cva(
  'flex items-center justify-center rounded-lg transition-all duration-200',
  {
    variants: {
      size: {
        sm: 'w-10 h-10',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
      },
      gradient: {
        primary: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg',
        secondary: 'bg-gradient-to-br from-gray-500 to-gray-600 text-white shadow-lg',
        success: 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg',
        warning: 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg',
        error: 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg',
        creative: 'bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg',
        none: 'bg-gray-100 text-gray-600'
      }
    },
    defaultVariants: {
      size: 'md',
      gradient: 'primary'
    }
  }
);

// Badge container variants
const badgeContainerVariants = cva(
  'flex flex-wrap gap-2',
  {
    variants: {
      alignment: {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end'
      }
    },
    defaultVariants: {
      alignment: 'left'
    }
  }
);

// Actions container variants
const actionsContainerVariants = cva(
  'flex items-center gap-2',
  {
    variants: {
      alignment: {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end'
      }
    },
    defaultVariants: {
      alignment: 'right'
    }
  }
);

export interface UnifiedToolHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toolHeaderVariants>,
    ToolHeaderProps {
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  badgeAlignment?: 'left' | 'center' | 'right';
  actionsAlignment?: 'left' | 'center' | 'right';
  showDivider?: boolean;
}

/**
 * UnifiedToolHeader - A comprehensive header component for creativity tools
 * 
 * Features:
 * - Multiple gradient themes (primary, secondary, success, warning, error, creative)
 * - Icon support with gradient backgrounds
 * - Title, subtitle, and description text
 * - Badge display with flexible alignment
 * - Action buttons area
 * - Interactive hover effects
 * - Responsive sizing
 * - Consistent styling with design system
 */
export const UnifiedToolHeader = React.forwardRef<HTMLDivElement, UnifiedToolHeaderProps>(
  (
    {
      className,
      gradient,
      size,
      interactive,
      title,
      subtitle,
      description,
      icon,
      badges = [],
      actions,
      badgeAlignment = 'left',
      actionsAlignment = 'right',
      showDivider = false,
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
      <div
        ref={ref}
        className={cn(
          toolHeaderVariants({ gradient, size, interactive }),
          className
        )}
        onClick={interactive ? onClick : undefined}
        onKeyDown={interactive ? handleKeyDown : onKeyDown}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? 'button' : undefined}
        {...props}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent" />
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            {/* Left Side - Icon and Text */}
            <div className="flex items-start gap-4 flex-1 min-w-0">
              {/* Icon */}
              {icon && (
                <div className={cn(iconContainerVariants({ size, gradient }))}>
                  {icon}
                </div>
              )}

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                {/* Title */}
                <Heading
                  level={2}
                  variant={gradient === 'creative' ? 'gradient' : 'default'}
                  className="mb-1 truncate"
                >
                  {title}
                </Heading>

                {/* Subtitle */}
                {subtitle && (
                  <Text
                    variant="muted"
                    size="sm"
                    className="mb-2 truncate"
                  >
                    {subtitle}
                  </Text>
                )}

                {/* Description */}
                {description && (
                  <Text
                    variant="subtle"
                    size="sm"
                    className="leading-relaxed"
                  >
                    {description}
                  </Text>
                )}
              </div>
            </div>

            {/* Right Side - Actions */}
            {actions && (
              <div className={cn(actionsContainerVariants({ alignment: actionsAlignment }))}>
                {actions}
              </div>
            )}
          </div>

          {/* Divider */}
          {showDivider && (badges.length > 0 || actions) && (
            <div className="border-t border-gray-200/50 mb-4" />
          )}

          {/* Badges */}
          {badges.length > 0 && (
            <div className={cn(badgeContainerVariants({ alignment: badgeAlignment }))}>
              {badges.map((badge, index) => (
                <UnifiedBadge
                  key={index}
                  variant={gradient === 'creative' ? 'primary' : 'secondary'}
                  size="sm"
                >
                  {badge}
                </UnifiedBadge>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Overlay */}
        {interactive && (
          <div className="absolute inset-0 bg-white/0 hover:bg-white/5 transition-colors duration-200 rounded-xl" />
        )}
      </div>
    );
  }
);

UnifiedToolHeader.displayName = 'UnifiedToolHeader';

// Specialized tool header components

/**
 * CreativityToolHeader - Pre-configured header for creativity tools
 */
export interface CreativityToolHeaderProps extends Omit<UnifiedToolHeaderProps, 'gradient'> {
  toolType?: 'generator' | 'editor' | 'analyzer' | 'converter';
}

export const CreativityToolHeader = React.forwardRef<HTMLDivElement, CreativityToolHeaderProps>(
  ({ toolType = 'generator', ...props }, ref) => {
    const gradientMap = {
      generator: 'creative' as const,
      editor: 'primary' as const,
      analyzer: 'secondary' as const,
      converter: 'success' as const
    };

    return (
      <UnifiedToolHeader
        ref={ref}
        gradient={gradientMap[toolType]}
        {...props}
      />
    );
  }
);

CreativityToolHeader.displayName = 'CreativityToolHeader';

/**
 * CompactToolHeader - Compact version for smaller spaces
 */
export interface CompactToolHeaderProps extends Omit<UnifiedToolHeaderProps, 'size' | 'description'> {}

export const CompactToolHeader = React.forwardRef<HTMLDivElement, CompactToolHeaderProps>(
  (props, ref) => (
    <UnifiedToolHeader
      ref={ref}
      size="sm"
      {...props}
    />
  )
);

CompactToolHeader.displayName = 'CompactToolHeader';

// Export tool header variants for external use
export {
  toolHeaderVariants,
  iconContainerVariants,
  badgeContainerVariants,
  actionsContainerVariants
};