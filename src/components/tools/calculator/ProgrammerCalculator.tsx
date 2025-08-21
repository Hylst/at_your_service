
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RotateCcw, Code, Hash, RotateCw, Plus, Minus, X, Divide } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProgrammerCalculatorProps {
  history: string[];
  setHistory: (history: string[]) => void;
  clearAll: () => void;
}

type NumberBase = 'dec' | 'hex' | 'oct' | 'bin';
type WordSize = 4 | 8 | 16 | 32 | 64 | 128 | 256;

export const ProgrammerCalculator: React.FC<ProgrammerCalculatorProps> = ({
  history,
  setHistory,
  clearAll,
}) => {
  const [value, setValue] = useState<string>("0");
  const [inputBase, setInputBase] = useState<NumberBase>('dec');
  const [expression, setExpression] = useState<string>("");
  const [wordSize, setWordSize] = useState<WordSize>(32);
  const [pendingOperation, setPendingOperation] = useState<string>("");
  const [operand, setOperand] = useState<number | null>(null);
  const { toast } = useToast();

  /**
   * Apply word size mask to limit number to specified bit width
   * @param num - The number to mask
   * @param size - Word size in bits
   * @returns Masked number within word size limits
   */
  const applyWordSizeMask = (num: number, size: WordSize = wordSize): number => {
    // Use Math.pow for sizes > 31 to avoid JavaScript bitwise operator limitations
    const mask = size >= 32 ? Math.pow(2, size) - 1 : (1 << size) - 1;
    return num & mask;
  };

  /**
   * Get maximum value for current word size
   * @param size - Word size in bits
   * @returns Maximum value
   */
  const getMaxValue = (size: WordSize = wordSize): number => {
    // Use Math.pow for sizes > 31 to avoid JavaScript bitwise operator limitations
    return size >= 32 ? Math.pow(2, size) - 1 : (1 << size) - 1;
  };

  /**
   * Rotate bits left (ROL)
   * @param num - Number to rotate
   * @param positions - Number of positions to rotate
   * @param size - Word size in bits
   * @returns Rotated number
   */
  const rotateLeft = (num: number, positions: number, size: WordSize = wordSize): number => {
    const mask = getMaxValue(size);
    const maskedNum = num & mask;
    const normalizedPos = positions % size;
    
    // For large word sizes, use different approach to avoid bitwise operator limitations
    if (size > 31) {
      const leftPart = (maskedNum * Math.pow(2, normalizedPos)) % Math.pow(2, size);
      const rightPart = Math.floor(maskedNum / Math.pow(2, size - normalizedPos));
      return (leftPart + rightPart) & mask;
    } else {
      return ((maskedNum << normalizedPos) | (maskedNum >>> (size - normalizedPos))) & mask;
    }
  };

  /**
   * Rotate bits right (ROR)
   * @param num - Number to rotate
   * @param positions - Number of positions to rotate
   * @param size - Word size in bits
   * @returns Rotated number
   */
  const rotateRight = (num: number, positions: number, size: WordSize = wordSize): number => {
    const mask = getMaxValue(size);
    const maskedNum = num & mask;
    const normalizedPos = positions % size;
    
    // For large word sizes, use different approach to avoid bitwise operator limitations
    if (size > 31) {
      const rightPart = Math.floor(maskedNum / Math.pow(2, normalizedPos));
      const leftPart = (maskedNum % Math.pow(2, normalizedPos)) * Math.pow(2, size - normalizedPos);
      return (rightPart + leftPart) & mask;
    } else {
      return ((maskedNum >>> normalizedPos) | (maskedNum << (size - normalizedPos))) & mask;
    }
  };

  const addToHistory = (calculation: string) => {
    setHistory([calculation, ...history.slice(0, 19)]);
  };

  // Convert number between bases
  const convertToBase = (num: number, base: NumberBase): string => {
    switch (base) {
      case 'dec': return num.toString(10);
      case 'hex': return num.toString(16).toUpperCase();
      case 'oct': return num.toString(8);
      case 'bin': return num.toString(2);
      default: return num.toString(10);
    }
  };

  const parseFromBase = (str: string, base: NumberBase): number => {
    switch (base) {
      case 'dec': return parseInt(str, 10);
      case 'hex': return parseInt(str, 16);
      case 'oct': return parseInt(str, 8);
      case 'bin': return parseInt(str, 2);
      default: return parseInt(str, 10);
    }
  };

  const getCurrentNumber = (): number => {
    const num = parseFromBase(value, inputBase) || 0;
    return applyWordSizeMask(num);
  };

  const setCurrentNumber = (num: number) => {
    const maskedNum = applyWordSizeMask(num);
    setValue(convertToBase(maskedNum, inputBase));
  };

  /**
   * Perform bitwise and rotation operations
   * @param op - Operation type (NOT, LSH, RSH, ROL, ROR)
   */
  const performBitwiseOperation = (op: string) => {
    const currentNum = getCurrentNumber();
    let result = 0;
    let expr = "";
    
    switch (op) {
      case 'NOT':
        result = applyWordSizeMask(~currentNum);
        expr = `NOT ${value}(${inputBase})`;
        break;
      case 'LSH':
        result = applyWordSizeMask(currentNum << 1);
        expr = `${value}(${inputBase}) << 1`;
        break;
      case 'RSH':
        result = currentNum >>> 1; // Logical right shift
        expr = `${value}(${inputBase}) >> 1`;
        break;
      case 'ROL':
        result = rotateLeft(currentNum, 1);
        expr = `ROL ${value}(${inputBase}) [${wordSize}-bit]`;
        break;
      case 'ROR':
        result = rotateRight(currentNum, 1);
        expr = `ROR ${value}(${inputBase}) [${wordSize}-bit]`;
        break;
      default:
        return;
    }
    
    addToHistory(`${expr} = ${convertToBase(result, inputBase)}`);
    setCurrentNumber(result);
  };

  /**
   * Perform arithmetic operations (ADD, SUB, MUL, DIV)
   * @param op - Operation type
   */
  const performArithmeticOperation = (op: string) => {
    const currentNum = getCurrentNumber();
    
    if (pendingOperation && operand !== null) {
      // Execute pending operation
      let result = 0;
      const maskedOperand = applyWordSizeMask(operand);
      
      switch (pendingOperation) {
        case 'ADD': result = applyWordSizeMask(maskedOperand + currentNum); break;
        case 'SUB': result = applyWordSizeMask(maskedOperand - currentNum); break;
        case 'MUL': result = applyWordSizeMask(maskedOperand * currentNum); break;
        case 'DIV': 
          if (currentNum === 0) {
            toast({ title: "Erreur", description: "Division par zéro impossible", variant: "destructive" });
            return;
          }
          result = applyWordSizeMask(Math.floor(maskedOperand / currentNum));
          break;
        default: return;
      }
      
      const expr = `${convertToBase(maskedOperand, inputBase)} ${pendingOperation} ${value}(${inputBase}) [${wordSize}-bit]`;
      addToHistory(`${expr} = ${convertToBase(result, inputBase)}`);
      setCurrentNumber(result);
    }
    
    // Set up next operation
    setOperand(currentNum);
    setPendingOperation(op);
    setValue("0");
  };

  /**
   * Execute pending arithmetic operation
   */
  const executeOperation = () => {
    if (pendingOperation && operand !== null) {
      performArithmeticOperation(""); // This will execute the pending operation
      setPendingOperation("");
      setOperand(null);
    }
  };

  /**
   * Perform logical binary operations (AND, OR, XOR, NAND, NOR)
   * @param op - Operation type
   */
  const performBinaryOperation = (op: string) => {
    if (expression) {
      const prevNum = applyWordSizeMask(parseFromBase(expression.split(' ')[0], inputBase));
      const currentNum = getCurrentNumber();
      let result = 0;
      
      switch (op) {
        case 'AND': result = applyWordSizeMask(prevNum & currentNum); break;
        case 'OR': result = applyWordSizeMask(prevNum | currentNum); break;
        case 'XOR': result = applyWordSizeMask(prevNum ^ currentNum); break;
        case 'NAND': result = applyWordSizeMask(~(prevNum & currentNum)); break;
        case 'NOR': result = applyWordSizeMask(~(prevNum | currentNum)); break;
        default: return;
      }
      
      const expr = `${expression} ${op} ${value}(${inputBase}) [${wordSize}-bit]`;
      addToHistory(`${expr} = ${convertToBase(result, inputBase)}`);
      setCurrentNumber(result);
      setExpression("");
    } else {
      setExpression(`${value} ${op}`);
    }
  };

  /**
   * Handle number input with base validation and word size limits
   * @param digit - The digit to input
   */
  const handleNumberInput = (digit: string) => {
    const validDigits = {
      'bin': '01',
      'oct': '01234567',
      'dec': '0123456789',
      'hex': '0123456789ABCDEF'
    };

    if (validDigits[inputBase].includes(digit)) {
      const newValue = value === "0" ? digit : value + digit;
      const newNum = parseFromBase(newValue, inputBase);
      
      // Check if the new number exceeds word size limits
      const maxValue = getMaxValue(wordSize);
      if (newNum <= maxValue) {
        setValue(newValue);
      } else {
        toast({
          title: "Limite atteinte",
          description: `Valeur maximale pour ${wordSize} bits: ${convertToBase(maxValue, inputBase)}`,
          variant: "destructive"
        });
      }
    }
  };

  /**
   * Handle keyboard input for calculator
   * @param event - Keyboard event
   */
  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
    
    // Number inputs
    if ('0123456789'.includes(key)) {
      handleNumberInput(key);
    }
    // Hex digits A-F
    else if (inputBase === 'hex' && 'ABCDEF'.includes(key)) {
      handleNumberInput(key);
    }
    // Operations
    else if (key === '+') {
      performArithmeticOperation('ADD');
    }
    else if (key === '-') {
      performArithmeticOperation('SUB');
    }
    else if (key === '*') {
      performArithmeticOperation('MUL');
    }
    else if (key === '/') {
      performArithmeticOperation('DIV');
    }
    else if (key === 'ENTER' || key === '=') {
      executeOperation();
    }
    else if (key === 'ESCAPE' || key === 'C') {
      clearLocal();
    }
    else if (key === 'BACKSPACE') {
      setValue(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
    }
  };

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [inputBase, wordSize, pendingOperation, operand, value]);

  /**
   * Clear all local state
   */
  const clearLocal = () => {
    setValue("0");
    setExpression("");
    setPendingOperation("");
    setOperand(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copié !",
      description: `${text} copié dans le presse-papiers`,
    });
  };

  const currentNumber = getCurrentNumber();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Calculatrice Programmeur
            <Badge variant="secondary" className="text-xs">Bases numériques</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {/* Affichage simultané des 4 bases */}
          <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
              <span>HEX</span>
              <span>DEC</span>
              <span>OCT</span>
              <span>BIN</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className={`p-2 rounded text-center font-mono ${inputBase === 'hex' ? 'bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-600' : 'bg-white dark:bg-gray-800'}`}>
                {convertToBase(currentNumber, 'hex')}
              </div>
              <div className={`p-2 rounded text-center font-mono ${inputBase === 'dec' ? 'bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-600' : 'bg-white dark:bg-gray-800'}`}>
                {convertToBase(currentNumber, 'dec')}
              </div>
              <div className={`p-2 rounded text-center font-mono ${inputBase === 'oct' ? 'bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-600' : 'bg-white dark:bg-gray-800'}`}>
                {convertToBase(currentNumber, 'oct')}
              </div>
              <div className={`p-2 rounded text-center font-mono text-xs break-all ${inputBase === 'bin' ? 'bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-600' : 'bg-white dark:bg-gray-800'}`}>
                {convertToBase(currentNumber, 'bin')}
              </div>
            </div>
          </div>

          {/* Base and Word Size selectors */}
          <div className="flex gap-2">
            <Select value={inputBase} onValueChange={(value: NumberBase) => setInputBase(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dec">DEC (10)</SelectItem>
                <SelectItem value="hex">HEX (16)</SelectItem>
                <SelectItem value="oct">OCT (8)</SelectItem>
                <SelectItem value="bin">BIN (2)</SelectItem>
              </SelectContent>
            </Select>
            <Select value={wordSize.toString()} onValueChange={(value: string) => setWordSize(parseInt(value) as WordSize)}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4-bit</SelectItem>
                <SelectItem value="8">8-bit</SelectItem>
                <SelectItem value="16">16-bit</SelectItem>
                <SelectItem value="32">32-bit</SelectItem>
                <SelectItem value="64">64-bit</SelectItem>
                <SelectItem value="128">128-bit</SelectItem>
                <SelectItem value="256">256-bit</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={clearLocal}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Display */}
          <div className="space-y-2">
            {expression && (
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
                {expression}
              </div>
            )}
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-right text-xl font-mono bg-gray-50 dark:bg-gray-900"
              placeholder="0"
            />
          </div>

          {/* Opérations arithmétiques */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="default"
              onClick={() => performArithmeticOperation('ADD')}
              className="h-12 text-sm bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              variant="default"
              onClick={() => performArithmeticOperation('SUB')}
              className="h-12 text-sm bg-emerald-600 hover:bg-emerald-700"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Button
              variant="default"
              onClick={() => performArithmeticOperation('MUL')}
              className="h-12 text-sm bg-emerald-600 hover:bg-emerald-700"
            >
              <X className="w-4 h-4" />
            </Button>
            <Button
              variant="default"
              onClick={() => performArithmeticOperation('DIV')}
              className="h-12 text-sm bg-emerald-600 hover:bg-emerald-700"
            >
              <Divide className="w-4 h-4" />
            </Button>
          </div>

          {/* Opérations de rotation */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="default"
              onClick={() => performBitwiseOperation('ROL')}
              className="h-12 text-sm bg-cyan-600 hover:bg-cyan-700"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              ROL
            </Button>
            <Button
              variant="default"
              onClick={() => performBitwiseOperation('ROR')}
              className="h-12 text-sm bg-cyan-600 hover:bg-cyan-700"
            >
              <RotateCw className="w-4 h-4 mr-1" />
              ROR
            </Button>
          </div>

          {/* Opérations logiques principales */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="default"
              onClick={() => performBinaryOperation('AND')}
              className="h-12 text-sm bg-green-600 hover:bg-green-700"
            >
              AND
            </Button>
            <Button
              variant="default"
              onClick={() => performBinaryOperation('OR')}
              className="h-12 text-sm bg-blue-600 hover:bg-blue-700"
            >
              OR
            </Button>
            <Button
              variant="default"
              onClick={() => performBinaryOperation('XOR')}
              className="h-12 text-sm bg-purple-600 hover:bg-purple-700"
            >
              XOR
            </Button>
          </div>

          {/* Opérations logiques avancées */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="default"
              onClick={() => performBinaryOperation('NAND')}
              className="h-12 text-sm bg-orange-600 hover:bg-orange-700"
            >
              NAND
            </Button>
            <Button
              variant="default"
              onClick={() => performBinaryOperation('NOR')}
              className="h-12 text-sm bg-red-600 hover:bg-red-700"
            >
              NOR
            </Button>
            <Button
              variant="default"
              onClick={() => performBitwiseOperation('NOT')}
              className="h-12 text-sm bg-gray-600 hover:bg-gray-700"
            >
              NOT
            </Button>
          </div>

          {/* Chiffres hexadécimaux */}
          {inputBase === 'hex' && (
            <div className="grid grid-cols-3 gap-2">
              {['A', 'B', 'C', 'D', 'E', 'F'].map(digit => (
                <Button
                  key={digit}
                  variant="outline"
                  onClick={() => handleNumberInput(digit)}
                  className="h-12 text-lg bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:hover:bg-yellow-800/50"
                >
                  {digit}
                </Button>
              ))}
            </div>
          )}

          {/* Chiffres numériques */}
          <div className="grid grid-cols-4 gap-2">
            {['7', '8', '9'].map(digit => (
              <Button
                key={digit}
                variant="outline"
                onClick={() => handleNumberInput(digit)}
                className="h-12 text-lg"
                disabled={
                  (inputBase === 'oct' && parseInt(digit) >= 8) ||
                  (inputBase === 'bin' && parseInt(digit) >= 2)
                }
              >
                {digit}
              </Button>
            ))}
            <Button
              variant="default"
              onClick={() => performBitwiseOperation('LSH')}
              className="h-12 text-sm bg-indigo-600 hover:bg-indigo-700"
            >
              &lt;&lt;
            </Button>

            {['4', '5', '6'].map(digit => (
              <Button
                key={digit}
                variant="outline"
                onClick={() => handleNumberInput(digit)}
                className="h-12 text-lg"
                disabled={inputBase === 'bin' && parseInt(digit) >= 2}
              >
                {digit}
              </Button>
            ))}
            <Button
              variant="default"
              onClick={() => performBitwiseOperation('RSH')}
              className="h-12 text-sm bg-indigo-600 hover:bg-indigo-700"
            >
              &gt;&gt;
            </Button>

            {['1', '2', '3'].map(digit => (
              <Button
                key={digit}
                variant="outline"
                onClick={() => handleNumberInput(digit)}
                className="h-12 text-lg"
                disabled={inputBase === 'bin' && parseInt(digit) >= 2}
              >
                {digit}
              </Button>
            ))}
            <Button
              variant="default"
              onClick={executeOperation}
              className="h-12 bg-yellow-600 hover:bg-yellow-700"
            >
              =
            </Button>

            <Button
              variant="outline"
              onClick={() => handleNumberInput('0')}
              className="col-span-3 h-12 text-lg"
            >
              0
            </Button>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(value)}
              className="h-12"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conversions panel amélioré */}
      <Card className="shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-green-600 dark:text-green-400" />
            Conversions & Informations
            <Badge variant="secondary" className="text-xs">Temps réel</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <span className="font-medium text-blue-700 dark:text-blue-300">Décimal (DEC):</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg">{convertToBase(currentNumber, 'dec')}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(convertToBase(currentNumber, 'dec'))}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <span className="font-medium text-orange-700 dark:text-orange-300">Hexadécimal (HEX):</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg">0x{convertToBase(currentNumber, 'hex')}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard('0x' + convertToBase(currentNumber, 'hex'))}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <span className="font-medium text-purple-700 dark:text-purple-300">Octal (OCT):</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg">0{convertToBase(currentNumber, 'oct')}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard('0' + convertToBase(currentNumber, 'oct'))}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <span className="font-medium text-green-700 dark:text-green-300">Binaire (BIN):</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg break-all">0b{convertToBase(currentNumber, 'bin')}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard('0b' + convertToBase(currentNumber, 'bin'))}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bit representation avec groupement par 8 bits */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Représentation {wordSize}-bit (par octets):</h4>
            <div className="font-mono text-xs break-all bg-white dark:bg-gray-800 p-3 rounded border space-y-1">
              {convertToBase(currentNumber, 'bin').padStart(wordSize, '0').match(/.{1,8}/g)?.map((byte, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-500">Byte {Math.floor(wordSize/8)-1-index}:</span>
                  <span>{byte}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Informations:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Bits utilisés:</span>
                <span className="font-mono">{Math.max(1, Math.floor(Math.log2(Math.abs(currentNumber) || 1)) + 1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Signe:</span>
                <span className="font-mono">{currentNumber >= 0 ? 'Positif' : 'Négatif'}</span>
              </div>
              <div className="flex justify-between">
                <span>Parité:</span>
                <span className="font-mono">{currentNumber % 2 === 0 ? 'Pair' : 'Impair'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
