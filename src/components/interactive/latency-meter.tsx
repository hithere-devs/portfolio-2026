'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, animate } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DiagramShell } from './diagram-shell';
import { easeOutExpo } from './motion';

type Mode = 'before' | 'after';

export type Endpoint = {
	name: string;
	before: number; // seconds
	after: number; // seconds
};

const DEFAULT_ENDPOINTS: Endpoint[] = [
	{ name: 'High-freq dashboard', before: 9.8, after: 0.9 },
	{ name: 'Analytics rollup', before: 4.2, after: 0.4 },
	{ name: 'Campaign stats', before: 6.5, after: 0.6 },
	{ name: 'Inbox sync', before: 2.1, after: 0.3 },
];

function Row({ ep, mode, max }: { ep: Endpoint; mode: Mode; max: number }) {
	const reduce = useReducedMotion();
	const target = ep[mode];
	const [shown, setShown] = useState(ep.before);

	useEffect(() => {
		if (reduce) {
			setShown(target);
			return;
		}
		const controls = animate(shown, target, {
			duration: 0.9,
			ease: easeOutExpo,
			onUpdate: (v) => setShown(v),
		});
		return () => controls.stop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [target, reduce]);

	const frac = Math.max(target / max, 0.04);

	return (
		<div className='flex items-center gap-3'>
			<span className='w-36 shrink-0 truncate text-xs text-slate-400 sm:text-sm'>
				{ep.name}
			</span>
			<div className='relative h-2.5 flex-1 overflow-hidden rounded-full bg-slate-800/80'>
				<motion.div
					className={cn(
						'absolute inset-y-0 left-0 w-full origin-left rounded-full transition-colors duration-500',
						mode === 'after'
							? 'bg-gradient-to-r from-brand/70 to-brand'
							: 'bg-gradient-to-r from-slate-600 to-slate-500'
					)}
					initial={false}
					animate={{ scaleX: frac }}
					transition={
						reduce
							? { duration: 0 }
							: { duration: 0.9, ease: easeOutExpo }
					}
				/>
			</div>
			<span
				className={cn(
					'w-14 shrink-0 text-right font-mono text-sm tabular-nums transition-colors duration-500',
					mode === 'after' ? 'text-brand' : 'text-slate-400'
				)}
			>
				{shown.toFixed(1)}s
			</span>
		</div>
	);
}

interface LatencyMeterProps {
	className?: string;
	label?: string;
	endpoints?: Endpoint[];
	unitLabel?: string;
	beforeCaption?: React.ReactNode;
	afterCaption?: React.ReactNode;
}

export function LatencyMeter({
	className,
	label = 'Query Optimization',
	endpoints = DEFAULT_ENDPOINTS,
	unitLabel = 'p95 response time',
	beforeCaption = (
		<>
			<span className='font-medium text-slate-200'>Before.</span> Unindexed
			reads and N+1 queries dragged hot dashboards toward double-digit
			seconds.
		</>
	),
	afterCaption = (
		<>
			<span className='font-medium text-slate-200'>After.</span> Reshaped
			schemas, targeted indexes, aggregation pipelines, and time-series data
			split into TimescaleDB.
		</>
	),
}: LatencyMeterProps) {
	const [mode, setMode] = useState<Mode>('before');
	const max = Math.max(...endpoints.map((e) => e.before));

	const avgReduction = Math.round(
		(endpoints.reduce((acc, e) => acc + (1 - e.after / e.before), 0) /
			endpoints.length) *
			100
	);

	return (
		<DiagramShell
			label={label}
			stat={`avg −${avgReduction}% latency`}
			live={false}
			className={className}
		>
			{/* toggle */}
			<div className='mb-5 flex items-center justify-between gap-4'>
				<div className='relative inline-flex rounded-full border border-slate-700/80 bg-slate-900/60 p-1'>
					{(['before', 'after'] as Mode[]).map((m) => (
						<button
							key={m}
							type='button'
							onClick={() => setMode(m)}
							className={cn(
								'relative z-10 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200',
								mode === m
									? 'text-brand-foreground'
									: 'text-slate-400 hover:text-slate-200'
							)}
						>
							{mode === m && (
								<motion.span
									layoutId='latency-pill'
									className='absolute inset-0 -z-10 rounded-full bg-brand'
									transition={{
										type: 'spring',
										stiffness: 320,
										damping: 30,
									}}
								/>
							)}
							{m}
						</button>
					))}
				</div>
					<span className='hidden font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 sm:inline'>
						{unitLabel}
					</span>
				</div>

				{/* bars */}
				<div className='space-y-3.5'>
					{endpoints.map((ep) => (
						<Row key={ep.name} ep={ep} mode={mode} max={max} />
					))}
				</div>

				<p className='mt-5 border-t border-slate-800/80 pt-3 text-sm leading-relaxed text-slate-400'>
					{mode === 'before' ? beforeCaption : afterCaption}
				</p>
		</DiagramShell>
	);
}

export default LatencyMeter;
