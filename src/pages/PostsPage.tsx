// src/pages/PostsPage.tsx
import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import type { Post } from '../types'

export default function PostsPage() {
  // usePosts devuelve { state, dispatch, results, total, update, remove }
  const { state, dispatch, results, total } = usePosts()
  const { loading, error, q, page, limit } = state

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link to="/posts/nuevo" className="px-3 py-2 rounded bg-black text-white">
          Añadir
        </Link>
      </div>

      <SearchBar
        value={q}
        onChange={(v: string) => dispatch({ type: 'SET_Q', payload: v })}
      />

      {loading && <p>Cargando…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <ul className="space-y-3">
          {results.map((post: Post) => (
            <li key={post.id} className="border p-4 rounded shadow-sm">
              <h2 className="font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.body}</p>
              <span className="text-xs text-gray-500">Autor: {post.userId}</span>
            </li>
          ))}
        </ul>
      )}

      <Pagination
        page={page}
        total={total}
        limit={limit}
        onPage={(p) => dispatch({ type: 'SET_PAGE', payload: p })}
      />
    </div>
  )
}
