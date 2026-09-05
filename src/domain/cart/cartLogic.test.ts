import type { CartItem, Nft } from '@/domain/nft/types';
import {
  addProductToCart,
  calculateTotalPrice,
  formatCartTotal,
  getCartItemCount,
  removeProductFromCart,
  removeProductLineFromCart,
  setProductQuantityInCart,
} from '@/domain/cart/cartLogic';
import { createMockNft } from '@/test-utils/fixtures/nft';

const sampleNft: Nft = createMockNft({ id: '32', price: '32' });
const sampleNftB: Nft = createMockNft({ id: '12', price: '12' });

describe('cartLogic', () => {
  describe('addProductToCart', () => {
    it('adiciona item novo com quantidade 1', () => {
      expect(addProductToCart([], sampleNft)).toEqual([
        { item: sampleNft, quantity: 1 },
      ]);
    });

    it('incrementa quantidade quando o id já existe', () => {
      const items: CartItem[] = [{ item: sampleNft, quantity: 1 }];

      expect(addProductToCart(items, sampleNft)).toEqual([
        { item: sampleNft, quantity: 2 },
      ]);
    });
  });

  describe('removeProductFromCart', () => {
    it('decrementa quantidade quando maior que 1', () => {
      const items: CartItem[] = [{ item: sampleNft, quantity: 2 }];

      expect(removeProductFromCart(items, '32')).toEqual([
        { item: sampleNft, quantity: 1 },
      ]);
    });

    it('remove linha quando quantidade é 1', () => {
      const items: CartItem[] = [{ item: sampleNft, quantity: 1 }];

      expect(removeProductFromCart(items, '32')).toEqual([]);
    });

    it('não altera lista quando id não existe', () => {
      const items: CartItem[] = [{ item: sampleNft, quantity: 1 }];

      expect(removeProductFromCart(items, '999')).toEqual(items);
    });
  });

  describe('removeProductLineFromCart', () => {
    it('remove linha inteira independente da quantidade', () => {
      const items: CartItem[] = [{ item: sampleNft, quantity: 3 }];

      expect(removeProductLineFromCart(items, '32')).toEqual([]);
    });
  });

  describe('setProductQuantityInCart', () => {
    it('atualiza quantidade quando valor é válido', () => {
      const items: CartItem[] = [{ item: sampleNft, quantity: 2 }];

      expect(setProductQuantityInCart(items, '32', 9)).toEqual([
        { item: sampleNft, quantity: 9 },
      ]);
    });

    it('limita quantidade máxima em 999', () => {
      const items: CartItem[] = [{ item: sampleNft, quantity: 2 }];

      expect(setProductQuantityInCart(items, '32', 1500)).toEqual([
        { item: sampleNft, quantity: 999 },
      ]);
    });

    it('remove linha quando quantidade é 0', () => {
      const items: CartItem[] = [{ item: sampleNft, quantity: 2 }];

      expect(setProductQuantityInCart(items, '32', 0)).toEqual([]);
    });
  });

  describe('calculateTotalPrice', () => {
    it('soma preço x quantidade de múltiplos itens', () => {
      const items: CartItem[] = [
        { item: sampleNft, quantity: 2 },
        { item: sampleNftB, quantity: 1 },
      ];

      expect(calculateTotalPrice(items)).toBe(76);
    });
  });

  describe('getCartItemCount', () => {
    it('soma quantidades, não número de linhas', () => {
      const items: CartItem[] = [
        { item: sampleNft, quantity: 2 },
        { item: sampleNftB, quantity: 1 },
      ];

      expect(getCartItemCount(items)).toBe(3);
    });
  });

  describe('formatCartTotal', () => {
    it('formata inteiro sem casas decimais', () => {
      expect(formatCartTotal(64)).toBe('64');
    });

    it('formata decimal com 2 casas', () => {
      expect(formatCartTotal(44.5)).toBe('44.50');
    });
  });
});
