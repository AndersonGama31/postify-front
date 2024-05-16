'use client'

import * as Component from '@/components'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useAuthModal } from '@/hooks/useAuthModal'

export const AuthModal = () => {
  const authModal = useAuthModal()
  return (
    <Dialog open={authModal.isOpen} onOpenChange={authModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white">
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <Component.Form />
        </div>
      </DialogContent>
    </Dialog>
  )
}
