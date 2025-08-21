/**
 * UnifiedBadge Component
 * A comprehensive badge component with consistent styling and behavior
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import type { BadgeProps } from './types';

// Badge variants using class-variance-authority
const badgeVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'select-none whitespace-nowrap'
  ],
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800 border border-gray-200',
        primary: 'bg-blue-100 text-blue-800 border border-blue-200',
        secondary: 'bg-gray-100 text-gray-700 border border-gray-200',
        success: 'bg-green-100 text-green-800 border border-green-200',
        warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        error: 'bg-red-100 text-red-800 border border-red-200',
        ghost: 'bg-transparent text-gray-600 border border-transparent',
        outline: 'bg-transparent text-gray-700 border border-gray-300'
      },
      size: {
        xs: 'px-1.5 py-0.5 text-xs rounded-sm min-h-[16px]',
        sm: 'px-2 py-0.5 text-xs rounded-md min-h-[20px]',
        md: 'px-2.5 py-1 text-sm rounded-md min-h-[24px]',
        lg: 'px-3 py-1.5 text-sm rounded-lg min-h-[28px]',
        xl: 'px-4 py-2 text-base rounded-lg min-h-[32px]'
      },
      dot: {
        true: 'relative'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm'
    }
  }
);

// Dot indicator variants
const dotVariants = cva(
  'absolute -top-1 -right-1 rounded-full bg-red-500 border-2 border-white',
  {
    variants: {
      size: {
        xs: 'w-2 h-2',
        sm: 'w-2.5 h-2.5',
        md: 'w-3 h-3',
        lg: 'w-3.5 h-3.5',
        xl: 'w-4 h-4'
      },
      variant: {
        default: 'bg-red-500',
        primary: 'bg-blue-500',
        secondary: 'bg-gray-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500'
      }
    },
    defaultVariants: {
      size: 'sm',
      variant: 'default'
    }
  }
);

// Count badge variants
const countVariants = cva(
  'absolute -top-2 -right-2 min-w-[20px] h-5 px-1.5 text-xs font-medium text-white bg-red-500 rounded-full flex items-center justify-center border-2 border-white',
  {
    variants: {
      size: {
        xs: 'min-w-[16px] h-4 text-xs -top-1.5 -right-1.5',
        sm: 'min-w-[18px] h-4.5 text-xs -top-1.5 -right-1.5',
        md: 'min-w-[20px] h-5 text-xs -top-2 -right-2',
        lg: 'min-w-[22px] h-5.5 text-sm -top-2 -right-2',
        xl: 'min-w-[24px] h-6 text-sm -top-2.5 -right-2.5'
      },
      variant: {
        default: 'bg-red-500',
        primary: 'bg-blue-500',
        secondary: 'bg-gray-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500'
      }
    },
    defaultVariants: {
      size: 'sm',
      variant: 'default'
    }
  }
);

export interface UnifiedBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants>,
    BadgeProps {}

/**
 * UnifiedBadge - A comprehensive badge component with consistent styling
 * 
 * Features:
 * - Multiple variants (default, primary, secondary, success, warning, error, ghost, outline)
 * - Different sizes (xs, sm, md, lg, xl)
 * - Dot indicator support
 * - Count badge with number display
 * - Show zero option for count badges
 * - Proper accessibility support
 * - Consistent animations and transitions
 */
export const UnifiedBadge = React.forwardRef<HTMLSpanElement, UnifiedBadgeProps>(
  (
    {
      className,
      variant,
      size = 'sm',
      dot,
      count,
      showZero = false,
      children,
      ...props
    },
    ref
  ) => {
    // Determine if we should show the count
    const shouldShowCount = count !== undefined && (count > 0 || (count === 0 && showZero));
    
    // Format count display (show 99+ for counts over 99)
    const displayCount = count !== undefined && count > 99 ? '99+' : count?.toString();

    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant, size, dot: dot || shouldShowCount }),
          className
        )}
        {...props}
      >
        {children}
        
        {/* Dot indicator */}
        {dot && !shouldShowCount && (
          <span
            className={cn(dotVariants({ size, variant }))}
            aria-hidden="true"
          />
        )}
        
        {/* Count badge */}
        {shouldShowCount && (
          <span
            className={cn(countVariants({ size, variant }))}
            aria-label={`${count} notifications`}
          >
            {displayCount}
          </span>
        )}
      </span>
    );
  }
);

UnifiedBadge.displayName = 'UnifiedBadge';

// Specialized badge components for common use cases

/**
 * StatusBadge - Pre-configured badge for status indicators
 */
export interface StatusBadgeProps extends Omit<UnifiedBadgeProps, 'variant'> {
  status: 'online' | 'offline' | 'busy' | 'away' | 'idle';
}

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    const statusVariants = {
      online: 'success' as const,
      offline: 'secondary' as const,
      busy: 'error' as const,
      away: 'warning' as const,
      idle: 'secondary' as const
    };

    const statusLabels = {
      online: 'Online',
      offline: 'Offline',
      busy: 'Busy',
      away: 'Away',
      idle: 'Idle'
    };

    return (
      <UnifiedBadge
        ref={ref}
        variant={statusVariants[status]}
        dot
        {...props}
      >
        {statusLabels[status]}
      </UnifiedBadge>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';

/**
 * NotificationBadge - Pre-configured badge for notifications
 */
export interface NotificationBadgeProps extends Omit<UnifiedBadgeProps, 'count' | 'showZero'> {
  count?: number;
  showZero?: boolean;
  maxCount?: number;
}

export const NotificationBadge = React.forwardRef<HTMLSpanElement, NotificationBadgeProps>(
  ({ count, showZero = false, maxCount = 99, children, ...props }, ref) => {
    const displayCount = count !== undefined && count > maxCount ? maxCount : count;

    return (
      <UnifiedBadge
        ref={ref}
        variant="error"
        count={displayCount}
        showZero={showZero}
        {...props}
      >
        {children}
      </UnifiedBadge>
    );
  }
);

NotificationBadge.displayName = 'NotificationBadge';

// Export badge variants for external use
export { badgeVariants, dotVariants, countVariants };