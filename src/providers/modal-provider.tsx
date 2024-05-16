'use client'

import React, { useEffect, useState } from 'react'

import * as Modal from '@/components/modal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Modal.AuthModal />
    </>
  )
}
