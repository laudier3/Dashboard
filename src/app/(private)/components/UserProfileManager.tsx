'use client'

import { useState, useEffect } from 'react'
import { User2, Mail, Phone, MapPin, FileText, Loader2 } from 'lucide-react'
import { api } from '@/app/lib/api'

interface User {
  name: string
  age?: string
  email: string
  phone: string
  access: string
  image: string
  password: string
}

export default function UserProfileManager() {
  const [user, setUser] = useState<User | null>(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // 🔹 Busca o usuário autenticado via cookie HttpOnly
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      setError('')
      setSuccess('')

      try {
        const { data } = await api.get('/user/me') // cookie HttpOnly é enviado automaticamente
        setUser(data)
      } catch (err: any) {
        console.error('Erro ao buscar usuário:', err.response?.data || err.message)
        if (err.response?.status === 401) {
          setError('Token não encontrado ou inválido. Faça login novamente.')
        } else {
          setError('Erro ao carregar dados do usuário.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (user) setUser({ ...user, [name]: value })
  }

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      // PUT com cookie HttpOnly
      const { data } = await api.put('/user', user)
      setUser(data)
      setSuccess('Usuário atualizado com sucesso!')
      setEditing(false)
    } catch (err: any) {
      console.error('Erro ao salvar usuário:', err.response?.data || err.message)
      if (err.response?.status === 401) {
        setError('Token inválido ou expirado. Faça login novamente.')
      } else {
        setError('Erro ao salvar usuário.')
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingOverlay message="Carregando perfil..." />
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>
  if (!user) return null

  return (
    <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto space-y-6 relative">
      {saving && <LoadingOverlay message="Salvando alterações..." />}

      <div className="flex items-center gap-3 text-gray-800">
        <User2 size={24} />
        <h2 className="text-2xl font-bold">Perfil do Usuário</h2>
      </div>

      <div className="space-y-4">
        <InputField icon={<User2 size={18} />} label="Nome" name="name" value={user.name} editable={editing} onChange={handleChange} />
        <InputField icon={<Mail size={18} />} label="Email" name="email" value={user.email} editable={editing} onChange={handleChange} />
        <InputField icon={<Phone size={18} />} label="Telefone" name="phone" value={user.phone} editable={editing} onChange={handleChange} />
        <InputField icon={<MapPin size={18} />} label="Acesso" name="access" value={user.access} editable={editing} onChange={handleChange} />
        <InputField icon={<FileText size={18} />} label="Imagem URL" name="image" value={user.image} editable={editing} onChange={handleChange} />
        <InputField icon={<FileText size={18} />} label="Senha (criptografada)" name="password" value={user.password} editable={editing} onChange={handleChange} />
      </div>

      <div className="flex justify-end gap-4">
        {editing ? (
          <>
            <button onClick={() => setEditing(false)} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100">Cancelar</button>
            <button onClick={handleSave} className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 flex items-center gap-2">
              {saving && <Loader2 className="animate-spin w-5 h-5" />}
              Salvar
            </button>
          </>
        ) : (
          <button onClick={() => setEditing(true)} className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">Editar Perfil</button>
        )}
      </div>

      {success && <p className="text-green-600 mt-2">{success}</p>}
    </div>
  )
}

// ======================
// InputField
// ======================
function InputField({ icon, label, name, value, editable, onChange }: { icon: React.ReactNode; label: string; name: string; value: string; editable: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50">
        <div className="mr-2 text-gray-500">{icon}</div>
        {editable ? (
          <input type="text" name={name} value={value} onChange={onChange} className="w-full bg-transparent outline-none text-gray-800" />
        ) : (
          <span className="text-gray-700">{value}</span>
        )}
      </div>
    </div>
  )
}

// ======================
// LoadingOverlay
// ======================
function LoadingOverlay({ message }: { message: string }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 rounded-xl">
      <Loader2 className="animate-spin w-10 h-10 text-white mb-2" />
      <div className="text-white font-medium">{message}</div>
    </div>
  )
}
