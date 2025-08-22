import React, { useState } from "react";
import { UnifiedCard as Card, UnifiedButton as Button, UnifiedInput as Input, UnifiedBadge as Badge, CreativityToolHeader, UnifiedExportButton } from '@/components/ui/design-system';
import { Textarea } from '@/components/ui/textarea';
import { FormSection, RangeSlider, SelectDropdown } from './shared/FormControls';
import { useAnimation, useDesignSystem } from '@/components/ui/design-system/hooks';
import { animationPresets } from '@/components/ui/design-system/animations';
import { Copy, RefreshCw, Download, Type, Palette } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  color: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textDecoration: 'none' | 'underline' | 'line-through' | 'overline';
  textShadow: string;
  fontStyle: 'normal' | 'italic' | 'oblique';
  textStroke: string;
  backgroundClip: boolean;
  gradient: string;
  opacity: number;
  writingMode: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';
}

/**
 * Advanced Typography Generator Component
 * Provides comprehensive typography styling tools with real-time preview
 */
export const TypographyGenerator: React.FC = () => {
  // Design system hooks
  const { tokens } = useDesignSystem();
  const { animate } = useAnimation({ duration: 200, easing: 'ease-out' });
  
  // Component state
  const [sampleText, setSampleText] = useState("Votre texte ici pour prévisualiser le style");
  const [currentStyle, setCurrentStyle] = useState<TypographyStyle>({
    fontFamily: "Inter, sans-serif",
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 1.5,
    letterSpacing: 0,
    wordSpacing: 0,
    color: "#000000",
    textAlign: 'left',
    textTransform: 'none',
    textDecoration: 'none',
    textShadow: 'none',
    fontStyle: 'normal',
    textStroke: 'none',
    backgroundClip: false,
    gradient: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
    opacity: 1,
    writingMode: 'horizontal-tb'
  });

  // Font configuration arrays
  const fontFamilies = [
    { label: "Inter", value: "Inter, sans-serif" },
    { label: "Roboto", value: "Roboto, sans-serif" },
    { label: "Open Sans", value: "'Open Sans', sans-serif" },
    { label: "Lato", value: "Lato, sans-serif" },
    { label: "Montserrat", value: "Montserrat, sans-serif" },
    { label: "Poppins", value: "Poppins, sans-serif" },
    { label: "Source Sans Pro", value: "'Source Sans Pro', sans-serif" },
    { label: "Nunito", value: "Nunito, sans-serif" },
    { label: "Playfair Display", value: "'Playfair Display', serif" },
    { label: "Merriweather", value: "Merriweather, serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Times New Roman", value: "'Times New Roman', serif" },
    { label: "Fira Code", value: "'Fira Code', monospace" },
    { label: "Source Code Pro", value: "'Source Code Pro', monospace" }
  ];

  const fontWeights = [
    { label: "Thin", value: "100" },
    { label: "Light", value: "300" },
    { label: "Regular", value: "400" },
    { label: "Medium", value: "500" },
    { label: "Semi Bold", value: "600" },
    { label: "Bold", value: "700" },
    { label: "Extra Bold", value: "800" },
    { label: "Black", value: "900" }
  ];

  const typographyPresets = [
    {
      name: "Heading Large",
      style: {
        fontSize: 48,
        fontWeight: "700",
        lineHeight: 1.2,
        letterSpacing: -0.5,
        fontFamily: "Inter, sans-serif",
        textTransform: 'none' as const,
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        color: '#1a202c'
      }
    },
    {
      name: "Elegant Serif",
      style: {
        fontSize: 32,
        fontWeight: "400",
        lineHeight: 1.4,
        letterSpacing: 0,
        fontFamily: "'Playfair Display', serif",
        textTransform: 'none' as const,
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        color: '#2c3e50',
        fontStyle: 'italic' as const
      }
    },
    {
      name: "Bold Impact",
      style: {
        fontSize: 36,
        fontWeight: "700",
        lineHeight: 1.2,
        letterSpacing: 1,
        fontFamily: "Montserrat, sans-serif",
        textTransform: 'uppercase' as const,
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        color: '#000000'
      }
    },
    {
      name: "Gradient Hero",
      style: {
        fontSize: 42,
        fontWeight: "800",
        lineHeight: 1.1,
        letterSpacing: 2,
        fontFamily: "Montserrat, sans-serif",
        textTransform: 'uppercase' as const,
        backgroundClip: true,
        gradient: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
      }
    },
    {
      name: "Neon Glow",
      style: {
        fontSize: 28,
        fontWeight: "600",
        lineHeight: 1.3,
        letterSpacing: 1,
        fontFamily: "'Fira Code', monospace",
        textTransform: 'uppercase' as const,
        color: '#00ffff',
        textShadow: '0 0 10px rgba(0,255,255,0.8), 0 0 20px rgba(0,255,255,0.6)'
      }
    },
    {
      name: "Clean Minimal",
      style: {
        fontSize: 18,
        fontWeight: "300",
        lineHeight: 1.6,
        letterSpacing: 0.5,
        fontFamily: "Roboto, sans-serif",
        textTransform: 'none' as const,
        opacity: 0.9,
        color: '#4a5568'
      }
    }
  ];

  /**
   * Generate random typography style with animation
   */
  const generateRandomStyle = () => {
    try {
      animate(() => {
        const randomFont = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
        const randomWeight = fontWeights[Math.floor(Math.random() * fontWeights.length)];
        const randomSize = Math.floor(Math.random() * (48 - 14 + 1)) + 14;
        const randomLineHeight = Math.random() * (2 - 1) + 1;
        const randomLetterSpacing = Math.random() * (2 - (-1)) + (-1);
        const randomWordSpacing = Math.random() * (10 - (-5)) + (-5);
        const randomColors = ['#000000', '#333333', '#666666', '#2563eb', '#dc2626', '#059669', '#7c3aed'];
        const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
        
        const textAligns: TypographyStyle['textAlign'][] = ['left', 'center', 'right', 'justify'];
        const textTransforms: TypographyStyle['textTransform'][] = ['none', 'uppercase', 'lowercase', 'capitalize'];
        const textDecorations: TypographyStyle['textDecoration'][] = ['none', 'underline', 'line-through', 'overline'];
        const fontStyles: TypographyStyle['fontStyle'][] = ['normal', 'italic', 'oblique'];
        const writingModes: TypographyStyle['writingMode'][] = ['horizontal-tb', 'vertical-rl', 'vertical-lr'];
        
        const randomAlign = textAligns[Math.floor(Math.random() * textAligns.length)];
        const randomTransform = textTransforms[Math.floor(Math.random() * textTransforms.length)];
        const randomDecoration = textDecorations[Math.floor(Math.random() * textDecorations.length)];
        const randomFontStyle = fontStyles[Math.floor(Math.random() * fontStyles.length)];
        const randomWritingMode = writingModes[Math.floor(Math.random() * writingModes.length)];
        
        // Generate random text shadow
        const shadowX = Math.floor(Math.random() * 6) - 3;
        const shadowY = Math.floor(Math.random() * 6) - 3;
        const shadowBlur = Math.floor(Math.random() * 8);
        const shadowColor = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
        const randomShadow = Math.random() > 0.5 ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}` : 'none';
        
        // Generate random gradient
        const gradients = [
          'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
          'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          'linear-gradient(45deg, #fa709a 0%, #fee140 100%)'
        ];
        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
        
        // Generate random text stroke
        const strokeWidth = Math.floor(Math.random() * 3);
        const strokeColor = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
        const randomStroke = Math.random() > 0.7 ? `${strokeWidth}px ${strokeColor}` : 'none';
        
        const newStyle = {
          ...currentStyle,
          fontFamily: randomFont.value,
          fontWeight: randomWeight.value,
          fontSize: randomSize,
          lineHeight: parseFloat(randomLineHeight.toFixed(1)),
          letterSpacing: parseFloat(randomLetterSpacing.toFixed(1)),
          wordSpacing: parseFloat(randomWordSpacing.toFixed(1)),
          color: randomColor,
          textAlign: randomAlign,
          textTransform: randomTransform,
          textDecoration: randomDecoration,
          textShadow: randomShadow,
          fontStyle: randomFontStyle,
          textStroke: randomStroke,
          backgroundClip: Math.random() > 0.8,
          gradient: randomGradient,
          opacity: Math.round((Math.random() * 0.5 + 0.5) * 100) / 100,
          writingMode: randomWritingMode
        };
        
        setCurrentStyle(newStyle);
        toast({
          title: "Random Style Generated",
          description: "A new typography style has been applied."
        });
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate random style.",
        variant: "destructive"
      });
    }
  };

  /**
   * Apply a typography preset
   */
  const applyPreset = (preset: any) => {
    setCurrentStyle({
      ...currentStyle,
      fontFamily: preset.style.fontFamily || currentStyle.fontFamily,
      fontSize: preset.style.fontSize || currentStyle.fontSize,
      fontWeight: preset.style.fontWeight || currentStyle.fontWeight,
      lineHeight: preset.style.lineHeight || currentStyle.lineHeight,
      letterSpacing: preset.style.letterSpacing || currentStyle.letterSpacing,
      wordSpacing: preset.style.wordSpacing || currentStyle.wordSpacing,
      color: preset.style.color || currentStyle.color,
      textAlign: preset.style.textAlign || currentStyle.textAlign,
      textTransform: preset.style.textTransform || currentStyle.textTransform,
      textDecoration: preset.style.textDecoration || currentStyle.textDecoration,
      textShadow: preset.style.textShadow || currentStyle.textShadow,
      fontStyle: preset.style.fontStyle || currentStyle.fontStyle,
      textStroke: preset.style.textStroke || currentStyle.textStroke,
      backgroundClip: preset.style.backgroundClip !== undefined ? preset.style.backgroundClip : currentStyle.backgroundClip,
      gradient: preset.style.gradient || currentStyle.gradient,
      opacity: preset.style.opacity !== undefined ? preset.style.opacity : currentStyle.opacity,
      writingMode: preset.style.writingMode || currentStyle.writingMode
    });
  };

  /**
   * Update typography style properties
   */
  const updateStyle = (updates: Partial<TypographyStyle>) => {
    setCurrentStyle({ ...currentStyle, ...updates });
  };

  /**
   * Generates CSS string from current typography style
   */
  const generateCSS = (): string => {
    let css = `font-family: ${currentStyle.fontFamily};
font-size: ${currentStyle.fontSize}px;
font-weight: ${currentStyle.fontWeight};
font-style: ${currentStyle.fontStyle};
line-height: ${currentStyle.lineHeight};
letter-spacing: ${currentStyle.letterSpacing}px;
word-spacing: ${currentStyle.wordSpacing}px;
text-align: ${currentStyle.textAlign};
text-transform: ${currentStyle.textTransform};
text-decoration: ${currentStyle.textDecoration};
text-shadow: ${currentStyle.textShadow};
opacity: ${currentStyle.opacity};
writing-mode: ${currentStyle.writingMode};`;
    
    if (currentStyle.backgroundClip && currentStyle.gradient) {
      css += `
background: ${currentStyle.gradient};
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;`;
    } else {
      css += `
color: ${currentStyle.color};`;
    }
    
    if (currentStyle.textStroke !== 'none') {
      css += `
-webkit-text-stroke: ${currentStyle.textStroke};`;
    }
    
    return css;
   };

  /**
   * Copy CSS to clipboard
   */
  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    toast({
      title: "CSS copié !",
      description: "Le style CSS a été copié dans le presse-papiers.",
    });
  };

  /**
   * Export typography style as JSON
   */
  const exportStyle = () => {
    const data = {
      style: currentStyle,
      css: generateCSS(),
      sampleText,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'typography-style.json';
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Export réussi !",
      description: "Votre style typographique a été exporté avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Modern Tool Header */}
      <CreativityToolHeader
        title="Advanced Typography Generator"
        subtitle="Professional Text Styling"
        description="Create and customize typography styles with advanced controls and real-time preview for professional design projects."
        icon={<Type className="w-6 h-6" />}
        badges={['Live Preview', 'CSS Export', 'Web Fonts', 'Responsive']}
        toolType="generator"
        size="lg"
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Controls */}
        <div className="space-y-6">
          {/* Sample Text Input */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Sample Text</h3>
                <UnifiedExportButton
                  onExport={exportStyle}
                  filename="typography-style"
                  data={currentStyle}
                  size="sm"
                />
              </div>
              <Textarea
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                placeholder="Enter your sample text here..."
                className="min-h-[100px] resize-none"
              />
            </div>
          </Card>

          {/* Typography Controls */}
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Typography Settings</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={generateRandomStyle}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Random
                  </Button>
                  <Button
                    onClick={copyCSS}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy CSS
                  </Button>
                </div>
              </div>

              {/* Font Properties */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Font Properties</h4>
                
                <SelectDropdown
                  label="Font Family"
                  value={currentStyle.fontFamily}
                  onChange={(value) => updateStyle({ fontFamily: value })}
                  options={fontFamilies}
                />

                <RangeSlider
                  label="Font Size"
                  value={currentStyle.fontSize}
                  onChange={(value) => updateStyle({ fontSize: value })}
                  min={8}
                  max={72}
                  step={1}
                  unit="px"
                />

                <SelectDropdown
                  label="Font Weight"
                  value={currentStyle.fontWeight}
                  onChange={(value) => updateStyle({ fontWeight: value })}
                  options={fontWeights}
                />
              </div>

              {/* Spacing Properties */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Spacing Properties</h4>
                
                <RangeSlider
                  label="Line Height"
                  value={currentStyle.lineHeight}
                  onChange={(value) => updateStyle({ lineHeight: value })}
                  min={0.8}
                  max={3}
                  step={0.1}
                />

                <RangeSlider
                  label="Letter Spacing"
                  value={currentStyle.letterSpacing}
                  onChange={(value) => updateStyle({ letterSpacing: value })}
                  min={-2}
                  max={5}
                  step={0.1}
                  unit="px"
                />

                <RangeSlider
                  label="Word Spacing"
                  value={currentStyle.wordSpacing}
                  onChange={(value) => updateStyle({ wordSpacing: value })}
                  min={-5}
                  max={20}
                  step={0.5}
                  unit="px"
                />
              </div>

              {/* Appearance & Style */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Appearance & Style</h4>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Text Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={currentStyle.color}
                      onChange={(e) => updateStyle({ color: e.target.value })}
                      className="w-12 h-10 rounded border border-border cursor-pointer"
                    />
                    <Input
                      value={currentStyle.color}
                      onChange={(e) => updateStyle({ color: e.target.value })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Text Alignment */}
                <div>
                  <span className="text-sm font-medium mb-3 block">Text Alignment</span>
                  <div className="grid grid-cols-4 gap-2">
                    {(['left', 'center', 'right', 'justify'] as const).map((align) => (
                      <Button
                        key={align}
                        onClick={() => updateStyle({ textAlign: align })}
                        variant={currentStyle.textAlign === align ? "default" : "outline"}
                        size="sm"
                        className="capitalize"
                      >
                        {align}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Text Transform */}
                <div>
                  <span className="text-sm font-medium mb-3 block">Text Transform</span>
                  <div className="grid grid-cols-2 gap-2">
                    {(['none', 'uppercase', 'lowercase', 'capitalize'] as const).map((transform) => (
                      <Button
                        key={transform}
                        onClick={() => updateStyle({ textTransform: transform })}
                        variant={currentStyle.textTransform === transform ? "default" : "outline"}
                        size="sm"
                        className="capitalize"
                      >
                        {transform === 'none' ? 'Normal' : transform}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Font Style */}
                <div>
                  <span className="text-sm font-medium mb-3 block">Font Style</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['normal', 'italic', 'oblique'] as const).map((style) => (
                      <Button
                        key={style}
                        onClick={() => updateStyle({ fontStyle: style })}
                        variant={currentStyle.fontStyle === style ? "default" : "outline"}
                        size="sm"
                        className="capitalize"
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Text Decoration */}
                <div>
                  <span className="text-sm font-medium mb-3 block">Text Decoration</span>
                  <div className="grid grid-cols-2 gap-2">
                    {(['none', 'underline', 'line-through', 'overline'] as const).map((decoration) => (
                      <Button
                        key={decoration}
                        onClick={() => updateStyle({ textDecoration: decoration })}
                        variant={currentStyle.textDecoration === decoration ? "default" : "outline"}
                        size="sm"
                        className="capitalize text-xs"
                      >
                        {decoration === 'none' ? 'None' : decoration.replace('-', ' ')}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Opacity */}
                <RangeSlider
                  label="Opacity"
                  value={currentStyle.opacity}
                  onChange={(value) => updateStyle({ opacity: value })}
                  min={0.1}
                  max={1}
                  step={0.1}
                />

                {/* Writing Mode */}
                <div>
                  <span className="text-sm font-medium mb-3 block">Writing Mode</span>
                  <div className="grid grid-cols-1 gap-2">
                    {(['horizontal-tb', 'vertical-rl', 'vertical-lr'] as const).map((mode) => (
                      <Button
                        key={mode}
                        onClick={() => updateStyle({ writingMode: mode })}
                        variant={currentStyle.writingMode === mode ? "default" : "outline"}
                        size="sm"
                        className="text-xs"
                      >
                        {mode === 'horizontal-tb' ? 'Horizontal' : mode === 'vertical-rl' ? 'Vertical Right-Left' : 'Vertical Left-Right'}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advanced Effects */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Advanced Effects</h4>
                
                {/* Gradient Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Gradient Text</span>
                  <Button
                    onClick={() => updateStyle({ backgroundClip: !currentStyle.backgroundClip })}
                    variant={currentStyle.backgroundClip ? "default" : "outline"}
                    size="sm"
                  >
                    {currentStyle.backgroundClip ? 'On' : 'Off'}
                  </Button>
                </div>

                {/* Gradient Selector */}
                {currentStyle.backgroundClip && (
                  <div>
                    <span className="text-sm font-medium mb-3 block">Gradient Style</span>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { name: 'Blue Purple', value: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)' },
                        { name: 'Pink Red', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
                        { name: 'Blue Cyan', value: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)' },
                        { name: 'Green Cyan', value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
                        { name: 'Pink Yellow', value: 'linear-gradient(45deg, #fa709a 0%, #fee140 100%)' }
                      ].map((gradient) => (
                        <Button
                          key={gradient.name}
                          onClick={() => updateStyle({ gradient: gradient.value })}
                          variant={currentStyle.gradient === gradient.value ? "default" : "outline"}
                          size="sm"
                          className="text-xs justify-start"
                          style={{
                            background: currentStyle.gradient === gradient.value ? gradient.value : undefined,
                            color: currentStyle.gradient === gradient.value ? 'white' : undefined
                          }}
                        >
                          {gradient.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Text Stroke */}
                 <div>
                   <span className="text-sm font-medium mb-3 block">Text Stroke</span>
                   <div className="space-y-2">
                     <div className="grid grid-cols-4 gap-2">
                       {['none', '1px #000', '2px #000', '1px #fff'].map((stroke) => (
                         <Button
                           key={stroke}
                           onClick={() => updateStyle({ textStroke: stroke })}
                           variant={currentStyle.textStroke === stroke ? "default" : "outline"}
                           size="sm"
                           className="text-xs"
                         >
                           {stroke === 'none' ? 'None' : stroke.split(' ')[0]}
                         </Button>
                       ))}
                     </div>
                   </div>
                 </div>

                 {/* Text Shadow Controls */}
                 <div>
                   <span className="text-sm font-medium mb-3 block">Text Shadow</span>
                   <div className="space-y-2">
                     <div className="grid grid-cols-2 gap-2">
                       {[
                         { name: 'None', value: 'none' },
                         { name: 'Subtle', value: '1px 1px 2px rgba(0,0,0,0.3)' },
                         { name: 'Strong', value: '2px 2px 4px rgba(0,0,0,0.5)' },
                         { name: 'Glow', value: '0 0 10px rgba(255,255,255,0.8)' }
                       ].map((shadow) => (
                         <Button
                           key={shadow.name}
                           onClick={() => updateStyle({ textShadow: shadow.value })}
                           variant={currentStyle.textShadow === shadow.value ? "default" : "outline"}
                           size="sm"
                           className="text-xs"
                         >
                           {shadow.name}
                         </Button>
                       ))}
                     </div>
                   </div>
                 </div>
              </div>

              {/* Typography Presets */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Typography Presets</h4>
                <div className="grid grid-cols-2 gap-2">
                  {typographyPresets.map((preset, index) => (
                    <Button
                      key={index}
                      onClick={() => applyPreset(preset)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Accessibility Panel */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Accessibility</h4>
                
                {/* Font Size Recommendations */}
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-2">Readability Guidelines</div>
                  <div className="space-y-1 text-xs">
                    <div className={`flex justify-between ${currentStyle.fontSize >= 16 ? 'text-green-600' : 'text-amber-600'}`}>
                      <span>Body text size:</span>
                      <span>{currentStyle.fontSize >= 16 ? '✓ Good' : '⚠ Too small'}</span>
                    </div>
                    <div className={`flex justify-between ${currentStyle.lineHeight >= 1.4 ? 'text-green-600' : 'text-amber-600'}`}>
                      <span>Line height:</span>
                      <span>{currentStyle.lineHeight >= 1.4 ? '✓ Good' : '⚠ Too tight'}</span>
                    </div>
                    <div className={`flex justify-between ${Math.abs(currentStyle.letterSpacing) <= 2 ? 'text-green-600' : 'text-amber-600'}`}>
                      <span>Letter spacing:</span>
                      <span>{Math.abs(currentStyle.letterSpacing) <= 2 ? '✓ Good' : '⚠ Extreme'}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Accessibility Fixes */}
                <div className="space-y-2">
                  <div className="text-xs font-medium mb-2">Quick Fixes</div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => updateStyle({ fontSize: Math.max(16, currentStyle.fontSize), lineHeight: Math.max(1.4, currentStyle.lineHeight) })}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      Readable Size
                    </Button>
                    <Button
                      onClick={() => updateStyle({ color: '#000000', textShadow: 'none' })}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      High Contrast
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel - Preview */}
        <div className="space-y-6">
          {/* Live Preview */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Live Preview</h3>
              <div 
                className="min-h-[200px] p-6 border-2 border-dashed border-border rounded-lg bg-background/50"
                style={{
                  fontFamily: currentStyle.fontFamily,
                  fontSize: `${currentStyle.fontSize}px`,
                  fontWeight: currentStyle.fontWeight,
                  fontStyle: currentStyle.fontStyle,
                  lineHeight: currentStyle.lineHeight,
                  letterSpacing: `${currentStyle.letterSpacing}px`,
                  wordSpacing: `${currentStyle.wordSpacing}px`,
                  textAlign: currentStyle.textAlign,
                  textTransform: currentStyle.textTransform,
                  textDecoration: currentStyle.textDecoration,
                  textShadow: currentStyle.textShadow !== 'none' ? currentStyle.textShadow : undefined,
                  opacity: currentStyle.opacity,
                  writingMode: currentStyle.writingMode,
                  WebkitTextStroke: currentStyle.textStroke !== 'none' ? currentStyle.textStroke : undefined,
                  ...(currentStyle.backgroundClip && currentStyle.gradient ? {
                    background: currentStyle.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  } : {
                    color: currentStyle.color
                  })
                }}
              >
                {sampleText}
              </div>
            </div>
          </Card>

          {/* CSS Output */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Generated CSS</h3>
                <Button
                  onClick={copyCSS}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre-wrap">{generateCSS()}</pre>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
