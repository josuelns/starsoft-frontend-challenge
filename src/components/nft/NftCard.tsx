'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Button, type ButtonProps } from '@/components/ui/Button';
import { EthIcon } from '@/components/ui/EthIcon';
import { Spinner } from '@/components/ui/Spinner';
import styles from './NftCard.module.scss';

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

type CardBuyButtonProps = ButtonProps & { added?: boolean };

function cx(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

function CardRoot({ children, className }: CardRootProps) {
  return (
    <article className={cx(styles.card, className)}>{children}</article>
  );
}

function CardImage({ src, alt, className }: CardImageProps) {
  return <CardImageContent key={src} src={src} alt={alt} className={className} />;
}

function CardImageContent({ src, alt, className }: CardImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cx(styles.imageWrapper, className)}>
      <div data-cart-fly-source className={styles.imageBox}>
        {!isLoaded ? (
          <Spinner
            className={styles.spinnerCenter}
            aria-label={`Carregando imagem de ${alt}`}
          />
        ) : null}
        <Image
          src={src}
          alt={alt}
          fill
          sizes="296px"
          className={cx(styles.image, isLoaded ? styles.imageVisible : styles.imageHidden)}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
}

function CardTitle({ children, className }: CardTitleProps) {
  return <h2 className={cx(styles.title, className)}>{children}</h2>;
}

function CardDescription({ children, className }: CardDescriptionProps) {
  return <p className={cx(styles.description, className)}>{children}</p>;
}

function CardPrice({ value, className }: CardPriceProps) {
  return (
    <div className={cx(styles.priceRow, className)}>
      <EthIcon />
      <span className={styles.priceText}>{value} ETH</span>
    </div>
  );
}

function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx(styles.content, className)}>{children}</div>;
}

function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx(styles.body, className)}>{children}</div>;
}

function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx(styles.footer, className)}>{children}</div>;
}

function CardBuyButton({
  children = 'COMPRAR',
  className,
  variant = 'buy',
  added,
  ...props
}: CardBuyButtonProps) {
  return (
    <Button
      variant={variant}
      className={cx(styles.buyButton, added ? styles.buyButtonAdded : undefined, className)}
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
