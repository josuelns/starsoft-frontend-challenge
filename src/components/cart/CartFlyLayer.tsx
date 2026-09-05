'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import styles from './CartFlyLayer.module.scss';

export type CartFlyPayload = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  from: DOMRect;
  to: DOMRect;
};

type CartFlyLayerProps = {
  items: CartFlyPayload[];
  onComplete: (id: string) => void;
  className?: string;
};

type CartFlyItemProps = {
  item: CartFlyPayload;
  onComplete: (id: string) => void;
};

function cx(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

function CartFlyItem({ item, onComplete }: CartFlyItemProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const { from, to } = item;
    const startSize = Math.min(from.width, from.height, 96);
    const endSize = 28;
    const startX = from.left + from.width / 2 - startSize / 2;
    const startY = from.top + from.height / 2 - startSize / 2;
    const endX = to.left + to.width / 2 - endSize / 2;
    const endY = to.top + to.height / 2 - endSize / 2;
    const arcX = (startX + endX) / 2;
    const arcY = Math.min(startY, endY) - 120;

    if (typeof node.animate !== 'function') {
      onComplete(item.id);
      return;
    }

    const animation = node.animate(
      [
        { left: `${startX}px`, top: `${startY}px`, width: `${startSize}px`, height: `${startSize}px`, opacity: 1 },
        { left: `${arcX}px`, top: `${arcY}px`, width: `${startSize * 0.7}px`, height: `${startSize * 0.7}px`, opacity: 1, offset: 0.55 },
        { left: `${endX}px`, top: `${endY}px`, width: `${endSize}px`, height: `${endSize}px`, opacity: 0 },
      ],
      { duration: 700, easing: 'cubic-bezier(0.33, 1, 0.68, 1)', fill: 'forwards' },
    );

    const handleFinish = () => onComplete(item.id);
    animation.addEventListener('finish', handleFinish);

    return () => {
      animation.removeEventListener('finish', handleFinish);
      animation.cancel();
    };
  }, [item, onComplete]);

  return (
    <div ref={nodeRef} aria-hidden="true" className={styles.flyItem}>
      <Image
        src={item.imageSrc}
        alt=""
        fill
        sizes="96px"
        className={styles.flyImage}
      />
    </div>
  );
}

export function CartFlyLayer({ items, onComplete, className }: CartFlyLayerProps) {
  if (items.length === 0) return null;

  return (
    <div className={cx(styles.layer, className)} aria-hidden="true">
      {items.map((item) => (
        <CartFlyItem key={item.id} item={item} onComplete={onComplete} />
      ))}
    </div>
  );
}
