import { TClass } from './classTypes';
import { TLocation } from './tableTypes';
import { TUser } from './userTypes';

export type TBooking = {
  booking_id: number;
  booking_user_id: number;
  booking_class_id: number;
  booking_created_datetime: Date;
};
export type TExtendedBooking = TBooking & {
  Class: TClass & {
    User: TUser;
    Location: TLocation;
  };
};
