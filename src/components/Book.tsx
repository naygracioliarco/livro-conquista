import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import TableOfContents from './TableOfContents';
import Chapter from './Chapter';
import DataTable from './DataTable';
import TeacherButton from './TeacherButton';
import Header from './Header';
import { chapterQuestions } from '../data/questions';
import { UserAnswers } from '../types/questions';
import { loadAnswers, saveAnswers } from '../utils/storage';
import Pagination from './Pagination';
import TrilhaTexto from './TrilhaTexto';
import MinhaVersao from './MinhaVersao';
import ProducaoTexto from './ProducaoTexto';
import CaixaTexto from './CaixaTexto';
import QuestionRenderer from './QuestionRenderer';
import ContinuaProximaPagina from './ContinuaProximaPagina';
import CriteriosAvaliacao from './CriteriosAvaliacao';

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
        <Header />

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
                  <p className="text-[10px] text-slate-600 mt-2">SachiDesigns, Mykola Syvak/stock.adobe.com
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
                    Se você está em busca de um <span className="bg-[#fff225] px-1">robô humanoide</span> para chamar de seu, a China pode ser o lugar
                    ideal para sua compra. Na última sexta-feira (8), Pequim abriu as portas do <span className="bg-[#fff225] px-1">Robot Mall</span>, considerado a primeira loja de robôs inteligentes humanoides 4S do mundo.
                  </p>
                  <p className="mb-4 indent-6">
                    O modelo “4S” significa que eles oferecem vendas, peças de reposição, manutenção e pesquisas —
                    ou seja, coleta e análise de feedback dos clientes, como se fosse uma concessionária de automóveis.
                  </p>
                  <p className="mb-4 indent-6">
                    Segundo Wang Yifan, diretor do Robot Mall, a instalação de quatro andares é a primeira loja
                    desse tipo na China, embora outras cidades também estejam construindo modelos como esse,
                    informou a  agência de notícias AP. O Robot Mall tem mais de 100 tipos de robôs de mais de
                    40 marcas chinesas, como a Ubtech Robotics e a Unitree Robotics, de acordo com a <span className="bg-[#fff225] px-1">Reuters</span>.
                  </p>
                  <p className="mb-4 indent-6">
                    “Se os robôs vão entrar em milhares de lares, depender apenas
                    de empresas de robótica não é suficiente”, disse Wang, enfatizando a necessidade de soluções personalizadas para os consumidores. Ele afirma que os preços dos robôs variam de 2.000 yuans
                    (cerca de R$ 1.510) a vários milhões de yuans.
                  </p>
                  <p className="mb-4 indent-6">
                    Entre os itens mais curiosos à venda estão cães robóticos e robôs que jogam xadrez. A loja também exibe peças de destaque,
                    como um robô humanoide em tamanho real de Albert Einstein
                    e um robô humanoide representando o imperador Qin Shi Huang.
                  </p>
                  {/* Imagem */}
                  <div className="flex flex-col items-center my-6">
                    <img src="/images/roboHumanoide.png" className="max-w-[50%]" />
                    <p className="text-[10px] text-slate-600 mt-2">ADEK BERRY/AFP
                    </p>
                    <div className="border-l-[2px] border-[#00B99D] pl-2 mb-1">
                      <p className="text-[10px]">Robô humanoide parecido com
                        Albert Einstein no Robot Mall.
                      </p>
                    </div>
                  </div>
                  <p className="mb-4 indent-6">
                    Também há robôs para preparar café e distribuir medicamentos. Clientes também poderão ser atendidos por garçons robóticos e provar pratos preparados por chefs robôs.
                  </p>
                  <p className="mb-4 indent-6">
                    O espaço conta ainda com uma área de entretenimento, onde
                    visitantes podem assistir a esportes praticados por robôs, como futebol.
                  </p>
                  <p className="mb-4 indent-6">
                    Segundo AP, o objetivo da loja é ajudar empresas de robótica a comercializar o que até agora
                    tem sido, em grande parte, um esforço focado em pesquisa.
                  </p>
                  {/* Glossário */}
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-[13px] mb-4 indent-6"><strong>robô humanoide</strong>: robô que tem forma
                      ou movimentos parecidos com os de
                      uma pessoa.
                    </p>
                    <p className="text-[13px] mb-4 indent-6"><strong>Robot Mall</strong>: nome dado ao centro de
                      vendas de robôs na China; <em>shopping</em>
                      de robôs.
                    </p>
                    <p className="text-[13px] mb-4 indent-6"><strong>Reuters</strong>: agência que produz notícias
                      para jornais e TVs do mundo todo.
                    </p>
                  </div>
                </CaixaTexto>
                <p
                  className="mt-2 mb-6"
                  style={{
                    fontFamily: 'Ubuntu, sans-serif',
                    color: '#000000',
                    fontSize: '10px',
                  }}
                >
                  KAORU, Thâmara. <em>China inaugura primeira loja que une venda, serviço e peças para robôs humanoides.</em> Disponível em: <a href="https://epocanegocios.globo.com/tecnologia/noticia/2025/08/china-inaugura-primeira-loja-que-une-venda-servico-e-pecas-para-robos-humanoides.ghtml" target="_blank" rel="noopener noreferrer">https://epocanegocios.globo.com/tecnologia/noticia/2025/08/china-inaugura-primeira-loja-que-une-venda-servico-e-pecas-para-robos-humanoides.ghtml</a>. Acesso em: 23 set. 2025.
                </p>
                <Pagination currentPage={7} />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          Respostas:
                        </p>
                        {(() => {
                          const question = chapterQuestions.chapter1.find(q => q.id === 'ch1_q1');
                          if (question && question.type === 'text-input' && question.subQuestions) {
                            return question.subQuestions.map((subQ) => (
                              <p key={subQ.letter} className="mb-3">
                                {question.number !== undefined && (
                                  <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
                                )}
                                <span style={{ color: '#00776E', fontWeight: 'bold' }}>{subQ.letter}) </span>
                                <span dangerouslySetInnerHTML={{ __html: subQ.correctAnswer || '' }} />
                              </p>
                            ));
                          }
                          return null;
                        })()}
                        {(() => {
                          const question = chapterQuestions.chapter1.find(q => q.id === 'ch1_q2');
                          if (question && question.type === 'true-false' && question.statements) {
                            return question.statements.map((stmt) => {
                              // Se tiver correção, mostra V/F primeiro e depois a correção. Se não, mostra apenas V ou F
                              const correctAnswerText = stmt.correctAnswer ? 'Verdadeiro (V)' : 'Falso (F)';
                              const answerText = stmt.correction
                                ? `${correctAnswerText}. ${stmt.correction}`
                                : correctAnswerText;

                              return (
                                <p key={stmt.letter} className="mb-3">
                                  {question.number !== undefined && (
                                    <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
                                  )}
                                  <span style={{ color: '#00776E', fontWeight: 'bold' }}>{stmt.letter}) </span>
                                  <span dangerouslySetInnerHTML={{ __html: answerText }} />
                                </p>
                              );
                            });
                          }
                          return null;
                        })()}
                        {(() => {
                          const question = chapterQuestions.chapter1.find(q => q.id === 'ch1_q3');
                          if (question && question.type === 'alternative' && question.options) {
                            const correctOption = question.options[question.correctAnswer];
                            const correctLetter = String.fromCharCode(97 + question.correctAnswer); // a, b, c, d...
                            return (
                              <p className="mb-3">
                                {question.number !== undefined && (
                                  <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
                                )}
                                <span style={{ color: '#00776E', fontWeight: 'bold' }}>{correctLetter}) </span>
                                <span dangerouslySetInnerHTML={{ __html: correctOption || '' }} />
                              </p>
                            );
                          }
                          return null;
                        })()}
                      </>
                    }

                  />
                </div>
                <p className="mb-4 indent-6">
                  Depois da leitura, analise como a notícia está organizada e quais foram as escolhas da
                  autora ao apresentar as informações.
                </p>
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter1[0]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter1[1]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter1[2]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <Pagination currentPage={8} />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          Respostas:
                        </p>
                        {(() => {
                          const question = chapterQuestions.chapter1.find(q => q.id === 'ch1_q4');
                          if (question && question.type === 'text-input' && question.subQuestions) {
                            return question.subQuestions.map((subQ) => (
                              <p key={subQ.letter} className="mb-3">
                                {question.number !== undefined && (
                                  <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
                                )}
                                <span style={{ color: '#00776E', fontWeight: 'bold' }}>{subQ.letter}) </span>
                                <span dangerouslySetInnerHTML={{ __html: subQ.correctAnswer || '' }} />
                              </p>
                            ));
                          }
                          return null;
                        })()}
                        <p>Na trilha do texto: EF69LP03, EF69LP16, EF69LP17, EF06LP01, EF67LP03, EF67LP06, EF67LP37. Estimule uma leitura comparativa desde
                          o início do trabalho com o Texto II, mesmo que as atividades de contraste direto apareçam mais adiante no capítulo.
                          A sequência de atividades propostas após a leitura do segundo texto conduz os alunos à observação da estrutura, das
                          escolhas de vocabulário e do ponto de vista da autora, culminando em uma comparação mais sistematizada entre os dois textos. O quadro comparativo contribui para tornar visível a variação na
                          organização dos parágrafos, nos temas priorizados e nos efeitos de sentido
                          produzidos por cada texto. Na atividade final, os alunos devem relacionar
                          essas diferenças aos perfis editoriais dos portais, o que promove a formação
                          de leitores mais críticos e conscientes da influência dos meios de comunicação na construção de notícias.
                        </p>
                      </>

                    }
                  />
                </div>
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter1[3]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <TrilhaTexto />
                <p className="mb-4 indent-6">
                  Agora, leia outra notícia que trata da inauguração do Robot Mall. Que aspectos do mesmo fato são destacados? O que muda no vocabulário? E na estrutura?
                </p>
                <p className="mb-4 indent-6">
                  <strong>Texto II</strong>
                </p>
                <CaixaTexto title='China inaugura o primeiro “shopping de robôs” do mundo'>
                  <p className="mb-4 indent-6">
                    <strong>País asiático se coloca como fabricante líder e busca normalizar a interação entre
                      humanos e humanoides na vida diária</strong>
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
                    Por Bruna Barone, editado por Bruno Capozzi
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
                    11/08/2025
                  </p>
                  <p className="mb-4 indent-6">
                    Um prédio de quatro andares no bairro E-Town, em Pequim, na China, é a sede do primeiro  “shopping de robôs” do mundo. A loja foi inspirada no modelo 4S usado em concessionárias de
                    veículos, com peças de reposição e diversos serviços oferecidos por duzentas marcas, incluindo as chinesas Unitree Robotics e UBTech Robotics, segundo a Reuters.
                  </p>
                  <p className="mb-4 indent-6">
                    A ideia do “Robot Mall” é aproximar o público geral do mundo da robótica. Pequenos robôs podem ser encontrados por 2.000 yuans (R$ 1,5 mil pela cotação atual), por exemplo. Há também cães robóticos, robôs jogadores de xadrez e máquinas dançantes à disposição.
                  </p>
                  <p className="mb-4 indent-6">
                    Um dos grandes destaques é o  humanoide  do cientista  Albert Einstein  em tamanho real, vendido por 670.000 yuans (R$ 507 mil). Outras figuras históricas incluem o imperador Qin Shi
                    Huang, o físico Isaac Newton e o renomado poeta chinês Li Bai.
                  </p>
                  <ContinuaProximaPagina />
                </CaixaTexto>
                <Pagination currentPage={9} />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          Respostas:
                        </p>
                        {(() => {
                          const question = chapterQuestions.chapter1.find(q => q.id === 'ch1_q5');
                          if (question && question.type === 'true-false' && question.statements) {
                            return question.statements.map((stmt) => {
                              // Se tiver correção, mostra V/F primeiro e depois a correção. Se não, mostra apenas V ou F
                              const correctAnswerText = stmt.correctAnswer ? 'Verdadeiro (V)' : 'Falso (F)';
                              const answerText = stmt.correction
                                ? `${correctAnswerText}. ${stmt.correction}`
                                : correctAnswerText;

                              return (
                                <p key={stmt.letter} className="mb-3">
                                  {question.number !== undefined && (
                                    <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
                                  )}
                                  <span style={{ color: '#00776E', fontWeight: 'bold' }}>{stmt.letter}) </span>
                                  <span dangerouslySetInnerHTML={{ __html: answerText }} />
                                </p>
                              );
                            });
                          }
                          return null;
                        })()}
                        {(() => {
                          const question = chapterQuestions.chapter1.find(q => q.id === 'ch1_q6');
                          if (question && question.type === 'text-input' && question.subQuestions) {
                            return question.subQuestions.map((subQ) => (
                              <p key={subQ.letter} className="mb-3">
                                {question.number !== undefined && (
                                  <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
                                )}
                                <span style={{ color: '#00776E', fontWeight: 'bold' }}>{subQ.letter}) </span>
                                <span dangerouslySetInnerHTML={{ __html: subQ.correctAnswer || '' }} />
                              </p>
                            ));
                          }
                          return null;
                        })()}
                      </>
                    }

                  />
                </div>
                <CaixaTexto title=''>
                  <p className="mb-4 indent-6"><strong>Robôs para a vida</strong></p>
                  <p className="mb-4 indent-6">
                    As marcas também vão levar opções de robôs que ajudam no dia a dia (ou simplesmente fazem companhia), como aqueles que cozinham, fazem café, distribuem medicamentos, pintam e jogam basquete, por exemplo.
                  </p>
                  <p className="mb-4 indent-6">
                    No “Robot Mall”, os visitantes podem acessar uma área de entretenimento para assistir esportes robóticos, incluindo futebol e eventos de atletismo. Vale lembrar que a China foi o primeiro país do mundo a criar torneios esportivos para robôs, como a World Robot Soccer League, relatada pelo Olhar Digital.
                  </p>
                  <p className="mb-4 indent-6">
                    O formato da nova loja cria uma experiência de “playground de tecnologia”, bem longe do showroom tradicional: aqui, o público é encorajado a interagir com os produtos. No restaurante do shopping, aliás, garçons robôs servem pratos preparados por… chefs robóticos.
                  </p>
                  <p className="mb-4 indent-6"><strong>O poder da China</strong></p>
                  <p className="mb-4 indent-6">
                    Com esse projeto, a China tira o foco de novidades futuristas e busca normalizar a interação entre humanos e robôs na vida diária [...]. É uma estratégia que posiciona o país não só como fabricante líder, mas também na integração com estilos de vida.
                  </p>
                  <p className="mb-4 indent-6">
                    E isso vem com apoio financeiro. No ano passado, o governo chinês liberou mais de US$ 20 bilhões (R$ 108 bilhões) em subsídios para ajudar startups de inteligência artificial e robótica – e planeja ampliar o fundo para US$ 137 bilhões (R$ 744 bilhões).
                  </p>
                  <p className="mb-4 indent-6">
                    O shopping foi inaugurado na mesma semana em que é realizada a Conferência Mundial de Robôs de 2025, precedendo também os primeiros Jogos Mundiais de Robôs Humanoides, marcados para o período entre 14 e 17 de agosto.
                  </p>
                </CaixaTexto>
                <p
                  className="mt-2 mb-6"
                  style={{
                    fontFamily: 'Ubuntu, sans-serif',
                    color: '#000000',
                    fontSize: '10px',
                  }}
                >
                  BARONE, Bruna. <em>China inaugura o primeiro "shopping de robôs" do mundo.</em> Disponível em: <a href="https://epocanegocios.globo.com/tecnologia/noticia/2025/08/china-inaugura-primeira-loja-que-une-venda-servico-e-pecas-para-robos-humanoides.ghtml" target="_blank" rel="noopener noreferrer">https://epocanegocios.globo.com/tecnologia/noticia/2025/08/china-inaugura-primeira-loja-que-une-venda-servico-e-pecas-para-robos-humanoides.ghtml</a>. Acesso em: 23 set. 2025.
                </p>
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter1[4]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter1[5]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <Pagination currentPage={10} />
                {/* Conteúdo do botão do professor - Tabela comparativa */}
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          Respostas:
                        </p>
                        {(() => {
                          const question = chapterQuestions.chapter1.find(q => q.id === 'ch1_q7');
                          if (question && question.type === 'table-fill') {
                            return (
                              <>
                                {/* Respostas da tabela */}
                                {question.correctAnswer && (
                                  <>
                                    <p className="mb-2 font-semibold">
                                      {question.number !== undefined && (
                                        <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
                                      )}
                                      Tabela:
                                    </p>
                                    {question.rows.map((row) => {
                                      const correctAnswers = question.correctAnswer!;
                                      // Obtém o primeiro campo da row (primeira coluna)
                                      const firstColumnKey = Object.keys(row).find(key => key !== 'id') || 'paragraph';
                                      const firstColumnValue = row[firstColumnKey] || '';
                                      
                                      // Gera os fieldIds para cada coluna (exceto a primeira)
                                      const columnAnswers = question.columns.slice(1).map((columnName, colIndex) => {
                                        const fieldId = `${question.id}_${row.id}_col${colIndex + 1}`;
                                        return {
                                          columnName,
                                          answer: correctAnswers[fieldId] || ''
                                        };
                                      });

                                      return (
                                        <div key={row.id} className="mb-4">
                                          <p className="mb-2 font-semibold" style={{ color: '#0E3B5D' }}>
                                            {question.columns[0]} {firstColumnValue}:
                                          </p>
                                          {columnAnswers.map((colAnswer, idx) => (
                                            <p key={idx} className="mb-1">
                                              <strong>{colAnswer.columnName}:</strong> {colAnswer.answer}
                                            </p>
                                          ))}
                                        </div>
                                      );
                                    })}
                                  </>
                                )}
                                {/* Respostas das subquestões */}
                                {question.subQuestions && question.subQuestions.length > 0 && (
                                  <>
                                    <p className="mb-2 mt-4 font-semibold">Subquestões:</p>
                                    {question.subQuestions.map((subQ) => (
                                      <p key={subQ.letter} className="mb-3">
                                        <span style={{ color: '#00776E', fontWeight: 'bold' }}>{subQ.letter}) </span>
                                        <span dangerouslySetInnerHTML={{ __html: subQ.correctAnswer || '' }} />
                                      </p>
                                    ))}
                                  </>
                                )}
                              </>
                            );
                          }
                          return null;
                        })()}
                        {(() => {
                          const question = chapterQuestions.chapter1.find(q => q.id === 'ch1_q8');
                          if (question && question.type === 'text-input') {
                            // Se tiver subquestões, renderiza cada uma
                            if (question.subQuestions && question.subQuestions.length > 0) {
                              return question.subQuestions.map((subQ) => (
                                <p key={subQ.letter} className="mb-3">
                                  {question.number !== undefined && (
                                    <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
                                  )}
                                  <span style={{ color: '#00776E', fontWeight: 'bold' }}>{subQ.letter}) </span>
                                  <span dangerouslySetInnerHTML={{ __html: subQ.correctAnswer || '' }} />
                                </p>
                              ));
                            }
                            // Se não tiver subquestões, renderiza a resposta direta
                            if (question.correctAnswer) {
                              return (
                                <p className="mb-3">
                                  {question.number !== undefined && (
                                    <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
                                  )}
                                  <span dangerouslySetInnerHTML={{ __html: question.correctAnswer }} />
                                </p>
                              );
                            }
                          }
                          return null;
                        })()}
                      </>
                    }
                  />
                </div>
                {/* Questão intercalada no conteúdo - Tabela comparativa */}
                <QuestionRenderer
                  question={chapterQuestions.chapter1[6]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter1[7]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <Pagination currentPage={11} />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          EF69LP06, EF69LP07, EF69LP08, EF67LP09, EF67LP10, EF67LP32, EF67LP33, EF06LP05, EF06LP06, EF06LP11, EF06LP12,
                          EF67LP36. Antes da produção, retome com a turma os elementos essenciais da estrutura da notícia: título, linha-fina, lide,
                          corpo e fechamento. Enfatize que o foco da atividade não é apenas repetir informações, mas selecionar, organizar e redigir
                          uma notícia com um ponto de vista consciente e intencional, respeitando as características do gênero. A proposta favorece a construção da autonomia escritora e o desenvolvimento da habilidade de tomar decisões comunicativas, competências centrais para a formação de leitores e produtores conscientes de textos.

                        </p>
                      </>
                    }
                  />
                </div>
                <MinhaVersao />
                <p className="mb-4 indent-6">
                  Você leu duas notícias diferentes sobre a inauguração do Robot Mall, na China. Agora, sua tarefa será produzir uma nova versão dessa notícia, com base nas escolhas que considerar mais importantes, interessantes ou relevantes para o leitor. Para isso, utilize os dados principais dos dois textos, as observações registradas no quadro comparativo e as análises realizadas ao longo do capítulo.
                </p>
                <p className="mb-4 indent-6"><strong>Preparação</strong></p>
                <p className="mb-4 indent-6">Sua notícia deve conter os elementos listados a seguir.
                </p>
                <ul className="list-disc marker:text-[#BF3154] ml-6">
                  <li><strong>Título </strong>: chamativo e informativo, que antecipe o assunto e indique o enfoque escolhido
                    para o texto.  </li>
                  <li><strong>Linha-fina </strong>: complementar ao título, com um dado ou uma ideia que aprofunde o tema.  </li>
                  <li><strong>Lide </strong>: com as informações essenciais (o que, quem, quando, onde, como e por quê).  </li>
                  <li><strong>Corpo da notícia </strong>: detalhado, com informações adicionais, exemplos, citações (caso
                    deseje utilizá-las), contexto e possíveis desdobramentos.  </li>
                  <li><strong>Fechamento </strong>: conclusivo, com uma informação final que dê sentido de encerramento.  </li>
                </ul>
                <p className="mb-4 indent-6"><strong>Produção</strong></p>
                <p className="mb-4 indent-6">Durante a produção, refita sobre o tipo de informação que você vai destacar e que
                  elementos e dados das duas notícias você considera essenciais e precisa manter em
                  sua produção.
                </p>
                <p className="mb-4 indent-6"><strong>Avaliação</strong></p>
                <p className="mb-4 indent-6">Antes de finalizar a sua versão, confira o <em>checklist</em> a seguir para aprimorá-la.
                </p>
                {/* Tabela de Critérios de Avaliação */}
                <CriteriosAvaliacao
                  criterios={[
                    {
                      id: 'criterio_titulo',
                      nome: 'TÍTULO',
                      pergunta: 'Apresenta o assunto principal de forma atrativa?',
                    },
                    {
                      id: 'criterio_linha_fina',
                      nome: 'LINHA-FINA',
                      pergunta: 'Complementa o título com uma informação importante ou que aprofunda o assunto?',
                    },
                    {
                      id: 'criterio_lide',
                      nome: 'LIDE',
                      pergunta: 'Apresenta as informações essenciais (o quê, quem, quando, onde) de forma clara?',
                    },
                    {
                      id: 'criterio_corpo',
                      nome: 'CORPO DA NOTÍCIA',
                      pergunta: 'Desenvolve o assunto de forma organizada e completa?',
                    },
                    {
                      id: 'criterio_linguagem',
                      nome: 'LINGUAGEM',
                      pergunta: 'Utiliza linguagem objetiva e adequada ao gênero notícia?',
                    },
                    {
                      id: 'criterio_foco',
                      nome: 'FOCO',
                      pergunta: 'Mantém o foco no fato noticiado sem expressar opinião?',
                    },
                  ]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                />
                <Pagination currentPage={12} />
                <ProducaoTexto />
                <Pagination currentPage={13} />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          EF69LP16, EF69LP17, EF69LP19, EF06LP01, EF67LP03. Nesta seção, os alunos ampliam sua compreensão sobre o gênero notícia ao explorar como ele é adaptado para veículos audiovisuais, como a televisão. O objetivo é reconhecer as mudanças que ocorrem no texto quando ele é planejado para ser falado e assistido, e não apenas lido.
                        </p>
                        <p className="mb-3">
                          EF69LP16, EF69LP17, EF69LP19, EF06LP01, EF67LP03. Apresente a adaptação da notícia para o telejornal, destacando
                          elementos como entonação, uso de linguagem mais simples, comentários expressivos e sequenciamento mais natural. Oriente os alunos a ler o texto em voz alta para que percebam as marcas de oralidade e a maneira como os temas
                          discutidos anteriormente são apresentados nesse formato. As atividades propostas permitem identificar informações principais (como em uma notícia convencional); reconhecer marcas da linguagem oral e recursos do suporte audiovisual; comparar a estrutura da notícia falada com a da notícia escrita; e refletir sobre os efeitos de sentido criados por
                          cada forma de apresentação.
                        </p>
                      </>
                    }
                  />
                </div>
                <h4>Quando a notícia vai para a TV</h4>
                <p className="mb-4 indent-6">A notícia é um texto que informa um fato, com estrutura organizada e linguagem objetiva. Essa estrutura geralmente segue o modelo de pirâmide invertida: primeiro aparecem as informações mais importantes e, depois, os detalhes no corpo da notícia.
                </p>
                <p className="mb-4 indent-6">Mas, quando a notícia é adaptada para outras mídias, como a televisão, o rádio ou os <em>podcasts</em>, alguns elementos mudam.
                </p>
                <ul className="list-disc marker:text-[#BF3154] ml-6">
                  <li>O título e o lide são falados por quem apresenta a notícia.  </li>
                  <li>O tom oral e o ritmo das frases marcam a narração, com pausas naturais e repetições.  </li>
                  <li>O corpo da notícia e seu desfecho são frequentemente desenvolvidos de forma multimodal, incorporando recursos linguísticos expressivos, como emoção, jogos de palavras e comentários de efeito, característicos desse tipo de cobertura, e elementos visuais e audiovisuais, como imagens, vídeos do ocorrido ou do local dos fatos, gráficos, infográficos, ilustrações, entre outros.
                  </li>

                </ul>
                <TrilhaTexto />
                <p className="mb-4 indent-6">
                  Leia, a seguir, a transcrição de duas notícias exibidas em telejornais. Atente à escolha das palavras e às diferenças desse formato em relação às notícias lidas anteriormente.
                </p>
                <p className="mb-4 indent-6"><strong>Texto III</strong></p>
                <CaixaTexto title=''>
                  <p className="mb-4 indent-6">
                  Em Pequim, robôs humanoides disputam um campeonato nada convencional. Futebol, boxe, atletismo… Em vez de atletas de carne e osso, quem brigou foram as máquinas com cara e corpo de gente. Pequim sediou a Olimpíada dos Robôs Humanoides. Na cerimônia de abertura, breakdance, artes marciais e música ao vivo. Mas, na hora da competição, a coisa era séria. Na partida de futebol, teve goleada e comemoração exagerada, com direito a queda dramática que precisou de socorro humano para sair de campo. O evento testa inteligência artificial, coordenação motora e resistência das máquinas, que ainda tropeçam, mas já dão um show. Engenheiros aproveitaram cada segundo para anotar as categorias e preparar os robôs para a próxima edição do campeonato.
                  </p>
                </CaixaTexto>
                <p
                  className="mt-2 mb-6"
                  style={{
                    fontFamily: 'Ubuntu, sans-serif',
                    color: '#000000',
                    fontSize: '10px',
                  }}
                >
                  OLIMPÍADAS de robôs humanoides na China. Publicado pelo canal Band Jornalismo. 1 vídeo (1 min 05 s). Disponível em:  <a href="https://www.youtube.com/shorts/UHpLpQPrkrw" target="_blank" rel="noopener noreferrer">https://www.youtube.com/shorts/UHpLpQPrkrw</a>. Acesso em: 24 set. 2025.
                </p>
                <p className="mb-4 indent-6"><strong>Texto IV</strong></p>
                <CaixaTexto title=''>
                  <p className="mb-4 indent-6">
                  Vou trazer uma notícia agora que envolve tecnologia. Foi realizada a primeira edição dos Jogos Mundiais dos Robôs. Pois é, o evento durou 4 dias e atraiu mais de 280 equipes de 16 países diferentes. Os robôs, que têm forma de humanos, como a gente está vendo, correram, alguns jogaram futebol e outros participaram de competições com obstáculos. Olha só os jogadores aí. Todos eles ali disputando a bola. Realmente chama muita atenção. Esse evento foi realizado na China. E tem um detalhe, foi a primeira edição, mas já tem data marcada para a segunda edição, que será em 2026.
                  </p>
                </CaixaTexto>
                <p
                  className="mt-2 mb-6"
                  style={{
                    fontFamily: 'Ubuntu, sans-serif',
                    color: '#000000',
                    fontSize: '10px',
                  }}
                >
                  EM ‘OLIMPÍADAS de robôs’, máquinas apostam corrida e jogam futebol. Publicado pelo canal SBT News. Disponível em:  <a href="https://www.youtube.com/watch?v=FJgXK06RHUY" target="_blank" rel="noopener noreferrer">https://www.youtube.com/watch?v=FJgXK06RHUY</a>. Acesso em: 18 ago. 2025.
                </p>
                <Pagination currentPage={14} />
                {/* Conteúdo do botão do professor - Tabela comparativa */}
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          Respostas:
                        </p>
                        {(() => {
                          const question = chapterQuestions.chapter1.find(q => q.id === 'ch1_q9');
                          if (question && question.type === 'text-input' && question.subQuestions) {
                            return question.subQuestions.map((subQ) => (
                              <p key={subQ.letter} className="mb-3">
                                {question.number !== undefined && (
                                  <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
                                )}
                                <span style={{ color: '#00776E', fontWeight: 'bold' }}>{subQ.letter}) </span>
                                <span dangerouslySetInnerHTML={{ __html: subQ.correctAnswer || '' }} />
                              </p>
                            ));
                          }
                          return null;
                        })()}
                        {(() => {
                          const question = chapterQuestions.chapter1.find(q => q.id === 'ch1_q10');
                          if (question && question.type === 'text-input' && question.subQuestions) {
                            return question.subQuestions.map((subQ) => (
                              <p key={subQ.letter} className="mb-3">
                                {question.number !== undefined && (
                                  <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
                                )}
                                <span style={{ color: '#00776E', fontWeight: 'bold' }}>{subQ.letter}) </span>
                                <span dangerouslySetInnerHTML={{ __html: subQ.correctAnswer || '' }} />
                              </p>
                            ));
                          }
                          return null;
                        })()}
                        {(() => {
                          const question = chapterQuestions.chapter1.find(q => q.id === 'ch1_q11');
                          if (question && question.type === 'table-fill') {
                            return (
                              <>
                                {/* Respostas da tabela */}
                                {question.correctAnswer && (
                                  <>
                                    <p className="mb-2 font-semibold">
                                      {question.number !== undefined && (
                                        <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
                                      )}
                                      Tabela:
                                    </p>
                                    {question.rows.map((row) => {
                                      const correctAnswers = question.correctAnswer!;
                                      // Obtém o primeiro campo da row (primeira coluna)
                                      const firstColumnKey = Object.keys(row).find(key => key !== 'id') || 'paragraph';
                                      const firstColumnValue = row[firstColumnKey] || '';
                                      
                                      // Gera os fieldIds para cada coluna (exceto a primeira)
                                      const columnAnswers = question.columns.slice(1).map((columnName, colIndex) => {
                                        const fieldId = `${question.id}_${row.id}_col${colIndex + 1}`;
                                        return {
                                          columnName,
                                          answer: correctAnswers[fieldId] || ''
                                        };
                                      });

                                      return (
                                        <div key={row.id} className="mb-4">
                                          <p className="mb-2 font-semibold" style={{ color: '#0E3B5D' }}>
                                            {question.columns[0]} {firstColumnValue}:
                                          </p>
                                          {columnAnswers.map((colAnswer, idx) => (
                                            <p key={idx} className="mb-1">
                                              <strong>{colAnswer.columnName}:</strong> {colAnswer.answer}
                                            </p>
                                          ))}
                                        </div>
                                      );
                                    })}
                                  </>
                                )}
                                
                              </>
                            );
                          }
                          return null;
                        })()}
                        
                      </>
                    }
                  />
                </div>
                {/* Questão intercalada no conteúdo - Tabela comparativa */}
                <QuestionRenderer
                  question={chapterQuestions.chapter1[8]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={chapterQuestions.chapter1[9]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={chapterQuestions.chapter1[10]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />

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
          />
        </div>

        <footer className="bg-slate-100 py-6 px-8 border-t border-slate-200">
          <p className="text-sm text-slate-600 text-center">
            © 2025 - Todos os direitos reservados
          </p>
        </footer>
      </div>

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
