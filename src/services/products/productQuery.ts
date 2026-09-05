import { queryOptions } from '@tanstack/react-query';
import { mapProductToNft } from '@/services/products/mapProductToNft';
import { findProductById } from '@/services/products/productsApi';

export function getProductQueryKey(id: string) {
  return ['product', id] as const;
}

export function getProductQueryOptions(id: string) {
  return queryOptions({
    queryKey: getProductQueryKey(id),
    queryFn: async () => {
      const product = await findProductById(id);

      if (!product) return null;

      return mapProductToNft(product);
    },
  });
}
