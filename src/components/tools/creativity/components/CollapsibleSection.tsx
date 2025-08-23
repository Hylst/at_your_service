import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Props for CollapsibleSection component
 */
export interface CollapsibleSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
  priority?: 'high' | 'normal' | 'low';
  quickActions?: React.ReactNode;
  preview?: React.ReactNode;
  essential?: boolean;
  compactSpacing?: boolean;
  isCollapsed?: boolean;
  onToggle?: (id: string) => void;
  draggable?: boolean;
  onDragStart?: (id: string) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (id: string) => void;
  onDragEnd?: () => void;
}

/**
 * CollapsibleSection component with modern React patterns and optimizations
 */
export const CollapsibleSection = memo<CollapsibleSectionProps>(({ 
  id,
  title,
  children,
  defaultCollapsed = false,
  badge,
  icon,
  priority = 'normal',
  quickActions,
  preview,
  essential = false,
  compactSpacing = false,
  isCollapsed: externalCollapsed,
  onToggle,
  draggable = false,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd
}) => {
  // Internal collapsed state (used when no external control)
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  
  // Use external collapsed state if provided, otherwise use internal
  const isCollapsed = externalCollapsed ?? internalCollapsed;
  
  // Content height management for smooth animations
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  
  // Touch gesture handling
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  /**
   * Handle toggle with proper state management
   */
  const handleToggle = useCallback(() => {
    if (onToggle) {
      onToggle(id);
    } else {
      setInternalCollapsed(prev => !prev);
    }
  }, [id, onToggle]);

  /**
   * Measure content height for animations
   */
  const measureContentHeight = useCallback(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
    }
  }, []);

  /**
   * Handle responsive resize
   */
  useEffect(() => {
    if (!contentRef.current) return;

    // Create ResizeObserver to watch for content changes
    resizeObserverRef.current = new ResizeObserver(() => {
      measureContentHeight();
    });

    resizeObserverRef.current.observe(contentRef.current);

    // Initial measurement
    measureContentHeight();

    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, [measureContentHeight]);

  /**
   * Handle animation state
   */
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [isCollapsed]);

  /**
   * Touch gesture handlers
   */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      setTouchStart({ x: touch.clientX, y: touch.clientY });
      setTouchEnd(null);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      setTouchEnd({ x: touch.clientX, y: touch.clientY });
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    const minSwipeDistance = 50;

    // Horizontal swipe to toggle
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0 && isCollapsed) {
        handleToggle(); // Swipe right to expand
      } else if (deltaX < 0 && !isCollapsed) {
        handleToggle(); // Swipe left to collapse
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, isCollapsed, handleToggle]);

  /**
   * Drag and drop handlers
   */
  const handleDragStart = useCallback((e: React.DragEvent) => {
    if (draggable && onDragStart) {
      e.dataTransfer.effectAllowed = 'move';
      onDragStart(id);
    }
  }, [draggable, onDragStart, id]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (draggable && onDragOver) {
      onDragOver(e);
    }
  }, [draggable, onDragOver]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    if (draggable && onDrop) {
      e.preventDefault();
      onDrop(id);
    }
  }, [draggable, onDrop, id]);

  const handleDragEnd = useCallback(() => {
    if (draggable && onDragEnd) {
      onDragEnd();
    }
  }, [draggable, onDragEnd]);

  // Priority-based styling
  const priorityStyles = {
    high: 'border-l-2 border-l-blue-500 bg-blue-50/30',
    normal: 'border-l border-l-gray-200',
    low: 'border-l border-l-gray-100 opacity-90'
  };

  const headerClasses = `
    flex items-center justify-between p-2 cursor-pointer transition-all duration-200
    ${compactSpacing ? 'py-1 px-1.5' : 'py-2 px-3'}
    ${isCollapsed ? 'hover:bg-gray-50' : 'hover:bg-gray-100'}
    ${essential ? 'bg-yellow-50 border-yellow-200' : ''}
    ${draggable ? 'cursor-grab active:cursor-grabbing' : ''}
  `.trim();

  const contentClasses = `
    overflow-hidden transition-all duration-300 ease-in-out
    ${isAnimating ? 'transition-all' : ''}
  `.trim();

  return (
    <div 
      className={`
        border rounded-lg bg-white shadow-sm transition-all duration-200
        ${priorityStyles[priority]}
        ${compactSpacing ? 'text-xs' : 'text-sm'}
        ${draggable ? 'hover:shadow-md' : ''}
      `.trim()}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
      {/* Header */}
      <div 
        className={headerClasses}
        onClick={handleToggle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="button"
        tabIndex={0}
        aria-expanded={!isCollapsed}
        aria-controls={`${id}-content`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* Collapse/Expand Icon */}
          <div className={`transition-transform duration-200 ${isCollapsed ? '' : 'rotate-90'}`}>
            {isCollapsed ? (
              <ChevronRight className={compactSpacing ? "h-3 w-3" : "h-4 w-4"} />
            ) : (
              <ChevronDown className={compactSpacing ? "h-3 w-3" : "h-4 w-4"} />
            )}
          </div>
          
          {/* Section Icon */}
          {icon && (
            <div className="flex-shrink-0 text-gray-600">
              {icon}
            </div>
          )}
          
          {/* Title */}
          <span className="font-medium truncate">{title}</span>
          
          {/* Badge */}
          {badge !== undefined && (
            <span className={`
              px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full font-mono
              ${compactSpacing ? 'text-[9px]' : 'text-[10px]'}
            `.trim()}>
              {badge}
            </span>
          )}
          
          {/* Essential indicator */}
          {essential && (
            <span className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" title="Essential panel" />
          )}
        </div>
        
        {/* Quick Actions */}
        {quickActions && (
          <div 
            className="flex items-center gap-1 ml-2"
            onClick={(e) => e.stopPropagation()}
          >
            {quickActions}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div 
        id={`${id}-content`}
        className={contentClasses}
        style={{
          height: isCollapsed ? 0 : contentHeight || 'auto',
          opacity: isCollapsed ? 0 : 1
        }}
      >
        <div 
          ref={contentRef}
          className={compactSpacing ? 'p-1' : 'p-3 pt-0'}
        >
          {/* Preview when collapsed */}
          {isCollapsed && preview && (
            <div className="py-1 text-xs text-gray-500 border-t">
              {preview}
            </div>
          )}
          
          {/* Main content */}
          {!isCollapsed && children}
        </div>
      </div>
    </div>
  );
});

CollapsibleSection.displayName = 'CollapsibleSection';