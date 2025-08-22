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
  Heart, 
  Upload,
  Filter,
  Grid3X3,
  List,
  Sparkles,
  // Business & Finance
  Building2,
  TrendingUp,
  DollarSign,
  CreditCard,
  PieChart,
  BarChart3,
  Calculator,
  Briefcase,
  // Technology
  Smartphone,
  Laptop,
  Wifi,
  Database,
  Cloud,
  Code,
  Cpu,
  HardDrive,
  // Design & Creative
  Palette,
  Brush,
  Camera,
  Image,
  Video,
  Music,
  Mic,
  Film,
  // Communication
  Mail,
  MessageCircle,
  Phone,
  Send,
  Share2,
  Users,
  UserPlus,
  Globe,
  // Health & Medical
  Activity,
  Heart as HeartIcon,
  Shield,
  Plus,
  Stethoscope,
  Pill,
  // Food & Restaurant
  Coffee,
  UtensilsCrossed,
  ChefHat,
  Wine,
  // Travel & Transport
  Car,
  Plane,
  Train,
  Ship,
  MapPin,
  Navigation,
  // Education
  BookOpen,
  GraduationCap,
  School,
  Library,
  PenTool,
  // Sports & Fitness
  Dumbbell,
  Trophy,
  Target,
  Zap,
  // Nature & Environment
  Leaf,
  TreePine,
  Sun,
  Moon,
  Cloud as CloudIcon,
  Droplets,
  // Shopping & E-commerce
  ShoppingCart,
  ShoppingBag,
  Store,
  Package,
  Truck,
  // Social & Entertainment
  Gamepad2,
  Tv,
  Radio,
  Headphones,
  // Tools & Utilities
  Settings,
  Wrench,
  Hammer,
  Scissors,
  Key,
  Lock
} from 'lucide-react';

