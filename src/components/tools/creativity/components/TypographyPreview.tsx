import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Tablet, Smartphone, Type, List, FileText, Palette } from 'lucide-react';
import { TypographyStyle } from '../types/typographyTypes';

/**
 * Props for the TypographyPreview component
 */
interface TypographyPreviewProps {
  style: TypographyStyle;
  sampleText: string;
  className?: string;
}

/**
 * Preview mode types for different text layouts
 */
type PreviewMode = 'heading' | 'paragraph' | 'list' | 'mixed';

/**
 * Background theme options for preview
 */
type BackgroundTheme = 'light' | 'dark' | 'colored' | 'gradient';

/**
 * Device size options for responsive preview
 */
type DeviceSize = 'desktop' | 'tablet' | 'mobile';

/**
 * Enhanced typography preview component with multiple display modes
 */
export const TypographyPreview: React.FC<TypographyPreviewProps> = ({
  style,
  sampleText,
  className = ''
}) => {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('heading');
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>('light');
  const [deviceSize, setDeviceSize] = useState<DeviceSize>('desktop');

  /**
   * Generate CSS styles from TypographyStyle object
   */
  const generatePreviewStyles = (baseStyle: TypographyStyle): React.CSSProperties => {
    const styles: React.CSSProperties = {
      fontFamily: baseStyle.fontFamily,
      fontSize: `${baseStyle.fontSize}px`,
      fontWeight: baseStyle.fontWeight,
      lineHeight: baseStyle.lineHeight,
      color: baseStyle.color,
      letterSpacing: `${baseStyle.letterSpacing}px`,
      wordSpacing: `${baseStyle.wordSpacing}px`,
      textAlign: baseStyle.textAlign as any,
      textTransform: baseStyle.textTransform as any,
      textDecoration: baseStyle.textDecoration,
    };

    // Add text shadow if defined
    if (baseStyle.textShadow && baseStyle.textShadow !== 'none') {
      styles.textShadow = baseStyle.textShadow;
    }

    // Add background gradient if defined
    if (baseStyle.gradient && baseStyle.gradient !== 'none') {
      styles.background = baseStyle.gradient;
      styles.WebkitBackgroundClip = 'text';
      styles.WebkitTextFillColor = 'transparent';
      styles.backgroundClip = 'text';
    }

    return styles;
  };

  /**
   * Get background styles based on selected theme
   */
  const getBackgroundStyles = (): React.CSSProperties => {
    switch (backgroundTheme) {
      case 'dark':
        return {
          backgroundColor: '#1a1a1a',
          color: '#ffffff'
        };
      case 'colored':
        return {
          backgroundColor: '#f0f9ff',
          color: '#0f172a'
        };
      case 'gradient':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#ffffff'
        };
      default:
        return {
          backgroundColor: '#ffffff',
          color: '#000000'
        };
    }
  };

  /**
   * Get container width based on device size
   */
  const getDeviceWidth = (): string => {
    switch (deviceSize) {
      case 'mobile':
        return 'max-w-sm';
      case 'tablet':
        return 'max-w-md';
      default:
        return 'max-w-full';
    }
  };

  /**
   * Render preview content based on selected mode
   */
  const renderPreviewContent = () => {
    const previewStyles = generatePreviewStyles(style);

    switch (previewMode) {
      case 'paragraph':
        return (
          <div style={previewStyles}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </div>
        );
      
      case 'list':
        return (
          <ul style={previewStyles} className="space-y-2">
            <li>Premier élément de la liste</li>
            <li>Deuxième élément avec plus de texte pour voir le rendu</li>
            <li>Troisième élément</li>
            <li>Quatrième élément final</li>
          </ul>
        );
      
      case 'mixed':
        return (
          <div className="space-y-4">
            <h1 style={{...previewStyles, fontSize: `${style.fontSize * 1.5}px`, fontWeight: 'bold'}}>
              Titre Principal
            </h1>
            <h2 style={{...previewStyles, fontSize: `${style.fontSize * 1.2}px`, fontWeight: '600'}}>
              Sous-titre
            </h2>
            <p style={previewStyles}>
              Ceci est un paragraphe de démonstration qui montre comment le style typographique s'applique au texte courant. Il permet de voir l'effet global sur différents types de contenu.
            </p>
            <ul style={previewStyles} className="space-y-1 ml-4">
              <li>• Élément de liste</li>
              <li>• Autre élément</li>
            </ul>
          </div>
        );
      
      default: // heading
        return (
          <h1 style={previewStyles}>
            {sampleText || 'Titre de Démonstration'}
          </h1>
        );
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Preview Controls */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        {/* Preview Mode Selector */}
        <div className="flex gap-1">
          <Button
            variant={previewMode === 'heading' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('heading')}
            className="flex items-center gap-1"
          >
            <Type className="w-3 h-3" />
            Titre
          </Button>
          <Button
            variant={previewMode === 'paragraph' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('paragraph')}
            className="flex items-center gap-1"
          >
            <FileText className="w-3 h-3" />
            Paragraphe
          </Button>
          <Button
            variant={previewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('list')}
            className="flex items-center gap-1"
          >
            <List className="w-3 h-3" />
            Liste
          </Button>
          <Button
            variant={previewMode === 'mixed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewMode('mixed')}
            className="flex items-center gap-1"
          >
            <FileText className="w-3 h-3" />
            Mixte
          </Button>
        </div>

        {/* Background Theme Selector */}
        <div className="flex gap-1">
          <Button
            variant={backgroundTheme === 'light' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setBackgroundTheme('light')}
          >
            Clair
          </Button>
          <Button
            variant={backgroundTheme === 'dark' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setBackgroundTheme('dark')}
          >
            Sombre
          </Button>
          <Button
            variant={backgroundTheme === 'colored' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setBackgroundTheme('colored')}
          >
            Coloré
          </Button>
          <Button
            variant={backgroundTheme === 'gradient' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setBackgroundTheme('gradient')}
          >
            Dégradé
          </Button>
        </div>
      </div>

      {/* Device Size Selector */}
      <div className="flex gap-1 items-center">
        <span className="text-sm text-muted-foreground mr-2">Taille:</span>
        <Button
          variant={deviceSize === 'desktop' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setDeviceSize('desktop')}
          className="flex items-center gap-1"
        >
          <Monitor className="w-3 h-3" />
          Bureau
        </Button>
        <Button
          variant={deviceSize === 'tablet' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setDeviceSize('tablet')}
          className="flex items-center gap-1"
        >
          <Tablet className="w-3 h-3" />
          Tablette
        </Button>
        <Button
          variant={deviceSize === 'mobile' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setDeviceSize('mobile')}
          className="flex items-center gap-1"
        >
          <Smartphone className="w-3 h-3" />
          Mobile
        </Button>
      </div>

      {/* Preview Area */}
      <Card className={`${getDeviceWidth()} mx-auto transition-all duration-300`}>
        <CardContent 
          className="p-6 min-h-[200px] flex items-center justify-center transition-all duration-300"
          style={getBackgroundStyles()}
        >
          <div className="w-full text-center">
            {renderPreviewContent()}
          </div>
        </CardContent>
      </Card>

      {/* Style Information */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge variant="secondary">
          {style.fontFamily}
        </Badge>
        <Badge variant="secondary">
          {style.fontSize}px
        </Badge>
        <Badge variant="secondary">
          {style.fontWeight}
        </Badge>
        <Badge variant="secondary">
          {style.lineHeight}
        </Badge>
      </div>
    </div>
  );
};