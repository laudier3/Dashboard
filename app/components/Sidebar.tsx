'use client'

import Link from 'next/link'
import { LayoutDashboard, Package, List, Settings } from 'lucide-react'

const menu = [
  { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { name: 'Products', href: '/dashboard/products', icon: <Package size={18} /> },
  { name: 'Product List', href: '/dashboard/productlist', icon: <List size={18} /> },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={onClose}
      />

      <nav
        className={`fixed top-0 left-0 h-full w-64 z-30 backdrop-blur-md bg-gradient-to-b from-gray-900/80 to-gray-800/90 text-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Admin Settings Link */}
        <Link
          href="/dashboard/settings"
          onClick={onClose}
          className="flex items-center gap-3 text-lg font-semibold text-cyan-400 hover:text-white mb-10 transition-colors"
        >
          <Settings size={20} />
          Admin Panel
        </Link>

        {/* Menu principal */}
        <ul className="space-y-4">
          {menu.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors duration-200"
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Rodapé */}
        <div className="absolute bottom-6 left-6 text-xs text-gray-500">
          <span>v1.0.0</span>
        </div>
      </nav>
    </>
  )
}
