'use client'

import { ProfileForm } from "@/components/ProfileForm"
import { getProfile, updateProfile } from "../actions/profile-actions"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import UserProfile from "../types/user-profile"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { User } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await getProfile()
      setProfile(data)
    } catch (error) {
      toast.error('Erro ao carregar perfil')
    }
  }

  const handleSubmit = (formData: FormData) => {
    toast.promise(updateProfile(formData), {
      loading: 'Atualizando perfil...',
      success: () => {
        loadProfile()
        setOpen(false)
        return 'Perfil atualizado com sucesso!'
      },
      error: 'Erro ao atualizar perfil'
    })
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Meu Perfil</DialogTitle>
          </DialogHeader>
          <ProfileForm 
            initialData={profile} 
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
} 