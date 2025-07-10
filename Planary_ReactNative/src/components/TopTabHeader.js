import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { routes } from '../navigation/routers';

export default function TopTabHeader({ selected, onSelect }) {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.leftTabs}>
          {routes.map((route) => (
            <TouchableOpacity key={route.key} onPress={() => onSelect(route.key)}>
              <Text
                style={[
                  styles.tabText,
                  selected === route.key && styles.activeTab,
                ]}
              >
                {route.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.rightIcons}>
          <Ionicons name="search-outline" size={22} style={styles.icon} />
          <Ionicons name="menu-outline" size={26} style={styles.icon} />
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
    paddingHorizontal: 4,
    color: '#000',
  },
});