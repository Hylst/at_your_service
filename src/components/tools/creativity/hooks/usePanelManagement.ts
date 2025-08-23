import { useState, useCallback, useEffect, useMemo } from 'react';

/**
 * Panel preset configuration
 */
export interface PanelPreset {
  name: string;
  collapsed: Record<string, boolean>;
}

/**
 * Panel presets configuration
 */
export const PANEL_PRESETS: Record<string, PanelPreset> = {
  default: {
    name: 'Default',
    collapsed: {
      layers: false,
      'view-quick': false,
      'project-actions': true,
      'export-options': true,
      history: true,
      zoom: true
    }
  },
  minimal: {
    name: 'Minimal',
    collapsed: {
      layers: false,
      'view-quick': true,
      'project-actions': true,
      'export-options': true,
      history: true,
      zoom: true
    }
  },
  expanded: {
    name: 'Expanded',
    collapsed: {
      layers: false,
      'view-quick': false,
      'project-actions': false,
      'export-options': false,
      history: false,
      zoom: false
    }
  }
};

/**
 * Panel keywords for search functionality
 */
const PANEL_KEYWORDS: Record<string, string[]> = {
  layers: ['layer', 'layers', 'element', 'object', 'text', 'shape'],
  'view-quick': ['view', 'zoom', 'grid', 'canvas', 'display'],
  'project-actions': ['save', 'load', 'project', 'file', 'open'],
  'export-options': ['export', 'download', 'png', 'svg', 'jpg', 'format'],
  history: ['history', 'undo', 'redo', 'timeline', 'changes'],
  zoom: ['zoom', 'scale', 'fit', 'magnify', 'size']
};

/**
 * Default panel order
 */
const DEFAULT_PANEL_ORDER = ['layers', 'view-quick', 'project-actions', 'export-options', 'history', 'zoom'];

/**
 * Custom hook for managing panel state and interactions
 */
export const usePanelManagement = () => {
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [currentPreset, setCurrentPreset] = useState<string>('default');
  const [panelOrder, setPanelOrder] = useState<string[]>(DEFAULT_PANEL_ORDER);
  const [panelSearchTerm, setPanelSearchTerm] = useState<string>('');
  const [draggedPanel, setDraggedPanel] = useState<string | null>(null);

  /**
   * Load collapsed sections from localStorage on mount
   */
  useEffect(() => {
    const saved = localStorage.getItem('logo-creator-collapsed-sections');
    if (saved) {
      try {
        setCollapsedSections(JSON.parse(saved));
      } catch (error) {
        console.warn('Failed to parse saved collapsed sections:', error);
      }
    }
  }, []);

  /**
   * Load panel order from localStorage on mount
   */
  useEffect(() => {
    const saved = localStorage.getItem('logo-creator-panel-order');
    if (saved) {
      try {
        setPanelOrder(JSON.parse(saved));
      } catch (error) {
        console.warn('Failed to parse saved panel order:', error);
      }
    }
  }, []);

  /**
   * Save collapsed sections to localStorage when changed
   */
  useEffect(() => {
    localStorage.setItem('logo-creator-collapsed-sections', JSON.stringify(collapsedSections));
  }, [collapsedSections]);

  /**
   * Save panel order to localStorage when changed
   */
  useEffect(() => {
    localStorage.setItem('logo-creator-panel-order', JSON.stringify(panelOrder));
  }, [panelOrder]);

  /**
   * Toggle a section's collapsed state
   */
  const toggleSection = useCallback((sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  }, []);

  /**
   * Apply a panel preset
   */
  const applyPreset = useCallback((presetKey: string) => {
    const preset = PANEL_PRESETS[presetKey];
    if (preset) {
      setCollapsedSections(preset.collapsed);
      setCurrentPreset(presetKey);
    }
  }, []);

  /**
   * Collapse all panels
   */
  const collapseAll = useCallback(() => {
    const allCollapsed = Object.keys(PANEL_PRESETS.default.collapsed).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setCollapsedSections(allCollapsed);
    setCurrentPreset('custom');
  }, []);

  /**
   * Expand all panels
   */
  const expandAll = useCallback(() => {
    const allExpanded = Object.keys(PANEL_PRESETS.default.collapsed).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {}
    );
    setCollapsedSections(allExpanded);
    setCurrentPreset('custom');
  }, []);

  /**
   * Reset panel order to default
   */
  const resetPanelOrder = useCallback(() => {
    setPanelOrder(DEFAULT_PANEL_ORDER);
  }, []);

  /**
   * Handle panel drag start
   */
  const handlePanelDragStart = useCallback((panelId: string) => {
    setDraggedPanel(panelId);
  }, []);

  /**
   * Handle panel drag over
   */
  const handlePanelDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  /**
   * Handle panel drop
   */
  const handlePanelDrop = useCallback((targetPanelId: string) => {
    if (!draggedPanel || draggedPanel === targetPanelId) return;

    setPanelOrder(prev => {
      const newOrder = [...prev];
      const draggedIndex = newOrder.indexOf(draggedPanel);
      const targetIndex = newOrder.indexOf(targetPanelId);

      if (draggedIndex !== -1 && targetIndex !== -1) {
        // Remove dragged panel and insert at target position
        newOrder.splice(draggedIndex, 1);
        const adjustedTargetIndex = draggedIndex < targetIndex ? targetIndex - 1 : targetIndex;
        newOrder.splice(adjustedTargetIndex, 0, draggedPanel);
      }

      return newOrder;
    });

    setDraggedPanel(null);
  }, [draggedPanel]);

  /**
   * Handle panel drag end
   */
  const handlePanelDragEnd = useCallback(() => {
    setDraggedPanel(null);
  }, []);

  /**
   * Filter panels based on search term
   */
  const visiblePanels = useMemo(() => {
    if (!panelSearchTerm.trim()) {
      return new Set(Object.keys(PANEL_KEYWORDS));
    }

    const searchLower = panelSearchTerm.toLowerCase();
    const matchingPanels = new Set<string>();

    Object.entries(PANEL_KEYWORDS).forEach(([panelId, keywords]) => {
      const matches = keywords.some(keyword => 
        keyword.toLowerCase().includes(searchLower) ||
        panelId.toLowerCase().includes(searchLower)
      );
      
      if (matches) {
        matchingPanels.add(panelId);
      }
    });

    return matchingPanels;
  }, [panelSearchTerm]);

  /**
   * Handle panel search input
   */
  const handlePanelSearch = useCallback((term: string) => {
    setPanelSearchTerm(term);
  }, []);

  /**
   * Clear panel search
   */
  const clearPanelSearch = useCallback(() => {
    setPanelSearchTerm('');
  }, []);

  /**
   * Check if a panel is visible based on search
   */
  const isPanelVisible = useCallback((panelId: string) => {
    return visiblePanels.has(panelId);
  }, [visiblePanels]);

  return {
    // State
    collapsedSections,
    currentPreset,
    panelOrder,
    panelSearchTerm,
    draggedPanel,
    visiblePanels,

    // Actions
    toggleSection,
    applyPreset,
    collapseAll,
    expandAll,
    resetPanelOrder,
    handlePanelDragStart,
    handlePanelDragOver,
    handlePanelDrop,
    handlePanelDragEnd,
    handlePanelSearch,
    clearPanelSearch,
    isPanelVisible,

    // Constants
    panelPresets: PANEL_PRESETS
  };
};