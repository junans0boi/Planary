// src/components/EventEditor.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

// 웹 전용: react-datepicker
import ReactDatePicker from 'react-datepicker';

export default function EventEditor({ date, onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [allDay, setAllDay] = useState(true);

  const [startDate, setStartDate] = useState(new Date(date));
  const [endDate,   setEndDate]   = useState(new Date(date));

  // Android/Web 모달 토글
  const [showStart, setShowStart] = useState(false);
  const [showEnd,   setShowEnd]   = useState(false);

  const handleSave = () => {
    onSave({
      title,
      allDay,
      startDate: startDate.toISOString(),
      endDate:   endDate.toISOString(),
    });
    onClose();
  };

  // 날짜 문자열 포맷팅 (YYYY-MM-DD)
  const formatYYYYMMDD = d => d.toISOString().slice(0,10);

  return (
    <View style={styles.box}>
      <Text style={styles.head}>일정 등록</Text>

      {/* 제목 */}
      <Text style={styles.label}>제목</Text>
      <TextInput
        style={styles.input}
        placeholder="제목 입력"
        value={title}
        onChangeText={setTitle}
      />

      {/* 종일 토글 */}
      <View style={styles.row}>
        <Text>종일</Text>
        <Switch value={allDay} onValueChange={setAllDay} />
      </View>

      {/* ── 웹 분기 ─────────────────────────────────── */}
      {Platform.OS === 'web' ? (
        <>
          <Text style={styles.label}>시작일</Text>
          <ReactDatePicker
            selected={startDate}
            onChange={setStartDate}
            dateFormat="yyyy-MM-dd"
            wrapperClassName="datePicker"
          />

          <Text style={styles.label}>종료일</Text>
          <ReactDatePicker
            selected={endDate}
            onChange={setEndDate}
            dateFormat="yyyy-MM-dd"
            wrapperClassName="datePicker"
          />
        </>
      ) : (
      /* ── 네이티브(iOS/Android) 분기 ─────────────────────────── */
        <>
          <Text style={styles.label}>시작일</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowStart(true)}
          >
            <Text>{formatYYYYMMDD(startDate)}</Text>
          </TouchableOpacity>
          {showStart && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
              onChange={(_, d) => {
                setShowStart(false);
                d && setStartDate(d);
              }}
              style={Platform.OS === 'ios' && styles.picker}
            />
          )}

          <Text style={styles.label}>종료일</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowEnd(true)}
          >
            <Text>{formatYYYYMMDD(endDate)}</Text>
          </TouchableOpacity>
          {showEnd && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
              onChange={(_, d) => {
                setShowEnd(false);
                d && setEndDate(d);
              }}
              style={Platform.OS === 'ios' && styles.picker}
            />
          )}
        </>
      )}

      {/* 저장/취소 */}
      <View style={styles.buttonRow}>
        <Button title="취소" onPress={onClose} />
        <Button title="저장" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box:        { padding: 20, gap: 12 },
  head:       { fontSize: 20, fontWeight: 'bold' },
  label:      { fontWeight: '600', marginTop: 12 },
  input:      { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6 },
  row:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dateButton: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginTop: 4 },
  picker:     { width: '100%', height: 150 },  // iOS spinner 높이
  buttonRow:  { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});