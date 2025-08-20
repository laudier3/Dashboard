'use client'

import { Product } from '@/app/types'

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
}

export default function ProductList({ products, onEdit }: ProductListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Lista de Produtos</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Imagem</th>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Preço</th>
            <th className="border p-2">Descrição</th>
            <th className="border p-2">VarianteCor</th>
            <th className="border p-2">VarianteSize</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-16 h-16 object-cover" />
                ) : (
                  'Sem imagem'
                )}
              </td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">${p.price.toFixed(2)}</td>
              <td className="border p-2">{p.description || '-'}</td>
              <td className="border p-2">
                {p.variantsCor?.map(v => (
                  <div key={v.id}>
                    <strong>{v.name}:</strong> {v.options.join(', ')}
                  </div>
                )) || '-'}
              </td>
              <td className="border p-2">
                {p.variantsSize?.map(v => (
                  <div key={v.id}>
                    <strong>{v.name}:</strong> {v.options.join(', ')}
                  </div>
                )) || '-'}
              </td>
              <td className="border p-2">
                <button onClick={() => onEdit(p)} className="text-blue-600 hover:underline">Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
