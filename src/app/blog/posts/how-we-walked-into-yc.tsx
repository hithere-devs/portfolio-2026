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
import { DiagramShell } from '@/components/interactive/diagram-shell';
import { LottieMark } from '@/components/interactive/lottie-mark';
import { VoicePipeline } from '@/components/interactive/voice-pipeline';

const HowWeWalkedIntoYC = () => {
	return (
		<>
			<CaseStudyHero
				kicker='Founder’s log · Samora AI'
				title='How we walked into YC'
				lede='The story of taking Samora’s voice engine from an empty repo to a production system that handles real phone calls, in real dialects, at real scale, and why I never doubted YC would say yes.'
				meta={[
					{ label: 'Company', value: 'Samora AI (YC W26)' },
					{ label: 'My role', value: 'First engineer → Team Lead' },
					{ label: 'Topic', value: 'Building from zero to YC' },
					{ label: 'Read', value: '8 min' },
				]}
			/>

			<Section>
				<Lead>
					I told my founders, early, before we had the right to be
					confident: you’ll see, we’ll get in. Believe me or not. We did.
				</Lead>
				<div className='mt-8'>
					<Prose>
						<p>
							This isn’t a victory lap. It’s the honest version of how a
							voice AI idea became something companies pay to run their
							phone calls on, and how that turned into a YC acceptance.
							I was the first founding engineer at{' '}
							<strong>Samora</strong>, and I built the spine of it: the
							voice pipeline, the infrastructure, and the retrieval layer
							that keeps it accurate. So this is told from inside the
							repo.
						</p>
					</Prose>
				</div>
			</Section>

			<Section>
				<MetricStrip
					items={[
						{ value: 80, suffix: '%', label: 'first-contact resolution in support' },
						{ value: 12, suffix: '%', label: 'lift in collections for an auto-finance customer' },
						{ value: 100, suffix: 'K+', label: 'candidates reached in recruiting' },
						{ value: 1700, label: 'recruiter hours saved' },
					]}
				/>
			</Section>

			<Section>
				<SectionHeading>Where it actually started</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							Before Samora was a company with a YC batch, the team had
							already learned the hard version of this problem: scaling a
							voice agent to thousands of users across India as part of a
							national helpline. That’s where the romance of “AI voice
							agents” met reality.
						</p>
						<p>
							Linguistic diversity. People switching languages
							mid-sentence. Dialects the models had never really heard.
							Choppy lines, background noise, networks dropping. Local
							infrastructure constraints. It exposed, very quickly, the
							gap between a demo that works on stage and a system that
							works on a Tuesday afternoon for someone on a bad
							connection. <strong>Reliability, observability, and
							controlled escalation</strong> stopped being nice-to-haves
							and became the entire job.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<DiagramShell label='Voice Engine' stat='realtime'>
						<LottieMark
							src='/lottie/samora-voice.json'
							ariaLabel='An audio equalizer of cobalt bars breathing like a live waveform'
							aspect='16 / 8'
							className='mx-auto max-w-[460px]'
						/>
					</DiagramShell>
				</Reveal>
			</Section>

			<Section>
				<SectionHeading>The problem nobody wants to own</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							Phone calls still power core workflows: support,
							collections, verification, recruiting, outreach, feedback.
							Voice AI platforms made it easier to <em>build</em> an
							agent. But once it’s live, someone still has to manage
							runtime behavior, watch the edge cases, enforce policy,
							investigate failures, and handle escalation when a
							conversation turns sensitive.
						</p>
						<p>
							Here’s the insight that became the company:{' '}
							<strong>most teams do not want to build an internal AI
							voice operations function.</strong> They want the outcome,
							not the on-call rotation. So Samora operates the agents in
							production for them, and owns deployment, monitoring,
							compliance guardrails, observability, and human
							escalation.
						</p>
					</Prose>
				</div>
			</Section>

			<Section>
				<SectionHeading>What we actually built</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							Multilingual, domain-aware voice agents that handle real
							inbound and outbound calls, and the operational layer that
							keeps them trustworthy:
						</p>
						<p>
							<strong>Code-switching and dialect-heavy
							conversations.</strong> Strict policy enforcement and
							compliance controls. Integrations into CRMs, ATSs, and
							ticketing. <strong>Turn-level observability</strong> and
							structured explainability. And managed human escalation,
							with trained Samora operators stepping in when a
							conversation gets uncertain or sensitive.
						</p>
						<p>
							Every call is fully logged and auditable. A customer can
							see what the agent heard, which rule fired, what action it
							took, and exactly why it escalated. That audit trail is the
							difference between a clever demo and something a regulated
							business will put on its main line. Hover a stage below to
							see how a single turn flows through the pipeline I built.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<VoicePipeline />
				</Reveal>
			</Section>

			<Section className='py-20 md:py-28'>
				<Pullquote>
					No tech stack. No ops team. No call center. Just Samora AI.
				</Pullquote>
			</Section>

			<Section>
				<SectionHeading>Why the tech was good enough for YC</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							A lot of teams can get a voice agent to say a sentence
							nicely. Very few can stand behind it in production across
							financial services, recruitment, healthcare, consumer
							goods, automotive, and government workflows, which is
							exactly where Samora’s paying customers are.
						</p>
						<p>
							The proof was in the numbers, not the pitch:{' '}
							<strong>80% first-contact resolution</strong> in support
							use cases, a <strong>12% lift in collection rates</strong>{' '}
							for an auto-finance company, and{' '}
							<strong>100,000+ candidates reached</strong> in recruiting
							while saving <strong>1,700 recruiter hours</strong>. Most
							pilots go live in under a week.
						</p>
						<p>
							That’s what makes the technology defensible. The hard part
							was never the model, it was everything around it:
							making the system reliable on bad lines, observable at the
							turn level, compliant under real policy, and safe to hand a
							sensitive call to a human at exactly the right moment. We’d
							already paid for that knowledge on the national helpline.
							YC was buying a team that had survived the production
							version of this problem.
						</p>
					</Prose>
				</div>
			</Section>

			<Section>
				<SectionHeading>The part where I called it</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							So back to the conviction. When I told the founders we’d
							get into YC, it wasn’t bravado, it was math on what we’d
							built. We weren’t selling a hope. We were selling a system
							that already worked under the worst conditions we could
							find, with metrics from real customers and an operational
							story most “voice AI” companies can’t tell.
						</p>
						<p>
							I’d built the pipeline from an empty repo into something
							carrying serious daily volume. I’d watched it hold up when
							the lines were bad and the dialects were hard. I knew what
							was under the hood. That’s why I could say{' '}
							<strong>“you’ll see, we’ll get in”</strong> and mean it.
						</p>
						<p>And we did.</p>
					</Prose>
				</div>
				<div className='mt-10'>
					<TagRow
						tags={[
							'Voice AI',
							'Multilingual',
							'Production reliability',
							'Observability',
							'Human escalation',
							'YC W26',
						]}
					/>
				</div>
				<div className='mt-10 flex flex-wrap gap-4'>
					<OutboundButton href='https://samora.ai'>
						Visit Samora AI
					</OutboundButton>
					<OutboundButton href='https://youtu.be/YgXGz0OOvG8'>
						Watch the launch
					</OutboundButton>
				</div>
			</Section>
		</>
	);
};

export default HowWeWalkedIntoYC;
