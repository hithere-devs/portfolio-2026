'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types';

const tabs = [
	{ id: 'featured', label: 'Featured' },
	{ id: 'past', label: 'Archive' },
];

function ProjectCard({ project }: { project: Project }) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setMousePosition({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
	};

	return (
		<Link href={project.link} target='_blank' className='group block h-full'>
			<div
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className='relative h-full overflow-hidden rounded-3xl bg-secondary/5 border border-white/5 p-8 transition-all duration-500 hover:border-white/10'
			>
				{/* Spotlight Effect */}
				<motion.div
					className='pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100'
					style={{
						background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,.06), transparent 40%)`,
					}}
				/>

				{/* SVG Pattern Background */}
				<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none'>
					<motion.svg
						className='absolute inset-0 h-full w-full'
						xmlns='http://www.w3.org/2000/svg'
						initial={{ scale: 1.1 }}
						animate={{ scale: isHovered ? 1 : 1.1 }}
						transition={{ duration: 1, ease: 'easeOut' }}
					>
						<defs>
							<pattern
								id={`grid-pattern-${project.title.replace(/\s+/g, '-')}`}
								width='32'
								height='32'
								patternUnits='userSpaceOnUse'
							>
								<path
									d='M0 32V.5H32'
									fill='none'
									stroke='currentColor'
									strokeOpacity='0.05'
								></path>
							</pattern>
						</defs>
						<rect
							width='100%'
							height='100%'
							fill={`url(#grid-pattern-${project.title.replace(/\s+/g, '-')})`}
						></rect>
					</motion.svg>
				</div>

				<div className='relative z-10 flex flex-col gap-6'>
					<div className='flex justify-between items-start'>
						<Badge
							variant='secondary'
							className='rounded-full bg-white/5 backdrop-blur-md border-white/10'
						>
							{project.tag}
						</Badge>
						<div className='w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black'>
							<ArrowUpRight className='w-5 h-5 transition-transform duration-500 group-hover:rotate-45' />
						</div>
					</div>

					<div>
						<h3 className='text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors'>
							{project.title}
						</h3>
						<p className='text-muted-foreground text-lg leading-relaxed'>
							{project.description}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default function FeaturedWorkSection() {
	const [activeTab, setActiveTab] = useState('featured');

	const currentProjects =
		activeTab === 'featured' ? projectsData.featured : projectsData.past;

	return (
		<section className='container mx-auto px-6 py-24'>
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start'>
				{/* Left Side - Sticky Header & Tabs */}
				<div className='lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-24' style={{ height: 'max-content' }}>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className='space-y-6'
					>
						<h2 className='text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]'>
							FEATURED <br />{' '}
							<span className='text-muted-foreground'>WORK</span>
						</h2>
						<p className='text-xl text-muted-foreground max-w-md'>
							A curated selection of projects ranging from AI-powered tools to
							open source contributions.
						</p>
					</motion.div>

					{/* Custom Tabs */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}
						className='flex flex-wrap gap-2'
					>
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={cn(
									'relative px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 outline-none',
									activeTab === tab.id
										? 'text-foreground'
										: 'text-muted-foreground hover:text-foreground'
								)}
							>
								{activeTab === tab.id && (
									<motion.div
										layoutId='active-pill-projects'
										className='absolute inset-0 bg-secondary/20 border border-white/5 backdrop-blur-sm rounded-full'
										transition={{
											type: 'spring',
											stiffness: 300,
											damping: 30,
										}}
									/>
								)}
								<span className='relative z-10'>{tab.label}</span>
							</button>
						))}
					</motion.div>
				</div>

				{/* Right Side - Project List */}
				<div className='lg:col-span-7'>
					<div className='grid gap-8'>
						<AnimatePresence mode='wait'>
							{currentProjects.map((project, index) => (
								<motion.div
									key={project.title}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3, delay: index * 0.1 }}
								>
									<ProjectCard project={project} />
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</section>
	);
}
