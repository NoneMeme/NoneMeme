import { promises as fs } from 'fs';

export async function getMemeList(): Promise<string[]> {
	return await fs.readdir('public/meme');
}
