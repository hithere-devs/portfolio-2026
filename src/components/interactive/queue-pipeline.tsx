'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
	Send,
	Layers,
	Cpu,
	GitBranch,
	PackageCheck,
	type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DiagramShell } from './diagram-shell';
import { easeOutExpo, spring } from './motion';

export type Stage = {
	id: string;
	label: string;
	caption: string;
	Icon: LucideIcon;
};

const DEFAULT_STAGES: Stage[] = [
	{
		id: 'produce',
		label: 'Produce',
		caption: 'Workspace export requests land as jobs from the API layer.',
		Icon: Send,
	},
	{
		id: 'queue',
		label: 'Queue',
		caption: 'BullMQ on Redis buffers and prioritizes work, with retries and backoff.',
		Icon: Layers,
	},
	{
		id: 'workers',
		label: 'Workers',
		caption: 'A pool of workers drives Playwright sessions and third-party APIs.',
		Icon: Cpu,
	},
	{
		id: 'stream',
		label: 'Stream',
		caption: 'Kafka fans progress events out to every service that needs them.',
		Icon: GitBranch,
	},
	{
		id: 'export',
		label: 'Export',
		caption: 'Accounts land in the cold-outreach tool, tracked step by step.',
		Icon: PackageCheck,
	},
];

/** Left-side pending jobs that drain as the queue is worked. */
function JobStack({ animate }: { animate: boolean }) {
	const bars = [0.9, 0.7, 0.55, 0.85, 0.65];
	return (
		<div className='flex h-14 flex-col justify-center gap-1.5'>
			{bars.map((w, i) => (
				<motion.span
					key={i}
					className='h-2 rounded-full bg-gradient-to-r from-brand/60 to-brand/20'
					style={{ width: `${Math.round(w * 100)}%` }}
					initial={false}
					animate={
						animate
							? { opacity: [0.35, 1, 0.35], x: [0, 6, 0] }
							: { opacity: 0.8, x: 0 }
					}
					transition={
						animate
							? {
									duration: 1.8,
									repeat: Infinity,
									ease: 'easeInOut',
									delay: i * 0.16,
							  }
							: { duration: 0 }
					}
				/>
			))}
		</div>
	);
}

/** Right-side export progress ring. */
function ExportRing({ animate }: { animate: boolean }) {
	const r = 16;
	const c = 2 * Math.PI * r;
	return (
		<svg viewBox='0 0 44 44' className='h-12 w-12 -rotate-90'>
			<circle
				cx='22'
				cy='22'
				r={r}
				fill='none'
				stroke='currentColor'
				strokeWidth='3'
				className='text-slate-800'
			/>
			<motion.circle
				cx='22'
				cy='22'
				r={r}
				fill='none'
				stroke='currentColor'
				strokeWidth='3'
				strokeLinecap='round'
				className='text-brand'
				strokeDasharray={c}
				initial={{ strokeDashoffset: c }}
				animate={
					animate
						? { strokeDashoffset: [c, 0, 0] }
						: { strokeDashoffset: c * 0.25 }
				}
				transition={
					animate
						? {
								duration: 2.8,
								repeat: Infinity,
								ease: easeOutExpo,
								times: [0, 0.7, 1],
						  }
						: { duration: 0 }
				}
			/>
		</svg>
	);
}

interface QueuePipelineProps {
	className?: string;
	label?: string;
	stat?: string;
	stages?: Stage[];
	leftLabel?: string;
	rightLabel?: string;
}

