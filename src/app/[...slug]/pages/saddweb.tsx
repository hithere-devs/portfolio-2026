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

const Saddweb = () => {
	return (
		<>
			<CaseStudyHero
				kicker='Saddweb · Founder'
				title='Where it all started'
				lede='Before the job titles, there was a freelance studio. I founded Saddweb to get businesses online and actually moving the needle on their sales, and learned to run the whole thing myself.'
				meta={[
					{ label: 'Role', value: 'Founder, Freelancing' },
					{ label: 'Period', value: '2020 — 2022' },
					{ label: 'Domain', value: 'Web for small business' },
					{ label: 'Focus', value: 'Build · Ship · Grow' },
				]}
			/>

			<Section>
				<Lead>
					Saddweb was a studio I started to help businesses take their
					products and services online, and grow their performance and
					sales once they were there.
				</Lead>
				<div className='mt-8'>
					<Prose>
						<p>
							This is the chapter where I learned that shipping code is
							only half the job. I handled the building, but also the
							parts they don&apos;t teach you: talking to clients,
							scoping work, hiring help when projects got big, and
							marketing the studio itself. It made me a far more
							complete engineer to work with later.
						</p>
					</Prose>
				</div>
			</Section>

			<Section>
				<MetricStrip
					items={[
						{ value: 2, suffix: ' yrs', label: 'running the studio solo-first' },
						{ display: 'End-to-end', label: 'design, build, and launch' },
						{ display: 'Clients', label: 'managed directly, start to finish' },
						{ display: 'Growth', label: 'measured in their sales, not mine' },
					]}
				/>
			</Section>

			<Section>
				<SectionHeading>How a project actually ran</SectionHeading>
				<div className='mb-10 mt-6'>
					<Prose>
						<p>
							Every engagement followed roughly the same arc, and owning
							all of it is what taught me to think past the code.
						</p>
					</Prose>
				</div>
				<StepList
					steps={[
						{
							title: 'Understand the business',
							body: 'Before anything got built, I sat with the client to understand what they sold, who bought it, and what "doing better" would actually mean for them.',
						},
						{
							title: 'Design and build',
							body: 'I turned that into a real site or product, handling the design and the development end to end, and bringing in help when a project outgrew just me.',
						},
						{
							title: 'Launch and hand over',
							body: 'Getting it live was a milestone, not the finish line. I made sure the client could actually run what I shipped them.',
						},
						{
							title: 'Grow the numbers',
							body: 'The real goal was performance and sales, so the work continued past launch: refining, marketing, and tuning until the business saw the lift.',
						},
					]}
				/>
			</Section>

			<Section className='py-20 md:py-28'>
				<Pullquote>
					Running my own studio taught me the thing every founder learns:
					the work isn&apos;t done when it ships, it&apos;s done when it
					works for someone.
				</Pullquote>
			</Section>

			<Section>
				<SectionHeading>What I took away</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							Saddweb gave me an owner&apos;s instinct early: care about
							the outcome, not just the deliverable. Client management,
							hiring, marketing, and shipping under real expectations,
							those are the muscles I&apos;ve leaned on at every company
							since, all the way to founding engineering at Samora.
						</p>
					</Prose>
				</div>
				<div className='mt-10'>
					<TagRow
						tags={[
							'Founder',
							'Client Management',
							'Hiring',
							'Marketing',
							'Web Development',
							'Freelancing',
						]}
					/>
				</div>
				<Reveal className='mt-10'>
					<OutboundButton href='https://saddweb.com'>
						Visit Saddweb
					</OutboundButton>
				</Reveal>
			</Section>
		</>
	);
};

export default Saddweb;
