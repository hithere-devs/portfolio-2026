import Nav from '@/components/nav';
import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';
import FeaturedWorkSection from '@/components/featured-work-section';
import SkillsSection from '@/components/skills-section';
import StickyScrollExperience from '@/components/sticky-scroll-experience';
import ContactCTA from '@/components/contact-cta';

export default function Home() {
	return (
		<main className='flex flex-col min-h-screen bg-background selection:bg-primary/20'>
			<Nav />

			<HeroSection />

			<div id='projects'>
				<FeaturedWorkSection />
			</div>

			<div id='experience'>
				<StickyScrollExperience />
			</div>

			<div id='skills'>
				<SkillsSection />
			</div>

			<ContactCTA />

			<Footer />
		</main>
	);
}
