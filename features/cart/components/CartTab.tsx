import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { TabName } from '@/features/navigation/components/CustomBottomTabNavigation';

interface CartTabProps {
  setActiveTab: (tab: TabName) => void;
}

export default function CartTab({ setActiveTab }: CartTabProps) {
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

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
                    onPress={() => removeFromCart(item.product.id)}
                  >
                    <Text style={styles.quantityBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityBtn}
                    onPress={() => addToCart(item.product)}
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
});
