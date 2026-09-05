import { getCatalogProgress } from '@/app/_data/catalog-data';

describe('getCatalogProgress', () => {
  it('retorna 0 quando total efetivo é 0', () => {
    expect(getCatalogProgress(0, 0)).toBe(0);
  });

  it('retorna 25% com 8 de 32 itens visíveis', () => {
    expect(getCatalogProgress(8, 32, 8, true)).toBe(25);
  });

  it('não retorna 100% quando ainda há próxima página', () => {
    expect(getCatalogProgress(8, 8, 32, true)).toBe(25);
  });

  it('retorna 50% com metade dos itens visíveis', () => {
    expect(getCatalogProgress(16, 32, 16, true)).toBe(50);
  });

  it('retorna 100% quando todos os itens foram vistos', () => {
    expect(getCatalogProgress(32, 32, 32, false)).toBe(100);
  });
});
