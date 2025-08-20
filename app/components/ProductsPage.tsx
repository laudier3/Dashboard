'use client'

import { useState } from 'react'
import { Product } from '@/app/types'
import ProductList from '@/app/components/ProductList'
import ProductForm from '@/app/components/ProductForm'

const initialProducts: Product[] = [
  { id: 1, name: 'Produto A', price: 49.99 },
  { id: 2, name: 'Produto B', price: 89.99 },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleSave = (product: Product) => {
    if (product.id && products.some(p => p.id === product.id)) {
      setProducts(prev =>
        prev.map(p => (p.id === product.id ? product : p))
      )
    } else {
      const newProduct = { ...product, id: Date.now() }
      setProducts(prev => [...prev, newProduct])
    }
    setEditingProduct(null)
  }

  return (
    <div className="p-8">
      <ProductList products={products} onEdit={setEditingProduct} />
      <ProductForm
        product={editingProduct || undefined}
        onSubmit={handleSave}
        onCancel={() => setEditingProduct(null)}
      />
    </div>
  )
}
