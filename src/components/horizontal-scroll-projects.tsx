'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projectsData } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function HorizontalScrollProjects() {
	const targetRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
	});

	const x = useTransform(scrollYProgress, [0, 1], ['1%', '-75%']);

	const allProjects = [...projectsData.featured, ...projectsData.past];

	return (
		<section ref={targetRef} className='relative h-[300vh] bg-background'>
			<div className='sticky top-0 flex h-screen items-center overflow-hidden'>
				<motion.div style={{ x }} className='flex gap-12 px-12 md:px-24'>
					{/* Title Card */}
					<div className='flex h-[50vh] w-[80vw] md:w-[30vw] shrink-0 flex-col justify-center p-8'>
						<h2 className='text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]'>
							FEATURED <br />{' '}
							<span className='text-muted-foreground'>WORK</span>
						</h2>
						<p className='mt-8 text-xl text-muted-foreground max-w-md'>
							A curated selection of projects ranging from AI-powered tools to
							open source contributions.
						</p>
					</div>

					{allProjects.map((project, index) => (
						<Link
							href={project.link}
							key={index}
							target='_blank'
							className='group relative h-[60vh] w-[85vw] md:w-[40vw] shrink-0 overflow-hidden rounded-[2.5rem] bg-secondary/5 border border-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-secondary/10'
						>
							<div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

							<div className='flex h-full flex-col justify-between p-8 md:p-12 relative z-10'>
								<div className='flex justify-between items-start'>
									<span className='px-4 py-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-sm font-medium text-muted-foreground uppercase tracking-widest'>
										{index < projectsData.featured.length
											? 'Featured'
											: 'Archive'}
									</span>
									<div className='w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black'>
										<ArrowUpRight className='w-6 h-6 md:w-8 md:h-8 transition-transform duration-500 group-hover:rotate-45' />
									</div>
								</div>

								<div className='transform transition-transform duration-500 group-hover:-translate-y-2'>
									<h3 className='text-3xl md:text-5xl font-bold leading-tight mb-4 md:mb-6'>
										{project.title}
									</h3>
									<p className='text-lg md:text-xl text-muted-foreground line-clamp-3 max-w-xl'>
										{project.description}
									</p>
								</div>
							</div>
						</Link>
					))}
				</motion.div>
			</div>
		</section>
	);
}
