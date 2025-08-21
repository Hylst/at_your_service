/**
 * Design System Types
 * TypeScript definitions for the unified design system
 */

import { designSystem } from '@/lib/design-system';

// Extract types from design system tokens
export type ColorToken = keyof typeof designSystem.colors.primary;
export type SpacingToken = keyof typeof designSystem.spacing;
export type TypographySize = keyof typeof designSystem.typography.sizes;
export type TypographyWeight = keyof typeof designSystem.typography.weights;
export type ShadowToken = keyof typeof designSystem.shadows;
export type MotionDuration = keyof typeof designSystem.motion.duration;
export type MotionEasing = keyof typeof designSystem.motion.easing;

// Component variant types
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost' | 'outline';
export type ComponentState = 'default' | 'hover' | 'active' | 'disabled' | 'loading';

// Theme configuration
export interface DesignSystemTheme {
  colors: typeof designSystem.colors;
  spacing: typeof designSystem.spacing;
  typography: typeof designSystem.typography;
  shadows: typeof designSystem.shadows;
  effects: typeof designSystem.effects;
  motion: typeof designSystem.motion;
  borderRadius: typeof designSystem.borderRadius;
  breakpoints: typeof designSystem.breakpoints;
  zIndex: typeof designSystem.zIndex;
}

// Component props interfaces
export interface BaseComponentProps {
  className?: string;
  size?: ComponentSize;
  variant?: ComponentVariant;
  disabled?: boolean;
  loading?: boolean;
}

export interface TypographyProps extends BaseComponentProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  size?: TypographySize;
  weight?: TypographyWeight;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
}

export interface ButtonProps extends BaseComponentProps {
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'color';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  readOnly?: boolean;
}

export interface CardProps extends BaseComponentProps {
  children: React.ReactNode;
  padding?: SpacingToken;
  shadow?: ShadowToken;
  border?: boolean;
  hover?: boolean;
  interactive?: boolean;
}

export interface BadgeProps extends BaseComponentProps {
  children: React.ReactNode;
  dot?: boolean;
  count?: number;
  showZero?: boolean;
}

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: SpacingToken;
  className?: string;
}

export interface GridProps {
  children: React.ReactNode;
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: SpacingToken;
  className?: string;
}

// Creativity tools specific types
export interface ColorPickerProps extends BaseComponentProps {
  value?: string;
  onChange?: (color: string) => void;
  format?: 'hex' | 'rgb' | 'hsl';
  showPresets?: boolean;
  presets?: string[];
  showAlpha?: boolean;
}

export interface ToolHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  badges?: string[];
  gradient?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'creative';
  actions?: React.ReactNode;
  className?: string;
}

export interface ExportButtonProps extends BaseComponentProps {
  formats?: Array<'png' | 'jpg' | 'svg' | 'pdf' | 'json' | 'css' | 'scss'>;
  onExport?: (format: string, data: any) => void;
  data?: any;
  filename?: string;
}

// Animation and transition types
export interface AnimationProps {
  duration?: MotionDuration;
  easing?: MotionEasing;
  delay?: number;
  repeat?: boolean | number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}

export interface TransitionProps {
  property?: string | string[];
  duration?: MotionDuration;
  easing?: MotionEasing;
  delay?: number;
}

// Responsive design types
export type Breakpoint = keyof typeof designSystem.breakpoints;

export interface ResponsiveValue<T> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Override<T, U> = Omit<T, keyof U> & U;