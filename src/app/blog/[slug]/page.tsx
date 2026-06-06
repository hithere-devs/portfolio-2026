import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { blogPosts, getPostBySlug } from '@/data/blog';
import HowWeWalkedIntoYC from '../posts/how-we-walked-into-yc';

const POST_COMPONENTS: Record<string, React.ComponentType> = {
	'how-we-walked-into-yc': HowWeWalkedIntoYC,
};

export function generateStaticParams() {
	return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Metadata {
	const meta = getPostBySlug(params.slug);
	if (!meta) return { title: 'Not found' };
	return {
		title: `${meta.title} — Azhar Mahmood`,
		description: meta.excerpt,
	};
}

export default function BlogPostPage({
	params,
}: {
	params: { slug: string };
}) {
	const meta = getPostBySlug(params.slug);
	const PostBody = POST_COMPONENTS[params.slug];
	if (!meta || !PostBody) notFound();

	return (
		<main className='flex flex-col min-h-screen bg-background selection:bg-primary/20'>
			<Nav />
			<div className='flex-grow w-full'>
				<PostBody />
			</div>
			<Footer />
		</main>
	);
}
