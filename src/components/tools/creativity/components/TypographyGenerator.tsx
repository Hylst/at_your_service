
import { useState } from "react";
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
  color: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textDecoration: 'none' | 'underline' | 'line-through';
  textShadow: string;
}

export const TypographyGenerator: React.FC = () => {
  // Design system hooks
  const { tokens } = useDesignSystem();
  const { animate } = useAnimation({ duration: 200, easing: 'ease-out' });
  const [sampleText, setSampleText] = useState("Votre texte ici pour prévisualiser le style");
  const [currentStyle, setCurrentStyle] = useState<TypographyStyle>({
    fontFamily: "Inter, sans-serif",
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 1.5,
    letterSpacing: 0,
    color: "#000000",
    textAlign: 'left',
    textTransform: 'none',
    textDecoration: 'none',
    textShadow: 'none'
  });

  const fontFamilies = [
    { name: "Inter", value: "Inter, sans-serif" },
    { name: "Roboto", value: "Roboto, sans-serif" },
    { name: "Open Sans", value: "'Open Sans', sans-serif" },
    { name: "Lato", value: "Lato, sans-serif" },
    { name: "Montserrat", value: "Montserrat, sans-serif" },
    { name: "Source Sans Pro", value: "'Source Sans Pro', sans-serif" },
    { name: "Ubuntu", value: "Ubuntu, sans-serif" },
    { name: "Raleway", value: "Raleway, sans-serif" },
    { name: "Poppins", value: "Poppins, sans-serif" },
    { name: "Nunito", value: "Nunito, sans-serif" },
    { name: "Playfair Display", value: "'Playfair Display', serif" },
    { name: "Merriweather", value: "Merriweather, serif" },
    { name: "Georgia", value: "Georgia, serif" },
    { name: "Times", value: "'Times New Roman', serif" },
    { name: "Fira Code", value: "'Fira Code', monospace" },
    { name: "Source Code Pro", value: "'Source Code Pro', monospace" },
    { name: "JetBrains Mono", value: "'JetBrains Mono', monospace" }
  ];

  const fontWeights = [
    { name: "Thin", value: "100" },
    { name: "Extra Light", value: "200" },
    { name: "Light", value: "300" },
    { name: "Regular", value: "400" },
    { name: "Medium", value: "500" },
    { name: "Semi Bold", value: "600" },
    { name: "Bold", value: "700" },
    { name: "Extra Bold", value: "800" },
    { name: "Black", value: "900" }
  ];

  const presetStyles = [
    {
      name: "Titre Principal",
      style: {
        fontSize: 48,
        fontWeight: "700",
        lineHeight: 1.2,
        letterSpacing: -1,
        textTransform: 'none' as const
      }
    },
    {
      name: "Sous-titre",
      style: {
        fontSize: 32,
        fontWeight: "600",
        lineHeight: 1.3,
        letterSpacing: -0.5,
        textTransform: 'none' as const
      }
    },
    {
      name: "Corps de texte",
      style: {
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 1.6,
        letterSpacing: 0,
        textTransform: 'none' as const
      }
    },
    {
      name: "Citation",
      style: {
        fontSize: 20,
        fontWeight: "400",
        lineHeight: 1.8,
        letterSpacing: 0.5,
        textTransform: 'none' as const,
        fontFamily: "'Playfair Display', serif"
      }
    },
    {
      name: "Bouton",
      style: {
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 1,
        letterSpacing: 1,
        textTransform: 'uppercase' as const
      }
    },
    {
      name: "Code",
      style: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 1.5,
        letterSpacing: 0,
        fontFamily: "'Fira Code', monospace",
        textTransform: 'none' as const
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
        const randomColors = ['#000000', '#333333', '#666666', '#2563eb', '#dc2626', '#059669', '#7c3aed'];
        const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
        
        const newStyle = {
          ...currentStyle,
          fontFamily: randomFont.value,
          fontWeight: randomWeight.value,
          fontSize: randomSize,
          lineHeight: parseFloat(randomLineHeight.toFixed(1)),
          letterSpacing: parseFloat(randomLetterSpacing.toFixed(1)),
          color: randomColor
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

  const applyPreset = (preset: any) => {
    setCurrentStyle({
      ...currentStyle,
      ...preset.style
    });
  };

  const updateStyle = (updates: Partial<TypographyStyle>) => {
    setCurrentStyle({ ...currentStyle, ...updates });
  };

  const generateCSS = () => {
    return `font-family: ${currentStyle.fontFamily};
font-size: ${currentStyle.fontSize}px;
font-weight: ${currentStyle.fontWeight};
line-height: ${currentStyle.lineHeight};
letter-spacing: ${currentStyle.letterSpacing}px;
color: ${currentStyle.color};
text-align: ${currentStyle.textAlign};
text-transform: ${currentStyle.textTransform};
text-decoration: ${currentStyle.textDecoration};${currentStyle.textShadow !== 'none' ? `\ntext-shadow: ${currentStyle.textShadow};` : ''}`;
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    toast({
      title: "CSS copié !",
      description: "Le style CSS a été copié dans le presse-papiers.",
    });
  };

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Typography Preview */}
        <div className="lg:col-span-2">
          <Card variant="default" className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Type className="w-5 h-5" />
                Typography Preview
              </h3>
            </div>
            <div className="space-y-6">
              {/* Live Preview */}
              <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600 min-h-[200px] flex items-center justify-center">
                <div
                  style={{
                    fontFamily: currentStyle.fontFamily,
                    fontSize: `${currentStyle.fontSize}px`,
                    fontWeight: currentStyle.fontWeight,
                    lineHeight: currentStyle.lineHeight,
                    letterSpacing: `${currentStyle.letterSpacing}px`,
                    color: currentStyle.color,
                    textAlign: currentStyle.textAlign as any,
                    textTransform: currentStyle.textTransform as any,
                    textDecoration: currentStyle.textDecoration,
                    textShadow: currentStyle.textShadow
                  }}
                  className="w-full text-center"
                >
                  {sampleText}
                </div>
              </div>

              {/* Sample Text Input */}
              <FormSection title="Sample Text">
                <Textarea
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  placeholder="Enter your text here to preview the typography style..."
                  className="min-h-[80px]"
                />
              </FormSection>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <Button onClick={generateRandomStyle} variant="outline" className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Random Style
                </Button>
                <Button onClick={copyCSS} variant="outline" className="flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Copy CSS
                </Button>
                <UnifiedExportButton
                  formats={['css', 'json']}
                  onExport={(format) => {
                    if (format === 'css') copyCSS();
                    else exportStyle();
                  }}
                  layout="single"
                  className="flex items-center gap-2"
                />
              </div>

              {/* CSS Output */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">CSS Output</span>
                  <Button onClick={copyCSS} size="sm" variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {generateCSS()}
                </pre>
              </div>
            </div>
          </Card>
        </div>

        {/* Typography Controls */}
        <div className="space-y-4">
          <Card variant="default" className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Typography Settings</h3>
            </div>
            <div className="space-y-4">
              {/* Font Family */}
              <SelectDropdown
                label="Font Family"
                value={currentStyle.fontFamily}
                onChange={(value) => updateStyle({ fontFamily: value })}
                placeholder="Select font family"
                options={fontFamilies.map(font => ({
                  value: font.value,
                  label: font.name
                }))}
              />

              {/* Font Size */}
              <RangeSlider
                label={`Font Size: ${currentStyle.fontSize}px`}
                value={currentStyle.fontSize}
                onChange={(value) => updateStyle({ fontSize: value })}
                min={8}
                max={72}
                step={1}
              />

              {/* Font Weight */}
              <div>
                <span className="text-sm font-medium mb-3 block">Font Weight</span>
                <div className="grid grid-cols-3 gap-2">
                  {fontWeights.slice(0, 9).map((weight) => (
                    <Button
                      key={weight.value}
                      onClick={() => updateStyle({ fontWeight: weight.value })}
                      variant={currentStyle.fontWeight === weight.value ? "primary" : "outline"}
                      size="sm"
                      className="text-xs"
                    >
                      {weight.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Line Height */}
              <RangeSlider
                label={`Line Height: ${currentStyle.lineHeight.toFixed(1)}`}
                value={currentStyle.lineHeight}
                onChange={(value) => updateStyle({ lineHeight: value })}
                min={0.8}
                max={3}
                step={0.1}
              />

              {/* Letter Spacing */}
              <RangeSlider
                label={`Letter Spacing: ${currentStyle.letterSpacing}px`}
                value={currentStyle.letterSpacing}
                onChange={(value) => updateStyle({ letterSpacing: value })}
                min={-3}
                max={5}
                step={0.1}
              />

              {/* Color */}
              <div>
                <span className="text-sm font-medium mb-3 block">Text Color</span>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={currentStyle.color}
                    onChange={(e) => updateStyle({ color: e.target.value })}
                    className="w-12 h-10 rounded border cursor-pointer"
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
                      variant={currentStyle.textAlign === align ? "primary" : "outline"}
                      size="sm"
                      className="text-xs"
                    >
                      {align.charAt(0).toUpperCase()}
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
                      variant={currentStyle.textTransform === transform ? "primary" : "outline"}
                      size="sm"
                      className="text-xs"
                    >
                      {transform === 'none' ? 'None' : transform.charAt(0).toUpperCase() + transform.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Typography Presets */}
          <Card variant="default" className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Typography Presets</h3>
            </div>
            <div>
              <div className="space-y-2">
                {presetStyles.map((preset, index) => (
                  <Button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    variant="outline"
                    className="w-full justify-start text-left p-3 h-auto"
                  >
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{preset.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {preset.style.fontSize}px • {fontWeights.find(w => w.value === preset.style.fontWeight)?.name}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
