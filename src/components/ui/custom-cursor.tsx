'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [cursorState, setCursorState] = useState<
		'default' | 'button' | 'image'
	>('default');
	const [buttonRect, setButtonRect] = useState<{
		x: number;
		y: number;
		width: number;
		height: number;
		radius: string;
	} | null>(null);

	useEffect(() => {
		const updateMousePosition = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const magneticElement = target.closest('[data-magnetic]');
			const image = target.closest('[data-image-hover]');

			if (image) {
				setCursorState('image');
				setButtonRect(null);
			} else if (magneticElement) {
				const rect = (magneticElement as HTMLElement).getBoundingClientRect();
				const style = window.getComputedStyle(magneticElement as Element);
				setCursorState('button');
				setButtonRect({
					x: rect.left,
					y: rect.top,
					width: rect.width,
					height: rect.height,
					radius: style.borderRadius,
				});
			} else {
				setCursorState('default');
				setButtonRect(null);
			}
		};

		const handleScroll = () => {
			setCursorState('default');
			setButtonRect(null);
		};

		window.addEventListener('mousemove', updateMousePosition);
		window.addEventListener('mouseover', handleMouseOver);
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('mousemove', updateMousePosition);
			window.removeEventListener('mouseover', handleMouseOver);
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const buttonSize = buttonRect
		? Math.max(buttonRect.width, buttonRect.height) + 24
		: 64;

	const variants = {
		default: {
			x: mousePosition.x - 16,
			y: mousePosition.y - 16,
			width: 32,
			height: 32,
			borderRadius: '50%',
			scale: 1,
		},
		image: {
			x: mousePosition.x - 16,
			y: mousePosition.y - 16,
			width: 32,
			height: 32,
			borderRadius: '50%',
			scale: 3,
		},
		button: {
			x: (buttonRect?.x || 0) + (buttonRect?.width || 0) / 2 - buttonSize / 2,
			y: (buttonRect?.y || 0) + (buttonRect?.height || 0) / 2 - buttonSize / 2,
			width: buttonSize,
			height: buttonSize,
			borderRadius: '50%',
			scale: 1,
		},
	};

	return (
		<>
			<style jsx global>{`
				body {
					cursor: none;
				}
				a,
				button,
				input,
				textarea,
				select {
					cursor: none;
				}
			`}</style>
			<motion.div
				className='fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference border border-white'
				animate={cursorState}
				variants={variants}
				transition={{
					type: 'spring',
					stiffness: 400,
					damping: 28,
					mass: 0.5,
				}}
			>
				{/* Inner Dot - Hide when hovering button for cleaner look */}
				<motion.div
					className='absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2'
					animate={{ opacity: cursorState === 'button' ? 0 : 1 }}
				/>
			</motion.div>
		</>
	);
}
