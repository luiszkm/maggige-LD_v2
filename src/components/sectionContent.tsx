import Image from 'next/image'

interface SectionContentProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function SectionContent ({children, ...rest}: SectionContentProps) {

  return (
    <section {...rest}
    className="flex flex-col min-h-screen items-center justify-between w-full max-w-screen-lg bg-slate-50">
    <header className="w-full  flex items-center justify-between">
      <Image src="/assets/logo.png" alt="logo" width={100} height={100} />
      <Image src="/assets/logo.png" alt="logo" width={100} height={100} />
    </header>
    {children}
    <footer className="w-full flex items-center justify-between">
      <Image src="/assets/logo.png" alt="logo" width={100} height={100} />
      <Image src="/assets/logo.png" alt="logo" width={100} height={100} />
    </footer>
  </section>
  )
}