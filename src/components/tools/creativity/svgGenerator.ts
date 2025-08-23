import {
  LogoSettings,
  Layer,
  TextLayer,
  ShapeLayer,
  IconLayer,
  BackgroundLayer,
  ColorSettings,
  GradientSettings,
  VisualEffects,
  AnimationSettings,
  ExportFormat,
  ExportSettings
} from './logoTypes';

/**
 * Advanced SVG generator with support for layers, effects, and animations
 */

/**
 * Generate color string from ColorSettings
 */
function generateColorString(color: ColorSettings): string {
  switch (color.type) {
    case 'solid':
      return color.solid;
    
    case 'gradient':
      return `url(#gradient-${color.gradient.id || 'default'})`;
    
    case 'pattern':
      return `url(#pattern-${color.pattern || 'default'})`;
    
    default:
      return '#000000';
  }
}

/**
 * Generate gradient definitions for SVG
 */
function generateGradientDefs(layers: Layer[]): string {
  const gradients: string[] = [];
  
  layers.forEach(layer => {
    // Check for gradients in layer colors
    const checkColorForGradient = (color: ColorSettings) => {
      if (color.type === 'gradient' && color.gradient) {
        const grad = color.gradient;
        const id = grad.id || `gradient-${Math.random().toString(36).substr(2, 9)}`;
        
        let gradientElement = '';
        
        switch (grad.type) {
          case 'linear':
            gradientElement = `
              <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(${grad.angle || 0})">
                ${grad.stops.map(stop => 
                  `<stop offset="${stop.position}%" stop-color="${stop.color}" stop-opacity="${stop.opacity ?? 1}" />`
                ).join('')}
              </linearGradient>`;
            break;
            
          case 'radial':
            gradientElement = `
              <radialGradient id="${id}" cx="50%" cy="50%" r="50%">
                ${grad.stops.map(stop => 
                  `<stop offset="${stop.position}%" stop-color="${stop.color}" stop-opacity="${stop.opacity ?? 1}" />`
                ).join('')}
              </radialGradient>`;
            break;
            
          case 'conic':
            // SVG doesn't natively support conic gradients, so we'll simulate with radial
            gradientElement = `
              <radialGradient id="${id}" cx="50%" cy="50%" r="50%">
                ${grad.stops.map(stop => 
                  `<stop offset="${stop.position}%" stop-color="${stop.color}" stop-opacity="${stop.opacity ?? 1}" />`
                ).join('')}
              </radialGradient>`;
            break;
        }
        
        gradients.push(gradientElement);
      }
    };
    
    // Check different layer types for gradients
    if (layer.type === 'text') {
      const textLayer = layer as TextLayer;
      checkColorForGradient(textLayer.color);
      if (textLayer.effects?.stroke?.color) {
        checkColorForGradient(textLayer.effects.stroke.color);
      }
    } else if (layer.type === 'shape') {
      const shapeLayer = layer as ShapeLayer;
      checkColorForGradient(shapeLayer.fill);
      if (shapeLayer.stroke?.color) {
        checkColorForGradient(shapeLayer.stroke.color);
      }
    } else if (layer.type === 'background') {
      const bgLayer = layer as BackgroundLayer;
      checkColorForGradient(bgLayer.fill);
    }
  });
  
  return gradients.join('');
}

/**
 * Generate filter definitions for visual effects
 */
