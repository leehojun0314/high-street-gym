import { HTMLAttributes } from 'react';

export default function IconContainer(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={`block md:hidden justify-self-center h-fit w-7 leading-[0] ${props.className}`}
		>
			{props.children}
		</div>
	);
}
