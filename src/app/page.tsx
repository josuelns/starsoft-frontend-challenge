import type { Metadata } from 'next';
import {
  showcaseCartItems,
  showcaseCartTotal,
  showcaseCompactCartItem,
  showcaseFeaturedNft,
} from './_data/showcase-data';
import { HomeShowcase } from './_components/HomeShowcase';

export const metadata: Metadata = {
  title: 'Explorar NFTs',
  description: 'Catálogo de NFTs disponíveis no marketplace Starsoft.',
};

export default function Home() {
  return (
    <HomeShowcase
      featuredNft={showcaseFeaturedNft}
      compactCartItem={showcaseCompactCartItem}
      cartItems={showcaseCartItems}
      cartTotal={showcaseCartTotal}
    />
  );
}
