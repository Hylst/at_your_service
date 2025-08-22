import { TypographyStyle } from '../types/typographyTypes';

/**
 * Typography preset interface
 */
export interface TypographyPreset {
  id: string;
  name: string;
  category: 'heading' | 'body' | 'display' | 'special';
  description: string;
  style: TypographyStyle;
  tags: string[];
}

/**
 * Predefined typography presets for common use cases
 */
export const typographyPresets: TypographyPreset[] = [
  // Heading Presets
  {
    id: 'modern-heading-1',
    name: 'Modern H1',
    category: 'heading',
    description: 'Large, bold heading for main titles',
    style: {
      fontFamily: "Inter, sans-serif",
      fontSize: 48,
      fontWeight: "700",
      lineHeight: 1.2,
      letterSpacing: -0.5,
      wordSpacing: 0,
      color: "#1F2937",
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
    },
    tags: ['modern', 'bold', 'title']
  },
  {
    id: 'elegant-heading-2',
    name: 'Elegant H2',
    category: 'heading',
    description: 'Sophisticated serif heading for sections',
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 36,
      fontWeight: "600",
      lineHeight: 1.3,
      letterSpacing: 0,
      wordSpacing: 0,
      color: "#374151",
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
    },
    tags: ['elegant', 'serif', 'section']
  },
  {
    id: 'minimal-heading-3',
    name: 'Minimal H3',
    category: 'heading',
    description: 'Clean, minimal heading for subsections',
    style: {
      fontFamily: "Inter, sans-serif",
      fontSize: 28,
      fontWeight: "500",
      lineHeight: 1.4,
      letterSpacing: 0,
      wordSpacing: 0,
      color: "#4B5563",
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
    },
    tags: ['minimal', 'clean', 'subsection']
  },

  // Body Text Presets
  {
    id: 'readable-body',
    name: 'Readable Body',
    category: 'body',
    description: 'Optimized for long-form reading',
    style: {
      fontFamily: "'Source Sans Pro', sans-serif",
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 1.6,
      letterSpacing: 0,
      wordSpacing: 0,
      color: "#374151",
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
    },
    tags: ['readable', 'body', 'article']
  },
  {
    id: 'compact-body',
    name: 'Compact Body',
    category: 'body',
    description: 'Space-efficient text for dense content',
    style: {
      fontFamily: "Roboto, sans-serif",
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 1.4,
      letterSpacing: 0,
      wordSpacing: 0,
      color: "#4B5563",
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
    },
    tags: ['compact', 'dense', 'small']
  },
  {
    id: 'large-body',
    name: 'Large Body',
    category: 'body',
    description: 'Larger text for better accessibility',
    style: {
      fontFamily: "'Open Sans', sans-serif",
      fontSize: 18,
      fontWeight: "400",
      lineHeight: 1.7,
      letterSpacing: 0,
      wordSpacing: 0,
      color: "#374151",
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
    },
    tags: ['large', 'accessible', 'readable']
  },

  // Display Presets
  {
    id: 'hero-display',
    name: 'Hero Display',
    category: 'display',
    description: 'Large, impactful text for hero sections',
    style: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: 64,
      fontWeight: "800",
      lineHeight: 1.1,
      letterSpacing: -1,
      wordSpacing: 0,
      color: "#111827",
      textAlign: 'center',
      textTransform: 'none',
      textDecoration: 'none',
      textShadow: 'none',
      fontStyle: 'normal',
      textStroke: 'none',
      backgroundClip: false,
      gradient: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
      opacity: 1,
      writingMode: 'horizontal-tb'
    },
    tags: ['hero', 'large', 'impact']
  },
  {
    id: 'gradient-display',
    name: 'Gradient Display',
    category: 'display',
    description: 'Eye-catching gradient text for highlights',
    style: {
      fontFamily: "Poppins, sans-serif",
      fontSize: 42,
      fontWeight: "700",
      lineHeight: 1.2,
      letterSpacing: -0.5,
      wordSpacing: 0,
      color: "#000000",
      textAlign: 'center',
      textTransform: 'none',
      textDecoration: 'none',
      textShadow: 'none',
      fontStyle: 'normal',
      textStroke: 'none',
      backgroundClip: true,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      opacity: 1,
      writingMode: 'horizontal-tb'
    },
    tags: ['gradient', 'colorful', 'modern']
  },

  // Special Presets
  {
    id: 'quote-text',
    name: 'Quote Text',
    category: 'special',
    description: 'Stylized text for quotes and testimonials',
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 24,
      fontWeight: "400",
      lineHeight: 1.5,
      letterSpacing: 0,
      wordSpacing: 0,
      color: "#6B7280",
      textAlign: 'center',
      textTransform: 'none',
      textDecoration: 'none',
      textShadow: 'none',
      fontStyle: 'italic',
      textStroke: 'none',
      backgroundClip: false,
      gradient: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
      opacity: 1,
      writingMode: 'horizontal-tb'
    },
    tags: ['quote', 'italic', 'testimonial']
  },
  {
    id: 'code-text',
    name: 'Code Text',
    category: 'special',
    description: 'Monospace text for code snippets',
    style: {
      fontFamily: "'Fira Code', monospace",
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 1.5,
      letterSpacing: 0,
      wordSpacing: 0,
      color: "#374151",
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
    },
    tags: ['code', 'monospace', 'technical']
  },
  {
    id: 'caption-text',
    name: 'Caption Text',
    category: 'special',
    description: 'Small text for captions and metadata',
    style: {
      fontFamily: "Inter, sans-serif",
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 1.4,
      letterSpacing: 0.5,
      wordSpacing: 0,
      color: "#9CA3AF",
      textAlign: 'left',
      textTransform: 'uppercase',
      textDecoration: 'none',
      textShadow: 'none',
      fontStyle: 'normal',
      textStroke: 'none',
      backgroundClip: false,
      gradient: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
      opacity: 1,
      writingMode: 'horizontal-tb'
    },
    tags: ['caption', 'small', 'metadata']
  },
  {
    id: 'button-text',
    name: 'Button Text',
    category: 'special',
    description: 'Bold, readable text for buttons and CTAs',
    style: {
      fontFamily: "Inter, sans-serif",
      fontSize: 16,
      fontWeight: "600",
      lineHeight: 1.2,
      letterSpacing: 0.5,
      wordSpacing: 0,
      color: "#FFFFFF",
      textAlign: 'center',
      textTransform: 'none',
      textDecoration: 'none',
      textShadow: 'none',
      fontStyle: 'normal',
      textStroke: 'none',
      backgroundClip: false,
      gradient: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
      opacity: 1,
      writingMode: 'horizontal-tb'
    },
    tags: ['button', 'cta', 'bold']
  },
  {
    id: 'artistic-display',
    name: 'Artistic Display',
    category: 'display',
    description: 'Creative text with shadow effects',
    style: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: 36,
      fontWeight: "700",
      lineHeight: 1.3,
      letterSpacing: 1,
      wordSpacing: 0,
      color: "#1F2937",
      textAlign: 'center',
      textTransform: 'none',
      textDecoration: 'none',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      fontStyle: 'normal',
      textStroke: 'none',
      backgroundClip: false,
      gradient: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
      opacity: 1,
      writingMode: 'horizontal-tb'
    },
    tags: ['artistic', 'shadow', 'creative']
  },
  {
    id: 'outline-text',
    name: 'Outline Text',
    category: 'special',
    description: 'Text with stroke outline effect',
    style: {
      fontFamily: "Poppins, sans-serif",
      fontSize: 32,
      fontWeight: "700",
      lineHeight: 1.2,
      letterSpacing: 0,
      wordSpacing: 0,
      color: "transparent",
      textAlign: 'center',
      textTransform: 'none',
      textDecoration: 'none',
      textShadow: 'none',
      fontStyle: 'normal',
      textStroke: '2px #3B82F6',
      backgroundClip: false,
      gradient: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
      opacity: 1,
      writingMode: 'horizontal-tb'
    },
    tags: ['outline', 'stroke', 'modern']
  }
];

