import React from 'react';
import {
	Boxes,
	LineChart,
	Activity,
	GitCommitHorizontal,
	Hammer,
	Container,
	GitMerge,
	Server,
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
import { DiagramShell } from '@/components/interactive/diagram-shell';
import { LottieMark } from '@/components/interactive/lottie-mark';
import { LatencyMeter } from '@/components/interactive/latency-meter';
import { QueuePipeline, type Stage } from '@/components/interactive/queue-pipeline';
import { LogStream } from '@/components/interactive/log-stream';

const DEPLOY_STAGES: Stage[] = [
	{
		id: 'commit',
		label: 'Commit',
		caption: 'A merge to main is the only trigger. Git is the single source of truth.',
		Icon: GitCommitHorizontal,
	},
	{
		id: 'build',
		label: 'Build',
		caption: 'CI runs tests, then builds and tags an immutable container image.',
		Icon: Hammer,
	},
	{
		id: 'registry',
		label: 'Registry',
		caption: 'The image is pushed and the deployment manifest is bumped to it.',
		Icon: Container,
	},
	{
		id: 'argocd',
		label: 'ArgoCD',
		caption: 'ArgoCD notices the drift and syncs the cluster to match the repo.',
		Icon: GitMerge,
	},
	{
		id: 'cluster',
		label: 'Cluster',
		caption: 'Pods roll out with health checks; a bad release rolls itself back.',
		Icon: Server,
	},
];

const Openinapp = () => {
	return (
		<>
			<CaseStudyHero
				kicker='Openinapp · Bangalore'
				title='Smart links at B2B scale'
				lede='Junior Backend Developer on Smart Links and Business Links. I took heavy B2B APIs from two-minute timeouts to eight seconds, wired in payments and AI, and made deploys boring with GitOps.'
				meta={[
					{ label: 'Role', value: 'Junior Backend Developer' },
					{ label: 'Period', value: '2023 — 2024' },
					{ label: 'Domain', value: 'Links infra & integrations' },
					{ label: 'Stack', value: 'Node · K8s · ArgoCD' },
				]}
			/>

			<Section>
				<Lead>
					Smart Links and Business Links turn a single URL into routing,
					analytics, payments, and content, all of it leaning on the
					backend underneath.
				</Lead>
				<div className='mt-8'>
					<Prose>
						<p>
							Openinapp was my first real backend role, on a product used
							at serious volume. I worked across{' '}
							<strong>Smart Links</strong> and{' '}
							<strong>Business Links</strong>: the heavy-duty B2B APIs,
							the third-party integrations behind them, and the
							deployment and observability tooling that kept it all
							honest in production.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<DiagramShell label='Smart Links' stat='one url · many apps'>
						<LottieMark
							src='/lottie/openinapp-links.json'
							ariaLabel='A central app tile with link nodes orbiting on connecting spokes'
							aspect='1 / 1'
							className='mx-auto max-w-[320px]'
						/>
					</DiagramShell>
				</Reveal>
			</Section>

			<Section>
				<MetricStrip
					items={[
						{ value: 120, suffix: 's', label: 'old B2B API worst case' },
						{ value: 8, suffix: 's', label: 'after the rework' },
						{ value: 93, suffix: '%', label: 'latency removed on hot paths' },
						{ value: 4, suffix: '+', label: 'integrations owned end to end' },
					]}
				/>
			</Section>

			<Section>
				<SectionHeading>Taming the heavy B2B APIs</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							The flagship B2B endpoints did a lot per request, fanning
							out to providers and grinding through unindexed joins, so
							the worst cases crept past two minutes and clients timed
							out. I reshaped the hot paths: batched and cached the
							third-party calls, made the work asynchronous where it
							didn&apos;t need to block, and rebuilt the queries around
							the access patterns that actually mattered.
						</p>
						<p>
							The slowest report API dropped from <code>120s</code> to
							about <code>8s</code>, with lighter endpoints landing
							near-instant. Flip the toggle to see the before and after.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<LatencyMeter
						label='Heavy B2B APIs'
						unitLabel='p95 response time'
						endpoints={[
							{ name: 'B2B report API', before: 120, after: 8 },
							{ name: 'Catalog (PAAPI)', before: 26, after: 1.8 },
							{ name: 'Smart Link resolve', before: 14, after: 0.6 },
							{ name: 'Payments callback', before: 9, after: 0.7 },
						]}
						beforeCaption={
							<>
								<span className='font-medium text-slate-200'>
									Before.
								</span>{' '}
								Synchronous provider calls and unindexed joins pushed
								the heaviest endpoints past two minutes.
							</>
						}
						afterCaption={
							<>
								<span className='font-medium text-slate-200'>
									After.
								</span>{' '}
								Async fan-out, caching, batched provider calls, and
								access-pattern indexes brought them under ten seconds.
							</>
						}
					/>
				</Reveal>
			</Section>

			<Section>
				<SectionHeading>Integrations, payments, and AI</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							A lot of the work was making other people&apos;s systems
							behave like ours. I integrated payment systems for the
							paid tiers, Amazon&apos;s Product Advertising API
							(<code>PAAPI</code>) for catalog data, the YouTube APIs for
							rich link content, and a set of AI product features on top.
							Each one came with its own auth, rate limits, and failure
							modes to design around.
						</p>
						<p>
							I built these as small <strong>microservices</strong> and{' '}
							<strong>cron jobs</strong> rather than bolting everything
							onto the monolith, so a flaky provider or a heavy nightly
							job stayed contained instead of taking the product down
							with it.
						</p>
					</Prose>
				</div>
			</Section>

			<Section className='py-20 md:py-28'>
				<Pullquote>
					My first backend job set the bar: make the slow things fast, keep
					the integrations contained, and make shipping the least
					interesting part of the day.
				</Pullquote>
			</Section>

			<Section>
				<SectionHeading>GitOps deploys with ArgoCD</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							Shipping used to be a manual, nervous affair. I moved the
							deployment pipeline to <strong>ArgoCD</strong> so the Git
							repo became the source of truth: merge to main, CI builds
							an image, the manifest gets bumped, and ArgoCD syncs the
							cluster to match, with health checks and automatic
							rollback if a release misbehaves.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<QueuePipeline
						label='GitOps Deploy'
						stat='argocd · k8s'
						stages={DEPLOY_STAGES}
						leftLabel='Commits'
						rightLabel='Production'
					/>
				</Reveal>
			</Section>

			<Section>
				<SectionHeading>Seeing into production</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							With this many moving parts, you only trust what you can
							see. I leaned on <code>Elastic Search</code> for searchable
							logs, <code>Grafana</code> for dashboards, and{' '}
							<code>DataDog</code> for traces and alerting, so a slow
							provider or a misbehaving cron job showed up as a graph
							instead of a support ticket.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<LogStream
						label='Observability'
						stat='datadog · live'
						sourceLabel='services'
						terminalLabel='datadog@openinapp · logs'
						flow={[
							{ label: 'Elastic', Icon: Boxes },
							{ label: 'Grafana', Icon: LineChart },
							{ label: 'DataDog', Icon: Activity },
						]}
						pool={[
							{
								level: 'INFO',
								svc: 'smartlinks',
								msg: 'resolve sl/9f3a2c -> 200 in 42ms',
							},
							{
								level: 'INFO',
								svc: 'payments',
								msg: 'webhook captured order_NkP3 · ₹4,990',
							},
							{
								level: 'WARN',
								svc: 'catalog',
								msg: 'PAAPI throttled, backing off 800ms',
							},
							{
								level: 'INFO',
								svc: 'youtube',
								msg: 'oembed cache hit for vid dQw4w9',
							},
							{
								level: 'INFO',
								svc: 'cron',
								msg: 'nightly rollup processed 1.2M rows',
							},
							{
								level: 'ERROR',
								svc: 'billing',
								msg: 'invoice retry 2/3 for sub_8XaQ',
							},
							{
								level: 'INFO',
								svc: 'ai',
								msg: 'summary generated for link batch #318',
							},
							{
								level: 'WARN',
								svc: 'gateway',
								msg: 'p95 latency 240ms over budget',
							},
						]}
					/>
				</Reveal>
			</Section>

			<Section>
				<SectionHeading>What I took away</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							Openinapp is where backend stopped being theory. I learned
							how to make heavy APIs fast under real traffic, how to keep
							third-party chaos contained behind microservices and
							queues, and how good deployment and observability tooling
							turns &ldquo;is it broken?&rdquo; into a question you can
							actually answer.
						</p>
					</Prose>
				</div>
				<div className='mt-10'>
					<TagRow
						tags={[
							'Node.js',
							'Microservices',
							'PAAPI',
							'YouTube API',
							'Payments',
							'Kubernetes',
							'ArgoCD',
							'Elastic Search',
							'Grafana',
							'DataDog',
						]}
					/>
				</div>
				<Reveal className='mt-10'>
					<OutboundButton href='https://openinapp.com'>
						Visit Openinapp
					</OutboundButton>
				</Reveal>
			</Section>
		</>
	);
};

export default Openinapp;
