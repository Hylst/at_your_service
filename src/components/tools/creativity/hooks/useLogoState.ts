import { useState, useCallback, useMemo } from 'react';
import { useHistory } from './useHistory';
import { BlendMode, LayerTransform, VisualEffects, AnimationSettings } from '../logoTypes';

/**
 * Layer interface
 */
export interface Layer {
  id: string;
  name: string;
  type: 'text' | 'shape' | 'image' | 'icon';
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: BlendMode;
  transform: LayerTransform;
  effects: VisualEffects;
  animation: AnimationSettings;
  zIndex: number;
  // Legacy properties for backward compatibility
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
}

/**
 * Logo settings interface
 */
export interface LogoSettings {
  width: number;
  height: number;
  backgroundColor: string;
  title: string;
}

/**
 * UI State interface
 */
export interface UIState {
  selectedLayerId: string | null;
  zoom: number;
  activeTab: 'navigation' | 'content' | 'design' | 'project';
  compactMode: boolean;
  sidebarCollapsed: boolean;
  showGrid: boolean;
  focusMode: boolean;
}

/**
 * Export settings interface
 */
export interface ExportSettings {
  format: 'png' | 'svg' | 'jpg';
  quality: number;
  scale: number;
  transparent: boolean;
  width: number;
  height: number;
  backgroundColor: string;
  includeMetadata: boolean;
}

/**
 * Default values
 */
const DEFAULT_LOGO_SETTINGS: LogoSettings = {
  width: 400,
  height: 400,
  backgroundColor: '#ffffff',
  title: 'My Logo'
};

const DEFAULT_UI_STATE: UIState = {
  selectedLayerId: null,
  zoom: 100,
  activeTab: 'navigation',
  compactMode: false,
  sidebarCollapsed: false,
  showGrid: false,
  focusMode: false
};

const DEFAULT_EXPORT_SETTINGS: ExportSettings = {
  format: 'png',
  quality: 100,
  scale: 1,
  transparent: false,
  width: 400,
  height: 400,
  backgroundColor: '#ffffff',
  includeMetadata: false
};

/**
 * Generate unique ID for layers
 */
