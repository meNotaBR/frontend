import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import ProjectsCarousel from '@/components/ProjectsCarousel'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'
import getCookie from '../actions/get-cookie-action'
import { Projeto } from '../types/projeto'

type Props = {}

const page = async (props: Props) => {

    const token = await getCookie('token');

    const projetos = [
        { nome: "Projeto 1", img: 'https://t4.ftcdn.net/jpg/03/00/14/39/360_F_300143961_8kJTPiTbWallCIBxO0GQzoxgwE9cIRGG.jpg', descricao: "Detalhes do projeto Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
        { nome: "Projeto 2", img: 'https://media.istockphoto.com/id/1395187689/photo/signing-contract-investor-and-contractor.jpg?s=612x612&w=0&k=20&c=SYD7JvzTDqcgz3i9eooa5PQY4650BIttb9batDCmE9Y=', descricao: "Detalhes do projeto Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
        { nome: "Projeto 3", img: 'https://t4.ftcdn.net/jpg/03/00/14/39/360_F_300143961_8kJTPiTbWallCIBxO0GQzoxgwE9cIRGG.jpg', descricao: "Detalhes do projeto Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
        { nome: "Projeto 4", img: 'https://t4.ftcdn.net/jpg/03/00/14/39/360_F_300143961_8kJTPiTbWallCIBxO0GQzoxgwE9cIRGG.jpg', descricao: "Detalhes do projeto Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
        { nome: "Projeto 5", img: 'https://t4.ftcdn.net/jpg/03/00/14/39/360_F_300143961_8kJTPiTbWallCIBxO0GQzoxgwE9cIRGG.jpg', descricao: "Detalhes do projeto Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", startup: { nome: 'empresa tal', descricao: 'descricao startup', empresario: 'nome empresario' } },
    ]

    var forYouProjects: Response

    if (token) {
        forYouProjects = await fetch(`${process.env.BASE_URL}/api/projeto/list`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } else {
        forYouProjects = await fetch(`${process.env.BASE_URL}/api/projeto/list`, {
            method: 'GET'
        })
    }

    const projects: Projeto[] = await forYouProjects.json();

    let projetosGeral: Projeto[] = projects.sort((projeto1, projeto2) => {
        if (projeto1.upvotes < projeto2.upvotes) return 1;
        if (projeto1.upvotes > projeto2.upvotes) return -1;
        return 0;
    });

    var lastProjects: Response

    if (token) {
        lastProjects = await fetch(`${process.env.BASE_URL}/api/projeto/recentes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } else {
        lastProjects = await fetch(`${process.env.BASE_URL}/api/projeto/recentes`, {
            method: 'GET'
        })
    }

    const recents: Projeto[] = await lastProjects.json();

    let projetosRecentes: Projeto[] = recents.sort((projeto1, projeto2) => {
        if (projeto1.upvotes < projeto2.upvotes) return 1;
        if (projeto1.upvotes > projeto2.upvotes) return -1;
        return 0;
    });

    return (<>
        <Header />

        <ProjectsCarousel label='Projetos que mais subiram essa semana' projetos={projetos} />

        <Label className='mb-4 text-3xl'>Feed</Label>
        <div className='w-full'>

            <Tabs defaultValue='Para Você'>
                <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='Para Você' className='hover:cursor-pointer' >Para Você</TabsTrigger>
                    <TabsTrigger value='Últimos Projetos' className='hover:cursor-pointer'>Últimos Projetos</TabsTrigger>
                </TabsList>
                <TabsContent value='Para Você' className='grid lg:grid-cols-3 md:grid-cols-2 gap-4' >
                    {projetosGeral.map((projeto, index) => (
                        <ProjectCard projeto={projeto} token={token ?? ""} key={index} />
                    ))}
                </TabsContent>
                <TabsContent value='Últimos Projetos' className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
                    {projetosRecentes.map((projeto, index) => (
                        <ProjectCard projeto={projeto} token={token ?? ""} key={index} />
                    ))}
                </TabsContent>
            </Tabs>

        </div>

    </>)
}

export default page