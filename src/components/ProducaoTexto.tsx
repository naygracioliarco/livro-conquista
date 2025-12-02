import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import DownloadButton from './DownloadButton';

function ProducaoTexto() {
  const [texto, setTexto] = useState('');

  // Carrega o texto salvo do localStorage ao montar o componente
  useEffect(() => {
    const textoSalvo = localStorage.getItem('producaoTexto');
    if (textoSalvo) {
      setTexto(textoSalvo);
    }
  }, []);

  // Salva o texto no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem('producaoTexto', texto);
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
    doc.save('minha-versao-producao-texto.pdf');
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
          Produção de texto – Minha versão
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
      <DownloadButton onClick={handleDownload} disabled={!texto.trim()} />
    </div>
  );
}

export default ProducaoTexto;