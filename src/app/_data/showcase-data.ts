export type ShowcaseNftItem = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
};

export const showcasePalette = [
  { name: 'brand-orange', hex: '#FF8310', className: 'bg-brand-orange' },
  { name: 'brand-dark-bg', hex: '#191A20', className: 'bg-brand-dark-bg' },
  { name: 'brand-card-bg', hex: '#232323', className: 'bg-brand-card-bg' },
  { name: 'brand-gray-dark', hex: '#393939', className: 'bg-brand-gray-dark' },
  {
    name: 'brand-gray-medium',
    hex: '#CCCCCC',
    className: 'bg-brand-gray-medium',
  },
  { name: 'brand-gray-light', hex: '#FFFFFF', className: 'bg-brand-gray-light' },
] as const;

export const showcaseFeaturedNft: ShowcaseNftItem = {
  id: 'featured-1',
  title: 'Lorem Ipsum',
  description: 'Redesigned from scratch with love',
  price: '32',
  imageSrc: '/next.svg',
  imageAlt: 'Star Wand NFT',
};

export const showcaseCompactCartItem: ShowcaseNftItem = {
  id: 'cart-compact-1',
  title: 'ITEM 2',
  description: 'Redesigned from scratch with love',
  price: '12',
  imageSrc: '/next.svg',
  imageAlt: 'Spirit Lantern',
};

export const showcaseCartItems: ShowcaseNftItem[] = [
  {
    id: 'cart-1',
    title: 'ITEM 2',
    description: 'Redesigned from scratch with love',
    price: '12',
    imageSrc: '/next.svg',
    imageAlt: 'Spirit Lantern',
  },
  {
    id: 'cart-2',
    title: 'ITEM 9',
    description: 'Redesigned from scratch with love',
    price: '32',
    imageSrc: '/vercel.svg',
    imageAlt: 'War Mace',
  },
];

export const showcaseCartTotal = '44';
