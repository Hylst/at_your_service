/**
 * Figma Design Tokens Exporter Component
 * Exports typography styles as Figma-compatible JSON tokens
 */

import React, { useState } from 'react';
import { Download, Copy, FileText, Settings, Check } from 'lucide-react';
import { TypographyStyle } from '../types/typographyTypes';

interface FigmaTokensExporterProps {
  style: TypographyStyle;
  hierarchyLevels?: any[];
  className?: string;
}

interface FigmaTextStyle {
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: {
    value: number;
    unit: 'PIXELS' | 'PERCENT';
  };
  letterSpacing: {
    value: number;
    unit: 'PIXELS' | 'PERCENT';
  };
  paragraphSpacing?: number;
  textCase?: 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';
  textDecoration?: 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';
}

interface FigmaColorStyle {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface FigmaToken {
  name: string;
  type: 'typography' | 'color' | 'spacing' | 'sizing';
  value: any;
  description?: string;
}

interface FigmaTokenSet {
  name: string;
  tokens: Record<string, FigmaToken>;
}

export const FigmaTokensExporter: React.FC<FigmaTokensExporterProps> = ({
  style,
  hierarchyLevels = [],
  className = ''
}) => {
  const [exportFormat, setExportFormat] = useState<'figma-tokens' | 'design-tokens' | 'style-dictionary'>('figma-tokens');
  const [includeColors, setIncludeColors] = useState(true);
  const [includeSpacing, setIncludeSpacing] = useState(true);
  const [tokenSetName, setTokenSetName] = useState('Typography System');
  const [copied, setCopied] = useState(false);

  // Convert hex color to RGB values
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 0, g: 0, b: 0 };
  };

  // Convert typography style to Figma text style
  const convertToFigmaTextStyle = (typographyStyle: TypographyStyle, name: string): FigmaTextStyle => {
    return {
      fontFamily: typographyStyle.fontFamily,
      fontWeight: parseInt(typographyStyle.fontWeight) || 400,
      fontSize: typographyStyle.fontSize || 16,
      lineHeight: {
        value: typographyStyle.lineHeight || 1.5,
        unit: 'PERCENT'
      },
      letterSpacing: {
        value: typographyStyle.letterSpacing || 0,
        unit: 'PIXELS'
      },
      textCase: typographyStyle.textTransform === 'uppercase' ? 'UPPER' :
               typographyStyle.textTransform === 'lowercase' ? 'LOWER' :
               typographyStyle.textTransform === 'capitalize' ? 'TITLE' : 'ORIGINAL',
      textDecoration: typographyStyle.textDecoration === 'underline' ? 'UNDERLINE' :
                     typographyStyle.textDecoration === 'line-through' ? 'STRIKETHROUGH' : 'NONE'
    };
  };

  // Generate Figma Tokens format
  const generateFigmaTokens = (): FigmaTokenSet => {
    const tokens: Record<string, FigmaToken> = {};

    // Typography tokens
    if (hierarchyLevels.length > 0) {
      hierarchyLevels.forEach((level, index) => {
        const tokenName = level.name.toLowerCase().replace(/\s+/g, '-');
        tokens[`typography.${tokenName}`] = {
          name: `Typography/${level.name}`,
          type: 'typography',
          value: {
            fontFamily: style.fontFamily,
            fontWeight: level.fontWeight || 400,
            fontSize: `${level.fontSize}px`,
            lineHeight: level.lineHeight || 1.5,
            letterSpacing: level.letterSpacing ? `${level.letterSpacing}em` : '0em'
          },
          description: `${level.name} typography style`
        };
      });
    } else {
      // Single typography token
      tokens['typography.base'] = {
        name: 'Typography/Base',
        type: 'typography',
        value: {
          fontFamily: style.fontFamily,
          fontWeight: parseInt(style.fontWeight) || 400,
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing || '0em'
        },
        description: 'Base typography style'
      };
    }

    // Color tokens
    if (includeColors && style.color) {
      const rgb = hexToRgb(style.color);
      tokens['color.text.primary'] = {
        name: 'Color/Text/Primary',
        type: 'color',
        value: {
          r: rgb.r,
          g: rgb.g,
          b: rgb.b,
          a: 1
        },
        description: 'Primary text color'
      };
    }

    // Note: Background color not available in TypographyStyle interface

    // Spacing tokens
    if (includeSpacing) {
      const baseSpacing = 8;
      [0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32].forEach(multiplier => {
        const value = baseSpacing * multiplier;
        tokens[`spacing.${multiplier.toString().replace('.', '-')}`] = {
          name: `Spacing/${multiplier}`,
          type: 'spacing',
          value: `${value}px`,
          description: `Spacing value: ${value}px`
        };
      });
    }

    return {
      name: tokenSetName,
      tokens
    };
  };

  // Generate Design Tokens Community Group format
  const generateDesignTokens = () => {
    const tokens: any = {};

    // Typography tokens
    tokens.typography = {};
    if (hierarchyLevels.length > 0) {
      hierarchyLevels.forEach(level => {
        const tokenName = level.name.toLowerCase().replace(/\s+/g, '-');
        tokens.typography[tokenName] = {
          $type: 'typography',
          $value: {
            fontFamily: [style.fontFamily],
            fontWeight: level.fontWeight || 400,
            fontSize: `${level.fontSize}px`,
            lineHeight: level.lineHeight || 1.5,
            letterSpacing: level.letterSpacing ? `${level.letterSpacing}em` : '0'
          },
          $description: `${level.name} typography style`
        };
      });
    } else {
      tokens.typography.base = {
        $type: 'typography',
        $value: {
          fontFamily: [style.fontFamily],
          fontWeight: parseInt(style.fontWeight) || 400,
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing || '0'
        },
        $description: 'Base typography style'
      };
    }

    // Color tokens
    if (includeColors) {
      tokens.color = {
        text: {
          primary: {
            $type: 'color',
            $value: style.color || '#000000',
            $description: 'Primary text color'
          }
        }
      };

      // Note: Background color not available in TypographyStyle interface
    }

    return tokens;
  };

  // Generate Style Dictionary format
  const generateStyleDictionary = () => {
    const tokens: any = {
      typography: {},
      color: {},
      spacing: {}
    };

    // Typography tokens
    if (hierarchyLevels.length > 0) {
      hierarchyLevels.forEach(level => {
        const tokenName = level.name.toLowerCase().replace(/\s+/g, '-');
        tokens.typography[tokenName] = {
          fontFamily: { value: style.fontFamily },
          fontWeight: { value: level.fontWeight || 400 },
          fontSize: { value: `${level.fontSize}px` },
          lineHeight: { value: level.lineHeight || 1.5 },
          letterSpacing: { value: level.letterSpacing ? `${level.letterSpacing}em` : '0' }
        };
      });
    } else {
      tokens.typography.base = {
        fontFamily: { value: style.fontFamily },
        fontWeight: { value: parseInt(style.fontWeight) || 400 },
        fontSize: { value: style.fontSize },
        lineHeight: { value: style.lineHeight },
        letterSpacing: { value: style.letterSpacing || '0' }
      };
    }

    // Color tokens
    if (includeColors) {
      tokens.color.text = {
        primary: { value: style.color || '#000000' }
      };

      // Note: Background color not available in TypographyStyle interface
    }

    return tokens;
  };

  // Get tokens based on selected format
  const getTokens = () => {
    switch (exportFormat) {
      case 'figma-tokens':
        return generateFigmaTokens();
      case 'design-tokens':
        return generateDesignTokens();
      case 'style-dictionary':
        return generateStyleDictionary();
      default:
        return generateFigmaTokens();
    }
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    const tokens = getTokens();
    const jsonString = JSON.stringify(tokens, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Download as file
  const downloadTokens = () => {
    const tokens = getTokens();
    const jsonString = JSON.stringify(tokens, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tokenSetName.toLowerCase().replace(/\s+/g, '-')}-tokens.json`;
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
            <FileText className="w-5 h-5" />
            Figma Design Tokens Export
          </h3>
        </div>

        {/* Configuration */}
        <div className="space-y-4">
          {/* Token Set Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Token Set Name
            </label>
            <input
              type="text"
              value={tokenSetName}
              onChange={(e) => setTokenSetName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Typography System"
            />
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="figma-tokens">Figma Tokens Plugin</option>
              <option value="design-tokens">Design Tokens Community Group</option>
              <option value="style-dictionary">Style Dictionary</option>
            </select>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeColors}
                onChange={(e) => setIncludeColors(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Include color tokens</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeSpacing}
                onChange={(e) => setIncludeSpacing(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Include spacing tokens</span>
            </label>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="p-4 border-b border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Token Preview</h4>
        <div className="bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto">
          <pre className="text-xs text-gray-700 whitespace-pre-wrap">
            {JSON.stringify(getTokens(), null, 2)}
          </pre>
        </div>
      </div>

      {/* Export Actions */}
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={copyToClipboard}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy JSON'}
          </button>
          <button
            onClick={downloadTokens}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download JSON
          </button>
        </div>
        
        <div className="mt-3 text-xs text-gray-500">
          <p>Export format: <strong>{exportFormat}</strong></p>
          <p>Tokens included: Typography{includeColors ? ', Colors' : ''}{includeSpacing ? ', Spacing' : ''}</p>
        </div>
      </div>
    </div>
  );
};

export default FigmaTokensExporter;