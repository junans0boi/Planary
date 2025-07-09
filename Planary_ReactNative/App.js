import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';      // ← StyleSheet import 추가

import RootNavigator from './src/navigation/RootNavigator';
export default function App() {
    return <RootNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
