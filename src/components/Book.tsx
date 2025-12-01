import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import TableOfContents from './TableOfContents';
import Chapter from './Chapter';
import DataTable from './DataTable';
import TeacherPanel from './TeacherPanel';
import TeacherButton from './TeacherButton';
import { chapterQuestions } from '../data/questions';
import { UserAnswers } from '../types/questions';
import { loadAnswers, saveAnswers } from '../utils/storage';
import Pagination from './Pagination';
import TrilhaTexto from './TrilhaTexto';
import CaixaTexto from './CaixaTexto';

function Book() {
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [showTeacherView, setShowTeacherView] = useState(false);
  const [currentPage, setCurrentPage] = useState(4);

  useEffect(() => {
    setUserAnswers(loadAnswers());
  }, []);

  useEffect(() => {
    // Detecta qual página está visível na viewport
    const updateCurrentPage = () => {
      const paginationElements = document.querySelectorAll('[data-page]');
      let visiblePage = 4; // padrão
      let closestToTop = Infinity;

      paginationElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const page = parseInt(el.getAttribute('data-page') || '4');

        // Verifica se o elemento está visível na viewport
        if (rect.top >= 0 && rect.top < window.innerHeight && rect.bottom > 0) {
          // Se está visível, escolhe a página mais próxima do topo
          if (rect.top < closestToTop) {
            closestToTop = rect.top;
            visiblePage = page;
          }
        }
      });

      // Se nenhuma página está visível no topo, verifica qual está mais próxima do topo
      if (closestToTop === Infinity) {
        paginationElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const page = parseInt(el.getAttribute('data-page') || '4');
          const distanceFromTop = Math.abs(rect.top);

          if (distanceFromTop < closestToTop) {
            closestToTop = distanceFromTop;
            visiblePage = page;
          }
        });
      }

      setCurrentPage(visiblePage);
    };

    // Verifica imediatamente
    updateCurrentPage();

    // Atualiza quando o usuário faz scroll
    window.addEventListener('scroll', updateCurrentPage);
    window.addEventListener('resize', updateCurrentPage);

    // Observa mudanças no DOM
    const observer = new MutationObserver(updateCurrentPage);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener('scroll', updateCurrentPage);
      window.removeEventListener('resize', updateCurrentPage);
      observer.disconnect();
    };
  }, []);

  const handleAnswerChange = (questionId: string, answer: any) => {
    const updatedAnswers = {
      ...userAnswers,
      [questionId]: answer,
    };
    setUserAnswers(updatedAnswers);
    saveAnswers(updatedAnswers);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Atualiza a página após o scroll terminar
    setTimeout(() => {
      setCurrentPage(4);
    }, 500);
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
          {/* Conteúdo do sumário */}
          <TableOfContents />
          {/* Paginação */}
          <Pagination currentPage={currentPage} />
          {/* Conteúdo do botão do professor */}
          <div className="my-6">
            <TeacherButton
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
          {/* Conteúdo do Capítulo 1 */}
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
                {/* Conteúdo de lista */}
                <ul className="list-disc marker:text-[#BF3154] ml-6">
                  <li>Por que algumas histórias viram notícia e outras não?</li>
                  <li>O que torna um fato interessante ou importante para ser compartilhado
                    com milhares de pessoas?</li>
                </ul>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">
                  <img src="/images/noticias.png" className="max-w-full" />
                  <p className="text-sm text-slate-600 mt-2">SachiDesigns, Mykola Syvak/stock.adobe.com
                  </p>
                </div>
                <Pagination currentPage={5} />
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          EF69LP16, EF69LP17, EF06LP02, EF67LP06, EF06LP05. Nesta seção, os alunos ampliam sua
                          compreensão sobre o gênero <strong>notícia</strong>, analisando a função social, a estrutura composicional e os efeitos de sentido produzidos pela linguagem. Conduza uma leitura comentada,
                          destacando como o texto noticioso transmite pontos de vista mesmo sem emitir opinião
                          explícita. Essa análise prepara os alunos para interpretar notícias com atenção à linguagem
                          e reconhecer que toda notícia é uma construção orientada por escolhas.

                        </p>
                      </>
                    }

                  />
                </div>
                <h3>O que é notícia?</h3>
                <p className="mb-4 indent-6">
                  A notícia é um gênero textual do campo jornalístico e tem como principal objetivo
                  informar o público sobre um fato que já aconteceu ou que está acontecendo. Esse fato
                  precisa ser verdadeiro, concreto e de interesse público.
                </p>
                <p className="mb-4 indent-6">
                  O gênero está presente em jornais, revistas, <em>sites</em> e programas de rádio ou TV e pode
                  ser ouvido, lido ou assistido em diversos formatos. É um texto predominantemente expositivo e informativo, pois apresenta acontecimentos do mundo com base em dados, relatos
                  e registros confiáveis.
                </p>
                <p className="mb-4 indent-6">
                  Por ser um gênero que circula amplamente na sociedade e que influencia a opinião
                  pública, a notícia cumpre uma função social importante: ajuda a formar a opinião das pessoas sobre diferentes assuntos. Por isso, deve ser produzida com responsabilidade, fundamentada em fontes confiáveis e organizada de modo a permitir ao leitor que compreenda
                  plenamente os fatos e o contexto em eles que se inserem.
                </p>
                <p className="mb-4 indent-6">
                  As principais características da notícia estão listadas a seguir.
                </p>
                <ul className="list-disc marker:text-[#BF3154] ml-6">
                  <li><strong>Foco na objetividade</strong>: o autor não deve expressar sua opinião. </li>
                  <li><strong>Uso da terceira pessoa</strong>: evita-se o uso de pronomes como <strong>eu</strong> ou <strong>nós</strong>. </li>
                  <li><strong>Presença de lide</strong>: as informações mais importantes aparecem no início do texto. </li>
                  <li><strong>Emprego predominante de verbos no passado</strong>:  os acontecimentos já ocorridos são apresentados nessa forma verbal. </li>
                  <li><strong>Uso de linguagem informativa e estrutura em ordem direta</strong>: evita-se o uso de frases em ordem indireta ou ambíguas. </li>
                  <li><strong>Apresentação de evidências</strong>: dados, depoimentos e registros dão credibilidade às informações. </li>
                  <li><strong>Organização típica</strong>: o texto segue a estrutura de pirâmide invertida, com título, linha-fina, lide, corpo da notícia e fechamento, de modo que as informações essenciais são apresentadas no início e as menos essenciais, no fim do texto. </li>
                </ul>
                <p className="mb-4 indent-6">
                  Na internet, além de texto escrito e imagens, as notícias costumam apresentar outros recursos, como vídeos, mapas interativos,infográficos, áudios e hiperlinks. Esse conjunto de elementos é chamado de <strong>recursos multimodais</strong>.
                </p>
                <h4>A linguagem na notícia</h4>
                <p className="mb-4 indent-6">
                  Embora a principal intenção da notícia seja informar com objetividade, a maneira como ela é escrita envolve escolhas que podem revelar diferentes pontos de vista, mesmo que o autor não exponha sua opinião diretamente. Por exemplo, o título “Robôs trazem autonomia e segurança para idosos” destaca um benefício da tecnologia. Já o título “Robôs substituem cuidados humanos com idosos” mostra outra perspectiva em relação ao uso da tecnologia,
                  destacando uma preocupação.
                </p>
                <p className="mb-4 indent-6">
                  A forma como o texto está escrito pode destacar uma parte do fato, causar surpresa, criar senso de urgência ou fazer o leitor se preocupar mais com um lado da história do que com outro. Isso pode revelar o posicionamento do jornal ou do site em que a notícia
                  foi publicada.
                </p>
                <Pagination currentPage={6} />
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          EF69LP03, EF69LP16, EF69LP17, EF06LP01, EF67LP06, EF67LP07. Incentive a leitura atenta da notícia e oriente os alunos
                          a localizar no texto os elementos da estrutura do gênero (título, linha-fina, lide e corpo), além de observar o uso da terceira
                          pessoa e identificar as informações mais importantes. Retome o conteúdo trabalhado nas páginas anteriores e proponha uma conversa inicial: O que foi noticiado? Como os dados estão organizados? Que recursos a autora usou para tornar
                          a notícia informativa e interessante?
                        </p>
                      </>
                    }

                  />
                </div>
                <TrilhaTexto />
                <p className="mb-4 indent-6">
                  Agora que você já explorou as principais características da notícia, chegou o momento
                  de ler um exemplo real. Fique atento à linguagem usada, à estrutura do texto e às escolhas
                  da autora.
                </p>
                <p className="mb-4 indent-6">
                  <strong>Texto I</strong>
                </p>
                <CaixaTexto title='China inaugura primeira loja que une venda, 
                serviço e peças para robôs humanoides'>
                  <p className="mb-4 indent-6">
                    <strong>Robot Mall tem mais de 100 tipos de robôs de mais de
                      40 marcas chinesas, como a Ubtech Robotics e a Unitree Robotics</strong>
                  </p>
                  <p
                    className="mb-2 indent-6"
                    style={{
                      fontSize: '10px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    Por Thâmara Kaoru
                  </p>
                  <p
                    className="mb-2 indent-6"
                    style={{
                      fontSize: '10px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    10/08/2025
                  </p>
                  <p className="mb-4 indent-6">
                    Se você está em busca de um robô humanoide para chamar de seu, a China pode ser o lugar
                    ideal para sua compra. Na última sexta-feira (8), Pequim abriu as portas do Robot Mall, considerado a primeira loja de robôs inteligentes humanoides 4S do mundo.
                  </p>
                </CaixaTexto>

              </>
            }
          />
          {/* Conteúdo do Capítulo 2 */}
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

      {currentPage >= 5 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all"
          title="Voltar ao início do livro"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

export default Book;
