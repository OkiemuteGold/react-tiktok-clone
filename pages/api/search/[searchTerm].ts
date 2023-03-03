import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/utils/client';
import { searchPostsQuery } from '@/utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { searchTerm }: any = req.query;

        const query = searchPostsQuery(searchTerm);

        const videos = await client.fetch(query);

        res.status(200).json(videos);
    }
}