import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Heart, Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Props for individual color item display
 */
interface ColorItemProps {
  color: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  showActions?: boolean;
  showName?: boolean;
  isFavorite?: boolean;
  onClick?: (color: string) => void;
  onToggleFavorite?: (color: string) => void;
  onCopy?: (color: string) => void;
  className?: string;
}

/**
 * Individual color display component
 */
export const ColorItem: React.FC<ColorItemProps> = ({
  color,
  name,
  size = 'md',
  showActions = false,
  showName = false,
  isFavorite = false,
  onClick,
  onToggleFavorite,
  onCopy,
  className = ''
}) => {
  /**
   * Get size-specific classes
   */
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-12 h-12';
      case 'lg':
        return 'w-24 h-24';
      default:
        return 'w-16 h-16';
    }
  };

  /**
   * Handle color copy with toast notification
   */
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color);
    onCopy?.(color);
    toast.success(`Couleur ${color} copiée !`);
  };

  /**
   * Handle favorite toggle
   */
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(color);
  };

  /**
   * Handle color click
   */
  const handleClick = () => {
    onClick?.(color);
  };

  return (
    <div className={`group relative ${className}`}>
      <div
        className={`
          ${getSizeClasses()}
          rounded-lg border-2 border-white dark:border-gray-600 shadow-md hover:shadow-lg 
          transition-all duration-200 cursor-pointer hover:scale-105
          ${onClick ? 'cursor-pointer' : ''}
        `}
        style={{ backgroundColor: color }}
        onClick={handleClick}
        title={name || color}
      >
        {/* Actions overlay */}
        {showActions && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-white hover:bg-white/20"
              onClick={handleCopy}
              title="Copier"
            >
              <Copy className="w-3 h-3" />
            </Button>
            {onToggleFavorite && (
              <Button
                size="sm"
                variant="ghost"
                className={`h-6 w-6 p-0 hover:bg-white/20 ${
                  isFavorite ? 'text-red-400' : 'text-white'
                }`}
                onClick={handleToggleFavorite}
                title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <Heart className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            )}
          </div>
        )}

        {/* Favorite indicator */}
        {isFavorite && !showActions && (
          <Heart className="absolute top-1 right-1 w-3 h-3 text-red-500 fill-current" />
        )}
      </div>

      {/* Color name/value */}
      {showName && (
        <div className="mt-1 text-center">
          <div className="text-xs font-mono text-gray-600 dark:text-gray-300">{color}</div>
        {name && <div className="text-xs text-gray-500 dark:text-gray-400">{name}</div>}
        </div>
      )}
    </div>
  );
};

/**
 * Props for color grid display
 */
interface ColorGridProps {
  colors: Array<{
    color: string;
    name?: string;
    isFavorite?: boolean;
  }>;
  size?: 'sm' | 'md' | 'lg';
  columns?: number;
  showActions?: boolean;
  showNames?: boolean;
  emptyMessage?: string;
  onColorClick?: (color: string) => void;
  onToggleFavorite?: (color: string) => void;
  onCopy?: (color: string) => void;
  className?: string;
}

/**
 * Grid display for multiple colors
 */
export const ColorGrid: React.FC<ColorGridProps> = ({
  colors,
  size = 'md',
  columns = 8,
  showActions = false,
  showNames = false,
  emptyMessage = 'Aucune couleur disponible',
  onColorClick,
  onToggleFavorite,
  onCopy,
  className = ''
}) => {
  /**
   * Get grid columns class
   */
  const getGridCols = () => {
    switch (columns) {
      case 4: return 'grid-cols-4';
      case 6: return 'grid-cols-6';
      case 8: return 'grid-cols-8';
      case 10: return 'grid-cols-10';
      default: return `grid-cols-${columns}`;
    }
  };

  if (colors.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600 dark:text-gray-300">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`grid ${getGridCols()} gap-3 ${className}`}>
      {colors.map((item, index) => (
        <ColorItem
          key={`${item.color}-${index}`}
          color={item.color}
          name={item.name}
          size={size}
          showActions={showActions}
          showName={showNames}
          isFavorite={item.isFavorite}
          onClick={onColorClick}
          onToggleFavorite={onToggleFavorite}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
};

/**
 * Props for color palette display
 */
interface ColorPaletteProps {
  colors: string[];
  name?: string;
  category?: string;
  showInfo?: boolean;
  showActions?: boolean;
  orientation?: 'horizontal' | 'vertical';
  onColorClick?: (color: string) => void;
  onCopy?: (colors: string[], format?: 'hex' | 'css' | 'json') => void;
  className?: string;
}

/**
 * Display component for color palettes
 */
export const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  name,
  category,
  showInfo = true,
  showActions = true,
  orientation = 'horizontal',
  onColorClick,
  onCopy,
  className = ''
}) => {
  /**
   * Handle palette copy in different formats
   */
  const handleCopy = (format: 'hex' | 'css' | 'json') => {
    onCopy?.(colors, format);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Palette info */}
      {showInfo && (name || category) && (
        <div className="flex items-center justify-between">
          <div>
            {name && <h3 className="font-medium">{name}</h3>}
            {category && (
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            )}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {colors.length} couleur{colors.length > 1 ? 's' : ''}
          </div>
        </div>
      )}

      {/* Color display */}
      <div className={`
        flex gap-2 
        ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}
      `}>
        {colors.map((color, index) => (
          <div
            key={index}
            className={`
              ${orientation === 'horizontal' ? 'flex-1 h-16' : 'w-full h-12'}
              rounded cursor-pointer transition-all hover:scale-105 shadow-sm
            `}
            style={{ backgroundColor: color }}
            onClick={() => onColorClick?.(color)}
            title={color}
          />
        ))}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2 justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopy('hex')}
            className="flex items-center gap-1"
          >
            <Copy className="w-3 h-3" />
            HEX
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopy('css')}
            className="flex items-center gap-1"
          >
            <Copy className="w-3 h-3" />
            CSS
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopy('json')}
            className="flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            JSON
          </Button>
        </div>
      )}
    </div>
  );
};