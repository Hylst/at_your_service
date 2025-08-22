import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Type, Palette, Sparkles, Eye, Globe, BarChart3, FileText } from 'lucide-react';
import { TypographyStyle } from '../types/typographyTypes';
import { TypographyPresets } from './TypographyPresets';
import { TypographyPreview } from './TypographyPreview';
import { GoogleFontsSelector } from './GoogleFontsSelector';
import { TypographyHierarchyGenerator } from './TypographyHierarchyGenerator';
import { FigmaTokensExporter } from './FigmaTokensExporter';

interface TypographyTabsProps {
  style: TypographyStyle;
  onStyleChange: (updates: Partial<TypographyStyle>) => void;
  onApplyPreset: (style: TypographyStyle) => void;
  onHierarchyChange?: (levels: Array<{
    level: string;
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    letterSpacing: string;
    marginBottom: string;
  }>) => void;
  children: {
    basicControls: React.ReactNode;
    advancedControls: React.ReactNode;
    effectsControls: React.ReactNode;
    preview: React.ReactNode;
  };
}

interface TypographyHierarchy {
  name: string;
  baseSize: number;
  scale: number;
  levels: any[];
}

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

/**
 * Collapsible section component for organizing controls
 */
const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  children,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium text-foreground">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-border">
          <div className="pt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Typography interface organized in tabs and collapsible sections
 */
export const TypographyTabs: React.FC<TypographyTabsProps> = ({
  style,
  onStyleChange,
  onApplyPreset,
  onHierarchyChange,
  children
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'fonts' | 'basic' | 'advanced' | 'effects'>('presets');
  const [hierarchyLevels, setHierarchyLevels] = useState<any[]>([]);

  // Handle hierarchy application
  const handleApplyHierarchy = (hierarchy: TypographyHierarchy) => {
    setHierarchyLevels(hierarchy.levels);
    
    // Convert hierarchy levels to the expected format
    const formattedLevels = hierarchy.levels.map(level => ({
      level: level.name || level.level,
      fontSize: `${level.fontSize}px`,
      lineHeight: level.lineHeight.toString(),
      fontWeight: level.fontWeight.toString(),
      letterSpacing: `${level.letterSpacing || 0}px`,
      marginBottom: `${level.marginBottom || 16}px`
    }));
    
    // Notify parent component about hierarchy changes
    onHierarchyChange?.(formattedLevels);
    
    // Apply the first level (usually the largest heading) to the current style
    if (hierarchy.levels.length > 0) {
      const firstLevel = hierarchy.levels[0];
      onStyleChange({
        fontSize: firstLevel.fontSize,
        fontWeight: firstLevel.fontWeight.toString(),
        lineHeight: firstLevel.lineHeight
      });
    }
  };

  const tabs = [
    {
      id: 'presets' as const,
      name: 'Presets',
      icon: <Palette className="w-4 h-4" />,
      description: 'Ready-to-use typography styles'
    },
    {
      id: 'fonts' as const,
      name: 'Google Fonts',
      icon: <Globe className="w-4 h-4" />,
      description: '1000+ fonts from Google Fonts'
    },
    {
      id: 'basic' as const,
      name: 'Basic',
      icon: <Type className="w-4 h-4" />,
      description: 'Font, size, and basic styling'
    },
    {
      id: 'advanced' as const,
      name: 'Advanced',
      icon: <Sparkles className="w-4 h-4" />,
      description: 'Spacing, alignment, and transforms'
    },
    {
      id: 'effects' as const,
      name: 'Effects',
      icon: <Eye className="w-4 h-4" />,
      description: 'Shadows, gradients, and special effects'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8" aria-label="Typography tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              <div className="text-left">
                <div>{tab.name}</div>
                <div className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">
                  {tab.description}
                </div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'presets' && (
          <div className="space-y-4">
            <TypographyPresets
              onApplyPreset={onApplyPreset}
              currentStyle={style}
            />
          </div>
        )}

        {activeTab === 'fonts' && (
          <div className="space-y-4">
            <CollapsibleSection
              title="Google Fonts Library"
              icon={<Globe className="w-4 h-4 text-primary" />}
              defaultOpen={true}
            >
              <GoogleFontsSelector
                selectedFont={style.fontFamily}
                onFontSelect={(fontFamily) => onStyleChange({ fontFamily })}
              />
            </CollapsibleSection>
          </div>
        )}

        {activeTab === 'basic' && (
          <div className="space-y-4">
            <CollapsibleSection
              title="Font Properties"
              icon={<Type className="w-4 h-4 text-primary" />}
              defaultOpen={true}
            >
              {children.basicControls}
            </CollapsibleSection>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <CollapsibleSection
              title="Advanced Typography"
              icon={<Sparkles className="w-4 h-4 text-primary" />}
              defaultOpen={true}
            >
              {children.advancedControls}
            </CollapsibleSection>
            
            <CollapsibleSection
              title="Typography Hierarchy Generator"
              icon={<BarChart3 className="w-4 h-4 text-primary" />}
              defaultOpen={false}
            >
              <TypographyHierarchyGenerator
                baseStyle={style}
                onApplyHierarchy={handleApplyHierarchy}
              />
            </CollapsibleSection>
            
            <CollapsibleSection
              title="Figma Design Tokens Export"
              icon={<FileText className="w-4 h-4 text-primary" />}
              defaultOpen={false}
            >
              <FigmaTokensExporter
                style={style}
                hierarchyLevels={hierarchyLevels}
              />
            </CollapsibleSection>
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="space-y-4">
            <CollapsibleSection
              title="Visual Effects"
              icon={<Eye className="w-4 h-4 text-primary" />}
              defaultOpen={true}
            >
              {children.effectsControls}
            </CollapsibleSection>
          </div>
        )}
      </div>

      {/* Preview Section - Always Visible */}
      <div className="border-t border-border pt-6">
        <CollapsibleSection
          title="Live Preview"
          icon={<Eye className="w-4 h-4 text-primary" />}
          defaultOpen={true}
        >
          <TypographyPreview 
            style={style}
            sampleText="The quick brown fox jumps over the lazy dog. Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed."
          />
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default TypographyTabs;