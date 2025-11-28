'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import banner from './banner.png';
import oiaBanner from './banners/oia-banner.png';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import Reachinbox from './pages/reachinbox';
import SamoraAI from './pages/samora-ai';
import Openinapp from './pages/openinapp';
import Jarviot from './pages/jarviot';
import Caresy from './pages/caresy';
import Saddweb from './pages/saddweb';
import { COMPANY_PAGE_MAPPINGS } from '@/lib/constants';

const Page = () => {
	// render based on the slug
	const slug = usePathname().split('/')[1];
	console.log(slug);

	const [curPage, setCurPage] = useState('');

	useEffect(() => {
		const pageKey =
			COMPANY_PAGE_MAPPINGS[slug as keyof typeof COMPANY_PAGE_MAPPINGS];
		if (pageKey) {
			setCurPage(pageKey);
		}
		// If no mapping found, could redirect to 404 page
	}, [slug]);

	return (
		<main className='flex flex-col min-h-screen bg-background selection:bg-primary/20'>
			<Nav />
			<div className='flex-grow w-full'>
				{curPage === 'samora-ai' && <SamoraAI icon='🤖' banner={banner} />}
				{curPage === 'reachinbox' && <Reachinbox icon='🚀' banner={banner} />}
				{curPage === 'openinapp' && <Openinapp icon='🏋🏻‍♂️' banner={oiaBanner} />}
				{curPage === 'jarviot' && <Jarviot icon='🎨' banner={banner} />}
				{curPage === 'caresy' && <Caresy icon='🧐' banner={banner} />}
				{curPage === 'saddweb' && <Saddweb icon='💰' banner={banner} />}
			</div>
			<Footer />
		</main>
	);
};

export default Page;
