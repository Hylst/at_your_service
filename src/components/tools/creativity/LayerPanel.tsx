import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  Trash2,
  Plus,
  ChevronUp,
  ChevronDown,
  Type,
  Square,
  Star,
  Edit3
} from 'lucide-react';
import { Layer, LayerType } from './logoTypes';

interface LayerPanelProps {
  layers: Layer[];
  selectedLayerId?: string;
  onLayerSelect: (layerId: string) => void;
  onLayerUpdate: (layerId: string, updates: Partial<Layer>) => void;
  onLayerDelete: (layerId: string) => void;
  onLayerDuplicate: (layerId: string) => void;
  onLayerReorder: (layerId: string, direction: 'up' | 'down') => void;
  onLayerAdd: (type: LayerType) => void;
}

/**
 * Layer Panel component for managing logo layers
 * Provides layer list, visibility controls, and layer operations
 */
export const LayerPanel: React.FC<LayerPanelProps> = ({
  layers,
  selectedLayerId,
  onLayerSelect,
  onLayerUpdate,
  onLayerDelete,
  onLayerDuplicate,
  onLayerReorder,
  onLayerAdd
}) => {
  const getLayerIcon = (type: LayerType): ReactNode => {
    switch (type) {
      case 'text':
        return <Type className="w-4 h-4" />;
      case 'shape':
        return <Square className="w-4 h-4" />;
      case 'icon':
        return <Star className="w-4 h-4" />;
      default:
        return <Square className="w-4 h-4" />;
    }
  };

  const handleNameEdit = (layerId: string, newName: string) => {
    onLayerUpdate(layerId, { name: newName });
  };

  // Sort layers by zIndex for display (highest first)
  const sortedLayers = [...layers].sort((a, b) => b.zIndex - a.zIndex);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <div className="flex items-center gap-1">
            {getLayerIcon('text')}
            Layers
          </div>
          <Badge variant="secondary" className="text-xs">
            {layers.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Add Layer Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onLayerAdd('text')}
            className="flex items-center gap-1 text-xs"
          >
            <Type className="w-3 h-3" />
            Text
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onLayerAdd('shape')}
            className="flex items-center gap-1 text-xs"
          >
            <Square className="w-3 h-3" />
            Shape
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onLayerAdd('icon')}
            className="flex items-center gap-1 text-xs"
          >
            <Star className="w-3 h-3" />
            Icon
          </Button>
        </div>

        {/* Layer List */}
        <ScrollArea className="h-64">
          <div className="space-y-1">
            {sortedLayers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Type className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No layers yet</p>
                <p className="text-xs opacity-75">Add a layer to get started</p>
              </div>
            ) : (
              sortedLayers.map((layer) => (
                <div
                  key={layer.id}
                  className={`group p-2 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                    selectedLayerId === layer.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => onLayerSelect(layer.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {/* Layer Type Icon */}
                      <div className="text-gray-500">
                        {getLayerIcon(layer.type)}
                      </div>
                      
                      {/* Layer Name - Editable */}
                      <Input
                        value={layer.name}
                        onChange={(e) => handleNameEdit(layer.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-6 text-xs border-none bg-transparent p-0 focus:bg-white focus:border focus:border-gray-300 flex-1"
                      />
                    </div>
                    
                    {/* Layer Controls */}
                    <div className="flex items-center gap-1">
                      {/* Visibility Toggle */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLayerUpdate(layer.id, { visible: !layer.visible });
                        }}
                      >
                        {layer.visible ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3 opacity-50" />
                        )}
                      </Button>
                      
                      {/* Lock Toggle */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLayerUpdate(layer.id, { locked: !layer.locked });
                        }}
                      >
                        {layer.locked ? (
                          <Lock className="w-3 h-3" />
                        ) : (
                          <Unlock className="w-3 h-3 opacity-50" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Layer Info and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        {layer.type}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        z: {layer.zIndex}
                      </span>
                    </div>
                    
                    {/* Layer Actions - Show on hover or selection */}
                    <div className={`flex items-center gap-1 transition-opacity ${
                      selectedLayerId === layer.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      {/* Move Up */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-5 w-5 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLayerReorder(layer.id, 'up');
                        }}
                        disabled={layer.zIndex === Math.max(...layers.map(l => l.zIndex))}
                      >
                        <ChevronUp className="w-3 h-3" />
                      </Button>
                      
                      {/* Move Down */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-5 w-5 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLayerReorder(layer.id, 'down');
                        }}
                        disabled={layer.zIndex === Math.min(...layers.map(l => l.zIndex))}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                      
                      {/* Duplicate */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-5 w-5 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLayerDuplicate(layer.id);
                        }}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      
                      {/* Delete */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-5 w-5 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLayerDelete(layer.id);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Layer Preview Info */}
                  {layer.type === 'text' && 'content' in layer && (
                    <div className="mt-1 text-xs text-gray-500 truncate">
                      "{(layer as any).content}"
                    </div>
                  )}
                  
                  {layer.type === 'icon' && 'iconName' in layer && (
                    <div className="mt-1 text-xs text-gray-500">
                      Icon: {(layer as any).iconName}
                    </div>
                  )}
                  
                  {layer.type === 'shape' && 'shapeType' in layer && (
                    <div className="mt-1 text-xs text-gray-500">
                      Shape: {(layer as any).shapeType}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        
        {/* Layer Statistics */}
        {layers.length > 0 && (
          <div className="pt-2 border-t border-gray-200">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Total: {layers.length}</span>
              <span>Visible: {layers.filter(l => l.visible).length}</span>
              <span>Locked: {layers.filter(l => l.locked).length}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};