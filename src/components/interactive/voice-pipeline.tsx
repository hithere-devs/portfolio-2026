'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
	Mic,
	AudioLines,
	BrainCircuit,
	Workflow,
	AudioWaveform,
	Server,
	type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DiagramShell } from './diagram-shell';
import { easeOutExpo, spring } from './motion';

type Stage = {
	id: string;
	label: string;
	caption: string;
	Icon: LucideIcon;
};

const STAGES: Stage[] = [
	{
		id: 'capture',
		label: 'Capture',
		caption: 'Raw caller audio streams in over the telephony layer in real time.',
		Icon: Mic,
	},
	{
		id: 'transcribe',
		label: 'Transcribe',
		caption: 'Streaming speech-to-text turns the waveform into live transcripts.',
		Icon: AudioLines,
	},
	{
		id: 'understand',
		label: 'Understand',
		caption: 'Intent and context are resolved against the conversation state.',
		Icon: BrainCircuit,
	},
	{
		id: 'plan',
		label: 'Plan',
		caption: 'The dialog policy decides the next action and the response to speak.',
		Icon: Workflow,
	},
	{
		id: 'speak',
		label: 'Speak',
		caption: 'Low-latency text-to-speech synthesizes the reply back to the caller.',
		Icon: AudioWaveform,
	},
];

/** Deterministic bar heights so SSR and client match (no Math.random at render). */
const BAR_SEEDS = Array.from({ length: 28 }, (_, i) =>
	0.35 + 0.55 * Math.abs(Math.sin(i * 1.7 + 0.6))
);

function Waveform({ animate }: { animate: boolean }) {
	return (
		<div className='flex h-14 items-center justify-center gap-[3px]'>
			{BAR_SEEDS.map((seed, i) => (
				<motion.span
					key={i}
					className='w-[3px] rounded-full bg-gradient-to-t from-brand/40 to-brand'
					style={{ height: `${Math.round(seed * 100)}%` }}
					initial={false}
					animate={
						animate
							? { scaleY: [seed, seed * 0.4 + 0.25, seed * 1.1, seed * 0.6, seed] }
							: { scaleY: seed }
					}
					transition={
						animate
							? {
									duration: 1.1 + (i % 5) * 0.12,
									repeat: Infinity,
									ease: 'easeInOut',
									delay: (i % 7) * 0.05,
							  }
							: { duration: 0 }
					}
				/>
			))}
		</div>
	);
}

function ClusterNode({ hot }: { hot: boolean }) {
	return (
		<motion.div
			className={cn(
				'flex h-9 w-12 items-center justify-center rounded-md border transition-colors duration-300',
				hot
					? 'border-brand/70 bg-brand/15 text-brand'
					: 'border-slate-700/70 bg-slate-900/60 text-slate-500'
			)}
			animate={hot ? { scale: [1, 1.08, 1] } : { scale: 1 }}
			transition={hot ? { duration: 0.6, ease: easeOutExpo } : { duration: 0.2 }}
		>
			<Server className='h-4 w-4' strokeWidth={1.5} />
		</motion.div>
	);
}

export function VoicePipeline({ className }: { className?: string }) {
	const reduce = useReducedMotion();
	const [active, setActive] = useState(0);
	const [hovered, setHovered] = useState<number | null>(null);
	const [paused, setPaused] = useState(false);
	const timer = useRef<ReturnType<typeof setInterval> | null>(null);

	// Auto-advance the active stage; loops through stages then the cluster beat.
	useEffect(() => {
		if (paused) return;
		timer.current = setInterval(() => {
			setActive((a) => (a + 1) % (STAGES.length + 1));
		}, 1400);
		return () => {
			if (timer.current) clearInterval(timer.current);
		};
	}, [paused]);

	const shown = hovered ?? Math.min(active, STAGES.length - 1);
	const clusterHot = active === STAGES.length; // the extra beat = cluster receiving
	const caption = STAGES[shown]?.caption ?? '';

	const flow = !reduce;

	return (
		<DiagramShell
			label='Voice Pipeline'
			stat='100K+ calls / day'
			className={className}
		>
			<div
				className='flex flex-col gap-5 md:flex-row md:items-center md:gap-3'
				onMouseLeave={() => {
					setHovered(null);
					setPaused(false);
				}}
			>
				{/* incoming audio */}
				<div className='flex shrink-0 flex-col items-center gap-2'>
					<div className='w-36 rounded-lg border border-brand/20 bg-slate-950/40 px-3 py-2'>
						<Waveform animate={flow} />
					</div>
					<span className='font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500'>
						Caller audio
					</span>
				</div>

				{/* stages */}
				<div className='flex flex-1 items-start justify-between gap-1 sm:gap-2'>
					{STAGES.map((stage, i) => {
						const isActive = shown === i || (clusterHot && i === STAGES.length - 1);
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
											flow && isActive ? { scale: 1.06 } : { scale: 1 }
										}
										transition={spring}
									>
										<stage.Icon className='h-5 w-5 sm:h-6 sm:w-6' strokeWidth={1.5} />
										{flow && isActive && (
											<motion.span
												className='absolute inset-0 rounded-xl ring-1 ring-brand/60'
												initial={{ opacity: 0.7, scale: 1 }}
												animate={{ opacity: 0, scale: 1.4 }}
												transition={{ duration: 0.9, ease: easeOutExpo }}
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

								{/* connector */}
								{i < STAGES.length - 1 && (
									<div className='relative mt-6 hidden h-px flex-1 self-start overflow-hidden bg-slate-700/50 sm:mt-7 sm:block'>
										<motion.span
											className='absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-brand to-transparent'
											initial={{ x: '-100%' }}
											animate={
												flow ? { x: ['-100%', '200%'] } : { x: '-100%' }
											}
											transition={
												flow
													? {
															duration: 1.4,
															repeat: Infinity,
															ease: 'linear',
															delay: i * 0.28,
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

				{/* distributed cluster */}
				<div className='flex shrink-0 flex-col items-center gap-2 md:pl-2'>
					<div className='relative rounded-xl border border-dashed border-brand/25 bg-slate-950/30 p-2'>
						<div className='flex flex-col gap-1.5'>
							<div className='flex justify-center'>
								<ClusterNode hot={clusterHot} />
							</div>
							<div className='flex gap-1.5'>
								<ClusterNode hot={clusterHot} />
								<ClusterNode hot={clusterHot} />
							</div>
						</div>
					</div>
					<span className='font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500'>
						Inference cluster
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
						{STAGES[shown]?.label}.
					</span>{' '}
					{caption}
				</motion.p>
			</div>
		</DiagramShell>
	);
}

export default VoicePipeline;
