
import React from 'react';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'muted' | 'accent';
}

export const Section: React.FC<SectionProps> = ({
  children,
  spacing = 'lg',
  background = 'default',
  className,
  ...props
}) => {
  const spacingClasses = {
    sm: 'py-0.5',
    md: 'py-1',
    lg: 'py-2',
    xl: 'py-4',
  };

  const backgroundClasses = {
    default: '',
    muted: 'bg-muted/30',
    accent: 'bg-accent/10',
  };

  return (
    <section
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
