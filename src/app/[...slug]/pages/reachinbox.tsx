import React from 'react';
import {
	CaseStudyHero,
	Section,
	SectionHeading,
	Lead,
	Prose,
	Reveal,
	MetricStrip,
	TagRow,
	Pullquote,
	StepList,
	OutboundButton,
} from '@/components/case-study/case-study';
import { LogStream } from '@/components/interactive/log-stream';
import { LatencyMeter } from '@/components/interactive/latency-meter';
import { QueuePipeline } from '@/components/interactive/queue-pipeline';

const Reachinbox = () => {
	return (
		<>
			<CaseStudyHero
				kicker='Reachinbox · Bangalore'
				title='Backend at email scale'
				lede='Associate Backend Developer on a cold-outreach platform moving millions of emails a day. I rebuilt the logging, cut query latency hard, and shipped the queue-driven automation behind Zapmail.'
				meta={[
					{ label: 'Role', value: 'Associate Backend Developer' },
					{ label: 'Period', value: 'May — Sept 2024' },
					{ label: 'Domain', value: 'Email infra & automation' },
					{ label: 'Stack', value: 'Node · TS · SQL · Kafka' },
				]}
				media={{ type: 'video', src: './rib.mp4' }}
			/>

			<Section>
				<Lead>
					High-scale email analytics, robust logging, and an automation
					product that pushed past what people thought was possible.
				</Lead>
				<div className='mt-8'>
					<Prose>
						<p>
							I joined Reachinbox to work on email analytics systems
							handling millions of messages a day. The early work was
							classic backend craft: stand up real observability, hunt
							down the queries dragging the product down, and ship
							features that the frontend team could actually rely on.
							Later I moved onto <strong>Zapmail</strong>, a new
							automation product, where queues and headless browsers did
							the heavy lifting.
						</p>
					</Prose>
				</div>
			</Section>

			<Section>
				<MetricStrip
					items={[
						{ value: 90, suffix: '%', label: 'lower API response times' },
						{ display: 'Millions', label: 'emails processed per day' },
						{ display: '<10s', label: 'dashboard load, down from timing out' },
						{ value: 2, label: 'products shipped on' },
					]}
				/>
			</Section>

			<Section>
				<SectionHeading>Observability with the EFK stack</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							My first side-quest was real logging across every
							microservice. I&apos;d done this before at OpenInApp, but
							here the brief was a new stack: <code>Elastic</code>,{' '}
							<code>FluentD</code>, and <code>Kibana</code>. I ran a
							dockerised POC, proved it out, then rolled it into the
							codebase so failures stopped being invisible and on-call
							finally had something to read.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<LogStream />
				</Reveal>
			</Section>

			<Section>
				<SectionHeading>Making the slow queries fast</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							The product had the same problem I&apos;d solved at my
							previous company: hot dashboards that crawled. I went after
							it with indexing, schema changes shaped around the real
							access patterns, aggregation pipelines, and splitting the
							time-series data into <code>TimescaleDB</code>.
						</p>
						<p>
							A high-frequency user dashboard that used to take forever,
							effectively timing out, dropped under ten seconds; lighter
							loads became near-instant. Across services that landed as a
							70 to 90% cut in response times. Flip the toggle to see the
							difference.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<LatencyMeter />
				</Reveal>
			</Section>

			<Section className='py-20 md:py-28'>
				<Pullquote>
					The CTO was upfront that there was no work-life balance here. I was
					early in my career and took the trade for how much I&apos;d learn.
				</Pullquote>
			</Section>

			<Section>
				<SectionHeading>Zapmail: queues, workers, automation</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							Zapmail was the fun one: TypeScript, Node, BullMQ, Redis,
							PostgreSQL, Docker, and Kafka. The product did things that
							weren&apos;t cleanly possible through public APIs, so we drove{' '}
							<code>Playwright</code> headless browsers behind a queue and
							made it the MVP its competitors didn&apos;t have.
						</p>
						<p>
							I built features as combinations of queues, workers, and
							third-party integrations, including a full
							progress-tracking system for exporting Google Workspace
							accounts into cold-outreach tools, and re-architected the app
							from user-level to workspace-level. That work taught me where
							queueing architectures really earn their keep.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<QueuePipeline />
				</Reveal>
			</Section>

			<Section>
				<SectionHeading number='01—03'>How I got in</SectionHeading>
				<div className='mb-10 mt-6'>
					<Prose>
						<p>
							Three rounds: a take-home assignment, a technical interview
							after an HR call, and a final conversation with the CTO.
						</p>
					</Prose>
				</div>
				<StepList
					steps={[
						{
							title: 'The assignment',
							body: 'Build an email warmup tool on the Google and Microsoft Outlook APIs. Azure auth was barely documented at the time, so I tested approaches until one worked, shipped it in a week, and got the callback.',
						},
						{
							title: 'HR call and technical round',
							body: 'We dug into the assignment, my approach, the tradeoffs, and my past work. The live-coding question I could reason through but not fully land, I am candid that DSA is not my strong suit, but a follow-up implementation went smoothly and carried me to the final round.',
						},
						{
							title: 'The CTO and the offer',
							body: 'A real conversation about their products, the problems they were chasing, and what I wanted out of joining. He laid out problems he wanted me on, and I accepted, joining in May 2024.',
						},
					]}
				/>
			</Section>

			<Section>
				<SectionHeading>What I took away</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							Four months of building and maintaining APIs, optimizing
							databases, and keeping backend systems fast under real load,
							across two products and two very different stacks. Code
							reviews, sprint planning, and daily standups taught me as
							much about shipping with a team as the tech did.
						</p>
					</Prose>
				</div>
				<div className='mt-10'>
					<TagRow
						tags={[
							'Node.js',
							'TypeScript',
							'Express',
							'MySQL',
							'PostgreSQL',
							'TimescaleDB',
							'BullMQ',
							'Redis',
							'Kafka',
							'Docker',
							'Playwright',
							'EFK',
						]}
					/>
				</div>
				<Reveal className='mt-10'>
					<OutboundButton href='https://reachinbox.ai'>
						Visit Reachinbox
					</OutboundButton>
				</Reveal>
			</Section>
		</>
	);
};

export default Reachinbox;
