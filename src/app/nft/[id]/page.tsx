import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NftDetailPage } from '@/app/_components/NftDetailPage';
import { mapProductToNft } from '@/services/products/mapProductToNft';
import { getProductQueryOptions } from '@/services/products/productQuery';
import { findProductById } from '@/services/products/productsApi';

type NftDetailRouteProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NftDetailRouteProps): Promise<Metadata> {
  const { id } = await params;
  const product = await findProductById(id);

  if (!product) {
    return {
      title: 'NFT não encontrado',
    };
  }

  const nft = mapProductToNft(product);

  return {
    title: nft.title,
    description: nft.description,
    openGraph: {
      title: nft.title,
      description: nft.description,
      images: [{ url: nft.imageSrc, alt: nft.imageAlt }],
    },
  };
}

export default async function NftDetailRoute({ params }: NftDetailRouteProps) {
  const { id } = await params;
  const product = await findProductById(id);

  if (!product) {
    notFound();
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getProductQueryOptions(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NftDetailPage productId={id} />
    </HydrationBoundary>
  );
}
