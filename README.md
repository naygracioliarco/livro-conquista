# Livro Digital - Produção de Textos

Aplicação web interativa para ensino de produção textual, desenvolvida com React e TypeScript. O projeto apresenta um livro digital com capítulos sobre notícias e fábulas, incluindo questões interativas e visão do professor.

## 🚀 Tecnologias

- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **jsPDF** - Geração de PDFs
- **html2canvas** - Captura de elementos para PDF

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
│   └── ...
├── constants/          # Constantes e configurações
│   └── colors.ts       # Cores e estilos centralizados
├── data/               # Dados das questões
│   └── questions.ts
├── hooks/              # Hooks customizados
│   ├── useUserAnswers.ts
│   └── usePagination.ts
├── types/              # Definições TypeScript
│   └── questions.ts
└── utils/              # Funções utilitárias
    ├── questionHelpers.tsx
    ├── pdf.ts
    └── storage.ts
```

## ✨ Funcionalidades

### Para Alunos
- Leitura interativa de capítulos
- Questões de múltipla escolha, verdadeiro/falso, texto livre e tabelas
- Salvamento automático de respostas no localStorage
- Download de questões em PDF

### Para Professores
- Visão do professor com respostas corretas
- Botão "Para o Professor" com orientações pedagógicas
- Download de gabarito em PDF

## 🎯 Componentes Principais

- **Book.tsx** - Componente principal que renderiza todo o livro
- **QuestionRenderer** - Renderiza diferentes tipos de questões
- **TeacherAnswers** - Exibe respostas corretas para professores
- **Chapter** - Componente para capítulos do livro

## 🔧 Hooks Customizados

### `useUserAnswers()`
Gerencia o estado e persistência das respostas do usuário.

```tsx
const { userAnswers, handleAnswerChange } = useUserAnswers();
```

### `usePagination()`
Gerencia a paginação baseada em scroll.

```tsx
const { currentPage, scrollToTop } = usePagination();
```

## 📝 Tipos de Questões

O projeto suporta 5 tipos de questões:

1. **Multiple Choice** - Escolha única (a, b, c)
2. **True/False** - Verdadeiro ou Falso (com statements opcionais)
3. **Alternative** - Escolha única com múltiplas opções
4. **Text Input** - Resposta em texto livre (com subquestões opcionais)
5. **Table Fill** - Preenchimento de tabelas

## 🎨 Personalização

As cores e estilos estão centralizados em `src/constants/colors.ts`:

```typescript
import { COLORS, FONTS } from '../constants/colors';
```

## 📚 Otimizações Realizadas

O código foi otimizado para eliminar repetições e melhorar a manutenibilidade:

- ✅ Componentes helper reutilizáveis
- ✅ Hooks customizados para lógica compartilhada
- ✅ Constantes centralizadas
- ✅ Redução de ~500+ linhas de código repetido

Veja mais detalhes em [OPTIMIZATIONS.md](./OPTIMIZATIONS.md)

## 📄 Licença

Este projeto é de uso educacional.
