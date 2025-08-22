/**
 * TypographyExportButton Component
 * Specialized export button for typography styles with enhanced formats
 */

import React from 'react';
import { UnifiedExportButton, CodeExportButton } from '@/components/ui/design-system';
import type { TypographyStyle } from '../types/typographyTypes';

export interface TypographyExportButtonProps {
  style: TypographyStyle;
  hierarchyLevels?: Array<{
    level: string;
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    letterSpacing: string;
    marginBottom: string;
  }>;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

/**
 * Generate CSS from typography style
 */
const generateCSS = (style: TypographyStyle, hierarchyLevels?: any[]): string => {
  let css = `/* Typography Styles */\n\n`;
  
  // Base typography style
  css += `.typography-base {\n`;
  css += `  font-family: ${style.fontFamily};\n`;
  css += `  font-size: ${style.fontSize};\n`;
  css += `  font-weight: ${style.fontWeight};\n`;
  css += `  line-height: ${style.lineHeight};\n`;
  css += `  letter-spacing: ${style.letterSpacing};\n`;
  css += `  text-align: ${style.textAlign};\n`;
  css += `  text-transform: ${style.textTransform};\n`;
  css += `  text-decoration: ${style.textDecoration};\n`;
  css += `  color: ${style.color};\n`;
  
  if (style.textShadow && style.textShadow !== 'none') {
    css += `  text-shadow: ${style.textShadow};\n`;
  }
  
  css += `}\n\n`;
  
  // Hierarchy levels if provided
  if (hierarchyLevels && hierarchyLevels.length > 0) {
    css += `/* Typography Hierarchy */\n\n`;
    
    hierarchyLevels.forEach((level) => {
      const className = level.level.toLowerCase().replace(/\s+/g, '-');
      css += `.${className} {\n`;
      css += `  font-family: ${style.fontFamily};\n`;
      css += `  font-size: ${level.fontSize};\n`;
      css += `  font-weight: ${level.fontWeight};\n`;
      css += `  line-height: ${level.lineHeight};\n`;
      css += `  letter-spacing: ${level.letterSpacing};\n`;
      css += `  margin-bottom: ${level.marginBottom};\n`;
      css += `  color: ${style.color};\n`;
      css += `}\n\n`;
    });
  }
  
  return css;
};

/**
 * Generate SCSS from typography style
 */
const generateSCSS = (style: TypographyStyle, hierarchyLevels?: any[]): string => {
  let scss = `// Typography Styles\n\n`;
  
  // SCSS variables
  scss += `$typography-font-family: ${style.fontFamily};\n`;
  scss += `$typography-color: ${style.color};\n`;
  scss += `$typography-base-size: ${style.fontSize};\n`;
  scss += `$typography-base-weight: ${style.fontWeight};\n`;
  scss += `$typography-base-line-height: ${style.lineHeight};\n`;
  scss += `$typography-base-letter-spacing: ${style.letterSpacing};\n\n`;
  
  // Base mixin
  scss += `@mixin typography-base {\n`;
  scss += `  font-family: $typography-font-family;\n`;
  scss += `  font-size: $typography-base-size;\n`;
  scss += `  font-weight: $typography-base-weight;\n`;
  scss += `  line-height: $typography-base-line-height;\n`;
  scss += `  letter-spacing: $typography-base-letter-spacing;\n`;
  scss += `  text-align: ${style.textAlign};\n`;
  scss += `  text-transform: ${style.textTransform};\n`;
  scss += `  text-decoration: ${style.textDecoration};\n`;
  scss += `  color: $typography-color;\n`;
  
  if (style.textShadow && style.textShadow !== 'none') {
    scss += `  text-shadow: ${style.textShadow};\n`;
  }
  
  scss += `}\n\n`;
  
  // Base class
  scss += `.typography-base {\n`;
  scss += `  @include typography-base;\n`;
  scss += `}\n\n`;
  
  // Hierarchy levels if provided
  if (hierarchyLevels && hierarchyLevels.length > 0) {
    scss += `// Typography Hierarchy\n\n`;
    
    // Hierarchy variables
    hierarchyLevels.forEach((level, index) => {
      const varName = level.level.toLowerCase().replace(/\s+/g, '-');
      scss += `$${varName}-size: ${level.fontSize};\n`;
      scss += `$${varName}-weight: ${level.fontWeight};\n`;
      scss += `$${varName}-line-height: ${level.lineHeight};\n`;
      scss += `$${varName}-letter-spacing: ${level.letterSpacing};\n`;
      scss += `$${varName}-margin-bottom: ${level.marginBottom};\n`;
    });
    
    scss += `\n`;
    
    // Hierarchy mixins and classes
    hierarchyLevels.forEach((level) => {
      const varName = level.level.toLowerCase().replace(/\s+/g, '-');
      const className = varName;
      
      scss += `@mixin ${varName} {\n`;
      scss += `  font-family: $typography-font-family;\n`;
      scss += `  font-size: $${varName}-size;\n`;
      scss += `  font-weight: $${varName}-weight;\n`;
      scss += `  line-height: $${varName}-line-height;\n`;
      scss += `  letter-spacing: $${varName}-letter-spacing;\n`;
      scss += `  margin-bottom: $${varName}-margin-bottom;\n`;
      scss += `  color: $typography-color;\n`;
      scss += `}\n\n`;
      
      scss += `.${className} {\n`;
      scss += `  @include ${varName};\n`;
      scss += `}\n\n`;
    });
  }
  
  return scss;
};

/**
 * Generate JSON data from typography style
 */
const generateJSON = (style: TypographyStyle, hierarchyLevels?: any[]): string => {
  const data = {
    typography: {
      base: {
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        textAlign: style.textAlign,
        textTransform: style.textTransform,
        textDecoration: style.textDecoration,
        color: style.color,
        ...(style.textShadow && style.textShadow !== 'none' && { textShadow: style.textShadow })
      },
      ...(hierarchyLevels && hierarchyLevels.length > 0 && {
        hierarchy: hierarchyLevels.reduce((acc, level) => {
          const key = level.level.toLowerCase().replace(/\s+/g, '-');
          acc[key] = {
            fontSize: level.fontSize,
            fontWeight: level.fontWeight,
            lineHeight: level.lineHeight,
            letterSpacing: level.letterSpacing,
            marginBottom: level.marginBottom
          };
          return acc;
        }, {} as Record<string, any>)
      })
    },
    metadata: {
      exportDate: new Date().toISOString(),
      version: '1.0.0',
      generator: 'Advanced Typography Generator'
    }
  };
  
  return JSON.stringify(data, null, 2);
};

/**
 * TypographyExportButton - Specialized export button for typography styles
 * 
 * Features:
 * - Enhanced CSS/SCSS export with variables and mixins
 * - Typography hierarchy support
 * - JSON export with metadata
 * - Figma tokens integration
 * - Custom filename generation
 */
export const TypographyExportButton: React.FC<TypographyExportButtonProps> = ({
  style,
  hierarchyLevels,
  className,
  disabled,
  loading
}) => {
  /**
   * Handle export based on format
   */
  const handleExport = async (format: string, data?: any) => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const baseFilename = `typography-${timestamp}`;
    
    let content: string;
    let filename: string;
    let mimeType: string;
    
    switch (format) {
      case 'css':
        content = generateCSS(style, hierarchyLevels);
        filename = `${baseFilename}.css`;
        mimeType = 'text/css';
        break;
        
      case 'scss':
        content = generateSCSS(style, hierarchyLevels);
        filename = `${baseFilename}.scss`;
        mimeType = 'text/scss';
        break;
        
      case 'json':
        content = generateJSON(style, hierarchyLevels);
        filename = `${baseFilename}.json`;
        mimeType = 'application/json';
        break;
        
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
    
    // Create and download file
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <CodeExportButton
      className={className}
      disabled={disabled}
      loading={loading}
      onExport={handleExport}
      data={style}
      filename="typography"
      showDescriptions
      includePreprocessor
    />
  );
};

export default TypographyExportButton;