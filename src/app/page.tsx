import { CustomTabs } from '@/components/custom-tabs';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';
import CompanyCard from '@/components/company-card';
import { companies } from '@/data/companies';
import { Separator } from '@/components/ui/separator';

export default function Home() {
	return (
		<main className='flex flex-col min-h-screen bg-background selection:bg-primary/20'>
			<Nav />

			<HeroSection />

			<div className='container mx-auto px-6 max-w-5xl space-y-24 pb-24'>
				{/* Projects Section */}
				<section
					id='projects'
					className='scroll-mt-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200'
				>
					<div className='flex flex-col space-y-4 mb-8'>
						<h2 className='text-3xl font-bold tracking-tight'>
							Featured Projects
						</h2>
						<p className='text-muted-foreground max-w-2xl'>
							A collection of projects I&apos;ve worked on, ranging from web
							applications to open source tools.
						</p>
					</div>
					<CustomTabs variant='projects' />
				</section>

				<Separator className='bg-border/40' />

				{/* Experience Section */}
				<section id='experience' className='scroll-mt-24'>
					<div className='flex flex-col space-y-4 mb-8'>
						<h2 className='text-3xl font-bold tracking-tight'>
							Work Experience
						</h2>
						<p className='text-muted-foreground max-w-2xl'>
							My professional journey and the companies I&apos;ve had the
							privilege to work with.
						</p>
					</div>
					<div className='grid gap-4 md:grid-cols-2'>
						{companies.map((company, index) => (
							<CompanyCard key={index} company={company} />
						))}
					</div>
				</section>

				<Separator className='bg-border/40' />

				{/* Skills Section */}
				<section id='skills' className='scroll-mt-24'>
					<div className='flex flex-col space-y-4 mb-8'>
						<h2 className='text-3xl font-bold tracking-tight'>
							Technical Skills
						</h2>
						<p className='text-muted-foreground max-w-2xl'>
							Technologies and tools I use to build scalable applications.
						</p>
					</div>
					<CustomTabs variant='skills' />
				</section>
			</div>

			<Footer />
		</main>
	);
}