const generateId = (): string => {
  return `layer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Custom hook for managing logo state
 */
export const useLogoState = () => {
  const [logoSettings, setLogoSettings] = useState<LogoSettings>(DEFAULT_LOGO_SETTINGS);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [uiState, setUIState] = useState<UIState>(DEFAULT_UI_STATE);
  const [exportSettings, setExportSettings] = useState<ExportSettings>(DEFAULT_EXPORT_SETTINGS);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [focusMode, setFocusMode] = useState<boolean>(false);

  // History management
  const {
    history,
    addToHistory,
    undo: historyUndo,
    redo: historyRedo,
    jumpToHistoryEntry,
    canUndo,
    canRedo
  } = useHistory({ logoSettings, layers }, 50);

  /**
   * Update logo settings
   */
  const updateLogoSettings = useCallback((updates: Partial<LogoSettings>) => {
    setLogoSettings(prev => {
      const newSettings = { ...prev, ...updates };
      addToHistory({ logoSettings: newSettings, layers }, 'Update Logo Settings');
      return newSettings;
    });
  }, [layers, addToHistory]);

  /**
   * Add a new layer
   */
  const addLayer = useCallback((type: Layer['type'], content: string = '') => {
    const newLayer: Layer = {
      id: generateId(),
      name: type === 'text' ? 'Text Layer' : type === 'shape' ? 'Shape Layer' : type === 'icon' ? 'Icon Layer' : 'Image Layer',
      type,
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
      zIndex: layers.length,
      // Legacy properties for backward compatibility
      content: content || (type === 'text' ? 'New Text' : type === 'shape' ? 'Rectangle' : 'Image'),
      x: logoSettings.width / 2 - 50,
      y: logoSettings.height / 2 - 25,
      width: 100,
      height: 50,
      rotation: 0,
      fontSize: type === 'text' ? 16 : undefined,
      fontFamily: type === 'text' ? 'Arial' : undefined,
      fontWeight: type === 'text' ? 'normal' : undefined,
      color: type === 'text' ? '#000000' : '#333333',
      backgroundColor: type === 'shape' ? '#cccccc' : undefined,
      borderRadius: type === 'shape' ? 0 : undefined,
      borderWidth: 0,
      borderColor: '#000000'
    };

    setLayers(prev => {
      const newLayers = [...prev, newLayer];
      addToHistory({ logoSettings, layers: newLayers }, `Add ${type} Layer`);
      return newLayers;
    });

    setUIState(prev => ({ ...prev, selectedLayerId: newLayer.id }));
  }, [logoSettings, layers, addToHistory]);

  /**
   * Update a layer
   */
  const updateLayer = useCallback((layerId: string, updates: Partial<Layer>) => {
    setLayers(prev => {
      const newLayers = prev.map(layer => 
        layer.id === layerId ? { ...layer, ...updates } : layer
      );
      addToHistory({ logoSettings, layers: newLayers }, 'Update Layer');
      return newLayers;
    });
  }, [logoSettings, addToHistory]);

  /**
   * Delete a layer
   */
  const deleteLayer = useCallback((layerId: string) => {
    setLayers(prev => {
      const newLayers = prev.filter(layer => layer.id !== layerId);
      addToHistory({ logoSettings, layers: newLayers }, 'Delete Layer');
      return newLayers;
    });

    setUIState(prev => ({
      ...prev,
      selectedLayerId: prev.selectedLayerId === layerId ? null : prev.selectedLayerId
    }));
  }, [logoSettings, addToHistory]);

  /**
   * Duplicate a layer
   */
  const duplicateLayer = useCallback((layerId: string) => {
    const layer = layers.find(l => l.id === layerId);
    if (!layer) return;

    const duplicatedLayer: Layer = {
      ...layer,
      id: generateId(),
      x: layer.x + 20,
      y: layer.y + 20,
      zIndex: layers.length
    };

    setLayers(prev => {
      const newLayers = [...prev, duplicatedLayer];
      addToHistory({ logoSettings, layers: newLayers }, 'Duplicate Layer');
      return newLayers;
    });

    setUIState(prev => ({ ...prev, selectedLayerId: duplicatedLayer.id }));
  }, [layers, logoSettings, addToHistory]);

  /**
   * Reorder layers
   */
  const reorderLayer = useCallback((layerId: string, newIndex: number) => {
    setLayers(prev => {
      const layerIndex = prev.findIndex(l => l.id === layerId);
      if (layerIndex === -1) return prev;

      const newLayers = [...prev];
      const [movedLayer] = newLayers.splice(layerIndex, 1);
      newLayers.splice(newIndex, 0, { ...movedLayer, zIndex: newIndex });

      // Update z-indices
      const reindexedLayers = newLayers.map((layer, index) => ({
        ...layer,
        zIndex: index
      }));

      addToHistory({ logoSettings, layers: reindexedLayers }, 'Reorder Layer');
      return reindexedLayers;
    });
  }, [logoSettings, addToHistory]);

  /**
   * Undo last action
   */
  const undo = useCallback(() => {
    const previousState = historyUndo();
    if (previousState) {
      setLogoSettings(previousState.logoSettings);
      setLayers(previousState.layers);
    }
  }, [historyUndo]);

  /**
   * Redo last undone action
   */
  const redo = useCallback(() => {
    const nextState = historyRedo();
    if (nextState) {
      setLogoSettings(nextState.logoSettings);
      setLayers(nextState.layers);
    }
  }, [historyRedo]);

  /**
   * Jump to specific history entry
   */
  const jumpToHistory = useCallback((index: number) => {
    const targetState = jumpToHistoryEntry(index);
    if (targetState) {
      setLogoSettings(targetState.logoSettings);
      setLayers(targetState.layers);
    }
  }, [jumpToHistoryEntry]);

  /**
   * Toggle focus mode
   */
  const toggleFocusMode = useCallback(() => {
    setFocusMode(prev => !prev);
  }, []);

  /**
   * Set zoom level
   */
  const setZoom = useCallback((zoom: number) => {
    setUIState(prev => ({ ...prev, zoom }));
  }, []);

  /**
   * Select a layer
   */
  const selectLayer = useCallback((layerId: string | null) => {
    setUIState(prev => ({ ...prev, selectedLayerId: layerId }));
  }, []);

  /**
   * Reorder layers (alias for reorderLayer for compatibility)
   */
  const reorderLayers = useCallback((layerId: string, newIndex: number) => {
    reorderLayer(layerId, newIndex);
  }, [reorderLayer]);

  /**
   * Zoom to fit canvas
   */
  const zoomToFit = useCallback(() => {
    // This would typically calculate based on canvas container size
    setUIState(prev => ({ ...prev, zoom: 100 }));
  }, []);

  /**
   * Get selected layer
   */
  const selectedLayer = useMemo(() => {
    return layers.find(layer => layer.id === uiState.selectedLayerId) || null;
  }, [layers, uiState.selectedLayerId]);

  /**
   * Get layers sorted by z-index
   */
  const sortedLayers = useMemo(() => {
    return [...layers].sort((a, b) => a.zIndex - b.zIndex);
  }, [layers]);

  return {
    // State
    logoSettings,
    layers,
    uiState,
    exportSettings,
    showGrid,
    focusMode,
    history,
    selectedLayer,
    sortedLayers,

    // Actions
    updateLogoSettings,
    addLayer,
    updateLayer,
    deleteLayer,
    duplicateLayer,
    reorderLayer,
    reorderLayers,
    selectLayer,
    setZoom,
    setUIState,
    setExportSettings,
    setShowGrid,
    toggleFocusMode,
    zoomToFit,
    undo,
    redo,
    jumpToHistory,

    // History state
    canUndo,
    canRedo
  };
};