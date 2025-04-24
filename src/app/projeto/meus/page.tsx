import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard'
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus } from 'lucide-react';
import { cookies } from 'next/headers';
import React from 'react'

type Props = {}

const page = async (props: Props) => {

    const token = ((await cookies()).get('token'))?.value;

    const json = await fetch('http://localhost:8080/api/projeto/user', {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        }
    })
    const projects: Projeto[] = await json.json();

    return (<>

        <Header />

        <Label className='sm:text-4xl lg:text-3xl mb-4'>Seus projetos</Label>

        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>

            <Card className='items-center justify-center hover:border-primary/30 transition-all duration-300 max-h-[282px] cursor-pointer'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <CardContent >
                                <Plus className='w-30 h-30' />
                            </CardContent>        
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Criar novo projeto</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </Card>

            {projects.map((projeto, index) => (
                <ProjectCard projeto={projeto} key={index} token={token} />
            ))}
        </div>

    </>)
}

export default page