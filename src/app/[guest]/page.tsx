'use client'

import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Companions } from '@/components/companions'
import { Textarea } from '@/components/ui/textarea'
import eventDataJson from '@/../marriageList.json'
import { PresentSection } from '@/components/presentSection'
import Image from 'next/image'
import mainhero from '@/../public/img/main-hero.svg'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'


const formSchema = z.object({
  email: z.string().email({
    message: 'Digite um email valido'
  }),
  presents: z.string().min(2, {
    message: 'selecione um presente abaixo e clique no botão confirmar'
  })
})

type EmailTemplateProps = {
  confirmed: string[]
  email: string
  presents: string[]
}

export default function Guest() {
  const eventData: EventData = eventDataJson
  const [emailmodel, setEmailModel] = useState<EmailTemplateProps>()
  const [presenceStatus, setPresenceStatus] = useState<
    Record<string, 'confirmed' | 'not_confirmed'>
  >({})
  const [selectedPresents, setSelectedPresents] = useState<Present[]>([])
  const [userEmail, setUserEmail] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const { guest } = useParams()
  const { toast } = useToast()
  const guestName = eventData.passwords.find(i => i.password === guest)
  const confirmedKeys = Object.keys(presenceStatus).filter(
    key => presenceStatus[key] === 'confirmed'
  )
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      presents: ''
    }
  })

  const handleConfirm = (id: string) => {
    setPresenceStatus(prevState => ({
      ...prevState,
      [id]: 'confirmed'
    }))
  }

  const handleDeny = (id: string) => {
    setPresenceStatus(prevState => ({
      ...prevState,
      [id]: 'not_confirmed'
    }))
  }
  const handlePresentSelection = (presents: Present[]) => {
    setSelectedPresents(presents)
  }
  
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setDialogOpen(true)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const emailModel: EmailTemplateProps = {
      email: values.email,
      presents: values.presents.split(',').map(present => present.trim()),
      confirmed: confirmedKeys
    }
    setEmailModel(emailModel)
  }
  async function sendEmail(
    guests: string[], 
    email: string, 
    presents: string[]) {
      const body = JSON.stringify({ guests, email, presents })
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:body ,
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao enviar e-mail");
  
      console.log("✅ E-mail enviado com sucesso!", data);
    } catch (error) {
      console.error("❌ Erro ao enviar e-mail:", error);
    }
  }
  
  async function handleConfirmGuests() {
    try {
      //AddProduct(emailmodel!)
      sendEmail(emailmodel!.confirmed, emailmodel!.email, emailmodel!.presents)
      toast({
        title: 'Obrigado',
        description: 'Sua presença foi confirmada'
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível confirmar sua presença',
        variant: 'destructive'
      })
      console.error('Erro ao adicionar documento: ', error)
    } finally {
      setDialogOpen(false)
    }
  }

  useEffect(() => {
    // Atualiza o valor do formulário sempre que o estado `selectedPresents` muda
    form.setValue(
      'presents',
      selectedPresents.map(value => value.name).join(', ')
    )
  }, [selectedPresents, form])
  return (
    <main className="flex  w-full flex-col gap-2 items-center px-2">
      <section className="flex relative flex-col min-h-screen items-center w-full max-w-screen-xl bg-slate-50">
        <Image
          className="absolute top-0 opacity-15  rotate-90"
          src={mainhero}
          alt="logo"
          width={500}
          height={200}
        />
        <div className="w-full h-full p-2 flex flex-col sm:flex-row z-50 items-start justify-between px-6 gap-5 font-bold">
          <div className="w-full sm:max-w-80">
            <h2 className="font-bold">{`Bem vindo ${guestName?.guests[0].name}!`}</h2>
            <p className="">
              Gentileza selecionar abaixo uma sugestão de presente, clique em
              cada nome na lista de convidados (ficará verde quando confirmar e
              vermelho caso nao estiver confirmado)
              <br /> preencha com seu email e clique no botão confirmar{' '}
            </p>
          </div>
          {/* <strong>{presentSelected === "" ? "" : `${presentSelected} selecionado`}</strong> */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 px-2 w-full z-50"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        onChangeCapture={e =>
                          setUserEmail((e.target as HTMLInputElement).value)
                        }
                        placeholder="Digite seu e-mail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="presents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Diga-nos algo sobre os presentes"
                        className="hidden"
                        value={
                          field.value ||
                          selectedPresents.map(value => value.name).join(', ')
                        } // Exibe os valores atuais
                        onChange={e => {
                          const updatedValue = e.target.value

                          // Atualiza o valor do campo no formulário
                          field.onChange(updatedValue)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="h-9 bg-green-700 hover:bg-green-800"
                type="button"
                onClick={form.handleSubmit(onSubmit)}
              >
                Confirmar
              </Button>
            </form>
          </Form>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {guestName?.guests[0].name || 'Convidado'}, Revise os dados
                  abaixo e clique em confirmar presença
                </DialogTitle>
                <DialogDescription></DialogDescription>
                <div className="text-sm text-muted-foreground">
                  <ul className="mb-4">
                    <li>{`(${confirmedKeys.length}) convidado(s) confirmado(s):`}</li>
                    {confirmedKeys.map((key, index) => (
                      <li key={index}>{key}</li>
                    ))}
                    <li className="mt-4 border-t">{`Presentes selecionados (${selectedPresents.length})`}</li>
                    {selectedPresents.map((present, index) => (
                      <li key={index}>{present.name}</li>
                    ))}
                  </ul>
                  <strong>{`Total de pessoas: ${confirmedKeys.length}`}</strong>
                </div>
              </DialogHeader>
              <DialogFooter className="flex items-center justify-between w-full">
                <div className="w-full flex items-center gap-4 justify-between">
                  <span>{userEmail}</span>
                  <Button onClick={handleConfirmGuests} type="submit">
                    Confirmar presença
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="w-full sm:max-w-72">
            <p>Confirmar presença</p>
            <Companions
              companions={guestName!.guests}
              presenceStatus={presenceStatus}
              onConfirm={handleConfirm}
              onDeny={handleDeny}
            />
          </div>
        </div>
        <PresentSection onSelectionChange={handlePresentSelection} />
      </section>
      <Toaster />
    </main>
  )
}
