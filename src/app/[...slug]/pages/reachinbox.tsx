import React from 'react';
import { PageProps } from '@/types';
import BlogHeader from '@/components/blog-header';
import { BlogSection } from '@/components/ui/blog-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const Reachinbox = ({ icon }: PageProps) => {
	const detailRows = [
		{
			label: 'Company',
			value: 'Reachinbox',
			icon: '📧',
		},
		{
			label: 'Location',
			value: 'Bangalore, India',
			icon: '📍',
		},
		{
			label: 'Duration',
			value: '4 months, May - Sept 2024',
			icon: '⏳',
		},
	];

	return (
		<>
			<BlogHeader
				// banner={banner} // Use video instead of static banner
				icon={icon}
				detailRows={detailRows}
				title='Associate Backend Developer'
			/>
			{/*  Summary of the Intern */}
			<BlogSection title='Summary'>
				<div className='space-y-6 text-lg leading-relaxed text-muted-foreground'>
					<p className='text-justify'>
						🚀 As an Associate Backend Developer at Reachinbox, I worked on
						optimizing high-scale email analytics systems handling millions of
						mails per day. Implemented robust logging infrastructure using EFK
						stack (Elastic, FluentD, Kibana) and NewRelic for monitoring.
						Through strategic DB optimizations and query improvements, I
						achieved 70-90% reduction in API response times across services.
						Tech stack included Node.js, Express, MySQL for the main product,
						with additional experience in TimescaleDB for time-series data
						optimization.
					</p>

					<p className='text-justify'>
						⚡ Later, I contributed to Zapmail - a cutting-edge automation
						product built with TypeScript, Node.js, BullMQ, Redis, PostgreSQL,
						Docker, and Kafka. Developed innovative features using Playwright
						for headless browser automations and designed core functionalities
						like workspace management. Implemented sophisticated queueing
						architectures for handling complex workflows between microservices,
						particularly for Google Workspace exports to third-party tools. 🛠️
						The role involved extensive work with modern backend technologies
						and cloud infrastructure.
					</p>

					<div className='flex justify-center pt-4'>
						<Button asChild className='gap-2' size='lg'>
							<Link
								href='https://reachinbox.ai'
								target='_blank'
								rel='noopener noreferrer'
							>
								Visit Reachinbox <ExternalLink size={18} />
							</Link>
						</Button>
					</div>
				</div>
			</BlogSection>

			<BlogSection title='How did I get the Job? 🎯'>
				<div className='space-y-6 text-lg leading-relaxed text-muted-foreground'>
					<p className='text-justify'>
						There were multiple rounds of interviews, starting with a
						assignment, a technical interview after a call with the HR, and a
						final round with the CEO/CTO. 🔄
					</p>

					<div className='space-y-4'>
						<h3 className='text-2xl font-bold text-foreground flex items-center gap-2'>
							<span className='text-primary'>📝</span> Assignment Round
						</h3>
						<p className='text-justify pl-2 border-l-2 border-primary/20'>
							Task was to build an Email Warmup tool using the google apis and
							microsoft outlook apis. Difficult to deal with the azure auth
							cause there was less to no documentation on it at that moment. So
							had to somehow try and test different approaches to make it work,
							managed to complete it in a week and submit that. They liked it
							and I got a call back for the next round. 💪
						</p>
					</div>

					<div className='space-y-4'>
						<h3 className='text-2xl font-bold text-foreground flex items-center gap-2'>
							<span className='text-primary'>👨‍💻</span> HR Call & Technical Round
						</h3>
						<p className='text-justify pl-2 border-l-2 border-primary/20'>
							HR called me and asked me about my previous work experience, why
							do I need to join basic stuff and later scheduled a technical
							round with a senior. In the technical round I was asked about the
							assignment, how did I approach it, what were the challenges I
							faced, how did I solve them, and some basic questions on the
							techstack I used in the assignment. I was also asked about my
							previous work experiences, followed by a live coding ques basic
							leetcode question, which I was able to tell the approach but not
							solve it. I struggle with DSA as I already told them, and he gave
							me another function implementation which I did! So after that I
							wasn&apos;t sure If I&apos;ll get a call or not but luckily I got
							a call for the final round.
						</p>
					</div>

					<div className='space-y-4'>
						<h3 className='text-2xl font-bold text-foreground flex items-center gap-2'>
							<span className='text-primary'>🤝</span> Round with the CTO &
							Offer
						</h3>
						<p className='text-justify pl-2 border-l-2 border-primary/20'>
							We had a good discussion about the products they have been working
							on, problems they are facing and from me he wanted to know what
							are my motivations to join reachinbox, my future goals etc. He was
							happy with my answer and told me about some good problems he would
							like me to work on if I join them. His focus was that there was no
							work-life balance kind of thing when joining them, which I was
							hesitant about earlier but I was ready to take the challenge as it
							was early in my career and learn as much as I can. So when I got
							the offer via HR I accepted and joined them in May 2024. Offer was
							for an Internship but actually expecting me to work like full time
							job, after 3 months transition into full time role. I have
							discussed later why did I not join full time there.
						</p>
					</div>
				</div>
			</BlogSection>

			<BlogSection title='Techstack & Challenges faced during work! 🛠️'>
				<p className='text-justify'>
					So based on different things I worked on I can explain what techstack
					did I use! Initially when I joined the company I was assigned a
					Javascript, Node, Express based codebase with MySQL as the db for the
					first project which was the backend microservice for Reachinbox.ai,
				</p>

				<h3 className='text-xl font-semibold text-foreground mt-8 mb-4'>
					Logging Setup 📊
				</h3>
				<p className='text-justify'>
					While I was going through the codebase and understanding the
					architecture I was assigned with a side task which was to do R&D and
					build a robust logging system for all thier microservices, I got to
					learn about the different logging libraries and how to implement them
					in a microservice architecture. My manager gave me this as I already
					worked on similar task in my prevoius job @ Openinapp, but this time
					he gave me a different techstack for it - EFK, (Elastic, FluentD,
					Kibana). I did a POC using dockerised setup of EFK and then
					implemented it in the codebase.
				</p>

				<h3 className='text-xl font-semibold text-foreground mt-8 mb-4'>
					Backend Microservice & DB Optimizations ⚡
				</h3>
				<p className='text-justify'>
					After the first week I went on to build some features/apis and fix
					bugs for the backend codebase I was given to work on! I collaborated
					with the frontned team for different page APIs bugs, new features etc.
					I had a discussion in the interview about how I helped to reduce the
					db queries and optimized the db for better performance at my prev
					company, and they were facing a similar problem with thier data as
					well, so next major thing I worked on apart from building new APIs and
					solving bugs was to optimise the db queries, indexing, improvement in
					the schema based on the usecase in the queries, like aggregations,
					seperating the time series data to a new database named timescale if I
					remember correctly, reducing response times by huge margin, like as an
					example, for a high freq user data loads on the dashboard took
					infinite time to load, I reduced it to less than 10 seconds, which was
					a huge improvement, similarly for marginally low freq user data loads
					became lightning fast.
				</p>
				<p className='text-justify'>
					After this I was assigned to work on a new project which was in works
					named Zapmail, this was based on Typescript, Node, Express, BullMQ,
					Redis, PostgreSQL, Docker, Kafka etc. relatively the new techstack
					which was a relief for some reason 🤫
				</p>

				<h3 className='text-xl font-semibold text-foreground mt-8 mb-4'>
					Headfull Automations with Playwright 🤖
				</h3>
				<p className='text-justify'>
					This new product is trying to do things, which were not
					straighforwardly possible to make people&apos;s life easier. which we
					could achieve by automating the headfull browser actions, not exactly
					this but something along these lines, which became the MVP among
					it&apos;s competitors. So I built many features with combination of
					queues, workers with third party APIs and automations and this was one
					of the biggest learning experience not because the tech was cool
					(which was actually😉)! but because of this app was pushing beyond
					software developers thinking that we can build something like which I
					was building.
				</p>

				<h3 className='text-xl font-semibold text-foreground mt-8 mb-4'>
					Major App Features Design
				</h3>
				<p className='text-justify'>
					One more thing which was challenging was to design several features
					like Workspaces, in which I had the chance to revamp the entire
					functioning of the app which was based on user level, I had to shift
					it to workspace level, which was a huge task, but I did it with the
					help of the feedback and discussions with the new manager I got in
					this new product! Another such feature was implementing an entire
					process/progress tracking of the process of google workspace account
					exports to third party cold email outreach tools (one of the main
					feature of the app). These features helped me to understand the
					correct usecase and power of the queueing architecture when working
					with multiple microservices. This was one of the coolest things I had
					ever worked on!
				</p>
			</BlogSection>

			<BlogSection title='What did I learn overall! 🎓'>
				<p className='text-justify'>
					During my internship at Reachinbox, I had the opportunity to work on
					several exciting projects that significantly enhanced my backend
					development skills. 🚀 I was responsible for developing and
					maintaining APIs, optimizing database queries, and ensuring the
					overall performance and scalability of the backend systems. ⚡ This
					experience allowed me to gain hands-on experience with Node.js,
					Express.js, and SQL, and I was able to contribute to the successful
					deployment of several key features. 💻
				</p>
				<p className='text-justify'>
					One of the highlights of my internship was collaborating with a
					talented team of developers and learning from their expertise. 👥 I
					participated in code reviews, sprint planning, and daily stand-ups,
					which helped me understand the importance of effective communication
					and teamwork in a professional setting. Overall, my internship at
					Reachinbox was an invaluable experience that provided me with the
					skills and knowledge needed to excel in my future career as a backend
					developer. 🌟
				</p>
			</BlogSection>
		</>
	);
};

export default Reachinbox;
