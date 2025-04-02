import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ArrowUpFromLine, Share2 } from 'lucide-react'

type Props = {
    projeto: any
}

const ProjectCard = (props: Props) => {
    return (
        <div>
            <Card>
                <CardHeader className='flex'>
                    <Avatar>
                        <AvatarImage src='https://avatars.githubusercontent.com/u/113259173?v=4' alt='nome' />
                        <AvatarFallback>JC</AvatarFallback>
                    </Avatar>
                    <Label className='mt-3'>{props.projeto.startup.nome}</Label>
                    <Badge className='mt-2 w-20 h-5'>2 dias atrás</Badge>
                </CardHeader>
                <CardContent>
                    <Label style={{ fontSize: '1.5em', marginBottom: '4px' }}>{props.projeto.nome}</Label>
                    <Label className='mt-3'>{props.projeto.descricao}</Label>
                </CardContent>
                <CardFooter className='flex justify-between'>
                    <Button variant='secondary' className='rounded-2xl'>
                        <ArrowUpFromLine /> 70
                    </Button>
                    <Button variant='secondary' className='rounded-2x1'>
                        <Share2 /> Share
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProjectCard