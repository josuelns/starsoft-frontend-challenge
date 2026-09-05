import { cn } from '@/lib/utils';

type CartEmptyStateProps = {
  className?: string;
};

function CartEmptyBagIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-[72px] w-[72px] text-brand-orange', className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2936 29.5625H21.7719C25.988 29.5625 29.2226 28.0396 28.304 21.9104L27.2341 13.6037C26.6677 10.5453 24.717 9.37482 23.0053 9.37482H9.00985C7.27301 9.37482 5.43548 10.6334 4.78101 13.6037L3.71122 21.9104C2.93091 27.3474 6.07736 29.5625 10.2936 29.5625Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1048 9.07279C10.1048 5.79194 12.7645 3.13228 16.0453 3.13228C17.6252 3.12558 19.1426 3.7485 20.2621 4.86329C21.3817 5.97807 22.011 7.4929 22.011 9.07279"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9675 15.265H12.0304"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.9847 15.265H20.0476"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CartEmptyState({ className }: CartEmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center justify-center gap-6 py-10 text-center',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex h-[140px] w-[140px] items-center justify-center rounded-full bg-brand-gray-dark"
      >
        <CartEmptyBagIcon />
      </div>
      <p className="max-w-[280px] font-sans text-[16px] leading-6 text-brand-gray-medium">
        Sua mochila está vazia.
      </p>
    </div>
  );
}
