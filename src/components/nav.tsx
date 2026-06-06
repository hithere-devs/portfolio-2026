'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { socialLinks } from '@/data/social-links';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { CONTACT_INFO } from '@/lib/constants';
import {
	AnimatePresence,
	motion,
	Variants,
	useScroll,
	useMotionValueEvent,
} from 'framer-motion';
import { Calendar, Menu, X } from 'lucide-react';

const menuItems = [
	{ title: 'About', href: '/#about', id: 'about' },
	{ title: 'Projects', href: '/#projects', id: 'projects' },
	{ title: 'Experience', href: '/#experience', id: 'experience' },
	{ title: 'Skills', href: '/#skills', id: 'skills' },
	{ title: 'Blog', href: '/blog', id: 'blog' },
];

const Nav = () => {
	const [scrolled, setScrolled] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [activeId, setActiveId] = useState('about');

	const { scrollY } = useScroll();
	useMotionValueEvent(scrollY, 'change', (latest) => {
		setScrolled(latest > 20);
	});

	// Track which section is in view for the active desktop link.
	useEffect(() => {
		const ids = menuItems.map((item) => item.id);
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]) {
					setActiveId(visible[0].target.id);
				}
			},
			{ rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
		);

		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, []);

	// Lock body scroll when the mobile menu is open
	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'unset';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	const sidebarVariants: Variants = {
		open: {
			clipPath: `circle(150% at calc(100% - 40px) 40px)`,
			transition: { type: 'spring', stiffness: 20, restDelta: 2 },
		},
		closed: {
			clipPath: 'circle(0px at calc(100% - 40px) 40px)',
			transition: { delay: 0.2, type: 'spring', stiffness: 400, damping: 40 },
		},
	};

	const itemVariants: Variants = {
		open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
		closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
	};

	const listVariants: Variants = {
		open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
		closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
	};

	return (
		<>
			<nav
				className={cn(
					'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent',
					scrolled && !isOpen
						? 'bg-background/60 backdrop-blur-md border-border/40 py-3'
						: 'bg-transparent py-5'
				)}
			>
				<div className='container mx-auto px-6 flex items-center justify-between gap-6'>
					<Link href='/' className='group relative z-50 shrink-0'>
						<p className='font-display font-extrabold text-2xl tracking-tighter group-hover:text-brand transition-colors'>
							hit here <span className='text-brand'>devs</span>
						</p>
					</Link>

					{/* Desktop inline navigation */}
					<div className='hidden lg:flex items-center gap-1'>
						{menuItems.map((item) => (
							<Link
								key={item.title}
								href={item.href}
								className={cn(
									'relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300',
									activeId === item.id
										? 'text-foreground'
										: 'text-muted-foreground hover:text-foreground'
								)}
							>
								{activeId === item.id && (
									<motion.span
										layoutId='active-nav-pill'
										className='absolute inset-0 rounded-full bg-secondary/30 border border-white/5'
										transition={{ type: 'spring', stiffness: 350, damping: 30 }}
									/>
								)}
								<span className='relative z-10'>{item.title}</span>
							</Link>
						))}
					</div>

					{/* Desktop CTA + Mobile bubble trigger */}
					<div className='flex items-center gap-3 shrink-0'>
						<Button
							asChild
							className='hidden lg:inline-flex h-10 rounded-full px-5 bg-brand text-brand-foreground hover:bg-brand/90 font-semibold'
						>
							<Link href={CONTACT_INFO.calendly} target='_blank'>
								<Calendar className='mr-2 h-4 w-4' />
								Book a call
							</Link>
						</Button>

						{/* Bubble Trigger (mobile / tablet only) */}
						<motion.button
							data-magnetic
							initial={false}
							animate={isOpen ? 'open' : 'closed'}
							onClick={() => setIsOpen(!isOpen)}
							aria-label={isOpen ? 'Close menu' : 'Open menu'}
							className={cn(
								'lg:hidden relative z-50 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform focus:outline-none',
								isOpen ? 'bg-destructive text-destructive-foreground' : ''
							)}
							whileTap={{ scale: 0.9 }}
						>
							<AnimatePresence mode='wait'>
								{isOpen ? (
									<motion.div
										key='close'
										initial={{ rotate: -90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: 90, opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<X size={24} />
									</motion.div>
								) : (
									<motion.div
										key='menu'
										initial={{ rotate: 90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: -90, opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<Menu size={24} />
									</motion.div>
								)}
							</AnimatePresence>
						</motion.button>
					</div>
				</div>
			</nav>

			{/* Full Screen Staggered Menu Overlay (mobile / tablet) */}
			<motion.div
				initial='closed'
				animate={isOpen ? 'open' : 'closed'}
				variants={sidebarVariants}
				className={cn(
					'lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center',
					isOpen ? 'pointer-events-auto' : 'pointer-events-none'
				)}
			>
				<motion.ul
					variants={listVariants}
					className='flex flex-col gap-6 items-center justify-center w-full max-w-md px-6'
				>
					{menuItems.map((item) => (
						<motion.li
							key={item.title}
							variants={itemVariants}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							className='w-full'
						>
							<Link
								href={item.href}
								onClick={() => setIsOpen(false)}
								className='font-display block w-full text-center text-4xl md:text-6xl font-extrabold tracking-tighter hover:text-brand transition-all duration-300'
							>
								{item.title}
							</Link>
						</motion.li>
					))}

					<motion.li variants={itemVariants} className='w-full mt-2'>
						<Link
							href={CONTACT_INFO.calendly}
							target='_blank'
							onClick={() => setIsOpen(false)}
							className='font-display block w-full text-center text-4xl md:text-6xl font-extrabold tracking-tighter text-brand transition-all duration-300'
						>
							Book a call
						</Link>
					</motion.li>

					{/* Social Links Staggered */}
					<motion.li variants={itemVariants} className='flex gap-4 mt-8'>
						{socialLinks.map((social) => (
							<Button
								key={social.name}
								variant='outline'
								size='icon'
								asChild
								className='h-12 w-12 rounded-full border-2 hover:border-brand hover:text-brand transition-colors'
							>
								<Link
									href={social.url}
									target='_blank'
									rel='noopener noreferrer'
									aria-label={social.name}
								>
									<social.icon size={20} />
								</Link>
							</Button>
						))}
					</motion.li>
				</motion.ul>
			</motion.div>
		</>
	);
};

export default Nav;
