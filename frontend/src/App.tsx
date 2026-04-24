import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { EngineeringIndex } from './pages/engineering/EngineeringIndex'
import { CaseStudyDetail } from './pages/engineering/CaseStudyDetail'
import { WritingIndex } from './pages/writing/WritingIndex'
import { PostDetail } from './pages/writing/PostDetail'
import { BooksIndex } from './pages/books/BooksIndex'
import { BookDetail } from './pages/books/BookDetail'
import { MusicIndex } from './pages/music/MusicIndex'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="engineering" element={<EngineeringIndex />} />
          <Route path="engineering/:slug" element={<CaseStudyDetail />} />
          <Route path="writing" element={<WritingIndex />} />
          <Route path="writing/:slug" element={<PostDetail />} />
          <Route path="books" element={<BooksIndex />} />
          <Route path="books/:slug" element={<BookDetail />} />
          <Route path="music" element={<MusicIndex />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
