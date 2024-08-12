import { TFields } from '@/types';
import React from 'react';
import Input from '../atoms/Input';
import MTInput from './MTInput';

export default function MTFilterFields({
  field,
  fields,
}: {
  field: string;
  fields: TFields;
}) {
  return (
    <React.Fragment>
      <label htmlFor={field} className='texst-sm font-semibold text-gray-500'>
        {fields[field].isForeignKey
          ? fields[field].label
          : fields[field].typeName === 'Boolean'
          ? ''
          : field}
      </label>

      {fields[field].isPrimaryKey ? (
        <Input type='number' name={field} />
      ) : (
        <MTInput
          fields={fields}
          field={field}
          optionDefault={false}
          checkboxDefault={false}
        />
      )}
    </React.Fragment>
  );
}
