import { HTMLAttributes } from 'react';

export default function ErrorMsg(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<span
			{...props}
			className={`text-red text-center  ${
				props.className ? props.className : ''
			}`}
			style={{
				gridColumn: '1 / -1',
			}}
		>
			{props.children}
		</span>
	);
}
