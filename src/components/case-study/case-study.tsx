'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
	motion,
	useScroll,
	useTransform,
	useReducedMotion,
	useInView,
	animate,
	type Variants,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

export interface HeroMeta {
	label: string;
	value: string;
}

interface CaseStudyHeroProps {
	/** Small mono kicker above the title, e.g. company + tenure. */
	kicker: string;
	title: string;
	lede?: string;
	meta?: HeroMeta[];
	/** Optional full-bleed backdrop media; falls back to a brand mesh. */
	media?: { type: 'video'; src: string };
}

export function CaseStudyHero({
	kicker,
	title,
	lede,
	meta,
	media,
}: CaseStudyHeroProps) {
	const reduce = useReducedMotion();
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	});
	const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
	const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '36%']);
	const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

	const words = title.split(' ');

	return (
		<header
			ref={ref}
			className='relative isolate flex min-h-[92vh] w-full items-end overflow-hidden'
		>
			{/* backdrop (parallax) */}
			<motion.div
				aria-hidden
				style={reduce ? undefined : { y: bgY }}
				className='absolute inset-0 -z-10'
			>
				{media?.type === 'video' && (
					<video
						src={media.src}
						autoPlay
						muted
						loop
						playsInline
						preload='auto'
						className='h-full w-full scale-110 object-cover opacity-30'
					/>
				)}
				<div
					className='absolute inset-0'
					style={{
						background:
							'radial-gradient(75% 60% at 12% 8%, hsl(var(--brand) / 0.30), transparent 60%), radial-gradient(60% 55% at 92% 18%, hsl(var(--brand) / 0.16), transparent 55%)',
					}}
				/>
				<div
					className='absolute inset-0 opacity-[0.16]'
					style={{
						backgroundImage:
							'linear-gradient(hsl(var(--brand)/0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--brand)/0.35) 1px, transparent 1px)',
						backgroundSize: '46px 46px',
						maskImage:
							'radial-gradient(120% 90% at 30% 0%, black, transparent 75%)',
					}}
				/>
				<div className='absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background' />
			</motion.div>

			{/* slow floating glow */}
			<motion.div
				aria-hidden
				className='pointer-events-none absolute -left-24 top-1/4 -z-10 h-72 w-72 rounded-full bg-brand/20 blur-[120px]'
				animate={reduce ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
				transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
			/>

			<motion.div
				style={
					reduce ? undefined : { y: contentY, opacity: contentOpacity }
				}
				className='relative mx-auto w-full max-w-5xl px-6 pb-20 pt-40 md:pb-28'
			>
				<motion.span
					initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: easeOutExpo }}
					className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-brand'
				>
					<span className='h-px w-8 bg-brand/60' />
					{kicker}
				</motion.span>

				<h1 className='mt-7 font-display text-[clamp(2.6rem,8.5vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em] text-white'>
					<span className='flex flex-wrap gap-x-[0.28em]'>
						{words.map((word, i) => (
							<span
								key={`${word}-${i}`}
								className='relative inline-block overflow-hidden pb-[0.08em]'
							>
								<motion.span
									className='inline-block'
									initial={
										reduce ? { opacity: 0 } : { y: '115%' }
									}
									animate={reduce ? { opacity: 1 } : { y: 0 }}
									transition={{
										duration: 0.85,
										ease: easeOutExpo,
										delay: 0.12 + i * 0.07,
									}}
								>
									{word}
								</motion.span>
							</span>
						))}
					</span>
				</h1>

				{lede && (
					<motion.p
						initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.7,
							ease: easeOutExpo,
							delay: 0.35,
						}}
						className='mt-8 max-w-[58ch] text-lg leading-relaxed text-slate-300 md:text-xl'
					>
						{lede}
					</motion.p>
				)}

				{meta && meta.length > 0 && (
					<motion.dl
						initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.7,
							ease: easeOutExpo,
							delay: 0.5,
						}}
						className='mt-12 flex flex-wrap items-start gap-x-10 gap-y-5'
					>
						{meta.map((m) => (
							<div key={m.label} className='flex flex-col'>
								<dt className='font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500'>
									{m.label}
								</dt>
								<dd className='mt-1.5 text-sm font-medium text-slate-200'>
									{m.value}
								</dd>
							</div>
						))}
					</motion.dl>
				)}
			</motion.div>
		</header>
	);
}

