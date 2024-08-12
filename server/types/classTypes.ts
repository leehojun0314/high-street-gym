export enum EWeek {
  SUNDAY = 'SUN',
  MONDAY = 'MON',
  TUESDAY = 'TUE',
  WEDNESDAY = 'WED',
  THURSDAY = 'THU',
  FRIDAY = 'FRI',
  SATURDAY = 'SAT',
}
export enum EType {
  GROUP = 'GROUP',
  PRIVATE = 'PRIVATE',
}
export const weekDayNames = {
  SUN: 'Sunday',
  MON: 'Monday',
  TUE: 'Tuesday',
  WED: 'Wednesday',
  THU: 'Thursday',
  FRI: 'Friday',
  SAT: 'Saturday',
};
export const activityTypes = {
  GROUP: 'Group',
  PRIVATE: 'Private',
};
export type TClass = {
  class_id: number;
  class_location_id: number;
  class_activity_id: number;
  class_trainer_user_id: number;
  class_datetime: string;
  class_name: string;
};
