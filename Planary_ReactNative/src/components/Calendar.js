
import React, { useEffect, useState } from 'react'
import ListModal from '../components/ListModal'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars'

import axios from 'axios'

// 1. 로케일 설정
LocaleConfig.locales.ko = {
  monthNames: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
  monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘'
}

LocaleConfig.defaultLocale = 'ko'

export default function CalendarScreen() {
  const today = new Date().toISOString().split('T')[0]
  const [current, setCurrent] = useState(today)
  const [selectedDate, setSelected] = useState(null)
  const [sheetVisible, setSheet] = useState(false)
  const [specificDates, setSpecificDates] = useState([])

  // 예시 memoMap
  const memoMap = {
    '2025-07-11': '회의',
    '2025-07-15': '출장',
  }

  const handleDayPress = day => {
    setSelected(day.dateString)
    setSheet(true)
  }

  const goPrev = () => {
    const d = new Date(current)
    d.setMonth(d.getMonth() - 1)
    setCurrent(d.toISOString().split('T')[0])
  }
  const goNext = () => {
    const d = new Date(current)
    d.setMonth(d.getMonth() + 1)
    setCurrent(d.toISOString().split('T')[0])
  }

  const formatDate = yyyymmdd => {
    const s = String(yyyymmdd)
    return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`
  }

  const buildMarked = () => {
    const marked = {
      [today]: { marked: true, dotColor: 'skyblue' },
      [selectedDate]: { selected: true, selectedColor: 'blue' },
    }
    specificDates.forEach(d => {
      marked[d] = { marked: true, dotColor: 'transparent' }
    })
    return marked
  }
  // 공휴일 API 호출 함수
  const GetDate = async () => {
    try {
      const res = await axios.get(
        'https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo',
        {
          params: {
            serviceKey: '',  // ← 인코딩된 키 전체를 붙여넣으세요
            solYear: new Date().getFullYear(),
            pageNo: 1,
            numOfRows: 100,
            _type: 'json'
          }
        }
      )
      const items = res.data.response.body.items.item || []
      const dates = items.map(item => formatDate(item.locdate))
      setSpecificDates(dates)
    } catch (err) {
      console.error('공휴일 API 오류:', err.response?.data || err)
    }
  }

  const handleSave = (newEvent) => {
    /* TODO: 서버 POST → 성공 시 상태 갱신 */
    Alert.alert('저장됨', JSON.stringify(newEvent, null, 2));
  };
  // 컴포넌트 마운트 시 한 번만 공휴일 불러오기
  useEffect(() => {
    GetDate()
  }, [])

  return (
    <View style={styles.container}>
      <RNCalendar
        key={current}
        current={current}
        onDayPress={handleDayPress}
        hideArrows={true}

        renderHeader={date => {
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          return (
            <View style={styles.headerContainer}>
              <View style={styles.headerLeft}>
                <Text style={styles.headerText}>
                  {`${year}.${month}`}
                </Text>
                <View style={styles.arrowGroup}>
                  <TouchableOpacity onPress={goPrev} style={styles.arrowBtn}>
                    <Text style={styles.arrow}>{'<'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={goNext} style={styles.arrowBtn}>
                    <Text style={styles.arrow}>{'>'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }}

        dayComponent={({ date, state }) => {
          const dStr = date.dateString;
          const weekday = new Date(dStr).getDay();
          const isToday = dStr === today;
          const isSelected = dStr === selectedDate;
          const isHoliday = specificDates.includes(dStr);
          const memo = memoMap[dStr];
          const isDisabled = state === 'disabled';


          const containerStyle = [
            styles.dayContainer
          ]

          const numberWrapperStyle = [
            styles.dayNumberWrapper,
            isToday && styles.todayCircle,
            isSelected && styles.selectedCircle
          ]

          const textStyle = [
            styles.dayText,
            isDisabled
              ? styles.disabledText
              : [
                // 요일에 따른 컬러링 (세로 컬러)
                weekday === 0 && { color: '#FF5656' },
                // 공휴일, 선택/오늘 스타일
                isHoliday && styles.holidayText,
                (isToday || isSelected) && styles.selectedCircle
              ]
          ];

          return (
            <TouchableOpacity
              style={styles.dayContainer}
              onPress={() => !isDisabled && handleDayPress({ dateString: dStr })}
              disabled={isDisabled}
            >
              <View style={numberWrapperStyle}>
                <Text style={textStyle}>{date.day}</Text>
              </View>

              {memo && (
                <Text style={styles.memoText} numberOfLines={1}>
                  {memo}
                </Text>
              )}
            </TouchableOpacity>
          );
        }}

        markedDates={buildMarked()}
        markingType="custom"

        theme={{
          // 요일 색상
          'stylesheet.calendar.header': {
            header: {
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 20,
            },
            week: {
              flexDirection: 'row',
              justifyContent: 'space-around',
              borderBottomWidth: 1,
              borderBottomColor: 'lightgray',
              paddingBottom: 4,
              marginBottom: 15,
            },
            dayTextAtIndex0: { color: '#FF5656' }, // 일요일 빨간색
            dayTextAtIndex6: { color: '#4766FF' }, // 토요일 파란색
            dayTextAtIndex1: { color: '#898989' }, // 월요일 검정색
            dayTextAtIndex2: { color: '#898989' }, // 화요일 검정색
            dayTextAtIndex3: { color: '#898989' }, // 수요일 검정색
            dayTextAtIndex4: { color: '#898989' }, // 목요일 검정색
            dayTextAtIndex5: { color: '#898989' }, // 금요일 검정색
          },
          // 주 단위 밑줄(연결된 한 줄)
          'stylesheet.calendar.main': {
            week: {
              flexDirection: 'row',
              justifyContent: 'space-around',
              borderBottomWidth: 1,
              borderBottomColor: 'lightgray',
              paddingBottom: 8,
            },
          },
        }}

        style={styles.calendar}
      />

      <ListModal
        visible={sheetVisible}
        date={selectedDate}
        onClose={() => setSheet(false)}
        onRefresh={() => { /* 달력 다시 그리기 필요 시 */ }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  calendar: { borderRadius: 8, margin: 30 },

  // Header 스타일 (변경 없이 그대로 둠)
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 7,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Pretendard-Bold',
    marginRight: 16,
  },
  arrowGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowBtn: {
    borderWidth: 1,
    borderColor: '#59B4F7',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  arrow: {
    fontSize: 16,
    color: '#59B4F7',
  },

  // 날짜 셀 컨테이너 (변경 없이 그대로 둠)
  dayContainer: {
    Width: 50,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 4,
    paddingBottom: 4,
    marginBottom: 8,

  },
  dayText: {
    fontSize: 12,
    color: '#898989',
  },
  disabledText: {
    color: '#ccc',
  },
  holidayText: {
    color: 'red',
    fontWeight: 'bold',
  },
  dayNumberWrapper: {
    minWidth: 36,
    minHeight: 36,
    padding: 8,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',  // 기본 배경 없음
  },
  todayCircle: {
    backgroundColor: '#00adf5',
  },
  selectedCircle: {
    backgroundColor: '#00adf5',
  },


  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // memo tag 스타일
  memoText: {
    fontSize: 10,
    color: '#444',
    marginTop: 4,
    backgroundColor: '#e0f7fa',
    paddingHorizontal: 4,
    borderRadius: 4,
    width: 80,
    textAlign: 'center',
  },
})
