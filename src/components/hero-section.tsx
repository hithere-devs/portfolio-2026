'use client';
import { Button } from '@/components/ui/button';
import { Calendar, FileText } from 'lucide-react';
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/constants';
import { HeroSectionProps } from '@/types';
import { Badge } from '@/components/ui/badge';
import { useEffect, useRef, useState } from 'react';

export default function HeroSection({ className = '' }: HeroSectionProps) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			if (containerRef.current) {
				const { left, top, width, height } =
					containerRef.current.getBoundingClientRect();
				const x = (event.clientX - left) / width;
				const y = (event.clientY - top) / height;
				setMousePosition({ x, y });
			}
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<section
			ref={containerRef}
			id='about'
			className={`relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden ${className}`}
		>
			<div className='container mx-auto px-6 max-w-5xl relative z-10'>
				<div className='flex flex-col items-start max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-1000'>
					<Badge variant='secondary' className='mb-6 px-4 py-1 text-sm'>
						Available for hire
					</Badge>
					<h1 className='text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]'>
						Building digital <br />
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50'>
							experiences
						</span>{' '}
						that matter.
					</h1>
					<p className='text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10'>
						I&apos;m <strong className='text-foreground'>Azhar Mahmood</strong>,
						a Full Stack Developer & DevOps Engineer. I specialize in building
						scalable, high-performance applications using{' '}
						<span className='text-foreground font-medium'>React</span>,{' '}
						<span className='text-foreground font-medium'>Node.js</span>, and
						Cloud technologies.
					</p>

					<div className='flex flex-wrap gap-4'>
						<Button
							asChild
							size='lg'
							className='h-12 px-8 text-base rounded-full'
						>
							<Link
								href={CONTACT_INFO.calendly}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Calendar className='mr-2 h-4 w-4' />
								Book a call
							</Link>
						</Button>
						<Button
							asChild
							variant='outline'
							size='lg'
							className='h-12 px-8 text-base rounded-full border-border/50 hover:bg-secondary/50'
						>
							<Link
								href={CONTACT_INFO.resume}
								target='_blank'
								rel='noopener noreferrer'
							>
								<FileText className='mr-2 h-4 w-4' />
								Resume
							</Link>
						</Button>
					</div>
				</div>
			</div>

			{/* Background decorative elements */}
			<div className='absolute top-0 left-0 w-full h-full overflow-hidden -z-10'>
				<div
					className='absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'
					style={{
						transform: `translate(${mousePosition.x * 20}px, ${
							mousePosition.y * 20
						}px)`,
					}}
				/>
				<div
					className='absolute top-0 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'
					style={{
						transform: `translate(${mousePosition.x * -20}px, ${
							mousePosition.y * -20
						}px)`,
					}}
				/>
				<div
					className='absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'
					style={{
						transform: `translate(${mousePosition.x * 15}px, ${
							mousePosition.y * 15
						}px)`,
					}}
				/>
			</div>
		</section>
	);
}
