import { Eye } from 'lucide-react';
import { Question, UserAnswers } from '../types/questions';
import QuestionRenderer from './QuestionRenderer';

interface QuestionsSectionProps {
  questions: Question[];
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: any) => void;
  showTeacherView?: boolean;
}

/**
 * Componente consolidado que usa QuestionRenderer para renderizar questões
 * Elimina duplicação de lógica com QuestionRenderer
 */
function QuestionsSection({
  questions,
  userAnswers,
  onAnswerChange,
  showTeacherView = false,
}: QuestionsSectionProps) {
  return (
    <div className="mt-8 mb-8">
      <div className="flex items-center gap-2 mb-4">
        {showTeacherView && <Eye size={20} />}
        <h3 className="font-semibold text-lg">
          {showTeacherView ? 'Visão do Professor' : 'Questões de Revisão'} ({questions.length})
        </h3>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionRenderer
            key={question.id}
            question={question}
            userAnswers={userAnswers}
            onAnswerChange={onAnswerChange}
            showResults={showTeacherView}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionsSection;
