import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import { Label } from '@/components/ui/label'
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

    <Label className='sm:text-4xl lg:text-3xl mb-4'>Projetos que você curtiu</Label>
    
    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
        {projetos.map((projeto, index) => (
            <ProjectCard projeto={projeto} key={index} />
        ))}
    </div>
    
    </>)
}

export default page