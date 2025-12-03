# Livro Digital - Produção de Textos

Aplicação web interativa para ensino de produção textual, desenvolvida com React e TypeScript. O projeto apresenta um livro digital com capítulos sobre notícias e fábulas, incluindo questões interativas, visão do professor e recursos responsivos para mobile e desktop.

## 🚀 Tecnologias

- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização responsiva
- **jsPDF** - Geração de PDFs
- **html2canvas** - Captura de elementos para PDF
- **localStorage** - Persistência de dados e posição de scroll

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Verificar tipos TypeScript
npm run typecheck
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── shared/         # Componentes base reutilizáveis
│   │   ├── CorrectAnswerDisplay.tsx
│   │   └── QuestionWrapper.tsx
│   ├── Book.tsx        # Componente principal do livro
│   ├── Chapter.tsx     # Componente de capítulo
│   ├── Header.tsx       # Cabeçalho do livro
│   ├── Footer.tsx       # Rodapé do livro
│   ├── Pagination.tsx   # Componente de paginação
│   ├── TeacherButton.tsx # Botão para visão do professor
│   ├── QuestionRenderer.tsx # Renderizador de questões
│   ├── QuestionTableFill.tsx # Tabelas de preenchimento
│   ├── CriteriosAvaliacao.tsx # Tabela de critérios
│   └── ...
├── constants/          # Constantes e configurações
│   └── colors.ts       # Cores e estilos centralizados
├── data/               # Dados das questões
│   └── questions.ts
├── hooks/              # Hooks customizados
│   ├── useUserAnswers.ts # Gerenciamento de respostas
│   ├── usePagination.ts # Gerenciamento de paginação
│   └── useScrollPosition.ts # Persistência de scroll
├── types/              # Definições TypeScript
│   └── questions.ts
└── utils/              # Funções utilitárias
    ├── questionHelpers.tsx
    ├── pdf.ts
    └── storage.ts
```

## ✨ Funcionalidades

### Para Alunos
- 📖 Leitura interativa de capítulos sobre notícias e fábulas
- ✍️ Questões interativas: múltipla escolha, verdadeiro/falso, texto livre e tabelas
- 💾 Salvamento automático de respostas no localStorage
- 📄 Download de questões em PDF
- 📱 Interface totalmente responsiva para mobile e desktop
- 🔄 Persistência de posição de scroll (volta exatamente onde parou)

### Para Professores
- 👨‍🏫 Visão do professor com respostas corretas
- 📋 Botão "Para o Professor" com orientações pedagógicas
- 📥 Download de gabarito em PDF
- ✅ Exibição de respostas corretas nas questões

## 🎯 Componentes Principais

- **Book.tsx** - Componente principal que renderiza todo o livro
- **Chapter.tsx** - Componente para capítulos do livro
- **Header.tsx** - Cabeçalho com título e informações do livro
- **Footer.tsx** - Rodapé com logo e informações da editora
- **Pagination.tsx** - Componente de paginação visual
- **QuestionRenderer.tsx** - Renderiza diferentes tipos de questões
- **QuestionTableFill.tsx** - Tabelas interativas de preenchimento
- **CriteriosAvaliacao.tsx** - Tabela de critérios de avaliação
- **TeacherButton.tsx** - Botão modal com orientações para professores
- **TeacherAnswers.tsx** - Exibe respostas corretas para professores

## 🔧 Hooks Customizados

### `useUserAnswers()`
Gerencia o estado e persistência das respostas do usuário no localStorage.

```tsx
const { userAnswers, handleAnswerChange } = useUserAnswers();
```

**Funcionalidades:**
- Salva automaticamente as respostas no localStorage
- Persiste entre sessões do navegador
- Permite edição e atualização de respostas

### `usePagination()`
Gerencia a paginação baseada em scroll, detectando automaticamente a página atual visível.

```tsx
const { currentPage, scrollToTop } = usePagination();
```

**Funcionalidades:**
- Detecta a página atual baseada na posição de scroll
- Atualiza automaticamente conforme o usuário navega
- Função `scrollToTop` para voltar ao início

### `useScrollPosition()`
Persiste e restaura a posição de scroll do usuário.

```tsx
useScrollPosition();
```

**Funcionalidades:**
- Salva a posição de scroll automaticamente
- Restaura a posição ao recarregar a página
- Funciona mesmo após fechar e reabrir o navegador
- Salva ao sair da página ou ocultar a aba

## 📝 Tipos de Questões

O projeto suporta 5 tipos de questões interativas:

1. **Multiple Choice** - Escolha única (a, b, c, d)
   - Radio buttons com feedback visual
   - Suporte a múltiplas alternativas

2. **True/False** - Verdadeiro ou Falso
   - Com statements opcionais para contexto
   - Interface simples e intuitiva

3. **Alternative** - Escolha única com múltiplas opções
   - Similar a múltipla escolha com layout customizado
   - Suporte a imagens e textos longos

4. **Text Input** - Resposta em texto livre
   - Textarea para respostas longas
   - Suporte a subquestões opcionais
   - Placeholder e validação

5. **Table Fill** - Preenchimento de tabelas
   - Tabelas interativas com múltiplas colunas
   - Textareas em cada célula editável
   - Totalmente responsivo para mobile

## 🎨 Personalização

As cores e estilos estão centralizados em `src/constants/colors.ts`:

```typescript
import { COLORS, FONTS } from '../constants/colors';
```

### Cores Principais
- **Primária**: `#0E3B5D` (Azul escuro)
- **Secundária**: `#BF3154` (Vermelho/Magenta)
- **Destaque**: `#00776E` (Verde água)
- **Fundo**: `#EEE6D4` (Bege claro)

