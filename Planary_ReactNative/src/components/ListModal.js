import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  FlatList, StyleSheet, Platform
} from 'react-native';        // ← add Platform here
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ScheduleItem from './ScheduleItem';
import TodoItem from './TodoItem';
import AddScheduleModal from './AddScheduleModal';
import { AddTodoModal } from './AddTodoModal';
import axios from 'axios';

export default function ListModal({ visible, date, userId, onClose, onRefresh }) {
  const isWeb = Platform.OS === 'web' && !/Mobile/.test(navigator.userAgent);
  const [activeTab, setActiveTab] = useState('schedule');
  const [schedules, setSchedules] = useState([]);
  const [todos, setTodos] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const fetchData = async () => {
    const dStr = date;
    if (activeTab === 'schedule') {
      const res = await axios.get(`/api/events/user/${userId}?date=${dStr}`);
      setSchedules(res.data);
    } else {
      const res = await axios.get(`/api/todos/user/${userId}/date/${dStr}`);
      setTodos(res.data);
    }
  };

  useEffect(() => { if (visible) fetchData(); }, [visible, activeTab]);

  const AddModal = activeTab === 'schedule' ? AddScheduleModal : AddTodoModal;

  const Content = ({ items, ItemComp }) => (
    <FlatList
      data={items}
      keyExtractor={(item, index) => {
        const key = activeTab === 'schedule' ? item.eventId : item.todoId;
        return (key != null ? key : index).toString();
      }}
      renderItem={({ item }) => <ItemComp item={item} onClose={onClose} onRefresh={fetchData} />}
      ListEmptyComponent={<Text style={styles.empty}>등록된 항목이 없습니다.</Text>}
    />
  );

  // Modal 또는 BottomSheet 선택
    // Web → our own full-screen overlay; else → BottomSheet
  const Wrapper = ({ children }) => {
    if (isWeb) {
      if (!visible) return null;
      return (
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>{children}</View>
        </View>
      );
    } else {
      return (
        <BottomSheetModal
          visible={visible}
          index={0}
          snapPoints={['50%', '90%']}
          onDismiss={onClose}
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
          ? <Content items={schedules} ItemComp={ScheduleItem} />
          : <Content items={todos} ItemComp={TodoItem} />}
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAdd(true)}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
      <AddModal
        visible={showAdd}
        date={date}
        userId={userId}
        onClose={() => { setShowAdd(false); fetchData(); onRefresh && onRefresh(); }}
      />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
    overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: { flexDirection: 'row', justifyContent: 'center', padding: 16, backgroundColor: '#fff' },
  tab: { fontSize: 18, color: '#888', marginHorizontal: 20 },
  activeTab: { color: '#000', fontWeight: 'bold', textDecorationLine: 'underline' },
  body: { flex: 1, padding: 16 },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 20 },
  fab: {
    position: 'absolute', right: 24, bottom: 24,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#59B4F7', justifyContent: 'center', alignItems: 'center'
  },
  fabText: { fontSize: 28, color: '#fff', lineHeight: 28 },
});