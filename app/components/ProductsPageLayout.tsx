'use client'

import { ReactNode, useState } from 'react'
import Sidebar from '@/app/components/Sidebar'

interface ProductsPageLayoutProps {
  children: ReactNode
}

export default function ProductsPageLayout({ children }: ProductsPageLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen md:ms-58">
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Header visível apenas no mobile */}
        <header className="bg-white shadow-md p-4 flex items-center md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="text-gray-700"
          >
            {/* Ícone do menu */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="ml-4 text-xl font-bold">Produtos</h1>
        </header>

        <main className="p-8 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
