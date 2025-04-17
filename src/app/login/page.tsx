'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import login from '../actions/login-action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

    return (<>
        <div className='flex justify-center items-center'>
            <form
                action={handlelogin}
                className='grid grid-cols-1 gap-8'>

                <div className='mb-20 mt-5'>
                    <img src="/menota.svg" alt="" />
                </div>

                <Label className='flex justify-center font-serif' style={{ fontSize: '35px' }}>Faça seu Login</Label>

                <Input id='email' name='email' type='email' placeholder='Email' className='h-11 rounded-2xl' />
                <Input id='password' name='password' type='password' placeholder='Senha' className='h-11 rounded-2xl' />

                <div className='flex justify-between'>
                    <Link href={"/"} className='underline'>Esqueceu sua senha ?</Link>
                    <Link className='underline' href={"/cadastro"} >Não tem uma conta? Cadastre-se</Link>
                </div>

                <div className='mt-10 flex justify-center'>
                    <Button type='submit' className='w-50 font-bold h-15 rounded-2xl text-lg'>Entrar</Button>
                </div>
            </form>
        </div>
    </>)
}

export default page