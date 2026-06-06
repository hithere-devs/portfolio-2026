'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface DiagramShellProps {
	/** Short mono label shown top-left, e.g. "VOICE PIPELINE". */
	label: string;
	/** Optional live stat shown top-right, e.g. "100K+ calls / day". */
	stat?: string;
	/** Whether to show the pulsing live dot next to the stat. */
	live?: boolean;
	className?: string;
	children: React.ReactNode;
}

/**
 * Consistent bordered surface for the interactive architecture figures.
 * Deep navy surface with a cobalt-tinted hairline, matching the dark theme tokens.
 */
export function DiagramShell({
	label,
	stat,
	live = true,
	className,
	children,
}: DiagramShellProps) {
	return (
		<figure
			className={cn(
				'not-prose relative w-full overflow-hidden rounded-2xl border border-white/10',
				'bg-[hsl(223_47%_9%)]',
				'shadow-[0_30px_80px_-40px_hsl(var(--brand)/0.6),inset_0_1px_0_hsl(0_0%_100%/0.06)]',
				className
			)}
		>
			{/* ambient cobalt glow */}
			<div
				aria-hidden
				className='pointer-events-none absolute -inset-px opacity-80'
				style={{
					background:
						'radial-gradient(70% 90% at 50% 0%, hsl(var(--brand) / 0.16), transparent 70%)',
				}}
			/>
			{/* faint grid texture */}
			<div
				aria-hidden
				className='pointer-events-none absolute inset-0 opacity-[0.22]'
				style={{
					backgroundImage:
						'linear-gradient(hsl(var(--brand)/0.25) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--brand)/0.25) 1px, transparent 1px)',
					backgroundSize: '32px 32px',
					maskImage:
						'radial-gradient(80% 80% at 50% 40%, black, transparent 80%)',
				}}
			/>

			<div className='relative flex items-center justify-between gap-3 px-4 pt-4 sm:px-5'>
				<span className='font-mono text-[10px] uppercase tracking-[0.22em] text-brand/80'>
					{label}
				</span>
				{stat && (
					<span className='flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400'>
						{live && (
							<span className='relative flex h-1.5 w-1.5'>
								<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/70' />
								<span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-brand' />
							</span>
						)}
						{stat}
					</span>
				)}
			</div>

			<div className='relative px-4 pb-5 pt-4 sm:px-6 sm:pb-6'>{children}</div>
		</figure>
	);
}
