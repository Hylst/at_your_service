
import React, { useState, useCallback, useMemo } from 'react';
import {
  UnifiedCard as Card,
  UnifiedButton as Button,
  UnifiedBadge as Badge,
  CreativityToolHeader,
  UnifiedExportButton,
  UnifiedInput as Input
} from '@/components/ui/design-system';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { useAnimation, useDesignSystem } from '@/components/ui/design-system/hooks';
import { animationPresets } from '@/components/ui/design-system/animations';
import {
  Palette, 
  Zap, 
  Download, 
  Heart, 
  Copy, 
  Shuffle, 
  Settings,
  History,
  Star,
  Grid,
  List,
  Code,
  Share,
  RefreshCw,
  Wand2,
  Paintbrush,
  Sparkles
} from "lucide-react";
import { usePaletteManagement, type ColorPalette, type PaletteGenerationOptions } from '@/hooks/usePaletteManagement';
import { TabsManager } from './shared/TabsManager';
import { ColorItem, ColorGrid } from './shared/ColorDisplay';
import { AccessibilityInfo, AccessibilityComparison } from './shared/AccessibilityInfo';
import { ColorInput, RangeSlider, SelectDropdown, ActionButtons, FormSection, ColorFormatSelector } from './shared/FormControls';
import { ColorHarmonyAnalyzer } from './shared/ColorHarmonyAnalyzer';
import { ColorPsychologyAnalyzer } from './shared/ColorPsychologyAnalyzer';
import { ColorPaletteExtractor } from './ColorPaletteExtractor';
import { generateRandomHexColor, hexToHslValues, hslToHex } from '@/utils/colorUtils';

/**
 * Advanced Palette Generator Component
 * Modernized with unified design system
 * Provides intelligent palette generation with multiple algorithms and customization options
 */
