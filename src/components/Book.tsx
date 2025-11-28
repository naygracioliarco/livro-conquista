import { useState, useEffect } from 'react';
import TableOfContents from './TableOfContents';
import Chapter from './Chapter';
import DataTable from './DataTable';
import TeacherPanel from './TeacherPanel';
import { chapterQuestions } from '../data/questions';
import { UserAnswers } from '../types/questions';
import { loadAnswers, saveAnswers } from '../utils/storage';

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
      <div className="mx-auto bg-white shadow-2xl rounded-lg overflow-hidden" style={{ maxWidth: '53%', marginLeft: 'auto', marginRight: 'auto' }}>
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

          <Chapter
            id="chapter1"
            number={1}
            title="Introdução ao Conhecimento"
            content={
              <>
                <p className="mb-4">
                  Este primeiro capítulo explora os fundamentos do conhecimento humano e como
                  ele tem sido transmitido através das gerações. Desde os primórdios da
                  civilização, a humanidade busca compreender o mundo ao seu redor.
                </p>
                <p className="mb-4">
                  A escrita revolucionou nossa capacidade de preservar e compartilhar
                  informações. Dos hieróglifos egípcios aos livros digitais modernos, a
                  evolução dos meios de comunicação moldou profundamente nossa sociedade.
                </p>
                <p>
                  Neste capítulo, examinaremos como diferentes culturas desenvolveram sistemas
                  únicos de organização e transmissão do conhecimento, e o impacto dessas
                  práticas no desenvolvimento humano.
                </p>
              </>
            }
            questions={chapterQuestions.chapter1}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            showTeacherView={showTeacherView}
          />

          <Chapter
            id="chapter2"
            number={2}
            title="Dados e Informação"
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
