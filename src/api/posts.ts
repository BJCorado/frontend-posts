import type { Post } from '../types'

const BASE = 'https://jsonplaceholder.typicode.com'

export async function apiGetPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE}/posts`)
  if (!res.ok) throw new Error('Error al cargar posts')
  return res.json()
}

export async function apiGetPost(id: number): Promise<Post> {
  const res = await fetch(`${BASE}/posts/${id}`)
  if (!res.ok) throw new Error('Error al cargar post')
  return res.json()
}

export async function apiCreatePost(p: Omit<Post, 'id'>): Promise<Post> {
  const res = await fetch(`${BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p),
  })
  if (!res.ok) throw new Error('Error al crear post')
  return res.json()
}

export async function apiUpdatePost(id: number, p: Partial<Post>): Promise<Post> {
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p),
  })
  if (!res.ok) throw new Error('Error al actualizar post')
  return res.json()
}

export async function apiDeletePost(id: number): Promise<{ ok: boolean }> {
  const res = await fetch(`${BASE}/posts/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error al eliminar post')
  return { ok: true }
}
