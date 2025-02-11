import Link from 'next/link'
import { Button } from './ui/button'
import { toast } from '@/hooks/use-toast'
import { Toaster } from './ui/toaster'

type CardPresenterProps = {
  name: string
  photoUrl: string
  isSelected: boolean
  linkUrl: string
  onClick: () => void
}
const pixKey = '25969d91-befc-4ad9-8ba8-e124e5dfb48f'

export function CardPresenter({
  name,
  photoUrl,
  isSelected,
  linkUrl,
  onClick
}: CardPresenterProps) {
  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixKey) // Copia a chave Pix para a área de transferência
      toast({
        title: 'Obrigado',
        description: 'Chave Pix copiada'
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível copiar a chave Pix',
        variant: 'destructive'
      })
      console.error('Erro ao copiar a chave Pix:', error)
    }
  }
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border z-50 rounded-lg p-4 ${
        isSelected ? 'bg-green-200' : 'bg-white'
      }`}
    >
      <img
        src={photoUrl}
        alt={name}
        className="w-full z-50 h-32 object-contain mb-2"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      {name !== 'Pix' ? (
        <Button>
          <Link href={linkUrl} target="_blank">
            Comprar
          </Link>
        </Button>
      ) : (
        <Button onClick={handleCopyPix}
        >Copiar chave pix</Button>
      )}
      <Toaster />
    </div>
  )
}
