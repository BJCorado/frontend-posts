import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm'
import { usePosts } from '../hooks/usePosts'

export default function NewPostsPage() {
  const nav = useNavigate()
  const { create } = usePosts()

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nuevo post</h1>
      <PostForm submitText="Crear" onSubmit={async (data)=>{ await create(data); nav('/posts') }} />
    </div>
  )
}
