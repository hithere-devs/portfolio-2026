import Nav from '@/components/nav';
import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';
import FeaturedWorkSection from '@/components/featured-work-section';
import SkillsSection from '@/components/skills-section';
import StickyScrollExperience from '@/components/sticky-scroll-experience';
import WritingTeaser from '@/components/writing-teaser';
import ContactCTA from '@/components/contact-cta';
import SectionTransition from '@/components/section-transition';
import GlobalTimeline from '@/components/global-timeline';

export default function Home() {
	return (
		<main className='flex flex-col min-h-screen bg-background selection:bg-primary/20 relative'>
			{/* Global Scroll Progress Line */}
			<GlobalTimeline />

			<Nav />

			<div className='relative z-10'>
				<HeroSection />
				<SectionTransition text="WRITING" />
			</div>

			<div id='writing' className='relative z-20 mt-32 lg:mt-48'>
				<WritingTeaser />
				<SectionTransition text="PROJECTS" />
			</div>

			<div id='projects' className='relative z-30'>
				<FeaturedWorkSection />
				<SectionTransition text="EXPERIENCE" />
			</div>

			<div id='experience' className='relative z-40'>
				<StickyScrollExperience />
				<SectionTransition text="SKILLS" />
			</div>

			<div id='skills' className='relative z-[45]'>
				<SkillsSection />
				<SectionTransition text="CONNECT" />
			</div>

			<div className='relative z-50'>
				<ContactCTA />
				<Footer />
			</div>
		</main>
	);
}
