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
import ProducaoFinal from './ProducaoFinal';
import ProducaoTextoNoticia from './ProducaoTextoNoticia';
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
                    <p className="text-[13px] mb-4 indent-6"><strong>Robot Mall</strong>: nome dado ao centro de vendas de robôs na China; <em>shopping</em> de robôs.
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
                  instanceId="producao_texto"
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
                <ProducaoTexto instanceId="producaoTexto1" />
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
                <Pagination currentPage={15} />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          EF69LP06, EF69LP07, EF69LP08, EF67LP09, EF67LP10, EF67LP32, EF67LP33, EF06LP06, EF06LP11, EF06LP12. O objetivo da produção final é consolidar os conhecimentos desenvolvidos ao longo da sequência didática por meio de uma escrita autoral, na qual os alunos devem demonstrar domínio da estrutura, da linguagem e do foco do gênero notícia. A proposta de preparação para a escrita incentiva a busca ativa por informações complementares sobre o evento, favorecendo o protagonismo e a autoria. Adote estratégias de mediação diferenciadas conforme o perfil da turma, como construção coletiva de um texto-modelo na lousa, <em>brainstorming</em> de títulos e enfoques possíveis ou revisão em duplas com apoio do <em>checklist</em> final.
                        </p>
                      </>
                    }
                  />
                </div>
                <ProducaoFinal />
                <p className="mb-4 indent-6">
                  Agora, é hora de mostrar tudo o que você aprendeu! Você vai escrever uma notícia completa com base nos textos III e IV, que foram veiculados como notícias oralizadas em telejornais. Sua tarefa será transformar essas versões em uma notícia escrita, pensada para ser publicada em um jornal impresso ou em um <em>site</em> de notícias.
                </p>
                <p className="mb-4 indent-6"><strong>Preparação</strong></p>
                <ol className="list-decimal marker:text-[#BF3154] ml-6 mb-4">
                  <li>Antes de começar a escrever sua notícia, aprofunde-se mais no tema. Faça uma pesquisa na internet sobre as Olimpíadas de Robôs e descubra as informações principais sobre o evento: Como e quando surgiu? Onde foi realizado? Quem participou? Quais modalidades foram disputadas? </li>
                  <li>Em seguida, pense nas decisões que você vai tomar como autor. Qual será o foco da sua notícia: o impacto do evento, os melhores resultados nas competições, os incentivos financeiros do governo ou outro aspecto? Qual será o tom do seu texto: mais técnico e informativo ou mais leve e descritivo?   </li>
                </ol>
                <p className="mb-4 indent-6"><strong>Produção</strong></p>
                <p className="mb-4 indent-6">Produza um texto completo seguindo a estrutura do gênero <strong>notícia</strong>. Organize suas ideias em parágrafos e pense nas suas escolhas como autor. O que incluir? O que não incluir? Como apresentar o conteúdo ao leitor?
                </p>
                <p className="mb-4 indent-6">Sua notícia deve conter título, linha-fina, lide e corpo. Lembre-se das características próprias do gênero e atente à linguagem, aos tempos verbais e à organização dos parágrafos.
                </p>
                <p className="mb-4 indent-6"><strong>Avaliação</strong></p>
                <p className="mb-4 indent-6">Antes de finalizar a sua versão, confira o <em>checklist</em> a seguir para aprimorá-la.
                </p>
                {/* Tabela de Critérios de Avaliação */}
                <CriteriosAvaliacao
                  instanceId="producao_final"
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
                      pergunta: 'Responde às perguntas essenciais sobre o fato?',
                    },
                    {
                      id: 'criterio_corpo',
                      nome: 'CORPO DA NOTÍCIA',
                      pergunta: 'Desenvolve os detalhes em uma sequência lógica?',
                    },
                    {
                      id: 'criterio_linguagem',
                      nome: 'LINGUAGEM',
                      pergunta: 'O texto está na terceira pessoa, com verbos no passado e sem expressar opinião pessoal?',
                    },
                    {
                      id: 'criterio_foco',
                      nome: 'FOCO INFORMATIVO',
                      pergunta: 'Você escolheu o que queria destacar na notícia e manteve esse foco até o fim?',
                    },
                    {
                      id: 'autoria_criacao',
                      nome: 'AUTORIA E CRIAÇÃO PESSOAL',
                      pergunta: 'Você fez escolhas próprias sobre como escrever a notícia, com base no que leu e no que decidiu destacar?',
                    },
                  ]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                />
                <Pagination currentPage={16} />
                <ProducaoTextoNoticia />
              </>
            }
          />
          <Pagination currentPage={17} />
          {/* Conteúdo do botão do professor */}
          <div className="my-6">
            <TeacherButton
              content={
                <>
                  <p className="mb-3">
                    EF69LP44. Promova uma escuta atenta e engajada, incentivando os alunos a estabelecer relações entre os comportamentos humanos e as situações representadas nas fábulas. O texto de abertura oferece subsídios para que reconheçam, problematizem e discutam valores sociais, culturais e humanos presentes nesse gênero textual. Inicie com uma conversa que recupere experiências anteriores de leitura de fábulas e convide os alunos a compartilhar situações cotidianas que remetam aos provérbios mencionados como “devagar se vai ao longe”. As perguntas sugeridas buscam estimular a troca de pontos de vista e o amadurecimento da escuta argumentativa. Utilize a imagem do lobo em pele de cordeiro como ponto de partida visual para construir hipóteses com a turma sobre aparências, intenções e disfarces.
                  </p>
                </>
              }

            />
          </div>
          {/* Conteúdo do Capítulo 2 */}
          <Chapter
            id="chapter2"
            number={2}
            title="Fábulas"
            content={
              <>
                <p className="mb-4 indent-6">
                  Desde os tempos antigos, as pessoas criam histórias em que animais se comportam como seres humanos, capazes de pensar, falar e tomar decisões. Essas histórias divertem, fazem pensar e ensinam sobre como viver em sociedade.
                </p>
                <p className="mb-4 indent-6">
                  Além de entreter, as fábulas convidam à reflexão sobre a convivência com os outros e sobre valores importantes para todos. Isso acontece por meio de situações simbólicas vividas por personagens como raposas astutas, tartarugas persistentes, lobos em pele de cordeiro ou leões orgulhosos.
                </p>
                <p className="mb-4 indent-6">
                  São histórias curiosas, breves e que quase sempre terminam com uma moral, como “devagar se vai ao longe” ou “mais vale prevenir do que remediar”. Esses dizeres nos ajudam a pensar sobre comportamentos e dilemas comuns do dia a dia.
                </p>
                <p className="mb-4 indent-6">
                  Porém, a moral não precisa ser aceita como verdade absoluta. É possível refletir sobre ela de diferentes maneiras. Dessa forma, as fábulas deixam de ser apenas histórias com lições prontas e passam a ser um convite à crítica, à reflexão e ao diálogo.
                </p>
                {/* Conteúdo de lista */}
                <ul className="list-disc marker:text-[#BF3154] ml-6">
                  <li>Todas as histórias precisam terminar com uma lição explícita?</li>
                  <li>O que torna uma atitude boa ou ruim? Isso depende da intenção?</li>
                  <li>Todos os comportamentos têm consequências? Por quê?</li>
                </ul>
                {/* Imagem */}
                <div className="flex flex-col items-center my-6">
                  <img src="/images/lobo.png" style={{ width: '75%', marginLeft: '314px' }} />
                  <p className="text-[10px] text-slate-600 mt-2" style={{ marginLeft: '375px' }} >Hennadii H/Shutterstock
                  </p>
                </div>
                <Pagination currentPage={18} />
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          EEF69LP44, EF69LP47, EF69LP49, EF69LP54. Esta seção tem como objetivo ampliar a compreensão dos alunos sobre o gênero <strong>fábula</strong>, articulando repertório histórico, dimensão simbólica e leitura crítica. Essa leitura inicial não visa à memorização de conceitos, mas ao desenvolvimento de repertório analítico que será usado na leitura dos textos e na produção autoral. Ao final da seção, retome com os alunos a estrutura da fábula como narrativa curta e intencionalmente construída, preparando-os para identificar esses elementos nos textos da sequência

                        </p>
                      </>
                    }

                  />
                </div>
                <h3>O que é fábula?</h3>
                <p className="mb-4 indent-6">
                  As fábulas são histórias curtas, simbólicas e protagonizadas por animais que agem como humanos. Essas narrativas existem há milhares de anos e surgiram da tradição oral de povos antigos, mas ainda hoje fazem sentido porque abordam valores humanos importantes em qualquer época, como honestidade, esperteza e respeito.
                </p>
                <p className="mb-4 indent-6">
                  Esses textos comunicam ideias sobre o mundo e sobre o comportamento das pessoas de maneira indireta. O autor de uma fábula escolhe personagens, situações e desfechos para representar maneiras humanas de agir, pensar e se relacionar.
                </p>
                <p className="mb-4 indent-6">
                  Mais do que ensinar uma lição, a fábula apresenta uma maneira de interpretar a vida por meio de metáforas. Isso significa que o autor não precisa escrever “acho que vaidade é um defeito” ou “as aparências enganam”. Em vez disso, ele cria uma situação simbólica em que essas ideias aparecem nas ações dos personagens.
                </p>
                <p className="mb-4 indent-6">
                  Em muitas fábulas, a moral é apresentada de maneira direta, ao final do texto, por meio de uma frase curta que resume o ensinamento da história. No entanto, nem todas seguem esse formato. Em algumas versões, o ensinamento está apenas sugerido, aparecendo nas escolhas dos personagens, nas ações que eles realizam e nas consequências que enfrentam. Ou seja, nesses casos, o ensinamento fica subentendido.
                </p>
                <p className="mb-4 indent-6">
                  Ao longo do tempo, uma mesma fábula pode ser contada de diferentes maneiras, com finais alternativos e mensagens transformadas. Em uma versão, um personagem é criticado. Em outra, pode ser valorizado. E isso muda completamente a interpretação da história.
                </p>
                <h4>Uma história curta com construção precisa</h4>
                <p className="mb-4 indent-6">
                  Como são textos curtos, as fábulas exigem uma construção narrativa intencional. O tempo é marcado sem descrições longas, a linguagem é direta e carregada de intenção e os desfechos são rápidos e, muitas vezes, surpreendentes. O autor precisa selecionar com cuidado cada elemento da narrativa para transmitir uma mensagem em poucos parágrafos. Normalmente, as fábulas se organizam em três partes principais.
                </p>
                <ul className="list-disc marker:text-[#BF3154] ml-6">
                  <li><strong>Situação inicial</strong>:  apresenta o cenário e os personagens, sugerindo o comportamento de cada um. </li>
                  <li><strong>Conflito</strong>: contém um desafio, uma escolha ou uma situação crítica que leva os personagens a agir. </li>
                  <li><strong>Desfecho</strong>: mostra a consequência direta das ações dos personagens, geralmente com uma surpresa ou inversão de expectativa. </li>

                </ul>
                <p className="mb-4 indent-6">
                  Os verbos são usados no passado, indicando ações concluídas, e os marcadores temporais, como <strong>certo dia, naquela manhã</strong> e <strong>enquanto isso</strong>, ajudam o leitor a acompanhar o avanço da narrativa com agilidade.
                </p>
                <Pagination currentPage={19} />
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          EF69LP44, EF69LP46, EF69LP47, EF69LP49, EF67LP28, EF06LP05, EF67LP37, EF67LP38. Conduza a leitura e análise da fábula <em>A lebre e a tartaruga</em>, um texto clássico com grande potencial para interpretações que vão além da moral tradicionalmente conhecida. Ao longo da leitura guiada e das propostas interpretativas, incentive os alunos a observar como as escolhas narrativas revelam comportamentos simbólicos e constroem possíveis morais implícitas. Esse é um momento oportuno para trabalhar com rodas de conversa, trocas em duplas e valorização de diferentes pontos de vista durante as leituras e as interpretações. Após a realização das atividades, proponha uma conversa com a turma sobre como os comportamentos da lebre (confiança exagerada, falta de constância e descuido) também aparecem em situações do dia a dia. Peça aos alunos que compartilhem exemplos reais e reflitam, de maneira coletiva, sobre as consequências dessas atitudes e como evitá-las.
                        </p>
                      </>
                    }
                  />
                </div>
                <TrilhaTexto />
                <p className="mb-4 indent-6">
                  Leia uma fábula clássica e observe como a estrutura, a linguagem e os personagens contribuem para transmitir uma mensagem.
                </p>
                <p className="mb-4 indent-6">
                  <strong>Texto I</strong>
                </p>
                <CaixaTexto title='A Lebre e a Tartaruga'>
                  <p className="mb-4 indent-6">
                    A Lebre vivia a rir da Tartaruga por
                    causa de sua lentidão.
                  </p>
                  <p className="mb-4 indent-6">
                    — Como consegues ir a algum lugar arrastando-te assim? — zombava
                    ela, entre risos.
                  </p>
                  <p className="mb-4 indent-6">
                    — Posso não correr, mas sei perseverar. Se quiseres, podemos apostar uma corrida. Veremos quem chega primeiro.
                  </p>
                  <p className="mb-4 indent-6">
                    A Lebre, achando a ideia engraçadíssima, aceitou o desafio só para se divertir. A Raposa, respeitada por sua imparcialidade, foi chamada para ser a juíza. Ela marcou o percurso, alinhou os competidores e deu o sinal de partida.
                  </p>
                  <p className="mb-4 indent-6">
                    Num piscar de olhos, a Lebre disparou pelo caminho e logo ficou fora de vista. Já a Tartaruga seguiu em seu ritmo, passo a passo, sem desanimar. Convencida de que venceria com facilidade, a Lebre decidiu descansar um pouco à sombra de uma árvore.
                  </p>
                  <p className="mb-4 indent-6">
                    — Tenho tempo de sobra — pensou — a Tartaruga mal deve ter saído
                    do lugar.
                  </p>
                  <p className="mb-4 indent-6">
                    Mas, enquanto dormia tranquila, a Tartaruga, firme e constante, passou por ela e seguiu em frente, determinada a chegar ao fim.
                  </p>
                  <p className="mb-4 indent-6">
                    Quando despertou, a Lebre levou um susto ao ver a Tartaruga quase cruzando a linha de chegada. Correu com todas as forças, mas já era tarde demais. A lenta Tartaruga venceu a corrida,
                    para surpresa de todos.
                  </p>

                  {/* Imagem */}
                  <div className="flex flex-col items-center my-6">
                    <img src="/images/lebreTartaruga.png" className="max-w-[50%]" />
                    <p className="text-[10px] text-slate-600 mt-2">WINTER, Milo. A lebre e a tartaruga. <em>In: AESOP. The Aesop for children. [S.l.]</em>: Project Gutenberg, 2006. Disponível em: <a href="http://www.gutenberg.org/etext/19994" target="_blank" rel="noopener noreferrer">http://www.gutenberg.org/etext/19994</a>. Acesso em: 24 set. 2025.
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
                  ESOPO. <em>A lebre e a tartaruga</em>. Domínio público. Texto adaptado para fins didáticos. (Tradução nossa).
                </p>
                <Pagination currentPage={20} />
                {/* Conteúdo do botão do professor - Tabela comparativa */}
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          Respostas:
                        </p>
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q1');
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
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q2');
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
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q3');
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
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q4');
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
                  question={chapterQuestions.chapter2[0]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={chapterQuestions.chapter2[1]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={chapterQuestions.chapter2[2]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={chapterQuestions.chapter2[3]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <Pagination currentPage={21} />
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          EF69LP44, EF69LP46, EF69LP47, EF69LP49, EF69LP54, EF67LP27, EF67LP28, EF06LP05, EF67LP37, EF67LP38. Neste segundo momento da sequência didática, o objetivo é ampliar a compreensão do gênero fábula por meio da leitura de um novo texto, agora em versos. A fábula O leão e o rato mantém as características do gênero, como personagens simbólicos, estrutura narrativa concisa e mensagem final,mas adota uma linguagem poética e rítmica que convida os alunos a observar com mais atenção as intenções do autor. Ao conduzir a leitura, oriente os alunos a interpretar as ações e os comportamentos dos personagens com base nos valores humanos que representam, como gratidão, humildade e reconhecimento. As atividades propostas favorecem a análise da estrutura do gênero, o uso do tempo verbal no passado, a identificação de marcadores temporais e a construção da moral – agora explícita. Faça comparações com a fábula anterior para que os alunos reconheçam o que se mantém e o que muda entre os textos.
                        </p>
                      </>
                    }
                  />
                </div>
                <TrilhaTexto />
                <p className="mb-4 indent-6">
                  Agora, leia uma fábula que está organizada em versos. Apesar dessa diferença no modo de contar a história, os elementos principais do gênero continuam presentes.
                </p>
                <p className="mb-4 indent-6">
                  <strong>Texto II</strong>
                </p>
                <CaixaTexto title='O leão e o rato' backgroundColor="white" columns={2}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                      <p className="mb-4 indent-6">
                        Saiu o rato correndo, <br />
                        assustado e distraído, <br />
                        e foi logo recebido <br />
                        por um leão, sem entender. <br />
                      </p>
                      <p className="mb-4 indent-6">
                        Entre as garras tremeu, <br />
                        mas foi surpreendido então. <br />
                        O leão o protegeu <br />
                        e poupou-lhe a punição. <br />
                      </p>
                      <p className="mb-4 indent-6">
                        Dias passaram ligeiros, <br />
                        e o leão, rei altaneiro, <br />
                        por entre folhas entrou, <br />
                        mas a selva o enganou. <br />
                        Preso em rede traiçoeira, <br />
                        gritou com força certeira, <br />
                        mas sua luta foi em vão. <br />
                        Ficou preso, o valentão. <br />
                      </p>
                    </div>
                    <div>
                      <p className="mb-4 indent-6">
                        O ratinho, sem demora, <br />
                        chega e começa a agir. <br />
                        Rói as cordas, uma hora, <br />
                        e outra, sem desistir. <br />
                        Fino dente, ação constante, <br />
                        vai abrindo a prisão; <br />
                        com esforço perseverante, <br />
                        liberta, enfim, o leão. <br />
                      </p>
                      <p className="mb-4 indent-6">
                        Pagou o bem que recebera, <br />
                        com coragem e humildade, <br />
                        e ensinou que a vida inteira <br />
                        vale a boa gratidão. <br />
                        Ser gentil não custa nada, <br />
                        e a lição dessa jornada, <br />
                        é que até o mais singelo <br />
                        pode ser forte e belo. <br />
                      </p>
                    </div>
                  </div>
                  {/* Imagem */}
                  <div className="flex flex-col items-center my-6">
                    <img src="/images/leao.png" className="max-w-[60%]" />
                    <p className="text-[10px] text-slate-600 mt-2">tada/stock.adobe.com
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
                  LA FONTAINE. O leão e o rato. Domínio público. Texto adaptado para fins didáticos. (Tradução nossa).
                </p>
                <Pagination currentPage={22} />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          Respostas:
                        </p>
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q5');
                          if (question && question.type === 'text-input') {
                            // Se tiver subquestões, renderiza cada uma
                            if (question.subQuestions && question.subQuestions.length > 0) {
                              return question.subQuestions.map((subQ) => {
                                // Se tiver subItems, renderiza com bullets
                                if (subQ.subItems && subQ.subItems.length > 0) {
                                  return (
                                    <div key={subQ.letter} className="mb-4">
                                      <p className="mb-2">
                                        {question.number !== undefined && (
                                          <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
                                        )}
                                        <span style={{ color: '#00776E', fontWeight: 'bold' }}>{subQ.letter}) </span>
                                        <span style={{ color: 'black' }}>{subQ.question}</span>
                                      </p>
                                      <ul className="question-subitems" style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                                        {subQ.subItems.map((subItem, index) => (
                                          <li key={index} className="mb-2">
                                            <p className="mb-1">
                                              <span style={{ color: 'black' }}>{subItem.label}: </span>
                                              <span dangerouslySetInnerHTML={{ __html: subItem.correctAnswer || '' }} />
                                            </p>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  );
                                }
                                // Se não tiver subItems, renderiza normalmente
                                return (
                                  <p key={subQ.letter} className="mb-3">
                                    {question.number !== undefined && (
                                      <span style={{ color: '#00776E', fontWeight: 'bold' }}>{question.number}. </span>
                                    )}
                                    <span style={{ color: '#00776E', fontWeight: 'bold' }}>{subQ.letter}) </span>
                                    <span dangerouslySetInnerHTML={{ __html: subQ.correctAnswer || '' }} />
                                  </p>
                                );
                              });
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
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q6');
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
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q7');
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
                  question={chapterQuestions.chapter2[4]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={chapterQuestions.chapter2[5]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={chapterQuestions.chapter2[6]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <Pagination currentPage={23} />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          Respostas:
                        </p>
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q8');
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
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q9');
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
                        <p className="mb-4 indent-6">
                          Esta atividade tem como objetivo consolidar o conhecimento sobre o gênero <strong>fábula</strong> e avançar na autonomia autoral dos alunos. Ao propor a mudança de forma (de prosa para verso ou de verso para prosa) e a modificação de pelo menos um dos elementos estruturais do enredo (situação inicial, conflito ou desfecho), a atividade convida os alunos a refletir criticamente sobre as escolhas narrativas e a relação entre estrutura e mensagem. O foco não está apenas em recontar, mas em recriar com intenção, construindo uma nova moral baseada nos personagens e em novos caminhos de ação.
                        </p>
                        <p className="mb-4 indent-6">
                          Minha versão: É importante orientar os alunos a manter os elementos essenciais do gênero, como personagens simbólicos e sequência narrativa, mesmo ao optar por mudanças criativas. A etapa de preparação pode ser realizada individualmente ou em dupla. Atue como mediador, oferecendo exemplos, esclarecendo dúvidas sobre o uso de versos ou a organização de parágrafos e estimulando discussões sobre diferentes valores possíveis. A atividade proporciona um espaço de autoria seguro, permitindo que alunos com diferentes níveis de proficiência se envolvam no processo criativo.

                        </p>
                      </>
                    }
                  />
                </div>
                {/* Questão intercalada no conteúdo - Tabela comparativa */}
                <QuestionRenderer
                  question={chapterQuestions.chapter2[7]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <QuestionRenderer
                  question={chapterQuestions.chapter2[8]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <MinhaVersao />
                <p className="mb-4 indent-6">Você já leu e analisou duas fábulas clássicas: A lebre e a tartaruga e O leão e o rato. Agora, sua tarefa será fazer uma reescrita criativa de uma dessas histórias, mas você terá dois desafios.</p>
                <ol className="list-decimal marker:text-[#BF3154] ml-6 mb-4">
                  <li><strong>Mude a forma do texto</strong>: se a fábula escolhida era em prosa, será reescrita em versos; se era em versos, será reescrita em prosa.
                  </li>
                  <li><strong>Modifique algum elemento da narrativa</strong> (a situação inicial, o conflito ou o desfecho): com o objetivo de alterar a moral da história.
                  </li>
                </ol>
                <p className="mb-4 indent-6">Sua produção deve manter os personagens da fábula, mas apresentar uma nova versão do enredo que leve o leitor a refletir sobre uma lição diferente daquela da história original.
                </p>
                <Pagination currentPage={24} />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          Respostas:
                        </p>
                        <p className="mb-4 indent-6">
                          Pessoal.
                        </p>
                      </>
                    }
                  />
                </div>
                <p className="mb-4 indent-6"><strong>Preparação</strong></p>
                <p className="mb-4 indent-6">Antes de escrever, siga os passos abaixo para planejar sua nova versão da fábula.</p>
                <ol className="list-decimal marker:text-[#BF3154] ml-6 mb-4">
                  <li><strong>Mude a forma do texto</strong>: se a fábula escolhida era em prosa, será reescrita em versos; se era em versos, será reescrita em prosa.
                  </li>
                  <li><strong>Modifique algum elemento da narrativa</strong> (a situação inicial, o conflito ou o desfecho): com o objetivo de alterar a moral da história.
                  </li>
                </ol>
                <QuestionRenderer
                  question={chapterQuestions.chapter2[9]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <Pagination currentPage={25} />
                <p className="mb-4 indent-6"><strong>Produção</strong></p>
                <p className="mb-4 indent-6">Agora é hora de escrever sua fábula. Durante a produção, preste atenção aos seguintes pontos:
                </p>
                <ol className="list-decimal marker:text-[#BF3154] ml-6 mb-4">
                  <li>Mesmo com as mudanças, sua história deve manter os três elementos principais da estrutura da fábula: situação inicial, conflito e desfecho. </li>
                  <li>Use os mesmos personagens da história original, mas mude o que acontece com eles para construir uma nova lição de moral. </li>
                  <li>Se estiver escrevendo em versos, lembre-se das rimas, do ritmo e da sonoridade do texto. </li>
                  <li>Se estiver escrevendo em prosa, organize o texto em parágrafos bem estruturados. </li>
                  <li>Use uma linguagem objetiva, expressiva e coerente com o gênero. </li>
                  <li>Seja criativo: pense em valores importantes para você, para sua turma ou para o mundo atual. Como sua fábula pode provocar uma nova reflexão? </li>

                </ol>

                <p className="mb-4 indent-6"><strong>Avaliação</strong></p>
                <p className="mb-4 indent-6">AAntes de finalizar a sua versão da fábula, confira o <em>checklist</em> a seguir para aprimorá-la.
                </p>
                {/* Tabela de Critérios de Avaliação */}
                <CriteriosAvaliacao
                  instanceId="minha_versao_fabulas"
                  criterios={[
                    {
                      id: 'criterio_titulo',
                      nome: 'Forma do texto',
                      pergunta: 'Você transformou sua fábula de prosa para verso ou de verso para prosa?',
                    },
                    {
                      id: 'criterio_linha_fina',
                      nome: 'Estrutura completa',
                      pergunta: 'Sua fábula tem situação inicial, conflito e desfecho bem definidos?',
                    },
                    {
                      id: 'criterio_lide',
                      nome: 'Mudança no enredo',
                      pergunta: 'Você alterou pelo menos um dos elementos do enredo de maneira coerente com a nova moral?',
                    },
                    {
                      id: 'criterio_corpo',
                      nome: 'Nova moral ',
                      pergunta: 'Sua fábula tem uma moral diferente da moral original?',
                    },
                    {
                      id: 'criterio_linguagem',
                      nome: 'Coerência e coesão',
                      pergunta: 'O texto apresenta uma sequência lógica de acontecimentos?',
                    },
                    {
                      id: 'criterio_foco',
                      nome: 'Expressividade',
                      pergunta: 'As ações e os comportamentos dos personagens representam atitudes humanas e ajudam a transmitir a nova mensagem da fábula?',
                    },
                    {
                      id: 'autoria_criacao',
                      nome: 'Autoria e criatividade',
                      pergunta: 'Você fez escolhas inéditas e criativas, usando sua própria forma de contar a história?',
                    },
                  ]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                />
                <Pagination currentPage={26} />
                <ProducaoTexto instanceId="producaoTexto2" />
                <Pagination currentPage={27} />
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          EF69LP44, EF69LP46, EF69LP47, EF69LP49, EF67LP28, EF67LP37, EF67LP38. Nesta etapa, o objetivo é consolidar a compreensão da estrutura do gênero <strong>fábula</strong> e aprofundar a percepção dos alunos sobre as diferentes formas de construção da moral. A fábula <em>A raposa e o corvo</em> retoma os elementos principais trabalhados ao longo do capítulo, mas introduz um enunciado de moral explicitamente separado do corpo do texto. Esse recurso permite aos alunos que comparem essa estratégia com as anteriores e reflitam sobre seus efeitos. As atividades propostas favorecem múltiplos níveis de leitura: da compreensão literal à análise crítica dos comportamentos simbólicos dos personagens. Incentive a análise da figura da raposa como manipuladora e do corvo como símbolo da vaidade, relacionando esses papéis a situações contemporâneas e a possíveis excessos de confiança ao julgar a opinião dos outros. Essa etapa conclui a sequência interpretativa e prepara os alunos para a produção autoral, que será orientada pela escolha de uma moral e pela construção de uma narrativa original com estrutura e intenção definidas.
                        </p>
                      </>
                    }
                  />
                </div>
                <TrilhaTexto />
                <p className="mb-4 indent-6">
                  Leia mais uma fábula. Agora, há moral explícita ao final do texto.
                </p>
                <p className="mb-4 indent-6">
                  <strong>Texto III</strong>
                </p>
                <CaixaTexto title='A raposa e o corvo'>
                  <p className="mb-4 indent-6">
                    Em certa manhã ensolarada, um corvo pousou num alto galho com um belo pedaço de queijo no bico. Estava satisfeito com seu achado e já se preparava para apreciar seu lanche, quando apareceu uma raposa astuta caminhando logo abaixo.
                  </p>
                  <p className="mb-4 indent-6">
                    Ao ver o corvo com o queijo, a raposa parou e pensou consigo: “Não é justo deixá-lo com essa iguaria! Preciso encontrar maneira de fazê-lo largar o queijo, mas sem assustá-lo.” Então, com os olhos brilhando de esperteza, parou sob a árvore, ergueu o focinho em direção ao galho e exclamou:
                  </p>
                  <p className="mb-4 indent-6">
                    — Que criatura esplêndida és tu! Nunca vi penas tão brilhantes!
                    Que elegância, que porte majestoso! Aposto que tens uma voz encantadora, digna de um verdadeiro rei das aves. Se cantasses agora, certeza teríamos de coroar-te soberano do céu!
                  </p>
                  <p className="mb-4 indent-6">
                    Lisonjeado, o corvo sentiu-se honrado com tantos elogios. Envaidecido, pensou: “Ora, por que não mostrar à senhorita minha
                    bela voz?” E, sem pensar nas consequências, abriu o bico para cantar.
                  </p>
                  <p className="mb-4 indent-6">
                    — Cróóó!
                  </p>
                  <p className="mb-4 indent-6">
                    No mesmo instante, o queijo caiu direto no chão. A raposa, sem
                    perder tempo, agarrou-o com os dentes e se afastou tranquilamente. Antes de sumir entre os arbustos, ainda se virou e disse:
                  </p>
                  <p className="mb-4 indent-6">
                    — Cante o quanto quiser, meu caro. De beleza e voz você pode
                    até entender. Mas de inteligência… Ah, ainda lhe falta muito!
                  </p>
                  <p className="mb-4 indent-6">
                    <strong>Moral da história</strong>: Cuidado com os que elogiam demais.
                  </p>


                  {/* Imagem */}
                  <div className="flex flex-col items-center my-6">
                    <img src="/images/raposa.png" className="max-w-[50%]" />
                    <p className="text-[10px] text-slate-600 mt-2">Saenkova Iuliia/stock.adobe.com
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
                  ESOPO. <em>A raposa e o corvo</em>. Domínio público. Texto adaptado para fins didáticos. (Tradução nossa).
                </p>
                <Pagination currentPage={28} />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          Respostas:
                        </p>
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q11');
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
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q12');
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
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q13');
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
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q14');
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
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q15');
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
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter2[10]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter2[11]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter2[12]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter2[13]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter2[14]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <Pagination currentPage={29} />
                {/* Conteúdo do botão do professor */}
                <div className="my-6">
                  <TeacherButton
                    content={
                      <>
                        <p className="mb-3">
                          Respostas:
                        </p>
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q16');
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
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q17');
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
                        {(() => {
                          const question = chapterQuestions.chapter2.find(q => q.id === 'ch2_q18');
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
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter2[15]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter2[16]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                {/* Questão intercalada no conteúdo */}
                <QuestionRenderer
                  question={chapterQuestions.chapter2[17]}
                  userAnswers={userAnswers}
                  onAnswerChange={handleAnswerChange}
                  showResults={showTeacherView}
                />
                <Pagination currentPage={30} />
                <ProducaoFinal />
                <p className="mb-4 indent-6">
                  Chegou o momento de criar sua própria fábula. Desenvolva uma narrativa original, curta e intencional. Os personagens devem ser animais que representem comportamentos humanos, e o enredo deve conduzir o leitor a refletir sobre um ensinamento, apresentado de maneira direta ou indireta.
                </p>
                <p className="mb-4 indent-6">
                  <strong>Preparação</strong>
                </p>
                <p className="mb-4 indent-6">
                  Siga os passos a seguir para organizar o seu texto.
                </p>
                <ol className="list-decimal marker:text-[#BF3154] ml-6 mb-4">
                  <li><strong>Escolha a moral da sua fábula</strong>
                  </li>
                  <p className="mb-4 indent-6">
                    A moral é a mensagem que a sua história vai transmitir. Por isso, ela precisa ser escolhida logo no início do planejamento. Você pode criar a sua própria moral ou escolher uma das
                    sugestões listadas a seguir.
                  </p>
                  <ul className="list-disc marker:text-[#BF3154] ml-6 mb-4">
                    <li>“Nem todo elogio é sincero.”</li>
                    <li>“A pressa é inimiga da perfeição.”</li>
                    <li>“Gentileza gera gentileza.”</li>
                    <li>“Quem pouco ouve, muito erra.”</li>
                    <li>“Só se colhe o que se planta.”</li>
                    <li>“Às vezes, o menor gesto faz a maior diferença.”</li>
                  </ul>
                  <li><strong>Defina os personagens simbólicos</strong></li>
                  <p className="mb-4 indent-6">
                    Toda fábula tem personagens que simbolizam ideias, atitudes e sentimentos humanos. Esses personagens geralmente são animais, mas também podem ser objetos ou outros seres com papel secundário na história. Portanto, reflita: Qual animal vai representar cada comportamento humano na sua fábula?
                  </p>
                  <li><strong>Planeje o enredo da sua fábula</strong></li>
                  <p className="mb-4 indent-6">
                    Use o quadro abaixo para organizar o que vai acontecer no início, no meio e no fim da sua fábula. Lembre-se de que a moral precisa estar conectada ao que acontece na história. Ela pode ser escrita de maneira direta no final do texto ou apenas sugerida pelas atitudes dos personagens.
                  </p>
                  {/* Questão intercalada no conteúdo */}
                  <QuestionRenderer
                    question={chapterQuestions.chapter2[18]}
                    userAnswers={userAnswers}
                    onAnswerChange={handleAnswerChange}
                    showResults={showTeacherView}
                  />
                </ol>

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
