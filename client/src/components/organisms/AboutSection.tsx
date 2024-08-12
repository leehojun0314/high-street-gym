import { motion } from 'framer-motion';
export default function AboutSection() {
	return (
		<section className='bg-black min-h-[50vh] p-12 text-white text-center'>
			<strong className='text-2xl'>About Us</strong>
			<motion.p
				className=' relative top-[70px]'
				whileInView={{
					y: -50,
				}}
				transition={{
					type: 'spring',
				}}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
				nesciunt debitis fugit, delectus quisquam illo maiores, quo minus
				temporibus, odio vel voluptas deserunt sequi vitae. Molestiae
				consequatur dicta eveniet recusandae! Lorem ipsum dolor sit amet
				consectetur adipisicing elit. Molestias nesciunt debitis fugit,
				delectus quisquam illo maiores, quo minus temporibus, odio vel
				voluptas deserunt sequi vitae. Molestiae consequatur dicta eveniet
				recusandae! Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Molestias nesciunt debitis fugit, delectus quisquam illo maiores,
				quo minus temporibus, odio vel voluptas deserunt sequi vitae.
				Molestiae consequatur dicta eveniet recusandae! Lorem ipsum dolor
				sit amet consectetur adipisicing elit. Molestias nesciunt debitis
				fugit, delectus quisquam illo maiores, quo minus temporibus, odio
				vel voluptas deserunt sequi vitae. Molestiae consequatur dicta
				eveniet recusandae! Lorem ipsum dolor sit amet consectetur
				adipisicing elit. Molestias nesciunt debitis fugit, delectus
				quisquam illo maiores, quo minus temporibus, odio vel voluptas
				deserunt sequi vitae. Molestiae consequatur dicta eveniet
				recusandae!
			</motion.p>
		</section>
	);
}
