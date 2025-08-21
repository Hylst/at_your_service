import { useState, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { 
  hexToHslValues, 
  hslToHex, 
  generateRandomHexColor, 
  getColorTemperature 
} from '../utils/colorUtils';

// Types for palette management
export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  category: string;
  createdAt: Date;
  tags?: string[];
  description?: string;
}

export interface PaletteGenerationOptions {
  baseColor?: string;
  count?: number;
  saturation?: number;
  lightness?: number;
  temperature?: 'warm' | 'cool' | 'neutral';
}

/**
 * Custom hook for advanced palette management
 * Provides comprehensive palette generation, storage, and manipulation functionality
 */
export const usePaletteManagement = () => {
  // State management
  const [currentPalette, setCurrentPalette] = useState<ColorPalette | null>(null);
  const [paletteHistory, setPaletteHistory] = useState<ColorPalette[]>([]);
  const [favoritePalettes, setFavoritePalettes] = useState<ColorPalette[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Color utility functions
  const hexToHsl = useCallback((hex: string): [number, number, number] => {
    return hexToHslValues(hex);
  }, []);

  // Use shared HSL to hex conversion
  const convertHslToHex = useCallback((h: number, s: number, l: number): string => {
    return hslToHex(h, s, l);
  }, []);

  // Advanced palette generation algorithms
  const generateMonochromaticPalette = useCallback((baseColor: string, count: number = 5): string[] => {
    const [h, s, l] = hexToHsl(baseColor);
    const colors: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const newL = Math.max(10, Math.min(90, l + (i - Math.floor(count/2)) * 15));
      colors.push(convertHslToHex(h, s, newL));
    }
    
    return colors;
  }, [hexToHsl, convertHslToHex]);

  const generateAnalogousPalette = useCallback((baseColor: string, count: number = 5): string[] => {
    const [h, s, l] = hexToHsl(baseColor);
    const colors: string[] = [];
    const step = 30; // 30 degrees apart
    
    for (let i = 0; i < count; i++) {
      const newH = (h + (i - Math.floor(count/2)) * step + 360) % 360;
      colors.push(convertHslToHex(newH, s, l));
    }
    
    return colors;
  }, [hexToHsl, convertHslToHex]);

  const generateComplementaryPalette = useCallback((baseColor: string): string[] => {
    const [h, s, l] = hexToHsl(baseColor);
    const complementaryH = (h + 180) % 360;
    
    return [
      baseColor,
      convertHslToHex(complementaryH, s, l),
      convertHslToHex(h, s * 0.7, l * 1.2),
      convertHslToHex(complementaryH, s * 0.7, l * 1.2),
      convertHslToHex(h, s * 0.5, l * 0.8)
    ];
  }, [hexToHsl, convertHslToHex]);

  const generateTriadicPalette = useCallback((baseColor: string): string[] => {
    const [h, s, l] = hexToHsl(baseColor);
    
    return [
      baseColor,
      convertHslToHex((h + 120) % 360, s, l),
      convertHslToHex((h + 240) % 360, s, l),
      convertHslToHex(h, s * 0.6, l * 1.1),
      convertHslToHex((h + 120) % 360, s * 0.6, l * 1.1)
    ];
  }, [hexToHsl, convertHslToHex]);

  const generateTetradicPalette = useCallback((baseColor: string): string[] => {
    const [h, s, l] = hexToHsl(baseColor);
    
    return [
      baseColor,
      convertHslToHex((h + 90) % 360, s, l),
      convertHslToHex((h + 180) % 360, s, l),
      convertHslToHex((h + 270) % 360, s, l),
      convertHslToHex(h, s * 0.7, l * 0.9)
    ];
  }, [hexToHsl, convertHslToHex]);

  // Advanced palette generation with options
  const generateAdvancedPalette = useCallback(async (
    type: string, 
    options: PaletteGenerationOptions = {}
  ): Promise<ColorPalette> => {
    setIsGenerating(true);
    
    try {
      const baseColor = options.baseColor || `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
      const count = options.count || 5;
      let colors: string[] = [];
      let category = type;
      let name = '';
      
      switch (type) {
        case 'monochromatic':
          colors = generateMonochromaticPalette(baseColor, count);
          name = 'Palette Monochromatique';
          break;
        case 'analogous':
          colors = generateAnalogousPalette(baseColor, count);
          name = 'Palette Analogue';
          break;
        case 'complementary':
          colors = generateComplementaryPalette(baseColor);
          name = 'Palette Complémentaire';
          break;
        case 'triadic':
          colors = generateTriadicPalette(baseColor);
          name = 'Palette Triadique';
          break;
        case 'tetradic':
          colors = generateTetradicPalette(baseColor);
          name = 'Palette Tétradique';
          break;
        case 'warm':
          colors = Array.from({ length: count }, () => {
            const [h] = hexToHsl(baseColor);
            const warmH = (h + Math.random() * 60 - 30 + 360) % 360;
            const warmS = 70 + Math.random() * 30;
            const warmL = 45 + Math.random() * 30;
            return convertHslToHex(warmH < 60 || warmH > 300 ? warmH : (warmH + 180) % 360, warmS, warmL);
          });
          name = 'Palette Chaude';
          category = 'temperature';
          break;
        case 'cool':
          colors = Array.from({ length: count }, () => {
            const coolH = 180 + Math.random() * 120;
            const coolS = 60 + Math.random() * 40;
            const coolL = 40 + Math.random() * 40;
            return convertHslToHex(coolH, coolS, coolL);
          });
          name = 'Palette Froide';
          category = 'temperature';
          break;
        case 'pastel':
          colors = Array.from({ length: count }, () => {
            const pastelH = Math.random() * 360;
            const pastelS = 30 + Math.random() * 40;
            const pastelL = 75 + Math.random() * 15;
            return convertHslToHex(pastelH, pastelS, pastelL);
          });
          name = 'Palette Pastel';
          category = 'mood';
          break;
        case 'vibrant':
          colors = Array.from({ length: count }, () => {
            const vibrantH = Math.random() * 360;
            const vibrantS = 80 + Math.random() * 20;
            const vibrantL = 45 + Math.random() * 20;
            return convertHslToHex(vibrantH, vibrantS, vibrantL);
          });
          name = 'Palette Vibrante';
          category = 'mood';
          break;
        default:
           colors = Array.from({ length: count }, () => generateRandomHexColor());
          name = 'Palette Aléatoire';
          category = 'random';
      }
      
      const palette: ColorPalette = {
        id: `palette_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        colors,
        category,
        createdAt: new Date(),
        tags: [type, category],
        description: `Palette générée avec l'algorithme ${type}`
      };
      
      setCurrentPalette(palette);
      setPaletteHistory(prev => [palette, ...prev.slice(0, 49)]); // Keep last 50
      
      return palette;
    } catch (error) {
      console.error('Error generating palette:', error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, [generateMonochromaticPalette, generateAnalogousPalette, generateComplementaryPalette, 
      generateTriadicPalette, generateTetradicPalette, hexToHsl, convertHslToHex]);

  // Palette management functions
  const toggleFavoritePalette = useCallback((palette: ColorPalette) => {
    setFavoritePalettes(prev => {
      const exists = prev.find(p => p.id === palette.id);
      if (exists) {
        toast.success('Palette retirée des favoris');
        return prev.filter(p => p.id !== palette.id);
      } else {
        toast.success('Palette ajoutée aux favoris');
        return [palette, ...prev];
      }
    });
  }, []);

  const copyPaletteToClipboard = useCallback(async (palette: ColorPalette, format: 'hex' | 'css' | 'json' = 'hex') => {
    try {
      let content = '';
      
      switch (format) {
        case 'hex':
          content = palette.colors.join(', ');
          break;
        case 'css':
          content = palette.colors.map((color, index) => `--color-${index + 1}: ${color};`).join('\n');
          break;
        case 'json':
          content = JSON.stringify(palette, null, 2);
          break;
      }
      
      await navigator.clipboard.writeText(content);
      toast.success(`Palette copiée au format ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Error copying palette:', error);
      toast.error('Erreur lors de la copie');
    }
  }, []);

  const exportPalettes = useCallback(async (palettes: ColorPalette[]) => {
    try {
      const dataStr = JSON.stringify(palettes, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `palettes_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      toast.success('Palettes exportées avec succès');
    } catch (error) {
      console.error('Error exporting palettes:', error);
      toast.error('Erreur lors de l\'exportation');
    }
  }, []);

  // Computed values
  const paletteStats = useMemo(() => ({
    totalPalettes: paletteHistory.length,
    favoritesCount: favoritePalettes.length,
    categoriesCount: new Set(paletteHistory.map(p => p.category)).size,
    recentPalettes: paletteHistory.slice(0, 10)
  }), [paletteHistory, favoritePalettes]);

  return {
    // State
    currentPalette,
    paletteHistory,
    favoritePalettes,
    isGenerating,
    paletteStats,
    
    // Actions
    generateAdvancedPalette,
    toggleFavoritePalette,
    copyPaletteToClipboard,
    exportPalettes,
    setCurrentPalette,
    
    // Utilities
    hexToHsl,
    convertHslToHex
  };
};