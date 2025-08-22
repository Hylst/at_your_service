/**
 * Typography Hierarchy Generator Component
 * Generates consistent font scales, heading levels, and spacing relationships
 */

import React, { useState, useMemo } from 'react';
import { BarChart3, Download, Copy, RefreshCw, Settings } from 'lucide-react';
import { TypographyStyle } from '../types/typographyTypes';

interface TypographyHierarchyGeneratorProps {
  baseStyle: TypographyStyle;
  onApplyHierarchy: (hierarchy: TypographyHierarchy) => void;
  className?: string;
}

interface TypographyLevel {
  name: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
  marginTop: number;
  marginBottom: number;
  letterSpacing?: number;
}

interface TypographyHierarchy {
  name: string;
  baseSize: number;
  scale: number;
  levels: TypographyLevel[];
}

const SCALE_PRESETS = [
  { name: 'Minor Second', value: 1.067, description: 'Subtle, conservative' },
  { name: 'Major Second', value: 1.125, description: 'Gentle, readable' },
  { name: 'Minor Third', value: 1.2, description: 'Balanced, versatile' },
  { name: 'Major Third', value: 1.25, description: 'Harmonious, classic' },
  { name: 'Perfect Fourth', value: 1.333, description: 'Strong, clear' },
  { name: 'Augmented Fourth', value: 1.414, description: 'Dynamic, modern' },
  { name: 'Perfect Fifth', value: 1.5, description: 'Bold, impactful' },
  { name: 'Golden Ratio', value: 1.618, description: 'Natural, elegant' },
];

const HIERARCHY_PRESETS = [
  {
    name: 'Web Article',
    levels: ['H1', 'H2', 'H3', 'H4', 'Body', 'Caption']
  },
  {
    name: 'Marketing Site',
    levels: ['Hero', 'H1', 'H2', 'H3', 'Body', 'Small']
  },
  {
    name: 'Documentation',
    levels: ['Title', 'H1', 'H2', 'H3', 'H4', 'Body', 'Code']
  },
  {
    name: 'Mobile App',
    levels: ['Large Title', 'Title', 'Headline', 'Body', 'Caption', 'Footnote']
  }
];

