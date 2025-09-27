import { useState } from 'react'
import type { Post } from '../types'
import Modal from './Modal'
import PostForm from './PostForm'

type Props = {
  items: Post[]
  onEdit: (id: number, data: Partial<Post>) => void
  onDelete: (id: number) => void
}

export default function PostsTable({ items, onEdit, onDelete }: Props) {
  const [edit, setEdit] = useState<Post | null>(null)
  const [del, setDel] = useState<Post | null>(null)

  return (
    <>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border w-12">ID</th>
            <th className="p-2 border">Título</th>
            <th className="p-2 border w-20">User</th>
            <th className="p-2 border w-40"></th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="p-2 border text-center">{p.id}</td>
              <td className="p-2 border">{p.title}</td>
              <td className="p-2 border text-center">{p.userId}</td>
              <td className="p-2 border text-right space-x-2">
                <button className="px-2 py-1 border rounded" onClick={()=>setEdit(p)}>Editar</button>
                <button className="px-2 py-1 border rounded text-red-600" onClick={()=>setDel(p)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={!!edit} onClose={()=>setEdit(null)} title="Editar post">
        {edit && (
          <PostForm
            initial={edit}
            submitText="Actualizar"
            onSubmit={(data)=>{ onEdit(edit.id!, data); setEdit(null) }}
          />
        )}
      </Modal>

      <Modal open={!!del} onClose={()=>setDel(null)} title="Confirmar eliminación">
        {del && (
          <div className="space-y-3">
            <p>¿Eliminar “{del.title}”?</p>
            <div className="flex gap-2 justify-end">
              <button className="px-3 py-1 border rounded" onClick={()=>setDel(null)}>Cancelar</button>
              <button className="px-3 py-1 border rounded bg-red-600 text-white"
                onClick={()=>{ onDelete(del.id!); setDel(null) }}>Eliminar</button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
