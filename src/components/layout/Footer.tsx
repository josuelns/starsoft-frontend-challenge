import styles from './Footer.module.scss';

type FooterProps = {
  className?: string;
};

function cx(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cx(styles.footer, className)}>
      <p className={styles.text}>STARSOFT © TODOS OS DIREITOS RESERVADOS</p>
    </footer>
  );
}
