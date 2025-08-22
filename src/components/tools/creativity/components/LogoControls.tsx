
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogoSettings } from '../types/logoTypes';
import { fontFamilies, iconOptions, shapes, layouts } from '../data/logoPresets';
import { ColorInput, RangeSlider, SelectDropdown, FormSection } from './shared/FormControls';

interface LogoControlsProps {
  logo: LogoSettings;
  onUpdate: (updates: Partial<LogoSettings>) => void;
}

export const LogoControls = ({ logo, onUpdate }: LogoControlsProps) => {
  return (
    <div className="space-y-4">
      {/* Texte du logo */}
      <FormSection title="Contenu" description="Configurez le texte et la mise en page de votre logo">
        <div>
          <Label className="text-sm font-medium mb-2 block">Texte du logo</Label>
          <Input
            value={logo.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            placeholder="Mon Logo"
            className="w-full"
          />
        </div>

        {/* Disposition */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Disposition</Label>
          <div className="grid grid-cols-2 gap-2">
            {layouts.map((layout) => (
              <Button
                key={layout.key}
                onClick={() => onUpdate({ layout: layout.key })}
                variant={logo.layout === layout.key ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2"
              >
                <span>{layout.icon}</span>
                <span className="text-xs">{layout.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </FormSection>

      {/* Icône */}
      {logo.layout !== 'text-only' && (
        <FormSection title="Icône" description="Sélectionnez et personnalisez l'icône de votre logo" collapsible={true} defaultExpanded={true}>
          <div className="grid grid-cols-8 gap-2 max-h-32 overflow-y-auto mb-3">
            {iconOptions.map((iconOption) => (
              <Button
                key={iconOption}
                onClick={() => onUpdate({ icon: iconOption })}
                variant={logo.icon === iconOption ? "default" : "outline"}
                size="sm"
                className="aspect-square p-1"
              >
                {iconOption}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <RangeSlider
                label="Taille"
                value={logo.iconSize}
                onChange={(value) => onUpdate({ iconSize: value })}
                min={16}
                max={64}
                step={1}
                unit="px"
              />
            </div>
            <div>
              <ColorInput
                label="Couleur"
                value={logo.iconColor}
                onChange={(value) => onUpdate({ iconColor: value })}
                showColorPreview={true}
              />
            </div>
          </div>
        </FormSection>
      )}

      {/* Police et texte */}
      {logo.layout !== 'icon-only' && (
        <FormSection title="Typographie" description="Personnalisez le style du texte" collapsible={true} defaultExpanded={true}>
          <SelectDropdown
            label="Police"
            value={logo.fontFamily}
            onChange={(value) => onUpdate({ fontFamily: value })}
            options={fontFamilies.map(font => ({
              value: font.value,
              label: font.name
            }))}
          />

          <div className="grid grid-cols-2 gap-3">
            <RangeSlider
              label="Taille"
              value={logo.fontSize}
              onChange={(value) => onUpdate({ fontSize: value })}
              min={12}
              max={48}
              step={1}
              unit="px"
            />
            <ColorInput
              label="Couleur"
              value={logo.textColor}
              onChange={(value) => onUpdate({ textColor: value })}
              showColorPreview={true}
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Graisse</Label>
            <div className="grid grid-cols-3 gap-2">
              {['300', '400', '700'].map((weight) => (
                <Button
                  key={weight}
                  onClick={() => onUpdate({ fontWeight: weight })}
                  variant={logo.fontWeight === weight ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                >
                  {weight === '300' ? 'Light' : weight === '400' ? 'Normal' : 'Bold'}
                </Button>
              ))}
            </div>
          </div>
        </FormSection>
      )}

      {/* Forme et couleurs */}
      <FormSection title="Style et apparence" description="Configurez les couleurs et la forme de votre logo" collapsible={true} defaultExpanded={true}>
        <div>
          <Label className="text-sm font-medium mb-2 block">Forme de fond</Label>
          <div className="grid grid-cols-3 gap-2">
            {shapes.map((shape) => (
              <Button
                key={shape.key}
                onClick={() => onUpdate({ shape: shape.key })}
                variant={logo.shape === shape.key ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
              >
                <span>{shape.icon}</span>
                <span className="text-xs">{shape.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ColorInput
            label="Couleur de fond"
            value={logo.backgroundColor}
            onChange={(value) => onUpdate({ backgroundColor: value })}
            showColorPreview={true}
          />
          <ColorInput
            label="Couleur forme"
            value={logo.shapeColor}
            onChange={(value) => onUpdate({ shapeColor: value })}
            showColorPreview={true}
          />
        </div>

        <RangeSlider
          label="Espacement"
          value={logo.padding}
          onChange={(value) => onUpdate({ padding: value })}
          min={8}
          max={40}
          step={1}
          unit="px"
        />

        <div className="grid grid-cols-2 gap-3">
          <RangeSlider
            label="Bordure"
            value={logo.borderWidth}
            onChange={(value) => onUpdate({ borderWidth: value })}
            min={0}
            max={8}
            step={1}
            unit="px"
          />
          <ColorInput
            label="Couleur bordure"
            value={logo.borderColor}
            onChange={(value) => onUpdate({ borderColor: value })}
            showColorPreview={true}
          />
        </div>
      </FormSection>
    </div>
  );
};
