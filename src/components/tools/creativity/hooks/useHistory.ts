import { useState, useCallback, useRef } from 'react';
import { HistoryEntry } from '../logoTypes';

/**
 * Interface for a history entry with state
 */
interface HistoryEntryWithState extends Omit<HistoryEntry, 'settings'> {
  state: any;
}

/**
 * Interface for the history state
 */
export interface HistoryState {
  states: HistoryEntryWithState[];
  currentIndex: number;
  entries: HistoryEntryWithState[];
}

/**
 * Custom hook for managing undo/redo history
 * @param initialState - The initial state to track
 * @param maxHistorySize - Maximum number of history entries (default: 50)
 */
export const useHistory = <T>(initialState: T, maxHistorySize: number = 50) => {
  const [history, setHistory] = useState<HistoryState>({
    states: [{ 
      id: `entry-${Date.now()}`,
      state: initialState, 
      action: 'Initial', 
      timestamp: Date.now(),
      description: 'Initial state'
    }],
    currentIndex: 0,
    entries: [{ 
      id: `entry-${Date.now()}`,
      state: initialState, 
      action: 'Initial', 
      timestamp: Date.now(),
      description: 'Initial state'
    }]
  });

  const isUpdatingFromHistory = useRef(false);

  /**
   * Add a new state to history
   */
  const addToHistory = useCallback((newState: T, action: string) => {
    if (isUpdatingFromHistory.current) {
      isUpdatingFromHistory.current = false;
      return;
    }

    setHistory(prev => {
      const newEntry: HistoryEntryWithState = {
        id: `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        state: newState,
        action,
        timestamp: Date.now(),
        description: action.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
      };

      // Remove any states after current index (when undoing then making new changes)
      const newStates = [...prev.states.slice(0, prev.currentIndex + 1), newEntry];
      
      // Limit history size
      const trimmedStates = newStates.length > maxHistorySize 
        ? newStates.slice(-maxHistorySize)
        : newStates;

      return {
        states: trimmedStates,
        currentIndex: trimmedStates.length - 1,
        entries: trimmedStates
      };
    });
  }, [maxHistorySize]);

  /**
   * Undo to previous state
   */
  const undo = useCallback(() => {
    if (history.currentIndex > 0) {
      isUpdatingFromHistory.current = true;
      setHistory(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - 1
      }));
      return history.states[history.currentIndex - 1].state;
    }
    return null;
  }, [history.currentIndex, history.states]);

  /**
   * Redo to next state
   */
  const redo = useCallback(() => {
    if (history.currentIndex < history.states.length - 1) {
      isUpdatingFromHistory.current = true;
      setHistory(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1
      }));
      return history.states[history.currentIndex + 1].state;
    }
    return null;
  }, [history.currentIndex, history.states]);

  /**
   * Jump to a specific history entry
   */
  const jumpToHistoryEntry = useCallback((index: number) => {
    if (index >= 0 && index < history.states.length) {
      isUpdatingFromHistory.current = true;
      setHistory(prev => ({
        ...prev,
        currentIndex: index
      }));
      return history.states[index].state;
    }
    return null;
  }, [history.states]);

  /**
   * Get current state from history
   */
  const getCurrentState = useCallback(() => {
    return history.states[history.currentIndex]?.state ?? null;
  }, [history.states, history.currentIndex]);

  /**
   * Check if undo is available
   */
  const canUndo = history.currentIndex > 0;

  /**
   * Check if redo is available
   */
  const canRedo = history.currentIndex < history.states.length - 1;

  return {
    history,
    addToHistory,
    undo,
    redo,
    jumpToHistoryEntry,
    getCurrentState,
    canUndo,
    canRedo
  };
};