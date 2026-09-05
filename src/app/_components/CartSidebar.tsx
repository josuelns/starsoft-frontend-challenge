'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, type RefObject } from 'react';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartEmptyState } from '@/components/cart/CartEmptyState';
import { CartItem as CartItemRow } from '@/components/cart/CartItem';
import type { CartItem } from '@/domain/nft/types';
import { cartItemExitTransition, drawerTransition } from '@/lib/motion';
import { useFocusTrap } from '@/lib/useFocusTrap';
import styles from './CartSidebar.module.scss';

type CartSidebarProps = {
  isOpen: boolean;
  lines: CartItem[];
  total: string;
  onClose: () => void;
  onFinish?: () => void;
  onRemove: (id: string) => void;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onChangeQuantity: (id: string, quantity: number) => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
};

function cx(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function CartSidebar({
  isOpen,
  lines,
  total,
  onClose,
  onFinish,
  onRemove,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onChangeQuantity,
  returnFocusRef,
}: CartSidebarProps) {
  const cartLines = lines;
  const prefersReducedMotion = useReducedMotion();
  const drawerRef = useRef<HTMLElement>(null);

  useFocusTrap(drawerRef, isOpen, returnFocusRef);

  useEffect(() => {
    document.body.classList.toggle('cart-drawer-open', isOpen);
    return () => {
      document.body.classList.remove('cart-drawer-open');
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            key="cart-overlay"
            type="button"
            aria-label="Fechar mochila de compras"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={drawerTransition}
            className={styles.overlay}
            onClick={onClose}
          />
          <CartDrawer key="cart-drawer" ref={drawerRef} open>
            <CartDrawer.Header>
              <CartDrawer.Back onClick={onClose} />
              <CartDrawer.Title>Mochila de Compras</CartDrawer.Title>
            </CartDrawer.Header>
            <CartDrawer.Body>
              <div
                className={cx(
                  styles.listWrapper,
                  cartLines.length === 0 ? styles.listEmpty : styles.listWithItems,
                )}
              >
                {cartLines.length === 0 ? (
                  <CartEmptyState />
                ) : (
                  <>
                    <AnimatePresence initial={false}>
                      {cartLines.map(({ item, quantity }) => (
                        <motion.div
                          key={item.id}
                          layout={!prefersReducedMotion}
                          initial={
                            prefersReducedMotion ? false : { opacity: 0, y: -16 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: 56, scale: 0.96 }
                          }
                          transition={cartItemExitTransition}
                        >
                          <CartItemRow layout="full">
                            <CartItemRow.Image
                              src={item.imageSrc}
                              alt={item.imageAlt}
                            />
                            <CartItemRow.Content>
                              <CartItemRow.Title className={styles.titleClamp}>
                                {item.title}
                              </CartItemRow.Title>
                              <CartItemRow.Description className={styles.descriptionClamp}>
                                {item.description}
                              </CartItemRow.Description>
                              <CartItemRow.Price
                                className={styles.priceOffset}
                                value={item.price}
                              />
                              <CartItemRow.Actions>
                                <CartItemRow.Quantity
                                  value={quantity}
                                  onDecrease={() => onDecreaseQuantity(item.id)}
                                  onIncrease={() => onIncreaseQuantity(item.id)}
                                  onChange={(nextQuantity) =>
                                    onChangeQuantity(item.id, nextQuantity)
                                  }
                                />
                                <CartItemRow.Remove
                                  onClick={() => onRemove(item.id)}
                                />
                              </CartItemRow.Actions>
                            </CartItemRow.Content>
                          </CartItemRow>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <CartDrawer.Footer>
                      <CartDrawer.Total value={total} />
                      <CartDrawer.FinishButton onClick={onFinish} />
                    </CartDrawer.Footer>
                  </>
                )}
              </div>
            </CartDrawer.Body>
          </CartDrawer>
        </>
      ) : null}
    </AnimatePresence>
  );
}
