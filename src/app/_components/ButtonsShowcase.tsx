'use client';

import { Button } from '@/components/ui/Button';

export function ButtonsShowcase() {
  return (
    <section aria-labelledby="buttons-heading">
      <h2
        id="buttons-heading"
        className="mb-4 font-sans text-xl font-semibold text-brand-gray-light"
      >
        Botões
      </h2>
      <div className="flex flex-wrap items-end gap-6">
        <Button variant="buy" className="w-[296px]">
          <Button.Label>COMPRAR</Button.Label>
        </Button>
        <Button variant="finish" className="w-[320px]">
          <Button.Label variant="finish">FINALIZAR COMPRA</Button.Label>
        </Button>
        <Button variant="load" className="w-[403px]">
          <Button.Progress value={47} />
          <Button.Label variant="load">Carregar mais</Button.Label>
        </Button>
        <Button variant="buy" className="w-[296px]" disabled aria-label="Carregando">
          <Button.Spinner />
        </Button>
      </div>
    </section>
  );
}
