'use client'

import Image from 'next/image'

import * as Component from '@/components'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useAuthModal } from '@/hooks/useAuthModal'

import { Button } from '../ui/button'

export const AuthModal = () => {
  const authModal = useAuthModal()
  return (
    <Dialog open={authModal.isOpen} onOpenChange={authModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src="/hero.svg" alt="Hero" className="object-cover" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">Upgrade to Taskify Pro Today!</h2>
          <p className="text-xs font-semibold text-neutral-600">Explore the best of Taskify</p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button className="w-full" variant="default">
            Upgrade
          </Button>
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <Component.Form />
        </div>
      </DialogContent>
    </Dialog>
  )
}
