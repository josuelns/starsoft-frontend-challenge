import styles from './EthIcon.module.scss';

type EthIconProps = {
  className?: string;
  size?: number;
};

export function EthIcon({ className, size = 29 }: EthIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={[styles.icon, className].filter(Boolean).join(' ')}
    >
      <path d="M14.5 4.5V12.2L21.2 15.8L14.5 4.5Z" className={styles.pathLight} />
      <path d="M14.5 4.5L7.8 15.8L14.5 12.2V4.5Z" className={styles.pathDark} />
      <path d="M14.5 17.4V24.5L21.2 15.8L14.5 17.4Z" className={styles.pathLight} />
      <path d="M14.5 24.5V17.4L7.8 15.8L14.5 24.5Z" className={styles.pathDark} />
      <path d="M14.5 12.2L21.2 15.8L14.5 17.4V12.2Z" className={styles.pathMidLight} />
      <path d="M14.5 12.2L7.8 15.8L14.5 17.4V12.2Z" className={styles.pathMid} />
    </svg>
  );
}
