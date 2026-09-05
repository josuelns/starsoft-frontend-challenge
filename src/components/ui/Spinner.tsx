import styles from './Spinner.module.scss';

type SpinnerProps = {
  className?: string;
  'aria-label'?: string;
};

export function Spinner({ className, 'aria-label': ariaLabel }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={ariaLabel ?? 'Carregando'}
      className={[styles.spinner, className].filter(Boolean).join(' ')}
    />
  );
}
