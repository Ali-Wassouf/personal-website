import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readJsonFile } from './_lib/content'

interface MusicData { releases: unknown[] }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(204).end()

  try {
    const data = await readJsonFile<MusicData>('music.json')
    return res.json({ data: data?.releases ?? [] })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error' } })
  }
}
