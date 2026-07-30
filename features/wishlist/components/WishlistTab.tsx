import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProductCard from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/types';
import { useWishlistStore } from '@/features/wishlist/store/useWishlistStore';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { TabName } from '@/features/navigation/components/CustomBottomTabNavigation';

const ALL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    category: 'Fashion',
    title: 'Air Jordan 1 Retro High',
    price: 149,
    oldPrice: 199,
    discount: '-25%',
    rating: 5,
    reviewsCount: 234,
    image: require('@/assets/images/Image (Air Jordan 1 Retro High).png'),
  },
  {
    id: 'prod-2',
    category: 'Electronics',
    title: 'Premium Smart Watch',
    price: 299,
    rating: 5,
    reviewsCount: 567,
    image: require('@/assets/images/smartWatch.png'),
  },
  {
    id: 'prod-3',
    category: 'Beauty',
    title: 'Luxury Face Cream',
    price: 89,
    oldPrice: 120,
    discount: '-26%',
    rating: 5,
    reviewsCount: 128,
    image: require('@/assets/images/Image (Luxury Face Cream).png'),
  },
  {
    id: 'prod-4',
    category: 'Home',
    title: 'Modern Velvet Sofa',
    price: 1299,
    rating: 5,
    reviewsCount: 89,
    image: require('@/assets/images/Image (Modern Velvet Sofa).png'),
  },
];

interface WishlistTabProps {
  setActiveTab: (tab: TabName) => void;
}

export default function WishlistTab({ setActiveTab }: WishlistTabProps) {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const addToCart = useCartStore((state) => state.addToCart);

  const wishlistedProducts = ALL_PRODUCTS.filter((p) => wishlist.includes(p.id));

  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <View style={styles.tabScreenContainer}>
      <Text style={styles.tabScreenTitle}>My Wishlist</Text>
      {wishlistedProducts.length > 0 ? (
        <ScrollView style={styles.tabScroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.tabScrollContent}>
          <View style={styles.gridContainer}>
            {chunkArray(wishlistedProducts, 2).map((row, rowIndex) => (
              <View key={rowIndex} style={styles.gridRow}>
                {row.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    variant="featured"
                    isWishlisted={true}
                    onWishlistToggle={() => toggleWishlist(prod.id)}
                    onAddToCart={() => addToCart(prod)}
                  />
                ))}
                {row.length === 1 && <View style={styles.placeholderCard} />}
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconCircle}>
            <Text style={styles.emptyIcon}>❤️</Text>
          </View>
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptyDesc}>Save your favorite products here!</Text>
          <TouchableOpacity style={styles.shopNowBtn} onPress={() => setActiveTab('Home')}>
            <Text style={styles.shopNowBtnText}>Explore Products</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabScreenContainer: {
    flex: 1,
    backgroundColor: '#F5F5FA',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tabScreenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E1F2E',
    marginBottom: 16,
  },
  tabScroll: {
    flex: 1,
  },
  tabScrollContent: {
    paddingBottom: 90,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 60,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFEFF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyIcon: {
    fontSize: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1F2E',
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    color: '#8C8C9E',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopNowBtn: {
    backgroundColor: '#6D3FF3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  shopNowBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  gridContainer: {
    width: '100%',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  placeholderCard: {
    flex: 1,
    margin: 6,
  },
});