// Icon categories with professional icons
const iconCategories = {
  business: {
    name: 'Business & Finance',
    icons: [
      { name: 'Building2', component: Building2, keywords: ['office', 'company', 'corporate'] },
      { name: 'TrendingUp', component: TrendingUp, keywords: ['growth', 'success', 'chart'] },
      { name: 'DollarSign', component: DollarSign, keywords: ['money', 'finance', 'payment'] },
      { name: 'CreditCard', component: CreditCard, keywords: ['payment', 'card', 'finance'] },
      { name: 'PieChart', component: PieChart, keywords: ['analytics', 'data', 'statistics'] },
      { name: 'BarChart3', component: BarChart3, keywords: ['analytics', 'data', 'graph'] },
      { name: 'Calculator', component: Calculator, keywords: ['math', 'calculation', 'finance'] },
      { name: 'Briefcase', component: Briefcase, keywords: ['work', 'business', 'professional'] }
    ]
  },
  technology: {
    name: 'Technology',
    icons: [
      { name: 'Smartphone', component: Smartphone, keywords: ['mobile', 'phone', 'device'] },
      { name: 'Laptop', component: Laptop, keywords: ['computer', 'device', 'work'] },
      { name: 'Wifi', component: Wifi, keywords: ['internet', 'connection', 'network'] },
      { name: 'Database', component: Database, keywords: ['data', 'storage', 'server'] },
      { name: 'Cloud', component: Cloud, keywords: ['storage', 'server', 'online'] },
      { name: 'Code', component: Code, keywords: ['programming', 'development', 'software'] },
      { name: 'Cpu', component: Cpu, keywords: ['processor', 'hardware', 'computer'] },
      { name: 'HardDrive', component: HardDrive, keywords: ['storage', 'data', 'hardware'] }
    ]
  },
  creative: {
    name: 'Design & Creative',
    icons: [
      { name: 'Palette', component: Palette, keywords: ['design', 'art', 'color'] },
      { name: 'Brush', component: Brush, keywords: ['paint', 'art', 'design'] },
      { name: 'Camera', component: Camera, keywords: ['photo', 'photography', 'image'] },
      { name: 'Image', component: Image, keywords: ['picture', 'photo', 'media'] },
      { name: 'Video', component: Video, keywords: ['film', 'movie', 'media'] },
      { name: 'Music', component: Music, keywords: ['audio', 'sound', 'entertainment'] },
      { name: 'Mic', component: Mic, keywords: ['microphone', 'audio', 'recording'] },
      { name: 'Film', component: Film, keywords: ['movie', 'cinema', 'video'] }
    ]
  },
  communication: {
    name: 'Communication',
    icons: [
      { name: 'Mail', component: Mail, keywords: ['email', 'message', 'contact'] },
      { name: 'MessageCircle', component: MessageCircle, keywords: ['chat', 'message', 'communication'] },
      { name: 'Phone', component: Phone, keywords: ['call', 'contact', 'communication'] },
      { name: 'Send', component: Send, keywords: ['message', 'delivery', 'communication'] },
      { name: 'Share2', component: Share2, keywords: ['share', 'social', 'network'] },
      { name: 'Users', component: Users, keywords: ['team', 'people', 'community'] },
      { name: 'UserPlus', component: UserPlus, keywords: ['add', 'invite', 'team'] },
      { name: 'Globe', component: Globe, keywords: ['world', 'international', 'global'] }
    ]
  },
  health: {
    name: 'Health & Medical',
    icons: [
      { name: 'Activity', component: Activity, keywords: ['health', 'fitness', 'medical'] },
      { name: 'HeartIcon', component: HeartIcon, keywords: ['health', 'love', 'care'] },
      { name: 'Shield', component: Shield, keywords: ['protection', 'security', 'safety'] },
      { name: 'Plus', component: Plus, keywords: ['medical', 'health', 'add'] },
      { name: 'Stethoscope', component: Stethoscope, keywords: ['medical', 'doctor', 'health'] },
      { name: 'Pill', component: Pill, keywords: ['medicine', 'health', 'pharmacy'] }
    ]
  },
  food: {
    name: 'Food & Restaurant',
    icons: [
      { name: 'Coffee', component: Coffee, keywords: ['drink', 'cafe', 'beverage'] },
      { name: 'UtensilsCrossed', component: UtensilsCrossed, keywords: ['restaurant', 'food', 'dining'] },
      { name: 'ChefHat', component: ChefHat, keywords: ['cooking', 'chef', 'restaurant'] },
      { name: 'Wine', component: Wine, keywords: ['drink', 'alcohol', 'restaurant'] }
    ]
  },
  travel: {
    name: 'Travel & Transport',
    icons: [
      { name: 'Car', component: Car, keywords: ['transport', 'vehicle', 'travel'] },
      { name: 'Plane', component: Plane, keywords: ['flight', 'travel', 'transport'] },
      { name: 'Train', component: Train, keywords: ['transport', 'travel', 'railway'] },
      { name: 'Ship', component: Ship, keywords: ['boat', 'transport', 'travel'] },
      { name: 'MapPin', component: MapPin, keywords: ['location', 'map', 'place'] },
      { name: 'Navigation', component: Navigation, keywords: ['direction', 'map', 'location'] }
    ]
  },
  education: {
    name: 'Education',
    icons: [
      { name: 'BookOpen', component: BookOpen, keywords: ['book', 'education', 'learning'] },
      { name: 'GraduationCap', component: GraduationCap, keywords: ['education', 'graduation', 'school'] },
      { name: 'School', component: School, keywords: ['education', 'learning', 'building'] },
      { name: 'Library', component: Library, keywords: ['books', 'education', 'knowledge'] },
      { name: 'PenTool', component: PenTool, keywords: ['writing', 'design', 'tool'] }
    ]
  },
  sports: {
    name: 'Sports & Fitness',
    icons: [
      { name: 'Dumbbell', component: Dumbbell, keywords: ['fitness', 'gym', 'exercise'] },
      { name: 'Trophy', component: Trophy, keywords: ['award', 'winner', 'achievement'] },
      { name: 'Target', component: Target, keywords: ['goal', 'aim', 'objective'] },
      { name: 'Zap', component: Zap, keywords: ['energy', 'power', 'fast'] }
    ]
  },
  nature: {
    name: 'Nature & Environment',
    icons: [
      { name: 'Leaf', component: Leaf, keywords: ['nature', 'eco', 'green'] },
      { name: 'TreePine', component: TreePine, keywords: ['nature', 'environment', 'green'] },
      { name: 'Sun', component: Sun, keywords: ['weather', 'sunny', 'bright'] },
      { name: 'Moon', component: Moon, keywords: ['night', 'dark', 'lunar'] },
      { name: 'CloudIcon', component: CloudIcon, keywords: ['weather', 'sky', 'cloud'] },
      { name: 'Droplets', component: Droplets, keywords: ['water', 'rain', 'liquid'] }
    ]
  },
  shopping: {
    name: 'Shopping & E-commerce',
    icons: [
      { name: 'ShoppingCart', component: ShoppingCart, keywords: ['shop', 'buy', 'cart'] },
      { name: 'ShoppingBag', component: ShoppingBag, keywords: ['shop', 'buy', 'bag'] },
      { name: 'Store', component: Store, keywords: ['shop', 'retail', 'business'] },
      { name: 'Package', component: Package, keywords: ['delivery', 'box', 'shipping'] },
      { name: 'Truck', component: Truck, keywords: ['delivery', 'transport', 'shipping'] }
    ]
  },
  entertainment: {
    name: 'Social & Entertainment',
    icons: [
      { name: 'Gamepad2', component: Gamepad2, keywords: ['gaming', 'play', 'entertainment'] },
      { name: 'Tv', component: Tv, keywords: ['television', 'media', 'entertainment'] },
      { name: 'Radio', component: Radio, keywords: ['music', 'audio', 'entertainment'] },
      { name: 'Headphones', component: Headphones, keywords: ['audio', 'music', 'sound'] }
    ]
  },
  tools: {
    name: 'Tools & Utilities',
    icons: [
      { name: 'Settings', component: Settings, keywords: ['config', 'options', 'preferences'] },
      { name: 'Wrench', component: Wrench, keywords: ['tool', 'repair', 'maintenance'] },
      { name: 'Hammer', component: Hammer, keywords: ['tool', 'build', 'construction'] },
      { name: 'Scissors', component: Scissors, keywords: ['cut', 'tool', 'edit'] },
      { name: 'Key', component: Key, keywords: ['access', 'security', 'unlock'] },
      { name: 'Lock', component: Lock, keywords: ['security', 'protection', 'private'] }
    ]
  }
};

