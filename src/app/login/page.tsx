'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <div className="flex justify-between text-sm mb-6">
          <Link
            href="/forgot-password"
            className="text-indigo-600 hover:underline"
          >
            Esqueci a senha
          </Link>
          <Link href="/register" className="text-indigo-600 hover:underline">
            Cadastre-se
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="mt-4 w-full border border-gray-300 rounded py-2 text-center text-gray-700 hover:bg-gray-100 transition"
        >
          Voltar para Home
        </button>
      </form>
    </div>
  )
}
