import jsPDF from 'jspdf';
import { Question, UserAnswers } from '../types/questions';
import DownloadButton from './DownloadButton';

interface DownloadQuestionsButtonProps {
  questions: Question[];
  userAnswers: UserAnswers;
  title?: string;
  fileName?: string;
}

function DownloadQuestionsButton({
  questions,
  userAnswers,
  title = 'Questões',
  fileName = 'questoes.pdf',
}: DownloadQuestionsButtonProps) {
  // Função auxiliar para remover tags HTML
  const stripHtml = (html: string): string => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Função para gerar PDF das questões
  const handleDownload = () => {
    if (questions.length === 0) {
      alert('Não há questões para baixar.');
      return;
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let yPosition = margin;

    // Título
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, yPosition);
    yPosition += 15;

    // Data
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const date = new Date().toLocaleDateString('pt-BR');
    doc.text(`Gerado em: ${date}`, margin, yPosition);
    yPosition += 10;

    // Linha separadora
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Processa cada questão
    questions.forEach((question) => {
      // Verifica se precisa de nova página
      if (yPosition + 30 > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }

      // Número e texto da questão
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      const questionNumber = ('number' in question && question.number !== undefined) ? `${question.number}. ` : '';
      const questionText = stripHtml(question.question || '');
      const fullQuestionText = `${questionNumber}${questionText}`;
      const wrappedQuestion = doc.splitTextToSize(fullQuestionText, maxWidth);
      doc.text(wrappedQuestion, margin, yPosition);
      yPosition += wrappedQuestion.length * 6 + 5;

      // Processa cada tipo de questão
      if (question.type === 'text-input' && question.subQuestions) {
        question.subQuestions.forEach((subQ) => {
          if (yPosition + 15 > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
          }

          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          const subQuestionText = `${subQ.letter}) ${stripHtml(subQ.question)}`;
          const wrappedSubQuestion = doc.splitTextToSize(subQuestionText, maxWidth - 10);
          doc.text(wrappedSubQuestion, margin + 5, yPosition);
          yPosition += wrappedSubQuestion.length * 6 + 2;

          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          const answerId = `${question.id}_${subQ.letter}`;
          const userAnswer = (userAnswers[answerId] as string) || '';
          if (userAnswer) {
            const wrappedAnswer = doc.splitTextToSize(`Resposta: ${userAnswer}`, maxWidth - 10);
            doc.text(wrappedAnswer, margin + 10, yPosition);
            yPosition += wrappedAnswer.length * 5 + 3;
          } else {
            doc.text('Resposta: (não respondida)', margin + 10, yPosition);
            yPosition += 5;
          }

          // Se tiver subItems, processa também
          if (subQ.subItems && subQ.subItems.length > 0) {
            subQ.subItems.forEach((subItem) => {
              if (yPosition + 15 > pageHeight - margin) {
                doc.addPage();
                yPosition = margin;
              }

              doc.setFontSize(10);
              doc.setFont('helvetica', 'bold');
              doc.text(`${subItem.label}:`, margin + 10, yPosition);
              yPosition += 5;

              doc.setFont('helvetica', 'normal');
              const subItemAnswerId = `${question.id}_${subQ.letter}_${subItem.label}`;
              const subItemAnswer = (userAnswers[subItemAnswerId] as string) || '';
              if (subItemAnswer) {
                const wrappedSubItemAnswer = doc.splitTextToSize(`Resposta: ${subItemAnswer}`, maxWidth - 15);
                doc.text(wrappedSubItemAnswer, margin + 15, yPosition);
                yPosition += wrappedSubItemAnswer.length * 5 + 3;
              } else {
                doc.text('Resposta: (não respondida)', margin + 15, yPosition);
                yPosition += 5;
              }
            });
          }
        });
      } else if (question.type === 'true-false' && question.statements) {
        question.statements.forEach((stmt) => {
          if (yPosition + 15 > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
          }

          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          const statementText = `${stmt.letter}) ${stripHtml(stmt.statement)}`;
          const wrappedStatement = doc.splitTextToSize(statementText, maxWidth - 5);
          doc.text(wrappedStatement, margin + 5, yPosition);
          yPosition += wrappedStatement.length * 5 + 3;

          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          const statementId = `${question.id}_${stmt.letter}`;
          const userAnswer = userAnswers[statementId] as boolean | undefined;
          if (userAnswer !== undefined) {
            const answerText = userAnswer ? 'Verdadeiro (V)' : 'Falso (F)';
            doc.text(`Resposta: ${answerText}`, margin + 10, yPosition);
            yPosition += 5;
          } else {
            doc.text('Resposta: (não respondida)', margin + 10, yPosition);
            yPosition += 5;
          }
        });

        // Se tiver campo de correção, mostra o texto de correção geral
        if (question.hasCorrectionBox) {
          if (yPosition + 15 > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
          }

          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text('Correções das afirmações falsas:', margin + 5, yPosition);
          yPosition += 6;

          doc.setFont('helvetica', 'normal');
          const correctionId = `${question.id}_correction`;
          const correction = (userAnswers[correctionId] as string) || '';
          if (correction) {
            const wrappedCorrection = doc.splitTextToSize(correction, maxWidth - 10);
            doc.text(wrappedCorrection, margin + 10, yPosition);
            yPosition += wrappedCorrection.length * 5 + 3;
          } else {
            doc.text('(não preenchido)', margin + 10, yPosition);
            yPosition += 5;
          }
        }
      } else if (question.type === 'alternative') {
        if (yPosition + 15 > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const userAnswer = userAnswers[question.id] as number | undefined;
        if (userAnswer !== undefined && question.options[userAnswer]) {
          const answerText = `Resposta: ${question.options[userAnswer]}`;
          const wrappedAnswer = doc.splitTextToSize(answerText, maxWidth - 10);
          doc.text(wrappedAnswer, margin + 5, yPosition);
          yPosition += wrappedAnswer.length * 5 + 3;
        } else {
          doc.text('Resposta: (não respondida)', margin + 5, yPosition);
          yPosition += 5;
        }
      } else if (question.type === 'text-input') {
        if (yPosition + 15 > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const userAnswer = (userAnswers[question.id] as string) || '';
        if (userAnswer) {
          const wrappedAnswer = doc.splitTextToSize(`Resposta: ${userAnswer}`, maxWidth - 10);
          doc.text(wrappedAnswer, margin + 5, yPosition);
          yPosition += wrappedAnswer.length * 5 + 3;
        } else {
          doc.text('Resposta: (não respondida)', margin + 5, yPosition);
          yPosition += 5;
        }
      } else if (question.type === 'multiple-choice') {
        if (yPosition + 15 > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const userAnswer = userAnswers[question.id] as string | undefined;
        if (userAnswer && question.options[userAnswer as keyof typeof question.options]) {
          const answerText = `Resposta: ${userAnswer.toUpperCase()}) ${question.options[userAnswer as keyof typeof question.options]}`;
          const wrappedAnswer = doc.splitTextToSize(answerText, maxWidth - 10);
          doc.text(wrappedAnswer, margin + 5, yPosition);
          yPosition += wrappedAnswer.length * 5 + 3;
        } else {
          doc.text('Resposta: (não respondida)', margin + 5, yPosition);
          yPosition += 5;
        }
      } else if (question.type === 'table-fill') {
        // Para questões de tabela, renderiza como tabela
        if (yPosition + 30 > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }

        const tableStartY = yPosition;
        const cellPadding = 3;
        const rowHeight = 8;
        const numColumns = question.columns.length;
        const tableWidth = maxWidth;
        const colWidths: number[] = [];
        
        // Calcula larguras das colunas (primeira coluna menor, outras dividem o espaço restante)
        const firstColWidth = tableWidth * 0.25;
        const remainingWidth = tableWidth - firstColWidth;
        const otherColWidth = remainingWidth / (numColumns - 1);
        
        for (let i = 0; i < numColumns; i++) {
          colWidths.push(i === 0 ? firstColWidth : otherColWidth);
        }

        let currentX = margin;
        let currentY = tableStartY;

        // Desenha cabeçalho da tabela
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        question.columns.forEach((column, colIndex) => {
          const colWidth = colWidths[colIndex];
          const cellText = doc.splitTextToSize(column, colWidth - cellPadding * 2);
          
          // Desenha borda da célula
          doc.rect(currentX, currentY, colWidth, rowHeight);
          
          // Desenha texto centralizado verticalmente
          const textY = currentY + (rowHeight / 2) + (cellText.length - 1) * 2.5;
          doc.text(cellText, currentX + cellPadding, textY);
          
          currentX += colWidth;
        });

        currentY += rowHeight;
        currentX = margin;

        // Desenha linhas da tabela
        doc.setFont('helvetica', 'normal');
        question.rows.forEach((row) => {
          const firstColumnKey = Object.keys(row).find(key => key !== 'id') || '';
          const firstColumnValue = row[firstColumnKey] || '';

          // Calcula a altura necessária para esta linha (baseada no texto mais longo)
          let maxCellHeight = rowHeight;
          const cellTexts: string[][] = [];
          
          question.columns.forEach((_column, colIndex) => {
            const colWidth = colWidths[colIndex];
            let cellText: string[] = [];
            
            if (colIndex === 0) {
              // Primeira coluna: valor da linha
              cellText = doc.splitTextToSize(firstColumnValue, colWidth - cellPadding * 2);
            } else {
              // Outras colunas: resposta do usuário
              const fieldId = `${question.id}_${row.id}_col${colIndex}`;
              const userAnswer = (userAnswers[fieldId] as string) || '';
              cellText = doc.splitTextToSize(userAnswer || '', colWidth - cellPadding * 2);
            }
            
            cellTexts.push(cellText);
            const neededHeight = cellText.length * 4 + cellPadding * 2;
            if (neededHeight > maxCellHeight) {
              maxCellHeight = neededHeight;
            }
          });

          // Verifica se precisa de nova página
          if (currentY + maxCellHeight > pageHeight - margin) {
            doc.addPage();
            currentY = margin;
            currentX = margin;
          }

          // Desenha as células da linha
          question.columns.forEach((_column, colIndex) => {
            const colWidth = colWidths[colIndex];
            const cellText = cellTexts[colIndex];
            
            // Desenha borda da célula
            doc.rect(currentX, currentY, colWidth, maxCellHeight);
            
            // Desenha texto
            const textY = currentY + cellPadding + 3;
            doc.text(cellText, currentX + cellPadding, textY);
            
            currentX += colWidth;
          });

          currentY += maxCellHeight;
          currentX = margin;
        });

        yPosition = currentY + 5;

        // Processa subquestões se houver
        if (question.subQuestions) {
          question.subQuestions.forEach((subQ) => {
            if (yPosition + 15 > pageHeight - margin) {
              doc.addPage();
              yPosition = margin;
            }

            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            const subQuestionText = `${subQ.letter}) ${stripHtml(subQ.question)}`;
            doc.text(subQuestionText, margin + 5, yPosition);
            yPosition += 6;

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            const subAnswerId = `${question.id}_${subQ.letter}`;
            const subAnswer = (userAnswers[subAnswerId] as string) || '';
            if (subAnswer) {
              const wrappedSubAnswer = doc.splitTextToSize(`Resposta: ${subAnswer}`, maxWidth - 10);
              doc.text(wrappedSubAnswer, margin + 10, yPosition);
              yPosition += wrappedSubAnswer.length * 5 + 3;
            } else {
              doc.text('Resposta: (não respondida)', margin + 10, yPosition);
              yPosition += 5;
            }
          });
        }
      }

      yPosition += 8; // Espaço entre questões
    });

    // Salva o PDF
    doc.save(fileName);
  };

  return <DownloadButton onClick={handleDownload} />;
}

export default DownloadQuestionsButton;

