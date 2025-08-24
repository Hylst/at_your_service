
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserMenu } from "@/components/UserMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SectionInfoModal } from "@/components/SectionInfoModal";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { getSectionInfo } from "@/config/sectionsConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header = ({ onMenuClick, activeSection, setActiveSection }: HeaderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  
  // Récupération des informations de la section active
  const currentSectionInfo = getSectionInfo(activeSection);

  return (
    <header className="group flex h-16 shrink-0 items-center gap-2 border-b bg-gradient-to-r from-white/90 via-white/95 to-white/90 dark:from-gray-900/90 dark:via-gray-900/95 dark:to-gray-900/90 backdrop-blur-md sticky top-0 z-10 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all duration-300 hover:scale-110 rounded-lg" />
        <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 group-hover:bg-indigo-300 dark:group-hover:bg-indigo-600 transition-colors duration-300" />
        
        {/* Titre de section */}
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 truncate group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">
          {currentSectionInfo.title}
        </h1>
        
        {/* Features badges - visibles sur écrans moyens et plus */}
        {currentSectionInfo.features.length > 0 && (
          <div className="hidden lg:flex gap-1 ml-4">
            {currentSectionInfo.features.slice(0, 3).map((feature, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-2 py-1 whitespace-nowrap bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
              >
                {feature}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Bouton d'information */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsInfoModalOpen(true)}
          className="ml-2 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all duration-300 hover:scale-110"
          title={`Informations sur ${currentSectionInfo.title}`}
        >
          <Info className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="ml-auto flex items-center gap-2 px-4">
        <div className="hover:bg-indigo-100/50 dark:hover:bg-indigo-900/30 rounded-lg p-1 transition-all duration-300 hover:scale-105">
          <ThemeToggle />
        </div>
        
        {user ? (
          <div className="hover:bg-indigo-100/50 dark:hover:bg-indigo-900/30 rounded-lg transition-all duration-300 hover:scale-105">
            <UserMenu />
          </div>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => navigate('/auth')}
            className="hidden sm:flex hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 dark:hover:bg-indigo-950 dark:hover:border-indigo-700 dark:hover:text-indigo-300 transition-all duration-300 hover:scale-105 hover:shadow-md"
            size="sm"
          >
            Connexion
          </Button>
        )}
      </div>
      
      {/* Modal d'information */}
      <SectionInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        sectionInfo={currentSectionInfo}
      />
    </header>
  );
};