/* -------------------------------------------------------------------------- */
/*  Layout primitives                                                          */
/* -------------------------------------------------------------------------- */

export function Section({
	id,
	className,
	children,
}: {
	id?: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<section
			id={id}
			className={cn(
				'mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-16 md:py-24',
				className
			)}
		>
			{children}
		</section>
	);
}

export function Reveal({
	children,
	delay = 0,
	y = 26,
	className,
}: {
	children: React.ReactNode;
	delay?: number;
	y?: number;
	className?: string;
}) {
	const reduce = useReducedMotion();
	return (
		<motion.div
			className={className}
			initial={
				reduce
					? { opacity: 0 }
					: { opacity: 0, y, filter: 'blur(8px)' }
			}
			whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
			viewport={{ once: true, margin: '-80px' }}
			transition={{ duration: 0.75, ease: easeOutExpo, delay }}
		>
			{children}
		</motion.div>
	);
}

export function SectionHeading({
	children,
	number,
	className,
}: {
	children: React.ReactNode;
	/** Only pass for genuine ordered sequences. */
	number?: string;
	className?: string;
}) {
	return (
		<Reveal>
			<h2
				className={cn(
					'font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white md:text-5xl',
					className
				)}
			>
				{number && (
					<span className='mr-3 align-top font-mono text-base font-medium text-brand md:text-lg'>
						{number}
					</span>
				)}
				{children}
			</h2>
		</Reveal>
	);
}

export function Lead({ children }: { children: React.ReactNode }) {
	return (
		<Reveal>
			<p className='max-w-[60ch] text-xl leading-relaxed text-slate-200 md:text-2xl'>
				{children}
			</p>
		</Reveal>
	);
}

export function Prose({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<Reveal>
			<div
				className={cn(
					'max-w-[68ch] space-y-5 text-lg leading-relaxed text-slate-300',
					'[&_strong]:font-semibold [&_strong]:text-white',
					'[&_code]:rounded [&_code]:bg-brand/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-brand',
					className
				)}
			>
				{children}
			</div>
		</Reveal>
	);
}

/* -------------------------------------------------------------------------- */
/*  Metrics (count-up)                                                         */
/* -------------------------------------------------------------------------- */

export interface MetricItem {
	/** Numeric target to count toward (omit when using `display`). */
	value?: number;
	/** Static string shown verbatim, e.g. "<10s". */
	display?: string;
	prefix?: string;
	suffix?: string;
	decimals?: number;
	label: string;
}

function MetricValue({ item, inView }: { item: MetricItem; inView: boolean }) {
	const reduce = useReducedMotion();
	const [n, setN] = useState(0);

	useEffect(() => {
		if (item.value == null || !inView) return;
		if (reduce) {
			setN(item.value);
			return;
		}
		const controls = animate(0, item.value, {
			duration: 1.6,
			ease: easeOutExpo,
			onUpdate: (v) => setN(v),
		});
		return () => controls.stop();
	}, [inView, item.value, reduce]);

	if (item.display != null) {
		return <>{item.display}</>;
	}

	const text =
		item.decimals && item.decimals > 0
			? n.toFixed(item.decimals)
			: Math.round(n).toString();

	return (
		<>
			{item.prefix}
			{text}
			{item.suffix}
		</>
	);
}

