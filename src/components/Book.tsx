import { useState, useEffect } from 'react';
import TableOfContents from './TableOfContents';
import Chapter from './Chapter';
import DataTable from './DataTable';
import TeacherPanel from './TeacherPanel';
import TeacherButton from './TeacherButton';
import { chapterQuestions } from '../data/questions';
import { UserAnswers } from '../types/questions';
import { loadAnswers, saveAnswers } from '../utils/storage';
import Pagination from './Pagination';

function Book() {
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [showTeacherView, setShowTeacherView] = useState(false);

  useEffect(() => {
    setUserAnswers(loadAnswers());
  }, []);

  const handleAnswerChange = (questionId: string, answer: any) => {
    const updatedAnswers = {
      ...userAnswers,
      [questionId]: answer,
    };
    setUserAnswers(updatedAnswers);
    saveAnswers(updatedAnswers);
  };

  return (
    <div className="min-h-screen bg-gray-200 w-full">
      <div className="mx-auto bg-white shadow-2xl rounded-lg overflow-hidden" style={{ maxWidth: '63%', marginLeft: 'auto', marginRight: 'auto' }}>
        <header
          className="relative text-white py-8 px-8 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/Capa-1.png)',
          }}
        >

          {/* Conteúdo do header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/images/icon.png"
                alt="Ícone"
                className="w-23 h-29 object-contain"
              />
              <div className="flex flex-col">
                <h1
                  className="text-4xl font-hwt-artz font-bold"
                  style={{
                    WebkitTextStroke: '1.5px #000000',
                    fontWeight: 800,
                  }}
                >
                  PRODUÇÃO DE TEXTOS
                </h1>
                <p
                  className="text-white text-1xl font-hwt-artz rounded-[20px] px-4 py-2 inline-block w-fit mt-4"
                  style={{
                    backgroundColor: '#9C2F4B',
                    fontWeight: 700,
                  }}
                >
                  6º ANO - VOLUMES 1 E 2
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 md:p-12">
          <TableOfContents />
          <Pagination currentPage={4} />
          <div className="my-6">
            <TeacherButton
              // title="Capítulo 1 - Orientações Pedagógicas"
              content={
                <>
                  <p className="mb-3">
                    EF06LP01, EF06LP02. A proposta de abertura tem o objetivo de mobilizar o repertório dos alunos sobre o gênero textual notícia, conectando o conteúdo a experiências de vida e a temas atuais ligados à tecnologia. Incentive-os a comentar, complementar ou questionar as histórias, sempre com respeito e sob sua mediação.
                    As perguntas propostas visam provocar uma reflexão sobre o que torna um fato
                    noticiável, destacando que a definição do que vira notícia é também uma escolha
                    ética e cultural.
                  </p>
                </>
              }

            />
          </div>
          <Chapter
            id="chapter1"
            number={1}
            title="Notícias"
            content={
              <>
                <p className="mb-4 indent-6">
                  Marcos tem 17 anos e adora aprender coisas novas. Ele é cego e, até pouco tempo, precisava da ajuda de outras pessoas para se locomover pela cidade. Tudo mudou quando um
                  grupo de estudantes universitários apresentou um aplicativo na escola dele. Com a câmera
                  do celular, o <em>app</em> informa por voz o que está ao redor: placas, sinais, obstáculos e muito
                  mais. Agora, usando fones de ouvido e o celular, Marcos se locomove com muito mais segurança e autonomia. No jornal local, lê-se a manchete: "Aplicativo criado por estudantes
                  transforma a mobilidade de jovens com deficiência visual".
                </p>
                <p className="mb-4 indent-6">
                  Enquanto isso, em outra parte da cidade, João, de 76 anos, está internado em um hospital. Certo dia, depois do café da manhã, ele recebeu uma visita diferente: um robô com
                  uma tela simulando um rosto e que conversa, conta piadas e pergunta como foi a noite. Esses momentos viraram os preferidos de João no hospital. Em um portal de notícias, o título
                  destacava: “Robô interativo melhora o bem-estar de idosos em hospitais públicos”.
                </p>
                <p className="mb-4 indent-6">
                  Essas histórias mostram como a tecnologia pode transformar a vida das pessoas e são
                  exemplos de como alguns acontecimentos chamam a atenção de jornais, sites e telejornais.
                </p>
                <ul className="list-disc marker:text-[#BF3154] ml-6">
                  <li>Por que algumas histórias viram notícia e outras não?</li>
                  <li>O que torna um fato interessante ou importante para ser compartilhado
                    com milhares de pessoas?</li>
                </ul>
                <div className="flex flex-col items-center my-6">
                  <img src="/images/noticias.png" className="max-w-full" />
                  <p className="text-sm text-slate-600 mt-2">SachiDesigns, Mykola Syvak/stock.adobe.com
                  </p>
                </div>
              </>
            }
          />
          <Pagination currentPage={5} />
          <Chapter
            id="chapter2"
            number={2}
            title="Fábulas"
            content={
              <>
                <p className="mb-4">
                  No mundo contemporâneo, vivemos na era da informação. A capacidade de
                  coletar, organizar e analisar dados tornou-se uma habilidade essencial em
                  praticamente todas as áreas do conhecimento.
                </p>
                <p className="mb-6">
                  Abaixo, apresentamos uma tabela com alguns marcos importantes na história
                  da organização do conhecimento:
                </p>
                <DataTable />
                <p className="mt-6">
                  Cada um desses marcos representou um salto significativo em nossa capacidade
                  de processar e disseminar informações. A digitalização do conhecimento, em
                  particular, democratizou o acesso à educação e à cultura de maneiras que
                  nossos ancestrais jamais poderiam imaginar.
                </p>
              </>
            }
            questions={chapterQuestions.chapter2}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showTeacherView={showTeacherView}
          />
        </div>

        <footer className="bg-slate-100 py-6 px-8 border-t border-slate-200">
          <p className="text-sm text-slate-600 text-center">
            © 2025 - Todos os direitos reservados
          </p>
        </footer>
      </div>

      <TeacherPanel
        userAnswers={userAnswers}
        onToggleTeacherMode={setShowTeacherView}
        showTeacherView={showTeacherView}
      />
    </div>
  );
}

export default Book;
