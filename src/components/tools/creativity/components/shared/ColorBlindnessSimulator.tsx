import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Info } from 'lucide-react';

/**
 * Props for color blindness simulator
 */
interface ColorBlindnessSimulatorProps {
  color: string;
  showDetails?: boolean;
  compact?: boolean;
  className?: string;
}

/**
 * Color blindness simulation types
 */
type ColorBlindnessType = {
  name: string;
  description: string;
  prevalence: string;
  simulate: (hex: string) => string;
};

/**
 * Component to simulate how colors appear to people with different types of color blindness
 */
export const ColorBlindnessSimulator: React.FC<ColorBlindnessSimulatorProps> = ({
  color,
  showDetails = true,
  compact = false,
  className = ''
}) => {
  /**
   * Convert hex to RGB
   */
  const hexToRgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  /**
   * Convert RGB to hex
   */
  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number) => {
      const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  /**
   * Color blindness simulation algorithms
   */
  const colorBlindnessTypes: ColorBlindnessType[] = [
    {
      name: 'Protanopia',
      description: 'Absence de cônes rouges',
      prevalence: '1% des hommes',
      simulate: (hex: string) => {
        const [r, g, b] = hexToRgb(hex);
        // Protanopia simulation matrix
        const newR = 0.567 * r + 0.433 * g + 0 * b;
        const newG = 0.558 * r + 0.442 * g + 0 * b;
        const newB = 0 * r + 0.242 * g + 0.758 * b;
        return rgbToHex(newR, newG, newB);
      }
    },
    {
      name: 'Deuteranopia',
      description: 'Absence de cônes verts',
      prevalence: '1% des hommes',
      simulate: (hex: string) => {
        const [r, g, b] = hexToRgb(hex);
        // Deuteranopia simulation matrix
        const newR = 0.625 * r + 0.375 * g + 0 * b;
        const newG = 0.7 * r + 0.3 * g + 0 * b;
        const newB = 0 * r + 0.3 * g + 0.7 * b;
        return rgbToHex(newR, newG, newB);
      }
    },
    {
      name: 'Tritanopia',
      description: 'Absence de cônes bleus',
      prevalence: '0.003% population',
      simulate: (hex: string) => {
        const [r, g, b] = hexToRgb(hex);
        // Tritanopia simulation matrix
        const newR = 0.95 * r + 0.05 * g + 0 * b;
        const newG = 0 * r + 0.433 * g + 0.567 * b;
        const newB = 0 * r + 0.475 * g + 0.525 * b;
        return rgbToHex(newR, newG, newB);
      }
    },
    {
      name: 'Protanomaly',
      description: 'Cônes rouges altérés',
      prevalence: '1% des hommes',
      simulate: (hex: string) => {
        const [r, g, b] = hexToRgb(hex);
        // Protanomaly simulation (partial)
        const newR = 0.817 * r + 0.183 * g + 0 * b;
        const newG = 0.333 * r + 0.667 * g + 0 * b;
        const newB = 0 * r + 0.125 * g + 0.875 * b;
        return rgbToHex(newR, newG, newB);
      }
    },
    {
      name: 'Deuteranomaly',
      description: 'Cônes verts altérés',
      prevalence: '5% des hommes',
      simulate: (hex: string) => {
        const [r, g, b] = hexToRgb(hex);
        // Deuteranomaly simulation (partial)
        const newR = 0.8 * r + 0.2 * g + 0 * b;
        const newG = 0.258 * r + 0.742 * g + 0 * b;
        const newB = 0 * r + 0.142 * g + 0.858 * b;
        return rgbToHex(newR, newG, newB);
      }
    },
    {
      name: 'Tritanomaly',
      description: 'Cônes bleus altérés',
      prevalence: '0.01% population',
      simulate: (hex: string) => {
        const [r, g, b] = hexToRgb(hex);
        // Tritanomaly simulation (partial)
        const newR = 0.967 * r + 0.033 * g + 0 * b;
        const newG = 0 * r + 0.733 * g + 0.267 * b;
        const newB = 0 * r + 0.183 * g + 0.817 * b;
        return rgbToHex(newR, newG, newB);
      }
    },
    {
      name: 'Achromatopsia',
      description: 'Vision en niveaux de gris',
      prevalence: '0.003% population',
      simulate: (hex: string) => {
        const [r, g, b] = hexToRgb(hex);
        // Convert to grayscale using luminance formula
        const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        return rgbToHex(gray, gray, gray);
      }
    }
  ];

  if (compact) {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 ${className}`}>
        {colorBlindnessTypes.slice(0, 4).map((type) => {
          const simulatedColor = type.simulate(color);
          return (
            <div key={type.name} className="text-center">
              <div
                className="w-full h-12 rounded-lg border-2 border-gray-200 dark:border-gray-600 mb-1"
                style={{ backgroundColor: simulatedColor }}
                title={`${type.name}: ${type.description}`}
              />
              <div className="text-xs font-medium truncate">{type.name}</div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Simulation Daltonisme
        </CardTitle>
        {showDetails && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4" />
            Comment cette couleur apparaît aux personnes daltoniennes
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Original color */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div
              className="w-12 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-600 flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <div className="flex-1">
              <div className="font-medium">Vision normale</div>
              <div className="text-sm text-muted-foreground">Couleur originale</div>
            </div>
            <Badge variant="outline">100% population</Badge>
          </div>

          {/* Simulated colors */}
          <div className="grid gap-3">
            {colorBlindnessTypes.map((type) => {
              const simulatedColor = type.simulate(color);
              const isDifferent = simulatedColor.toLowerCase() !== color.toLowerCase();
              
              return (
                <div key={type.name} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-600 flex-shrink-0"
                    style={{ backgroundColor: simulatedColor }}
                  />
                  <div className="flex-1">
                    <div className="font-medium flex items-center gap-2">
                      {type.name}
                      {!isDifferent && <EyeOff className="w-4 h-4 text-green-600" />}
                    </div>
                    <div className="text-sm text-muted-foreground">{type.description}</div>
                    {showDetails && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Couleur perçue: {simulatedColor}
                      </div>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {type.prevalence}
                  </Badge>
                </div>
              );
            })}
          </div>

          {showDetails && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-800 mb-1">
                <Info className="w-4 h-4" />
                Conseils d'accessibilité
              </div>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Utilisez des contrastes élevés pour améliorer la lisibilité</li>
                <li>• Ne vous fiez pas uniquement à la couleur pour transmettre l'information</li>
                <li>• Testez vos designs avec des simulateurs de daltonisme</li>
                <li>• Considérez des motifs ou des formes en complément des couleurs</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};