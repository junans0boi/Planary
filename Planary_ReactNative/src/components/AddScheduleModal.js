// src/components/AddScheduleModal.js
import React, { useState, useEffect } from 'react';
import {
  Modal, View, Text, TextInput, Switch,
  TouchableOpacity, Button, ScrollView, StyleSheet
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function AddScheduleModal({ visible, date, userId, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [startDt, setStartDt] = useState(new Date(date));
  const [endDt, setEndDt] = useState(new Date(date));
  const [showPicker, setShowPicker] = useState(null); // 'start'|'end'
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

  const toggleAllDay = flag => {
    setAllDay(flag);
    const sd = new Date(startDt);
    const ed = new Date(endDt);
    if (flag) {
      sd.setHours(0,0,0);
      ed.setHours(23,59,0);
    }
    setStartDt(sd);
    setEndDt(ed);
  };

  const toggleWeekday = idx => {
    setWeeklyDays(days =>
      days.includes(idx) ? days.filter(d => d!==idx) : [...days, idx]
    );
  };

  const handleSave = async () => {
    const recurRule = recurrenceType === 'weekly'
      ? `RRULE:FREQ=WEEKLY;BYDAY=${weeklyDays.map(i=>['SU','MO','TU','WE','TH','FR','SA'][i]).join(',')}`
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
      externalSource: null,
      externalScheduleId: null,
      memo,
      location
    };

    try {
      const res = await axios.post('/api/events', payload);
      onSave(res.data);
      onClose();
    } catch (err) {
      console.error(err);
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
                <Switch value={allDay} onValueChange={toggleAllDay} />
              </View>
              <View style={s.rowItem}>
                <Text>반복</Text>
                <Switch
                  value={recurrenceType!=='none'}
                  onValueChange={val => setRecurrenceType(val ? 'weekly' : 'none')}
                />
              </View>
            </View>

            <View style={s.row}>
              <TouchableOpacity onPress={()=>setShowPicker('start')} style={s.dateBtn}>
                <Text>{allDay ? startDt.toISOString().slice(0,10) : startDt.toLocaleString()}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setShowPicker('end')} style={s.dateBtn}>
                <Text>{allDay ? endDt.toISOString().slice(0,10) : endDt.toLocaleString()}</Text>
              </TouchableOpacity>
            </View>
            {showPicker && (
              <DateTimePicker
                value={showPicker==='start'?startDt:endDt}
                mode={allDay?'date':'datetime'}
                display="default"
                onChange={(_, d) => {
                  setShowPicker(null);
                  if (!d) return;
                  if (showPicker==='start') setStartDt(d);
                  else setEndDt(d);
                }}
              />
            )}

            {recurrenceType==='weekly' && (
              <View style={s.weekdays}>
                {WEEKDAYS.map((d,i)=>(
                  <TouchableOpacity
                    key={i}
                    onPress={()=>toggleWeekday(i)}
                    style={[s.dayBadge, weeklyDays.includes(i)&&s.dayBadgeActive]}
                  >
                    <Text style={weeklyDays.includes(i)?s.dayTextActive:null}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {recurrenceType==='monthly' && (
              <View style={{marginVertical:8}}>
                <Text>매월 날짜</Text>
                <TextInput
                  style={s.input}
                  keyboardType="numeric"
                  value={String(monthlyDay)}
                  onChangeText={t=>setMonthlyDay(parseInt(t)||1)}
                />
              </View>
            )}

            <Text style={s.label}>메모</Text>
            <TextInput
              style={[s.input,{height:80}]}
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
  overlay:{flex:1,backgroundColor:'#00000066',justifyContent:'center',alignItems:'center'},
  container:{width:'90%',maxHeight:'90%',backgroundColor:'#fff',borderRadius:12,overflow:'hidden'},
  title:{fontSize:18,fontWeight:'bold',padding:16,borderBottomWidth:1,borderColor:'#eee'},
  scroll:{paddingHorizontal:16},
  label:{marginTop:12,fontWeight:'600'},
  input:{borderWidth:1,borderColor:'#ccc',borderRadius:6,padding:8,marginTop:4},
  row:{flexDirection:'row',justifyContent:'space-between',marginTop:12},
  rowItem:{flexDirection:'row',alignItems:'center',gap:8},
  dateBtn:{flex:1,borderWidth:1,borderColor:'#ccc',borderRadius:6,padding:8,marginHorizontal:4,alignItems:'center'},
  weekdays:{flexDirection:'row',justifyContent:'space-around',marginTop:12},
  dayBadge:{padding:8,borderRadius:4,borderWidth:1,borderColor:'#ccc'},
  dayBadgeActive:{backgroundColor:'#59B4F7',borderColor:'#59B4F7'},
  dayTextActive:{color:'#fff'},
  btnRow:{flexDirection:'row',justifyContent:'space-between',padding:16,borderTopWidth:1,borderColor:'#eee'}
});


