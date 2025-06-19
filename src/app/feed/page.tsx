import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import ProjectsCarousel from '@/components/ProjectsCarousel'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'
import getCookie from '../actions/get-cookie-action'
import { Projeto } from '../types/projeto'
import getBaseUrl from '../actions/get-baseurl'
import ProjetoCarrossel from '../types/projeto-carrossel'

type Props = {}

const page = async (props: Props) => {

    const token = await getCookie('token');


    var forYouProjects: Response
    var carrosselProjects: Response

    if (token) {
        forYouProjects = await fetch(`${await getBaseUrl()}/api/projeto/list`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        carrosselProjects = await fetch(`${await getBaseUrl()}/api/projeto/carrossel`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } else {
        forYouProjects = await fetch(`${await getBaseUrl()}/api/projeto/list`, {
            method: 'GET'
        })

        carrosselProjects = await fetch(`${await getBaseUrl()}/api/projeto/carrossel`, {
            method: 'GET'
        })
    }

    const projects: Projeto[] = await forYouProjects.json();
    const projetos: ProjetoCarrossel[] = await carrosselProjects.json();

    let projetosGeral: Projeto[] = projects.sort((projeto1, projeto2) => {
        if (projeto1.upvotes < projeto2.upvotes) return 1;
        if (projeto1.upvotes > projeto2.upvotes) return -1;
        return 0;
    });

    var lastProjects: Response

    if (token) {
        lastProjects = await fetch(`${await getBaseUrl()}/api/projeto/recentes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } else {
        lastProjects = await fetch(`${await getBaseUrl()}/api/projeto/recentes`, {
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

        <ProjectsCarousel label='Projetos mais engajados no MeNota' projetos={projetos} />

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