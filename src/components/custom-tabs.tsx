'use client';

import * as React from 'react';
import {
	Star,
	Clock,
	RocketIcon,
	Paintbrush,
	Laptop2,
	Wrench,
	EyeOff,
	Code,
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

const skillSections = [
	{ title: 'Top Skills', key: 'top', icon: RocketIcon },
	{ title: 'Backend', key: 'backend', icon: Laptop2 },
	{ title: 'Frontend', key: 'frontend', icon: Paintbrush },
	{ title: 'DevOps', key: 'devops', icon: Wrench },
	{ title: 'Languages', key: 'lang', icon: Code },
	{ title: 'Misc', key: 'misc', icon: EyeOff },
];

export function CustomTabs({ variant, className }: TabsProps) {
	return (
		<div className={cn('w-full', className)}>
			{variant === 'skills' ? (
				<div className='space-y-8'>
					<Tabs defaultValue='top' className='w-full'>
						<div className='flex justify-center mb-8'>
							<TabsList className='h-auto bg-secondary/30 p-1 rounded-full gap-1 flex-wrap justify-center'>
								{skillSections.map((section, index) => (
									<TabsTrigger
										value={section.key}
										key={index}
										className='rounded-full px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all'
									>
										{section.title}
									</TabsTrigger>
								))}
							</TabsList>
						</div>

						{Object.entries(skillsData).map(([key, items]) => (
							<TabsContent
								key={key}
								value={key}
								className='mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500'
							>
								<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
									{items.map((item: Skill, index: number) => (
										<div
											key={index}
											className='group flex flex-col items-center justify-center p-6 rounded-2xl bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 border border-transparent hover:border-border/50'
										>
											<div className='relative w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110'>
												<Image
													src={item.image}
													alt={item.title}
													fill
													className='object-contain filter dark:invert-[.15]'
												/>
											</div>
											<span className='text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors'>
												{item.title}
											</span>
										</div>
									))}
								</div>
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
