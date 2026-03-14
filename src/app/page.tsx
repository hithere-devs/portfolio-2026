import Nav from '@/components/nav';
import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';
import FeaturedWorkSection from '@/components/featured-work-section';
import SkillsSection from '@/components/skills-section';
import StickyScrollExperience from '@/components/sticky-scroll-experience';
import ContactCTA from '@/components/contact-cta';
import SectionTransition from '@/components/section-transition';
import GlobalTimeline from '@/components/global-timeline';

export default function Home() {
	return (
		<main className='flex flex-col min-h-screen bg-background selection:bg-primary/20 relative'>
			{/* Global Background Grid */}
			<div className='fixed inset-0 z-0 pointer-events-none opacity-[0.02]'>
				<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
					<defs>
						<pattern id='global-grid' width='40' height='40' patternUnits='userSpaceOnUse'>
							<path d='M 40 0 L 0 0 0 40' fill='none' stroke='currentColor' strokeWidth='1' />
						</pattern>
					</defs>
					<rect width='100%' height='100%' fill='url(#global-grid)' />
				</svg>
			</div>

			{/* Global Scroll Progress Line */}
			<GlobalTimeline />

			<Nav />

			<div className='relative z-10'>
				<HeroSection />
				<SectionTransition text="PROJECTS" />
			</div>

			<div id='projects' className='relative z-20 mt-32 lg:mt-48'>
				<FeaturedWorkSection />
				<SectionTransition text="EXPERIENCE" />
			</div>

			<div id='experience' className='relative z-30'>
				<StickyScrollExperience />
				<SectionTransition text="SKILLS" />
			</div>

			<div id='skills' className='relative z-40'>
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
