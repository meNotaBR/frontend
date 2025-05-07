"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue, SelectTrigger} from "@/components/ui/select"
import { useState, useEffect } from "react"
import cadastro from "../actions/cadastro-action"
import Link from "next/link"

type Props = {}

const Page = (props: Props) => {
    const days: string[] = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31",]

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
        { value: "2", label: "Empresário" },
    ]

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i)

    const [userType, setUserType] = useState<string>("")
    const [estados, setEstados] = useState<{ id: number, sigla: string, nome: string }[]>([])
    const [cidades, setCidades] = useState<{ id: number, nome: string }[]>([])
    const [estadoSelecionado, setEstadoSelecionado] = useState<string>("")
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cnpj, setCnpj] = useState('')

    useEffect(() => {
        const fetchEstados = async () => {
            try {
                const response = await fetch('https://brasilapi.com.br/api/ibge/uf/v1')
                const data = await response.json()
                setEstados(data)
            } catch (error) {
                console.error('Erro ao buscar estados:', error)
            }
        }
        fetchEstados()
    }, [])

    const handleEstadoChange = async (value: string) => {
        setEstadoSelecionado(value)
        try {
            const response = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${value}`)
            const data = await response.json()
            setCidades(data)
        } catch (error) {
            console.error('Erro ao buscar cidades:', error)
        }
    }

    const formatarCPF = (value: string) => {
        const numericValue = value.replace(/\D/g, '')
        if (numericValue.length <= 11) {
            return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        }
        return value
    }

    const formatarTelefone = (value: string) => {
        const numericValue = value.replace(/\D/g, '')
        if (numericValue.length <= 11) {
            return numericValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        }
        return value
    }

    const formatarCNPJ = (value: string) => {
        const numericValue = value.replace(/\D/g, '')
        if (numericValue.length <= 14) {
            return numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
        }
        return value
    }

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="lg:flex hidden items-center justify-center min-h-[300px] w-full">
                <img src="/menota.svg" alt="Logo Menota" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        <form action={cadastro} className="grid grid-cols-1 gap-3">
                            <div className="lg:hidden flex justify-center mb-8">
                                <img src="/menota.svg" alt="Logo Menota" className="h-16" />
                            </div>

                            <h1 className="text-2xl font-bold flex justify-center">Cadastro</h1>
                            <p className="text-balance text-[10px] text-muted-foreground flex justify-center sm:text-sm">
                                Insira seus dados abaixo para se cadastrar aqui no meNota
                            </p>

                            <div className="grid grid-cols-2 gap-1 w-full">
                                <Input required id="nome" name="nome" type="text" placeholder="Nome" className="rounded-2xl " />
                                <Input
                                    required
                                    id="sobrenome"
                                    name="sobrenome"
                                    type="text"
                                    placeholder="Sobrenome"
                                    className="rounded-2xl "
                                />
                            </div>

                            <Input required id="email" name="email" type="email" placeholder="Email" className="rounded-2xl " />
                            
                            <Input
                                required
                                id="cpf"
                                name="cpf"
                                value={cpf}
                                onChange={(e) => setCpf(formatarCPF(e.target.value))}
                                placeholder="CPF"
                                className="rounded-2xl"
                            />

                            <Input
                                required
                                id="contato"
                                name="contato"
                                value={telefone}
                                onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                                placeholder="Número de celular"
                                className="rounded-2xl"
                            />

                            <div>
                                <h1 className="flex justify-center mb-5 mt-2">Data de Nascimento</h1>
                                <div className="grid grid-cols-3 gap-1">
                                    <Select name="dia">
                                        <SelectTrigger className="w-full rounded-2xl ">
                                            <SelectValue placeholder="Dia" />
                                        </SelectTrigger>
                                        <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
                                            <SelectGroup>
                                                <SelectLabel>Dia</SelectLabel>
                                                {days.map((element, index) => (
                                                    <SelectItem value={String(element)} key={index}>
                                                        {element}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <Select name="mes">
                                        <SelectTrigger className="w-full rounded-2xl ">
                                            <SelectValue placeholder="Mês" />
                                        </SelectTrigger>
                                        <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
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

                                    <Select name="ano">
                                        <SelectTrigger className="w-full rounded-2xl ">
                                            <SelectValue placeholder="Ano" />
                                        </SelectTrigger>
                                        <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
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

                            <Input
                                required
                                id="senha"
                                name="senha"
                                type="password"
                                placeholder="Senha"
                                className="rounded-2xl "
                            />
                            <Input required type="password" placeholder="Repita a senha" className="rounded-2xl " />

                            <h1 className="flex justify-center mb-5 mt-2">Quero me cadastrar como</h1>

                            <Select name="tipoUsuario" onValueChange={setUserType} defaultValue="1">
                                <SelectTrigger className="w-full rounded-2xl ">
                                    <SelectValue placeholder="Posição" />
                                </SelectTrigger>
                                <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
                                    <SelectGroup>
                                        <SelectLabel>Posição</SelectLabel>
                                        {tipoCadastro.map((element) => (
                                            <SelectItem value={element.value} key={element.value}>
                                                {element.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            {userType === "2" && (
                                <>
                                    <h1 className="flex justify-center mb-5">Dados da sua Startup</h1>

                                    <Input
                                        required
                                        id="nomeFantasia"
                                        name="nomeFantasia"
                                        type="text"
                                        placeholder="Nome da sua startup"
                                        className="rounded-2xl"
                                    />

                                    <Input
                                        required
                                        id="cnpj"
                                        name="cnpj"
                                        value={cnpj}
                                        onChange={(e) => setCnpj(formatarCNPJ(e.target.value))}
                                        placeholder="CNPJ"
                                        className="rounded-2xl"
                                    />

                                    <Select name="estado" onValueChange={handleEstadoChange}>
                                        <SelectTrigger className="w-full rounded-2xl">
                                            <SelectValue placeholder="Estado" />
                                        </SelectTrigger>
                                        <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
                                            <SelectGroup>
                                                <SelectLabel>Estado</SelectLabel>
                                                {estados.map((estado) => (
                                                    <SelectItem value={estado.sigla} key={estado.id}>
                                                        {estado.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <Select name="cidade" disabled={!estadoSelecionado}>
                                        <SelectTrigger className="w-full rounded-2xl">
                                            <SelectValue placeholder="Cidade" />
                                        </SelectTrigger>
                                        <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)]">
                                            <SelectGroup>
                                                <SelectLabel>Cidade</SelectLabel>
                                                {cidades.map((cidade) => (
                                                    <SelectItem value={cidade.nome} key={cidade.id}>
                                                        {cidade.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </>
                            )}

                            {/* <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <Label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Eu concordo com os <span className="underline">Termos</span> e{" "}
                                    <span className="underline">Condições</span>
                                </Label>
                            </div> */}
                            <div className="mt-10 flex justify-center">
                                <Button className="w-full">Cadastrar-se</Button>
                            </div>
                            <div className="flex justify-center mt-4 ">
                                Já tem uma conta?{" "}
                                <span className="underline ml-1">
                                    <Link href={"/login"}>Faça login</Link>
                                </span>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
