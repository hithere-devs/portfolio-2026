'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';

export default function WritingTeaser() {
	const [mouse, setMouse] = useState({ x: 0, y: 0 });
	const featured =
		blogPosts.find((p) => p.featured) ?? blogPosts[0];

	if (!featured) return null;

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	return (
		<section className='container mx-auto px-6 py-24'>
			<div className='grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-24'>
				{/* intro */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className='flex flex-col gap-6 lg:col-span-5 lg:sticky lg:top-24'
					style={{ height: 'max-content' }}
				>
					<h2 className='font-display text-5xl font-extrabold leading-[0.9] tracking-tighter md:text-7xl'>
						FROM THE <br /> <span className='text-brand'>BUILD</span>
					</h2>
					<p className='max-w-md text-xl text-muted-foreground'>
						Long-form notes on the systems I’m building, the architecture
						behind them, and the stories that don’t fit on a résumé.
					</p>
					<Link
						href='/blog'
						className='group inline-flex w-max items-center gap-2 font-mono text-sm uppercase tracking-wider text-foreground transition-colors hover:text-brand'
					>
						Read all posts
						<ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
					</Link>
				</motion.div>

				{/* featured post card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.15 }}
					viewport={{ once: true }}
					className='lg:col-span-7'
				>
					<Link
						href={`/blog/${featured.slug}`}
						className='group block h-full'
					>
						<div
							onMouseMove={handleMouseMove}
							className='relative h-full overflow-hidden rounded-3xl border border-white/5 bg-secondary/5 p-8 transition-all duration-500 hover:border-brand/30 md:p-10'
						>
							<motion.div
								className='pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100'
								style={{
									background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, hsl(var(--brand) / 0.10), transparent 40%)`,
								}}
							/>

							<div className='relative z-10 flex flex-col gap-6'>
								<div className='flex items-start justify-between gap-4'>
									<span className='inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-brand'>
										{featured.featured ? 'Featured' : 'Latest'}
									</span>
									<div className='flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-500 group-hover:scale-110 group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground'>
										<ArrowUpRight className='h-5 w-5 transition-transform duration-500 group-hover:rotate-45' />
									</div>
								</div>

								<div>
									<p className='font-mono text-[11px] uppercase tracking-[0.18em] text-brand/70'>
										{featured.kicker}
									</p>
									<h3 className='mt-3 font-display text-3xl font-bold leading-[1.05] tracking-tight transition-colors group-hover:text-brand md:text-4xl'>
										{featured.title}
									</h3>
									<p className='mt-4 max-w-[52ch] text-lg leading-relaxed text-muted-foreground'>
										{featured.excerpt}
									</p>
								</div>

								<div className='mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground/60'>
									<time dateTime={featured.dateISO}>
										{featured.date}
									</time>
									<span aria-hidden>·</span>
									<span>{featured.readingTime}</span>
								</div>
							</div>
						</div>
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
