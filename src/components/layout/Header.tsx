import { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IBM_Plex_Sans } from 'next/font/google';
import styles from './Header.module.scss';

const cartCountFont = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400'],
});

type HeaderProps = {
  cartCount: number;
  onCartClick: () => void;
  className?: string;
};

function cx(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export const Header = forwardRef<HTMLButtonElement, HeaderProps>(
  function Header({ cartCount, onCartClick, className }, ref) {
    return (
      <header className={cx(styles.header, className)}>
        <div className={styles.container}>
          <Link href="/" aria-label="Ir para o marketplace" className={styles.logoLink}>
            <Image
              src="/icons/logo.svg"
              alt="Starsoft"
              width={101}
              height={38}
              priority
              className={styles.logo}
            />
          </Link>
          <button
            ref={ref}
            type="button"
            aria-label={`Abrir mochila de compras${cartCount > 0 ? `, ${cartCount} itens` : ''}`}
            onClick={onCartClick}
            className={styles.cartButton}
          >
            <Image
              src="/icons/cart.svg"
              alt=""
              aria-hidden="true"
              width={33}
              height={33}
              className={styles.cartIcon}
            />
            <span className={cx(cartCountFont.className, styles.cartCount)}>
              {cartCount}
            </span>
          </button>
        </div>
      </header>
    );
  },
);
