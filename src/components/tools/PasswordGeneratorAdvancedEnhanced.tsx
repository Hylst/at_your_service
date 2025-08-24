import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { Copy, Download, Settings, BarChart, Heart, Sparkles } from "lucide-react";

// Import enhanced components
import { PasswordAnalyzerEnhanced } from "./passwordGenerator/PasswordAnalyzerEnhanced";
import { PasswordTemplatesEnhanced } from "./passwordGenerator/PasswordTemplatesEnhanced";
import { PasswordSettingsAdvanced } from "./passwordGenerator/PasswordSettingsAdvanced";
import { PasswordHistoryAdvanced } from "./passwordGenerator/PasswordHistoryAdvanced";
import { PasswordDisplayAdvanced } from "./passwordGenerator/PasswordDisplayAdvanced";
import { DataImportExport } from "./common/DataImportExport";

// Import enhanced hook
import { usePasswordGeneratorEnhanced } from "./passwordGenerator/hooks/usePasswordGeneratorEnhanced";

export const PasswordGeneratorAdvancedEnhanced = () => {
  const {
    currentPassword,
    settings,
    currentStrength,
    isGenerating,
    history,
    templates,
    stats,
    templateFavorites,
    generatePassword,
    analyzeStrength,
    updateSettings,
    applyTemplate,
    toggleTemplateFavorite,
    toggleFavorite,
    markAsCopied,
    exportUniversalData,
    importUniversalData
  } = usePasswordGeneratorEnhanced();

  const [activeTab, setActiveTab] = useState("generator");
  const passwordDisplayRef = useRef<HTMLDivElement>(null);

  // Fonction pour faire défiler vers le bloc de mot de passe généré
  const scrollToPasswordDisplay = useCallback(() => {
    if (passwordDisplayRef.current) {
      passwordDisplayRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, []);

  const handleCopyPassword = async (password: string, entryId?: string) => {
    try {
      await navigator.clipboard.writeText(password);
      toast.success("Mot de passe copié !");
      if (entryId) {
        markAsCopied(entryId);
      }
    } catch (error) {
      toast.error("Erreur lors de la copie");
    }
  };

  const handleGenerateAndCopy = async () => {
    const password = await generatePassword();
    if (password) {
      handleCopyPassword(password);
      // Faire défiler vers le bloc de mot de passe généré
      setTimeout(() => scrollToPasswordDisplay(), 100);
    }
  };

  const handleGenerate = () => {
    generatePassword();
    // Faire défiler vers le bloc de mot de passe généré
    setTimeout(() => scrollToPasswordDisplay(), 100);
  };

  const handleApplyTemplate = (templateId: string) => {
    applyTemplate(templateId);
    // Faire défiler vers le bloc de mot de passe généré
    setTimeout(() => scrollToPasswordDisplay(), 100);
  };

  if (isGenerating) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="text-lg">Génération en cours...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Structure unifiée avec menu à onglets, bloc mot de passe, puis contenu */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Menu à onglets tout en haut de page */}
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="generator">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </TabsTrigger>
          <TabsTrigger value="analyzer">
            <BarChart className="w-4 h-4 mr-2" />
            Analyseur
          </TabsTrigger>
          <TabsTrigger value="templates">
            <Sparkles className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="history">
            <Heart className="w-4 h-4 mr-2" />
            Historique
          </TabsTrigger>
          <TabsTrigger value="export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </TabsTrigger>
        </TabsList>

        {/* Bloc mot de passe généré - Toujours visible après le menu à onglets */}
        <Card>
          <CardContent>
            <div ref={passwordDisplayRef}>
              <PasswordDisplayAdvanced
                password={currentPassword}
                strength={currentStrength || { 
                  score: 0, level: '', color: '', feedback: [], entropy: 0
                }}
                onCopy={handleCopyPassword}
                stats={stats}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1"
              >
                {isGenerating ? 'Génération...' : 'Générer'}
              </Button>
              <Button 
                onClick={handleGenerateAndCopy}
                disabled={isGenerating}
                variant="outline"
              >
                <Copy className="w-4 h-4 mr-2" />
                Générer & Copier
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contenu des onglets - Affiché après le bloc mot de passe */}
        <TabsContent value="generator" className="space-y-4">
          <PasswordSettingsAdvanced
            settings={settings}
            onSettingsChange={updateSettings}
            templates={templates}
            onApplyTemplate={handleApplyTemplate}
          />
        </TabsContent>

        <TabsContent value="analyzer" className="space-y-4">
          <PasswordAnalyzerEnhanced
            password={currentPassword}
            analyzeStrength={analyzeStrength}
          />
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <PasswordTemplatesEnhanced
            templates={templates}
            onApplyTemplate={handleApplyTemplate}
            onToggleFavorite={toggleTemplateFavorite}
            favorites={templateFavorites}
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <PasswordHistoryAdvanced
            history={history}
            templates={templates}
            onCopy={handleCopyPassword}
            onToggleFavorite={toggleFavorite}
          />
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <DataImportExport
            onExport={() => exportUniversalData()}
            onImport={(file) => importUniversalData(file)}
            onReset={() => {}}
            isOnline={true}
            isSyncing={false}
            toolName="Générateur de Mots de Passe"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};