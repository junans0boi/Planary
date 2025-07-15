import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Calendar from '../components/Calendar';
import AddDiaryModal from '../components/AddDiaryModal';
import { getHolidays } from '../api/holidayApi';

export default function DiaryScreen() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [diaries, setDiaries] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const dates = await getHolidays();
        setHolidays(dates);
      } catch(e) {
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

  return (
    <View style={{ flex:1, backgroundColor:'#fff' }}>
      <Calendar
        onDayPress={handleDayPress}
        holidays={holidays}
        diaries={diaries}
        today={today}
      />

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
