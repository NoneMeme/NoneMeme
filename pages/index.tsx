import React from 'react';

import Head from 'next/head';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { getMemeList } from '@/lib/build';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps<{ memeList: string[] }> = async () => {
	return { props: { memeList: await getMemeList() } };
}

export default function Home({ memeList }: { memeList: string[] }) {
	const [memeIndex, setMemeIndex] = React.useState<number | undefined>(undefined);

	React.useEffect(() => setMemeIndex(Math.floor(Math.random() * memeList.length)), []);

	return (
		<>
			<Head>
				<title>NoneBot梗 | NoneBot群大佬们的日常</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box p={2}>
				<Stack spacing={2}>
					<Typography variant="h3" component="h1" align="center" gutterBottom>NoneBot梗</Typography>
					<Stack direction="column" justifyContent="center" alignItems="center">
						{memeIndex ? <img src={`meme/${memeList[memeIndex]}`} alt={memeList[memeIndex]} loading="lazy" /> : undefined}
					</Stack>
				</Stack>
			</Box>
		</>
	);
}
