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
	OutboundButton,
} from '@/components/case-study/case-study';
import { LatencyMeter } from '@/components/interactive/latency-meter';

const Jarviot = () => {
	return (
		<>
			<CaseStudyHero
				kicker='JarvIoT · Internship'
				title='My first taste of shipping UI'
				lede='Frontend Software Developer Intern. I turned design files into responsive React interfaces and refactored the render path until the app felt noticeably quicker.'
				meta={[
					{ label: 'Role', value: 'Software Developer Intern (Frontend)' },
					{ label: 'Period', value: '2022 — 2023' },
					{ label: 'Domain', value: 'IoT product UI' },
					{ label: 'Stack', value: 'React · Redux · Next' },
				]}
			/>

			<Section>
				<Lead>
					The brief was simple to say and hard to do well: take the designs
					and make them real, fast, and consistent across the product.
				</Lead>
				<div className='mt-8'>
					<Prose>
						<p>
							JarvIoT was where I learned what frontend work actually
							looks like on a team. I built responsive interfaces with{' '}
							<strong>React</strong>, <strong>Redux</strong>, and
							Bootstrap, translating design files into cohesive,
							reusable components instead of one-off screens, and worked
							across functions to get features over the line.
						</p>
					</Prose>
				</div>
			</Section>

			<Section>
				<MetricStrip
					items={[
						{ value: 30, suffix: '%', label: 'faster component & data rendering' },
						{ display: 'React', label: 'core UI library' },
						{ display: 'Redux', label: 'predictable app state' },
						{ value: 1, suffix: 'st', label: 'real frontend role' },
					]}
				/>
			</Section>

			<Section>
				<SectionHeading>Refactoring for speed</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							The UI worked, but it re-rendered more than it needed to.
							I went through the component tree strategically:
							memoizing where it counted, tightening the Redux
							selectors, and reshaping how data flowed into the views.
							The result was around <code>30%</code> faster component
							and data rendering, which on an IoT dashboard means
							readings that feel live instead of laggy.
						</p>
						<p>
							Flip the toggle to see the kind of difference that
							refactor made to render times.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<LatencyMeter
						label='Render Performance'
						unitLabel='render time (ms)'
						endpoints={[
							{ name: 'Dashboard mount', before: 820, after: 540 },
							{ name: 'Live table re-render', before: 410, after: 240 },
							{ name: 'Data hydration', before: 600, after: 410 },
							{ name: 'Route transition', before: 350, after: 250 },
						]}
						beforeCaption={
							<>
								<span className='font-medium text-slate-200'>
									Before.
								</span>{' '}
								Unmemoized components and broad state subscriptions
								re-rendered far more of the tree than they needed to.
							</>
						}
						afterCaption={
							<>
								<span className='font-medium text-slate-200'>
									After.
								</span>{' '}
								Memoization, tighter Redux selectors, and a cleaner
								data flow cut wasted renders across the dashboard.
							</>
						}
					/>
				</Reveal>
			</Section>

			<Section className='py-20 md:py-28'>
				<Pullquote>
					You learn more about frontend from making a slow page fast than
					from building ten new ones.
				</Pullquote>
			</Section>

			<Section>
				<SectionHeading>What I took away</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							JarvIoT taught me the craft side of frontend: component
							thinking, state that stays predictable as a product grows,
							and the discipline of matching a design pixel for pixel
							while keeping it responsive. It set the foundation I&apos;d
							build the rest of my engineering work on.
						</p>
					</Prose>
				</div>
				<div className='mt-10'>
					<TagRow
						tags={[
							'React',
							'Redux',
							'Next.js',
							'React Router',
							'Bootstrap',
							'Responsive UI',
							'UX',
						]}
					/>
				</div>
				<Reveal className='mt-10'>
					<OutboundButton href='https://jarviot.com'>
						Visit JarvIoT
					</OutboundButton>
				</Reveal>
			</Section>
		</>
	);
};

export default Jarviot;