export function MetricStrip({ items }: { items: MetricItem[] }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: '-60px' });
	return (
		<Reveal>
			<div
				ref={ref}
				className='grid grid-cols-2 gap-y-8 border-y border-slate-800 py-8 md:grid-cols-4 md:gap-y-0'
			>
				{items.map((item, i) => (
					<div
						key={item.label}
						className={cn(
							'px-2 md:px-6',
							i > 0 && 'md:border-l md:border-slate-800',
							i % 2 === 1 && 'border-l border-slate-800 md:border-l'
						)}
					>
						<div className='font-mono text-4xl font-semibold tabular-nums text-white md:text-5xl'>
							<MetricValue item={item} inView={inView} />
						</div>
						<div className='mt-2 text-sm leading-snug text-slate-400'>
							{item.label}
						</div>
					</div>
				))}
			</div>
		</Reveal>
	);
}

/* -------------------------------------------------------------------------- */
/*  Tags                                                                       */
/* -------------------------------------------------------------------------- */

export function TagRow({ tags }: { tags: string[] }) {
	const reduce = useReducedMotion();
	const container: Variants = {
		hidden: {},
		show: { transition: { staggerChildren: 0.04 } },
	};
	const item: Variants = {
		hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 10 },
		show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOutExpo } },
	};
	return (
		<motion.ul
			variants={container}
			initial='hidden'
			whileInView='show'
			viewport={{ once: true, margin: '-60px' }}
			className='flex flex-wrap gap-2'
		>
			{tags.map((tag) => (
				<motion.li
					key={tag}
					variants={item}
					className='rounded-full border border-brand/20 bg-brand/10 px-3 py-1 font-mono text-xs tracking-wide text-brand'
				>
					{tag}
				</motion.li>
			))}
		</motion.ul>
	);
}

/* -------------------------------------------------------------------------- */
/*  Pull quote                                                                 */
/* -------------------------------------------------------------------------- */

export function Pullquote({ children }: { children: React.ReactNode }) {
	return (
		<Reveal>
			<figure className='mx-auto max-w-3xl text-center'>
				<span
					aria-hidden
					className='font-display text-6xl leading-none text-brand/40'
				>
					&ldquo;
				</span>
				<blockquote className='-mt-4 font-display text-2xl font-medium leading-snug tracking-[-0.02em] text-white md:text-4xl'>
					{children}
				</blockquote>
			</figure>
		</Reveal>
	);
}

/* -------------------------------------------------------------------------- */
/*  Step list (ordered sequence)                                               */
/* -------------------------------------------------------------------------- */

export interface Step {
	title: string;
	body: React.ReactNode;
}

export function StepList({ steps }: { steps: Step[] }) {
	return (
		<ol className='relative space-y-10'>
			<span
				aria-hidden
				className='absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-brand/50 via-slate-800 to-transparent'
			/>
			{steps.map((step, i) => (
				<Reveal key={step.title} delay={i * 0.05}>
					<li className='relative pl-12'>
						<span className='absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-brand/40 bg-background font-mono text-sm font-medium text-brand'>
							{i + 1}
						</span>
						<h3 className='font-display text-xl font-bold tracking-tight text-white'>
							{step.title}
						</h3>
						<div className='mt-2 max-w-[64ch] text-base leading-relaxed text-slate-400'>
							{step.body}
						</div>
					</li>
				</Reveal>
			))}
		</ol>
	);
}

/* -------------------------------------------------------------------------- */
/*  Outbound CTA                                                               */
/* -------------------------------------------------------------------------- */

export function OutboundButton({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			className='group inline-flex items-center gap-3 rounded-full border border-brand/30 bg-brand/10 py-3 pl-6 pr-3 font-medium text-white transition-colors duration-200 hover:bg-brand/20 active:scale-[0.98]'
		>
			{children}
			<span className='flex h-8 w-8 items-center justify-center rounded-full bg-brand text-brand-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'>
				<ArrowUpRight className='h-4 w-4' strokeWidth={2} />
			</span>
		</Link>
	);
}
