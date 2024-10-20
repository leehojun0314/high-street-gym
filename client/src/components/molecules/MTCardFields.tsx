import { TFields, TTableData } from '@/types';
import { getDateBySting } from '@/utils';
import React from 'react';
import MTInput from './MTInput';

export default function MTCardFields({
  field,
  fields,
  tableData,
}: {
  field: string;
  fields: TFields;
  tableData: TTableData;
}) {
  return (
    <React.Fragment>
      <p className='text-sm font-semibold text-gray-500 inline-block'>
        {fields[field].isForeignKey ? fields[field].label : field}
      </p>
      <p
        className={`block text-m break-words mb-2 ${
          !fields[field].isPrimaryKey ? 'peer-checked:hidden' : ''
        }`}
      >
        {fields[field].isForeignKey
          ? fields[field].options?.find(
              (option) => option.value === tableData[fields[field].name],
            )?.label
          : fields[field].typeName === 'Time'
          ? (tableData[fields[field].name] as string)
          : fields[field].typeName === 'Date' && tableData[fields[field].name]
          ? getDateBySting(tableData[fields[field].name] as string)
          : fields[field].typeName === 'Boolean'
          ? String(tableData[fields[field].name])
          : fields[field].typeName === 'LongString'
          ? String(tableData[fields[field].name])
              .split(/[\r\n]+/)
              .map((line) => <div>{line}</div>)
          : tableData[fields[field].name]
          ? tableData[fields[field].name]
          : 'null'}
        {/* {tableData[fields[field].name] instanceof Date
          ? formatDate(tableData[fields[field].name] as Date)
          : fields[field].isForeignKey && fields[field].options
          ? String(
              fields[field].options.find(
                (option) => option.value === tableData[fields[field].name],
              )?.label ?? '',
            )
          : String(tableData[fields[field].name])} */}
      </p>
      <div className='hidden w-full peer-checked:block'>
        <MTInput
          fields={fields}
          field={field}
          editPrimaryKey={false}
          tableData={tableData}
        />
      </div>
      {/* <Input
        type='text'
        className={`hidden mb-2 ${
          !fields[field].isPrimaryKey ? 'peer-checked:block' : ''
        } w-full`}
        name={field}
        placeholder={
          tableData[fields[field].name] instanceof Date
            ? formatDate(tableData[fields[field].name] as Date)
            : String(tableData[fields[field].name])
        }
        readOnly={fields[field].isPrimaryKey}
      ></Input> */}
    </React.Fragment>
  );
}
