import React, { memo, useCallback, useMemo } from 'react';
import { Eye, EyeOff, Lock, Unlock, Copy, Trash2, Type, Square, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Layer } from '../hooks/useLogoState';

/**
 * Props for LayerPanel component
 */
export interface LayerPanelProps {
  layers: Layer[];
  selectedLayerId: string | null;
  onLayerSelect: (layerId: string) => void;
  onLayerUpdate: (layerId: string, updates: Partial<Layer>) => void;
  onLayerDelete: (layerId: string) => void;
  onLayerDuplicate: (layerId: string) => void;
  onLayerReorder: (layerId: string, newIndex: number) => void;
  onLayerAdd: (type: Layer['type']) => void;
  compact?: boolean;
}

/**
 * Individual layer item component
 */
const LayerItem = memo<{
  layer: Layer;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<Layer>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  compact?: boolean;
}>(({ layer, isSelected, onSelect, onUpdate, onDelete, onDuplicate, compact = false }) => {
  
  /**
   * Get layer type icon
   */
  const getLayerIcon = useCallback(() => {
    const iconSize = compact ? "h-3 w-3" : "h-4 w-4";
    
    switch (layer.type) {
      case 'text':
        return <Type className={iconSize} />;
      case 'shape':
        return <Square className={iconSize} />;
      case 'image':
        return <ImageIcon className={iconSize} />;
      default:
        return <Square className={iconSize} />;
    }
  }, [layer.type, compact]);

  /**
   * Handle content change
   */
  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ content: e.target.value });
  }, [onUpdate]);

  /**
   * Toggle visibility
   */
  const toggleVisibility = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate({ visible: !layer.visible });
  }, [layer.visible, onUpdate]);

  /**
   * Toggle lock
   */
  const toggleLock = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate({ locked: !layer.locked });
  }, [layer.locked, onUpdate]);

  /**
   * Handle duplicate
   */
  const handleDuplicate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDuplicate();
  }, [onDuplicate]);

  /**
   * Handle delete
   */
  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  }, [onDelete]);

  const itemClasses = `
    flex items-center gap-2 p-2 rounded border cursor-pointer transition-all duration-200
    ${compact ? 'p-1 gap-1' : 'p-2 gap-2'}
    ${isSelected 
      ? 'bg-blue-50 border-blue-200 shadow-sm' 
      : 'bg-white border-gray-200 hover:bg-gray-50'
    }
    ${layer.locked ? 'opacity-60' : ''}
    ${!layer.visible ? 'opacity-40' : ''}
  `.trim();

  return (
    <div className={itemClasses} onClick={onSelect}>
      {/* Layer Icon */}
      <div className="flex-shrink-0 text-gray-600">
        {getLayerIcon()}
      </div>
      
      {/* Layer Content */}
      <div className="flex-1 min-w-0">
        <Input
          value={layer.content}
          onChange={handleContentChange}
          className={`
            border-none bg-transparent p-0 h-auto focus:ring-0 focus:border-none
            ${compact ? 'text-xs' : 'text-sm'}
          `.trim()}
          onClick={(e) => e.stopPropagation()}
          placeholder="Layer name..."
        />
        
        {/* Layer info */}
        <div className={`text-gray-500 ${compact ? 'text-[10px]' : 'text-xs'}`}>
          {layer.type} • {Math.round(layer.x)},{Math.round(layer.y)}
        </div>
      </div>
      
      {/* Layer Controls */}
      <div className="flex items-center gap-1">
        {/* Visibility Toggle */}
        <Button
          size="sm"
          variant="ghost"
          onClick={toggleVisibility}
          className={`
            ${compact ? 'h-5 w-5 p-0' : 'h-6 w-6 p-0'}
            ${layer.visible ? 'text-gray-600 hover:text-blue-600' : 'text-gray-400 hover:text-gray-600'}
          `.trim()}
          title={layer.visible ? 'Hide layer' : 'Show layer'}
        >
          {layer.visible ? (
            <Eye className={compact ? "h-3 w-3" : "h-4 w-4"} />
          ) : (
            <EyeOff className={compact ? "h-3 w-3" : "h-4 w-4"} />
          )}
        </Button>
        
        {/* Lock Toggle */}
        <Button
          size="sm"
          variant="ghost"
          onClick={toggleLock}
          className={`
            ${compact ? 'h-5 w-5 p-0' : 'h-6 w-6 p-0'}
            ${layer.locked ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-600'}
          `.trim()}
          title={layer.locked ? 'Unlock layer' : 'Lock layer'}
        >
          {layer.locked ? (
            <Lock className={compact ? "h-3 w-3" : "h-4 w-4"} />
          ) : (
            <Unlock className={compact ? "h-3 w-3" : "h-4 w-4"} />
          )}
        </Button>
        
        {/* Duplicate */}
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDuplicate}
          className={`
            ${compact ? 'h-5 w-5 p-0' : 'h-6 w-6 p-0'}
            text-gray-400 hover:text-green-600
          `.trim()}
          title="Duplicate layer"
        >
          <Copy className={compact ? "h-3 w-3" : "h-4 w-4"} />
        </Button>
        
        {/* Delete */}
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDelete}
          className={`
            ${compact ? 'h-5 w-5 p-0' : 'h-6 w-6 p-0'}
            text-gray-400 hover:text-red-600
          `.trim()}
          title="Delete layer"
        >
          <Trash2 className={compact ? "h-3 w-3" : "h-4 w-4"} />
        </Button>
      </div>
    </div>
  );
});

