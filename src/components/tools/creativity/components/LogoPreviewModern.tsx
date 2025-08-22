import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Grid3X3, 
  Move, 
  RotateCcw,
  Eye,
  Ruler
} from 'lucide-react';
import { LogoSettings } from '../types/logoTypes';
import { generateLogoSVG } from '../utils/svgGenerator';

interface LogoPreviewModernProps {
  logo: LogoSettings;
  className?: string;
  showControls?: boolean;
  enableInteraction?: boolean;
}

/**
 * Modern logo preview component with advanced features
 * Includes zoom, grid overlay, alignment guides, and interactive controls
 */
export const LogoPreviewModern = ({ 
  logo, 
  className = "", 
  showControls = true,
  enableInteraction = true 
}: LogoPreviewModernProps) => {
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [showGuides, setShowGuides] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const svgContent = generateLogoSVG(logo);

  /**
   * Handle zoom controls
   */
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
  const handleResetZoom = () => {
    setZoom(100);
    setPosition({ x: 0, y: 0 });
  };

  /**
   * Handle drag functionality
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enableInteraction) return;
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !enableInteraction) return;
    setPosition(prev => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  /**
   * Handle fullscreen toggle
   */
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  /**
   * Calculate logo dimensions for display
   */
  const getLogoDimensions = () => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svgElement = svgDoc.querySelector('svg');
    
    if (svgElement) {
      const width = svgElement.getAttribute('width') || '200';
      const height = svgElement.getAttribute('height') || '100';
      return { width: parseInt(width), height: parseInt(height) };
    }
    
    return { width: 200, height: 100 };
  };

  const dimensions = getLogoDimensions();

  /**
   * Grid overlay component
   */
  const GridOverlay = () => {
    if (!showGrid) return null;
    
    return (
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" style={{ opacity: 0.3 }}>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3B82F6" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    );
  };

  /**
   * Alignment guides component
   */
  const AlignmentGuides = () => {
    if (!showGuides) return null;
    
    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* Center lines */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-red-400 opacity-50" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-red-400 opacity-50" />
        
        {/* Rule of thirds */}
        <div className="absolute top-1/3 left-0 right-0 h-px bg-yellow-400 opacity-30" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-yellow-400 opacity-30" />
        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-yellow-400 opacity-30" />
        <div className="absolute left-2/3 top-0 bottom-0 w-px bg-yellow-400 opacity-30" />
      </div>
    );
  };

  /**
   * Preview controls component
   */
  const PreviewControls = () => {
    if (!showControls) return null;
    
    return (
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 25}
            className="h-8 w-8 p-0"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          
          <Badge variant="secondary" className="text-xs min-w-[60px] justify-center">
            {zoom}%
          </Badge>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 300}
            className="h-8 w-8 p-0"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetZoom}
            className="h-8 w-8 p-0"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* View Controls */}
        <div className="flex flex-col gap-1 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-lg">
          <Button
            variant={showGrid ? "default" : "ghost"}
            size="sm"
            onClick={() => setShowGrid(!showGrid)}
            className="h-8 w-8 p-0"
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          
          <Button
            variant={showGuides ? "default" : "ghost"}
            size="sm"
            onClick={() => setShowGuides(!showGuides)}
            className="h-8 w-8 p-0"
          >
            <Ruler className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="h-8 w-8 p-0"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  };

  /**
   * Status bar component
   */
  const StatusBar = () => {
    return (
      <div className="absolute bottom-4 left-4 flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg text-xs">
        <div className="flex items-center gap-2">
          <Eye className="w-3 h-3" />
          <span>Dimensions: {dimensions.width} × {dimensions.height}px</span>
        </div>
        
        <div className="w-px h-4 bg-gray-300" />
        
        <div className="flex items-center gap-2">
          <Move className="w-3 h-3" />
          <span>Position: {position.x}, {position.y}</span>
        </div>
        
        {isDragging && (
          <>
            <div className="w-px h-4 bg-gray-300" />
            <Badge variant="outline" className="text-xs">
              Déplacement...
            </Badge>
          </>
        )}
      </div>
    );
  };

  const previewClasses = `
    relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 
    rounded-lg transition-all duration-300 
    ${isFullscreen ? 'fixed inset-4 z-50' : 'min-h-64'} 
    ${isDragging ? 'cursor-grabbing' : enableInteraction ? 'cursor-grab' : ''}
    ${className}
  `;

  return (
    <Card className={previewClasses}>
      <CardContent className="p-0 h-full relative">
        {/* Grid Overlay */}
        <GridOverlay />
        
        {/* Alignment Guides */}
        <AlignmentGuides />
        
        {/* Logo Preview */}
        <div 
          ref={containerRef}
          className="flex items-center justify-center h-full p-8 relative"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            ref={previewRef}
            className="transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 100})`,
              transformOrigin: 'center'
            }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>
        
        {/* Preview Controls */}
        <PreviewControls />
        
        {/* Status Bar */}
        <StatusBar />
        
        {/* Fullscreen Overlay */}
        {isFullscreen && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleFullscreen} />
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Compact preview component for grid displays
 */
export const LogoPreviewCompact = ({ logo, className = "" }: { logo: LogoSettings; className?: string }) => {
  const svgContent = generateLogoSVG(logo);
  
  return (
    <div 
      className={`flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg transition-all duration-200 hover:scale-105 ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

/**
 * Preview with size variants for different use cases
 */
export const LogoPreviewSizes = ({ logo }: { logo: LogoSettings }) => {
  const sizes = [
    { name: 'Favicon', size: '32px' },
    { name: 'Mobile', size: '64px' },
    { name: 'Desktop', size: '128px' },
    { name: 'Print', size: '256px' }
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {sizes.map((size) => (
        <div key={size.name} className="text-center space-y-2">
          <div 
            className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mx-auto"
            style={{ width: size.size, height: size.size }}
          >
            <LogoPreviewCompact logo={logo} className="w-full h-full" />
          </div>
          <div className="text-xs text-gray-500">
            <div className="font-medium">{size.name}</div>
            <div>{size.size}</div>
          </div>
        </div>
      ))}
    </div>
  );
};