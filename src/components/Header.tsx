
import { Menu, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/UserMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onMenuClick: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header = ({ onMenuClick, activeSection, setActiveSection }: HeaderProps) => {
  const { user } = useAuth();
  
  const getSectionInfo = () => {
    switch (activeSection) {
      case "unit-converter": return { title: "Convertisseurs d'Unités", subtitle: "12 types d'unités disponibles" };
      case "calculator": return { title: "Calculatrices", subtitle: "Calculatrice avancée et scientifique" };
      case "date-calculator": return { title: "Calculateurs de Dates", subtitle: "Calculs et conversions de dates" };
      case "todo": return { title: "Productivité", subtitle: "Gestion de tâches et organisation" };
      case "password-generator": return { title: "Générateur de Mots de Passe", subtitle: "Sécurité et personnalisation" };
      case "qr-code": return { title: "Générateur QR Code", subtitle: "Création et personnalisation" };
      case "color-generator": return { title: "Générateur de Couleurs", subtitle: "Palettes et outils créatifs" };
      case "bmi-calculator": return { title: "Calculateur IMC", subtitle: "Santé et bien-être" };
      case "text-utils": return { title: "Utilitaires Texte", subtitle: "Manipulation et formatage" };
      case "settings": return { title: "Paramètres", subtitle: "Configuration de l'application" };
      case "about": return { title: "À propos", subtitle: "Informations sur l'application" };
      default: return { title: "À votre service", subtitle: "Votre boîte à outils numérique" };
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            {activeSection !== "home" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection("home")}
                className="hidden sm:flex"
              >
                <Home className="w-4 h-4 mr-2" />
                Accueil
              </Button>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
                {getSectionInfo().title}
              </h1>
              {getSectionInfo().subtitle && (
                <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                  {getSectionInfo().subtitle}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <span>🛠️</span>
            <span>À votre service</span>
          </div>
          
          <ThemeToggle />
          
          {user ? (
            <UserMenu />
          ) : (
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/auth'}
              className="hidden sm:flex"
            >
              Connexion
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
