"use client"

import { useRef } from "react"
import { Clock, Info } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface EntregavelItemProps {
  entregavel: Entregavel
  index: number
  isLast: boolean
  formatarData: (date: string) => string
}

const AnimatedLine = ({ isInView }: { isInView: boolean }) => {
  return (
    <motion.div
      className="absolute left-6 top-10 w-0.5 bg-border h-[calc(100%-2rem)]"
      initial={{ height: 0 }}
      animate={isInView ? { height: "calc(100% - 2rem)" } : { height: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  )
}

export function EntregavelItem({ entregavel, index, isLast, formatarData }: EntregavelItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const isAtrasado = (entregavel: Entregavel) => {
    if(entregavel.status == "ENTREGUE"){
        return false;
    }

    if(entregavel.status == "INICIADO"){
        const previsaoEntrega = new Date(entregavel.dataPrevistaEntrega);
        return previsaoEntrega < new Date
    }
  }

  const atrasado = isAtrasado(entregavel)

  const animationDelay = 0.3 + index * 0.4

  return (
    <motion.div
      className="relative"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: animationDelay - 0.3 }}
    >
      <div className="flex items-start gap-4">
        {!isLast && <AnimatedLine isInView={isInView} />}

        <motion.div
          className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 dark:text-black ${
            atrasado ? "border-red-500 bg-red-100" : "border-green-700 bg-green-300"
          }`}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: animationDelay - 0.2 }}
        >
          <span className="font-bold ">{index + 1}</span>
        </motion.div>

        <motion.div
          className="flex-1 mb-8"
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: animationDelay,
            type: "spring",
            stiffness: 100,
          }}
        >
          <Card className={`h-full ${atrasado ? "border-red-200 shadow-[0_0_0_1px_rgba(220,38,38,0.1)]" : ""}`}>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <CardTitle className="text-lg">
                  {entregavel.nome}
                  {atrasado ? (
                    <Badge variant="destructive" className="ml-2">
                      Atrasado
                    </Badge>
                  ) : (
                    <Badge className="ml-2 bg-green-500">Entregue</Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {formatarData(entregavel.dataInicio)} - {formatarData(entregavel.dataEntrega)}
                  </span>
                </div>
              </div>
              <CardDescription className="mt-1">{entregavel.descricao}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {atrasado && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center text-red-500 text-sm">
                            <Info className="h-4 w-4 mr-1" />
                            <span>Entregável em atraso</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Este entregável está atrasado e precisa de atenção.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
