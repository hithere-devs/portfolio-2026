'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { blogPosts } from '@/data/blog';

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function BlogIndexPage() {
	const posts = [...blogPosts].sort(
		(a, b) => +new Date(b.dateISO) - +new Date(a.dateISO)
	);

	return (
		<main className='flex min-h-screen flex-col bg-background selection:bg-primary/20'>
			<Nav />

			<div className='flex-grow'>
				{/* header */}
				<header className='relative isolate overflow-hidden'>
					<div
						aria-hidden
						className='pointer-events-none absolute inset-0 -z-10'
						style={{
							background:
								'radial-gradient(70% 60% at 15% 0%, hsl(var(--brand) / 0.22), transparent 60%)',
						}}
					/>
					<div className='mx-auto w-full max-w-5xl px-6 pb-12 pt-36 md:pt-44'>
						<Link
							href='/'
							className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-brand'
						>
							<ArrowLeft className='h-3.5 w-3.5' />
							Home
						</Link>
						<motion.h1
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, ease: easeOutExpo }}
							className='mt-8 font-display text-[clamp(2.6rem,7vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white'
						>
							Notes from the build
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.12 }}
							className='mt-6 max-w-[56ch] text-lg leading-relaxed text-slate-300'
						>
							Long-form writing on the systems I’m building, the
							architecture behind them, and the occasional story of how
							a bet paid off.
						</motion.p>
					</div>
				</header>

				{/* post list */}
				<section className='mx-auto w-full max-w-5xl px-6 pb-28'>
					<ul className='border-t border-slate-800'>
						{posts.map((post, i) => (
							<motion.li
								key={post.slug}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-60px' }}
								transition={{
									duration: 0.6,
									ease: easeOutExpo,
									delay: i * 0.05,
								}}
								className='border-b border-slate-800'
							>
								<Link
									href={`/blog/${post.slug}`}
									className='group grid gap-5 py-10 md:grid-cols-[1fr_auto] md:items-start md:gap-10'
								>
									<div>
										<div className='flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-brand/80'>
											<span>{post.kicker}</span>
											{post.featured && (
												<span className='rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-brand'>
													Featured
												</span>
											)}
										</div>
										<h2 className='mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white transition-colors duration-300 group-hover:text-brand md:text-4xl'>
											{post.title}
										</h2>
										<p className='mt-4 max-w-[60ch] text-base leading-relaxed text-slate-400'>
											{post.excerpt}
										</p>
										<div className='mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-slate-500'>
											<time dateTime={post.dateISO}>{post.date}</time>
											<span aria-hidden>·</span>
											<span>{post.readingTime}</span>
										</div>
										<div className='mt-4 flex flex-wrap gap-2'>
											{post.tags.map((tag) => (
												<span
													key={tag}
													className='rounded-full border border-slate-700/70 px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-slate-400'
												>
													{tag}
												</span>
											))}
										</div>
									</div>

									<span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground'>
										<ArrowUpRight className='h-5 w-5 transition-transform duration-300 group-hover:rotate-45' />
									</span>
								</Link>
							</motion.li>
						))}
					</ul>
				</section>
			</div>

			<Footer />
		</main>
	);
}
