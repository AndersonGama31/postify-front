'use client'

import * as Component from '@/components'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useSignUpModal } from '@/hooks/useSignUpModal'

export const SignUpModal = () => {
  const signUp = useSignUpModal()
  return (
    <Dialog open={signUp.isOpen} onOpenChange={signUp.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white">
        <div className="text-neutral-700 space-y-6 p-4">
          <Component.SignUpForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