interface IconLibraryProps {
  onIconSelect: (iconName: string) => void;
  selectedIcon?: string;
  className?: string;
}

/**
 * Professional icon library component with search, categories, and favorites
 */
export const IconLibrary = ({ onIconSelect, selectedIcon, className = "" }: IconLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [customIcons, setCustomIcons] = useState<string[]>([]);

  /**
   * Filter icons based on search term and category
   */
  const filteredIcons = useMemo(() => {
    let allIcons: Array<{ name: string; component: any; keywords: string[]; category: string }> = [];
    
    // Collect all icons from categories
    Object.entries(iconCategories).forEach(([categoryKey, category]) => {
      if (selectedCategory === 'all' || selectedCategory === categoryKey) {
        allIcons.push(...category.icons.map(icon => ({ ...icon, category: categoryKey })));
      }
    });
    
    // Filter by search term
    if (searchTerm) {
      allIcons = allIcons.filter(icon => 
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return allIcons;
  }, [searchTerm, selectedCategory]);

  /**
   * Toggle favorite icon
   */
  const toggleFavorite = (iconName: string) => {
    setFavorites(prev => 
      prev.includes(iconName) 
        ? prev.filter(name => name !== iconName)
        : [...prev, iconName]
    );
  };

  /**
   * Handle custom icon upload
   */
  const handleCustomIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const svgContent = e.target?.result as string;
        setCustomIcons(prev => [...prev, svgContent]);
      };
      reader.readAsText(file);
    }
  };

  /**
   * Render icon grid
   */
  const renderIconGrid = (icons: typeof filteredIcons) => {
    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
          {icons.map((icon) => {
            const IconComponent = icon.component;
            const isSelected = selectedIcon === icon.name;
            const isFavorite = favorites.includes(icon.name);
            
            return (
              <div key={icon.name} className="relative group">
                <Button
                  variant={isSelected ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onIconSelect(icon.name)}
                  className={`h-12 w-12 p-0 relative transition-all duration-200 hover:scale-110 ${
                    isSelected ? 'ring-2 ring-blue-500' : ''
                  }`}
                  title={icon.name}
                >
                  <IconComponent className="w-5 h-5" />
                </Button>
                
                {/* Favorite button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(icon.name);
                  }}
                  className={`absolute -top-1 -right-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isFavorite ? 'opacity-100 text-yellow-500' : ''
                  }`}
                >
                  <Star className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="space-y-1">
          {icons.map((icon) => {
            const IconComponent = icon.component;
            const isSelected = selectedIcon === icon.name;
            const isFavorite = favorites.includes(icon.name);
            
            return (
              <div key={icon.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <Button
                  variant={isSelected ? "default" : "ghost"}
                  onClick={() => onIconSelect(icon.name)}
                  className="flex items-center gap-3 flex-1 justify-start"
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm">{icon.name}</span>
                  <Badge variant="outline" className="text-xs ml-auto">
                    {iconCategories[icon.category as keyof typeof iconCategories].name}
                  </Badge>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(icon.name)}
                  className={`h-8 w-8 p-0 ${isFavorite ? 'text-yellow-500' : ''}`}
                >
                  <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>
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
            Bibliothèque d'Icônes Professionnelle
          </div>
          <Badge variant="secondary">
            {filteredIcons.length} icônes
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Rechercher des icônes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {Object.entries(iconCategories).map(([key, category]) => (
                <SelectItem key={key} value={key}>
                  {category.name}
                </SelectItem>
              ))}
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

        {/* Custom Icon Upload */}
        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Upload className="w-4 h-4" />
          <span className="text-sm font-medium">Icônes personnalisées:</span>
          <input
            type="file"
            accept=".svg"
            onChange={handleCustomIconUpload}
            className="hidden"
            id="custom-icon-upload"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('custom-icon-upload')?.click()}
          >
            Télécharger SVG
          </Button>
        </div>

        {/* Tabs for different icon sets */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="favorites">Favoris ({favorites.length})</TabsTrigger>
            <TabsTrigger value="custom">Personnalisées ({customIcons.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <ScrollArea className="h-96">
              {renderIconGrid(filteredIcons)}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-4">
            <ScrollArea className="h-96">
              {favorites.length > 0 ? (
                renderIconGrid(filteredIcons.filter(icon => favorites.includes(icon.name)))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Heart className="w-8 h-8 mx-auto mb-2" />
                  <p>Aucune icône favorite</p>
                  <p className="text-sm">Cliquez sur ⭐ pour ajouter des favoris</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="custom" className="mt-4">
            <ScrollArea className="h-96">
              {customIcons.length > 0 ? (
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                  {customIcons.map((svgContent, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => onIconSelect(`custom-${index}`)}
                      className="h-12 w-12 p-0"
                      dangerouslySetInnerHTML={{ __html: svgContent }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p>Aucune icône personnalisée</p>
                  <p className="text-sm">Téléchargez des fichiers SVG pour commencer</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};