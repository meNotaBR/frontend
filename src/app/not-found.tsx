import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (<>
    <Header />
    <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <h2 className='text-2xl font-bold'>Página não encontrada</h2>
      <p>Não foi possível encontrar o recurso solicitado</p>
      <Button>
        <Link href="/feed" className='transition-colors'>
          Retornar ao feed
        </Link>
      </Button>
    </div>
  </>)
}