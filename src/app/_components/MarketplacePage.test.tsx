import { act, cleanup, fireEvent, screen, waitFor, within } from '@testing-library/react';
import { MarketplacePage } from '@/app/_components/MarketplacePage';
import { clearCart } from '@/store/cartSlice';
import { store } from '@/store/store';
import { createMockCatalog } from '@/test-utils/fixtures/nft';
import {
  createMockProductsCatalogState,
} from '@/test-utils/mockUseProductsCatalog';
import { renderWithProviders } from '@/test-utils/renderWithProviders';

const mockCatalog = createMockCatalog(16);
const mockUseProductsCatalog = jest.fn();

jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => jest.requireActual('./CartSidebar').CartSidebar,
}));

jest.mock('../../services/products/useProductsCatalog', () => ({
  useProductsCatalog: () => mockUseProductsCatalog(),
}));

function renderMarketplacePage() {
  return renderWithProviders(<MarketplacePage />);
}

function setupCatalogMock(
  overrides: Partial<ReturnType<typeof createMockProductsCatalogState>> = {},
) {
  mockUseProductsCatalog.mockReturnValue(
    createMockProductsCatalogState({
      catalog: mockCatalog,
      totalCount: 16,
      ...overrides,
    }),
  );
}

function revealInitialCards() {
  act(() => {
    jest.advanceTimersByTime(8 * 120);
  });
}

function openCart() {
  fireEvent.click(
    screen.getByRole('button', { name: /abrir mochila de compras/i }),
  );
}

function buyFirstItem() {
  fireEvent.click(screen.getAllByRole('button', { name: /comprar/i })[0]);
}

describe('MarketplacePage', () => {
  beforeEach(() => {
    store.dispatch(clearCart());
    jest.useFakeTimers();
    setupCatalogMock();
  });

  afterEach(() => {
    cleanup();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    mockUseProductsCatalog.mockReset();
  });

  it('renderiza o header com logo e sacola', () => {
    renderMarketplacePage();

    expect(screen.getByAltText('Starsoft')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /abrir mochila de compras/i }),
    ).toBeInTheDocument();
  });

  it('exibe skeleton enquanto carrega o catálogo', () => {
    setupCatalogMock({ isLoading: true, catalog: [], totalCount: 0 });

    renderMarketplacePage();

    expect(
      screen.getByLabelText(/carregando catálogo de nfts/i),
    ).toBeInTheDocument();
  });

  it('exibe erro e permite tentar novamente', () => {
    const refetch = jest.fn();

    setupCatalogMock({
      isError: true,
      catalog: [],
      totalCount: 0,
      refetch,
    });

    renderMarketplacePage();

    expect(
      screen.getByText(/não foi possível carregar os nfts/i),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /tentar novamente/i }));

    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('renderiza o grid com 8 cards NFT inicialmente', () => {
    renderMarketplacePage();

    expect(
      screen.queryByRole('button', { name: /carregar mais itens/i }),
    ).not.toBeInTheDocument();

    revealInitialCards();

    expect(screen.getAllByRole('button', { name: /comprar/i })).toHaveLength(8);
    expect(
      screen.getByRole('button', { name: /carregar mais itens/i }),
    ).toBeInTheDocument();
  });

  it('carrega mais itens ao clicar em carregar mais', () => {
    renderMarketplacePage();
    revealInitialCards();

    fireEvent.click(
      screen.getByRole('button', { name: /carregar mais itens/i }),
    );

    act(() => {
      jest.advanceTimersByTime(8 * 120);
    });

    expect(screen.getAllByRole('button', { name: /comprar/i })).toHaveLength(16);
    expect(
      screen.getByRole('button', { name: /você já viu tudo/i }),
    ).toBeDisabled();
  });

  it('abre o drawer ao clicar na sacola', () => {
    renderMarketplacePage();
    openCart();

    expect(
      screen.getByRole('heading', { name: /mochila de compras/i }),
    ).toBeInTheDocument();
  });

  it('fecha o drawer ao pressionar Escape', () => {
    renderMarketplacePage();
    openCart();

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(
      screen.queryByRole('heading', { name: /mochila de compras/i }),
    ).not.toBeInTheDocument();
  });

  it('adiciona item ao carrinho ao clicar em comprar', () => {
    renderMarketplacePage();
    revealInitialCards();
    buyFirstItem();

    expect(
      screen.getByRole('button', { name: /adicionado ao carrinho/i }),
    ).toBeInTheDocument();
  });

  it('atualiza contador no header após compra', () => {
    renderMarketplacePage();
    revealInitialCards();
    buyFirstItem();

    const cartButton = screen.getByRole('button', {
      name: /abrir mochila de compras/i,
    });

    expect(cartButton).toHaveTextContent('1');
  });

  it('exibe item e total no drawer após compra', () => {
    renderMarketplacePage();
    revealInitialCards();
    buyFirstItem();
    openCart();

    const drawer = screen.getByRole('heading', {
      name: /mochila de compras/i,
    }).closest('aside');

    expect(drawer).not.toBeNull();
    expect(within(drawer!).getByText('TOTAL')).toBeInTheDocument();
    expect(within(drawer!).getAllByText(/32\s*ETH/)).toHaveLength(2);
    expect(within(drawer!).getByLabelText('Quantidade')).toBeInTheDocument();
  });

  it('incrementa quantidade pelo botão Aumentar', () => {
    renderMarketplacePage();
    revealInitialCards();
    buyFirstItem();
    openCart();

    fireEvent.click(screen.getAllByRole('button', { name: 'Aumentar' })[0]);

    const cartButton = screen.getByRole('button', {
      name: /abrir mochila de compras/i,
    });

    expect(cartButton).toHaveTextContent('2');
  });

  it('remove item pela lixeira e libera compra novamente', async () => {
    renderMarketplacePage();
    revealInitialCards();
    buyFirstItem();
    openCart();

    fireEvent.click(
      screen.getAllByRole('button', { name: 'Remover item' })[0],
    );

    await waitFor(() => {
      expect(screen.getByText(/sua mochila está vazia/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /voltar/i }));

    expect(
      screen.getAllByRole('button', { name: /comprar nft 1/i })[0],
    ).toBeInTheDocument();
  });

  it('limpa carrinho ao finalizar compra', () => {
    renderMarketplacePage();
    revealInitialCards();
    buyFirstItem();
    openCart();

    fireEvent.click(
      screen.getByRole('button', { name: /finalizar compra/i }),
    );

    expect(
      screen.getByRole('button', { name: /abrir mochila de compras$/i }),
    ).toBeInTheDocument();
  });
});
