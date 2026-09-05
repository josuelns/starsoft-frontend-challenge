import { useQuery } from '@tanstack/react-query';
import { getProductQueryOptions } from '@/services/products/productQuery';

export function useProduct(id: string) {
  return useQuery(getProductQueryOptions(id));
}
