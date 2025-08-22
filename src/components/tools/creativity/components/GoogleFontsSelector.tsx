/**
 * Google Fonts Selector Component
 * Provides font selection with categorization, search, and real-time preview
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Type, Filter, Star, Loader2 } from 'lucide-react';
import { googleFontsService, GoogleFont } from '../../../../services/googleFonts';

interface GoogleFontsSelectorProps {
  selectedFont: string;
  onFontSelect: (fontFamily: string) => void;
  className?: string;
}

const FONT_CATEGORIES = [
  { id: 'all', label: 'All Fonts', icon: Type },
  { id: 'sans-serif', label: 'Sans Serif', icon: Type },
  { id: 'serif', label: 'Serif', icon: Type },
  { id: 'display', label: 'Display', icon: Type },
  { id: 'handwriting', label: 'Handwriting', icon: Type },
  { id: 'monospace', label: 'Monospace', icon: Type },
] as const;

const SORT_OPTIONS = [
  { id: 'popularity', label: 'Popularity' },
  { id: 'alpha', label: 'Alphabetical' },
  { id: 'trending', label: 'Trending' },
] as const;

export const GoogleFontsSelector: React.FC<GoogleFontsSelectorProps> = ({
  selectedFont,
  onFontSelect,
  className = ''
}) => {
  const [fonts, setFonts] = useState<GoogleFont[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'alpha' | 'trending'>('popularity');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');

  // Load fonts on component mount
  useEffect(() => {
    loadFonts();
    loadFavorites();
  }, [sortBy]);

  // Load fonts from Google Fonts API
  const loadFonts = async () => {
    try {
      setLoading(true);
      const fetchedFonts = await googleFontsService.fetchFonts(sortBy);
      setFonts(fetchedFonts);
    } catch (error) {
      console.error('Error loading fonts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load favorites from localStorage
  const loadFavorites = () => {
    try {
      const savedFavorites = localStorage.getItem('typography-favorite-fonts');
      if (savedFavorites) {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  // Save favorites to localStorage
  const saveFavorites = (newFavorites: Set<string>) => {
    try {
      localStorage.setItem('typography-favorite-fonts', JSON.stringify(Array.from(newFavorites)));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  // Toggle font favorite status
  const toggleFavorite = (fontFamily: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(fontFamily)) {
      newFavorites.delete(fontFamily);
    } else {
      newFavorites.add(fontFamily);
    }
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  // Filter and search fonts
  const filteredFonts = useMemo(() => {
    let result = fonts;

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(font => font.category === selectedCategory);
    }

    // Filter by favorites
    if (showFavorites) {
      result = result.filter(font => favorites.has(font.family));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(font => 
        font.family.toLowerCase().includes(query)
      );
    }

    return result;
  }, [fonts, selectedCategory, showFavorites, searchQuery, favorites]);

  // Handle font selection and loading
  const handleFontSelect = async (font: GoogleFont) => {
    try {
      // Load the font if not already loaded
      if (!googleFontsService.isFontLoaded(font.family)) {
        await googleFontsService.loadFont(font.family, {
          variants: ['400', '500', '600', '700'],
          display: 'swap'
        });
      }
      onFontSelect(font.family);
    } catch (error) {
      console.error('Error loading font:', error);
      // Still select the font even if loading fails
      onFontSelect(font.family);
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Type className="w-5 h-5" />
            Google Fonts
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`p-2 rounded-lg transition-colors ${
                showFavorites
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Show favorites"
            >
              <Star className={`w-4 h-4 ${showFavorites ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search fonts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Preview Text Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Preview text..."
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {FONT_CATEGORIES.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors flex items-center gap-1 ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Font List */}
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-500">Loading fonts...</span>
          </div>
        ) : filteredFonts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {showFavorites ? 'No favorite fonts found' : 'No fonts found'}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredFonts.map(font => (
              <div
                key={font.family}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedFont === font.family ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
                onClick={() => handleFontSelect(font)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{font.family}</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {font.category}
                    </span>
                    {font.popularity && font.popularity > 50 && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(font.family);
                    }}
                    className={`p-1 rounded transition-colors ${
                      favorites.has(font.family)
                        ? 'text-yellow-500 hover:text-yellow-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${favorites.has(font.family) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div 
                  className="text-lg text-gray-700 truncate"
                  style={{ fontFamily: font.family }}
                >
                  {previewText}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {font.variants.length} variant{font.variants.length !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleFontsSelector;