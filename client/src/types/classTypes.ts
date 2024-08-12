import { TActivity, TLocation } from './tableTypes';

export type TClass = {
  class_id: number;
  class_location_id: number;
  class_activity_id: number;
  class_trainer_user_id: number;
  class_name: string;
  class_datetime: string;
};
export type TExtendedClass = TClass & {
  Location: TLocation;
  Activity: TActivity;
  User: {
    user_firstname: string;
  };
};
