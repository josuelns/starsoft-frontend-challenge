import { infiniteQueryOptions } from '@tanstack/react-query';
import { mapProductToNft } from '@/services/products/mapProductToNft';
import {
  defaultProductsParams,
  getProducts,
  PRODUCTS_PAGE_SIZE,
} from '@/services/products/productsApi';
import type { ProductsResponse } from '@/services/products/types';

export const productsQueryKey = ['products'] as const;

export function getProductsInfiniteQueryOptions() {
  return infiniteQueryOptions({
    queryKey: productsQueryKey,
    queryFn: ({ pageParam }) =>
      getProducts({
        page: pageParam,
        ...defaultProductsParams,
      }),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: ProductsResponse,
      allPages: ProductsResponse[],
    ) => {
      const loadedCount = allPages.reduce(
        (total, page) => total + page.products.length,
        0,
      );

      return loadedCount < lastPage.count ? allPages.length + 1 : undefined;
    },
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      catalog: data.pages.flatMap((page) =>
        page.products.map(mapProductToNft),
      ),
      totalCount: data.pages.at(-1)?.count ?? 0,
    }),
  });
}

export { PRODUCTS_PAGE_SIZE };