function generateFilterDefs(layers: Layer[]): string {
  const filters: string[] = [];
  
  layers.forEach(layer => {
    if (layer.effects) {
      const effects = layer.effects;
      const filterId = `filter-${layer.id}`;
      let filterElements: string[] = [];
      
      // Drop shadow
      if (effects.shadow && effects.shadow.enabled) {
        filterElements.push(`
          <feDropShadow
            dx="${effects.shadow.offsetX || 0}"
            dy="${effects.shadow.offsetY || 0}"
            stdDeviation="${effects.shadow.blur || 0}"
            flood-color="${effects.shadow.color || '#000000'}"
            flood-opacity="${effects.shadow.opacity || 0.5}"
          />`);
      }
      
      // Glow effect
      if (effects.glow && effects.glow.enabled) {
        filterElements.push(`
          <feGaussianBlur stdDeviation="${effects.glow.size || 5}" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>`);
      }
      
      // Blur effect
      if (effects.blur && effects.blur > 0) {
        filterElements.push(`
          <feGaussianBlur stdDeviation="${effects.blur}" />`);
      }
      
      // Color adjustments
      if (effects.brightness !== undefined || effects.contrast !== undefined || 
          effects.saturation !== undefined || effects.hue !== undefined) {
        const brightness = (effects.brightness || 0) / 100;
        const contrast = (effects.contrast || 0) / 100 + 1;
        const saturation = (effects.saturation || 0) / 100 + 1;
        const hue = effects.hue || 0;
        
        filterElements.push(`
          <feColorMatrix type="matrix" values="
            ${contrast} 0 0 0 ${brightness}
            0 ${contrast} 0 0 ${brightness}
            0 0 ${contrast} 0 ${brightness}
            0 0 0 1 0
          "/>
          <feColorMatrix type="saturate" values="${saturation}"/>
          <feColorMatrix type="hueRotate" values="${hue}"/>`);
      }
      
      if (filterElements.length > 0) {
        filters.push(`
          <filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%">
            ${filterElements.join('')}
          </filter>`);
      }
    }
  });
  
  return filters.join('');
}

/**
 * Generate animation definitions
 */
function generateAnimationDefs(layers: Layer[]): string {
  const animations: string[] = [];
  
  layers.forEach(layer => {
    if (layer.animation && layer.animation.enabled !== false && layer.animation.type !== 'none') {
      const anim = layer.animation;
      const duration = anim.duration || 1000;
      const delay = anim.delay || 0;
      const iterations = anim.iterations === -1 ? 'indefinite' : (anim.iterations || 1);
      
      switch (anim.type) {
        case 'fade':
          animations.push(`
            <animate
              attributeName="opacity"
              values="0;1"
              dur="${duration}ms"
              begin="${delay}ms"
              repeatCount="${iterations}"
            />`);
          break;
          
        case 'slide':
          animations.push(`
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-100,0;0,0"
              dur="${duration}ms"
              begin="${delay}ms"
              repeatCount="${iterations}"
            />`);
          break;
          
        case 'rotate':
          animations.push(`
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0;360"
              dur="${duration}ms"
              begin="${delay}ms"
              repeatCount="${iterations}"
            />`);
          break;
          
        case 'scale':
          animations.push(`
            <animateTransform
              attributeName="transform"
              type="scale"
              values="0;1"
              dur="${duration}ms"
              begin="${delay}ms"
              repeatCount="${iterations}"
            />`);
          break;
          
        case 'pulse':
          animations.push(`
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.1;1"
              dur="${duration}ms"
              begin="${delay}ms"
              repeatCount="${iterations}"
            />`);
          break;
      }
    }
  });
  
  return animations.join('');
}

/**
 * Generate transform string from layer transform settings
 */
function generateTransform(layer: Layer): string {
  const transforms: string[] = [];
  
  if (layer.transform) {
    const t = layer.transform;
    
    if (t.x !== 0 || t.y !== 0) {
      transforms.push(`translate(${t.x}, ${t.y})`);
    }
    
    if (t.rotation !== 0) {
      transforms.push(`rotate(${t.rotation})`);
    }
    
    if (t.scaleX !== 1 || t.scaleY !== 1) {
      transforms.push(`scale(${t.scaleX}, ${t.scaleY})`);
    }
    
    if (t.skewX !== 0) {
      transforms.push(`skewX(${t.skewX})`);
    }
    
    if (t.skewY !== 0) {
      transforms.push(`skewY(${t.skewY})`);
    }
  }
  
  return transforms.length > 0 ? `transform="${transforms.join(' ')}"` : '';
}

/**
 * Generate text layer SVG
 */
