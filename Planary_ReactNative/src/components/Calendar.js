// src/screens/CalendarScreen.js
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars'
import axios from 'axios'
import { MyModal } from '../components/MyModal'

// 1. 로케일 설정
LocaleConfig.locales.ko = {
  monthNames:      ['01월','02월','03월','04월','05월','06월','07월','08월','09월','10월','11월','12월'],
  monthNamesShort: ['01월','02월','03월','04월','05월','06월','07월','08월','09월','10월','11월','12월'],
  dayNames:        ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort:   ['일','월','화','수','목','금','토'],
  today:           '오늘'
}
LocaleConfig.defaultLocale = 'ko'

export default function CalendarScreen() {
  const today = new Date().toISOString().split('T')[0]
  const [current, setCurrent] = useState(today)
  const [selectedDate, setSelected] = useState(null)
  const [modalVisible, setModal] = useState(false)
  const [specificDates, setSpecificDates] = useState([]) // 공휴일 날짜 저장

  // 날짜 선택 시 모달 열기
  const handleDayPress = day => {
    setSelected(day.dateString)
    setModal(true)
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

  // 날짜 형식 변환: 20250710 → 2025-07-10
  const formatDate = yyyymmdd => {
    const str = yyyymmdd.toString()
    return `${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)}`
  }

  // 공휴일 API 호출 (공공데이터포털 예시)
  const GetDate = async () => {
    try {
      const res = await axios.get(
        'https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo',
        {
          params: {
            ServiceKey: 'gjBx3AJwGl7IpsyH5u4vhWT4ttQrF%2FtZQuvFlW8mFLDOnloc%2FmQrv0h1hgK%2FsVZt%2BHTghN6FWJ2VhUF1nozcZA%3D%3D',
            solYear: new Date().getFullYear(),
            numOfRows: 100,
            _type: 'json'
          }
        }
      )
      const items = res.data?.response?.body?.items?.item || []
      const dates = items.map(item => formatDate(item.locdate))
      setSpecificDates(dates)
    } catch (err) {
      console.error('공휴일 API 오류:', err)
    }
  }

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

        // 커스텀 헤더
        renderHeader={date => {
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          return (
            <View style={styles.headerRow}>
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
          )
        }}

        // dayComponent 에서 공휴일·오늘·선택일 스타일 직접 적용
        dayComponent={({ date, state }) => {
          const isToday    = date.dateString === today
          const isSelected = date.dateString === selectedDate
          const isHoliday  = specificDates.includes(date.dateString)

          const containerStyle = [
            styles.CustomDay,
            isToday    && styles.todayContainer,
            isSelected && styles.selectedContainer
          ]

          const textStyle = [
            styles.dayText,
            state === 'disabled' && styles.disabledDay,
            isHoliday             && styles.holidayText,
            (isToday || isSelected) && styles.selectedText
          ]

          return (
            <TouchableOpacity
              style={containerStyle}
              onPress={() => handleDayPress({ dateString: date.dateString })}
            >
              <Text style={textStyle}>
                {date.day}
              </Text>
            </TouchableOpacity>
          )
        }}

        // 오늘에만 dot 표시
        markedDates={{
          [today]: { marked: true, dotColor: 'skyblue' }
        }}
        markingType="custom"

        // 기본 테마
        theme={{
          textSectionTitleColor: "#242424",
          'stylesheet.calendar.header': {
            dayTextAtIndex0: { color: "#FF5656" },
            dayTextAtIndex6: { color: "#4766FF" }
          }
        }}
        style={styles.calendar}
      />

      <MyModal
        visible={modalVisible}
        onClose={() => setModal(false)}
        data={selectedDate}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  calendar: {
    borderRadius: 8,
    margin: 30
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 20
    
  },
  headerGroup: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  headerText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Pretendard-Bold',
    marginRight: 16
  },
  arrowGroup: {
    flexDirection: 'row',
     alignItems: 'center'
  },
  arrowBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8
  },
  arrow: {
    fontSize: 16,
    color: '#333'
  },
  CustomDay: {
    width: 36,
    height: 36,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dayText: {
    fontSize: 16,
    color: '#242424'
  },
  disabledDay: {
    color: '#ccc'
  },
  holidayText: {
    color: 'red',
    fontWeight: 'bold'
  },
  todayContainer: {
    backgroundColor: '#00adf5',
    borderRadius: 18
  },
  selectedContainer: {
    backgroundColor: '#00adf5',
    borderRadius: 18
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})