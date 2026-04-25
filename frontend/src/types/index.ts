export interface Post {
  slug: string
  title: string
  category: 'thoughts' | 'personal'
  publishedAt: string
  excerpt: string
  tags: string[]
  wordCount: number
  body?: string
}

export interface CaseStudy {
  slug: string
  title: string
  publishedAt: string
  excerpt: string
  tags: string[]
  techStack: string[]
  role: string
  duration: string
  outcome: string
  body?: string
}

export interface Book {
  slug: string
  title: string
  author: string
  genre: 'novels' | 'psychology' | 'self-improvement' | 'political-science'
  status: 'finished' | 'in-progress' | 'to-read'
  rating?: number
  publishedAt: string
  excerpt: string
  coverUrl?: string
  body?: string
}

export interface MusicRelease {
  id: string
  slug: string
  title: string
  titleArabic?: string
  type: 'single' | 'ep' | 'album'
  releaseDate: string
  coverUrl?: string
  platforms: {
    spotify?: string
    youtube?: string
    youtubeMusic?: string
    appleMusic?: string
    soundcloud?: string
  }
  featured?: boolean
  lyrics?: string
  lyricsTranslation?: string
}
