import { create } from 'zustand';
import { Product, CartItem } from '@/features/products/types';

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.cartItems.find((item) => item.product.id === product.id);
      if (existing) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cartItems: [...state.cartItems, { product, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const existing = state.cartItems.find((item) => item.product.id === productId);
      if (existing && existing.quantity > 1) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
      return { cartItems: state.cartItems.filter((item) => item.product.id !== productId) };
    }),
}));
