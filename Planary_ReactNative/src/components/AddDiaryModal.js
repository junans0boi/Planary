import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

export default function AddDiaryModal({ visible, selectedDate, initialDiary, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState(1);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    if (initialDiary) {
      setTitle(initialDiary.title);
      setContent(initialDiary.content);
      setEmotion(initialDiary.emotion);
      setIsEditing(false);
    } else {
      setTitle('');
      setContent('');
      setEmotion(1);
      setIsEditing(true);
    }
  }, [visible, initialDiary]);

  const handleSave = () => {
    const diary = { date: selectedDate, title, content, emotion };
    onSave(diary);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.header}>{isEditing ? '일기 쓰기' : '일기 보기'} ({selectedDate})</Text>

          <ScrollView horizontal contentContainerStyle={styles.emoRow} showsHorizontalScrollIndicator={false}>
            {[1,2,3,4,5].map(n => (
              <TouchableOpacity key={n} onPress={() => isEditing && setEmotion(n)} style={styles.emoTouch}>
                <Image
                  source={{ uri: `/img/emotion/emotion${n}.png` }}
                  style={[styles.emoIcon, emotion===n && styles.emoSelected]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TextInput
            style={styles.input}
            placeholder="제목을 입력하세요"
            value={title}
            onChangeText={setTitle}
            editable={isEditing}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="오늘의 일기를 작성하세요"
            value={content}
            onChangeText={setContent}
            multiline
            editable={isEditing}
          />

          <View style={styles.btnRow}>
            {isEditing
              ? <Button title="완료" onPress={handleSave} />
              : <Button title="수정" onPress={() => setIsEditing(true)} />
            }
            <Button title="취소" onPress={onClose} color="#888" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

AddDiaryModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  selectedDate: PropTypes.string,
  initialDiary: PropTypes.shape({ title: PropTypes.string, content: PropTypes.string, emotion: PropTypes.number }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  overlay: { flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center' },
  modal: { width:'90%', backgroundColor:'#fff', borderRadius:8, padding:16 },
  header: { fontSize:18, fontWeight:'bold', marginBottom:12, textAlign:'center' },
  emoRow: { justifyContent:'center', marginBottom:12 },
  emoTouch: { padding:4 },
  emoIcon: { width:40, height:40, marginHorizontal:6, opacity:0.6 },
  emoSelected: { opacity:1, borderWidth:2, borderColor:'#00adf5' },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:6, padding:8, marginBottom:12 },
  textArea: { height:100 },
  btnRow: { flexDirection:'row', justifyContent:'space-between' }
});
