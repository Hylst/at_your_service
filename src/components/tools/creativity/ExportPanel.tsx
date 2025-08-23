import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  Download, 
  FileImage, 
  FileText, 
  Image as ImageIcon, 
  Loader2,
  Settings,
  Smartphone,
  Monitor,
  Printer,
  Globe
} from 'lucide-react';
import { LogoSettings, Layer } from './logoTypes';
import { generateLogoSVG } from './svgGenerator';

// Utility function to convert SVG to PNG
const convertSvgToPng = (svgContent: string, width: number, height: number, transparent: boolean = true): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    canvas.width = width;
    canvas.height = height;

    if (!transparent) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
    }

    const img = document.createElement('img') as HTMLImageElement;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          reject(new Error('Failed to create PNG blob'));
        }
      }, 'image/png');
    };
    img.onerror = () => reject(new Error('Failed to load SVG'));
    
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    img.src = URL.createObjectURL(svgBlob);
  });
};

interface ExportPanelProps {
  logoSettings: LogoSettings;
  layers: Layer[];
  onExport?: (format: string, options: ExportOptions) => void;
}

interface ExportOptions {
  format: 'svg' | 'png' | 'jpg' | 'pdf';
  size: string;
  quality?: number;
  transparent?: boolean;
  scale?: number;
}

interface ExportPreset {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  formats: string[];
  sizes: string[];
  recommended?: boolean;
}

const exportPresets: ExportPreset[] = [
  {
    id: 'web',
    name: 'Web',
    description: 'Optimized for websites and digital use',
    icon: <Globe className="w-4 h-4" />,
    formats: ['svg', 'png'],
    sizes: ['512x512', '256x256', '128x128', '64x64'],
    recommended: true
  },
  {
    id: 'print',
    name: 'Print',
    description: 'High resolution for print materials',
    icon: <Printer className="w-4 h-4" />,
    formats: ['svg', 'png', 'pdf'],
    sizes: ['2048x2048', '1024x1024', '512x512'],
    recommended: true
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    description: 'App icons and mobile interfaces',
    icon: <Smartphone className="w-4 h-4" />,
    formats: ['png'],
    sizes: ['1024x1024', '512x512', '256x256', '128x128', '64x64', '32x32']
  },
  {
    id: 'social',
    name: 'Social Media',
    description: 'Profile pictures and social platforms',
    icon: <Monitor className="w-4 h-4" />,
    formats: ['png', 'jpg'],
    sizes: ['400x400', '200x200', '150x150', '100x100']
  }
];

const formatOptions = [
  { value: 'svg', label: 'SVG', description: 'Vector format, scalable', icon: <FileText className="w-4 h-4" /> },
  { value: 'png', label: 'PNG', description: 'Raster with transparency', icon: <ImageIcon className="w-4 h-4" /> },
  { value: 'jpg', label: 'JPG', description: 'Compressed raster format', icon: <FileImage className="w-4 h-4" /> },
  { value: 'pdf', label: 'PDF', description: 'Document format', icon: <FileText className="w-4 h-4" /> }
];

const sizeOptions = [
  '32x32', '64x64', '128x128', '256x256', '512x512', 
  '1024x1024', '2048x2048', '4096x4096', 'Custom'
];

const qualityOptions = [
  { value: 100, label: 'Maximum (100%)' },
  { value: 90, label: 'High (90%)' },
  { value: 80, label: 'Good (80%)' },
  { value: 70, label: 'Medium (70%)' },
  { value: 60, label: 'Low (60%)' }
];

