import Image from 'next/image';
import type { ComponentProps, ReactNode } from 'react';
import { Button, type ButtonProps } from '@/components/ui/Button';
import { EthIcon } from '@/components/ui/EthIcon';
import { descriptionStyles, priceStyles, titleStyles } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

type CardRootProps = {
  children: ReactNode;
  className?: string;
};

type CardImageProps = {
  src: string;
  alt: string;
  className?: string;
};

type CardTitleProps = {
  children: ReactNode;
  className?: string;
};

type CardDescriptionProps = {
  children: ReactNode;
  className?: string;
};

type CardPriceProps = {
  value: string;
  className?: string;
};

type CardBuyButtonProps = ButtonProps;

function CardRoot({ children, className }: CardRootProps) {
  return (
    <article
      className={cn(
        'flex h-[555px] w-[345px] flex-col overflow-hidden rounded bg-brand-card-bg pb-[26px]',
        className,
      )}
    >
      {children}
    </article>
  );
}

function CardImage({ src, alt, className }: CardImageProps) {
  return (
    <div
      className={cn(
        'flex h-[258px] shrink-0 justify-center px-[24.5px] pt-[26px]',
        className,
      )}
    >
      <div className="relative h-full w-[296px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="296px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

function CardTitle({ children, className }: CardTitleProps) {
  return <h2 className={cn(titleStyles, className)}>{children}</h2>;
}

function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn(descriptionStyles, 'line-clamp-2', className)}>
      {children}
    </p>
  );
}

function CardPrice({ value, className }: CardPriceProps) {
  return (
    <div className={cn('flex items-center gap-[10px]', className)}>
      <EthIcon />
      <span className={priceStyles}>{value} ETH</span>
    </div>
  );
}

function CardBuyButton({
  children = 'COMPRAR',
  className,
  variant = 'buy',
  ...props
}: CardBuyButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn('mt-[24px] h-[66px] w-[296px]', className)}
      {...props}
    >
      {typeof children === 'string' ? (
        <Button.Label>{children}</Button.Label>
      ) : (
        children
      )}
    </Button>
  );
}

export const Card = Object.assign(CardRoot, {
  Image: CardImage,
  Title: CardTitle,
  Description: CardDescription,
  Price: CardPrice,
  BuyButton: CardBuyButton,
});

export { Card as NftCard };
export type {
  CardBuyButtonProps,
  CardDescriptionProps,
  CardImageProps,
  CardPriceProps,
  CardRootProps,
  CardTitleProps,
};
