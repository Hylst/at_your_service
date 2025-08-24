
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Palette, Image, Type, Zap, Sparkles, Paintbrush, Camera, Layers } from "lucide-react";
import { SectionHeader } from '@/components/ui/section-header';
import { ColorGeneratorAdvanced } from "./components/ColorGeneratorAdvanced";
import { PaletteGenerator } from "./components/PaletteGenerator";
import { GradientGenerator } from "./components/GradientGenerator";
import { TypographyGenerator } from "./components/TypographyGenerator";
import { ImageFilters } from "./components/ImageFilters";
import { PatternGenerator } from "./components/PatternGenerator";
import { LogoMakerAdvanced } from "./components/LogoMakerAdvanced";
import { IconGenerator } from "./components/IconGenerator";

export const CreativitySuiteAdvanced = () => {
  return (
    <div className="space-y-4 lg:space-y-6">
      <SectionHeader
        title="Suite Créativité Complète"
        subtitle="Créez des couleurs harmonieuses, générez des palettes tendance, créez des dégradés magnifiques, explorez la typographie, appliquez des filtres à vos images et bien plus encore. Une suite complète pour libérer votre créativité !"
        icon={<Sparkles />}
        badges={[
          "Couleurs avancées",
          "Palettes intelligentes",
          "Dégradés dynamiques",
          "Typographie",
          "Filtres image",
          "Motifs & textures",
          "Export optimisé"
        ]}
        variant="purple"
      />

      {/* Navigation par onglets responsive */}
      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 mb-4 lg:mb-8 h-auto">
          <TabsTrigger value="colors" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 lg:p-3">
            <Palette className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Couleurs</span>
          </TabsTrigger>
          <TabsTrigger value="palettes" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 lg:p-3">
            <Paintbrush className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Palettes</span>
          </TabsTrigger>
          <TabsTrigger value="gradients" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 lg:p-3">
            <Layers className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Dégradés</span>
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 lg:p-3">
            <Type className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Typo</span>
          </TabsTrigger>
          <TabsTrigger value="filters" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 lg:p-3">
            <Camera className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Filtres</span>
          </TabsTrigger>
          <TabsTrigger value="patterns" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 lg:p-3">
            <Image className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Motifs</span>
          </TabsTrigger>
          <TabsTrigger value="logos" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 lg:p-3">
            <Zap className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Logos</span>
          </TabsTrigger>
          <TabsTrigger value="icons" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 lg:p-3">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Icônes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors">
          <ColorGeneratorAdvanced />
        </TabsContent>

        <TabsContent value="palettes">
          <PaletteGenerator />
        </TabsContent>

        <TabsContent value="gradients">
          <GradientGenerator />
        </TabsContent>

        <TabsContent value="typography">
          <TypographyGenerator />
        </TabsContent>

        <TabsContent value="filters">
          <ImageFilters />
        </TabsContent>

        <TabsContent value="patterns">
          <PatternGenerator />
        </TabsContent>

        <TabsContent value="logos">
          <LogoMakerAdvanced />
        </TabsContent>

        <TabsContent value="icons">
          <IconGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
};
