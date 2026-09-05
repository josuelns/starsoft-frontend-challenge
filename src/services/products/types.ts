export type ApiProduct = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  createdAt: string;
};

export type ProductsResponse = {
  products: ApiProduct[];
  count: number;
};

export type GetProductsParams = {
  page: number;
  rows: number;
  sortBy: 'id' | 'name' | 'price';
  orderBy: 'DESC' | 'ASC';
};
