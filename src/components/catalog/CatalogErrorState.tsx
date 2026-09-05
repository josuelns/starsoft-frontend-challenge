import { Button } from '@/components/ui/Button';
import styles from './CatalogErrorState.module.scss';

type CatalogErrorStateProps = {
  onRetry?: () => void;
  className?: string;
};

function cx(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function CatalogErrorState({ onRetry, className }: CatalogErrorStateProps) {
  return (
    <section
      aria-live="polite"
      className={cx(styles.section, className)}
    >
      <h2 className={styles.heading}>Não foi possível carregar os NFTs</h2>
      <p className={styles.text}>Verifique sua conexão e tente novamente.</p>
      {onRetry ? (
        <Button variant="buy" className={styles.retryButton} onClick={onRetry}>
          <Button.Label>Tentar novamente</Button.Label>
        </Button>
      ) : null}
    </section>
  );
}
