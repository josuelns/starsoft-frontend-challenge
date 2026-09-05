'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Nft } from '@/domain/nft/types';
import { Button } from '@/components/ui/Button';
import { EthIcon } from '@/components/ui/EthIcon';
import { Spinner } from '@/components/ui/Spinner';
import {
  descriptionStyles,
  priceStyles,
  titleStyles,
} from '@/components/ui/typography';
import { cn } from '@/lib/utils';

type NftDetailViewProps = {
  item: Nft;
  isAdded: boolean;
  onBuy: (item: Nft, sourceEl: HTMLElement | null) => void;
};

export function NftDetailView({ item, isAdded, onBuy }: NftDetailViewProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article
      className="mx-auto w-full max-w-[900px] rounded bg-brand-card-bg p-[32px] shadow-[0_1px_2px_0_rgba(0,0,0,0.1)]"
    >
      <Link
        href="/"
        className="mb-[28px] inline-flex items-center gap-2 font-sans text-[14px] font-medium text-brand-orange transition-opacity hover:opacity-80"
      >
        ← Voltar ao marketplace
      </Link>

      <div className="flex flex-col items-center gap-[32px] md:flex-row md:items-start">
        <div
          data-cart-fly-source
          className="relative h-[360px] w-full max-w-[360px] shrink-0 overflow-hidden rounded-[4px] bg-brand-card-image-bg"
        >
          {!isLoaded ? (
            <Spinner
              className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
              aria-label={`Carregando imagem de ${item.imageAlt}`}
            />
          ) : null}
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            sizes="360px"
            priority
            className={cn(
              'object-fill transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0',
            )}
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)}
          />
        </div>

        <div className="flex w-full min-w-0 flex-1 flex-col">
          <h1 className={cn(titleStyles, 'm-0')}>{item.title}</h1>
          <p
            className={cn(
              descriptionStyles,
              'm-0 mt-[16px] text-[14px] leading-[22px] tracking-normal',
            )}
          >
            {item.description}
          </p>
          <div className="mt-[24px] flex h-[29px] items-center gap-[10px]">
            <EthIcon />
            <span className={priceStyles}>{item.price} ETH</span>
          </div>
          <Button
            variant="buy"
            className={cn(
              'mt-[32px] h-[66px] w-full max-w-[296px]',
              isAdded &&
                'bg-brand-orange hover:bg-brand-orange hover:opacity-90',
            )}
            onClick={(event) => {
              if (isAdded) return;

              const sourceEl =
                event.currentTarget
                  .closest('article')
                  ?.querySelector<HTMLElement>('[data-cart-fly-source]') ??
                null;

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
