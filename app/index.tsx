import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWishlistStore } from '@/hooks/useWishlistStore';
import CategoriesSection from './Components/CategoriesSection';
import CustomBottomTabNavigation, { TabName } from './Components/CustomBottomTabNavigation';
import Header from './Components/Header';
import ProductCard, { Product } from './Components/ProductCard';
import SearchBar from './Components/SearchBar';

const { width } = Dimensions.get('window');
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

interface CartItem {
  product: Product;
  quantity: number;
}

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<TabName>('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  };
  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };
  const renderHomeTab = () => (
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
          <TouchableOpacity   //to make 4kl el click  or Effect
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
                  onAddToCart={() => handleAddToCart(prod)}
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

  const renderPlaceholderTab = (label: string) => (
    <View style={styles.placeholderPage}>
      <Text style={styles.placeholderPageText}>{label}</Text>
    </View>
  );

  const renderCartTab = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
      <View style={styles.tabScreenContainer}>
        <Text style={styles.tabScreenTitle}>My Cart</Text>
        {cartItems.length > 0 ? (
          <View style={styles.cartContainer}>
            <ScrollView style={styles.cartItemsScroll} showsVerticalScrollIndicator={false}>
              {cartItems.map((item) => (
                <View key={item.product.id} style={styles.cartItemRow}>
                  <Image source={item.product.image} style={styles.cartItemImage} />
                  <View style={styles.cartItemDetails}>
                    <Text style={styles.cartItemTitle}>{item.product.title}</Text>
                    <Text style={styles.cartItemPrice}>${item.product.price}</Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityBtn}
                      onPress={() => handleRemoveFromCart(item.product.id)}
                    >
                      <Text style={styles.quantityBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityBtn}
                      onPress={() => handleAddToCart(item.product)}
                    >
                      <Text style={styles.quantityBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.checkoutFooter}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total:</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.8}>
                <Text style={styles.checkoutBtnText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Text style={styles.emptyIcon}>🛒</Text>
            </View>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyDesc}>Add items to start shopping!</Text>
            <TouchableOpacity style={styles.shopNowBtn} onPress={() => setActiveTab('Home')}>
              <Text style={styles.shopNowBtnText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderWishlistTab = () => {
    const wishlistedProducts = ALL_PRODUCTS.filter((p) => wishlist.includes(p.id));

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
                      onAddToCart={() => handleAddToCart(prod)}
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
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Home':
        return renderHomeTab();
      case 'Shop':
        return renderPlaceholderTab('Shop');
      case 'Cart':
        return renderCartTab();
      case 'Wishlist':
        return renderWishlistTab();
      case 'Profile':
        return renderPlaceholderTab('Profile');
      default:
        return renderHomeTab();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.pageContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Header
              userName="Sarah"
              cartCount={cartCount}
              hasNotifications={true}
              onCartPress={() => setActiveTab('Cart')}
              onNotificationPress={() => console.log('Notifications pressed')}
            />
          </View>
          <View style={styles.searchBar}>
            <SearchBar
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
        </View>

        <View style={styles.tabContentContainer}>
          {renderTabContent()}
        </View>
        <CustomBottomTabNavigation
          activeTab={activeTab}
          onTabPress={(tab) => setActiveTab(tab)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E2E9',
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    gap: 12,
  },
  header: {},
  searchBar: {},
  tabContentContainer: {
    flex: 1,
    backgroundColor: '#F5F5FA',
  },
  body: {
    flex: 1,
    backgroundColor: '#F5F5FA',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 90, // extra padding 3l4an t avoid bottom tab overlap
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
  placeholderPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5FA',
  },
  placeholderPageText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1F2E',
  },
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
  emptyStateText: {
    fontSize: 14,
    color: '#8C8C9E',
    textAlign: 'center',
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
  cartContainer: {
    flex: 1,
  },
  cartItemsScroll: {
    flex: 1,
  },
  cartItemRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFEFF4',
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F5F5FA',
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  cartItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1F2E',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6D3FF3',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5FA',
    borderRadius: 20,
    padding: 4,
  },
  quantityBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quantityBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1F2E',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1F2E',
    paddingHorizontal: 12,
  },
  checkoutFooter: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 80,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8C8C9E',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1F2E',
  },
  checkoutBtn: {
    backgroundColor: '#6D3FF3',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});