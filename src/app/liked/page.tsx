import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import { Label } from '@/components/ui/label'
import React from 'react'

type Props = {}

const page = async (props: Props) => {

    const json = await fetch('http://localhost:8080/api/projeto/list')
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