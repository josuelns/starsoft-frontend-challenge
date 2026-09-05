import { useInfiniteQuery } from '@tanstack/react-query';
import { getProductsInfiniteQueryOptions } from '@/services/products/productsQuery';

export function useProductsCatalog() {
  const query = useInfiniteQuery(getProductsInfiniteQueryOptions());

  return {
    catalog: query.data?.catalog ?? [],
    totalCount: query.data?.totalCount ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
    refetch: query.refetch,
  };
}
