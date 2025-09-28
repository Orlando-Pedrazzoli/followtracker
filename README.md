# 🔍 FollowerScan - Análise Avançada de Seguidores do Instagram

<div align="center">
  
  ![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
  ![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
  
  **Uma aplicação Next.js moderna e segura para análise detalhada de seguidores do Instagram**
  
  [Demo](https://followerscan.vercel.app) • [Documentação](#-documentação) • [Instalação](#-instalação)
  
</div>

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Stack Tecnológica](#-stack-tecnológica)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Uso Detalhado](#-uso-detalhado)
- [API e Tipos](#-api-e-tipos)
- [Contribuindo](#-contribuindo)

## 🎯 Visão Geral

FollowerScan é uma aplicação web avançada que permite aos usuários analisar seus dados do Instagram de forma completamente privada e local. Com processamento 100% client-side, detecção inteligente de bloqueios, análise de relacionamentos e insights personalizados.

### Diferenciais

- 🔐 **100% Privado**: Processamento local, sem envio de dados para servidores
- 🚀 **Detector de Bloqueios**: Algoritmo avançado com 60-90% de precisão
- 📊 **Análise Completa**: 12+ tipos de arquivos JSON processados
- 💾 **Histórico Inteligente**: Comparação entre análises e detecção de mudanças
- 🎨 **UI/UX Moderna**: Interface inspirada no Instagram com animações fluidas

## 🚀 Funcionalidades Principais

### 📤 Sistema de Upload Inteligente

- **Upload de ZIP**: Processamento automático de arquivos ZIP do Instagram
- **Múltiplos JSONs**: Suporte para 12+ tipos de arquivos diferentes
- **Detecção Automática**: Reconhecimento inteligente de tipos de arquivo
- **Validação em Tempo Real**: Feedback instantâneo sobre arquivos processados

### 📊 Análise Avançada

- **Categorias de Relacionamento**:
  - 🚫 Não te seguem de volta (principal)
  - ⚠️ Possíveis bloqueios (detector avançado)
  - ✅ Seguidores mútuos
  - 👻 Unfollows recentes (ghosts)
  - ⭐ VIPs (mútuos + close friends)
  - 🚨 Red flags (close friends que não te seguem)
  - 💔 Crushes (você segue mas não te seguem)
  - 👀 Stalkers (solicitações pendentes)

### 🔍 Detector de Bloqueios

Algoritmo proprietário que analisa:

- Histórico de unfollows
- Comparação temporal
- Padrões de comportamento
- Análise de solicitações pendentes

### 💾 Sistema de Histórico

- **Salvamento Automático**: Até 10 análises no localStorage
- **Comparação Temporal**: Detecta mudanças entre análises
- **Timeline de Eventos**: Visualização cronológica de mudanças

### 📱 Interface Responsiva

- **Mobile First**: Otimizado para dispositivos móveis
- **Animações Fluidas**: Framer Motion para transições suaves
- **Tema Instagram**: Gradientes e cores inspiradas no Instagram
- **Dark Mode Ready**: Preparado para tema escuro

## 🛠️ Stack Tecnológica

### Core

```json
{
  "next": "14.0.4",
  "react": "^18",
  "typescript": "^5"
}
```

### UI/UX

| Biblioteca         | Versão  | Uso                             |
| ------------------ | ------- | ------------------------------- |
| **Tailwind CSS**   | 3.3.0   | Sistema de design utility-first |
| **Framer Motion**  | 10.18.0 | Animações e transições          |
| **Radix UI**       | Latest  | Componentes acessíveis          |
| **Lucide React**   | 0.294.0 | Ícones modernos                 |
| **React Dropzone** | 14.2.3  | Upload drag-and-drop            |

### Processamento de Dados

| Biblioteca          | Versão | Uso                      |
| ------------------- | ------ | ------------------------ |
| **JSZip**           | 3.10.1 | Extração de arquivos ZIP |
| **Recharts**        | 2.15.4 | Gráficos e visualizações |
| **jsPDF**           | 2.5.1  | Exportação para PDF      |
| **React Hot Toast** | 2.4.1  | Notificações elegantes   |

### Desenvolvimento

| Ferramenta       | Versão | Uso                 |
| ---------------- | ------ | ------------------- |
| **ESLint**       | ^8     | Linting de código   |
| **PostCSS**      | ^8     | Processamento CSS   |
| **Autoprefixer** | 10.0.1 | Compatibilidade CSS |

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Git

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/followerscan.git
cd followerscan

# 2. Instale as dependências
npm install
# ou
yarn install

# 3. Execute em desenvolvimento
npm run dev
# ou
yarn dev

# 4. Build para produção
npm run build
npm run start
```

### Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
# Não são necessárias variáveis de ambiente
# Todo processamento é feito no cliente
```

## ⚙️ Configuração

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações otimizadas para produção
};
```

### tailwind.config.js

```javascript
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Cores customizadas
      // Animações personalizadas
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 📁 Estrutura do Projeto

```
followerscan/
├── 📁 src/
│   ├── 📁 app/                    # App Router do Next.js 14
│   │   ├── 📄 page.tsx            # Página inicial
│   │   ├── 📄 layout.tsx          # Layout principal
│   │   ├── 📄 globals.css         # Estilos globais + Tailwind
│   │   ├── 📁 tutorial/           # Tutorial interativo
│   │   │   └── 📄 page.tsx        # Guia passo a passo
│   │   ├── 📁 upload/             # Upload de arquivos
│   │   │   └── 📄 page.tsx        # Interface de upload
│   │   └── 📁 analyze/            # Análise de dados
│   │       └── 📄 page.tsx        # Dashboard de análise
│   │
│   ├── 📁 components/
│   │   └── 📁 ui/                 # Componentes reutilizáveis
│   │       ├── 📄 button.tsx      # Botões estilizados
│   │       ├── 📄 card.tsx        # Cards e containers
│   │       ├── 📄 tabs.tsx        # Sistema de abas
│   │       ├── 📄 badge.tsx       # Badges e labels
│   │       ├── 📄 progress.tsx    # Barras de progresso
│   │       ├── 📄 header.tsx      # Header global
│   │       └── 📄 footer.tsx      # Footer global
│   │
│   ├── 📁 lib/
│   │   ├── 📄 instagram-parser.ts # Parser e analisador
│   │   └── 📄 utils.ts           # Funções utilitárias
│   │
│   └── 📁 types/
│       └── 📄 instagram.ts        # TypeScript interfaces
│
├── 📁 public/                     # Assets públicos
│   └── *.svg                      # Ícones e imagens
│
└── 📄 package.json               # Dependências
```

## 📖 Uso Detalhado

### 1. Tutorial Interativo

```typescript
// Página com guia passo a passo animado
// Mock de interface do Instagram
// Instruções detalhadas para cada etapa
```

### 2. Sistema de Upload

```typescript
// Suporte para drag-and-drop
// Processamento de ZIP automático
// Validação em tempo real
// Feedback visual de progresso
```

### 3. Análise de Dados

```typescript
interface CompleteAnalysis {
  basicData: InstagramDataComplete;
  stats: Statistics;
  relationships: Relationships;
  socialHealth: SocialHealthScore;
  insights: Insights;
  metadata: Metadata;
}
```

## 🔧 API e Tipos

### Principais Classes

#### InstagramDataParser

```typescript
class InstagramDataParser {
  static parseFile(fileName: string, content: string): ParseResult;
  static parseMultipleFiles(files: FileData[]): InstagramDataComplete;
  private static detectFileType(fileName: string, content: any): FileType;
  private static extractUsers(jsonData: any): InstagramUser[];
}
```

#### InstagramAnalyzer

```typescript
class InstagramAnalyzer {
  static analyze(data: InstagramDataComplete): CompleteAnalysis;
  static compareAnalyses(prev: Analysis, curr: Analysis): Comparison;
  private static detectPossibleBlocks(data: UserData): InstagramUser[];
}
```

#### HistoryManager

```typescript
class HistoryManager {
  static saveAnalysis(analysis: CompleteAnalysis): string;
  static getHistory(): HistoricalAnalysis[];
  static compareWithPrevious(current: CompleteAnalysis): Comparison;
}
```

### Tipos de Arquivos Suportados

| Arquivo                         | Tipo            | Descrição              |
| ------------------------------- | --------------- | ---------------------- |
| `followers_1.json`              | Seguidores      | Lista de seguidores    |
| `following.json`                | Seguindo        | Pessoas que você segue |
| `close_friends.json`            | Amigos Próximos | Lista de close friends |
| `blocked_profiles.json`         | Bloqueados      | Perfis bloqueados      |
| `recently_unfollowed.json`      | Unfollows       | Unfollows recentes     |
| `follow_requests_received.json` | Solicitações    | Pedidos recebidos      |
| `pending_follow_requests.json`  | Pendentes       | Solicitações pendentes |
| `hide_story_from.json`          | Stories Ocultos | Stories privados       |
| `following_hashtags.json`       | Hashtags        | Hashtags seguidas      |
| `restricted_profiles.json`      | Restritos       | Perfis restritos       |
| `removed_suggestions.json`      | Sugestões       | Sugestões removidas    |

## 🎨 Customização

### Temas e Cores

```css
/* globals.css */
.gradient-bg {
  background: radial-gradient(
    circle at 30% 107%,
    #fdf497 0%,
    #fd5949 45%,
    #d6249f 60%,
    #285aeb 90%
  );
}
```

### Componentes Personalizados

```tsx
// Exemplo de componente customizado
<Card className='card-instagram'>
  <CardContent>{/* Conteúdo */}</CardContent>
</Card>
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Deploy automático
vercel

# Ou conecte com GitHub para CI/CD
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```

## 🔒 Segurança e Privacidade

- ✅ **Processamento 100% Local**: Nenhum dado sai do navegador
- ✅ **Sem Tracking**: Zero analytics ou telemetria
- ✅ **Sem Cookies**: Apenas localStorage para persistência
- ✅ **Open Source**: Código transparente e auditável
- ✅ **HTTPS Only**: Segurança em produção

## 🐛 Troubleshooting

### Problemas Comuns

| Problema                | Solução                                                  |
| ----------------------- | -------------------------------------------------------- |
| Arquivo não reconhecido | Verifique se o JSON está no formato correto do Instagram |
| ZIP não processa        | Certifique-se que é o ZIP original do Instagram          |
| Análise vazia           | Upload os arquivos obrigatórios (followers + following)  |
| Erro de memória         | Limpe o histórico de análises antigas                    |

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: Nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Padrões de Código

- ESLint configurado
- Prettier para formatação
- Conventional Commits
- TypeScript strict mode

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Orlando Pedrazzoli**

- Website: [orlandopedrazzoli.com](https://orlandopedrazzoli.com)
- GitHub: [@orlandopedrazzoli](https://github.com/orlandopedrazzoli)

## 🙏 Agradecimentos

- [Vercel](https://vercel.com) - Hospedagem e deployment
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS
- [Radix UI](https://radix-ui.com) - Componentes acessíveis
- [Framer Motion](https://framer.com/motion) - Animações
- Comunidade Open Source 💜

---

<div align="center">
  
  **Feito com ❤️ e ☕ para a comunidade**
  
  ⭐ Star este projeto se foi útil para você!
  
</div>
