import React, { useState } from 'react';
import { TypographyPreset, typographyPresets, presetCategories, searchPresets } from '../data/typographyPresets';
import { TypographyStyle } from '../types/typographyTypes';
import { Search, Filter, Eye } from 'lucide-react';

interface TypographyPresetsProps {
  onApplyPreset: (style: TypographyStyle) => void;
  currentStyle: TypographyStyle;
}

/**
 * Typography presets component with categorized display and search functionality
 */
export const TypographyPresets: React.FC<TypographyPresetsProps> = ({
  onApplyPreset,
  currentStyle
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewPreset, setPreviewPreset] = useState<string | null>(null);

  /**
   * Filter presets based on category and search query
   */
  const filteredPresets = React.useMemo(() => {
    let presets = typographyPresets;
    
    // Filter by search query
    if (searchQuery.trim()) {
      presets = searchPresets(searchQuery);
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      presets = presets.filter(preset => preset.category === selectedCategory);
    }
    
    return presets;
  }, [selectedCategory, searchQuery]);

  /**
   * Apply preset style
   */
  const handleApplyPreset = (preset: TypographyPreset) => {
    onApplyPreset(preset.style);
  };

  /**
   * Generate CSS style object from typography style
   */
  const getPreviewStyle = (style: TypographyStyle) => {
    const cssStyle: React.CSSProperties = {
      fontFamily: style.fontFamily,
      fontSize: `${Math.min(style.fontSize, 18)}px`, // Limit preview size
      fontWeight: style.fontWeight,
      lineHeight: style.lineHeight,
      letterSpacing: `${style.letterSpacing}px`,
      color: style.backgroundClip ? 'transparent' : style.color,
      textAlign: style.textAlign as any,
      textTransform: style.textTransform as any,
      textDecoration: style.textDecoration,
      fontStyle: style.fontStyle,
      opacity: style.opacity,
    };

    // Add gradient background for clipped text
    if (style.backgroundClip && style.gradient) {
      cssStyle.background = style.gradient;
      cssStyle.WebkitBackgroundClip = 'text';
      cssStyle.backgroundClip = 'text';
    }

    // Add text shadow
    if (style.textShadow && style.textShadow !== 'none') {
      cssStyle.textShadow = style.textShadow;
    }

    // Add text stroke
    if (style.textStroke && style.textStroke !== 'none') {
      cssStyle.WebkitTextStroke = style.textStroke;
    }

    return cssStyle;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Typography Presets</h3>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {filteredPresets.length} presets
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search presets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          All
        </button>
        {presetCategories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
              selectedCategory === category.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <span>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Presets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {filteredPresets.map((preset) => (
          <div
            key={preset.id}
            className="group relative border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-200 bg-card"
          >
            {/* Preset Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {preset.name}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {preset.description}
                </p>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => setPreviewPreset(previewPreset === preset.id ? null : preset.id)}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors"
                  title="Preview"
                >
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Preview Text */}
            <div className="mb-3 p-3 bg-muted/30 rounded-md">
              <div
                style={getPreviewStyle(preset.style)}
                className="truncate"
              >
                {preset.category === 'heading' ? 'Sample Heading' :
                 preset.category === 'body' ? 'Sample body text for reading' :
                 preset.category === 'display' ? 'Display Text' :
                 'Special Text'}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {preset.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-secondary/50 text-secondary-foreground text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Apply Button */}
            <button
              onClick={() => handleApplyPreset(preset)}
              className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              Apply Preset
            </button>

            {/* Expanded Preview */}
            {previewPreset === preset.id && (
              <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-popover border border-border rounded-lg shadow-lg z-10">
                <div className="space-y-2">
                  <h5 className="font-medium text-foreground">Full Preview</h5>
                  <div
                    style={{
                      ...getPreviewStyle(preset.style),
                      fontSize: `${Math.min(preset.style.fontSize, 24)}px`
                    }}
                  >
                    The quick brown fox jumps over the lazy dog. This is a sample text to demonstrate the typography style with all its properties applied.
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Font: {preset.style.fontFamily}</div>
                    <div>Size: {preset.style.fontSize}px</div>
                    <div>Weight: {preset.style.fontWeight}</div>
                    <div>Line Height: {preset.style.lineHeight}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPresets.length === 0 && (
        <div className="text-center py-8">
          <div className="text-muted-foreground mb-2">No presets found</div>
          <div className="text-sm text-muted-foreground">
            Try adjusting your search or category filter
          </div>
        </div>
      )}
    </div>
  );
};

export default TypographyPresets;