'use client';
import { Code2, Sparkles, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/constants';
import { HeroSectionProps } from '@/types';
import Image from 'next/image';
import ProfileImage from '@/app/new.png';
import {
	motion,
	useScroll,
	useTransform,
	useMotionValueEvent,
} from 'framer-motion';
import { useRef, useState } from 'react';

export default function HeroSection({ className = '' }: HeroSectionProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isAboutVisible, setIsAboutVisible] = useState(false);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		setIsAboutVisible(latest > 0.3);
	});

	// Hero Text Animations (Fade out and move up)
	const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
	const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
	const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

	// About Content Animations (Fade in and move up)
	const aboutOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
	const aboutY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

	// Image Animations (Slight scale change)
	const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

	// Image Filter Animation (Glow up on scroll)
	const imageFilter = useTransform(
		scrollYProgress,
		[0.3, 0.5],
		['brightness(0.2) grayscale(100%)', 'brightness(1) grayscale(0%)']
	);

	return (
		<div
			ref={containerRef}
			id='about'
			className={`relative h-[250vh] ${className}`}
		>
			<div className='sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-24 pb-12'>
				{/* --- HERO STATE CONTENT - BACK LAYER (Fades Out) --- */}
				<motion.div
					style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
					className='absolute inset-0 flex flex-col items-center z-0 pointer-events-none'
				>
					{/* Top Label */}
					<div className='absolute top-24 md:top-32 animate-in fade-in slide-in-from-top-8 duration-1000 delay-100'>
						<span className='text-sm md:text-base font-semibold tracking-[0.3em] text-muted-foreground uppercase'>
							Hi there, I&apos;m Azhar
						</span>
					</div>

					{/* Big Text Layer - Behind */}
					<div className='absolute z-0 w-full flex top-40 md:top-52 justify-center items-center select-none'>
						<h1 className='text-[15vw] md:text-[13vw] font-black tracking-tighter text-foreground/10 leading-[0.8] animate-in fade-in zoom-in-50 duration-1000'>
							FULL STACK
						</h1>
					</div>
				</motion.div>

				{/* --- HERO STATE CONTENT - FRONT LAYER (Fades Out) --- */}
				<motion.div
					style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
					className='absolute inset-0 flex flex-col items-center z-20 pointer-events-none'
				>
					{/* Big Text Layer - Front */}
					<div className='absolute z-20 bottom-0 w-full flex justify-center items-center select-none'>
						<h1 className='text-[15vw] md:text-[13vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/0 leading-[0.8] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300'>
							DEVELOPER
						</h1>
					</div>
				</motion.div>

				{/* --- CENTRAL IMAGE (Stays Sticky) --- */}
				<motion.div
					style={{ scale: imageScale }}
					className='relative z-10 w-[80vw] md:w-[45vw] lg:w-[35vw] aspect-[3/4] max-w-lg'
				>
					{/* Decorative Elements (Attached to Hero State) */}
					<motion.div
						style={{ opacity: heroOpacity }}
						className='absolute top-1/4 -left-12 md:-left-24 z-30 hidden md:block animate-in fade-in slide-in-from-left-8 duration-1000 delay-500'
					>
						<div className='bg-card/30 backdrop-blur-sm border border-border/50 p-4 rounded-2xl shadow-xl max-w-[200px]'>
							<Code2 className='w-8 h-8 text-primary mb-2' />
							<p className='text-xs text-muted-foreground font-medium leading-relaxed'>
								Building scalable solutions with modern tech stacks.
							</p>
						</div>
					</motion.div>

					<motion.div
						style={{ opacity: heroOpacity }}
						className='absolute bottom-1/4 -right-12 md:-right-24 z-30 hidden md:block animate-in fade-in slide-in-from-right-8 duration-1000 delay-700'
					>
						<div className='bg-card/80 backdrop-blur-sm border border-border/50 p-4 rounded-2xl shadow-xl max-w-[200px] text-right'>
							<div className='flex justify-end mb-2'>
								<Sparkles className='w-8 h-8 text-purple-500' />
							</div>
							<p className='text-xs text-muted-foreground font-medium leading-relaxed'>
								Focused on motion, interaction, and user experience.
							</p>
						</div>
					</motion.div>

					{/* Main Image */}
					<div
						className='relative w-full h-full rounded-full md:rounded-[3rem] overflow-hidden shadow-2xl group'
						data-image-hover
						onMouseMove={(e) => {
							const rect = e.currentTarget.getBoundingClientRect();
							const x = e.clientX - rect.left;
							const y = e.clientY - rect.top;
							e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
							e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
						}}
					>
						{/* Base Image (Darkened) */}
						<motion.div
							className='absolute inset-0'
							style={{ filter: imageFilter }}
						>
							<Image
								src={ProfileImage}
								alt='Azhar Mahmood'
								fill
								className='object-cover'
								priority
							/>
						</motion.div>

						{/* Spotlight Image (Revealed on Hover) */}
						<div
							className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
							style={{
								maskImage:
									'radial-gradient(circle 150px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)',
								WebkitMaskImage:
									'radial-gradient(circle 150px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)',
							}}
						>
							<Image
								src={ProfileImage}
								alt='Azhar Mahmood'
								fill
								className='object-cover'
								priority
							/>
						</div>

						<div className='absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 pointer-events-none' />
					</div>
				</motion.div>

				{/* --- ABOUT CONTENT (Fades In on Sides) --- */}
				<motion.div
					style={{ opacity: aboutOpacity, y: aboutY }}
					className='absolute inset-0 z-30 pointer-events-none flex items-center justify-center w-full max-w-[90rem] mx-auto'
				>
					{/* Left Side Content */}
					<div className='absolute left-0 right-0 top-32 md:top-1/2 md:left-12 lg:left-24 md:right-auto md:-translate-y-1/2 max-w-full md:max-w-sm text-center md:text-left px-6 md:px-0 pointer-events-auto'>
						<p className='text-xl md:text-2xl font-medium leading-relaxed text-muted-foreground/80 md:text-muted-foreground/40 hover:text-foreground transition-colors duration-500 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] cursor-default'>
							Currently Building <br /> Voice AI Agents @ Samora AI, <br />
							Open to Senior Developer Roles.
						</p>
					</div>

					{/* Right Side Content */}
					<div
						className={`absolute left-0 right-0 bottom-32 md:bottom-auto md:top-1/2 md:left-auto md:right-16 lg:right-32 md:-translate-y-1/2 flex flex-row justify-center md:flex-col md:items-end gap-4 md:gap-14 ${
							isAboutVisible ? 'pointer-events-auto' : 'pointer-events-none'
						}`}
					>
						<Link
							data-magnetic
							href={CONTACT_INFO.resume}
							target='_blank'
							className='group relative md:mr-24'
						>
							<div className='w-24 h-24 md:w-48 md:h-48 rounded-full bg-background/50 backdrop-blur-sm border border-white/10 flex items-center justify-center gap-2 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-background/80'>
								<div className='flex flex-col items-start leading-none'>
									<span className='text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors'>
										View
									</span>
									<span className='text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors'>
										Resume
									</span>
								</div>
								<ArrowUpRight className='w-8 h-8 md:w-16 md:h-16  transition-transform duration-500 group-hover:rotate-45' />
							</div>
						</Link>

						<Link href='#experience' className='group relative' data-magnetic>
							<div className='w-32 h-32 md:w-56 md:h-56 rounded-full bg-white flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-white/90'>
								<div className='flex flex-col items-start leading-none'>
									<span className='text-sm md:text-xl font-bold text-black'>
										Read
									</span>
									<span className='text-sm md:text-xl font-bold text-black'>
										More
									</span>
								</div>
								<ArrowUpRight className='w-8 h-8 md:w-20 md:h-20 text-black transition-transform duration-500 group-hover:rotate-45' />
							</div>
						</Link>
					</div>
				</motion.div>

				{/* Background Blobs (Persistent) */}
				<div className='absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none'>
					<div className='absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl mix-blend-screen animate-blob' />
					<div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl mix-blend-screen animate-blob animation-delay-2000' />
				</div>
			</div>
		</div>
	);
}
