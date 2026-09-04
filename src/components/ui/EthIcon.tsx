import Image from 'next/image';
import { cn } from '@/lib/utils';

type EthIconProps = {
  className?: string;
  size?: number;
};

export function EthIcon({ className, size = 29 }: EthIconProps) {
  return (
    <Image
      src="/icons/eth.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={cn('shrink-0', className)}
    />
  );
}
