// src/components/ScheduleItem.js
import React from 'react';
import axios from '../axiosConfig';

import { TouchableOpacity, Text } from 'react-native';

export default function ScheduleItem({ item, onClose, onRefresh }) {
  return (
    <TouchableOpacity
      style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}
      onPress={() => {
        /* 상세/수정 로직 */
      }}
    >
      <Text style={{ fontSize: 16 }}>{item.title}</Text>
      <Text>{item.startDt} ~ {item.endDt}</Text>
    </TouchableOpacity>
  );
}