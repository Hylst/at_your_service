import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Star,
  Heart,
  Zap,
  Shield,
  Crown,
  Gem,
  Flame,
  Leaf,
  Sun,
  Moon,
  Cloud,
  Mountain,
  Waves,
  TreePine,
  Flower,
  Bug,
  Bird,
  Fish,
  Cat,
  Dog,
  Rabbit,
  Zap as ElephantIcon,
  Cat as LionIcon,
  Bird as EagleIcon,
  Rocket,
  Plane,
  Car,
  Bike,
  Train,
  Ship,
  Truck,
  Bus,
  Home,
  Building,
  Store,
  Factory,
  Church,
  School,
  Hospital,
  Building as BankIcon,
  Coffee,
  Pizza,
  Cake,
  Apple,
  Grape,
  Cherry,
  Banana,
  Carrot,
  Smartphone,
  Laptop,
  Monitor,
  Keyboard,
  Mouse,
  Headphones,
  Camera,
  Gamepad2,
  Music,
  Video,
  Image,
  FileText,
  Folder,
  Download,
  Upload,
  Share,
  Link,
  Mail,
  Phone,
  MessageCircle,
  Users,
  User,
  UserPlus,
  Settings,
  Wrench as ToolIcon,
  Wrench,
  Hammer,
  Scissors,
  Paintbrush,
  Palette,
  Brush,
  Pen,
  Pencil,
  Edit,
  Save,
  Trash,
  Archive,
  Clock,
  Calendar,
  Timer,
  Timer as StopwatchIcon,
  Bell,
  Bell as AlarmIcon,
  Target,
  Award,
  Trophy,
  Medal,
  Gift,
  ShoppingCart,
  CreditCard,
  DollarSign,
  TrendingUp,
  BarChart,
  PieChart,
  Activity,
  Wifi,
  Battery,
  Signal,
  Bluetooth,
  Globe,
  MapPin,
  Navigation,
  Compass,
  Map,
  Route,
  Flag,
  Bookmark,
  Tag,
  Hash,
  AtSign,
  Percent,
  Plus,
  Minus,
  X,
  Check,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  RotateCcw,
  RefreshCw as RefreshIcon,
  Maximize,
  Minimize,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Diamond,
  Pentagon
} from 'lucide-react';
import { IconLayer } from './logoTypes';

interface IconLibraryProps {
  onIconSelect: (iconName: string) => void;
  selectedIcon?: string;
  className?: string;
}

/**
 * Icon category definitions with their respective icons
 */
