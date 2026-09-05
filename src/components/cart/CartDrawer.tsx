'use client';

import { motion } from 'framer-motion';
import type { ComponentProps, ReactNode } from 'react';
import { Button, type ButtonProps } from '@/components/ui/Button';
import { EthIcon } from '@/components/ui/EthIcon';
import { drawerTransition } from '@/lib/motion';
import styles from './CartDrawer.module.scss';

const drawerTitleId = 'cart-drawer-title';

type CartDrawerRootProps = {
  children: ReactNode;
  open?: boolean;
  className?: string;
};

type CartDrawerTitleProps = {
  children: ReactNode;
  className?: string;
};

type CartDrawerTotalProps = {
  value: string;
  className?: string;
};

type CartDrawerFinishButtonProps = ButtonProps;

function cx(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

function CartDrawerRoot({ children, open = true, className }: CartDrawerRootProps) {
  return (
    <motion.aside
      aria-labelledby={drawerTitleId}
      initial={{ x: '100%' }}
      animate={{ x: open ? 0 : '100%' }}
      exit={{ x: '100%' }}
      transition={drawerTransition}
      className={cx(styles.aside, className)}
    >
      {children}
    </motion.aside>
  );
}

function CartDrawerHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <header className={cx(styles.header, className)}>{children}</header>
  );
}

function CartDrawerBack({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      aria-label="Voltar"
      className={cx(styles.backBtn, className)}
      {...props}
    >
      <svg
        aria-hidden="true"
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.backIcon}
      >
        <path
          d="M6.5 1L1 7L6.5 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 7H17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

function CartDrawerTitle({ children, className }: CartDrawerTitleProps) {
  return (
    <h2 id={drawerTitleId} className={cx(styles.title, className)}>
      {children}
    </h2>
  );
}

function CartDrawerBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('cart-drawer-scroll', styles.body, className)}>
      {children}
    </div>
  );
}

function CartDrawerFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <footer className={cx(styles.footer, className)}>{children}</footer>
  );
}

function CartDrawerTotal({ value, className }: CartDrawerTotalProps) {
  return (
    <div className={cx(styles.totalRow, className)}>
      <span className={styles.totalLabel}>TOTAL</span>
      <div className={styles.totalPriceWrapper}>
        <EthIcon size={34} />
        <span className={styles.totalPrice}>{value} ETH</span>
      </div>
    </div>
  );
}

function CartDrawerFinishButton({
  children = 'FINALIZAR COMPRA',
  className,
  ...props
}: CartDrawerFinishButtonProps) {
  return (
    <Button
      variant="finish"
      className={cx(styles.finishButton, className)}
      {...props}
    >
      {typeof children === 'string' ? (
        <Button.Label variant="finish">{children}</Button.Label>
      ) : (
        children
      )}
    </Button>
  );
}

export const CartDrawer = Object.assign(CartDrawerRoot, {
  Header: CartDrawerHeader,
  Back: CartDrawerBack,
  Title: CartDrawerTitle,
  Body: CartDrawerBody,
  Footer: CartDrawerFooter,
  Total: CartDrawerTotal,
  FinishButton: CartDrawerFinishButton,
});
