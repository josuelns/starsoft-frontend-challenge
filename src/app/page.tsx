import type { Metadata } from 'next';
import { catalogItems } from './_data/catalog-data';
import { MarketplacePage } from './_components/MarketplacePage';

export const metadata: Metadata = {
  title: 'Explorar NFTs',
  description: 'Catálogo de NFTs disponíveis no marketplace Starsoft.',
};

export default function Home() {
  return <MarketplacePage catalog={catalogItems} />;
}
