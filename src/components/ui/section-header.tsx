import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  badges?: string[];
  variant?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal' | 'pink' | 'indigo';
  className?: string;
}

const variantStyles = {
  blue: {
    gradient: 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    iconBg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    textGradient: 'bg-gradient-to-r from-blue-600 to-cyan-600'
  },
  green: {
    gradient: 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    iconBg: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    textGradient: 'bg-gradient-to-r from-emerald-600 to-teal-600'
  },
  purple: {
    gradient: 'bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30',
    border: 'border-purple-200 dark:border-purple-800',
    iconBg: 'bg-gradient-to-r from-purple-500 to-violet-500',
    textGradient: 'bg-gradient-to-r from-purple-600 to-violet-600'
  },
  orange: {
    gradient: 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
    border: 'border-orange-200 dark:border-orange-800',
    iconBg: 'bg-gradient-to-r from-orange-500 to-amber-500',
    textGradient: 'bg-gradient-to-r from-orange-600 to-amber-600'
  },
  red: {
    gradient: 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30',
    border: 'border-red-200 dark:border-red-800',
    iconBg: 'bg-gradient-to-r from-red-500 to-pink-500',
    textGradient: 'bg-gradient-to-r from-red-600 to-pink-600'
  },
  teal: {
    gradient: 'bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30',
    border: 'border-teal-200 dark:border-teal-800',
    iconBg: 'bg-gradient-to-r from-teal-500 to-cyan-500',
    textGradient: 'bg-gradient-to-r from-teal-600 to-cyan-600'
  },
  pink: {
    gradient: 'bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30',
    border: 'border-pink-200 dark:border-pink-800',
    iconBg: 'bg-gradient-to-r from-pink-500 to-rose-500',
    textGradient: 'bg-gradient-to-r from-pink-600 to-rose-600'
  },
  indigo: {
    gradient: 'bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30',
    border: 'border-indigo-200 dark:border-indigo-800',
    iconBg: 'bg-gradient-to-r from-indigo-500 to-blue-500',
    textGradient: 'bg-gradient-to-r from-indigo-600 to-blue-600'
  }
};

/**
 * SectionHeader - Unified compact header component for all app sections
 * 
 * Features:
 * - Compact design (max 80px height)
 * - Responsive layout
 * - Consistent styling across all sections
 * - Customizable color variants
 * - Optional badges for key features
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon,
  badges = [],
  variant = 'blue',
  className,
}) => {
  const styles = variantStyles[variant];

  return (
    <Card className={cn(
      'border shadow-sm',
      styles.gradient,
      styles.border,
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className={cn(
            'flex-shrink-0 p-2 rounded-xl shadow-sm',
            styles.iconBg
          )}>
            <div className="w-6 h-6 text-white flex items-center justify-center">
              {icon}
            </div>
          </div>
          
          {/* Title and Subtitle */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h1 className={cn(
                'text-xl sm:text-2xl font-bold bg-clip-text text-transparent truncate',
                styles.textGradient
              )}>
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground sm:text-right flex-shrink-0">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          {/* Badges */}
          {badges.length > 0 && (
            <div className="hidden md:flex gap-1 flex-wrap">
              {badges.slice(0, 3).map((badge, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs px-2 py-1 whitespace-nowrap"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {/* Mobile badges */}
        {badges.length > 0 && (
          <div className="md:hidden mt-3 flex gap-1 flex-wrap">
            {badges.map((badge, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-2 py-1"
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};