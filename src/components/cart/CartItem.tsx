import Image from 'next/image';
import type { ComponentProps, ReactNode } from 'react';
import { Card } from '@/components/nft/NftCard';
import { titleStyles } from '@/components/ui/typography';
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
  className?: string;
};

type CartItemRemoveProps = ComponentProps<'button'>;

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
  className,
}: CartItemQuantityProps) {
  return (
    <div
      aria-label="Quantidade"
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
      <span className="font-sans text-[16px] leading-4 text-brand-gray-light">
        {value}
      </span>
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

function CartItemRemove({ className, ...props }: CartItemRemoveProps) {
  return (
    <button
      type="button"
      aria-label="Remover item"
      className={cn(
        'flex h-[43px] w-[43px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand-orange transition-opacity hover:opacity-90',
        className,
      )}
      {...props}
    >
      <Image
        src="/icons/delete.svg"
        alt=""
        aria-hidden="true"
        width={26}
        height={26}
      />
    </button>
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
