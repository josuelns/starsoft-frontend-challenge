import type { Nft } from '@/domain/nft/types';

export function createMockNft(overrides: Partial<Nft> = {}): Nft {
  return {
    id: '1',
    title: 'NFT 1',
    description: 'Descrição do NFT 1',
    price: '32',
    imageSrc: '/images/nfts/star-wand.png',
    imageAlt: 'NFT 1',
    ...overrides,
  };
}

export function createMockCatalog(count: number): Nft[] {
  return Array.from({ length: count }, (_, index) =>
    createMockNft({
      id: String(index + 1),
      title: `NFT ${index + 1}`,
      imageAlt: `NFT ${index + 1}`,
    }),
  );
}
