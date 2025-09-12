# FollowerScan - Instagram Followers Manager

Uma aplicação Next.js moderna para análise de seguidores do Instagram de forma privada e segura.

## 🚀 Funcionalidades

- **Tutorial Interativo**: Guia passo a passo para exportar dados do Instagram
- **Upload Seguro**: Upload local dos arquivos JSON (followers.json e following.json)
- **Análise Completa**: Dashboard com estatísticas detalhadas dos seguidores
- **Visualizações**: Gráficos e charts para melhor compreensão dos dados
- **Export de Dados**: Exportação dos resultados em CSV/JSON
- **Salvamento Local**: Análises salvas no navegador para acesso posterior
- **100% Privado**: Processamento local, sem envio de dados para servidores

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Animações fluidas
- **Radix UI** - Componentes acessíveis
- **Recharts** - Gráficos e visualizações
- **React Dropzone** - Upload de arquivos
- **Lucide React** - Ícones modernos

## 📦 Instalação

1. Clone o repositório:

```bash
git clone [repository-url]
cd followerscan
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🎯 Como Usar

### 1. Tutorial

- Acesse a aplicação
- Siga o tutorial interativo para exportar seus dados do Instagram
- Aguarde o email do Instagram com o link para download

### 2. Upload

- Extraia os arquivos `followers.json` e `following.json` do ZIP baixado
- Faça upload dos dois arquivos na área de upload
- Aguarde o processamento

### 3. Análise

- Visualize estatísticas completas dos seus seguidores
- Explore diferentes categorias (mútuos, não seguem de volta, etc.)
- Clique nos cards de estatísticas para navegação rápida
- Exporte listas específicas em CSV/JSON
- Compartilhe suas estatísticas
- As análises são salvas automaticamente no navegador

## 📊 Análises Disponíveis

- **Seguidores vs Seguindo**: Comparação entre totais
- **Seguidores Mútuos**: Usuários que você segue e te seguem de volta
- **Não Me Seguem**: Usuários que você segue mas não te seguem
- **Não Sigo de Volta**: Seus seguidores que você não segue
- **Taxa de Engajamento**: Percentual de seguidores mútuos
- **Insights Personalizados**: Sugestões baseadas nos seus dados
- **Listas Completas**: Visualização de todos os usuários em cada categoria
- **Navegação Rápida**: Clique nos cards para ir direto às listas

## 🔒 Privacidade e Segurança

- **Processamento Local**: Todos os dados são processados no seu navegador
- **Sem Servidores**: Nenhuma informação é enviada para nossos servidores
- **Dados Persistentes**: Análises salvas localmente no localStorage
- **Controle Total**: Você pode limpar os dados a qualquer momento

## 📁 Estrutura do Projeto

```
followerscan/
├── src/
│   ├── app/
│   │   ├── tutorial/          # Página do tutorial
│   │   ├── upload/            # Página de upload
│   │   ├── analyze/           # Página de análise
│   │   ├── globals.css        # Estilos globais
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página inicial
│   ├── components/
│   │   └── ui/                # Componentes reutilizáveis
│   └── lib/
│       └── utils.ts           # Utilitários
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🎨 Componentes UI

A aplicação utiliza uma biblioteca de componentes personalizados baseada em:

- **Radix UI**: Para funcionalidades acessíveis
- **Class Variance Authority**: Para variações de estilos
- **Tailwind Merge**: Para otimização de classes CSS

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Adaptação para tablet e desktop
- **Touch Friendly**: Interface otimizada para toque

## ⚡ Performance

- **Code Splitting**: Carregamento otimizado por páginas
- **Image Optimization**: Otimização automática de imagens
- **Bundle Analysis**: Análise e otimização do bundle
- **Caching**: Estratégias de cache para melhor performance
- **LocalStorage**: Análises salvas para acesso rápido

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
```

## 🌟 Novas Funcionalidades

- ✅ **Salvamento Automático**: Análises salvas no localStorage
- ✅ **Listas Completas**: Visualização de todos os usuários
- ✅ **Navegação Inteligente**: Clique nos cards para scroll suave
- ✅ **Estado Vazio Melhorado**: Interface amigável quando não há análises
- ✅ **Link Rápido**: Acesso direto às análises do header

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## ✨ Agradecimentos

- **Vercel** - Hospedagem e deployment
- **Tailwind CSS** - Framework CSS
- **Radix UI** - Componentes acessíveis
- **Recharts** - Biblioteca de gráficos
- **Comunidade Open Source** - Por todas as ferramentas incríveis

---

Desenvolvido com ❤️ para ajudar você a entender melhor seus seguidores do Instagram.
