import type { ComponentProps, ReactNode } from 'react';
import { Button, type ButtonProps } from '@/components/ui/Button';
import { EthIcon } from '@/components/ui/EthIcon';
import { priceStyles, titleStyles } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

const drawerTitleId = 'cart-drawer-title';

type CartDrawerRootProps = {
  children: ReactNode;
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

function CartDrawerRoot({ children, className }: CartDrawerRootProps) {
  return (
    <aside
      aria-labelledby={drawerTitleId}
      className={cn(
        'fixed top-0 right-0 z-50 flex h-full min-h-screen w-[679px] flex-col bg-brand-card-bg',
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
        'relative flex items-center justify-center px-[30px] pt-8 pb-6',
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
        'absolute left-[30px] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-brand-gray-dark text-2xl text-brand-gray-light',
        className,
      )}
      {...props}
    >
      ←
    </button>
  );
}

function CartDrawerTitle({ children, className }: CartDrawerTitleProps) {
  return (
    <h2
      id={drawerTitleId}
      className={cn(
        'font-sans text-[26px] leading-[26px] font-medium text-brand-gray-light',
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
    <div className={cn('flex-1 overflow-y-auto px-[30px]', className)}>
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
    <footer className={cn('px-[30px] pt-4 pb-8', className)}>{children}</footer>
  );
}

function CartDrawerTotal({ value, className }: CartDrawerTotalProps) {
  return (
    <div
      className={cn(
        'mb-6 flex items-center justify-between',
        className,
      )}
    >
      <span className={cn(titleStyles, 'text-[26px] leading-[26px]')}>
        TOTAL
      </span>
      <div className="flex items-center gap-[10px]">
        <EthIcon size={34} />
        <span className={cn(priceStyles, 'text-[26px] leading-[26px]')}>
          {value} ETH
        </span>
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
      fullWidth
      className={cn('h-[81px] w-full', className)}
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
