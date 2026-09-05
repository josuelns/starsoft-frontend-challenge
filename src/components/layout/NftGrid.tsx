'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Nft } from '@/domain/nft/types';
import { Card } from '@/components/nft/NftCard';
import { Button } from '@/components/ui/Button';
import {
  cardEnterTransition,
  cardHoverTransition,
} from '@/lib/motion';
import { cn } from '@/lib/utils';

type NftGridProps = {
  items: Nft[];
  addedIds: Set<string>;
  onBuy: (item: Nft, sourceEl: HTMLElement | null) => void;
  animateFromIndex?: number;
  className?: string;
};

export function NftGrid({
  items,
  addedIds,
  onBuy,
  animateFromIndex = Number.POSITIVE_INFINITY,
  className,
}: NftGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'mx-auto grid w-full max-w-[1455px] gap-[25px]',
        'grid-cols-[repeat(4,345px)] justify-center',
        'max-[1502px]:grid-cols-[repeat(2,345px)]',
        'max-[762px]:grid-cols-[repeat(1,345px)]',
        className,
      )}
    >
      {items.map((item, index) => {
        const isAdded = addedIds.has(item.id);
        const shouldAnimate = index >= animateFromIndex;

        return (
          <motion.div
            key={item.id}
            className="w-[345px]"
            initial={
              shouldAnimate && !prefersReducedMotion
                ? { opacity: 0, y: 20 }
                : false
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ...cardEnterTransition,
              delay: shouldAnimate && !prefersReducedMotion ? 0.05 : 0,
            }}
            whileHover={
              prefersReducedMotion
                ? undefined
                : { y: -4, transition: cardHoverTransition }
            }
          >
            <Card>
              <Card.Image src={item.imageSrc} alt={item.imageAlt} />
              <Card.Content>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Description>{item.description}</Card.Description>
                  <Card.Price value={item.price} />
                </Card.Body>
                <Card.BuyButton
                  onClick={(event) => {
                    if (isAdded) return;

                    const sourceEl =
                      event.currentTarget
                        .closest('article')
                        ?.querySelector<HTMLElement>('[data-cart-fly-source]') ??
                      null;

                    onBuy(item, sourceEl);
                  }}
                  className={cn(
                    isAdded &&
                      'bg-brand-orange hover:bg-brand-orange hover:opacity-90',
                  )}
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
                </Card.BuyButton>
              </Card.Content>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
