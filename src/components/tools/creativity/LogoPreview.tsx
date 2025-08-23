import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  ZoomIn,
  ZoomOut,
  Grid3X3,
  Maximize2,
  Minimize2,
  RotateCcw,
  Download,
  Eye,
  EyeOff,
  Move,
  MousePointer2
} from 'lucide-react';
import { LogoSettings, Layer, PreviewMode } from './logoTypes';
import { generateLogoSVG } from './svgGenerator';

interface LogoPreviewProps {
  settings: LogoSettings;
  layers: Layer[];
  onSettingsChange: (settings: LogoSettings) => void;
  onLayersChange: (layers: Layer[]) => void;
  className?: string;
}

/**
 * Advanced logo preview component with real-time rendering, zoom, grid, and interactive controls
 */
export const LogoPreview: React.FC<LogoPreviewProps> = ({
  settings,
  layers,
  onSettingsChange,
  onLayersChange,
  className = ''
}) => {
  // State management for preview controls
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [showGuides, setShowGuides] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>('web');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  
  const previewRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Preview mode configurations
  const previewModes = {
    web: { width: 400, height: 400, label: 'Web', color: 'bg-blue-500' },
    print: { width: 300, height: 300, label: 'Print', color: 'bg-green-500' },
    mobile: { width: 200, height: 200, label: 'Mobile', color: 'bg-purple-500' },
    social: { width: 350, height: 350, label: 'Social', color: 'bg-pink-500' }
  };

  const currentMode = previewModes[previewMode];

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 25, 500));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 25, 25));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoom(100);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  // Pan controls
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  }, [panOffset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '+':
          case '=':
            e.preventDefault();
            handleZoomIn();
            break;
          case '-':
            e.preventDefault();
            handleZoomOut();
            break;
          case '0':
            e.preventDefault();
            handleZoomReset();
            break;
          case 'g':
            e.preventDefault();
            setShowGrid(prev => !prev);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleZoomIn, handleZoomOut, handleZoomReset]);

  // Generate SVG content
  const svgContent = generateLogoSVG(settings, layers);

  // Grid overlay component
  const GridOverlay = () => {
    if (!showGrid) return null;

    const gridSize = 20;
    const width = currentMode.width;
    const height = currentMode.height;

    return (
      <svg
        className="absolute inset-0 pointer-events-none"
        width={width}
        height={height}
        style={{ transform: `scale(${zoom / 100})` }}
      >
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    );
  };

  // Guides overlay component
  const GuidesOverlay = () => {
    if (!showGuides) return null;

    const width = currentMode.width;
    const height = currentMode.height;
    const centerX = width / 2;
    const centerY = height / 2;

    return (
      <svg
        className="absolute inset-0 pointer-events-none"
        width={width}
        height={height}
        style={{ transform: `scale(${zoom / 100})` }}
      >
        {/* Center guides */}
        <line
          x1={centerX}
          y1={0}
          x2={centerX}
          y2={height}
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1={0}
          y1={centerY}
          x2={width}
          y2={centerY}
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Third guides */}
        <line
          x1={width / 3}
          y1={0}
          x2={width / 3}
          y2={height}
          stroke="rgba(34, 197, 94, 0.3)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <line
          x1={(width * 2) / 3}
          y1={0}
          x2={(width * 2) / 3}
          y2={height}
          stroke="rgba(34, 197, 94, 0.3)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <line
          x1={0}
          y1={height / 3}
          x2={width}
          y2={height / 3}
          stroke="rgba(34, 197, 94, 0.3)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <line
          x1={0}
          y1={(height * 2) / 3}
          x2={width}
          y2={(height * 2) / 3}
          stroke="rgba(34, 197, 94, 0.3)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
      </svg>
    );
  };

  return (
    <Card className={`p-6 ${className}`}>
      {/* Preview Controls Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Preview</h3>
          <Badge variant="outline" className={currentMode.color}>
            {currentMode.label}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Preview Mode Selector */}
          <div className="flex gap-1">
            {Object.entries(previewModes).map(([mode, config]) => (
              <Button
                key={mode}
                variant={previewMode === mode ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode(mode as PreviewMode)}
                className="px-2 py-1 text-xs"
              >
                {config.label}
              </Button>
            ))}
          </div>
          
          {/* Fullscreen Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Zoom and View Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2 min-w-[120px]">
              <Slider
                value={[zoom]}
                onValueChange={([value]) => setZoom(value)}
                min={25}
                max={500}
                step={25}
                className="flex-1"
              />
              <span className="text-sm font-mono w-12 text-center">{zoom}%</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Grid Toggle */}
          <div className="flex items-center gap-2">
            <Switch
              id="show-grid"
              checked={showGrid}
              onCheckedChange={setShowGrid}
            />
            <Label htmlFor="show-grid" className="flex items-center gap-1">
              <Grid3X3 className="w-4 h-4" />
              Grid
            </Label>
          </div>

          {/* Guides Toggle */}
          <div className="flex items-center gap-2">
            <Switch
              id="show-guides"
              checked={showGuides}
              onCheckedChange={setShowGuides}
            />
            <Label htmlFor="show-guides" className="flex items-center gap-1">
              <MousePointer2 className="w-4 h-4" />
              Guides
            </Label>
          </div>
        </div>
      </div>

      {/* Preview Canvas */}
      <div
        ref={previewRef}
        className={`relative bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg overflow-hidden ${
          isFullscreen ? 'fixed inset-4 z-50 bg-white' : 'h-96'
        } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Canvas Content */}
        <div
          className="flex items-center justify-center w-full h-full"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px)`
          }}
        >
          <div
            className="relative bg-white shadow-lg rounded-lg overflow-hidden"
            style={{
              width: currentMode.width,
              height: currentMode.height,
              transform: `scale(${zoom / 100})`
            }}
          >
            {/* Logo SVG */}
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
            
            {/* Grid Overlay */}
            <GridOverlay />
            
            {/* Guides Overlay */}
            <GuidesOverlay />
          </div>
        </div>

        {/* Zoom Info */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs font-mono">
          {zoom}% • {currentMode.width}×{currentMode.height}
        </div>

        {/* Pan Info */}
        {(panOffset.x !== 0 || panOffset.y !== 0) && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs font-mono">
            <Move className="w-3 h-3 inline mr-1" />
            {Math.round(panOffset.x)}, {Math.round(panOffset.y)}
          </div>
        )}
      </div>

      {/* Preview Actions */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Use mouse wheel to zoom, drag to pan
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export Preview
          </Button>
        </div>
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium mb-2">Keyboard Shortcuts</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div><kbd className="bg-white px-1 rounded">Ctrl/Cmd + +</kbd> Zoom In</div>
          <div><kbd className="bg-white px-1 rounded">Ctrl/Cmd + -</kbd> Zoom Out</div>
          <div><kbd className="bg-white px-1 rounded">Ctrl/Cmd + 0</kbd> Reset Zoom</div>
          <div><kbd className="bg-white px-1 rounded">Ctrl/Cmd + G</kbd> Toggle Grid</div>
        </div>
      </div>
    </Card>
  );
};