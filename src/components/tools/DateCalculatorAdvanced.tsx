
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Calculator, Clock, MapPin } from 'lucide-react';

// Import components with named imports
import { DateCalculationTabEnhancedV2 } from './dateCalculator/components/DateCalculationTabEnhancedV2';
import { AgeCalculatorTabEnhanced } from './dateCalculator/components/AgeCalculatorTabEnhanced';
import { DateDifferenceTab } from './dateCalculator/components/DateDifferenceTab';
import EventPlannerTabEnhanced from './dateCalculator/components/EventPlannerTabEnhanced';
import { TimeZoneTab } from './dateCalculator/components/TimeZoneTab';
import { CalculationHistoryTab } from './dateCalculator/components/CalculationHistoryTab';

const DateCalculatorAdvanced: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Tabs defaultValue="calculations" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="calculations" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Calculs
              </TabsTrigger>
              <TabsTrigger value="age" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Âge
              </TabsTrigger>
              <TabsTrigger value="difference" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Différence
              </TabsTrigger>
              <TabsTrigger value="planning" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Planning
              </TabsTrigger>
              <TabsTrigger value="timezone" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Fuseaux
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Historique
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="calculations">
                <DateCalculationTabEnhancedV2 />
              </TabsContent>

              <TabsContent value="age">
                <AgeCalculatorTabEnhanced />
              </TabsContent>

              <TabsContent value="difference">
                <DateDifferenceTab />
              </TabsContent>

              <TabsContent value="planning">
                <EventPlannerTabEnhanced />
              </TabsContent>

              <TabsContent value="timezone">
                <TimeZoneTab />
              </TabsContent>

              <TabsContent value="history">
                <CalculationHistoryTab />
              </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DateCalculatorAdvanced;
