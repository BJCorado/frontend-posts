import { useState } from 'react'
import type { Post } from '../types'

type Props = {
  initial?: Partial<Post>
  onSubmit: (data: Omit<Post, 'id'>) => void
  submitText?: string
}

export default function PostForm({ initial = {}, onSubmit, submitText = 'Guardar' }: Props) {
  const [title, setTitle] = useState(initial.title ?? '')
  const [body, setBody] = useState(initial.body ?? '')
  const [userId, setUserId] = useState<number>(Number(initial.userId ?? 1))
  const [errors, setErrors] = useState<{title?:string; body?:string}>({})

  function validate(): boolean {
    const e: typeof errors = {}
    if (!title.trim()) e.title = 'Título requerido'
    if (!body.trim()) e.body = 'Contenido requerido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    onSubmit({ title, body, userId })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input className="w-full border p-2" placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
      {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
      <textarea className="w-full border p-2" rows={5} placeholder="Contenido" value={body} onChange={e=>setBody(e.target.value)} />
      {errors.body && <p className="text-sm text-red-600">{errors.body}</p>}
      <input className="w-full border p-2" type="number" min={1} placeholder="User ID" value={userId} onChange={e=>setUserId(Number(e.target.value))} />
      <button className="px-4 py-2 rounded bg-black text-white">{submitText}</button>
    </form>
  )
}
