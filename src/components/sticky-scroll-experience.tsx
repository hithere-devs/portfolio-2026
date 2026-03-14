'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { companies } from '@/data/companies';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Company } from '@/types';

export default function StickyScrollExperience() {
	const [activeCompany, setActiveCompany] = useState<Company>(companies[0]);

	return (
		<section className='relative py-24'>
			<div className='container mx-auto px-6 max-w-7xl'>
				<div className='flex flex-col lg:flex-row gap-12 lg:gap-24 items-start'>
					{/* --- LEFT SIDE (Sticky) --- */}
					<div className='hidden lg:flex lg:w-1/2 flex-col justify-center sticky top-24 h-[calc(100vh-12rem)]'>
						{/* Abstract SVG Background */}
						<div className='absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden flex items-center justify-center'>
							<motion.svg
								viewBox="0 0 200 200"
								xmlns="http://www.w3.org/2000/svg"
								className="w-[150%] h-[150%] text-primary"
								animate={{ rotate: 360 }}
								transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
							>
								<path
									fill="currentColor"
									d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18.1,97.4,-2.4C98,13.3,93.2,29.3,83.8,42.1C74.4,54.9,60.4,64.5,45.7,71.4C31,78.3,15.5,82.5,0.3,82.1C-14.9,81.7,-29.8,76.7,-43.5,69.3C-57.2,61.9,-69.7,52.1,-78.6,39.6C-87.5,27.1,-92.8,11.9,-92.5,-3.1C-92.2,-18.1,-86.3,-32.9,-76.8,-44.7C-67.3,-56.5,-54.2,-65.3,-40.5,-72.7C-26.8,-80.1,-13.4,-86.1,1.1,-87.9C15.6,-89.7,30.6,-83.6,44.7,-76.4Z"
									transform="translate(100 100)"
								/>
							</motion.svg>
						</div>

						<div className='relative h-full flex flex-col justify-center'>
							{/* Animated Company Name */}
							<motion.div
								key={activeCompany.name}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -50 }}
								transition={{ duration: 0.5, ease: 'easeOut' }}
								className='absolute inset-0 flex flex-col justify-center'
							>
								<h2 className='text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/40'>
									{activeCompany.name}
								</h2>
								<p className='mt-6 text-2xl text-muted-foreground font-medium'>
									{activeCompany.role}
								</p>

								<div className='flex flex-wrap gap-2 mt-6'>
									{activeCompany.tags?.map((tag) => (
										<span
											key={tag}
											className='px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20'
										>
											{tag}
										</span>
									))}
								</div>

								{/* Decorative Line */}
								<div className='mt-12 w-24 h-2 bg-primary rounded-full' />
							</motion.div>
						</div>
					</div>

					{/* --- RIGHT SIDE (Scrollable) --- */}
					<div className='w-full lg:w-1/2 relative'>
						{/* Timeline Line */}
						<div className='absolute left-0 top-12 bottom-32 w-px bg-white/10 hidden lg:block' />

						<div className='flex flex-col gap-32 pb-32 lg:pl-16'>
							{companies.map((company, index) => (
								<ExperienceCard
									key={index}
									company={company}
									isActive={activeCompany.name === company.name}
									onInView={() => setActiveCompany(company)}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function ExperienceCard({
	company,
	isActive,
	onInView,
}: {
	company: Company;
	isActive: boolean;
	onInView: () => void;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { margin: '-50% 0px -50% 0px' });

	useEffect(() => {
		if (isInView) {
			onInView();
		}
	}, [isInView, onInView]);

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			viewport={{ once: true, margin: '-20%' }}
			className='group relative'
		>
			{/* Timeline Dot */}
			<div
				className={`absolute -left-16 top-12 w-4 h-4 -translate-x-1/2 rounded-full border-2 border-background hidden lg:block transition-colors duration-500 z-10 ${isActive ? 'bg-primary' : 'bg-white/20'}`}
			>
				{isActive && (
					<motion.div
						layoutId='active-timeline-dot'
						className='absolute inset-0 rounded-full bg-primary animate-ping opacity-50'
					/>
				)}
			</div>

			{/* Mobile Title (Visible only on small screens) */}
			<div className='lg:hidden mb-6'>
				<h3 className='text-4xl font-black tracking-tighter mb-2'>
					{company.name}
				</h3>
				<p className='text-xl text-muted-foreground'>{company.role}</p>
			</div>

			{/* Card Content */}
			<Link href={`/${company.slug}`} className='block'>
				<div className='relative overflow-hidden rounded-[2.5rem] bg-secondary/5 border border-white/10 backdrop-blur-sm p-8 md:p-12 transition-all duration-500 hover:bg-secondary/10 hover:border-primary/20 hover:shadow-2xl'>
					{/* Hover Gradient */}
					<div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

					<div className='relative z-10 flex flex-col gap-8'>
						{/* Logo & Arrow */}
						<div className='flex justify-between items-start'>
							<div className='w-20 h-20 rounded-2xl bg-white p-4 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3'>
								<Image
									src={company.logo}
									alt={company.name}
									width={80}
									height={80}
									className='w-full h-full object-contain'
								/>
							</div>
							<div className='w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-background/50 backdrop-blur-md group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300'>
								<ArrowUpRight className='w-6 h-6 transition-transform duration-300 group-hover:rotate-45' />
							</div>
						</div>

						{/* Description */}
						<div className='space-y-4'>
							<p className='text-lg text-muted-foreground leading-relaxed'>
								{company.description}
							</p>
						</div>

						<div className='flex items-center gap-2 text-primary font-medium group-hover:translate-x-2 transition-transform'>
							Read full story <ArrowUpRight className='w-4 h-4' />
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
}
