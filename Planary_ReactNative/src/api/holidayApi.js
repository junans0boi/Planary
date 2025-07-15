import axios from 'axios';

/**
 * 백엔드에서 저장한 공휴일 리스트를 가져옵니다.
 * @returns {Promise<string[]>} 날짜 문자열 배열(YYYY-MM-DD 포맷)
 */
export async function getHolidays() {
  const res = await axios.get('/api/holidays');
  const data = res.data;
  let list = [];

  if (Array.isArray(data)) {
    list = data;
  } else if (Array.isArray(data.holidays)) {
    list = data.holidays;
  } else if (Array.isArray(data.items)) {
    list = data.items;
  } else {
    console.warn('Unexpected holidays payload:', data);
    return [];
  }

  return list
    .map(item => item.date || item.locdate)
    .filter(Boolean);
}