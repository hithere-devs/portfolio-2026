'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
	Boxes,
	Filter,
	Search,
	type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DiagramShell } from './diagram-shell';
import { easeOutExpo } from './motion';

type Level = 'INFO' | 'WARN' | 'ERROR';

export type LogSeed = {
	level: Level;
	svc: string;
	msg: string;
};

export type FlowNode = { label: string; Icon: LucideIcon };

const DEFAULT_POOL: LogSeed[] = [
	{ level: 'INFO', svc: 'mail-svc', msg: 'batch dispatched · 4,210 messages' },
	{ level: 'INFO', svc: 'analytics', msg: 'aggregation window flushed to store' },
	{ level: 'WARN', svc: 'smtp-pool', msg: 'provider latency 820ms, rerouting' },
	{ level: 'INFO', svc: 'webhook', msg: 'open event ingested · campaign 3391' },
	{ level: 'ERROR', svc: 'sync-job', msg: 'retry 2/3 · upstream 429 throttled' },
	{ level: 'INFO', svc: 'auth', msg: 'token refreshed for workspace 118' },
	{ level: 'INFO', svc: 'mail-svc', msg: 'bounce classified · soft → requeue' },
	{ level: 'WARN', svc: 'analytics', msg: 'slow query 1.4s · index advised' },
	{ level: 'INFO', svc: 'webhook', msg: 'click event ingested · campaign 3402' },
	{ level: 'INFO', svc: 'sync-job', msg: 'workspace export completed · 312 rows' },
];

const DEFAULT_FLOW: FlowNode[] = [
	{ label: 'FluentD', Icon: Filter },
	{ label: 'Elastic', Icon: Boxes },
	{ label: 'Kibana', Icon: Search },
];

const levelStyles: Record<Level, string> = {
	INFO: 'text-brand',
	WARN: 'text-amber-400',
	ERROR: 'text-rose-400',
};

let uid = 0;
const stamp = (i: number) => {
	// deterministic, monotonic-looking timestamps
	const base = 12 * 3600 + 41 * 60 + 8 + i * 3;
	const h = Math.floor(base / 3600) % 24;
	const m = Math.floor((base % 3600) / 60);
	const s = base % 60;
	const pad = (x: number) => x.toString().padStart(2, '0');
	return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

interface LogStreamProps {
	className?: string;
	label?: string;
	stat?: string;
	sourceLabel?: string;
	terminalLabel?: string;
	flow?: FlowNode[];
	pool?: LogSeed[];
}

export function LogStream({
	className,
	label = 'EFK Logging',
	stat = 'kibana · live tail',
	sourceLabel = 'microservices',
	terminalLabel = 'kibana@reachinbox · discover',
	flow = DEFAULT_FLOW,
	pool = DEFAULT_POOL,
}: LogStreamProps) {
	const reduce = useReducedMotion();
	const [lines, setLines] = useState(
		pool.slice(0, 5).map((seed, i) => ({ ...seed, id: i, t: stamp(i) }))
	);
	const tickRef = useRef(5);

	useEffect(() => {
		if (reduce) return;
		uid = 5;
		tickRef.current = 5;
		const interval = setInterval(() => {
			const next = tickRef.current + 1;
			tickRef.current = next;
			const seed = pool[next % pool.length];
			setLines((cur) =>
				[...cur, { ...seed, id: ++uid, t: stamp(next) }].slice(-6)
			);
		}, 1500);
		return () => clearInterval(interval);
	}, [reduce, pool]);

	return (
		<DiagramShell label={label} stat={stat} className={className}>
			{/* pipeline chips */}
			<div className='mb-4 flex items-center gap-2 overflow-x-auto pb-1'>
				<span className='flex shrink-0 items-center gap-2 rounded-md border border-slate-700/70 bg-slate-900/60 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400'>
					{sourceLabel}
				</span>
				{flow.map((node) => (
					<React.Fragment key={node.label}>
						<span className='shrink-0 text-slate-600'>&rsaquo;</span>
						<span className='flex shrink-0 items-center gap-1.5 rounded-md border border-brand/30 bg-brand/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-brand'>
							<node.Icon className='h-3 w-3' strokeWidth={1.5} />
							{node.label}
						</span>
					</React.Fragment>
				))}
			</div>

			{/* terminal body */}
			<div className='relative overflow-hidden rounded-lg border border-slate-800 bg-slate-950/70'>
				<div className='flex items-center gap-1.5 border-b border-slate-800/80 px-3 py-2'>
					<span className='h-2 w-2 rounded-full bg-slate-700' />
					<span className='h-2 w-2 rounded-full bg-slate-700' />
					<span className='h-2 w-2 rounded-full bg-slate-700' />
					<span className='ml-2 font-mono text-[10px] tracking-wide text-slate-500'>
						{terminalLabel}
					</span>
				</div>
				<ul className='flex flex-col gap-0.5 p-3 font-mono text-[11px] leading-relaxed sm:text-xs'>
					<AnimatePresence initial={false} mode='popLayout'>
						{lines.map((line) => (
							<motion.li
								key={line.id}
								layout
								initial={
									reduce
										? { opacity: 1 }
										: { opacity: 0, y: 8 }
								}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.4, ease: easeOutExpo }}
								className='flex items-start gap-2 whitespace-nowrap'
							>
								<span className='text-slate-600'>{line.t}</span>
								<span
									className={cn(
										'w-12 shrink-0 font-semibold',
										levelStyles[line.level]
									)}
								>
									{line.level}
								</span>
								<span className='shrink-0 text-slate-500'>
									[{line.svc}]
								</span>
								<span className='truncate text-slate-300'>
									{line.msg}
								</span>
							</motion.li>
						))}
					</AnimatePresence>
				</ul>
			</div>
		</DiagramShell>
	);
}

export default LogStream;
