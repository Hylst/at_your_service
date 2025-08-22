import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Sparkles, 
  Sun, 
  Moon, 
  Zap, 
  Layers, 
  RotateCcw,
  Eye,
  EyeOff,
  Copy,
  Download,
  Wand2,
  Paintbrush,
  Droplets,
  Mountain,
  Waves
} from 'lucide-react';
import { LogoSettings } from '../types/logoTypes';

// Extended logo settings with visual effects
export interface LogoEffects {
  // Gradient effects
  gradientEnabled: boolean;
  gradientType: 'linear' | 'radial' | 'conic';
  gradientDirection: number; // degrees for linear
  gradientColors: string[];
  gradientStops: number[];
  
  // Shadow effects
  shadowEnabled: boolean;
  shadowType: 'drop' | 'inner' | 'glow';
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowSpread: number;
  
  // Texture effects
  textureEnabled: boolean;
  textureType: 'noise' | 'paper' | 'fabric' | 'metal' | 'glass';
  textureOpacity: number;
  textureScale: number;
  
  // Animation effects
  animationEnabled: boolean;
  animationType: 'pulse' | 'bounce' | 'rotate' | 'float' | 'glow';
  animationDuration: number;
  animationDelay: number;
  
  // 3D effects
  threeDEnabled: boolean;
  threeDDepth: number;
  threeDAngle: number;
  threeDColor: string;
  
  // Border effects
  borderGradientEnabled: boolean;
  borderGradientColors: string[];
  borderRadius: number;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'double';
}

// Predefined gradient presets
const gradientPresets = {
  sunset: {
    name: 'Coucher de Soleil',
    colors: ['#FF6B6B', '#FFE66D', '#FF6B35'],
    stops: [0, 50, 100],
    type: 'linear' as const,
    direction: 45
  },
  ocean: {
    name: 'Océan',
    colors: ['#667eea', '#764ba2'],
    stops: [0, 100],
    type: 'linear' as const,
    direction: 135
  },
  forest: {
    name: 'Forêt',
    colors: ['#134E5E', '#71B280'],
    stops: [0, 100],
    type: 'radial' as const,
    direction: 0
  },
  fire: {
    name: 'Feu',
    colors: ['#f12711', '#f5af19'],
    stops: [0, 100],
    type: 'linear' as const,
    direction: 90
  },
  purple: {
    name: 'Violet Mystique',
    colors: ['#667eea', '#764ba2', '#f093fb'],
    stops: [0, 50, 100],
    type: 'conic' as const,
    direction: 0
  },
  gold: {
    name: 'Or Royal',
    colors: ['#FFD700', '#FFA500', '#FF8C00'],
    stops: [0, 50, 100],
    type: 'linear' as const,
    direction: 45
  }
};

// Shadow presets
const shadowPresets = {
  soft: {
    name: 'Ombre Douce',
    type: 'drop' as const,
    color: 'rgba(0, 0, 0, 0.1)',
    blur: 10,
    offsetX: 0,
    offsetY: 4,
    spread: 0
  },
  hard: {
    name: 'Ombre Nette',
    type: 'drop' as const,
    color: 'rgba(0, 0, 0, 0.3)',
    blur: 0,
    offsetX: 4,
    offsetY: 4,
    spread: 0
  },
  glow: {
    name: 'Lueur',
    type: 'glow' as const,
    color: 'rgba(59, 130, 246, 0.5)',
    blur: 20,
    offsetX: 0,
    offsetY: 0,
    spread: 5
  },
  neon: {
    name: 'Néon',
    type: 'glow' as const,
    color: 'rgba(236, 72, 153, 0.8)',
    blur: 15,
    offsetX: 0,
    offsetY: 0,
    spread: 3
  }
};

interface LogoEffectsAdvancedProps {
  effects: LogoEffects;
  onEffectsChange: (effects: LogoEffects) => void;
  logoSettings: LogoSettings;
  className?: string;
}

/**
 * Advanced visual effects component for logo customization
 */