export const TypographyHierarchyGenerator: React.FC<TypographyHierarchyGeneratorProps> = ({
  baseStyle,
  onApplyHierarchy,
  className = ''
}) => {
  const [selectedScale, setSelectedScale] = useState(1.25);
  const [baseSize, setBaseSize] = useState(16);
  const [selectedPreset, setSelectedPreset] = useState('Web Article');
  const [customLevels, setCustomLevels] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Generate typography hierarchy based on scale and base size
  const hierarchy = useMemo(() => {
    const preset = HIERARCHY_PRESETS.find(p => p.name === selectedPreset);
    const levels = preset ? preset.levels : customLevels;
    
    const typographyLevels: TypographyLevel[] = levels.map((levelName, index) => {
      const isBody = levelName.toLowerCase().includes('body');
      const scaleStep = isBody ? 0 : levels.length - index - 1;
      const fontSize = Math.round(baseSize * Math.pow(selectedScale, scaleStep));
      
      // Calculate line height based on font size
      const lineHeight = fontSize <= 16 ? 1.5 : 
                        fontSize <= 24 ? 1.4 : 
                        fontSize <= 32 ? 1.3 : 1.2;
      
      // Calculate font weight based on hierarchy level
      const fontWeight = index === 0 ? 700 : // First level (largest)
                        index === 1 ? 600 : // Second level
                        index === 2 ? 500 : // Third level
                        400; // Body and smaller
      
      // Calculate margins based on font size
      const marginTop = Math.round(fontSize * 0.5);
      const marginBottom = Math.round(fontSize * 0.25);
      
      // Letter spacing for larger headings
      const letterSpacing = fontSize > 32 ? -0.02 : 
                           fontSize > 24 ? -0.01 : 
                           undefined;
      
      return {
        name: levelName,
        fontSize,
        lineHeight,
        fontWeight,
        marginTop,
        marginBottom,
        letterSpacing
      };
    });
    
    return {
      name: selectedPreset,
      baseSize,
      scale: selectedScale,
      levels: typographyLevels
    };
  }, [selectedScale, baseSize, selectedPreset, customLevels]);

  // Generate CSS for the hierarchy
  const generateCSS = () => {
    let css = `/* Typography Hierarchy - ${hierarchy.name} */\n`;
    css += `/* Base: ${hierarchy.baseSize}px, Scale: ${hierarchy.scale} */\n\n`;
    
    hierarchy.levels.forEach((level, index) => {
      const className = level.name.toLowerCase().replace(/\s+/g, '-');
      css += `.${className} {\n`;
      css += `  font-size: ${level.fontSize}px;\n`;
      css += `  line-height: ${level.lineHeight};\n`;
      css += `  font-weight: ${level.fontWeight};\n`;
      css += `  margin-top: ${level.marginTop}px;\n`;
      css += `  margin-bottom: ${level.marginBottom}px;\n`;
      if (level.letterSpacing) {
        css += `  letter-spacing: ${level.letterSpacing}em;\n`;
      }
      css += `}\n\n`;
    });
    
    return css;
  };

  // Generate SCSS variables
  const generateSCSS = () => {
    let scss = `// Typography Hierarchy - ${hierarchy.name}\n`;
    scss += `// Base: ${hierarchy.baseSize}px, Scale: ${hierarchy.scale}\n\n`;
    
    // Variables
    scss += `$typography-base-size: ${hierarchy.baseSize}px;\n`;
    scss += `$typography-scale: ${hierarchy.scale};\n\n`;
    
    hierarchy.levels.forEach((level) => {
      const varName = level.name.toLowerCase().replace(/\s+/g, '-');
      scss += `$${varName}-size: ${level.fontSize}px;\n`;
      scss += `$${varName}-line-height: ${level.lineHeight};\n`;
      scss += `$${varName}-weight: ${level.fontWeight};\n`;
    });
    
    scss += '\n';
    
    // Mixins
    hierarchy.levels.forEach((level) => {
      const mixinName = level.name.toLowerCase().replace(/\s+/g, '-');
      scss += `@mixin ${mixinName} {\n`;
      scss += `  font-size: ${level.fontSize}px;\n`;
      scss += `  line-height: ${level.lineHeight};\n`;
      scss += `  font-weight: ${level.fontWeight};\n`;
      scss += `  margin-top: ${level.marginTop}px;\n`;
      scss += `  margin-bottom: ${level.marginBottom}px;\n`;
      if (level.letterSpacing) {
        scss += `  letter-spacing: ${level.letterSpacing}em;\n`;
      }
      scss += `}\n\n`;
    });
    
    return scss;
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
      console.log('Copied to clipboard');
    });
  };

  // Download as file
  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Typography Hierarchy Generator
          </h3>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="Advanced settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Hierarchy Preset */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hierarchy Type
            </label>
            <select
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {HIERARCHY_PRESETS.map(preset => (
                <option key={preset.name} value={preset.name}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>

          {/* Base Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Size (px)
            </label>
            <input
              type="number"
              value={baseSize}
              onChange={(e) => setBaseSize(Number(e.target.value))}
              min="12"
              max="24"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Scale */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type Scale
            </label>
            <select
              value={selectedScale}
              onChange={(e) => setSelectedScale(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {SCALE_PRESETS.map(scale => (
                <option key={scale.value} value={scale.value}>
                  {scale.name} ({scale.value})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Hierarchy Preview */}
      <div className="p-4">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 mb-4">Hierarchy Preview</h4>
          
          {hierarchy.levels.map((level, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div 
                  className="text-gray-900"
                  style={{
                    fontSize: `${level.fontSize}px`,
                    lineHeight: level.lineHeight,
                    fontWeight: level.fontWeight,
                    letterSpacing: level.letterSpacing ? `${level.letterSpacing}em` : undefined,
                    fontFamily: baseStyle.fontFamily
                  }}
                >
                  {level.name} - Sample Text
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {level.fontSize}px • {level.fontWeight} • {level.lineHeight} line-height
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Export Options */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => copyToClipboard(generateCSS())}
              className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy CSS
            </button>
            <button
              onClick={() => copyToClipboard(generateSCSS())}
              className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy SCSS
            </button>
            <button
              onClick={() => downloadFile(generateCSS(), `typography-hierarchy-${hierarchy.name.toLowerCase().replace(/\s+/g, '-')}.css`)}
              className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download CSS
            </button>
            <button
              onClick={() => downloadFile(generateSCSS(), `typography-hierarchy-${hierarchy.name.toLowerCase().replace(/\s+/g, '-')}.scss`)}
              className="flex items-center gap-2 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download SCSS
            </button>
            <button
              onClick={() => onApplyHierarchy(hierarchy)}
              className="flex items-center gap-2 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Apply to Generator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographyHierarchyGenerator;