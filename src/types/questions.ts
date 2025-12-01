export type QuestionType = 'multiple-choice' | 'true-false' | 'alternative' | 'text-input';

export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple-choice';
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
  };
  correctAnswer: 'a' | 'b' | 'c';
}

export interface TrueFalseQuestion {
  id: string;
  type: 'true-false';
  question: string;
  correctAnswer: boolean;
}

export interface AlternativeQuestion {
  id: string;
  type: 'alternative';
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface TextInputQuestion {
  id: string;
  type: 'text-input';
  question: string;
  placeholder?: string;
  correctAnswer?: string; // Opcional, para validação na visão do professor
  number?: number; // Número da questão (ex: 1, 2, 3...)
  subQuestions?: Array<{
    letter: string; // Letra da subquestão (ex: 'a', 'b', 'c')
    question: string; // Texto da subquestão
    placeholder?: string;
    correctAnswer?: string;
  }>;
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | AlternativeQuestion | TextInputQuestion;

export interface UserAnswers {
  [questionId: string]: string | number | boolean;
}

export interface QuestionResult {
  questionId: string;
  userAnswer: string | number | boolean | undefined;
  correctAnswer: string | number | boolean;
  isCorrect: boolean;
}
