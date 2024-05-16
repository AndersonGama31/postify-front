import { Metadata } from 'next'

import { Form } from '@/components/form'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
}

export default function AuthenticationPage() {
  return (
    <div
      className="container w-[1200px] relative h-[800px] flex-col items-center justify-center grid grid-cols-1 lg:px-0 py-0
        border border-gray-200 rounded-md shadow-md
        mt-10
      "
    >
      <Form />
    </div>
  )
}
