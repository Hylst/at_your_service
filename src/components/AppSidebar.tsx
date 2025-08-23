
import { Calendar, Home, Calculator, CheckSquare, Palette, Heart, FileText, Shield, Settings, Info, User, Database, Briefcase } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const AppSidebar = ({ activeSection, setActiveSection }: AppSidebarProps) => {
  const { user } = useAuth();
  const { setOpenMobile, isMobile } = useSidebar();
  const navigate = useNavigate();

  const handleMenuClick = (sectionId: string) => {
    // Si c'est la section settings, naviguer vers la page /settings
    if (sectionId === "settings") {
      navigate('/settings');
      return;
    }
    
    setActiveSection(sectionId);
    // Fermer le menu sur mobile après sélection
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const menuItems = [
    { id: "home", label: "Accueil", icon: Home },
    { id: "unit-converter", label: "Convertisseurs", icon: Calculator },
    { id: "calculator", label: "Calculatrices", icon: Calculator },
    { id: "date-calculator-advanced", label: "Dates & Temps", icon: Calendar },
    { id: "career-productivity", label: "Carrière & Productivité", icon: Briefcase },
    { id: "productivity-suite", label: "Suite Productivité", icon: CheckSquare },
    { id: "password-generator-advanced", label: "Sécurité Avancée", icon: Shield },
    { id: "color-generator", label: "Créativité", icon: Palette },
    { id: "health-wellness-suite", label: "Santé", icon: Heart },
    { id: "text-utils-advanced", label: "Utilitaires Texte", icon: FileText },
    { id: "settings", label: "Paramètres", icon: Settings },
    { id: "profile", label: "Mon Profil", icon: User },
    { id: "data-manager", label: "Gestion Données", icon: Database },
    { id: "about", label: "À propos", icon: Info },
  ];

  // Filtrer les éléments selon l'état de connexion de l'utilisateur
  const filteredMenuItems = user ? menuItems : menuItems.filter(item => item.id !== "profile");

  return (
    <Sidebar collapsible="offcanvas" className="group">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-blue-50/50 dark:hover:from-indigo-950/20 dark:hover:to-blue-950/20 transition-all duration-300 rounded-lg mx-1 group/header">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 text-white group-hover/header:from-indigo-600 group-hover/header:to-purple-600 transition-all duration-300 group-hover/header:scale-110 group-hover/header:rotate-3 shadow-md group-hover/header:shadow-lg">
            <span className="animate-bounce hover:animate-spin transition-all duration-300 transform hover:scale-125" title="Logo animé">🛠️</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold group-hover/header:text-indigo-700 dark:group-hover/header:text-indigo-300 transition-colors duration-300">À votre service</span>
            <span className="truncate text-xs text-gray-500 group-hover/header:text-indigo-600 dark:group-hover/header:text-indigo-400 transition-colors duration-300">Écosystème numérique</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 dark:text-gray-400 font-medium tracking-wide hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {filteredMenuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => handleMenuClick(item.id)}
                      isActive={activeSection === item.id}
                      tooltip={item.label}
                      className={`group/item relative overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50/80 hover:to-blue-50/80 dark:hover:from-indigo-950/30 dark:hover:to-blue-950/30 hover:shadow-md hover:scale-[1.02] rounded-lg mx-1 ${
                        activeSection === item.id 
                          ? 'bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40 shadow-md border border-indigo-200/50 dark:border-indigo-700/50' 
                          : 'hover:border hover:border-indigo-200/30 dark:hover:border-indigo-700/30'
                      }`}
                    >
                      <IconComponent className={`w-4 h-4 transition-all duration-300 group-hover/item:scale-110 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 ${
                        activeSection === item.id ? 'text-indigo-700 dark:text-indigo-300' : ''
                      }`} />
                      <span className={`transition-all duration-300 group-hover/item:text-indigo-700 dark:group-hover/item:text-indigo-300 group-hover/item:font-medium ${
                        activeSection === item.id ? 'text-indigo-800 dark:text-indigo-200 font-medium' : ''
                      }`}>{item.label}</span>
                      {/* Effet de surbrillance au survol - Fixed interactions */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/10 to-indigo-400/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-2 text-center space-y-1 hover:bg-gradient-to-t hover:from-indigo-50/30 hover:to-transparent dark:hover:from-indigo-950/20 dark:hover:to-transparent transition-all duration-300 rounded-lg mx-1 group/footer">
          <p className="text-xs text-gray-500 group-hover/footer:text-indigo-600 dark:group-hover/footer:text-indigo-400 transition-colors duration-300 font-medium">v1.5.8</p>
          <p className="text-xs text-gray-400 group-hover/footer:text-indigo-500 dark:group-hover/footer:text-indigo-300 transition-colors duration-300">Tous droits réservés - Geoffroy Streit</p>
          {/* Effet de surbrillance subtile */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-400/5 to-transparent opacity-0 group-hover/footer:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
