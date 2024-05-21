'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { useAuth } from '@/context/AuthContext'
import { useAuthModal } from '@/hooks/useAuthModal'
import { TSignInSchema, signInSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from './ui/button'
import { Input } from './ui/input'

export const AuthForm = () => {
  const authModal = useAuthModal()
  const { handleSignIn } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async ({ email, password }: TSignInSchema) => {
    try {
      await handleSignIn({ email, password })
      authModal.onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className="flex flex-col justify-evenly items-center w-full h-full bg-white
      text-slate-950"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center justify-center w-full h-[100px] gap-5">
        <h1 className="text-3xl font-semibold tracking-tight">Join the DEV community</h1>
        <p className="text-lg text-muted-foreground">Sign in to continue </p>
      </div>

      <div className="flex flex-col space-y-6 w-[300px] mt-5">
        <div className="flex flex-col w-full h-15">
          <Input placeholder="Email" {...register('email')} />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
        <div className="flex flex-col w-full h-15">
          <Input placeholder="Password" type="password" {...register('password')} />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>
        <div className="mt-10">
          <Button className="w-full uppercase" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Loading' : 'Sign In'}
          </Button>
        </div>

        <div className="flex items-center justify-center w-full gap-2">
          <p>Don&apos;t have an account? </p>
          <span className="text-blue-500 cursor-pointer hover:underline">Sign up</span>
        </div>
      </div>
    </form>
  )
}
