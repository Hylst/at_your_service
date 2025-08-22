import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Heart, Zap, Palette, Info } from 'lucide-react';

/**
 * Props for color psychology analyzer
 */
interface ColorPsychologyAnalyzerProps {
  color: string;
  showDetails?: boolean;
  compact?: boolean;
  className?: string;
}

/**
 * Color psychology data structure
 */
interface ColorPsychology {
  emotions: string[];
  associations: string[];
  industries: string[];
  personality: string[];
  culturalMeanings: { culture: string; meaning: string }[];
  chakra?: string;
  temperature: 'warm' | 'cool' | 'neutral';
  energy: 'high' | 'medium' | 'low';
  recommendations: string[];
}

/**
 * Component to analyze color psychology and emotional associations
 */
export const ColorPsychologyAnalyzer: React.FC<ColorPsychologyAnalyzerProps> = ({
  color,
  showDetails = true,
  compact = false,
  className = ''
}) => {
  /**
   * Convert hex to HSL for analysis
   */
  const hexToHsl = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  /**
   * Analyze color psychology based on HSL values
   */
  const analyzeColorPsychology = (hex: string): ColorPsychology => {
    const [hue, saturation, lightness] = hexToHsl(hex);
    
    // Determine base color category
    let baseColor = 'gray';
    if (saturation < 10) {
      baseColor = 'gray';
    } else if (hue >= 0 && hue < 15) {
      baseColor = 'red';
    } else if (hue >= 15 && hue < 45) {
      baseColor = 'orange';
    } else if (hue >= 45 && hue < 75) {
      baseColor = 'yellow';
    } else if (hue >= 75 && hue < 150) {
      baseColor = 'green';
    } else if (hue >= 150 && hue < 210) {
      baseColor = 'cyan';
    } else if (hue >= 210 && hue < 270) {
      baseColor = 'blue';
    } else if (hue >= 270 && hue < 330) {
      baseColor = 'purple';
    } else {
      baseColor = 'red';
    }

    // Color psychology database
    const colorPsychologyData: Record<string, Partial<ColorPsychology>> = {
      red: {
        emotions: ['Passion', 'Énergie', 'Amour', 'Colère', 'Excitation'],
        associations: ['Feu', 'Sang', 'Roses', 'Danger', 'Pouvoir'],
        industries: ['Restauration', 'Divertissement', 'Mode', 'Sport', 'Urgence'],
        personality: ['Audacieux', 'Confiant', 'Énergique', 'Impulsif'],
        culturalMeanings: [
          { culture: 'Occident', meaning: 'Amour, passion, danger' },
          { culture: 'Chine', meaning: 'Chance, prospérité, joie' },
          { culture: 'Inde', meaning: 'Pureté, fertilité' }
        ],
        chakra: 'Racine (Muladhara)',
        temperature: 'warm',
        energy: 'high'
      },
      orange: {
        emotions: ['Joie', 'Créativité', 'Enthousiasme', 'Chaleur', 'Optimisme'],
        associations: ['Soleil couchant', 'Agrumes', 'Automne', 'Feu'],
        industries: ['Créativité', 'Enfance', 'Alimentation', 'Technologie'],
        personality: ['Sociable', 'Créatif', 'Aventureux', 'Spontané'],
        culturalMeanings: [
          { culture: 'Occident', meaning: 'Créativité, automne' },
          { culture: 'Bouddhisme', meaning: 'Illumination, sagesse' },
          { culture: 'Pays-Bas', meaning: 'Royauté, patriotisme' }
        ],
        chakra: 'Sacré (Svadhisthana)',
        temperature: 'warm',
        energy: 'high'
      },
      yellow: {
        emotions: ['Bonheur', 'Optimisme', 'Intelligence', 'Créativité', 'Attention'],
        associations: ['Soleil', 'Or', 'Blé', 'Citron', 'Lumière'],
        industries: ['Éducation', 'Enfance', 'Technologie', 'Transport'],
        personality: ['Optimiste', 'Intelligent', 'Créatif', 'Communicatif'],
        culturalMeanings: [
          { culture: 'Occident', meaning: 'Bonheur, lâcheté' },
          { culture: 'Chine', meaning: 'Royauté, pouvoir impérial' },
          { culture: 'Égypte', meaning: 'Deuil, éternité' }
        ],
        chakra: 'Plexus solaire (Manipura)',
        temperature: 'warm',
        energy: 'high'
      },
      green: {
        emotions: ['Nature', 'Croissance', 'Harmonie', 'Fraîcheur', 'Paix'],
        associations: ['Forêt', 'Argent', 'Santé', 'Environnement'],
        industries: ['Environnement', 'Santé', 'Finance', 'Nature'],
        personality: ['Équilibré', 'Généreux', 'Pratique', 'Stable'],
        culturalMeanings: [
          { culture: 'Occident', meaning: 'Nature, argent, jalousie' },
          { culture: 'Islam', meaning: 'Paradis, prophète' },
          { culture: 'Irlande', meaning: 'Chance, patrimoine' }
        ],
        chakra: 'Cœur (Anahata)',
        temperature: 'cool',
        energy: 'medium'
      },
      cyan: {
        emotions: ['Calme', 'Sérénité', 'Fraîcheur', 'Clarté', 'Communication'],
        associations: ['Eau', 'Ciel', 'Glace', 'Technologie'],
        industries: ['Technologie', 'Santé', 'Communication', 'Voyage'],
        personality: ['Calme', 'Réfléchi', 'Communicatif', 'Innovant'],
        culturalMeanings: [
          { culture: 'Universel', meaning: 'Eau, ciel, paix' }
        ],
        temperature: 'cool',
        energy: 'medium'
      },
      blue: {
        emotions: ['Confiance', 'Calme', 'Stabilité', 'Professionnalisme', 'Sérénité'],
        associations: ['Ciel', 'Océan', 'Glace', 'Saphir'],
        industries: ['Finance', 'Technologie', 'Santé', 'Corporate'],
        personality: ['Fiable', 'Loyal', 'Conservateur', 'Stable'],
        culturalMeanings: [
          { culture: 'Occident', meaning: 'Confiance, tristesse' },
          { culture: 'Chine', meaning: 'Immortalité, guérison' },
          { culture: 'Hindouisme', meaning: 'Krishna, divin' }
        ],
        chakra: 'Gorge (Vishuddha)',
        temperature: 'cool',
        energy: 'low'
      },
      purple: {
        emotions: ['Royauté', 'Luxe', 'Mystère', 'Spiritualité', 'Créativité'],
        associations: ['Royauté', 'Magie', 'Améthyste', 'Lavande'],
        industries: ['Luxe', 'Beauté', 'Spiritualité', 'Créativité'],
        personality: ['Créatif', 'Intuitif', 'Mystérieux', 'Indépendant'],
        culturalMeanings: [
          { culture: 'Occident', meaning: 'Royauté, luxe, mystère' },
          { culture: 'Japon', meaning: 'Privilège, richesse' },
          { culture: 'Thaïlande', meaning: 'Deuil (veuves)' }
        ],
        chakra: 'Troisième œil (Ajna)',
        temperature: 'cool',
        energy: 'medium'
      },
      gray: {
        emotions: ['Neutralité', 'Sophistication', 'Équilibre', 'Calme', 'Professionnalisme'],
        associations: ['Métal', 'Pierre', 'Nuages', 'Modernité'],
        industries: ['Technologie', 'Architecture', 'Mode', 'Corporate'],
        personality: ['Pratique', 'Équilibré', 'Sophistiqué', 'Neutre'],
        culturalMeanings: [
          { culture: 'Universel', meaning: 'Neutralité, sophistication' }
        ],
        temperature: 'neutral',
        energy: 'low'
      }
    };

    const baseData = colorPsychologyData[baseColor] || colorPsychologyData.gray;
    
    // Adjust based on saturation and lightness
    let recommendations = [
      'Utilisez cette couleur pour évoquer les émotions associées',
      'Considérez le contexte culturel de votre audience',
      'Testez l\'impact émotionnel sur votre public cible'
    ];

    if (saturation > 80) {
      recommendations.push('Couleur très saturée - utilisez avec parcimonie pour éviter la fatigue visuelle');
    }
    if (lightness < 20) {
      recommendations.push('Couleur très sombre - assurez-vous d\'un bon contraste pour la lisibilité');
    }
    if (lightness > 80) {
      recommendations.push('Couleur très claire - peut manquer d\'impact, considérez des accents plus foncés');
    }

    return {
      emotions: baseData.emotions || [],
      associations: baseData.associations || [],
      industries: baseData.industries || [],
      personality: baseData.personality || [],
      culturalMeanings: baseData.culturalMeanings || [],
      chakra: baseData.chakra,
      temperature: baseData.temperature || 'neutral',
      energy: baseData.energy || 'medium',
      recommendations
    };
  };

  const psychology = analyzeColorPsychology(color);

  if (compact) {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex flex-wrap gap-1">
          {psychology.emotions.slice(0, 3).map((emotion) => (
            <Badge key={emotion} variant="outline" className="text-xs">
              {emotion}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          Température: {psychology.temperature === 'warm' ? 'Chaude' : psychology.temperature === 'cool' ? 'Froide' : 'Neutre'}
        </div>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Analyse Psychologique
        </CardTitle>
        {showDetails && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4" />
            Impact émotionnel et associations culturelles
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Emotions */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-primary" />
            <span className="font-medium">Émotions évoquées</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {psychology.emotions.map((emotion) => (
              <Badge key={emotion} variant="outline">
                {emotion}
              </Badge>
            ))}
          </div>
        </div>

        {/* Associations */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-4 h-4 text-primary" />
            <span className="font-medium">Associations</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {psychology.associations.map((association) => (
              <Badge key={association} variant="secondary">
                {association}
              </Badge>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-medium">Industries recommandées</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {psychology.industries.map((industry) => (
              <Badge key={industry} variant="secondary" className="rounded-full px-2 py-0.5">
                {industry}
              </Badge>
            ))}
          </div>
        </div>

        {/* Personality traits */}
        <div>
          <div className="font-medium mb-2">Traits de personnalité</div>
          <div className="flex flex-wrap gap-1">
            {psychology.personality.map((trait) => (
              <Badge key={trait} variant="secondary" className="rounded-full px-2 py-0.5">
                {trait}
              </Badge>
            ))}
          </div>
        </div>

        {/* Temperature and Energy */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted rounded-lg border border-border">
            <div className="text-sm font-medium text-foreground">Température</div>
            <div className="text-lg text-foreground">
              {psychology.temperature === 'warm' ? '🔥 Chaude' : 
               psychology.temperature === 'cool' ? '❄️ Froide' : '⚖️ Neutre'}
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg border border-border">
            <div className="text-sm font-medium text-foreground">Énergie</div>
            <div className="text-lg text-foreground">
              {psychology.energy === 'high' ? '⚡ Élevée' : 
               psychology.energy === 'medium' ? '🔋 Moyenne' : '😌 Faible'}
            </div>
          </div>
        </div>

        {/* Chakra */}
        {psychology.chakra && (
          <div className="p-3 bg-muted rounded-lg border border-border">
            <div className="text-sm font-medium text-foreground">Chakra associé</div>
            <div className="text-muted-foreground">{psychology.chakra}</div>
          </div>
        )}

        {/* Cultural meanings */}
        {showDetails && psychology.culturalMeanings.length > 0 && (
          <div>
            <div className="font-medium mb-2 text-foreground">Significations culturelles</div>
            <div className="space-y-2">
              {psychology.culturalMeanings.map((cultural, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-muted rounded border border-border">
                  <span className="font-medium text-sm text-foreground">{cultural.culture}</span>
                  <span className="text-sm text-muted-foreground">{cultural.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {showDetails && (
          <div className="mt-4 p-3 bg-muted rounded-lg border border-border">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <Info className="w-4 h-4" />
              Recommandations d'usage
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              {psychology.recommendations.map((rec, index) => (
                <li key={index}>• {rec}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};