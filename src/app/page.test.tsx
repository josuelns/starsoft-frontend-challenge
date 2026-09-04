import { render, screen } from '@testing-library/react';
import Home from './page';

jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => jest.requireActual('./_components/CartSidebar').CartSidebar,
}));

describe('Home', () => {
  it('renderiza o título principal', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /starsoft nft marketplace/i,
      }),
    ).toBeInTheDocument();
  });

  it('renderiza o drawer da mochila de compras', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', { name: /mochila de compras/i }),
    ).toBeInTheDocument();
  });

  it('renderiza botões comprar', () => {
    render(<Home />);

    expect(screen.getAllByRole('button', { name: /comprar/i }).length).toBeGreaterThanOrEqual(1);
  });
});
