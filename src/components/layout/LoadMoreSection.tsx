'use client';

import { Button } from '@/components/ui/Button';
import styles from './LoadMoreSection.module.scss';

type LoadMoreSectionProps = {
  progress?: number;
  isComplete?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
  className?: string;
};

function cx(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function LoadMoreSection({
  progress = 47,
  isComplete = false,
  isLoading = false,
  onLoadMore,
  className,
}: LoadMoreSectionProps) {
  return (
    <section className={cx(styles.section, className)}>
      <Button
        variant="load"
        className={cx(styles.button, isLoading && styles.buttonLoading)}
        onClick={onLoadMore}
        disabled={isComplete || isLoading}
        aria-label={
          isComplete
            ? 'Você já viu tudo'
            : isLoading
              ? 'Carregando mais itens'
              : 'Carregar mais itens'
        }
        aria-busy={isLoading}
      >
        <Button.Progress value={isComplete ? 100 : progress} />
        <Button.Label variant="load">
          {isLoading ? (
            <Button.Spinner className={styles.spinner} />
          ) : isComplete ? (
            'Você já viu tudo'
          ) : (
            'Carregar mais'
          )}
        </Button.Label>
      </Button>
    </section>
  );
}
