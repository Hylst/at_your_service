/**
 * Shared color utility functions
 * Provides common color conversion and manipulation functions used across the creativity suite
 */

/**
 * Convert hex color to RGB values
 * @param hex - Hex color string (e.g., '#FF5733')
 * @returns Array of RGB values [r, g, b]
 */
export const hexToRgbValues = (hex: string): [number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

/**
 * Convert hex color to RGB string format
 * @param hex - Hex color string (e.g., '#FF5733')
 * @returns RGB string (e.g., 'rgb(255, 87, 51)')
 */
export const hexToRgbString = (hex: string): string => {
  const [r, g, b] = hexToRgbValues(hex);
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Convert hex color to HSL values
 * @param hex - Hex color string (e.g., '#FF5733')
 * @returns Array of HSL values [h, s, l] where h is 0-360, s and l are 0-100
 */
export const hexToHslValues = (hex: string): [number, number, number] => {
  const [r, g, b] = hexToRgbValues(hex).map(c => c / 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

/**
 * Convert hex color to HSL string format
 * @param hex - Hex color string (e.g., '#FF5733')
 * @returns HSL string (e.g., 'hsl(9, 100%, 60%)')
 */
export const hexToHslString = (hex: string): string => {
  const [h, s, l] = hexToHslValues(hex);
  return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
};

/**
 * Convert HSL values to hex color
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns Hex color string (e.g., '#FF5733')
 */
export const hslToHex = (h: number, s: number, l: number): string => {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Convert hex color to CMYK string format
 * @param hex - Hex color string (e.g., '#FF5733')
 * @returns CMYK string (e.g., 'cmyk(0%, 66%, 80%, 0%)')
 */
export const hexToCmykString = (hex: string): string => {
  const [r, g, b] = hexToRgbValues(hex).map(c => c / 255);

  const k = 1 - Math.max(r, g, b);
  const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
  const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
  const y = k === 1 ? 0 : (1 - b - k) / (1 - k);

  return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
};

/**
 * Convert hex color to HSV string format
 * @param hex - Hex color string (e.g., '#FF5733')
 * @returns HSV string (e.g., 'hsv(9, 80%, 100%)')
 */
export const hexToHsvString = (hex: string): string => {
  const [r, g, b] = hexToRgbValues(hex).map(c => c / 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  if (diff !== 0) {
    switch (max) {
      case r: h = ((g - b) / diff) % 6; break;
      case g: h = (b - r) / diff + 2; break;
      case b: h = (r - g) / diff + 4; break;
    }
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;

  const s = Math.round((max === 0 ? 0 : diff / max) * 100);
  const v = Math.round(max * 100);

  return `hsv(${h}, ${s}%, ${v}%)`;
};

/**
 * Calculate color luminance for accessibility calculations
 * @param hex - Hex color string (e.g., '#FF5733')
 * @returns Luminance value (0-1)
 */
export const calculateLuminance = (hex: string): number => {
  const [r, g, b] = hexToRgbValues(hex).map(c => c / 255);

  const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};

/**
 * Calculate contrast ratio between two colors
 * @param color1 - First hex color string
 * @param color2 - Second hex color string
 * @returns Contrast ratio (1-21)
 */
export const calculateContrast = (color1: string, color2: string): number => {
  const lum1 = calculateLuminance(color1);
  const lum2 = calculateLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * Generate a random hex color
 * @returns Random hex color string (e.g., '#A3B2C1')
 */
export const generateRandomHexColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

/**
 * Get color name approximation based on hue
 * @param hex - Hex color string (e.g., '#FF5733')
 * @returns Color name in French (e.g., 'Rouge', 'Bleu', etc.)
 */
export const getColorName = (hex: string): string => {
  const [h] = hexToHslValues(hex);
  
  const colorNames = [
    { min: 0, max: 15, name: 'Rouge' },
    { min: 15, max: 45, name: 'Orange' },
    { min: 45, max: 75, name: 'Jaune' },
    { min: 75, max: 150, name: 'Vert' },
    { min: 150, max: 210, name: 'Cyan' },
    { min: 210, max: 270, name: 'Bleu' },
    { min: 270, max: 330, name: 'Violet' },
    { min: 330, max: 360, name: 'Rouge' }
  ];

  const colorName = colorNames.find(color => h >= color.min && h < color.max);
  return colorName?.name || 'Indéfini';
};

/**
 * Validate if a string is a valid hex color
 * @param hex - String to validate
 * @returns True if valid hex color, false otherwise
 */
export const isValidHexColor = (hex: string): boolean => {
  const hexPattern = /^#[0-9A-F]{6}$/i;
  return hexPattern.test(hex);
};

/**
 * Get color temperature classification
 * @param hex - Hex color string
 * @returns Temperature classification ('warm', 'cool', 'neutral')
 */
export const getColorTemperature = (hex: string): 'warm' | 'cool' | 'neutral' => {
  const [h] = hexToHslValues(hex);
  
  if ((h >= 0 && h <= 60) || (h >= 300 && h <= 360)) {
    return 'warm'; // Reds, oranges, yellows
  } else if (h >= 180 && h <= 300) {
    return 'cool'; // Blues, greens, purples
  } else {
    return 'neutral'; // In-between ranges
  }
};

/**
 * Check if color meets WCAG accessibility standards
 * @param foreground - Foreground hex color
 * @param background - Background hex color
 * @returns Object with AA and AAA compliance status
 */
export const checkAccessibility = (foreground: string, background: string) => {
  const contrast = calculateContrast(foreground, background);
  
  return {
    contrast,
    aa: contrast >= 4.5,
    aaa: contrast >= 7,
    aaLarge: contrast >= 3,
    aaaLarge: contrast >= 4.5
  };
};