function TableOfContents() {
  const scrollToChapter = (chapterId: string) => {
    const element = document.getElementById(chapterId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className="mb-12 p-6 rounded-lg border border-slate-200"
      style={{
        backgroundColor: '#EEE6D4',
      }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Seção Sumário */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <h2
              className="font-hwtArtz"
              style={{
                color: '#0E3B5D',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 800,
                lineHeight: 'normal',
              }}
            >
              SUMÁRIO
            </h2>
          </div>
          <ol className="space-y-3">
            <li>
              <button
                onClick={() => scrollToChapter('chapter1')}
                className="text-left w-full font-Ubuntu flex items-center gap-2"
                style={{
                  color: '#144468',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                }}
              >
                <img
                  src="images/Union.svg"
                  alt="Union"
                  className="w-4 h-4 object-contain"
                />
                <span>
                  Capítulo 1:
                </span>{' '}
                <span>
                  Notícias
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToChapter('chapter2')}
                className="text-left w-full font-Ubuntu flex items-center gap-2"
                style={{
                  color: '#144468',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                }}
              >
                <img
                  src="images/Union.svg"
                  alt="Union"
                  className="w-4 h-4 object-contain"
                />
                <span>
                  Capítulo 2:
                </span>{' '}
                <span>
                  Fábulas
                </span>
              </button>
            </li>
          </ol>
        </div>

        {/* Divisor vertical */}
        <div
          className="hidden md:block"
          style={{
            backgroundColor: '#0E3B5D',
            width: '3px',
          }}
        />

        {/* Seção Tutorial */}
        <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="font-hwtArtz text-sm md:text-xl"
            style={{
              color: '#0E3B5D',
              fontWeight: 700,
            }}
          >
            ACESSE O TUTORIAL E APRENDA A MEXER NO LIVRO DIGITAL
          </p>
          <a
            href="https://go.plataformaconx.com.br/ujBmfd"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer self-center md:self-auto"
          >
            <img
              src="images/qrCode.svg"
              alt="QR Code Tutorial"
              className="w-20 h-20 md:w-28 md:h-28 object-contain"
            />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default TableOfContents;
