import { cn } from '@/lib/utils';

type SpinnerProps = {
  className?: string;
  'aria-label'?: string;
};

export function Spinner({ className, 'aria-label': ariaLabel }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={ariaLabel ?? 'Carregando'}
      className={cn(
        'inline-block h-8 w-8 animate-spin rounded-full border-2 border-brand-gray-medium/30 border-t-brand-orange',
        className,
      )}
    />
  );
}
