'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  getCatalogProgress,
  INITIAL_CATALOG_PAGE_SIZE,
} from '@/app/_data/catalog-data';
import { CatalogErrorState } from '@/components/catalog/CatalogErrorState';
import { CatalogSkeleton } from '@/components/catalog/CatalogSkeleton';
import {
  CartFlyLayer,
  type CartFlyPayload,
} from '@/components/cart/CartFlyLayer';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LoadMoreSection } from '@/components/layout/LoadMoreSection';
import { NftGrid } from '@/components/layout/NftGrid';
import type { Nft } from '@/domain/nft/types';
import {
  formatCartTotal,
  getCartItemCount,
} from '@/domain/cart/cartLogic';
import { useProductsCatalog } from '@/services/products/useProductsCatalog';
import {
  addProduct,
  clearCart,
  removeProduct,
  setProductQuantity,
  toggleCart,
} from '@/store/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from './MarketplacePage.module.scss';

const ITEM_REVEAL_DELAY_MS = 120;

const CartSidebar = dynamic(() =>
  import('./CartSidebar').then((mod) => ({ default: mod.CartSidebar })),
);

export function MarketplacePage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const isCartOpen = useAppSelector((state) => state.cart.isOpen);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  const {
    catalog,
    totalCount,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useProductsCatalog();

  const [visibleCount, setVisibleCount] = useState(0);
  const [animateFromIndex, setAnimateFromIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(true);
  const [hasInitialRevealCompleted, setHasInitialRevealCompleted] = useState(false);
  const [flyingItems, setFlyingItems] = useState<CartFlyPayload[]>([]);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealAfterFetchRef = useRef(false);
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  const visibleItems = useMemo(
    () => catalog.slice(0, visibleCount),
    [catalog, visibleCount],
  );
  const effectiveTotal = Math.max(totalCount, catalog.length);
  const isCatalogComplete = !hasNextPage && visibleCount >= effectiveTotal;
  const catalogProgress = getCatalogProgress(
    visibleCount,
    totalCount,
    catalog.length,
    hasNextPage,
  );
  const addedIds = useMemo(
    () => new Set(cartItems.map((line) => line.item.id)),
    [cartItems],
  );
  const cartTotal = useMemo(() => formatCartTotal(totalPrice), [totalPrice]);
  const cartCount = useMemo(() => getCartItemCount(cartItems), [cartItems]);

  const revealItems = (startIndex: number, targetCount: number) => {
    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);

    setIsRevealing(true);
    setAnimateFromIndex(startIndex);

    let nextCount = startIndex;

    const revealNextItem = () => {
      nextCount += 1;
      setVisibleCount(nextCount);

      if (nextCount < targetCount) {
        revealTimerRef.current = setTimeout(revealNextItem, ITEM_REVEAL_DELAY_MS);
        return;
      }

      setIsRevealing(false);

      if (startIndex === 0) setHasInitialRevealCompleted(true);
    };

    revealTimerRef.current = setTimeout(revealNextItem, ITEM_REVEAL_DELAY_MS);
  };

  useEffect(() => {
    if (isLoading || catalog.length === 0 || visibleCount > 0) return;

    const timer = window.setTimeout(() => {
      revealItems(0, Math.min(INITIAL_CATALOG_PAGE_SIZE, catalog.length));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [catalog.length, isLoading, visibleCount]);

  useEffect(() => {
    if (!revealAfterFetchRef.current || catalog.length <= visibleCount) return;

    revealAfterFetchRef.current = false;
    const startIndex = visibleCount;
    const targetCount = Math.min(
      startIndex + INITIAL_CATALOG_PAGE_SIZE,
      catalog.length,
    );

    const timer = window.setTimeout(() => {
      revealItems(startIndex, targetCount);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [catalog.length, visibleCount]);

  useEffect(() => {
    return () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    };
  }, []);

  const handleBuy = (item: Nft, sourceEl: HTMLElement | null) => {
    if (addedIds.has(item.id)) return;

    const cartButton = cartButtonRef.current;
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (sourceEl && cartButton && !prefersReducedMotion) {
      setFlyingItems((current) => [
        ...current,
        {
          id: `${item.id}-${Date.now()}`,
          imageSrc: item.imageSrc,
          imageAlt: item.imageAlt,
          from: sourceEl.getBoundingClientRect(),
          to: cartButton.getBoundingClientRect(),
        },
      ]);
    }

    dispatch(addProduct(item));
  };

  const handleFlyComplete = (id: string) => {
    setFlyingItems((current) => current.filter((flyItem) => flyItem.id !== id));
  };

  const handleRemoveLine = (id: string) => {
    const targetLine = cartItems.find((line) => line.item.id === id);
    if (!targetLine) return;
    for (let index = 0; index < targetLine.quantity; index += 1) {
      dispatch(removeProduct(id));
    }
  };

  const handleIncreaseQuantity = (id: string) => {
    const targetLine = cartItems.find((line) => line.item.id === id);
    if (!targetLine) return;
    dispatch(addProduct(targetLine.item));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(removeProduct(id));
  };

  const handleChangeQuantity = (id: string, quantity: number) => {
    dispatch(setProductQuantity({ id, quantity }));
  };

  const handleOpenCart = () => {
    if (!isCartOpen) dispatch(toggleCart());
  };

  const handleCloseCart = () => {
    if (isCartOpen) dispatch(toggleCart());
  };

  const handleFinishPurchase = () => {
    dispatch(clearCart());
  };

  const handleLoadMore = () => {
    if (isRevealing || isCatalogComplete) return;

    const startIndex = visibleCount;
    const loadedCount = catalog.length;

    if (startIndex < loadedCount) {
      const targetCount = Math.min(
        startIndex + INITIAL_CATALOG_PAGE_SIZE,
        loadedCount,
      );
      revealItems(startIndex, targetCount);
      return;
    }

    if (hasNextPage && !isFetchingNextPage) {
      revealAfterFetchRef.current = true;
      fetchNextPage();
    }
  };

  return (
    <>
      <CartFlyLayer items={flyingItems} onComplete={handleFlyComplete} />

      <div className={styles.shell}>
        <Header
          ref={cartButtonRef}
          cartCount={cartCount}
          onCartClick={handleOpenCart}
        />

        <div className={styles.wrapper}>
          <main className={styles.main}>
            {isLoading ? <CatalogSkeleton /> : null}

            {isError ? (
              <CatalogErrorState onRetry={() => refetch()} />
            ) : null}

            {!isLoading && !isError ? (
              <>
                <NftGrid
                  items={visibleItems}
                  addedIds={addedIds}
                  onBuy={handleBuy}
                  animateFromIndex={animateFromIndex}
                />
                {hasInitialRevealCompleted ? (
                  <LoadMoreSection
                    className={styles.loadMore}
                    progress={catalogProgress}
                    isComplete={isCatalogComplete}
                    isLoading={isRevealing || isFetchingNextPage}
                    onLoadMore={handleLoadMore}
                  />
                ) : null}
              </>
            ) : null}
          </main>

          <Footer className={styles.footer} />
        </div>
      </div>

      <CartSidebar
        isOpen={isCartOpen}
        lines={cartItems}
        total={cartTotal}
        onClose={handleCloseCart}
        onFinish={handleFinishPurchase}
        onRemove={handleRemoveLine}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        onChangeQuantity={handleChangeQuantity}
      />
    </>
  );
}
