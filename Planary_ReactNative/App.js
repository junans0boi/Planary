// App.js (프로젝트 루트)

import 'react-native-gesture-handler';
import 'react-native-reanimated'; 
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';   // ⬅️ 누락된 import

import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <BottomSheetModalProvider>
      <RootNavigator />
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});