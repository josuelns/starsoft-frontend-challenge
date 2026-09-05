import type { Nft } from '@/domain/nft/types';

export type MockProductsCatalogState = {
  catalog: Nft[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: jest.Mock;
  refetch: jest.Mock;
};

export function createMockProductsCatalogState(
  overrides: Partial<MockProductsCatalogState> = {},
): MockProductsCatalogState {
  return {
    catalog: [],
    totalCount: 0,
    isLoading: false,
    isError: false,
    isFetching: false,
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: jest.fn(),
    refetch: jest.fn(),
    ...overrides,
  };
}
