'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { setCookie } from 'cookies-next';

type Props = {}

const page = (props: Props) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setEmail(event.target.value);
    }

    const onChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setPassword(event.target.value);
    }

        const postLogin = async () => {

            const user: UserLogin ={
                email: email,
                senha: password
            }

            try {
              const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
              });
        
              const data = await response.json();
              
              if (!response.ok) {
                throw new Error(data.message || 'Erro ao efetuar login');
              }
        

              localStorage.setItem('token', data.token);
              localStorage.setItem('userType', data.accountType)

              setCookie('token', data.token, {
                maxAge: 7200,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
              });
        
              router.push('/feed');
              return data;
            } catch (error) {
              throw error;
            }
          }

    const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            toast.promise(postLogin(), {
                loading: "Efetuando Login... Por favor, aguarde",
                success: <b>Login efetuado com sucesso!</b>,
                error: (error: any) => {
                    return error.message || "Erro ao efetuar login. \n Usuário ou Senha incorretos!"
                },
                position: 'top-left'
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (<>
        <div className='flex justify-center items-center'>
            <div className='grid grid-cols-1 gap-8'>


                <div className='mb-20 mt-5'>
                    <img src="/menota.svg" alt="" />
                </div>

                <Label className='flex justify-center font-serif' style={{ fontSize: '35px' }}>Faça seu Login</Label>

                <Input type='email' placeholder='Email' className='h-11 rounded-2xl' onChange={onChangeEmail} />
                <Input type='password' placeholder='Senha' className='h-11 rounded-2xl' onChange={onChangePass} />

                <Label className='underline'>Esqueceu sua senha ?</Label>

                {email && password ? (
                    <div className='mt-10 flex justify-center'>
                        <Button className='w-50 font-bold h-15 rounded-2xl text-lg' onClick={handleLogin}>Entrar</Button>
                    </div>
                ) : (
                    <div className='mt-10 flex justify-center'>
                        <Button disabled className='w-50 font-bold h-15 rounded-2xl text-lg' onClick={handleLogin}>Entrar</Button>
                    </div>
                )}
            </div>
        </div>


    </>)
}

export default page