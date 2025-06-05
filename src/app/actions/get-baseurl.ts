'use server'

export default async function getBaseUrl(){
    return process.env.BASE_URL;
}