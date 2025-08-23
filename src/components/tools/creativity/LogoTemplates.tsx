import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Search,
  Star,
  Heart,
  Zap,
  Shield,
  Crown,
  Gem,
  Rocket,
  Building,
  Palette,
  Briefcase,
  Coffee,
  Camera,
  Music,
  Gamepad2,
  Stethoscope,
  GraduationCap,
  Car,
  Home,
  Leaf,
  Dumbbell,
  ShoppingBag,
  Utensils,
  Plane,
  Code,
  Paintbrush,
  Wrench,
  Users,
  TrendingUp,
  Globe,
  Smartphone,
  Headphones,
  Book,
  Award,
  Target,
  Eye,
  Download
} from 'lucide-react';
import { LogoSettings, LogoTemplate, TextLayer, IconLayer, ShapeLayer, BackgroundLayer } from './logoTypes';

interface LogoTemplatesProps {
  onTemplateSelect: (template: LogoTemplate) => void;
  className?: string;
}

/**
 * Professional logo templates organized by industry and style
 */
const logoTemplates: Record<string, LogoTemplate[]> = {
  business: [
    {
      id: 'corporate-shield',
      name: 'Corporate Shield',
      category: 'business',
      description: 'Professional shield design for corporate brands',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Ik01MCAyMEw3MCAzMFY2MEw1MCA4MEwzMCA2MFYzMEw1MCAyMFoiIGZpbGw9IiMzYjgyZjYiLz4KPHRleHQgeD0iNTAiIHk9IjUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIj5TPC90ZXh0Pgo8L3N2Zz4=',
      settings: {
        canvas: { width: 400, height: 400, backgroundColor: '#f8f9fa' },
        layers: [
          {
            id: 'bg',
            type: 'background',
            name: 'Background',
            visible: true,
            locked: false,
            zIndex: 0,
            color: { type: 'solid', value: '#f8f9fa' },
            effects: []
          } as BackgroundLayer,
          {
            id: 'shield',
            type: 'shape',
            name: 'Shield',
            visible: true,
            locked: false,
            zIndex: 1,
            shape: 'shield',
            color: { type: 'solid', value: '#3b82f6' },
            transform: { x: 200, y: 200, rotation: 0, scaleX: 1, scaleY: 1 },
            effects: []
          } as ShapeLayer,
          {
            id: 'text',
            type: 'text',
            name: 'Company Name',
            visible: true,
            locked: false,
            zIndex: 2,
            text: 'SHIELD',
            font: {
              family: 'Arial',
              size: 24,
              weight: 'bold',
              style: 'normal',
              letterSpacing: 2,
              lineHeight: 1.2
            },
            color: { type: 'solid', value: '#ffffff' },
            transform: { x: 200, y: 200, rotation: 0, scaleX: 1, scaleY: 1 },
            effects: []
          } as TextLayer
        ]
      }
    },
    {
      id: 'modern-crown',
      name: 'Modern Crown',
      category: 'business',
      description: 'Elegant crown design for premium brands',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmZmZmIi8+CjxwYXRoIGQ9Ik0yMCA2MEw1MCAyNUw4MCA2MEg2MFY3MEgyMFY2MFoiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I2ZmZDcwMDtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmY4ZjAwO3N0b3Atb3BhY2l0eToxIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjwvdGV4dD4KPC9zdmc+',
      settings: {
        canvas: { width: 400, height: 400, backgroundColor: '#ffffff' },
        layers: [
          {
            id: 'bg',
            type: 'background',
            name: 'Background',
            visible: true,
            locked: false,
            zIndex: 0,
            color: { type: 'solid', value: '#ffffff' },
            effects: []
          } as BackgroundLayer,
          {
            id: 'crown',
            type: 'icon',
            name: 'Crown',
            visible: true,
            locked: false,
            zIndex: 1,
            iconName: 'Crown',
            color: {
              type: 'gradient',
              gradient: {
                type: 'linear',
                angle: 45,
                stops: [
                  { offset: 0, color: '#ffd700' },
                  { offset: 1, color: '#ff8f00' }
                ]
              }
            },
            transform: { x: 200, y: 180, rotation: 0, scaleX: 2, scaleY: 2 },
            effects: []
          } as IconLayer,
          {
            id: 'text',
            type: 'text',
            name: 'Brand Name',
            visible: true,
            locked: false,
            zIndex: 2,
            text: 'PREMIUM',
            font: {
              family: 'Georgia',
              size: 18,
              weight: 'bold',
              style: 'normal',
              letterSpacing: 3,
              lineHeight: 1.2
            },
            color: { type: 'solid', value: '#2d3748' },
            transform: { x: 200, y: 250, rotation: 0, scaleX: 1, scaleY: 1 },
            effects: []
          } as TextLayer
        ]
      }
    }
  ],
  technology: [
    {
      id: 'tech-rocket',
      name: 'Tech Rocket',
      category: 'technology',
      description: 'Dynamic rocket design for tech startups',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMGYxNDI5Ii8+CjxwYXRoIGQ9Ik01MCAyMEw2MCA0MEw1MCA4MEw0MCA0MEw1MCAyMFoiIGZpbGw9IiM2MzY2ZjEiLz4KPHN2ZyB4PSI0NSIgeT0iNDAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Im0xNS41IDEzLjUtMy0zLTMgM3YtMTFsNiA2djVaIi8+Cjwvc3ZnPgo8L3N2Zz4=',
      settings: {
        canvas: { width: 400, height: 400, backgroundColor: '#0f1429' },
        layers: [
          {
            id: 'bg',
            type: 'background',
            name: 'Background',
            visible: true,
            locked: false,
            zIndex: 0,
            color: { type: 'solid', value: '#0f1429' },
            effects: []
          } as BackgroundLayer,
          {
            id: 'rocket',
            type: 'icon',
            name: 'Rocket',
            visible: true,
            locked: false,
            zIndex: 1,
            iconName: 'Rocket',
            color: {
              type: 'gradient',
              gradient: {
                type: 'linear',
                angle: 135,
                stops: [
                  { offset: 0, color: '#6366f1' },
                  { offset: 1, color: '#8b5cf6' }
                ]
              }
            },
            transform: { x: 200, y: 160, rotation: 0, scaleX: 2.5, scaleY: 2.5 },
            effects: [
              {
                type: 'glow',
                color: '#6366f1',
                blur: 10,
                opacity: 0.8
              }
            ]
          } as IconLayer,
          {
            id: 'text',
            type: 'text',
            name: 'Company Name',
            visible: true,
            locked: false,
            zIndex: 2,
            text: 'LAUNCH',
            font: {
              family: 'Inter',
              size: 20,
              weight: 'bold',
              style: 'normal',
              letterSpacing: 4,
              lineHeight: 1.2
            },
            color: { type: 'solid', value: '#ffffff' },
            transform: { x: 200, y: 280, rotation: 0, scaleX: 1, scaleY: 1 },
            effects: []
          } as TextLayer
        ]
      }
    }
  ],
  creative: [
    {
      id: 'artistic-palette',
      name: 'Artistic Palette',
      category: 'creative',
      description: 'Colorful palette design for creative agencies',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMwIiBmaWxsPSJ1cmwoI3JhaW5ib3cpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InJhaW5ib3ciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmYwMDAwO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjE2LjY2JSIgc3R5bGU9InN0b3AtY29sb3I6I2ZmOGYwMDtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIzMy4zMyUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmZmMDA7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iNTAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBmZjAwO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjY2LjY2JSIgc3R5bGU9InN0b3AtY29sb3I6IzAwZmZmZjtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSI4My4zMyUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwZmY7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2ZmMDBmZjtzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4=',
      settings: {
        canvas: { width: 400, height: 400, backgroundColor: '#ffffff' },
        layers: [
          {
            id: 'bg',
            type: 'background',
            name: 'Background',
            visible: true,
            locked: false,
            zIndex: 0,
            color: { type: 'solid', value: '#ffffff' },
            effects: []
          } as BackgroundLayer,
          {
            id: 'palette',
            type: 'icon',
            name: 'Palette',
            visible: true,
            locked: false,
            zIndex: 1,
            iconName: 'Palette',
            color: {
              type: 'gradient',
              gradient: {
                type: 'linear',
                angle: 45,
                stops: [
                  { offset: 0, color: '#ff0000' },
                  { offset: 0.1666, color: '#ff8f00' },
                  { offset: 0.3333, color: '#ffff00' },
                  { offset: 0.5, color: '#00ff00' },
                  { offset: 0.6666, color: '#00ffff' },
                  { offset: 0.8333, color: '#0000ff' },
                  { offset: 1, color: '#ff00ff' }
                ]
              }
            },
            transform: { x: 200, y: 180, rotation: 0, scaleX: 2, scaleY: 2 },
            effects: []
          } as IconLayer,
          {
            id: 'text',
            type: 'text',
            name: 'Studio Name',
            visible: true,
            locked: false,
            zIndex: 2,
            text: 'CREATIVE',
            font: {
              family: 'Helvetica',
              size: 16,
              weight: 'bold',
              style: 'normal',
              letterSpacing: 2,
              lineHeight: 1.2
            },
            color: { type: 'solid', value: '#2d3748' },
            transform: { x: 200, y: 260, rotation: 0, scaleX: 1, scaleY: 1 },
            effects: []
          } as TextLayer
        ]
      }
    }
  ],
  minimal: [
    {
      id: 'clean-circle',
      name: 'Clean Circle',
      category: 'minimal',
      description: 'Simple and clean circular design',
      preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjIwIiBzdHJva2U9IiMyZDM3NDgiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8dGV4dCB4PSI1MCIgeT0iNzUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzJkMzc0OCI+TUlOSU1BTDwvdGV4dD4KPC9zdmc+',
      settings: {
        canvas: { width: 400, height: 400, backgroundColor: '#ffffff' },
        layers: [
          {
            id: 'bg',
            type: 'background',
            name: 'Background',
            visible: true,
            locked: false,
            zIndex: 0,
            color: { type: 'solid', value: '#ffffff' },
            effects: []
          } as BackgroundLayer,
          {
            id: 'circle',
            type: 'shape',
            name: 'Circle',
            visible: true,
            locked: false,
            zIndex: 1,
            shape: 'circle',
            color: { type: 'solid', value: 'transparent' },
            transform: { x: 200, y: 160, rotation: 0, scaleX: 1.5, scaleY: 1.5 },
            effects: [
              {
                type: 'stroke',
                color: '#2d3748',
                width: 3,
                opacity: 1
              }
            ]
          } as ShapeLayer,
          {
            id: 'text',
            type: 'text',
            name: 'Brand Name',
            visible: true,
            locked: false,
            zIndex: 2,
            text: 'MINIMAL',
            font: {
              family: 'Arial',
              size: 16,
              weight: 'normal',
              style: 'normal',
              letterSpacing: 3,
              lineHeight: 1.2
            },
            color: { type: 'solid', value: '#2d3748' },
            transform: { x: 200, y: 260, rotation: 0, scaleX: 1, scaleY: 1 },
            effects: []
          } as TextLayer
        ]
      }
    }
  ]
};

