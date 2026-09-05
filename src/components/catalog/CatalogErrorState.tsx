import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type CatalogErrorStateProps = {
  onRetry?: () => void;
  className?: string;
};

export function CatalogErrorState({ onRetry, className }: CatalogErrorStateProps) {
  return (
    <section
      aria-live="polite"
      className={cn(
        'mx-auto flex w-full max-w-[620px] flex-col items-center gap-6 rounded bg-brand-card-bg px-8 py-12 text-center',
        className,
      )}
    >
      <h2 className="font-sans text-[20px] font-medium text-brand-gray-light">
        Não foi possível carregar os NFTs
      </h2>
      <p className="font-sans text-[16px] leading-6 text-brand-gray-medium">
        Verifique sua conexão e tente novamente.
      </p>
      {onRetry ? (
        <Button variant="buy" className="h-[56px] w-[240px]" onClick={onRetry}>
          <Button.Label>Tentar novamente</Button.Label>
        </Button>
      ) : null}
    </section>
  );
}
