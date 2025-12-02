import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

function ProducaoTextoNoticia() {
  const [texto, setTexto] = useState('');

  // Carrega o texto salvo do localStorage ao montar o componente
  useEffect(() => {
    const textoSalvo = localStorage.getItem('producaoTextoNoticia');
    if (textoSalvo) {
      setTexto(textoSalvo);
    }
  }, []);

  // Salva o texto no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem('producaoTextoNoticia', texto);
  }, [texto]);

  const handleDownload = () => {
    if (!texto.trim()) {
      alert('Por favor, digite algum texto antes de baixar.');
      return;
    }

    // Cria um novo documento PDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Configurações de fonte e margens
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    const lineHeight = 7;
    let yPosition = margin + 20;

    // Adiciona título
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Produção de texto – Minha versão', margin, yPosition);
    yPosition += 15;

    // Adiciona o texto com quebra de linha automática
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    // Divide o texto em linhas que cabem na página
    const lines = doc.splitTextToSize(texto, maxWidth);
    
    lines.forEach((line: string) => {
      // Verifica se precisa de nova página
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });

    // Salva o PDF
    doc.save('producao-texto-noticia.pdf');
  };

  return (
    <div className="my-6">
      <div className="flex items-center gap-3 mb-6">
        <img
          src="/images/producaoTexto.png"
          alt="Trilha do texto"
          className="object-contain"
        />
        <h2
          style={{
            color: '#0E3B5D',
            fontFamily: 'hwt-artz',
            fontSize: '26px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
          }}
        >
          Produção final - Notícia
        </h2>
      </div>

      {/* Caixa de texto para produção */}
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite sua produção de texto aqui..."
        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[400px] text-black mb-6"
        style={{
          fontFamily: 'Ubuntu, sans-serif',
          fontSize: '14px',
          lineHeight: '1.6',
        }}
      />

      {/* Botão de download */}
      <div className="flex">
        <button
          onClick={handleDownload}
          style={{
            position: 'relative',
            padding: '10px 10px 10px 45px',
            backgroundColor: '#BF3154',
            boxShadow: '0px 4px 0px #9C2F4B',
            borderRadius: '0 30px 30px 0',
            color: 'white',
            fontFamily: 'Ubuntu',
            fontSize: '12px',
            fontWeight: 700,
            lineHeight: '1.4em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            margin: '1em 0.4em 1.4em 1.4em',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          onMouseEnter={(e) => {
            if (texto.trim()) {
              e.currentTarget.style.backgroundColor = '#9C2F4B';
              e.currentTarget.style.boxShadow = '0px 2px 0px #7A2440';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#BF3154';
            e.currentTarget.style.boxShadow = '0px 4px 0px #9C2F4B';
          }}
          disabled={!texto.trim()}
        >
          <div
            style={{
              position: 'absolute',
              left: '-15px',
              top: '54%',
              transform: 'translateY(-50%)',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              backgroundColor: '#BF3154',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              background: 'transparent url("/images/download.png") no-repeat center',
              backgroundSize: '100%',
            }}
          >
          </div>
          Download
        </button>
      </div>
    </div>
  );
}

export default ProducaoTextoNoticia;