/**
 * Template categories with metadata
 */
const templateCategories = {
  popular: { name: 'Popular', icon: Star },
  business: { name: 'Business', icon: Briefcase },
  technology: { name: 'Technology', icon: Code },
  creative: { name: 'Creative', icon: Palette },
  minimal: { name: 'Minimal', icon: Eye },
  healthcare: { name: 'Healthcare', icon: Stethoscope },
  education: { name: 'Education', icon: GraduationCap },
  automotive: { name: 'Automotive', icon: Car },
  realestate: { name: 'Real Estate', icon: Home },
  environmental: { name: 'Environmental', icon: Leaf },
  fitness: { name: 'Fitness', icon: Dumbbell },
  retail: { name: 'Retail', icon: ShoppingBag },
  food: { name: 'Food & Beverage', icon: Utensils },
  travel: { name: 'Travel', icon: Plane },
  consulting: { name: 'Consulting', icon: Users },
  finance: { name: 'Finance', icon: TrendingUp },
  nonprofit: { name: 'Non-Profit', icon: Heart },
  entertainment: { name: 'Entertainment', icon: Music }
};

/**
 * Professional logo templates component
 */
export const LogoTemplates: React.FC<LogoTemplatesProps> = ({
  onTemplateSelect,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('popular');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Get all templates
  const allTemplates = Object.values(logoTemplates).flat();

  // Get popular templates (most commonly used)
  const popularTemplates = [
    ...logoTemplates.business.slice(0, 2),
    ...logoTemplates.technology.slice(0, 1),
    ...logoTemplates.creative.slice(0, 1),
    ...logoTemplates.minimal.slice(0, 1)
  ];

  // Filter templates based on search and category
  const filteredTemplates = React.useMemo(() => {
    let templates = activeCategory === 'popular' 
      ? popularTemplates 
      : logoTemplates[activeCategory as keyof typeof logoTemplates] || [];

    if (searchTerm) {
      templates = allTemplates.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return templates;
  }, [searchTerm, activeCategory, allTemplates, popularTemplates]);

  // Toggle favorite template
  const toggleFavorite = (templateId: string) => {
    setFavorites(prev => 
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Logo Templates</h3>
          <Badge variant="outline">
            {filteredTemplates.length} templates
          </Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-1 h-auto p-1">
            <TabsTrigger value="popular" className="text-xs flex items-center gap-1">
              <Star className="w-3 h-3" />
              Popular
            </TabsTrigger>
            <TabsTrigger value="business" className="text-xs flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              Business
            </TabsTrigger>
            <TabsTrigger value="technology" className="text-xs flex items-center gap-1">
              <Code className="w-3 h-3" />
              Tech
            </TabsTrigger>
            <TabsTrigger value="creative" className="text-xs flex items-center gap-1">
              <Palette className="w-3 h-3" />
              Creative
            </TabsTrigger>
            <TabsTrigger value="minimal" className="text-xs flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Minimal
            </TabsTrigger>
            <TabsTrigger value="healthcare" className="text-xs flex items-center gap-1">
              <Stethoscope className="w-3 h-3" />
              Health
            </TabsTrigger>
          </TabsList>

          {/* Template Grid */}
          <div className="mt-4">
            <ScrollArea className="h-96">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => {
                  const isFavorite = favorites.includes(template.id);
                  
                  return (
                    <Card key={template.id} className="group cursor-pointer hover:shadow-lg transition-all duration-200 relative overflow-hidden">
                      <div className="aspect-square bg-gray-50 relative overflow-hidden">
                        {/* Template Preview */}
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <img 
                            src={template.preview} 
                            alt={template.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <Button
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            onClick={() => onTemplateSelect(template)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Use Template
                          </Button>
                        </div>
                        
                        {/* Favorite button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`absolute top-2 right-2 w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                            isFavorite ? 'opacity-100' : ''
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(template.id);
                          }}
                        >
                          <Heart 
                            className={`w-4 h-4 ${
                              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                            }`} 
                          />
                        </Button>
                      </div>
                      
                      {/* Template Info */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm">{template.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{template.description}</p>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => onTemplateSelect(template)}
                        >
                          <Download className="w-3 h-3 mr-2" />
                          Use Template
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
              
              {/* No results message */}
              {filteredTemplates.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No templates found</p>
                  <p className="text-sm">Try adjusting your search or browse different categories</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </Tabs>

        {/* Quick Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
          <div className="flex items-center gap-4">
            <span>{allTemplates.length} total templates</span>
            <span>{favorites.length} favorites</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span>Click heart to favorite</span>
          </div>
        </div>
      </div>
    </Card>
  );
};