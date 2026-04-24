import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readMarkdownFiles, readMarkdownFile } from './_lib/content'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(204).end()

  try {
    const slug = req.query.slug as string | undefined

    if (slug) {
      const post = await readMarkdownFile('thoughts', slug) ?? await readMarkdownFile('personal', slug)
      if (!post) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Post not found' } })
      return res.json({ data: post })
    }

    const category = req.query.category as string | undefined
    const page = Math.max(1, parseInt((req.query.page as string) || '1', 10))
    const limit = Math.min(50, Math.max(1, parseInt((req.query.limit as string) || '20', 10)))

    const thoughts = await readMarkdownFiles('thoughts')
    const personal = await readMarkdownFiles('personal')

    let posts = [...thoughts, ...personal]
    if (category === 'thoughts') posts = thoughts
    else if (category === 'personal') posts = personal

    posts.sort((a, b) =>
      new Date(b.publishedAt as string).getTime() - new Date(a.publishedAt as string).getTime()
    )

    const total = posts.length
    const items = posts.slice((page - 1) * limit, page * limit).map(({ body: _b, ...rest }) => rest)

    return res.json({ data: items, meta: { total, page, limit } })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error' } })
  }
}
