'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { socialLinks } from '@/data/social-links';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const Nav = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav
			className={cn(
				'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent',
				scrolled
					? 'bg-background/60 backdrop-blur-md border-border/40 py-3'
					: 'bg-transparent py-5'
			)}
		>
			<div className='container mx-auto px-6 max-w-5xl flex items-center justify-between'>
				<Link href='/' className='group'>
					<p className='font-bold text-xl tracking-tight group-hover:text-primary transition-colors'>
						hithere<span className='text-primary'>devs</span>
					</p>
				</Link>

				<div className='hidden md:flex items-center gap-8'>
					<Link
						href='#about'
						className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
					>
						About
					</Link>
					<Link
						href='#projects'
						className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
					>
						Projects
					</Link>
					<Link
						href='#skills'
						className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
					>
						Skills
					</Link>
				</div>

				<div className='flex items-center gap-3'>
					{socialLinks.map((social) => (
						<Button
							key={social.name}
							variant='ghost'
							size='icon'
							asChild
							className='h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary'
						>
							<Link
								href={social.url}
								target='_blank'
								rel='noopener noreferrer'
								aria-label={social.name}
							>
								<social.icon size={18} />
							</Link>
						</Button>
					))}
				</div>
			</div>
		</nav>
	);
};

export default Nav;
