/**
 * Local development server — not used in Lambda production.
 * Run: npx ts-node src/server.ts  (or use tsx)
 */
import http from 'http'
import path from 'path'
import { readMarkdownFiles, readMarkdownFile, readJsonFile } from './lib/content'

const PORT = process.env.PORT ?? 3001

function cors(res: http.ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Content-Type', 'application/json')
}

function send(res: http.ServerResponse, status: number, body: unknown) {
  cors(res)
  res.writeHead(status)
  res.end(JSON.stringify(body))
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    cors(res)
    res.writeHead(204)
    res.end()
    return
  }

  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`)
  const p = url.pathname.replace(/^\/api\/v1/, '')
  const params = url.searchParams

  try {
    // GET /posts
    if (p === '/posts' && req.method === 'GET') {
      const category = params.get('category')
      const thoughts = await readMarkdownFiles('thoughts')
      const personal = await readMarkdownFiles('personal')
      let posts = [...thoughts, ...personal]
      if (category === 'thoughts') posts = thoughts
      else if (category === 'personal') posts = personal
      posts.sort((a, b) =>
        new Date(b.publishedAt as string).getTime() - new Date(a.publishedAt as string).getTime()
      )
      const items = posts.map(({ body: _b, ...r }) => r)
      return send(res, 200, { data: items, meta: { total: items.length } })
    }

    // GET /posts/:slug
    const postMatch = p.match(/^\/posts\/([^/]+)$/)
    if (postMatch && req.method === 'GET') {
      const slug = postMatch[1]
      const post = await readMarkdownFile('thoughts', slug) ?? await readMarkdownFile('personal', slug)
      if (!post) return send(res, 404, { error: { code: 'NOT_FOUND', message: 'Post not found' } })
      return send(res, 200, { data: post })
    }

    // GET /case-studies
    if (p === '/case-studies' && req.method === 'GET') {
      const studies = await readMarkdownFiles('case-studies')
      studies.sort((a, b) =>
        new Date(b.publishedAt as string).getTime() - new Date(a.publishedAt as string).getTime()
      )
      const items = studies.map(({ body: _b, ...r }) => r)
      return send(res, 200, { data: items })
    }

    // GET /case-studies/:slug
    const csMatch = p.match(/^\/case-studies\/([^/]+)$/)
    if (csMatch && req.method === 'GET') {
      const study = await readMarkdownFile('case-studies', csMatch[1])
      if (!study) return send(res, 404, { error: { code: 'NOT_FOUND', message: 'Not found' } })
      return send(res, 200, { data: study })
    }

    // GET /books
    if (p === '/books' && req.method === 'GET') {
      const genre = params.get('genre')
      let books = await readMarkdownFiles('books')
      if (genre) books = books.filter((b) => b.genre === genre)
      books.sort((a, b) =>
        new Date(b.publishedAt as string).getTime() - new Date(a.publishedAt as string).getTime()
      )
      const items = books.map(({ body: _b, ...r }) => r)
      return send(res, 200, { data: items })
    }

    // GET /books/:slug
    const bookMatch = p.match(/^\/books\/([^/]+)$/)
    if (bookMatch && req.method === 'GET') {
      const book = await readMarkdownFile('books', bookMatch[1])
      if (!book) return send(res, 404, { error: { code: 'NOT_FOUND', message: 'Not found' } })
      return send(res, 200, { data: book })
    }

    // GET /music
    if (p === '/music' && req.method === 'GET') {
      const data = await readJsonFile<{ releases: unknown[] }>('music.json')
      return send(res, 200, { data: data?.releases ?? [] })
    }

    send(res, 404, { error: { code: 'NOT_FOUND', message: `Route ${p} not found` } })
  } catch (err) {
    console.error(err)
    send(res, 500, { error: { code: 'INTERNAL_ERROR', message: 'Server error' } })
  }
})

server.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}/api/v1`)
})
