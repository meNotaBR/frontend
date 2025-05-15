'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Startup } from "@/app/types/startup"
import { Projeto } from "@/app/types/projeto"
import Header from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowUpFromLine, CalendarDays, MapPin } from "lucide-react"
import getCookie from '@/app/actions/get-cookie-action'

export default function StartupDetailsPage() {
  const params = useParams()
  const [startup, setStartup] = useState<Startup | null>(null)
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getCookie('token')
      setToken(token ?? '')
    }

    fetchToken()
  }, [])

  useEffect(() => {
    const fetchStartupAndProjects = async () => {
      if (!token) return

      try {
        // Busca detalhe da statup
        const startupResponse = await fetch('http://localhost:8080/api/startup/list', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (!startupResponse.ok) {
          throw new Error('Erro ao buscar detalhes da startup')
        }
        
        const startups = await startupResponse.json()
        const startupEncontrada = startups.find((s: Startup) => s.id === Number(params.id))
        
        if (!startupEncontrada) {
          throw new Error('Startup não encontrada')
        }
        
        setStartup(startupEncontrada)

        // Busca os projeto
        const projetosResponse = await fetch('http://localhost:8080/api/projeto/list', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (!projetosResponse.ok) {
          throw new Error('Erro ao buscar projetos')
        }
        
        const projetosData = await projetosResponse.json()
        console.log('Projetos recebidos:', projetosData) 
        
        // Filtrar os projetos desta startup
        const projetosDaStartup = projetosData.filter((projeto: Projeto) => {
          console.log('Comparando projeto:', projeto.startup.id, 'com startup:', Number(params.id)) 
          return projeto.startup.id === Number(params.id)
        })
        
        console.log('Projetos filtrados:', projetosDaStartup) 
        setProjetos(projetosDaStartup)
      } catch (error) {
        console.error('Erro:', error)
        setError('Não foi possível carregar os dados. Tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchStartupAndProjects()
    }
  }, [params.id, token])

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-10">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </>
    )
  }

  if (error || !startup) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-10">
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-red-500 mb-4">{error || 'Startup não encontrada'}</p>
            <Button onClick={() => window.location.reload()}>
              Tentar Novamente
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="outline" asChild className="mb-6">
            <Link href="/startup">
              ← Voltar para Startups
            </Link>
          </Button>
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={startup.profileImage} alt={startup.nomeFantasia} />
              <AvatarFallback className="text-2xl">{startup.nomeFantasia.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{startup.nomeFantasia}</h1>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                {startup.localizacao && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{startup.localizacao.cidade}, {startup.localizacao.estado}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>CNPJ: {startup.cnpj}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Projetos</h2>
          {projetos.length === 0 ? (
            <p className="text-muted-foreground">Nenhum projeto encontrado para esta startup.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projetos.map((projeto) => (
                <Card key={projeto.id} className="hover:border-primary/30 transition-all duration-300">
                  <CardHeader>
                    <CardTitle>{projeto.nome}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{projeto.descricao}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ArrowUpFromLine className="h-4 w-4" />
                        <span>{projeto.upvotes}</span>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href={`/projeto/${projeto.id}`}>
                          Ver Detalhes
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
} 