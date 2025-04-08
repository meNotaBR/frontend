'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue, SelectTrigger } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
type Props = {}

const page = (props: Props) => {

    const days: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']

    const months = [
        { value: "01", label: "Janeiro" },
        { value: "02", label: "Fevereiro" },
        { value: "03", label: "Março" },
        { value: "04", label: "Abril" },
        { value: "05", label: "Maio" },
        { value: "06", label: "Junho" },
        { value: "07", label: "Julho" },
        { value: "08", label: "Agosto" },
        { value: "09", label: "Setembro" },
        { value: "10", label: "Outubro" },
        { value: "11", label: "Novembro" },
        { value: "12", label: "Dezembro" },
    ]

    const tipoCadastro = [
        { value: "1", label: "Investidor" },
        { value: "2", label: "Empresário" }
    ]

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i);

    const [nome, setNome] = useState<string>('');
    const [sobrenome, setSobrenome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [contato, setContato] = useState<string>('');
    const [dia, setDia] = useState<string>('');
    const [mes, setMes] = useState<string>('');
    const [ano, setAno] = useState<string>('');

    const router = useRouter();

    const [userType, setUserType] = useState<string>('');

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNome(event.target.value);
    }

    const onChangeSobrenome = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSobrenome(event.target.value);
    }

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setEmail(event.target.value);
    }

    const onChangeSenha = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSenha(event.target.value);
    }

    const onChangeCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setCpf(event.target.value);
    }

    const onChangeContato = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setContato(event.target.value);
    }

    const onChangeDia = (dia: string) => {
        setDia(dia);
    }

    const onChangeMes = (mes: string) => {
        setMes(mes);
    }

    const onChangeAno = (ano: string) => {
        setAno(ano);
    }

    const concatDates = (dia: string, mes: string, ano: string) => {
        return `${ano}-${mes}-${dia}`;
    }

    const postCadastro = async () => {
        var url = '';

        const cadastro: EmpresarioRequest = {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: senha,
            cpf: cpf,
            dataNasc: concatDates(dia, mes, ano)
        }
        if (userType == '1') {
            url = 'http://localhost:8080/api/investor/create'

        }else {
            cadastro.numeroCelular = contato;
            url = 'http://localhost:8080/api/empresario/create'
        }

        console.log('url: ' + url);
        console.log('cadastro: ' + JSON.stringify(cadastro));
        
        

        const json = await fetch(url, { method: 'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(cadastro)});

        if (!json.ok) {
            const errorData = await json.json().catch(() => null)
            throw new Error(errorData?.erro || 'Ocorreu algum erro em seu cadastro');
        }

        if (json.status == 201) {
            router.push('/login');
        }
    }

    const handleCadastro = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        toast.promise(postCadastro(), {
            loading: "Efetuando seu cadastro... Por favor, aguarde!",
            success: <b>Cadastro efetuado com sucesso!</b>,
            error: (error: any) => {
                return error.message
            },
            position: 'top-left'
        })
    }

    return (
        <div className='flex justify-center'>
            <div className='grid grid-cols-1 gap-3'>

                <img src="menota.svg" alt="" className='mb-8' />
                <Label style={{ fontSize: '35px' }} className='flex justify-center mb-5' >Cadastre-se</Label>
                <div className='grid grid-cols-2 gap-1 w-full'>
                    <Input type='text' placeholder='Nome' className='rounded-2xl h-11' onChange={onChangeName}/>
                    <Input type='text' placeholder='Sobrenome' className='rounded-2xl h-11' onChange={onChangeSobrenome}/>
                </div>
                <Input type='email' placeholder='Email' className='rounded-2xl h-11' onChange={onChangeEmail}/>
                <Input type='text' placeholder='CPF' className='rounded-2xl h-11' onChange={onChangeCpf}/>
                
                {userType == '2' ? (
                    <Input type='text' placeholder='Contato' className='rounded-2xl h-11' onChange={onChangeContato}/>
                ): ''}


                <div>
                    <Label className='flex justify-center mb-5 mt-2'>Data de Nascimento</Label>
                    <div className='grid grid-cols-3 gap-1'>

                        <Select onValueChange={onChangeDia}>
                            <SelectTrigger className='w-full rounded-2xl h-11'>
                                <SelectValue placeholder='Dia' />
                            </SelectTrigger>
                            <SelectContent position='popper' className="w-[var(--radix-select-trigger-width)]">
                                <SelectGroup>
                                    <SelectLabel>Dias</SelectLabel>
                                    {days.map((element, index) => (
                                        <SelectItem value={String(element)} key={index}>{element}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select onValueChange={onChangeMes}>
                            <SelectTrigger className='w-full rounded-2xl h-11'>
                                <SelectValue placeholder='Mês' />
                            </SelectTrigger>
                            <SelectContent position='popper' className="w-[var(--radix-select-trigger-width)]">
                                <SelectGroup>
                                    <SelectLabel>Mês</SelectLabel>
                                    {months.map((month) => (
                                        <SelectItem value={month.value} key={month.value}>
                                            {month.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select onValueChange={onChangeAno}>
                            <SelectTrigger className='w-full rounded-2xl h-11'>
                                <SelectValue placeholder='Ano' />
                            </SelectTrigger>
                            <SelectContent position='popper' className="w-[var(--radix-select-trigger-width)]">
                                <SelectGroup>
                                    <SelectLabel>Ano</SelectLabel>
                                    {years.map((year) => (
                                        <SelectItem value={String(year)} key={year}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                    </div>
                </div>
                <Select onValueChange={setUserType}>
                    <SelectTrigger className='w-full rounded-2xl h-11'>
                        <SelectValue placeholder='Posição' />
                    </SelectTrigger>
                    <SelectContent position='popper' className="w-[var(--radix-select-trigger-width)]">
                        <SelectGroup>
                            <SelectLabel>Posição</SelectLabel>
                            {tipoCadastro.map((element) => (
                                <SelectItem value={element.value} key={element.value} defaultValue='1'>{element.label}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Input type='password' placeholder='Senha' className='rounded-2xl h-11' onChange={onChangeSenha} />
                <Input type='password' placeholder='Repita a senha' className='rounded-2xl h-11' />

                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Eu concordo com os <Label className='underline'>Termos</Label> e <Label className='underline'>Condições</Label>
                    </Label>
                </div>

                <div className='mt-10 flex justify-center'>
                    <Button className='w-50 font-bold h-15 rounded-2xl text-lg' onClick={handleCadastro}>Cadastrar-se</Button>
                </div>

                <Label className='flex justify-center mt-4 text-blue-600'> Já tem uma conta ? <Label className='underline'>Faça login</Label></Label>

            </div>
        </div>
    )
}

export default page