// src/components/TodoItem.js
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export default function TodoItem({ item, onClose, onRefresh }) {
  // startDt/endDt가 undefined일 경우 빈 문자열로 대체
  const start = item.startDt ? item.startDt.slice(11, 16) : '';
  const end   = item.endDt   ? item.endDt.slice(11, 16)   : '';
  const range = start && end ? `${start} ~ ${end}` : '';

  return (
    <TouchableOpacity
      style={{
        padding:12,
        borderBottomWidth:1,
        borderColor:'#eee',
        flexDirection:'row',
        justifyContent:'space-between'
      }}
      onPress={()=>{/* 수정 로직 */}}
    >
      <View>
        <Text style={{ fontSize:16 }}>{item.title}</Text>
        { range !== '' && <Text>{range}</Text> }
      </View>
      <Text>{ item.isDone ? '✅' : '⬜️' }</Text>
    </TouchableOpacity>
  );
}