import React from 'react';
import { cn } from '@/lib/utils';

interface BlogSectionProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
}

export function BlogSection({
	title,
	children,
	className,
	...props
}: BlogSectionProps) {
	return (
		<section
			className={cn('w-full max-w-3xl mx-auto px-6 py-8', className)}
			{...props}
		>
			{title && (
				<h2 className='text-2xl font-bold mb-6 text-foreground'>{title}</h2>
			)}
			<div className='space-y-6 text-muted-foreground leading-relaxed text-lg'>
				{children}
			</div>
		</section>
	);
}
