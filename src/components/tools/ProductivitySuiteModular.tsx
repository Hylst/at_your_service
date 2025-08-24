
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Timer, BookOpen, Target, TrendingUp, Zap, Brain, CheckSquare2 } from "lucide-react";
import { SectionHeader } from '@/components/ui/section-header';
import { TaskManagerEnhanced } from "./productivity/components/TaskManagerEnhanced";
import { PomodoroTimer } from "./productivity/components/PomodoroTimer";
import { NoteManager } from "./productivity/components/NoteManager";
import { GoalManagerEnhanced } from "./productivity/components/GoalManagerEnhanced";
import { TodoListEnhanced } from "./TodoListEnhanced";

export const ProductivitySuiteModular = () => {
  return (
    <div className="space-y-4 lg:space-y-6">
      <SectionHeader
        title="Suite Productivité Complète"
        subtitle="Gérez vos tâches intelligemment avec la to-do list améliorée, prenez des notes organisées, définissez des objectifs SMART et boostez votre concentration avec la technique Pomodoro. Toutes vos données sont synchronisées et sauvegardées localement."
        icon={<Brain />}
        badges={[
           "To-do list avancée",
           "Gestion complète",
           "Technique Pomodoro"
         ]}
         variant="green"
       />

      {/* Navigation par onglets responsive */}
      <Tabs defaultValue="todo" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-4 lg:mb-8 h-auto">
          <TabsTrigger value="todo" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 lg:p-3">
            <CheckSquare2 className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">To-Do List</span>
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 lg:p-3">
            <CheckSquare className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Tâches Pro</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 lg:p-3">
            <Target className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Objectifs</span>
          </TabsTrigger>
          <TabsTrigger value="pomodoro" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 lg:p-3">
            <Timer className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Pomodoro</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 lg:p-3">
            <BookOpen className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Notes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todo">
          <TodoListEnhanced />
        </TabsContent>

        <TabsContent value="tasks">
          <TaskManagerEnhanced />
        </TabsContent>

        <TabsContent value="goals">
          <GoalManagerEnhanced />
        </TabsContent>

        <TabsContent value="pomodoro">
          <PomodoroTimer />
        </TabsContent>

        <TabsContent value="notes">
          <NoteManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};
