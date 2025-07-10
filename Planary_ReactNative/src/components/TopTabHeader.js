// src/components/TopTabHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { routes } from '../navigation/routers';
import { useNavigation } from '@react-navigation/native';

export default function TopTabHeader({ selected, onSelect }) {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 768;

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.leftTabs}>
          {!isDesktop ? (
            routes.map((route) => (
              <TouchableOpacity key={route.key} onPress={() => onSelect(route.key)}>
                <Text style={[styles.tabText, selected === route.key && styles.activeTab]}>
                  {route.label}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.logo}>Planary</Text>
          )}
        </View>

        <View style={styles.rightIcons}>
          {/* 모바일: 검색 + 햄버거 */}
          {!isDesktop && (
            <>
              <TouchableOpacity>
                <Ionicons name="search-outline" size={22} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu-outline" size={26} style={styles.icon} />
              </TouchableOpacity>
            </>
          )}
          {/* PC: 동기화 + 알림 + 프로필 */}
          {isDesktop && (
            <>
              <Ionicons name="sync-outline" size={22} style={styles.icon} />
              <Ionicons name="notifications-outline" size={22} style={styles.icon} />
              <Ionicons name="person-circle-outline" size={26} style={styles.icon} />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  leftTabs: {
    flexDirection: 'row',
    gap: 16,
  },
  tabText: {
    fontSize: 18,
    color: '#aaa',
    fontWeight: '500',
  },
  activeTab: {
    color: '#000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  rightIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  icon: {
    color: '#000',
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
});