'use client';

import { useState, useRef } from 'react';
import {
	motion,
	AnimatePresence,
	useScroll,
	useTransform,
} from 'framer-motion';
import { skillsData } from '@/data/skills';
import {
	RocketIcon,
	Laptop2,
	Paintbrush,
	Wrench,
	Code,
	EyeOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

const skillSections = [
	{ title: 'Top Skills', key: 'top', icon: RocketIcon },
	{ title: 'Backend', key: 'backend', icon: Laptop2 },
	{ title: 'Frontend', key: 'frontend', icon: Paintbrush },
	{ title: 'DevOps', key: 'devops', icon: Wrench },
	{ title: 'Languages', key: 'lang', icon: Code },
	{ title: 'Misc', key: 'misc', icon: EyeOff },
];

export default function SkillsSection() {
	const [activeTab, setActiveTab] = useState('top');
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ['start start', 'end end'],
	});

	const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

	// @ts-expect-error - accessing dynamic key on skillsData
	const currentSkills = skillsData[activeTab] || [];

	return (
		<section ref={targetRef} className='relative h-[200vh]'>
			<div className='sticky top-0 h-screen flex items-center overflow-hidden'>
				<div className='container mx-auto px-6'>
					<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24'>
						{/* Left Side - Sticky Header & Tabs */}
						<div className='lg:col-span-5 flex flex-col gap-8'>
							<div className='space-y-6'>
								<h2 className='text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]'>
									TECHNICAL <br />{' '}
									<span className='text-muted-foreground'>SKILLS</span>
								</h2>
								<p className='text-xl text-muted-foreground max-w-md'>
									Technologies and tools I use to build scalable,
									high-performance applications.
								</p>
							</div>

							{/* Custom Tabs */}
							<div className='flex flex-wrap gap-2'>
								{skillSections.map((section) => (
									<button
										key={section.key}
										onClick={() => setActiveTab(section.key)}
										className={cn(
											'relative px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 outline-none flex items-center gap-2',
											activeTab === section.key
												? 'text-foreground'
												: 'text-muted-foreground hover:text-foreground'
										)}
									>
										{activeTab === section.key && (
											<motion.div
												layoutId='active-pill-skills'
												className='absolute inset-0 bg-secondary/20 border border-white/5 backdrop-blur-sm rounded-full'
												transition={{
													type: 'spring',
													stiffness: 300,
													damping: 30,
												}}
											/>
										)}
										<span className='relative z-10 flex items-center gap-2'>
											<section.icon className='w-4 h-4' />
											{section.title}
										</span>
									</button>
								))}
							</div>
						</div>

						{/* Right Side - Skills Grid */}
						<div className='lg:col-span-7 min-w-0 overflow-hidden'>
							<motion.div
								style={{ x }}
								className='grid grid-rows-2 grid-flow-col gap-6 w-max'
							>
								<AnimatePresence mode='popLayout'>
									{currentSkills.map(
										(
											skill: { title: string; image: string },
											index: number
										) => (
											<motion.div
												key={skill.title}
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0, scale: 0.8 }}
												transition={{ duration: 0.3, delay: index * 0.05 }}
											>
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<div className='w-[200px] h-[200px] flex items-center justify-center p-6 rounded-3xl bg-secondary/5 border border-white/5 backdrop-blur-sm hover:bg-secondary/10 hover:border-white/10 transition-all duration-300 group'>
																<div className='relative w-28 h-28 transition-transform duration-500 group-hover:scale-110'>
																	<Image
																		src={skill.image}
																		alt={skill.title}
																		fill
																		className='object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'
																	/>
																</div>
															</div>
														</TooltipTrigger>
														<TooltipContent>
															<p>{skill.title}</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</motion.div>
										)
									)}
								</AnimatePresence>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
