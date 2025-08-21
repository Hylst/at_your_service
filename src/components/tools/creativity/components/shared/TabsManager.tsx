import React, { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LucideIcon } from 'lucide-react';

/**
 * Tab configuration interface
 */
export interface TabConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  content: ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

/**
 * Props for TabsManager component
 */
interface TabsManagerProps {
  tabs: TabConfig[];
  defaultValue?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline';
  onTabChange?: (tabId: string) => void;
}

/**
 * Reusable tabs manager component for consistent tab behavior
 * across creativity suite components
 */
export const TabsManager: React.FC<TabsManagerProps> = ({
  tabs,
  defaultValue,
  className = '',
  orientation = 'horizontal',
  variant = 'default',
  onTabChange
}) => {
  /**
   * Handle tab change with optional callback
   */
  const handleTabChange = (value: string) => {
    onTabChange?.(value);
  };

  /**
   * Generate grid columns class based on tab count
   */
  const getGridCols = () => {
    const count = tabs.length;
    if (count <= 2) return 'grid-cols-2';
    if (count <= 3) return 'grid-cols-3';
    if (count <= 4) return 'grid-cols-4';
    if (count <= 5) return 'grid-cols-5';
    return 'grid-cols-6';
  };

  /**
   * Get variant-specific classes
   */
  const getVariantClasses = () => {
    switch (variant) {
      case 'pills':
        return 'bg-muted p-1 rounded-lg';
      case 'underline':
        return 'border-b border-border';
      default:
        return '';
    }
  };

  return (
    <Tabs 
      defaultValue={defaultValue || tabs[0]?.id} 
      className={`w-full ${className}`}
      onValueChange={handleTabChange}
      orientation={orientation}
    >
      <TabsList 
        className={`
          ${orientation === 'horizontal' ? `grid w-full ${getGridCols()}` : 'flex flex-col h-auto w-48'}
          ${getVariantClasses()}
        `}
      >
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id} 
              disabled={tab.disabled}
              className={`
                flex items-center gap-2 
                ${orientation === 'vertical' ? 'justify-start w-full' : 'justify-center'}
                ${variant === 'pills' ? 'rounded-md' : ''}
              `}
            >
              <IconComponent className="w-4 h-4" />
              <span className={orientation === 'vertical' ? 'text-left' : ''}>
                {tab.label}
              </span>
              {tab.badge && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                  {tab.badge}
                </span>
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent 
          key={tab.id} 
          value={tab.id}
          className="mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

/**
 * Hook for managing tab state with persistence
 */
export const useTabState = (key: string, defaultTab: string) => {
  const [activeTab, setActiveTab] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`tab-${key}`) || defaultTab;
    }
    return defaultTab;
  });

  const handleTabChange = React.useCallback((tabId: string) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`tab-${key}`, tabId);
    }
  }, [key]);

  return [activeTab, handleTabChange] as const;
};

/**
 * Utility function to create tab configurations
 */
export const createTabConfig = (
  id: string,
  label: string,
  icon: LucideIcon,
  content: ReactNode,
  options?: Partial<Pick<TabConfig, 'disabled' | 'badge'>>
): TabConfig => ({
  id,
  label,
  icon,
  content,
  ...options
});