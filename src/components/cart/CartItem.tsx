import Image from 'next/image';
import type { ComponentProps, ReactNode } from 'react';
import { Card } from '@/components/nft/NftCard';
import { EthIcon } from '@/components/ui/EthIcon';
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
  value?: string;
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
          ? 'flex h-[200px] w-[619px] px-[30px] py-[19.5px]'
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
        'relative h-[161px] w-[161px] shrink-0 overflow-hidden rounded',
        className,
      )}
    >
      <Image src={src} alt={alt} fill sizes="161px" className="object-cover" />
    </div>
  );
}

function CartItemContent({ children, className }: CartItemContentProps) {
  return (
    <div className={cn('ml-[31px] flex min-w-0 flex-1 flex-col', className)}>
      {children}
    </div>
  );
}

function CartItemQuantity({ value = '1', className }: CartItemQuantityProps) {
  return (
    <div
      aria-label="Quantidade"
      className={cn(
        'mt-[16px] flex h-[49px] w-[115px] items-center justify-between rounded bg-brand-gray-dark px-2',
        className,
      )}
    >
      <button
        type="button"
        aria-label="Diminuir"
        className="flex h-4 w-4 items-center justify-center text-brand-gray-light"
      >
        −
      </button>
      <span className="font-sans text-[20px] leading-5 text-brand-gray-light">
        {value}
      </span>
      <button
        type="button"
        aria-label="Aumentar"
        className="flex h-4 w-4 items-center justify-center text-brand-gray-light"
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
        'flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full bg-brand-orange',
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

function CartItemActions({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('mt-[16px] flex items-center justify-between', className)}
    >
      {children}
    </div>
  );
}

export const CartItem = Object.assign(CartItemRoot, {
  Image: CartItemImage,
  Content: CartItemContent,
  Title: Card.Title,
  Description: Card.Description,
  Price: Card.Price,
  Quantity: CartItemQuantity,
  Remove: CartItemRemove,
  Actions: CartItemActions,
});

export type { CartItemLayout, CartItemRootProps };
