import { act, fireEvent, render, screen } from '@testing-library/react';
import Home from './page';

jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => jest.requireActual('./_components/CartSidebar').CartSidebar,
}));

describe('Home', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renderiza o header com logo e sacola', () => {
    render(<Home />);

    expect(screen.getByAltText('Starsoft')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /abrir mochila de compras/i }),
    ).toBeInTheDocument();
  });

  it('renderiza o grid com 8 cards NFT inicialmente', () => {
    render(<Home />);

    expect(
      screen.queryByRole('button', { name: /carregar mais itens/i }),
    ).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(8 * 120);
    });

    expect(screen.getAllByRole('button', { name: /comprar/i })).toHaveLength(8);
    expect(
      screen.getByRole('button', { name: /carregar mais itens/i }),
    ).toBeInTheDocument();
  });

  it('carrega mais itens ao clicar em carregar mais', () => {
    render(<Home />);

    act(() => {
      jest.advanceTimersByTime(8 * 120);
    });

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
    render(<Home />);

    fireEvent.click(
      screen.getByRole('button', { name: /abrir mochila de compras/i }),
    );

    expect(
      screen.getByRole('heading', { name: /mochila de compras/i }),
    ).toBeInTheDocument();
  });

  it('adiciona item ao carrinho ao clicar em comprar', () => {
    render(<Home />);

    act(() => {
      jest.advanceTimersByTime(8 * 120);
    });

    fireEvent.click(screen.getAllByRole('button', { name: /comprar/i })[0]);

    expect(
      screen.getByRole('button', { name: /adicionado ao carrinho/i }),
    ).toBeInTheDocument();
  });
});
