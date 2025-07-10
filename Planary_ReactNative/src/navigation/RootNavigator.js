import React, { useState } from 'react';
import { useWindowDimensions, Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { routes } from './routers';
import TopTabHeader from '../components/TopTabHeader';

const Drawer = createDrawerNavigator();

function DesktopDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ drawerType: 'permanent', headerShown: false }}>
      {routes.map((route) => (
        <Drawer.Screen
          key={route.key}
          name={route.key}
          component={route.screen}
        />
      ))}
    </Drawer.Navigator>
  );
}

export default function RootNavigator() {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 768;
  const [selectedTab, setSelectedTab] = useState(routes[0].key);

  const CurrentScreen = routes.find((r) => r.key === selectedTab)?.screen;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {isDesktop ? (
          <DesktopDrawer />
        ) : (
          <View style={{ flex: 1 }}>
            <TopTabHeader selected={selectedTab} onSelect={setSelectedTab} />
            <CurrentScreen />
          </View>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}