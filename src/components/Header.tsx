"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Menu, Plus } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Label } from './ui/label'
import { Input } from './ui/input'
import DatePicker from './DatePicker'


type Props = {}

const Header = (props: Props) => {

    const [dateInicio, setDateInicio] = useState<Date>();
    const [dateEntrega, setDateEntrega] = useState<Date>();

    return (
        <header className="flex items-center justify-between px-4 py-3 relative">
            <div className="flex items-center">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white">
                        <Menu style={{ height: '30px', width: '30px' }} />
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
                        Meus projetos
                    </Button>

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            <img src="menota.svg" alt="" className='w-[150px]' />
            </div>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-black/20">
                        <Plus style={{ height: '30px', width: '30px' }} />
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
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </header>
    )
}

export default Header