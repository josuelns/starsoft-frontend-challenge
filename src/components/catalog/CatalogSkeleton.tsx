import styles from './CatalogSkeleton.module.scss';

type CatalogSkeletonProps = {
  count?: number;
  className?: string;
};

function cx(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function CatalogSkeleton({ count = 8, className }: CatalogSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Carregando catálogo de NFTs"
      className={cx(styles.grid, className)}
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={styles.item} />
      ))}
    </div>
  );
}
