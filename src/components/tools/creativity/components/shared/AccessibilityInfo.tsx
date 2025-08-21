import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { calculateContrast, calculateLuminance, checkAccessibility } from '@/utils/colorUtils';

/**
 * Props for accessibility information display
 */
interface AccessibilityInfoProps {
  color: string;
  backgroundColor?: string;
  showDetails?: boolean;
  compact?: boolean;
  className?: string;
}

/**
 * Component to display color accessibility information
 */
export const AccessibilityInfo: React.FC<AccessibilityInfoProps> = ({
  color,
  backgroundColor = '#FFFFFF',
  showDetails = true,
  compact = false,
  className = ''
}) => {
  /**
   * Calculate accessibility metrics
   */
  const accessibilityData = React.useMemo(() => {
    const whiteContrast = calculateContrast(color, '#FFFFFF');
    const blackContrast = calculateContrast(color, '#000000');
    const bgContrast = calculateContrast(color, backgroundColor);
    const luminance = calculateLuminance(color);
    
    const whiteAccessibility = checkAccessibility(color, '#FFFFFF');
    const blackAccessibility = checkAccessibility(color, '#000000');
    const bgAccessibility = checkAccessibility(color, backgroundColor);
    
    const bestTextColor = whiteContrast > blackContrast ? '#FFFFFF' : '#000000';
    const bestContrast = Math.max(whiteContrast, blackContrast);
    const bestAccessibility = whiteContrast > blackContrast ? whiteAccessibility : blackAccessibility;
    
    return {
      luminance,
      whiteContrast,
      blackContrast,
      bgContrast,
      whiteAccessibility,
      blackAccessibility,
      bgAccessibility,
      bestTextColor,
      bestContrast,
      bestAccessibility,
      isLight: luminance > 0.5,
      temperature: getColorTemperature(color)
    };
  }, [color, backgroundColor]);

  /**
   * Get color temperature (warm/cool)
   */
  function getColorTemperature(hex: string): 'warm' | 'cool' | 'neutral' {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    const warmth = (r - b) / 255;
    
    if (warmth > 0.1) return 'warm';
    if (warmth < -0.1) return 'cool';
    return 'neutral';
  }

  /**
   * Get accessibility level badge
   */
  const getAccessibilityBadge = (accessibility: ReturnType<typeof checkAccessibility>) => {
    if (accessibility.aaa) {
      return <Badge className="bg-green-600 text-white">AAA</Badge>;
    }
    if (accessibility.aa) {
      return <Badge className="bg-blue-600 text-white">AA</Badge>;
    }
    if (accessibility.aaLarge) {
      return <Badge className="bg-yellow-600 text-white">AA Large</Badge>;
    }
    return <Badge variant="destructive">Fail</Badge>;
  };

  /**
   * Get contrast ratio display with icon
   */
  const getContrastDisplay = (ratio: number, accessibility: ReturnType<typeof checkAccessibility>) => {
    const icon = accessibility.aa ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <AlertTriangle className="w-4 h-4 text-yellow-600" />
    );
    
    return (
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-mono text-sm">{ratio.toFixed(2)}:1</span>
        {getAccessibilityBadge(accessibility)}
      </div>
    );
  };

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Eye className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        {getAccessibilityBadge(accessibilityData.bestAccessibility)}
        <span className="text-sm font-mono">
          {accessibilityData.bestContrast.toFixed(1)}:1
        </span>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Eye className="w-5 h-5" />
          Accessibilité & Propriétés
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contrast ratios */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 dark:text-gray-200">Ratios de Contraste</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="text-sm text-gray-900 dark:text-gray-100">Sur fond blanc:</span>
              {getContrastDisplay(accessibilityData.whiteContrast, accessibilityData.whiteAccessibility)}
            </div>
            
            <div className="flex items-center justify-between p-2 bg-gray-900 text-white rounded">
              <span className="text-sm">Sur fond noir:</span>
              {getContrastDisplay(accessibilityData.blackContrast, accessibilityData.blackAccessibility)}
            </div>
            
            {backgroundColor !== '#FFFFFF' && backgroundColor !== '#000000' && (
              <div 
                className="flex items-center justify-between p-2 rounded"
                style={{ backgroundColor }}
              >
                <span className="text-sm">Sur fond personnalisé:</span>
                {getContrastDisplay(accessibilityData.bgContrast, accessibilityData.bgAccessibility)}
              </div>
            )}
          </div>
        </div>

        {/* Color properties */}
        {showDetails && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700 dark:text-gray-200">Propriétés de la Couleur</h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-xs text-gray-600 dark:text-gray-200 uppercase tracking-wide">Luminance</div>
                <div className="font-mono text-sm text-gray-900 dark:text-gray-100">
                  {(accessibilityData.luminance * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300">
                  {accessibilityData.isLight ? 'Claire' : 'Sombre'}
                </div>
              </div>
              
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-xs text-gray-600 dark:text-gray-200 uppercase tracking-wide">Température</div>
                <div className="text-sm capitalize text-gray-900 dark:text-gray-100">
                  {accessibilityData.temperature === 'warm' ? 'Chaude' : 
                   accessibilityData.temperature === 'cool' ? 'Froide' : 'Neutre'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Best text color recommendation */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Recommandation
            </span>
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            Utiliser du texte{' '}
            <span 
              className="px-2 py-1 rounded font-mono"
              style={{ 
                backgroundColor: accessibilityData.bestTextColor,
                color: color
              }}
            >
              {accessibilityData.bestTextColor === '#FFFFFF' ? 'blanc' : 'noir'}
            </span>
            {' '}pour un contraste optimal ({accessibilityData.bestContrast.toFixed(2)}:1)
          </div>
        </div>

        {/* Accessibility guidelines info */}
        <div className="text-xs text-gray-500 dark:text-gray-300 space-y-1">
          <div>• AA: Contraste minimum 4.5:1 (texte normal)</div>
          <div>• AA Large: Contraste minimum 3:1 (texte large)</div>
          <div>• AAA: Contraste minimum 7:1 (texte normal)</div>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Props for accessibility comparison
 */
interface AccessibilityComparisonProps {
  colors: string[];
  backgroundColor?: string;
  className?: string;
}

/**
 * Component to compare accessibility of multiple colors
 */
export const AccessibilityComparison: React.FC<AccessibilityComparisonProps> = ({
  colors,
  backgroundColor = '#FFFFFF',
  className = ''
}) => {
  /**
   * Calculate accessibility for all colors
   */
  const accessibilityData = React.useMemo(() => {
    return colors.map(color => {
      const contrast = calculateContrast(color, backgroundColor);
      const accessibility = checkAccessibility(color, backgroundColor);
      return {
        color,
        contrast,
        accessibility,
        luminance: calculateLuminance(color)
      };
    });
  }, [colors, backgroundColor]);

  /**
   * Sort colors by accessibility score
   */
  const sortedByAccessibility = React.useMemo(() => {
    return [...accessibilityData].sort((a, b) => b.contrast - a.contrast);
  }, [accessibilityData]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Comparaison d'Accessibilité
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sortedByAccessibility.map(({ color, contrast, accessibility }, index) => (
            <div key={color} className="flex items-center gap-3 p-2 rounded border">
              <div 
                className="w-8 h-8 rounded border-2 border-white shadow-sm"
                style={{ backgroundColor: color }}
              />
              <div className="flex-1">
                <div className="font-mono text-sm">{color}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm">{contrast.toFixed(2)}:1</span>
                {accessibility.aaa && <Badge className="bg-green-600">AAA</Badge>}
                {accessibility.aa && !accessibility.aaa && <Badge className="bg-blue-600">AA</Badge>}
                {accessibility.aaLarge && !accessibility.aa && <Badge className="bg-yellow-600">AA Large</Badge>}
                {!accessibility.aaLarge && <Badge variant="destructive">Fail</Badge>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};