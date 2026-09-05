import { getProducts } from './productsApi';
import { apiClient } from '../api/client';

jest.mock('../api/client', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

const mockedGet = jest.mocked(apiClient.get);

describe('getProducts', () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it('chama GET /products com parâmetros de paginação', async () => {
    const response = {
      products: [],
      count: 0,
    };

    mockedGet.mockResolvedValue({ data: response });

    const result = await getProducts({
      page: 1,
      rows: 8,
      sortBy: 'id',
      orderBy: 'DESC',
    });

    expect(mockedGet).toHaveBeenCalledWith('/products', {
      params: {
        page: 1,
        rows: 8,
        sortBy: 'id',
        orderBy: 'DESC',
      },
    });
    expect(result).toEqual(response);
  });
});
