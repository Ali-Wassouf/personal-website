import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readMarkdownFile } from '../_lib/content'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(204).end()

  try {
    const slug = req.query.slug as string
    const study = await readMarkdownFile('case-studies', slug)
    if (!study) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Case study not found' } })
    return res.json({ data: study })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error' } })
  }
}
