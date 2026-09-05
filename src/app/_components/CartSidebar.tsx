'use client';

import { useEffect, useState } from 'react';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartEmptyState } from '@/components/cart/CartEmptyState';
import { CartItem } from '@/components/cart/CartItem';
import type { CartLineItem } from '@/app/_data/catalog-data';
import { cn } from '@/lib/utils';

const DRAWER_TRANSITION_MS = 300;

type CartSidebarProps = {
  isOpen: boolean;
  lines?: CartLineItem[];
  /** @deprecated use `lines` — mantido para compatibilidade durante HMR */
  items?: CartLineItem[];
  total: string;
  onClose: () => void;
  onRemove: (id: string) => void;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
};

export function CartSidebar({
  isOpen,
  lines,
  items,
  total,
  onClose,
  onRemove,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CartSidebarProps) {
  const cartLines = lines ?? items ?? [];
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const frame = requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => cancelAnimationFrame(frame);
    }

    setIsVisible(false);
    const timer = window.setTimeout(() => {
      setShouldRender(false);
    }, DRAWER_TRANSITION_MS);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    document.body.classList.toggle('cart-drawer-open', isVisible);

    return () => {
      document.body.classList.remove('cart-drawer-open');
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onClose]);

  if (!shouldRender) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Fechar mochila de compras"
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-(--ease-cart-drawer)',
          isVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />
      <CartDrawer open={isVisible}>
        <CartDrawer.Header>
          <CartDrawer.Back onClick={onClose} />
          <CartDrawer.Title>Mochila de Compras</CartDrawer.Title>
        </CartDrawer.Header>
        <CartDrawer.Body>
          <div
            className={cn(
              'mx-auto my-auto flex w-full max-w-[620px] flex-col',
              cartLines.length === 0
                ? 'min-h-full flex-1 justify-center'
                : 'gap-[21px] pb-[16px]',
            )}
          >
            {cartLines.length === 0 ? (
              <CartEmptyState />
            ) : (
              <>
                {cartLines.map(({ item, quantity }) => (
                  <CartItem key={item.id} layout="full">
                    <CartItem.Image src={item.imageSrc} alt={item.imageAlt} />
                    <CartItem.Content>
                      <CartItem.Title className="line-clamp-1">
                        {item.title}
                      </CartItem.Title>
                      <CartItem.Description className="mt-[5px] line-clamp-1">
                        {item.description}
                      </CartItem.Description>
                      <CartItem.Price className="mt-[15px]" value={item.price} />
                      <CartItem.Actions>
                        <CartItem.Quantity
                          value={quantity}
                          onDecrease={() => onDecreaseQuantity(item.id)}
                          onIncrease={() => onIncreaseQuantity(item.id)}
                        />
                        <CartItem.Remove onClick={() => onRemove(item.id)} />
                      </CartItem.Actions>
                    </CartItem.Content>
                  </CartItem>
                ))}
                <CartDrawer.Footer>
                  <CartDrawer.Total value={total} />
                  <CartDrawer.FinishButton />
                </CartDrawer.Footer>
              </>
            )}
          </div>
        </CartDrawer.Body>
      </CartDrawer>
    </>
  );
}
