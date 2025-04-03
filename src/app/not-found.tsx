import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <h2 className='text-2xl font-bold'>Página não encontrada</h2>
      <p>Não foi possível encontrar o recurso solicitado</p>
      <Link href="/feed" className='underline hover:text-blue-600 transition-colors'>
        Retornar ao feed
      </Link>
    </div>
  )
}