const iconCategories = {
  popular: {
    name: 'Popular',
    icons: [
      { name: 'Star', component: Star },
      { name: 'Heart', component: Heart },
      { name: 'Zap', component: Zap },
      { name: 'Shield', component: Shield },
      { name: 'Crown', component: Crown },
      { name: 'Gem', component: Gem },
      { name: 'Flame', component: Flame },
      { name: 'Rocket', component: Rocket },
      { name: 'Trophy', component: Trophy },
      { name: 'Target', component: Target },
      { name: 'Award', component: Award },
      { name: 'Medal', component: Medal }
    ]
  },
  nature: {
    name: 'Nature',
    icons: [
      { name: 'Leaf', component: Leaf },
      { name: 'Sun', component: Sun },
      { name: 'Moon', component: Moon },
      { name: 'Cloud', component: Cloud },
      { name: 'Mountain', component: Mountain },
      { name: 'Waves', component: Waves },
      { name: 'TreePine', component: TreePine },
      { name: 'Flower', component: Flower },
      { name: 'Butterfly', component: Bug },
      { name: 'Bird', component: Bird },
      { name: 'Fish', component: Fish }
    ]
  },
  animals: {
    name: 'Animals',
    icons: [
      { name: 'Cat', component: Cat },
      { name: 'Dog', component: Dog },
      { name: 'Rabbit', component: Rabbit },
      { name: 'Elephant', component: ElephantIcon },
      { name: 'Lion', component: LionIcon },
      { name: 'Eagle', component: EagleIcon },
      { name: 'Bird', component: Bird },
      { name: 'Fish', component: Fish },
      { name: 'Butterfly', component: Bug }
    ]
  },
  transport: {
    name: 'Transport',
    icons: [
      { name: 'Rocket', component: Rocket },
      { name: 'Plane', component: Plane },
      { name: 'Car', component: Car },
      { name: 'Bike', component: Bike },
      { name: 'Train', component: Train },
      { name: 'Ship', component: Ship },
      { name: 'Truck', component: Truck },
      { name: 'Bus', component: Bus }
    ]
  },
  buildings: {
    name: 'Buildings',
    icons: [
      { name: 'Home', component: Home },
      { name: 'Building', component: Building },
      { name: 'Store', component: Store },
      { name: 'Factory', component: Factory },
      { name: 'Church', component: Church },
      { name: 'School', component: School },
      { name: 'Hospital', component: Hospital },
      { name: 'Bank', component: BankIcon }
    ]
  },
  food: {
    name: 'Food',
    icons: [
      { name: 'Coffee', component: Coffee },
      { name: 'Pizza', component: Pizza },
      { name: 'Cake', component: Cake },
      { name: 'Apple', component: Apple },
      { name: 'Grape', component: Grape },
      { name: 'Cherry', component: Cherry },
      { name: 'Banana', component: Banana },
      { name: 'Carrot', component: Carrot }
    ]
  },
  technology: {
    name: 'Technology',
    icons: [
      { name: 'Smartphone', component: Smartphone },
      { name: 'Laptop', component: Laptop },
      { name: 'Monitor', component: Monitor },
      { name: 'Keyboard', component: Keyboard },
      { name: 'Mouse', component: Mouse },
      { name: 'Headphones', component: Headphones },
      { name: 'Camera', component: Camera },
      { name: 'Gamepad2', component: Gamepad2 },
      { name: 'Wifi', component: Wifi },
      { name: 'Battery', component: Battery },
      { name: 'Signal', component: Signal },
      { name: 'Bluetooth', component: Bluetooth }
    ]
  },
  media: {
    name: 'Media',
    icons: [
      { name: 'Music', component: Music },
      { name: 'Video', component: Video },
      { name: 'Image', component: Image },
      { name: 'FileText', component: FileText },
      { name: 'Folder', component: Folder },
      { name: 'Download', component: Download },
      { name: 'Upload', component: Upload },
      { name: 'Share', component: Share },
      { name: 'Link', component: Link }
    ]
  },
  communication: {
    name: 'Communication',
    icons: [
      { name: 'Mail', component: Mail },
      { name: 'Phone', component: Phone },
      { name: 'MessageCircle', component: MessageCircle },
      { name: 'Users', component: Users },
      { name: 'User', component: User },
      { name: 'UserPlus', component: UserPlus },
      { name: 'Globe', component: Globe }
    ]
  },
  tools: {
    name: 'Tools',
    icons: [
      { name: 'Settings', component: Settings },
      { name: 'Tool', component: ToolIcon },
      { name: 'Wrench', component: Wrench },
      { name: 'Hammer', component: Hammer },
      { name: 'Scissors', component: Scissors },
      { name: 'Paintbrush', component: Paintbrush },
      { name: 'Palette', component: Palette },
      { name: 'Brush', component: Brush },
      { name: 'Pen', component: Pen },
      { name: 'Pencil', component: Pencil },
      { name: 'Edit', component: Edit }
    ]
  },
  actions: {
    name: 'Actions',
    icons: [
      { name: 'Save', component: Save },
      { name: 'Trash', component: Trash },
      { name: 'Archive', component: Archive },
      { name: 'Plus', component: Plus },
      { name: 'Minus', component: Minus },
      { name: 'X', component: X },
      { name: 'Check', component: Check },
      { name: 'Refresh', component: RefreshIcon },
      { name: 'RotateCw', component: RotateCw },
      { name: 'RotateCcw', component: RotateCcw }
    ]
  },
  arrows: {
    name: 'Arrows',
    icons: [
      { name: 'ChevronUp', component: ChevronUp },
      { name: 'ChevronDown', component: ChevronDown },
      { name: 'ChevronLeft', component: ChevronLeft },
      { name: 'ChevronRight', component: ChevronRight },
      { name: 'ArrowUp', component: ArrowUp },
      { name: 'ArrowDown', component: ArrowDown },
      { name: 'ArrowLeft', component: ArrowLeft },
      { name: 'ArrowRight', component: ArrowRight }
    ]
  },
  time: {
    name: 'Time',
    icons: [
      { name: 'Clock', component: Clock },
      { name: 'Calendar', component: Calendar },
      { name: 'Timer', component: Timer },
      { name: 'Stopwatch', component: StopwatchIcon },
      { name: 'Bell', component: Bell },
      { name: 'Alarm', component: AlarmIcon }
    ]
  },
  business: {
    name: 'Business',
    icons: [
      { name: 'Gift', component: Gift },
      { name: 'ShoppingCart', component: ShoppingCart },
      { name: 'CreditCard', component: CreditCard },
      { name: 'DollarSign', component: DollarSign },
      { name: 'TrendingUp', component: TrendingUp },
      { name: 'BarChart', component: BarChart },
      { name: 'PieChart', component: PieChart },
      { name: 'Activity', component: Activity }
    ]
  },
  navigation: {
    name: 'Navigation',
    icons: [
      { name: 'MapPin', component: MapPin },
      { name: 'Navigation', component: Navigation },
      { name: 'Compass', component: Compass },
      { name: 'Map', component: Map },
      { name: 'Route', component: Route },
      { name: 'Flag', component: Flag },
      { name: 'Bookmark', component: Bookmark }
    ]
  },
  shapes: {
    name: 'Shapes',
    icons: [
      { name: 'Square', component: Square },
      { name: 'Circle', component: Circle },
      { name: 'Triangle', component: Triangle },
      { name: 'Hexagon', component: Hexagon },
      { name: 'Diamond', component: Diamond },
      { name: 'Pentagon', component: Pentagon },
      { name: 'Maximize', component: Maximize },
      { name: 'Minimize', component: Minimize }
    ]
  },
  symbols: {
    name: 'Symbols',
    icons: [
      { name: 'Tag', component: Tag },
      { name: 'Hash', component: Hash },
      { name: 'AtSign', component: AtSign },
      { name: 'Percent', component: Percent }
    ]
  }
};

