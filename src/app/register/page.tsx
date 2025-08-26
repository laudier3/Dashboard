'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validação simples idade ser número e maior que 0
    if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      setError('Por favor, insira uma idade válida.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    // Aqui você pode fazer chamada à API para registrar o usuário

    router.push('/dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">
          Cadastro
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Nome completo"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Idade"
          value={formData.age}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          required
          min={1}
        />

        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirme a senha"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          required
        />

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Criar Conta
        </button>

        <div className="mt-4 flex justify-between text-sm">
          <Link href="/login" className="text-indigo-600 hover:underline">
            Já tem uma conta? Login
          </Link>

          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-gray-600 hover:underline"
          >
            Voltar para Home
          </button>
        </div>
      </form>
    </div>
  )
}
