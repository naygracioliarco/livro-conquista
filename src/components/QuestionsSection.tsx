import { useState } from 'react';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { Question, UserAnswers } from '../types/questions';
import QuestionMultipleChoice from './QuestionMultipleChoice';
import QuestionTrueFalse from './QuestionTrueFalse';
import QuestionAlternative from './QuestionAlternative';

interface QuestionsSectionProps {
  questions: Question[];
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: any) => void;
  showTeacherView?: boolean;
}

function QuestionsSection({
  questions,
  userAnswers,
  onAnswerChange,
  showTeacherView = false,
}: QuestionsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <QuestionMultipleChoice
            key={question.id}
            question={question}
            userAnswers={userAnswers}
            onAnswerChange={onAnswerChange}
            showResults={showTeacherView}
          />
        );
      case 'true-false':
        return (
          <QuestionTrueFalse
            key={question.id}
            question={question}
            userAnswers={userAnswers}
            onAnswerChange={onAnswerChange}
            showResults={showTeacherView}
          />
        );
      case 'alternative':
        return (
          <QuestionAlternative
            key={question.id}
            question={question}
            userAnswers={userAnswers}
            onAnswerChange={onAnswerChange}
            showResults={showTeacherView}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-8 mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          {showTeacherView && <Eye size={20} />}
          <span className="font-semibold">
            {showTeacherView ? 'Visão do Professor' : 'Questões de Revisão'} ({questions.length})
          </span>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {questions.map((question) => renderQuestion(question))}
        </div>
      )}
    </div>
  );
}

export default QuestionsSection;
