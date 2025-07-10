// src/navigation/routes.js
import CalendarScreen from '../screens/CalendarScreen';
import DiaryScreen from '../screens/DiaryScreen';

export const routes = [
  {
    key: 'TODAY',
    label: 'TODAY',
    screen: CalendarScreen,
  },
  {
    key: 'DIARY',
    label: '다이어리',
    screen: DiaryScreen,
  },
];