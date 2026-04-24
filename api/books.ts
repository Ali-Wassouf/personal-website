import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readMarkdownFiles, readMarkdownFile } from './_lib/content'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(204).end()

  try {
    const slug = req.query.slug as string | undefined

    if (slug) {
      const book = await readMarkdownFile('books', slug)
      if (!book) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Book not found' } })
      return res.json({ data: book })
    }

    const genre = req.query.genre as string | undefined
    let books = await readMarkdownFiles('books')
    if (genre) books = books.filter((b) => b.genre === genre)
    books.sort((a, b) =>
      new Date(b.publishedAt as string).getTime() - new Date(a.publishedAt as string).getTime()
    )
    const items = books.map(({ body: _b, ...rest }) => rest)
    return res.json({ data: items, meta: { total: items.length } })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error' } })
  }
}
