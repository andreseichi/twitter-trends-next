import type { NextApiRequest, NextApiResponse } from 'next';
import { twitter } from '../../services/twitter';

export default async function woeid(req: NextApiRequest, res: NextApiResponse) {
  const { woeid } = req.query;

  const { data } = await twitter.get(`trends/place.json?id=${woeid}`);
  const { trends } = data[0];

  return res.status(200).json(trends);
}
