'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import styles from './Button.module.scss';

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

const variantClass: Record<ButtonVariant, string> = {
  buy: styles.variantBuy,
  finish: styles.variantFinish,
  load: styles.variantLoad,
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
  const labelStyle =
    variant === 'load'
      ? styles.labelLoad
      : variant === 'finish'
        ? styles.labelFinish
        : styles.labelBuy;

  return (
    <span className={[labelStyle, className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}

function ButtonSpinner({ className }: ButtonSpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={[styles.spinner, className].filter(Boolean).join(' ')}
    />
  );
}

function ButtonProgress({ value = 47, className }: ButtonProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progresso do catálogo"
      className={[styles.progressTrack, className].filter(Boolean).join(' ')}
    >
      <div
        className={styles.progressFill}
        style={{ width: `${clampedValue}%` }}
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
  const classes = [
    styles.root,
    variantClass[variant],
    !isLoad && fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...props}>
      {isLoad ? children : injectVariant(children, variant)}
    </button>
  );
}

export const Button = Object.assign(ButtonRoot, {
  Label: ButtonLabel,
  Spinner: ButtonSpinner,
  Progress: ButtonProgress,
});
