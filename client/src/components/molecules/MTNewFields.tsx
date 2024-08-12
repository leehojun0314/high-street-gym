import { TFields } from '@/types';
import React from 'react';
import MTInput from './MTInput';

export default function MTNewFields({
  field,
  fields,
}: {
  field: string;
  fields: TFields;
}) {
  if (fields[field].isPrimaryKey) {
    return null;
  }
  return (
    <React.Fragment>
      <label htmlFor={field} className='texst-sm font-semibold text-gray-500'>
        {fields[field].isForeignKey ? fields[field].label : field}
      </label>

      <MTInput fields={fields} field={field} />
    </React.Fragment>
  );
}
