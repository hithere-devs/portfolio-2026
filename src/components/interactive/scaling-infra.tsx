'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Hexagon, Server, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DiagramShell } from './diagram-shell';
import { easeOutExpo, spring } from './motion';

const NODE_COUNT = 3;
const MIN_PODS = 3;
const MAX_PODS = 12;

function distributePods(total: number): number[] {
	const base = Math.floor(total / NODE_COUNT);
	const rem = total % NODE_COUNT;
	return Array.from({ length: NODE_COUNT }, (_, i) => base + (i < rem ? 1 : 0));
}

function Connector({ flow, delay }: { flow: boolean; delay: number }) {
	return (
		<div className='relative mx-auto h-8 w-px overflow-hidden bg-gradient-to-b from-brand/50 to-brand/10'>
			{flow && (
				<motion.span
					className='absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_8px_hsl(var(--brand))]'
					initial={{ y: -8, opacity: 0 }}
					animate={{ y: 32, opacity: [0, 1, 1, 0] }}
					transition={{
						duration: 1.1,
						repeat: Infinity,
						ease: 'easeIn',
						delay,
					}}
				/>
			)}
		</div>
	);
}

export function ScalingInfra({ className }: { className?: string }) {
	const reduce = useReducedMotion();
	const [load, setLoad] = useState(0.25);
	const [spiking, setSpiking] = useState(false);
	const phase = useRef(0);

	// Gentle simulated traffic; a spike decays back to baseline.
	useEffect(() => {
		const id = setInterval(() => {
			phase.current += 0.35;
			setLoad((prev) => {
				const baseline = 0.28 + 0.16 * Math.sin(phase.current) + 0.04 * Math.sin(phase.current * 2.3);
				if (spiking) return Math.min(1, prev + 0.18);
				return prev + (baseline - prev) * 0.25;
			});
		}, 700);
		return () => clearInterval(id);
	}, [spiking]);

	useEffect(() => {
		if (!spiking) return;
		const t = setTimeout(() => setSpiking(false), 2100);
		return () => clearTimeout(t);
	}, [spiking]);

	const totalPods = Math.round(MIN_PODS + load * (MAX_PODS - MIN_PODS));
	const perNode = distributePods(totalPods);
	const rps = Math.round(load * 9500 + 400);
	const flow = !reduce;

	return (
		<DiagramShell
			label='K8s Autoscaling'
			stat={`${rps.toLocaleString()} req / s`}
			className={className}
		>
			{/* control plane */}
			<div className='flex flex-col items-center'>
				<div
					className={cn(
						'flex items-center gap-2.5 rounded-xl border border-brand/40 bg-brand/10 px-4 py-2.5',
						'shadow-[0_0_24px_-6px_hsl(var(--brand)/0.6)]'
					)}
				>
					<Hexagon className='h-5 w-5 text-brand' strokeWidth={1.5} />
					<div className='flex flex-col leading-tight'>
						<span className='text-sm font-semibold text-slate-100'>
							Control plane
						</span>
						<span className='font-mono text-[9px] uppercase tracking-[0.16em] text-brand/70'>
							scheduler · HPA
						</span>
					</div>
				</div>

				{/* fan-out connectors */}
				<div className='grid w-full max-w-md grid-cols-3 gap-3 sm:gap-4'>
					{Array.from({ length: NODE_COUNT }).map((_, i) => (
						<Connector key={i} flow={flow} delay={i * 0.32} />
					))}
				</div>

				{/* worker nodes */}
				<div className='grid w-full max-w-md grid-cols-3 gap-3 sm:gap-4'>
					{perNode.map((podCount, i) => (
						<WorkerNode key={i} index={i} podCount={podCount} reduce={!!reduce} />
					))}
				</div>
			</div>

			{/* footer: scale state + control */}
			<div className='mt-5 flex flex-col items-start justify-between gap-3 border-t border-slate-800/80 pt-4 sm:flex-row sm:items-center'>
				<p className='font-mono text-xs text-slate-400'>
					<span className='text-brand'>{totalPods}</span> pods live across{' '}
					<span className='text-slate-200'>{NODE_COUNT}</span> nodes
					<span className='ml-2 text-slate-600'>
						(autoscales {MIN_PODS} → {MAX_PODS})
					</span>
				</p>
				<button
					type='button'
					onClick={() => setSpiking(true)}
					disabled={spiking}
					className={cn(
						'group inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5',
						'font-mono text-[11px] uppercase tracking-[0.14em] text-brand transition-all duration-200',
						'hover:bg-brand/20 active:scale-[0.97] disabled:opacity-60'
					)}
				>
					<Zap
						className='h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110'
						strokeWidth={2}
					/>
					{spiking ? 'Scaling out…' : 'Simulate traffic spike'}
				</button>
			</div>
		</DiagramShell>
	);
}

function WorkerNode({
	index,
	podCount,
	reduce,
}: {
	index: number;
	podCount: number;
	reduce: boolean;
}) {
	const [hovered, setHovered] = useState(false);
	const pods = Array.from({ length: podCount }, (_, i) => i);

	return (
		<div
			className={cn(
				'relative flex flex-col gap-2 rounded-lg border bg-slate-900/50 p-2.5 transition-colors duration-200',
				hovered ? 'border-brand/60 bg-slate-900/80' : 'border-slate-700/60'
			)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className='flex items-center justify-between'>
				<Server className='h-3.5 w-3.5 text-slate-400' strokeWidth={1.5} />
				<span className='font-mono text-[9px] text-slate-500'>node-{index + 1}</span>
			</div>
			<div className='grid grid-cols-4 gap-1'>
				<AnimatePresence mode='popLayout'>
					{pods.map((p) => (
						<motion.span
							key={p}
							layout
							initial={{ opacity: 0, scale: reduce ? 1 : 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: reduce ? 1 : 0.5 }}
							transition={reduce ? { duration: 0.2 } : spring}
							className='aspect-square rounded-[3px] bg-brand/70 shadow-[0_0_6px_-1px_hsl(var(--brand))]'
						/>
					))}
				</AnimatePresence>
			</div>
			<AnimatePresence>
				{hovered && (
					<motion.span
						initial={{ opacity: 0, y: reduce ? 0 : 4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.18, ease: easeOutExpo }}
						className='font-mono text-[9px] uppercase tracking-[0.12em] text-brand'
					>
						{podCount} pods
					</motion.span>
				)}
			</AnimatePresence>
		</div>
	);
}

export default ScalingInfra;
