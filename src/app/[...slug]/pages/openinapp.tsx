import React from 'react';
import { PageProps } from '@/types';
import BlogHeader from '@/components/blog-header';
import { BlogSection } from '@/components/ui/blog-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const Openinapp = ({ banner, icon }: PageProps) => {
	const detailRows = [
		{
			label: 'Company',
			value: 'Openinapp',
			icon: '🚀',
		},
		{
			label: 'Location',
			value: 'Bangalore, India',
			icon: '📍',
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
				title='Junior Backend Developer'
			/>
			<BlogSection title='Details'>
				<div className='flex flex-col items-center justify-center py-10 space-y-6'>
					<p className='text-xl text-muted-foreground text-center'>
						Detailed experience coming soon...
					</p>
					<Button asChild variant='outline' className='gap-2'>
						<Link
							href='https://openinapp.com'
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

export default Openinapp;
