import { CartItem } from '@/components/cart/CartItem';
import type { ShowcaseNftItem } from '@/app/_data/showcase-data';

type CartCompactShowcaseProps = {
  item: ShowcaseNftItem;
};

export function CartCompactShowcase({ item }: CartCompactShowcaseProps) {
  return (
    <section aria-labelledby="cart-compact-heading">
      <h2
        id="cart-compact-heading"
        className="mb-4 font-sans text-xl font-semibold text-brand-gray-light"
      >
        CartItem compacto
      </h2>
      <CartItem layout="compact" className="max-w-xl">
        <CartItem.Image
          src={item.imageSrc}
          alt={item.imageAlt}
          className="!h-20 !w-20"
        />
        <CartItem.Content className="ml-4">
          <CartItem.Title>{item.title}</CartItem.Title>
          <CartItem.Price value={item.price} />
        </CartItem.Content>
        <CartItem.Remove />
      </CartItem>
    </section>
  );
}
