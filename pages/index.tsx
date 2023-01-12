import Head from 'next/head';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { getMemeList } from '@/lib/build';

export async function getStaticProps() {
	return { props: { memeList: await getMemeList() } };
}

export default function Home({ memeList }: { memeList: string[] }) {
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
					<ImageList variant="masonry" cols={3} gap={8}>
						{ memeList.map(meme => (
							<ImageListItem key={meme}>
								<img src={`meme/${meme}`} alt={meme} loading="lazy" />
							</ImageListItem>
						)) }
					</ImageList>
				</Stack>
			</Box>
		</>
	);
}
