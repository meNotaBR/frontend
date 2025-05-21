'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ArrowUpFromLine, CalendarDays, Check, Share2, Trash2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import Link from 'next/link'
import { calculaTempoPostagem } from '@/hooks/calcula-tempo'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from './ui/dialog';
import { toast } from 'sonner'
import DatePicker from './DatePicker'

type Props = {
    token?: string,
    projeto: Projeto,
    isEdit?: boolean,
}


const ProjectCard = (props: Props) => {
    const [shared, setShared] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>();
    const [totalLikes, setTotalLikes] = useState<number>(props.projeto.upvotes);
    const [openTooltip, setOpenTooltip] = useState(false);
    const [openHoverCard, setOpenHoverCard] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [baseUrl, setBaseUrl] = useState('');
    const [deletado, setDeletado] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editNome, setEditNome] = useState(props.projeto.nome);
    const [editDescricao, setEditDescricao] = useState(props.projeto.descricao);
    const [editDataInicio, setEditDataInicio] = useState<Date | undefined>(
    props.projeto.dataPrevistaInicio ? new Date(props.projeto.dataPrevistaInicio) : undefined
    );
    const [editDataEntrega, setEditDataEntrega] = useState<Date | undefined>(
    props.projeto.dataPrevistaEntrega ? new Date(props.projeto.dataPrevistaEntrega) : undefined
    );
    const [projetoAtual, setProjetoAtual] = useState(props.projeto);
    const [entregavelDialogOpen, setEntregavelDialogOpen] = useState(false);
    const [entregavelNome, setEntregavelNome] = useState('');
    const [entregavelDescricao, setEntregavelDescricao] = useState('');
    const [entregavelDataPrevInicio, setEntregavelDataPrevInicio] = useState<string>('');
    const [entregavelDataPrevEntrega, setEntregavelDataPrevEntrega] = useState<string>('');
    type Status = 'PENDENTE' | 'INICIADO' | 'ENTREGUE';
    const [entregavelStatus, setEntregavelStatus] = useState<Status>('PENDENTE');
    const [isSubmittingEntregavel, setIsSubmittingEntregavel] = useState(false);
    const [errorEntregavel, setErrorEntregavel] = useState<string | null>(null);

    useEffect(() => {
    if (typeof window !== 'undefined') {
        setBaseUrl(`${window.location.protocol}//${window.location.host}/`);
    }
    }, []);

    const copyUrl = () => {
        if (!baseUrl) return;
        navigator.clipboard.writeText(`${baseUrl}projeto/${props.projeto.id}`);
        sharedTrue();
    }

    const updateProjeto = async () => {
        const projetoAtualizado = {
          nome: editNome,
          descricao: editDescricao,
          dataPrevistaInicio: editDataInicio?.toISOString().split('T')[0],
          dataPrevistaEntrega: editDataEntrega?.toISOString().split('T')[0]
        };
      
        const response = await fetch(`http://localhost:8080/api/projeto/update/${props.projeto.id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${props.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(projetoAtualizado)
        });
      
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        setProjetoAtual({
            ...projetoAtual,
            nome: editNome,
            descricao: editDescricao,
            dataPrevistaInicio: editDataInicio ? editDataInicio.toISOString().split('T')[0] : '',
            dataPrevistaEntrega: editDataEntrega ? editDataEntrega.toISOString().split('T')[0] : '',
        });
      
        toast.success('Projeto atualizado com sucesso!');
        setEditDialogOpen(false);
    };

    const submitEntregavel = async () => {
        if (!entregavelNome) {
          setErrorEntregavel('Nome é obrigatório');
          return;
        }
    
        setIsSubmittingEntregavel(true);
        setErrorEntregavel(null);
    
        try {
          const payload = {
            nome: entregavelNome,
            descricao: entregavelDescricao,
            dataPrevistaInicio: entregavelDataPrevInicio,
            dataPrevistaEntrega: entregavelDataPrevEntrega,
            status: entregavelStatus,
            projeto: {
              id: props.projeto.id
            }
          };
    
          const response = await fetch('http://localhost:8080/api/entregavel/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${props.token}`
            },
            body: JSON.stringify(payload)
          });
    
          if (!response.ok) {
            throw new Error('Erro ao criar entregável');
          }

          setEntregavelNome('');
          setEntregavelDescricao('');
          setEntregavelDataPrevInicio('');
          setEntregavelDataPrevEntrega('');
          setEntregavelStatus('PENDENTE');
          setEntregavelDialogOpen(false);

          toast.success('Entregável criado com sucesso!');

        } catch (err: any) {
          setErrorEntregavel(err.message || 'Erro desconhecido');
        } finally {
          setIsSubmittingEntregavel(false);
        }
      };
    

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

    const deleteProjeto = async () => {
        try {
          setIsDeleting(true);
          const response = await fetch(`http://localhost:8080/api/projeto/delete/${props.projeto.id}`, {
            method: 'DELETE'
          });
      
          if (!response.ok) {
            throw new Error('Erro ao deletar o projeto');
          }
      
          console.log('Projeto deletado com sucesso');
          setDeletado(true);
        } catch (error) {
          console.error('Erro ao deletar o projeto:', error);
        } finally {
          setIsDeleting(false);
        }
      };

    const date = new Date(props.projeto.startup.dataCadastro);

    const checkDescriptionSize = (desc: string) => {
        if (desc.length > 225) {
            return desc.substring(0, 224).concat('...');
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

    if (deletado) return <></>; 

    return (
    <>
        <div>
            <Card className='hover:border-primary/30 transition-all duration-300'>
                <CardHeader className='flex'>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={props.projeto.startup.profileImage} alt="nome" />
                            <AvatarFallback>{props.projeto.startup.nomeFantasia.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <HoverCard open={openHoverCard} onOpenChange={setOpenHoverCard}>
                            <HoverCardTrigger asChild onClick={() => setOpenHoverCard(!openHoverCard)}>
                                <Badge className="h-5 w-20">{props.projeto.startup.nomeFantasia.length > 10 ? props.projeto.startup.nomeFantasia.substring(0, 9).concat('...') : props.projeto.startup.nomeFantasia}</Badge>
                            </HoverCardTrigger>
                            <HoverCardContent className="dark:bg-black ml-2">
                                <div className="flex justify-between space-x-4">
                                    <Avatar className=''>
                                        <AvatarImage src={props.projeto.startup.profileImage} />
                                        <AvatarFallback>{props.projeto.startup.nomeFantasia.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold">{props.projeto.startup.nomeFantasia}</h4>
                                        <p className="text-sm">
                                            {props.projeto.startup.localizacao ? 
                                                `${props.projeto.startup.localizacao.cidade}, ${props.projeto.startup.localizacao.estado}` :
                                                'Localização não informada'
                                            }
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
                    <Label style={{ marginBottom: '4px' }} className='text-2xl xs:text-[20px]'>{projetoAtual.nome}</Label>
                    <Label className='mt-3'>{checkDescriptionSize(projetoAtual.descricao)}</Label>
                </CardContent>
                <CardFooter className='flex justify-around sm:mt-4'>

                {props.isEdit ? (<>
                    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant='secondary' className='rounded-2xl'>
                            Editar
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Editar Projeto</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="nome">Nome</Label>
                                <input
                                id="nome"
                                value={editNome}
                                onChange={(e) => setEditNome(e.target.value)}
                                className="border rounded-2xl p-2"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="descricao">Descrição</Label>
                                <textarea
                                id="descricao"
                                value={editDescricao}
                                onChange={(e) => setEditDescricao(e.target.value)}
                                className="border rounded-2xl p-2"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Data de Início</Label>
                                <input
                                type="date"
                                value={editDataInicio?.toISOString().split('T')[0]}
                                onChange={(e) => setEditDataInicio(new Date(e.target.value))}
                                className="border rounded-2xl p-2"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Data de Entrega</Label>
                                <input
                                type="date"
                                value={editDataEntrega?.toISOString().split('T')[0]}
                                onChange={(e) => setEditDataEntrega(new Date(e.target.value))}
                                className="border rounded-2xl p-2"
                                />
                            </div>
                            </div>

                            <DialogFooter>
                            <Button onClick={updateProjeto}>Salvar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Button
                        className="rounded-2xl"
                        onClick={() => setEntregavelDialogOpen(true)}
                        >
                        Adicionar Entregável
                    </Button>

                    <Dialog open={entregavelDialogOpen} onOpenChange={setEntregavelDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Adicionar Entregável</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="entregavelNome">Nome</Label>
                                <input
                                id="entregavelNome"
                                type="text"
                                value={entregavelNome}
                                onChange={(e) => setEntregavelNome(e.target.value)}
                                className="border rounded-2xl p-2"
                                required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="entregavelDescricao">Descrição</Label>
                                <textarea
                                id="entregavelDescricao"
                                value={entregavelDescricao}
                                onChange={(e) => setEntregavelDescricao(e.target.value)}
                                className="border rounded-2xl p-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <DatePicker label='Data Prevista Início' setDate={(date?: Date) => setEntregavelDataPrevInicio(date ? date.toISOString().split('T')[0] : '')}/>
                            </div>

                            <div className="grid gap-2">
                                <DatePicker label='Data Prevista Entrega' setDate={(date?: Date) => setEntregavelDataPrevEntrega(date ? date.toISOString().split('T')[0] : '')}/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="entregavelStatus">Status</Label>
                                <select
                                id="entregavelStatus"
                                value={entregavelStatus}
                                onChange={(e) => setEntregavelStatus(e.target.value as Status)}
                                className="border rounded-2xl p-2"
                                >
                                <option value="PENDENTE">Pendente</option>
                                <option value="EM_ANDAMENTO">Em andamento</option>
                                <option value="CONCLUIDO">Concluído</option>
                                </select>
                            </div>

                            {errorEntregavel && <p className="text-red-600">{errorEntregavel}</p>}
                            </div>

                            <DialogFooter>
                            <Button variant="outline" onClick={() => setEntregavelDialogOpen(false)}>
                                Cancelar
                            </Button>
                            <Button
                                onClick={submitEntregavel}
                                disabled={isSubmittingEntregavel}
                            >
                                {isSubmittingEntregavel ? 'Salvando...' : 'Salvar'}
                            </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
                        <DialogTrigger asChild>
                            <Button variant='destructive' className='rounded-2xl'>
                                <Trash2 className="mr-2 h-4 w-4" /> Apagar
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirmar exclusão</DialogTitle>
                                <DialogDescription>
                                    Tem certeza que deseja excluir o projeto "{props.projeto.nome}"? Esta ação não pode ser desfeita.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setOpenDeleteModal(false)}>
                                    Cancelar
                                </Button>
                                <Button 
                                    variant="destructive" 
                                    onClick={async () => {
                                        setIsDeleting(true);
                                        try {
                                            deleteProjeto();
                                            setOpenDeleteModal(false);
                                        } finally {
                                            setIsDeleting(false);
                                        }
                                      }}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? "Excluindo..." : "Confirmar Exclusão"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    </>) : (
                    <>
                    {liked ? (
                        <Button disabled={!props.token} variant='secondary' className='rounded-2xl dark:bg-[#892be2] not-dark:bg-[#FF00FF]' onClick={removeUpvote}>
                            <ArrowUpFromLine /> {totalLikes}
                        </Button>
                    ) : (
                        <Button disabled={!props.token} variant='secondary' className='rounded-2xl-[15px]' onClick={sendUpvote}>
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
                    </>
                )}
                </CardFooter>
            </Card>
        </div>
    </>
    )
}

export default ProjectCard