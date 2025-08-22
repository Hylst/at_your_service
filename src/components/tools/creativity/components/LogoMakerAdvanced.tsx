import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Sparkles, 
  Settings, 
  Palette, 
  Download, 
  Eye, 
  Layers, 
  Wand2,
  RotateCcw,
  Save,
  Share2,
  Crown,
  Zap,
  Monitor,
  Smartphone,
  Printer
} from 'lucide-react';
import { LogoSettings } from '../types/logoTypes';
import { LogoControlsModern } from './LogoControlsModern';
import { LogoPreviewModern } from './LogoPreviewModern';
import { IconLibrary } from './IconLibrary';
import { LogoTemplatesAdvanced } from './LogoTemplatesAdvanced';
import { LogoEffectsAdvanced, LogoEffects, defaultLogoEffects } from './LogoEffectsAdvanced';
import { LogoExportAdvanced } from './LogoExportAdvanced';
import { presetLogos } from '../data/logoPresets';

// Default logo settings
const defaultLogoSettings: LogoSettings = {
  text: 'Mon Logo',
  fontSize: 28,
  fontFamily: 'Inter, sans-serif',
  fontWeight: '600',
  textColor: '#1F2937',
  backgroundColor: '#FFFFFF',
  shape: 'rounded',
  shapeColor: '#3B82F6',
  icon: '⭐',
  iconSize: 24,
  iconColor: '#3B82F6',
  layout: 'horizontal',
  padding: 16,
  borderWidth: 0,
  borderColor: '#E5E7EB'
};

interface LogoMakerAdvancedProps {
  className?: string;
}

/**
 * Advanced Logo Maker with modern UI, professional templates, and visual effects
 */
