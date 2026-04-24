import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readMarkdownFiles } from './_lib/content'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(204).end()

  try {
    const studies = await readMarkdownFiles('case-studies')
    studies.sort((a, b) =>
      new Date(b.publishedAt as string).getTime() - new Date(a.publishedAt as string).getTime()
    )
    const items = studies.map(({ body: _b, ...rest }) => rest)
    return res.json({ data: items, meta: { total: items.length } })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error' } })
  }
}
