export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function validateRegister(fields: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
  gender: string;
  dob: string;
}) {
  const keys = Object.keys(fields);
  let result = {
    status: true,
    error: '',
  };
  for (let key of keys) {
    switch (key) {
      case 'firstName':
        if (!/^[a-zA-Z가-힣]{2,}$/.test(fields[key])) {
          result = { status: false, error: 'Invalid first name' };
        }
        break;
      case 'lastName':
        if (!/^[a-zA-Z가-힣]$/.test(fields[key])) {
          result = { status: false, error: 'Invalid last name' };
        }
        break;
      case 'email':
        if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(fields[key])
        ) {
          result = { status: false, error: 'Invalid email' };
        }
        break;
      case 'password':
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            fields[key],
          )
        ) {
          result = { status: false, error: 'Invalid email' };
        }
        break;
      case 'mobile':
        if (
          !/^\+?\d{1,3}?[-.\s]?\(?(\d{1,3})?\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/.test(
            fields[key],
          )
        ) {
          result = { status: false, error: 'Invalid mobile' };
        }
        break;
      case 'gender':
        if (
          fields[key] !== 'MALE' &&
          fields[key] !== 'FEMALE' &&
          fields[key] !== 'NOT_SPECIFIED'
        ) {
          result = { status: false, error: 'Invalid gender' };
        }
        break;
      // case 'dob':
      // 	if (!fields[key]) {
      // 		break;
      // 	} else if (!/^\d{1,2}-\d{1,2}-\d{4}$/.test(fields[key])) {
      // 		result = {
      // 			status: false,
      // 			error: 'Invalid format of birth date',
      // 		};
      // 		break;
      // 	} else {
      // 		break;
      // 	}
      default: {
        break;
      }
    }
  }
  return result;
}

export function remapFilters(obj: Record<string, unknown>) {
  const newObj: Record<string, unknown> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== '') {
      newObj[key] = { contains: obj[key] };
    }
    if (key.endsWith('id')) {
      newObj[key] = Number(obj[key]);
    }
    if (key === 'gender' || key === 'user_role') {
      newObj[key] = {
        equals: obj[key],
      };
    }
    if (key === 'dob') {
      newObj[key] = convertDateToISO8601(obj[key] as string);
    }
    // if (key === 'class_datetime') {
    //   newObj[key] = obj[key]
    // }
  }
  return newObj;
}

export function convertDateToISO8601(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(
    2,
    '0',
  )}T00:00:00Z`;
  return isoString;
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
