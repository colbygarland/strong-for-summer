const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const getNow = (): Date => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60 * 1000);
};

export const getCurrentDate = () => {
  return formatDate(getNow());
};

const getEmoji = (month: string) => {
  switch (month) {
    case 'March':
      return '🌷';
    case 'April':
      return '🌺';
    case 'May':
      return '🐝';
    case 'June':
      return '☀️';
    case 'October':
      return '🎃👻';
    case 'November':
      return '🍂';
    case 'December':
      return '🎄🎅';
    default:
      return '';
  }
};

export const getCurrentDatePretty = (date: string) => {
  const d = date.split('-');
  // @ts-ignore
  const month = monthNames[d[1] - 1];
  const day = parseInt(d[2]);
  return `${getEmoji(month)} ${month} ${day}`;
};

export const getCurrentMonth = () => {
  const currentDate = getCurrentDate().split('-');
  return `${currentDate[0]}-${currentDate[1]}`;
};

export const getBeginningOfMonth = (date: string) => {
  return `${date}-01`;
};

export const getEndOfMonth = (date: string) => {
  const d = new Date(date);
  return formatDate(new Date(d.getFullYear(), d.getMonth() + 2, 0));
};

export const getMonthName = (date: string) => {
  const month = Number(date.split('-')[1]);
  return monthNames[month - 1];
};

export const getYear = (date: string) => {
  return date.split('-')[0];
};
