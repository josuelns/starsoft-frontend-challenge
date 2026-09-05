import { cn } from '@/lib/utils';

type CatalogSkeletonProps = {
  count?: number;
  className?: string;
};

export function CatalogSkeleton({ count = 8, className }: CatalogSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Carregando catálogo de NFTs"
      className={cn(
        'mx-auto grid w-full max-w-[1455px] gap-[25px]',
        'grid-cols-[repeat(4,345px)] justify-center',
        'max-[1502px]:grid-cols-[repeat(2,345px)]',
        'max-[762px]:grid-cols-[repeat(1,345px)]',
        className,
      )}
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="box-border h-[533px] w-[345px] shrink-0 animate-pulse rounded bg-brand-card-bg"
        />
      ))}
    </div>
  );
}
