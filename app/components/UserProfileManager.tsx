'use client'

import { useState } from 'react'
import { User2, Mail, Phone, MapPin, FileText, Save } from 'lucide-react'

interface User {
  name: string
  email: string
  phone: string
  address: string
  bio: string
}

const initialUser: User = {
  name: 'Lucas Andrade',
  email: 'lucas.andrade@empresa.com',
  phone: '+55 (11) 91234-5678',
  address: 'Rua Exemplo, 123 - São Paulo, SP',
  bio: 'Desenvolvedor Front-End apaixonado por UI moderna e boas práticas de código.',
}

export default function UserProfileManager() {
  const [user, setUser] = useState<User>(initialUser)
  const [editing, setEditing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Simula salvar (em backend ou localStorage)
    setEditing(false)
    console.log('Usuário salvo:', user)
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 text-gray-800">
        <User2 size={24} />
        <h2 className="text-2xl font-bold">Perfil do Usuário</h2>
      </div>

      <div className="space-y-4">
        {/* Nome */}
        <InputField
          icon={<User2 size={18} />}
          label="Nome"
          name="name"
          value={user.name}
          editable={editing}
          onChange={handleChange}
        />

        {/* Email */}
        <InputField
          icon={<Mail size={18} />}
          label="Email"
          name="email"
          value={user.email}
          editable={editing}
          onChange={handleChange}
        />

        {/* Telefone */}
        <InputField
          icon={<Phone size={18} />}
          label="Telefone"
          name="phone"
          value={user.phone}
          editable={editing}
          onChange={handleChange}
        />

        {/* Endereço */}
        <InputField
          icon={<MapPin size={18} />}
          label="Endereço"
          name="address"
          value={user.address}
          editable={editing}
          onChange={handleChange}
        />

        {/* Bio */}
        <TextareaField
          icon={<FileText size={18} />}
          label="Bio"
          name="bio"
          value={user.bio}
          editable={editing}
          onChange={handleChange}
        />
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-4">
        {editing ? (
          <>
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 flex items-center gap-2"
            >
              <Save size={16} />
              Salvar
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            Editar Perfil
          </button>
        )}
      </div>
    </div>
  )
}

// Campo de entrada com ícone
function InputField({
  icon,
  label,
  name,
  value,
  editable,
  onChange,
}: {
  icon: React.ReactNode
  label: string
  name: string
  value: string
  editable: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50">
        <div className="mr-2 text-gray-500">{icon}</div>
        {editable ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent outline-none text-gray-800"
          />
        ) : (
          <span className="text-gray-700">{value}</span>
        )}
      </div>
    </div>
  )
}

// Campo de texto com ícone
function TextareaField({
  icon,
  label,
  name,
  value,
  editable,
  onChange,
}: {
  icon: React.ReactNode
  label: string
  name: string
  value: string
  editable: boolean
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <div className="flex items-start border rounded-md px-3 py-2 bg-gray-50">
        <div className="mr-2 mt-1 text-gray-500">{icon}</div>
        {editable ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent outline-none text-gray-800 resize-none"
            rows={3}
          />
        ) : (
          <p className="text-gray-700">{value}</p>
        )}
      </div>
    </div>
  )
}
