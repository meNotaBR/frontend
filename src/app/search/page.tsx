import Header from '@/components/Header'
import ProjectsCarousel from '@/components/ProjectsCarousel'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
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
        <div className='flex lg:w-250 lg:justify-self-center'>
            <Search className='mr-2 mt-1.5'/>
            <Input className='mb-4 rounded-3xl' placeholder='Pesquisar' />    
        </div>

        <ProjectsCarousel label='Queridinhos da plataforma' projetos={projetos}  />

        <ProjectsCarousel label='Pode despertar seu interesse' projetos={projetos}  />

    </>)
}

export default page