export const LogoMakerAdvanced = ({ className = "" }: LogoMakerAdvancedProps) => {
  const [logoSettings, setLogoSettings] = useState<LogoSettings>(defaultLogoSettings);
  const [logoEffects, setLogoEffects] = useState<LogoEffects>(defaultLogoEffects);
  const [activeTab, setActiveTab] = useState('design');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile' | 'print'>('desktop');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [savedLogos, setSavedLogos] = useState<Array<{ settings: LogoSettings; effects: LogoEffects; name: string; timestamp: number }>>([]);
  const [currentLogoName, setCurrentLogoName] = useState('');

  /**
   * Load saved logos from localStorage on component mount
   */
  useEffect(() => {
    const saved = localStorage.getItem('advanced-logo-maker-saved');
    if (saved) {
      try {
        setSavedLogos(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved logos:', error);
      }
    }
  }, []);

  /**
   * Save current logo to localStorage
   */
  const saveCurrentLogo = () => {
    const name = currentLogoName || `Logo ${Date.now()}`;
    const newSavedLogo = {
      settings: logoSettings,
      effects: logoEffects,
      name,
      timestamp: Date.now()
    };
    
    const updatedSaved = [...savedLogos, newSavedLogo];
    setSavedLogos(updatedSaved);
    localStorage.setItem('advanced-logo-maker-saved', JSON.stringify(updatedSaved));
    setCurrentLogoName('');
  };

  /**
   * Load a saved logo
   */
  const loadSavedLogo = (saved: typeof savedLogos[0]) => {
    setLogoSettings(saved.settings);
    setLogoEffects(saved.effects);
    setCurrentLogoName(saved.name);
  };

  /**
   * Reset logo to default settings
   */
  const resetLogo = () => {
    setLogoSettings(defaultLogoSettings);
    setLogoEffects(defaultLogoEffects);
    setCurrentLogoName('');
  };

  /**
   * Apply a template from the templates library
   */
  const applyTemplate = (template: { settings: LogoSettings }) => {
    setLogoSettings(template.settings);
    // Reset effects when applying template
    setLogoEffects(defaultLogoEffects);
  };

  /**
   * Handle icon selection from icon library
   */
  const handleIconSelect = (icon: string) => {
    setLogoSettings(prev => ({ ...prev, icon }));
  };

  /**
   * Toggle dark mode
   */
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Apply dark mode to document
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  /**
   * Get active effects count
   */
  const getActiveEffectsCount = () => {
    return Object.values(logoEffects).filter(value => 
      typeof value === 'boolean' ? value : false
    ).length;
  };

  /**
   * Share logo (copy settings to clipboard)
   */
  const shareLogo = async () => {
    const shareData = {
      settings: logoSettings,
      effects: logoEffects,
      timestamp: Date.now()
    };
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(shareData, null, 2));
      // Could show a toast notification here
    } catch (error) {
      console.error('Failed to share logo:', error);
    }
  };

  return (
    <div className={`w-full max-w-7xl mx-auto p-4 space-y-6 ${isDarkMode ? 'dark' : ''} ${className}`}>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Créateur de Logo Avancé
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Créez des logos professionnels avec des effets visuels modernes
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Stats Badges */}
              <Badge variant="outline" className="flex items-center gap-1">
                <Palette className="w-3 h-3" />
                {getActiveEffectsCount()} effets
              </Badge>
              
              <Badge variant="outline" className="flex items-center gap-1">
                <Save className="w-3 h-3" />
                {savedLogos.length} sauvés
              </Badge>
              
              {/* Quick Actions */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className="flex items-center gap-1"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={shareLogo}
                className="flex items-center gap-1"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={resetLogo}
                className="flex items-center gap-1"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Controls */}
        <div className="lg:col-span-1 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="design" className="flex items-center gap-1">
                <Settings className="w-4 h-4" />
                Design
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-1">
                <Layers className="w-4 h-4" />
                Templates
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="design" className="space-y-4 mt-4">
              {/* Logo Controls */}
              <LogoControlsModern
                logo={logoSettings}
                onUpdate={(updates) => setLogoSettings(prev => ({ ...prev, ...updates }))}
              />
              
              {/* Icon Library */}
              <IconLibrary
                selectedIcon={logoSettings.icon}
                onIconSelect={handleIconSelect}
              />
            </TabsContent>
            
            <TabsContent value="templates" className="mt-4">
              <LogoTemplatesAdvanced
                onTemplateSelect={applyTemplate}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Center Panel - Preview */}
        <div className="lg:col-span-1 space-y-4">
          {/* Preview Controls */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Aperçu en Temps Réel
                </CardTitle>
                
                <div className="flex gap-1">
                  {(['desktop', 'mobile', 'print'] as const).map(mode => (
                    <Button
                      key={mode}
                      variant={previewMode === mode ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewMode(mode)}
                      className="px-2"
                    >
                      {mode === 'desktop' && <Monitor className="w-4 h-4" />}
                      {mode === 'mobile' && <Smartphone className="w-4 h-4" />}
                      {mode === 'print' && <Printer className="w-4 h-4" />}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <LogoPreviewModern
                logo={logoSettings}
                className="w-full"
              />
            </CardContent>
          </Card>
          
          {/* Saved Logos */}
          {savedLogos.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  Logos Sauvegardés
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {savedLogos.slice(-5).reverse().map((saved, index) => (
                    <div key={saved.timestamp} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                      <div>
                        <p className="text-sm font-medium">{saved.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(saved.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => loadSavedLogo(saved)}
                      >
                        Charger
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Panel - Effects & Export */}
        <div className="lg:col-span-1 space-y-4">
          <Tabs defaultValue="effects">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="effects" className="flex items-center gap-1">
                <Wand2 className="w-4 h-4" />
                Effets
              </TabsTrigger>
              <TabsTrigger value="export" className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                Export
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="effects" className="mt-4">
              <LogoEffectsAdvanced
                effects={logoEffects}
                onEffectsChange={setLogoEffects}
                logoSettings={logoSettings}
              />
            </TabsContent>
            
            <TabsContent value="export" className="mt-4">
              <LogoExportAdvanced
                logoSettings={logoSettings}
                logoEffects={logoEffects}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Bottom Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nom du logo..."
                  value={currentLogoName}
                  onChange={(e) => setCurrentLogoName(e.target.value)}
                  className="px-3 py-1 border rounded text-sm"
                />
                <Button
                  size="sm"
                  onClick={saveCurrentLogo}
                  disabled={!currentLogoName.trim()}
                  className="flex items-center gap-1"
                >
                  <Save className="w-4 h-4" />
                  Sauvegarder
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Sparkles className="w-4 h-4" />
              <span>Créateur de Logo Avancé - Version Pro</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Highlights */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🚀 Fonctionnalités Avancées Activées
            </h3>
            <p className="text-sm text-gray-600">
              Interface moderne • 500+ icônes • Templates professionnels • Effets visuels • Export multi-format
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-xs text-gray-500">Icônes Pro</div>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">50+</div>
              <div className="text-xs text-gray-500">Templates</div>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600">15+</div>
              <div className="text-xs text-gray-500">Effets Visuels</div>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-orange-600">6</div>
              <div className="text-xs text-gray-500">Formats Export</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogoMakerAdvanced;