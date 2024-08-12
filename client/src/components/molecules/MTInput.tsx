import { TFields, TTableData } from '@/types';
import Select from './Select';
import Input from '../atoms/Input';
import Checkbox from '../atoms/CheckBox';
import { formatTimeForInput } from '@/utils';

export default function MTInput({
  fields,
  field,
  tableData = {},
  editPrimaryKey = false,
  optionDefault = true,
  checkboxDefault = true,
}: {
  fields: TFields;
  field: string;
  editPrimaryKey?: boolean;
  tableData?: TTableData;
  optionDefault?: boolean;
  checkboxDefault?: boolean;
}) {
  return (
    <>
      {fields[field].isPrimaryKey && !editPrimaryKey ? (
        <Input
          type='number'
          name={field}
          className='hidden'
          defaultValue={tableData[fields[field].name] ?? ''}
        />
      ) : fields[field].isForeignKey ? (
        <Select
          name={field}
          defaultValue={
            !optionDefault
              ? undefined
              : (tableData[fields[field].name] as string) ?? ''
          }
        >
          {!optionDefault && <option></option>}
          {fields[field].options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : fields[field].typeName === 'Int' ? (
        <Input
          type='number'
          name={field}
          placeholder={field}
          defaultValue={tableData[fields[field].name] ?? ''}
        />
      ) : fields[field].typeName === 'String' ? (
        <Input
          type='text'
          name={field}
          placeholder={field}
          defaultValue={tableData[fields[field].name] ?? ''}
        />
      ) : fields[field].typeName === 'LongString' ? (
        <textarea
          defaultValue={tableData[fields[field].name] as string}
          className='textarea textarea-bordered w-full'
          name={field}
        ></textarea>
      ) : fields[field].typeName === 'DateTime' ? (
        <Input
          type='datetime-local'
          name={field}
          defaultValue={
            tableData[fields[field].name]
              ? new Date(tableData[fields[field].name] as string)
              : ''
          }
        />
      ) : fields[field].typeName === 'Time' ? (
        <Input
          type='time'
          name={field}
          placeholder={field}
          defaultValue={formatTimeForInput(
            (tableData[fields[field].name] as string) ?? '',
          )}
        />
      ) : fields[field].typeName === 'Boolean' ? (
        <Checkbox
          name={field}
          defaultChecked={
            !checkboxDefault
              ? undefined
              : (tableData[fields[field].name] as boolean) ?? false
          }
        />
      ) : fields[field].isEnum === true ? (
        <Select
          name={field}
          defaultValue={
            !optionDefault
              ? undefined
              : tableData[fields[field].name]
              ? (tableData[fields[field].name] as string)
              : (fields[field].options?.[0]?.value as unknown as string) ?? ''
          }
        >
          {!optionDefault && <option></option>}
          {fields[field].options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        ''
      )}
    </>
  );
}
