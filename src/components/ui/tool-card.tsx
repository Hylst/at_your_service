
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { animations } from '@/lib/design-system';

interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  tools?: string[];
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'highlighted';
}

export const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon,
  tools = [],
  onClick,
  className,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'group hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-blue-50 dark:hover:from-indigo-950/30 dark:hover:to-blue-950/30 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
    highlighted: 'group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-950/30 dark:hover:to-indigo-950/30 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 hover:border-primary/40',
  };

  return (
    <Card
      className={cn(
        'cursor-pointer',
        variantClasses[variant],
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0 bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <Heading level={3} size="lg" className="mb-1 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">
              {title}
            </Heading>
            <Text size="sm" color="muted" className="line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
              {description}
            </Text>
          </div>
        </div>
      </CardHeader>
      
      {tools.length > 0 && (
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1.5">
            {tools.slice(0, 4).map((tool, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs font-normal hover:bg-indigo-100 hover:text-indigo-800 dark:hover:bg-indigo-900 dark:hover:text-indigo-200 transition-all duration-300 hover:scale-105 cursor-default group-hover:shadow-sm"
              >
                {tool}
              </Badge>
            ))}
            {tools.length > 4 && (
              <Badge variant="outline" className="text-xs hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:scale-105 cursor-default group-hover:shadow-sm">
                +{tools.length - 4} plus
              </Badge>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
