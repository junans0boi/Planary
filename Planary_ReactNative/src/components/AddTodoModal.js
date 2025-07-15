// src/components/AddTodoModal.js
import React, { useState, useEffect } from 'react';
import {
  Modal, View, Text, TextInput, Switch,
  TouchableOpacity, Button, StyleSheet
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

export function AddTodoModal({ visible, date, userId, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [startDt, setStartDt] = useState(new Date(date));
  const [endDt, setEndDt] = useState(new Date(date));
  const [done, setDone] = useState(false);
  const [showPicker, setShowPicker] = useState(null);

  useEffect(() => {
    const d = new Date(date);
    setStartDt(d);
    setEndDt(d);
  }, [date]);

  const toggleAllDay = () => {}; // not needed for Todo

  const handleSave = async () => {
    const payload = { user:{userId}, title, isRecurring:recurring, startDt:startDt.toISOString(), endDt:endDt.toISOString(), isDone:done };
    try {
      const res = await axios.post('/api/todos', payload);
      onSave(res.data);
      onClose();
    } catch(err){ console.error(err); }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={s2.overlay}>
        <View style={s2.container}>
          <Text style={s2.title}>Todo 등록</Text>

          <View style={s2.content}>
            <Text style={s2.label}>제목</Text>
            <TextInput style={s2.input} value={title} onChangeText={setTitle} placeholder="제목 입력" />

            <View style={s2.row}>
              <Text>반복</Text>
              <Switch value={recurring} onValueChange={setRecurring} />
              <Text style={{marginLeft:20}}>완료</Text>
              <Switch value={done} onValueChange={setDone} />
            </View>

            <View style={s2.row}>
              <TouchableOpacity onPress={()=>setShowPicker('start')} style={s2.dateBtn}>
                <Text>{startDt.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setShowPicker('end')} style={s2.dateBtn}>
                <Text>{endDt.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</Text>
              </TouchableOpacity>
            </View>
            {showPicker && (
              <DateTimePicker
                value={showPicker==='start'?startDt:endDt}
                mode="time"
                display="default"
                onChange={(_,d)=>{ setShowPicker(null); d && (showPicker==='start'?setStartDt(d):setEndDt(d)); }}
              />
            )}

          </View>

          <View style={s2.btnRow}>
            <Button title="취소" onPress={onClose} />
            <Button title="저장" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s2 = StyleSheet.create({
  overlay:{flex:1,backgroundColor:'#00000066',justifyContent:'center',alignItems:'center'},
  container:{width:'90%',backgroundColor:'#fff',borderRadius:12,overflow:'hidden'},
  title:{fontSize:18,fontWeight:'bold',padding:16,borderBottomWidth:1,borderColor:'#eee'},
  content:{padding:16},
  label:{marginTop:12,fontWeight:'600'},
  input:{borderWidth:1,borderColor:'#ccc',borderRadius:6,padding:8,marginTop:4},
  row:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:12},
  dateBtn:{flex:1,borderWidth:1,borderColor:'#ccc',borderRadius:6,padding:8,marginHorizontal:4,alignItems:'center'},
  btnRow:{flexDirection:'row',justifyContent:'space-between',padding:16,borderTopWidth:1,borderColor:'#eee'}
});