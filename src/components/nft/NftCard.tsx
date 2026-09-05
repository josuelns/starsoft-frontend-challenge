import Image from 'next/image';
import type { ComponentProps, ReactNode } from 'react';
import { Button, type ButtonProps } from '@/components/ui/Button';
import { EthIcon } from '@/components/ui/EthIcon';
import { descriptionStyles, nftTitleStyles, priceStyles } from '@/components/ui/typography';
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
        'box-border flex h-[533px] w-[345px] shrink-0 flex-col overflow-hidden rounded bg-brand-card-bg pb-[10px] shadow-[0_1px_2px_0_rgba(0,0,0,0.1)]',
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
        'flex shrink-0 justify-center px-[24.5px] pt-[26px]',
        className,
      )}
    >
      <div
        data-cart-fly-source
        className="relative h-[258px] w-[296px] overflow-hidden rounded-[4px] bg-brand-card-image-bg"
      >
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
  return <h2 className={cn(nftTitleStyles, 'm-0', className)}>{children}</h2>;
}

function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn(descriptionStyles, 'm-0 mt-[5px] line-clamp-1', className)}>
      {children}
    </p>
  );
}

function CardPrice({ value, className }: CardPriceProps) {
  return (
    <div
      className={cn(
        'mt-[24px] flex h-[29px] shrink-0 items-center gap-[10px]',
        className,
      )}
    >
      <EthIcon />
      <span className={priceStyles}>{value} ETH</span>
    </div>
  );
}

type CardContentProps = {
  children: ReactNode;
  className?: string;
};

function CardContent({ children, className }: CardContentProps) {
  return (
    <div
      className={cn(
        'mt-[49px] flex h-[186px] flex-col px-[24.5px]',
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
}

function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mt-auto flex w-full flex-col', className)}>{children}</div>
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
      className={cn('mt-[24px] h-[66px] w-[296px] shrink-0', className)}
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
  Content: CardContent,
  Body: CardBody,
  Footer: CardFooter,
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
