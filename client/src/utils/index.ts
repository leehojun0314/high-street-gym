import { nullableFields } from '@/static/nullableFields';

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getDateByDate(date: Date) {
  return `${date.getFullYear()}-${date
    .getMonth()
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}
export function getDateBySting(date: string) {
  const [year, month, day] = date.split('T')[0].split('-');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  // return `${date.getFullYear()}-${date
  //   .getMonth()
  //   .toString()
  //   .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}
export function getTimebyDate(date: Date) {
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}
export function getTimeByString(date: string) {
  const [hours, minutes] = date.split(':');
  return `${hours}:${minutes}`;
}
export function formatDateByString(date: string) {
  const [year, month, day] = date.split('T')[0].split('-');
  const [hours, minutes] = date.split('T')[1].split(':');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
/**
 * Converts a time string in the format "HH:mm" to an ISO 8601 date string.
 * The current date is used, with the provided time string.
 * @param {string} timeStr - A time string in the format "HH:mm".
 * @returns {string} - An ISO 8601 date string in the format "YYYY-MM-DDT00:00:00Z".
 */
export function convertTimeToISO8601(timeStr: string) {
  // 현재 날짜를 가져옵니다.
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
  const day = String(today.getDate()).padStart(2, '0');

  // 입력된 시간 문자열을 시와 분으로 분리합니다.
  const [hours, minutes] = timeStr.split(':');

  // ISO-8601 형식으로 변환합니다.
  const isoString = `${year}-${month}-${day}T${hours}:${minutes}:00Z`;

  return isoString;
}
/**
 * Converts a date string in the format "YYYY-MM-DD" to an ISO 8601 date string.
 * @param {string} dateStr - A date string in the format "YYYY-MM-DD".
 * @returns {string} - An ISO 8601 date string in the format "YYYY-MM-DDT00:00:00Z".
 */
export function convertDateToISO8601(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(
    2,
    '0',
  )}T00:00:00`;
  return isoString;
}
export function convertONOFF(str: 'on' | 'off') {
  if (str === 'on') {
    return true;
  } else if (str === 'off') {
    return false;
  } else {
    return false;
  }
}
export function remapData(
  data: Record<string, FormDataEntryValue | null | number | boolean>,
) {
  let error = false;
  for (const key in data) {
    if (!nullableFields.includes(key) && !data[key]) {
      alert(`${key} field must be included`);
      error = true;
      return [error, {}];
    }
    if (!data[key] && nullableFields.includes(key)) {
      data[key] = null;
    }
    // if (key === 'class_datetime') {
    //   data[key] = new Date(data[key] as string).toISOString();
    // }
    // if (key === 'class_time') {
    //   data[key] = convertTimeToISO8601(data[key] as string);
    // }

    // if (key === 'class_date' || key === 'dob') {
    //   data[key] = convertDateToISO8601(data[key] as string);
    // }
    if (key === 'dob' && data[key]) {
      data[key] = convertDateToISO8601(data[key] as string);
    }
    if (key.endsWith('id')) {
      data[key] = Number(data[key]);
    }
    if (key === 'is_recurring') {
      data[key] = convertONOFF(data[key] as 'on' | 'off');
    }
    if (key === 'activity_duration') {
      data[key] = Number(data[key]);
    }
  }
  return [error, Object.assign({}, data)];
}

export function excludeNulls(obj: Record<string, unknown>) {
  const newObj: Record<string, unknown> = {};
  for (const key in obj) {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
export function generateQueryString(obj: Record<string, unknown>) {
  let result = '';
  for (const key in obj) {
    if (obj[key]) {
      result += `${key}=${obj[key]}&`;
    }
  }
  return result;
}
/**
 * Converts an ISO 8601 date string to a time string (HH:mm) suitable for HTML time inputs.
 * This function accounts for timezone differences and converts the time to UTC.
 * @param {string} isoString - The ISO 8601 string from the server.
 * @returns {string} - A time string in "HH:mm" format.
 */
export function formatTimeForInput(isoString: string) {
  const date = new Date(isoString);
  const utcHours = date.getUTCHours().toString().padStart(2, '0');
  const utcMinutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${utcHours}:${utcMinutes}`;
}

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

/**
 * Returns the day of the week from a Date object in 'MON', 'TUE', etc. format.
 * @param {Date} date - The Date object from which to extract the day of the week.
 * @returns {string} - A string representing the day of the week.
 */
export function getDayOfWeek(date: Date) {
  return daysOfWeek[date.getDay()];
}
