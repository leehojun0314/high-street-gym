import { motion } from 'framer-motion';
export default function HeroSection() {
	return (
		<section className='bg-[url("/hero.jpeg")] bg-cover bg-right min-h-[80vh] flex flex-col justify-end items-start p-[50px]'>
			<motion.div
				className='md:h-[450px] md:w-1/2 bg-primary border border-black rounded-2xl flex flex-col justify-around p-6 relative left-[-200px]'
				style={{
					borderWidth: '3px',
				}}
				animate={{
					x: 200,
					opacity: 1,
				}}
				transition={{
					type: 'spring',
					// damping: 20,
					// stiffness: 100,
				}}
				initial={{ opacity: 0 }}
				whileHover={{
					scale: 1.1,
				}}
			>
				<h1 className='hidden text-center text-[28px] font-bold md:block md:text-[40px]'>
					Welcome to <br /> High Street Gym
				</h1>
				<strong
					style={{ textTransform: 'uppercase' }}
					className='text-center text-[28px] font-bold md:text-[40px]'
				>
					building the next generation of legends
				</strong>
			</motion.div>
		</section>
	);
}
