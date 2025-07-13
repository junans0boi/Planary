// src/components/EventSheetOrModal.js
import React, { useMemo, useRef, useEffect } from 'react';
import { Modal, Platform, View } from 'react-native';
import EventEditor from './EventEditor';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export default function EventSheetOrModal({ visible, date, onSave, onClose }) {
  // 1) 웹인지
  const isWeb = Platform.OS === 'web';

  // 2) 모바일 브라우저를 User-Agent로 체크
  const userAgent = isWeb && typeof navigator !== 'undefined'
    ? navigator.userAgent
    : '';
  const isMobileWeb = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  // 3) 데스크탑 웹은 Modal, 나머지는 BottomSheet
  if (isWeb && !isMobileWeb) {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={{
          flex: 1,
          backgroundColor: '#00000088',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{ width: 400, backgroundColor: '#fff', borderRadius: 12 }}>
            <EventEditor date={date} onSave={onSave} onClose={onClose} />
          </View>
        </View>
      </Modal>
    );
  }

  // 모바일(iOS/Android) 또는 모바일 웹
  return <BottomSheetWrapper
    visible={visible}
    date={date}
    onSave={onSave}
    onClose={onClose}
  />;
}

function BottomSheetWrapper({ visible, date, onSave, onClose }) {
  const ref = useRef(null);
  const { height } = require('react-native').Dimensions.get('window');

  // 스냅포인트: 네이티브 모바일과 모바일 웹 모두 퍼센트로
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  useEffect(() => {
    visible ? ref.current?.present() : ref.current?.dismiss();
  }, [visible]);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      onDismiss={onClose}
      enablePanDownToClose
      backgroundStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
    >
      <EventEditor date={date} onSave={onSave} onClose={onClose} />
    </BottomSheetModal>
  );
}