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
		<section className='relative bg-background py-24'>
			<div className='container mx-auto px-6 max-w-7xl'>
				<div className='flex flex-col lg:flex-row gap-12 lg:gap-24'>
					{/* --- LEFT SIDE (Sticky) --- */}
					<div className='hidden lg:flex lg:w-1/2 flex-col justify-center sticky top-24 h-[calc(100vh-12rem)]'>
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
					<div className='w-full lg:w-1/2 flex flex-col gap-32 pb-32'>
						{companies.map((company, index) => (
							<ExperienceCard
								key={index}
								company={company}
								onInView={() => setActiveCompany(company)}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function ExperienceCard({
	company,
	onInView,
}: {
	company: Company;
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
							<div className='w-20 h-20 rounded-2xl bg-white p-4 shadow-lg'>
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
