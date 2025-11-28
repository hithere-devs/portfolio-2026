'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { socialLinks } from '@/data/social-links';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Nav = () => {
	const [scrolled, setScrolled] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Lock body scroll when menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [isOpen]);

	const menuItems = [
		{ title: 'Home', href: '/' },
		{ title: 'About', href: '#about' },
		{ title: 'Projects', href: '#projects' },
		{ title: 'Skills', href: '#skills' },
		{ title: 'Experience', href: '#experience' },
	];

	const sidebarVariants: Variants = {
		open: {
			clipPath: `circle(150% at calc(100% - 40px) 40px)`,
			transition: {
				type: 'spring',
				stiffness: 20,
				restDelta: 2,
			},
		},
		closed: {
			clipPath: 'circle(0px at calc(100% - 40px) 40px)',
			transition: {
				delay: 0.2,
				type: 'spring',
				stiffness: 400,
				damping: 40,
			},
		},
	};

	const itemVariants: Variants = {
		open: {
			y: 0,
			opacity: 1,
			transition: {
				y: { stiffness: 1000, velocity: -100 },
			},
		},
		closed: {
			y: 50,
			opacity: 0,
			transition: {
				y: { stiffness: 1000 },
			},
		},
	};

	const listVariants: Variants = {
		open: {
			transition: { staggerChildren: 0.07, delayChildren: 0.2 },
		},
		closed: {
			transition: { staggerChildren: 0.05, staggerDirection: -1 },
		},
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
				<div className='container mx-auto px-6 flex items-center justify-between'>
					<Link href='/' className='group relative z-50'>
						<p className='font-black text-2xl tracking-tighter group-hover:text-primary transition-colors'>
							hit here <span className='text-primary'>devs</span>
						</p>
					</Link>

					{/* Desktop Menu - Hidden for now to use the requested bubble/staggered menu everywhere or just mobile?
                        The user asked to "change the nav", implying the whole nav.
                        I'll keep the desktop links for utility but maybe hide them if the user wants the "bubble menu" to be the main interaction.
                        Let's keep standard links for desktop for better UX, but add the bubble menu for mobile OR make the bubble menu the primary way.
                        "Use the staggered menu... use the trigger for the menu from the bubble menu"
                        I will make the Bubble Menu the PRIMARY navigation for a unique feel.
                    */}

					{/* Bubble Trigger */}
					<motion.button
						data-magnetic
						initial={false}
						animate={isOpen ? 'open' : 'closed'}
						onClick={() => setIsOpen(!isOpen)}
						className={cn(
							'relative z-50 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform focus:outline-none',
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
			</nav>

			{/* Full Screen Staggered Menu Overlay */}
			<motion.div
				initial='closed'
				animate={isOpen ? 'open' : 'closed'}
				variants={sidebarVariants}
				className={cn(
					'fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center',
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
								className='block w-full text-center text-4xl md:text-6xl font-black tracking-tighter hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:to-purple-500 transition-all duration-300'
							>
								{item.title}
							</Link>
						</motion.li>
					))}

					{/* Social Links Staggered */}
					<motion.li variants={itemVariants} className='flex gap-4 mt-8'>
						{socialLinks.map((social) => (
							<Button
								key={social.name}
								variant='outline'
								size='icon'
								asChild
								className='h-12 w-12 rounded-full border-2 hover:border-primary hover:text-primary transition-colors'
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
