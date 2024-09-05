import dayjs from 'dayjs';

export const DateUtils = {
  defaultDateFormat: 'YYYY-MM-DD',
  defaultDateTimeFormat: 'D MMMM YYYY, HH:mm:ss',
  formatForGrid: (value: string): string => {
    if (!value) return '--';
    const date = dayjs(value);
    return date.format(DateUtils.defaultDateTimeFormat);
  },
};
