"use client"

import type React from "react"

import TypingLogoAnimation from "@/app/loading"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Building2, ThumbsUp, Calendar, Plus, Package } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Startup {
  id: number
  nomeFantasia: string
  cnpj: string
  dataCadastro: string
  profileImage: string | null
}

interface Entregavel {
  id?: number
  nome: string
  descricao: string
  dataInicio?: string
  dataPrevistaInicio: string
  dataEntrega?: string
  dataPrevistaEntrega: string
  status: string
  projeto: {
    id: number
  }
}

interface Projeto {
  id: number
  nome: string
  dataPrevistaInicio: string
  dataPrevistaEntrega: string
  dataCadastro: string
  isPelando: boolean
  status: string | null
  descricao: string
  startup: Startup
  upvotes: number
  isLiked: boolean
  entregaveis?: Entregavel[]
}

const statusOptions = [
  { value: "PENDENTE", label: "Pendente" },
  { value: "EM_ANDAMENTO", label: "Em Andamento" },
  { value: "CONCLUIDO", label: "Concluído" },
  { value: "ATRASADO", label: "Atrasado" },
  { value: "CANCELADO", label: "Cancelado" },
]

const ProjetoDetalhesPage = () => {
  const params = useParams()
  const router = useRouter()
  const id = params.id

  const [projeto, setProjeto] = useState<Projeto>()
  const [loading, setLoading] = useState<boolean>(true)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [upvotes, setUpvotes] = useState<number>(0)
  const [entregaveis, setEntregaveis] = useState<Entregavel[]>([])

  const fetchProjeto = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:8080/api/projeto/${id}`)

      if (!response.ok) {
        throw new Error("Falha ao carregar o projeto")
      }

      const data: Projeto = await response.json()
      setProjeto(data)
      setIsLiked(data.isLiked)
      setUpvotes(data.upvotes)

      // Se o projeto já vier com os entregáveis, usamos eles diretamente
      if (data.entregaveis) {
        setEntregaveis(data.entregaveis)
      }
    } catch (error) {
      console.error("Erro ao buscar projeto:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchProjeto()
    }
  }, [id])

  // Função para formatar datas
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Não definido"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  // Função para formatar CNPJ
  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
  }

  // Função para determinar o status do projeto
  const getStatusBadge = (projeto: Projeto) => {
    if (projeto.status) {
      return <Badge>{projeto.status}</Badge>
    }

    if (projeto.isPelando) {
      return <Badge variant="destructive">Pelando</Badge>
    }

    return <Badge variant="outline">Em andamento</Badge>
  }

  // Função para obter a badge de status do entregável
  const getEntregavelStatusBadge = (status: string) => {
    switch (status) {
      case "PENDENTE":
        return <Badge variant="outline">Pendente</Badge>
      case "EM_ANDAMENTO":
        return <Badge variant="secondary">Em Andamento</Badge>
      case "CONCLUIDO":
        return (
          <Badge variant="success" className="bg-green-500 hover:bg-green-600 text-white">
            Concluído
          </Badge>
        )
      case "ATRASADO":
        return <Badge variant="destructive">Atrasado</Badge>
      case "CANCELADO":
        return (
          <Badge variant="destructive" className="bg-gray-500 hover:bg-gray-600">
            Cancelado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleLike = () => {
    // Aqui você implementaria a chamada à API para dar like/unlike
    setIsLiked(!isLiked)
    setUpvotes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleVoltar = () => {
    router.back()
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <TypingLogoAnimation />
        </div>
      </>
    )
  }

  if (!projeto) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-12 text-center">
          <h2 className="text-2xl font-bold">Projeto não encontrado</h2>
          <p className="text-muted-foreground mt-2">O projeto que você está procurando não existe ou foi removido.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto py-6 px-4">
          <Card className="w-full mb-6">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl md:text-3xl font-bold">{projeto.nome}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    {getStatusBadge(projeto)}
                    <span className="text-sm text-muted-foreground">
                      Cadastrado em {formatDate(projeto.dataCadastro)}
                    </span>
                  </CardDescription>
                </div>
                <Button
                  variant={isLiked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{upvotes}</span>
                </Button>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações do Projeto</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Data Prevista de Início:</span>
                      <span className="text-sm">{formatDate(projeto.dataPrevistaInicio)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Data Prevista de Entrega:</span>
                      <span className="text-sm">{formatDate(projeto.dataPrevistaEntrega)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Startup</h3>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={projeto.startup.profileImage || ""} alt={projeto.startup.nomeFantasia} />
                      <AvatarFallback className="bg-primary/10">
                        {projeto.startup.nomeFantasia.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{projeto.startup.nomeFantasia}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        <span>{formatCNPJ(projeto.startup.cnpj)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Descrição</h3>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="whitespace-pre-wrap">{projeto.descricao}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={handleVoltar}>
                Voltar
              </Button>
              <Button>Entrar em Contato</Button>
            </CardFooter>
          </Card>

          {/* Seção de Entregáveis */}
          <Card className="w-full">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Entregáveis
                  </CardTitle>
                  <CardDescription>Lista de entregáveis e marcos do projeto</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {entregaveis && entregaveis.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Início Previsto</TableHead>
                      <TableHead>Entrega Prevista</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entregaveis.map((entregavel) => (
                      <TableRow key={entregavel.id}>
                        <TableCell className="font-medium">{entregavel.nome}</TableCell>
                        <TableCell>{formatDate(entregavel.dataPrevistaInicio)}</TableCell>
                        <TableCell>{formatDate(entregavel.dataPrevistaEntrega)}</TableCell>
                        <TableCell>{getEntregavelStatusBadge(entregavel.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nenhum entregável cadastrado para este projeto.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}

export default ProjetoDetalhesPage
