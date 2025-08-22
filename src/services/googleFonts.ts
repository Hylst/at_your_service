/**
 * Google Fonts API service for fetching and managing font data
 * Provides font loading, categorization, and real-time preview capabilities
 */

export interface GoogleFont {
  family: string;
  variants: string[];
  subsets: string[];
  category: 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace';
  popularity?: number;
  lastModified?: string;
}

export interface GoogleFontsResponse {
  kind: string;
  items: GoogleFont[];
}

export interface FontLoadOptions {
  variants?: string[];
  subsets?: string[];
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
}

class GoogleFontsService {
  private apiKey: string = 'AIzaSyDummyKeyForDemo'; // In production, use environment variable
  private baseUrl: string = 'https://www.googleapis.com/webfonts/v1/webfonts';
  private loadedFonts: Set<string> = new Set();
  private fontCache: Map<string, GoogleFont[]> = new Map();
  private popularFonts: string[] = [
    'Open Sans', 'Roboto', 'Lato', 'Montserrat', 'Oswald', 'Source Sans Pro',
    'Raleway', 'Poppins', 'Merriweather', 'Ubuntu', 'Nunito', 'Playfair Display',
    'Inter', 'Work Sans', 'Fira Sans', 'PT Sans', 'Libre Baskerville',
    'Crimson Text', 'Dancing Script', 'Pacifico'
  ];

  /**
   * Fetch all Google Fonts with optional sorting and filtering
   */
  async fetchFonts(sort: 'alpha' | 'popularity' | 'trending' = 'popularity'): Promise<GoogleFont[]> {
    const cacheKey = `fonts_${sort}`;
    
    if (this.fontCache.has(cacheKey)) {
      return this.fontCache.get(cacheKey)!;
    }

    try {
      // For demo purposes, return a curated list of popular fonts
      // In production, uncomment the API call below
      const demoFonts = this.getDemoFonts();
      
      const sortedFonts = this.sortFonts(demoFonts, sort);
      this.fontCache.set(cacheKey, sortedFonts);
      return sortedFonts;

      // Production API call (uncomment when API key is available):
      /*
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}&sort=${sort}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch fonts: ${response.statusText}`);
      }
      
      const data: GoogleFontsResponse = await response.json();
      const fonts = data.items.map(font => ({
        ...font,
        popularity: this.getPopularityScore(font.family)
      }));
      
      this.fontCache.set(cacheKey, fonts);
      return fonts;
      */
    } catch (error) {
      console.error('Error fetching Google Fonts:', error);
      return this.getDemoFonts();
    }
  }

  /**
   * Get fonts by category
   */
  async getFontsByCategory(category: GoogleFont['category']): Promise<GoogleFont[]> {
    const allFonts = await this.fetchFonts();
    return allFonts.filter(font => font.category === category);
  }

  /**
   * Search fonts by name
   */
  async searchFonts(query: string): Promise<GoogleFont[]> {
    const allFonts = await this.fetchFonts();
    const lowercaseQuery = query.toLowerCase();
    
    return allFonts.filter(font => 
      font.family.toLowerCase().includes(lowercaseQuery)
    );
  }

