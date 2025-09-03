
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Zap } from "lucide-react";

interface ScientificCalculatorProps {
  display: string;
  previousValue: number | null;
  operation: string | null;
  memory: number;
  lastAnswer: number;
  isRadians: boolean;
  setIsRadians: (value: boolean) => void;
  inputNumber: (num: string) => void;
  inputDecimal: () => void;
  backspace: () => void;
  inputOperation: (op: string) => void;
  performCalculation: () => void;
  scientificFunction: (func: string) => void;
  clearAll: () => void;
  copyToClipboard: (text: string) => void;
  formatNumber: (num: number) => string;
}

export const ScientificCalculator = ({
  display,
  previousValue,
  operation,
  memory,
  lastAnswer,
  isRadians,
  setIsRadians,
  inputNumber,
  inputDecimal,
  backspace,
  inputOperation,
  performCalculation,
  scientificFunction,
  clearAll,
  copyToClipboard,
  formatNumber
}: ScientificCalculatorProps) => {
  const getButtonStyle = (type: 'trig' | 'hyperbolic' | 'power' | 'constant' | 'advanced' | 'number' | 'operation' | 'equals') => {
    const styles = {
      trig: 'h-8 sm:h-10 text-xs sm:text-sm bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 text-secondary-foreground border-border',
      hyperbolic: 'h-8 sm:h-10 text-xs sm:text-sm bg-accent hover:bg-accent/80 dark:bg-accent dark:hover:bg-accent/80 text-accent-foreground border-border',
      power: 'h-8 sm:h-10 text-xs sm:text-sm bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 text-foreground border-border',
      constant: 'h-8 sm:h-10 text-xs sm:text-sm bg-warning/10 hover:bg-warning/20 dark:bg-warning/20 dark:hover:bg-warning/30 text-warning border-border',
      advanced: 'h-8 sm:h-10 text-xs sm:text-sm bg-destructive/10 hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 text-destructive border-border',
      number: 'h-10 sm:h-12 text-lg sm:text-xl bg-calculator-number hover:bg-calculator-number/80 dark:bg-calculator-number-dark dark:hover:bg-calculator-number-dark/80 text-foreground border-border',
      operation: 'h-10 sm:h-12 text-lg sm:text-xl bg-accent hover:bg-accent/80 dark:bg-accent dark:hover:bg-accent/80 text-accent-foreground border-border',
      equals: 'h-10 sm:h-12 text-lg sm:text-xl bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-primary-foreground border-border'
    };
    return styles[type];
  };
  return (
    <div className="space-y-4">
      {/* Écran amélioré */}
      <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl text-right shadow-inner border-2 border-gray-700">
        <div className="text-xs text-gray-300 mb-2 flex justify-between items-center flex-wrap gap-2">
          <span className="truncate">{operation && previousValue !== null && `${previousValue} ${operation}`}</span>
          <div className="flex gap-2 flex-shrink-0">
            <Badge variant={isRadians ? "default" : "secondary"} className="text-xs bg-blue-800 text-blue-200">
              {isRadians ? "RAD" : "DEG"}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-green-800 text-green-200">
              <Zap className="w-3 h-3 mr-1" />
              Scientifique
            </Badge>
          </div>
        </div>
        <div className="text-xl sm:text-3xl font-mono font-bold text-green-400 break-all min-h-[32px] sm:min-h-[40px] flex items-center justify-end bg-black/20 rounded p-2">
          {display}
        </div>
        <div className="text-xs text-gray-300 mt-2 flex justify-between items-center flex-wrap gap-2">
          <span className="truncate">Mémoire: {memory !== 0 ? formatNumber(memory) : "vide"} | Ans: {formatNumber(lastAnswer)}</span>
          <div className="flex gap-2 items-center flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(display)}
              className="h-6 px-2 text-xs text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <span className="text-green-400">● Fonctions actives</span>
          </div>
        </div>
      </div>

      {/* Fonctions trigonométriques */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 sm:gap-2 text-xs sm:text-sm">
        {[
          { func: "sin", label: "sin", tooltip: `Sinus (${isRadians ? "radians" : "degrés"})` },
          { func: "cos", label: "cos", tooltip: "Cosinus" },
          { func: "tan", label: "tan", tooltip: "Tangente" },
          { func: "asin", label: "sin⁻¹", tooltip: "Arc sinus" },
          { func: "acos", label: "cos⁻¹", tooltip: "Arc cosinus" },
          { func: "atan", label: "tan⁻¹", tooltip: "Arc tangente" }
        ].map(({ func, label, tooltip }) => (
          <Tooltip key={func}>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                onClick={() => scientificFunction(func)} 
                className={getButtonStyle('trig')}
                size="sm"
              >
                {label}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Fonctions hyperboliques */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2 text-xs sm:text-sm">
        {[
          { func: "sinh", label: "sinh", tooltip: "Sinus hyperbolique" },
          { func: "cosh", label: "cosh", tooltip: "Cosinus hyperbolique" },
          { func: "tanh", label: "tanh", tooltip: "Tangente hyperbolique" },
          { func: "exp", label: "exp", tooltip: "Exponentielle (e^x)" },
          { func: "ln", label: "ln", tooltip: "Logarithme naturel (base e)" },
          { func: "log", label: "log", tooltip: "Logarithme décimal (base 10)" }
        ].map(({ func, label, tooltip }) => (
          <Tooltip key={func}>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                onClick={() => scientificFunction(func)} 
                className={getButtonStyle('hyperbolic')}
                size="sm"
              >
                {label}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Puissances et racines */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 sm:gap-2 text-xs sm:text-sm">
        {[
          { func: "square", label: "x²", tooltip: "Carré du nombre" },
          { func: "cube", label: "x³", tooltip: "Cube du nombre" },
          { func: "sqrt", label: "√x", tooltip: "Racine carrée" },
          { func: "cbrt", label: "∛x", tooltip: "Racine cubique" },
          { func: "1/x", label: "1/x", tooltip: "Inverse (1/x)" },
          { func: "abs", label: "|x|", tooltip: "Valeur absolue" }
        ].map(({ func, label, tooltip }) => (
          <Tooltip key={func}>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                onClick={() => scientificFunction(func)} 
                className={getButtonStyle('power')}
                size="sm"
              >
                {label}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Constantes et autres fonctions */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 sm:gap-2 text-xs sm:text-sm">
        {[
          { func: "pi", label: "π", tooltip: "Pi (3.14159...)" },
          { func: "e", label: "e", tooltip: "Nombre d'Euler (2.718...)" },
          { func: "factorial", label: "n!", tooltip: "Factorielle" },
          { func: "random", label: "Rand", tooltip: "Nombre aléatoire (0-1)" },
          { func: "negate", label: "±", tooltip: "Changer de signe" },
          { func: "percent", label: "%", tooltip: "Pourcentage" }
        ].map(({ func, label, tooltip }) => (
          <Tooltip key={func}>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                onClick={() => scientificFunction(func)} 
                className={getButtonStyle('constant')}
                size="sm"
              >
                {label}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Opérations avancées */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 text-xs sm:text-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              onClick={() => inputOperation("^")} 
              className="h-8 sm:h-10 bg-teal-50 hover:bg-teal-100 dark:bg-teal-900/30 dark:hover:bg-teal-800/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700"
              size="sm"
            >
              x^y
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Puissance x à la puissance y</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              onClick={() => inputOperation("mod")} 
              className="h-8 sm:h-10 bg-teal-50 hover:bg-teal-100 dark:bg-teal-900/30 dark:hover:bg-teal-800/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700"
              size="sm"
            >
              mod
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Modulo (reste de la division)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              onClick={() => inputOperation("root")} 
              className="h-8 sm:h-10 bg-teal-50 hover:bg-teal-100 dark:bg-teal-900/30 dark:hover:bg-teal-800/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700"
              size="sm"
            >
              ⁿ√x
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Racine n-ième</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Fonctions mathématiques avancées */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 sm:gap-2 text-xs sm:text-sm">
        {[
          { func: "mod", label: "mod", tooltip: "Modulo (reste de la division)" },
          { func: "gcd", label: "GCD", tooltip: "Plus grand commun diviseur" },
          { func: "lcm", label: "LCM", tooltip: "Plus petit commun multiple" },
          { func: "floor", label: "⌊x⌋", tooltip: "Partie entière inférieure" },
          { func: "ceil", label: "⌈x⌉", tooltip: "Partie entière supérieure" },
          { func: "round", label: "Round", tooltip: "Arrondir au plus proche" }
        ].map(({ func, label, tooltip }) => (
          <Tooltip key={func}>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                onClick={() => scientificFunction(func)} 
                className={getButtonStyle('advanced')}
                size="sm"
              >
                {label}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Clavier numérique compact */}
      <div className="grid grid-cols-4 gap-2">
        {/* Clear and Backspace */}
        <Button 
          variant="outline" 
          onClick={clearAll} 
          className="col-span-2 h-10 sm:h-12 text-lg sm:text-xl bg-destructive/10 hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 text-destructive border-border"
        >
          C
        </Button>
        <Button 
          variant="outline" 
          onClick={backspace} 
          className="h-10 sm:h-12 text-lg sm:text-xl bg-muted hover:bg-muted/80 dark:bg-muted dark:hover:bg-muted/80 border-border"
        >
          ⌫
        </Button>
        <Button 
          variant="outline" 
          onClick={() => inputOperation("/")} 
          className={getButtonStyle('operation')}
        >
          ÷
        </Button>

        {[7, 8, 9].map(num => (
          <Button key={num} variant="outline" onClick={() => inputNumber(num.toString())} className={getButtonStyle('number')}>{num}</Button>
        ))}
        <Button variant="outline" onClick={() => inputOperation("*")} className={getButtonStyle('operation')}>×</Button>

        {[4, 5, 6].map(num => (
          <Button key={num} variant="outline" onClick={() => inputNumber(num.toString())} className={getButtonStyle('number')}>{num}</Button>
        ))}
        <Button variant="outline" onClick={() => inputOperation("-")} className={getButtonStyle('operation')}>-</Button>

        {[1, 2, 3].map(num => (
          <Button key={num} variant="outline" onClick={() => inputNumber(num.toString())} className={getButtonStyle('number')}>{num}</Button>
        ))}
        <Button variant="outline" onClick={() => inputOperation("+")} className={getButtonStyle('operation')}>+</Button>

        <Button variant="outline" onClick={() => inputNumber("0")} className={`col-span-2 ${getButtonStyle('number')}`}>0</Button>
        <Button variant="outline" onClick={inputDecimal} className={getButtonStyle('number')}>.</Button>
        <Button 
          onClick={performCalculation}
          className={getButtonStyle('equals')}
        >
          =
        </Button>
      </div>
    </div>
  );
};
