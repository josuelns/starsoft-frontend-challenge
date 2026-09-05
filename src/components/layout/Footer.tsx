import { footerTextStyles } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        'box-border flex h-[76px] w-full shrink-0 items-center justify-center',
        className,
      )}
    >
      <p className={footerTextStyles}>
        STARSOFT © TODOS OS DIREITOS RESERVADOS
      </p>
    </footer>
  );
}
