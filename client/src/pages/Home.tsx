import AboutSection from '@/components/organisms/AboutSection';
import HeroSection from '@/components/organisms/HeroSection';
import LocationSection from '@/components/organisms/LocationSection';

export default function Home() {
	return (
		<main>
			<HeroSection />
			<AboutSection />
			<LocationSection />
		</main>
	);
}
