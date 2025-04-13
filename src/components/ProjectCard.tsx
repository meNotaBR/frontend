'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ArrowUpFromLine, CalendarDays, Check, Share2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import Link from 'next/link'
import { calculaTempoPostagem } from '@/hooks/calcula-tempo'

type Props = {
    token?: string,
    projeto: Projeto
}

const ProjectCard = (props: Props) => {

    const [shared, setShared] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>();
    const [totalLikes, setTotalLikes] = useState<number>(props.projeto.upvotes);
    const [openTooltip, setOpenTooltip] = useState(false);
    const [openHoverCard, setOpenHoverCard] = useState(false);

    const copyUrl = () => {
        
        navigator.clipboard.writeText(window.location.href.replace('feed', `projeto/${props.projeto.id}`));

        sharedTrue();
    }

    const sendUpvote = async () => {

        const upvote: Upvote = {
            projeto: {
                id: props.projeto.id
            }
        }

        const response = await fetch('http://localhost:8080/api/upvote/create', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${props.token}`
            },
            body: JSON.stringify(upvote)
        })

        if (!response.ok) {
            throw new Error("Erro ao enviar seu upvote");
        }

        likeProject();
    }

    const removeUpvote = async () => {
        const upvote: Upvote = {
            projeto: {
                id: props.projeto.id
            }
        }

        const response = await fetch('http://localhost:8080/api/upvote/delete', {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${props.token}`
            },
            body: JSON.stringify(upvote)
        })

        if (!response.ok) {
            throw new Error("Erro ao enviar seu upvote");
        }

        unlikeProject();
    }

    const date = new Date(props.projeto.startup.dataCadastro);


    const checkDescriptionSize = (desc: string) => {
        let description: string;

        if (desc.length > 225) {
            return description = desc.substring(0, 224).concat('...');
        }

        return desc;
    }

    const sharedTrue = () => {
        setShared(true);

        setTimeout(() => { setShared(false) }, 2000)
    }

    const likeProject = () => {
        props.projeto.isLiked = true;
        setTotalLikes(totalLikes + 1);
    }

    const unlikeProject = () => {
        props.projeto.isLiked = false;
        setTotalLikes(totalLikes - 1);
    }

    useEffect(() => {
        if (props.projeto && props.projeto.isLiked !== undefined) {
            setLiked(props.projeto.isLiked);
        }
    }, [props.projeto?.isLiked]);



    return (
        <div>
            <Card className='hover:border-primary/30 transition-all duration-300'>
                <CardHeader className='flex'>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="" alt="nome" />
                            <AvatarFallback>{props.projeto.startup.nomeFantasia.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <HoverCard open={openHoverCard} onOpenChange={setOpenHoverCard}>
                            <HoverCardTrigger asChild onClick={() => setOpenHoverCard(!openHoverCard)}>
                                <Badge className="h-5 w-20">{props.projeto.startup.nomeFantasia.length > 10 ? props.projeto.startup.nomeFantasia.substring(0, 9).concat('...') : props.projeto.startup.nomeFantasia}</Badge>
                            </HoverCardTrigger>
                            <HoverCardContent className="dark:bg-black ml-2">
                                <div className="flex justify-between space-x-4">
                                    <Avatar className=''>
                                        <AvatarImage src="" />
                                        <AvatarFallback>{props.projeto.startup.nomeFantasia.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold">{props.projeto.startup.nomeFantasia}</h4>
                                        <p className="text-sm">
                                            Criciúma, Santa Catarina
                                        </p>
                                        <div className="flex items-center pt-2">
                                            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                                            <span className="text-xs text-muted-foreground">
                                                {date.toLocaleDateString("pt-BR", { year: "numeric", month: "long" })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                        <Label className="ml-2 text-gray-400 text-xs">{calculaTempoPostagem(props.projeto.dataCadastro)}</Label>
                    </div>

                    {props.projeto.isPelando ? (
                        <TooltipProvider>
                            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
                                <TooltipTrigger asChild onClick={() => setOpenTooltip(!openTooltip)}>
                                    <Badge className="ml-auto mt-1 bg-black text-amber-50 pl-1">🔥Pelando</Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <Label className='mb-2'>Os mais aquecidos da plataforma!🔥</Label>
                                    <p>Projetos que estão <b>pelando</b> recebem <b>upvotes dobrados!</b></p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : ''}

                </CardHeader>
                <CardContent className='sm:max-h-[100px]'>
                    <Label style={{ marginBottom: '4px' }} className='text-2xl xs:text-[20px]'>{props.projeto.nome}</Label>
                    <Label className='mt-3'>{checkDescriptionSize(props.projeto.descricao)}</Label>
                </CardContent>
                <CardFooter className='flex justify-around sm:mt-4'>

                    {liked ? (
                        <Button disabled={!props.token} variant='secondary' className='rounded-2xl dark:bg-[#892be2] not-dark:bg-[#FF00FF]' onClick={removeUpvote}>
                            <ArrowUpFromLine /> {totalLikes}
                        </Button>
                    ) : (
                        <Button disabled={!props.token} variant='secondary' className='rounded-[15px]' onClick={sendUpvote}>
                            <ArrowUpFromLine /> {totalLikes}
                        </Button>
                    )}

                    <Button variant='secondary' className='rounded-2xl' asChild>
                        <Link href={`/projeto/${props.projeto.id}`} >Saiba mais</Link>
                    </Button>

                    {shared ? (
                        <Button variant='default' className='bg-green-400 hover:bg-green-400' style={{ borderRadius: '15px', fontSize: '0.8em' }}>
                            <Check /> Link Copiado
                        </Button>) :
                        (
                        <Button variant='secondary' style={{ borderRadius: '15px', fontSize: '0.8em' }} onClick={copyUrl}>
                            <Share2 /> Compartilhar
                        </Button>)}
                </CardFooter>
            </Card>
        </div>
    )
}

export default ProjectCard