export function QueuePipeline({
	className,
	label = 'Zapmail Queues',
	stat = 'bullmq · kafka',
	stages = DEFAULT_STAGES,
	leftLabel = 'Export jobs',
	rightLabel = 'Outreach tool',
}: QueuePipelineProps) {
	const reduce = useReducedMotion();
	const [active, setActive] = useState(0);
	const [hovered, setHovered] = useState<number | null>(null);
	const [paused, setPaused] = useState(false);
	const timer = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		if (paused || reduce) return;
		timer.current = setInterval(() => {
			setActive((a) => (a + 1) % stages.length);
		}, 1500);
		return () => {
			if (timer.current) clearInterval(timer.current);
		};
	}, [paused, reduce, stages.length]);

	const shown = hovered ?? active;
	const flow = !reduce;
	const caption = stages[shown]?.caption ?? '';

	return (
		<DiagramShell label={label} stat={stat} className={className}>
			<div
				className='flex flex-col gap-5 md:flex-row md:items-center md:gap-3'
				onMouseLeave={() => {
					setHovered(null);
					setPaused(false);
				}}
			>
				{/* incoming jobs */}
				<div className='flex shrink-0 flex-col items-center gap-2'>
					<div className='w-32 rounded-lg border border-brand/20 bg-slate-950/40 px-3 py-2'>
						<JobStack animate={flow} />
					</div>
					<span className='font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500'>
						{leftLabel}
					</span>
				</div>

				{/* stages */}
				<div className='flex flex-1 items-start justify-between gap-1 sm:gap-2'>
					{stages.map((stage, i) => {
						const isActive = shown === i;
						return (
							<React.Fragment key={stage.id}>
								<button
									type='button'
									onMouseEnter={() => {
										setHovered(i);
										setPaused(true);
									}}
									onFocus={() => {
										setHovered(i);
										setPaused(true);
									}}
									onBlur={() => {
										setHovered(null);
										setPaused(false);
									}}
									className='group flex shrink-0 flex-col items-center gap-2 rounded-md outline-none'
									aria-label={`${stage.label}: ${stage.caption}`}
								>
									<motion.span
										className={cn(
											'relative flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-300 sm:h-14 sm:w-14',
											isActive
												? 'border-brand/70 bg-brand/15 text-brand'
												: 'border-slate-700/70 bg-slate-900/50 text-slate-500'
										)}
										animate={
											flow && isActive
												? { scale: 1.06 }
												: { scale: 1 }
										}
										transition={spring}
									>
										<stage.Icon
											className='h-5 w-5 sm:h-6 sm:w-6'
											strokeWidth={1.5}
										/>
										{flow && isActive && (
											<motion.span
												className='absolute inset-0 rounded-xl ring-1 ring-brand/60'
												initial={{ opacity: 0.7, scale: 1 }}
												animate={{ opacity: 0, scale: 1.4 }}
												transition={{
													duration: 0.9,
													ease: easeOutExpo,
												}}
											/>
										)}
									</motion.span>
									<span
										className={cn(
											'font-mono text-[9px] uppercase tracking-[0.14em] transition-colors duration-300 sm:text-[10px]',
											isActive ? 'text-brand' : 'text-slate-500'
										)}
									>
										{stage.label}
									</span>
								</button>

								{i < stages.length - 1 && (
									<div className='relative mt-6 hidden h-px flex-1 self-start overflow-hidden bg-slate-700/50 sm:mt-7 sm:block'>
										<motion.span
											className='absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-brand to-transparent'
											initial={{ x: '-100%' }}
											animate={
												flow
													? { x: ['-100%', '200%'] }
													: { x: '-100%' }
											}
											transition={
												flow
													? {
															duration: 1.5,
															repeat: Infinity,
															ease: 'linear',
															delay: i * 0.3,
													  }
													: { duration: 0 }
											}
										/>
									</div>
								)}
							</React.Fragment>
						);
					})}
				</div>

				{/* export target */}
				<div className='flex shrink-0 flex-col items-center gap-2 md:pl-2'>
					<div className='rounded-xl border border-dashed border-brand/25 bg-slate-950/30 p-2'>
						<ExportRing animate={flow} />
					</div>
					<span className='font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500'>
						{rightLabel}
					</span>
				</div>
			</div>

			{/* caption rail */}
			<div className='mt-5 min-h-[2.5rem] border-t border-slate-800/80 pt-3'>
				<motion.p
					key={shown}
					initial={{ opacity: 0, y: reduce ? 0 : 4 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.35, ease: easeOutExpo }}
					className='text-sm leading-relaxed text-slate-400'
				>
					<span className='font-medium text-slate-200'>
						{stages[shown]?.label}.
					</span>{' '}
					{caption}
				</motion.p>
			</div>
		</DiagramShell>
	);
}

export default QueuePipeline;
