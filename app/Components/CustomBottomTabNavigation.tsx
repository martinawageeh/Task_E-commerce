import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TabName = 'Home' | 'Shop' | 'Cart' | 'Wishlist' | 'Profile';

interface TabItem {
  name: TabName;
  label: string;
  icon: React.ComponentProps<typeof Feather>['name'];
}

interface CustomBottomTabNavigationProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

const TABS: TabItem[] = [
  { name: 'Home', label: 'Home', icon: 'home' },
  { name: 'Shop', label: 'Shop', icon: 'shopping-bag' },
  { name: 'Cart', label: 'Cart', icon: 'shopping-cart' },
  { name: 'Wishlist', label: 'Wishlist', icon: 'heart' },
  { name: 'Profile', label: 'Profile', icon: 'user' },
];

export default function CustomBottomTabNavigation({
  activeTab,
  onTabPress,
}: CustomBottomTabNavigationProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => onTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <Feather
              name={tab.icon as any}
              size={22}
              color={isActive ? '#6D3FF3' : '#8C8C9E'}
              style={styles.icon}
            />
            <Text style={[styles.tabLabel, isActive ? styles.activeLabel : styles.inactiveLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E2E9',
    paddingTop: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    height: 45,
  },
  icon: {
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  activeLabel: {
    color: '#6D3FF3', // Active purple text
  },
  inactiveLabel: {
    color: '#8C8C9E', // Inactive grey text
  },
});
