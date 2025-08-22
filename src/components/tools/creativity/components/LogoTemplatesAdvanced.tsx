import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Star, 
  Filter,
  Grid3X3,
  List,
  Sparkles,
  Building2,
  Stethoscope,
  GraduationCap,
  Utensils,
  Palette,
  Code,
  Dumbbell,
  Leaf,
  ShoppingBag,
  Users,
  Briefcase,
  Camera,
  Music,
  Car,
  Home,
  Heart,
  Zap,
  Crown,
  Shield
} from 'lucide-react';
import { LogoSettings, LogoPreset } from '../types/logoTypes';
import { LogoPreviewCompact } from './LogoPreviewModern';

// Professional logo templates by industry
const logoTemplates: Record<string, { name: string; icon: any; templates: LogoPreset[] }> = {
  technology: {
    name: 'Technologie',
    icon: Code,
    templates: [
      {
        name: 'Tech Startup Modern',
        settings: {
          text: 'TechFlow',
          fontSize: 28,
          fontFamily: 'Inter, sans-serif',
          fontWeight: '600',
          textColor: '#1E40AF',
          backgroundColor: '#F8FAFC',
          shape: 'rounded',
          shapeColor: '#3B82F6',
          icon: 'Code',
          iconSize: 24,
          iconColor: '#1E40AF',
          layout: 'horizontal',
          padding: 16,
          borderWidth: 0,
          borderColor: '#E2E8F0'
        }
      },
      {
        name: 'AI & Machine Learning',
        settings: {
          text: 'NeuralNet',
          fontSize: 26,
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '500',
          textColor: '#7C3AED',
          backgroundColor: '#FAFAFA',
          shape: 'hexagon',
          shapeColor: '#8B5CF6',
          icon: 'Zap',
          iconSize: 28,
          iconColor: '#7C3AED',
          layout: 'vertical',
          padding: 20,
          borderWidth: 1,
          borderColor: '#8B5CF6'
        }
      },
      {
        name: 'SaaS Platform',
        settings: {
          text: 'CloudSync',
          fontSize: 30,
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '700',
          textColor: '#FFFFFF',
          backgroundColor: '#1F2937',
          shape: 'rounded',
          shapeColor: '#10B981',
          icon: 'Shield',
          iconSize: 26,
          iconColor: '#10B981',
          layout: 'horizontal',
          padding: 18,
          borderWidth: 0,
          borderColor: '#374151'
        }
      },
      {
        name: 'Mobile App',
        settings: {
          text: 'AppVibe',
          fontSize: 24,
          fontFamily: 'Inter, sans-serif',
          fontWeight: '600',
          textColor: '#EC4899',
          backgroundColor: '#FDF2F8',
          shape: 'circle',
          shapeColor: '#F472B6',
          icon: 'Sparkles',
          iconSize: 22,
          iconColor: '#EC4899',
          layout: 'vertical',
          padding: 14,
          borderWidth: 2,
          borderColor: '#F472B6'
        }
      }
    ]
  },
  healthcare: {
    name: 'Santé & Médical',
    icon: Stethoscope,
    templates: [
      {
        name: 'Clinique Moderne',
        settings: {
          text: 'MediCare',
          fontSize: 28,
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          textColor: '#0F766E',
          backgroundColor: '#F0FDFA',
          shape: 'rounded',
          shapeColor: '#14B8A6',
          icon: 'Heart',
          iconSize: 26,
          iconColor: '#0F766E',
          layout: 'horizontal',
          padding: 18,
          borderWidth: 1,
          borderColor: '#14B8A6'
        }
      },
      {
        name: 'Pharmacie',
        settings: {
          text: 'PharmaPlus',
          fontSize: 26,
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '600',
          textColor: '#1E40AF',
          backgroundColor: '#EFF6FF',
          shape: 'circle',
          shapeColor: '#3B82F6',
          icon: 'Shield',
          iconSize: 24,
          iconColor: '#1E40AF',
          layout: 'vertical',
          padding: 16,
          borderWidth: 2,
          borderColor: '#3B82F6'
        }
      },
      {
        name: 'Wellness Center',
        settings: {
          text: 'Wellness',
          fontSize: 30,
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '400',
          textColor: '#059669',
          backgroundColor: '#ECFDF5',
          shape: 'none',
          shapeColor: '#10B981',
          icon: 'Leaf',
          iconSize: 28,
          iconColor: '#059669',
          layout: 'horizontal',
          padding: 20,
          borderWidth: 0,
          borderColor: '#D1FAE5'
        }
      }
    ]
  },
  education: {
    name: 'Éducation',
    icon: GraduationCap,
    templates: [
      {
        name: 'École Moderne',
        settings: {
          text: 'EduTech',
          fontSize: 28,
          fontFamily: 'Inter, sans-serif',
          fontWeight: '600',
          textColor: '#1D4ED8',
          backgroundColor: '#EFF6FF',
          shape: 'rounded',
          shapeColor: '#3B82F6',
          icon: 'GraduationCap',
          iconSize: 26,
          iconColor: '#1D4ED8',
          layout: 'horizontal',
          padding: 18,
          borderWidth: 1,
          borderColor: '#3B82F6'
        }
      },
      {
        name: 'Formation en Ligne',
        settings: {
          text: 'LearnHub',
          fontSize: 26,
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '500',
          textColor: '#7C2D12',
          backgroundColor: '#FEF7ED',
          shape: 'hexagon',
          shapeColor: '#EA580C',
          icon: 'Sparkles',
          iconSize: 24,
          iconColor: '#7C2D12',
          layout: 'vertical',
          padding: 16,
          borderWidth: 0,
          borderColor: '#FDBA74'
        }
      }
    ]
  },
  restaurant: {
    name: 'Restaurant & Food',
    icon: Utensils,
    templates: [
      {
        name: 'Restaurant Élégant',
        settings: {
          text: 'Bistro',
          fontSize: 32,
          fontFamily: "'Playfair Display', serif",
          fontWeight: '600',
          textColor: '#92400E',
          backgroundColor: '#FEF3C7',
          shape: 'circle',
          shapeColor: '#F59E0B',
          icon: 'Crown',
          iconSize: 28,
          iconColor: '#92400E',
          layout: 'vertical',
          padding: 22,
          borderWidth: 2,
          borderColor: '#F59E0B'
        }
      },
      {
        name: 'Food Truck',
        settings: {
          text: 'StreetEats',
          fontSize: 24,
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '700',
          textColor: '#DC2626',
          backgroundColor: '#FEF2F2',
          shape: 'rounded',
          shapeColor: '#EF4444',
          icon: 'Car',
          iconSize: 22,
          iconColor: '#DC2626',
          layout: 'horizontal',
          padding: 16,
          borderWidth: 2,
          borderColor: '#EF4444'
        }
      },
      {
        name: 'Café Moderne',
        settings: {
          text: 'CoffeeLab',
          fontSize: 26,
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          textColor: '#78350F',
          backgroundColor: '#FEF7ED',
          shape: 'circle',
          shapeColor: '#D97706',
          icon: 'Zap',
          iconSize: 24,
          iconColor: '#78350F',
          layout: 'horizontal',
          padding: 18,
          borderWidth: 1,
          borderColor: '#D97706'
        }
      }
    ]
  },
  creative: {
    name: 'Créatif & Design',
    icon: Palette,
    templates: [
      {
        name: 'Studio Design',
        settings: {
          text: 'CreativeStudio',
          fontSize: 24,
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '600',
          textColor: '#7C3AED',
          backgroundColor: '#FAF5FF',
          shape: 'hexagon',
          shapeColor: '#8B5CF6',
          icon: 'Palette',
          iconSize: 26,
          iconColor: '#7C3AED',
          layout: 'horizontal',
          padding: 16,
          borderWidth: 0,
          borderColor: '#C4B5FD'
        }
      },
      {
        name: 'Photographe',
        settings: {
          text: 'PhotoArt',
          fontSize: 28,
          fontFamily: 'Inter, sans-serif',
          fontWeight: '400',
          textColor: '#1F2937',
          backgroundColor: '#F9FAFB',
          shape: 'square',
          shapeColor: '#6B7280',
          icon: 'Camera',
          iconSize: 24,
          iconColor: '#1F2937',
          layout: 'vertical',
          padding: 20,
          borderWidth: 1,
          borderColor: '#6B7280'
        }
      },
      {
        name: 'Agence Créative',
        settings: {
          text: 'Pixel',
          fontSize: 30,
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: '700',
          textColor: '#FFFFFF',
          backgroundColor: '#111827',
          shape: 'rounded',
          shapeColor: '#F59E0B',
          icon: 'Sparkles',
          iconSize: 28,
          iconColor: '#F59E0B',
          layout: 'horizontal',
          padding: 18,
          borderWidth: 0,
          borderColor: '#374151'
        }
      }
    ]
  },
  fitness: {
    name: 'Sport & Fitness',
    icon: Dumbbell,
    templates: [
      {
        name: 'Salle de Sport',
        settings: {
          text: 'FitZone',
          fontSize: 28,
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '700',
          textColor: '#DC2626',
          backgroundColor: '#FEF2F2',
          shape: 'hexagon',
          shapeColor: '#EF4444',
          icon: 'Dumbbell',
          iconSize: 26,
          iconColor: '#DC2626',
          layout: 'horizontal',
          padding: 18,
          borderWidth: 2,
          borderColor: '#EF4444'
        }
      },
      {
        name: 'Coach Personnel',
        settings: {
          text: 'PowerFit',
          fontSize: 26,
          fontFamily: 'Inter, sans-serif',
          fontWeight: '600',
          textColor: '#FFFFFF',
          backgroundColor: '#1F2937',
          shape: 'circle',
          shapeColor: '#10B981',
          icon: 'Zap',
          iconSize: 24,
          iconColor: '#10B981',
          layout: 'vertical',
          padding: 16,
          borderWidth: 0,
          borderColor: '#374151'
        }
      }
    ]
  },
  business: {
    name: 'Business & Finance',
    icon: Briefcase,
    templates: [
      {
        name: 'Consulting',
        settings: {
          text: 'ProConsult',
          fontSize: 26,
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          textColor: '#1E40AF',
          backgroundColor: '#EFF6FF',
          shape: 'rounded',
          shapeColor: '#3B82F6',
          icon: 'Briefcase',
          iconSize: 24,
          iconColor: '#1E40AF',
          layout: 'horizontal',
          padding: 18,
          borderWidth: 1,
          borderColor: '#3B82F6'
        }
      },
      {
        name: 'Finance',
        settings: {
          text: 'FinanceHub',
          fontSize: 28,
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '600',
          textColor: '#059669',
          backgroundColor: '#ECFDF5',
          shape: 'square',
          shapeColor: '#10B981',
          icon: 'Shield',
          iconSize: 26,
          iconColor: '#059669',
          layout: 'horizontal',
          padding: 20,
          borderWidth: 2,
          borderColor: '#10B981'
        }
      }
    ]
  },
  ecommerce: {
    name: 'E-commerce',
    icon: ShoppingBag,
    templates: [
      {
        name: 'Boutique en Ligne',
        settings: {
          text: 'ShopStyle',
          fontSize: 26,
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '600',
          textColor: '#EC4899',
          backgroundColor: '#FDF2F8',
          shape: 'rounded',
          shapeColor: '#F472B6',
          icon: 'ShoppingBag',
          iconSize: 24,
          iconColor: '#EC4899',
          layout: 'horizontal',
          padding: 16,
          borderWidth: 1,
          borderColor: '#F472B6'
        }
      },
      {
        name: 'Marketplace',
        settings: {
          text: 'MarketPlace',
          fontSize: 24,
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          textColor: '#7C2D12',
          backgroundColor: '#FEF7ED',
          shape: 'hexagon',
          shapeColor: '#EA580C',
          icon: 'Users',
          iconSize: 22,
          iconColor: '#7C2D12',
          layout: 'vertical',
          padding: 18,
          borderWidth: 0,
          borderColor: '#FDBA74'
        }
      }
    ]
  }
};

