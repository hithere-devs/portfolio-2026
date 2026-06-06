'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, Boxes, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DiagramShell } from './diagram-shell';
import { easeOutExpo } from './motion';

const CHUNKS = [
	'calls/transcripts',
	'billing/plans',
	'voice/latency',
	'auth/sso',
	'api/webhooks',
	'faq/refunds',
	'agent/prompts',
	'infra/scaling',
	'privacy/policy',
];

type Query = {
	q: string;
	// chunk index -> similarity score, top matches
	hits: { idx: number; score: number }[];
	answer: string;
};

const QUERIES: Query[] = [
	{
		q: 'How do I lower call latency?',
		hits: [
			{ idx: 2, score: 0.92 },
			{ idx: 7, score: 0.81 },
			{ idx: 6, score: 0.64 },
		],
		answer:
			'Latency is dominated by speech synthesis and model time. Stream partial transcripts, keep the inference cluster warm, and co-locate STT with TTS to cut round-trips.',
	},
	{
		q: 'Can I get a refund?',
		hits: [
			{ idx: 5, score: 0.95 },
			{ idx: 1, score: 0.78 },
			{ idx: 8, score: 0.51 },
		],
		answer:
			'Refunds follow the plan terms: prorated within the first 14 days. Billing details live under your workspace settings.',
	},
	{
		q: 'How do webhooks work?',
		hits: [
			{ idx: 4, score: 0.94 },
			{ idx: 3, score: 0.6 },
			{ idx: 0, score: 0.58 },
		],
		answer:
			'Webhooks POST signed events on call completion. Verify the signature header, then read the transcript payload from the event body.',
	},
];

type Phase = 'embed' | 'retrieve' | 'answer' | 'done';

