'use server'

import { cookies } from "next/headers";
import { format, parseISO } from "date-fns";
import getBaseUrl from "./get-baseurl";

export async function getProfile() {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        throw new Error('Não autorizado');
    }

    try {
        const response = await fetch(`${await getBaseUrl()}/api/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao buscar perfil');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        throw error;
    }
}

export async function updateProfile(formData: FormData) {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        throw new Error('Não autorizado');
    }

    const dataNascForm = formData.get('dataNasc') as string;
    const dataNascFormatted = format(parseISO(dataNascForm), 'yyyy-MM-dd');

    const profile = {
        nome: formData.get('nome'),
        sobrenome: formData.get('sobrenome'),
        email: formData.get('email'),
        numeroCelular: formData.get('numeroCelular')?.toString().replace(/\D/g, ''),
        dataNasc: dataNascFormatted
    };

    const response = await fetch(`${await getBaseUrl()}/api/profile/update`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao atualizar perfil');
    }

    return response.json();
} 