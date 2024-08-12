import { Link } from 'react-router-dom';

export default function Logo({ className }: { className?: string }) {
	return (
		<Link
			className={`font-alkatra text-inherit text-center ${className}`}
			to='/'
		>
			High Street Gym
		</Link>
	);
}
