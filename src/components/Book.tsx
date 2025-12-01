import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import TableOfContents from './TableOfContents';
import Chapter from './Chapter';
import DataTable from './DataTable';
import TeacherButton from './TeacherButton';
import { chapterQuestions } from '../data/questions';
import { UserAnswers } from '../types/questions';
import { loadAnswers, saveAnswers } from '../utils/storage';
import Pagination from './Pagination';
import TrilhaTexto from './TrilhaTexto';
import CaixaTexto from './CaixaTexto';
import QuestionRenderer from './QuestionRenderer';
import ContinuaProximaPagina from './ContinuaProximaPagina';

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
                <p className="text-[10px] text-slate-600 mt-2">KAORU, Thâmara. <em>China inaugura primeira loja que une venda, serviço e peças para robôs humanoides.</em> Disponível em: <a href="https://epocanegocios.globo.com/tecnologia/noticia/2025/08/china-inaugura-primeira-loja-que-une-venda-servico-e-pecas-para-robos-humanoides.ghtml" target="_blank" rel="noopener noreferrer">https://epocanegocios.globo.com/tecnologia/noticia/2025/08/china-inaugura-primeira-loja-que-une-venda-servico-e-pecas-para-robos-humanoides.ghtml</a>
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
                                {question.number}. {subQ.letter}):{' '}
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
                                  {question.number}. {stmt.letter}):{' '}
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
                                {question.number}. {correctLetter}):{' '}
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
                                {question.number}. {subQ.letter}):{' '}
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
