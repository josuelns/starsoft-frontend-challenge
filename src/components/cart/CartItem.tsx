'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, type MouseEvent, type ReactNode } from 'react';
import { EthIcon } from '@/components/ui/EthIcon';
import {
  CART_TRASH_REMOVE_MS,
  cartTrashRemoveTransition,
  cartTrashTapTransition,
} from '@/lib/motion';
import styles from './CartItem.module.scss';

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

function cx(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

function CartItemRoot({ layout = 'full', children, className }: CartItemRootProps) {
  return (
    <article
      data-layout={layout}
      className={cx(
        layout === 'full' ? styles.rootFull : styles.rootCompact,
        className,
      )}
    >
      {children}
    </article>
  );
}

function CartItemImage({ src, alt, className }: CartItemImageProps) {
  return (
    <div className={cx(styles.imageBox, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="161px"
        className={styles.image}
      />
    </div>
  );
}

function CartItemContent({ children, className }: CartItemContentProps) {
  return <div className={cx(styles.content, className)}>{children}</div>;
}

function CartItemTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cx(styles.title, className)}>{children}</h2>;
}

function CartItemDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx(styles.description, className)}>{children}</p>;
}

function CartItemPrice({ value, className }: { value: string; className?: string }) {
  return (
    <div className={cx(styles.priceRow, className)}>
      <EthIcon />
      <span className={styles.priceText}>{value} ETH</span>
    </div>
  );
}

function CartItemActions({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx(styles.actions, className)}>{children}</div>;
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
    if (!Number.isFinite(parsed) || draft.trim() === '') return;
    onChange?.(parsed);
  };

  return (
    <div className={cx(styles.quantityBox, className)}>
      <button
        type="button"
        aria-label="Diminuir"
        onClick={onDecrease}
        className={styles.quantityBtn}
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
          if (event.key === 'Enter') event.currentTarget.blur();
        }}
        className={styles.quantityInput}
      />
      <button
        type="button"
        aria-label="Aumentar"
        onClick={onIncrease}
        className={styles.quantityBtn}
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
      transition={isRemoving ? cartTrashRemoveTransition : cartTrashTapTransition}
      className={cx(styles.removeBtn, className)}
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

export const CartItem = Object.assign(CartItemRoot, {
  Image: CartItemImage,
  Content: CartItemContent,
  Title: CartItemTitle,
  Description: CartItemDescription,
  Price: CartItemPrice,
  Quantity: CartItemQuantity,
  Remove: CartItemRemove,
  Actions: CartItemActions,
});

export type { CartItemLayout, CartItemRootProps };
