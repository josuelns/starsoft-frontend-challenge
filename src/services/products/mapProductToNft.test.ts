import { mapProductToNft } from '@/services/products/mapProductToNft';
import type { ApiProduct } from '@/services/products/types';

describe('mapProductToNft', () => {
  const apiProduct: ApiProduct = {
    id: 32,
    name: 'War Spear',
    description: 'Uma lança de guerra com ponta de obsidiana.',
    image: 'https://softstar.s3.amazonaws.com/items/war-spear.png',
    price: '162.00000000',
    createdAt: '2024-07-18T23:55:43.238Z',
  };

  it('mapeia campos da API para o domínio Nft', () => {
    expect(mapProductToNft(apiProduct)).toEqual({
      id: '32',
      title: 'War Spear',
      description: 'Uma lança de guerra com ponta de obsidiana.',
      price: '162',
      imageSrc: 'https://softstar.s3.amazonaws.com/items/war-spear.png',
      imageAlt: 'War Spear',
    });
  });

  it('converte id numérico para string', () => {
    expect(mapProductToNft({ ...apiProduct, id: 7 }).id).toBe('7');
  });

  it('formata preço decimal com duas casas', () => {
    expect(
      mapProductToNft({ ...apiProduct, price: '298.50000000' }).price,
    ).toBe('298.50');
  });
});
