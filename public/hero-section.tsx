'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { HeroSectionProps } from '@/types';
import Image from 'next/image';

export default function HeroSection({ className = '' }: HeroSectionProps) {
	return (
		<section
			id='about'
			className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12 ${className}`}
		>
			{/* Top Label */}
			<div className='z-20 animate-in fade-in slide-in-from-top-8 duration-1000 delay-100'>
				<span className='text-sm md:text-base font-semibold tracking-[0.3em] text-muted-foreground uppercase'>
					Hi there, I&apos;m Azhar
				</span>
			</div>

			{/* Main Content Grid */}
			<div className='relative w-full max-w-[90rem] mx-auto flex flex-col items-center justify-center mt-8'>
				{/* Top Text Layer - Behind Image */}
				<div className='relative z-0 w-full flex justify-center items-center select-none'>
					<h1 className='text-[15vw] md:text-[13vw] font-black tracking-tighter text-foreground/10 leading-[0.8] animate-in fade-in zoom-in-50 duration-1000'>
						FULL STACK
					</h1>
				</div>

				{/* Central Image Area */}
				<div className='relative z-10 -mt-[6vw] md:-mt-[8vw] w-[80vw] md:w-[45vw] lg:w-[35vw] aspect-[3/4] max-w-lg'>
					{/* Decorative Elements around image */}
					<div className='absolute top-1/4 -left-12 md:-left-24 z-20 hidden md:block animate-in fade-in slide-in-from-left-8 duration-1000 delay-500'>
						<div className='bg-card/80 backdrop-blur-sm border border-border/50 p-4 rounded-2xl shadow-xl max-w-[200px]'>
							<Code2 className='w-8 h-8 text-primary mb-2' />
							<p className='text-xs text-muted-foreground font-medium leading-relaxed'>
								Building scalable solutions with modern tech stacks.
							</p>
						</div>
					</div>

					<div className='absolute bottom-1/4 -right-12 md:-right-24 z-20 hidden md:block animate-in fade-in slide-in-from-right-8 duration-1000 delay-700'>
						<div className='bg-card/80 backdrop-blur-sm border border-border/50 p-4 rounded-2xl shadow-xl max-w-[200px] text-right'>
							<div className='flex justify-end mb-2'>
								<Sparkles className='w-8 h-8 text-purple-500' />
							</div>
							<p className='text-xs text-muted-foreground font-medium leading-relaxed'>
								Focused on motion, interaction and user experience.
							</p>
						</div>
					</div>

					{/* Main Image */}
					<div className='relative w-full h-full rounded-full md:rounded-[3rem] overflow-hidden border-4 border-background shadow-2xl'>
						<Image
							src='/profile-pic-1.png'
							alt='Azhar Mahmood'
							fill
							className='object-cover scale-110 hover:scale-100 transition-transform duration-700 ease-out'
							priority
						/>
						{/* Gradient Overlay for better text contrast at bottom */}
						<div className='absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60' />
					</div>
				</div>

				{/* Bottom Text Layer - Overlapping Image Bottom */}
				<div className='relative z-20 -mt-[8vw] md:-mt-[10vw] w-full flex justify-center items-center select-none pointer-events-none'>
					<h1 className='text-[15vw] md:text-[13vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/0 leading-[0.8] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300'>
						DEVELOPER
					</h1>
				</div>

				{/* Floating Action Button / Link */}
				<div className='relative z-30 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500'>
					<Button
						asChild
						size='lg'
						className='rounded-full h-14 px-8 text-lg font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300'
					>
						<Link href='#projects'>
							View Projects <ArrowRight className='ml-2 w-5 h-5' />
						</Link>
					</Button>
				</div>
			</div>

			{/* Background Blobs (Subtle) */}
			<div className='absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none'>
				<div className='absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl mix-blend-screen animate-blob' />
				<div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl mix-blend-screen animate-blob animation-delay-2000' />
			</div>
		</section>
	);
}
