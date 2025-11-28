'use client';

import * as React from 'react';
import {
	RocketIcon,
	Laptop2,
	Paintbrush,
	Wrench,
	Code,
	EyeOff,
	ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { projectsData } from '@/data/projects';
import { skillsData } from '@/data/skills';
import { TabsProps, Skill, Project } from '@/types';
import { motion } from 'framer-motion';

const skillSections = [
	{ title: 'Top Skills', key: 'top', icon: RocketIcon },
	{ title: 'Backend', key: 'backend', icon: Laptop2 },
	{ title: 'Frontend', key: 'frontend', icon: Paintbrush },
	{ title: 'DevOps', key: 'devops', icon: Wrench },
	{ title: 'Languages', key: 'lang', icon: Code },
	{ title: 'Misc', key: 'misc', icon: EyeOff },
];

export function CustomTabs({ variant, className }: TabsProps) {
	const [activeTab, setActiveTab] = React.useState('top');

	return (
		<div className={cn('w-full', className)}>
			{variant === 'skills' ? (
				<div className='space-y-12'>
					<Tabs
						defaultValue='top'
						value={activeTab}
						onValueChange={setActiveTab}
						className='w-full'
					>
						<div className='flex justify-center mb-12'>
							<div className='flex flex-wrap justify-center gap-2 p-2 rounded-full bg-secondary/20 backdrop-blur-sm border border-white/5'>
								{skillSections.map((section) => (
									<button
										key={section.key}
										onClick={() => setActiveTab(section.key)}
										className={cn(
											'relative px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 outline-none',
											activeTab === section.key
												? 'text-foreground'
												: 'text-muted-foreground hover:text-foreground'
										)}
									>
										{activeTab === section.key && (
											<motion.div
												layoutId='active-pill'
												className='absolute inset-0 bg-background rounded-full shadow-sm'
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

						{Object.entries(skillsData).map(([key, items]) => (
							<TabsContent key={key} value={key} className='mt-0 outline-none'>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.4 }}
									className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'
								>
									{items.map((item: Skill, index: number) => (
										<motion.div
											key={index}
											whileHover={{ scale: 1.05, y: -5 }}
											className='group flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] transition-all duration-300 cursor-default'
										>
											<div className='relative w-16 h-16 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6'>
												<Image
													src={item.image}
													alt={item.title}
													fill
													className='object-contain filter dark:invert-[.15] drop-shadow-lg'
												/>
											</div>
											<span className='text-base font-semibold text-muted-foreground group-hover:text-foreground transition-colors'>
												{item.title}
											</span>
										</motion.div>
									))}
								</motion.div>
							</TabsContent>
						))}
					</Tabs>
				</div>
			) : (
				<Tabs defaultValue='featured' className='w-full'>
					<div className='flex items-center justify-between mb-6'>
						<TabsList className='h-auto bg-transparent p-0 gap-6'>
							<TabsTrigger
								value='featured'
								className='data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary p-0 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300 rounded-none'
							>
								Featured
							</TabsTrigger>
							<TabsTrigger
								value='past'
								className='data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary p-0 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300 rounded-none'
							>
								Past Projects
							</TabsTrigger>
						</TabsList>
					</div>

					{Object.entries(projectsData).map(([key, items]) => (
						<TabsContent
							key={key}
							value={key}
							className='mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500'
						>
							<div className='grid md:grid-cols-2 gap-6'>
								{items.map((item: Project, index: number) => (
									<Link
										href={item.link}
										key={index}
										target='_blank'
										rel='noopener noreferrer'
										className='group block h-full'
									>
										<Card className='h-full overflow-hidden border-border/40 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group-hover:border-primary/20'>
											<CardHeader>
												<div className='flex justify-between items-start gap-4'>
													<CardTitle className='text-xl font-bold group-hover:text-primary transition-colors'>
														{item.title}
													</CardTitle>
													<ExternalLink className='h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0' />
												</div>
												<CardDescription className='line-clamp-2 mt-2 text-base'>
													{item.description}
												</CardDescription>
											</CardHeader>
											<CardContent>
												<div className='flex flex-wrap gap-2 mt-auto'>
													<Badge
														variant='secondary'
														className='bg-secondary/50 hover:bg-secondary text-xs font-normal'
													>
														View Project
													</Badge>
												</div>
											</CardContent>
										</Card>
									</Link>
								))}
							</div>
						</TabsContent>
					))}
				</Tabs>
			)}
		</div>
	);
}
