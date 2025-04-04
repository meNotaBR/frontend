"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Bell, Check, ExternalLink, FolderOpenDot, Menu, Plus, Search, Star, X } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Label } from './ui/label'
import { Input } from './ui/input'
import DatePicker from './DatePicker'
import { ModeToggle } from './ModeToggle'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import { ScrollArea } from './ui/scroll-area'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { checkAgent } from '@/hooks/is-mobile'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import Link from 'next/link'


type Props = {}

const Header = (props: Props) => {

    const initialNotifications = [
        {
            id: 1,
            title: "Alguém engajou o seu projeto",
            description: "Você recebeu um engajamento de Fulano.",
            time: "Agora mesmo",
            read: false,
        },
        {
            id: 2,
            title: "Alguém engajou o seu projeto",
            description: "Uma nova versão do sistema está disponível.",
            time: "5 minutos atrás",
            read: false,
        },
        {
            id: 3,
            title: "Lembrete de reunião",
            description: "Reunião com a equipe às 15:00.",
            time: "30 minutos atrás",
            read: false,
        },
        {
            id: 4,
            title: "Pagamento confirmado",
            description: "Seu pagamento foi processado com sucesso.",
            time: "2 horas atrás",
            read: true,
        },
        {
            id: 5,
            title: "Novo seguidor",
            description: "Maria começou a seguir seu perfil.",
            time: "1 dia atrás",
            read: true,
        },
    ]

    const [notifications, setNotifications] = useState(initialNotifications)
    const unreadCount = notifications.filter((notification) => !notification.read).length
    const [open, setOpen] = useState(false)

    const markAllAsRead = () => {
        setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    }

    const markAsRead = (id: number) => {
        setNotifications(
            notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
        )
    }

    const deleteNotification = (id: number) => {
        setNotifications(notifications.filter((notification) => notification.id !== id))
    }

    const theme = useTheme();

    const [dateInicio, setDateInicio] = useState<Date>();
    const [dateEntrega, setDateEntrega] = useState<Date>();

    const [agent, setAgent] = useState<boolean>();

    const checkUserAgent = async () =>
        setAgent(await checkAgent());


    useEffect(() => {
        checkUserAgent();
    }, [])

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
                            <Link href='/projetos'className='flex justify-between gap-2' ><FolderOpenDot className='mt-[2px]' /> Meus projetos</Link>
                        </Button>

                        {!agent ? (<div className='grid grid-cols-1 gap-4'>
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

                {agent ? '' : (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild className='ml-1'>
                            <Button variant="outline" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                        {unreadCount}
                                    </span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0 md:w-96" align="end">
                            <Card className="border-0 shadow-none">
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">Notificações</CardTitle>
                                        <CardDescription>{unreadCount} não lidas</CardDescription>
                                    </div>
                                </CardHeader>
                                <ScrollArea className="h-[300px]">
                                    {notifications.length > 0 ? (
                                        <div className="px-4">
                                            {notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={`border-b py-3 ${!notification.read ? "border-l-4 border-l-primary pl-3" : ""}`}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <h4 className="text-sm font-medium">{notification.title}</h4>
                                                                <p className="text-xs text-muted-foreground">{notification.time}</p>
                                                            </div>
                                                            <p className="mt-1 text-xs">{notification.description}</p>
                                                        </div>
                                                        <div className="ml-2 flex flex-col space-y-1">
                                                            {!notification.read && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-6 w-6"
                                                                    onClick={() => markAsRead(notification.id)}
                                                                >
                                                                    <Check className="h-3 w-3" />
                                                                    <span className="sr-only">Marcar como lida</span>
                                                                </Button>
                                                            )}
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6"
                                                                onClick={() => deleteNotification(notification.id)}
                                                            >
                                                                <X className="h-3 w-3" />
                                                                <span className="sr-only">Remover</span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex h-40 items-center justify-center">
                                            <p className="text-sm text-muted-foreground">Nenhuma notificação disponível</p>
                                        </div>
                                    )}
                                </ScrollArea>
                                <CardFooter className="flex items-center justify-between p-4 pt-2">
                                    <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
                                        Marcar todas como lidas
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setOpen(false)} className="flex items-center gap-1">
                                        <span>Ver todas</span>
                                        <ExternalLink className="h-3 w-3" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </PopoverContent>
                    </Popover>
                )}

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
                                <Button
                                    type="submit"
                                    variant='default'
                                    onClick={() =>
                                        toast('Projeto criado com sucesso', {
                                            description: 'Data de Inicio: 02/04/2025',
                                            action: {
                                                label: 'Desfazer',
                                                onClick: () => { console.log("a") },
                                            },
                                            position: 'top-left'
                                        })
                                    }
                                >
                                    Show Toast
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

export default Header