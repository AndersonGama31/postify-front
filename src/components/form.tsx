'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { TSignInSchema, signInSchema } from '@/schema/schema'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from './ui/button'
import { Input } from './ui/input'

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async ({ email, password }: TSignInSchema) => {
    console.log({ email, password })
  }

  return (
    <form
      className="flex flex-col justify-evenly items-center w-full h-full bg-white
      text-slate-950"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center justify-center w-full h-[100px] gap-5">
        <h1 className="text-3xl font-semibold tracking-tight">Join the DEV community</h1>
        <p className="text-lg text-muted-foreground">Sign in to continue</p>
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
      </div>
    </form>
  )
}
