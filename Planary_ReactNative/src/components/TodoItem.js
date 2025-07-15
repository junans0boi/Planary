// src/components/TodoItem.js
import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import axios from '../axiosConfig';

export default function TodoItem({ item, onClose, onRefresh }) {
  // 로컬 완료 상태 관리
  const [isDone, setIsDone] = useState(item.isDone);

  // 시간 문자열 포맷팅
  const start = item.startDt ? item.startDt.slice(11, 16) : '';
  const end = item.endDt ? item.endDt.slice(11, 16) : '';
  const range = start && end ? `${start} ~ ${end}` : '';

  // 완료 상태 토글 핸들러
  const toggleDone = async () => {
    const newValue = !isDone;
    setIsDone(newValue);
    try {
      // 서버에 완료 상태 업데이트
      await axios.put(`/todos/${item.todoId}`, {
        // 반드시 전체 DTO를 넘겨야 합니다.
        title: item.title,
        isRecurring: item.isRecurring,
        startDt: item.startDt,
        endDt: item.endDt,
        isDone: newValue
      });
      onRefresh();
    } catch (err) {
      console.error(err);
      setIsDone(!newValue);
    }
  };

  return (
    <View style={styles.row}>

      <TouchableOpacity
        style={styles.content}
        onPress={() => onClose && onClose()}
      >
        <Text style={[styles.title, isDone && styles.titleDone]}>
          {item.title}
        </Text>
        {range !== '' && <Text style={styles.range}>{range}</Text>}
      </TouchableOpacity>

      {/* 체크박스 영역 (원래 상태) */}
      <TouchableOpacity onPress={toggleDone} style={styles.checkBox}>
        <Text style={styles.checkText}>
          {isDone ? '☑️' : '⬜️'}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  checkBox: {
    paddingHorizontal: 8,
  },
  checkText: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  range: {
    color: '#666',
    marginTop: 4,
    fontSize: 14,
  },
});
