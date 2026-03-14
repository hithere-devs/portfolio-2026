'use client';
import { ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/constants';
import { HeroSectionProps } from '@/types';
import Image from 'next/image';
import ProfileImage from '@/app/new.png';
import { AnimatePresence } from 'framer-motion';
import {
	motion,
	useScroll,
	useTransform,
	useMotionValueEvent,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function HeroSection({ className = '' }: HeroSectionProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isAboutVisible, setIsAboutVisible] = useState(false);

	// Typewriter phrases
	const phrases = [
		'I build things that scale.',
		'I ship products.',
		'I love clean code.',
		'I automate everything.',
	];
	const [phraseIndex, setPhraseIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setPhraseIndex((prev) => (prev + 1) % phrases.length);
		}, 3000);
		return () => clearInterval(interval);
	}, [phrases.length]);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		setIsAboutVisible(latest > 0.15);
	});

	// Hero Text Animations (Fade out and move up)
	const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
	const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
	const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

	// About Content Animations (Fade in and move up)
	const aboutOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
	const aboutY = useTransform(scrollYProgress, [0.15, 0.3], [50, 0]);

	// Image Animations (Slight scale change)
	const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

	// Image Filter Animation (Glow up on scroll)
	const imageFilter = useTransform(
		scrollYProgress,
		[0.15, 0.3],
		['brightness(0.2) grayscale(100%)', 'brightness(1) grayscale(0%)']
	);

	return (
		<div
			ref={containerRef}
			id='about'
			className={`relative h-[400vh] ${className}`}
		>
			<div className='sticky top-0 h-screen w-full flex flex-col items-center justify-center pt-24 pb-12' style={{ overflow: 'clip' }}>
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
					{/* Typewriter Tagline - Left Side */}
					<motion.div
						style={{ opacity: heroOpacity }}
						className='absolute top-[55%] -left-4 md:-left-32 lg:-left-44 z-30 hidden md:block animate-in fade-in slide-in-from-left-4 duration-1000 delay-500'
					>
						<div className='h-8 overflow-hidden'>
							<AnimatePresence mode='wait'>
								<motion.p
									key={phraseIndex}
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: -20, opacity: 0 }}
									transition={{ duration: 0.4, ease: 'easeOut' }}
									className='text-sm md:text-base font-medium text-muted-foreground/60 whitespace-nowrap italic'
								>
									{phrases[phraseIndex]}
								</motion.p>
							</AnimatePresence>
						</div>
					</motion.div>

					{/* Social Links - Loosely clustered on the right */}
					<motion.div
						style={{ opacity: heroOpacity }}
						className='absolute top-[45%] -right-8 md:-right-16 z-30 hidden md:block animate-in fade-in zoom-in-75 duration-1000 delay-600'
					>
						<Link href='https://github.com/hithere-devs' target='_blank' className='text-muted-foreground/30 hover:text-foreground hover:scale-125 transition-all duration-300 block'>
							<Github className='w-7 h-7' />
						</Link>
					</motion.div>
					<motion.div
						style={{ opacity: heroOpacity }}
						className='absolute top-[55%] -right-4 md:-right-10 z-30 hidden md:block animate-in fade-in zoom-in-75 duration-1000 delay-700'
					>
						<Link href='https://linkedin.com/in/hithere-devs' target='_blank' className='text-muted-foreground/30 hover:text-foreground hover:scale-125 transition-all duration-300 block'>
							<Linkedin className='w-6 h-6' />
						</Link>
					</motion.div>
					<motion.div
						style={{ opacity: heroOpacity }}
						className='absolute top-[65%] -right-6 md:-right-20 z-30 hidden md:block animate-in fade-in zoom-in-75 duration-1000 delay-800'
					>
						<Link href='https://x.com/hithere_devs' target='_blank' className='text-muted-foreground/30 hover:text-foreground hover:scale-125 transition-all duration-300 block'>
							<Twitter className='w-6 h-6' />
						</Link>
					</motion.div>

					{/* Scroll Arrow - Bottom Right Corner */}
					<motion.div
						style={{ opacity: heroOpacity }}
						className='absolute -bottom-8 -right-4 md:-bottom-12 md:-right-16 z-30 animate-in fade-in zoom-in-50 duration-1000 delay-1000'
					>
						<Link href='#projects' className='group flex flex-col items-center gap-2'>
							<span className='text-[9px] md:text-[10px] font-semibold tracking-[0.3em] text-muted-foreground/40 uppercase'>Scroll</span>
							<motion.div
								animate={{ y: [0, 6, 0] }}
								transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
							>
								<ArrowUpRight className='w-4 h-4 text-muted-foreground/40 rotate-[135deg] group-hover:text-foreground transition-colors' />
							</motion.div>
						</Link>
					</motion.div>

					{/* Main Image */}
					<div
						className='relative w-full h-full rounded-full md:rounded-[3rem] overflow-hidden shadow-2xl group'
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

				<motion.div
					style={{ opacity: aboutOpacity, y: aboutY }}
					className='absolute inset-0 z-30 pointer-events-none flex items-center justify-center w-full max-w-[90rem] mx-auto'
				>
					{/* Text Content - Below image on mobile, left on desktop */}
					<div className='absolute left-6 right-6 bottom-8 md:bottom-auto md:left-24 md:right-auto md:top-1/2 md:-translate-y-1/2 max-w-[280px] md:max-w-md pointer-events-auto'>
						<p className='text-2xl md:text-5xl font-bold leading-tight text-foreground/80 hover:text-foreground transition-colors duration-500 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] cursor-default tracking-tight'>
							Currently Building <br />
							<span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-primary'>
								Voice AI Agents
							</span>
							<br /> <a href='https://samora.ai' target='_blank' rel='noopener noreferrer' className='text-2xl' data-image-hover>@ Samora AI (YC W26)</a>
						</p>
						<p className='mt-4 md:mt-6 text-sm md:text-lg text-muted-foreground font-medium'>
							Open to Senior Developer Roles.
						</p>
					</div>

					{/* Surrounding Buttons Center Image Layer */}
					<div
						className={`relative w-[80vw] md:w-[45vw] lg:w-[35vw] max-w-lg aspect-[3/4] flex items-center justify-center ${
							isAboutVisible ? 'pointer-events-auto' : 'pointer-events-none'
						}`}
					>
						{/* Top Right Surrounding Button */}
						<Link
							data-magnetic
							href={CONTACT_INFO.resume}
							target='_blank'
							className='absolute -top-4 right-0 md:-top-12 md:-right-20 lg:-top-16 lg:-right-32 group hover:z-50'
						>
							<div className='w-20 h-20 md:w-44 md:h-44 rounded-full bg-background/80 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center gap-1 md:gap-2 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-110 group-hover:bg-background'>
								<div className='flex flex-col items-center leading-none z-10'>
									<span className='text-[9px] md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-widest'>
										View
									</span>
									<span className='text-[11px] md:text-base font-bold text-foreground mt-0.5 md:mt-1'>
										Resume
									</span>
								</div>
								<ArrowUpRight className='w-4 h-4 md:w-8 md:h-8 transition-transform duration-500 group-hover:rotate-45 group-hover:text-primary z-10' />
							</div>
						</Link>

						{/* Bottom Right Surrounding Button */}
						<Link
							href='#experience'
							className='absolute bottom-24 -right-6 md:-bottom-8 md:-right-24 lg:-bottom-12 lg:-right-40 group hover:z-50'
							data-magnetic
						>
							<div className='w-24 h-24 md:w-52 md:h-52 rounded-full bg-foreground flex flex-col items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:bg-foreground/90'>
								<div className='flex flex-col items-center leading-none z-10'>
									<span className='text-sm md:text-2xl font-black text-background uppercase tracking-tight'>
										Read
									</span>
									<span className='text-sm md:text-2xl font-black text-background uppercase tracking-tight'>
										More
									</span>
								</div>
								<ArrowUpRight className='w-5 h-5 md:w-12 md:h-12 text-background mt-1 md:mt-2 transition-transform duration-500 group-hover:rotate-45 z-10' />
							</div>
						</Link>

						{/* Bottom Left Decorative Button */}
						<Link
							href='#projects'
							className='absolute bottom-0 -left-6 md:-bottom-20 md:-left-20 group hover:z-50 hidden md:flex'
							data-magnetic
						>
							<div className='w-24 h-24 md:w-36 md:h-36 rounded-full bg-primary/10 backdrop-blur-md border border-primary/30 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.2)] transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 hover:border-primary/50'>
								<div className='flex flex-col items-center leading-none z-10'>
									<span className='text-xs md:text-sm font-bold text-primary uppercase tracking-wider'>
										See
									</span>
									<span className='text-xs md:text-sm font-bold text-primary uppercase tracking-wider'>
										Works
									</span>
								</div>
								<ArrowUpRight className='w-5 h-5 md:w-6 md:h-6 text-primary mt-1 transition-transform duration-500 group-hover:rotate-45 z-10' />
							</div>
						</Link>
					</div>
				</motion.div>

				{/* Background Blobs & SVG Patterns (Persistent) */}
				<div className='absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none'>
					{/* Playful Floating SVG Doodles */}
					<motion.div
						animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
						transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
						className="absolute top-[15%] left-[10%] opacity-20"
					>
						<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
						</svg>
					</motion.div>

					<motion.div
						animate={{ y: [0, 30, 0], rotate: [0, -15, 15, 0] }}
						transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
						className="absolute top-[25%] right-[15%] opacity-20"
					>
						<svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M20 50 Q 40 10, 60 50 T 100 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
							<path d="M20 60 Q 40 20, 60 60 T 100 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/>
						</svg>
					</motion.div>

					<motion.div
						animate={{ y: [0, -15, 0], x: [0, 15, 0] }}
						transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
						className="absolute bottom-[20%] left-[20%] opacity-20"
					>
						<svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" strokeDasharray="10 10"/>
						</svg>
					</motion.div>

					<div className='absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl mix-blend-screen animate-blob' />
					<div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl mix-blend-screen animate-blob animation-delay-2000' />
				</div>
			</div>
		</div>
	);
}
