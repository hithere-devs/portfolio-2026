import { BlogHeaderProps } from '@/types';
import Image from 'next/image';

const BlogHeader = ({ icon, detailRows, title, banner }: BlogHeaderProps) => {
	return (
		<div className='relative w-full overflow-hidden'>
			{/* Background Video/Image Container */}
			<div className='relative w-full h-[40vh] md:h-[50vh]'>
				{banner ? (
					<Image
						src={banner}
						alt={title}
						fill
						className='object-cover w-full h-full'
						priority
					/>
				) : (
					<video
						src='./rib.mp4'
						preload='auto'
						autoPlay
						muted
						loop
						className='object-cover w-full h-full'
					/>
				)}
				{/* Gradient Overlay */}
				<div className='absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background' />
				<div className='absolute inset-0 bg-background/20 backdrop-blur-[2px]' />
			</div>

			{/* Content Container */}
			<div className='container mx-auto px-6 max-w-4xl relative -mt-32 z-10'>
				<div className='flex flex-col items-start animate-in fade-in slide-in-from-bottom-8 duration-700'>
					{/* Icon */}
					<div className='text-6xl md:text-8xl mb-6 drop-shadow-2xl filter grayscale-0 hover:grayscale transition-all duration-500 hover:scale-110 transform origin-bottom-left cursor-default'>
						{icon}
					</div>

					{/* Title & Details */}
					<div className='w-full space-y-8'>
						<h1 className='text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-foreground'>
							{title}
						</h1>

						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
							{detailRows.map(({ label, value, icon }, index) => (
								<div
									key={index}
									className='flex items-center p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 transition-colors'
								>
									<span className='text-2xl mr-3'>{icon}</span>
									<div className='flex flex-col'>
										<span className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
											{label}
										</span>
										<span className='text-sm font-semibold text-foreground'>
											{value}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Spacer */}
			<div className='h-16' />
		</div>
	);
};

export default BlogHeader;
