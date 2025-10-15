'use client'

import { useState, useEffect } from 'react'
import { Product, Variant } from '@/app/types'

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Product) => void
  onCancel: () => void
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState(product?.name || '')
  const [price, setPrice] = useState(product?.price || 0)
  const [description, setDescription] = useState(product?.description || '')
  const [image, setImage] = useState(product?.image || '')
  const [variantsCor, setVariantsCor] = useState<Variant[]>(product?.variantsCor || [])
  const [variantsSize, setVariantsSize] = useState<Variant[]>(product?.variantsSize || [])

  useEffect(() => {
    setName(product?.name || '')
    setPrice(product?.price || 0)
    setDescription(product?.description || '')
    setImage(product?.image || '')
    setVariantsCor(product?.variantsCor || [])
    setVariantsSize(product?.variantsSize || [])
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newProduct: Product = {
      id: product?.id || Date.now(),
      name,
      price,
      description,
      image,
      variantsCor,
      variantsSize,
    }
    onSubmit(newProduct)
  }

  // Função simples para adicionar variante
  const addVariantCor = () => {
    setVariantsCor([...variantsCor, { id: Date.now(), name: '', options: [] }])
  }

  // Função simples para adicionar variante
  const addVariantSize = () => {
    setVariantsSize([...variantsSize, { id: Date.now(), name: '', options: [] }])
  }

  // Atualizar variante
  const updateVariantCor = (index: number, value: string) => {
    const newVariants = [...variantsCor]
    newVariants[index].name = value
    setVariantsCor(newVariants)
  }

  // Atualizar variante
  const updateVariantSize = (index: number, value: string) => {
    const newVariants = [...variantsSize]
    newVariants[index].name = value
    setVariantsSize(newVariants)
  }

  // Atualizar opções da variante (simples, separa por vírgula)
  const updateVariantOptionsCor = (index: number, value: string) => {
    const newVariants = [...variantsCor]
    newVariants[index].options = value.split(',').map(o => o.trim())
    setVariantsCor(newVariants)
  }

  // Atualizar opções da variante (simples, separa por vírgula)
  const updateVariantOptionsSize = (index: number, value: string) => {
    const newVariants = [...variantsSize]
    newVariants[index].options = value.split(',').map(o => o.trim())
    setVariantsSize(newVariants)
  }

  return (
    <form onSubmit={handleSubmit} className="ml-4 md:ml-65 border p-4 mt-4 rounded">
      <div>
        <label>Nome:</label>
        <input className="border p-1 w-full" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Preço:</label>
        <input type="number" step="0.01" className="border p-1 w-full" value={price} onChange={e => setPrice(parseFloat(e.target.value))} required />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea className="border p-1 w-full" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Imagem (URL):</label>
        <input className="border p-1 w-full" value={image} onChange={e => setImage(e.target.value)} />
      </div>

      <div>
        <label>VarianteCor:</label>
        {variantsCor.map((variantCor, i) => (
          <div key={variantCor.id} className="mb-2">
            <input
              placeholder="Nome da variante"
              className="border p-1 mr-2"
              value={variantCor.name}
              onChange={e => updateVariantCor(i, e.target.value)}
            />
            <input
              placeholder="Opções separadas por vírgula"
              className="border p-1 w-64"
              value={variantCor.options.join(', ')}
              onChange={e => updateVariantOptionsCor(i, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addVariantCor} className="text-blue-600 mt-2">+ Adicionar varianteCor</button>
      </div>
      <div>
        <label>VarianteSize:</label>
        {variantsSize.map((variantSize, i) => (
          <div key={variantSize.id} className="mb-2">
            <input
              placeholder="Nome da variante"
              className="border p-1 mr-2"
              value={variantSize.name}
              onChange={e => updateVariantSize(i, e.target.value)}
            />
            <input
              placeholder="Opções separadas por vírgula"
              className="border p-1 w-64"
              value={variantSize.options.join(', ')}
              onChange={e => updateVariantOptionsSize(i, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addVariantSize} className="text-blue-600 mt-2">+ Adicionar varianteSize</button>
      </div>

      <div className="mt-4 flex space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-black px-4 py-2 rounded">Cancelar</button>
      </div>
      
    </form>
  )
}
