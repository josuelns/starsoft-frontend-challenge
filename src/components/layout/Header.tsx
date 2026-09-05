import { forwardRef } from 'react';
import Image from 'next/image';
import { IBM_Plex_Sans } from 'next/font/google';
import { MARKETPLACE_MAX_WIDTH_CLASS } from '@/components/layout/marketplace-layout';
import { cn } from '@/lib/utils';

const cartCountFont = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400'],
});

type HeaderProps = {
  cartCount: number;
  onCartClick: () => void;
  className?: string;
};

export const Header = forwardRef<HTMLButtonElement, HeaderProps>(
  function Header({ cartCount, onCartClick, className }, ref) {
    return (
      <header
        className={cn(
          'box-border h-[100px] w-full border-b border-white/21 bg-brand-dark-bg',
          className,
        )}
      >
        <div
          className={cn(
            'relative mx-auto h-full w-full',
            MARKETPLACE_MAX_WIDTH_CLASS,
          )}
        >
          <Image
            src="/icons/logo.svg"
            alt="Starsoft"
            width={101}
            height={38}
            priority
            className="absolute top-[33px] left-[41px] h-[38px] w-[101px] shrink-0"
          />
          <button
            ref={ref}
            type="button"
            aria-label={`Abrir mochila de compras${cartCount > 0 ? `, ${cartCount} itens` : ''}`}
            onClick={onCartClick}
            className="group absolute top-[23.5px] right-[43px] flex h-[53px] min-w-[74px] cursor-pointer items-center gap-[8px]"
          >
            <Image
              src="/icons/cart.svg"
              alt=""
              aria-hidden="true"
              width={33}
              height={33}
              className="h-[33px] w-[33px] shrink-0 transition-opacity duration-300 group-hover:opacity-70"
            />
            <span
              className={cn(
                cartCountFont.className,
                'min-w-[12px] text-[20px] leading-none font-normal tracking-[-0.29px] text-brand-gray-light tabular-nums',
              )}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </header>
    );
  },
);
