import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Shadow, Circle, Square, RotateCcw } from 'lucide-react';
import { VisualEffects, ShadowEffect, GlowEffect, StrokeEffect, Layer } from './logoTypes';

interface EffectsControlsProps {
  selectedLayer: Layer | null;
  onLayerUpdate: (layerId: string, updates: Partial<Layer>) => void;
}

/**
 * Effects controls component for managing visual effects like shadows, glows, and strokes
 */
export const EffectsControls: React.FC<EffectsControlsProps> = ({
  selectedLayer,
  onLayerUpdate
}) => {
  /**
   * Update visual effects
   */
  const updateEffects = (effects: Partial<VisualEffects>) => {
    if (!selectedLayer) return;
    
    const currentEffects = selectedLayer.effects || {
      shadow: { enabled: false, color: '#000000', blur: 4, offsetX: 2, offsetY: 2, opacity: 0.3 },
      glow: { enabled: false, color: '#ffffff', blur: 8, opacity: 0.5 },
      stroke: { enabled: false, color: '#000000', width: 2, opacity: 1 }
    };
    
    onLayerUpdate(selectedLayer.id, { 
      effects: { ...currentEffects, ...effects } 
    });
  };

  /**
   * Update shadow effect
   */
  const updateShadow = (shadow: Partial<ShadowEffect>) => {
    const currentShadow = selectedLayer?.effects?.shadow || {
      enabled: false,
      color: '#000000',
      blur: 4,
      offsetX: 2,
      offsetY: 2,
      opacity: 0.3
    };
    
    updateEffects({ shadow: { ...currentShadow, ...shadow } });
  };

  /**
   * Update glow effect
   */
  const updateGlow = (glow: Partial<GlowEffect>) => {
    const currentGlow = selectedLayer?.effects?.glow || {
      enabled: false,
      color: '#ffffff',
      blur: 8,
      opacity: 0.5
    };
    
    updateEffects({ glow: { ...currentGlow, ...glow } });
  };

  /**
   * Update stroke effect
   */
  const updateStroke = (stroke: Partial<StrokeEffect>) => {
    const currentStroke = selectedLayer?.effects?.stroke || {
      enabled: false,
      color: '#000000',
      width: 2,
      opacity: 1
    };
    
    updateEffects({ stroke: { ...currentStroke, ...stroke } });
  };

  /**
   * Reset all effects
   */
  const resetEffects = () => {
    updateEffects({
      shadow: { enabled: false, color: '#000000', blur: 4, offsetX: 2, offsetY: 2, opacity: 0.3 },
      glow: { enabled: false, color: '#ffffff', blur: 8, opacity: 0.5 },
      stroke: { enabled: false, color: '#000000', width: 2, opacity: 1 }
    });
  };

  if (!selectedLayer) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Effects
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

  const effects = selectedLayer.effects || {
    shadow: { enabled: false, color: '#000000', blur: 4, offsetX: 2, offsetY: 2, opacity: 0.3 },
    glow: { enabled: false, color: '#ffffff', blur: 8, opacity: 0.5 },
    stroke: { enabled: false, color: '#000000', width: 2, opacity: 1 }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Effects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="shadow" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shadow">Shadow</TabsTrigger>
            <TabsTrigger value="glow">Glow</TabsTrigger>
            <TabsTrigger value="stroke">Stroke</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shadow" className="space-y-4">
            {/* Shadow Controls */}
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Shadow className="h-4 w-4" />
                Drop Shadow
              </Label>
              <Switch
                checked={effects.shadow.enabled}
                onCheckedChange={(enabled) => updateShadow({ enabled })}
              />
            </div>
            
            {effects.shadow.enabled && (
              <div className="space-y-4 pl-6">
                {/* Shadow Color */}
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={effects.shadow.color}
                      onChange={(e) => updateShadow({ color: e.target.value })}
                      className="w-12 h-8 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={effects.shadow.color}
                      onChange={(e) => updateShadow({ color: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Shadow Blur */}
                <div className="space-y-2">
                  <Label>Blur: {effects.shadow.blur}px</Label>
                  <Slider
                    value={[effects.shadow.blur]}
                    onValueChange={([value]) => updateShadow({ blur: value })}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Shadow Offset X */}
                <div className="space-y-2">
                  <Label>Offset X: {effects.shadow.offsetX}px</Label>
                  <Slider
                    value={[effects.shadow.offsetX]}
                    onValueChange={([value]) => updateShadow({ offsetX: value })}
                    min={-50}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Shadow Offset Y */}
                <div className="space-y-2">
                  <Label>Offset Y: {effects.shadow.offsetY}px</Label>
                  <Slider
                    value={[effects.shadow.offsetY]}
                    onValueChange={([value]) => updateShadow({ offsetY: value })}
                    min={-50}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Shadow Opacity */}
                <div className="space-y-2">
                  <Label>Opacity: {Math.round(effects.shadow.opacity * 100)}%</Label>
                  <Slider
                    value={[effects.shadow.opacity * 100]}
                    onValueChange={([value]) => updateShadow({ opacity: value / 100 })}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="glow" className="space-y-4">
            {/* Glow Controls */}
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Circle className="h-4 w-4" />
                Outer Glow
              </Label>
              <Switch
                checked={effects.glow.enabled}
                onCheckedChange={(enabled) => updateGlow({ enabled })}
              />
            </div>
            
            {effects.glow.enabled && (
              <div className="space-y-4 pl-6">
                {/* Glow Color */}
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={effects.glow.color}
                      onChange={(e) => updateGlow({ color: e.target.value })}
                      className="w-12 h-8 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={effects.glow.color}
                      onChange={(e) => updateGlow({ color: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Glow Blur */}
                <div className="space-y-2">
                  <Label>Blur: {effects.glow.blur}px</Label>
                  <Slider
                    value={[effects.glow.blur]}
                    onValueChange={([value]) => updateGlow({ blur: value })}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Glow Opacity */}
                <div className="space-y-2">
                  <Label>Opacity: {Math.round(effects.glow.opacity * 100)}%</Label>
                  <Slider
                    value={[effects.glow.opacity * 100]}
                    onValueChange={([value]) => updateGlow({ opacity: value / 100 })}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="stroke" className="space-y-4">
            {/* Stroke Controls */}
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Square className="h-4 w-4" />
                Stroke
              </Label>
              <Switch
                checked={effects.stroke.enabled}
                onCheckedChange={(enabled) => updateStroke({ enabled })}
              />
            </div>
            
            {effects.stroke.enabled && (
              <div className="space-y-4 pl-6">
                {/* Stroke Color */}
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={effects.stroke.color}
                      onChange={(e) => updateStroke({ color: e.target.value })}
                      className="w-12 h-8 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={effects.stroke.color}
                      onChange={(e) => updateStroke({ color: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Stroke Width */}
                <div className="space-y-2">
                  <Label>Width: {effects.stroke.width}px</Label>
                  <Slider
                    value={[effects.stroke.width]}
                    onValueChange={([value]) => updateStroke({ width: value })}
                    max={20}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                {/* Stroke Opacity */}
                <div className="space-y-2">
                  <Label>Opacity: {Math.round(effects.stroke.opacity * 100)}%</Label>
                  <Slider
                    value={[effects.stroke.opacity * 100]}
                    onValueChange={([value]) => updateStroke({ opacity: value / 100 })}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Separator />

        {/* Effect Presets */}
        <div className="space-y-3">
          <Label>Effect Presets</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                updateShadow({ enabled: true, color: '#000000', blur: 8, offsetX: 4, offsetY: 4, opacity: 0.3 });
              }}
            >
              Soft Shadow
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                updateShadow({ enabled: true, color: '#000000', blur: 2, offsetX: 2, offsetY: 2, opacity: 0.8 });
              }}
            >
              Hard Shadow
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                updateGlow({ enabled: true, color: '#ffffff', blur: 12, opacity: 0.8 });
              }}
            >
              White Glow
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                updateGlow({ enabled: true, color: '#4ECDC4', blur: 16, opacity: 0.6 });
              }}
            >
              Neon Glow
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                updateStroke({ enabled: true, color: '#000000', width: 2, opacity: 1 });
              }}
            >
              Black Outline
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                updateStroke({ enabled: true, color: '#ffffff', width: 3, opacity: 1 });
              }}
            >
              White Outline
            </Button>
          </div>
        </div>

        <Separator />

        {/* Reset Button */}
        <Button
          variant="outline"
          onClick={resetEffects}
          className="w-full"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset All Effects
        </Button>
      </CardContent>
    </Card>
  );
};