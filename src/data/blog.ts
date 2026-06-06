export interface BlogPostMeta {
	slug: string;
	title: string;
	excerpt: string;
	/** Human-readable date, e.g. "March 2026". */
	date: string;
	/** ISO date for sorting / <time>. */
	dateISO: string;
	readingTime: string;
	kicker: string;
	tags: string[];
	featured?: boolean;
}

export const blogPosts: BlogPostMeta[] = [
	{
		slug: 'how-we-walked-into-yc',
		title: 'How we walked into YC',
		excerpt:
			'I told my founders: you’ll see, we’ll get in. Believe me or not. We did. The story of building Samora’s voice engine from an empty repo into a production system YC wanted in.',
		date: 'March 2026',
		dateISO: '2026-03-01',
		readingTime: '8 min read',
		kicker: 'Founder’s log · Samora AI',
		tags: ['Samora AI', 'Voice AI', 'YC', 'Founding Engineer'],
		featured: true,
	},
];

export const getPostBySlug = (slug: string): BlogPostMeta | undefined =>
	blogPosts.find((post) => post.slug === slug);
