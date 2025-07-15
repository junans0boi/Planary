// src/components/AddScheduleModal.js
import React, { useState, useEffect } from 'react';
import {
  Modal, View, Text, TextInput, Switch,
  TouchableOpacity, Button, ScrollView, StyleSheet, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../axiosConfig';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const DAY_CODES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

export default function AddScheduleModal({ visible, date, userId, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [startDt, setStartDt] = useState(new Date(date));
  const [endDt, setEndDt] = useState(new Date(date));
  const [memo, setMemo] = useState('');
  const [location, setLocation] = useState('');
  const [recurrenceType, setRecurrenceType] = useState('none'); // 'none','weekly','monthly'
  const [weeklyDays, setWeeklyDays] = useState([]);
  const [monthlyDay, setMonthlyDay] = useState(new Date(date).getDate());

  useEffect(() => {
    const d = new Date(date);
    setStartDt(d);
    setEndDt(d);
  }, [date]);

  const toggleWeekday = idx => {
    setWeeklyDays(days =>
      days.includes(idx) ? days.filter(d => d !== idx) : [...days, idx]
    );
  };

  const handleSave = async () => {
    if (!userId) return alert('userId 가 없습니다!');
    const recurRule = recurrenceType === 'weekly'
      ? `RRULE:FREQ=WEEKLY;BYDAY=${weeklyDays.map(i => DAY_CODES[i]).join(',')}`
      : recurrenceType === 'monthly'
        ? `RRULE:FREQ=MONTHLY;BYMONTHDAY=${monthlyDay}`
        : null;

    const payload = {
      user: { userId },
      title,
      isAllDay: allDay,
      hasTime: !allDay,
      startDt: startDt.toISOString(),
      endDt: endDt.toISOString(),
      isRecurring: recurrenceType !== 'none',
      recurRule,
      memo,      // ← 엔티티에 추가됨
      location   // ← 엔티티에 추가됨
    };

    try {
      const res = await axios.post('/events', payload);
      onSave(res.data);  // ListModal 쪽에서 fetchData 호출
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  // 네이티브: 버튼 → DateTimePicker 모달, 웹: inline ReactDatePicker
  const DatePicker = ({ mode, value, onChange }) => {
    if (Platform.OS === 'web') {
      return (
        <ReactDatePicker
          selected={value}
          onChange={onChange}
          showTimeSelect={!allDay}
          dateFormat={allDay ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm'}
          className="react-datepicker__input-text"
        />
      );
    } else {
      return (
        <DateTimePicker
          value={value}
          mode={allDay || mode === 'date' ? 'date' : 'datetime'}
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
          <Text style={s.title}>일정 등록</Text>
          <ScrollView style={s.scroll}>
            <Text style={s.label}>제목</Text>
            <TextInput style={s.input} value={title} onChangeText={setTitle} placeholder="제목 입력" />

            <View style={s.row}>
              <View style={s.rowItem}>
                <Text>종일</Text>
                <Switch value={allDay} onValueChange={setAllDay} />
              </View>
              <View style={s.rowItem}>
                <Text>반복</Text>
                <Switch value={recurrenceType !== 'none'} onValueChange={val => setRecurrenceType(val ? 'weekly' : 'none')} />
              </View>
            </View>

            <Text style={s.label}>시작</Text>
            <DatePicker mode="datetime" value={startDt} onChange={d => setStartDt(d)} />

            <Text style={s.label}>종료</Text>
            <DatePicker mode="datetime" value={endDt} onChange={d => setEndDt(d)} />

            {recurrenceType === 'weekly' && (
              <View style={s.weekdays}>
                {WEEKDAYS.map((d, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => toggleWeekday(i)}
                    style={[s.dayBadge, weeklyDays.includes(i) && s.dayBadgeActive]}
                  >
                    <Text style={weeklyDays.includes(i) ? s.dayTextActive : null}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {recurrenceType === 'monthly' && (
              <>
                <Text style={s.label}>매월 날짜</Text>
                <TextInput
                  style={s.input}
                  keyboardType="numeric"
                  value={String(monthlyDay)}
                  onChangeText={t => setMonthlyDay(parseInt(t) || 1)}
                />
              </>
            )}

            <Text style={s.label}>메모</Text>
            <TextInput
              style={[s.input, { height: 80 }]}
              value={memo}
              onChangeText={setMemo}
              placeholder="메모 입력"
              multiline
            />

            <Text style={s.label}>위치</Text>
            <TextInput style={s.input} value={location} onChangeText={setLocation} placeholder="위치 입력" />
          </ScrollView>

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
  container: { width: '90%', maxHeight: '90%', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' },
  title: { fontSize: 18, fontWeight: 'bold', padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  scroll: { paddingHorizontal: 16 },
  label: { marginTop: 12, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  rowItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  weekdays: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 },
  dayBadge: { padding: 8, borderRadius: 4, borderWidth: 1, borderColor: '#ccc' },
  dayBadgeActive: { backgroundColor: '#59B4F7', borderColor: '#59B4F7' },
  dayTextActive: { color: '#fff' },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderTopWidth: 1, borderColor: '#eee' },
});