import React from 'react'
import { Label } from './ui/label'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { ArrowUpFromLine } from 'lucide-react'

type Props = {
    label: string,
    projetos: any[],
}

const ProjectsCarousel = (props: Props) => {
    return (
        <div className='mb-8'>
    <Label className='lg:text-3xl sm:text-2xl mb-4 lg:justify-center sm:justify-self-start'>{props.label}</Label>
    <Carousel className="w-full">
                <CarouselContent className=''>
                    {props.projetos.map((element, index) => (
                        <CarouselItem key={index} className="sm:bases-1/1 md:basis-1/2 lg:basis-1/3 ">
                            <Card className="overflow-hidden h-full flex flex-col pt-0 pb-2">
                                <CardContent className="p-0 flex-grow">
                                    <img
                                        src={element.img || "/placeholder.svg"}
                                        alt={element.nome}
                                        key={index}
                                        className="w-full object-cover rounded-[8px] h-[250px]"
                                    />
                                </CardContent>
                                <CardFooter className='flex justify-around gap-2' >
                                    <Button variant='default' className='rounded-2xl w-[50%] '>
                                        <ArrowUpFromLine /> 2
                                    </Button>

                                    <Button variant='default' className='rounded-2xl w-[50%]'>
                                        Saiba mais
                                    </Button>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default ProjectsCarousel