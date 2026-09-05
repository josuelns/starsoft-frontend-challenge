import type { ComponentProps, ReactNode } from 'react';
import { Button, type ButtonProps } from '@/components/ui/Button';
import { EthIcon } from '@/components/ui/EthIcon';
import { cartTotalLabelStyles, cartTotalPriceStyles } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

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

function CartDrawerRoot({ children, open = true, className }: CartDrawerRootProps) {
  return (
    <aside
      aria-labelledby={drawerTitleId}
      className={cn(
        'fixed top-0 right-0 z-50 flex h-dvh w-full max-w-[679px] flex-col bg-brand-dark-bg shadow-[-29px_0_9.8px_0_rgba(0,0,0,0.1)] transition-transform duration-300 ease-(--ease-cart-drawer)',
        open ? 'translate-x-0' : 'translate-x-full',
        className,
      )}
    >
      {children}
    </aside>
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
    <header
      className={cn(
        'relative flex h-[100px] shrink-0 items-center justify-center px-[30px]',
        className,
      )}
    >
      {children}
    </header>
  );
}

function CartDrawerBack({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      aria-label="Voltar"
      className={cn(
        'absolute left-[30px] flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-brand-gray-dark text-brand-gray-light transition-opacity hover:opacity-80',
        className,
      )}
      {...props}
    >
      <svg
        aria-hidden="true"
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
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
    <h2
      id={drawerTitleId}
      className={cn(
        'font-sans text-[24px] leading-[110%] font-medium tracking-normal text-brand-gray-light',
        className,
      )}
    >
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
    <div
      className={cn(
        'cart-drawer-scroll flex min-h-0 flex-1 flex-col overflow-y-auto px-[30px]',
        className,
      )}
    >
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
    <footer className={cn('mt-[10px] flex w-full max-w-[620px] flex-col pb-[16px]', className)}>
      {children}
    </footer>
  );
}

function CartDrawerTotal({ value, className }: CartDrawerTotalProps) {
  return (
    <div
      className={cn(
        'mb-[40px] flex h-[34px] w-full max-w-[579px] items-center justify-between',
        className,
      )}
    >
      <span className={cartTotalLabelStyles}>TOTAL</span>
      <div className="flex items-center gap-[10px]">
        <EthIcon size={34} />
        <span className={cartTotalPriceStyles}>{value} ETH</span>
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
      className={cn('w-full max-w-[620px]', className)}
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
