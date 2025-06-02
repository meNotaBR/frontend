'use client'

import TypingLogoAnimation from '@/app/loading'
import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Startup } from '@/app/types/startup'

interface Projeto {
  id: number
  nome: string
  descricao: string
  dataPrevistaInicio: string
  dataPrevistaEntrega: string
  status: string
  upvotes: number
  isLiked: boolean
  dataCadastro: string
  isPelando: boolean
  startup: Startup
}

type Props = {}

const page = (props: Props) => {
  const params = useParams();
  const id = params.id;
  const [projeto, setProjeto] = useState<Projeto>();

  const fetchProjeto = async () => {
    const json = await fetch(`http://localhost:8080/api/projeto/${id}`);
    const projeto: Projeto = await json.json();
    setProjeto(projeto);
  }

  useEffect(() => {
    if(id){
      fetchProjeto();
    }
  }, [id])
  
  return (
    <>
      <Header />
      {projeto ? (
        <div className="container mx-auto py-10">
          <div className="mb-6">
            <Button variant="outline" asChild>
              <Link href={`/startup/${projeto.startup.id}`}>
                ← Voltar para {projeto.startup.nomeFantasia}
              </Link>
            </Button>
          </div>
          <ProjectCard projeto={projeto}/>
        </div>
      ) : (
        <TypingLogoAnimation />
      )}
    </>
  )
}

export default page