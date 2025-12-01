export type QuestionType = 'multiple-choice' | 'true-false' | 'alternative' | 'text-input' | 'table-fill';

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
  correctAnswer?: boolean; // Para compatibilidade com formato antigo (opcional quando há statements)
  number?: number; // Número da questão (ex: 2, 3, 4...)
  statements?: Array<{
    letter: string; // Letra da afirmação (ex: 'a', 'b', 'c')
    statement: string; // Texto da afirmação
    correctAnswer: boolean; // Se a afirmação é verdadeira ou falsa
    correction?: string; // Correção para afirmações falsas (opcional)
  }>;
  hasCorrectionBox?: boolean; // Se deve mostrar campo de texto para correções
  correctionPlaceholder?: string; // Placeholder para o campo de correção
}

export interface AlternativeQuestion {
  id: string;
  type: 'alternative';
  question: string;
  options: string[];
  correctAnswer: number;
  number?: number; // Número da questão (ex: 3, 4, 5...)
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

export interface TableFillQuestion {
  id: string;
  type: 'table-fill';
  question?: string;
  number?: number;
  columns: string[];
  rows: Array<{
    id: string;
    paragraph: string;
    text1?: string;
    text2?: string;
  }>;
  correctAnswer?: {
    [fieldId: string]: string; // Mapeia fieldId (questionId_rowId_colN) para a resposta correta
  };
  subQuestions?: Array<{
    letter: string; // Letra da subquestão (ex: 'a', 'b', 'c')
    question: string; // Texto da subquestão
    placeholder?: string;
    correctAnswer?: string;
  }>;
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | AlternativeQuestion | TextInputQuestion | TableFillQuestion;

export interface UserAnswers {
  [questionId: string]: string | number | boolean;
}

export interface QuestionResult {
  questionId: string;
  userAnswer: string | number | boolean | undefined;
  correctAnswer: string | number | boolean;
  isCorrect: boolean;
}
