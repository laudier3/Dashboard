'use client'

import { useState } from 'react'
import Sidebar from '@/app/components/Sidebar'
import { Menu, DollarSign, ThumbsUp, Share2, Star } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Gráfico de vendas
const chartData = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 300 },
  { name: 'Mar', sales: 500 },
  { name: 'Apr', sales: 600 },
  { name: 'May', sales: 350 },
  { name: 'Jun', sales: 700 },
]

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f9fafb] md:ms-60">
      {/* Sidebar */}
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Topbar (Mobile) */}
        <header className="bg-white shadow-sm p-4 flex items-center md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="text-gray-700"
          >
            <Menu size={28} />
          </button>
          <h1 className="ml-4 text-xl font-semibold tracking-tight text-gray-800">
            Dashboard
          </h1>
        </header>

        <main className="p-6 space-y-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel Geral</h1>

          {/* Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Earnings"
              value="$628"
              icon={<DollarSign className="text-emerald-500" size={20} />}
            />
            <StatCard
              title="Shares"
              value="2434"
              icon={<Share2 className="text-blue-500" size={20} />}
            />
            <StatCard
              title="Likes"
              value="1259"
              icon={<ThumbsUp className="text-pink-500" size={20} />}
            />
            <StatCard
              title="Rating"
              value="8.5"
              icon={<Star className="text-yellow-500" size={20} />}
            />
          </section>

          {/* Gráfico */}
          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Vendas Mensais</h2>
              <span className="text-sm text-gray-500">Atualizado agora</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#6366f1' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

// Card moderno com ícone
function StatCard({
  title,
  value,
  icon,
}: {
  title: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
        <div className="bg-gray-100 p-2 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  )
}