export const LogoEffectsAdvanced = ({ 
  effects, 
  onEffectsChange, 
  logoSettings, 
  className = "" 
}: LogoEffectsAdvancedProps) => {
  const [previewMode, setPreviewMode] = useState(true);
  const [activeTab, setActiveTab] = useState('gradients');

  /**
   * Update specific effect property
   */
  const updateEffect = <K extends keyof LogoEffects>(key: K, value: LogoEffects[K]) => {
    onEffectsChange({ ...effects, [key]: value });
  };

  /**
   * Apply gradient preset
   */
  const applyGradientPreset = (preset: typeof gradientPresets[keyof typeof gradientPresets]) => {
    updateEffect('gradientColors', preset.colors);
    updateEffect('gradientStops', preset.stops);
    updateEffect('gradientType', preset.type);
    updateEffect('gradientDirection', preset.direction);
    updateEffect('gradientEnabled', true);
  };

  /**
   * Apply shadow preset
   */
  const applyShadowPreset = (preset: typeof shadowPresets[keyof typeof shadowPresets]) => {
    updateEffect('shadowType', preset.type);
    updateEffect('shadowColor', preset.color);
    updateEffect('shadowBlur', preset.blur);
    updateEffect('shadowOffsetX', preset.offsetX);
    updateEffect('shadowOffsetY', preset.offsetY);
    updateEffect('shadowSpread', preset.spread);
    updateEffect('shadowEnabled', true);
  };

  /**
   * Generate CSS for effects preview
   */
  const generateEffectCSS = () => {
    const styles: React.CSSProperties = {};
    
    // Gradient background
    if (effects.gradientEnabled && effects.gradientColors.length > 1) {
      const colorStops = effects.gradientColors.map((color, index) => {
        const stop = effects.gradientStops[index] || (index * 100 / (effects.gradientColors.length - 1));
        return `${color} ${stop}%`;
      }).join(', ');
      
      switch (effects.gradientType) {
        case 'linear':
          styles.background = `linear-gradient(${effects.gradientDirection}deg, ${colorStops})`;
          break;
        case 'radial':
          styles.background = `radial-gradient(circle, ${colorStops})`;
          break;
        case 'conic':
          styles.background = `conic-gradient(from ${effects.gradientDirection}deg, ${colorStops})`;
          break;
      }
    }
    
    // Shadow effects
    if (effects.shadowEnabled) {
      const shadowValue = `${effects.shadowOffsetX}px ${effects.shadowOffsetY}px ${effects.shadowBlur}px ${effects.shadowSpread}px ${effects.shadowColor}`;
      
      switch (effects.shadowType) {
        case 'drop':
          styles.boxShadow = shadowValue;
          break;
        case 'inner':
          styles.boxShadow = `inset ${shadowValue}`;
          break;
        case 'glow':
          styles.boxShadow = `0 0 ${effects.shadowBlur}px ${effects.shadowSpread}px ${effects.shadowColor}`;
          break;
      }
    }
    
    // 3D effects
    if (effects.threeDEnabled) {
      styles.transform = `perspective(1000px) rotateX(${effects.threeDAngle}deg)`;
      styles.transformStyle = 'preserve-3d';
    }
    
    // Animation
    if (effects.animationEnabled) {
      styles.animation = `${effects.animationType} ${effects.animationDuration}s ease-in-out ${effects.animationDelay}s infinite`;
    }
    
    return styles;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            Effets Visuels Avancés
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Badge variant="secondary">
              {Object.values(effects).filter(Boolean).length} actifs
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Preview */}
        {previewMode && (
          <div className="p-6 border rounded-lg bg-gray-50">
            <div className="text-center mb-4">
              <Label className="text-sm font-medium">Aperçu des Effets</Label>
            </div>
            <div className="flex justify-center">
              <div 
                className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-2xl font-bold transition-all duration-300"
                style={generateEffectCSS()}
              >
                {logoSettings.text || 'Logo'}
              </div>
            </div>
          </div>
        )}
        
        {/* Effects Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="gradients" className="flex items-center gap-1">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Gradients</span>
            </TabsTrigger>
            <TabsTrigger value="shadows" className="flex items-center gap-1">
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Ombres</span>
            </TabsTrigger>
            <TabsTrigger value="textures" className="flex items-center gap-1">
              <Mountain className="w-4 h-4" />
              <span className="hidden sm:inline">Textures</span>
            </TabsTrigger>
            <TabsTrigger value="animations" className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Animations</span>
            </TabsTrigger>
            <TabsTrigger value="3d" className="flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">3D</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Gradients Tab */}
          <TabsContent value="gradients" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Gradients</Label>
              <Switch 
                checked={effects.gradientEnabled} 
                onCheckedChange={(checked) => updateEffect('gradientEnabled', checked)}
              />
            </div>
            
            {effects.gradientEnabled && (
              <>
                {/* Gradient Presets */}
                <div>
                  <Label className="text-sm mb-2 block">Presets Populaires</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.entries(gradientPresets).map(([key, preset]) => (
                      <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        onClick={() => applyGradientPreset(preset)}
                        className="h-12 p-2 flex flex-col items-center justify-center"
                        style={{
                          background: `linear-gradient(${preset.direction}deg, ${preset.colors.join(', ')})`
                        }}
                      >
                        <span className="text-xs font-medium text-white drop-shadow">
                          {preset.name}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Gradient Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm mb-2 block">Type</Label>
                    <Select 
                      value={effects.gradientType} 
                      onValueChange={(value: any) => updateEffect('gradientType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linear">Linéaire</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                        <SelectItem value="conic">Conique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2 block">Direction ({effects.gradientDirection}°)</Label>
                    <Slider
                      value={[effects.gradientDirection]}
                      onValueChange={([value]) => updateEffect('gradientDirection', value)}
                      max={360}
                      step={15}
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Gradient Colors */}
                <div>
                  <Label className="text-sm mb-2 block">Couleurs du Gradient</Label>
                  <div className="flex gap-2 flex-wrap">
                    {effects.gradientColors.map((color, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          type="color"
                          value={color}
                          onChange={(e) => {
                            const newColors = [...effects.gradientColors];
                            newColors[index] = e.target.value;
                            updateEffect('gradientColors', newColors);
                          }}
                          className="w-12 h-8 p-1 border rounded"
                        />
                        <Input
                          type="number"
                          value={effects.gradientStops[index] || 0}
                          onChange={(e) => {
                            const newStops = [...effects.gradientStops];
                            newStops[index] = parseInt(e.target.value);
                            updateEffect('gradientStops', newStops);
                          }}
                          className="w-16 h-8"
                          min="0"
                          max="100"
                        />
                        <span className="text-xs text-gray-500">%</span>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        updateEffect('gradientColors', [...effects.gradientColors, '#000000']);
                        updateEffect('gradientStops', [...effects.gradientStops, 100]);
                      }}
                      disabled={effects.gradientColors.length >= 5}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          {/* Shadows Tab */}
          <TabsContent value="shadows" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Ombres & Lueurs</Label>
              <Switch 
                checked={effects.shadowEnabled} 
                onCheckedChange={(checked) => updateEffect('shadowEnabled', checked)}
              />
            </div>
            
            {effects.shadowEnabled && (
              <>
                {/* Shadow Presets */}
                <div>
                  <Label className="text-sm mb-2 block">Presets d'Ombres</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(shadowPresets).map(([key, preset]) => (
                      <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        onClick={() => applyShadowPreset(preset)}
                        className="h-16 flex flex-col items-center justify-center"
                      >
                        <div 
                          className="w-8 h-8 bg-blue-500 rounded mb-1"
                          style={{
                            boxShadow: preset.type === 'glow' 
                              ? `0 0 ${preset.blur}px ${preset.spread}px ${preset.color}`
                              : `${preset.offsetX}px ${preset.offsetY}px ${preset.blur}px ${preset.spread}px ${preset.color}`
                          }}
                        />
                        <span className="text-xs">{preset.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Shadow Controls */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm mb-2 block">Type d'Ombre</Label>
                    <Select 
                      value={effects.shadowType} 
                      onValueChange={(value: any) => updateEffect('shadowType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drop">Ombre Portée</SelectItem>
                        <SelectItem value="inner">Ombre Interne</SelectItem>
                        <SelectItem value="glow">Lueur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2 block">Couleur</Label>
                    <Input
                      type="color"
                      value={effects.shadowColor.includes('rgba') ? '#000000' : effects.shadowColor}
                      onChange={(e) => updateEffect('shadowColor', e.target.value)}
                      className="w-full h-10"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm mb-2 block">Flou ({effects.shadowBlur}px)</Label>
                    <Slider
                      value={[effects.shadowBlur]}
                      onValueChange={([value]) => updateEffect('shadowBlur', value)}
                      max={50}
                      step={1}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2 block">Étendue ({effects.shadowSpread}px)</Label>
                    <Slider
                      value={[effects.shadowSpread]}
                      onValueChange={([value]) => updateEffect('shadowSpread', value)}
                      min={-20}
                      max={20}
                      step={1}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm mb-2 block">Décalage X ({effects.shadowOffsetX}px)</Label>
                    <Slider
                      value={[effects.shadowOffsetX]}
                      onValueChange={([value]) => updateEffect('shadowOffsetX', value)}
                      min={-20}
                      max={20}
                      step={1}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2 block">Décalage Y ({effects.shadowOffsetY}px)</Label>
                    <Slider
                      value={[effects.shadowOffsetY]}
                      onValueChange={([value]) => updateEffect('shadowOffsetY', value)}
                      min={-20}
                      max={20}
                      step={1}
                    />
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          {/* Textures Tab */}
          <TabsContent value="textures" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Textures & Matières</Label>
              <Switch 
                checked={effects.textureEnabled} 
                onCheckedChange={(checked) => updateEffect('textureEnabled', checked)}
              />
            </div>
            
            {effects.textureEnabled && (
              <>
                <div>
                  <Label className="text-sm mb-2 block">Type de Texture</Label>
                  <Select 
                    value={effects.textureType} 
                    onValueChange={(value: any) => updateEffect('textureType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="noise">Bruit</SelectItem>
                      <SelectItem value="paper">Papier</SelectItem>
                      <SelectItem value="fabric">Tissu</SelectItem>
                      <SelectItem value="metal">Métal</SelectItem>
                      <SelectItem value="glass">Verre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm mb-2 block">Opacité ({Math.round(effects.textureOpacity * 100)}%)</Label>
                    <Slider
                      value={[effects.textureOpacity]}
                      onValueChange={([value]) => updateEffect('textureOpacity', value)}
                      max={1}
                      step={0.1}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2 block">Échelle ({effects.textureScale}x)</Label>
                    <Slider
                      value={[effects.textureScale]}
                      onValueChange={([value]) => updateEffect('textureScale', value)}
                      min={0.5}
                      max={3}
                      step={0.1}
                    />
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          {/* Animations Tab */}
          <TabsContent value="animations" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Animations</Label>
              <Switch 
                checked={effects.animationEnabled} 
                onCheckedChange={(checked) => updateEffect('animationEnabled', checked)}
              />
            </div>
            
            {effects.animationEnabled && (
              <>
                <div>
                  <Label className="text-sm mb-2 block">Type d'Animation</Label>
                  <Select 
                    value={effects.animationType} 
                    onValueChange={(value: any) => updateEffect('animationType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pulse">Pulsation</SelectItem>
                      <SelectItem value="bounce">Rebond</SelectItem>
                      <SelectItem value="rotate">Rotation</SelectItem>
                      <SelectItem value="float">Flottement</SelectItem>
                      <SelectItem value="glow">Lueur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm mb-2 block">Durée ({effects.animationDuration}s)</Label>
                    <Slider
                      value={[effects.animationDuration]}
                      onValueChange={([value]) => updateEffect('animationDuration', value)}
                      min={0.5}
                      max={5}
                      step={0.1}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2 block">Délai ({effects.animationDelay}s)</Label>
                    <Slider
                      value={[effects.animationDelay]}
                      onValueChange={([value]) => updateEffect('animationDelay', value)}
                      min={0}
                      max={2}
                      step={0.1}
                    />
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          {/* 3D Tab */}
          <TabsContent value="3d" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Effets 3D</Label>
              <Switch 
                checked={effects.threeDEnabled} 
                onCheckedChange={(checked) => updateEffect('threeDEnabled', checked)}
              />
            </div>
            
            {effects.threeDEnabled && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm mb-2 block">Profondeur ({effects.threeDDepth}px)</Label>
                    <Slider
                      value={[effects.threeDDepth]}
                      onValueChange={([value]) => updateEffect('threeDDepth', value)}
                      max={50}
                      step={1}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2 block">Angle ({effects.threeDAngle}°)</Label>
                    <Slider
                      value={[effects.threeDAngle]}
                      onValueChange={([value]) => updateEffect('threeDAngle', value)}
                      min={-45}
                      max={45}
                      step={1}
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm mb-2 block">Couleur 3D</Label>
                  <Input
                    type="color"
                    value={effects.threeDColor}
                    onChange={(e) => updateEffect('threeDColor', e.target.value)}
                    className="w-full h-10"
                  />
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Quick Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Reset all effects
              onEffectsChange({
                gradientEnabled: false,
                gradientType: 'linear',
                gradientDirection: 45,
                gradientColors: ['#3B82F6', '#8B5CF6'],
                gradientStops: [0, 100],
                shadowEnabled: false,
                shadowType: 'drop',
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 4,
                shadowSpread: 0,
                textureEnabled: false,
                textureType: 'noise',
                textureOpacity: 0.3,
                textureScale: 1,
                animationEnabled: false,
                animationType: 'pulse',
                animationDuration: 2,
                animationDelay: 0,
                threeDEnabled: false,
                threeDDepth: 10,
                threeDAngle: 15,
                threeDColor: '#666666',
                borderGradientEnabled: false,
                borderGradientColors: ['#3B82F6', '#8B5CF6'],
                borderRadius: 8,
                borderStyle: 'solid'
              });
            }}
            className="flex items-center gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            Réinitialiser
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Copy effects to clipboard
              navigator.clipboard.writeText(JSON.stringify(effects, null, 2));
            }}
            className="flex items-center gap-1"
          >
            <Copy className="w-4 h-4" />
            Copier
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Export effects as CSS
              const css = Object.entries(generateEffectCSS())
                .map(([key, value]) => `${key}: ${value};`)
                .join('\n');
              navigator.clipboard.writeText(css);
            }}
            className="flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            CSS
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Default effects state
export const defaultLogoEffects: LogoEffects = {
  gradientEnabled: false,
  gradientType: 'linear',
  gradientDirection: 45,
  gradientColors: ['#3B82F6', '#8B5CF6'],
  gradientStops: [0, 100],
  shadowEnabled: false,
  shadowType: 'drop',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowBlur: 10,
  shadowOffsetX: 0,
  shadowOffsetY: 4,
  shadowSpread: 0,
  textureEnabled: false,
  textureType: 'noise',
  textureOpacity: 0.3,
  textureScale: 1,
  animationEnabled: false,
  animationType: 'pulse',
  animationDuration: 2,
  animationDelay: 0,
  threeDEnabled: false,
  threeDDepth: 10,
  threeDAngle: 15,
  threeDColor: '#666666',
  borderGradientEnabled: false,
  borderGradientColors: ['#3B82F6', '#8B5CF6'],
  borderRadius: 8,
  borderStyle: 'solid'
};