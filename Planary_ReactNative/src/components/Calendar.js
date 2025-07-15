import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars'
import { getHolidays } from '../api/holidayApi'

// 1. 로케일 설정
LocaleConfig.locales.ko = {
  monthNames: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
  monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘'
}
LocaleConfig.defaultLocale = 'ko'

export default function Calendar({
  current,
  onDayPress,
  holidays = [],
  diaries = {},
  today
}) {
  const [specificDates, setSpecificDates] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const dates = await getHolidays()
        setSpecificDates(dates)
      } catch (e) {
        console.error('공휴일 불러오기 실패:', e)
      }
    })()
  }, [])

  const buildMarked = () => {
    const marked = {
      [today]: { marked: true, dotColor: 'skyblue' }
    }
    Object.keys(diaries).forEach(date => {
      marked[date] = { marked: true, dotColor: 'blue' }
    })
    specificDates.forEach(d => {
      marked[d] = marked[d]
        ? { ...marked[d], dotColor: 'red' }
        : { marked: true, dotColor: 'transparent' }
    })
    return marked
  }

  return (
    <View style={styles.container}>
      <RNCalendar
        current={current}
        onDayPress={onDayPress}
        hideArrows={true}
        renderHeader={date => {
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          return (
            <View style={styles.headerContainer}>
              <View style={styles.headerLeft}>
                <Text style={styles.headerText}>{`${year}.${month}`}</Text>
                <View style={styles.arrowGroup}>
                  <TouchableOpacity onPress={() => onDayPress({ dateString: new Date(date.setMonth(date.getMonth()-1)).toISOString().split('T')[0] })} style={styles.arrowBtn}>
                    <Text style={styles.arrow}>{'<'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onDayPress({ dateString: new Date(date.setMonth(date.getMonth()+1)).toISOString().split('T')[0] })} style={styles.arrowBtn}>
                    <Text style={styles.arrow}>{'>'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }}
        dayComponent={({ date, state }) => {
          const dStr = date.dateString
          const weekday = new Date(dStr).getDay()
          const isToday = dStr === today
          const isHoliday = holidays.includes(dStr)
          const memo = diaries[dStr]?.title
          const isDisabled = state === 'disabled'

          const numberWrapperStyle = [
            styles.dayNumberWrapper,
            isToday && styles.todayCircle,
            diaries[dStr] && styles.diaryCircle
          ]

          const textStyle = [
            styles.dayText,
            isDisabled ? styles.disabledText : null,
            weekday === 0 && { color: '#FF5656' },
            weekday === 6 && { color: '#4766FF' },
            isHoliday && styles.holidayText
          ]

          return (
            <TouchableOpacity
              style={styles.dayContainer}
              onPress={() => !isDisabled && onDayPress({ dateString: dStr })}
              disabled={isDisabled}
            >
              <View style={numberWrapperStyle}>
                <Text style={textStyle}>{date.day}</Text>
              </View>
              {memo && <Text style={styles.memoText} numberOfLines={1}>{memo}</Text>}
            </TouchableOpacity>
          )
        }}
        markedDates={buildMarked()}
        markingType="custom"
        theme={{
          'stylesheet.calendar.header': styles.headerTheme,
          'stylesheet.calendar.main': styles.mainTheme
        }}
        style={styles.calendar}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  calendar: { borderRadius: 8, margin: 30 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 7 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerText: { fontSize: 30, fontWeight: '600', color: '#333', marginRight: 16 },
  arrowGroup: { flexDirection: 'row', alignItems: 'center' },
  arrowBtn: { borderWidth: 1, borderColor: '#59B4F7', borderRadius: 4, padding: 4, marginLeft: 8 },
  arrow: { fontSize: 16, color: '#59B4F7' },
  dayContainer: { width: 50, minHeight: 80, alignItems: 'center', paddingTop: 4, marginBottom: 8 },
  dayText: { fontSize: 12, color: '#898989' },
  disabledText: { color: '#ccc' },
  holidayText: { color: 'red', fontWeight: 'bold' },
  dayNumberWrapper: { minWidth: 36, minHeight: 36, padding: 8, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  todayCircle: { backgroundColor: '#00adf5' },
  diaryCircle: { backgroundColor: '#00adf5' },
  memoText: { fontSize: 10, color: '#444', marginTop: 4, backgroundColor: '#e0f7fa', paddingHorizontal: 4, borderRadius: 4, width: 80, textAlign: 'center' },
  headerTheme: {
    header: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 20 },
    week: { flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: 'lightgray', paddingBottom: 4, marginBottom: 15 },
    dayTextAtIndex0: { color: '#FF5656' }, dayTextAtIndex6: { color: '#4766FF' }
  },
  mainTheme: { week: { flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: 'lightgray', paddingBottom: 8 } }
})