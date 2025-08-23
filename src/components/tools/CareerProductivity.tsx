import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, Users, FileText, Target, Star, TrendingUp, MessageSquare, BookOpen } from 'lucide-react';

/**
 * CareerProductivity Component
 * 
 * A comprehensive suite of professional development tools including:
 * - Career Coach Pro: Personalized career guidance and planning
 * - Orientation: Career path exploration and decision making
 * - Interview Preparation: Mock interviews and tips
 * - Writing Assistant: Professional writing and CV builder
 * - Networking Tools: Professional relationship management
 * - Skill Assessment: Competency evaluation and development
 */
export const CareerProductivity = () => {
  const [activeTab, setActiveTab] = useState('coach');
  const [coachInput, setCoachInput] = useState('');
  const [coachResponse, setCoachResponse] = useState('');
  const [interviewQuestions, setInterviewQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [cvData, setCvData] = useState({
    name: '',
    title: '',
    summary: '',
    experience: '',
    skills: ''
  });

  // Mock career coaching responses
  const getCoachAdvice = (input: string) => {
    const responses = {
      'career change': 'Pour réussir une reconversion professionnelle, commencez par identifier vos compétences transférables et explorez les secteurs qui vous passionnent. Considérez une formation complémentaire si nécessaire.',
      'promotion': 'Pour obtenir une promotion, documentez vos réalisations, prenez des initiatives, développez vos compétences de leadership et communiquez régulièrement avec votre manager sur vos objectifs de carrière.',
      'networking': 'Le networking efficace repose sur la qualité des relations plutôt que la quantité. Participez à des événements professionnels, utilisez LinkedIn activement et offrez votre aide avant de demander des faveurs.',
      'interview': 'Préparez-vous en recherchant l\'entreprise, pratiquez vos réponses aux questions courantes, préparez des exemples concrets de vos réalisations et posez des questions pertinentes sur le poste.',
      'skills': 'Identifiez les compétences demandées dans votre secteur, suivez des formations en ligne, obtenez des certifications reconnues et pratiquez régulièrement pour maintenir vos compétences à jour.'
    };
    
    const key = Object.keys(responses).find(k => input.toLowerCase().includes(k));
    return key ? responses[key as keyof typeof responses] : 'Je vous recommande de définir clairement vos objectifs professionnels et d\'établir un plan d\'action avec des étapes concrètes. N\'hésitez pas à demander des conseils spécifiques !';
  };

  // Mock interview questions by category
  const interviewQuestionsByCategory = {
    general: [
      'Parlez-moi de vous',
      'Pourquoi voulez-vous travailler ici ?',
      'Quelles sont vos forces et faiblesses ?',
      'Où vous voyez-vous dans 5 ans ?'
    ],
    technical: [
      'Décrivez un projet technique complexe que vous avez mené',
      'Comment résolvez-vous les problèmes techniques ?',
      'Quelles technologies maîtrisez-vous le mieux ?',
      'Comment vous tenez-vous au courant des évolutions technologiques ?'
    ],
    behavioral: [
      'Décrivez une situation où vous avez dû gérer un conflit',
      'Comment gérez-vous le stress et les délais serrés ?',
      'Donnez un exemple de leadership que vous avez exercé',
      'Comment travaillez-vous en équipe ?'
    ]
  };

  const handleCoachSubmit = () => {
    if (coachInput.trim()) {
      setCoachResponse(getCoachAdvice(coachInput));
    }
  };

  const generateInterviewQuestions = (category: string) => {
    const questions = interviewQuestionsByCategory[category as keyof typeof interviewQuestionsByCategory] || [];
    setInterviewQuestions(questions);
    setCurrentQuestion(0);
  };

  const generateCV = () => {
    const cvTemplate = `
# ${cvData.name}
## ${cvData.title}

### Résumé Professionnel
${cvData.summary}

### Expérience Professionnelle
${cvData.experience}

### Compétences
${cvData.skills}
    `;
    
    const blob = new Blob([cvTemplate], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_${cvData.name.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Carrière & Productivité Pro
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Suite complète d'outils professionnels pour développer votre carrière et optimiser votre productivité
        </p>
      </div>

      {/* Main Tools */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="coach" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Coach Pro
          </TabsTrigger>
          <TabsTrigger value="orientation" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Orientation
          </TabsTrigger>
          <TabsTrigger value="interviews" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Entretiens
          </TabsTrigger>
          <TabsTrigger value="writing" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Assistant Rédac
          </TabsTrigger>
          <TabsTrigger value="networking" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Networking
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Compétences
          </TabsTrigger>
        </TabsList>

        {/* Career Coach Pro */}
        <TabsContent value="coach" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Coach Professionnel IA
              </CardTitle>
              <CardDescription>
                Obtenez des conseils personnalisés pour votre développement de carrière
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="coach-input">Décrivez votre situation ou posez votre question</Label>
                <Textarea
                  id="coach-input"
                  placeholder="Ex: Je souhaite changer de carrière, comment procéder ?"
                  value={coachInput}
                  onChange={(e) => setCoachInput(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button onClick={handleCoachSubmit} className="w-full">
                Obtenir des conseils
              </Button>
              {coachResponse && (
                <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-4">
                    <p className="text-blue-800 dark:text-blue-200">{coachResponse}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Career Orientation */}
        <TabsContent value="orientation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Test d'Orientation
                </CardTitle>
                <CardDescription>
                  Découvrez les métiers qui correspondent à votre profil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Secteurs en croissance</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">Tech & IA</Badge>
                      <Badge variant="secondary">Santé</Badge>
                      <Badge variant="secondary">Environnement</Badge>
                      <Badge variant="secondary">Data Science</Badge>
                    </div>
                  </div>
                  <Button className="w-full">Commencer le test</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analyse de Marché</CardTitle>
                <CardDescription>
                  Tendances et opportunités par secteur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <span>Développement Web</span>
                    <Badge className="bg-green-100 text-green-800">+15%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <span>Cybersécurité</span>
                    <Badge className="bg-green-100 text-green-800">+22%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <span>Marketing Digital</span>
                    <Badge className="bg-green-100 text-green-800">+12%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Interview Preparation */}
        <TabsContent value="interviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                Préparation aux Entretiens
              </CardTitle>
              <CardDescription>
                Entraînez-vous avec des questions d'entretien personnalisées
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => generateInterviewQuestions('general')}
                  variant="outline"
                  className="h-20 flex flex-col items-center gap-2"
                >
                  <MessageSquare className="w-6 h-6" />
                  Questions Générales
                </Button>
                <Button 
                  onClick={() => generateInterviewQuestions('technical')}
                  variant="outline"
                  className="h-20 flex flex-col items-center gap-2"
                >
                  <Target className="w-6 h-6" />
                  Questions Techniques
                </Button>
                <Button 
                  onClick={() => generateInterviewQuestions('behavioral')}
                  variant="outline"
                  className="h-20 flex flex-col items-center gap-2"
                >
                  <Users className="w-6 h-6" />
                  Questions Comportementales
                </Button>
              </div>
              
              {interviewQuestions.length > 0 && (
                <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-600 dark:text-purple-300">
                          Question {currentQuestion + 1} sur {interviewQuestions.length}
                        </span>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                            disabled={currentQuestion === 0}
                          >
                            Précédent
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setCurrentQuestion(Math.min(interviewQuestions.length - 1, currentQuestion + 1))}
                            disabled={currentQuestion === interviewQuestions.length - 1}
                          >
                            Suivant
                          </Button>
                        </div>
                      </div>
                      <p className="text-lg font-medium text-purple-800 dark:text-purple-200">
                        {interviewQuestions[currentQuestion]}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Writing Assistant */}
        <TabsContent value="writing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-600" />
                Assistant de Rédaction
              </CardTitle>
              <CardDescription>
                Créez des CV, lettres de motivation et documents professionnels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cv-name">Nom complet</Label>
                    <Input
                      id="cv-name"
                      value={cvData.name}
                      onChange={(e) => setCvData({...cvData, name: e.target.value})}
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cv-title">Titre professionnel</Label>
                    <Input
                      id="cv-title"
                      value={cvData.title}
                      onChange={(e) => setCvData({...cvData, title: e.target.value})}
                      placeholder="Ex: Développeur Full Stack"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cv-summary">Résumé professionnel</Label>
                    <Textarea
                      id="cv-summary"
                      value={cvData.summary}
                      onChange={(e) => setCvData({...cvData, summary: e.target.value})}
                      placeholder="Décrivez brièvement votre profil..."
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cv-experience">Expérience</Label>
                    <Textarea
                      id="cv-experience"
                      value={cvData.experience}
                      onChange={(e) => setCvData({...cvData, experience: e.target.value})}
                      placeholder="Listez vos expériences professionnelles..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cv-skills">Compétences</Label>
                    <Textarea
                      id="cv-skills"
                      value={cvData.skills}
                      onChange={(e) => setCvData({...cvData, skills: e.target.value})}
                      placeholder="Listez vos compétences techniques et soft skills..."
                    />
                  </div>
                  <Button onClick={generateCV} className="w-full">
                    Générer le CV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Networking Tools */}
        <TabsContent value="networking" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Gestionnaire de Contacts
                </CardTitle>
                <CardDescription>
                  Organisez votre réseau professionnel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Conseils Networking</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Personnalisez vos messages de connexion</li>
                      <li>• Suivez régulièrement vos contacts</li>
                      <li>• Partagez du contenu de valeur</li>
                      <li>• Participez aux événements sectoriels</li>
                    </ul>
                  </div>
                  <Button className="w-full">Ajouter un contact</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Événements & Opportunités</CardTitle>
                <CardDescription>
                  Découvrez les événements professionnels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold">Tech Conference 2024</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">15-16 Mars • Paris</p>
                    <Badge className="mt-1">Technologie</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold">Startup Weekend</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">22-24 Mars • Lyon</p>
                    <Badge className="mt-1">Entrepreneuriat</Badge>
                  </div>
                  <Button variant="outline" className="w-full">Voir plus d'événements</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Skills Assessment */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Évaluation des Compétences
              </CardTitle>
              <CardDescription>
                Identifiez vos forces et axes d'amélioration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Compétences Techniques</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>JavaScript</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-4/5 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <span className="text-sm">80%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>React</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-3/5 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-sm">60%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Node.js</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-2/5 h-2 bg-orange-600 rounded-full"></div>
                        </div>
                        <span className="text-sm">40%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Soft Skills</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Communication</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-4/5 h-2 bg-purple-600 rounded-full"></div>
                        </div>
                        <span className="text-sm">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Leadership</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-3/5 h-2 bg-indigo-600 rounded-full"></div>
                        </div>
                        <span className="text-sm">70%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Gestion de projet</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-3/5 h-2 bg-teal-600 rounded-full"></div>
                        </div>
                        <span className="text-sm">65%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t">
                <Button className="w-full">Commencer une évaluation complète</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">6</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Outils disponibles</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">Pro</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Niveau professionnel</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Disponibilité</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">∞</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Possibilités</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerProductivity;