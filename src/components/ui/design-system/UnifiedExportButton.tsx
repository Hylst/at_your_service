/**
 * UnifiedExportButton Component
 * A comprehensive export button component for creativity tools
 */

import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import { UnifiedButton } from './UnifiedButton';
import { UnifiedBadge } from './UnifiedBadge';
import type { ExportButtonProps } from './types';

// Export button variants
const exportButtonVariants = cva(
  'relative',
  {
    variants: {
      layout: {
        single: 'inline-block',
        dropdown: 'inline-block'
      }
    },
    defaultVariants: {
      layout: 'single'
    }
  }
);

// Export dropdown variants
const dropdownVariants = cva(
  'absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden',
  {
    variants: {
      position: {
        'bottom-left': 'top-full left-0',
        'bottom-right': 'top-full right-0',
        'top-left': 'bottom-full left-0 mb-2',
        'top-right': 'bottom-full right-0 mb-2'
      },
      width: {
        auto: 'min-w-[200px]',
        full: 'w-full',
        fit: 'w-max'
      }
    },
    defaultVariants: {
      position: 'bottom-right',
      width: 'auto'
    }
  }
);

// Export option variants
const optionVariants = cva(
  'flex items-center justify-between w-full px-4 py-3 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors',
  {
    variants: {
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'cursor-pointer'
      }
    },
    defaultVariants: {
      disabled: false
    }
  }
);

// Format configuration
const FORMAT_CONFIG = {
  png: {
    label: 'PNG Image',
    description: 'Raster image with transparency',
    icon: '🖼️',
    extension: '.png',
    mimeType: 'image/png'
  },
  jpg: {
    label: 'JPEG Image',
    description: 'Compressed raster image',
    icon: '📷',
    extension: '.jpg',
    mimeType: 'image/jpeg'
  },
  svg: {
    label: 'SVG Vector',
    description: 'Scalable vector graphics',
    icon: '🎨',
    extension: '.svg',
    mimeType: 'image/svg+xml'
  },
  pdf: {
    label: 'PDF Document',
    description: 'Portable document format',
    icon: '📄',
    extension: '.pdf',
    mimeType: 'application/pdf'
  },
  json: {
    label: 'JSON Data',
    description: 'Structured data format',
    icon: '📊',
    extension: '.json',
    mimeType: 'application/json'
  },
  css: {
    label: 'CSS Styles',
    description: 'Cascading style sheets',
    icon: '🎭',
    extension: '.css',
    mimeType: 'text/css'
  },
  scss: {
    label: 'SCSS Styles',
    description: 'Sass preprocessor styles',
    icon: '💅',
    extension: '.scss',
    mimeType: 'text/scss'
  }
} as const;

type ExportFormat = keyof typeof FORMAT_CONFIG;

export interface UnifiedExportButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof exportButtonVariants>,
    ExportButtonProps {
  layout?: 'single' | 'dropdown';
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  width?: 'auto' | 'full' | 'fit';
  showIcons?: boolean;
  showDescriptions?: boolean;
  buttonProps?: React.ComponentProps<typeof UnifiedButton>;
  onSelect?: (format: ExportFormat) => void;
}

/**
 * UnifiedExportButton - A comprehensive export button for creativity tools
 * 
 * Features:
 * - Multiple export formats (PNG, JPG, SVG, PDF, JSON, CSS, SCSS)
 * - Single button or dropdown layout
 * - Format icons and descriptions
 * - Customizable positioning
 * - Loading states during export
 * - Error handling
 * - Consistent styling with design system
 */
