import React from 'react'
import { Label } from './ui/label'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { Card, CardContent, CardFooter } from './ui/card'

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
                    <Card className=''>
                        <CardContent >
                            <img src={element.img} alt={element.nome} key={index} />
                        </CardContent>
                        <CardFooter className='flex justify-end' >
                            <Label className='underline '>Ver mais</Label>
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