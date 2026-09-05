import cartReducer, {
  addProduct,
  clearCart,
  removeProduct,
  setProductQuantity,
  toggleCart,
} from '@/store/cartSlice';
import { createMockNft } from '@/test-utils/fixtures/nft';

const sampleNft = createMockNft({ id: '32', price: '32' });

describe('cartSlice', () => {
  it('toggleCart alterna isOpen', () => {
    const open = cartReducer(undefined, toggleCart());

    expect(open.isOpen).toBe(true);

    const closed = cartReducer(open, toggleCart());

    expect(closed.isOpen).toBe(false);
  });

  it('addProduct adiciona item e recalcula totalPrice', () => {
    const state = cartReducer(undefined, addProduct(sampleNft));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.totalPrice).toBe(32);
  });

  it('removeProduct decrementa e recalcula totalPrice', () => {
    let state = cartReducer(undefined, addProduct(sampleNft));
    state = cartReducer(state, addProduct(sampleNft));
    state = cartReducer(state, removeProduct('32'));

    expect(state.items[0].quantity).toBe(1);
    expect(state.totalPrice).toBe(32);
  });

  it('setProductQuantity atualiza quantidade diretamente', () => {
    let state = cartReducer(undefined, addProduct(sampleNft));
    state = cartReducer(
      state,
      setProductQuantity({ id: '32', quantity: 5 }),
    );

    expect(state.items[0].quantity).toBe(5);
    expect(state.totalPrice).toBe(160);
  });

  it('clearCart reseta para estado inicial', () => {
    let state = cartReducer(undefined, toggleCart());
    state = cartReducer(state, addProduct(sampleNft));
    state = cartReducer(state, clearCart());

    expect(state).toEqual({
      items: [],
      totalPrice: 0,
      isOpen: false,
    });
  });
});
