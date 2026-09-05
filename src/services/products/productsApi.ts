import { apiClient } from '@/services/api/client';
import type {
  GetProductsParams,
  ProductsResponse,
} from '@/services/products/types';

export const PRODUCTS_PAGE_SIZE = 8;

export async function getProducts(
  params: GetProductsParams,
): Promise<ProductsResponse> {
  const { data } = await apiClient.get<ProductsResponse>('/products', {
    params,
  });

  return data;
}

export const defaultProductsParams = {
  rows: PRODUCTS_PAGE_SIZE,
  sortBy: 'id' as const,
  orderBy: 'DESC' as const,
};
