import Link from 'next/link';
import { socialLinks } from '@/data/social-links';
import { FooterProps } from '@/types';
import { Button } from '@/components/ui/button';

export default function Footer({ className = '' }: FooterProps) {
	return (
		<footer
			className={`w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}
		>
			<div className='container mx-auto px-6 py-12'>
				<div className='flex flex-col md:flex-row justify-between items-center gap-6'>
					<div className='flex flex-col items-center md:items-start gap-2'>
						<p className='text-lg font-bold tracking-tight'>
							hit here<span className='text-primary'> devs</span>
						</p>
						<p className='text-sm text-muted-foreground'>
							Building digital experiences that matter.
						</p>
					</div>

					<div className='flex items-center gap-2'>
						{socialLinks.map((social) => (
							<Button
								key={social.name}
								variant='ghost'
								size='icon'
								asChild
								className='h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors'
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

				<div className='mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground'>
					<p>
						&copy; {new Date().getFullYear()} Azhar Mahmood. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
