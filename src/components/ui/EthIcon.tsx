import { cn } from '@/lib/utils';

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
      className={cn('shrink-0', className)}
    >
      <path
        d="M14.5 4.5V12.2L21.2 15.8L14.5 4.5Z"
        className="fill-brand-eth-light"
      />
      <path d="M14.5 4.5L7.8 15.8L14.5 12.2V4.5Z" className="fill-brand-eth" />
      <path
        d="M14.5 17.4V24.5L21.2 15.8L14.5 17.4Z"
        className="fill-brand-eth-light"
      />
      <path
        d="M14.5 24.5V17.4L7.8 15.8L14.5 24.5Z"
        className="fill-brand-eth"
      />
      <path
        d="M14.5 12.2L21.2 15.8L14.5 17.4V12.2Z"
        className="fill-brand-eth-dark/50"
      />
      <path
        d="M14.5 12.2L7.8 15.8L14.5 17.4V12.2Z"
        className="fill-brand-eth-dark"
      />
    </svg>
  );
}
