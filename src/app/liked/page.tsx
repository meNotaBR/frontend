import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import { Label } from '@/components/ui/label'
import { cookies } from 'next/headers'
import React from 'react'
import { Projeto } from '../types/projeto'
import getBaseUrl from '../actions/get-baseurl'

type Props = {}

const page = async (props: Props) => {

    const token = ((await cookies()).get('token'))?.value;

    const json = await fetch(`${await getBaseUrl()}/api/projeto/curtidos`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        }
    })
    const projects: Projeto[] = await json.json();

  return (<>
    
    <Header />

    <Label className='sm:text-4xl lg:text-3xl mb-4'>Projetos que você curtiu</Label>
    
    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
        {projects.map((projeto, index) => (
            <ProjectCard projeto={projeto} key={index} />
        ))}
    </div>
    
    </>)
}

export default page