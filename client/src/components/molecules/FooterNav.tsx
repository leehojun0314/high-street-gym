import React from 'react';

export default function FooterNav({ children }: React.PropsWithChildren) {
	return <nav className='flex flex-col gap-[15px] flex-1'>{children}</nav>;
}
