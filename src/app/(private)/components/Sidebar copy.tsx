'use client'

import Link from 'next/link'

const menu = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Products', href: '/dashboard/products' },
  { name: 'ProductsPage', href: '/dashboard/productlist' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay escuro atrás do menu no mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={onClose}
      ></div>

      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 z-30 transform md:translate-x-0 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul>
          {menu.map((item) => (
            <li key={item.name} className="mb-4">
              <Link href={item.href} onClick={onClose} className="hover:underline">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
