'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LayoutDashboard, Package, List, Settings, LogOut, Loader2 } from 'lucide-react'
import { api } from '@/app/lib/api'

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
  const router = useRouter()
  const [loadingLogout, setLoadingLogout] = useState(false)
  const [errorLogout, setErrorLogout] = useState<string | null>(null)

  const handleLogout = async () => {
    setErrorLogout(null)
    setLoadingLogout(true)

    try {
      // Chama rota de logout no backend para limpar o cookie HttpOnly
      const res = await api.post('/logout', {}, { withCredentials: true })
      if (res.status !== 200 && res.status !== 202) {
        throw new Error(res.data?.msg || `Logout falhou (${res.status})`)
      }

      // Limpeza opcional do client-side
      try { localStorage.removeItem('token') } catch (_) {}

      // Pausa para mostrar o spinner
      await new Promise(r => setTimeout(r, 500))

      // Redireciona para a página inicial
      router.replace('/')
    } catch (err: any) {
      console.error('Erro no logout:', err)
      setErrorLogout(err?.message || 'Erro ao deslogar')
      setLoadingLogout(false)
    }
  }

  return (
    <>
      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 z-30 backdrop-blur-md bg-gradient-to-b from-gray-900/80 to-gray-800/90 text-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <Link href="/dashboard/settings" onClick={onClose} className="flex items-center gap-3 text-lg font-semibold text-cyan-400 hover:text-white mb-10 transition-colors">
          <Settings size={20} /> Admin
        </Link>

        <ul className="space-y-4">
          {menu.map(item => (
            <li key={item.name}>
              <Link href={item.href} onClick={onClose} className="flex items-center gap-3 text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors duration-200">
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botão de sair */}
        <div className="absolute bottom-20 left-6">
          <button
            onClick={handleLogout}
            disabled={loadingLogout}
            className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 
              ${loadingLogout ? 'text-cyan-400 cursor-wait' : 'text-gray-300 hover:text-red-400'}`}
            aria-busy={loadingLogout}
          >
            {loadingLogout ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saindo...
              </>
            ) : (
              <>
                <LogOut size={18} />
                Sair
              </>
            )}
          </button>
          {errorLogout && <p className="text-xs text-red-400 mt-2">{errorLogout}</p>}
        </div>

        <div className="absolute bottom-6 left-6 text-xs text-gray-500">v1.0.0</div>
      </nav>

      {/* Overlay de logout */}
      {loadingLogout && (
        <LogoutOverlay visible={loadingLogout} />
      )}
    </>
  )
}

// ======================
// Componente Overlay de Logout (Frontend-only)
// ======================
interface LogoutOverlayProps {
  visible: boolean
}

function LogoutOverlay({ visible }: LogoutOverlayProps) {
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="rounded-lg bg-white/5 backdrop-blur-md p-6 flex flex-col items-center gap-4">
        <Loader2 size={36} className="animate-spin text-white" />
        <div className="text-white font-medium">Finalizando sessão...</div>
      </div>
    </div>
  )
}
