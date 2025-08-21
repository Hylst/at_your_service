import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Palette, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Props for color harmony analyzer
 */
interface ColorHarmonyAnalyzerProps {
  baseColor: string;
  onColorSelect?: (color: string) => void;
  onPaletteGenerate?: (colors: string[]) => void;
  showCopyButtons?: boolean;
  className?: string;
}

/**
 * Color harmony scheme definition
 */
interface HarmonyScheme {
  name: string;
  description: string;
  colors: string[];
  icon: string;
}

/**
 * Component to analyze and generate color harmonies based on color theory
 */
export const ColorHarmonyAnalyzer: React.FC<ColorHarmonyAnalyzerProps> = ({
  baseColor,
  onColorSelect,
  onPaletteGenerate,
  showCopyButtons = true,
  className = ''
}) => {
  /**
   * Convert hex to HSL
   */
  const hexToHsl = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  /**
   * Convert HSL to hex
   */
  const hslToHex = (h: number, s: number, l: number): string => {
    h = h % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  /**
   * Generate color harmonies based on color theory
   */
  const generateHarmonies = (hex: string): HarmonyScheme[] => {
    const [hue, saturation, lightness] = hexToHsl(hex);
    
    const schemes: HarmonyScheme[] = [
      {
        name: 'Complémentaire',
        description: 'Couleurs opposées sur le cercle chromatique',
        icon: '🎯',
        colors: [
          hex,
          hslToHex((hue + 180) % 360, saturation, lightness)
        ]
      },
      {
        name: 'Triadique',
        description: 'Trois couleurs équidistantes sur le cercle',
        icon: '🔺',
        colors: [
          hex,
          hslToHex((hue + 120) % 360, saturation, lightness),
          hslToHex((hue + 240) % 360, saturation, lightness)
        ]
      },
      {
        name: 'Analogue',
        description: 'Couleurs adjacentes harmonieuses',
        icon: '🌈',
        colors: [
          hslToHex((hue - 30 + 360) % 360, saturation, lightness),
          hex,
          hslToHex((hue + 30) % 360, saturation, lightness)
        ]
      },
      {
        name: 'Complémentaire divisée',
        description: 'Base + deux couleurs adjacentes au complément',
        icon: '🎪',
        colors: [
          hex,
          hslToHex((hue + 150) % 360, saturation, lightness),
          hslToHex((hue + 210) % 360, saturation, lightness)
        ]
      },
      {
        name: 'Tétradique',
        description: 'Quatre couleurs formant un rectangle',
        icon: '⬜',
        colors: [
          hex,
          hslToHex((hue + 90) % 360, saturation, lightness),
          hslToHex((hue + 180) % 360, saturation, lightness),
          hslToHex((hue + 270) % 360, saturation, lightness)
        ]
      },
      {
        name: 'Carré',
        description: 'Quatre couleurs équidistantes',
        icon: '🔲',
        colors: [
          hex,
          hslToHex((hue + 90) % 360, saturation, lightness),
          hslToHex((hue + 180) % 360, saturation, lightness),
          hslToHex((hue + 270) % 360, saturation, lightness)
        ]
      },
      {
        name: 'Monochromatique',
        description: 'Variations de luminosité de la même teinte',
        icon: '🎨',
        colors: [
          hslToHex(hue, saturation, Math.max(10, lightness - 30)),
          hslToHex(hue, saturation, Math.max(10, lightness - 15)),
          hex,
          hslToHex(hue, saturation, Math.min(90, lightness + 15)),
          hslToHex(hue, saturation, Math.min(90, lightness + 30))
        ]
      },
      {
        name: 'Tons chauds',
        description: 'Palette de couleurs chaudes',
        icon: '🔥',
        colors: [
          hslToHex(0, saturation * 0.8, lightness),
          hslToHex(30, saturation * 0.9, lightness),
          hslToHex(60, saturation, lightness),
          hslToHex(15, saturation * 0.7, lightness * 0.8)
        ]
      },
      {
        name: 'Tons froids',
        description: 'Palette de couleurs froides',
        icon: '❄️',
        colors: [
          hslToHex(180, saturation, lightness),
          hslToHex(210, saturation * 0.9, lightness),
          hslToHex(240, saturation * 0.8, lightness),
          hslToHex(270, saturation * 0.7, lightness * 1.1)
        ]
      }
    ];

    return schemes;
  };

  /**
   * Copy color to clipboard
   */
  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      toast.success(`Couleur ${color} copiée !`);
    } catch (error) {
      toast.error('Erreur lors de la copie');
    }
  };

  /**
   * Copy entire palette to clipboard
   */
  const copyPalette = async (colors: string[]) => {
    try {
      const paletteText = colors.join(', ');
      await navigator.clipboard.writeText(paletteText);
      toast.success('Palette copiée !');
    } catch (error) {
      toast.error('Erreur lors de la copie');
    }
  };

  const harmonies = generateHarmonies(baseColor);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Harmonies Chromatiques
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Schémas de couleurs basés sur la théorie des couleurs
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {harmonies.map((scheme, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{scheme.icon}</span>
                <div>
                  <h4 className="font-medium">{scheme.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{scheme.description}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {showCopyButtons && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyPalette(scheme.colors)}
                    className="h-8 px-2"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                )}
                {onPaletteGenerate && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onPaletteGenerate(scheme.colors)}
                    className="h-8 px-2"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {scheme.colors.map((color, colorIndex) => (
                <div key={colorIndex} className="flex flex-col items-center gap-1">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer hover:scale-105 transition-transform shadow-sm"
                    style={{ backgroundColor: color }}
                    onClick={() => onColorSelect?.(color)}
                    title={`Cliquer pour sélectionner ${color}`}
                  />
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-mono text-gray-600 dark:text-gray-300">
                      {color.toUpperCase()}
                    </span>
                    {showCopyButtons && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyColor(color)}
                        className="h-6 px-1 text-xs"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">💡 Conseils d'utilisation</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Complémentaire</strong> : Idéal pour créer du contraste et attirer l'attention</li>
            <li>• <strong>Analogue</strong> : Parfait pour des designs harmonieux et apaisants</li>
            <li>• <strong>Triadique</strong> : Équilibre vibrant, utilisez une couleur dominante</li>
            <li>• <strong>Monochromatique</strong> : Élégant et sophistiqué, facile à utiliser</li>
            <li>• <strong>Tons chauds/froids</strong> : Créent une ambiance spécifique</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};