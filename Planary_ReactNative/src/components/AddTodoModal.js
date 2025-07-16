// src/components/AddTodoModal.js
import React, { useState, useEffect } from 'react';
import {
  Modal, View, Text, TextInput, Switch,
  TouchableOpacity, Button, StyleSheet, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../axiosConfig';

export function AddTodoModal({ visible, date, userId, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [startDt, setStartDt] = useState(new Date(date));
  const [endDt, setEndDt] = useState(new Date(date));
  const [done, setDone] = useState(false);

  useEffect(() => {
    const d = new Date(date);
    setStartDt(d);
    setEndDt(d);
  }, [date]);

  const handleSave = async () => {
    if (!userId) return alert('userId 가 없습니다!');
    const payload = {
      user: { userId },
      title,
      isRecurring: recurring,
      startDt: startDt.toISOString(),
      endDt: endDt.toISOString(),
      isDone: done
    };
    try {
      const res = await axios.post('/todos', payload);
      onSave(res.data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const DatePicker = ({ value, onChange }) => {
    if (Platform.OS === 'web') {
      return (
        <ReactDatePicker
          selected={value}
          onChange={onChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="시간"
          dateFormat="HH:mm"
          className="react-datepicker__input-text"
        />
      );
    } else {
      return (
        <DateTimePicker
          value={value}
          mode="time"
          display="default"
          onChange={(_, d) => d && onChange(d)}
        />
      );
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={s.overlay}>
        <View style={s.container}>
          <Text style={s.title}>할 일 {done ? '수정' : '등록'}</Text>
          <View style={s.content}>
            <Text style={s.label}>제목</Text>
            <TextInput style={s.input} value={title} onChangeText={setTitle} placeholder="제목 입력" />

            <View style={s.row}>
              <Text>반복</Text>
              <Switch value={recurring} onValueChange={setRecurring} />
              <Text>완료</Text>
              <Switch value={done} onValueChange={setDone} />
            </View>

            <Text style={s.label}>시작 시간</Text>
            <DatePicker value={startDt} onChange={d => setStartDt(d)} />

            <Text style={s.label}>종료 시간</Text>
            <DatePicker value={endDt} onChange={d => setEndDt(d)} />
          </View>

          <View style={s.btnRow}>
            <Button title="취소" onPress={onClose} />
            <Button title="저장" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#00000066', justifyContent: 'center', alignItems: 'center' },
  container: { width: '90%', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' },
  title: { fontSize: 18, fontWeight: 'bold', padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  content: { padding: 16 },
  label: { marginTop: 12, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  btnRow: { flexDirection: 'row', justifyContent: 'flex-end', padding: 16, borderTopWidth: 1, borderColor: '#eee' },
});