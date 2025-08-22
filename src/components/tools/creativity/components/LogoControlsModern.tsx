import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Type, 
  Palette, 
  Layout, 
  Settings, 
  Sparkles,
  Grid3X3,
  AlignCenter,
  Move3D
} from 'lucide-react';
import { LogoSettings } from '../types/logoTypes';
import { fontFamilies, iconOptions, shapes, layouts } from '../data/logoPresets';
import { ColorInput, RangeSlider, SelectDropdown, FormSection } from './shared/FormControls';

interface LogoControlsModernProps {
  logo: LogoSettings;
  onUpdate: (updates: Partial<LogoSettings>) => void;
}

/**
 * Modern logo controls component with advanced UI and grid system
 * Features tabbed interface, visual controls, and responsive design
 */
export const LogoControlsModern = ({ logo, onUpdate }: LogoControlsModernProps) => {
  const [activeTab, setActiveTab] = useState('content');
  const [showGrid, setShowGrid] = useState(false);

  /**
   * Handle font weight selection with visual preview
   */
  const fontWeights = [
    { value: '300', label: 'Light', preview: 'Aa' },
    { value: '400', label: 'Regular', preview: 'Aa' },
    { value: '500', label: 'Medium', preview: 'Aa' },
    { value: '600', label: 'Semibold', preview: 'Aa' },
    { value: '700', label: 'Bold', preview: 'Aa' },
    { value: '800', label: 'Extra Bold', preview: 'Aa' }
  ];

  /**
   * Handle layout selection with visual indicators
   */
  const layoutOptions = layouts.map(layout => ({
    ...layout,
    description: {
      'horizontal': 'Icône et texte côte à côte',
      'vertical': 'Icône au-dessus du texte',
      'icon-only': 'Icône uniquement',
      'text-only': 'Texte uniquement'
    }[layout.key]
  }));

  return (
    <div className="space-y-6">
      {/* Header with grid toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Contrôles Avancés</h3>
        </div>
        <Button
          variant={showGrid ? "default" : "outline"}
          size="sm"
          onClick={() => setShowGrid(!showGrid)}
          className="flex items-center gap-2"
        >
          <Grid3X3 className="w-4 h-4" />
          Grille
        </Button>
      </div>

      {/* Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            Contenu
          </TabsTrigger>
          <TabsTrigger value="style" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Style
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            Disposition
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Couleurs
          </TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Type className="w-4 h-4" />
                Texte et Contenu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Text Input with Character Counter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Texte du logo</Label>
                <div className="relative">
                  <Input
                    value={logo.text}
                    onChange={(e) => onUpdate({ text: e.target.value })}
                    placeholder="Mon Logo"
                    className="pr-12"
                    maxLength={20}
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
                  >
                    {logo.text.length}/20
                  </Badge>
                </div>
              </div>

              {/* Font Family with Preview */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Police de caractères</Label>
                <Select value={logo.fontFamily} onValueChange={(value) => onUpdate({ fontFamily: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontFamilies.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Font Weight Visual Selector */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Épaisseur de police</Label>
                <div className="grid grid-cols-3 gap-2">
                  {fontWeights.map((weight) => (
                    <Button
                      key={weight.value}
                      variant={logo.fontWeight === weight.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => onUpdate({ fontWeight: weight.value })}
                      className="flex flex-col items-center gap-1 h-auto py-3"
                    >
                      <span 
                        className="text-lg"
                        style={{ fontWeight: weight.value, fontFamily: logo.fontFamily }}
                      >
                        {weight.preview}
                      </span>
                      <span className="text-xs">{weight.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Font Size with Visual Feedback */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Taille de police</Label>
                  <Badge variant="outline">{logo.fontSize}px</Badge>
                </div>
                <Slider
                  value={[logo.fontSize]}
                  onValueChange={([value]) => onUpdate({ fontSize: value })}
                  min={12}
                  max={72}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>12px</span>
                  <span 
                    style={{ 
                      fontSize: `${Math.min(logo.fontSize, 16)}px`,
                      fontFamily: logo.fontFamily,
                      fontWeight: logo.fontWeight
                    }}
                  >
                    Aperçu
                  </span>
                  <span>72px</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Style Tab */}
        <TabsContent value="style" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Style et Forme
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Shape Selection with Visual Preview */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Forme de fond</Label>
                <div className="grid grid-cols-2 gap-2">
                  {shapes.map((shape) => (
                    <Button
                      key={shape.key}
                      onClick={() => onUpdate({ shape: shape.key })}
                      variant={logo.shape === shape.key ? "default" : "outline"}
                      className="flex items-center gap-2 h-12"
                    >
                      <span className="text-lg">{shape.icon}</span>
                      <span className="text-sm">{shape.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Padding and Spacing */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Espacement</Label>
                    <Badge variant="outline">{logo.padding}px</Badge>
                  </div>
                  <Slider
                    value={[logo.padding]}
                    onValueChange={([value]) => onUpdate({ padding: value })}
                    min={8}
                    max={40}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Bordure</Label>
                    <Badge variant="outline">{logo.borderWidth}px</Badge>
                  </div>
                  <Slider
                    value={[logo.borderWidth]}
                    onValueChange={([value]) => onUpdate({ borderWidth: value })}
                    min={0}
                    max={8}
                    step={1}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Disposition et Alignement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Layout Selection with Descriptions */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Type de disposition</Label>
                <div className="grid grid-cols-1 gap-2">
                  {layoutOptions.map((layout) => (
                    <Button
                      key={layout.key}
                      onClick={() => onUpdate({ layout: layout.key })}
                      variant={logo.layout === layout.key ? "default" : "outline"}
                      className="flex items-center justify-between p-4 h-auto"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{layout.icon}</span>
                        <div className="text-left">
                          <div className="font-medium">{layout.name}</div>
                          <div className="text-xs text-gray-500">{layout.description}</div>
                        </div>
                      </div>
                      {logo.layout === layout.key && (
                        <AlignCenter className="w-4 h-4" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Icon Controls */}
              {logo.layout !== 'text-only' && (
                <div className="space-y-4">
                  <Separator />
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Icône</Label>
                    <ScrollArea className="h-32 w-full border rounded-md p-2">
                      <div className="grid grid-cols-8 gap-1">
                        {iconOptions.map((icon, index) => (
                          <Button
                            key={index}
                            variant={logo.icon === icon ? "default" : "ghost"}
                            size="sm"
                            onClick={() => onUpdate({ icon })}
                            className="h-8 w-8 p-0"
                          >
                            {icon}
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Taille d'icône</Label>
                      <Badge variant="outline">{logo.iconSize}px</Badge>
                    </div>
                    <Slider
                      value={[logo.iconSize]}
                      onValueChange={([value]) => onUpdate({ iconSize: value })}
                      min={16}
                      max={64}
                      step={2}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Colors Tab */}
        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Couleurs et Thème
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Color Grid */}
              <div className="grid grid-cols-2 gap-4">
                <ColorInput
                  label="Couleur du texte"
                  value={logo.textColor}
                  onChange={(value) => onUpdate({ textColor: value })}
                  showColorPreview={true}
                />
                <ColorInput
                  label="Couleur de fond"
                  value={logo.backgroundColor}
                  onChange={(value) => onUpdate({ backgroundColor: value })}
                  showColorPreview={true}
                />
                {logo.layout !== 'text-only' && (
                  <ColorInput
                    label="Couleur d'icône"
                    value={logo.iconColor}
                    onChange={(value) => onUpdate({ iconColor: value })}
                    showColorPreview={true}
                  />
                )}
                {logo.shape !== 'none' && (
                  <ColorInput
                    label="Couleur de forme"
                    value={logo.shapeColor}
                    onChange={(value) => onUpdate({ shapeColor: value })}
                    showColorPreview={true}
                  />
                )}
                {logo.borderWidth > 0 && (
                  <ColorInput
                    label="Couleur de bordure"
                    value={logo.borderColor}
                    onChange={(value) => onUpdate({ borderColor: value })}
                    showColorPreview={true}
                  />
                )}
              </div>

              {/* Quick Color Themes */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Thèmes rapides</Label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: 'Moderne', text: '#1F2937', bg: '#F9FAFB', accent: '#3B82F6' },
                    { name: 'Sombre', text: '#FFFFFF', bg: '#111827', accent: '#10B981' },
                    { name: 'Chaleureux', text: '#92400E', bg: '#FEF3C7', accent: '#F59E0B' },
                    { name: 'Océan', text: '#0C4A6E', bg: '#E0F2FE', accent: '#0284C7' }
                  ].map((theme) => (
                    <Button
                      key={theme.name}
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdate({
                        textColor: theme.text,
                        backgroundColor: theme.bg,
                        iconColor: theme.accent,
                        shapeColor: theme.accent
                      })}
                      className="flex flex-col items-center gap-1 h-auto py-2"
                    >
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.text }} />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.bg }} />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.accent }} />
                      </div>
                      <span className="text-xs">{theme.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Grid Overlay Indicator */}
      {showGrid && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="w-full h-full opacity-20 bg-grid-pattern" />
        </div>
      )}
    </div>
  );
};