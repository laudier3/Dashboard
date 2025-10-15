'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { api } from '../lib/api' // verifique se o caminho está correto

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    image: '',
    access: 'user',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
  
    // 🔹 Validações básicas
    const birthDate = new Date(formData.birthDate)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    const dayDiff = today.getDate() - birthDate.getDate()
    const hasHadBirthdayThisYear = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)
    const finalAge = hasHadBirthdayThisYear ? age : age - 1
  
    if (isNaN(birthDate.getTime())) {
      setError('Por favor, insira uma data de nascimento válida.')
      return
    }
  
    if (finalAge < 18) {
      setError('Você precisa ter pelo menos 18 anos para se cadastrar.')
      return
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }
  
    try {
      setLoading(true)
  
      const { data } = await api.post('/user', {
        name: formData.name.trim(),
        age: finalAge.toString(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        access: formData.access,
        image: formData.image || 'https://i.pravatar.cc/150',
        password: formData.password.trim(),
      })
  
      // 🔹 Mostra a resposta da API no console
      console.log('Resposta da API:', data)
  
      setSuccess(data.msg || 'Cadastro realizado com sucesso!')
      setTimeout(() => router.push('/login'), 2000)
    } catch (err: any) {
      console.error('Erro ao cadastrar:', err)
      setError(err.response?.data?.msg || 'Erro inesperado. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }  

  const maxDate = new Date().toISOString().split('T')[0]

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 px-4">
      
      {/* Overlay de loading com spinner */}
      {loading && (
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-10">
          <div className="loader border-t-4 border-b-4 border-white w-12 h-12 rounded-full animate-spin mb-2"></div>
          <div className="text-white text-lg font-semibold">Cadastrando usuário...</div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm relative z-0"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">
          Cadastro
        </h2>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}

        {/* Campos do formulário */}
        <input
          type="text"
          name="name"
          placeholder="Nome completo"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
          max={maxDate}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
        <input
          type="url"
          name="image"
          placeholder="URL da imagem de perfil (opcional)"
          value={formData.image}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
        <select
          name="access"
          value={formData.access}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-500 text-gray-900"
        >
          <option value="user">Usuário comum</option>
          <option value="admin">Administrador</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirme a senha"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-indigo-600 text-white py-3 rounded-lg transition ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Cadastrando...' : 'Criar Conta'}
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

      {/* CSS do spinner */}
      <style jsx>{`
        .loader {
          border-top-color: transparent;
          border-bottom-color: transparent;
        }
      `}</style>
    </div>
  )
}
