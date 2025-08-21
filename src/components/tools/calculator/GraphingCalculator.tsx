
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { TrendingUp, Settings, RotateCcw, Calculator, Delete, History, Star, StarOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GraphingCalculatorProps {
  history: string[];
  setHistory: (history: string[]) => void;
  clearAll: () => void;
}

interface GraphPoint {
  x: number;
  y: number;
}

interface GraphOptions {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  angleUnit: 'rad' | 'deg' | 'grad';
  strokeWidth: number;
  theme: 'light' | 'dark';
}

export const GraphingCalculator: React.FC<GraphingCalculatorProps> = ({
  history,
  setHistory,
  clearAll,
}) => {
  const [expression, setExpression] = useState<string>("sin(x)");
  const [graphData, setGraphData] = useState<GraphPoint[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [expressionHistory, setExpressionHistory] = useState<string[]>(["sin(x)", "cos(x)", "x^2", "x^3"]);
  const [showExpressionHistory, setShowExpressionHistory] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('graphing-calculator-favorites');
    return saved ? JSON.parse(saved) : ['sin(x)', 'cos(x)', 'tan(x)', 'x^2', 'x^3', 'sqrt(x)'];
  });
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [graphOptions, setGraphOptions] = useState<GraphOptions>({
    xMin: -10,
    xMax: 10,
    yMin: -10,
    yMax: 10,
    angleUnit: 'rad',
    strokeWidth: 2,
    theme: 'light'
  });
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const addToHistory = (calculation: string) => {
    setHistory([calculation, ...history.slice(0, 19)]);
  };

  // Function to insert text at cursor position
  const insertAtCursor = (text: string) => {
    const input = inputRef.current;
    if (input) {
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const newExpression = expression.slice(0, start) + text + expression.slice(end);
      setExpression(newExpression);
      
      // Set cursor position after insertion
      setTimeout(() => {
        const newPosition = start + text.length;
        input.setSelectionRange(newPosition, newPosition);
        setCursorPosition(newPosition);
      }, 0);
    }
  };

  // Function to delete character at cursor position
  const deleteAtCursor = () => {
    const input = inputRef.current;
    if (input) {
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      
      if (start !== end) {
        // Delete selection
        const newExpression = expression.slice(0, start) + expression.slice(end);
        setExpression(newExpression);
        setTimeout(() => {
          input.setSelectionRange(start, start);
          setCursorPosition(start);
        }, 0);
      } else if (start > 0) {
        // Delete character before cursor
        const newExpression = expression.slice(0, start - 1) + expression.slice(start);
        setExpression(newExpression);
        setTimeout(() => {
          const newPosition = start - 1;
          input.setSelectionRange(newPosition, newPosition);
          setCursorPosition(newPosition);
        }, 0);
      }
    }
  };

  // Function to add expression to history
  const addExpressionToHistory = (expr: string) => {
    if (expr && !expressionHistory.includes(expr)) {
      setExpressionHistory(prev => [expr, ...prev.slice(0, 9)]);
    }
  };

  // Handle keyboard input
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Only handle if the input is focused
    if (document.activeElement === inputRef.current) {
      const key = e.key;
      
      // Handle numbers and comma
      if (/^[0-9,.]$/.test(key)) {
        e.preventDefault();
        insertAtCursor(key === ',' ? '.' : key);
      }
      // Handle operators
      else if (['+', '-', '*', '/', '(', ')'].includes(key)) {
        e.preventDefault();
        insertAtCursor(key);
      }
      // Handle backspace
      else if (key === 'Backspace') {
        e.preventDefault();
        deleteAtCursor();
      }
      // Handle Enter to generate graph
      else if (key === 'Enter') {
        e.preventDefault();
        generateGraph();
      }
    }
  }, [expression]);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Update cursor position when input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpression(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };

  // Handle cursor position changes
  const handleCursorChange = () => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0);
    }
  };

  // Fonction d'évaluation d'expression mathématique sécurisée
  const evaluateExpression = useCallback((expr: string, x: number): number => {
    try {
      // Remplacer les fonctions mathématiques
      let processedExpr = expr
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/exp/g, 'Math.exp')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/pi/g, 'Math.PI')
        .replace(/e(?![a-zA-Z])/g, 'Math.E')
        .replace(/x/g, x.toString());

      // Convertir les angles si nécessaire
      if (graphOptions.angleUnit === 'deg') {
        processedExpr = processedExpr
          .replace(/Math\.sin\(([^)]+)\)/g, 'Math.sin(($1) * Math.PI / 180)')
          .replace(/Math\.cos\(([^)]+)\)/g, 'Math.cos(($1) * Math.PI / 180)')
          .replace(/Math\.tan\(([^)]+)\)/g, 'Math.tan(($1) * Math.PI / 180)');
      } else if (graphOptions.angleUnit === 'grad') {
        processedExpr = processedExpr
          .replace(/Math\.sin\(([^)]+)\)/g, 'Math.sin(($1) * Math.PI / 200)')
          .replace(/Math\.cos\(([^)]+)\)/g, 'Math.cos(($1) * Math.PI / 200)')
          .replace(/Math\.tan\(([^)]+)\)/g, 'Math.tan(($1) * Math.PI / 200)');
      }

      return eval(processedExpr);
    } catch (error) {
      return NaN;
    }
  }, [graphOptions.angleUnit]);

  // Générer les points du graphique
  const generateGraph = useCallback(() => {
    if (!expression.trim()) return;

    const points: GraphPoint[] = [];
    const step = (graphOptions.xMax - graphOptions.xMin) / 200;

    for (let x = graphOptions.xMin; x <= graphOptions.xMax; x += step) {
      const y = evaluateExpression(expression, x);
      if (!isNaN(y) && isFinite(y) && y >= graphOptions.yMin && y <= graphOptions.yMax) {
        points.push({ x: parseFloat(x.toFixed(3)), y: parseFloat(y.toFixed(3)) });
      }
    }

    setGraphData(points);
    addToHistory(`f(x) = ${expression}`);
    addExpressionToHistory(expression);
  }, [expression, graphOptions, evaluateExpression]);

  const insertFunction = (func: string) => {
    insertAtCursor(func);
  };

  // Load expression from history
  const loadExpressionFromHistory = (expr: string) => {
    setExpression(expr);
    setShowExpressionHistory(false);
    if (inputRef.current) {
      inputRef.current.focus();
      setTimeout(() => {
        const length = expr.length;
        inputRef.current?.setSelectionRange(length, length);
        setCursorPosition(length);
      }, 0);
    }
  };

  // Favorites management functions
  const saveFavoritesToStorage = (favs: string[]) => {
    localStorage.setItem('graphing-calculator-favorites', JSON.stringify(favs));
  };

  const addToFavorites = (expr: string) => {
    if (expr && !favorites.includes(expr)) {
      const newFavorites = [expr, ...favorites.slice(0, 9)];
      setFavorites(newFavorites);
      saveFavoritesToStorage(newFavorites);
      toast({
        title: "Ajouté aux favoris",
        description: `Expression "${expr}" ajoutée aux favoris`,
      });
    }
  };

  const removeFromFavorites = (expr: string) => {
    const newFavorites = favorites.filter(fav => fav !== expr);
    setFavorites(newFavorites);
    saveFavoritesToStorage(newFavorites);
    toast({
      title: "Supprimé des favoris",
      description: `Expression "${expr}" supprimée des favoris`,
    });
  };

  const loadFavoriteExpression = (expr: string) => {
    setExpression(expr);
    setShowFavorites(false);
    if (inputRef.current) {
      inputRef.current.focus();
      setTimeout(() => {
        const length = expr.length;
        inputRef.current?.setSelectionRange(length, length);
        setCursorPosition(length);
      }, 0);
    }
  };

  const isFavorite = (expr: string) => favorites.includes(expr);

  const resetGraph = () => {
    setGraphOptions({
      xMin: -10,
      xMax: 10,
      yMin: -10,
      yMax: 10,
      angleUnit: 'rad',
      strokeWidth: 2,
      theme: 'light'
    });
    setExpression("sin(x)");
    setGraphData([]);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Panneau de contrôle */}
      <Card className="xl:col-span-1 shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-100 dark:from-purple-950/50 dark:to-indigo-900/50">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Calculatrice Graphique
            <Badge variant="secondary" className="text-xs">f(x)</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {/* Saisie d'expression */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Expression f(x) =</label>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (isFavorite(expression)) {
                      removeFromFavorites(expression);
                    } else {
                      addToFavorites(expression);
                    }
                  }}
                  className="text-xs p-1 h-6"
                  title={isFavorite(expression) ? "Supprimer des favoris" : "Ajouter aux favoris"}
                >
                  {isFavorite(expression) ? <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> : <StarOff className="w-3 h-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFavorites(!showFavorites)}
                  className="text-xs p-1 h-6"
                  title="Favoris"
                >
                  <Star className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExpressionHistory(!showExpressionHistory)}
                  className="text-xs p-1 h-6"
                  title="Historique"
                >
                  <History className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <Input
                ref={inputRef}
                value={expression}
                onChange={handleInputChange}
                onSelect={handleCursorChange}
                onClick={handleCursorChange}
                placeholder="sin(x), x^2, etc."
                className="font-mono pr-8"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={deleteAtCursor}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
              >
                <Delete className="w-3 h-3" />
              </Button>
            </div>
            
            {/* Favoris */}
             {showFavorites && (
               <Card className="border border-yellow-200 bg-yellow-50">
                 <CardContent className="p-2">
                   <div className="text-xs font-medium mb-2 flex items-center gap-1">
                     <Star className="w-3 h-3 text-yellow-600" />
                     Expressions favorites:
                   </div>
                   <div className="space-y-1 max-h-32 overflow-y-auto">
                     {favorites.map((expr, index) => (
                       <div key={index} className="flex items-center gap-1">
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => loadFavoriteExpression(expr)}
                           className="flex-1 text-left justify-start text-xs h-6 font-mono"
                         >
                           {expr}
                         </Button>
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => removeFromFavorites(expr)}
                           className="p-1 h-6 w-6 text-red-500 hover:text-red-700"
                           title="Supprimer des favoris"
                         >
                           <StarOff className="w-3 h-3" />
                         </Button>
                       </div>
                     ))}
                     {favorites.length === 0 && (
                       <div className="text-xs text-gray-500 text-center py-2">
                         Aucun favori enregistré
                       </div>
                     )}
                   </div>
                 </CardContent>
               </Card>
             )}

             {/* Historique des expressions */}
             {showExpressionHistory && (
               <Card className="border border-gray-200">
                 <CardContent className="p-2">
                   <div className="text-xs font-medium mb-2">Expressions récentes:</div>
                   <div className="space-y-1 max-h-32 overflow-y-auto">
                     {expressionHistory.map((expr, index) => (
                       <Button
                         key={index}
                         variant="ghost"
                         size="sm"
                         onClick={() => loadExpressionFromHistory(expr)}
                         className="w-full text-left justify-start text-xs h-6 font-mono"
                       >
                         {expr}
                       </Button>
                     ))}
                   </div>
                 </CardContent>
               </Card>
             )}
          </div>

          {/* Fonctions courantes */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Fonctions</h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                { func: "sin(x)", label: "sin" },
                { func: "cos(x)", label: "cos" },
                { func: "tan(x)", label: "tan" },
                { func: "x^2", label: "x²" },
                { func: "x^3", label: "x³" },
                { func: "sqrt(x)", label: "√x" },
                { func: "ln(x)", label: "ln" },
                { func: "log(x)", label: "log" },
                { func: "exp(x)", label: "exp" },
                { func: "abs(x)", label: "|x|" },
                { func: "1/x", label: "1/x" },
                { func: "π", label: "π" }
              ].map(({ func, label }) => (
                <Button
                  key={func}
                  variant="outline"
                  size="sm"
                  onClick={() => insertFunction(func)}
                  className="text-xs"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Opérateurs */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Opérateurs</h4>
            <div className="grid grid-cols-4 gap-2">
              {['+', '-', '*', '/', '^', '(', ')', 'x'].map(op => (
                <Button
                  key={op}
                  variant="outline"
                  size="sm"
                  onClick={() => insertFunction(op)}
                  className="text-xs"
                >
                  {op}
                </Button>
              ))}
            </div>
          </div>

          {/* Clavier numérique */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Clavier numérique</h4>
            <div className="grid grid-cols-3 gap-2">
              {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', 'C'].map(num => (
                <Button
                  key={num}
                  variant={num === 'C' ? 'destructive' : 'secondary'}
                  size="sm"
                  onClick={() => {
                    if (num === 'C') {
                      setExpression('');
                      setCursorPosition(0);
                    } else {
                      insertFunction(num);
                    }
                  }}
                  className="text-xs font-mono"
                >
                  {num === 'C' ? 'Clear' : num}
                </Button>
              ))}
            </div>
          </div>

          {/* Constantes mathématiques */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Constantes</h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                { const: 'π', label: 'π' },
                { const: 'Math.E', label: 'e' },
                { const: '1.618', label: 'φ' },
                { const: '2.718', label: 'e≈' },
                { const: '3.14159', label: 'π≈' },
                { const: '0.577', label: 'γ' }
              ].map(({ const: constValue, label }) => (
                <Button
                  key={constValue}
                  variant="outline"
                  size="sm"
                  onClick={() => insertFunction(constValue)}
                  className="text-xs"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="grid grid-cols-2 gap-2 pt-4">
            <Button
              onClick={generateGraph}
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Tracer
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowOptions(!showOptions)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Options
            </Button>
          </div>

          {/* Options de graphique */}
          {showOptions && (
            <Card className="mt-4 border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Options de graphique</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Fenêtre */}
                <div className="space-y-3">
                  <h5 className="text-xs font-medium">Fenêtre</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-600">X-Min</label>
                      <Input
                        type="number"
                        value={graphOptions.xMin}
                        onChange={(e) => setGraphOptions(prev => ({ ...prev, xMin: parseFloat(e.target.value) || -10 }))}
                        className="text-xs h-8"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">X-Max</label>
                      <Input
                        type="number"
                        value={graphOptions.xMax}
                        onChange={(e) => setGraphOptions(prev => ({ ...prev, xMax: parseFloat(e.target.value) || 10 }))}
                        className="text-xs h-8"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Y-Min</label>
                      <Input
                        type="number"
                        value={graphOptions.yMin}
                        onChange={(e) => setGraphOptions(prev => ({ ...prev, yMin: parseFloat(e.target.value) || -10 }))}
                        className="text-xs h-8"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Y-Max</label>
                      <Input
                        type="number"
                        value={graphOptions.yMax}
                        onChange={(e) => setGraphOptions(prev => ({ ...prev, yMax: parseFloat(e.target.value) || 10 }))}
                        className="text-xs h-8"
                      />
                    </div>
                  </div>
                </div>

                {/* Unités */}
                <div>
                  <label className="text-xs text-gray-600 mb-2 block">Unités</label>
                  <Select value={graphOptions.angleUnit} onValueChange={(value: 'rad' | 'deg' | 'grad') => setGraphOptions(prev => ({ ...prev, angleUnit: value }))}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rad">Radians</SelectItem>
                      <SelectItem value="deg">Degrés</SelectItem>
                      <SelectItem value="grad">Grades</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Épaisseur du trait */}
                <div>
                  <label className="text-xs text-gray-600 mb-2 block">Épaisseur du trait: {graphOptions.strokeWidth}px</label>
                  <Slider
                    value={[graphOptions.strokeWidth]}
                    onValueChange={(value) => setGraphOptions(prev => ({ ...prev, strokeWidth: value[0] }))}
                    max={5}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetGraph}
                  className="w-full"
                >
                  <RotateCcw className="w-3 h-3 mr-2" />
                  Réinitialiser
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Graphique */}
      <Card className="xl:col-span-2 shadow-lg border-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Graphique de f(x) = {expression}</span>
            <Badge variant="outline" className="text-xs">
              Points: {graphData.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="x" 
                  type="number" 
                  scale="linear"
                  domain={[graphOptions.xMin, graphOptions.xMax]}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  dataKey="y"
                  type="number"
                  domain={[graphOptions.yMin, graphOptions.yMax]}
                  tick={{ fontSize: 12 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#3b82f6" 
                  strokeWidth={graphOptions.strokeWidth}
                  dot={false}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {graphData.length === 0 && (
            <div className="flex items-center justify-center h-96 text-gray-500">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Entrez une expression et cliquez sur "Tracer" pour voir le graphique</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
