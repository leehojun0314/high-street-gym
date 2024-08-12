import { InputHTMLAttributes } from 'react';

export default function InputWithIcon(
	props: React.PropsWithChildren<{
		// Icon?: React.ComponentType<SVGElement>;
		placeholder?: string;
		inputProps?: InputHTMLAttributes<HTMLInputElement>;
		Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	}>,
) {
	return (
		<label className='input input-bordered flex items-center gap-2'>
			{props.Icon ? (
				<props.Icon
					fill='currentColor'
					viewBox='0 0 16 16'
					className='h-4 w-4 opacity-70'
				/>
			) : (
				''
			)}
			<input className='grow' {...props.inputProps} />
		</label>
	);
}
