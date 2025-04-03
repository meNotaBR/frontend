'use client'

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { FolderOpenDot, Menu, Plus, Search, Star } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Label } from './ui/label'
import { Input } from './ui/input'
import DatePicker from './DatePicker'
import { ModeToggle } from './ModeToggle'
import { useTheme } from 'next-themes'
import SonnerToast from './SonnerToast'
import { headers } from 'next/headers'
import { isMobile } from '@/hooks/user-agent'
import Link from 'next/link'


type Props = {}

const Header = (props: Props) => {

    const theme = useTheme();

    const [dateInicio, setDateInicio] = useState<Date>();
    const [dateEntrega, setDateEntrega] = useState<Date>();

    const [width, setWidth] = useState<number>(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;

    return (
        <header className="flex items-center justify-between px-4 py-3 relative" >
            <div className="flex items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white">
                            <Menu color={theme.theme === 'light' ? 'black' : 'white'} style={{ height: '30px', width: '30px' }} />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left' className='container mx-auto px-4'>
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <SheetDescription>
                                Encontre o que você procura por aqui
                            </SheetDescription>
                        </SheetHeader>

                        <Button variant='outline'>
                            <Link href='projetos' className='flex justify-between gap-2' ><FolderOpenDot className='mt-[2px]'/>Meus projetos</Link>
                        </Button>

                        {!isMobile ? (<div className='grid grid-cols-1 gap-4'>
                            <Button variant={'outline'} >
                                <Link href='/search' className='flex justify-between gap-2'><Search className='mt-[2px]'/>Pesquisar Projetos</Link>
                            </Button>
                            <Button variant='outline'>
                                <Link href='/liked' className='flex justify-between gap-2'><Star className='mt-[2px]'/> Projetos que você curtiu</Link>
                            </Button>
                        </div>) : ("")}

                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Save changes</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>

                <Link href='/feed'><img src="menota.svg" alt="" className='w-[150px] not-dark:invert not-dark:brightness-200' /></Link>
            </div>

            <div className="flex items-center">

                <ModeToggle />

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-black/20">
                            <Plus color={theme.theme === 'light' ? 'black' : 'white'} style={{ height: '30px', width: '30px' }} />
                            <span className="sr-only">Add new</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='right' className='container mx-auto px-4'>
                        <SheetHeader>
                            <SheetTitle>Criar Projeto</SheetTitle>
                            <SheetDescription>
                                Cadastre seu novo projeto na plataforma.
                            </SheetDescription>
                        </SheetHeader>

                        <Label>Título do Projeto</Label>
                        <Input placeholder='Título' />

                        <DatePicker label='Data Prevista de Inicio' setDate={setDateInicio} />
                        <DatePicker label='Data Prevista de Entrega' setDate={setDateEntrega} />

                        <SheetFooter>
                            <SheetClose asChild>
                                <SonnerToast actionTitle='Desfazer' title='Projeto criado com sucesso' description='Data de Inicio: 02/04/2025' variant='default' onClick={() => { console.log("a") }}></SonnerToast>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

export default Header