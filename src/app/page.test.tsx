import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  it('renderiza o título do marketplace', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', { name: /starsoft nft marketplace/i }),
    ).toBeInTheDocument();
  });
});
