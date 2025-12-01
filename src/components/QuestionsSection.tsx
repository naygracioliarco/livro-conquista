import { Eye } from 'lucide-react';
import { Question, UserAnswers } from '../types/questions';
import QuestionMultipleChoice from './QuestionMultipleChoice';
import QuestionTrueFalse from './QuestionTrueFalse';
import QuestionAlternative from './QuestionAlternative';
import QuestionTextInput from './QuestionTextInput';

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
      case 'text-input':
        return (
          <QuestionTextInput
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
      <div className="flex items-center gap-2 mb-4">
        {showTeacherView && <Eye size={20} />}
        <h3 className="font-semibold text-lg">
          {showTeacherView ? 'Visão do Professor' : 'Questões de Revisão'} ({questions.length})
        </h3>
      </div>

      <div className="space-y-4">
        {questions.map((question) => renderQuestion(question))}
      </div>
    </div>
  );
}

export default QuestionsSection;
