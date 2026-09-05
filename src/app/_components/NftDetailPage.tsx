'use client';

import dynamic from 'next/dynamic';
import { useMemo, useRef, useState } from 'react';
import {
  CartFlyLayer,
  type CartFlyPayload,
} from '@/components/cart/CartFlyLayer';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { NftDetailView } from '@/components/nft/NftDetailView';
import type { Nft } from '@/domain/nft/types';
import {
  formatCartTotal,
  getCartItemCount,
} from '@/domain/cart/cartLogic';
import { useProduct } from '@/services/products/useProduct';
import {
  addProduct,
  clearCart,
  removeProduct,
  setProductQuantity,
  toggleCart,
} from '@/store/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from './NftDetailPage.module.scss';

const CartSidebar = dynamic(() =>
  import('./CartSidebar').then((mod) => ({ default: mod.CartSidebar })),
);

type NftDetailPageProps = {
  productId: string;
};

export function NftDetailPage({ productId }: NftDetailPageProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const isCartOpen = useAppSelector((state) => state.cart.isOpen);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  const { data: item } = useProduct(productId);

  const [flyingItems, setFlyingItems] = useState<CartFlyPayload[]>([]);
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  const addedIds = useMemo(
    () => new Set(cartItems.map((line) => line.item.id)),
    [cartItems],
  );
  const cartTotal = useMemo(() => formatCartTotal(totalPrice), [totalPrice]);
  const cartCount = useMemo(() => getCartItemCount(cartItems), [cartItems]);

  if (!item) return null;

  const isAdded = addedIds.has(item.id);

  const handleBuy = (nft: Nft, sourceEl: HTMLElement | null) => {
    if (addedIds.has(nft.id)) return;

    const cartButton = cartButtonRef.current;
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (sourceEl && cartButton && !prefersReducedMotion) {
      setFlyingItems((current) => [
        ...current,
        {
          id: `${nft.id}-${Date.now()}`,
          imageSrc: nft.imageSrc,
          imageAlt: nft.imageAlt,
          from: sourceEl.getBoundingClientRect(),
          to: cartButton.getBoundingClientRect(),
        },
      ]);
    }

    dispatch(addProduct(nft));
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
          <main id="main-content" className={styles.main}>
            <NftDetailView
              item={item}
              isAdded={isAdded}
              onBuy={handleBuy}
            />
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
        returnFocusRef={cartButtonRef}
      />
    </>
  );
}
