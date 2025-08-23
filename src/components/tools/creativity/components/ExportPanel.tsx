import React, { memo, useCallback, useMemo } from 'react';
import { Download, FileImage, FileText, Palette, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

/**
 * Export settings interface
 */
export interface ExportSettings {
  format: 'png' | 'jpg' | 'svg' | 'pdf';
  quality: number;
  width: number;
  height: number;
  scale: number;
  backgroundColor: string;
  transparent: boolean;
  includeMetadata: boolean;
  compression: number;
}

/**
 * Props for ExportPanel component
 */
export interface ExportPanelProps {
  settings: ExportSettings;
  onSettingsChange: (settings: Partial<ExportSettings>) => void;
  onExport: () => void;
  isExporting?: boolean;
  compact?: boolean;
}

/**
 * Format configuration
 */
interface FormatConfig {
  label: string;
  icon: React.ReactNode;
  supportsTransparency: boolean;
  supportsQuality: boolean;
  supportsCompression: boolean;
  description: string;
}

/**
 * Export format configurations
 */
const FORMAT_CONFIGS: Record<ExportSettings['format'], FormatConfig> = {
  png: {
    label: 'PNG',
    icon: <FileImage className="h-4 w-4" />,
    supportsTransparency: true,
    supportsQuality: false,
    supportsCompression: true,
    description: 'Best for logos with transparency'
  },
  jpg: {
    label: 'JPG',
    icon: <FileImage className="h-4 w-4" />,
    supportsTransparency: false,
    supportsQuality: true,
    supportsCompression: false,
    description: 'Smaller file size, no transparency'
  },
  svg: {
    label: 'SVG',
    icon: <FileText className="h-4 w-4" />,
    supportsTransparency: true,
    supportsQuality: false,
    supportsCompression: false,
    description: 'Vector format, infinitely scalable'
  },
  pdf: {
    label: 'PDF',
    icon: <FileText className="h-4 w-4" />,
    supportsTransparency: true,
    supportsQuality: true,
    supportsCompression: true,
    description: 'Professional document format'
  }
};

/**
 * Preset sizes for quick selection
 */
const PRESET_SIZES = [
  { label: 'Social Media', width: 1080, height: 1080 },
  { label: 'Business Card', width: 1050, height: 600 },
  { label: 'Website Header', width: 1200, height: 400 },
  { label: 'Print (300 DPI)', width: 3000, height: 3000 },
  { label: 'HD', width: 1920, height: 1080 },
  { label: 'Custom', width: 0, height: 0 }
];

/**
 * ExportPanel component for managing export settings
 */
export const ExportPanel = memo<ExportPanelProps>(({ 
  settings,
  onSettingsChange,
  onExport,
  isExporting = false,
  compact = false
}) => {
  
  /**
   * Current format configuration
   */
  const currentFormat = useMemo(() => {
    return FORMAT_CONFIGS[settings.format];
  }, [settings.format]);

  /**
   * Handle format change
   */
  const handleFormatChange = useCallback((format: ExportSettings['format']) => {
    const updates: Partial<ExportSettings> = { format };
    
    // Reset transparency if format doesn't support it
    if (!FORMAT_CONFIGS[format].supportsTransparency) {
      updates.transparent = false;
    }
    
    onSettingsChange(updates);
  }, [onSettingsChange]);

  /**
   * Handle preset size selection
   */
  const handlePresetSize = useCallback((preset: typeof PRESET_SIZES[0]) => {
    if (preset.width > 0 && preset.height > 0) {
      onSettingsChange({
        width: preset.width,
        height: preset.height
      });
    }
  }, [onSettingsChange]);

  /**
   * Handle dimension change
   */
  const handleDimensionChange = useCallback((dimension: 'width' | 'height', value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      onSettingsChange({ [dimension]: numValue });
    }
  }, [onSettingsChange]);

  /**
   * Handle quality change
   */
  const handleQualityChange = useCallback((quality: number[]) => {
    onSettingsChange({ quality: quality[0] });
  }, [onSettingsChange]);

  /**
   * Handle scale change
   */
  const handleScaleChange = useCallback((scale: number[]) => {
    onSettingsChange({ scale: scale[0] });
  }, [onSettingsChange]);

  /**
   * Handle compression change
   */
  const handleCompressionChange = useCallback((compression: number[]) => {
    onSettingsChange({ compression: compression[0] });
  }, [onSettingsChange]);

  /**
   * Handle background color change
   */
  const handleBackgroundColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ backgroundColor: e.target.value });
  }, [onSettingsChange]);

  /**
   * Handle transparency toggle
   */
  const handleTransparencyToggle = useCallback((transparent: boolean) => {
    onSettingsChange({ transparent });
  }, [onSettingsChange]);

  /**
   * Handle metadata toggle
   */
  const handleMetadataToggle = useCallback((includeMetadata: boolean) => {
    onSettingsChange({ includeMetadata });
  }, [onSettingsChange]);

  const containerClasses = `space-y-${compact ? '3' : '4'}`;
  const labelClasses = `text-${compact ? 'xs' : 'sm'} font-medium`;
  const descriptionClasses = `text-${compact ? '[10px]' : 'xs'} text-gray-500`;

  return (
    <div className={containerClasses}>
      {/* Export Format */}
      <div className="space-y-2">
        <Label className={labelClasses}>Export Format</Label>
        <Select value={settings.format} onValueChange={handleFormatChange}>
          <SelectTrigger className={compact ? "h-8 text-xs" : "h-10"}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(FORMAT_CONFIGS).map(([format, config]) => (
              <SelectItem key={format} value={format}>
                <div className="flex items-center gap-2">
                  {config.icon}
                  <div>
                    <div className="font-medium">{config.label}</div>
                    <div className="text-xs text-gray-500">{config.description}</div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Preset Sizes */}
      <div className="space-y-2">
        <Label className={labelClasses}>Quick Sizes</Label>
        <div className={`grid grid-cols-2 ${compact ? 'gap-1' : 'gap-2'}`}>
          {PRESET_SIZES.slice(0, -1).map((preset) => (
            <Button
              key={preset.label}
              size="sm"
              variant="outline"
              onClick={() => handlePresetSize(preset)}
              className={`
                ${compact ? 'h-6 text-[10px] px-1' : 'h-8 text-xs px-2'}
                justify-start
              `.trim()}
            >
              <div>
                <div className="font-medium">{preset.label}</div>
                <div className={descriptionClasses}>
                  {preset.width} × {preset.height}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Custom Dimensions */}
      <div className="space-y-2">
        <Label className={labelClasses}>Dimensions (px)</Label>
        <div className={`grid grid-cols-2 ${compact ? 'gap-1' : 'gap-2'}`}>
          <div>
            <Label className={descriptionClasses}>Width</Label>
            <Input
              type="number"
              value={settings.width}
              onChange={(e) => handleDimensionChange('width', e.target.value)}
              className={compact ? "h-6 text-xs" : "h-8"}
              min="1"
              max="10000"
            />
          </div>
          <div>
            <Label className={descriptionClasses}>Height</Label>
            <Input
              type="number"
              value={settings.height}
              onChange={(e) => handleDimensionChange('height', e.target.value)}
              className={compact ? "h-6 text-xs" : "h-8"}
              min="1"
              max="10000"
            />
          </div>
        </div>
      </div>

      {/* Scale */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className={labelClasses}>Scale</Label>
          <span className={`${descriptionClasses} font-mono`}>
            {settings.scale}x
          </span>
        </div>
        <Slider
          value={[settings.scale]}
          onValueChange={handleScaleChange}
          min={0.1}
          max={5}
          step={0.1}
          className="w-full"
        />
      </div>

      <Separator />

      {/* Background Settings */}
      <div className="space-y-3">
        <Label className={labelClasses}>Background</Label>
        
        {/* Transparency Toggle */}
        {currentFormat.supportsTransparency && (
          <div className="flex items-center justify-between">
            <Label className={descriptionClasses}>Transparent</Label>
            <Switch
              checked={settings.transparent}
              onCheckedChange={handleTransparencyToggle}
            />
          </div>
        )}
        
        {/* Background Color */}
        {!settings.transparent && (
          <div className="flex items-center gap-2">
            <Label className={descriptionClasses}>Color</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={handleBackgroundColorChange}
                className={`
                  ${compact ? 'w-6 h-6' : 'w-8 h-8'} 
                  rounded border border-gray-300 cursor-pointer
                `.trim()}
              />
              <Input
                value={settings.backgroundColor}
                onChange={handleBackgroundColorChange}
                className={`${compact ? 'h-6 text-xs' : 'h-8'} font-mono`}
                placeholder="#ffffff"
              />
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Quality Settings */}
      {currentFormat.supportsQuality && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className={labelClasses}>Quality</Label>
            <span className={`${descriptionClasses} font-mono`}>
              {settings.quality}%
            </span>
          </div>
          <Slider
            value={[settings.quality]}
            onValueChange={handleQualityChange}
            min={1}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      )}

      {/* Compression Settings */}
      {currentFormat.supportsCompression && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className={labelClasses}>Compression</Label>
            <span className={`${descriptionClasses} font-mono`}>
              {settings.compression}%
            </span>
          </div>
          <Slider
            value={[settings.compression]}
            onValueChange={handleCompressionChange}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      )}

      {/* Advanced Options */}
      <div className="space-y-3">
        <Label className={labelClasses}>Advanced</Label>
        
        <div className="flex items-center justify-between">
          <Label className={descriptionClasses}>Include Metadata</Label>
          <Switch
            checked={settings.includeMetadata}
            onCheckedChange={handleMetadataToggle}
          />
        </div>
      </div>

      <Separator />

      {/* Export Button */}
      <Button
        onClick={onExport}
        disabled={isExporting}
        className={`w-full ${compact ? 'h-8 text-xs' : 'h-10'}`}
        size={compact ? "sm" : "default"}
      >
        <Download className={`${compact ? 'h-3 w-3' : 'h-4 w-4'} mr-2`} />
        {isExporting ? 'Exporting...' : `Export as ${currentFormat.label}`}
      </Button>

      {/* Export Info */}
      <div className={`text-center ${descriptionClasses}`}>
        Final size: {Math.round(settings.width * settings.scale)} × {Math.round(settings.height * settings.scale)} px
        {settings.format === 'svg' && (
          <div className="mt-1">Vector format - scalable to any size</div>
        )}
      </div>
    </div>
  );
});

ExportPanel.displayName = 'ExportPanel';