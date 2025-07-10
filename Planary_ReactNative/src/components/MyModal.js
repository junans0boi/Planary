// MyModal.js
import React from 'react';
import { Modal, View, Text, Button } from 'react-native';

export function MyModal({ visible, onClose, data }) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text>선택한 날짜: {data}</Text>
          <Button title="닫기" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}