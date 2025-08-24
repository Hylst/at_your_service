import React from 'react';
import { X, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SectionInfo } from '@/config/sectionsConfig';
import { cn } from '@/lib/utils';

interface SectionInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionInfo: SectionInfo;
}

/**
 * Modal d'information pour afficher les détails d'une section
 * Affiche le titre, la description détaillée et les fonctionnalités principales
 */
export const SectionInfoModal: React.FC<SectionInfoModalProps> = ({
  isOpen,
  onClose,
  sectionInfo
}) => {
  const variantStyles = {
    blue: {
      gradient: 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
      border: 'border-blue-200 dark:border-blue-800',
      iconBg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      textGradient: 'bg-gradient-to-r from-blue-600 to-cyan-600',
      badgeVariant: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    },
    green: {
      gradient: 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
      border: 'border-emerald-200 dark:border-emerald-800',
      iconBg: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      textGradient: 'bg-gradient-to-r from-emerald-600 to-teal-600',
      badgeVariant: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
    },
    purple: {
      gradient: 'bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30',
      border: 'border-purple-200 dark:border-purple-800',
      iconBg: 'bg-gradient-to-r from-purple-500 to-violet-500',
      textGradient: 'bg-gradient-to-r from-purple-600 to-violet-600',
      badgeVariant: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    },
    orange: {
      gradient: 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
      border: 'border-orange-200 dark:border-orange-800',
      iconBg: 'bg-gradient-to-r from-orange-500 to-amber-500',
      textGradient: 'bg-gradient-to-r from-orange-600 to-amber-600',
      badgeVariant: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
    },
    red: {
      gradient: 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30',
      border: 'border-red-200 dark:border-red-800',
      iconBg: 'bg-gradient-to-r from-red-500 to-pink-500',
      textGradient: 'bg-gradient-to-r from-red-600 to-pink-600',
      badgeVariant: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    },
    teal: {
      gradient: 'bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30',
      border: 'border-teal-200 dark:border-teal-800',
      iconBg: 'bg-gradient-to-r from-teal-500 to-cyan-500',
      textGradient: 'bg-gradient-to-r from-teal-600 to-cyan-600',
      badgeVariant: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300'
    },
    pink: {
      gradient: 'bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30',
      border: 'border-pink-200 dark:border-pink-800',
      iconBg: 'bg-gradient-to-r from-pink-500 to-rose-500',
      textGradient: 'bg-gradient-to-r from-pink-600 to-rose-600',
      badgeVariant: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
    },
    indigo: {
      gradient: 'bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30',
      border: 'border-indigo-200 dark:border-indigo-800',
      iconBg: 'bg-gradient-to-r from-indigo-500 to-blue-500',
      textGradient: 'bg-gradient-to-r from-indigo-600 to-blue-600',
      badgeVariant: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
    }
  };

  const styles = variantStyles[sectionInfo.variant];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="sr-only">
              Informations sur {sectionInfo.title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer</span>
            </Button>
          </div>
          
          {/* Header avec icône et titre */}
          <Card className={cn(
            'border shadow-sm',
            styles.gradient,
            styles.border
          )}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                {/* Icône */}
                <div className={cn(
                  'flex-shrink-0 p-3 rounded-xl shadow-sm',
                  styles.iconBg
                )}>
                  <div className="w-8 h-8 text-white flex items-center justify-center text-2xl">
                    {sectionInfo.icon}
                  </div>
                </div>
                
                {/* Titre et sous-titre */}
                <div className="flex-1 min-w-0">
                  <h2 className={cn(
                    'text-2xl md:text-3xl font-bold bg-clip-text text-transparent',
                    styles.textGradient
                  )}>
                    {sectionInfo.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {sectionInfo.subtitle}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Description
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {sectionInfo.description}
            </p>
          </div>
          
          {/* Fonctionnalités principales */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Fonctionnalités principales
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sectionInfo.features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium',
                    styles.badgeVariant
                  )}
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose} variant="outline">
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};