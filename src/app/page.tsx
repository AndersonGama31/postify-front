'use client'

// import { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import { useAuthModal } from '@/hooks/useAuthModal'

// export const metadata: Metadata = {
//   title: 'Authentication',
//   description: 'Authentication forms built using the components.'
// }

export default function AuthenticationPage() {
  const authModal = useAuthModal()
  return (
    <div
      className="container w-[1200px] relative h-[800px] flex-col items-center justify-center grid grid-cols-1 lg:px-0 py-0
        border border-gray-200 rounded-md shadow-md
        mt-10
      "
    >
      <Button variant="default" onClick={authModal.onOpen}>
        Upgrade
      </Button>
    </div>
  )
}
