/**
 * Typography style interface defining all available typography properties
 */
export interface TypographyStyle {
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
 * Font weight options with labels and values
 */
export const fontWeights = [
  { label: "Thin", value: "100" },
  { label: "Extra Light", value: "200" },
  { label: "Light", value: "300" },
  { label: "Regular", value: "400" },
  { label: "Medium", value: "500" },
  { label: "Semi Bold", value: "600" },
  { label: "Bold", value: "700" },
  { label: "Extra Bold", value: "800" },
  { label: "Black", value: "900" }
];

/**
 * Font family options with labels and values
 */
export const fontFamilies = [
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

/**
 * Text shadow presets
 */
export const textShadowPresets = [
  { name: 'None', value: 'none' },
  { name: 'Subtle', value: '1px 1px 2px rgba(0,0,0,0.3)' },
  { name: 'Strong', value: '2px 2px 4px rgba(0,0,0,0.5)' },
  { name: 'Glow', value: '0 0 10px rgba(255,255,255,0.8)' },
  { name: 'Deep', value: '3px 3px 6px rgba(0,0,0,0.7)' },
  { name: 'Colored Glow', value: '0 0 15px rgba(59, 130, 246, 0.6)' }
];

/**
 * Gradient presets for text
 */
export const gradientPresets = [
  'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(45deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
];

/**
 * Default typography style
 */
export const defaultTypographyStyle: TypographyStyle = {
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
};