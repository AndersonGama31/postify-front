import React from 'react'

import { Toaster } from 'sonner'

import { Footer } from '@/components/footer'
import { ModalProvider } from '@/providers/modal-provider'

import { Navbar } from './_components/navbar'

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-white">
      <Toaster />
      <ModalProvider />
      <Navbar />
      <main className="pt-14 w-full justify-center items-center">{children}</main>
      <Footer />
    </div>
  )
}

export default BlogLayout
