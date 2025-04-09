'use server'

import { cookies } from "next/headers"

export default async function getCookie(key: string): Promise<string | undefined> {

    const cookieValue = (await cookies()).get(key)?.value;    

    return cookieValue;
}