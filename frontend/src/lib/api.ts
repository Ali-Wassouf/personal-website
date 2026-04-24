import type { Post, CaseStudy, Book, MusicRelease } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001/api/v1' : '/api')

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: { message: res.statusText } }))
    throw new ApiError(res.status, err.error?.message ?? res.statusText)
  }
  const json = await res.json()
  return json.data as T
}

export const api = {
  posts: {
    list: (params?: { category?: string; page?: number; limit?: number }) => {
      const q = new URLSearchParams()
      if (params?.category) q.set('category', params.category)
      if (params?.page) q.set('page', String(params.page))
      if (params?.limit) q.set('limit', String(params.limit))
      const qs = q.toString()
      return request<Post[]>(`/posts${qs ? `?${qs}` : ''}`)
    },
    get: (slug: string) => request<Post>(`/posts/${slug}`),
  },
  caseStudies: {
    list: () => request<CaseStudy[]>('/case-studies'),
    get: (slug: string) => request<CaseStudy>(`/case-studies/${slug}`),
  },
  books: {
    list: (genre?: string) =>
      request<Book[]>(`/books${genre ? `?genre=${genre}` : ''}`),
    get: (slug: string) => request<Book>(`/books/${slug}`),
  },
  music: {
    list: () => request<MusicRelease[]>('/music'),
    get: (slug: string) => request<MusicRelease>(`/music/${slug}`),
  },
}
