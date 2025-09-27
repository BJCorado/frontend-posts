import { useEffect, useRef } from 'react'


type Props = { open: boolean; onClose: () => void; title?: string; children: React.ReactNode }


export default function Modal({ open, onClose, title, children }: Props) {
const ref = useRef<HTMLDivElement>(null)


useEffect(() => {
if (!open) return
const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
window.addEventListener('keydown', onKey)
const prev = document.activeElement as HTMLElement | null
ref.current?.focus()
return () => { window.removeEventListener('keydown', onKey); prev?.focus() }
}, [open])


if (!open) return null
return (
<div className="fixed inset-0 z-50 grid place-items-center bg-black/40" onClick={onClose}>
<div role="dialog" aria-modal="true" aria-label={title} ref={ref} tabIndex={-1}
className="bg-white rounded-xl w-full max-w-lg p-4 shadow-xl" onClick={e=>e.stopPropagation()}>
{title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
{children}
</div>
</div>
)
}