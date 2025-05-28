'use client'

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { cn } from "@/lib/utils"
import { format, isAfter, isBefore, parseISO, subYears } from "date-fns"
import { toast } from "sonner"
import UserProfile from "@/app/types/user-profile"
import DatePicker from "./DatePicker"

type ProfileFormData = Pick<UserProfile, 'nome' | 'sobrenome' | 'dataNasc' | 'email' | 'numeroCelular'>;

interface ProfileFormProps extends Omit<React.ComponentPropsWithoutRef<"form">, 'onSubmit'> {
  initialData?: UserProfile;
  onSubmit?: (data: FormData) => void;
}

export function ProfileForm({
  className,
  initialData,
  onSubmit,
  ...props
}: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    nome: '',
    sobrenome: '',
    dataNasc: '',
    email: '',
    numeroCelular: ''
  });

  useEffect(() => {
    if (initialData) {
      const formattedPhone = initialData.numeroCelular.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      setFormData({
        ...initialData,
        numeroCelular: formattedPhone
      });
    }
  }, [initialData]);

  const validateForm = () => {
    if (formData.nome.length < 3) {
      toast.error('Nome deve ter no mínimo 3 caracteres');
      return false;
    }

    if (formData.sobrenome.length < 3) {
      toast.error('Sobrenome deve ter no mínimo 3 caracteres');
      return false;
    }

    const birthDate = parseISO(formData.dataNasc);
    const minAge = subYears(new Date(), 18);
    
    if (isAfter(birthDate, minAge)) {
      toast.error('Você deve ter no mínimo 18 anos');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Email inválido');
      return false;
    }

    const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
    if (!phoneRegex.test(formData.numeroCelular)) {
      toast.error('Número de celular inválido. Use o formato (99) 99999-9999');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    onSubmit?.(formDataObj);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
      setFormData(prev => ({ ...prev, numeroCelular: value }));
    }
  };

  return (
    <form className={cn("grid gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="grid gap-2">
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          value={formData.nome}
          onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
          className="rounded-md"
          placeholder="Seu nome"
          required
          minLength={3}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="sobrenome">Sobrenome</Label>
        <Input
          id="sobrenome"
          value={formData.sobrenome}
          onChange={(e) => setFormData(prev => ({ ...prev, sobrenome: e.target.value }))}
          className="rounded-md"
          placeholder="Seu sobrenome"
          required
          minLength={3}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="dataNasc">Data de Nascimento</Label>
        <DatePicker
          label="Data de Nascimento"
          setDate={(date) => {
            if (date) {
              setFormData(prev => ({ ...prev, dataNasc: format(date, 'yyyy-MM-dd') }))
            }
          }}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="rounded-md"
          placeholder="seu-email@exemplo.com"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="numeroCelular">Número de Celular</Label>
        <Input
          id="numeroCelular"
          value={formData.numeroCelular}
          onChange={handlePhoneChange}
          className="rounded-md"
          placeholder="(99) 99999-9999"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Salvar Alterações
      </Button>
    </form>
  );
} 