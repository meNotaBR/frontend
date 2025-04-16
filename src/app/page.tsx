"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ArrowUpFromLine, ChartNetwork, ChevronDown, Factory, SearchCheck, Star, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const opacity = useTransform(scrollY, [0, 200], [1, 0])
  const scale = useTransform(scrollY, [0, 200], [1, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center justify-between px-6 md:px-12 py-4",
          isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent",
        )}
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          {/* <span className="font-bold text-xl">meNota</span> */}
          <Link href='/feed'><img src="menota.svg" alt="" className='w-[150px] not-dark:invert not-dark:brightness-200' /></Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Como funciona
          </Link>
          <Link href="#startups" className="text-sm font-medium hover:text-primary transition-colors">
            Top Startups
          </Link>
          <Link href="#investors" className="text-sm font-medium hover:text-primary transition-colors">
            Para Investidores
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href='/login'>Log In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href='/cadastro'>Cadastre-se</Link>
          </Button>
        </div>
      </header>

      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center px-6 md:px-12">
        <motion.div style={{ opacity, scale }} className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)/5%,_transparent_70%)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Conectando <span className="text-primary">Visionários</span> com{" "}
            <span className="text-primary">Capital</span>
          </h1>
          <p className="text-lg :text-blue-700 md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Uma plataforma unificada onde investidores descobrem as <b>startups</b> mais promissoras, ranqueadas pelo
            engajamento e validação de outros investidores.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href={`/feed`}>Acesse já</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-0 right-0 flex justify-center"
        >
          <Button variant="ghost" size="icon" className="rounded-full animate-bounce" onClick={scrollToFeatures}>
            <ChevronDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </section>

      <section ref={featuresRef} className="py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Como funciona</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nossa plataforma cria um ecossistema transparente onde as melhores ideias florescem até o topo com a validação da comunidade.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Descubra",
              description:
                "Pesquise entre uma vasta seleção de startups inovadoras em diferentes indústrias e estágios.",
              icon: <SearchCheck className="h-10 w-10 text-primary" />,
              delay: 0.2,
            },
            {
              title: "Valide",
              description:
                "De Upvote em startups promissoras para ajuda-las a ganhar visibilidade e reconhecimento na comunidade.",
              icon: <ArrowUpFromLine className="h-10 w-10 text-primary" />,
              delay: 0.4,
            },
            {
              title: "Conecte-se",
              description:
                "Entre em contato e faça novas amizades com founders das startups que alinham com os critérios do seu investimento.",
              icon: <ChartNetwork className="h-10 w-10 text-primary" />,
              delay: 0.6,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.6 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden group hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="mb-6 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="startups" className="py-24 px-6 md:px-12 bg-black/20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">As mais votadas da semana</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra as startups mais votadas que estão ganhando força em nossa plataforma.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "EcoTech Solutions",
              description: "Soluções de energia sustentável para residenciais usando otimização por IA.",
              upvotes: 2453,
              image: "https://media.istockphoto.com/id/1322158065/photo/business-people-contract-agreement-was-signed-co-investment-business.jpg?s=612x612&w=0&k=20&c=QE_ydA8qCzFkzAuTmzoCcQNg6nyKEBULRnlzp7Xihtc=",
              delay: 0.2,
            },
            {
              name: "HealthSync",
              description: "Plataforma de monitoramento de saúde por IA para tratamentos preventivos.",
              upvotes: 1872,
              image: "https://t4.ftcdn.net/jpg/03/00/14/39/360_F_300143961_8kJTPiTbWallCIBxO0GQzoxgwE9cIRGG.jpg",
              delay: 0.4,
            },
            {
              name: "FinLedger",
              description: "Finanças baseadas em infraestrutura Block-chain para mercados emergentes.",
              upvotes: 1654,
              image: "https://media.istockphoto.com/id/1395187689/photo/signing-contract-investor-and-contractor.jpg?s=612x612&w=0&k=20&c=SYD7JvzTDqcgz3i9eooa5PQY4650BIttb9batDCmE9Y=",
              delay: 0.6,
            },
          ].map((startup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: startup.delay, duration: 0.6 }}
            >
              <Card className="h-full overflow-hidden group hover:border-primary/30 transition-all duration-300 pt-0">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={startup.image || "/placeholder.svg"}
                    alt={startup.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <ArrowUpFromLine className="h-4 w-4 text-primary fill-primary" />
                    {startup.upvotes.toLocaleString()}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{startup.name}</h3>
                  <p className="text-muted-foreground mb-4">{startup.description}</p>
                  <Button variant="ghost" size="sm" className="group/btn">
                    Saiba mais
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="investors" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Para Investidores</h2>
            <p className="text-muted-foreground mb-6">
              Descubra o próximo diamante das startups antes de qualquer um. Nossa plataforma te entrega:
            </p>
            <ul className="space-y-4">
              {[
                "Acesso a startups validadas pela comunidade.",
                "Métricas detalhadas sobre Índice de desempenho de prazo e crescimento semanal na plataforma",
                "Visualização do roadmap de entregas vinculadas a cada projeto",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[350px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/0" />
            <img
              src="dashboard.png"
              alt="Investor Dashboard"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-background to-primary/10 rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Preparado para transformar o investimento em startups ?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se ainda hoje a nossa comunidade de investidores visionários e startups inovadoras.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8">
              Cadastre-se ainda hoje.
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