interface LogoTemplatesAdvancedProps {
  onTemplateSelect: (template: LogoPreset) => void;
  className?: string;
}

/**
 * Advanced logo templates component with professional templates by industry
 */
export const LogoTemplatesAdvanced = ({ onTemplateSelect, className = "" }: LogoTemplatesAdvancedProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'industry' | 'recent'>('name');

  /**
   * Get all templates with industry information
   */
  const allTemplates = useMemo(() => {
    const templates: Array<LogoPreset & { industry: string; industryName: string; industryIcon: any }> = [];
    
    Object.entries(logoTemplates).forEach(([industryKey, industry]) => {
      industry.templates.forEach(template => {
        templates.push({
          ...template,
          industry: industryKey,
          industryName: industry.name,
          industryIcon: industry.icon
        });
      });
    });
    
    return templates;
  }, []);

  /**
   * Filter and sort templates
   */
  const filteredTemplates = useMemo(() => {
    let filtered = allTemplates;
    
    // Filter by industry
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(template => template.industry === selectedIndustry);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.industryName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'industry':
          return a.industryName.localeCompare(b.industryName);
        case 'recent':
          return 0; // Would implement with actual usage data
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [allTemplates, selectedIndustry, searchTerm, sortBy]);

  /**
   * Toggle favorite template
   */
  const toggleFavorite = (templateName: string) => {
    setFavorites(prev => 
      prev.includes(templateName) 
        ? prev.filter(name => name !== templateName)
        : [...prev, templateName]
    );
  };

  /**
   * Render template grid
   */
  const renderTemplateGrid = (templates: typeof filteredTemplates) => {
    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {templates.map((template, index) => {
            const isFavorite = favorites.includes(template.name);
            const IconComponent = template.industryIcon;
            
            return (
              <Card key={`${template.industry}-${index}`} className="group cursor-pointer hover:shadow-lg transition-all duration-200">
                <CardContent className="p-4">
                  <div className="relative">
                    {/* Template Preview */}
                    <div 
                      onClick={() => onTemplateSelect(template)}
                      className="mb-3 group-hover:scale-105 transition-transform duration-200"
                    >
                      <LogoPreviewCompact 
                        logo={template.settings} 
                        className="h-24 border rounded-lg" 
                      />
                    </div>
                    
                    {/* Favorite Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(template.name);
                      }}
                      className={`absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                        isFavorite ? 'opacity-100 text-yellow-500' : ''
                      }`}
                    >
                      <Star className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  {/* Template Info */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <IconComponent className="w-3 h-3" />
                        {template.industryName}
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => onTemplateSelect(template)}
                        className="text-xs h-6"
                      >
                        Utiliser
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="space-y-2">
          {templates.map((template, index) => {
            const isFavorite = favorites.includes(template.name);
            const IconComponent = template.industryIcon;
            
            return (
              <Card key={`${template.industry}-${index}`} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Preview */}
                    <div className="w-16 h-16 flex-shrink-0">
                      <LogoPreviewCompact 
                        logo={template.settings} 
                        className="w-full h-full border rounded" 
                      />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1">{template.name}</h4>
                      <Badge variant="outline" className="text-xs flex items-center gap-1 w-fit">
                        <IconComponent className="w-3 h-3" />
                        {template.industryName}
                      </Badge>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(template.name)}
                        className={`h-8 w-8 p-0 ${isFavorite ? 'text-yellow-500' : ''}`}
                      >
                        <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onTemplateSelect(template)}
                      >
                        Utiliser
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Templates Professionnels
          </div>
          <Badge variant="secondary">
            {filteredTemplates.length} templates
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Rechercher des templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Industrie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les industries</SelectItem>
              {Object.entries(logoTemplates).map(([key, industry]) => {
                const IconComponent = industry.icon;
                return (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4" />
                      {industry.name}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nom</SelectItem>
              <SelectItem value="industry">Industrie</SelectItem>
              <SelectItem value="recent">Récents</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-3"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Templates by Industry Tabs */}
        <Tabs value={selectedIndustry} onValueChange={setSelectedIndustry} className="w-full">
          <ScrollArea className="w-full">
            <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-max">
              <TabsTrigger value="all" className="whitespace-nowrap">
                Tous
              </TabsTrigger>
              {Object.entries(logoTemplates).map(([key, industry]) => {
                const IconComponent = industry.icon;
                return (
                  <TabsTrigger key={key} value={key} className="whitespace-nowrap flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    {industry.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </ScrollArea>
          
          <TabsContent value="all" className="mt-4">
            <ScrollArea className="h-96">
              {renderTemplateGrid(filteredTemplates)}
            </ScrollArea>
          </TabsContent>
          
          {Object.entries(logoTemplates).map(([key, industry]) => (
            <TabsContent key={key} value={key} className="mt-4">
              <ScrollArea className="h-96">
                {renderTemplateGrid(filteredTemplates.filter(t => t.industry === key))}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{allTemplates.length}</div>
            <div className="text-xs text-gray-500">Templates Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{Object.keys(logoTemplates).length}</div>
            <div className="text-xs text-gray-500">Industries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{favorites.length}</div>
            <div className="text-xs text-gray-500">Favoris</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{filteredTemplates.length}</div>
            <div className="text-xs text-gray-500">Filtrés</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};