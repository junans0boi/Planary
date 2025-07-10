import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TodoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text>여기에 투두 리스트 컴포넌트가 들어갑니다.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header:    { height: 56, paddingHorizontal: 16, justifyContent: 'center', borderBottomWidth: 1, borderColor: '#eee' },
  title:     { fontSize: 20, fontWeight: 'bold' },
  body:      { flex: 1, padding: 16 },
});