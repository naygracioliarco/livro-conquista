import { Question } from '../types/questions';

export const chapterQuestions: Record<string, Question[]> = {
  chapter1: [
    {
      id: 'ch1_q1',
      type: 'text-input',
      number: 1,
      question: 'Responda a cada pergunta e indique em que parte da notícia a informação aparece.',
      subQuestions: [
        {
          letter: 'a',
          question: 'O que aconteceu?',
          placeholder: 'Digite sua resposta aqui...',
          correctAnswer: 'A China inaugurou a primeira loja dedicada à venda e à manutenção de robôs humanoides. (Título)',
        },
        {
          letter: 'b',
          question: 'Onde aconteceu?',
          placeholder: 'Digite sua resposta aqui...',
          correctAnswer: 'Em Pequim, na China. (Lide)',
        },
        {
          letter: 'c',
          question: 'Quando aconteceu?',
          placeholder: 'Digite sua resposta aqui...',
          correctAnswer: 'Em 8 de agosto de 2025. (Lide)',
        },
      ],
    },
    {
      id: 'ch1_q2',
      type: 'true-false',
      question: 'A escrita foi inventada simultaneamente em todas as regiões do mundo.',
      correctAnswer: false,
    },
    {
      id: 'ch1_q3',
      type: 'alternative',
      question: 'Qual foi o impacto mais significativo da invenção da escrita?',
      options: [
        'Permitiu a preservação e compartilhamento de informações através do tempo',
        'Aumentou o comércio local imediatamente',
        'Eliminou a necessidade de educação oral',
        'Todas as alternativas anteriores',
      ],
      correctAnswer: 0,
    },
    {
      id: 'ch1_q4',
      type: 'text-input',
      number: 1,
      question: 'Responda a cada pergunta e indique em que parte da notícia a informação aparece.',
      subQuestions: [
        {
          letter: 'a',
          question: 'O que aconteceu?',
          placeholder: 'Digite sua resposta aqui...',
          correctAnswer: 'A China inaugurou a primeira loja dedicada à venda e à manutenção de robôs humanoides. (Título)',
        },
        {
          letter: 'b',
          question: 'Onde aconteceu?',
          placeholder: 'Digite sua resposta aqui...',
          correctAnswer: 'Em Pequim, na China. (Lide)',
        },
        {
          letter: 'c',
          question: 'Quando aconteceu?',
          placeholder: 'Digite sua resposta aqui...',
          correctAnswer: 'Em 8 de agosto de 2025. (Lide)',
        },
      ],
    },
    {
      id: 'ch1_q5',
      type: 'text-input',
      question: '1. Responda a cada pergunt a informação aparece.',
      placeholder: 'Digite sua resposta aqui...',
      correctAnswer: 'Exemplo: O que aconteceu? A China inaugurou a primeira loja dedicada à venda e à manutenção de robôs humanoides. (Título)',
    },
  ],
  chapter2: [
    {
      id: 'ch2_q1',
      type: 'multiple-choice',
      question: 'Em qual ano foi criada a World Wide Web?',
      options: {
        a: '1971',
        b: '1989',
        c: '2001',
      },
      correctAnswer: 'b',
    },
    {
      id: 'ch2_q2',
      type: 'true-false',
      question: 'O primeiro e-mail foi enviado em 1989.',
      correctAnswer: false,
    },
    {
      id: 'ch2_q3',
      type: 'alternative',
      question: 'Qual tecnologia revolucionou mais o acesso à informação no século XX?',
      options: [
        'A televisão',
        'O rádio',
        'A internet',
        'O telefone',
      ],
      correctAnswer: 2,
    },
  ],
};