export const PaletteGenerator: React.FC = () => {
  const { tokens } = useDesignSystem();
  const { animate } = useAnimation({ duration: 300, easing: 'ease-out' });
  // Use the custom palette management hook
  const {
    currentPalette,
    paletteHistory,
    favoritePalettes,
    isGenerating,
    paletteStats,
    generateAdvancedPalette,
    toggleFavoritePalette,
    copyPaletteToClipboard,
    exportPalettes,
    setCurrentPalette
  } = usePaletteManagement();

  // Local state for UI controls
  const [activeTab, setActiveTab] = useState('generator');
  const [selectedCategory, setSelectedCategory] = useState('monochromatic');
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [paletteCount, setPaletteCount] = useState(5);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [generationOptions, setGenerationOptions] = useState<PaletteGenerationOptions>({
    saturation: 70,
    lightness: 50,
    temperature: 'neutral'
  });

  // Tab configuration for the component
  const tabConfig = useMemo(() => [
    { id: 'generator', label: 'Générateur', icon: Palette },
    { id: 'advanced', label: 'Avancé', icon: Settings },
    { id: 'extractor', label: 'Extractor', icon: Download },
    { id: 'history', label: 'Historique', icon: History },
    { id: 'favorites', label: 'Favoris', icon: Heart }
  ], []);

  // Palette categories with enhanced options
  const paletteCategories = useMemo(() => ({
    monochromatic: { name: 'Monochromatique', icon: Palette, description: 'Variations d\'une seule couleur' },
    analogous: { name: 'Analogue', icon: Paintbrush, description: 'Couleurs adjacentes sur le cercle chromatique' },
    complementary: { name: 'Complémentaire', icon: Zap, description: 'Couleurs opposées sur le cercle chromatique' },
    triadic: { name: 'Triadique', icon: Sparkles, description: 'Trois couleurs équidistantes' },
    tetradic: { name: 'Tétradique', icon: Grid, description: 'Quatre couleurs en rectangle' },
    splitComplementary: { name: 'Complémentaire divisée', icon: Wand2, description: 'Une couleur et deux adjacentes à sa complémentaire' },
    square: { name: 'Carré', icon: Grid, description: 'Quatre couleurs équidistantes' }
  }), []);

  /**
   * Handle palette generation with advanced options and animation
   */
  const handleGeneratePalette = useCallback(async () => {
    try {
      await animate();
      await generateAdvancedPalette(selectedCategory, {
        baseColor,
        count: paletteCount,
        ...generationOptions
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error generating palette",
        variant: "destructive"
      });
    }
  }, [selectedCategory, baseColor, paletteCount, generationOptions, generateAdvancedPalette, animate]);

  /**
   * Handle random palette generation
   */
  const handleRandomGeneration = useCallback(async () => {
    const randomCategory = Object.keys(paletteCategories)[Math.floor(Math.random() * Object.keys(paletteCategories).length)];
    const randomColor = generateRandomHexColor();
    
    try {
      await generateAdvancedPalette(randomCategory, {
        baseColor: randomColor,
        count: paletteCount,
        ...generationOptions
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la génération aléatoire",
        variant: "destructive"
      });
    }
  }, [paletteCategories, paletteCount, generationOptions, generateAdvancedPalette]);

  return (
    <div className="space-y-6">
      {/* Modern Tool Header */}
      <CreativityToolHeader
        title="Advanced Palette Generator"
        subtitle="Intelligent Color Palettes"
        description="Generate harmonious color palettes using advanced algorithms and customization options for professional design projects."
        icon={<Palette className="w-6 h-6" />}
        badges={['Smart Generation', 'Multiple Algorithms', 'Export Ready', 'Accessibility Focused']}
        toolType="generator"
        size="lg"
      />

      <TabsManager
        tabs={[
          {
            id: 'generator',
            label: 'Générateur',
            icon: Palette,
            content: (
              <div className="space-y-6">
                <FormSection 
                  title="Générateur de Palettes Intelligent"
                >
                  <div className="flex justify-between items-center mb-4">
                    <ActionButtons
                      onRandom={handleRandomGeneration}
                      onExport={() => exportPalettes(paletteHistory)}
                      randomLabel="Aléatoire"
                      exportLabel="Export"
                      isGenerating={isGenerating}
                    />
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Generation Controls */}
                    <div className="space-y-4">
                      <ColorInput
                        label="Couleur de base"
                        value={baseColor}
                        onChange={setBaseColor}
                        placeholder="#3B82F6"
                      />

                      <RangeSlider
                        label={`Nombre de couleurs: ${paletteCount}`}
                        value={paletteCount}
                        onChange={setPaletteCount}
                        min={3}
                        max={10}
                        step={1}
                      />

                      <SelectDropdown
                        label="Type de palette"
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        placeholder="Choisir un type"
                        options={Object.entries(paletteCategories).map(([key, config]) => ({
                          value: key,
                          label: config.name
                        }))}
                      />

                      <Button 
                        onClick={handleGeneratePalette} 
                        disabled={isGenerating}
                        className="w-full"
                        size="lg"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        {isGenerating ? 'Génération...' : 'Générer Palette'}
                      </Button>
                    </div>

                    {/* Generated Palette Display */}
                    <div className="xl:col-span-2">
                      {currentPalette ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{currentPalette.name}</h3>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyPalette('hex')}
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                Copier
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleFavoritePalette(currentPalette)}
                              >
                                <Heart className="w-4 h-4 mr-1" />
                                Favoris
                              </Button>
                            </div>
                          </div>
                          
                          <ColorGrid
                            colors={currentPalette.colors.map((color, index) => ({
                              color: color,
                              name: `Couleur ${index + 1}`
                            }))}
                            onColorClick={(color) => navigator.clipboard.writeText(color)}
                            showActions={true}
                            onCopy={(color) => navigator.clipboard.writeText(color)}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                          <Palette className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Aucune palette générée</h3>
                <p className="text-sm text-muted-foreground mb-4">Choisissez un type de palette et cliquez sur "Générer" pour commencer</p>
                          <Button onClick={handleGeneratePalette} disabled={isGenerating}>
                            <Zap className="w-4 h-4 mr-2" />
                            Générer ma première palette
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </FormSection>
              </div>
            )
          },
          {
            id: 'advanced',
            label: 'Options Avancées',
            icon: Settings,
            content: (
              <FormSection 
                title="Options Avancées"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <RangeSlider
                      label={`Saturation: ${generationOptions.saturation}%`}
                      value={generationOptions.saturation}
                      onChange={(value) => setGenerationOptions(prev => ({ ...prev, saturation: value }))}
                      min={0}
                      max={100}
                      step={5}
                    />

                    <RangeSlider
                      label={`Luminosité: ${generationOptions.lightness}%`}
                      value={generationOptions.lightness}
                      onChange={(value) => setGenerationOptions(prev => ({ ...prev, lightness: value }))}
                      min={0}
                      max={100}
                      step={5}
                    />

                    <SelectDropdown
                      label="Température"
                      value={generationOptions.temperature}
                      onChange={(value: 'warm' | 'cool' | 'neutral') => 
                        setGenerationOptions(prev => ({ ...prev, temperature: value }))
                      }
                      placeholder="Choisir la température"
                      options={[
                        { value: 'warm', label: 'Chaude' },
                        { value: 'neutral', label: 'Neutre' },
                        { value: 'cool', label: 'Froide' }
                      ]}
                    />
                  </div>

                  <div className="space-y-4">
                    {currentPalette && (
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <h4 className="font-medium mb-2">Analyse de la palette</h4>
                        <div className="grid gap-4">
                          {currentPalette.colors.slice(0, 3).map((color, index) => (
                            <ColorPsychologyAnalyzer
                              key={`${color}-${index}`}
                              color={color}
                              showDetails={false}
                              compact={true}
                              className="bg-card rounded-lg p-3 border border-border"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Statistics */}
                  {paletteStats && (
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <h4 className="font-medium mb-2">Statistiques</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Total généré:</span>
                            <div className="font-medium">{paletteStats.totalPalettes}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Favoris:</span>
                            <div className="font-medium">{paletteStats.favoritesCount}</div>
                          </div>
                        </div>
                    </div>
                  )}
                </div>
              </FormSection>
            )
          },
          {
            id: 'extractor',
            label: 'Extractor',
            icon: Download,
            content: (
              <FormSection 
                title="Extracteur de Palette d'Image"
              >
                <ColorPaletteExtractor />
              </FormSection>
            )
          },
          {
            id: 'history',
            label: 'Historique',
            icon: History,
            content: (
              <FormSection 
                title="Historique des Palettes"
              >
                <ColorGrid
                  colors={paletteHistory.map(p => ({ color: p.colors[0], name: p.name }))}
                  onColorClick={(color) => {
                    const palette = paletteHistory.find(p => p.colors[0] === color);
                    if (palette) setCurrentPalette(palette);
                  }}
                  showActions={false}
                  emptyMessage="Aucune palette dans l'historique"
                />
              </FormSection>
            )
          },
          {
            id: 'favorites',
            label: 'Favoris',
            icon: Star,
            content: (
              <FormSection 
                title="Palettes Favorites"
              >
                <ColorGrid
                  colors={favoritePalettes.map(p => ({ color: p.colors[0], name: p.name }))}
                  onColorClick={(color) => {
                    const palette = favoritePalettes.find(p => p.colors[0] === color);
                    if (palette) setCurrentPalette(palette);
                  }}
                  showActions={false}
                  emptyMessage="Aucune palette favorite"
                />
              </FormSection>
            )
          }
        ]}
      />
    </div>
  );

  /**
   * Copy palette in different formats
   */
  const copyPalette = useCallback((format: 'hex' | 'css' | 'scss') => {
    if (!currentPalette) return;

    let text = "";
    switch (format) {
      case 'hex':
        text = currentPalette.colors.join(", ");
        break;
      case 'css':
        text = `:root {\n${currentPalette.colors.map((color, i) => `  --color-${i + 1}: ${color};`).join('\n')}\n}`;
        break;
      case 'scss':
        text = currentPalette.colors.map((color, i) => `$color-${i + 1}: ${color};`).join('\n');
        break;
    }

    navigator.clipboard.writeText(text);
    toast({
      title: "Palette copiée !",
      description: `Format ${format.toUpperCase()} copié dans le presse-papiers.`,
    });
  }, [currentPalette]);

  return (
    <div className="space-y-6">
      <TabsManager
        tabs={[
          {
            id: 'generator',
            label: 'Générateur',
            icon: Palette,
            content: (
              <div className="space-y-6">
                <FormSection 
                  title="Générateur de Palettes Intelligent"
                >
                  <div className="flex justify-between items-center mb-4">
                    <ActionButtons
                      onRandom={handleRandomGeneration}
                      onExport={() => exportPalettes(paletteHistory)}
                      randomLabel="Aléatoire"
                      exportLabel="Export"
                      isGenerating={isGenerating}
                    />
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Generation Controls */}
                    <div className="space-y-4">
                      <ColorInput
                        label="Couleur de base"
                        value={baseColor}
                        onChange={setBaseColor}
                        placeholder="#3B82F6"
                      />

                      <RangeSlider
                        label={`Nombre de couleurs: ${paletteCount}`}
                        value={paletteCount}
                        onChange={setPaletteCount}
                        min={3}
                        max={10}
                        step={1}
                      />

                      <SelectDropdown
                        label="Type de palette"
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        placeholder="Choisir un type"
                        options={Object.entries(paletteCategories).map(([key, config]) => ({
                          value: key,
                          label: config.name
                        }))}
                      />

                      <Button 
                        onClick={handleGeneratePalette} 
                        disabled={isGenerating}
                        className="w-full"
                        size="lg"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        {isGenerating ? 'Génération...' : 'Générer Palette'}
                      </Button>
                    </div>

                    {/* Generated Palette Display */}
                    <div className="xl:col-span-2">
                      {currentPalette ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{currentPalette.name}</h3>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyPalette('hex')}
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                Copier
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleFavoritePalette(currentPalette)}
                              >
                                <Heart className="w-4 h-4 mr-1" />
                                Favoris
                              </Button>
                            </div>
                          </div>
                          
                          <ColorGrid
                            colors={currentPalette.colors.map((color, index) => ({
                              color: color,
                              name: `Couleur ${index + 1}`
                            }))}
                            onColorClick={(color) => navigator.clipboard.writeText(color)}
                            showActions={true}
                            onCopy={(color) => navigator.clipboard.writeText(color)}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                          <Palette className="w-12 h-12 text-gray-500 dark:text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Aucune palette générée</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Choisissez un type de palette et cliquez sur "Générer" pour commencer</p>
                          <Button onClick={handleGeneratePalette} disabled={isGenerating}>
                            <Zap className="w-4 h-4 mr-2" />
                            Générer ma première palette
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </FormSection>
              </div>
            )
          },
          {
            id: 'advanced',
            label: 'Options Avancées',
            icon: Settings,
            content: (
              <FormSection 
                title="Options Avancées"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <RangeSlider
                      label={`Saturation: ${generationOptions.saturation}%`}
                      value={generationOptions.saturation}
                      onChange={(value) => setGenerationOptions(prev => ({ ...prev, saturation: value }))}
                      min={0}
                      max={100}
                      step={5}
                    />

                    <RangeSlider
                      label={`Luminosité: ${generationOptions.lightness}%`}
                      value={generationOptions.lightness}
                      onChange={(value) => setGenerationOptions(prev => ({ ...prev, lightness: value }))}
                      min={0}
                      max={100}
                      step={5}
                    />

                    <SelectDropdown
                      label="Température"
                      value={generationOptions.temperature}
                      onChange={(value: 'warm' | 'cool' | 'neutral') => 
                        setGenerationOptions(prev => ({ ...prev, temperature: value }))
                      }
                      placeholder="Choisir la température"
                      options={[
                        { value: 'warm', label: 'Chaude' },
                        { value: 'neutral', label: 'Neutre' },
                        { value: 'cool', label: 'Froide' }
                      ]}
                    />
                  </div>

                  <div className="space-y-4">
                    {currentPalette && (
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <h4 className="font-medium mb-2">Analyse de la palette</h4>
                        <div className="grid gap-4">
                          {currentPalette.colors.slice(0, 3).map((color, index) => (
                            <ColorPsychologyAnalyzer
                              key={`${color}-${index}`}
                              color={color}
                              showDetails={false}
                              compact={true}
                              className="bg-card rounded-lg p-3 border border-border"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Statistics */}
                  {paletteStats && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Statistiques</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-300">Total généré:</span>
                            <div className="font-medium">{paletteStats.totalPalettes}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-300">Favoris:</span>
                            <div className="font-medium">{paletteStats.favoritesCount}</div>
                          </div>
                        </div>
                    </div>
                  )}
                </div>
              </FormSection>
            )
          },
          {
            id: 'history',
            label: 'Historique',
            icon: History,
            content: (
              <FormSection 
                title="Historique des Palettes"
              >
                <ColorGrid
                  colors={paletteHistory.map(p => ({ color: p.colors[0], name: p.name }))}
                  onColorClick={(color) => {
                    const palette = paletteHistory.find(p => p.colors[0] === color);
                    if (palette) setCurrentPalette(palette);
                  }}
                  showActions={false}
                  emptyMessage="Aucune palette dans l'historique"
                />
              </FormSection>
            )
          },
          {
            id: 'favorites',
            label: 'Favoris',
            icon: Star,
            content: (
              <FormSection 
                title="Palettes Favorites"
              >
                <ColorGrid
                  colors={favoritePalettes.map(p => ({ color: p.colors[0], name: p.name }))}
                  onColorClick={(color) => {
                    const palette = favoritePalettes.find(p => p.colors[0] === color);
                    if (palette) setCurrentPalette(palette);
                  }}
                  showActions={false}
                  emptyMessage="Aucune palette favorite"
                />
              </FormSection>
            )
          }
        ]}
      />
    </div>
  );
};
