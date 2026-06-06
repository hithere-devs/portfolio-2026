'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

// lottie-web touches `window`, so load the player only on the client.
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LottieMarkProps {
	/** Path under /public, e.g. "/lottie/samora-voice.json". */
	src: string;
	className?: string;
	loop?: boolean;
	ariaLabel: string;
	/** CSS aspect-ratio for the player box, e.g. "16 / 10" or "1 / 1". */
	aspect?: string;
}

/**
 * Renders a brand Lottie animation fetched from the public folder.
 * Respects reduced-motion by holding on the first frame instead of playing.
 */
export function LottieMark({
	src,
	className,
	loop = true,
	ariaLabel,
	aspect = '16 / 9',
}: LottieMarkProps) {
	const reduce = useReducedMotion();
	const [data, setData] = useState<object | null>(null);

	useEffect(() => {
		let alive = true;
		fetch(src)
			.then((r) => r.json())
			.then((json) => {
				if (alive) setData(json);
			})
			.catch(() => {});
		return () => {
			alive = false;
		};
	}, [src]);

	if (!data) {
		return (
			<div
				aria-hidden
				className={cn('w-full', className)}
				style={{ aspectRatio: aspect }}
			/>
		);
	}

	return (
		<Lottie
			animationData={data}
			loop={loop}
			autoplay={!reduce}
			role='img'
			aria-label={ariaLabel}
			className={cn('w-full', className)}
			style={{ aspectRatio: aspect }}
			rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
		/>
	);
}

export default LottieMark;
