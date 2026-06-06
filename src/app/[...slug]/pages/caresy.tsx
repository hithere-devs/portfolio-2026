import React from 'react';
import {
	GitCommitHorizontal,
	PlayCircle,
	Container,
	Server,
	Bell,
} from 'lucide-react';
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
	OutboundButton,
} from '@/components/case-study/case-study';
import { LatencyMeter } from '@/components/interactive/latency-meter';
import { QueuePipeline, type Stage } from '@/components/interactive/queue-pipeline';

const PIPELINE_STAGES: Stage[] = [
	{
		id: 'push',
		label: 'Push',
		caption: 'A commit to the repo kicks the whole pipeline off automatically.',
		Icon: GitCommitHorizontal,
	},
	{
		id: 'actions',
		label: 'Actions',
		caption: 'GitHub Actions installs, runs the checks, and builds the app.',
		Icon: PlayCircle,
	},
	{
		id: 'image',
		label: 'Image',
		caption: 'A versioned artifact is produced, ready to ship to the server.',
		Icon: Container,
	},
	{
		id: 'ec2',
		label: 'EC2',
		caption: 'The release rolls out to AWS EC2 with the new build in place.',
		Icon: Server,
	},
	{
		id: 'sns',
		label: 'SNS',
		caption: 'AWS SNS fans notifications out to users and to the team.',
		Icon: Bell,
	},
];

const Caresy = () => {
	return (
		<>
			<CaseStudyHero
				kicker='Caresy · Internship'
				title='Backend, end to end'
				lede='Backend Software Developer Intern. I owned the user model, auth, and a rewards wallet, tuned the APIs faster, and ran the AWS deploy and notification plumbing.'
				meta={[
					{ label: 'Role', value: 'Software Developer Intern (Backend)' },
					{ label: 'Period', value: '2022' },
					{ label: 'Domain', value: 'Consumer backend & AWS' },
					{ label: 'Stack', value: 'Node · AWS · GitHub Actions' },
				]}
			/>

			<Section>
				<Lead>
					My first backend internship, where I got to own real pieces:
					identity, a rewards wallet, and the infrastructure that shipped
					and notified.
				</Lead>
				<div className='mt-8'>
					<Prose>
						<p>
							At Caresy I implemented the <strong>user model</strong> and{' '}
							<strong>authentication</strong>, then built a{' '}
							<strong>wallet system</strong> with rewards on top of it.
							Beyond features, I looked after the AWS side: EC2 for the
							servers, CI/CD through GitHub Actions, and AWS SNS for
							notifications.
						</p>
					</Prose>
				</div>
			</Section>

			<Section>
				<MetricStrip
					items={[
						{ value: 20, suffix: '%', label: 'lower API response times' },
						{ display: 'Auth', label: 'user model & sessions' },
						{ display: 'Wallet', label: 'rewards system shipped' },
						{ display: 'AWS', label: 'EC2 · CI/CD · SNS' },
					]}
				/>
			</Section>

			<Section>
				<SectionHeading>Tightening the APIs</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							The core endpoints were doing more work than they needed
							to. I tuned the queries, added the indexes the access
							patterns were asking for, and cached the hot reads, which
							landed as roughly a <code>20%</code> reduction in response
							times across auth, wallet, and profile calls. Flip the
							toggle to compare.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<LatencyMeter
						label='API Latency'
						unitLabel='p95 response time (ms)'
						endpoints={[
							{ name: 'Auth / login', before: 180, after: 150 },
							{ name: 'Wallet balance', before: 220, after: 170 },
							{ name: 'Rewards credit', before: 260, after: 205 },
							{ name: 'Profile fetch', before: 140, after: 115 },
						]}
						beforeCaption={
							<>
								<span className='font-medium text-slate-200'>
									Before.
								</span>{' '}
								Unindexed lookups and repeated reads added avoidable
								milliseconds to every core request.
							</>
						}
						afterCaption={
							<>
								<span className='font-medium text-slate-200'>
									After.
								</span>{' '}
								Targeted indexes, tuned queries, and cached hot reads
								shaved the latency off the paths users hit most.
							</>
						}
					/>
				</Reveal>
			</Section>

			<Section className='py-20 md:py-28'>
				<Pullquote>
					Owning the deploy and the notifications, not just the feature,
					is where backend stopped being homework and started being a job.
				</Pullquote>
			</Section>

			<Section>
				<SectionHeading>Shipping it with CI/CD</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							I set up the path from commit to production: GitHub Actions
							built and tested the app, the release rolled out to{' '}
							<strong>AWS EC2</strong>, and <strong>AWS SNS</strong>{' '}
							handled notifications out to users and the team. It made
							shipping repeatable instead of manual.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<QueuePipeline
						label='CI/CD + Notifications'
						stat='actions · aws'
						stages={PIPELINE_STAGES}
						leftLabel='Commits'
						rightLabel='Subscribers'
					/>
				</Reveal>
			</Section>

			<Section>
				<SectionHeading>What I took away</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							Caresy was my first end-to-end backend experience: design a
							data model, secure it, build features people touch, and own
							the way it ships and tells people what happened. The habits
							I picked up here, especially caring about latency and
							deploys, carried straight into everything after.
						</p>
					</Prose>
				</div>
				<div className='mt-10'>
					<TagRow
						tags={[
							'Node.js',
							'Authentication',
							'Wallet / Rewards',
							'AWS EC2',
							'AWS SNS',
							'AWS Lambda',
							'GitHub Actions',
						]}
					/>
				</div>
				<Reveal className='mt-10'>
					<OutboundButton href='https://caresy.in'>
						Visit Caresy
					</OutboundButton>
				</Reveal>
			</Section>
		</>
	);
};

export default Caresy;
