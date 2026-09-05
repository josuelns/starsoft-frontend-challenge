'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { Nft } from '@/domain/nft/types';
import { Card } from '@/components/nft/NftCard';
import { Button } from '@/components/ui/Button';
import {
  cardEnterTransition,
  cardHoverTransition,
} from '@/lib/motion';
import styles from './NftGrid.module.scss';

type NftGridProps = {
  items: Nft[];
  addedIds: Set<string>;
  onBuy: (item: Nft, sourceEl: HTMLElement | null) => void;
  animateFromIndex?: number;
  className?: string;
};

function cx(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function NftGrid({
  items,
  addedIds,
  onBuy,
  animateFromIndex = Number.POSITIVE_INFINITY,
  className,
}: NftGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cx(styles.grid, className)}>
      {items.map((item, index) => {
        const isAdded = addedIds.has(item.id);
        const shouldAnimate = index >= animateFromIndex;

        return (
          <motion.div
            key={item.id}
            className={styles.cardWrapper}
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
              <Link
                href={`/nft/${item.id}`}
                className={styles.cardLink}
                aria-label={`Ver detalhes de ${item.title}`}
              >
                <Card.Image src={item.imageSrc} alt={item.imageAlt} />
              </Link>
              <Card.Content>
                <Card.Body>
                  <Link href={`/nft/${item.id}`} className={styles.titleLink}>
                    <Card.Title>{item.title}</Card.Title>
                  </Link>
                  <Card.Description>{item.description}</Card.Description>
                  <Card.Price value={item.price} />
                </Card.Body>
                <Card.BuyButton
                  added={isAdded}
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
                </Card.BuyButton>
              </Card.Content>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
