'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function SectionTransition({ text }: { text: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});

	// Parallax movement for the text
	const y = useTransform(scrollYProgress, [0, 1], [-150, 150]);
	// Fade in and out as it crosses the viewport
	const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.15, 0]);

	return (
		<div
			ref={ref}
			className='absolute bottom-0 left-0 w-full translate-y-1/2 pointer-events-none z-0 flex items-center justify-center overflow-visible h-[50vh]'
		>
			{/* Glowing Blob that bleeds into both sections */}
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-primary/10 rounded-full blur-[150px] mix-blend-screen' />

			{/* Massive Parallax Text */}
			<motion.h2
				style={{ y, opacity }}
				className='text-[20vw] font-black tracking-tighter whitespace-nowrap text-foreground select-none'
			>
				{text}
			</motion.h2>
		</div>
	);
}
