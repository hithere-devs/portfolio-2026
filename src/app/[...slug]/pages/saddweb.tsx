import React from 'react';
import { PageProps } from '@/types';
import BlogHeader from '@/components/blog-header';
import { BlogSection } from '@/components/ui/blog-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const Saddweb = ({ banner, icon }: PageProps) => {
	const detailRows = [
		{
			label: 'Company',
			value: 'Saddweb',
			icon: '💻',
		},
		{
			label: 'Role',
			value: 'Freelance',
			icon: '👨‍💻',
		},
		{
			label: 'Status',
			value: 'Coming Soon',
			icon: '⏳',
		},
	];

	return (
		<>
			<BlogHeader
				banner={banner}
				icon={icon}
				detailRows={detailRows}
				title='Freelance Development'
			/>
			<BlogSection title='Details'>
				<div className='flex flex-col items-center justify-center py-10 space-y-6'>
					<p className='text-xl text-muted-foreground text-center'>
						Detailed experience coming soon...
					</p>
					<Button asChild variant='outline' className='gap-2'>
						<Link
							href='https://saddweb.com'
							target='_blank'
							rel='noopener noreferrer'
						>
							Visit Website <ExternalLink size={16} />
						</Link>
					</Button>
				</div>
			</BlogSection>
		</>
	);
};

export default Saddweb;
