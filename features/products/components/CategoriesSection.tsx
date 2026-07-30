import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TabName } from '@/features/navigation/components/CustomBottomTabNavigation';

const CATEGORIES = [
  {
    id: 'fashion',
    name: 'Fashion',
    image: require('@/assets/images/fashion.png'),
  },
  {
    id: 'electronics',
    name: 'Electronics',
    image: require('@/assets/images/electronics.png'),
  },
  {
    id: 'beauty',
    name: 'Beauty',
    image: require('@/assets/images/beauty.png'),
  },
  {
    id: 'home',
    name: 'Home',
    image: require('@/assets/images/home.png'),
  },
  {
    id: 'sports',
    name: 'Sports',
    image: require('@/assets/images/sports.png'),
  },
];

export default function CategoriesSection() {
  const [activeTab, setActiveTab] = useState<TabName>('Home');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>

        <TouchableOpacity
          activeOpacity={0.7} onPress={() => setActiveTab('Shop')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <Image
                source={category.image}
                style={styles.icon}
              />
            </View>

            <Text style={styles.categoryName}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1F2E',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F57F1',
  },
  scrollContent: {
    paddingRight: 10,
  },
  categoryItem: {
    width: 90,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  categoryName: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1F2E',
    textAlign: 'center',
  },
});
