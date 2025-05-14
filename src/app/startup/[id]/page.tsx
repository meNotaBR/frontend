import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound } from "next/navigation"
import { Startup } from "@/app/types/startup"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building2, MapPin, CalendarDays, ThumbsUp } from "lucide-react"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: "Detalhes da Startup",
    description: "Informações detalhadas da startup e seus projetos",
  }
}

async function getStartup(id: string): Promise<Startup> {
  try {
    // Buscar a startup específica
    const startupResponse = await fetch(`http://localhost:8080/api/startup/list`, {
      cache: 'no-store'
    })
    
    if (!startupResponse.ok) {
      notFound()
    }
    
    const startups = await startupResponse.json()
    const startup = startups.find((s: Startup) => s.id === parseInt(id))
    
    if (!startup) {
      notFound()
    }

    // Buscar os projetos da startup
    const projetosResponse = await fetch(`http://localhost:8080/api/projeto/startup/${id}`, {
      cache: 'no-store'
    })

    if (projetosResponse.ok) {
      const projetos = await projetosResponse.json()
      startup.projetos = projetos
    } else {
      startup.projetos = []
    }
    
    return startup
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
    notFound()
  }
}

export default async function StartupDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const startup = await getStartup(params.id)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <Button variant="ghost" asChild className="mb-6 hover:bg-transparent">
          <Link href="/startup" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Startups
          </Link>
        </Button>
        
        <div className="bg-card rounded-xl p-8 shadow-md border mb-8">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{startup.nomeFantasia}</h1>
              <div className="flex flex-wrap gap-4">
                <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
                  <Building2 className="h-4 w-4" />
                  {startup.cnpj}
                </Badge>
                {startup.localizacao && (
                  <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
                    <MapPin className="h-4 w-4" />
                    {startup.localizacao.cidade}, {startup.localizacao.estado}
                  </Badge>
                )}
                <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
                  <CalendarDays className="h-4 w-4" />
                  Criada em {new Date(startup.dataCriacao).toLocaleDateString('pt-BR')}
                </Badge>
              </div>
            </div>
            {startup.profileImage && (
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
                <img 
                  src={startup.profileImage} 
                  alt={startup.nomeFantasia}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Projetos</h2>
            <Button asChild>
              <Link href={`/cadastro/projeto?startupId=${startup.id}`}>
                Novo Projeto
              </Link>
            </Button>
          </div>
          
          {startup.projetos && startup.projetos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {startup.projetos.map((projeto) => (
                <Card key={projeto.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="text-xl">{projeto.nome}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {projeto.descricao}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={projeto.status === "Em Desenvolvimento" ? "default" : "outline"}
                          className="px-3 py-1"
                        >
                          {projeto.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          {projeto.upvotes}
                        </div>
                      </div>
                      <Button asChild className="w-full">
                        <Link href={`/projeto/${projeto.id}`}>
                          Ver Detalhes do Projeto
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border">
              <p className="text-muted-foreground mb-4">Esta startup ainda não possui projetos cadastrados.</p>
              <Button asChild>
                <Link href={`/cadastro/projeto?startupId=${startup.id}`}>
                  Cadastrar Primeiro Projeto
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 