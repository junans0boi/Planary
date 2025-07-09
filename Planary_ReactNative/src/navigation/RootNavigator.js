// src/navigation/RootNavigator.js
import React from 'react';
import { useWindowDimensions, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CalendarScreen from '../screens/CalendarScreen';
import TodoScreen     from '../screens/TodoScreen';
import DiaryScreen    from '../screens/DiaryScreen';

const Tab   = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// 모바일: 하단 탭
function MobileTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="ToDo"     component={TodoScreen} />
      <Tab.Screen name="Diary"    component={DiaryScreen} />
    </Tab.Navigator>
  );
}

// 웹/데스크탑: 사이드바
function DesktopDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'permanent',
        headerShown: false,
        drawerStyle: { width: 240 },
      }}
    >
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
      <Drawer.Screen name="ToDo"     component={TodoScreen} />
      <Drawer.Screen name="Diary"    component={DiaryScreen} />
    </Drawer.Navigator>
  );
}

export default function RootNavigator() {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 768;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {isDesktop ? <DesktopDrawer /> : <MobileTabs />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}