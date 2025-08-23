// Advanced Logo Creator Types and Interfaces
// Comprehensive type definitions for the new logo creation system

export type ColorType = 'solid' | 'gradient' | 'pattern';
export type GradientType = 'linear' | 'radial' | 'conic';
export type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light';
export type AnimationType = 'none' | 'fade' | 'slide' | 'rotate' | 'scale' | 'bounce' | 'pulse';
export type ExportFormat = 'svg' | 'png' | 'jpg' | 'pdf' | 'webp';
export type LayerType = 'text' | 'shape' | 'icon' | 'image' | 'background';

// Color and Gradient Interfaces
export interface ColorStop {
  color: string;
  position: number; // 0-100
  opacity?: number; // 0-1, optional for SVG generation
}

export interface GradientSettings {
  id?: string; // Optional ID for SVG generation
  type: GradientType;
  angle: number; // 0-360 for linear
  centerX: number; // 0-100 for radial/conic
  centerY: number; // 0-100 for radial/conic
  stops: ColorStop[];
  colors?: ColorStop[]; // For compatibility with existing code
  positions?: number[]; // For compatibility with existing code
}

export interface ColorSettings {
  type: ColorType;
  solid: string;
  gradient: GradientSettings;
  opacity: number; // 0-1
  value?: string; // For compatibility with existing code
  pattern?: string; // For pattern-based colors
}

// Shadow and Effects
export interface ShadowEffect {
  enabled: boolean;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

export interface GlowEffect {
  enabled: boolean;
  color: string;
  size: number;
  intensity: number;
}

export interface StrokeEffect {
  enabled: boolean;
  width: number;
  color: ColorSettings;
  position: 'inside' | 'center' | 'outside';
  dashArray?: number[];
}

export interface VisualEffects {
  shadow: ShadowEffect;
  glow: GlowEffect;
  stroke: StrokeEffect;
  blur: number;
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  blendMode: BlendMode;
}

// Animation Settings
export interface AnimationSettings {
  type: AnimationType;
  enabled?: boolean; // Optional enabled flag for SVG generation
  duration: number; // in seconds
  delay: number;
  iterations: number | 'infinite';
  direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'cubic-bezier';
  customEasing?: string; // for cubic-bezier
}

// Typography
export interface FontSettings {
  family: string;
  weight: string | number;
  style: 'normal' | 'italic' | 'oblique';
  size: number;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textDecoration: 'none' | 'underline' | 'overline' | 'line-through';
}

// Layer System
export interface LayerTransform {
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  skewX: number;
  skewY: number;
}

export interface Layer {
  id: string;
  name: string;
  type: LayerType;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: BlendMode;
  transform: LayerTransform;
  effects: VisualEffects;
  animation: AnimationSettings;
  zIndex: number;
  colorSettings?: ColorSettings; // For layer-specific color settings
}

// Text Layer
export interface TextLayer extends Layer {
  type: 'text';
  content: string;
  font: FontSettings;
  color: ColorSettings;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  verticalAlign: 'top' | 'middle' | 'bottom';
  maxWidth?: number;
  autoResize: boolean;
  // Direct position properties for SVG generation
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  // Font properties for SVG generation
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fontStyle: string;
}

// Shape Layer
export interface ShapeLayer extends Layer {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'ellipse' | 'triangle' | 'polygon' | 'star' | 'custom';
  width: number;
  height: number;
  rotation: number;
  content: string;
  fill: ColorSettings;
  color: ColorSettings | string; // For backward compatibility and direct color access
  cornerRadius?: number;
  sides?: number; // for polygon/star
  innerRadius?: number; // for star
  path?: string; // for custom shapes
  // Direct position properties for SVG generation
  x: number;
  y: number;
  // Stroke properties
  stroke?: {
    enabled: boolean;
    color: ColorSettings;
    width: number;
  };
}

// Icon Layer
export interface IconLayer extends Layer {
  type: 'icon';
  iconName: string;
  iconSet: string;
  size: number;
  color: ColorSettings;
  // Direct position properties for SVG generation
  x: number;
  y: number;
}

// Background Layer
export interface BackgroundLayer extends Layer {
  type: 'background';
  fill: ColorSettings;
  pattern?: string;
  patternScale?: number;
  // Color property for SVG generation
  color: ColorSettings;
}

// Logo Settings (Main Configuration)
export interface LogoSettings {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundColor: ColorSettings;
  layers: Layer[];
  // Canvas properties for SVG generation
  canvas: {
    width: number;
    height: number;
  };
  artboard: {
    showGrid: boolean;
    gridSize: number;
    showGuides: boolean;
    snapToGrid: boolean;
    snapToGuides: boolean;
  };
  metadata: {
    created: Date;
    modified: Date;
    version: string;
    tags: string[];
    description?: string;
  };
}

// Templates and Presets
export interface LogoTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  settings: Partial<LogoSettings>;
  tags: string[];
  premium: boolean;
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  category: 'brand' | 'nature' | 'modern' | 'vintage' | 'custom';
}

