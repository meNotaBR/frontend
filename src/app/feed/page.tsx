"use client"

import Header from '@/components/Header'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Label } from '@/components/ui/label'
import { ArrowUpFromLine, Share2 } from 'lucide-react'
import React from 'react'

type Props = {}

const page = (props: Props) => {

    const projetos = [
        { nome: "projeto 1", img: 'https://brandingforthepeople.com/wp-content/uploads/2019/04/Stock-Photography-vs-Real-Imagery.jpg', descricao: 'descricao', startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
        { nome: "projeto 2", img: 'https://brandingforthepeople.com/wp-content/uploads/2019/04/Stock-Photography-vs-Real-Imagery.jpg', descricao: 'descricao', startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
        { nome: "projeto 3", img: 'https://brandingforthepeople.com/wp-content/uploads/2019/04/Stock-Photography-vs-Real-Imagery.jpg', descricao: 'descricao', startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
        { nome: "projeto 4", img: 'https://brandingforthepeople.com/wp-content/uploads/2019/04/Stock-Photography-vs-Real-Imagery.jpg', descricao: 'descricao', startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
        { nome: "projeto 5", img: 'https://brandingforthepeople.com/wp-content/uploads/2019/04/Stock-Photography-vs-Real-Imagery.jpg', descricao: 'descricao', startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
    ]

    return (<>
        <Header />

        <div className='mb-8'>
            <Label className='lg:text-3xl sm:text-2xl mb-4 justify-center'>Projetos que mais subiram essa semana</Label>
            <Carousel className="w-full">
                <CarouselContent className=''>
                    {projetos.map((element, index) => (
                        <CarouselItem key={index} className="sm:bases-1/1 md:basis-1/2 lg:basis-1/3 ">
                            <Card className=''>
                                <CardContent >
                                    <img src={element.img} alt={element.nome} key={index} />
                                </CardContent>
                                <CardFooter className='flex justify-end' >
                                    <Label className='underline '>Ver mais</Label>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>

        <Label className='mb-4 text-3xl'>Projetos para você</Label>
        
        <div className='grid lg:grid-cols-3 md:grid-cols-2'>
            <Card className='mb-4 lg:mr-4'>
                <CardHeader className='flex'>
                    <Avatar>
                        <AvatarImage src='https://avatars.githubusercontent.com/u/113259173?v=4' alt='nome'/>
                        <AvatarFallback>JC</AvatarFallback>
                    </Avatar>
                    <Label className='mt-3'>Nome startup</Label>
                    <Badge className='mt-2 w-20 h-5'>2 dias atrás</Badge>
                </CardHeader>
                <CardContent>
                    <Label style={{ fontSize: '1.5em', marginBottom: '4px' }}>Nome do projeto</Label>
                    <Label>Detalhes do projeto Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Label>
                </CardContent>
                <CardFooter className='flex justify-between'>
                    <Button variant='secondary' className='rounded-2xl'>
                        <ArrowUpFromLine /> 70
                    </Button>
                    <Button variant='secondary' className='rounded-2x1'>
                        <Share2 /> Share
                    </Button>
                </CardFooter>
            </Card>

            <Card className='mb-4 lg:mr-4'>
                <CardHeader className='flex'>
                    <Avatar>
                        <AvatarImage src='https://avatars.githubusercontent.com/u/113259173?v=4' alt='nome'/>
                        <AvatarFallback>JC</AvatarFallback>
                    </Avatar>
                    <Label className='mt-3'>Nome startup</Label>
                    <Badge className='mt-2 w-20 h-5'>2 dias atrás</Badge>
                </CardHeader>
                <CardContent>
                    <Label style={{ fontSize: '1.5em', marginBottom: '4px' }}>Nome do projeto</Label>
                    <Label>Detalhes do projeto Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Label>
                </CardContent>
                <CardFooter className='flex justify-between'>
                    <Button variant='secondary' className='rounded-2xl'>
                        <ArrowUpFromLine /> 70
                    </Button>
                    <Button variant='secondary' className='rounded-2x1'>
                        <Share2 /> Share
                    </Button>
                </CardFooter>
            </Card>

            <Card className='mb-4 lg:mr-4'>
                <CardHeader className='flex'>
                    <Avatar>
                        <AvatarImage src='https://avatars.githubusercontent.com/u/113259173?v=4' alt='nome'/>
                        <AvatarFallback>JC</AvatarFallback>
                    </Avatar>
                    <Label className='mt-3'>Nome startup</Label>
                    <Badge className='mt-2 w-20 h-5'>2 dias atrás</Badge>
                </CardHeader>
                <CardContent>
                    <Label style={{ fontSize: '1.5em', marginBottom: '4px' }}>Nome do projeto</Label>
                    <Label>Detalhes do projeto Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Label>
                </CardContent>
                <CardFooter className='flex justify-between'>
                    <Button variant='secondary' className='rounded-2xl'>
                        <ArrowUpFromLine /> 70
                    </Button>
                    <Button variant='secondary' className='rounded-2x1'>
                        <Share2 /> Share
                    </Button>
                </CardFooter>
            </Card>
        </div>

    </>)
}

export default page