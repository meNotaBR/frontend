'use client'

import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard'
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DatePicker from '@/components/DatePicker';
import { format } from 'date-fns';
import { toast } from 'sonner';
import getCookie from '@/app/actions/get-cookie-action';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Projeto } from '@/app/types/projeto';
import getBaseUrl from '@/app/actions/get-baseurl';

type Props = {}

const Page = (props: Props) => {
    const [dateInicio, setDateInicio] = useState<Date>();
    const [dateEntrega, setDateEntrega] = useState<Date>();
    const [nome, setNome] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [projects, setProjects] = useState<Projeto[]>([]);
    const [token, setToken] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const [imageBase64, setImageBase64] = useState('');

    const fetchToken = async () => {
        const token = await getCookie('token');
        setToken(token ?? '');
    };

    const fetchProjects = async (token: string) => {
        if (!token) return;
        
        const response = await fetch(`${await getBaseUrl()}/api/projeto/user`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
            }
        });
        const data = await response.json();
        setProjects(data);
    };

    useEffect(() => {
        const fetchTokenAndProjects = async () => {
            const token = await getCookie('token');
            setToken(token ?? '');
            if(token) {
                await fetchProjects(token);
            }
        }
        fetchTokenAndProjects();
    }, []); 
    

    const onChangeDescricao = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        setDescricao(event.target.value);
    }

    const onChangeTitulo = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNome(event.target.value);
    }

    const postProjeto = async () => {
        const projeto = {
            nome: nome,
            dataPrevistaInicio: dateInicio ? format(dateInicio.toDateString(), "yyyy-MM-dd") : '',
            dataPrevistaEntrega: dateEntrega ? format(dateEntrega.toString(), "yyyy-MM-dd") : '',
            descricao: descricao,
            imageBase64: imageBase64
        }

        const response = await fetch(`${await getBaseUrl()}/api/projeto/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(projeto)
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => null)
            throw new Error(errorData?.erro || `Erro: Ocorreu um erro ao enviar seu projeto!`)
        }

        return await response.json();
    }

    const updateProjeto = async (id: number) => {
        const projeto = {
            nome: nome,
            dataPrevistaInicio: dateInicio ? format(dateInicio, "yyyy-MM-dd") : '',
            dataPrevistaEntrega: dateEntrega ? format(dateEntrega, "yyyy-MM-dd") : '',
            descricao: descricao
        };
    
        const response = await fetch(`await getBaseUrl()/api/projeto/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(projeto)
        });
    
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.erro || 'Erro ao atualizar projeto');
        }
    
        return await response.json();
    };

    const handlePostProjeto = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            toast.promise(postProjeto(), {
                loading: "Enviando seu projeto... Por favor, aguarde",
                success: async () => {
                    await fetchProjects(token);
                    setIsOpen(false);                    
                    return <b>Projeto enviado com sucesso!</b>
                },
                error: (error: any) => {
                    return error.message
                },
                position: 'top-left'
            })
        } catch (error) {
            console.log(error);
        }
    }

        const handleImageUpload = useCallback((files: FileList | null) => {
            if (!files || files.length === 0) return
    
            const file = files[0]
            const reader = new FileReader()
    
            reader.onload = (event) => {
                if (event.target?.result) {
                    const base64 = event.target.result.toString()
                    setImageBase64(base64)
                }
            }
    
            reader.onerror = (error) => {
                console.error("Erro ao ler a imagem:", error)
                setImageBase64("")
            }
    
            reader.readAsDataURL(file)
        }, [])

    return (<>
        <Header />

        <div className="container mx-auto px-4 py-8">
            <Label className='sm:text-4xl lg:text-3xl mb-4'>Seus projetos</Label>

            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Card className='items-center justify-center hover:border-primary/30 transition-all duration-300 max-h-[282px] cursor-pointer'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CardContent className="flex items-center justify-center h-full">
                                            <Plus className='w-30 h-30' />
                                        </CardContent>        
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Criar novo projeto</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-[425px] z-[100]">
                        <DialogHeader>
                            <DialogTitle>Criar Projeto</DialogTitle>
                            <DialogDescription>
                                Cadastre seu novo projeto na plataforma.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="titulo">Título do Projeto</Label>
                                <Input id="titulo" placeholder='Título' onChange={onChangeTitulo} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Data Prevista de Inicio</Label>
                                <DatePicker label="Data Prevista de Inicio" setDate={setDateInicio} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Data Prevista de Entrega</Label>
                                <DatePicker label="Data Prevista de Entrega" setDate={setDateEntrega} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="descricao">Fale sobre o projeto</Label>
                                <Textarea id="descricao" placeholder='Adicione uma descrição' onChange={onChangeDescricao} />
                            </div>
                            <div className='grid gap-2'>
                                <Label>Escolha uma imagem de capa.</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e.target.files)}
                                    className="rounded-2xl cursor-pointer"
                                />
                                <img src={imageBase64} alt='' className='max-w-[150px] max-h-[150px]'/>
                            </div>

                        </div>

                        <DialogFooter>
                            <Button type='submit' className='w-full' onClick={handlePostProjeto}>
                                Enviar Projeto
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {projects.map((projeto, index) => (
                    <ProjectCard isEdit projeto={projeto} key={index} token={token} />
                ))}
            </div>
        </div>
    </>)
}

export default Page

