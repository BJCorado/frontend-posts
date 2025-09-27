import { useEffect, useReducer } from 'react'
import type { Post } from '../types'
import {
  apiGetPosts,
  apiCreatePost,
  apiUpdatePost,
  apiDeletePost,
} from '../api/posts'

type State = {
  items: Post[]
  loading: boolean
  error: string | null
  q: string
  page: number
  limit: number
}

type Action =
  | { type: 'LOAD' }
  | { type: 'SUCCESS'; payload: Post[] }
  | { type: 'ERROR'; payload: string }
  | { type: 'SET_Q'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'CREATE_OPT'; payload: Post }
  | { type: 'UPDATE_OPT'; payload: { id: number; data: Partial<Post> } }
  | { type: 'DELETE_OPT'; payload: number }

const initial: State = {
  items: [],
  loading: true,
  error: null,
  q: '',
  page: 1,
  limit: 10,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD': return { ...state, loading: true, error: null }
    case 'SUCCESS': return { ...state, loading: false, items: action.payload }
    case 'ERROR': return { ...state, loading: false, error: action.payload }
    case 'SET_Q': return { ...state, q: action.payload, page: 1 }
    case 'SET_PAGE': return { ...state, page: action.payload }
    case 'CREATE_OPT': return { ...state, items: [action.payload, ...state.items] }
    case 'UPDATE_OPT':
      return {
        ...state,
        items: state.items.map(i => i.id === action.payload.id ? { ...i, ...action.payload.data } : i),
      }
    case 'DELETE_OPT': return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    default: return state
  }
}

export function usePosts() {
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(() => {
    let active = true
    dispatch({ type: 'LOAD' })
    apiGetPosts()
      .then(data => { if (active) dispatch({ type: 'SUCCESS', payload: data }) })
      .catch(e => dispatch({ type: 'ERROR', payload: String(e?.message ?? e) }))
    return () => { active = false }
  }, [])

  async function create(p: Omit<Post,'id'>) {
    const temp: Post = { ...p, id: Math.floor(Math.random()*1e6) }
    dispatch({ type: 'CREATE_OPT', payload: temp })
    try { await apiCreatePost(p) } catch {}
  }

  async function update(id: number, data: Partial<Post>) {
    dispatch({ type: 'UPDATE_OPT', payload: { id, data } })
    try { await apiUpdatePost(id, data) } catch {}
  }

  async function remove(id: number) {
    const snapshot = state.items
    dispatch({ type: 'DELETE_OPT', payload: id })
    try { await apiDeletePost(id) } catch { dispatch({ type: 'SUCCESS', payload: snapshot }) }
  }

  const filtered = state.q
    ? state.items.filter(p => p.title.toLowerCase().includes(state.q.toLowerCase()))
    : state.items
  const total = filtered.length
  const start = (state.page - 1) * state.limit
  const results = filtered.slice(start, start + state.limit)

  return { state, dispatch, results, total, create, update, remove }
}
