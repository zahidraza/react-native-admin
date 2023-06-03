import { startOfDay, endOfDay } from 'date-fns';
import {
  utcToZonedTime,
  zonedTimeToUtc,
  toDate,
  formatInTimeZone,
} from 'date-fns-tz';
import { isEmpty } from './helpers';

export type DateType = string | number | Date;

/**
 * Get Start of Day honouring Timezone.
 *
 * @param {Date|String|Number} date - the date with values representing the local time
 * @param {String} tzOffset - the time zone offset with respect to which day start in required
 */
export const zonedStartOfDay = (date: DateType, tzOffset: string) => {
  if (!date || !tzOffset) return;

  const input = toDate(date);

  const inputZoned = utcToZonedTime(input, tzOffset);

  const dayStartZoned = startOfDay(inputZoned);

  const dayStart = zonedTimeToUtc(dayStartZoned, tzOffset);

  return dayStart;
};

/**
 * Get End of Day honouring Timezone.
 *
 * @param {Date|String|Number} date - the date with values representing the local time
 * @param {String} tzOffset - the time zone offset with respect to which day start in required
 */
export const zonedEndOfDay = (date: DateType, tzOffset: string) => {
  if (!date || !tzOffset) return;

  const input = toDate(date);

  const inputZoned = utcToZonedTime(input, tzOffset);

  const dayEndZoned = endOfDay(inputZoned);

  const dayEnd = zonedTimeToUtc(dayEndZoned, tzOffset);

  return dayEnd;
};

/**
 * Find Timezone offset in minutes.
 *
 * @param {String} utcOffset - UTC offset string. e.g. +05:30
 * @returns offset in minutes.
 */
export const offsetInMinutes = (utcOffset: string) => {
  if (!utcOffset || typeof utcOffset !== 'string') return 0;
  const isPositive = utcOffset.includes('+');
  const offset = utcOffset.substring(1).trim().replace(':', '');
  if (offset.length === 4) {
    const hours = Number(offset.substring(0, 2));
    const minutes = Number(offset.substring(2, 4));
    const finalMinutes = hours * 60 + minutes;
    return isPositive ? finalMinutes : -finalMinutes;
  }
  return 0;
};

export const formatDate = (date: DateType, utcOffset: string) =>
  format(date, utcOffset, 'MMM dd, yy');

export const formatTime = (date: DateType, utcOffset: string) =>
  format(date, utcOffset, 'hh:mm a');

export const formatDateTime = (date: DateType, utcOffset: string) =>
  format(date, utcOffset, 'MMM dd, yy hh:mm a');

export const format = (date: DateType, utcOffset: string, pattern: string) => {
  if (!date || !utcOffset || typeof utcOffset !== 'string' || isEmpty(pattern))
    return '-';
  const input = toDate(date);

  return formatInTimeZone(input, utcOffset, pattern);
};
