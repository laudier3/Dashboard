'use client'

import { useState } from 'react'
import ProductsPageLayout from '@/app/(private)/components/ProductsPageLayout'
import ProductList from '@/app/(private)/components/ProductList'
import ProductForm from '@/app/(private)/components/ProductForm'
import { Product } from '@/app/types'

const initialProducts: Product[] = [
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

export default function ProductListPage() {
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
    <ProductsPageLayout>
      <ProductList products={products} onEdit={setEditingProduct} />
      <ProductForm
        product={editingProduct || undefined}
        onSubmit={handleSave}
        onCancel={() => setEditingProduct(null)}
      />
    </ProductsPageLayout>
  )
}