LayerItem.displayName = 'LayerItem';

/**
 * LayerPanel component for managing layers
 */
export const LayerPanel = memo<LayerPanelProps>(({ 
  layers,
  selectedLayerId,
  onLayerSelect,
  onLayerUpdate,
  onLayerDelete,
  onLayerDuplicate,
  onLayerReorder,
  onLayerAdd,
  compact = false
}) => {
  
  /**
   * Sort layers by z-index (top to bottom in UI)
   */
  const sortedLayers = useMemo(() => {
    return [...layers].sort((a, b) => b.zIndex - a.zIndex);
  }, [layers]);

  /**
   * Handle layer selection
   */
  const handleLayerSelect = useCallback((layerId: string) => {
    onLayerSelect(layerId);
  }, [onLayerSelect]);

  /**
   * Handle layer update
   */
  const handleLayerUpdate = useCallback((layerId: string, updates: Partial<Layer>) => {
    onLayerUpdate(layerId, updates);
  }, [onLayerUpdate]);

  /**
   * Handle layer delete
   */
  const handleLayerDelete = useCallback((layerId: string) => {
    onLayerDelete(layerId);
  }, [onLayerDelete]);

  /**
   * Handle layer duplicate
   */
  const handleLayerDuplicate = useCallback((layerId: string) => {
    onLayerDuplicate(layerId);
  }, [onLayerDuplicate]);

  /**
   * Add layer handlers
   */
  const addTextLayer = useCallback(() => onLayerAdd('text'), [onLayerAdd]);
  const addShapeLayer = useCallback(() => onLayerAdd('shape'), [onLayerAdd]);
  const addImageLayer = useCallback(() => onLayerAdd('image'), [onLayerAdd]);

  if (layers.length === 0) {
    return (
      <div className="text-center py-8">
        <div className={`text-gray-500 mb-4 ${compact ? 'text-xs' : 'text-sm'}`}>
          No layers yet. Add your first layer to get started.
        </div>
        
        <div className={`grid grid-cols-3 ${compact ? 'gap-1' : 'gap-2'}`}>
          <Button
            size="sm"
            variant="outline"
            onClick={addTextLayer}
            className={`flex flex-col items-center ${compact ? 'h-12 text-[10px] px-1' : 'h-16 text-xs px-2'}`}
          >
            <Type className={compact ? "h-4 w-4 mb-1" : "h-6 w-6 mb-2"} />
            Text
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={addShapeLayer}
            className={`flex flex-col items-center ${compact ? 'h-12 text-[10px] px-1' : 'h-16 text-xs px-2'}`}
          >
            <Square className={compact ? "h-4 w-4 mb-1" : "h-6 w-6 mb-2"} />
            Shape
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={addImageLayer}
            className={`flex flex-col items-center ${compact ? 'h-12 text-[10px] px-1' : 'h-16 text-xs px-2'}`}
          >
            <ImageIcon className={compact ? "h-4 w-4 mb-1" : "h-6 w-6 mb-2"} />
            Image
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      {/* Add Layer Buttons */}
      <div className={`grid grid-cols-3 ${compact ? 'gap-1 mb-2' : 'gap-2 mb-4'}`}>
        <Button
          size="sm"
          variant="outline"
          onClick={addTextLayer}
          className={`flex items-center justify-center ${compact ? 'h-6 text-[10px] px-1' : 'h-8 text-xs px-2'}`}
        >
          <Type className={compact ? "h-3 w-3 mr-1" : "h-4 w-4 mr-1"} />
          Text
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={addShapeLayer}
          className={`flex items-center justify-center ${compact ? 'h-6 text-[10px] px-1' : 'h-8 text-xs px-2'}`}
        >
          <Square className={compact ? "h-3 w-3 mr-1" : "h-4 w-4 mr-1"} />
          Shape
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={addImageLayer}
          className={`flex items-center justify-center ${compact ? 'h-6 text-[10px] px-1' : 'h-8 text-xs px-2'}`}
        >
          <ImageIcon className={compact ? "h-3 w-3 mr-1" : "h-4 w-4 mr-1"} />
          Image
        </Button>
      </div>
      
      {/* Layer List */}
      <div className={`${compact ? 'max-h-48' : 'max-h-64'} overflow-y-auto space-y-1`}>
        {sortedLayers.map((layer) => (
          <LayerItem
            key={layer.id}
            layer={layer}
            isSelected={layer.id === selectedLayerId}
            onSelect={() => handleLayerSelect(layer.id)}
            onUpdate={(updates) => handleLayerUpdate(layer.id, updates)}
            onDelete={() => handleLayerDelete(layer.id)}
            onDuplicate={() => handleLayerDuplicate(layer.id)}
            compact={compact}
          />
        ))}
      </div>
      
      {/* Layer Count */}
      <div className={`text-center text-gray-500 ${compact ? 'text-[10px] pt-1' : 'text-xs pt-2'}`}>
        {layers.length} layer{layers.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
});

LayerPanel.displayName = 'LayerPanel';