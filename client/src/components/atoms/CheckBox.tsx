export default function Checkbox({
  label,
  name,
  defaultChecked,
}: {
  label?: string;
  name?: string;
  defaultChecked?: boolean;
}) {
  console.log('defaultChecked: ', defaultChecked);
  if (label) {
    return (
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='texst-sm font-semibold text-gray-500'>{label}</span>
          <input
            type='checkbox'
            defaultChecked={defaultChecked}
            className='toggle toggle-primary'
          />
        </label>
      </div>
    );
  } else {
    return (
      <input
        type='checkbox'
        className='toggle toggle-primary'
        name={name}
        defaultChecked={defaultChecked}
      />
    );
  }
}
