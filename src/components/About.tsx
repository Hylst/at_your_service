
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Code, Heart, Zap, Shield, Palette, Calculator } from "lucide-react";

export const About = () => {
  const features = [
    {
      icon: Calculator,
      title: "Suite Calculatrices",
      description: "Calculatrices scientifique, graphique, programmeur avec historique, fonctions trigonométriques, logarithmes et statistiques avancées",
      count: "4 calculatrices"
    },
    {
      icon: Code,
      title: "Convertisseurs d'Unités",
      description: "Conversions complètes : longueurs, poids, températures, volumes, surfaces, énergie, vitesse, pression avec précision haute",
      count: "8 catégories"
    },
    {
      icon: Shield,
      title: "Sécurité & Cryptographie",
      description: "Générateur de mots de passe avancé avec templates, analyse de force, historique chiffré et générateur QR codes",
      count: "15+ templates"
    },
    {
      icon: Palette,
      title: "Suite Créativité Complète",
      description: "Générateurs de couleurs, palettes, dégradés, logos, typographies, motifs, filtres d'images avec export professionnel",
      count: "12+ outils"
    },
    {
      icon: Heart,
      title: "Santé & Bien-être",
      description: "Calculateur IMC, suivi nutrition, tracker d'exercices, suivi du sommeil, rappels médicaments et métriques santé",
      count: "10 trackers"
    },
    {
      icon: Zap,
      title: "Productivité Avancée",
      description: "Gestionnaire de tâches avec IA, notes avec tags, timer Pomodoro, objectifs avec milestones et statistiques détaillées",
      count: "5 modules"
    }
  ];

  const technologies = [
    "React 18.3.1", "TypeScript 5.5.3", "Vite", "Tailwind CSS", "Shadcn/ui", 
    "Supabase", "IndexedDB", "Dexie.js", "React Query", "Lucide Icons", 
    "date-fns", "Framer Motion", "Web Workers", "PWA"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* En-tête principal */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-2xl">
              🛠️
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            À votre service
          </CardTitle>
          <Badge variant="outline" className="mb-2 text-sm font-semibold">
            Version 1.5.8 (2025)
          </Badge>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Votre écosystème numérique tout-en-un pour la productivité et la créativité
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Une plateforme complète regroupant plus de 40 outils professionnels :
            calculatrices scientifiques, suite créativité avancée, outils de productivité avec IA,
            convertisseurs haute précision, générateurs de sécurité, trackers santé et bien-être.
            Conçue pour les professionnels, étudiants et créatifs exigeants.
          </p>
        </CardHeader>
      </Card>

      {/* Fonctionnalités principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Card key={index} className="group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/30 dark:hover:to-indigo-950/30 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-xl shadow-inner group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">{feature.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">{feature.count}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Technologies utilisées */}
      <Card className="group hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-950/30 dark:hover:to-teal-950/30 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
            <Code className="w-5 h-5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300" />
            Technologies Utilisées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-sm hover:bg-emerald-100 hover:text-emerald-800 dark:hover:bg-emerald-900 dark:hover:text-emerald-200 transition-all duration-300 hover:scale-105 cursor-default">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Caractéristiques */}
      <Card className="group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-950/30 dark:hover:to-pink-950/30 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
            <Zap className="w-5 h-5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
            Caractéristiques
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/item">
              <h4 className="font-semibold text-green-600 group-hover/item:text-green-700 dark:group-hover/item:text-green-400 transition-colors duration-300">✓ Architecture Modulaire Avancée</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200 transition-colors duration-300">
                Composants réutilisables avec hooks personnalisés et gestion d'état optimisée
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/item">
              <h4 className="font-semibold text-green-600 group-hover/item:text-green-700 dark:group-hover/item:text-green-400 transition-colors duration-300">✓ Stockage Multi-Couches</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200 transition-colors duration-300">
                IndexedDB + Supabase + localStorage pour une persistance robuste
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/item">
              <h4 className="font-semibold text-green-600 group-hover/item:text-green-700 dark:group-hover/item:text-green-400 transition-colors duration-300">✓ Intelligence Artificielle Intégrée</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200 transition-colors duration-300">
                Décomposition de tâches, suggestions intelligentes et analyse automatique
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/item">
              <h4 className="font-semibold text-green-600 group-hover/item:text-green-700 dark:group-hover/item:text-green-400 transition-colors duration-300">✓ Export/Import Universel</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200 transition-colors duration-300">
                Formats multiples (JSON, CSV, SVG, PNG, PDF) avec compression automatique
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/item">
              <h4 className="font-semibold text-green-600 group-hover/item:text-green-700 dark:group-hover/item:text-green-400 transition-colors duration-300">✓ Performance Optimisée</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200 transition-colors duration-300">
                Lazy loading, Web Workers, cache intelligent et PWA
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-300 hover:shadow-md hover:scale-[1.02] group/item">
              <h4 className="font-semibold text-green-600 group-hover/item:text-green-700 dark:group-hover/item:text-green-400 transition-colors duration-300">✓ Accessibilité WCAG 2.1</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200 transition-colors duration-300">
                Navigation clavier, lecteurs d'écran, contraste automatique
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outils Détaillés */}
      <Card className="group hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-blue-50 dark:hover:from-indigo-950/30 dark:hover:to-blue-950/30 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">
            <Zap className="w-5 h-5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300" />
            Catalogue Complet des Outils
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Calculatrices */}
            <div className="space-y-2 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-indigo-50 hover:to-blue-50 dark:hover:from-indigo-900/30 dark:hover:to-blue-900/30 transition-all duration-300 hover:shadow-md group/category">
              <h4 className="font-semibold text-blue-600 group-hover/category:text-blue-700 dark:group-hover/category:text-blue-300 transition-colors duration-300">🧮 Suite Calculatrices</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 group-hover/category:text-gray-700 dark:group-hover/category:text-gray-200 transition-colors duration-300">
                <li>• Calculatrice Scientifique</li>
                <li>• Calculatrice Graphique</li>
                <li>• Calculatrice Programmeur</li>
                <li>• Calculatrice de Base</li>
              </ul>
            </div>
            
            {/* Créativité */}
            <div className="space-y-2 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-indigo-50 hover:to-blue-50 dark:hover:from-indigo-900/30 dark:hover:to-blue-900/30 transition-all duration-300 hover:shadow-md group/category">
              <h4 className="font-semibold text-purple-600 group-hover/category:text-purple-700 dark:group-hover/category:text-purple-300 transition-colors duration-300">🎨 Suite Créativité</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 group-hover/category:text-gray-700 dark:group-hover/category:text-gray-200 transition-colors duration-300">
                <li>• Générateur de Couleurs</li>
                <li>• Créateur de Palettes</li>
                <li>• Générateur de Dégradés</li>
                <li>• Créateur de Logos</li>
                <li>• Générateur de Typographies</li>
                <li>• Générateur de Motifs</li>
                <li>• Filtres d'Images</li>
                <li>• Bibliothèque d'Icônes</li>
              </ul>
            </div>
            
            {/* Productivité */}
            <div className="space-y-2 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-indigo-50 hover:to-blue-50 dark:hover:from-indigo-900/30 dark:hover:to-blue-900/30 transition-all duration-300 hover:shadow-md group/category">
              <h4 className="font-semibold text-green-600 group-hover/category:text-green-700 dark:group-hover/category:text-green-300 transition-colors duration-300">⚡ Suite Productivité</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 group-hover/category:text-gray-700 dark:group-hover/category:text-gray-200 transition-colors duration-300">
                <li>• Gestionnaire de Tâches IA</li>
                <li>• Gestionnaire de Notes</li>
                <li>• Timer Pomodoro</li>
                <li>• Gestionnaire d'Objectifs</li>
                <li>• Liste de Tâches Avancée</li>
              </ul>
            </div>
            
            {/* Santé */}
            <div className="space-y-2 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-indigo-50 hover:to-blue-50 dark:hover:from-indigo-900/30 dark:hover:to-blue-900/30 transition-all duration-300 hover:shadow-md group/category">
              <h4 className="font-semibold text-red-600 group-hover/category:text-red-700 dark:group-hover/category:text-red-300 transition-colors duration-300">❤️ Santé & Bien-être</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 group-hover/category:text-gray-700 dark:group-hover/category:text-gray-200 transition-colors duration-300">
                <li>• Calculateur IMC</li>
                <li>• Tracker Nutrition</li>
                <li>• Tracker d'Exercices</li>
                <li>• Suivi du Sommeil</li>
                <li>• Tracker d'Eau</li>
                <li>• Rappels Médicaments</li>
                <li>• Suivi Mental</li>
              </ul>
            </div>
            
            {/* Utilitaires */}
            <div className="space-y-2 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-indigo-50 hover:to-blue-50 dark:hover:from-indigo-900/30 dark:hover:to-blue-900/30 transition-all duration-300 hover:shadow-md group/category">
              <h4 className="font-semibold text-orange-600 group-hover/category:text-orange-700 dark:group-hover/category:text-orange-300 transition-colors duration-300">🔧 Utilitaires</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 group-hover/category:text-gray-700 dark:group-hover/category:text-gray-200 transition-colors duration-300">
                <li>• Convertisseurs d'Unités</li>
                <li>• Calculateur de Dates</li>
                <li>• Générateur QR Codes</li>
                <li>• Outils Texte Avancés</li>
                <li>• Analyseur SEO</li>
                <li>• Éditeur Markdown</li>
              </ul>
            </div>
            
            {/* Sécurité */}
            <div className="space-y-2 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:from-indigo-50 hover:to-blue-50 dark:hover:from-indigo-900/30 dark:hover:to-blue-900/30 transition-all duration-300 hover:shadow-md group/category">
              <h4 className="font-semibold text-gray-600 group-hover/category:text-gray-700 dark:group-hover/category:text-gray-300 transition-colors duration-300">🔐 Sécurité</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 group-hover/category:text-gray-700 dark:group-hover/category:text-gray-200 transition-colors duration-300">
                <li>• Générateur Mots de Passe</li>
                <li>• Templates Sécurisés</li>
                <li>• Analyse de Force</li>
                <li>• Historique Chiffré</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* À propos de l'auteur */}
      <Card className="group hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 hover:border-orange-300 dark:hover:border-orange-700 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors duration-300">
            <Heart className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors duration-300" />
            À propos de l'auteur
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center group/author">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover/author:text-orange-700 dark:group-hover/author:text-orange-300 transition-colors duration-300">
              Geoffroy Streit (Hylst)
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2 group-hover/author:text-gray-700 dark:group-hover/author:text-gray-200 transition-colors duration-300">
              Développeur passionné par l'innovation et l'expérience utilisateur
            </p>
          </div>
          
          <Separator />
          
          <div className="text-center space-y-2 group/description">
            <p className="text-sm text-gray-500 dark:text-gray-400 group-hover/description:text-gray-600 dark:group-hover/description:text-gray-300 transition-colors duration-300">
              À votre service représente l'aboutissement de plusieurs années de développement,
              avec pour objectif de créer l'écosystème numérique le plus complet et intuitif possible.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 group-hover/description:text-gray-600 dark:group-hover/description:text-gray-300 transition-colors duration-300">
              Chaque outil a été conçu avec une attention particulière à la performance,
              l'accessibilité et l'expérience utilisateur moderne.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Copyright et Version */}
      <div className="text-center py-8 border-t border-gray-200 dark:border-gray-700 group/footer hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-blue-50/50 dark:hover:from-indigo-950/20 dark:hover:to-blue-950/20 transition-all duration-300 rounded-lg">
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 group-hover/footer:text-gray-600 dark:group-hover/footer:text-gray-300 transition-colors duration-300 font-medium">
            © 2025 Geoffroy Streit (Hylst) - Tous droits réservés
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 group-hover/footer:text-gray-500 dark:group-hover/footer:text-gray-400 transition-colors duration-300">
            À votre service v1.5.8 - Écosystème numérique professionnel
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 group-hover/footer:text-gray-500 dark:group-hover/footer:text-gray-400 transition-colors duration-300">
            Architecture moderne : React 18 + TypeScript + Supabase + IndexedDB
          </p>
        </div>
      </div>
    </div>
  );
};
