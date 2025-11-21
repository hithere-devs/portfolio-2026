import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CompanyCardProps } from '@/types';
import { Card } from '@/components/ui/card';

export default function CompanyCard({ company }: CompanyCardProps) {
	return (
		<Link href={`/${company.slug}`} className='block group'>
			<Card className='flex items-center p-4 transition-all duration-300 hover:bg-secondary/50 border-border/50 bg-card/50 backdrop-blur-sm'>
				<div className='relative w-12 h-12 mr-4 overflow-hidden rounded-lg bg-background/50 p-2 border border-border/50'>
					<Image
						src={company.logo}
						alt={`${company.name} Logo`}
						width={48}
						height={48}
						className='object-contain w-full h-full'
					/>
				</div>
				<div className='flex-1 min-w-0'>
					<h3 className='text-base font-semibold text-foreground truncate group-hover:text-primary transition-colors'>
						{company.name}
					</h3>
					<p className='text-sm text-muted-foreground truncate'>
						{company.role}
					</p>
				</div>
				<ArrowRight
					size={18}
					className='text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'
				/>
			</Card>
		</Link>
	);
}
