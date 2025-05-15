'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Startup } from "@/app/types/startup"
import Header from "@/components/Header"

export default function StartupsPage() {
  const [startups, setStartups] = useState<Startup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/startup/list')
        if (response.ok) {
          const data = await response.json()
          setStartups(data)
        } else {
          throw new Error('Erro ao buscar startups')
        }
      } catch (error) {
        console.error('Erro:', error)
        setError('Não foi possível carregar as startups. Tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchStartups()
  }, [])

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

  if (error) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-10">
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-red-500 mb-4">{error}</p>
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
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Startups</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((startup) => (
            <Card key={startup.id}>
              <CardHeader>
                <CardTitle>{startup.nomeFantasia}</CardTitle>
                <CardDescription>{startup.cnpj}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {startup.localizacao ? 
                      `${startup.localizacao.cidade}, ${startup.localizacao.estado}` :
                      'Localização não informada'
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Criada em: {new Date(startup.dataCriacao).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/startup/${startup.id}`}>
                    Ver Detalhes
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
} 