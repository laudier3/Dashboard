'use client'

import { useState } from 'react'
import Sidebar from '@/app/(private)/components/Sidebar'
import { Menu } from 'lucide-react'

const initialProducts = [
  {
    id: 1,
    name: 'Ipphone 15 pro 128/GB',
    price: 49.99,
    description: 'Apple iPhone 15 Plus (Preto, 128 GB) (Recondicionado) - GudFast',
    image: 'https://i.zst.com.br/thumbs/45/1b/37/-1347443448.jpg',
    variantsCor: [],
    variantsSize: [],
  },
  {
    id: 2,
    name: 'Xiaomi Redmi Note 13 4G 512',
    price: 89.99,
    description: 'Xiaomi Redmi Note 13 4G 512 Go bleu au meilleur prix sur idealo.fr',
    image: 'https://cdn.idealo.com/folder/Product/205480/5/205480542/s4_produktbild_gross/xiaomi-redmi-note-13-4g-512-go-bleu.jpg',
    variantsCor: [],
    variantsSize: [],
  },
]

export default function ProductsPage() {
  const [products] = useState(initialProducts)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen md:ms-58">
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Topbar para mobile */}
        <header className="bg-white shadow-md p-4 flex items-center md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="text-gray-700"
          >
            <Menu size={28} />
          </button>
          <h1 className="ml-4 text-xl font-bold">Products</h1>
        </header>

        {/* Conteúdo principal */}
        <main className="p-8 flex-1 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-600">
                <th className="border p-2">ID</th>
                <th className="border p-2">Imagem</th>
                <th className="border p-2">Nome</th>
                <th className="border p-2">Preço</th>
                <th className="border p-2">Descrição</th>
                <th className="border p-2">VarianteCor</th>
                <th className="border p-2">VarianteSize</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="p-2 border">{p.id}</td>
                  <td className="border p-2">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-16 h-16 object-cover" />
                    ) : (
                      'Sem imagem'
                    )}
                  </td>
                  <td className="p-2 border">{p.name}</td>
                  <td className="p-2 border">${p.price}</td>
                  <td className="p-2 border">{p.description}</td>
                  <td className="p-2 border">{p.variantsCor}</td>
                  <td className="p-2 border">{p.variantsSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  )
}
