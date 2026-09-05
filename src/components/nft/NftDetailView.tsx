'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Nft } from '@/domain/nft/types';
import { Button } from '@/components/ui/Button';
import { EthIcon } from '@/components/ui/EthIcon';
import { Spinner } from '@/components/ui/Spinner';
import styles from './NftDetailView.module.scss';

type NftDetailViewProps = {
  item: Nft;
  isAdded: boolean;
  onBuy: (item: Nft, sourceEl: HTMLElement | null) => void;
};

function cx(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function NftDetailView({ item, isAdded, onBuy }: NftDetailViewProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article className={styles.article}>
      <Link href="/" className={styles.backLink}>
        ← Voltar ao marketplace
      </Link>

      <div className={styles.layout}>
        <div data-cart-fly-source className={styles.imageBox}>
          {!isLoaded ? (
            <Spinner
              className={styles.spinnerCenter}
              aria-label={`Carregando imagem de ${item.imageAlt}`}
            />
          ) : null}
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            sizes="360px"
            priority
            className={cx(styles.image, isLoaded ? styles.imageVisible : styles.imageHidden)}
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{item.title}</h1>
          <p className={styles.description}>{item.description}</p>
          <div className={styles.priceRow}>
            <EthIcon />
            <span className={styles.priceText}>{item.price} ETH</span>
          </div>
          <Button
            variant="buy"
            className={cx(styles.buyButton, isAdded ? styles.buyButtonAdded : undefined)}
            onClick={(event) => {
              if (isAdded) return;
              const sourceEl =
                event.currentTarget
                  .closest('article')
                  ?.querySelector<HTMLElement>('[data-cart-fly-source]') ?? null;
              onBuy(item, sourceEl);
            }}
            aria-label={
              isAdded
                ? `${item.imageAlt} adicionado ao carrinho`
                : `Comprar ${item.imageAlt}`
            }
          >
            {isAdded ? (
              <Button.Label>Adicionado ao carrinho</Button.Label>
            ) : (
              <Button.Label>COMPRAR</Button.Label>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
