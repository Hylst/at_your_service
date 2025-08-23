import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Zap, Shuffle, RotateCcw, Paintbrush, Pipette } from 'lucide-react';
import { ColorSettings, GradientSettings, Layer } from './logoTypes';

interface ColorControlsProps {
  selectedLayer: Layer | null;
  onLayerUpdate: (layerId: string, updates: Partial<Layer>) => void;
}

/**
 * Color controls component for managing layer colors, gradients, and opacity
 */
export const ColorControls: React.FC<ColorControlsProps> = ({
  selectedLayer,
  onLayerUpdate
}) => {
  // Predefined color palettes
  const colorPalettes = {
    primary: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
    secondary: ['#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'],
    neutral: ['#2C3E50', '#34495E', '#7F8C8D', '#BDC3C7', '#ECF0F1'],
    warm: ['#E74C3C', '#E67E22', '#F39C12', '#F1C40F', '#D35400'],
    cool: ['#3498DB', '#2980B9', '#1ABC9C', '#16A085', '#27AE60']
  };

  /**
   * Update layer color
   */
  const updateColor = (color: string) => {
    if (!selectedLayer) return;
    
    const colorSettings: ColorSettings = {
      type: 'solid',
      solid: color,
      gradient: {
        type: 'linear',
        angle: 0,
        centerX: 50,
        centerY: 50,
        stops: [
          { color: color, position: 0 },
          { color: color, position: 100 }
        ]
      },
      opacity: selectedLayer.colorSettings?.opacity || 1
    };
    
    onLayerUpdate(selectedLayer.id, { colorSettings });
  };

  /**
   * Update gradient settings
   */
  const updateGradient = (gradient: Partial<GradientSettings>) => {
    if (!selectedLayer) return;
    
    const currentGradient = selectedLayer.colorSettings?.type === 'gradient' 
      ? selectedLayer.colorSettings.gradient 
      : {
          type: 'linear' as const,
          angle: 0,
          centerX: 50,
          centerY: 50,
          stops: [
            { color: '#FF6B6B', position: 0 },
            { color: '#4ECDC4', position: 100 }
          ]
        };
    
    const colorSettings: ColorSettings = {
      type: 'gradient',
      solid: '#000000',
      opacity: selectedLayer.colorSettings?.opacity || 1,
      gradient: { ...currentGradient, ...gradient }
    };
    
    onLayerUpdate(selectedLayer.id, { colorSettings });
  };

  /**
   * Update opacity
   */
  const updateOpacity = (opacity: number) => {
    if (!selectedLayer) return;
    
    const currentSettings = selectedLayer.colorSettings || {
      type: 'solid',
      solid: '#000000',
      gradient: {
        type: 'linear',
        angle: 0,
        centerX: 50,
        centerY: 50,
        stops: []
      },
      opacity: 1
    };
    
    const colorSettings: ColorSettings = {
      ...currentSettings,
      opacity: opacity / 100
    };
    
    onLayerUpdate(selectedLayer.id, { colorSettings });
  };

  if (!selectedLayer) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Colors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No layer selected
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentColor = selectedLayer.colorSettings?.type === 'solid' 
    ? selectedLayer.colorSettings.solid 
    : '#000000';
  const currentOpacity = (selectedLayer.colorSettings?.opacity || 1) * 100;
  const currentGradient = selectedLayer.colorSettings?.type === 'gradient' 
    ? selectedLayer.colorSettings.gradient 
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Colors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="solid" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="solid">Solid</TabsTrigger>
            <TabsTrigger value="gradient" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Gradient
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="solid" className="space-y-4">
            {/* Color Picker */}
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={currentColor}
                  onChange={(e) => updateColor(e.target.value)}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={currentColor}
                  onChange={(e) => updateColor(e.target.value)}
                  placeholder="#000000"
                  className="flex-1"
                />
                <Button size="sm" variant="outline">
                  <Pipette className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Color Palettes */}
            <div className="space-y-3">
              <Label>Color Palettes</Label>
              {Object.entries(colorPalettes).map(([name, colors]) => (
                <div key={name} className="space-y-1">
                  <Label className="text-xs capitalize">{name}</Label>
                  <div className="flex gap-1">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => updateColor(color)}
                        className="w-6 h-6 rounded border-2 border-white shadow-sm hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="gradient" className="space-y-4">
            {/* Gradient Type */}
            <div className="space-y-2">
              <Label>Gradient Type</Label>
              <Select
                value={currentGradient?.type || 'linear'}
                onValueChange={(value: 'linear' | 'radial') => 
                  updateGradient({ type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="radial">Radial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gradient Colors */}
            <div className="space-y-2">
              <Label>Gradient Colors</Label>
              <div className="space-y-2">
                {(currentGradient?.stops || [
                  { color: '#FF6B6B', position: 0 },
                  { color: '#4ECDC4', position: 100 }
                ]).map((stop, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={stop.color}
                      onChange={(e) => {
                        const newStops = [...(currentGradient?.stops || [
                          { color: '#FF6B6B', position: 0 },
                          { color: '#4ECDC4', position: 100 }
                        ])];
                        newStops[index] = { ...newStops[index], color: e.target.value };
                        updateGradient({ stops: newStops });
                      }}
                      className="w-12 h-8 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={stop.color}
                      onChange={(e) => {
                        const newStops = [...(currentGradient?.stops || [
                          { color: '#FF6B6B', position: 0 },
                          { color: '#4ECDC4', position: 100 }
                        ])];
                        newStops[index] = { ...newStops[index], color: e.target.value };
                        updateGradient({ stops: newStops });
                      }}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground w-8">
                      {stop.position}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient Angle (for linear gradients) */}
            {currentGradient?.type === 'linear' && (
              <div className="space-y-2">
                <Label>Angle: {currentGradient?.angle || 0}°</Label>
                <Slider
                  value={[currentGradient?.angle || 0]}
                  onValueChange={([value]) => updateGradient({ angle: value })}
                  max={360}
                  step={1}
                  className="w-full"
                />
              </div>
            )}

            {/* Gradient Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              <div 
                className="w-full h-12 rounded border"
                style={{
                  background: currentGradient?.type === 'linear'
                    ? `linear-gradient(${currentGradient.angle || 0}deg, ${currentGradient.stops?.map(stop => `${stop.color} ${stop.position}%`).join(', ') || '#FF6B6B 0%, #4ECDC4 100%'})`
                    : `radial-gradient(circle, ${currentGradient?.stops?.map(stop => `${stop.color} ${stop.position}%`).join(', ') || '#FF6B6B 0%, #4ECDC4 100%'})`
                }}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Opacity */}
        <div className="space-y-2">
          <Label>Opacity: {Math.round(currentOpacity)}%</Label>
          <Slider
            value={[currentOpacity]}
            onValueChange={([value]) => updateOpacity(value)}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateColor('#000000')}
            className="flex-1"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const randomColor = colorPalettes.primary[Math.floor(Math.random() * colorPalettes.primary.length)];
              updateColor(randomColor);
            }}
            className="flex-1"
          >
            <Shuffle className="h-4 w-4 mr-1" />
            Random
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};