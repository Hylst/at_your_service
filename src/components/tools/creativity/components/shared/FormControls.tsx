import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Shuffle, Copy, Download, Heart, RefreshCw } from 'lucide-react';
import { isValidHexColor } from '@/utils/colorUtils';

/**
 * Props for color input component
 */
interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showColorPreview?: boolean;
  className?: string;
  error?: string;
}

/**
 * Color input component with validation and preview
 */
export const ColorInput: React.FC<ColorInputProps> = ({
  label,
  value,
  onChange,
  placeholder = '#000000',
  showColorPreview = true,
  className = '',
  error
}) => {
  /**
   * Handle input change with validation
   */
  const handleChange = (inputValue: string) => {
    let formattedValue = inputValue;
    
    // Add # if missing
    if (formattedValue && !formattedValue.startsWith('#')) {
      formattedValue = '#' + formattedValue;
    }
    
    onChange(formattedValue);
  };

  const isValid = isValidHexColor(value);

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={`color-input-${label}`}>{label}</Label>
      <div className="flex gap-2">
        {showColorPreview && (
          <div 
            className={`w-10 h-10 rounded border-2 ${isValid ? 'border-border' : 'border-destructive'} shadow-sm`}
            style={{ backgroundColor: isValid ? value : 'hsl(var(--muted))' }}
          />
        )}
        <div className="flex-1">
          <Input
            id={`color-input-${label}`}
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            className={error || !isValid ? 'border-destructive' : ''}
          />
          {(error || (!isValid && value)) && (
            <p className="text-sm text-destructive mt-1">
              {error || 'Format de couleur invalide (ex: #FF0000)'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Props for range slider component
 */
interface RangeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  showValue?: boolean;
  className?: string;
}

/**
 * Range slider component with label and value display
 */
export const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  showValue = true,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        {showValue && (
          <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">
            {value}{unit}
          </span>
        )}
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );
};

/**
 * Props for select dropdown component
 */
interface SelectDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; description?: string }>;
  placeholder?: string;
  className?: string;
}

/**
 * Select dropdown component with options
 */
export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Sélectionner...',
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div>
                <div>{option.label}</div>
                {option.description && (
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

/**
 * Props for action buttons group
 */
interface ActionButtonsProps {
  onGenerate?: () => void;
  onRandom?: () => void;
  onCopy?: () => void;
  onExport?: () => void;
  onFavorite?: () => void;
  onReset?: () => void;
  generateLabel?: string;
  randomLabel?: string;
  copyLabel?: string;
  exportLabel?: string;
  favoriteLabel?: string;
  resetLabel?: string;
  isGenerating?: boolean;
  isFavorited?: boolean;
  className?: string;
}

/**
 * Action buttons group component
 */
export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onGenerate,
  onRandom,
  onCopy,
  onExport,
  onFavorite,
  onReset,
  generateLabel = 'Générer',
  randomLabel = 'Aléatoire',
  copyLabel = 'Copier',
  exportLabel = 'Exporter',
  favoriteLabel = 'Favoris',
  resetLabel = 'Reset',
  isGenerating = false,
  isFavorited = false,
  className = ''
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {onGenerate && (
        <Button 
          onClick={onGenerate} 
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          <Palette className="w-4 h-4" />
          {isGenerating ? 'Génération...' : generateLabel}
        </Button>
      )}
      
      {onRandom && (
        <Button 
          variant="outline" 
          onClick={onRandom}
          className="flex items-center gap-2"
        >
          <Shuffle className="w-4 h-4" />
          {randomLabel}
        </Button>
      )}
      
      {onCopy && (
        <Button 
          variant="outline" 
          onClick={onCopy}
          className="flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          {copyLabel}
        </Button>
      )}
      
      {onExport && (
        <Button 
          variant="outline" 
          onClick={onExport}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          {exportLabel}
        </Button>
      )}
      
      {onFavorite && (
        <Button 
          variant={isFavorited ? 'default' : 'outline'} 
          onClick={onFavorite}
          className="flex items-center gap-2"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          {favoriteLabel}
        </Button>
      )}
      
      {onReset && (
        <Button 
          variant="outline" 
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          {resetLabel}
        </Button>
      )}
    </div>
  );
};

/**
 * Props for form section component
 */
interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  className?: string;
}

/**
 * Form section component with optional collapsible functionality
 */
export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  collapsible = false,
  defaultExpanded = true,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div 
          className={`flex items-center justify-between mb-3 ${collapsible ? 'cursor-pointer' : ''}`}
          onClick={collapsible ? () => setIsExpanded(!isExpanded) : undefined}
        >
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {collapsible && (
            <Button variant="ghost" size="sm">
              {isExpanded ? '−' : '+'}
            </Button>
          )}
        </div>
        
        {(!collapsible || isExpanded) && (
          <div className="space-y-4">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Props for color format selector
 */
interface ColorFormatSelectorProps {
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  availableFormats?: Array<{ value: string; label: string }>;
  className?: string;
}

/**
 * Color format selector component
 */
export const ColorFormatSelector: React.FC<ColorFormatSelectorProps> = ({
  selectedFormat,
  onFormatChange,
  availableFormats = [
    { value: 'hex', label: 'HEX' },
    { value: 'rgb', label: 'RGB' },
    { value: 'hsl', label: 'HSL' },
    { value: 'cmyk', label: 'CMYK' },
    { value: 'hsv', label: 'HSV' }
  ],
  className = ''
}) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {availableFormats.map((format) => (
        <Button
          key={format.value}
          variant={selectedFormat === format.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFormatChange(format.value)}
        >
          {format.label}
        </Button>
      ))}
    </div>
  );
};