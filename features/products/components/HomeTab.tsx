import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Product } from '@/features/products/types';
import CategoriesSection from '@/features/products/components/CategoriesSection';
import ProductCard from '@/features/products/components/ProductCard';
import { useWishlistStore } from '@/features/wishlist/store/useWishlistStore';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { TabName } from '@/features/navigation/components/CustomBottomTabNavigation';

const FLASH_SALE_PRODUCTS: Product[] = [
  {
    id: 'flash-1',
    title: 'Air Jordan 1 Retro',
    price: 149,
    oldPrice: 199,
    discount: '-25%',
    image: require('@/assets/images/Image (Air Jordan 1 Retro High).png'),
  },
  {
    id: 'flash-2',
    title: 'Luxury Face Cream',
    price: 89,
    oldPrice: 120,
    discount: '-26%',
    image: require('@/assets/images/Image (Luxury Face Cream).png'),
  },
  {
    id: 'flash-3',
    title: 'Pro Running Shoes',
    price: 129,
    oldPrice: 169,
    discount: '-24%',
    image: require('@/assets/images/Image (Pro Running Shoes).png'),
  },
];

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

interface HomeTabProps {
  setActiveTab: (tab: TabName) => void;
}

export default function HomeTab({ setActiveTab }: HomeTabProps) {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const addToCart = useCartStore((state) => state.addToCart);

  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <ScrollView style={styles.body} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      <View style={styles.banner}>
        <ImageBackground
          source={require('@/assets/images/Image (promo).png')}
          style={styles.bannerImage}
          imageStyle={styles.bannerImageStyle}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.90)', 'rgba(0,0,0,0.40)', 'rgba(0,0,0,0)']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.bannerOverlay}
          >
            <View style={styles.bannerContentContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.subtitleText}>LIMITED OFFER</Text>
                <Text style={styles.titleText}>Beauty Essentials</Text>
                <Text style={styles.descText}>Premium brands</Text>
              </View>
              <View style={styles.indicatorContainer}>
                <View style={styles.dotInactive} />
                <View style={styles.dotInactive} />
                <View style={styles.dotActive} />
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <CategoriesSection />
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Flash Sale</Text>
          <TouchableOpacity
            activeOpacity={0.7} onPress={() => setActiveTab('Shop')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.flashScroll}
        >
          {FLASH_SALE_PRODUCTS.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              variant="flash"
              onPress={() => console.log('Flash sale item pressed', prod.title)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => setActiveTab('Shop')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridContainer}>
          {chunkArray(ALL_PRODUCTS, 2).map((row, rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {row.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  variant="featured"
                  isWishlisted={wishlist.includes(prod.id)}
                  onWishlistToggle={() => toggleWishlist(prod.id)}
                  onAddToCart={() => addToCart(prod)}
                  onPress={() => console.log('Product pressed', prod.title)}
                />
              ))}
              {row.length === 1 && <View style={styles.placeholderCard} />}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#F5F5FA',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  banner: {
    width: '100%',
    height: 160,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 8,
  },
  bannerImage: {
    flex: 1,
  },
  bannerOverlay: {
    flex: 1,
    borderRadius: 24,
    justifyContent: 'flex-end',
    padding: 20,
  },
  bannerImageStyle: {
    borderRadius: 24,
  },
  bannerContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  textContainer: {
    flexDirection: 'column',
  },
  subtitleText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  dotInactive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  dotActive: {
    width: 18,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1F2E',
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6D3FF3',
  },
  flashScroll: {
    marginLeft: -4,
    paddingLeft: 4,
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
