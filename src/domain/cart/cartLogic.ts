import type { CartItem, Nft } from '@/domain/nft/types';

export function addProductToCart(items: CartItem[], nft: Nft): CartItem[] {
  const existingLine = items.find((line) => line.item.id === nft.id);

  if (existingLine) {
    return items.map((line) =>
      line.item.id === nft.id
        ? { ...line, quantity: line.quantity + 1 }
        : line,
    );
  }

  return [...items, { item: nft, quantity: 1 }];
}

export function removeProductFromCart(
  items: CartItem[],
  productId: string,
): CartItem[] {
  const targetLine = items.find((line) => line.item.id === productId);

  if (!targetLine) return items;

  if (targetLine.quantity <= 1) {
    return items.filter((line) => line.item.id !== productId);
  }

  return items.map((line) =>
    line.item.id === productId
      ? { ...line, quantity: line.quantity - 1 }
      : line,
  );
}

export function removeProductLineFromCart(
  items: CartItem[],
  productId: string,
): CartItem[] {
  return items.filter((line) => line.item.id !== productId);
}

export function setProductQuantityInCart(
  items: CartItem[],
  productId: string,
  quantity: number,
): CartItem[] {
  const targetLine = items.find((line) => line.item.id === productId);

  if (!targetLine) return items;

  if (!Number.isFinite(quantity) || quantity <= 0) {
    return items.filter((line) => line.item.id !== productId);
  }

  const safeQuantity = Math.min(Math.max(1, Math.floor(quantity)), 999);

  return items.map((line) =>
    line.item.id === productId
      ? { ...line, quantity: safeQuantity }
      : line,
  );
}

export function calculateTotalPrice(items: CartItem[]): number {
  return items.reduce(
    (sum, line) => sum + Number.parseFloat(line.item.price) * line.quantity,
    0,
  );
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, line) => sum + line.quantity, 0);
}

export function formatCartTotal(totalPrice: number): string {
  return Number.isInteger(totalPrice)
    ? totalPrice.toString()
    : totalPrice.toFixed(2);
}
