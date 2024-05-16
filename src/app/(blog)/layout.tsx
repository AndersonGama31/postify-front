import React from 'react'

import { Toaster } from 'sonner'

import { ModalProvider } from '@/providers/modal-provider'

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Toaster />
      <ModalProvider />
      {children}
    </React.Fragment>
  )
}

export default BlogLayout
