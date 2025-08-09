# 🛠️ Handy Hub Toolkit - Boîte à Outils Pratiques

> Une collection complète d'outils utiles pour votre quotidien numérique

[![Version](https://img.shields.io/badge/version-1.5.8-blue.svg)](https://github.com/your-repo)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)

## 📋 Table des Matières

- [🎯 À Propos](#-à-propos)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🚀 Installation](#-installation)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Technologies](#️-technologies)
- [📱 Outils Disponibles](#-outils-disponibles)
- [🔐 Authentification](#-authentification)
- [💾 Gestion des Données](#-gestion-des-données)
- [🎨 Interface Utilisateur](#-interface-utilisateur)
- [🔧 Développement](#-développement)
- [📊 Performance](#-performance)
- [🤝 Contribution](#-contribution)
- [📄 Licence](#-licence)

## 🎯 À Propos

**Handy Hub Toolkit** est une application web progressive (PWA) qui regroupe une collection d'outils pratiques pour faciliter votre quotidien numérique. Développée avec React et TypeScript, elle offre une expérience utilisateur moderne et intuitive.

### 🎨 Créateur
**Geoffroy Streit** - [Hylst](https://github.com/hylst)

### 🌟 Vision
Créer une plateforme unifiée d'outils utiles, accessible, performante et respectueuse de la vie privée des utilisateurs.

## ✨ Fonctionnalités

### 🔑 Fonctionnalités Principales
- **Interface Moderne**: Design responsive avec Tailwind CSS et shadcn/ui
- **Authentification Sécurisée**: Système complet avec Supabase
- **Synchronisation Multi-Appareils**: Données synchronisées entre vos appareils
- **Mode Hors-Ligne**: Fonctionnement sans connexion internet
- **Thèmes Personnalisables**: Mode sombre/clair avec préférences sauvegardées
- **Performance Optimisée**: Chargement rapide et expérience fluide

### 🛡️ Sécurité & Confidentialité
- Chiffrement des données sensibles
- Authentification sécurisée avec Supabase
- Stockage local sécurisé avec IndexedDB
- Respect du RGPD

## 🚀 Installation

### Prérequis
- Node.js 18+ et npm
- Git

### Installation Locale

```bash
# Cloner le repository
git clone https://github.com/your-username/handy-hub-toolkit.git
cd handy-hub-toolkit

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés Supabase

# Lancer le serveur de développement
npm run dev
```

### Déploiement

```bash
# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## 🏗️ Architecture

### Structure du Projet

```
src/
├── components/          # Composants React
│   ├── ui/             # Composants UI réutilisables
│   ├── tools/          # Composants d'outils spécifiques
│   └── common/         # Composants partagés
├── contexts/           # Contexts React (Auth, Theme)
├── hooks/              # Hooks personnalisés
├── pages/              # Pages de l'application
├── lib/                # Utilitaires et configuration
└── integrations/       # Intégrations externes (Supabase)
```

### Patterns Architecturaux
- **Component-Based Architecture**: Composants réutilisables et modulaires
- **Custom Hooks**: Logique métier encapsulée dans des hooks
- **Context API**: Gestion d'état global pour l'authentification et les thèmes
- **Layered Data Management**: IndexedDB + Supabase + localStorage

## 🛠️ Technologies

### Frontend
- **React 18.3.1**: Bibliothèque UI avec hooks et Suspense
- **TypeScript 5.5.3**: Typage statique pour plus de robustesse
- **Vite**: Build tool moderne et rapide
- **Tailwind CSS**: Framework CSS utilitaire
- **shadcn/ui**: Composants UI modernes et accessibles

### Backend & Base de Données
- **Supabase**: Backend-as-a-Service avec PostgreSQL
- **IndexedDB**: Stockage local pour le mode hors-ligne
- **Dexie.js**: Wrapper moderne pour IndexedDB

### Outils de Développement
- **ESLint**: Linting du code
- **Prettier**: Formatage automatique
- **React Query**: Gestion des requêtes et cache
- **React Router**: Navigation côté client

## 📱 Outils Disponibles

### 🔧 Outils de Productivité
- **Suite Productivité Complète**
  - Gestionnaire de tâches avec IA
  - Notes avec système de tags
  - Timer Pomodoro
  - Statistiques détaillées

### 🔐 Sécurité
- **Générateur de Mots de Passe Avancé**
  - Templates sécurisés
  - Analyse de force
  - Historique chiffré
  - Export/Import

### 🧮 Calculateurs
- **Calculatrice Scientifique**
  - Interface clavier
  - Historique des calculs
  - Fonctions avancées

- **Convertisseur d'Unités Universel**
  - 12 types d'unités
  - Conversion temps réel
  - Notes explicatives

- **Calculateur de Dates Avancé**
  - Différences de dates
  - Planificateur d'événements
  - Fuseaux horaires

### 🎨 Créativité
- **Générateur de Couleurs**
  - Palettes harmonieuses
  - Export formats multiples
  - Générateur de dégradés

### 💪 Santé & Bien-être
- **Suite Santé Complète**
  - Calculateur IMC
  - Suivi nutrition
  - Tracker d'exercices
  - Suivi du sommeil

### 📝 Utilitaires Texte
- **Outils Texte Avancés**
  - Analyseur SEO
  - Éditeur Markdown
  - Comparateur de texte
  - Générateur Lorem Ipsum

## 🔐 Authentification

### Fonctionnalités
- Inscription/Connexion sécurisée
- Gestion des profils utilisateur
- Réinitialisation de mot de passe
- Sessions persistantes

### Sécurité
- Authentification JWT avec Supabase
- Row Level Security (RLS) activée
- Chiffrement des données sensibles
- Protection CSRF

## 💾 Gestion des Données

### Architecture Multi-Couches
1. **IndexedDB**: Stockage local principal
2. **Supabase**: Synchronisation cloud
3. **localStorage**: Cache et préférences
4. **Memory**: État temporaire

### Fonctionnalités
- Synchronisation automatique
- Mode hors-ligne complet
- Export/Import universel
- Sauvegarde automatique
- Gestion des conflits

## 🎨 Interface Utilisateur

### Design System
- **Composants Cohérents**: Basés sur shadcn/ui
- **Responsive Design**: Adaptatif mobile/desktop
- **Accessibilité**: Conforme WCAG 2.1 AA
- **Thèmes**: Mode sombre/clair

### Navigation
- Sidebar collapsible
- Navigation par onglets
- Breadcrumbs contextuels
- Recherche globale

## 🔧 Développement

### Scripts Disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run lint         # Linting du code
npm run type-check   # Vérification TypeScript
```

### Standards de Code
- **TypeScript Strict**: Configuration stricte activée
- **ESLint**: Règles strictes pour la qualité
- **Prettier**: Formatage automatique
- **Conventional Commits**: Messages de commit standardisés

### Tests
```bash
npm run test         # Tests unitaires
npm run test:e2e     # Tests end-to-end
npm run test:coverage # Couverture de code
```

## 📊 Performance

### Métriques Cibles
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 500KB initial
- **Lighthouse Score**: 90+

### Optimisations
- Code splitting par route
- Lazy loading des composants
- Compression des assets
- Service Worker pour le cache
- Optimisation des images

## 🤝 Contribution

### Comment Contribuer
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changes (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Guidelines
- Suivre les conventions de code existantes
- Ajouter des tests pour les nouvelles fonctionnalités
- Documenter les changements dans le CHANGELOG
- Respecter les principes d'accessibilité

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- [Supabase](https://supabase.com) pour le backend
- [shadcn/ui](https://ui.shadcn.com) pour les composants UI
- [Tailwind CSS](https://tailwindcss.com) pour le framework CSS
- [React](https://reactjs.org) pour la bibliothèque UI

---

**Développé avec ❤️ par Geoffroy Streit (Hylst)**

*Dernière mise à jour: Janvier 2025*
