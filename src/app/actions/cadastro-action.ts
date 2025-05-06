'use server'

import { redirect } from "next/navigation";

interface Cadastro {
    nome: string,
    sobrenome: string,
    cpf: string,
    email: string,
    senha: string,
    numeroCelular: string,
    dataNasc: string,
    nomeFantasia?: string,
    cnpj?: string,
    cidade?: string,
    estado?: string
    profileImage?: string
}

export default async function cadastro(formData: FormData){

    const dataNasc = concatDates(formData.get('dia') as string, formData.get('mes') as string, formData.get('ano') as string);

    const cadastro: Cadastro = {
        nome: formData.get('nome') as string,
        sobrenome: formData.get('sobrenome') as string,
        cpf: formData.get('cpf') as string,
        numeroCelular: formData.get('contato') as string,
        email: formData.get('email') as string,
        senha: formData.get('senha') as string,
        dataNasc: dataNasc
    }    

    var url = 'http://localhost:8080/api/';

    if(formData.get('tipoUsuario') === '2'){
        cadastro.nomeFantasia = formData.get('nomeFantasia') as string;
        cadastro.cnpj = formData.get('cnpj') as string;
        cadastro.cidade = formData.get('cidade') as string;
        cadastro.estado = formData.get('estado') as string;
        cadastro.profileImage = formData.get('profileImage') as string;
        url = url.concat('empresario/create');
    }else{
        url = url.concat('investor/create');
    }
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(cadastro)
    });

    if(!response.ok){
        const message = await response.json();
        
        if (message.erro) {
            throw new Error(message.erro);
        } else {
            throw new Error('Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente.');
        }
    }

    redirect('/login')
}

const concatDates = (dia: string, mes: string, ano: string) => {
    return `${ano}-${mes}-${dia}`;
}