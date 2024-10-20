import React, { useRef } from 'react';
import EditIcon from '../atoms/icons/EditIcon';
import { TFields, TTableData } from '@/types';
import MTCardFields from './MTCardFields';
import PrimaryBtn from '../atoms/PrimaryBtn';

export default function MTCard({
  tableData,
  fields,
  index,
  handleEditSubmit,
  handleDeleteSubmit,
}: {
  tableData: TTableData;
  fields: TFields;
  index: number;
  handleEditSubmit: (
    evt: React.FormEvent<HTMLFormElement>,
  ) => Promise<void> | undefined;
  handleDeleteSubmit: (
    tableData: TTableData,
  ) => (evt: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const checkBoxRef = useRef<HTMLInputElement>(null);
  return (
    <form
      key={index}
      onSubmit={(evt) => {
        if (handleEditSubmit) {
          handleEditSubmit(evt)!.then(() => {
            if (checkBoxRef.current) {
              checkBoxRef.current.checked = false;
            }
          });
        }
      }}
    >
      <div className='card shadow-md p-4 w-full '>
        <input
          type='checkbox'
          id={`edit-${index}`}
          className='peer hidden'
          ref={checkBoxRef}
        />

        {Object.keys(fields).map((field, index) => (
          <MTCardFields
            key={index}
            fields={fields}
            tableData={tableData}
            field={field}
          />
        ))}

        <label
          htmlFor={`edit-${index}`}
          className='btn btn-primary w-full peer-checked:hidden flex justify-center mt-2'
        >
          <EditIcon />
        </label>
        <div className='hidden peer-checked:flex justify-center flex-row gap-2 w-full pt-3'>
          <label
            htmlFor={`edit-${index}`}
            className='btn btn-secondary flex-grow'
          >
            Cancel
          </label>
          <button
            className='btn btn-warning flex-grow'
            onClick={handleDeleteSubmit(tableData)}
          >
            Delete
          </button>
          <label htmlFor={`edit-${index}`} className='flex-grow'>
            <PrimaryBtn type='submit' className='w-full'>
              Apply
            </PrimaryBtn>
          </label>
        </div>
      </div>
    </form>
  );
}
