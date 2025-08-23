import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Undo,
  Redo,
  History,
  Clock,
  Trash2,
  RotateCcw,
  Eye,
  Type,
  Palette,
  Move,
  Copy,
  Plus,
  Minus
} from 'lucide-react';
import { HistoryEntry } from './logoTypes';

interface HistoryPanelProps {
  history: HistoryEntry[];
  currentIndex: number;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onJumpToEntry: (index: number) => void;
  onClearHistory: () => void;
}

/**
 * History Panel component for managing logo modification history
 * Provides undo/redo functionality and history navigation
 */
export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  currentIndex,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onJumpToEntry,
  onClearHistory
}) => {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'add_layer':
        return <Plus className="w-3 h-3" />;
      case 'delete_layer':
        return <Minus className="w-3 h-3" />;
      case 'duplicate_layer':
        return <Copy className="w-3 h-3" />;
      case 'update_text':
        return <Type className="w-3 h-3" />;
      case 'update_color':
        return <Palette className="w-3 h-3" />;
      case 'move_layer':
        return <Move className="w-3 h-3" />;
      case 'toggle_visibility':
        return <Eye className="w-3 h-3" />;
      case 'reorder_layer':
        return <RotateCcw className="w-3 h-3" />;
      default:
        return <History className="w-3 h-3" />;
    }
  };

  const formatTime = (timestamp: number | Date) => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'add_layer':
      case 'duplicate_layer':
        return 'bg-green-100 text-green-700';
      case 'delete_layer':
        return 'bg-red-100 text-red-700';
      case 'update_text':
      case 'update_color':
        return 'bg-blue-100 text-blue-700';
      case 'move_layer':
      case 'reorder_layer':
        return 'bg-purple-100 text-purple-700';
      case 'toggle_visibility':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4" />
            History
            <Badge variant="secondary" className="text-xs">
              {history.length}
            </Badge>
          </div>
          
          {/* Clear History Button */}
          {history.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onClearHistory}
              className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
              title="Clear History"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Undo/Redo Controls */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onUndo}
            disabled={!canUndo}
            className="flex-1 flex items-center gap-2"
          >
            <Undo className="w-3 h-3" />
            Undo
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onRedo}
            disabled={!canRedo}
            className="flex-1 flex items-center gap-2"
          >
            <Redo className="w-3 h-3" />
            Redo
          </Button>
        </div>

        {/* History List */}
        <ScrollArea className="h-64">
          <div className="space-y-1">
            {history.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No history yet</p>
                <p className="text-xs opacity-75">Make changes to see history</p>
              </div>
            ) : (
              history.map((entry, index) => {
                const isCurrent = index === currentIndex;
                const isFuture = index > currentIndex;
                
                return (
                  <div
                    key={entry.id}
                    className={`group p-2 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                      isCurrent
                        ? 'border-blue-500 bg-blue-50'
                        : isFuture
                        ? 'border-gray-200 opacity-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => onJumpToEntry(index)}
                  >
                    <div className="flex items-start gap-2">
                      {/* Action Icon */}
                      <div className={`p-1 rounded-full ${getActionColor(entry.action)}`}>
                        {getActionIcon(entry.action)}
                      </div>
                      
                      {/* Action Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium truncate">
                            {entry.description}
                          </h4>
                          {isCurrent && (
                            <Badge variant="default" className="text-xs ml-2">
                              Current
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(entry.timestamp)}</span>
                          <span>•</span>
                          <span>#{index + 1}</span>
                        </div>
                        
                        {/* Additional Details */}
                        {entry.details && (
                          <p className="text-xs text-gray-600 mt-1 truncate">
                            {entry.details}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Jump to Entry Indicator */}
                    {!isCurrent && (
                      <div className="mt-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to jump to this state
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
        
        {/* History Statistics */}
        {history.length > 0 && (
          <div className="pt-2 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
              <div>
                <span className="font-medium">Current:</span> #{currentIndex + 1}
              </div>
              <div>
                <span className="font-medium">Total:</span> {history.length}
              </div>
            </div>
            
            {/* Action Type Breakdown */}
            <div className="mt-2 flex flex-wrap gap-1">
              {Object.entries(
                history.reduce((acc, entry) => {
                  acc[entry.action] = (acc[entry.action] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([action, count]) => (
                <Badge
                  key={action}
                  variant="secondary"
                  className="text-xs px-1 py-0"
                >
                  {action.replace('_', ' ')}: {count}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Keyboard Shortcuts Info */}
        <div className="pt-2 border-t border-gray-200">
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex justify-between">
              <span>Undo:</span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl+Z</kbd>
            </div>
            <div className="flex justify-between">
              <span>Redo:</span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl+Y</kbd>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};