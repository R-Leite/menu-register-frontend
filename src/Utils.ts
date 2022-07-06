// 曜日に変換
export const dayToJan: { [name: number]: string } = {
  0: '日',
  1: '月',
  2: '火',
  3: '水',
  4: '木',
  5: '金',
  6: '土',
};

// Dateを文字列に
export const formatDate = (date: Date, format: string) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const dayOfWeek = dayToJan[date.getDay()];

  return format
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('DD', dayOfWeek);
};
