import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Type, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react';
import { TextLayer, FONT_FAMILIES } from './logoTypes';

interface TextControlsProps {
  layer?: TextLayer;
  onUpdate: (updates: Partial<TextLayer>) => void;
}

/**
 * Text Controls Component
 * Provides comprehensive text editing controls for logo text layers
 */
export const TextControls: React.FC<TextControlsProps> = ({ layer, onUpdate }) => {
  if (!layer || layer.type !== 'text') {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Type className="w-8 h-8 mb-2 opacity-50" />
          <p className="text-sm">No text layer selected</p>
        </CardContent>
      </Card>
    );
  }

  const textLayer = layer as TextLayer;

  return (
    <div className="space-y-4">
      {/* Text Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Type className="w-4 h-4" />
            Text Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="text-content">Text</Label>
            <Input
              id="text-content"
              value={textLayer.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              placeholder="Enter your text"
            />
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Font Family */}
          <div>
            <Label>Font Family</Label>
            <Select
              value={textLayer.font.family}
              onValueChange={(value) => onUpdate({ 
                font: { ...textLayer.font, family: value } 
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FONT_FAMILIES.map((font) => (
                  <SelectItem key={font.name} value={font.name}>
                    <span style={{ fontFamily: font.name }}>{font.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Size */}
          <div>
            <Label>Font Size: {textLayer.font.size}px</Label>
            <Slider
              value={[textLayer.font.size]}
              onValueChange={([value]) => onUpdate({ 
                font: { ...textLayer.font, size: value } 
              })}
              min={8}
              max={200}
              step={1}
            />
          </div>

          {/* Font Weight */}
          <div>
            <Label>Font Weight</Label>
            <Select
              value={textLayer.font.weight.toString()}
              onValueChange={(value) => onUpdate({ 
                font: { ...textLayer.font, weight: parseInt(value) } 
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">Thin (100)</SelectItem>
                <SelectItem value="200">Extra Light (200)</SelectItem>
                <SelectItem value="300">Light (300)</SelectItem>
                <SelectItem value="400">Regular (400)</SelectItem>
                <SelectItem value="500">Medium (500)</SelectItem>
                <SelectItem value="600">Semi Bold (600)</SelectItem>
                <SelectItem value="700">Bold (700)</SelectItem>
                <SelectItem value="800">Extra Bold (800)</SelectItem>
                <SelectItem value="900">Black (900)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Font Style */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={textLayer.font.style === 'italic' ? 'default' : 'outline'}
              onClick={() => onUpdate({ 
                font: { 
                  ...textLayer.font, 
                  style: textLayer.font.style === 'italic' ? 'normal' : 'italic' 
                } 
              })}
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={textLayer.font.textDecoration === 'underline' ? 'default' : 'outline'}
              onClick={() => onUpdate({ 
                font: { 
                  ...textLayer.font, 
                  textDecoration: textLayer.font.textDecoration === 'underline' ? 'none' : 'underline' 
                } 
              })}
            >
              <Underline className="w-4 h-4" />
            </Button>
          </div>

          {/* Letter Spacing */}
          <div>
            <Label>Letter Spacing: {textLayer.font.letterSpacing}px</Label>
            <Slider
              value={[textLayer.font.letterSpacing]}
              onValueChange={([value]) => onUpdate({ 
                font: { ...textLayer.font, letterSpacing: value } 
              })}
              min={-5}
              max={20}
              step={0.1}
            />
          </div>

          {/* Line Height */}
          <div>
            <Label>Line Height: {textLayer.font.lineHeight}</Label>
            <Slider
              value={[textLayer.font.lineHeight]}
              onValueChange={([value]) => onUpdate({ 
                font: { ...textLayer.font, lineHeight: value } 
              })}
              min={0.5}
              max={3}
              step={0.1}
            />
          </div>
        </CardContent>
      </Card>

      {/* Text Alignment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Alignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={textLayer.textAlign === 'left' ? 'default' : 'outline'}
              onClick={() => onUpdate({ textAlign: 'left' })}
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={textLayer.textAlign === 'center' ? 'default' : 'outline'}
              onClick={() => onUpdate({ textAlign: 'center' })}
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={textLayer.textAlign === 'right' ? 'default' : 'outline'}
              onClick={() => onUpdate({ textAlign: 'right' })}
            >
              <AlignRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Text Transform */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Text Transform</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={textLayer.font.textTransform}
            onValueChange={(value: any) => onUpdate({ 
              font: { ...textLayer.font, textTransform: value } 
            })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="uppercase">UPPERCASE</SelectItem>
              <SelectItem value="lowercase">lowercase</SelectItem>
              <SelectItem value="capitalize">Capitalize</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
};