import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (<>
        <div className='flex justify-center items-center'>
            <div className='grid grid-cols-1 gap-8'>

                
                <div className='mb-20 mt-5'>
                    <img src="/menota.svg" alt="" />
                </div>
                
                <Label className='flex justify-center font-serif' style={{ fontSize: '35px' }}>Faça seu Login</Label>

                <Input type='email' placeholder='Email' className='h-11 rounded-2xl'/>
                <Input type='password' placeholder='Senha' className='h-11 rounded-2xl' />

                <Label className='underline'>Esqueceu sua senha ?</Label>

                <div className='mt-10 flex justify-center'>
                    <Button className='w-50 font-bold h-15 rounded-2xl text-lg'>Entrar</Button>
                </div>
            </div>
        </div>


    </>)
}

export default page