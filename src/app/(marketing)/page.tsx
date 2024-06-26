'use client'

import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'

import { Button } from '@/components/ui/button'
import { useSignUpModal } from '@/hooks/useSignUpModal'
import { cn } from '@/lib/utils'

const headingFont = localFont({
  src: '../../../public/fonts/font.woff2'
})

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

const MarketingPage = () => {
  const signUpModal = useSignUpModal()
  return (
    <div className="flex items-center justify-center flex-col">
      <div className={cn('flex items-center justify-center flex-col', headingFont.className)}>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">Welcome to Postify</h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          Create, Manage, and Publish
        </div>
      </div>
      <div
        className={cn(
          'text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto',
          textFont.className
        )}
      >
        <p>
          Postify is a blog platform for developers, designers, and creators. It helps you to create, manage, and
          publish your content with ease.
        </p>
      </div>
      <Button className="mt-6" size="lg" onClick={signUpModal.onOpen}>
        Get Postify for free
      </Button>

      {/* <ListPosts /> */}
    </div>
  )
}

export default MarketingPage
