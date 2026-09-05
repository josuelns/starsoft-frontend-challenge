export const INITIAL_CATALOG_PAGE_SIZE = 8;

export function getCatalogProgress(
  visibleCount: number,
  totalCount: number,
  loadedCount = 0,
  hasNextPage = false,
): number {
  const effectiveTotal = Math.max(totalCount, loadedCount, visibleCount);

  if (effectiveTotal === 0) return 0;

  const isComplete =
    !hasNextPage &&
    visibleCount >= effectiveTotal &&
    visibleCount >= loadedCount;

  if (isComplete) return 100;

  const progress = Math.round((visibleCount / effectiveTotal) * 100);

  return Math.min(Math.max(progress, 0), 99);
}
