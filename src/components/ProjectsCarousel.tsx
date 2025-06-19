import React from 'react'
import { Label } from './ui/label'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { ArrowRight, ArrowUpFromLine } from 'lucide-react'
import Image from 'next/image'
import { isMobile } from '@/hooks/user-agent'
import { headers } from 'next/headers'
import ProjetoCarrossel from '@/app/types/projeto-carrossel'
import Link from 'next/link'

type Props = {
    label: string,
    projetos: ProjetoCarrossel[],
}

const ProjectsCarousel = async (props: Props) => {

  const userAgent = (await headers()).get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

    return (
        <div className='mb-8'>
            <Label className='lg:text-3xl sm:text-2xl mb-4 lg:justify-center sm:justify-self-start'>{props.label}</Label>
            <Carousel className="w-full">
                <CarouselContent className=''>
                    {props.projetos.map((element, index) => (
                        <CarouselItem key={index} className="sm:bases-1/1 md:basis-1/2 lg:basis-1/3 ">
                                <Card className="h-full overflow-hidden group hover:border-primary/30 transition-all duration-300 pt-0">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={element.img || "/placeholder.svg"}
                                            alt={element.nome}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
                                        />
                                        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                            <ArrowUpFromLine className="h-4 w-4 text-primary fill-primary" />
                                            {element.totalUpvote}
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{element.nome}</h3>
                                        <p className="text-muted-foreground mb-4">{element.descricao}</p>
                                        <Button variant="ghost" size="sm" className="group/btn">
                                            <Link href={`/projeto/${element.id}`} >Saiba mais</Link>
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Button>
                                    </CardContent>
                                </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {!mobileCheck ? (
                    <>
                        <CarouselPrevious />
                        <CarouselNext />
                    </>
                ): ''}
            </Carousel>
        </div>
    )
}

export default ProjectsCarousel