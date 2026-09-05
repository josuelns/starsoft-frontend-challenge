import { findProductById, getProducts } from './productsApi';
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

describe('findProductById', () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it('encontra produto percorrendo páginas da API', async () => {
    mockedGet
      .mockResolvedValueOnce({
        data: {
          products: [{ id: 10, name: 'A' }],
          count: 16,
        },
      })
      .mockResolvedValueOnce({
        data: {
          products: [{ id: 32, name: 'War Spear' }],
          count: 16,
        },
      });

    const result = await findProductById('32');

    expect(result).toEqual({ id: 32, name: 'War Spear' });
    expect(mockedGet).toHaveBeenCalledTimes(2);
  });

  it('retorna null quando o id não existe', async () => {
    mockedGet.mockResolvedValue({
      data: {
        products: [{ id: 1, name: 'A' }],
        count: 1,
      },
    });

    await expect(findProductById('999')).resolves.toBeNull();
  });
});
