import { List } from 'lucide-react';

function TableOfContents() {
  const scrollToChapter = (chapterId: string) => {
    const element = document.getElementById(chapterId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="mb-12 p-6 bg-slate-50 rounded-lg border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <List size={24} className="text-slate-700" />
        <h2 className="text-2xl font-serif font-bold text-slate-800">Sumário</h2>
      </div>
      <ol className="space-y-3">
        <li>
          <button
            onClick={() => scrollToChapter('chapter1')}
            className="text-left w-full hover:text-blue-600 transition-colors group"
          >
            <span className="font-semibold text-slate-700 group-hover:text-blue-600">
              Capítulo 1:
            </span>{' '}
            <span className="text-slate-600 group-hover:text-blue-500">
              Introdução ao Conhecimento
            </span>
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToChapter('chapter2')}
            className="text-left w-full hover:text-blue-600 transition-colors group"
          >
            <span className="font-semibold text-slate-700 group-hover:text-blue-600">
              Capítulo 2:
            </span>{' '}
            <span className="text-slate-600 group-hover:text-blue-500">
              Dados e Informação
            </span>
          </button>
        </li>
      </ol>
    </nav>
  );
}

export default TableOfContents;
