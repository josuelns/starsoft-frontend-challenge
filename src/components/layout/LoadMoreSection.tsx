'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type LoadMoreSectionProps = {
  progress?: number;
  isComplete?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
  className?: string;
};

export function LoadMoreSection({
  progress = 47,
  isComplete = false,
  isLoading = false,
  onLoadMore,
  className,
}: LoadMoreSectionProps) {
  return (
    <section
      aria-label="Carregar mais itens"
      className={cn('mx-auto h-[107px] w-[403px]', className)}
    >
      <Button
        variant="load"
        className="h-[107px] w-[403px]"
        onClick={onLoadMore}
        disabled={isComplete || isLoading}
        aria-label={isComplete ? 'Você já viu tudo' : 'Carregar mais itens'}
        aria-busy={isLoading}
      >
        <Button.Progress value={isComplete ? 100 : progress} />
        <Button.Label variant="load">
          {isComplete ? 'Você já viu tudo' : 'Carregar mais'}
        </Button.Label>
      </Button>
    </section>
  );
}
