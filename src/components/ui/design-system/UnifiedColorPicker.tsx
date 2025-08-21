/**
 * UnifiedColorPicker Component
 * A comprehensive color picker component for creativity tools
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import type { ColorPickerProps } from './types';

// Color picker variants
const colorPickerVariants = cva(
  'relative inline-block',
  {
    variants: {
      size: {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
      },
      variant: {
        default: 'rounded-lg border-2 border-gray-300 shadow-sm',
        primary: 'rounded-lg border-2 border-blue-300 shadow-sm',
        circle: 'rounded-full border-2 border-gray-300 shadow-sm',
        square: 'rounded-none border-2 border-gray-300 shadow-sm'
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'cursor-pointer hover:shadow-md transition-shadow'
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      disabled: false
    }
  }
);

// Color swatch variants
const swatchVariants = cva(
  'w-full h-full transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'rounded-md',
        primary: 'rounded-md',
        circle: 'rounded-full',
        square: 'rounded-none'
      },
      interactive: {
        true: 'hover:scale-105 active:scale-95',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      interactive: true
    }
  }
);

// Preset colors for quick selection
const DEFAULT_PRESETS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
  '#A3E4D7', '#F9E79F', '#FADBD8', '#D5DBDB', '#2C3E50'
];

// Color format conversion utilities
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const hexToHsl = (hex: string): { h: number; s: number; l: number } | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const { r, g, b } = rgb;
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const diff = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / diff + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / diff + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

export interface UnifiedColorPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof colorPickerVariants>,
    ColorPickerProps {
  label?: string;
  showInput?: boolean;
  showCopyButton?: boolean;
  showFormatToggle?: boolean;
}

/**
 * UnifiedColorPicker - A comprehensive color picker for creativity tools
 * 
 * Features:
 * - Multiple formats (hex, rgb, hsl)
 * - Preset color swatches
 * - Custom color input
 * - Alpha channel support
 * - Copy to clipboard functionality
 * - Format toggle
 * - Accessible design
 * - Consistent styling with design system
 */
export const UnifiedColorPicker = React.forwardRef<HTMLDivElement, UnifiedColorPickerProps>(
  (
    {
      className,
      size,
      variant,
      disabled,
      value = '#3B82F6',
      onChange,
      format = 'hex',
      showPresets = true,
      presets = DEFAULT_PRESETS,
      showAlpha = false,
      label,
      showInput = true,
      showCopyButton = true,
      showFormatToggle = true,
      ...props
    },
    ref
  ) => {
    const [currentColor, setCurrentColor] = useState(value);
    const [currentFormat, setCurrentFormat] = useState(format);
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Update internal state when value prop changes
    useEffect(() => {
      setCurrentColor(value);
    }, [value]);

    // Handle color change
    const handleColorChange = useCallback((newColor: string) => {
      setCurrentColor(newColor);
      onChange?.(newColor);
    }, [onChange]);

    // Handle input change
    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = event.target.value;
      handleColorChange(newColor);
    }, [handleColorChange]);

    // Handle preset selection
    const handlePresetSelect = useCallback((color: string) => {
      handleColorChange(color);
      setIsOpen(false);
    }, [handleColorChange]);

    // Copy color to clipboard
    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(currentColor);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy color:', err);
      }
    }, [currentColor]);

    // Format color based on current format
    const formatColor = useCallback((color: string) => {
      switch (currentFormat) {
        case 'rgb': {
          const rgb = hexToRgb(color);
          return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : color;
        }
        case 'hsl': {
          const hsl = hexToHsl(color);
          return hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : color;
        }
        default:
          return color;
      }
    }, [currentFormat]);

    // Toggle format
    const toggleFormat = useCallback(() => {
      const formats = ['hex', 'rgb', 'hsl'] as const;
      const currentIndex = formats.indexOf(currentFormat);
      const nextIndex = (currentIndex + 1) % formats.length;
      setCurrentFormat(formats[nextIndex]);
    }, [currentFormat]);

    // Close popover when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div className="flex items-center gap-2">
          {/* Color Swatch Button */}
          <button
            type="button"
            className={cn(colorPickerVariants({ size, variant, disabled }))}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            aria-label="Open color picker"
          >
            <div
              className={cn(swatchVariants({ variant, interactive: !disabled }))}
              style={{ backgroundColor: currentColor }}
            />
          </button>

          {/* Color Input */}
          {showInput && (
            <input
              ref={inputRef}
              type="text"
              value={formatColor(currentColor)}
              onChange={handleInputChange}
              disabled={disabled}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter color value"
            />
          )}

          {/* Format Toggle Button */}
          {showFormatToggle && (
            <button
              type="button"
              onClick={toggleFormat}
              disabled={disabled}
              className="px-2 py-2 text-xs font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Toggle color format"
            >
              {currentFormat.toUpperCase()}
            </button>
          )}

          {/* Copy Button */}
          {showCopyButton && (
            <button
              type="button"
              onClick={handleCopy}
              disabled={disabled}
              className="px-2 py-2 text-xs font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              title={copied ? 'Copied!' : 'Copy color'}
            >
              {copied ? '✓' : '📋'}
            </button>
          )}
        </div>

        {/* Color Presets Popover */}
        {isOpen && showPresets && (
          <div
            ref={popoverRef}
            className="absolute z-50 p-3 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
            style={{ minWidth: '200px' }}
          >
            <div className="grid grid-cols-5 gap-2">
              {presets.map((preset, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-8 h-8 rounded-md border-2 border-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  style={{ backgroundColor: preset }}
                  onClick={() => handlePresetSelect(preset)}
                  title={preset}
                  aria-label={`Select color ${preset}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

UnifiedColorPicker.displayName = 'UnifiedColorPicker';

// Export color picker variants for external use
export { colorPickerVariants, swatchVariants };

// Export utility functions
export { hexToRgb, rgbToHex, hexToHsl, DEFAULT_PRESETS };