/**
 * Extended icon library component with search and categorization
 */
export const IconLibrary: React.FC<IconLibraryProps> = ({
  onIconSelect,
  selectedIcon,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('popular');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter icons based on search term
  const filteredIcons = useMemo(() => {
    if (!searchTerm) {
      return iconCategories[activeCategory as keyof typeof iconCategories]?.icons || [];
    }

    const allIcons = Object.values(iconCategories).flatMap(category => category.icons);
    return allIcons.filter(icon =>
      icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeCategory]);

  // Toggle favorite icon
  const toggleFavorite = (iconName: string) => {
    setFavorites(prev => 
      prev.includes(iconName)
        ? prev.filter(name => name !== iconName)
        : [...prev, iconName]
    );
  };

  // Get favorite icons
  const favoriteIcons = useMemo(() => {
    const allIcons = Object.values(iconCategories).flatMap(category => category.icons);
    return allIcons.filter(icon => favorites.includes(icon.name));
  }, [favorites]);

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Icon Library</h3>
          <Badge variant="outline">
            {filteredIcons.length} icons
          </Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-1 h-auto p-1">
            <TabsTrigger value="popular" className="text-xs">Popular</TabsTrigger>
            <TabsTrigger value="favorites" className="text-xs">Favorites</TabsTrigger>
            <TabsTrigger value="nature" className="text-xs">Nature</TabsTrigger>
            <TabsTrigger value="animals" className="text-xs">Animals</TabsTrigger>
            <TabsTrigger value="transport" className="text-xs">Transport</TabsTrigger>
            <TabsTrigger value="buildings" className="text-xs">Buildings</TabsTrigger>
            <TabsTrigger value="food" className="text-xs">Food</TabsTrigger>
            <TabsTrigger value="technology" className="text-xs">Tech</TabsTrigger>
          </TabsList>
          
          <div className="mt-2">
            <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-1 h-auto p-1">
              <TabsTrigger value="media" className="text-xs">Media</TabsTrigger>
              <TabsTrigger value="communication" className="text-xs">Comm</TabsTrigger>
              <TabsTrigger value="tools" className="text-xs">Tools</TabsTrigger>
              <TabsTrigger value="actions" className="text-xs">Actions</TabsTrigger>
              <TabsTrigger value="arrows" className="text-xs">Arrows</TabsTrigger>
              <TabsTrigger value="time" className="text-xs">Time</TabsTrigger>
              <TabsTrigger value="business" className="text-xs">Business</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="mt-2">
            <TabsList className="grid grid-cols-3 gap-1 h-auto p-1">
              <TabsTrigger value="navigation" className="text-xs">Navigation</TabsTrigger>
              <TabsTrigger value="shapes" className="text-xs">Shapes</TabsTrigger>
              <TabsTrigger value="symbols" className="text-xs">Symbols</TabsTrigger>
            </TabsList>
          </div>

          {/* Icon Grid */}
          <div className="mt-4">
            <ScrollArea className="h-80">
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                {(activeCategory === 'favorites' ? favoriteIcons : filteredIcons).map((icon) => {
                  const IconComponent = icon.component;
                  const isSelected = selectedIcon === icon.name;
                  const isFavorite = favorites.includes(icon.name);
                  
                  return (
                    <div key={icon.name} className="relative group">
                      <Button
                        variant={isSelected ? 'default' : 'outline'}
                        size="sm"
                        className={`w-full h-12 p-2 relative ${
                          isSelected ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => onIconSelect(icon.name)}
                        title={icon.name}
                      >
                        <IconComponent className="w-5 h-5" />
                      </Button>
                      
                      {/* Favorite button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`absolute -top-1 -right-1 w-5 h-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                          isFavorite ? 'opacity-100' : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(icon.name);
                        }}
                      >
                        <Heart 
                          className={`w-3 h-3 ${
                            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                          }`} 
                        />
                      </Button>
                      
                      {/* Icon name tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {icon.name}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* No results message */}
              {filteredIcons.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No icons found for "{searchTerm}"</p>
                  <p className="text-sm mt-1">Try a different search term</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </Tabs>

        {/* Quick Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
          <div className="flex items-center gap-4">
            <span>{Object.values(iconCategories).reduce((acc, cat) => acc + cat.icons.length, 0)} total icons</span>
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