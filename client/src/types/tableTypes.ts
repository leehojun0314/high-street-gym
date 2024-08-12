export type TLocation = {
  location_id: number;
  location_name: string;
};
export type TActivity = {
  activity_id: number;
  activity_name: string;
  activity_description: string;
  activity_duration: number;
  activity_type: 'PRIVATE' | 'GROUP';
};
export type TTable =
  | 'activity'
  | 'class'
  | 'location'
  | 'blog'
  | 'user'
  | 'booking';

export type TFields = {
  [key: string]: {
    isEnum: boolean;
    isList: boolean;
    modelName: string;
    name: string;
    typeName: string;
    isPrimaryKey?: boolean;
    isForeignKey?: boolean;
    options?: {
      value: number;
      label: string;
    }[];
    label: string;
  };
};

export type TTableData = {
  [key: string]: string | number | boolean;
};