export const UnifiedExportButton = React.forwardRef<HTMLDivElement, UnifiedExportButtonProps>(
  (
    {
      className,
      layout = 'dropdown',
      position = 'bottom-right',
      width = 'auto',
      formats = ['png', 'jpg', 'svg', 'json'],
      onExport,
      onSelect,
      data,
      filename = 'export',
      showIcons = true,
      showDescriptions = false,
      buttonProps,
      disabled,
      loading,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Handle single format export
    const handleSingleExport = async (format: ExportFormat) => {
      if (disabled || exportingFormat) return;

      try {
        setExportingFormat(format);
        await onExport?.(format, data);
        onSelect?.(format);
      } catch (error) {
        console.error('Export failed:', error);
      } finally {
        setExportingFormat(null);
      }
    };

    // Handle dropdown format selection
    const handleFormatSelect = async (format: ExportFormat) => {
      setIsOpen(false);
      await handleSingleExport(format);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    // Single format button
    if (layout === 'single' && formats.length === 1) {
      const format = formats[0] as ExportFormat;
      const config = FORMAT_CONFIG[format];

      return (
        <div ref={ref} className={cn(exportButtonVariants({ layout }), className)} {...props}>
          <UnifiedButton
            ref={buttonRef}
            variant="primary"
            size="md"
            disabled={disabled || Boolean(exportingFormat)}
            loading={exportingFormat === format}
            leftIcon={showIcons ? config.icon : undefined}
            onClick={() => handleSingleExport(format)}
            {...buttonProps}
          >
            Export {config.label}
          </UnifiedButton>
        </div>
      );
    }

    // Dropdown layout
    return (
      <div ref={ref} className={cn(exportButtonVariants({ layout }), className)} {...props}>
        {/* Dropdown Button */}
        <UnifiedButton
          ref={buttonRef}
          variant="primary"
          size="md"
          disabled={disabled || Boolean(exportingFormat)}
          loading={Boolean(exportingFormat)}
          leftIcon="📥"
          rightIcon={isOpen ? "▲" : "▼"}
          onClick={() => setIsOpen(!isOpen)}
          {...buttonProps}
        >
          Export
          {formats.length > 1 && (
            <UnifiedBadge variant="secondary" size="xs" className="ml-2">
              {formats.length}
            </UnifiedBadge>
          )}
        </UnifiedButton>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className={cn(dropdownVariants({ position, width }))}
          >
            <div className="py-1">
              {formats.map((format) => {
                const config = FORMAT_CONFIG[format as ExportFormat];
                const isExporting = exportingFormat === format;

                return (
                  <button
                    key={format}
                    type="button"
                    className={cn(optionVariants({ disabled: disabled || isExporting }))}
                    onClick={() => handleFormatSelect(format as ExportFormat)}
                    disabled={disabled || Boolean(exportingFormat)}
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      {showIcons && (
                        <span className="text-lg flex-shrink-0">
                          {config.icon}
                        </span>
                      )}

                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">
                          {config.label}
                        </div>
                        {showDescriptions && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            {config.description}
                          </div>
                        )}
                      </div>

                      {/* Loading Indicator */}
                      {isExporting && (
                        <div className="flex-shrink-0">
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-4 py-2">
              <div className="text-xs text-gray-500">
                Choose your preferred export format
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

UnifiedExportButton.displayName = 'UnifiedExportButton';

// Specialized export button components

/**
 * ImageExportButton - Pre-configured for image exports
 */
export interface ImageExportButtonProps extends Omit<UnifiedExportButtonProps, 'formats'> {
  includeVector?: boolean;
}

export const ImageExportButton = React.forwardRef<HTMLDivElement, ImageExportButtonProps>(
  ({ includeVector = true, ...props }, ref) => {
    const formats = includeVector ? ['png', 'jpg', 'svg'] : ['png', 'jpg'];
    
    return (
      <UnifiedExportButton
        ref={ref}
        formats={formats as ExportFormat[]}
        {...props}
      />
    );
  }
);

ImageExportButton.displayName = 'ImageExportButton';

/**
 * CodeExportButton - Pre-configured for code exports
 */
export interface CodeExportButtonProps extends Omit<UnifiedExportButtonProps, 'formats'> {
  includePreprocessor?: boolean;
}

export const CodeExportButton = React.forwardRef<HTMLDivElement, CodeExportButtonProps>(
  ({ includePreprocessor = true, ...props }, ref) => {
    const formats = includePreprocessor ? ['css', 'scss', 'json'] : ['css', 'json'];
    
    return (
      <UnifiedExportButton
        ref={ref}
        formats={formats as ExportFormat[]}
        showDescriptions
        {...props}
      />
    );
  }
);

CodeExportButton.displayName = 'CodeExportButton';

// Export variants and utilities
export {
  exportButtonVariants,
  dropdownVariants,
  optionVariants,
  FORMAT_CONFIG
};

export type { ExportFormat };