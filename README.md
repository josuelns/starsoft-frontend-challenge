# Starsoft NFT Marketplace

Marketplace de NFTs com carrinho de compras, desenvolvido como parte do desafio técnico Starsoft para Front-End Next.js.

## Funcionalidades

- Catálogo de NFTs consumido da **API oficial** do desafio (paginação de 8 itens por página)
- Grid responsivo (4 / 2 / 1 colunas) fiel ao layout do Figma
- Revelação progressiva dos cards e botão **Carregar mais** com barra de progresso
- Carrinho global com **Redux Toolkit** (Duck Pattern): adicionar, alterar quantidade (botões e input), remover e finalizar compra
- Drawer lateral (mochila) com animações via **Framer Motion**
- Animação fly-to-cart ao comprar um item
- Animação de remoção no carrinho (lixeira e saída do item)
- Spinner de carregamento nas imagens dos cards
- **Página de detalhe** em `/nft/[id]` com rota dinâmica, metadata por item e navegação lista ↔ detalhe
- Estados de **loading** (skeleton) e **erro** (retry) nas requisições
- SEO básico com metadata do Next.js e labels de acessibilidade

## Tecnologias

| Tecnologia | Uso |
|---|---|
| **Next.js 16** (App Router) | Framework, SSR com prefetch, `next/image`, import dinâmica |
| **TypeScript** | Tipagem estática em toda a aplicação |
| **Redux Toolkit** | Estado global do carrinho (`cartSlice` no Duck Pattern) |
| **React Query** | Cache e sincronização dos dados da API |
| **Axios** | Cliente HTTP |
| **Framer Motion** | Animações do grid, drawer e interações |
| **SASS + CSS Modules** | Estilização modular (variáveis, mixins e partials alinhados ao Figma) |
| **Jest + Testing Library** | Testes unitários e de integração |
| **Docker** | Ambiente de execução containerizado |
| **Husky + lint-staged** | Qualidade de código no pre-commit |

### Escolhas técnicas

- **SASS + CSS Modules:** tokens da paleta definidos em `src/styles/_variables.scss` (`$brand-*`), mixins de tipografia em `_typography.scss`, layout em `_layout.scss`. Cada componente tem seu próprio `.module.scss`, garantindo escopo local e zero conflito de classes.
- **Detalhe derivado do card:** o Figma não inclui tela de detalhe; `/nft/[id]` reutiliza tokens e componentes do marketplace, buscando o item na API paginada (`findProductById`).
- **App Router em vez de Pages Router:** prefetch em Server Components substitui `getServerSideProps`; `metadata` substitui `next/head`.
- **Prefetch no servidor:** a home e a rota de detalhe fazem prefetch no servidor e hidratam o React Query no cliente.

## Como avaliar

```bash
npm install
npm test
npm run build
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000), clique em um card para abrir `/nft/[id]`, teste comprar itens, alterar quantidade, remover pela lixeira e carregar mais NFTs.

## API

Documentação: [Starsoft Challenge API](https://api-challenge.starsoft.games/api-docs/)

| Item | Valor |
|---|---|
| Base URL | `https://api-challenge.starsoft.games/api/v1` |
| Endpoint | `GET /products` |
| Parâmetros | `page`, `rows`, `sortBy` (`id` \| `name` \| `price`), `orderBy` (`ASC` \| `DESC`) |

> A URL Heroku antiga (`mks-frontend-challenge-04811e8161e6.herokuapp.com`) está fora do ar. O projeto usa a API ativa em `api-challenge.starsoft.games`.

## Pré-requisitos

- Node.js 20+
- npm 10+
- Docker e Docker Compose (opcional, para execução containerizada)

## Configuração local

```bash
# 1. Clonar e instalar dependências
git clone <seu-fork>
cd starsoft-frontend-challenge
npm install

# 2. Variáveis de ambiente (opcional — há fallback no código)
cp .env.example .env.local

# 3. Desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

As variáveis `NEXT_PUBLIC_API_BASE_URL` e `NEXT_PUBLIC_SITE_URL` são opcionais em desenvolvimento; sem `.env.local`, a API padrão do desafio é usada automaticamente.

## Docker

Subir a aplicação com um único comando:

```bash
docker compose up --build
```

A app ficará disponível em [http://localhost:3000](http://localhost:3000).

Para rodar em segundo plano:

```bash
docker compose up --build -d
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint com correção automática |
| `npm run test` | Jest |
| `npm run test:coverage` | Jest com relatório de cobertura |
| `npm run test:watch` | Jest em modo watch |
| `npm run format` | Prettier (escreve alterações) |
| `npm run format:check` | Prettier (somente verificação) |

## Estrutura principal

```
src/
├── app/                  # App Router (home, nft/[id], layout)
├── components/           # UI reutilizável (cart, layout, nft, catalog)
│   └── **/*.module.scss  # CSS Module por componente
├── styles/               # Partials SASS globais
│   ├── _variables.scss   # Tokens brand-* e constantes
│   ├── _typography.scss  # Mixins de texto
│   ├── _layout.scss      # Mixins de grid e container
│   ├── _animations.scss  # Keyframes globais
│   └── _reset.scss       # Normalize / reset
├── domain/               # Tipos e lógica pura (cart, nft)
├── services/             # API, React Query, mappers
├── store/                # Redux + React Query providers
├── test-utils/           # Fixtures e render helpers para testes
└── lib/                  # Utilitários (motion, cn)
```

## Testes

```bash
npm test
npm run test:coverage
```

**42 testes** em 6 suites, co-localizados ao lado do código:

| Arquivo | Foco |
|---|---|
| `MarketplacePage.test.tsx` | UI, loading, erro, carrinho, paginação |
| `cartLogic.test.ts` | Regras puras do carrinho (inclui `setProductQuantity`) |
| `cartSlice.test.ts` | Reducers Redux |
| `mapProductToNft.test.ts` | Mapper API → domínio |
| `productsApi.test.ts` | Chamada HTTP e busca por id |
| `catalog-data.test.ts` | Progresso do catálogo no "Carregar mais" |

Utilitários compartilhados em `src/test-utils/`.

## Limitações e melhorias futuras

- Layout de detalhe mais elaborado (sem frame dedicado no Figma)
- Persistência do carrinho (localStorage)
- Testes E2E com Playwright
- Página de checkout real (hoje "Finalizar compra" apenas limpa o carrinho)

## Licença

Projeto de avaliação técnica — uso restrito ao processo seletivo Starsoft.
