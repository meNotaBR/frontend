'use server'

import { redirect } from "next/navigation";

interface Cadastro {
    nome: string,
    sobrenome: string,
    cpf: string,
    email: string,
    senha: string,
    numeroCelular?: string,
    dataNasc: string,
}

export default async function cadastro(formData: FormData){

    console.log(formData);
    

    const dataNasc = concatDates(formData.get('dia') as string, formData.get('mes') as string, formData.get('ano') as string);

    const cadastro: Cadastro = {
        nome: formData.get('nome') as string,
        sobrenome: formData.get('sobrenome') as string,
        cpf: formData.get('cpf') as string,
        email: formData.get('email') as string,
        senha: formData.get('senha') as string,
        dataNasc: dataNasc
    }

    console.log(cadastro);
    

    var url = 'http://localhost:8080/api/';

    if(formData.get('tipoUsuario') === 'Empresario'){
        cadastro.numeroCelular = formData.get('numeroCelular') as string;
        url = url.concat('empresario/create');
    }else{
        url = url.concat('investor/create');
    }

    console.log(url);
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(cadastro)
    });

    if(!response.ok){

        const message = await response.json();

        throw new Error('Erro ao cadastrar usuario: ' + message)
    }

    redirect('/login')
}

const concatDates = (dia: string, mes: string, ano: string) => {
    return `${ano}-${mes}-${dia}`;
}