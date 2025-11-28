import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import CustomCursor from '@/components/ui/custom-cursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
	title: 'Azhar Mahmood | Full Stack Developer',
	description:
		'Full Stack Developer & DevOps Engineer. Building scalable applications with React, Node.js, and Cloud technologies.',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://hitheredevs.com/',
		title: 'Azhar Mahmood | Full Stack Developer',
		description:
			'Full Stack Developer & DevOps Engineer. Building scalable applications with React, Node.js, and Cloud technologies.',
		images: [
			{
				url: 'https://res.cloudinary.com/chintukepapa/image/upload/v1732861019/af0q93kahobk0luyir5c.png',
				width: 1200,
				height: 630,
				alt: 'Azhar Mahmood',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Azhar Mahmood | Full Stack Developer',
		description:
			'Full Stack Developer & DevOps Engineer. Building scalable applications with React, Node.js, and Cloud technologies.',
		images: [
			'https://res.cloudinary.com/chintukepapa/image/upload/v1732861019/af0q93kahobk0luyir5c.png',
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='dark'>
			<body
				className={cn('min-h-screen font-sans antialiased', inter.variable)}
			>
				<CustomCursor />
				{children}
			</body>
		</html>
	);
}
