import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const DATA_DIR = path.join(__dirname, '../../../content')

export async function readMarkdownFiles(dir: string): Promise<Array<Record<string, unknown>>> {
  const dirPath = path.join(DATA_DIR, dir)
  let files: string[]
  try {
    files = await fs.readdir(dirPath)
  } catch {
    return []
  }

  const results = await Promise.all(
    files
      .filter((f) => f.endsWith('.md'))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dirPath, file), 'utf-8')
        const { data, content } = matter(raw)
        return { ...data, body: content.trim() }
      })
  )

  return results
}

export async function readMarkdownFile(dir: string, slug: string): Promise<Record<string, unknown> | null> {
  const filePath = path.join(DATA_DIR, dir, `${slug}.md`)
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(raw)
    return { ...data, body: content.trim() }
  } catch {
    return null
  }
}

export async function readJsonFile<T>(filename: string): Promise<T | null> {
  const filePath = path.join(DATA_DIR, filename)
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}