### Fontes
- **Títulos**: HWT Artz (custom font)
- **Corpo**: Ubuntu (Google Fonts)

## 📱 Responsividade

O projeto foi desenvolvido com foco em responsividade:

- ✅ Layout adaptativo para mobile, tablet e desktop
- ✅ Tabelas responsivas com scroll horizontal quando necessário
- ✅ Imagens que se ajustam ao tamanho da tela
- ✅ Textos com tamanhos adaptativos
- ✅ Navegação otimizada para touch devices
- ✅ Breakpoints: Mobile (< 768px), Tablet (768px - 1024px), Desktop (> 1024px)

## 📚 Otimizações Realizadas

O código foi otimizado para eliminar repetições e melhorar a manutenibilidade:

- ✅ Componentes helper reutilizáveis
- ✅ Hooks customizados para lógica compartilhada
- ✅ Constantes centralizadas
- ✅ Redução de ~500+ linhas de código repetido
- ✅ Persistência de estado e scroll
- ✅ Performance otimizada com debounce e memoização

Veja mais detalhes em [OPTIMIZATIONS.md](./OPTIMIZATIONS.md)

## 🔄 Funcionalidades de Persistência

### Salvamento Automático
- **Respostas**: Salvas automaticamente no localStorage
- **Posição de Scroll**: Restaurada ao recarregar a página
- **Estado da Sessão**: Mantido entre navegações

### Como Funciona
1. O usuário responde questões → salvo automaticamente
2. O usuário navega pela página → posição salva periodicamente
3. Ao recarregar → respostas e posição são restauradas

## 🛠️ Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Verificação de tipos TypeScript
npm run typecheck

# Lint do código
npm run lint
```

### Estrutura de Dados

As questões são definidas em `src/data/questions.ts` seguindo a estrutura:

```typescript
{
  id: string;
  type: 'multiple-choice' | 'true-false' | 'alternative' | 'text-input' | 'table-fill';
  number?: number;
  question: string;
  // ... campos específicos por tipo
}
```

## 📄 Licença

Este projeto é de uso educacional e faz parte de material didático da Companhia Brasileira de Educação e Sistemas de Ensino S.A.
