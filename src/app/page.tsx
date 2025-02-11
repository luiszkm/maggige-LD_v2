'use client'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { Copy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import logo from '../../public/img/logo.svg'
import apoioIcon from '../../public/img/euapoio.svg'
import fullPlanta from '../../public/img/full-plant.svg'
import mainhero from '@/../public/img/main-hero.svg'
import noivos from '../../public/img/noivos.svg'
import noivosMain from '../../public/img/noivos.jpg'
import direita from '../../public/img/direita.svg'
import carro from '../../public/img/carro.svg'
import CountdownTimer from '@/components/Timer'
import pixnoivos from '@/../../public/img/pixnoivos.jpg'
import aviao from '@/../../public/img/aviao.svg'

const pixKey = '25969d91-befc-4ad9-8ba8-e124e5dfb48f'
export default function Home() {
  const targetDate = new Date('2025-04-12T00:00:00') // Defina a data alvo aqui
  const { toast } = useToast()
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
    <main className="w-full h-full p-2 flex flex-col items-center gap-4">
      <section className="relative flex justify-center p-2 min-h-screen  items-start w-full  bg-slate-50">
        <Image
          className="absolute top-0 left-0 opacity-65 w-64 md:w-3/6 md:opacity-40"
          src={mainhero}
          alt="logo"
        />
        <Image
          className="absolute bottom-0  -right-2 opacity-40 w-5/6 -rotate-90"
          src={mainhero}
          alt="logo"
        />
        <div className=" w-full bgg  h-full p-10 flex flex-col items-center justify-center">
          <h1 className="text-6xl lg:text-9xl text-center font-mea ">
            Lorraine <br />
            &
            <br />
            Daniel
          </h1>
          <Image className="mt-4 w-full  sm:max-w-96" src={noivos} alt="logo" />
          <CountdownTimer targetDate={targetDate} />
        </div>
      </section>

      <section className="relative flex justify-center p-2 min-h-screen  items-start w-full bg-slate-50">
        <Image
          className="absolute top-0 left-0 opacity-30 w-60 md:w-96"
          src={mainhero}
          alt="logo"
        />
        <Image
          className="absolute bottom-0 left-0 opacity-30 w-60 md:w-96 -rotate-90"
          src={mainhero}
          alt="logo"
        />
        <div className="flex w-full px-4  flex-col-reverse ">
          <div className="flex w-full flex-col  sm:flex-row md:justify-around  md:items-center gap-6">
            <div className="flex flex-col gap-2 max-w-sm">
              <h2 className="text-xl sm:text-4xl text-center font-bold">
                Um amor que floresceu.
              </h2>
              <p className=" text-md sm:text-lg md:text-2xl">
                Cinco anos atrás, nossas vidas se cruzaram de uma forma
                inesperada, e começamos como amigos, sem saber que aquele
                encontro mudaria tudo. À medida que o tempo foi passando, aquilo
                que parecia ser só uma amizade sincera começou a se transformar
                em algo muito maior. Nossos olhares passaram a se cruzar de
                maneira diferente, nossos sorrisos começaram a ter um novo
                significado e, sem que percebêssemos, nos tornamos muito mais do
                que amigos. Passamos a ser companheiros de vida, aqueles que não
                vivem sem o outro.
              </p>
            </div>
            <Image
              className="object-fill w-full sm:w-1/4 rounded-2xl z-50"
              src={noivosMain}
              alt="noivos"
            />
          </div>

          <div className=" flex items-center gap-4">
            <div className="border w-full"></div>
            <Image className="w-32 md:w-60 " src={logo} alt="logo" />
            <div className="border w-full"></div>
          </div>
        </div>
      </section>

      <section className="relative flex justify-center p-2 sm:py-5 min-h-screen  items-start w-full bg-slate-50">
        <Image
          className="absolute top-0 left-0 rotate-180"
          src={direita}
          alt="logo"
          width={400}
          height={200}
        />
        <div className="flex relative flex-col justify-between sm:flex-row  p-2 items-center h-full  w-full">
          <div className="flex flex-col w-full items-center gap-8 justify-evenly">
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-3xl md:text-6xl ">
                Operação Lua de mel
              </h2>
              <p className="text-md sm:text-lg md:text-3xl">
                Operação Lua de mel Ativada 🚀 <br />
                 A missão é simples: aproveitar ao
                máximo cada momento dessa viagem dos sonhos! Dê uma força pra
                gente faça sua contribuição com um PIX 💰e torne nossa viagem
                inesquecível!❤ Estamos contanto com todos vocês para tornar
                nosso sonho realidade ✈👩‍❤‍👨
              </p>
            </div>
            <div className="flex flex-col  -mt-36">
              <div className="flex  items-center justify-between">
                <Image
                  className="mt-32 w-24 sm:w-96"
                  src={apoioIcon}
                  alt="apoio"
                />
                <Image className="mt-32 w-24 sm:w-72" src={aviao} alt="apoio" />
              </div>
              <Image className="-mt-48 w-full " src={carro} alt="logo" />
            </div>
          </div>
          <div className="w-4/6 sm:w-full max-w-md">
            <div className=" border-4 w-full border-black p-1">
              <Image className="w-full " src={pixnoivos} alt="qr code pix" />
            </div>
            <Button
              onClick={handleCopyPix}
              className="bg-green-200 border mt-2 hover:bg-green-600 border-gray-500 w-full text-gray-800 font-bold"
            >
              <Copy />
              copie a chave pix
            </Button>

            <div className=" flex flex-row-reverse items-start gap-2 mb-3">
              <img
                className="w-10"
                src="https://img.icons8.com/color/48/pix.png"
                alt="pix"
              />
              <small>
                {' '}
                Faça um PIX e garanta nossa sobrevivência romântica!
              </small>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex justify-center p-2 min-h-screen  items-start w-full bg-slate-50">
        <div className="flex flex-col w-full h-full items-center justify-evenly gap-10 bgr ">
          <div>
            <div className="relative w-full h-[360px] sm:h-[460px]">
              <Image src={fullPlanta} alt="logo" width={640} height={640} />

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-3xl shadow-lg">
                <div className="w-full flex flex-col gap-2 px-8 ">
                  <h3 className="text-xl md:text-3xl text-center">
                    Ansiosos para <br /> comemorar com você!
                  </h3>
                  <Button className=" bg-green-500 hover:bg-green-700 rounded-full border md:text-xl px-5 md:py-8  ">
                    <Link href="/presence">confirme sua presença</Link>
                  </Button>
                  <strong className="md:text-2xl text-center">
                    Gentileza confirmar presença até <br /> 28 de fevereiro
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full flex flex-col-reverse  items-start justify-center  gap-4">
            <div className="flex  justify-between items-end">
              <div className=" w-2/4 flex-col flex ">
                <ul>
                  <li>AV Afonso vaz de melo 465, Lado B</li>
                  <li>Via Shopping</li>
                  <li>Barreiro</li>
                </ul>
                <div className=" flex gap-3">
                  <a
                    title="abrir com waze"
                    className="text-blue-500"
                    href="https://waze.com/ul?ll=-19.975409528642405,-44.019532295626284&navigate=yes"
                    target="_blank"
                  >
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/waze.png"
                      alt="waze"
                    />
                  </a>

                  <a
                    className="text-blue-500"
                    title="abrir com google maps"
                    href="https://www.google.com/maps/dir/?api=1&destination=-19.975409528642405,-44.019532295626284"
                    target="_blank"
                  >
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/google-maps.png"
                      alt="google-maps"
                    />
                  </a>
                </div>
              </div>
              <Image className="w-32 " src={logo} alt="logo" />
            </div>

            <iframe
              className="w-full h-80  "
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3753.1384092266614!2d-44.0018731242077!3d-19.968321878880087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa690aace0f707d%3A0x73d13c1d169cf3cf!2sAv.%20Afonso%20Vaz%20de%20Melo%2C%20465%20-%20Barreiro%2C%20Belo%20Horizonte%20-%20MG%2C%2030620-000!5e0!3m2!1spt-BR!2sbr!4v1699802679827!5m2!1spt-BR!2sbr"
            ></iframe>
          </div>
        </div>
      </section>
      <Toaster />
    </main>
  )
}
