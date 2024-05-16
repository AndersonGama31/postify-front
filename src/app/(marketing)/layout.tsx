'use client'

import { ModalProvider } from '@/providers/modal-provider'

import { Footer } from './_components/footer'
import { Navbar } from './_components/navbar'

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      <ModalProvider />
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-100">{children}</main>
      <Footer />
    </div>
  )
}

export default MarketingLayout