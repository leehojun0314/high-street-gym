import ResponsiveRow from '@/components/atoms/table/ResponsiveRow';
import ResponseiveData from '../atoms/table/ResponsiveData';
import { capitalize, formatDateByString } from '@/utils';
import { TExtendedClass } from '@/types/classTypes';

export default function ResponsiveTable({
  classes,
  onSubmit,
}: {
  onSubmit: (classId: number) => () => void;
  classes: TExtendedClass[];
}) {
  console.log('classes:', classes);
  return (
    <div className='w-full overflow-visible md:border md:border-black md:rounded-2xl md:overflow-auto'>
      <table className='block w-full'>
        <thead className='hidden'>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody className='flex flex-col gap-2'>
          {classes.map((classEl, index) => {
            const keys = Object.keys(classEl) as (keyof typeof classEl)[];
            return (
              <ResponsiveRow key={index}>
                {keys.map((key, index2) => {
                  if (key.endsWith('id')) {
                    return null;
                  } else {
                    return (
                      <ResponseiveData key={index2}>
                        <span className='text-gray-400 '>
                          {key === 'User' ? 'Trainer' : capitalize(key)}
                        </span>
                        <span className='font-semibold'>
                          {key === 'class_datetime'
                            ? formatDateByString(classEl[key])
                            : key === 'Location'
                            ? classEl[key].location_name
                            : key === 'Activity'
                            ? classEl[key].activity_name
                            : key === 'User'
                            ? classEl[key].user_firstname
                            : String(classEl[key])}
                        </span>
                      </ResponseiveData>
                    );
                  }
                })}
                <ResponseiveData className='grid-area'>
                  <button
                    className=' btn btn-primary w-full grid-area'
                    onClick={onSubmit(classEl.class_id)}
                  >
                    Book
                  </button>
                </ResponseiveData>
              </ResponsiveRow>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
