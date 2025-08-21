import { useState, useCallback, useMemo } from 'react';
import { toast } from '@/hooks/use-toast';
import {
  hexToRgbString,
  hexToHslValues,
  hexToHslString,
  hexToCmykString,
  hexToHsvString,
  calculateLuminance,
  calculateContrast,
  generateRandomHexColor,
  getColorName,
  isValidHexColor
} from '@/utils/colorUtils';

/**
 * Interface defining the structure of color information
 */
export interface ColorInfo {
  hex: string;
  rgb: string;
  hsl: string;
  cmyk: string;
  hsv: string;
  name: string;
  isFavorite: boolean;
  luminance: number;
  contrast: {
    white: number;
    black: number;
  };
}

/**
 * Interface for color format conversion options
 */
export interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
  cmyk: string;
  hsv: string;
}

/**
 * Custom hook for advanced color management and operations
 * Provides color generation, conversion, history, and favorites management
 */
export const useColorManagement = () => {
  // State management
  const [currentColor, setCurrentColor] = useState<string>('#3B82F6');
  const [colorHistory, setColorHistory] = useState<ColorInfo[]>([]);
  const [favorites, setFavorites] = useState<ColorInfo[]>([]);
  const [inputColor, setInputColor] = useState<string>('');

  /**
   * Generate a random hex color
   */
  const generateRandomColor = useCallback((): string => {
    return generateRandomHexColor();
  }, []);

  /**
   * Convert hex color to RGB format
   */
  const hexToRgb = useCallback((hex: string): string => {
    return hexToRgbString(hex);
  }, []);

  /**
   * Convert hex color to HSL format
   */
  const hexToHsl = useCallback((hex: string): [number, number, number] => {
    return hexToHslValues(hex);
  }, []);

  /**
   * Convert hex color to CMYK format
   */
  const hexToCmyk = useCallback((hex: string): string => {
    return hexToCmykString(hex);
  }, []);

  /**
   * Convert hex color to HSV format
   */
  const hexToHsv = useCallback((hex: string): string => {
    return hexToHsvString(hex);
  }, []);

  // Use shared luminance calculation
  const colorLuminance = useCallback((hex: string): number => {
    return calculateLuminance(hex);
  }, []);

  /**
   * Calculate contrast ratio between two colors
   */
  const colorContrast = useCallback((color1: string, color2: string): number => {
    return calculateContrast(color1, color2);
  }, []);

  // Use shared color name function
  const colorName = useCallback((hex: string): string => {
    return getColorName(hex);
  }, []);

  /**
   * Create comprehensive color information object
   */
  const createColorInfo = useCallback((hex: string): ColorInfo => {
    const [h, s, l] = hexToHsl(hex);
    const luminance = colorLuminance(hex);
    
    return {
      hex,
      rgb: hexToRgb(hex),
      hsl: `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`,
      cmyk: hexToCmyk(hex),
      hsv: hexToHsv(hex),
      name: colorName(hex),
      isFavorite: favorites.some(fav => fav.hex === hex),
      luminance,
      contrast: {
        white: colorContrast(hex, '#FFFFFF'),
        black: colorContrast(hex, '#000000')
      }
    };
  }, [hexToHsl, hexToRgb, hexToCmyk, hexToHsv, colorName, colorLuminance, colorContrast, favorites]);

  /**
   * Generate new random color and update history
   */
  const generateNewColor = useCallback(() => {
    const newColor = generateRandomColor();
    setCurrentColor(newColor);
    const colorInfo = createColorInfo(newColor);
    setColorHistory(prev => [colorInfo, ...prev.slice(0, 19)]);
  }, [generateRandomColor, createColorInfo]);

  /**
   * Handle manual color input with validation
   */
  const handleColorInput = useCallback(() => {
    if (isValidHexColor(inputColor)) {
      setCurrentColor(inputColor);
      const colorInfo = createColorInfo(inputColor);
      setColorHistory(prev => [colorInfo, ...prev.slice(0, 19)]);
      setInputColor('');
      toast({
        title: 'Couleur appliquée !',
        description: `${inputColor} a été définie comme couleur actuelle.`,
      });
    } else {
      toast({
        title: 'Format invalide',
        description: 'Veuillez entrer une couleur au format hexadécimal (ex: #FF5733)',
        variant: 'destructive',
      });
    }
  }, [inputColor, createColorInfo]);

  /**
   * Copy color value to clipboard
   */
  const copyToClipboard = useCallback((text: string, format: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Couleur copiée !',
      description: `Format ${format} copié dans le presse-papiers.`,
    });
  }, []);

  /**
   * Toggle favorite status of a color
   */
  const toggleFavorite = useCallback((color: ColorInfo) => {
    const isFavorite = favorites.some(fav => fav.hex === color.hex);
    
    if (isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.hex !== color.hex));
      toast({
        title: 'Retiré des favoris',
        description: 'Couleur retirée de vos favoris.',
      });
    } else {
      setFavorites(prev => [...prev, { ...color, isFavorite: true }]);
      toast({
        title: 'Ajouté aux favoris',
        description: 'Couleur ajoutée à vos favoris.',
      });
    }
  }, [favorites]);

  /**
   * Export colors data as JSON
   */
  const exportColors = useCallback(() => {
    const data = {
      current: createColorInfo(currentColor),
      history: colorHistory,
      favorites: favorites,
      exportDate: new Date().toISOString(),
      version: '2.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `couleurs-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Export réussi !',
      description: 'Vos couleurs ont été exportées avec succès.',
    });
  }, [currentColor, colorHistory, favorites, createColorInfo]);

  /**
   * Get current color information
   */
  const currentColorInfo = useMemo(() => createColorInfo(currentColor), [currentColor, createColorInfo]);

  /**
   * Get all available color formats for current color
   */
  const colorFormats = useMemo((): ColorFormats => ({
    hex: currentColor,
    rgb: hexToRgb(currentColor),
    hsl: `hsl(${hexToHsl(currentColor).map((v, i) => i === 0 ? Math.round(v) : Math.round(v) + '%').join(', ')})`,
    cmyk: hexToCmyk(currentColor),
    hsv: hexToHsv(currentColor)
  }), [currentColor, hexToRgb, hexToHsl, hexToCmyk, hexToHsv]);

  return {
    // State
    currentColor,
    colorHistory,
    favorites,
    inputColor,
    currentColorInfo,
    colorFormats,
    
    // Actions
    setCurrentColor,
    setInputColor,
    generateNewColor,
    handleColorInput,
    copyToClipboard,
    toggleFavorite,
    exportColors,
    
    // Utilities
    generateRandomColor,
    createColorInfo,
    hexToRgb,
    hexToHsl,
    hexToCmyk,
    hexToHsv,
    colorLuminance,
    colorContrast,
    colorName
  };
};