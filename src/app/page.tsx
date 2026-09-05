import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { Metadata } from 'next';
import { MarketplacePage } from './_components/MarketplacePage';
import { getProductsInfiniteQueryOptions } from '@/services/products/productsQuery';

export const metadata: Metadata = {
  title: 'Explorar NFTs',
  description: 'Catálogo de NFTs disponíveis no marketplace Starsoft.',
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(getProductsInfiniteQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MarketplacePage />
    </HydrationBoundary>
  );
}
