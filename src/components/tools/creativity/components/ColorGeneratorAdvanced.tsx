import React, { useMemo, useState, useCallback } from 'react';
import { 
  UnifiedCard as Card, 
  UnifiedButton as Button,
  UnifiedInput as Input,
  UnifiedBadge as Badge,

  CreativityToolHeader,
  UnifiedExportButton,
  UnifiedColorPicker
} from '@/components/ui/design-system';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Copy, 
  RefreshCw, 
  Heart, 
  Download, 
  Palette, 
  Pipette, 
  Eye,
  Zap,
  History,
  Star,
  Info,
  Brain,
  Accessibility,
  Target,
  Settings
} from 'lucide-react';
import { useAnimation, useDesignSystem } from '@/components/ui/design-system/hooks';
import { animationPresets } from '@/components/ui/design-system/animations';
import { ColorPaletteExtractor } from './ColorPaletteExtractor';
import { ColorHarmonyGenerator } from './ColorHarmonyGenerator';
import { useColorManagement, type ColorInfo } from '../hooks/useColorManagement';
import { ColorItem, ColorGrid, ColorPalette } from './shared/ColorDisplay';
import { AccessibilityInfo } from './shared/AccessibilityInfo';
import { ColorInput, RangeSlider, SelectDropdown, ActionButtons, FormSection, ColorFormatSelector } from './shared/FormControls';
import { ColorBlindnessSimulator } from './shared/ColorBlindnessSimulator';
import { ColorPsychologyAnalyzer } from './shared/ColorPsychologyAnalyzer';
import { ColorHarmonyAnalyzer } from './shared/ColorHarmonyAnalyzer';

/**
 * Advanced Color Generator Component
 * Modernized with unified design system
 * Features: Random generation, format conversion, history, favorites, accessibility info
 */
export const ColorGeneratorAdvanced: React.FC = () => {
  const { tokens } = useDesignSystem();
  const { animate } = useAnimation({ duration: 300, easing: 'ease-out' });
  // Use custom hook for color management
  const {
    currentColor,
    colorHistory,
    favorites,
    inputColor,
    currentColorInfo,
    colorFormats,
    setCurrentColor,
    setInputColor,
    generateNewColor,
    handleColorInput,
    copyToClipboard,
    toggleFavorite,
    exportColors
  } = useColorManagement();

  const [selectedFormat, setSelectedFormat] = useState<string>('hex');
  const [activeTab, setActiveTab] = useState('generator');
  const [isGenerating, setIsGenerating] = useState(false);

  // Additional state for history management
  const clearHistory = useCallback(() => {
    // This would need to be implemented in the useColorManagement hook
    console.log('Clear history');
  }, []);

  /**
   * Memoized color format options for display
   */
  const colorFormatOptions = useMemo(() => [
    { label: 'HEX', value: colorFormats.hex, icon: '#' },
    { label: 'RGB', value: colorFormats.rgb, icon: 'R' },
    { label: 'HSL', value: colorFormats.hsl, icon: 'H' },
    { label: 'CMYK', value: colorFormats.cmyk, icon: 'C' },
    { label: 'HSV', value: colorFormats.hsv, icon: 'V' }
  ], [colorFormats]);

  /**
   * Tab configuration for the component
   */
  const tabConfig = useMemo(() => [
    { id: 'generator', label: 'Generator', icon: Palette },
    { id: 'harmonies', label: 'Harmonies', icon: Target },
    { id: 'psychology', label: 'Psychology', icon: Brain },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
    { id: 'history', label: 'History', icon: History }
  ], []);

  /**
   * Handle random color generation with loading state and animation
   */
  const handleRandomGeneration = useCallback(async () => {
    setIsGenerating(true);
    try {
      animate();
      await new Promise(resolve => setTimeout(resolve, 300)); // Small delay for UX
      generateNewColor();
    } finally {
      setIsGenerating(false);
    }
  }, [generateNewColor, animate, tokens.motion.duration.fast]);

  return (
    <div className="space-y-6">
      {/* Modern Tool Header */}
      <CreativityToolHeader
        title="Advanced Color Generator"
        subtitle="Professional Color Tools"
        description="Generate, convert, and manage colors with advanced tools for accessibility, psychology, and harmony analysis."
        icon={<Palette className="w-6 h-6" />}
        badges={['Color Generation', 'Format Conversion', 'Accessibility', 'Psychology Analysis']}
        toolType="generator"
        size="lg"
      />

      {/* Main Content with Unified Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {tabConfig.map(({ id, label, icon: Icon }) => (
            <TabsTrigger key={id} value={id} className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Generator Tab */}
        <TabsContent value="generator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Color Display Card */}
            <Card variant="default" className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Current Color
                </h3>
              </div>
              <div className="space-y-4">
                {/* Large Color Preview */}
                <div 
                  className="w-full h-32 rounded-lg border-2 border-border shadow-inner transition-all duration-300 hover:shadow-lg"
                  style={{ backgroundColor: currentColor }}
                />
                
                {/* Color Formats Display */}
                <div className="grid grid-cols-2 gap-3">
                  {colorFormatOptions.map(({ label, value, icon }) => (
                    <div key={label} className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono bg-muted-foreground/10 text-muted-foreground px-2 py-1 rounded border border-border">{icon}</span>
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono">{value}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(value, `${label} format`)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Controls Card */}
            <Card variant="default" className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Color Controls
                </h3>
              </div>
              <div className="space-y-4">
                {/* Color Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Color Input</label>
                  <div className="flex gap-2">
                    <Input
                      value={inputColor}
                      onChange={(e) => setInputColor(e.target.value)}
                      placeholder="#3B82F6 or rgb(59, 130, 246)"
                      className="flex-1"
                    />
                    <Button
                      onClick={handleColorInput}
                      variant="outline"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleRandomGeneration}
                    disabled={isGenerating}
                    className="flex items-center gap-2"
                    variant="primary"
                  >
                    <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                    {isGenerating ? 'Generating...' : 'Random Color'}
                  </Button>
                  
                  <Button
                    onClick={() => toggleFavorite(currentColorInfo)}
                    variant={favorites.some(fav => fav.hex === currentColor) ? 'primary' : 'outline'}
                    className="flex items-center gap-2"
                  >
                    <Heart className={`w-4 h-4 ${favorites.some(fav => fav.hex === currentColor) ? 'fill-current' : ''}`} />
                    Favorite
                  </Button>
                </div>

                {/* Export Options */}
                <UnifiedExportButton
                  formats={['css', 'json']}
                  onExport={() => exportColors()}
                  layout="dropdown"
                  className="w-full"
                />
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Other tabs content would go here... */}
        <TabsContent value="harmonies">
          <ColorHarmonyGenerator baseColor={currentColor} />
        </TabsContent>

        <TabsContent value="psychology">
          <ColorPsychologyAnalyzer color={currentColor} />
        </TabsContent>

        <TabsContent value="accessibility">
          <AccessibilityInfo color={currentColor} />
        </TabsContent>

        <TabsContent value="history">
          <Card variant="default" className="p-6">
            <div className="flex flex-row items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <History className="w-5 h-5" />
                Color History
              </h3>
              <Button onClick={clearHistory} variant="outline" size="sm">
                Clear History
              </Button>
            </div>
            <div>
              <ColorGrid 
                colors={colorHistory.map(color => ({
                  color: color.hex,
                  name: color.name,
                  isFavorite: color.isFavorite
                }))}
                onColorClick={setCurrentColor}
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
