'use client'

import React, { useState } from 'react'
import login from '../actions/login-action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components/LoginForm'

type Props = {}

const page = (props: Props) => {

    const router = useRouter();

    const handlelogin = async (formData: FormData) => {

        toast.promise(login(formData), {
            loading: 'Efeutando seu login...',
            success: () => {
                router.push('/feed');

                return <b>login efetuado com successo!</b>
            },
            error: 'Erro ao efetuar seu login.',
            position: 'top-left'
        });
    }

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
        <div className="lg:flex hidden items-center justify-center min-h-[300px] w-full">
          <img src="/menota.svg" alt="Image" className="max-w-full max-h-full object-contain" />
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm action={handlelogin}/>
            </div>
          </div>
        </div>
      </div>
    )
}

export default page