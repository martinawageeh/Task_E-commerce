import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  userName?: string;
  cartCount: number;
  hasNotifications?: boolean;
  onCartPress?: () => void;
  onNotificationPress?: () => void;
}

export default function Header({
  userName = "Sarah",
  cartCount,
  hasNotifications = true,
  onCartPress,
  onNotificationPress,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.welcomeText}>WELCOME BACK,</Text>
        <Text style={styles.userNameText}>{userName} 👋</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={22} color="#1E1F2E" />
          {hasNotifications && <View style={styles.notificationBadge} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onCartPress} activeOpacity={0.7}>
          <Ionicons name="cart-outline" size={22} color="#1E1F2E" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartCount > 99 ? '99+' : cartCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  greetingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontSize: 11,
    color: '#8C8C9E',
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  userNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1F2E',
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDEDF5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 11,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4757',
    borderWidth: 1.5,
    borderColor: '#F1F2F7',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#7F57F1',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