/**
 * Get presets by category
 */
export const getPresetsByCategory = (category: TypographyPreset['category']): TypographyPreset[] => {
  return typographyPresets.filter(preset => preset.category === category);
};

/**
 * Get preset by ID
 */
export const getPresetById = (id: string): TypographyPreset | undefined => {
  return typographyPresets.find(preset => preset.id === id);
};

/**
 * Search presets by tags or name
 */
export const searchPresets = (query: string): TypographyPreset[] => {
  const lowercaseQuery = query.toLowerCase();
  return typographyPresets.filter(preset => 
    preset.name.toLowerCase().includes(lowercaseQuery) ||
    preset.description.toLowerCase().includes(lowercaseQuery) ||
    preset.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

/**
 * Preset categories with metadata
 */
export const presetCategories = [
  {
    key: 'heading' as const,
    name: 'Headings',
    description: 'Titles and section headers',
    icon: '📝'
  },
  {
    key: 'body' as const,
    name: 'Body Text',
    description: 'Paragraph and content text',
    icon: '📄'
  },
  {
    key: 'display' as const,
    name: 'Display',
    description: 'Large, impactful text',
    icon: '🎨'
  },
  {
    key: 'special' as const,
    name: 'Special',
    description: 'Unique and stylized text',
    icon: '✨'
  }
];