import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NftNotFound() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>NFT não encontrado</h1>
      <p className={styles.text}>
        O item que você procura não existe ou foi removido do catálogo.
      </p>
      <Link href="/" className={styles.backLink}>
        Voltar ao marketplace
      </Link>
    </main>
  );
}
