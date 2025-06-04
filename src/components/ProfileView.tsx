'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import { Pencil, Loader2 } from "lucide-react"
import UserProfile from "@/app/types/user-profile"
import { format, parseISO } from "date-fns"
import { ProfileForm } from "./ProfileForm"
import { ptBR } from "date-fns/locale"

interface ProfileViewProps {
  profile?: UserProfile
  onEdit: (formData: FormData) => void
}

export function ProfileView({ profile, onEdit }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false)

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">Carregando informações...</p>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Editar Perfil</h3>
          <Button variant="ghost" onClick={() => setIsEditing(false)}>
            Cancelar
          </Button>
        </div>
        <ProfileForm 
          initialData={profile} 
          onSubmit={(data) => {
            onEdit(data)
            setIsEditing(false)
          }}
        />
      </div>
    )
  }

  const formatUserType = (type: string) => {
    switch (type) {
      case 'EMPRESARIO':
        return 'Empresário';
      case 'INVESTIDOR':
        return 'Investidor';
      default:
        return type;
    }
  }

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Informações do Perfil</h3>
          <p className="text-sm text-muted-foreground">{formatUserType(profile.userType)}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Nome Completo</label>
          <p className="mt-1">{profile.nome} {profile.sobrenome}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Data de Nascimento</label>
          <p className="mt-1">{format(parseISO(profile.dataNasc), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Email</label>
          <p className="mt-1">{profile.email}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Celular</label>
          <p className="mt-1">{formatPhoneNumber(profile.numeroCelular)}</p>
        </div>
      </div>
    </div>
  )
} 