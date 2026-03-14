'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function GlobalTimeline() {
	const { scrollYProgress } = useScroll();
	const scaleY = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	// Move the glowing dot along the line
	const dotY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

	return (
		<div className='fixed left-4 md:left-8 top-0 bottom-0 w-[1px] bg-white/5 z-50 pointer-events-none hidden md:block'>
			{/* The filled progress line */}
			<motion.div
				className='absolute top-0 left-0 w-full bg-primary origin-top'
				style={{ scaleY, height: '100%' }}
			/>

			{/* The glowing dot */}
			<motion.div
				className='absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-background border border-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]'
				style={{ top: dotY }}
			/>
		</div>
	);
}
