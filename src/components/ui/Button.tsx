'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';
import { buyButtonTextStyles, finishButtonTextStyles, loadButtonTextStyles } from './typography';

export type ButtonVariant = 'buy' | 'finish' | 'load';

type ButtonLabelProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonProgressProps = {
  value?: number;
  className?: string;
};

type ButtonSpinnerProps = {
  className?: string;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  buy: 'box-border h-[66px] cursor-pointer bg-brand-buy-bg px-[26px] py-[10px] text-brand-gray-light shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25)] transition-colors duration-300 ease-out hover:opacity-90',
  finish:
    'box-border h-[81px] min-h-[81px] max-h-[81px] shrink-0 bg-brand-orange px-[26px] py-[10px] text-brand-gray-light shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25)] transition-opacity hover:opacity-90',
  load: 'group/load flex h-[107px] w-full cursor-pointer flex-col items-stretch gap-[11px] bg-transparent p-0 disabled:cursor-not-allowed',
};

function injectVariant(children: ReactNode, variant: ButtonVariant): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    if (child.type === ButtonLabel) {
      const labelChild = child as ReactElement<ButtonLabelProps>;
      return cloneElement(labelChild, {
        variant: labelChild.props.variant ?? variant,
      });
    }

    return child;
  });
}

function ButtonLabel({ variant = 'buy', className, children }: ButtonLabelProps) {
  const isLoad = variant === 'load';
  const isFinish = variant === 'finish';

  return (
    <span
      className={cn(
        isLoad
          ? cn(
              loadButtonTextStyles,
              'flex h-[86px] w-full items-center justify-center rounded bg-brand-gray-dark transition-colors duration-300 ease-out group-hover/load:bg-brand-orange group-disabled/load:bg-brand-gray-dark',
            )
          : isFinish
            ? finishButtonTextStyles
            : buyButtonTextStyles,
        className,
      )}
    >
      {children}
    </span>
  );
}

function ButtonSpinner({ className }: ButtonSpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white',
        className,
      )}
    />
  );
}

function ButtonProgress({ value = 47, className }: ButtonProgressProps) {
  return (
    <div
      className={cn(
        'h-[10px] w-full overflow-hidden rounded-full bg-brand-gray-dark',
        className,
      )}
    >
      <div
        className="h-full rounded-full bg-brand-orange transition-[width] duration-500 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function ButtonRoot({
  variant = 'buy',
  fullWidth = false,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const isLoad = variant === 'load';

  return (
    <button
      type={type}
      className={cn(
        isLoad ? 'flex' : 'inline-flex',
        'items-center justify-center rounded font-sans disabled:cursor-not-allowed disabled:opacity-60',
        variant !== 'buy' && !isLoad && 'transition-opacity hover:opacity-90',
        variantStyles[variant],
        fullWidth && !isLoad && 'w-full',
        className,
      )}
      {...props}
    >
      {isLoad ? children : injectVariant(children, variant)}
    </button>
  );
}

export const Button = Object.assign(ButtonRoot, {
  Label: ButtonLabel,
  Spinner: ButtonSpinner,
  Progress: ButtonProgress,
});
