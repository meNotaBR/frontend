'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function login(formData: FormData) {
    const user: UserLogin = {
        email: formData.get('email') as string,
        senha: formData.get('password') as string
    }

    const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    if(!response.ok){
        throw new Error('Erro')
    }

    const json: LoginResponse = await response.json();

    (await cookies()).set({
        name: 'token',
        value: json.token,
        path: '/',
        maxAge: 7200,
        httpOnly: true
    });

    (await cookies()).set({
        name: 'expiresAt',
        value: json.expiresAt,
        path: '/',
        maxAge: 7200,
        httpOnly: true
    });

    (await cookies()).set({
        name: 'userType',
        value: json.accountType,
        path: '/',
        maxAge: 7200,
        httpOnly: true
    });

    redirect('/feed')
}