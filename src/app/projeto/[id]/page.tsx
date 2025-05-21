'use client'

import DashboardView from '@/app/types/dashboard-view'
import UpvoteGroupedByDate from '@/app/types/upvote-groupedby-date'
import { EntregavelItem } from '@/components/EntregavelCard'
import Header from '@/components/Header'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion'
import { Calendar, TrendingUp } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis } from 'recharts'

type Props = {}

const page = (props: Props) => {

  const params = useParams();

  const id = params.id;

  const [upvotes, setUpvotes] = useState<UpvoteGroupedByDate[]>([]);
  const [entregaveis, setEntregaveis] = useState<Entregavel[]>([]);
  const [view, setView] = useState<DashboardView | null>(null);

  const fetchView = async () => {
    const json = await fetch(`http://localhost:8080/api/view/${id}`);
    const view: DashboardView = await json.json();

    view.upvotes.sort((a, b) => {
      return new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime();
    })

    setView(view)
    setUpvotes(view.upvotes);
    setEntregaveis(view.entregaveis)
  }

  const formatarData = (data: Date | undefined) => {
    if (!data) return "Data não disponível"; 
    return format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  }

  useEffect(() => {
    if (id) {
      fetchView();
    }
  }, [id])

  const chartConfig = {
    total: {
      label: "Upvotes",
      color: "#892be2",
    }
  } satisfies ChartConfig

  return (
    <>

      <Header />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl md:text-3xl">{view?.nome}</CardTitle>
                <CardDescription className="mt-2 text-base max-w-[80%]">{view?.descricao}</CardDescription>
              </div>
              <div className="flex flex-col gap-2 w-[70%]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">
                    Início: <span className="font-medium">{view?.dataInicio ? formatarData(view?.dataInicio) : "Projeto não Iniciado"}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">
                    Entrega: <span className="font-medium">{view?.dataEntrega ? formatarData(view?.dataEntrega): "Projeto não Entregue"}</span>
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      <Card className="max-h-[600px] flex flex-col">
        <CardHeader className="shrink-0 pb-2">
          <CardTitle>Upvotes</CardTitle>
          <CardDescription>
            Mostrando o total de <b>Upvotes</b> por dia
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow pb-0">
          <div className="h-[400px] w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  accessibilityLayer
                  data={upvotes}
                  margin={{
                    left: 12,
                    right: 12,
                    top: 10,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="dataCriacao"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => {
                      if (!value) return ""
                      const date = new Date(value)
                      return `${date.getDate() + 1}/${date.getMonth() + 1}`
                    }} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  <Area
                    dataKey="total"
                    type="natural"
                    fill="var(--color-total)"
                    fillOpacity={0.4}
                    stroke="var(--color-total)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
        <CardFooter className="shrink-0 pt-2">
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Um crescimento de {view?.taxaCrescimentoUpvotes}% <TrendingUp className="h-4 w-4" />
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>

      <div className="container mx-auto p-4">

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold">Roadmap de Entregáveis</h2>
          <p className="text-muted-foreground mt-1">Acompanhe o progresso das tarefas do projeto</p>
        </motion.div>

        <div className="relative">
          {entregaveis.map((entregavel, index) => (
            <EntregavelItem
              key={entregavel.id}
              entregavel={entregavel}
              index={index}
              isLast={index === entregaveis.length - 1}
              formatarData={formatarData}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default page