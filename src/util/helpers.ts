import { formatInTimeZone } from 'date-fns-tz';

export const getRootUrl = (appUrl: string) => {
  let rootUrl = appUrl.substring(0, appUrl.lastIndexOf('/'));
  rootUrl = rootUrl.substring(0, rootUrl.lastIndexOf('/'));
  return rootUrl;
};

export const getBaseUrl = ({ scheme = 'http', host = '', port = '80' }) => {
  let baseUrl: string = '';
  if (!isEmpty(host)) {
    const finalPort = `${port}` === '80' ? '' : `:${port}`;
    baseUrl = `${scheme}://${host}${finalPort}`;
  }
  return baseUrl;
};

export const getDistinctValues = (values: any[]) => {
  if (!values) return values;
  if (!Array.isArray(values)) return values;
  let set = new Set();
  values.forEach((value) => set.add(value));
  return Array.from(set);
};

export const isEmpty = (value: any) => {
  let result: boolean = false;
  if (typeof value === 'string') {
    result = value.trim() === '';
  } else if (Array.isArray(value)) {
    result = value.length === 0;
  } else if (value instanceof Date) {
    result = false;
  } else if (value == null || value === undefined) {
    result = true;
  } else if (typeof value === 'object') {
    result = Object.keys(value).length === 0;
  }
  // console.log({value, result})
  return result;
};

export const isTrue = (value: string | boolean | undefined) =>
  value && typeof value === 'string' ? value === 'true' : value === true;

export const toFixed = (value: number, precision = 2) => {
  if (typeof value !== 'number') return value;
  return Number(value.toFixed(precision));
};

export const denormalize = (data: any) => {
  if (!data) return [];
  return typeof data === 'object'
    ? Object.keys(data).map((key) => data[key])
    : data;
};

export const preciseDiff = (t1: number, t2: number = 0) => {
  let diff = t2 > t1 ? t2 - t1 : t1 - t2;
  let seconds = 0,
    minutes = 0,
    hours = 0,
    days = 0;

  diff = diff / 1000;
  seconds = Math.floor(diff % 60);

  diff /= 60;
  minutes = Math.floor(diff % 60);

  diff /= 60;
  hours = Math.floor(diff % 24);

  diff /= 24;
  days = Math.floor(diff);

  return { days, hours, minutes, seconds };
};

type HumanizeOptions = {
  day?: 'day' | 'd';
  hour?: 'hour' | 'h';
  min?: 'minute' | 'min' | 'm';
  second?: 'second' | 'sec' | 's';
};

export const humanize = (
  t1: number,
  t2?: number,
  options?: HumanizeOptions
) => {
  const { days, hours, minutes, seconds } = preciseDiff(t1, t2);

  const {
    day = 'day',
    hour = 'hour',
    min = 'min',
    second = 'second',
  } = options || {};

  const dayStr =
    days === 0
      ? ''
      : days +
        `${day === 'd' ? '' : ' '}${
          days === 1 ? `${day} ` : `${day}${day === 'd' ? '' : 's'} `
        }`;
  const hourStr =
    hours === 0
      ? ''
      : hours +
        `${hour === 'h' ? '' : ' '}${
          hours === 1 ? `${hour} ` : `${hour}${hour === 'h' ? '' : 's'} `
        }`;
  const minStr =
    minutes === 0
      ? ''
      : minutes +
        `${min === 'm' ? '' : ' '}${
          minutes === 1 ? `${min} ` : `${min}${min === 'm' ? '' : 's'} `
        }`;
  const secStr =
    seconds === 0
      ? ''
      : seconds +
        `${second === 's' ? '' : ' '}${
          seconds === 1
            ? `${second} `
            : `${second}${second === 's' ? '' : 's'} `
        }`;

  return dayStr + hourStr + minStr + secStr;
};

export const truncate = (str: string, length = 20) => {
  if (typeof str === 'string' && str.length > length) {
    return str.substring(0, length - 3) + '...';
  }
  return str;
};

// export const multiLineText = (text: string, length: number, delimitter = " ") => {
//   if (!text || typeof text !== "string") return [];

//   const result = [];
//   while (text.length > length) {
//     let idx = text.substring(0, length).lastIndexOf(delimitter);
//     if (idx === -1) {
//       idx = text.indexOf(delimitter);
//       if (idx === -1) break;
//     }
//     result.push(text.substring(0, idx));
//     text = text.substring(idx + 1);
//   }
//   result.push(text);

//   return result;
// };

// Convert time string of format- HH:mm to milliseconds
export const toMillis = (timeStr: string) => {
  if (typeof timeStr !== 'string') return 0;
  const hours = Number(timeStr.split(':')[0]);
  const minutes = Number(timeStr.split(':')[1]);
  return (60 * hours + minutes) * 60 * 1000;
};

export const minutesSinceMidNight = (timestamp: number, utc_offset: string) => {
  if (utc_offset) {
    return (
      Number(formatInTimeZone(new Date(timestamp), utc_offset, 'HH')) * 60 +
      Number(formatInTimeZone(new Date(timestamp), utc_offset, 'mm'))
    );
  }
  return 0;
};

export const parseButtons = (value: string) =>
  value
    ?.split(',')
    .filter((e) => !isEmpty(e.trim()))
    .map((e) => Number(e.trim())) || [];

export const listFromCsv = (csvText: string) => {
  const list =
    csvText
      ?.split(',')
      .map((e) => e.trim())
      .filter((e) => !isEmpty(e)) || [];
  return list;
};

/**
 * Get File size in bytes.
 * @param {String} fileSize - Human Readable value of File Size (e.g - 100Byte, 150KB, 2MB, 1.5GB)
 */
export const getBytes = (fileSize: string) => {
  if (isEmpty(fileSize)) return 0;
  if (fileSize.includes('Byte')) {
    return Number(fileSize?.replace('Byte', ''));
  } else if (fileSize.includes('KB')) {
    const size = Number(fileSize?.replace('KB', ''));
    return size * 1024;
  } else if (fileSize.includes('MB')) {
    const size = Number(fileSize?.replace('MB', ''));
    return size * 1024 * 1024;
  } else if (fileSize.includes('GB')) {
    const size = Number(fileSize?.replace('GB', ''));
    return size * 1024 * 1024 * 1024;
  }
  return 0;
};

export const tryParse = (value: string | null | undefined): any => {
  if (value === null || value === undefined) return value;
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};
