import { ReactNode } from 'react';
import { Question, UserAnswers } from '../types/questions';
import QuestionsSection from './QuestionsSection';

interface ChapterProps {
  id: string;
  number: number;
  title: string;
  content: ReactNode;
  questions?: Question[];
  userAnswers?: UserAnswers;
  onAnswerChange?: (questionId: string, answer: any) => void;
  showTeacherView?: boolean;
}

function Chapter({
  id,
  number,
  title,
  content,
  questions,
  userAnswers = {},
  onAnswerChange,
  showTeacherView = false,
}: ChapterProps) {
  return (
    <section id={id} className="mb-12 scroll-mt-4">
      <div className="border-l-4 border-slate-700 pl-6 mb-6">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
          Capítulo {number}
        </p>
        <h2 className="text-3xl font-serif font-bold text-slate-800">{title}</h2>
      </div>
      <div className="text-slate-700 leading-relaxed text-justify">{content}</div>

      {questions && onAnswerChange && (
        <QuestionsSection
          questions={questions}
          userAnswers={userAnswers}
          onAnswerChange={onAnswerChange}
          showTeacherView={showTeacherView}
        />
      )}
    </section>
  );
}

export default Chapter;
