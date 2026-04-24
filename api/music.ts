import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readJsonFile, readMarkdownFile } from './_lib/content'

interface MusicData { releases: Array<Record<string, unknown>> }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(204).end()

  try {
    const data = await readJsonFile<MusicData>('music.json')
    const slug = req.query.slug as string | undefined

    if (slug) {
      const release = data?.releases.find((r) => r.slug === slug)
      if (!release) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Release not found' } })
      const lyricsFile = await readMarkdownFile('music', slug)
      if (lyricsFile?.body) release.lyricsRaw = lyricsFile.body as string
      return res.json({ data: release })
    }

    return res.json({ data: data?.releases ?? [] })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Server error' } })
  }
}
