import { promises as fs } from 'fs';

export async function getMemeList() {
	return await fs.readdir('public/meme');
}
