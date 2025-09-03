import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { UserProfile } from "@/components/UserProfile";
import UnitConverter from "@/components/tools/UnitConverter";
import { CalculatorImproved } from "@/components/tools/CalculatorImproved";
import { TodoListEnhanced } from "@/components/tools/TodoListEnhanced";
import { ColorGenerator } from "@/components/tools/ColorGenerator";
import { BMICalculator } from "@/components/tools/BMICalculator";
import { TextUtilsAdvanced } from "@/components/tools/TextUtilsAdvanced";
import DateCalculatorAdvanced from "@/components/tools/DateCalculatorAdvanced";
import { ProductivitySuiteModular } from "@/components/tools/ProductivitySuiteModular";
import { PasswordGeneratorUnified } from "@/components/tools/PasswordGeneratorUnified";
import { QRCodeGenerator } from "@/components/tools/QRCodeGenerator";
import { HealthWellnessSuite } from "@/components/tools/HealthWellnessSuite";
import { CareerProductivity } from "@/components/tools/CareerProductivity";
import { About } from "@/components/About";
import { UniversalDataManager } from "@/components/tools/common/UniversalDataManager";
import { AppSettings } from "@/components/tools/common/AppSettings";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/UserMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Header } from "@/components/Header";

// New design system components
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Grid } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ToolCard } from "@/components/ui/tool-card";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Gérer la navigation via URL params (depuis Settings)
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setActiveSection(section);
      // Nettoyer l'URL après avoir mis à jour l'état
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate]);

  const getSectionTitle = () => {
    switch (activeSection) {
      case "unit-converter": return "Convertisseurs d'Unités";
      case "calculator": return "Calculatrices";
      case "date-calculator-advanced": return "Dates & Temps Avancés";
      case "career-productivity": return "Carrière & Productivité Pro";
      case "productivity-suite": return "Suite Productivité";
      case "password-generator-advanced": return "Générateur de Mots de Passe";
      case "color-generator": return "Générateur de Couleurs";
      case "bmi-calculator": return "Calculateur IMC";
      case "health-wellness-suite": return "Suite Santé & Bien-être";
      case "text-utils-advanced": return "Utilitaires Texte Avancés";
      case "data-manager": return "Gestionnaire de Données";
      case "settings": return "Paramètres";
      case "profile": return "Mon Profil";
      case "about": return "À propos";
      default: return "À Votre Service";
    }
  };

  const handleProfileClick = () => {
    setActiveSection("profile");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "unit-converter":
        return <UnitConverter />;
      case "calculator":
        return <CalculatorImproved />;
      case "date-calculator-advanced":
        return <DateCalculatorAdvanced />;
      case "career-productivity":
        return <CareerProductivity />;
      case "productivity-suite":
        return <ProductivitySuiteModular />;
      case "password-generator-advanced":
        return <PasswordGeneratorUnified />;
      case "color-generator":
        return <ColorGenerator />;
      case "bmi-calculator":
        return <BMICalculator />;
      case "health-wellness-suite":
        return <HealthWellnessSuite />;
      case "text-utils-advanced":
        return <TextUtilsAdvanced />;
      case "data-manager":
        return <UniversalDataManager />;
      case "settings":
        return (
          <div className="max-w-2xl mx-auto">
            <AppSettings />
          </div>
        );
      case "profile":
        return <UserProfile />;
      case "about":
        return <About />;
      default:
        return (
          <div className="space-y-0">
            {/* Hero Section */}
            <Section spacing="xl">
              <Container>
                <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
                  {/* Butler Image */}
                  <div className="lg:w-1/2 flex justify-center">
                    <img 
                      src="/images/majordome-hero.png" 
                      alt="Majordome À Votre Service"
                      className="w-full max-w-md mx-auto lg:max-w-lg"
                    />
                  </div>
                  
                  {/* Text Content */}
                  <div className="lg:w-1/2 text-center lg:text-left">
                    <Heading level={1} gradient className="mb-6">
                      À Votre Service
                    </Heading>
                    <Text size="xl" color="muted" className="mb-8">
                      Votre majordome numérique personnel. Une collection d'outils 
                      professionnels pour optimiser votre quotidien.
                    </Text>
                    
                    {!loading && !user && (
                      <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <Button 
                          onClick={() => navigate('/auth')}
                          className="bg-gradient-to-r from-blue-600 to-teal-600 w-full sm:w-auto"
                          size="lg"
                        >
                          Se connecter
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => navigate('/auth')}
                          className="w-full sm:w-auto"
                          size="lg"
                        >
                          Créer un compte
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Container>
            </Section>
            
            {/* Tools Grid */}
            <Section spacing="lg">
              <Container>
                <Heading level={2} size="2xl" className="text-center mb-8">
                  Outils Disponibles
                </Heading>
                
                <Grid variant="responsive" gap="lg">
                  <ToolCard
                    title="Convertisseurs Universels"
                    description="12 types d'unités : longueurs, poids, températures, devises..."
                    icon="⚖️"
                    tools={["12 Types d'unités", "Temps réel", "Notes explicatives", "Standards SI", "Débounce optimisé"]}
                    onClick={() => setActiveSection("unit-converter")}
                  />
                  
                  <ToolCard
                    title="Calculatrices"
                    description="Scientifique avec saisie clavier"
                    icon="🧮"
                    tools={["Scientifique", "Clavier", "Mémoire", "Historique"]}
                    onClick={() => setActiveSection("calculator")}
                  />
                  
                  <ToolCard
                    title="Dates & Temps Avancés"
                    description="Calculateurs complets de dates"
                    icon="📅"
                    tools={["Différences", "Ajout/Soustraction", "Âge", "Planning", "Fuseaux horaires"]}
                    onClick={() => setActiveSection("date-calculator-advanced")}
                  />
                  
                  <ToolCard
                    title="Carrière & Productivité Pro"
                    description="Outils professionnels pour développer votre carrière"
                    icon="💼"
                    tools={["Coach Pro", "Orientation", "Entretiens", "Assistant Rédac", "CV Builder", "Networking"]}
                    onClick={() => setActiveSection("career-productivity")}
                    variant="highlighted"
                  />
                  
                  <ToolCard
                    title="Suite Productivité Complète"
                    description="Tâches avancées, notes, Pomodoro et to-do list intégrés"
                    icon="🚀"
                    tools={["Tâches intelligentes", "To-do list améliorée", "Notes avec tags", "Pomodoro", "Statistiques", "Synchronisation"]}
                    onClick={() => setActiveSection("productivity-suite")}
                  />
                  
                  <ToolCard
                    title="Sécurité Avancée"
                    description="Générateur de mots de passe sécurisés avec analyse"
                    icon="🔐"
                    tools={["Templates sécurisés", "Analyse de force", "Historique", "Export/Import", "Chiffrement"]}
                    onClick={() => setActiveSection("password-generator-advanced")}
                  />
                  
                  <ToolCard
                    title="Créativité"
                    description="Générateurs et outils créatifs"
                    icon="🎨"
                    tools={["Couleurs", "Palettes", "Design", "Inspiration"]}
                    onClick={() => setActiveSection("color-generator")}
                  />
                  
                  <ToolCard
                    title="Santé & Bien-être"
                    description="Suite complète : IMC, nutrition, sommeil, exercices..."
                    icon="💪"
                    tools={["IMC Avancé", "Nutrition", "Hydratation", "Sommeil", "Exercices", "Mental", "Médicaments", "Métriques", "Poids", "Objectifs"]}
                    onClick={() => setActiveSection("health-wellness-suite")}
                  />
                  
                  <ToolCard
                    title="Utilitaires Texte Avancés"
                    description="Analyse, formatage, transformation et outils avancés"
                    icon="📝"
                    tools={["Compteur avancé", "Formatage", "Analyse sentiment", "Transformation", "SEO", "Markdown", "Colorisation", "Emojis"]}
                    onClick={() => setActiveSection("text-utils-advanced")}
                  />

                  <ToolCard
                    title="Gestionnaire de Données"
                    description="Gérez, exportez et importez toutes vos données en un seul endroit"
                    icon="🗃️"
                    tools={["Export universel", "Import/Export", "Statistiques", "Performance", "Tests intégrés"]}
                    onClick={() => setActiveSection("data-manager")}
                  />
                  
                  <ToolCard
                    title="À propos"
                    description="Informations sur l'application"
                    icon="ℹ️"
                    tools={["Auteur", "Technologies", "Version", "Licence"]}
                    onClick={() => setActiveSection("about")}
                  />
                </Grid>
              </Container>
            </Section>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <Text color="muted">Chargement...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          
          <SidebarInset>
            {/* Header */}
            <Header 
              onMenuClick={() => {}} 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
            
            {/* Main Content */}
            <main className="flex-1">
              <Container className="pt-0.5 pb-6 lg:pb-8">
                {renderContent()}
              </Container>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
