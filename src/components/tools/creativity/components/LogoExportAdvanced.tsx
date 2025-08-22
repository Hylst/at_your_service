import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  FileImage, 
  FileText, 
  Package, 
  Palette, 
  Settings,
  CheckCircle,
  AlertCircle,
  Loader2,
  Copy,
  Eye,
  Zap,
  Layers,
  Grid3X3,
  Smartphone,
  Monitor,
  Printer,
  Globe,
  Share2,
  Archive
} from 'lucide-react';
import { LogoSettings } from '../types/logoTypes';
import { LogoEffects } from './LogoEffectsAdvanced';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Export formats and their specifications
const exportFormats = {
  svg: {
    name: 'SVG',
    description: 'Vectoriel, redimensionnable',
    extension: 'svg',
    mimeType: 'image/svg+xml',
    scalable: true,
    transparent: true,
    sizes: ['original']
  },
  png: {
    name: 'PNG',
    description: 'Bitmap avec transparence',
    extension: 'png',
    mimeType: 'image/png',
    scalable: false,
    transparent: true,
    sizes: [16, 32, 64, 128, 256, 512, 1024, 2048]
  },
  jpg: {
    name: 'JPG',
    description: 'Bitmap pour impression',
    extension: 'jpg',
    mimeType: 'image/jpeg',
    scalable: false,
    transparent: false,
    sizes: [256, 512, 1024, 2048, 4096]
  },
  pdf: {
    name: 'PDF',
    description: 'Document vectoriel',
    extension: 'pdf',
    mimeType: 'application/pdf',
    scalable: true,
    transparent: false,
    sizes: ['A4', 'Letter']
  }
};

// Social media specifications
const socialSpecs = {
  facebook: {
    name: 'Facebook',
    sizes: [180, 500, 820]
  },
  instagram: {
    name: 'Instagram',
    sizes: [110, 320, 1080]
  },
  twitter: {
    name: 'Twitter/X',
    sizes: [128, 400, 1200]
  },
  linkedin: {
    name: 'LinkedIn',
    sizes: [100, 300, 1200]
  },
  youtube: {
    name: 'YouTube',
    sizes: [98, 800, 2560]
  }
};

// Brand kit templates
const brandKitTemplates = {
  minimal: {
    name: 'Minimal',
    description: 'Formats essentiels pour le web',
    includes: {
      formats: ['svg', 'png'],
      sizes: [256, 512],
      extras: ['guidelines']
    }
  },
  complete: {
    name: 'Complet',
    description: 'Tous formats et tailles',
    includes: {
      formats: ['svg', 'png', 'jpg', 'pdf'],
      sizes: [64, 128, 256, 512, 1024, 2048],
      extras: ['guidelines', 'favicon', 'social']
    }
  },
  web: {
    name: 'Web',
    description: 'Optimisé pour le web et mobile',
    includes: {
      formats: ['svg', 'png'],
      sizes: [32, 64, 128, 256, 512],
      extras: ['favicon']
    }
  },
  print: {
    name: 'Print',
    description: 'Haute résolution pour impression',
    includes: {
      formats: ['pdf', 'png', 'jpg'],
      sizes: [1024, 2048, 4096],
      extras: ['guidelines']
    }
  },
  social: {
    name: 'Réseaux Sociaux',
    description: 'Formats pour tous les réseaux',
    includes: {
      formats: ['png', 'jpg'],
      sizes: [128, 256, 512, 1024],
      extras: ['social']
    }
  },
  branding: {
    name: 'Branding',
    description: 'Kit complet de marque',
    includes: {
      formats: ['svg', 'png', 'pdf'],
      sizes: [256, 512, 1024, 2048],
      extras: ['guidelines', 'favicon', 'social']
    }
  }
};

interface ExportSettings {
  formats: string[];
  sizes: number[];
  quality: number;
  backgroundColor: string;
  transparent: boolean;
  includeEffects: boolean;
  brandKit: string;
  customName: string;
  includeGuidelines: boolean;
  includeFavicon: boolean;
  includeSocial: boolean;
}

interface LogoExportAdvancedProps {
  logoSettings: LogoSettings;
  logoEffects: LogoEffects;
  className?: string;
}

/**
 * Advanced logo export component with multi-format support and brand kit generation
 */
export const LogoExportAdvanced = ({ 
  logoSettings, 
  logoEffects, 
  className = "" 
}: LogoExportAdvancedProps) => {
  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    formats: ['svg', 'png'],
    sizes: [256, 512],
    quality: 90,
    backgroundColor: '#FFFFFF',
    transparent: true,
    includeEffects: true,
    brandKit: 'minimal',
    customName: logoSettings.text || 'logo',
    includeGuidelines: false,
    includeFavicon: false,
    includeSocial: false
  });
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle');
  const [exportedFiles, setExportedFiles] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * Update export settings
   */
  const updateSetting = <K extends keyof ExportSettings>(key: K, value: ExportSettings[K]) => {
    setExportSettings(prev => ({ ...prev, [key]: value }));
  };

  /**
   * Quick export single format
   */
  const quickExport = async (format: string, size: number = 512) => {
    try {
      // Simple implementation for now
      console.log(`Exporting ${format} at ${size}px`);
    } catch (error) {
      console.error('Quick export failed:', error);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Export Avancé & Brand Kit
          </div>
          <Badge variant={exportStatus === 'success' ? 'default' : 'secondary'}>
            {exportStatus === 'success' ? 'Exporté' : 'Prêt'}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Hidden canvas for format conversion */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        {/* Quick Export */}
        <div>
          <Label className="text-base font-medium mb-3 block">Export Rapide</Label>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(exportFormats).map(([key, format]) => (
              <Button
                key={key}
                variant="outline"
                size="sm"
                onClick={() => quickExport(key)}
                className="flex items-center gap-1"
              >
                <FileImage className="w-4 h-4" />
                {format.name}
              </Button>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* Export Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{exportSettings.formats.length}</div>
            <div className="text-xs text-gray-500">Formats</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{exportSettings.sizes.length}</div>
            <div className="text-xs text-gray-500">Tailles</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {exportSettings.formats.length * exportSettings.sizes.length}
            </div>
            <div className="text-xs text-gray-500">Fichiers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {exportSettings.quality}%
            </div>
            <div className="text-xs text-gray-500">Qualité</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};