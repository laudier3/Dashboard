'use client'

import { useState } from 'react'
import Sidebar from '@/app/components/Sidebar'
import { Menu } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 300 },
  { name: 'Mar', sales: 500 },
]

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar responsiva com props */}
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Topbar para mobile com botão hambúrguer */}
        <header className="bg-white shadow-md p-4 flex items-center md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="text-gray-700"
          >
            <Menu size={28} />
          </button>
          <h1 className="ml-4 text-xl font-bold">Dashboard</h1>
        </header>

        {/* Conteúdo principal */}
        <main className="p-8 md:ms-58">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#4F46E5" />
            </LineChart>
          </ResponsiveContainer>
        </main>
      </div>
    </div>
  )
}
