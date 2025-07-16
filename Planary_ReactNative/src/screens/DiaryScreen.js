// src/screens/DiaryScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Calendar from '../components/Calendar';
import AddDiaryModal from '../components/AddDiaryModal';
import { getHolidays } from '../api/holidayApi';

export default function DiaryScreen() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [diaries, setDiaries] = useState({});

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
    setModalVisible(true);
  };

  const handleSaveDiary = diary => {
    setDiaries(prev => ({ ...prev, [diary.date]: diary }));
    setModalVisible(false);
  };

  const handleRefresh = () => {
    // 필요하다면 달력 또는 목록을 다시 불러오는 로직을 여기에
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
      <Calendar
        onDayPress={handleDayPress}
        holidays={holidays}
        diaries={diaries}
        today={today}
      />
    </View>

      <AddDiaryModal
        visible={modalVisible}
        selectedDate={selectedDate}
        initialDiary={diaries[selectedDate]}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveDiary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    padding: 16,
  },
});