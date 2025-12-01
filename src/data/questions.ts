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
        {
          letter: 'd',
          question: 'Quem esteve envolvido?',
          placeholder: 'Digite sua resposta aqui...',
          correctAnswer: 'Empresas chinesas de robótica e Wang Yifan, diretor do Robot Mall. (Linha-fina e corpo da notícia)',
        },
        {
          letter: 'e',
          question: 'Que tipos de serviços são oferecidos?',
          placeholder: 'Digite sua resposta aqui...',
          correctAnswer: 'Venda e manutenção de robôs humanoides, fornecimento de peças e coleta de <em>feedbacks</em> dos clientes. (Título, lide e corpo da notícia) ',
        },
      ],
    },
    {
      id: 'ch1_q2',
      type: 'true-false',
      number: 2,
      question: 'Leia as afirmações abaixo e identifique se são verdadeiras ou falsas. Depois, corrija as afirmações falsas.',
      hasCorrectionBox: true,
      correctionPlaceholder: 'Corrija as afirmações falsas aqui...',
      statements: [
        {
          letter: 'a',
          statement: 'A linha-fina é usada para expressar a opinião da autora sobre o tema da notícia.',
          correctAnswer: false,
          correction: 'A linha-fina não expressa opinião; ela antecipa ou destaca uma informação relevante, complementando o título.',
        },
        {
          letter: 'b',
          statement: 'A autora da notícia usa terceira pessoa para contar o fato.',
          correctAnswer: true,
        },
        {
          letter: 'c',
          statement: 'A notícia apresenta falas do diretor do Robot Mall como fonte.',
          correctAnswer: true,
        },
        {
          letter: 'd',
          statement: 'Os verbos principais da notícia estão no tempo futuro, pois o evento ainda vai acontecer.',
          correctAnswer: false,
          correction: 'Os verbos estão no passado, porque o fato já aconteceu.',
        },
        {
          letter: 'e',
          statement: 'As informações mais importantes da notícia aparecem no final do texto.',
          correctAnswer: false,
          correction: 'As informações mais importantes aparecem no início da notícia, como é típico do gênero.',
        },
      ],
    },
    {
      id: 'ch1_q3',
      type: 'alternative',
      number: 3,
      question: 'Leia as afirmativas abaixo e identifique aquela que melhor resume o tema principal da notícia.',
      options: [
        'A China criou um time de robôs para jogar futebol e competir em torneios internacionais.',
        'Uma empresa de robótica chinesa desenvolveu um robô que prepara café e serve clientes.',
        'A China inaugurou a primeira loja destinada à venda, à manutenção e à prestação de serviços para robôs humanoides. ',
        'Robôs humanoides parecidos com pessoas famosas, como Einstein e Qin Shi Huang, estão sendo fabricados em escala industrial.',
      ],
      correctAnswer: 2,
    },
    {
      id: 'ch1_q4',
      type: 'text-input',
      number: 4,
      question: 'Reflita sobre a estrutura da notícia lida e sobre as informações selecionadas pela autora para apresentar o tema. Então, responda às questões a seguir.',
      subQuestions: [
        {
          letter: 'a',
          question: 'Qual é a primeira informação apresentada no corpo da notícia? Por que o texto começa com ela?',
          placeholder: 'Digite sua resposta aqui...',
          correctAnswer: 'A informação sobre a inauguração da loja Robot Mall dedicada à venda e à manutenção de robôs humanoides. Esse fato aparece primeiro porque é o mais importante, desperta o interesse do leitor e apresenta o tema da notícia. ',
        },
        {
          letter: 'b',
          question: 'Quais informações aparecem posteriormente no corpo da notícia?',
          placeholder: 'Digite sua resposta aqui...',
          correctAnswer: 'Detalhes sobre tipos de robôs, empresas envolvidas, funções dos robôs (como servir café ou jogar futebol) e curiosidades (como o robô com aparência de Albert Einstein).',
        },
        {
          letter: 'c',
          question: 'Quais informações poderiam ter sido mencionadas na notícia, mas não foram? ',
          placeholder: 'Digite sua resposta aqui...',
          correctAnswer: 'Pessoal. Poderiam ter sido mencionadas informações sobre o custo de produção dos robôs, os possíveis riscos de segurança, o impacto no mercado de trabalho e questões éticas envolvendo o uso de máquinas em tarefas humanas.',
        },
        {
          letter: 'd',
          question: 'Com base nas informações selecionadas para noticiar a inauguração, que ponto de vista o texto transmite sobre o Robot Mall? Por quê? ',
          placeholder: 'Digite sua resposta aqui...',
          correctAnswer: 'Pessoal. Espera-se que os alunos identifiquem que o texto busca despertar no leitor um sentimento de admiração e curiosidade, destacando o Robot Mall como símbolo de inovação e avanço tecnológico. A seleção de informações positivas reforça uma visão otimista do local e do uso de robôs no cotidiano.',
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
