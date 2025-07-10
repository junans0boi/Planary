import React, { useState } from 'react';
import { useWindowDimensions, Platform, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { routes } from './routers';
import TopTabHeader from '../components/TopTabHeader';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function RootNavigator() {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= 768;
  const [selectedTab, setSelectedTab] = useState(routes[0].key);

  const CurrentScreen = routes.find((r) => r.key === selectedTab)?.screen;

  const drawerContent = () => (
    <View style={{ flex: 1, paddingTop: 40 }}>
      {isDesktop ? (
        routes.map((route) => (
          <TouchableOpacity
            key={route.key}
            onPress={() => setSelectedTab(route.key)}
            style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}
          >
            <Ionicons name={route.icon} size={20} style={{ marginRight: 12 }} />
            <Text>{route.label}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <>
          <TouchableOpacity style={{ padding: 16 }}>
            <Ionicons name="sync-outline" size={22} />
            <Text>동기화</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 16 }}>
            <Ionicons name="notifications-outline" size={22} />
            <Text>알림</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 16 }}>
            <Ionicons name="person-circle-outline" size={26} />
            <Text>프로필</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            drawerType: isDesktop ? 'permanent' : 'front',
            headerShown: false,
          }}
          drawerContent={drawerContent}
        >
          <Drawer.Screen name="Main">
            {() => (
              <View style={{ flex: 1 }}>
                <TopTabHeader selected={selectedTab} onSelect={setSelectedTab} />
                <CurrentScreen />
              </View>
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}