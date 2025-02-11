'use client'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import eventDataJson from '@/../marriageList.json'
import { useRouter } from 'next/navigation'
import logo from '../../../public/img/logo.svg'
import mainhero from '@/../public/img/main-hero.svg'
import noivosolhando from '@/../public/img/noivosolhando.jpg' 

import Image from 'next/image'

export default function Presence() {
  const guestList = eventDataJson.passwords
  const [password, setPassword] = useState('')

  const { push } = useRouter()

  function VerifyPassword() {
    const normalizedPassword = normalizeText(password)
    const guest = guestList.find(i => i.password === normalizedPassword)
    if (guest) {
      push(`/${password.toLowerCase()}`)
    } else {
      alert('palavra chave incorreta')
    }
  }

  function normalizeText(text: string): string {
    return text
      .normalize('NFD') // Normaliza os caracteres para sua forma decomposta (ex: 'é' -> 'e´')
      .replace(/[\u0300-\u036f]/g, '') // Remove os diacríticos (acentos)
      .replace(/[^\w\s]/gi, '') // Remove caracteres especiais (exceto espaços e letras/números)
      .toLowerCase(); // Converte para lowercase
  }

  useEffect(() => {}, [password])
  return (
    <main className="p-2 flex flex-col w-full items-center gap-2">
      <section className="flex relative flex-col min-h-screen items-center w-full max-w-screen-xl bg-slate-50">
      <Image
          className="absolute bottom-0 w-full opacity-35 -rotate-90"
          src={mainhero}
          alt="logo"
      
        />
        <Image className="w-60" src={logo} alt="logo" />
      
        <h1 className="font-bold text-2xl md:text-4xl">Confirme sua presença</h1>
        <p className='md:text-2xl'>Para confirmar sua presença, <br /> por favor, Digite a Palavra magica</p>
        
       <form action={()=>VerifyPassword()}
        className='flex flex-col gap-4 items-center z-50'>
        <div className="flex gap-4 items-center">
          <Input
            onChange={e => setPassword(e.target.value)}
            placeholder="Digite sua palavra chave"
            className="w-full"
          />
          <Button className="bg-green-400 hover:bg-green-700">
            Confirmar
          </Button>
        </div>
       </form>
       <Image className="w-96 mt-4 rounded-full z-50 shadow-lg shadow-gray-600" src={noivosolhando} alt="logo" />

      </section>
    </main>
  )
}
