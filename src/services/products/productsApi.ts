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

export async function findProductById(
  productId: string,
): Promise<ProductsResponse['products'][number] | null> {
  let page = 1;

  while (true) {
    const response = await getProducts({
      page,
      ...defaultProductsParams,
    });

    const product = response.products.find(
      (item) => String(item.id) === productId,
    );

    if (product) return product;

    const loadedCount = page * defaultProductsParams.rows;
    if (loadedCount >= response.count || response.products.length === 0) {
      return null;
    }

    page += 1;
  }
}

export const defaultProductsParams = {
  rows: PRODUCTS_PAGE_SIZE,
  sortBy: 'id' as const,
  orderBy: 'DESC' as const,
};
