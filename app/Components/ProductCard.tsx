import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: any;
  category?: string;
  rating?: number;
  reviewsCount?: number;
}

interface ProductCardProps {
  product: Product;
  variant?: 'featured' | 'flash';
  isWishlisted?: boolean;
  onPress?: () => void;
  onWishlistToggle?: () => void;
  onAddToCart?: () => void;
}

export default function ProductCard({
  product,     //data ely gaya deh fkrt el props(Destruction)
  variant = 'featured',
  isWishlisted = false,
  onPress,
  onWishlistToggle,
  onAddToCart,
}: ProductCardProps) {
  const renderStars = (rating: number = 5) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={[styles.star, i <= rating ? styles.starFilled : styles.starEmpty]}>
          ★
        </Text>
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  if (variant === 'flash') {
    return (
      <TouchableOpacity
        style={styles.flashCard}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={styles.flashImageContainer}>
          <Image source={product.image} style={styles.flashImage} resizeMode="cover" />
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}</Text>
            </View>
          )}
        </View>

        <View style={styles.flashInfoContainer}>
          <Text style={styles.flashTitle} numberOfLines={1}>
            {product.title}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.flashPrice}>${product.price}</Text>
            {product.oldPrice && (
              <Text style={styles.oldPrice}>${product.oldPrice}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.featuredImageContainer}>
        <Image source={product.image} style={styles.featuredImage} resizeMode="cover" />
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.heartButton}
          onPress={onWishlistToggle}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={18}
            color={isWishlisted ? '#FF4757' : '#8C8C9E'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.featuredInfoContainer}>
        {product.category && (
          <Text style={styles.categoryText}>{product.category}</Text>
        )}
        <Text style={styles.featuredTitle} numberOfLines={1}>
          {product.title}
        </Text>
        <View style={styles.ratingRow}>
          {renderStars(product.rating)}
          {product.reviewsCount !== undefined && (
            <Text style={styles.reviewsCountText}>({product.reviewsCount})</Text>
          )}
        </View>
        <View style={styles.footerRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.featuredPrice}>${product.price}</Text>
            {product.oldPrice && (
              <Text style={styles.oldPrice}>${product.oldPrice}</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={onAddToCart}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF3B30',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  oldPrice: {
    color: '#8C8C9E',
    fontSize: 11,
    textDecorationLine: 'line-through',
    marginLeft: 4,
    fontWeight: '500',
  },
  flashCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 140,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#EFEFF4',
    overflow: 'hidden',
  },
  flashImageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F5F5FA',
  },
  flashImage: {
    width: '100%',
    height: '100%',
  },
  flashInfoContainer: {
    marginTop: 8,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  flashTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1F2E',
    marginBottom: 4,
  },
  flashPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6D3FF3',
  },
  featuredCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flex: 1,
    margin: 6,
    borderWidth: 1,
    borderColor: '#EFEFF4',
    overflow: 'hidden',
  },
  featuredImageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F5F5FA',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featuredInfoContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  categoryText: {
    color: '#8C8C9E',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: 2,
  },
  featuredTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1F2E',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  star: {
    fontSize: 15,
  },
  starFilled: {
    color: '#FFB900',

  },
  starEmpty: {
    color: '#D1D1D6',
  },
  reviewsCountText: {
    fontSize: 11,
    color: '#8C8C9E',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6D28D9',
  },
  addButton: {
    backgroundColor: '#6D28D9',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});