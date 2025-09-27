export default function Pagination({ page, total, limit, onPage }: { page:number; total:number; limit:number; onPage:(p:number)=>void }) {
const max = Math.max(1, Math.ceil(total/limit))
return (
<div className="flex items-center gap-2">
<button className="border px-3 py-1 rounded" disabled={page<=1} onClick={()=>onPage(page-1)}>Anterior</button>
<span>Página {page} / {max}</span>
<button className="border px-3 py-1 rounded" disabled={page>=max} onClick={()=>onPage(page+1)}>Siguiente</button>
</div>
)
}
