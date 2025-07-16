// src/screens/CalendarScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Calendar from '../components/Calendar';
import ListModal from '../components/ListModal';
import { getHolidays } from '../api/holidayApi';

export default function CalendarScreen() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [holidays, setHolidays] = useState([]);

  // 공휴일 불러오기
  useEffect(() => {
    (async () => {
      try {
        const dates = await getHolidays();
        setHolidays(dates);
      } catch (e) {
        console.error('공휴일 불러오기 실패:', e);
      }
    })();
  }, []);

  const handleDayPress = ({ dateString }) => {
    setSelectedDate(dateString);
    setSheetVisible(true);
  };

  const handleRefresh = () => {
    // 달력 새로고침 로직 (필요 시)
  };

  return (
    <View style={styles.container}>
      {/* 본문 */}
      <View style={styles.body}>
        <Calendar
          onDayPress={handleDayPress}
          holidays={holidays}
          today={today}
        />
      </View>

      {/* 일정 상세/등록 모달 */}
      <ListModal
        visible={sheetVisible}
        date={selectedDate}
        onClose={() => setSheetVisible(false)}
        onRefresh={handleRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header:    { height: 56, paddingHorizontal: 16, justifyContent: 'center', borderBottomWidth: 1, borderColor: '#eee' },
  title:     { fontSize: 20, fontWeight: 'bold' },
  body:      { flex: 1, padding: 16 },
});