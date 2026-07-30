import { create } from 'zustand';

interface WishlistState {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlist: ['prod-1'], // Initial wishlist containing 'prod-1'
  toggleWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.includes(id)
        ? state.wishlist.filter((itemId) => itemId !== id)
        : [...state.wishlist, id],
    })),
}));
