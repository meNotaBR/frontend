"use client"

import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import ProjectsCarousel from '@/components/ProjectsCarousel'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'

type Props = {}

const page = (props: Props) => {

    const projetos = [
        { nome: "Projeto 1", img: 'https://brandingforthepeople.com/wp-content/uploads/2019/04/Stock-Photography-vs-Real-Imagery.jpg', descricao: "Detalhes do projeto Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
        { nome: "Projeto 2", img: 'https://brandingforthepeople.com/wp-content/uploads/2019/04/Stock-Photography-vs-Real-Imagery.jpg', descricao: "Detalhes do projeto Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
        { nome: "Projeto 3", img: 'https://brandingforthepeople.com/wp-content/uploads/2019/04/Stock-Photography-vs-Real-Imagery.jpg', descricao: "Detalhes do projeto Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
        { nome: "Projeto 4", img: 'https://brandingforthepeople.com/wp-content/uploads/2019/04/Stock-Photography-vs-Real-Imagery.jpg', descricao: "Detalhes do projeto Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
        { nome: "Projeto 5", img: 'https://brandingforthepeople.com/wp-content/uploads/2019/04/Stock-Photography-vs-Real-Imagery.jpg', descricao: "Detalhes do projeto Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
    ]

    return (<>
        <Header />

        <ProjectsCarousel label='Projetos que mais subiram essa semana' projetos={projetos} />

        <Label className='mb-4 text-3xl'>Feed</Label>
        <div className='w-full'>

            <Tabs defaultValue='Para Você'>
                <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='Para Você' >Para Você</TabsTrigger>
                    <TabsTrigger value='Últimos Projetos' >Últimos Projetos</TabsTrigger>
                </TabsList>
                <TabsContent value='Para Você' className='grid lg:grid-cols-3 md:grid-cols-2 gap-4' >
                    {projetos.map((projeto, index) => (
                        <ProjectCard projeto={projeto} key={index} />
                    ))}
                </TabsContent>
                <TabsContent value='Últimos Projetos' className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
                    {projetos.map((projeto, index) => (
                        <ProjectCard projeto={projeto} key={index} />
                    ))}
                </TabsContent>
            </Tabs>

        </div>

    </>)
}

export default page