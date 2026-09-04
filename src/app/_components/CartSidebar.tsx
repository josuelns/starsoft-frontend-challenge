'use client';

import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartItem } from '@/components/cart/CartItem';
import type { ShowcaseNftItem } from '@/app/_data/showcase-data';

type CartSidebarProps = {
  items: ShowcaseNftItem[];
  total: string;
};

export function CartSidebar({ items, total }: CartSidebarProps) {
  return (
    <CartDrawer>
      <CartDrawer.Header>
        <CartDrawer.Back />
        <CartDrawer.Title>Mochila de Compras</CartDrawer.Title>
      </CartDrawer.Header>
      <CartDrawer.Body className="flex flex-col gap-6">
        {items.map((item) => (
          <CartItem key={item.id} layout="full">
            <CartItem.Image src={item.imageSrc} alt={item.imageAlt} />
            <CartItem.Content>
              <CartItem.Title>{item.title}</CartItem.Title>
              <CartItem.Description className="mt-[5px]">
                {item.description}
              </CartItem.Description>
              <CartItem.Price className="mt-[16px]" value={item.price} />
              <CartItem.Actions>
                <CartItem.Quantity value="1" />
                <CartItem.Remove />
              </CartItem.Actions>
            </CartItem.Content>
          </CartItem>
        ))}
      </CartDrawer.Body>
      <CartDrawer.Footer>
        <CartDrawer.Total value={total} />
        <CartDrawer.FinishButton />
      </CartDrawer.Footer>
    </CartDrawer>
  );
}
