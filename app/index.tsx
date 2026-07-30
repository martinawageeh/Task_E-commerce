import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import SearchBar from '@/features/search/components/SearchBar';
import CustomBottomTabNavigation, { TabName } from '@/features/navigation/components/CustomBottomTabNavigation';
import HomeTab from '@/features/products/components/HomeTab';
import CartTab from '@/features/cart/components/CartTab';
import WishlistTab from '@/features/wishlist/components/WishlistTab';
import { useCartStore } from '@/features/cart/store/useCartStore';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<TabName>('Home');
  const [searchQuery, setSearchQuery] = useState('');
  
  const cartItems = useCartStore((state) => state.cartItems);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderPlaceholderTab = (label: string) => (
    <View style={styles.placeholderPage}>
      <Text style={styles.placeholderPageText}>{label}</Text>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeTab setActiveTab={setActiveTab} />;
      case 'Shop':
        return renderPlaceholderTab('Shop');
      case 'Cart':
        return <CartTab setActiveTab={setActiveTab} />;
      case 'Wishlist':
        return <WishlistTab setActiveTab={setActiveTab} />;
      case 'Profile':
        return renderPlaceholderTab('Profile');
      default:
        return <HomeTab setActiveTab={setActiveTab} />;
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
});