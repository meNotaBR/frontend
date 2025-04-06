'use client'

import TypingLogoAnimation from '@/app/loading'
import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {}

const page =  (props: Props) => {

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

      {projeto ? ( <ProjectCard projeto={projeto}/>) : (<TypingLogoAnimation />)}
    </>
  )
}

export default page