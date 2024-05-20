'use client'

import * as Component from '@/components'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { usePostModal } from '@/hooks/usePostModal'

export const AddPostModal = () => {
  const postModal = usePostModal()
  return (
    <Dialog open={postModal.isOpen} onOpenChange={postModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white">
        <div className="text-neutral-700 space-y-6 p-4">
          <Component.AddPostForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