function generateTextLayer(layer: TextLayer): string {
  const transform = generateTransform(layer);
  const filter = layer.effects ? `filter="url(#filter-${layer.id})"` : '';
  const color = generateColorString(layer.color);
  
  let textElement = `
    <text
      x="${layer.transform?.x || 0}"
      y="${layer.transform?.y || 0}"
      font-family="${layer.font?.family || 'Arial'}"
      font-size="${layer.font?.size || 16}"
      font-weight="${layer.font?.weight || 'normal'}"
      font-style="${layer.font?.style || 'normal'}"
      text-anchor="${layer.textAlign || 'start'}"
      fill="${color}"
      opacity="${layer.opacity}"
      ${transform}
      ${filter}
    >`;
  
  // Handle stroke
  if (layer.effects?.stroke?.enabled && layer.effects.stroke.width > 0) {
    const strokeColor = layer.effects.stroke.color ? 
      generateColorString(layer.effects.stroke.color) : '#000000';
    textElement += `
      stroke="${strokeColor}"
      stroke-width="${layer.effects.stroke.width}"`;
  }
  
  textElement += `>${layer.content || ''}</text>`;
  
  return textElement;
}

/**
 * Generate shape layer SVG
 */
function generateShapeLayer(layer: ShapeLayer): string {
  const transform = generateTransform(layer);
  const filter = layer.effects ? `filter="url(#filter-${layer.id})"` : '';
  const fill = generateColorString(layer.fill);
  
  let shapeElement = '';
  
  switch (layer.shapeType) {
    case 'rectangle':
      const rx = layer.cornerRadius || 0;
      shapeElement = `
        <rect
          x="${layer.transform?.x || 0}"
          y="${layer.transform?.y || 0}"
          width="${layer.width || 100}"
          height="${layer.height || 100}"
          rx="${rx}"
          fill="${fill}"
          opacity="${layer.opacity}"
          ${transform}
          ${filter}
        />`;
      break;
      
    case 'circle':
      const width = layer.width || 100;
      const height = layer.height || 100;
      const x = layer.transform?.x || 0;
      const y = layer.transform?.y || 0;
      const circleRadius = Math.min(width, height) / 2;
      shapeElement = `
        <circle
          cx="${x + width / 2}"
          cy="${y + height / 2}"
          r="${circleRadius}"
          fill="${fill}"
          opacity="${layer.opacity}"
          ${transform}
          ${filter}
        />`;
      break;
      
    case 'ellipse':
      const ellipseWidth = layer.width || 100;
      const ellipseHeight = layer.height || 100;
      const ellipseX = layer.transform?.x || 0;
      const ellipseY = layer.transform?.y || 0;
      shapeElement = `
        <ellipse
          cx="${ellipseX + ellipseWidth / 2}"
          cy="${ellipseY + ellipseHeight / 2}"
          rx="${ellipseWidth / 2}"
          ry="${ellipseHeight / 2}"
          fill="${fill}"
          opacity="${layer.opacity}"
          ${transform}
          ${filter}
        />`;
      break;
      
    case 'triangle':
      const triangleWidth = layer.width || 100;
      const triangleHeight = layer.height || 100;
      const triangleX = layer.transform?.x || 0;
      const triangleY = layer.transform?.y || 0;
      const trianglePoints = [
        `${triangleX + triangleWidth / 2},${triangleY}`,
        `${triangleX},${triangleY + triangleHeight}`,
        `${triangleX + triangleWidth},${triangleY + triangleHeight}`
      ];
      shapeElement = `
        <polygon
          points="${trianglePoints.join(' ')}"
          fill="${fill}"
          opacity="${layer.opacity}"
          ${transform}
          ${filter}
        />`;
      break;
      
    case 'polygon':
      // Generate points for a regular polygon
      const sides = layer.sides || 6;
      const polygonWidth = layer.width || 100;
      const polygonHeight = layer.height || 100;
      const polygonX = layer.transform?.x || 0;
      const polygonY = layer.transform?.y || 0;
      const centerX = polygonX + polygonWidth / 2;
      const centerY = polygonY + polygonHeight / 2;
      const polygonRadius = Math.min(polygonWidth, polygonHeight) / 2;
      
      const polygonPoints = [];
      for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
        const x = centerX + polygonRadius * Math.cos(angle);
        const y = centerY + polygonRadius * Math.sin(angle);
        polygonPoints.push(`${x},${y}`);
      }
      
      shapeElement = `
        <polygon
          points="${polygonPoints.join(' ')}"
          fill="${fill}"
          opacity="${layer.opacity}"
          ${transform}
          ${filter}
        />`;
      break;
  }
  
  // Add stroke if enabled
  if (layer.stroke?.enabled && layer.stroke.width > 0) {
    const strokeColor = layer.stroke.color ? 
      generateColorString(layer.stroke.color) : '#000000';
    shapeElement = shapeElement.replace(
      /\/>$/,
      ` stroke="${strokeColor}" stroke-width="${layer.stroke.width}" />`
    );
  }
  
  return shapeElement;
}

