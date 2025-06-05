'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Startup } from "@/app/types/startup"
import Header from "@/components/Header"
import getCookie from '@/app/actions/get-cookie-action'

export default function StartupsPage() {
  const [startups, setStartups] = useState<Startup[]>([])
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string>('')

  const fetchToken = async () => {
    const token = await getCookie('token')
    setToken(token ?? '')
  }

  const fetchStartups = async () => {
    if (!token) return

    try {
      const response = await fetch(`${process.env.BASE_URL}/api/startup/list`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setStartups(data)
      } else {
        throw new Error('Erro ao buscar startups')
      }
    } catch (error) {
      setError('Não foi possível carregar as startups. Tente novamente mais tarde.')
    }
  }

  useEffect(() => {
    fetchToken()
    if (token) {
      fetchStartups()
    }
  }, [token])

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