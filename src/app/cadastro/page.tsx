import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue, SelectTrigger } from '@/components/ui/select'
import React from 'react'
import cadastro from '../actions/cadastro-action'
import Link from 'next/link'
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

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i)

    return (
        <div className='flex justify-center'>
            <form 
            action={cadastro}
            className='grid grid-cols-1 gap-3'>

                <img src="menota.svg" alt="" className='mb-8' />
                <Label style={{ fontSize: '35px' }} className='flex justify-center mb-5' >Cadastre-se</Label>
                <div className='grid grid-cols-2 gap-1 w-full'>
                    <Input id='nome' name='nome' type='text' placeholder='Nome' className='rounded-2xl h-11' />
                    <Input id='sobrenome' name='sobrenome' type='text' placeholder='Sobrenome' className='rounded-2xl h-11' />
                </div>
                <Input id='email' name='email' type='email' placeholder='Email' className='rounded-2xl h-11' />
                <Input id='cpf' name='cpf' type='text' placeholder='CPF' className='rounded-2xl h-11' />
                <Input id='contato' name='contato' type='text' placeholder='Número de celular' className='rounded-2xl h-11' />


                <div>
                    <Label className='flex justify-center mb-5 mt-2'>Data de Nascimento</Label>
                    <div className='grid grid-cols-3 gap-1'>

                        <Select name='dia'>
                            <SelectTrigger className='w-full rounded-2xl h-11'>
                                <SelectValue placeholder='Dia' />
                            </SelectTrigger>
                            <SelectContent position='popper' className="w-[var(--radix-select-trigger-width)]">
                                <SelectGroup>
                                    <SelectLabel>Dia</SelectLabel>
                                    {days.map((element, index) => (
                                        <SelectItem value={String(element)} key={index}>{element}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select name='mes'>
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

                        <Select name='ano'>
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
                <Select name='tipoUsuario'>
                    <SelectTrigger className='w-full rounded-2xl h-11'>
                        <SelectValue placeholder='Posição' />
                    </SelectTrigger>
                    <SelectContent position='popper' className="w-[var(--radix-select-trigger-width)]">
                        <SelectGroup>
                            <SelectLabel>Posição</SelectLabel>
                            {tipoCadastro.map((element) => (
                                <SelectItem value={element.label} key={element.value}>{element.label}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Input id='senha' name='senha' type='password' placeholder='Senha' className='rounded-2xl h-11' />
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
                    <Button className='w-50 font-bold h-15 rounded-2xl text-lg'>Cadastrar-se</Button>
                </div>

                <Label className='flex justify-center mt-4 text-blue-600'> Já tem uma conta ? <Label className='underline'><Link href={'/login'}>Faça login</Link></Label></Label>

            </form>
        </div>
    )
}

export default page