/**
 * Generate icon layer SVG
 */
function generateIconLayer(layer: IconLayer): string {
  const transform = generateTransform(layer);
  const filter = layer.effects ? `filter="url(#filter-${layer.id})"` : '';
  const color = generateColorString(layer.color);
  
  // For now, we'll use a simple placeholder for icons
  // In a real implementation, you'd load the actual icon SVG
  const iconX = layer.transform?.x || 0;
  const iconY = layer.transform?.y || 0;
  const iconSize = layer.size || 24;
  return `
    <g ${transform} ${filter} opacity="${layer.opacity}">
      <rect
        x="${iconX}"
        y="${iconY}"
        width="${iconSize}"
        height="${iconSize}"
        fill="${color}"
        rx="4"
      />
      <text
        x="${iconX + iconSize / 2}"
        y="${iconY + iconSize / 2}"
        text-anchor="middle"
        dominant-baseline="central"
        font-size="${iconSize * 0.6}"
        fill="white"
      >
        ${layer.iconName.charAt(0).toUpperCase()}
      </text>
    </g>`;
}

/**
 * Generate background layer SVG
 */
function generateBackgroundLayer(layer: BackgroundLayer, width: number, height: number): string {
  const color = generateColorString(layer.fill);
  
  return `
    <rect
      x="0"
      y="0"
      width="${width}"
      height="${height}"
      fill="${color}"
      opacity="${layer.opacity}"
    />`;
}

/**
 * Main function to generate complete logo SVG
 */
export function generateLogoSVG(settings: LogoSettings, layers: Layer[]): string {
  const { width, height } = settings.canvas;
  
  // Sort layers by z-index
  const sortedLayers = [...layers]
    .filter(layer => layer.visible)
    .sort((a, b) => a.zIndex - b.zIndex);
  
  // Generate definitions
  const gradientDefs = generateGradientDefs(sortedLayers);
  const filterDefs = generateFilterDefs(sortedLayers);
  
  // Generate layer elements
  const layerElements = sortedLayers.map(layer => {
    switch (layer.type) {
      case 'text':
        return generateTextLayer(layer as TextLayer);
      case 'shape':
        return generateShapeLayer(layer as ShapeLayer);
      case 'icon':
        return generateIconLayer(layer as IconLayer);
      case 'background':
        return generateBackgroundLayer(layer as BackgroundLayer, width, height);
      default:
        return '';
    }
  }).join('');
  
  return `
    <svg
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        ${gradientDefs}
        ${filterDefs}
      </defs>
      ${layerElements}
    </svg>`;
}

/**
 * Export logo as SVG file
 */
export function exportSVG(settings: LogoSettings, layers: Layer[], filename: string = 'logo.svg'): void {
  const svgContent = generateLogoSVG(settings, layers);
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export logo as PNG file
 */
export function exportPNG(
  settings: LogoSettings,
  layers: Layer[],
  filename: string = 'logo.png',
  scale: number = 1
): void {
  const svgContent = generateLogoSVG(settings, layers);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return;
  
  canvas.width = settings.canvas.width * scale;
  canvas.height = settings.canvas.height * scale;
  
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };
  
  const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
  const svgUrl = URL.createObjectURL(svgBlob);
  img.src = svgUrl;
}

/**
 * Export logo in multiple formats
 */
export function exportMultiFormat(
  settings: LogoSettings,
  layers: Layer[],
  exportSettings: ExportSettings
): void {
  const { formats, filename, quality, scales } = exportSettings;
  
  formats.forEach(format => {
    scales.forEach(scale => {
      const scaledFilename = `${filename}_${scale}x.${format}`;
      
      switch (format) {
        case 'svg':
          exportSVG(settings, layers, scaledFilename);
          break;
        case 'png':
          exportPNG(settings, layers, scaledFilename, scale);
          break;
        case 'jpg':
          // Similar to PNG but with JPEG format
          // Implementation would be similar to exportPNG
          break;
        case 'pdf':
          // PDF export would require additional library like jsPDF
          console.warn('PDF export not implemented yet');
          break;
      }
    });
  });
}