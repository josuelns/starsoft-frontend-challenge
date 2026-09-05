# Starsoft NFT Marketplace

Marketplace de NFTs com carrinho de compras, desenvolvido como parte do desafio técnico Starsoft para Front-End Next.js.

## Funcionalidades

- Catálogo de NFTs consumido da **API oficial** do desafio (paginação de 8 itens por página)
- Grid responsivo (4 / 2 / 1 colunas) fiel ao layout do Figma
- Revelação progressiva dos cards e botão **Carregar mais**
- Carrinho global com **Redux Toolkit** (Duck Pattern): adicionar, alterar quantidade, remover e finalizar compra
- Drawer lateral (mochila) com animações via **Framer Motion**
- Animação fly-to-cart ao comprar um item
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
| **Tailwind CSS v4** | Estilização (tokens alinhados ao Figma) |
| **Jest + Testing Library** | Testes unitários e de integração |
| **Docker** | Ambiente de execução containerizado |

### Escolhas técnicas

- **Tailwind em vez de SASS:** o design system já está modelado com tokens (`brand-*`) no `tailwind.config.ts` e `globals.css`, mantendo estilos modulares sem duplicar camada SCSS.
- **Uma única página:** o Figma do desafio contempla apenas o marketplace; a rota de detalhe do NFT citada no enunciado genérico não faz parte do layout entregue.
- **Prefetch no servidor:** a `page.tsx` faz prefetch da primeira página de produtos e hidrata o React Query no cliente.

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

# 2. Variáveis de ambiente
cp .env.example .env.local

# 3. Desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

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
| `npm run test` | Jest |
| `npm run format` | Prettier |

## Estrutura principal

```
src/
├── app/                  # App Router (page, layout, componentes de página)
├── components/           # UI reutilizável (cart, layout, nft, catalog)
├── domain/               # Tipos e lógica pura (cart, nft)
├── services/             # API, React Query, mappers
├── store/                # Redux + React Query providers
└── lib/                  # Utilitários (motion, cn)
```

## Testes

```bash
npm test
npm run test:coverage
```

**34 testes** em 6 suites, co-localizados ao lado do código:

| Arquivo | Foco |
|---|---|
| `MarketplacePage.test.tsx` | UI, loading, erro, carrinho, paginação |
| `cartLogic.test.ts` | Regras puras do carrinho |
| `cartSlice.test.ts` | Reducers Redux |
| `mapProductToNft.test.ts` | Mapper API → domínio |
| `productsApi.test.ts` | Chamada HTTP |
| `catalog-data.test.ts` | Progresso do catálogo |

Utilitários compartilhados em `src/test-utils/`.

## Limitações e melhorias futuras

- Página de detalhe do NFT (não prevista no Figma entregue)
- Persistência do carrinho (localStorage)
- Testes E2E com Playwright
- Página de checkout real (hoje "Finalizar compra" apenas limpa o carrinho)

## Licença

Projeto de avaliação técnica — uso restrito ao processo seletivo Starsoft.
