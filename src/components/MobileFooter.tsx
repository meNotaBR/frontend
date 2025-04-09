'use client'

import { Bell, Bookmark, Check, Home, Mail, Search, Star, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { usePathname } from 'next/navigation'

type Props = {}

const MobileFooter = (props: Props) => {

    const pathname = usePathname();

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

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-black w-full py-3 px-4">
            <div className="flex justify-between items-center max-w-md mx-auto">
                <Link href="/feed" className="flex items-center justify-center text-blue-500">
                    <Home className="h-5 w-5" color={pathname === "/feed" ? '#892be2' : "white"}/>
                    <span className="sr-only">Home</span>
                </Link>
                <Link href="/search" className="flex items-center justify-center text-gray-400 hover:text-gray-300">
                    <Search className="h-5 w-5" color={pathname === "/search" ? '#892be2' : "white"} />
                    <span className="sr-only">Search</span>
                </Link>

                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell color='white' className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                    {unreadCount}
                                </span>
                            )}
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Notificações</DrawerTitle>
                            <DrawerDescription>Você tem {unreadCount} notificações não lidas.</DrawerDescription>
                        </DrawerHeader>
                        <ScrollArea className="h-[60vh] px-4">
                            {notifications.length > 0 ? (
                                <div className="space-y-4">
                                    {notifications.map((notification) => (
                                        <Card
                                            key={notification.id}
                                            className={notification.read ? "opacity-70" : "border-l-4 border-l-primary"}
                                        >
                                            <CardHeader className="p-4 pb-2">
                                                <div className="flex items-start justify-between">
                                                    <CardTitle className="text-base">{notification.title}</CardTitle>
                                                    <div className="flex space-x-1">
                                                        {!notification.read && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6"
                                                                onClick={() => markAsRead(notification.id)}
                                                            >
                                                                <Check className="h-4 w-4" />
                                                                <span className="sr-only">Marcar como lida</span>
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={() => deleteNotification(notification.id)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                            <span className="sr-only">Remover</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <CardDescription className="text-xs">{notification.time}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <p className="text-sm">{notification.description}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex h-40 items-center justify-center">
                                    <p className="text-muted-foreground">Nenhuma notificação disponível</p>
                                </div>
                            )}
                        </ScrollArea>
                        <DrawerFooter className="flex flex-row items-center justify-between">
                            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
                                Marcar todas como lidas
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Fechar</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
                <Link href="/liked" className="flex items-center justify-center text-gray-400 hover:text-gray-300">
                    <Star color={pathname === "/liked" ? '#892be2' : "white"} className="h-5 w-5" />
                    <span className="sr-only">Bookmarks</span>
                </Link>
            </div>
        </footer>
    )
}

export default MobileFooter