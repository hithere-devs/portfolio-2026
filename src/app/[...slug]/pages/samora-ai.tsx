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
import { ScalingInfra } from '@/components/interactive/scaling-infra';
import { RagPipeline } from '@/components/interactive/rag-pipeline';

const SamoraAI = () => {
	return (
		<>
			<CaseStudyHero
				kicker='Samora AI · YC W26'
				title='Founding the voice engine'
				lede='First engineer at a voice AI company, now Team Lead. I took the product from an empty repo to a system that handles six figures of calls every day.'
				meta={[
					{ label: 'Role', value: 'Team Lead, Founding Engineer' },
					{ label: 'Period', value: '2024 — Present' },
					{ label: 'Domain', value: 'Real-time voice AI' },
					{ label: 'Stack', value: 'Go · Python · AWS · K8s' },
				]}
			/>

			<Section>
				<Lead>
					The mandate was open-ended: turn a voice AI idea into something
					teams could lean on every single day.
				</Lead>
				<div className='mt-8'>
					<Prose>
						<p>
							I joined Samora as the first founding engineer and have
							since grown into the Team Lead role. There was no platform
							to inherit, so I built the spine of the product, the voice
							pipeline, the infrastructure it runs on, and the retrieval
							layer that keeps it accurate, then grew a team around it.
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
				<MetricStrip
					items={[
						{ value: 100, suffix: 'K+', label: 'voice calls handled per day' },
						{ display: '<700ms', label: 'turn-to-turn response budget' },
						{ value: 99.9, suffix: '%', decimals: 1, label: 'pipeline uptime' },
						{ value: 1, suffix: 'st', label: 'engineer on the team' },
					]}
				/>
			</Section>

			<Section>
				<SectionHeading>The voice pipeline</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							The heart of the product is a pipeline I built from
							scratch. Every caller&apos;s audio flows through capture,
							transcription, intent, planning, and synthesis in a tight
							loop, fast enough to feel like a real conversation rather
							than a phone tree. Hover any stage to see what it does.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<VoicePipeline />
				</Reveal>
			</Section>

			<Section>
				<SectionHeading>Scaling the infrastructure</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							That pipeline now carries 100K+ calls a day. I designed and
							deployed the full AWS stack behind it, VPCs, Lambdas, ECS,
							and Kubernetes, along with the monitoring and deployment
							workflows the team runs on today. The horizontal autoscaler
							keeps capacity ahead of traffic so call quality holds up
							even when volume spikes.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<ScalingInfra />
				</Reveal>
			</Section>

			<Section className='py-20 md:py-28'>
				<Pullquote>
					Building from zero meant every decision compounded. Get the
					foundation right and the product moves faster forever.
				</Pullquote>
			</Section>

			<Section>
				<SectionHeading>A self-learning voice engine</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							To keep answers accurate, the agent retrieves the right
							context before it speaks. A retrieval layer embeds each
							question, pulls the most relevant chunks from the knowledge
							base, and grounds the response in them, so the engine keeps
							improving as the knowledge grows. Pick a question to watch a
							lookup run end to end.
						</p>
					</Prose>
				</div>
				<Reveal className='mt-8'>
					<RagPipeline />
				</Reveal>
			</Section>

			<Section>
				<SectionHeading>Leading the team</SectionHeading>
				<div className='mt-6'>
					<Prose>
						<p>
							As Team Lead I now set technical direction, review
							architecture, and mentor the engineers building on top of
							that foundation. The goal is the same as day one: ship a
							voice product people trust, and keep the system fast and
							boring under the hood.
						</p>
					</Prose>
				</div>
				<div className='mt-10'>
					<TagRow
						tags={[
							'Voice AI',
							'Go',
							'Gin',
							'Python',
							'AWS',
							'ECS',
							'Lambda',
							'Kubernetes',
							'RAG',
						]}
					/>
				</div>
				<Reveal className='mt-10'>
					<OutboundButton href='https://samora.ai'>
						Visit Samora AI
					</OutboundButton>
				</Reveal>
			</Section>
		</>
	);
};

export default SamoraAI;
