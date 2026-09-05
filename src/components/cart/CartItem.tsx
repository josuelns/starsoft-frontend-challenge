'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, type MouseEvent, type ReactNode } from 'react';
import { Card } from '@/components/nft/NftCard';
import { titleStyles } from '@/components/ui/typography';
import {
  CART_TRASH_REMOVE_MS,
  cartTrashRemoveTransition,
  cartTrashTapTransition,
} from '@/lib/motion';
import { cn } from '@/lib/utils';

type CartItemLayout = 'full' | 'compact';

type CartItemRootProps = {
  layout?: CartItemLayout;
  children: ReactNode;
  className?: string;
};

type CartItemImageProps = {
  src: string;
  alt: string;
  className?: string;
};

type CartItemContentProps = {
  children: ReactNode;
  className?: string;
};

type CartItemQuantityProps = {
  value: number;
  onDecrease?: () => void;
  onIncrease?: () => void;
  onChange?: (quantity: number) => void;
  className?: string;
};

type CartItemRemoveProps = {
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

function CartItemRoot({
  layout = 'full',
  children,
  className,
}: CartItemRootProps) {
  return (
    <article
      data-layout={layout}
      className={cn(
        layout === 'full'
          ? 'box-border flex h-[200px] w-full items-start gap-[20px] rounded bg-brand-cart-item-bg pt-[21px] pr-[30px] pb-[17px] pl-[26px]'
          : 'flex items-center gap-4 py-3',
        className,
      )}
    >
      {children}
    </article>
  );
}

function CartItemImage({ src, alt, className }: CartItemImageProps) {
  return (
    <div
      className={cn(
        'relative h-[161px] w-[161px] shrink-0 overflow-hidden rounded bg-brand-card-bg',
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="161px"
        className="object-contain"
      />
    </div>
  );
}

function CartItemContent({ children, className }: CartItemContentProps) {
  return (
    <div
      className={cn(
        'flex h-[161px] min-w-0 flex-1 flex-col',
        className,
      )}
    >
      {children}
    </div>
  );
}

function CartItemQuantity({
  value,
  onDecrease,
  onIncrease,
  onChange,
  className,
}: CartItemQuantityProps) {
  const [draft, setDraft] = useState(String(value));
  const [isFocused, setIsFocused] = useState(false);

  const commitDraft = () => {
    const parsed = Number.parseInt(draft, 10);

    if (!Number.isFinite(parsed) || draft.trim() === '') {
      return;
    }

    onChange?.(parsed);
  };

  return (
    <div
      className={cn(
        'flex h-[49px] w-[115px] shrink-0 items-center justify-between rounded bg-brand-dark-bg px-[8px] py-[12px]',
        className,
      )}
    >
      <button
        type="button"
        aria-label="Diminuir"
        onClick={onDecrease}
        className="flex h-6 w-6 cursor-pointer items-center justify-center text-[16px] leading-none text-brand-gray-light transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label="Quantidade"
        value={isFocused ? draft : String(value)}
        onChange={(event) => {
          setDraft(event.target.value.replace(/\D/g, ''));
        }}
        onFocus={() => {
          setIsFocused(true);
          setDraft(String(value));
        }}
        onBlur={() => {
          setIsFocused(false);
          commitDraft();
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.currentTarget.blur();
          }
        }}
        className="w-10 min-w-0 border-0 bg-transparent p-0 text-center font-sans text-[16px] leading-4 text-brand-gray-light outline-none"
      />
      <button
        type="button"
        aria-label="Aumentar"
        onClick={onIncrease}
        className="flex h-6 w-6 cursor-pointer items-center justify-center text-[16px] leading-none text-brand-gray-light transition-opacity hover:opacity-80"
      >
        +
      </button>
    </div>
  );
}

function CartItemRemove({ className, onClick }: CartItemRemoveProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isRemoving) return;

    setIsRemoving(true);

    window.setTimeout(() => {
      onClick?.(event);
      setIsRemoving(false);
    }, CART_TRASH_REMOVE_MS);
  };

  return (
    <motion.button
      type="button"
      aria-label="Remover item"
      animate={
        isRemoving
          ? { y: 36, opacity: 0, scale: 0.72 }
          : { y: 0, opacity: 1, scale: 1 }
      }
      whileHover={isRemoving ? undefined : { scale: 1.06 }}
      whileTap={isRemoving ? undefined : { y: 6, scale: 0.9 }}
      transition={
        isRemoving ? cartTrashRemoveTransition : cartTrashTapTransition
      }
      className={cn(
        'flex h-[43px] w-[43px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand-orange transition-opacity hover:opacity-90 disabled:cursor-not-allowed',
        className,
      )}
      disabled={isRemoving}
      onClick={handleClick}
    >
      <Image
        src="/icons/delete.svg"
        alt=""
        aria-hidden="true"
        width={26}
        height={26}
      />
    </motion.button>
  );
}

function CartItemTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={cn(titleStyles, className)}>{children}</h2>;
}

function CartItemActions({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mt-[15px] flex w-full items-center justify-between',
        className,
      )}
    >
      {children}
    </div>
  );
}

export const CartItem = Object.assign(CartItemRoot, {
  Image: CartItemImage,
  Content: CartItemContent,
  Title: CartItemTitle,
  Description: Card.Description,
  Price: Card.Price,
  Quantity: CartItemQuantity,
  Remove: CartItemRemove,
  Actions: CartItemActions,
});

export type { CartItemLayout, CartItemRootProps };
