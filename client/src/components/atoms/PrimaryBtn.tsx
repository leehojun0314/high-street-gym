import { HTMLMotionProps, motion } from 'framer-motion';

export default function PrimaryBtn(props: HTMLMotionProps<'button'>) {
	return (
		<motion.button
			{...props}
			className={` btn btn-primary ${props.className}`}
			whileHover={{
				scale: 1.05,
				boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
			}}
			whileTap={{ scale: 0.95 }}
			transition={{ type: 'spring', stiffness: 400, damping: 10 }}
		>
			{props.children}
		</motion.button>
	);
}
