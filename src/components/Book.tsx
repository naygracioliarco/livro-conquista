import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
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
    <div className="min-h-screen bg-amber-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <header className="bg-slate-800 text-white py-8 px-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={32} />
            <h1 className="text-3xl font-serif font-bold">Livro Digital</h1>
          </div>
          <p className="text-slate-300 text-sm">Uma jornada através do conhecimento</p>
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
