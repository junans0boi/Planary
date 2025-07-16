// src/components/ListModal.js
import axios from '../axiosConfig'
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TouchableWithoutFeedback, StyleSheet, Platform } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ScheduleItem from './ScheduleItem';
import TodoItem from './TodoItem';
import AddScheduleModal from './AddScheduleModal';
import { AddTodoModal } from './AddTodoModal';


export default function ListModal({ visible, date, userId, onClose, onRefresh }) {
  const isWeb = Platform.OS === 'web' && !/Mobile/.test(navigator.userAgent);
  const [activeTab, setActiveTab] = useState('schedule');
  const [schedules, setSchedules] = useState([]);
  const [todos, setTodos] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const fetchData = async () => {
    if (activeTab === 'schedule') {
      const res = await axios.get('/events', { params: { userId, date } });
      setSchedules(res.data);
    } else {
      const res = await axios.get('/todos', { params: { userId, date } });
      setTodos(res.data);
    }
  };
  useEffect(() => {
    if (!isWeb) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && visible) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWeb, visible, onClose]);
  
  useEffect(() => {
    if (visible) fetchData();
  }, [visible, activeTab]);

  const AddModal = activeTab === 'schedule' ? AddScheduleModal : AddTodoModal;

  // 저장 완료 콜백
  const handleSave = newItem => {
    setShowAdd(false);
    fetchData();
    onRefresh && onRefresh();
  };

  // 래퍼 컴포넌트
  const Wrapper = ({ children }) => {
    if (isWeb) {
      if (!visible) return null;
      return (
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>{children}</View>
            </TouchableWithoutFeedback>
          </View>
          </TouchableWithoutFeedback>
      );
    } else {
      return (
        <BottomSheetModal
          visible={visible}
          index={0}
          snapPoints={['50%', '90%']}
          onDismiss={onClose}
          enablePanDownToClose={true}
          backdropComponent={({ style }) => (
            <TouchableWithoutFeedback onPress={onClose}>
              <View style={[style, styles.nativeBackdrop]} />
            </TouchableWithoutFeedback>
          )}
          >
          {children}
        </BottomSheetModal>
      );
    }
  };

  return (
    <Wrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setActiveTab('schedule')}>
          <Text style={[styles.tab, activeTab === 'schedule' && styles.activeTab]}>일정</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('todo')}>
          <Text style={[styles.tab, activeTab === 'todo' && styles.activeTab]}>TodoList</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {activeTab === 'schedule'
          ? <FlatList
            data={schedules}
            keyExtractor={item => String(item.eventId)}
            renderItem={({ item }) => <ScheduleItem item={item} onClose={onClose} onRefresh={fetchData} />}
            ListEmptyComponent={<Text style={styles.empty}>등록된 일정이 없습니다.</Text>}
          />
          : <FlatList
            data={todos}
            keyExtractor={item => String(item.todoId)}
            renderItem={({ item }) => <TodoItem item={item} onClose={onClose} onRefresh={fetchData} />}
            ListEmptyComponent={<Text style={styles.empty}>등록된 할 일이 없습니다.</Text>}
          />
        }
      </View>
      <TouchableOpacity style={styles.fab} onPress={() => setShowAdd(true)}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
      <AddModal
        visible={showAdd}
        date={date}
        userId={userId}
        onClose={() => setShowAdd(false)}
        onSave={handleSave}
      />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', zIndex: 1000
  },
  modalContainer: { width: '80%', maxHeight: '80%', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' },
  nativeBackdrop:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: { flexDirection: 'row', justifyContent: 'center', padding: 16, backgroundColor: '#fff' },
  tab: { fontSize: 18, color: '#888', marginHorizontal: 20 },
  activeTab: { color: '#000', fontWeight: 'bold', textDecorationLine: 'underline' },
  body: { flex: 1, padding: 16 },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 20 },
  fab: { position: 'absolute', right: 24, bottom: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#59B4F7', justifyContent: 'center', alignItems: 'center' },
  fabText: { fontSize: 28, color: '#fff', lineHeight: 28 },
});