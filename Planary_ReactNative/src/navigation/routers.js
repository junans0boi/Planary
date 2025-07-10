// src/navigation/routes.js
import CalendarScreen from '../screens/CalendarScreen';
import DiaryScreen from '../screens/DiaryScreen';

export const routes = [
    { key: 'CALENDAR', label: '캘린더', screen: CalendarScreen, icon: 'calendar-outline' },
    { key: 'DIARY', label: '일기', screen: DiaryScreen, icon: 'book-outline' },
];