// Export Settings
export interface ExportSettings {
  format: ExportFormat;
  width: number;
  height: number;
  scale: number;
  quality: number; // 0-100 for JPG
  backgroundColor: string;
  transparent: boolean;
  includeMetadata: boolean;
  // Additional properties for multi-format export
  formats: ExportFormat[];
  filename: string;
  scales: number[];
}

// History System
export interface HistoryState {
  id: string;
  timestamp: number;
  action: string;
  settings: LogoSettings;
  description: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  action: string;
  settings: LogoSettings;
  description: string;
  details?: string;
}

export interface HistoryManager {
  states: HistoryState[];
  currentIndex: number;
  maxStates: number;
}

// UI State
export interface UIState {
  activeTab: 'layers' | 'text' | 'shapes' | 'colors' | 'effects' | 'export';
  selectedLayerId: string | null;
  zoom: number;
  panX: number;
  panY: number;
  showGrid: boolean;
  showGuides: boolean;
  darkMode: boolean;
  sidebarCollapsed: boolean;
}

// Preview Mode
export type PreviewMode = 'web' | 'print' | 'mobile' | 'social';

// Font Family Options
export const FONT_FAMILIES = [
  { name: 'Inter', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'Roboto', category: 'sans-serif', weights: [100, 300, 400, 500, 700, 900] },
  { name: 'Open Sans', category: 'sans-serif', weights: [300, 400, 500, 600, 700, 800] },
  { name: 'Montserrat', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'Poppins', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'Playfair Display', category: 'serif', weights: [400, 500, 600, 700, 800, 900] },
  { name: 'Merriweather', category: 'serif', weights: [300, 400, 700, 900] },
  { name: 'Lora', category: 'serif', weights: [400, 500, 600, 700] },
  { name: 'Fira Code', category: 'monospace', weights: [300, 400, 500, 600, 700] },
  { name: 'JetBrains Mono', category: 'monospace', weights: [100, 200, 300, 400, 500, 600, 700, 800] },
] as const;

// Default Settings
export const DEFAULT_LOGO_SETTINGS: LogoSettings = {
  id: '',
  name: 'New Logo',
  width: 400,
  height: 400,
  backgroundColor: {
    type: 'solid',
    solid: '#ffffff',
    gradient: {
      type: 'linear',
      angle: 0,
      centerX: 50,
      centerY: 50,
      stops: []
    },
    opacity: 1
  },
  layers: [],
  canvas: {
    width: 400,
    height: 400
  },
  artboard: {
    showGrid: false,
    gridSize: 20,
    showGuides: false,
    snapToGrid: false,
    snapToGuides: false
  },
  metadata: {
    created: new Date(),
    modified: new Date(),
    version: '1.0.0',
    tags: [],
    description: ''
  }
};

export const DEFAULT_TEXT_LAYER: Omit<TextLayer, 'id'> = {
  name: 'Text Layer',
  type: 'text',
  visible: true,
  locked: false,
  opacity: 1,
  blendMode: 'normal',
  transform: {
    x: 0,
    y: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    skewX: 0,
    skewY: 0
  },
  x: 200,
  y: 200,
  width: 200,
  height: 50,
  rotation: 0,
  text: 'Your Text',
  fontFamily: 'Inter',
  fontSize: 32,
  fontWeight: 400,
  fontStyle: 'normal',
  effects: {
    shadow: {
      enabled: false,
      offsetX: 0,
      offsetY: 0,
      blur: 0,
      spread: 0,
      color: '#000000',
      opacity: 0.5,
      inset: false
    },
    glow: {
      enabled: false,
      color: '#ffffff',
      size: 0,
      intensity: 1
    },
    stroke: {
      enabled: false,
      width: 1,
      color: {
        type: 'solid',
        solid: '#000000',
        gradient: {
          type: 'linear',
          angle: 0,
          centerX: 50,
          centerY: 50,
          stops: []
        },
        opacity: 1
      },
      position: 'outside'
    },
    blur: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    blendMode: 'normal'
  },
  animation: {
    type: 'none',
    duration: 1,
    delay: 0,
    iterations: 1,
    direction: 'normal',
    easing: 'ease'
  },
  zIndex: 0,
  content: 'Your Text',
  font: {
    family: 'Inter',
    weight: 400,
    style: 'normal',
    size: 32,
    lineHeight: 1.2,
    letterSpacing: 0,
    wordSpacing: 0,
    textTransform: 'none',
    textDecoration: 'none'
  },
  color: {
    type: 'solid',
    solid: '#000000',
    gradient: {
      type: 'linear',
      angle: 0,
      centerX: 50,
      centerY: 50,
      stops: []
    },
    opacity: 1
  },
  textAlign: 'center',
  verticalAlign: 'middle',
  autoResize: true
};