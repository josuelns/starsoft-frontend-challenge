import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  addProductToCart,
  calculateTotalPrice,
  removeProductFromCart,
  setProductQuantityInCart,
} from '@/domain/cart/cartLogic';
import type { CartItem, Nft } from '@/domain/nft/types';

export type CartState = {
  items: CartItem[];
  totalPrice: number;
  isOpen: boolean;
};

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    addProduct(state, action: PayloadAction<Nft>) {
      state.items = addProductToCart(state.items, action.payload);
      state.totalPrice = calculateTotalPrice(state.items);
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.items = removeProductFromCart(state.items, action.payload);
      state.totalPrice = calculateTotalPrice(state.items);
    },
    setProductQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) {
      state.items = setProductQuantityInCart(
        state.items,
        action.payload.id,
        action.payload.quantity,
      );
      state.totalPrice = calculateTotalPrice(state.items);
    },
    clearCart() {
      return initialState;
    },
  },
});

export const { toggleCart, addProduct, removeProduct, setProductQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
