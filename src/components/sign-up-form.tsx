'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { SplineIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useSignUpModal } from '@/hooks/useSignUpModal'
import { uploadToS3 } from '@/lib/s3'
import { TSignUpSchema, signUpSchema } from '@/schema/schema'
import * as apiClient from '@/services/api/client'
import { zodResolver } from '@hookform/resolvers/zod'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from './ui/form'
import { Input } from './ui/input'

export function SignUpForm() {
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const [avatar, setAvatar] = useState<File | null>(null)
  const avatarInputRef = useRef<HTMLInputElement | null>(null)
  const signUpModal = useSignUpModal()
  const router = useRouter()

  const handleAvatarClick = () => {
    avatarInputRef.current?.click()
  }

  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      job: '',
      name: ''
    },
    mode: 'onChange'
  })

  async function onSubmit({ email, job, name, password }: TSignUpSchema) {
    if (!avatar) {
      toast('Please upload an avatar')
      return
    }

    try {
      const url = await uploadToS3(avatar)

      await apiClient.SignUp({
        avatar: url,
        email,
        job,
        name,
        password
      })

      toast('Post added successfully')
      form.reset()
      router.refresh()
      signUpModal.onClose()
    } catch (error) {
      toast('Error adding post')
    }
  }

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatar(file) // atualiza o estado do avatar
      setAvatarPreview(URL.createObjectURL(file)) // atualiza o estado do preview
    }
  }

  useEffect(() => {
    // Limpeza da URL ao descartar
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview)
      }
    }
  }, [avatarPreview])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel>Avatar</FormLabel>
          <FormControl>
            <>
              <div className="cursor-pointer" onClick={handleAvatarClick}>
                <Avatar>
                  <AvatarImage src={avatarPreview} />
                  <AvatarFallback>FB</AvatarFallback>
                </Avatar>

                <Input
                  type="file"
                  onChange={onAvatarChange}
                  accept="image/jpeg, image/png, image/gif"
                  style={{ display: 'none' }}
                  ref={avatarInputRef}
                />
              </div>
            </>
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="mail@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="job"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job</FormLabel>
              <FormControl>
                <Input placeholder="job" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            type="reset"
            className="px-4 mr-2"
            variant="secondary"
            onClick={() => {
              form.reset()
              signUpModal.onClose()
            }}
          >
            Discard
          </Button>

          <Button type="submit" className="px-4">
            {form.formState.isSubmitting ? <SplineIcon className="mr-2 h-4 w-4 animate-spin" /> : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
