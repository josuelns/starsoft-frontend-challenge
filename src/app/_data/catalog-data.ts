export type NftCatalogItem = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
};

export type CartLineItem = {
  item: NftCatalogItem;
  quantity: number;
};

export const NFT_DESCRIPTION =
  'Redesigned from scratch and completely revised.';

export const INITIAL_CATALOG_PAGE_SIZE = 8;

const baseCatalogItems: NftCatalogItem[] = [
  {
    id: 'star-wand',
    title: 'Lorem Ipsum',
    description: NFT_DESCRIPTION,
    price: '32',
    imageSrc: '/images/nfts/star-wand.png',
    imageAlt: 'Star Wand',
  },
  {
    id: 'spirit-lantern',
    title: 'Lorem Ipsum',
    description: NFT_DESCRIPTION,
    price: '12',
    imageSrc: '/images/nfts/spirit-lantern.png',
    imageAlt: 'Spirit Lantern',
  },
  {
    id: 'poison',
    title: 'Lorem Ipsum',
    description: NFT_DESCRIPTION,
    price: '32',
    imageSrc: '/images/nfts/poison.png',
    imageAlt: 'Poison Potion',
  },
  {
    id: 'nature-book',
    title: 'Lorem Ipsum',
    description: NFT_DESCRIPTION,
    price: '32',
    imageSrc: '/images/nfts/nature-book.png',
    imageAlt: 'Nature Book',
  },
  {
    id: 'mystic-orb',
    title: 'Lorem Ipsum',
    description: NFT_DESCRIPTION,
    price: '32',
    imageSrc: '/images/nfts/mystic-orb.png',
    imageAlt: 'Mystic Orb',
  },
  {
    id: 'plate-armor',
    title: 'Lorem Ipsum',
    description: NFT_DESCRIPTION,
    price: '32',
    imageSrc: '/images/nfts/plate-armor.png',
    imageAlt: 'Plate Armor',
  },
  {
    id: 'phoenix-feather',
    title: 'Lorem Ipsum',
    description: NFT_DESCRIPTION,
    price: '32',
    imageSrc: '/images/nfts/phoenix-feather.png',
    imageAlt: 'Phoenix Feather',
  },
  {
    id: 'war-mace',
    title: 'Lorem Ipsum',
    description: NFT_DESCRIPTION,
    price: '32',
    imageSrc: '/images/nfts/war-mace.png',
    imageAlt: 'War Mace',
  },
];

export const catalogItems: NftCatalogItem[] = [
  ...baseCatalogItems,
  ...baseCatalogItems.map((item) => ({
    ...item,
    id: `${item.id}-wave-2`,
  })),
];

export function getCatalogProgress(visibleCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  if (visibleCount >= totalCount) return 100;
  return Math.round((visibleCount / totalCount) * 100);
}

export function calculateCartTotal(lines: CartLineItem[]): string {
  const total = lines.reduce(
    (sum, line) => sum + Number.parseFloat(line.item.price) * line.quantity,
    0,
  );

  return Number.isInteger(total) ? total.toString() : total.toFixed(2);
}

export function getCartItemCount(lines: CartLineItem[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}
