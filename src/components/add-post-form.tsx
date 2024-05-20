'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { SplineIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { usePostModal } from '@/hooks/usePostModal'
import { uploadToS3 } from '@/lib/s3'
import { TAddPostSchema, addPostSchema } from '@/schema/schema'
import * as apiClient from '@/services/api/client'
import { zodResolver } from '@hookform/resolvers/zod'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField, FormDescription } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/text-area'

export function AddPostForm() {
  const [bannerPreview, setBannerPreview] = useState<string>('')
  const [avatar, setAvatar] = useState<File | null>(null)
  const avatarInputRef = useRef<HTMLInputElement | null>(null)
  const postModal = usePostModal()
  const router = useRouter()

  const handleAvatarClick = () => {
    avatarInputRef.current?.click()
  }

  const form = useForm<TAddPostSchema>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      title: '',
      content: ''
    },
    mode: 'onChange'
  })

  async function onSubmit({ content, title }: TAddPostSchema) {
    if (!avatar) {
      toast('Please upload a banner')
      return
    }

    try {
      const url = await uploadToS3(avatar)

      await apiClient.CreatePost({
        title,
        content,
        banner: url
      })

      toast('Post added successfully')
      form.reset()
      router.refresh()
      postModal.onClose()
    } catch (error) {
      toast('Error adding post')
    }
  }

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatar(file) // atualiza o estado do avatar
      setBannerPreview(URL.createObjectURL(file)) // atualiza o estado do preview
    }
  }

  useEffect(() => {
    // Limpeza da URL ao descartar
    return () => {
      if (bannerPreview) {
        URL.revokeObjectURL(bannerPreview)
      }
    }
  }, [bannerPreview])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel>Banner</FormLabel>
          <FormControl>
            <>
              <div className="cursor-pointer" onClick={handleAvatarClick}>
                <Avatar className="w-full h-[200px] rounded-sm">
                  <AvatarImage src={bannerPreview} className="w-full h-[200px] rounded-lg" />
                  <AvatarFallback className="w-full h-[200px] rounded-sm">Click to upload a new banner</AvatarFallback>
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Write something..." className="resize-none" {...field} />
              </FormControl>
              <FormDescription>
                <span className="text-sm text-neutral-500">Minimum 200 characters</span>
              </FormDescription>
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
              postModal.onClose()
            }}
          >
            Discard
          </Button>

          <Button type="submit" className="px-4">
            {form.formState.isSubmitting ? <SplineIcon className="mr-2 h-4 w-4 animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