export function RagPipeline({ className }: { className?: string }) {
	const reduce = useReducedMotion();
	const [qi, setQi] = useState(0);
	const [phase, setPhase] = useState<Phase>('embed');
	const [typed, setTyped] = useState(0);
	const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

	const query = QUERIES[qi];
	const hitSet = new Set(query.hits.map((h) => h.idx));

	const clearTimers = () => {
		timers.current.forEach(clearTimeout);
		timers.current = [];
	};

	// Drive the state machine whenever the active query changes.
	useEffect(() => {
		clearTimers();
		setTyped(0);

		if (reduce) {
			setPhase('done');
			setTyped(query.answer.length);
			timers.current.push(setTimeout(() => setQi((i) => (i + 1) % QUERIES.length), 5000));
			return clearTimers;
		}

		setPhase('embed');
		timers.current.push(setTimeout(() => setPhase('retrieve'), 900));
		timers.current.push(setTimeout(() => setPhase('answer'), 2100));
		return clearTimers;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [qi, reduce]);

	// Typewriter for the answer.
	useEffect(() => {
		if (phase !== 'answer') return;
		let i = 0;
		const id = setInterval(() => {
			i += 2;
			setTyped(Math.min(i, query.answer.length));
			if (i >= query.answer.length) {
				clearInterval(id);
				setPhase('done');
				timers.current.push(
					setTimeout(() => setQi((p) => (p + 1) % QUERIES.length), 3200)
				);
			}
		}, 18);
		return () => clearInterval(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [phase]);

	const retrieved = phase === 'retrieve' || phase === 'answer' || phase === 'done';
	const answering = phase === 'answer' || phase === 'done';

	return (
		<DiagramShell label='RAG Retrieval' stat='self-learning' live={false} className={className}>
			{/* sample queries */}
			<div className='flex flex-wrap gap-2'>
				{QUERIES.map((item, i) => (
					<button
						key={item.q}
						type='button'
						onClick={() => setQi(i)}
						className={cn(
							'rounded-full border px-3 py-1 text-left font-mono text-[10px] tracking-wide transition-all duration-200 active:scale-[0.97]',
							i === qi
								? 'border-brand/60 bg-brand/15 text-brand'
								: 'border-slate-700/60 bg-slate-900/40 text-slate-400 hover:border-brand/30 hover:text-slate-200'
						)}
					>
						{item.q}
					</button>
				))}
			</div>

			<div className='mt-5 grid gap-4 md:grid-cols-[1fr_auto_1.2fr] md:items-stretch'>
				{/* embed */}
				<div className='flex flex-col gap-2 rounded-lg border border-slate-700/60 bg-slate-900/40 p-3'>
					<div className='flex items-center gap-2 text-slate-300'>
						<Search className='h-4 w-4 text-brand' strokeWidth={1.5} />
						<span className='font-mono text-[10px] uppercase tracking-[0.16em]'>
							Embed query
						</span>
					</div>
					<p className='text-sm leading-snug text-slate-200'>{query.q}</p>
					<div className='mt-auto flex flex-wrap gap-1 pt-2'>
						{Array.from({ length: 14 }).map((_, i) => (
							<motion.span
								key={`${qi}-${i}`}
								className='h-1.5 w-1.5 rounded-full bg-brand'
								initial={{ opacity: 0.15 }}
								animate={{ opacity: reduce ? 0.9 : [0.15, 1, 0.4] }}
								transition={
									reduce
										? { duration: 0 }
										: {
												duration: 0.9,
												repeat: phase === 'embed' ? Infinity : 0,
												delay: i * 0.04,
												ease: 'easeInOut',
										  }
								}
								style={{ opacity: phase === 'embed' ? undefined : 0.9 }}
							/>
						))}
					</div>
				</div>

				{/* vector store */}
				<div className='flex flex-col gap-2 rounded-lg border border-slate-700/60 bg-slate-900/40 p-3'>
					<div className='flex items-center gap-2 text-slate-300'>
						<Boxes className='h-4 w-4 text-brand' strokeWidth={1.5} />
						<span className='font-mono text-[10px] uppercase tracking-[0.16em]'>
							Vector store
						</span>
					</div>
					<div className='grid grid-cols-3 gap-1.5'>
						{CHUNKS.map((label, idx) => {
							const isHit = retrieved && hitSet.has(idx);
							const hit = query.hits.find((h) => h.idx === idx);
							return (
								<motion.div
									key={label}
									className={cn(
										'relative flex h-9 items-center justify-center rounded-[5px] border px-1 text-center transition-colors duration-300',
										isHit
											? 'border-brand/70 bg-brand/15'
											: 'border-slate-700/50 bg-slate-950/40'
									)}
									animate={
										!reduce && isHit ? { scale: [1, 1.06, 1] } : { scale: 1 }
									}
									transition={{ duration: 0.5, ease: easeOutExpo }}
								>
									<span
										className={cn(
											'font-mono text-[7.5px] leading-tight tracking-tight',
											isHit ? 'text-brand' : 'text-slate-600'
										)}
									>
										{label}
									</span>
									{isHit && hit && (
										<motion.span
											initial={{ opacity: 0, y: reduce ? 0 : -3 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, ease: easeOutExpo }}
											className='absolute -right-1 -top-1 rounded-full bg-brand px-1 font-mono text-[7px] font-semibold text-[hsl(224_71%_4%)]'
										>
											{hit.score.toFixed(2)}
										</motion.span>
									)}
								</motion.div>
							);
						})}
					</div>
					<span className='font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500'>
						{retrieved ? 'top 3 of 9 chunks' : 'searching…'}
					</span>
				</div>

				{/* generation */}
				<div className='flex flex-col gap-2 rounded-lg border border-slate-700/60 bg-slate-900/40 p-3'>
					<div className='flex items-center gap-2 text-slate-300'>
						<Sparkles className='h-4 w-4 text-brand' strokeWidth={1.5} />
						<span className='font-mono text-[10px] uppercase tracking-[0.16em]'>
							Grounded answer
						</span>
					</div>
					<p className='text-sm leading-relaxed text-slate-300'>
						{answering ? (
							<>
								{query.answer.slice(0, typed)}
								{phase === 'answer' && !reduce && (
									<span className='ml-0.5 inline-block h-4 w-[2px] -translate-y-[1px] animate-pulse bg-brand align-middle' />
								)}
							</>
						) : (
							<span className='text-slate-600'>
								Waiting for retrieved context…
							</span>
						)}
					</p>
				</div>
			</div>
		</DiagramShell>
	);
}

export default RagPipeline;