export const ExportPanel: React.FC<ExportPanelProps> = ({ logoSettings, layers, onExport }) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('web');
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'svg',
    size: '512x512',
    quality: 90,
    transparent: true,
    scale: 1
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const handleSingleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setExportProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      let result;
      switch (exportOptions.format) {
        case 'svg':
          const svgContent = generateLogoSVG(logoSettings, layers);
          const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
          result = URL.createObjectURL(svgBlob);
          break;
        case 'png':
          const [width, height] = exportOptions.size.split('x').map(Number);
          const svgForPng = generateLogoSVG(logoSettings, layers);
          result = await convertSvgToPng(svgForPng, width, height, exportOptions.transparent);
          break;
        case 'jpg':
        case 'pdf':
          toast.warning(`${exportOptions.format.toUpperCase()} export coming soon!`);
          return;
        default:
          throw new Error('Unsupported format');
      }

      clearInterval(progressInterval);
      setExportProgress(100);

      // Create download link
      const link = document.createElement('a');
      link.href = result;
      link.download = `${logoSettings.name || 'logo'}.${exportOptions.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`Logo exported as ${exportOptions.format.toUpperCase()}`);
      onExport?.(exportOptions.format, exportOptions);
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const handleBatchExport = async () => {
    const preset = exportPresets.find(p => p.id === selectedPreset);
    if (!preset) return;

    setIsExporting(true);
    setExportProgress(0);

    try {
      const totalExports = preset.formats.length * preset.sizes.length;
      let completed = 0;

      for (const format of preset.formats) {
        for (const size of preset.sizes) {
          const [width, height] = size.split('x').map(Number);
          
          try {
            let result;
            if (format === 'svg') {
              const svgContent = generateLogoSVG(logoSettings, layers);
              const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
              result = URL.createObjectURL(svgBlob);
            } else if (format === 'png') {
              const svgForPng = generateLogoSVG(logoSettings, layers);
              result = await convertSvgToPng(svgForPng, width, height, true);
            } else {
              // Skip unsupported formats for now
              completed++;
              continue;
            }

            // Create download link
            const link = document.createElement('a');
            link.href = result;
            link.download = `${logoSettings.name || 'logo'}_${size}.${format}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            completed++;
            setExportProgress((completed / totalExports) * 100);
            
            // Small delay to prevent browser blocking
            await new Promise(resolve => setTimeout(resolve, 200));
          } catch (error) {
            console.error(`Failed to export ${format} ${size}:`, error);
            completed++;
          }
        }
      }

      toast.success(`Batch export completed (${preset.name})`);
    } catch (error) {
      console.error('Batch export failed:', error);
      toast.error('Batch export failed. Please try again.');
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const selectedPresetData = exportPresets.find(p => p.id === selectedPreset);

  return (
    <div className="space-y-4">
      {/* Export Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Export Presets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {exportPresets.map((preset) => (
              <div
                key={preset.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedPreset === preset.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedPreset(preset.id)}
              >
                <div className="flex items-center gap-2 mb-1">
                  {preset.icon}
                  <span className="text-sm font-medium">{preset.name}</span>
                  {preset.recommended && (
                    <Badge variant="secondary" className="text-xs">Recommended</Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500">{preset.description}</p>
                <div className="flex gap-1 mt-2">
                  {preset.formats.map((format) => (
                    <Badge key={format} variant="outline" className="text-xs">
                      {format.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedPresetData && (
            <div className="mt-4">
              <Button
                onClick={handleBatchExport}
                disabled={isExporting}
                className="w-full flex items-center gap-2"
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                Export {selectedPresetData.name} Pack
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Single Export */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Download className="w-4 h-4" />
            Single Export
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Format Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Format</label>
            <div className="grid grid-cols-2 gap-2">
              {formatOptions.map((format) => (
                <div
                  key={format.value}
                  className={`p-2 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    exportOptions.format === format.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setExportOptions(prev => ({ ...prev, format: format.value as any }))}
                >
                  <div className="flex items-center gap-2">
                    {format.icon}
                    <div>
                      <div className="text-sm font-medium">{format.label}</div>
                      <div className="text-xs text-gray-500">{format.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Size</label>
            <Select
              value={exportOptions.size}
              onValueChange={(value) => setExportOptions(prev => ({ ...prev, size: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sizeOptions.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size === 'Custom' ? 'Custom Size' : `${size} pixels`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quality Selection (for raster formats) */}
          {(exportOptions.format === 'png' || exportOptions.format === 'jpg') && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Quality</label>
              <Select
                value={exportOptions.quality?.toString()}
                onValueChange={(value) => setExportOptions(prev => ({ ...prev, quality: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {qualityOptions.map((quality) => (
                    <SelectItem key={quality.value} value={quality.value.toString()}>
                      {quality.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Export Button */}
          <Button
            onClick={handleSingleExport}
            disabled={isExporting}
            className="w-full flex items-center gap-2"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Export as {exportOptions.format.toUpperCase()}
          </Button>

          {/* Progress Bar */}
          {isExporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Exporting...</span>
                <span>{Math.round(exportProgress)}%</span>
              </div>
              <Progress value={exportProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};