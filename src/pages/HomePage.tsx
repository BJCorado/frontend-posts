// src/pages/HomePage.tsx
import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import PostsTable from '../components/PostsTable'

export default function HomePage() {
  // Hook con lógica de JSONPlaceholder (/posts)
  const { state, dispatch, results, total, update, remove } = usePosts()
  const { loading, error, q, page, limit } = state

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link
          to="/posts/nuevo"
          className="px-3 py-2 rounded bg-black text-white hover:bg-gray-800"
        >
          Añadir
        </Link>
      </div>

      {/* Buscar por título */}
      <SearchBar
        value={q}
        onChange={(v: string) => dispatch({ type: 'SET_Q', payload: v })}
      />

      {/* Estados */}
      {loading && <p>Cargando posts…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Tabla */}
      {!loading && !error && (
        <PostsTable items={results} onEdit={update} onDelete={remove} />
      )}

      {/* Paginación client-side */}
      <Pagination
        page={page}
        total={total}
        limit={limit}
        onPage={(p: number) => dispatch({ type: 'SET_PAGE', payload: p })}
      />
    </div>
  )
}
