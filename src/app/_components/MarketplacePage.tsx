'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { CartLineItem, NftCatalogItem } from '@/app/_data/catalog-data';
import {
  calculateCartTotal,
  getCartItemCount,
  getCatalogProgress,
  INITIAL_CATALOG_PAGE_SIZE,
} from '@/app/_data/catalog-data';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LoadMoreSection } from '@/components/layout/LoadMoreSection';
import {
  MARKETPLACE_HORIZONTAL_PADDING_CLASS,
  MARKETPLACE_MAX_WIDTH_CLASS,
  MARKETPLACE_PAGE_SHELL_CLASS,
} from '@/components/layout/marketplace-layout';
import { NftGrid } from '@/components/layout/NftGrid';
import {
  CartFlyLayer,
  type CartFlyPayload,
} from '@/components/cart/CartFlyLayer';

const ITEM_REVEAL_DELAY_MS = 120;

const CartSidebar = dynamic(() =>
  import('./CartSidebar').then((mod) => ({ default: mod.CartSidebar })),
);

type MarketplacePageProps = {
  catalog: NftCatalogItem[];
};

export function MarketplacePage({ catalog }: MarketplacePageProps) {
  const [cartLines, setCartLines] = useState<CartLineItem[]>([]);
  const [addedIds, setAddedIds] = useState<Set<string>>(() => new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [animateFromIndex, setAnimateFromIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(true);
  const [hasInitialRevealCompleted, setHasInitialRevealCompleted] = useState(false);
  const [flyingItems, setFlyingItems] = useState<CartFlyPayload[]>([]);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  const visibleItems = useMemo(
    () => catalog.slice(0, visibleCount),
    [catalog, visibleCount],
  );
  const isCatalogComplete = visibleCount >= catalog.length;
  const catalogProgress = getCatalogProgress(visibleCount, catalog.length);
  const cartTotal = useMemo(() => calculateCartTotal(cartLines), [cartLines]);
  const cartCount = useMemo(() => getCartItemCount(cartLines), [cartLines]);

  const revealItems = (startIndex: number, targetCount: number) => {
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
    }

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

      if (startIndex === 0) {
        setHasInitialRevealCompleted(true);
      }
    };

    revealTimerRef.current = setTimeout(revealNextItem, ITEM_REVEAL_DELAY_MS);
  };

  useEffect(() => {
    const initialTarget = Math.min(INITIAL_CATALOG_PAGE_SIZE, catalog.length);
    revealItems(0, initialTarget);

    return () => {
      if (revealTimerRef.current) {
        clearTimeout(revealTimerRef.current);
      }
    };
  }, [catalog.length]);

  const handleBuy = (item: NftCatalogItem, sourceEl: HTMLElement | null) => {
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

    setAddedIds((current) => new Set(current).add(item.id));
    setCartLines((current) => {
      const existingLine = current.find((line) => line.item.id === item.id);

      if (existingLine) {
        return current.map((line) =>
          line.item.id === item.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }

      return [...current, { item, quantity: 1 }];
    });
  };

  const handleFlyComplete = (id: string) => {
    setFlyingItems((current) => current.filter((flyItem) => flyItem.id !== id));
  };

  const handleRemove = (id: string) => {
    setCartLines((current) => current.filter((line) => line.item.id !== id));
    setAddedIds((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  };

  const handleIncreaseQuantity = (id: string) => {
    setCartLines((current) =>
      current.map((line) =>
        line.item.id === id
          ? { ...line, quantity: line.quantity + 1 }
          : line,
      ),
    );
  };

  const handleDecreaseQuantity = (id: string) => {
    const targetLine = cartLines.find((line) => line.item.id === id);

    if (!targetLine) return;

    if (targetLine.quantity <= 1) {
      handleRemove(id);
      return;
    }

    setCartLines((current) =>
      current.map((line) =>
        line.item.id === id
          ? { ...line, quantity: line.quantity - 1 }
          : line,
      ),
    );
  };

  const handleLoadMore = () => {
    if (isRevealing || isCatalogComplete) return;

    const startIndex = visibleCount;
    const targetCount = Math.min(
      startIndex + INITIAL_CATALOG_PAGE_SIZE,
      catalog.length,
    );

    revealItems(startIndex, targetCount);
  };

  return (
    <>
      <CartFlyLayer items={flyingItems} onComplete={handleFlyComplete} />

      <div className={MARKETPLACE_PAGE_SHELL_CLASS}>
        <Header
          ref={cartButtonRef}
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
        />

        <div className={`mx-auto flex w-full flex-1 flex-col ${MARKETPLACE_MAX_WIDTH_CLASS}`}>
          <main
            className={`flex-1 ${MARKETPLACE_HORIZONTAL_PADDING_CLASS} pt-[130px]`}
          >
          <NftGrid
            items={visibleItems}
            addedIds={addedIds}
            onBuy={handleBuy}
            animateFromIndex={animateFromIndex}
          />
          {hasInitialRevealCompleted ? (
            <LoadMoreSection
              className="mt-[130px]"
              progress={catalogProgress}
              isComplete={isCatalogComplete}
              isLoading={isRevealing}
              onLoadMore={handleLoadMore}
            />
          ) : null}
        </main>

          <Footer className="mt-[100px]" />
        </div>
      </div>

      <CartSidebar
        isOpen={isCartOpen}
        lines={cartLines}
        total={cartTotal}
        onClose={() => setIsCartOpen(false)}
        onRemove={handleRemove}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />
    </>
  );
}