  /**
   * Load a font dynamically using Web Font Loader
   */
  async loadFont(fontFamily: string, options: FontLoadOptions = {}): Promise<void> {
    const fontKey = `${fontFamily}_${JSON.stringify(options)}`;
    
    if (this.loadedFonts.has(fontKey)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      try {
        // Create font face using CSS Font Loading API
        const variants = options.variants || ['400'];
        const display = options.display || 'swap';
        
        variants.forEach(variant => {
          const weight = this.parseVariant(variant).weight;
          const style = this.parseVariant(variant).style;
          
          const fontUrl = this.buildFontUrl(fontFamily, variant, options.subsets);
          
          // Create @font-face rule
          const fontFace = new FontFace(fontFamily, `url(${fontUrl})`, {
            weight,
            style,
            display
          });
          
          fontFace.load().then(() => {
            document.fonts.add(fontFace);
          }).catch(error => {
            console.warn(`Failed to load font variant ${variant} for ${fontFamily}:`, error);
          });
        });
        
        this.loadedFonts.add(fontKey);
        resolve();
      } catch (error) {
        console.error(`Error loading font ${fontFamily}:`, error);
        reject(error);
      }
    });
  }

  /**
   * Get popular fonts
   */
  async getPopularFonts(limit: number = 20): Promise<GoogleFont[]> {
    const allFonts = await this.fetchFonts('popularity');
    return allFonts.slice(0, limit);
  }

  /**
   * Get trending fonts
   */
  async getTrendingFonts(limit: number = 10): Promise<GoogleFont[]> {
    const allFonts = await this.fetchFonts('trending');
    return allFonts.slice(0, limit);
  }

  /**
   * Check if a font is loaded
   */
  isFontLoaded(fontFamily: string): boolean {
    return Array.from(this.loadedFonts).some(key => key.startsWith(fontFamily));
  }

  /**
   * Clear font cache
   */
  clearCache(): void {
    this.fontCache.clear();
  }

  // Private helper methods

  private getDemoFonts(): GoogleFont[] {
    return [
      { family: 'Inter', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'], category: 'sans-serif', popularity: 100 },
      { family: 'Roboto', variants: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'], category: 'sans-serif', popularity: 95 },
      { family: 'Open Sans', variants: ['300', '400', '500', '600', '700', '800'], subsets: ['latin'], category: 'sans-serif', popularity: 90 },
      { family: 'Lato', variants: ['100', '300', '400', '700', '900'], subsets: ['latin'], category: 'sans-serif', popularity: 85 },
      { family: 'Montserrat', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'], category: 'sans-serif', popularity: 80 },
      { family: 'Poppins', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'], category: 'sans-serif', popularity: 75 },
      { family: 'Source Sans Pro', variants: ['200', '300', '400', '600', '700', '900'], subsets: ['latin'], category: 'sans-serif', popularity: 70 },
      { family: 'Raleway', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'], category: 'sans-serif', popularity: 65 },
      { family: 'Ubuntu', variants: ['300', '400', '500', '700'], subsets: ['latin'], category: 'sans-serif', popularity: 60 },
      { family: 'Nunito', variants: ['200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'], category: 'sans-serif', popularity: 55 },
      { family: 'Work Sans', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'], category: 'sans-serif', popularity: 50 },
      { family: 'Fira Sans', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'], category: 'sans-serif', popularity: 45 },
      { family: 'PT Sans', variants: ['400', '700'], subsets: ['latin'], category: 'sans-serif', popularity: 40 },
      { family: 'Oswald', variants: ['200', '300', '400', '500', '600', '700'], subsets: ['latin'], category: 'sans-serif', popularity: 35 },
      { family: 'Merriweather', variants: ['300', '400', '700', '900'], subsets: ['latin'], category: 'serif', popularity: 30 },
      { family: 'Playfair Display', variants: ['400', '500', '600', '700', '800', '900'], subsets: ['latin'], category: 'serif', popularity: 25 },
      { family: 'Libre Baskerville', variants: ['400', '700'], subsets: ['latin'], category: 'serif', popularity: 20 },
      { family: 'Crimson Text', variants: ['400', '600', '700'], subsets: ['latin'], category: 'serif', popularity: 15 },
      { family: 'Dancing Script', variants: ['400', '500', '600', '700'], subsets: ['latin'], category: 'handwriting', popularity: 10 },
      { family: 'Pacifico', variants: ['400'], subsets: ['latin'], category: 'handwriting', popularity: 5 },
      { family: 'Fira Code', variants: ['300', '400', '500', '600', '700'], subsets: ['latin'], category: 'monospace', popularity: 8 },
      { family: 'JetBrains Mono', variants: ['100', '200', '300', '400', '500', '600', '700', '800'], subsets: ['latin'], category: 'monospace', popularity: 12 },
      { family: 'Source Code Pro', variants: ['200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'], category: 'monospace', popularity: 18 }
    ];
  }

  private sortFonts(fonts: GoogleFont[], sort: string): GoogleFont[] {
    switch (sort) {
      case 'alpha':
        return fonts.sort((a, b) => a.family.localeCompare(b.family));
      case 'popularity':
        return fonts.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      case 'trending':
        return fonts.sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 50);
      default:
        return fonts;
    }
  }

  private getPopularityScore(fontFamily: string): number {
    const index = this.popularFonts.indexOf(fontFamily);
    return index >= 0 ? 100 - index * 5 : 0;
  }

  private parseVariant(variant: string): { weight: string; style: string } {
    if (variant.includes('italic')) {
      return {
        weight: variant.replace('italic', '') || '400',
        style: 'italic'
      };
    }
    return {
      weight: variant || '400',
      style: 'normal'
    };
  }

  private buildFontUrl(family: string, variant: string, subsets?: string[]): string {
    const baseUrl = 'https://fonts.googleapis.com/css2';
    const familyParam = `family=${encodeURIComponent(family)}:wght@${variant}`;
    const subsetParam = subsets ? `&subset=${subsets.join(',')}` : '';
    const displayParam = '&display=swap';
    
    return `${baseUrl}?${familyParam}${subsetParam}${displayParam}`;
  }
}

// Export singleton instance
export const googleFontsService = new GoogleFontsService();
export default googleFontsService;