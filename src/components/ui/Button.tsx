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
import { buyButtonTextStyles, loadButtonTextStyles } from './typography';

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
  buy: 'h-[66px] bg-brand-orange text-brand-gray-light',
  finish: 'h-[81px] bg-brand-orange text-brand-gray-light',
  load: 'h-auto w-full flex-col gap-[11px] bg-transparent p-0 hover:opacity-100',
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

  return (
    <span
      className={cn(
        isLoad
          ? cn(
              loadButtonTextStyles,
              'flex h-[86px] w-full items-center justify-center rounded bg-brand-gray-dark',
            )
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
        className="h-full rounded-full bg-brand-orange"
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
        'inline-flex items-center justify-center rounded font-sans transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60',
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
