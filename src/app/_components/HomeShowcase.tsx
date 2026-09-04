import dynamic from 'next/dynamic';
import type { ShowcaseNftItem } from '@/app/_data/showcase-data';
import { showcasePalette } from '@/app/_data/showcase-data';
import { ButtonsShowcase } from './ButtonsShowcase';
import { CartCompactShowcase } from './CartCompactShowcase';
import { FeaturedNftShowcase } from './FeaturedNftShowcase';

const CartSidebar = dynamic(() =>
  import('./CartSidebar').then((mod) => ({ default: mod.CartSidebar })),
);

type HomeShowcaseProps = {
  featuredNft: ShowcaseNftItem;
  compactCartItem: ShowcaseNftItem;
  cartItems: ShowcaseNftItem[];
  cartTotal: string;
};

export function HomeShowcase({
  featuredNft,
  compactCartItem,
  cartItems,
  cartTotal,
}: HomeShowcaseProps) {
  return (
    <>
      <main className="flex flex-1 flex-col gap-16 px-8 py-12 pr-[711px]">
        <header>
          <h1 className="font-sans text-3xl font-semibold text-brand-gray-light">
            Starsoft NFT Marketplace
          </h1>
          <p className="mt-2 font-sans text-brand-gray-medium">
            Showcase de componentes — fidelidade ao design FigJam
          </p>
        </header>

        <section aria-labelledby="palette-heading">
          <h2
            id="palette-heading"
            className="mb-4 font-sans text-xl font-semibold text-brand-gray-light"
          >
            Paleta
          </h2>
          <div className="flex flex-wrap gap-4">
            {showcasePalette.map((color) => (
              <div key={color.name} className="text-center">
                <div
                  className={`h-[72px] w-[72px] rounded border border-brand-gray-dark ${color.className}`}
                />
                <p className="mt-2 font-sans text-xs text-brand-gray-medium">
                  {color.hex}
                </p>
              </div>
            ))}
          </div>
        </section>

        <ButtonsShowcase />
        <FeaturedNftShowcase nft={featuredNft} />
        <CartCompactShowcase item={compactCartItem} />
      </main>

      <CartSidebar items={cartItems} total={cartTotal} />
    </>
  );
}
