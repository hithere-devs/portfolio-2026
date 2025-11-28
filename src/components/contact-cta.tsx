'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@/lib/constants';

export default function ContactCTA() {
	return (
		<section className='py-24 relative overflow-hidden'>
			{/* Background Gradients */}
			<div className='absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background' />
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl' />

			<div className='container mx-auto px-6 relative z-10'>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					viewport={{ once: true }}
					className='max-w-4xl mx-auto text-center space-y-8'
				>
					<h2 className='text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]'>
						Ready to bring <br />
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50'>
							your ideas to life?
						</span>
					</h2>

					<p className='text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
						I love my full-time job. I really do. So I&apos;m only open for
						consultations and freelance. But also... offers don&apos;t hurt? I
						mean, I&apos;m not looking, but I&apos;m also not <i>not</i> looking
						at a really good number. Confused? Me too. Let&apos;s chat.
					</p>

					<div className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-4'>
						<Button
							size='lg'
							className='h-14 px-8 text-lg rounded-full group'
							asChild
						>
							<Link href={CONTACT_INFO.calendly} target='_blank'>
								<Calendar className='mr-2 h-5 w-5' />
								Book a Call
								<ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
							</Link>
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
